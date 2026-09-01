# Writing and talks

Writing is a list of MDX pillar stubs. Talks is a separate list with the Syntax.fm episode first, plus notes at `/talks/syntax-fm-944`.

## Sub-features

- `writing-index` lists pillar stubs at `/writing` with titles from MDX frontmatter.
- `writing-piece` opens a stub at `/writing/<id>` (heading is the piece title).
- `talks-index` lists talks at `/talks` with Syntax.fm first.
- `talk-notes` opens `/talks/syntax-fm-944` notes.

## How to get to it (user POV)

- Primary nav `writing` or home link `all writing`.
- Primary nav `talks` or home link `all talks`.
- A writing or talk title on the home page.

## Driving it with helpers

Preconditions:

- Preview is healthy (`helpers/doctor.sh`).
- Drive from `/` unless noted.

- **Open writing.** Choose link `writing` or `all writing`. Run `helpers/snapshot.sh http://127.0.0.1:${VERIFY_PORT:-4321}/writing writing-index`. Status `200`. Heading `writing`. At least one title link is present (stubs may say `draft`).
- **Open a piece.** Follow a writing title link (prefer the visible title, not a CSS selector). Snapshot that URL. Status `200`. The `<h1>` matches the link text.
- **Open talks.** Choose `talks` or `all talks`. Run `helpers/snapshot.sh http://127.0.0.1:${VERIFY_PORT:-4321}/talks talks-index`. Status `200`. First listed title is `Is Coinbase Really Writing Half Their Code With AI?` (episode name, not a metric assertion).
- **Open notes.** Follow that title to `/talks/syntax-fm-944`. Status `200`. Heading matches the talk title.
- **Proof.** Keep HTML, `aria.txt`, and screenshots for index + one piece + talk notes.

## Gotchas

- Writing stubs are placeholders; empty body is OK if the title heading renders.
- Do not require a public Syntax.fm URL; notes are on-site.
- `#944` is the episode id in the venue string — match the visible venue/title, do not parse it as a site KPI.
