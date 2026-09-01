# kylecesmat.com

Personal site for Kyle Cesmat — Agent Experience, platform, developer experience, and applied AI.

Static [Astro](https://astro.build) + in-repo MDX, built for [Cloudflare Pages](https://developers.cloudflare.com/pages/). Replaces the old Next 13 `next export` site that shipped from GitHub Pages.

**This branch is preview-only.** Do not publish to production, attach `kylecesmat.com`, or flip DNS until Kyle has previewed the PR and explicitly approved.

Public copy is **qualitative on purpose**. Team size, enablement rates, and other metrics are omitted until Kyle says otherwise.

## Local

Requires Node 22+.

```sh
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321).

```sh
npm run build      # writes static files to dist/
npm run preview    # Astro preview of the build
npm run check      # astro check
npm run pages:dev  # wrangler pages dev dist (after a build)
```

There is no production deploy script.

## Content

Writing and talks are MDX in `src/content/pieces/`. Frontmatter schema lives in `src/content.config.ts`. Hero, proof, help line, and about bio live in `src/site.ts`.

Formidable-era projects and Phoenix meetup talks are in `src/content/archive/` and only appear on `/archive` (footer link, not primary nav).

## Analytics

Universal Analytics (`UA-104533559-1`) is gone. To enable [Cloudflare Web Analytics](https://developers.cloudflare.com/web-analytics/), set `PUBLIC_CF_WEB_ANALYTICS_TOKEN` at build time. If it is unset, no beacon is injected.

## Cloudflare Pages (preview only)

Build settings (also encoded in `wrangler.jsonc` via `pages_build_output_dir`):

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `22` (see `.nvmrc`) |

CI **builds** on pull requests. It does **not** deploy.

If you connect the repo in the Cloudflare dashboard for PR preview URLs, do **not** add the custom domain and do **not** set this project as the production target for `kylecesmat.com` until Kyle approves.

## DNS cutover — do not run yet

Live site is still GitHub Pages. Cutover notes are here for later, after explicit approval:

1. Confirm a Pages **preview** looks right.
2. Only then: Pages → Custom domains → add `kylecesmat.com` / `www`.
3. Replace GitHub Pages A/CNAME records (`185.199.108–111.153`, `kylecesmat.github.io`) with a CNAME/ALIAS to `<project>.pages.dev`.
4. Disable GitHub Pages and the `gh-pages` branch.
5. `/currently` → `/now` is already in `public/_redirects` and `astro.config.mjs`.
