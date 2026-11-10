# Design lessons

What the redesign of this site settled, written so the next change keeps it. Each lesson says what to do, why, and where it lives in the code. The measurements are from the build that shipped; re-measure if the palette or the type changes.

The direction came from three places: Edward Tufte's rules for ink, the previous kylecesmat.com, and two sites used as reference ([tonigemayel.com/about](https://tonigemayel.com/about), [clearing.co](https://www.clearing.co/)). The full list of sites looked at is `INSPIRATION.md`. The owner's own instruction was plain language and data-ink over decorative formatting.

## Say it in one line, then stop

The page opens with what he does, in his words, before any title or employer. One sentence in large type, then one paragraph. The work history is one sentence per role; the longer account was cut rather than hidden.

- Write the point first. A reader who stops after the first line still knows the thing.
- Cut words that repeat the heading. "Work Experience" does not need an introduction.
- A fact earns its place by being specific. "Pushed Coinbase past 3x developer productivity in a year" stays; "helped drive impact" would not.
- Correct obvious typos in supplied copy and say so. Leave the voice alone.

## One source for every fact

Each fact is written once, in `src/data/`, and the pages, `/llms.txt` and the structured data all read from there. A second copy drifts the first time someone edits one of them.

- Content changes are edits to `site.ts`, `work.ts`, `talks.ts`, `current.ts` or `inspiration.ts` and nothing else.
- `/current` is the page meant to change often. It is a list of rows and a month, and the page renders whatever is there.
- Dates are `YYYY-MM`. A malformed one fails the build, which is cheaper than a wrong date on the page.
- Leave a date out when it is unknown. Nothing on the page is a guess, and an omitted end reads as "not stated", which is the truth.
- The text fields take inline Markdown and nothing richer. A link that starts with `/` stays on the site.

## One column, and one margin

The page is a single narrow column. Every date and label sits in the same margin column, so the eye runs down one line of dates and one line of names.

- The column is a container query on the section, not a viewport breakpoint, so the dates move into the margin when the section is wide enough and stack when it is not.
- Figures that are compared down a column are tabular and lining (`time`, `.figures`), so October lines up under August.
- Alignment is the structure. Rules, cards and icons were removed because the alignment already said what they said, and they cost ink.

## Ink has to work

Tufte's test, applied: every mark either carries information or it goes. What survived that test, and what did not.

- The timeline is a line and a dot per company. The dot is filled for the current role and open otherwise, which is one bit of information. A tenure bar drawn beside it was tried and removed: it repeated the dates.
- Colour is one hue, green, from the previous site, held in `--accent-hue` so the whole palette moves when it changes. Text uses `--primary`, dark enough to read. Marks use `--mark`, which only has to be seen beside text.
- The contour lines behind the header and in the footer are the one piece of decoration, carried over from the previous site at low opacity, and they identify the page. They are `aria-hidden` and dropped in print.
- A texture or a rule that sits behind text must fade out before the text, or it competes with it. The footer map is masked so the contours stop before the legend.

## A link looks like a link without coloured text

Reading a sentence should not depend on seeing a colour. Links keep the body colour, and a stroke under the words is the cue, which is why that stroke has to be visible on its own.

- The stroke is `--mark`, and it holds 3:1 against the page. That number was measured, not picked; the previous site's bright green missed it.
- The mark sits on the text, not on the padding around it. Padding exists to make the target big enough to tap, and underlining the padding looks like a mistake. `background-origin: content-box` does this, and `box-decoration-break: clone` gives each line of a wrapped link its own stroke.
- On paper, backgrounds do not print, so the stroke would vanish. Print adds a real underline, and writes an external link's address out after it.

## Hover answers the pointer and says nothing new

Every hover is a small, quick confirmation that the pointer hit something. None of them carries information, so a touch screen or a keyboard loses nothing.

