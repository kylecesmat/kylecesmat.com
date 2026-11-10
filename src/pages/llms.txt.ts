import type { APIRoute } from 'astro';

import { buildLlmsText } from '../lib/llms';

export const GET: APIRoute = ({ site }) => {
  if (!site) throw new Error('`site` must be set in astro.config.mjs');
  return new Response(buildLlmsText(site), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
