export type RedactableMetric = {
  label: string;
  /** Resume-backed placeholder. Kyle can drop it without a layout change. */
  redactable?: boolean;
};

export type ProofCardData = {
  id: string;
  title: string;
  summary?: string;
  metrics: RedactableMetric[];
  href: string;
  linkLabel: string;
};

/** One-paragraph teaser slots. Metrics are placeholders Kyle can redact. */
export const proofTeaser = {
  role: 'SEM, Agent Experience @ Coinbase',
  slots: [
    { label: 'founded 0→15 across 3 pods', redactable: true },
    { label: 'AI strategy for 2,200+ eng', redactable: true },
    { label: 'enablement 0%→94%', redactable: true },
    { label: 'Syntax.fm', redactable: false },
  ] satisfies RedactableMetric[],
};

export const proofCards: ProofCardData[] = [
  {
    id: 'agent-experience-org',
    title: 'Agent Experience org',
    metrics: [
      { label: '0→15', redactable: true },
      { label: '>30% code change via integrated SDLC tools', redactable: true },
      { label: 'company AI eng strategy', redactable: true },
    ],
    href: '/writing/ax-as-product',
    linkLabel: '[TODO: case link]',
  },
  {
    id: 'governed-agent-platform',
    title: 'Governed agent platform',
    summary: 'Agents, harnesses, sandboxes, MCPs, and skills',
    metrics: [
      { label: '~170 MCP servers', redactable: true },
      { label: '~4.8k users', redactable: true },
      { label: '~16k runs/day', redactable: true },
      { label: 'AI review 100% PRs', redactable: true },
      { label: 'merge ~14h→~3.3h', redactable: true },
    ],
    href: '/writing/enterprise-cursor-ai-rollout',
    linkLabel: '[TODO: case link]',
  },
  {
    id: 'platform-app-infra',
    title: 'Platform / App Infra',
    summary: 'Retail Web + Mobile operational excellence',
    metrics: [
      { label: 'Code Red errors >98% down', redactable: true },
      { label: 'Buy Flow 26s→2.4s', redactable: true },
      { label: 'Hermes/Expo', redactable: true },
      { label: 'client SLOs', redactable: true },
    ],
    href: '/writing/paved-roads-codegen-load',
    linkLabel: '[TODO: case link]',
  },
];
