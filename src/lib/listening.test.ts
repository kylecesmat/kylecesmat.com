import assert from 'node:assert/strict';
import { afterEach, describe, it, mock } from 'node:test';
import { handleListening, readLastPlayed, type SpotifyEnv } from './listening.ts';

const TRACK = 'https://open.spotify.com/track/11dFghVXANMlKmJXsNCbNl';
const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const RECENT_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=5';

const env: SpotifyEnv = {
  SPOTIFY_CLIENT_ID: 'client-id',
  SPOTIFY_CLIENT_SECRET: 'client-secret',
  SPOTIFY_REFRESH_TOKEN: 'refresh-token',
};

afterEach(() => {
  mock.restoreAll();
});

describe('readLastPlayed', () => {
  it('reads the first track and joins the artists', () => {
    const played = readLastPlayed({
      items: [
        item({
          artists: [{ name: 'The National' }, { name: 'Bon Iver' }],
        }),
      ],
    });
    assert.deepEqual(played, {
      title: 'Fake Empire',
      artist: 'The National, Bon Iver',
      url: TRACK,
      playedAt: '2026-11-10T18:00:00.000Z',
    });
  });

  it('skips a row with no track url', () => {
    const played = readLastPlayed({
      items: [item({ external_urls: {} }), item({ name: 'About Today' })],
    });
    assert.equal(played?.title, 'About Today');
    assert.equal(played?.url, TRACK);
  });

  it('drops a url that is not a Spotify track', () => {
    assert.equal(
      readLastPlayed({ items: [item({ external_urls: { spotify: 'javascript:alert(1)' } })] }),
      null,
    );
    assert.equal(
      readLastPlayed({
        items: [
          item({ external_urls: { spotify: 'https://evil.example/track/11dFghVXANMlKmJXsNCbNl' } }),
        ],
      }),
      null,
    );
    assert.equal(
      readLastPlayed({
        items: [
          item({
            external_urls: {
              spotify: 'https://open.spotify.com/intl-de/track/11dFghVXANMlKmJXsNCbNl',
            },
          }),
        ],
      })?.url,
      'https://open.spotify.com/intl-de/track/11dFghVXANMlKmJXsNCbNl',
    );
  });
});

