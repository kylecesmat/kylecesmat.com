/**
 * Facts about the site that more than one file needs. The canonical origin
 * itself lives in astro.config.mjs (`site`).
 */
export const SITE_NAME = 'Kyle Cesmat';

/** The monospace mark in the header bar, shown as `<kc>`. */
export const SITE_MARK = 'kc';

export const SITE_TITLE = 'Kyle Cesmat — AI developer platforms and agent experience';

/** Third person, for search results, link previews and /llms.txt. */
export const SITE_DESCRIPTION =
  'Kyle Cesmat builds platforms that make engineers faster, lately with AI agents. He is a Senior Engineering Manager at Coinbase, where he founded the Agent Experience org. Denver, CO.';

/**
 * The introduction, first person, as inline Markdown. It leads with the work
 * rather than the title, so it still reads true after a change of role. The
 * page and /llms.txt both render these three strings.
 */
export const INTRO = {
  lede: 'I build platforms that make engineers faster, lately with AI agents.',
  work: 'I’m a Senior Engineering Manager at **Coinbase**, where I founded the Agent Experience org: the team behind the agent workstations, cloud sandboxes, and autonomous workflows our engineers ship with. Before that I worked on trading systems and app infrastructure, and I still care most about the boring layer that makes the flashy stuff work.',
  life: 'Off the clock: Denver, a 1920s brick house that always needs something, a garden, a pottery wheel, two e-bikes, and a camper van.',
};

export const CONTACT_EMAIL = 'kylecesmat@gmail.com';

export const SOURCE_URL = 'https://github.com/kylecesmat/kylecesmat.com';

export type ProfileName = 'GitHub' | 'LinkedIn' | 'X';

/**
 * Profiles elsewhere, in the order the Connect section lists them. The same
 * URLs are the `sameAs` links in the page's structured data.
 */
export const PROFILES: { name: ProfileName; handle: string; url: string }[] = [
  { name: 'GitHub', handle: '@kylecesmat', url: 'https://github.com/kylecesmat' },
  { name: 'LinkedIn', handle: '/kylecesmat', url: 'https://www.linkedin.com/in/kylecesmat' },
  { name: 'X', handle: '@kylecesmat', url: 'https://x.com/kylecesmat' },
];
