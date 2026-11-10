import type { Month } from './work';

/**
 * Talks and writing. Rendered on the page and into /llms.txt from this one
 * list, newest first.
 */
export type Piece = {
  title: string;
  /** Where the piece (or its slides) lives; the title is plain text without one. */
  url?: string;
  /** The publication, event or channel, as it should read on the page. */
  venue: string;
  date: Month;
  /** Talks and videos show a play mark; articles show a page. */
  kind: 'article' | 'talk' | 'video';
};

export const talks: Piece[] = [
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
