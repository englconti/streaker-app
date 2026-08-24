import { describe, expect, it } from "vitest";
import { addDays, lastNDays, todayKey } from "../dates";

describe("todayKey", () => {
  it("formats a date as YYYY-MM-DD", () => {
    expect(todayKey(new Date(2026, 7, 24, 10, 0, 0))).toBe("2026-08-24");
  });

  it("pads single-digit months and days", () => {
    expect(todayKey(new Date(2026, 0, 5, 10, 0, 0))).toBe("2026-01-05");
  });

  it("uses the local day, not the UTC day, late at night", () => {
    // 23:00 local in a UTC-3 timezone is already the next day in UTC.
    // Using toISOString() here would report 2026-08-25 and silently break streaks.
    expect(todayKey(new Date(2026, 7, 24, 23, 0, 0))).toBe("2026-08-24");
  });

  it("uses the local day, not the UTC day, early in the morning", () => {
    expect(todayKey(new Date(2026, 7, 24, 0, 30, 0))).toBe("2026-08-24");
  });
});

describe("addDays", () => {
  it("moves forward within a month", () => {
    expect(addDays("2026-08-24", 1)).toBe("2026-08-25");
  });

  it("moves backward within a month", () => {
    expect(addDays("2026-08-24", -1)).toBe("2026-08-23");
  });

  it("crosses a month boundary backward", () => {
    expect(addDays("2026-03-01", -1)).toBe("2026-02-28");
  });

  it("crosses a year boundary backward", () => {
    expect(addDays("2026-01-01", -1)).toBe("2025-12-31");
  });

  it("handles leap years", () => {
    expect(addDays("2024-03-01", -1)).toBe("2024-02-29");
  });

  it("returns the same day for a delta of zero", () => {
    expect(addDays("2026-08-24", 0)).toBe("2026-08-24");
  });
});

describe("lastNDays", () => {
  it("returns n days ending on the given day, oldest first", () => {
    expect(lastNDays("2026-08-24", 3)).toEqual([
      "2026-08-22",
      "2026-08-23",
      "2026-08-24",
    ]);
  });

  it("crosses a month boundary", () => {
    expect(lastNDays("2026-03-01", 2)).toEqual(["2026-02-28", "2026-03-01"]);
  });

  it("returns an empty list for n of zero", () => {
    expect(lastNDays("2026-08-24", 0)).toEqual([]);
  });
});
