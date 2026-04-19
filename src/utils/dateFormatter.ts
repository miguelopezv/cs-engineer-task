const utcDateFormatter = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

export function formatDateUtc(value: string | number | Date): string {
  return utcDateFormatter.format(new Date(value));
}