describe('handleListening', () => {
  it('answers 204 without calling Spotify when a secret is missing', async () => {
    const { fetch, calls } = spotify();
    const response = await handleListening({
      request: new Request('https://kylecesmat.com/api/listening'),
      env: { ...env, SPOTIFY_REFRESH_TOKEN: '' },
      fetch,
    });
    assert.equal(response.status, 204);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.equal(calls.length, 0);
  });

  it('answers 204 when the token exchange fails', async () => {
    const { fetch, calls } = spotify({ tokenStatus: 401, tokenBody: { error: 'invalid_grant' } });
    const response = await handleListening({
      request: new Request('https://kylecesmat.com/api/listening'),
      env,
      fetch,
    });
    assert.equal(response.status, 204);
    assert.equal(response.headers.get('cache-control'), 'no-store');
    assert.deepEqual(
      calls.map((call) => call.url),
      [TOKEN_URL],
    );
  });

  it('returns the track, caches it, and does not repeat the Spotify calls', async () => {
    mock.method(console, 'error', () => {});
    const { fetch, calls } = spotify();
    const cache = memoryCache();
    const request = () => new Request('https://kylecesmat.com/api/listening?cb=1');
    const first = await handleListening({ request: request(), env, fetch, cache });
    const body = await first.json();
    assert.equal(first.status, 200);
    assert.equal(first.headers.get('content-type'), 'application/json; charset=utf-8');
    assert.equal(first.headers.get('cache-control'), 'public, max-age=60, s-maxage=900');
    assert.deepEqual(body, {
      title: 'Fake Empire',
      artist: 'The National',
      url: TRACK,
      playedAt: '2026-11-10T18:00:00.000Z',
    });
    assert.equal(JSON.stringify(body).includes('refresh-token'), false);
    assert.equal(JSON.stringify(body).includes('client-secret'), false);

    const tokenCall = calls[0];
    assert.equal(tokenCall?.url, TOKEN_URL);
    const authorization = new Headers(tokenCall?.init?.headers).get('authorization') ?? '';
    assert.equal(
      Buffer.from(authorization.replace('Basic ', ''), 'base64').toString('utf8'),
      'client-id:client-secret',
    );
    assert.equal(
      String(tokenCall?.init?.body),
      'grant_type=refresh_token&refresh_token=refresh-token',
    );
    assert.equal(new Headers(calls[1]?.init?.headers).get('authorization'), 'Bearer access-token');
    assert.equal(tokenCall?.init?.cache, 'no-store');
    assert.equal(calls[1]?.init?.cache, 'no-store');

    const second = await handleListening({
      request: new Request('https://kylecesmat.com/api/listening?cb=2'),
      env,
      fetch,
      cache,
    });
    assert.equal(second.status, 200);
    assert.deepEqual(await second.json(), body);
    assert.equal(calls.length, 2);
  });

  it('caches an empty recently-played list and a rate limit', async () => {
    const empty = spotify({ recentBody: { items: [] } });
    const emptyCache = memoryCache();
    const emptyResponse = await handleListening({
      request: new Request('https://kylecesmat.com/api/listening'),
      env,
      fetch: empty.fetch,
      cache: emptyCache,
    });
    assert.equal(emptyResponse.status, 204);
    assert.equal(emptyResponse.headers.get('cache-control'), 'public, max-age=60, s-maxage=900');
    const emptyAgain = await handleListening({
      request: new Request('https://kylecesmat.com/api/listening'),
      env,
      fetch: empty.fetch,
      cache: emptyCache,
    });
    assert.equal(emptyAgain.status, 204);
    assert.equal(empty.calls.length, 2);

    const limited = spotify({ recentStatus: 429, recentBody: { error: { status: 429 } } });
    const limitedCache = memoryCache();
    const limitedResponse = await handleListening({
      request: new Request('https://kylecesmat.com/api/listening'),
      env,
      fetch: limited.fetch,
      cache: limitedCache,
    });
    assert.equal(limitedResponse.status, 204);
    assert.match(limitedResponse.headers.get('cache-control') ?? '', /s-maxage=900/);
    await handleListening({
      request: new Request('https://kylecesmat.com/api/listening'),
      env,
      fetch: limited.fetch,
      cache: limitedCache,
    });
    assert.equal(limited.calls.length, 2);
  });

  it('answers 204 when Spotify cannot be reached', async () => {
    const { fetch } = spotify({ fail: 'token' });
    const response = await handleListening({
      request: new Request('https://kylecesmat.com/api/listening'),
      env,
      fetch,
    });
    assert.equal(response.status, 204);
    assert.equal(response.headers.get('cache-control'), 'no-store');
  });
});

function item(track: Record<string, unknown> = {}) {
  return {
    played_at: '2026-11-10T18:00:00.000Z',
    track: {
      name: 'Fake Empire',
      external_urls: { spotify: TRACK },
      artists: [{ name: 'The National' }],
      ...track,
    },
  };
}

function spotify(
  options: {
    tokenStatus?: number;
    tokenBody?: unknown;
    recentStatus?: number;
    recentBody?: unknown;
    fail?: 'token' | 'recent';
  } = {},
) {
  const calls: { url: string; init?: RequestInit }[] = [];
  const fetch = async (url: string, init?: RequestInit) => {
    calls.push({ url, init });
    if (url === TOKEN_URL) {
      if (options.fail === 'token') throw new Error('network');
      return new Response(JSON.stringify(options.tokenBody ?? { access_token: 'access-token' }), {
        status: options.tokenStatus ?? 200,
      });
    }
    if (url === RECENT_URL) {
      if (options.fail === 'recent') throw new Error('network');
      return new Response(JSON.stringify(options.recentBody ?? { items: [item()] }), {
        status: options.recentStatus ?? 200,
      });
    }
    throw new Error(`unexpected ${url}`);
  };
  return { fetch, calls };
}

function memoryCache() {
  const stored = new Map<string, Response>();
  return {
    async match(request: RequestInfo | URL) {
      const hit = stored.get(key(request));
      return hit?.clone();
    },
    async put(request: RequestInfo | URL, response: Response) {
      stored.set(key(request), response.clone());
    },
  };
  function key(request: RequestInfo | URL) {
    return request instanceof Request ? request.url : String(request);
  }
}
