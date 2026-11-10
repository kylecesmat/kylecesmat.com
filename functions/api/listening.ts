import { handleListening } from '../../src/lib/listening.ts';

/**
 * GET /api/listening. File routing in /functions makes the path; the handler
 * in src/lib/listening.ts does the Spotify call and the cache.
 */
export const onRequestGet: PagesFunction<Env> = (context) =>
  handleListening({
    request: context.request,
    env: context.env,
    cache: caches.default,
  });
