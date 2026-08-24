import { describe, expect, it } from "vitest";
import { bestStreak, currentStreak } from "../streak";

describe("currentStreak", () => {
  const today = "2026-08-24";

  it("is zero with no completions", () => {
    expect(currentStreak([], today)).toBe(0);
  });

  it("is one when only today is done", () => {
    expect(currentStreak([today], today)).toBe(1);
  });

  it("counts consecutive days ending today", () => {
    expect(
      currentStreak(["2026-08-22", "2026-08-23", "2026-08-24"], today),
    ).toBe(3);
  });

  it("still counts yesterday's streak before today is checked off", () => {
    // The whole point of not nagging: the number does not drop just because
    // the user has not gotten to it yet today.
    expect(currentStreak(["2026-08-22", "2026-08-23"], today)).toBe(2);
  });

  it("is zero once both today and yesterday are missed", () => {
    expect(currentStreak(["2026-08-20", "2026-08-21", "2026-08-22"], today)).toBe(0);
  });

  it("stops at a gap instead of counting older days", () => {
    expect(
      currentStreak(["2026-08-20", "2026-08-23", "2026-08-24"], today),
    ).toBe(2);
  });

  it("counts across a month boundary", () => {
    expect(
      currentStreak(["2026-02-27", "2026-02-28", "2026-03-01"], "2026-03-01"),
    ).toBe(3);
  });

  it("counts across a year boundary", () => {
    expect(
      currentStreak(["2025-12-31", "2026-01-01"], "2026-01-01"),
    ).toBe(2);
  });

  it("ignores duplicate entries for the same day", () => {
    expect(currentStreak(["2026-08-23", "2026-08-24", "2026-08-24"], today)).toBe(2);
  });

  it("does not depend on the completions being sorted", () => {
    expect(
      currentStreak(["2026-08-24", "2026-08-22", "2026-08-23"], today),
    ).toBe(3);
  });

  it("ignores days in the future", () => {
    expect(currentStreak(["2026-08-24", "2026-08-30"], today)).toBe(1);
  });
});

describe("bestStreak", () => {
  it("is zero with no completions", () => {
    expect(bestStreak([])).toBe(0);
  });

  it("is one for a single completion", () => {
    expect(bestStreak(["2026-08-24"])).toBe(1);
  });

  it("finds the longest run in the middle of the history", () => {
    expect(
      bestStreak([
        "2026-08-01",
        "2026-08-10",
        "2026-08-11",
        "2026-08-12",
        "2026-08-13",
        "2026-08-20",
        "2026-08-21",
      ]),
    ).toBe(4);
  });

  it("counts a run that crosses a leap day", () => {
    expect(bestStreak(["2024-02-28", "2024-02-29", "2024-03-01"])).toBe(3);
  });

  it("ignores duplicate entries for the same day", () => {
    expect(bestStreak(["2026-08-23", "2026-08-23", "2026-08-24"])).toBe(2);
  });

  it("does not depend on the completions being sorted", () => {
    expect(bestStreak(["2026-08-24", "2026-08-22", "2026-08-23"])).toBe(3);
  });
});
