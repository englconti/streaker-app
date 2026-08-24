import type { DateKey, Habit, StreakerData } from "./types";

const STORAGE_KEY = "streaker:v1";

export const EMPTY_DATA: StreakerData = { version: 1, habits: [] };

const isDateKey = (value: unknown): value is DateKey =>
  typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);

function toHabit(value: unknown): Habit | null {
  if (typeof value !== "object" || value === null) return null;

  const { id, name, createdAt, completions } = value as Record<string, unknown>;
  if (typeof id !== "string" || typeof name !== "string") return null;
  if (typeof createdAt !== "string") return null;

  return {
    id,
    name,
    createdAt,
    completions: Array.isArray(completions)
      ? completions.filter(isDateKey).sort()
      : [],
  };
}

/** Never throws: anything unreadable comes back as empty data. */
export function parseData(raw: string | null): StreakerData {
  if (!raw) return EMPTY_DATA;

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return EMPTY_DATA;
  }

  if (typeof parsed !== "object" || parsed === null) return EMPTY_DATA;
  const { habits } = parsed as Record<string, unknown>;
  if (!Array.isArray(habits)) return EMPTY_DATA;

  return { version: 1, habits: habits.map(toHabit).filter((h) => h !== null) };
}

export function loadData(): StreakerData {
  try {
    return parseData(window.localStorage.getItem(STORAGE_KEY));
  } catch {
    return EMPTY_DATA;
  }
}

export function saveHabits(habits: Habit[]): void {
  const data: StreakerData = { version: 1, habits };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full or blocked (private mode). The session keeps working.
  }
}
