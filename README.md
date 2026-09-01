# kylecesmat.com

Personal site for Kyle Cesmat — Agent Experience, platform, developer experience, and applied AI.

Static [Astro](https://astro.build) + in-repo MDX, built for [Cloudflare Pages](https://developers.cloudflare.com/pages/). Replaces the Next 13 `pages/` + `next export` tree on `master` (Jan 2023, **never deployed**) and the live GitHub Pages site from the `gh-pages` branch (Aug 2020).

**This branch is preview-only.** Do not attach `kylecesmat.com` to Pages, do not orange-cloud the GitHub Pages records, and do not retire `gh-pages` until Kyle has previewed the PR and explicitly approved.

Public copy is a **hiring-brief shell with labeled placeholders**. Headline A/B/C live in `src/site.ts` (`headlinePick`, default `'placeholder'`). No invented metrics.

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

There is no production deploy script. GitHub Actions **builds** on PRs; it does not deploy. That replaces Travis (`node_js: 12` → `next build` / `next export` → `gh-pages`).

## Content

IA v1: Home / Writing & talks / About & contact. Light `/now` stub in the footer. Formidable work is `/archive` only.

Homepage order (see `src/pages/index.astro`): name + headline/subhead → proof teaser → selected work (3 case placeholders) → featured writing → talks & podcasts (Syntax.fm #944 first) → about teaser + email/LinkedIn.

Headline options A/B/C are in `src/site.ts`. Set `headlinePick` to `'A' | 'B' | 'C'` when Kyle chooses; until then it stays `'placeholder'`.

Writing pillars are MDX stubs in `src/content/pieces/` (`pillar` frontmatter). Schema: `src/content.config.ts`.

## SEO, robots, headers

Live GitHub Pages has no OG/description meta; `/robots.txt` and `/sitemap.xml` currently return the Next 404 shell; there are no security headers; Universal Analytics `UA-104533559-1` is still on the live HTML.

This rebuild:

- Per-page title, description, canonical, OG, Twitter, and Person JSON-LD (`src/layouts/BaseLayout.astro`)
- `public/robots.txt` → `https://kylecesmat.com/sitemap-index.xml`
- `@astrojs/sitemap` emits `sitemap-index.xml` (and `/sitemap.xml` 301s there)
- `public/_headers` for Pages (nosniff, referrer, frame deny, permissions-policy, HSTS)

Those `_headers` only take effect once the hostname is **proxied** (orange-cloud). Grey-cloud DNS-only to GitHub Pages skips Cloudflare edge features — that is why live has no `cf-ray` today.

UA is removed. Optional [Cloudflare Web Analytics](https://developers.cloudflare.com/web-analytics/) via `PUBLIC_CF_WEB_ANALYTICS_TOKEN` at build time; unset means no beacon.

## Cloudflare Pages (preview only)

`wrangler.jsonc` sets `pages_build_output_dir` to `./dist`.

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | `22` (see `.nvmrc`) |

CI **builds** on pull requests. It does **not** deploy.

If you connect the repo in the dashboard for `*.pages.dev` preview URLs, do **not** add the custom domain until Kyle approves.

## DNS cutover — nameservers already on Cloudflare

Do **not** change nameservers. The zone already uses Cloudflare NS (`jake.ns.cloudflare.com` / `lisa.ns.cloudflare.com`). Records are **DNS-only (grey-cloud)** and still origin GitHub Pages, which is why responses have no `cf-ray`:

| Record | Today (grey-cloud) |
| --- | --- |
| Apex `kylecesmat.com` | A `185.199.108–111.153` and AAAA `2606:50c0:8000::` / `8001::` / `8002::` / `8003::` (GitHub Pages) |
| `www` | CNAME → `kylecesmat.github.io` |

`www` already 301s to apex. **Keep that.** Pages `_redirects` cannot do host-level redirects, so after cutover keep www→apex with a [Cloudflare Redirect Rule](https://developers.cloudflare.com/rules/url-forwarding/examples/redirect-www-to-root/) on a **proxied** `www` record.

Cutover (only after Kyle approves a Pages preview):

1. Workers & Pages → project → Custom domains → add **`kylecesmat.com`** (apex). Cloudflare will replace the GitHub Pages A/AAAA with a proxied (orange-cloud) record to the Pages project. SSL is issued on the proxy.
2. Leave nameservers as-is.
3. **Keep www→apex:** do not serve a second copy on `www`. Orange-cloud `www` and add a Redirect Rule `www.kylecesmat.com/*` → `https://kylecesmat.com/${uri}` (301). A proxied CNAME `www` → apex, or an originless `www` A `192.0.2.1` plus the rule, both work; the important part is proxied + 301 to apex.
4. Confirm `cf-ray` on `https://kylecesmat.com`, HTTPS, `_headers`, and that `https://www.kylecesmat.com/` still 301s to the apex.
5. GitHub → Settings → Pages: disable. Delete or archive the `gh-pages` branch (tip is 2020-08-12; it is the live origin until this cutover). Travis is already gone from this branch (`.travis.yml` removed).
6. `/currently` → `/now` is in `public/_redirects` and `astro.config.mjs`.

Do not flip orange-cloud or attach the custom domain until the `*.pages.dev` preview is approved.
