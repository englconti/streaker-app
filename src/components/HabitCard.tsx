"use client";

import CheckButton from "@/components/CheckButton";
import DayGrid from "@/components/DayGrid";
import HabitName from "@/components/HabitName";
import { bestStreak, currentStreak } from "@/lib/streak";
import type { DateKey, Habit } from "@/lib/types";

export default function HabitCard({
  habit,
  today,
  onToggleToday,
  onRename,
}: {
  habit: Habit;
  today: DateKey;
  onToggleToday: () => void;
  onRename: (name: string) => void;
}) {
  const doneToday = habit.completions.includes(today);
  const streak = currentStreak(habit.completions, today);
  const best = bestStreak(habit.completions);

  return (
    <li className="rounded-2xl border border-line bg-surface p-5">
      <div className="flex items-center gap-4">
        <CheckButton
          done={doneToday}
          label={`Marcar ${habit.name} como feito hoje`}
          onClick={onToggleToday}
        />
        <div className="min-w-0 flex-1">
          <HabitName name={habit.name} onRename={onRename} />
          <p className="text-sm text-muted">
            {streak === 0 ? (
              "Comece hoje"
            ) : (
              <>
                <span className="text-base font-semibold text-foreground">
                  {streak}
                </span>{" "}
                {streak === 1 ? "dia seguido" : "dias seguidos"}
              </>
            )}
            {/* The personal best is kept in view even after a break: it is the
                part of the history that a missed day never takes away. */}
            {best > streak ? ` · recorde ${best}` : ""}
          </p>
        </div>
      </div>

      <div className="mt-5">
        <DayGrid completions={habit.completions} today={today} />
      </div>
    </li>
  );
}
