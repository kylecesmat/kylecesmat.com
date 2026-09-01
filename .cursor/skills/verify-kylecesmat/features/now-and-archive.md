# Now and archive

`/now` is a dated-focus stub. `/archive` holds Formidable-era projects and meetup talks off the primary nav.

## Sub-features

- `now-stub` renders `/now` with heading `now` and placeholder focus/reading/location slots.
- `archive-demote` renders `/archive` with Formidable projects and meetup talks, not linked from primary nav.

## How to get to it (user POV)

- Footer link `now`.
- Footer link `archive`.
- Direct URL `/now` or `/archive`.
- Not listed in the primary nav (`about` / `writing` / `talks` / `contact`).

## Driving it with helpers

Preconditions:

- Preview is healthy (`helpers/doctor.sh`).

- **Confirm demotion.** Snapshot `/`. `aria.txt` primary nav (`aria-label="Primary"`) has `about`, `writing`, `talks`, `contact` and does **not** include `now` or `archive`. Footer does.
- **Open now.** Choose footer `now`. Run `helpers/snapshot.sh http://127.0.0.1:${VERIFY_PORT:-4321}/now now`. Status `200`. Heading `now`.
- **Open archive.** Choose footer `archive`. Snapshot `/archive`. Status `200`. Heading `archive`. Visible copy mentions Formidable and lists project titles (NDA-light).
- **Proof.** Keep HTML + screenshot for both routes plus the homepage nav snapshot that shows they are footer-only.

## Gotchas

- `/currently` redirects to `/` (legacy). Do not treat it as Now.
- Archive titles are historical names, not current hiring metrics.
- Placeholders on `/now` (`[TODO: now`) are expected until that copy is written.
