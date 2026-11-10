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
- `src/data/current.ts`: the rows on `/current` and the month they were last updated. The Listening row is not one of these; see below.

Dates are `YYYY-MM`; a malformed one fails the build. The text fields take inline Markdown links, `**strong**` and `_emphasis_`; a link that starts with `/` stays on the site.

## Last played

`/current` asks `/api/listening` for the last Spotify track and, when one comes back, adds a Listening row. Until then the row stays hidden. The track is not in `src/data/current.ts` or `/llms.txt`. The function keeps a response for fifteen minutes.

It needs three Pages secrets: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, and `SPOTIFY_REFRESH_TOKEN`. With any of them unset, the function answers `204`. Those names stay out of `wrangler.jsonc`. `wrangler pages deploy` rejects a `secrets` key, and the types are in `functions/env.d.ts`.

Create a Spotify app in Development mode (the owner needs Premium) and register the redirect `http://127.0.0.1:8788/callback`. From the repo root:

```bash
SPOTIFY_CLIENT_ID=... SPOTIFY_CLIENT_SECRET=... node scripts/spotify-auth.mjs
npx wrangler pages secret put SPOTIFY_CLIENT_ID --project-name=kylecesmat
npx wrangler pages secret put SPOTIFY_CLIENT_SECRET --project-name=kylecesmat
npx wrangler pages secret put SPOTIFY_REFRESH_TOKEN --project-name=kylecesmat
```

Open the URL the script prints and approve access. The refresh token is printed in the terminal, not in the browser. Add `--env preview` to each `secret put` for preview deployments. Set the secrets before the next deploy; a deployment that went out without them keeps answering `204` until the next one.

For `npm run pages:dev`, copy `.dev.vars.example` to `.dev.vars` and fill in the same three names. The script writes `.dev.vars` when that file does not exist yet.

## Design

The layout is adapted from an MIT-licensed open-source site, credited in `THIRD_PARTY_NOTICES.md`. The colours are in `src/styles/global.css`, all derived from `--accent-hue`. The contour lines behind the header and in the footer's map are `src/assets/topo.png`, from the previous version of this site. The hover effects are one block in `global.css`; they are skipped on touch screens and under reduced motion.

`DESIGN.md` records the lessons the redesign settled: one column with one margin, ink that carries information, links marked by a stroke instead of coloured text, hover that says nothing new, and the checks that caught mistakes. Read it before changing the layout or the type.

## Agent skills

`.agents/skills/` holds agent skills for building and reviewing interfaces, installed with the [skills CLI](https://github.com/vercel-labs/skills) and pinned in `skills-lock.json`. Two collections:

- [jakubkrehel/skills](https://github.com/jakubkrehel/skills): typography, colour, layout, accessibility, UI polish and interface review.
- [emilkowalski/skill](https://github.com/emilkowalski/skill): animation and interaction craft.

They are reference material for the agent, not part of the site, and the build does not read them. Update them with `npx skills update`. Some skills act on their own when a task matches; the ones marked `disable-model-invocation` in their `SKILL.md` run only when named.

## Deployment

Cloudflare Pages is the host for previews and for `kylecesmat.pages.dev`. A push to `master` deploys that production branch. Pull requests from this repository get their own preview branch. The zone nameservers are already Cloudflare, which is what lets an apex domain be a proxied CNAME and what makes `_headers` and `_redirects` apply.

The Actions API token can deploy Pages and attach `kylecesmat.com` to the project, and it cannot edit DNS. While the apex still points at GitHub Pages, the same master build is published to the `gh-pages` branch, which is what `kylecesmat.com` serves. `www` keeps the existing GitHub Pages 301 to the apex. Mail records are not touched. When the token can edit the zone, `scripts/ensure-cloudflare-domain.mjs` moves the apex to Cloudflare Pages and the GitHub Pages publish is skipped.

## Removed vs the old Next site

- Travis CI. Actions publishes `gh-pages` only while the apex DNS still points there.
- Universal Analytics (`UA-104533559-1`)
- Next 13 `next export`
