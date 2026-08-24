"use client";

import { useCallback, useSyncExternalStore } from "react";
import { todayKey } from "./dates";
import { getServerSnapshot, getSnapshot, setHabits, subscribe } from "./habitStore";
import { createHabit, renameHabit, toggleCompletion } from "./habits";
import type { DateKey } from "./types";

/** A tab left open overnight should notice the new day when it comes back. */
function subscribeToDay(onChange: () => void): () => void {
  window.addEventListener("focus", onChange);
  document.addEventListener("visibilitychange", onChange);
  return () => {
    window.removeEventListener("focus", onChange);
    document.removeEventListener("visibilitychange", onChange);
  };
}

export function useHabits() {
  const habits = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Empty on the server and during hydration, a real day once mounted.
  const today = useSyncExternalStore(
    subscribeToDay,
    () => todayKey(),
    () => "",
  );

  const addHabit = useCallback((name: string) => {
    if (!name.trim()) return;
    setHabits([...getSnapshot(), createHabit(name)]);
  }, []);

  const toggleDay = useCallback((id: string, day: DateKey) => {
    setHabits(
      getSnapshot().map((habit) =>
        habit.id === id ? toggleCompletion(habit, day) : habit,
      ),
    );
  }, []);

  const rename = useCallback((id: string, name: string) => {
    setHabits(
      getSnapshot().map((habit) =>
        habit.id === id ? renameHabit(habit, name) : habit,
      ),
    );
  }, []);

  return { habits, today, loaded: today !== "", addHabit, toggleDay, rename };
}
