# Homepage hiring brief

The home page is a short hiring brief: locked qualitative headline and subhead, a one-line trajectory, three restrained proof blocks, writing and talks lists, then contact.

## Sub-features

- `hero-lock` shows heading `Building Agent Experience for enterprise engineering orgs` and the qualitative subhead (no `headlinePick` placeholder).
- `trajectory` shows `Coinbase SEM · formerly Formidable`.
- `proof-blocks` shows three headings: `Agent Experience`, `Governed agent platform`, `Platform / App Infra`, each with a qualitative paragraph (no numeric KPIs).
- `writing-tease` lists writing titles and an `all writing` link.
- `talks-tease` lists talks with Syntax.fm first and an `all talks` link.
- `contact-cta` shows `kylecesmat@gmail.com` and `LinkedIn`.

## How to get to it (user POV)

- Open `/` (wordmark `Kyle Cesmat` also returns here).
- Land from any primary nav item by choosing the wordmark.

## Driving it with helpers

Preconditions:

- `helpers/launch.sh` has started preview.
- `helpers/doctor.sh` exits 0.

- **Open home.** Fetch `/`. Run `helpers/snapshot.sh http://127.0.0.1:${VERIFY_PORT:-4321}/ homepage`. `status.txt` is `200`. `aria.txt` and `homepage.html` include the locked `<h1>` text `Building Agent Experience for enterprise engineering orgs`.
- **Confirm trajectory.** In the same HTML, the line `Coinbase SEM · formerly Formidable` is present.
- **Confirm proof.** Headings `Agent Experience`, `Governed agent platform`, and `Platform / App Infra` appear. Bodies are prose. Fail the proof if the HTML contains metric patterns such as `0→`, `%→`, or `MCP servers`.
- **Confirm writing and talks.** A heading `writing` and a link `all writing`; a heading `talks` and a link `all talks`. Syntax.fm talk title is listed (match the visible title string; do not assert a productivity percentage).
- **Confirm contact.** Links named `kylecesmat@gmail.com` (mailto) and `LinkedIn`.
- **Proof.** `homepage.png` shows the wordmark `Kyle Cesmat` and the locked hero heading. Keep artifacts under `evidence/$RUN_ID/`.

## Gotchas

- A 200 with a placeholder hero (`[TODO: headline`) is a failed proof, not a pass.
- Do not use production `https://kylecesmat.com` as the origin.
- Nav labels are lowercase (`about`, `writing`, `talks`, `contact`).
- Proof copy is qualitative. If a future edit reintroduces counts or percents, fail — do not “update the assertion” to match metrics.
