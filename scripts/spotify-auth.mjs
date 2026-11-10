/**
 * Mint a Spotify refresh token for /api/listening.
 *
 * In the Spotify dashboard, create an app and add this redirect URI:
 *   http://127.0.0.1:8788/callback
 * Development mode is enough. The app owner needs Spotify Premium.
 *
 * From the repo root:
 *   SPOTIFY_CLIENT_ID=... SPOTIFY_CLIENT_SECRET=... node scripts/spotify-auth.mjs
 * Open the printed URL, approve access, and the refresh token is printed here.
 * It is not shown in the browser. When .dev.vars does not exist yet, it is
 * written there too (mode 600, gitignored).
 */
import { randomBytes, timingSafeEqual } from 'node:crypto';
import { existsSync, writeFileSync } from 'node:fs';
import { createServer } from 'node:http';

const clientId = process.env.SPOTIFY_CLIENT_ID ?? '';
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET ?? '';
const redirectUri = 'http://127.0.0.1:8788/callback';
const state = randomBytes(16).toString('hex');

if (!clientId || !clientSecret) {
  console.error(
    'Set SPOTIFY_CLIENT_ID and SPOTIFY_CLIENT_SECRET. Register this redirect URI on the Spotify app: ' +
      redirectUri,
  );
  process.exit(1);
}

const authorize = new URL('https://accounts.spotify.com/authorize');
authorize.searchParams.set('response_type', 'code');
authorize.searchParams.set('client_id', clientId);
authorize.searchParams.set('scope', 'user-read-recently-played');
authorize.searchParams.set('redirect_uri', redirectUri);
authorize.searchParams.set('state', state);
authorize.searchParams.set('show_dialog', 'true');

const server = createServer((request, response) => {
  const url = new URL(request.url ?? '/', redirectUri);
  if (url.pathname !== '/callback') {
    response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Not found');
    return;
  }
  void complete(url).then(
    (page) => {
      response.writeHead(page.status, { 'content-type': 'text/html; charset=utf-8' });
      response.end(page.body, () => {
        server.close();
        process.exit(page.ok ? 0 : 1);
      });
    },
    (error) => {
      console.error(error instanceof Error ? error.name : 'Spotify authorization failed');
      response.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
      response.end('Authorization failed', () => {
        server.close();
        process.exit(1);
      });
    },
  );
});

server.listen(8788, '127.0.0.1', () => {
  console.log('Open this URL and approve access:\n');
  console.log(authorize.href);
  console.log('\nWaiting for the redirect.');
});

server.on('error', (error) => {
  console.error(error instanceof Error ? error.message : 'Could not listen on 127.0.0.1:8788');
  process.exit(1);
});

setTimeout(
  () => {
    console.error('Timed out waiting for the Spotify redirect.');
    server.close();
    process.exit(1);
  },
  5 * 60 * 1000,
).unref();

async function complete(url) {
  const denied = url.searchParams.get('error');
  if (denied) {
    console.error(`Spotify did not grant access (${denied}).`);
    return {
      ok: false,
      status: 400,
      body: page('Spotify did not grant access. You can close this window.'),
    };
  }

  const returned = url.searchParams.get('state') ?? '';
  const sent = Buffer.from(state);
  const got = Buffer.from(returned);
  if (sent.length !== got.length || !timingSafeEqual(sent, got)) {
    console.error('The Spotify redirect state did not match.');
    return {
      ok: false,
      status: 400,
      body: page('Authorization failed. You can close this window.'),
    };
  }

  const code = url.searchParams.get('code');
  if (!code) {
    console.error('The Spotify redirect had no code.');
    return {
      ok: false,
      status: 400,
      body: page('Authorization failed. You can close this window.'),
    };
  }

  const tokenResponse = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      authorization: `Basic ${basic(clientId, clientSecret)}`,
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
    }),
  });
  const body = await tokenResponse.json().catch(() => null);
  const refresh = body && typeof body.refresh_token === 'string' ? body.refresh_token : '';
  if (!tokenResponse.ok || !refresh) {
    const reason =
      body && typeof body.error === 'string' ? body.error : String(tokenResponse.status);
    console.error(`Spotify did not return a refresh token (${reason}).`);
    return {
      ok: false,
      status: 502,
      body: page('Spotify did not return a token. You can close this window.'),
    };
  }

  console.log('\nRefresh token:\n');
  console.log(refresh);
  console.log('\nStore it on the Pages project, along with the client id and secret:');
  console.log('  npx wrangler pages secret put SPOTIFY_CLIENT_ID --project-name=kylecesmat');
  console.log('  npx wrangler pages secret put SPOTIFY_CLIENT_SECRET --project-name=kylecesmat');
  console.log('  npx wrangler pages secret put SPOTIFY_REFRESH_TOKEN --project-name=kylecesmat');
  console.log('Add --env preview to each command for preview deployments, then redeploy.');

  if (!existsSync('.dev.vars')) {
    writeFileSync('.dev.vars', devVars(clientId, clientSecret, refresh), { mode: 0o600 });
    console.log('Wrote .dev.vars for npm run pages:dev.');
  } else {
    console.log('.dev.vars already exists; add SPOTIFY_REFRESH_TOKEN there yourself.');
  }

  return { ok: true, status: 200, body: page('Spotify is connected. You can close this window.') };
}

function devVars(id, secret, refresh) {
  return (
    `SPOTIFY_CLIENT_ID=${quote(id)}\n` +
    `SPOTIFY_CLIENT_SECRET=${quote(secret)}\n` +
    `SPOTIFY_REFRESH_TOKEN=${quote(refresh)}\n`
  );
}

function quote(value) {
  return `"${value.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, '\\n')}"`;
}

function basic(id, secret) {
  return Buffer.from(`${id}:${secret}`, 'utf8').toString('base64');
}

function page(text) {
  return `<!doctype html><meta charset="utf-8"><title>Spotify</title><p>${text}</p>`;
}
