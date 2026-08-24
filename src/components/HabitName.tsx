"use client";

import { useState } from "react";

/**
 * Click the name to rename it. Enter or clicking away keeps the change, Escape
 * discards it, and a blank name simply leaves the old one alone.
 */
export default function HabitName({
  name,
  onRename,
}: {
  name: string;
  onRename: (name: string) => void;
}) {
  const [draft, setDraft] = useState<string | null>(null);

  if (draft === null) {
    return (
      <h2 className="min-w-0">
        <button
          type="button"
          onClick={() => setDraft(name)}
          title="Renomear"
          className="block w-full truncate rounded text-left text-lg font-medium hover:text-accent"
        >
          {name}
        </button>
      </h2>
    );
  }

  const commit = () => {
    onRename(draft);
    setDraft(null);
  };

  return (
    <h2 className="min-w-0">
      <input
        autoFocus
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
        onBlur={commit}
        onKeyDown={(event) => {
          if (event.key === "Enter") commit();
          if (event.key === "Escape") setDraft(null);
        }}
        onFocus={(event) => event.target.select()}
        aria-label={`Renomear ${name}`}
        maxLength={80}
        className="w-full min-w-0 rounded border border-accent bg-transparent px-1 text-lg font-medium outline-none"
      />
    </h2>
  );
}
