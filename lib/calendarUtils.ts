export type CalendarItemType =
  | "weekly-theme"
  | "event"
  | "grading"
  | "announcement"
  | "special"
  | "camp"
  | "performance";

export interface CalendarItem {
  id: string;
  title: string;
  startDate?: string;
  endDate?: string;
  type: CalendarItemType;
  description?: string;
  location?: string;
  isRecurring?: boolean;
  recurringDay?: string;
  recurringStartDate?: string;
  recurringEndDate?: string;
}

export type ItemsByDate = Record<string, CalendarItem[]>;

const dayNameToIndex: Record<string, number> = {
  Sunday: 0,
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
};

function normaliseDayName(day?: string) {
  if (!day) return undefined;

  const normalised = day.trim().toLowerCase();

  const dayMap: Record<string, keyof typeof dayNameToIndex> = {
    sunday: "Sunday",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
  };

  return dayMap[normalised];
}

export function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export function getMonthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function getMonthDays(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  return {
    blanks: firstDay.getDay(),
    daysInMonth: lastDay.getDate(),
    year,
    month,
  };
}

/** Build a date-key lookup for all calendar events. Safe to run on the server. */
export function buildItemsByDate(items: CalendarItem[]): ItemsByDate {
  const map: ItemsByDate = {};

  const addToDate = (key: string, item: CalendarItem) => {
    if (!map[key]) map[key] = [];
    map[key].push(item);
  };

  for (const item of items) {
    if (
      item.isRecurring &&
      item.recurringDay &&
      item.recurringStartDate &&
      item.recurringEndDate
    ) {
      const normalisedDay = normaliseDayName(item.recurringDay);
      if (!normalisedDay) continue;

      const targetDay = dayNameToIndex[normalisedDay];
      const start = new Date(item.recurringStartDate);
      const end = new Date(item.recurringEndDate);
      const current = new Date(start);

      while (current <= end) {
        if (current.getDay() === targetDay) {
          addToDate(formatDateKey(current), item);
        }
        current.setDate(current.getDate() + 1);
      }

      continue;
    }

    if (item.startDate) {
      const start = new Date(item.startDate);
      const end = item.endDate ? new Date(item.endDate) : start;
      const current = new Date(start);

      while (current <= end) {
        addToDate(formatDateKey(current), item);
        current.setDate(current.getDate() + 1);
      }
    }
  }

  return map;
}

/** Non-recurring events overlapping a given month, sorted by start date. */
export function getEventsForMonth(
  items: CalendarItem[],
  year: number,
  month: number,
) {
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);

  return items
    .filter((item) => !item.isRecurring)
    .filter((item) => {
      const start = item.startDate ? new Date(item.startDate) : null;
      const end = item.endDate ? new Date(item.endDate) : start;

      if (!start || !end) return false;

      return start <= monthEnd && end >= monthStart;
    })
    .sort(
      (a, b) =>
        new Date(a.startDate ?? 0).getTime() -
        new Date(b.startDate ?? 0).getTime(),
    );
}

export const calendarTypeLabels: Record<CalendarItemType, string> = {
  "weekly-theme": "Weekly Theme",
  event: "Event",
  grading: "Grading",
  announcement: "Announcement",
  special: "Special Training",
  camp: "Camp",
  performance: "Performance",
};

export const calendarDayLabels = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];
