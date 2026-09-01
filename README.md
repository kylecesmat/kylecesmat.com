# kylecesmat.com

Personal site for Kyle Cesmat — Agent Experience, platform, developer experience, and applied AI.

Static [Astro](https://astro.build) + in-repo MDX, built for [Cloudflare Pages](https://developers.cloudflare.com/pages/). Replaces the old Next 13 `next export` site that shipped from GitHub Pages.

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

## Content

Writing and talks are MDX in `src/content/pieces/`. Frontmatter schema lives in `src/content.config.ts`.

Formidable-era projects and 2017–2019 meetup talks are in `src/content/archive/` and only appear on `/archive` (footer link, not primary nav).

Hero copy is defined once in `src/site.ts` and used on the homepage.

## Analytics

Universal Analytics (`UA-104533559-1`) is gone. To enable [Cloudflare Web Analytics](https://developers.cloudflare.com/web-analytics/), set `PUBLIC_CF_WEB_ANALYTICS_TOKEN` at build time. If it is unset, no beacon is injected.

## Cloudflare Pages

Build settings (also encoded in `wrangler.jsonc` via `pages_build_output_dir`):

| Setting | Value |
| --- | --- |
| Production branch | `master` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `22` (see `.nvmrc`) |

### Dashboard (preferred, no GitHub secrets)

1. Cloudflare dashboard → Workers & Pages → Create → Pages → Import an existing Git repository.
2. Select `kylecesmat/kylecesmat.com`, production branch `master`.
3. Framework preset: Astro (or set the table above by hand).
4. Deploy. You get a `*.pages.dev` URL before the custom domain is attached.

### Optional GitHub Action deploy

`.github/workflows/ci.yml` **always builds** on pull requests. On push to `master` it runs `wrangler pages deploy` **only if** repository secrets `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` are set. If they are missing, the deploy job prints a skip message and succeeds.

Create a token with Pages write access: [API tokens](https://developers.cloudflare.com/fundamentals/api/get-started/create-token/).

```sh
npm run pages:deploy
```

## DNS cutover (GitHub Pages → Cloudflare Pages)

The live site currently serves from **GitHub Pages** (Travis used to publish `out/` to `gh-pages` with `fqdn: kylecesmat.com`). After the Pages project is healthy on `*.pages.dev`:

1. In Cloudflare Pages → Custom domains, add `kylecesmat.com` and `www.kylecesmat.com`.
2. Point DNS at Pages:
   - If the domain is **on Cloudflare DNS**, adding the custom domain can provision the records. Apex is usually a CNAME/ALIAS to `<project>.pages.dev` (or Cloudflare flattened CNAME).
   - If DNS is **elsewhere**, replace GitHub Pages records:
     - Remove A records `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (and any AAAA `2606:50c0:8000::` GitHub set).
     - Remove CNAME `www` → `kylecesmat.github.io`.
     - Add CNAME for `www` → `<project>.pages.dev`, and an ALIAS/ANAME/flattened CNAME for the apex to the same target (or use Cloudflare nameservers).
3. Wait for SSL on the custom domain (Cloudflare issues it).
4. Disable GitHub Pages on the repo (Settings → Pages) and delete or stop using the `gh-pages` branch. Travis (`.travis.yml`) is already removed in this rebuild.
5. Keep `/currently` → `/now` (see `public/_redirects`) so old links still resolve.

Do not flip the apex until the Pages deploy looks right on the `pages.dev` URL.
