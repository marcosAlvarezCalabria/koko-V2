import { describe, expect, it } from "vitest";

import { formatOpeningHours } from "./formatOpeningHours";

describe("formatOpeningHours", () => {
  it("returns an empty list when no opening hours are supplied", () => {
    expect(formatOpeningHours([])).toEqual([]);
  });

  it("formats one opening-hours specification", () => {
    expect(formatOpeningHours([{ dayOfWeek: ["Saturday"], opens: "10:00", closes: "17:00" }])).toEqual([
      { days: "Saturday", hours: "10:00-17:00" }
    ]);
  });

  it("preserves multiple slots and joins grouped days", () => {
    expect(formatOpeningHours([
      { dayOfWeek: ["Monday", "Tuesday", "Wednesday"], opens: "10:00", closes: "19:00" },
      { dayOfWeek: ["Thursday", "Friday"], opens: "10:00", closes: "20:00" }
    ])).toEqual([
      { days: "Monday, Tuesday, Wednesday", hours: "10:00-19:00" },
      { days: "Thursday, Friday", hours: "10:00-20:00" }
    ]);
  });
});