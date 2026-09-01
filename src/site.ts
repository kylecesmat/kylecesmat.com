/**
 * Headline pick: `'placeholder' | 'A' | 'B' | 'C'`.
 * Kyle chooses later. Do not set A/B/C until he does.
 * Do not use “Software Engineer” as the headline.
 */
export type HeadlinePick = 'placeholder' | 'A' | 'B' | 'C';

export const headlinePick: HeadlinePick = 'placeholder';

/** Labeled options for Kyle. Not shown until `headlinePick` is A, B, or C. */
export const headlineOptions = {
  A: {
    headline: 'Building Agent Experience for enterprise engineering orgs',
    subhead:
      'SEM at Coinbase leading Agent Experience (~13). Brought Cursor in early; shipping AI coding workflows that raise quality bars, not just autocomplete.',
  },
  B: {
    headline: 'Platform and DX leadership for the AI coding era',
    subhead:
      'I lead teams that turn AI coding tools into governed, measurable developer productivity — from enterprise rollout to agent-native workflows.',
  },
  C: {
    headline: 'Head of Platform / DX / AI Engineering — operators who ship developer leverage',
    subhead:
      'Coinbase SEM, Agent Experience. Early Cursor enterprise adopter. Syntax.fm on AI coding at scale.',
  },
} as const;

const placeholderHero = {
  headline: '[TODO: headline — set headlinePick to A, B, or C in src/site.ts]',
  subhead: '[TODO: subhead]',
} as const;

export const hero =
  headlinePick === 'placeholder' ? placeholderHero : headlineOptions[headlinePick];

export const site = {
  name: 'Kyle Cesmat',
  url: 'https://kylecesmat.com',
  email: 'kylecesmat@gmail.com',
  linkedin: 'https://www.linkedin.com/in/kylecesmat',
  location: 'Denver, CO',
  jobTitle: 'Senior Engineering Manager, Agent Experience',
  worksFor: 'Coinbase',
  description:
    'Kyle Cesmat — Agent Experience, platform, and developer experience. Hiring-brief placeholder site.',
  proofTeaser:
    '[TODO: proof teaser — Coinbase SEM · Agent Experience · Cursor early enterprise · Syntax.fm]',
  aboutTeaser: '[TODO: about teaser]',
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kylecesmat' },
    { label: 'GitHub', href: 'https://github.com/kylecesmat' },
    { label: 'Twitter', href: 'https://twitter.com/kylecesmat' },
    { label: 'Instagram', href: 'https://www.instagram.com/kylecesmat' },
    { label: 'Unsplash', href: 'https://unsplash.com/@kylecesmat' },
  ],
} as const;

/** Three outcome cases. Bodies are placeholders — no invented metrics. */
export const selectedWork = [
  {
    title: 'Cursor enterprise rollout at Coinbase',
    body: '[TODO: case — Cursor enterprise rollout at Coinbase]',
  },
  {
    title: 'Agent Experience org',
    body: '[TODO: case — Agent Experience org (~13)]',
  },
  {
    title: 'App Infra / platform outcomes',
    body: '[TODO: case — App Infra / platform outcomes]',
  },
] as const;

export const writingPillars = [
  'enterprise-ai-coding-rollout',
  'agent-experience-as-product',
  'quality-bars-agent-era',
  'platform-dx-ai-doesnt-break',
  'measuring-ai-developer-productivity',
] as const;

export type WritingPillar = (typeof writingPillars)[number];

export const nav = [
  { label: 'Writing', href: '/writing' },
  { label: 'About', href: '/about' },
] as const;
