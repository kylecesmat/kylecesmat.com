# kylecesmat.com

Personal site. Visual tone is quiet editorial (attardi.org / nickbytes), not a metrics dashboard. **About copy** is editable MDX at `src/pages/about.mdx` — do not rewrite it in layout PRs.

## Stack

- [Astro](https://astro.build/) 7, static output to `dist/`
- Node 22 (see `.nvmrc`)
- Cloudflare Pages via `wrangler.jsonc` (`pages_build_output_dir: ./dist`)
- GitHub Actions: **build + `astro check` only** — no production deploy from CI

## Local

```bash
npm ci
npm run dev
npm run build
```

## Cloudflare cutover (not this PR)

Nameservers are already Cloudflare (`jake` / `lisa`). Records are DNS-only (grey-cloud) to GitHub Pages. Preview this branch first. Go-live later: attach Pages custom domain on the apex, orange-cloud the records, keep nameservers, then retire GitHub Pages / `gh-pages`.

Keep the existing www→apex 301. Pages `_redirects` cannot do host-level redirects; after cutover use a Cloudflare Redirect Rule on proxied `www`.

## Removed vs the old Next site

- Travis CI + `gh-pages` deploy
- Universal Analytics (`UA-104533559-1`)
- Next 13 `next export`
