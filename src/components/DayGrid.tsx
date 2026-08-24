import { lastNDays } from "@/lib/dates";
import type { DateKey } from "@/lib/types";

const DAYS_SHOWN = 30;

/**
 * Read-only history. A day that was missed is simply a quiet square: no red,
 * no warning, nothing that asks the user to explain themselves.
 */
export default function DayGrid({
  completions,
  today,
}: {
  completions: DateKey[];
  today: DateKey;
}) {
  const done = new Set(completions);
  const days = lastNDays(today, DAYS_SHOWN);

  return (
    <div>
      <div className="flex gap-[3px]">
        {days.map((day) => (
          <div
            key={day}
            title={day}
            className={`aspect-square min-w-0 flex-1 rounded-[3px] ${
              done.has(day) ? "bg-accent" : "bg-line"
            }`}
          />
        ))}
      </div>
      <p className="mt-2 text-[11px] tracking-wide text-muted">
        últimos {DAYS_SHOWN} dias
      </p>
    </div>
  );
}
