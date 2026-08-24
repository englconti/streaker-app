import { addDays } from "./dates";
import type { DateKey } from "./types";

/**
 * Days completed in an unbroken run ending today or yesterday.
 *
 * Anchoring on yesterday when today is not checked off yet is intentional: the
 * streak stays whole for the whole day, so the app never pressures the user
 * into marking something early.
 */
export function currentStreak(completions: DateKey[], today: DateKey): number {
  const done = new Set(completions);
  let cursor = done.has(today) ? today : addDays(today, -1);

  let count = 0;
  while (done.has(cursor)) {
    count++;
    cursor = addDays(cursor, -1);
  }
  return count;
}

/** The longest unbroken run anywhere in the history. */
export function bestStreak(completions: DateKey[]): number {
  const days = [...new Set(completions)].sort();

  let best = 0;
  let run = 0;
  for (let i = 0; i < days.length; i++) {
    run = i > 0 && days[i] === addDays(days[i - 1], 1) ? run + 1 : 1;
    best = Math.max(best, run);
  }
  return best;
}
