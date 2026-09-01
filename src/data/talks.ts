export type Talk = {
  id: string;
  title: string;
  venue: string;
  featured?: boolean;
  href?: string;
  notesHref?: string;
  linkLabel?: string;
};

/** Structured talks list. Syntax.fm #944 stays first. */
export const talks: Talk[] = [
  {
    id: 'syntax-fm-944',
    title: 'Is Coinbase Really Writing Half Their Code With AI?',
    venue: 'Syntax.fm #944',
    featured: true,
    notesHref: '/talks/syntax-fm-944',
    linkLabel: '[TODO: episode link]',
  },
];
