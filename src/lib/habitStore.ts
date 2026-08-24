import { loadData, saveHabits } from "./storage";
import type { Habit } from "./types";

/**
 * The habits live outside React so that reading them during hydration does not
 * need an effect: useSyncExternalStore serves the empty server snapshot first
 * and swaps in the stored habits once the browser takes over.
 */
let snapshot: Habit[] | null = null;
const SERVER_SNAPSHOT: Habit[] = [];
const listeners = new Set<() => void>();

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getSnapshot(): Habit[] {
  snapshot ??= loadData().habits;
  return snapshot;
}

export function getServerSnapshot(): Habit[] {
  return SERVER_SNAPSHOT;
}

export function setHabits(next: Habit[]): void {
  snapshot = next;
  saveHabits(next);
  listeners.forEach((listener) => listener());
}
