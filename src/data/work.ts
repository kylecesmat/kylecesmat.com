/**
 * The work history. This file is the source of truth: the timeline on the
 * home page and the Markdown at /llms.txt are both rendered from it, so a
 * content change is an edit here and nothing else.
 *
 * Each role is told in broad strokes: `impact` is a sentence or two on what
 * it came to. Titles, teams and dates follow the public LinkedIn profile.
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
      },
      {
        title: 'Engineering Manager',
        subtitle: 'Agent Experience',
        start: '2025-02',
        end: '2026-08',
        impact:
          'Founded the AI developer tooling team. Its tools pushed Coinbase past 3x developer productivity in a year and moved coding agents into the cloud, where they now account for [more than 15% of merged PRs](https://aws.amazon.com/blogs/machine-learning/its-safe-to-close-your-laptop-now-hosting-coding-agents-on-amazon-bedrock-agentcore/).',
      },
      {
        title: 'Staff Software Engineer + Engineering Manager',
        subtitle: 'App Infra',
        start: '2022-08',
        end: '2025-02',
        impact:
          'Led reliability, performance, and developer productivity for the Coinbase app and its 100M+ users.',
      },
      {
        title: 'Senior Software Engineer',
        subtitle: 'Prime Trading Experience',
        start: '2020-10',
        end: '2022-07',
        impact: 'Led client performance and latency for advanced trading on Coinbase Prime.',
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
      },
      {
        title: 'Senior Software Engineer',
        start: '2018-06',
        end: '2020-10',
        impact:
          'Led the team that built a realtime trading platform for Tagomi, later acquired by Coinbase.',
      },
      {
        title: 'Software Engineer III',
        start: '2016-05',
        end: '2018-06',
        impact: 'Consulted on UI-heavy greenfield apps, shared libraries, and release pipelines.',
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
