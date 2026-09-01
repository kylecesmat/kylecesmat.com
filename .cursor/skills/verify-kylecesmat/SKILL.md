---
name: verify-kylecesmat
description: Prove kylecesmat.com — a static Astro personal site (browser). Use after homepage, IA, or content changes. Preview-only local/preview proof; never production go-live, custom domain, or orange-cloud.
---

# Verify kylecesmat.com

Static Astro 7 personal site. Users hit HTML in a browser. There is no app server, auth, or database. Verification proves a **local preview** of `dist/`. Do not attach `kylecesmat.com`, orange-cloud DNS, or retire GitHub Pages / `gh-pages`.

Hard constraints from Kyle:

1. **No quantitative metrics** in site copy or in assertions that require numbers on the page (no `0→15`, enablement %, MCP counts, latency). The Syntax.fm episode title is a talk name, not a KPI — match the heading text, do not treat it as a metric.
2. **Preview-only.** This skill never deploys, never flips DNS, never hits production as the system under test.
3. **Locked qualitative hero.** Homepage `<h1>` is `Building Agent Experience for enterprise engineering orgs`. If you still see `headlinePick` or `[TODO: headline`, stop and fix copy before driving.

Default origin: `http://127.0.0.1:4321`.

## Launch

Preferred (production-build proof):

```bash
npm install
npm run build
.cursor/skills/verify-kylecesmat/helpers/launch.sh
```

`launch.sh` stops this checkout’s leftover Astro preview **lockfile PID** (`.astro/preview.json`) if present, then runs `./node_modules/.bin/astro preview --host 127.0.0.1 --port ${VERIFY_PORT:-4321}` with `ASTRO_PREVIEW_BACKGROUND=1` so Cursor does not daemonize the server out from under the recorded PID. It writes PID/port to `.cursor/skills/verify-kylecesmat/.run/state` and waits until `/` returns 200 **and** that PID tree owns the port.

Do not `pkill astro`. Do not kill a listener that is not this checkout’s lockfile PID.

Faster loops (not a production-build proof): `npm run dev` on the same host/port, then write the PID you started into `.run/state` yourself. Prefer `launch.sh` for a recorded proof.

Teardown: `.cursor/skills/verify-kylecesmat/helpers/cleanup.sh` (kills the PID in `.run/state` and any listener it spawned). Never `pkill astro` / never kill by process name.

If port `4321` is already bound by a process this run did not start, **refuse**. Set `VERIFY_PORT` to an open port only for an instance **you** launch. Do not drive a foreign preview.

## Doctor

```bash
.cursor/skills/verify-kylecesmat/helpers/doctor.sh
```

Read-only. Passes only when all of these hold:

- Node major version `>= 22` (`node -v`, `.nvmrc` is `22`).
- `.run/state` exists and names a live PID.
- That PID (or a descendant) owns `LISTEN` on `VERIFY_PORT` / `127.0.0.1`.
- `GET /` returns **200**.
- Response body contains the locked hero string: `Building Agent Experience for enterprise engineering orgs`.
- Response body contains the trajectory line: `Coinbase SEM · formerly Formidable`.

Fail if the hero is still a placeholder (`headlinePick`, `[TODO: headline`). Do not assert counts, percents, or latency figures.

## Drive

Harness: **curl** (HTTP + HTML) plus **Google Chrome headless** for screenshots. Prefer visible **link text and headings** (`about`, `writing`, `talks`, `contact`, section `h2`s). Do not target CSS classes as the primary handle.

Stable routes (from `src/pages/`):

| User path | Handle |
| --- | --- |
| Home | `/` — heading `Building Agent Experience for enterprise engineering orgs` |
| About | nav link `about` → `/about` |
| Writing index | nav `writing` or home `all writing` → `/writing` |
| Talks index | nav `talks` or home `all talks` → `/talks` |
| Contact | nav `contact` → `/contact` |
| Now | footer `now` → `/now` (not in primary nav) |
| Archive | footer `archive` → `/archive` (not in primary nav) |

Chrome (this environment): `/usr/bin/google-chrome-stable`. Always pass `--headless=new --disable-gpu --no-sandbox`.

```bash
RUN_ID=homepage-$(date -u +%Y%m%dT%H%M%SZ)
export RUN_ID
.cursor/skills/verify-kylecesmat/helpers/snapshot.sh http://127.0.0.1:${VERIFY_PORT:-4321}/ homepage
```

Read `features/` before driving. For the first proof, drive **homepage-hiring-brief** only.

## Evidence

Directory: `.cursor/skills/verify-kylecesmat/evidence/<run-id>/` (gitignored except `.gitkeep`).

A homepage proof must include (stem `homepage`):

- `homepage.status.txt` — HTTP status for `/` (expect `200`)
- `homepage.html` — response body
- `homepage.aria.txt` — headings, `aria-label` / `aria-current`, and link names
- `homepage.png` — screenshot with the wordmark `Kyle Cesmat` and hero heading visible

Capture the **request** (URL) and the **resulting** HTML/screenshot together. Do not prove via reading `src/` instead of fetching the preview.

Cleanup must **not** delete this directory.

## Cleanup

```bash
.cursor/skills/verify-kylecesmat/helpers/cleanup.sh
```

Stops only the preview PID recorded in `.run/state`. Removes `.run/state`. Leaves `evidence/` untouched. Confirm evidence still exists at the named path after cleanup.

## Helpers

All under `.cursor/skills/verify-kylecesmat/helpers/`. Executable. Invocations:

| Script | Purpose |
| --- | --- |
| `launch.sh` | `npm install` + `npm run build` + `astro preview`; write `.run/state`; wait until `/` answers |
| `doctor.sh` | Node, PID owns port, GET `/` 200, locked hero + trajectory strings |
| `snapshot.sh <url> <stem>` | curl headers/body + Chrome screenshot + heading/link snapshot into `evidence/$RUN_ID/` |
| `cleanup.sh` | kill recorded PID only; keep evidence |

Optional env: `VERIFY_PORT` (default `4321`), `RUN_ID` (snapshot target folder name).
