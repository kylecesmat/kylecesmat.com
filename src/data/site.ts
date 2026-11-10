/**
 * Facts about the site that more than one file needs. The canonical origin
 * itself lives in astro.config.mjs (`site`).
 */
export const SITE_NAME = 'Kyle Cesmat';

export const SITE_TITLE = 'Kyle Cesmat — Agentic systems that make teams faster';

/** Third person, for search results, link previews and /llms.txt. */
export const SITE_DESCRIPTION =
  'Kyle Cesmat builds agentic systems that make teams faster. He is building the Agent Platform at Coinbase, and before that led teams in DevX, app infrastructure, and trading systems. Denver, CO.';

/**
 * The introduction, first person, as inline Markdown: the line in large type,
 * then one paragraph in two halves, the work and the rest of life. The home
 * page and /llms.txt show all three strings.
 * A link that starts with `/` stays on this site.
 */
export const INTRO = {
  lede: 'I build agentic systems that make teams faster.',
  work: 'I’m currently focused on building the Agent Platform at **Coinbase**. Before this I led teams in DevX, app infrastructure, and trading systems.',
  life: 'I call Denver, CO home and get to bike, ski, and fish year-round with my family. See what else I’m [currently](/current) into.',
};

export const CONTACT_EMAIL = 'kylecesmat@gmail.com';

export const SOURCE_URL = 'https://github.com/kylecesmat/kylecesmat.com';

export type ProfileName = 'Twitter' | 'GitHub' | 'LinkedIn';

/**
 * Profiles elsewhere, in the order the header and footer list them. The same
 * URLs are the `sameAs` links in the page's structured data.
 */
export const PROFILES: { name: ProfileName; url: string }[] = [
  { name: 'Twitter', url: 'https://x.com/kylecesmat' },
  { name: 'GitHub', url: 'https://github.com/kylecesmat' },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/kylecesmat' },
];

export type SiteLink = { label: string; url: string };

/**
 * The small links at the top left of every page and again in the footer:
 * the profiles, then email.
 */
export const LINKS: SiteLink[] = [
  ...PROFILES.map(({ name, url }) => ({ label: name.toLowerCase(), url })),
  { label: 'email', url: `mailto:${CONTACT_EMAIL}` },
];

/**
 * The footer's map legend. These are the city's published coordinates (the
 * point the name "Denver" is pinned to on a map), not an address.
 */
export const PLACE = {
  name: 'Denver, Colorado',
  short: 'Denver, CO',
  latitude: 39.7392,
  longitude: -104.9903,
  elevation: '5,280 ft',
  timeZone: 'America/Denver',
};
