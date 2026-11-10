/**
 * The work history. This file is the source of truth: the timeline on the
 * page and the Markdown at /llms.txt are both rendered from it, so a content
 * change is an edit here and nothing else.
 *
 * Titles, teams and dates follow the public LinkedIn profile; the bullets are
 * its wording, moved into the past tense for roles that have ended.
 */

/** A month, written `YYYY-MM`. */
export type Month = string;

/**
 * When something ran. Either end may be left out when it is not known: only
 * what is written here is shown, so nothing on the page is a guess.
 */
export type Period = {
  start?: Month;
  end?: Month | 'present';
};

/** One row inside a company's panel: a role, newest first. */
export type Entry = Period & {
  title: string;
  /** The line in the accent colour under the title: the team or org. */
  subtitle?: string;
  /**
   * One bullet per item, each a short paragraph of Markdown. Inline links
   * (`[text](https://…)`), `_emphasis_` and `**strong**` are rendered;
   * anything else is shown as plain text.
   */
  bullets?: string[];
};

export type Company = Period & {
  name: string;
  url?: string;
  /** Path under public/ of a mark shown before the name. Optional. */
  logo?: string;
  /** A variant for the dark theme, when the light one does not read on it. */
  logoDark?: string;
  /** A sentence of inline Markdown shown at the top of the panel. */
  summary?: string;
  /**
   * Leave an entry's dates out when it is the only role and ran the whole
   * time, so the same range is not printed twice.
   */
  entries: Entry[];
};

/** Newest first; the first company is the one open when the page loads. */
export const companies: Company[] = [
  {
    name: 'Coinbase',
    url: 'https://www.coinbase.com/',
    start: '2020-10',
    end: 'present',
    summary:
      'Senior engineer on Prime trading, then staff engineer and manager on app infrastructure, then founder of the AI developer tooling org.',
    entries: [
      {
        title: 'Senior Engineering Manager',
        subtitle: 'Agent Experience',
        start: '2026-08',
        end: 'present',
        bullets: [
          'I lead Agent Experience (AI DevEx), the org that builds how Coinbase engineers work with agents: agent workstations, cloud sandboxes, model routing, and autonomous software delivery.',
        ],
      },
      {
        title: 'Engineering Manager',
        subtitle: 'Agent Experience',
        start: '2025-02',
        end: '2026-08',
        bullets: [
          'Founded the AI developer tooling team in June 2025 and grew it into the Agent Experience org.',
          'Built and integrated the tools that pushed Coinbase to more than 3x its developer productivity in a year.',
          'Moved coding agents off laptops and into cloud sandboxes, where [more than 15% of merged PRs](https://aws.amazon.com/blogs/machine-learning/its-safe-to-close-your-laptop-now-hosting-coding-agents-on-amazon-bedrock-agentcore/) are now attributed to cloud agents.',
        ],
      },
      {
        title: 'Staff Software Engineer + Engineering Manager',
        subtitle: 'App Infra',
        start: '2022-08',
        end: '2025-02',
        bullets: [
          'Engineering lead and EM of App Infra, a frontend-focused team delivering mobile and web platform reliability and performance for the Coinbase app (100M+ users worldwide).',
          'Drastically decreased error cases across the app by improving attribution and observability, and by enforcing guardrails across the Retail org.',
          'Scaled developer productivity with advanced build systems, AI-enabled PR reviews, OTA release pipelines, and CI tooling.',
          'Improved P95 rendering and startup performance on the iOS and Android apps.',
          'Instrumented and improved CUJ latency and optimized client data loading, so Coinbase stays resilient and fast during peak market activity.',
        ],
      },
      {
        title: 'Senior Software Engineer',
        subtitle: 'Prime Trading Experience',
        start: '2020-10',
        end: '2022-07',
        bullets: ['Client performance and latency lead.', 'Advanced trading for Coinbase Prime.'],
      },
    ],
  },
  {
    name: 'Formidable',
    url: 'https://nearform.com/',
    start: '2016-05',
    end: '2020-10',
    summary: 'A JavaScript consultancy, now part of Nearform.',
    entries: [
      {
        title: 'Engineering Manager + PHX Location Lead',
        start: '2018-11',
        end: '2020-10',
        bullets: [
          'Planted the Phoenix office, hired 8 engineers, and helped define Formidable’s distributed work environment.',
          'Made sure projects were properly scoped, staffed, and executed, and that my team of engineers was empowered and supported to do their best work.',
        ],
      },
      {
        title: 'Senior Software Engineer',
        start: '2018-06',
        end: '2020-10',
        bullets: [
          'Architected a realtime advanced trading platform for Tagomi (acquired by Coinbase), a prime-broker cryptocurrency platform. Led a team of 6 engineers focused on a custom websocket framework, performance engineering, and complex UI.',
          'Created a large server-rendered app for a biosciences company using Lerna, custom Babel transpilation, and Node API services.',
          'Led a team of 8 to platform an e-commerce experience for MilliporeSigma using GraphQL, a custom pattern library, and static site generation.',
        ],
      },
      {
        title: 'Software Engineer III',
        start: '2016-05',
        end: '2018-06',
        bullets: [
          'Consulted across a wide spectrum: building UI-intensive greenfield applications, helping teams organize and scale their development process, architecting reusable code and modules, and building release pipelines.',
          'A user-event-driven mapping dashboard using Mapbox, redux-saga, and Flow.',
          'Reusable UI and Node service libraries for Ookla/Speedtest.',
          'Data-driven SVG gauges and animations for a healthcare analytics startup.',
        ],
      },
    ],
  },
  {
    name: 'Synapse Studios',
    url: 'https://synapsestudios.com/',
    start: '2015-01',
    end: '2016-05',
    summary:
      'A dev shop that works with startups, corporations, and large agencies to build advanced web apps.',
    entries: [
      {
        title: 'UI Engineer',
        bullets: [
          'Designed interfaces that promote intuitive interaction, usability, and comprehension of our clients’ web apps, and developed the designs into functioning frontend code.',
        ],
      },
    ],
  },
  {
    name: 'Recruiting.com',
    start: '2014-02',
    end: '2015-01',
    entries: [
      {
        title: 'Web Developer',
        bullets: [
          'Part of the sites team that designed and developed the career sites companies use to attract job seekers. Also maintained and improved the Jobing.com platform.',
        ],
      },
    ],
  },
];

/** Years only: that is all the public record gives. */
export type Education = {
  school: string;
  url?: string;
  degree: string;
  startYear: number;
  endYear: number;
};

export const education: Education[] = [
  {
    school: 'Arizona State University',
    url: 'https://www.asu.edu/',
    degree: 'BS, Communication & Digital Culture',
    startYear: 2009,
    endYear: 2013,
  },
];
