/**
 * The work history. This file is the source of truth: the timeline on the
 * page and the Markdown at /llms.txt are both rendered from it, so a content
 * change is an edit here and nothing else.
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

/** One row inside a company's card: a role, a team, or a project. */
export type Entry = Period & {
  title: string;
  /** The line in the accent colour under the title: a job title or a stack. */
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
  /**
   * Path under public/ of the mark shown next to the name. Leave it out and
   * the company's initial is shown in its place.
   */
  logo?: string;
  /** A variant for the dark theme, when the light one does not read on it. */
  logoDark?: string;
  /** A sentence of inline Markdown shown at the top of the card. */
  summary?: string;
  entries: Entry[];
};

/** Newest first; the first company is the one open when the page loads. */
export const companies: Company[] = [
  {
    name: 'Coinbase',
    url: 'https://www.coinbase.com/',
    // TODO(kyle): start date, title, team and bullets. The summary is the
    // GitHub profile bio verbatim.
    end: 'present',
    summary: 'Focusing on JS, performance, and web architecture.',
    entries: [],
  },
  {
    name: 'Formidable',
    url: 'https://formidable.com/',
    // TODO(kyle): end date. Projects and dates below are from the 2020
    // version of this site.
    start: '2016-06',
    summary:
      'A handful of the projects I worked on as a consultant at Formidable. Often bound by an NDA, so details of the projects are light.',
    entries: [
      {
        title: 'Global eCommerce Re-Platforming',
        subtitle: 'NextJS / Graphql / Node',
        // TODO(kyle): end date; the 2020 site listed this as ongoing.
        start: '2019-10',
      },
      {
        title: 'Realtime Trading Terminal',
        subtitle: 'Websocket / Redux / Typescript',
        start: '2018-09',
        end: '2019-10',
      },
      {
        title: 'Corporate Software Licensing Tool',
        subtitle: 'Redux / Node / SQL / Lerna',
        start: '2018-05',
        end: '2018-09',
      },
      {
        title: 'Speedtest.net Data Visualization',
        subtitle: 'SVG / Redux / Mapbox',
        // TODO(kyle): dates; the 2020 site had "July 2018 - May 2017", which
        // ends before it starts.
      },
      {
        title: 'Medical Outcome Tracker',
        subtitle: 'Devops / SVG / Redux',
        start: '2017-03',
        end: '2018-07',
      },
      {
        title: 'Geospatial Analysis for Agriculture',
        subtitle: 'Redux / Mapbox / Flow',
        start: '2016-11',
        end: '2017-03',
      },
      {
        title: 'Speedtest Custom',
        subtitle: 'Websocket / Pattern Library / SQL',
        start: '2016-06',
        end: '2016-11',
      },
    ],
  },
];
