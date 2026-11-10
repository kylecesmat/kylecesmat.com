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
 * Renders the inline Markdown used in the work history to HTML: links,
 * `_emphasis_` and `**strong**`, nested one inside another. Everything else
 * is escaped and shown as text, and a link whose URL is not http(s) or mailto
 * is shown as its text alone, so content can never inject markup or a
 * `javascript:` URL.
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
    } else if (!/^(https?:|mailto:)/i.test(url)) {
      html += inlineMarkdown(linkText);
    } else if (/^https?:/i.test(url)) {
      html += `<a href="${escapeHtml(url)}" class="${LINK_CLASS}" target="_blank" rel="noopener noreferrer">${inlineMarkdown(linkText)}<span class="sr-only"> (opens in new tab)</span></a>`;
    } else {
      html += `<a href="${escapeHtml(url)}" class="${LINK_CLASS}">${inlineMarkdown(linkText)}</a>`;
    }
  }
  return html + escapeHtml(source.slice(last));
}
