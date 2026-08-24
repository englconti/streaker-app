import type { DateKey, Habit } from "./types";

export function createHabit(name: string, now: Date = new Date()): Habit {
  return {
    id: crypto.randomUUID(),
    name: name.trim(),
    createdAt: now.toISOString(),
    completions: [],
  };
}

/** Marks the day if it is not done yet, unmarks it if it is. */
export function toggleCompletion(habit: Habit, day: DateKey): Habit {
  const done = habit.completions.includes(day);
  const completions = done
    ? habit.completions.filter((entry) => entry !== day)
    : [...habit.completions, day].sort();

  return { ...habit, completions };
}

/** A blank name is treated as "never mind", not as an erased name. */
export function renameHabit(habit: Habit, name: string): Habit {
  const trimmed = name.trim();
  return trimmed ? { ...habit, name: trimmed } : habit;
}
