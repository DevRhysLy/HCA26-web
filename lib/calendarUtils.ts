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

export const SUNDAY_INDEX = 0;

export type WeeklyThemeColor =
  | "blue"
  | "red"
  | "teal"
  | "amber"
  | "purple"
  | "slate";

export const WEEKLY_THEME_COLORS: WeeklyThemeColor[] = [
  "blue",
  "red",
  "teal",
  "amber",
  "purple",
  "slate",
];

export interface WeeklyThemeStyles {
  accent: string;
  headerBg: string;
  cellBg: string;
  cellBorder: string;
  sidebarBorder: string;
  sidebarBadge: string;
}

const weeklyThemePalette: Record<WeeklyThemeColor, WeeklyThemeStyles> = {
  blue: {
    accent: "#004AAD",
    headerBg: "bg-[#004AAD] text-white",
    cellBg: "bg-[#EEF5FF]",
    cellBorder: "border-[#BFD6F8]",
    sidebarBorder: "border-l-4 border-l-[#004AAD]",
    sidebarBadge: "text-[#004AAD]",
  },
  
  red: {
    accent: "#E7343E",
    headerBg: "bg-[#E7343E] text-white",
    cellBg: "bg-[#FFF1F2]",
    cellBorder: "border-[#F7B9BD]",
    sidebarBorder: "border-l-4 border-l-[#E7343E]",
    sidebarBadge: "text-[#E7343E]",
  },
  
  teal: {
    accent: "#459863",
    headerBg: "bg-[#459863] text-white",
    cellBg: "bg-[#F2FAF5]",
    cellBorder: "border-[#B8DFC4]",
    sidebarBorder: "border-l-4 border-l-[#459863]",
    sidebarBadge: "text-[#459863]",
  },
  
  amber: {
    accent: "#FFBD59",
    headerBg: "bg-[#FFBD59] text-[#434343]",
    cellBg: "bg-[#FFF9ED]",
    cellBorder: "border-[#FFE0A6]",
    sidebarBorder: "border-l-4 border-l-[#FFBD59]",
    sidebarBadge: "text-[#C98600]",
  },
  
  purple: {
    accent: "#6D28D9",
    headerBg: "bg-[#6D28D9] text-white",
    cellBg: "bg-[#F5F0FF]",
    cellBorder: "border-[#D8C6FA]",
    sidebarBorder: "border-l-4 border-l-[#6D28D9]",
    sidebarBadge: "text-[#6D28D9]",
  },
  
  slate: {
    accent: "#434343",
    headerBg: "bg-[#434343] text-white",
    cellBg: "bg-[#F5F5F5]",
    cellBorder: "border-[#D4D4D4]",
    sidebarBorder: "border-l-4 border-l-[#434343]",
    sidebarBadge: "text-[#434343]",
  },
};

export function getWeeklyThemeStyles(
  color?: WeeklyThemeColor,
): WeeklyThemeStyles {
  if (color && color in weeklyThemePalette) {
    return weeklyThemePalette[color];
  }

  return weeklyThemePalette.blue;
}

export interface WeeklyTheme {
  id: string;
  title: string;
  weekStartDate: string;
  weekEndDate: string;
  description?: string;
  location?: string;
  themeColor?: WeeklyThemeColor;
}

export interface CalendarDay {
  date: Date;
  dateKey: string;
  dayNumber: number | null;
  isSunday: boolean;
  isClosed: boolean;
  events: CalendarItem[];
}

export interface CalendarWeek {
  weekIndex: number;
  days: CalendarDay[];
  theme?: WeeklyTheme;
}

export function isSunday(date: Date) {
  return date.getDay() === SUNDAY_INDEX;
}

function createCalendarDay(
  date: Date,
  dayNumber: number | null,
  eventsByDate: ItemsByDate,
): CalendarDay {
  const dateKey = formatDateKey(date);
  const closed = isSunday(date);

  return {
    date,
    dateKey,
    dayNumber,
    isSunday: closed,
    isClosed: closed,
    events: closed ? [] : (eventsByDate[dateKey] ?? []),
  };
}

function findThemeForWeek(
  weekSunday: Date,
  themes: WeeklyTheme[],
): WeeklyTheme | undefined {
  const weekMonday = new Date(weekSunday);
  weekMonday.setDate(weekMonday.getDate() + 1);
  const weekSaturday = new Date(weekSunday);
  weekSaturday.setDate(weekSaturday.getDate() + 6);
  const mondayKey = formatDateKey(weekMonday);

  const exact = themes.find((theme) => theme.weekStartDate === mondayKey);
  if (exact) return exact;

  return themes.find((theme) => {
    const themeStart = new Date(theme.weekStartDate);
    const themeEnd = new Date(theme.weekEndDate);
    return themeStart <= weekSaturday && themeEnd >= weekMonday;
  });
}

/** Split a month into Sun-start week rows with themes and one-off events. */
export function buildMonthWeeks(
  year: number,
  month: number,
  themes: WeeklyTheme[],
  eventsByDate: ItemsByDate,
): CalendarWeek[] {
  const { blanks, daysInMonth } = getMonthDays(new Date(year, month, 1));
  const cells: CalendarDay[] = [];

  for (let i = 0; i < blanks; i++) {
    const date = new Date(year, month, 1 - (blanks - i));
    cells.push(createCalendarDay(date, null, eventsByDate));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    cells.push(createCalendarDay(date, day, eventsByDate));
  }

  while (cells.length % 7 !== 0) {
    const lastDate = cells[cells.length - 1].date;
    const next = new Date(lastDate);
    next.setDate(next.getDate() + 1);
    cells.push(createCalendarDay(next, null, eventsByDate));
  }

  const weeks: CalendarWeek[] = [];

  for (let i = 0; i < cells.length; i += 7) {
    const days = cells.slice(i, i + 7);
    weeks.push({
      weekIndex: i / 7,
      days,
      theme: findThemeForWeek(days[0].date, themes),
    });
  }

  return weeks;
}

/** Weekly themes whose Mon–Sat span overlaps the given month. */
export function getThemesForMonth(
  themes: WeeklyTheme[],
  year: number,
  month: number,
) {
  const monthStart = new Date(year, month, 1);
  const monthEnd = new Date(year, month + 1, 0);

  return themes
    .filter((theme) => {
      const start = new Date(theme.weekStartDate);
      const end = new Date(theme.weekEndDate);
      return start <= monthEnd && end >= monthStart;
    })
    .sort(
      (a, b) =>
        new Date(a.weekStartDate).getTime() -
        new Date(b.weekStartDate).getTime(),
    );
}

export function formatThemeDateRange(theme: WeeklyTheme) {
  const start = new Date(theme.weekStartDate);
  const end = new Date(theme.weekEndDate);

  const startLabel = start.toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
  });
  const endLabel = end.toLocaleDateString("en-AU", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  return `${startLabel} – ${endLabel}`;
}