- The set: the stroke sweeps in, a highlighter is drawn across the words, the other items in a list fall back, an arrow slides in after a title, a dot swells, the portrait leans, the footer map comes up.
- The sweep is anchored so it arrives from the left and leaves to the right, like a pen. Only the size is animated, not the position, which keeps it on the compositor.
- An arrow that appears must take no room, or the line shifts when it shows. Negative margin and a mask do that.
- Gate hover styles behind `@media (hover: hover)`. Otherwise the first tap on a phone sticks the hover on and the second tap follows the link.
- `prefers-reduced-motion` makes every transition instant and stops the one animation that loops. Write the reduced-motion rule with the same selector as the animation, or it loses on specificity and the animation keeps running.

## The footer is a place

The footer is the one part of the page asked to have character, so it is a map of where he is: the city's name, its published coordinates, its elevation and the local time, over the contour lines.

- Use the city's published point, and say so. Coordinates of a city are public; an address is not.
- The time is the time in Denver, computed in the browser from the timezone, not the visitor's clock with a label swapped on. Without JavaScript the clock is left out and the rest of the legend stays.
- The same links as the header, so the page does not grow a third place to find them.

## Small type, tall targets

The links at the top are small on purpose. The thing a thumb hits does not have to be the thing the eye reads.

- Put the visible mark on an element inside the link and the padding on the link itself, so the target can be tall while the underline stays under the words.
- 24px is the floor that was measured against. Bigger is better where the row has room; the floor is what gets checked.
- Below a certain width the bar wraps to two rows and stops being sticky. A sticky bar taller than a line eats the screen, and the links are in the footer anyway.

## Both themes, measured

Light and dark are one palette at two lightness ramps, swapped by a class on the root rather than by `prefers-color-scheme`, because the visitor can choose.

- Check contrast in both themes. The lowest text pair on the shipped build is 5.22:1 in the light theme and 6.31:1 in the dark, both above WCAG AA.
- Grayscale antialiasing in both themes. macOS otherwise draws light text on dark heavier than dark on light, and the switch looks like a change of weight.
- Anything that differs between themes is a token. A component that hard-codes a colour will be wrong in one of them.
- The toggle is a button with a name, and it remembers. The page renders correctly with no JavaScript and no saved choice.

## It has to print and it has to work without JavaScript

- Print drops the bar, the footer, the texture and the controls, sets the type in black on white, and lets the work history lay out in full. The home page prints as a document with the name and the addresses at the top.
- Closed sections stay in the DOM and are hidden with a data attribute, so they print and so they show with JavaScript off. `hidden` would fight the stylesheet.
- Anything a script fills in must have a state where the script never runs. The clock is omitted; the theme is the default; the sections are all readable.

## Build the animation where the minifier cannot fold it away

`animation-timeline` set the timeline's line to draw as it scrolled, and the production build killed it: the CSS minifier merged the property into the `animation` shorthand, which browsers then reject.

- Keep `animation-timeline` in its own rule, away from the `animation` shorthand.
- Check the production build, not the dev server. The dev server does not run the minifier, so this class of bug is invisible there.
- Prefer a CSS scroll timeline to a scroll listener. It runs off the main thread and needs no script.

## What was learned by looking

A change to the page was not called done from the code. The checks that caught real things:

- Screenshot the page at the widths it actually meets, including one narrower than any device you own. The header links wrapped at 320px and the resume subtitle broke awkwardly, neither visible at 390.
- Hover, then move the pointer away, and read the computed style back. A transition that eases out slowly will still be mid-flight if you measure too soon.
- Diff the built HTML against the deployed HTML. It catches a deploy that did not take, and a cache that is serving yesterday's page.
- Contrast and target size are numbers. Measure them across every page and both themes instead of trusting the token that was supposed to guarantee them.
- Read the page out loud in order: the name, the lede, the sections. Several of the cuts came from hearing a sentence say what the heading had just said.

## What this page refuses

- A second copy of the links, the dates or the bio. One of each.
- Icons in front of list items. The words are the list.
- A card around something that is already a section.
- Colour as the only signal. The stroke, the weight and the position carry it.
- Motion that conveys state. If it matters, it is there without the pointer.
- Content the owner did not supply. The page says what he does, where he is, and what he says he is into. It does not infer the rest.
