import type { Month, Period } from '../data/work';

const MONTH = /^(\d{4})-(0[1-9]|1[0-2])$/;

/** Pinned to UTC so no build machine's timezone can shift a month. */
const monthFormat = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
});

/** "Aug 2024". Throws on anything but `YYYY-MM`, so a typo fails the build. */
export function monthLabel(month: Month): string {
  const match = MONTH.exec(month);
  if (!match) throw new Error(`Expected a YYYY-MM month, got "${month}"`);
  return monthFormat.format(new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, 1)));
}

export type PeriodPart = { label: string; iso?: Month };

/** Each end of a period that is known. "Present" has no month, so no `iso`. */
export type PeriodView = { start?: PeriodPart; end?: PeriodPart };

export function periodView({ start, end }: Period): PeriodView {
  if (start && end && end !== 'present' && end < start) {
    throw new Error(`Period ends (${end}) before it starts (${start})`);
  }
  return {
    ...(start && { start: { label: monthLabel(start), iso: start } }),
    ...(end === 'present' && { end: { label: 'Present' } }),
    ...(end && end !== 'present' && { end: { label: monthLabel(end), iso: end } }),
  };
}

/**
 * "Jun 2021 – Dec 2023" as plain text. A period with one known end says
 * which end it is ("From Jun 2016", "Until Dec 2023") rather than reading as
 * a single month; "" when neither is known.
 */
export function periodLabel(period: Period): string {
  const { start, end } = periodView(period);
  if (start && end) return `${start.label} – ${end.label}`;
  if (start) return `From ${start.label}`;
  if (end) return end.iso ? `Until ${end.label}` : end.label;
  return '';
}
