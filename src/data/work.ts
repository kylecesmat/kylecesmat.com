/**
 * The work history. This file is the source of truth: the timeline on the
 * home page, the resume at /resume and the Markdown at /llms.txt are all
 * rendered from it, so a content change is an edit here and nothing else.
 *
 * Each role is told twice. `impact` is the broad stroke, a sentence or two,
 * for the home page and /llms.txt. `detail` is the longer account, for the
 * resume. Titles, teams and dates follow the public LinkedIn profile, and
 * `detail` is its wording, moved into the past tense for roles that have
 * ended.
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
   * What the role came to, in a sentence or two of inline Markdown: links
   * (`[text](https://…)`), `_emphasis_` and `**strong**` are rendered;
   * anything else is shown as plain text.
   */
  impact?: string;
  /** The longer account for the resume, one list item each, same Markdown. */
  detail?: string[];
};

export type Company = Period & {
  name: string;
  /** For /llms.txt and the structured data; link it in `summary` to show it. */
  url?: string;
  /** Path under public/ of a mark shown before the name. Optional. */
  logo?: string;
  /** A variant for the dark theme, when the light one does not read on it. */
  logoDark?: string;
  /**
   * What the company is, as a sentence of inline Markdown. Shown under the
   * name whether or not the row is open, so leave it out where the name
   * says enough.
   */
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
    entries: [
      {
        title: 'Senior Engineering Manager',
        subtitle: 'Agent Experience',
        start: '2026-08',
        end: 'present',
        impact: 'Lead the org that builds how Coinbase engineers work with agents.',
        detail: [
          'I lead Agent Experience (AI DevEx), the org that builds how Coinbase engineers work with agents: agent workstations, cloud sandboxes, model routing, and autonomous software delivery.',
        ],
      },
      {
        title: 'Engineering Manager',
        subtitle: 'Agent Experience',
        start: '2025-02',
        end: '2026-08',
        impact:
          'Founded the AI developer tooling team. Its tools pushed Coinbase past 3x developer productivity in a year and moved coding agents into the cloud, where they now account for [more than 15% of merged PRs](https://aws.amazon.com/blogs/machine-learning/its-safe-to-close-your-laptop-now-hosting-coding-agents-on-amazon-bedrock-agentcore/).',
        detail: [
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
        impact:
          'Led reliability, performance, and developer productivity for the Coinbase app and its 100M+ users.',
        detail: [
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
        impact: 'Led client performance and latency for advanced trading on Coinbase Prime.',
        detail: ['Client performance and latency lead.', 'Advanced trading for Coinbase Prime.'],
      },
    ],
  },
  {
    name: 'Formidable',
    url: 'https://nearform.com/',
    start: '2016-05',
    end: '2020-10',
    summary: 'A JavaScript consultancy, now part of [Nearform](https://nearform.com/).',
    entries: [
      {
        title: 'Engineering Manager + PHX Location Lead',
        start: '2018-11',
        end: '2020-10',
        impact: 'Opened the Phoenix office and hired 8 engineers.',
        detail: [
          'Planted the Phoenix office, hired 8 engineers, and helped define Formidable’s distributed work environment.',
        ],
      },
      {
        title: 'Senior Software Engineer',
        start: '2018-06',
        end: '2020-10',
        impact:
          'Led the team that built a realtime trading platform for Tagomi, later acquired by Coinbase.',
        detail: [
          'Architected a realtime advanced trading platform for Tagomi (acquired by Coinbase), a prime-broker cryptocurrency platform. Led a team of 6 engineers focused on a custom websocket framework, performance engineering, and complex UI.',
          'Created a large server-rendered app for a biosciences company using Lerna, custom Babel transpilation, and Node API services.',
          'Led a team of 8 to platform an e-commerce experience for MilliporeSigma using GraphQL, a custom pattern library, and static site generation.',
        ],
      },
      {
        title: 'Software Engineer III',
        start: '2016-05',
        end: '2018-06',
        impact: 'Consulted on UI-heavy greenfield apps, shared libraries, and release pipelines.',
        detail: [
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
      'A [dev shop](https://synapsestudios.com/) that works with startups, corporations, and large agencies to build advanced web apps.',
    entries: [
      {
        title: 'UI Engineer',
        impact: 'Designed client web apps and built their frontends.',
        detail: [
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
        impact: 'Built the career sites companies use to attract job seekers.',
        detail: [
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
