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
      'SEM at Coinbase leading Agent Experience. Brought Cursor in early; shipping AI coding workflows that raise quality bars, not just autocomplete.',
  },
  B: {
    headline: 'Platform and DX leadership for the AI coding era',
    subhead:
      'I lead teams that turn AI coding tools into governed, measurable developer productivity — from enterprise rollout to agent-native workflows.',
  },
  C: {
    headline: '[TODO: C — Head-of-X operator framing]',
    subhead:
      'Head of Platform / DX / AI Engineering. Coinbase SEM, Agent Experience. Early Cursor enterprise. Syntax.fm on AI coding at scale.',
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
    'Kyle Cesmat — Agent Experience, platform engineering, developer experience, and AI engineering leadership.',
  keywords:
    'Agent Experience, platform engineering, developer experience, DX, AI engineering leadership, Coinbase',
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/kylecesmat' },
    { label: 'GitHub', href: 'https://github.com/kylecesmat' },
    { label: 'Twitter', href: 'https://twitter.com/kylecesmat' },
    { label: 'Instagram', href: 'https://www.instagram.com/kylecesmat' },
    { label: 'Unsplash', href: 'https://unsplash.com/@kylecesmat' },
  ],
} as const;

export const writingPillars = [
  'enterprise-cursor-ai-rollout',
  'ax-as-product',
  'quality-bars',
  'paved-roads-codegen-load',
  'measuring-ai-productivity',
] as const;

export type WritingPillar = (typeof writingPillars)[number];

export const nav = [
  { label: 'Writing', href: '/writing' },
  { label: 'Talks', href: '/talks' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;
