import { describe, expect, it } from "vitest";
import { createHabit, renameHabit, toggleCompletion } from "../habits";

describe("createHabit", () => {
  it("starts with a trimmed name and no completions", () => {
    const habit = createHabit("  Read  ", new Date(2026, 7, 24, 10, 0, 0));
    expect(habit.name).toBe("Read");
    expect(habit.completions).toEqual([]);
  });

  it("gives each habit its own id", () => {
    const now = new Date(2026, 7, 24, 10, 0, 0);
    expect(createHabit("Read", now).id).not.toBe(createHabit("Run", now).id);
  });
});

describe("toggleCompletion", () => {
  const habit = {
    id: "abc",
    name: "Read",
    createdAt: "2026-08-24T10:00:00.000Z",
    completions: ["2026-08-22", "2026-08-23"],
  };

  it("marks a day that was not done", () => {
    expect(toggleCompletion(habit, "2026-08-24").completions).toEqual([
      "2026-08-22",
      "2026-08-23",
      "2026-08-24",
    ]);
  });

  it("unmarks a day that was already done", () => {
    expect(toggleCompletion(habit, "2026-08-23").completions).toEqual([
      "2026-08-22",
    ]);
  });

  it("keeps completions sorted when an older day is added", () => {
    expect(toggleCompletion(habit, "2026-08-01").completions).toEqual([
      "2026-08-01",
      "2026-08-22",
      "2026-08-23",
    ]);
  });

  it("does not mutate the original habit", () => {
    toggleCompletion(habit, "2026-08-24");
    expect(habit.completions).toEqual(["2026-08-22", "2026-08-23"]);
  });
});

describe("renameHabit", () => {
  const habit = {
    id: "abc",
    name: "Read",
    createdAt: "2026-08-24T10:00:00.000Z",
    completions: ["2026-08-23"],
  };

  it("changes the name", () => {
    expect(renameHabit(habit, "Read at night").name).toBe("Read at night");
  });

  it("trims the new name", () => {
    expect(renameHabit(habit, "  Read at night  ").name).toBe("Read at night");
  });

  it("keeps the old name when the new one is blank", () => {
    expect(renameHabit(habit, "   ").name).toBe("Read");
  });

  it("keeps the history untouched", () => {
    expect(renameHabit(habit, "Read at night").completions).toEqual([
      "2026-08-23",
    ]);
  });

  it("does not mutate the original habit", () => {
    renameHabit(habit, "Read at night");
    expect(habit.name).toBe("Read");
  });
});
