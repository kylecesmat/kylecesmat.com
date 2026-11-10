const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
};

const escapeHtml = (text: string) => text.replace(/[&<>"']/g, (char) => ESCAPES[char]);

const LINK_CLASS = 'link-mark py-2 text-foreground';

const LINK = String.raw`\[([^\]]+)\]\(([^)\s]+)\)`;

// Emphasis may wrap a link, whose URL can itself contain underscores, and an
// underscore inside a word (snake_case) is not emphasis.
const TOKEN = new RegExp(
  String.raw`${LINK}|\*\*([^*]+)\*\*|(?<!\w)_((?:\[[^\]]+\]\([^)\s]+\)|[^_])+)_(?!\w)`,
  'g',
);

/**
 * A path on this site: one leading slash, and no backslash. `//host` and
 * `/\host` are not paths; `new URL` would turn the backslash form into a
 * protocol-relative URL.
 */
const INTERNAL = /^\/(?![/\\])[^\\]*$/;

/**
 * Renders the inline Markdown used in the content files to HTML: links,
 * `_emphasis_` and `**strong**`, nested one inside another. Everything else
 * is escaped and shown as text. A link may go to an http(s) or mailto URL or
 * to a path on this site (`/current`); any other target is shown as its text
 * alone, so content can never inject markup or a `javascript:` URL. Links to
 * other sites open in a new tab and say so.
 */
export function inlineMarkdown(source: string): string {
  let html = '';
  let last = 0;
  for (const match of source.matchAll(TOKEN)) {
    html += escapeHtml(source.slice(last, match.index));
    last = match.index + match[0].length;
    const [, linkText, url, strong, emphasis] = match;
    if (strong !== undefined) {
      html += `<strong>${inlineMarkdown(strong)}</strong>`;
    } else if (emphasis !== undefined) {
      html += `<em>${inlineMarkdown(emphasis)}</em>`;
    } else if (url.includes('\\')) {
      html += inlineMarkdown(linkText);
    } else if (/^https?:/i.test(url)) {
      html += `<a href="${escapeHtml(url)}" class="${LINK_CLASS}" target="_blank" rel="noopener noreferrer">${inlineMarkdown(linkText)}<span class="sr-only"> (opens in new tab)</span></a>`;
    } else if (/^mailto:/i.test(url) || INTERNAL.test(url)) {
      html += `<a href="${escapeHtml(url)}" class="${LINK_CLASS}">${inlineMarkdown(linkText)}</a>`;
    } else {
      html += inlineMarkdown(linkText);
    }
  }
  return html + escapeHtml(source.slice(last));
}

/**
 * The same source as Markdown for a document served on its own (/llms.txt):
 * paths on this site become full URLs, since a reader of that file has no
 * page to resolve them against.
 */
export function absoluteLinks(source: string, site: URL): string {
  return source.replace(new RegExp(LINK, 'g'), (whole, text: string, url: string) =>
    INTERNAL.test(url) ? `[${text}](${new URL(url, site).href})` : whole,
  );
}
