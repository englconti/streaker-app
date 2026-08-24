import { describe, expect, it } from "vitest";
import { EMPTY_DATA, parseData } from "../storage";

const habit = {
  id: "abc",
  name: "Read",
  createdAt: "2026-08-24T10:00:00.000Z",
  completions: ["2026-08-24"],
};

describe("parseData", () => {
  it("reads back well-formed data", () => {
    const stored = JSON.stringify({ version: 1, habits: [habit] });
    expect(parseData(stored)).toEqual({ version: 1, habits: [habit] });
  });

  it("returns empty data when nothing is stored", () => {
    expect(parseData(null)).toEqual(EMPTY_DATA);
  });

  it("returns empty data for malformed JSON instead of throwing", () => {
    expect(parseData("{not json")).toEqual(EMPTY_DATA);
  });

  it("returns empty data when habits is not an array", () => {
    expect(parseData(JSON.stringify({ version: 1, habits: "nope" }))).toEqual(
      EMPTY_DATA,
    );
  });

  it("drops entries that are not shaped like a habit", () => {
    const stored = JSON.stringify({
      version: 1,
      habits: [habit, { id: "x" }, null],
    });
    expect(parseData(stored).habits).toEqual([habit]);
  });

  it("drops completion entries that are not date keys", () => {
    const stored = JSON.stringify({
      version: 1,
      habits: [{ ...habit, completions: ["2026-08-24", 7, "yesterday"] }],
    });
    expect(parseData(stored).habits[0].completions).toEqual(["2026-08-24"]);
  });
});
