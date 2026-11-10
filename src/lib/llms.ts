import { CONTACT_EMAIL, PROFILES, SITE_DESCRIPTION, SITE_NAME } from '../data/site';
import { talks } from '../data/talks';
import { companies, type Period } from '../data/work';
import { monthLabel, periodLabel } from './dates';

const dated = (period: Period) => {
  const label = periodLabel(period);
  return label ? ` (${label})` : '';
};

/**
 * The whole site as one Markdown document, for agents: served at /llms.txt
 * and /index.md and shown by the header's "agent" switch. Built from the
 * same data as the page, so the two cannot drift apart.
 */
export function buildLlmsText(site: URL): string {
  const lines: string[] = [
    `# ${SITE_NAME}`,
    '',
    `> ${SITE_DESCRIPTION}`,
    '',
    'The site is one page: a short introduction, a work history, talks, and ways to get in touch. This document is all of it as Markdown, served at `/llms.txt` and `/index.md`.',
    '',
    '## Links',
    '',
    `- Site: ${site.href}`,
    `- Email: ${CONTACT_EMAIL}`,
    ...PROFILES.map((profile) => `- ${profile.name}: ${profile.url}`),
    `- Sitemap: ${new URL('/sitemap-index.xml', site).href}`,
    '',
    '## Work Experience',
  ];

  for (const company of companies) {
    lines.push('', `### ${company.name}${dated(company)}`, '');
    if (company.url) lines.push(company.url, '');
    if (company.summary) lines.push(company.summary, '');
    for (const entry of company.entries) {
      const subtitle = entry.subtitle ? `, ${entry.subtitle}` : '';
      lines.push(`**${entry.title}**${subtitle}${dated(entry)}`, '');
      if (entry.bullets?.length) {
        lines.push(...entry.bullets.map((bullet) => `- ${bullet}`), '');
      }
    }
    while (lines.at(-1) === '') lines.pop();
  }

  lines.push('', '## Talks', '');
  for (const piece of talks) {
    const title = piece.url ? `[${piece.title}](${piece.url})` : piece.title;
    lines.push(`- ${title}, ${piece.venue}, ${monthLabel(piece.date)}`);
  }

  return `${lines.join('\n')}\n`;
}
