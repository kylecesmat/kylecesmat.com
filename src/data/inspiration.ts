/**
 * Personal sites used as reference, in the order they were brought in.
 * The home page and /llms.txt render this list. Why each one is here is
 * written up in INSPIRATION.md.
 */
export type InspirationSite = {
  name: string;
  url: string;
  /** One line on the site, shown under the name. */
  note: string;
};

export const inspiration: InspirationSite[] = [
  {
    name: 'Paul Stamatiou',
    url: 'https://paulstamatiou.com/',
    note: 'Design, writing, photos, and gear.',
  },
  {
    name: 'Michael Cohen',
    url: 'https://www.michaelcohen.io/',
    note: 'Work, writing, and talks on one page.',
  },
  {
    name: 'Toni Gemayel',
    url: 'https://tonigemayel.com/about',
    note: 'Where he is, and what he is into.',
  },
  {
    name: 'The Clearing Company',
    url: 'https://www.clearing.co/',
    note: 'A company site. Toni Gemayel is CEO.',
  },
  {
    name: 'Stefano J. Attardi',
    url: 'https://attardi.org/',
    note: 'Writing, and a short list of projects.',
  },
  {
    name: 'Nick Beattie',
    url: 'https://nickbytes.com/',
    note: 'Engineering at Coinbase, and a long list of links.',
  },
  {
    name: 'Nick Gavalas',
    url: 'https://ngavalas.com/',
    note: 'Developer infrastructure, written as one letter.',
  },
];
