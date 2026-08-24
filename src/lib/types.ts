/** A calendar day in the user's own timezone, formatted as "YYYY-MM-DD". */
export type DateKey = string;

export type Habit = {
  id: string;
  name: string;
  createdAt: string;
  /** Days this habit was completed. Sorted ascending, no duplicates. */
  completions: DateKey[];
};

export type StreakerData = {
  version: 1;
  habits: Habit[];
};
