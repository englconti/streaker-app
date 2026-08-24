"use client";

import { useState } from "react";

export default function AddHabitForm({
  onAdd,
}: {
  onAdd: (name: string) => void;
}) {
  const [name, setName] = useState("");

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        onAdd(name);
        setName("");
      }}
      className="flex gap-2"
    >
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Novo hábito…"
        aria-label="Nome do novo hábito"
        maxLength={80}
        className="min-w-0 flex-1 rounded-xl border border-line bg-surface px-4 py-3 outline-none placeholder:text-muted focus:border-accent"
      />
      <button
        type="submit"
        disabled={!name.trim()}
        className="rounded-xl border border-line bg-surface px-4 py-3 text-sm font-medium transition-colors enabled:hover:border-accent enabled:hover:text-accent disabled:opacity-40"
      >
        Adicionar
      </button>
    </form>
  );
}
