# Build and headers

A production static build writes `dist/` with HTML plus `robots.txt`, sitemap, and Cloudflare `_headers`. CI is build-only (no deploy).

## Sub-features

- `build-ok` — `npm run build` exits 0.
- `robots` — `dist/robots.txt` exists and allows crawlers, pointing at the sitemap.
- `sitemap` — `dist/sitemap-index.xml` exists.
- `headers` — `dist/_headers` exists (security headers for when the hostname is later proxied).

## How to get to it (user POV)

- A visitor never sees this directly. Authors run `npm run build` or CI `Build`. Preview serves the same `dist/` via `astro preview`.

## Driving it with helpers

Preconditions:

- Node >=22. This feature does **not** require a running preview if you only inspect `dist/`. For a served proof, run `helpers/launch.sh` first (it builds).

- **Build.** From repo root: `npm run build`. Exit code `0`. Directory `dist/` exists.
- **Robots.** `test -f dist/robots.txt`. File contains `User-agent: *` and a `Sitemap:` line. Do not require production DNS to resolve.
- **Sitemap.** `test -f dist/sitemap-index.xml`.
- **Headers.** `test -f dist/_headers`. File mentions `X-Content-Type-Options` (and typically `Referrer-Policy`).
- **Optional serve check.** After launch, `curl -sI http://127.0.0.1:${VERIFY_PORT:-4321}/robots.txt` is 200.
- **Proof.** Copy those three files (or `ls -l` output) into `evidence/$RUN_ID/` as `robots.txt`, `sitemap-index.xml`, `_headers`. Cleanup must not delete `evidence/`. Do not delete `dist/` in cleanup (build output is not proof; the copies in `evidence/` are).

## Gotchas

- CI must stay build-only. A passing build is not permission to attach a custom domain or orange-cloud.
- `_headers` apply on Cloudflare when the hostname is proxied; absence of `cf-ray` on today’s live GitHub Pages origin is expected.
- `npm run check` (`astro check`) is useful but not a substitute for the `dist/` artifact checks.
