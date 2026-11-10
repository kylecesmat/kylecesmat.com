import type { Month } from './work';

/**
 * Writing, podcasts, talks and press. Rendered on the page and into
 * /llms.txt from this one list, newest first.
 */
export type Piece = {
  title: string;
  /** Where the piece (or its slides) lives; the title is plain text without one. */
  url?: string;
  /** The publication, show or event, as it should read on the page. */
  venue: string;
  date: Month;
  /**
   * `article`: written or co-written. `podcast`: a guest appearance.
   * `talk`: given in person. `press`: someone else's piece that quotes or
   * features the work.
   */
  kind: 'article' | 'podcast' | 'talk' | 'press';
};

/** The word shown next to each piece; the page uses no icons for this. */
export const KIND_LABEL: Record<Piece['kind'], string> = {
  article: 'Article',
  podcast: 'Podcast',
  talk: 'Talk',
  press: 'Press',
};

export const talks: Piece[] = [
  {
    title: 'How Coinbase cut AI inference costs by half while tokens went up',
    url: 'https://podcasts.apple.com/us/podcast/how-coinbase-cut-ai-inference-costs-by-half-while-tokens/id1884669036?i=1000777609554',
    venue: 'AI Impact',
    date: '2026-07',
    kind: 'podcast',
  },
  {
    title: 'Coinbase reduces time from idea to production by 90% with Cursor',
    url: 'https://cursor.com/blog/coinbase',
    venue: 'Cursor customer story',
    date: '2026-06',
    kind: 'press',
  },
  {
    title: 'It’s safe to close your laptop now: Hosting coding agents on Amazon Bedrock AgentCore',
    url: 'https://aws.amazon.com/blogs/machine-learning/its-safe-to-close-your-laptop-now-hosting-coding-agents-on-amazon-bedrock-agentcore/',
    venue: 'AWS Machine Learning Blog',
    date: '2026-06',
    kind: 'press',
  },
  {
    title: 'Is Coinbase Really Writing Half Their Code With AI?',
    url: 'https://syntax.fm/show/944/is-coinbase-really-writing-half-their-code-with-ai',
    venue: 'Syntax #944',
    date: '2025-10',
    kind: 'podcast',
  },
  {
    title: 'Tools for Developer Productivity at Coinbase',
    url: 'https://www.coinbase.com/blog/Tools-for-Developer-Productivity-at-Coinbase',
    venue: 'Coinbase Blog, with Chitra Venkatramani',
    date: '2025-08',
    kind: 'article',
  },
  {
    title: 'Our Newest Office is Now Open In Phoenix/Tempe',
    url: 'https://nearform.com/digital-community/tempe-phoenix/',
    venue: 'Formidable Blog',
    date: '2020-01',
    kind: 'article',
  },
  {
    title: 'Placing Radium Into Maintenance Mode',
    url: 'https://nearform.com/digital-community/radium-maintenance/',
    venue: 'Formidable Blog',
    date: '2019-06',
    kind: 'article',
  },
  {
    title: 'Realtime Data With Hooks',
    url: 'https://github.com/kylecesmat/phxreact-realtime-hooks',
    venue: 'PHX ReactJS Meetup',
    date: '2019-02',
    kind: 'talk',
  },
  {
    title: 'Introduction to Svelte',
    venue: 'PhoenixJS Meetup',
    date: '2019-01',
    kind: 'talk',
  },
  {
    title: 'Questionable Decisions w/ React.Context',
    url: 'https://github.com/kylecesmat/phxreact-context-may-2018',
    venue: 'PHX ReactJS Meetup',
    date: '2018-05',
    kind: 'talk',
  },
  {
    title: 'Progressive Webapps With ReactJS',
    url: 'https://github.com/kylecesmat/phxreactjs-progressive-webapps',
    venue: 'PHX ReactJS Meetup',
    date: '2017-12',
    kind: 'talk',
  },
];
