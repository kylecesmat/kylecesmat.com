/**
 * Facts about the site that more than one file needs. The canonical origin
 * itself lives in astro.config.mjs (`site`).
 */
export const SITE_NAME = 'Kyle Cesmat';

/** The monospace mark in the header bar, shown as `<kc>`. */
export const SITE_MARK = 'kc';

export const SITE_TITLE = 'Kyle Cesmat — Engineering at Coinbase';

export const SITE_DESCRIPTION =
  'Kyle Cesmat works in engineering at Coinbase, focusing on JavaScript, performance, and web architecture. Previously at Formidable. Denver, CO.';

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
