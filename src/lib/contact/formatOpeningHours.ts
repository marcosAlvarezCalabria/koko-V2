import type { OpeningHoursSpecification } from "@/data/site";

export interface FormattedOpeningHours {
  days: string;
  hours: string;
}

export function formatOpeningHours(specifications: readonly OpeningHoursSpecification[]): FormattedOpeningHours[] {
  return specifications.map((specification) => ({
    days: specification.dayOfWeek.join(", "),
    hours: `${specification.opens}-${specification.closes}`
  }));
}