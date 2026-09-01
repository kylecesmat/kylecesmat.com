# kylecesmat.com verification map

Maintained source for proving user-facing behavior of the static Astro site. Read this index, then the matching feature file.

## Baseline preconditions

- Preview origin `http://127.0.0.1:${VERIFY_PORT:-4321}` started by `helpers/launch.sh` (build then `astro preview`).
- `helpers/doctor.sh` exits 0 (Node >=22, our PID owns the port, `/` is 200, locked qualitative hero is present).
- Never drive a foreign process on 4321.
- Never assert quantitative metrics (org size, enablement %, MCP counts, latency).
- Preview-only: do not treat production `kylecesmat.com` as the system under test.

## Driving conventions

- Start from `/` unless a feature lists another entry.
- Prefer link text and headings over CSS.
- Use `helpers/snapshot.sh` for HTTP + HTML + screenshot + `aria.txt`.
- Chrome: `/usr/bin/google-chrome-stable --headless=new --disable-gpu --no-sandbox`.
- Cleanup with `helpers/cleanup.sh`; evidence stays on disk.

## Proof and skip reporting

- Capture the URL fetched and the resulting status/HTML/screenshot.
- UI proof includes `aria.txt` and a screenshot with `Kyle Cesmat` visible.
- Record `RUN_ID` and feature id on every artifact.
- Do not report a skipped route as verified via a different URL.

## Feature entry contract

Each feature file: H1, one paragraph, then exactly four H2s — `Sub-features`, `How to get to it (user POV)`, `Driving it with helpers`, `Gotchas`.

## Features

- [Homepage hiring brief](./homepage-hiring-brief.md) — hero, trajectory, three qualitative proof blocks, writing/talks, contact.
- [Writing and talks](./writing-and-talks.md) — MDX writing stubs; Syntax.fm episode listed first.
- [About and contact](./about-and-contact.md) — press-kit bio, ways I can help, email and LinkedIn.
- [Now and archive](./now-and-archive.md) — `/now` stub; Formidable work demoted to `/archive`.
- [Build and headers](./build-and-headers.md) — `npm run build`; `dist` has robots, sitemap, `_headers`.
