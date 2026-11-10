import { CURRENT_UPDATED, current } from '../data/current';
import { inspiration } from '../data/inspiration';
import { CONTACT_EMAIL, INTRO, PROFILES, SITE_DESCRIPTION, SITE_NAME } from '../data/site';
import { KIND_LABEL, talks } from '../data/talks';
import { companies, education, type Period } from '../data/work';
import { monthLabel, periodLabel } from './dates';
import { absoluteLinks } from './inline-markdown';

const dated = (period: Period) => {
  const label = periodLabel(period);
  return label ? ` (${label})` : '';
};

/**
 * The site as one Markdown document, for agents: served at /llms.txt and
 * /index.md and shown by the header's "agent" switch. Built from the same
 * data as the pages, so they cannot drift apart. It carries the home page
 * and /current in full.
 */
export function buildLlmsText(site: URL): string {
  const lines: string[] = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    'The home page is a short introduction, a work history in broad strokes, writing and talks, education, and sites used for inspiration. This document is that page and the "currently" page as Markdown, served at `/llms.txt` and `/index.md`.',
    '',
    '## About',
    '',
    INTRO.lede,
    '',
    absoluteLinks(`${INTRO.work} ${INTRO.life}`, site),
    '',
    '## Links',
    '',
    `- Site: ${site.href}`,
    `- Currently: ${new URL('/current', site).href}`,
    `- Email: ${CONTACT_EMAIL}`,
    ...PROFILES.map((profile) => `- ${profile.name}: ${profile.url}`),
    `- Sitemap: ${new URL('/sitemap-index.xml', site).href}`,
    '',
    `## Currently (updated ${monthLabel(CURRENT_UPDATED)})`,
    '',
    ...current.map((row) => `- ${row.label}: ${absoluteLinks(row.text, site)}`),
    '',
    '## Work Experience',
  ];

  for (const company of companies) {
    lines.push('', `### ${company.name}${dated(company)}`, '');
    if (company.url) lines.push(company.url, '');
    if (company.summary) lines.push(absoluteLinks(company.summary, site), '');
    for (const entry of company.entries) {
      const subtitle = entry.subtitle ? `, ${entry.subtitle}` : '';
      lines.push(`**${entry.title}**${subtitle}${dated(entry)}`, '');
      if (entry.impact) lines.push(absoluteLinks(entry.impact, site), '');
    }
    while (lines.at(-1) === '') lines.pop();
  }

  lines.push('', '## Writing & Talks', '');
  for (const piece of talks) {
    const title = piece.url ? `[${piece.title}](${piece.url})` : piece.title;
    lines.push(`- ${KIND_LABEL[piece.kind]}: ${title}, ${piece.venue}, ${monthLabel(piece.date)}`);
  }

  lines.push('', '## Education', '');
  for (const item of education) {
    lines.push(`- ${item.school}: ${item.degree}, ${item.startYear} – ${item.endYear}`);
  }

  lines.push('', '## Inspiration', '');
  for (const site of inspiration) {
    lines.push(`- [${site.name}](${site.url}): ${site.note}`);
  }

  return `${lines.join('\n')}\n`;
}
