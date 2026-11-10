# kylecesmat.com

Personal site. The home page is an introduction, a work history in broad strokes, writing and talks, and education. `/current` says what I am up to now. The home page and `/current` are also served as Markdown at `/llms.txt` and `/index.md`.

## Stack

- [Astro](https://astro.build/) 7, static output to `dist/`
- [Tailwind CSS](https://tailwindcss.com/) 4 through `@tailwindcss/vite`; self-hosted Inter
- Node 22 (see `.nvmrc`)
- Cloudflare Pages via `wrangler.jsonc` (`pages_build_output_dir: ./dist`)
- GitHub Actions deploys `dist/` on every push to `master` and on pull requests from this repository. Dependabot and fork pull requests cannot read the Actions secrets, so those checks skip the deploy and the merge to `master` publishes.

## Local

```bash
npm ci
npm run dev
npm run check
npm run build
```

## Editing the content

Everything on the pages comes from four files, and `/llms.txt` is built from the same four, so they cannot drift apart.

- `src/data/site.ts`: name, page title and description, the introduction, email, profiles, the small links in the header and footer, the footer's place
- `src/data/work.ts`: companies, roles, dates, education. Each role has an `impact`, a sentence or two on what it came to
- `src/data/talks.ts`: articles, podcasts, talks and press
- `src/data/current.ts`: the rows on `/current` and the month they were last updated

Dates are `YYYY-MM`; a malformed one fails the build. The text fields take inline Markdown links, `**strong**` and `_emphasis_`; a link that starts with `/` stays on the site.

## Design

The layout is adapted from an MIT-licensed open-source site, credited in `THIRD_PARTY_NOTICES.md`. The colours are in `src/styles/global.css`, all derived from `--accent-hue`. The contour lines behind the header and in the footer's map are `src/assets/topo.png`, from the previous version of this site. The hover effects are one block in `global.css`; they are skipped on touch screens and under reduced motion.

## Deployment

Cloudflare Pages hosts the site. The zone already uses Cloudflare nameservers, so the apex can be a proxied CNAME to `kylecesmat.pages.dev`, and Pages can apply `_headers` and `_redirects`. GitHub Pages was the previous host; it cannot do that on the apex while the nameservers stay here.

`master` is the production branch. Each push builds the site, deploys it, and runs `scripts/ensure-cloudflare-domain.mjs`, which keeps `kylecesmat.com` on the project and keeps the www → apex 301. Pages `_redirects` cannot match the hostname, so that 301 is a zone Redirect Rule. Mail records are left alone.

## Removed vs the old Next site

- Travis CI + `gh-pages` deploy
- Universal Analytics (`UA-104533559-1`)
- Next 13 `next export`
