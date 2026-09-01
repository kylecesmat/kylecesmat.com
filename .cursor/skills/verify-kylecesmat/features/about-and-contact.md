# About and contact

About is the press kit: qualitative bio, ways I can help, and contact links. Contact is a short page with the same email and LinkedIn.

## Sub-features

- `about-bio` shows the qualitative Agent Experience bio (no org-size or enablement figures).
- `about-help` shows `Ways I can help` and the governed-leverage paragraph.
- `about-contact` lists `kylecesmat@gmail.com` and `LinkedIn`.
- `contact-page` repeats email and LinkedIn at `/contact`.

## How to get to it (user POV)

- Primary nav `about`.
- Primary nav `contact`.
- Home section `contact` mailto / LinkedIn (same destinations).

## Driving it with helpers

Preconditions:

- Preview is healthy (`helpers/doctor.sh`).

- **Open about.** Choose nav link `about`. Run `helpers/snapshot.sh http://127.0.0.1:${VERIFY_PORT:-4321}/about about`. Status `200`. Heading `About`. Body includes `Senior Engineering Manager at Coinbase leading Agent Experience` and `Ways I can help`. Fail if the bio contains metric patterns (`0→`, `2,200`, enablement `%`).
- **Confirm help.** Paragraph starting `I help engineering organizations turn AI coding tools into governed, measurable developer leverage`.
- **Confirm about contact.** Links `kylecesmat@gmail.com` and `LinkedIn`.
- **Open contact page.** Choose nav `contact`. Snapshot `/contact`. Status `200`. Same email and LinkedIn link names.
- **Proof.** Screenshots show `about` or `contact` current in nav (`aria-current="page"`).

## Gotchas

- About is MDX (`src/pages/about.mdx`); prove the rendered page, not the source file alone.
- LinkedIn is off-site; proving the href is enough — do not scrape LinkedIn.
- Do not “fix” a failed bio assertion by allowing numbers back onto the page.
