/**
 * Pages secrets for /api/listening. `wrangler pages deploy` rejects a
 * `secrets` key, so these names are not in wrangler.jsonc. Declaration
 * merging adds them to the Env generated in types.d.ts.
 */
interface Env {
  SPOTIFY_CLIENT_ID: string;
  SPOTIFY_CLIENT_SECRET: string;
  SPOTIFY_REFRESH_TOKEN: string;
}
