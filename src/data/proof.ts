export type ProofBlock = {
  id: string;
  title: string;
  body: string;
};

export const proof: ProofBlock[] = [
  {
    id: 'agent-experience',
    title: 'Agent Experience',
    body: 'Founded and lead Coinbase’s AI developer tooling organization across multiple pods. Own company-wide AI engineering strategy and enablement so engineers can productively adopt agentic workflows.',
  },
  {
    id: 'governed-agent-platform',
    title: 'Governed agent platform',
    body: 'Built the platform layer for coding agents, harnesses, sandboxes, MCPs, and skills — with compliance, risk, and change-management aligned to how Coinbase ships. Scaled AI-assisted review into the default PR path.',
  },
  {
    id: 'platform-app-infra',
    title: 'Platform / App Infra',
    body: 'Previously led Retail Web & Mobile infrastructure: operational excellence, CI/CD, performance, and foundational platform strategy through company-wide reliability and performance crises.',
  },
];
