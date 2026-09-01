export const hero = {
  headline: 'Building Agent Experience for enterprise engineering orgs',
  subhead:
    'SEM at Coinbase leading Agent Experience. I founded the AI developer tooling organization, set company-wide AI engineering strategy, and ship governed AI coding workflows that raise quality bars — not just autocomplete. Early Cursor enterprise adopter.',
} as const;

export const site = {
  name: 'Kyle Cesmat',
  url: 'https://kylecesmat.com',
  email: 'kylecesmat@gmail.com',
  linkedin: 'https://www.linkedin.com/in/kylecesmat',
  location: 'Denver, CO',
  jobTitle: 'Senior Engineering Manager, Agent Experience',
  worksFor: 'Coinbase',
  help: 'I help engineering organizations turn AI coding tools into governed, measurable developer leverage — platform, DX, and Agent Experience as a product, not a pile of vendor licenses.',
  bio: 'Kyle Cesmat is a Senior Engineering Manager at Coinbase leading Agent Experience — the organization that builds and integrates AI developer tooling across Coinbase engineering. He founded and scaled that team, set company-wide AI engineering strategy, and established a governed agent platform for coding agents, harnesses, sandboxes, MCPs, and skills. Earlier he led Retail App Infra for Web and Mobile platform, performance, and operational excellence. Previously an engineering manager and lead consultant at Formidable Labs. Has spoken publicly about AI coding at scale, including Syntax.fm. Based in Denver, CO.',
  description:
    'Senior Engineering Manager at Coinbase leading Agent Experience. Platform, developer experience, and governed AI coding workflows for enterprise engineering organizations.',
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
  { label: 'about', href: '/about' },
  { label: 'writing', href: '/writing' },
  { label: 'talks', href: '/talks' },
  { label: 'contact', href: '/contact' },
] as const;
