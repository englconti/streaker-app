import type { DateKey } from "./types";

const pad = (value: number) => String(value).padStart(2, "0");

/**
 * Formats a Date as a DateKey using its local calendar day.
 *
 * Deliberately not toISOString(): that reports the UTC day, which is already
 * tomorrow during the evening in any timezone behind UTC.
 */
export function todayKey(date: Date = new Date()): DateKey {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

/** Shifts a DateKey by whole days, rolling over months and years. */
export function addDays(key: DateKey, delta: number): DateKey {
  const [year, month, day] = key.split("-").map(Number);
  return todayKey(new Date(year, month - 1, day + delta));
}

/** The n days ending on endKey, oldest first. */
export function lastNDays(endKey: DateKey, n: number): DateKey[] {
  const days: DateKey[] = [];
  for (let offset = n - 1; offset >= 0; offset--) {
    days.push(addDays(endKey, -offset));
  }
  return days;
}
