# kylecesmat.com

Personal site. The home page is an introduction, a work history in broad strokes, writing and talks, and education. `/current` says what I am up to now. The home page and `/current` are also served as Markdown at `/llms.txt` and `/index.md`.

## Stack

- [Astro](https://astro.build/) 7, static output to `dist/`
- [Tailwind CSS](https://tailwindcss.com/) 4 through `@tailwindcss/vite`; self-hosted Inter
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

Everything on the pages comes from four files, and `/llms.txt` is built from the same four, so they cannot drift apart.

- `src/data/site.ts`: name, page title and description, the introduction, email, profiles, the small links in the header and footer, the footer's place
- `src/data/work.ts`: companies, roles, dates, education. Each role has an `impact`, a sentence or two on what it came to
- `src/data/talks.ts`: articles, podcasts, talks and press
- `src/data/current.ts`: the rows on `/current` and the month they were last updated

Dates are `YYYY-MM`; a malformed one fails the build. The text fields take inline Markdown links, `**strong**` and `_emphasis_`; a link that starts with `/` stays on the site.

## Design

The layout is adapted from an MIT-licensed open-source site, credited in `THIRD_PARTY_NOTICES.md`. The colours are in `src/styles/global.css`, all derived from `--accent-hue`. The contour lines behind the header and in the footer's map are `src/assets/topo.png`, from the previous version of this site. The hover effects are one block in `global.css`; they are skipped on touch screens and under reduced motion.

`DESIGN.md` records the lessons the redesign settled: one column with one margin, ink that carries information, links marked by a stroke instead of coloured text, hover that says nothing new, and the checks that caught mistakes. Read it before changing the layout or the type.

## Agent skills

`.agents/skills/` holds agent skills for building and reviewing interfaces, installed with the [skills CLI](https://github.com/vercel-labs/skills) and pinned in `skills-lock.json`. Two collections:

- [jakubkrehel/skills](https://github.com/jakubkrehel/skills): typography, colour, layout, accessibility, UI polish and interface review.
- [emilkowalski/skill](https://github.com/emilkowalski/skill): animation and interaction craft.

They are reference material for the agent, not part of the site, and the build does not read them. Update them with `npx skills update`. Some skills act on their own when a task matches; the ones marked `disable-model-invocation` in their `SKILL.md` run only when named.

## Cloudflare cutover (not this PR)

Nameservers are already Cloudflare (`jake` / `lisa`). Records are DNS-only (grey-cloud) to GitHub Pages. Preview this branch first. Go-live later: attach Pages custom domain on the apex, orange-cloud the records, keep nameservers, then retire GitHub Pages / `gh-pages`.

Keep the existing www→apex 301. Pages `_redirects` cannot do host-level redirects; after cutover use a Cloudflare Redirect Rule on proxied `www`.

## Removed vs the old Next site

- Travis CI + `gh-pages` deploy
- Universal Analytics (`UA-104533559-1`)
- Next 13 `next export`
