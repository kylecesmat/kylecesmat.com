# kylecesmat.com

Personal site: one page with an introduction, a work history, writing and talks, education, and ways to get in touch. The same content is served as Markdown at `/llms.txt` and `/index.md`.

## Stack

- [Astro](https://astro.build/) 7, static output to `dist/`
- [Tailwind CSS](https://tailwindcss.com/) 4 through `@tailwindcss/vite`; self-hosted Raleway
- Node 22 (see `.nvmrc`)
- Cloudflare Pages via `wrangler.jsonc` (`pages_build_output_dir: ./dist`)
- GitHub Actions: `astro check` and build on every push, preview deploys on pull requests

## Local

```bash
npm ci
npm run dev
npm run check
npm run build
```

## Editing the content

Everything on the page comes from three files, and `/llms.txt` is built from the same three, so the two cannot drift apart.

- `src/data/site.ts`: name, page title and description, the three introduction paragraphs, email, profiles
- `src/data/work.ts`: companies, roles, dates, bullets, education
- `src/data/talks.ts`: articles, podcasts, talks and press

Dates are `YYYY-MM`; a malformed one fails the build. Bullets and summaries take inline Markdown links, `**strong**` and `_emphasis_`.

## Design

The layout follows [michaelcohen.io](https://www.michaelcohen.io/) (see `THIRD_PARTY_NOTICES.md`). The colours are in `src/styles/global.css`, all derived from `--accent-hue`. The contour lines behind the header are `src/assets/topo.png`, from the previous version of this site.

## Cloudflare cutover (not this PR)

Nameservers are already Cloudflare (`jake` / `lisa`). Records are DNS-only (grey-cloud) to GitHub Pages. Preview this branch first. Go-live later: attach Pages custom domain on the apex, orange-cloud the records, keep nameservers, then retire GitHub Pages / `gh-pages`.

Keep the existing www→apex 301. Pages `_redirects` cannot do host-level redirects; after cutover use a Cloudflare Redirect Rule on proxied `www`.

## Removed vs the old Next site

- Travis CI + `gh-pages` deploy
- Universal Analytics (`UA-104533559-1`)
- Next 13 `next export`
