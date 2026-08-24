"use client";

/**
 * STREAKER never nags. By design this app has no notifications, no permission
 * prompts, no badges, no sounds, no red or alert colors for a missed day, no
 * "days missed" counter, no adherence percentage, no modals, no toasts, no
 * confirmations and no guilt text. A missed day is just a quiet square.
 * Please keep it that way.
 */

import AddHabitForm from "@/components/AddHabitForm";
import EmptyState from "@/components/EmptyState";
import HabitCard from "@/components/HabitCard";
import { useHabits } from "@/lib/useHabits";

function formatToday(day: string) {
  const [year, month, date] = day.split("-").map(Number);
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date(year, month - 1, date));
}

export default function Home() {
  const { habits, today, loaded, addHabit, toggleDay, rename } = useHabits();

  return (
    <main className="mx-auto w-full max-w-[640px] px-5 py-12 sm:py-16">
      <header className="mb-8">
        <h1 className="text-2xl font-semibold tracking-[0.2em]">STREAKER</h1>
        <p className="mt-1 h-5 text-sm text-muted first-letter:uppercase">
          {loaded ? formatToday(today) : ""}
        </p>
      </header>

      <AddHabitForm onAdd={addHabit} />

      <div className="mt-8">
        {!loaded ? (
          <div className="h-40" aria-hidden />
        ) : habits.length === 0 ? (
          <EmptyState />
        ) : (
          <ul className="flex flex-col gap-4">
            {habits.map((habit) => (
              <HabitCard
                key={habit.id}
                habit={habit}
                today={today}
                onToggleToday={() => toggleDay(habit.id, today)}
                onRename={(name) => rename(habit.id, name)}
              />
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
