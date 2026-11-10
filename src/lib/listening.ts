import { isSpotifyTrackUrl } from './spotify-track.ts';

/**
 * The last track from Spotify's recently-played endpoint, served at
 * /api/listening. The Pages Function is a thin wrapper; the request work
 * lives here so it can be tested without the Workers runtime.
 *
 * Spotify needs a user token for this. The three secrets are a refresh token
 * plus the app credentials that mint the hour-long access token. With any of
 * them unset the handler answers 204, and the page leaves the row hidden.
 */

const TOKEN_URL = 'https://accounts.spotify.com/api/token';
const RECENT_URL = 'https://api.spotify.com/v1/me/player/recently-played?limit=5';

/** Shared-cache lifetime. A personal page does not need a fresher track than this. */
const EDGE_SECONDS = 60 * 15;
/** Browser lifetime, so a reload during a visit is not another function call. */
const BROWSER_SECONDS = 60;

const MAX_TEXT = 300;

export type SpotifyEnv = {
  SPOTIFY_CLIENT_ID?: string;
  SPOTIFY_CLIENT_SECRET?: string;
  SPOTIFY_REFRESH_TOKEN?: string;
};

export type LastPlayed = {
  title: string;
  artist: string;
  url: string;
  playedAt: string;
};

export type ListeningCache = {
  match(request: RequestInfo | URL): Promise<Response | undefined>;
  put(request: RequestInfo | URL, response: Response): Promise<void>;
};

type FetchLike = (input: string, init?: RequestInit) => Promise<Response>;

export async function handleListening(options: {
  request: Request;
  env: SpotifyEnv;
  fetch?: FetchLike;
  cache?: ListeningCache;
}): Promise<Response> {
  const call = options.fetch ?? fetch;
  const key = cacheKey(options.request);

  if (options.cache) {
    try {
      const hit = await options.cache.match(key);
      if (hit) return hit;
    } catch (error) {
      log('listening_cache', error);
    }
  }

  const creds = secrets(options.env);
  if (!creds) return noContent(false);

  try {
    const tokenResponse = await call(TOKEN_URL, {
      method: 'POST',
      headers: {
        authorization: `Basic ${basic(creds.id, creds.secret)}`,
        'content-type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: creds.refresh,
      }),
      cache: 'no-store',
    });
    if (!tokenResponse.ok) {
      log('spotify_token', tokenResponse.status);
      return finish(
        options.cache,
        key,
        noContent(tokenResponse.status === 429),
        tokenResponse.status === 429,
      );
    }

    const accessToken = await readAccessToken(tokenResponse);
    if (!accessToken) return noContent(false);

    const recent = await call(RECENT_URL, {
      headers: { authorization: `Bearer ${accessToken}` },
      cache: 'no-store',
    });
    if (!recent.ok) {
      log('spotify_recent', recent.status);
      return finish(options.cache, key, noContent(recent.status === 429), recent.status === 429);
    }

    const played = readLastPlayed(await recent.json());
    if (!played) return finish(options.cache, key, noContent(true), true);
    return finish(options.cache, key, playedResponse(played), true);
  } catch (error) {
    log('spotify_listening', error);
    return noContent(false);
  }
}

/**
 * The first recently-played item that is an ordinary Spotify track. Local
 * files and rows without a track URL are skipped; the request asks for a few
 * so one of those does not hide the track before it.
 */
export function readLastPlayed(body: unknown): LastPlayed | null {
  if (!body || typeof body !== 'object') return null;
  const items = (body as { items?: unknown }).items;
  if (!Array.isArray(items)) return null;
  for (const item of items) {
    const played = readItem(item);
    if (played) return played;
  }
  return null;
}

function readItem(item: unknown): LastPlayed | null {
  if (!item || typeof item !== 'object') return null;
  const record = item as { track?: unknown; played_at?: unknown };
  const playedAt = clip(record.played_at);
  if (!playedAt || Number.isNaN(Date.parse(playedAt))) return null;
  if (!record.track || typeof record.track !== 'object') return null;
  const track = record.track as {
    name?: unknown;
    external_urls?: { spotify?: unknown };
    artists?: unknown;
  };
  const title = clip(track.name);
  const url = clip(track.external_urls?.spotify);
  if (!title || !url || !isSpotifyTrackUrl(url)) return null;
  if (!Array.isArray(track.artists)) return null;

  const names: string[] = [];
  for (const artist of track.artists) {
    if (!artist || typeof artist !== 'object') continue;
    const name = clip((artist as { name?: unknown }).name);
    if (name) names.push(name);
    if (names.length === 8) break;
  }
  if (names.length === 0) return null;
  return { title, artist: names.join(', '), url, playedAt };
}

function clip(value: unknown): string | null {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed || trimmed.length > MAX_TEXT) return null;
  return trimmed;
}

function secrets(env: SpotifyEnv): { id: string; secret: string; refresh: string } | null {
  const id = env.SPOTIFY_CLIENT_ID;
  const secret = env.SPOTIFY_CLIENT_SECRET;
  const refresh = env.SPOTIFY_REFRESH_TOKEN;
  if (!id || !secret || !refresh) return null;
  return { id, secret, refresh };
}

function basic(id: string, secret: string): string {
  const bytes = new TextEncoder().encode(`${id}:${secret}`);
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

async function readAccessToken(response: Response): Promise<string | null> {
  const body: unknown = await response.json();
  if (!body || typeof body !== 'object') return null;
  const token = (body as { access_token?: unknown }).access_token;
  return typeof token === 'string' && token ? token : null;
}

function playedResponse(played: LastPlayed): Response {
  return new Response(JSON.stringify(played), {
    headers: {
      'content-type': 'application/json; charset=utf-8',
      'cache-control': cacheControl(),
      'x-content-type-options': 'nosniff',
    },
  });
}

function noContent(store: boolean): Response {
  return new Response(null, {
    status: 204,
    headers: { 'cache-control': store ? cacheControl() : 'no-store' },
  });
}

function cacheControl(): string {
  return `public, max-age=${BROWSER_SECONDS}, s-maxage=${EDGE_SECONDS}`;
}

function cacheKey(request: Request): Request {
  const url = new URL(request.url);
  url.pathname = '/api/listening';
  url.search = '';
  url.hash = '';
  return new Request(url, { method: 'GET' });
}

async function finish(
  cache: ListeningCache | undefined,
  key: Request,
  response: Response,
  store: boolean,
): Promise<Response> {
  if (!store || !cache) return response;
  try {
    await cache.put(key, response.clone());
  } catch (error) {
    log('listening_cache', error);
  }
  return response;
}

/** Status and error name only. Token responses and request URLs stay out of the log. */
function log(event: string, detail: unknown): void {
  const message =
    typeof detail === 'number' ? undefined : detail instanceof Error ? detail.name : 'failed';
  const status = typeof detail === 'number' ? detail : undefined;
  console.error(JSON.stringify({ event, status, message }));
}
