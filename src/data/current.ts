import type { Month } from './work';

/**
 * The /current page: what I am up to right now. Edit the rows and bump
 * `updated`; nothing else needs to change. /llms.txt carries the same rows.
 *
 * Each row is a short label and a sentence or two of inline Markdown (links,
 * `**strong**`, `_emphasis_`). Add a row by adding an object, for example
 * `{ label: 'Reading', text: '…' }`.
 */
export const CURRENT_UPDATED: Month = '2026-11';

export type CurrentRow = { label: string; text: string };

export const current: CurrentRow[] = [
  {
    label: 'Building',
    text: 'The Agent Platform at Coinbase: agent workstations, cloud sandboxes, model routing, and autonomous software delivery.',
  },
  {
    label: 'Located',
    text: 'Denver, CO.',
  },
  {
    label: 'Outside',
    text: 'Biking, skiing, and fishing year-round with my family.',
  },
  {
    label: 'Interests',
    text: 'Coffee, cooking, gardening, home projects, photography, and breweries.',
  },
  {
    label: 'At home',
    text: 'A 1920s brick house that always needs something, and a pottery wheel.',
  },
];
