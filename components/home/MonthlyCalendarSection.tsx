"use client";

import * as React from "react";

type CalendarItemType =
  | "weekly-theme"
  | "event"
  | "grading"
  | "announcement"
  | "special"
  | "camp"
  | "performance";

interface CalendarItem {
  id: string;
  title: string;
  startDate?: string;
  endDate?: string;
  type: CalendarItemType;
  description?: string;
  location?: string;

  isRecurring?: boolean;
  recurringDay?: keyof typeof dayNameToIndex;
  recurringStartDate?: string;
  recurringEndDate?: string;
}

interface MonthlyCalendarSectionProps {
  items: CalendarItem[];
}

const typeLabels: Record<CalendarItemType, string> = {
  "weekly-theme": "Weekly Theme",
  event: "Event",
  grading: "Grading",
  announcement: "Announcement",
  special: "Special Training",
  camp: "Camp",
  performance: "Performance",
};

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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

function getMonthStart(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

function getMonthDays(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const blanks = firstDay.getDay();
  const daysInMonth = lastDay.getDate();

  return {
    blanks,
    daysInMonth,
    year,
    month,
  };
}

function formatKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

export default function MonthlyCalendarSection({
  items,
}: MonthlyCalendarSectionProps) {
  const [currentMonth, setCurrentMonth] = React.useState(() =>
    getMonthStart(new Date()),
  );

  const { blanks, daysInMonth, year, month } = getMonthDays(currentMonth);

  const itemsByDate = React.useMemo(() => {
    const map = new Map<string, CalendarItem[]>();

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
            const key = formatKey(current);

            if (!map.has(key)) map.set(key, []);
            map.get(key)!.push(item);
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
          const key = formatKey(current);

          if (!map.has(key)) map.set(key, []);
          map.get(key)!.push(item);

          current.setDate(current.getDate() + 1);
        }
      }
    }

    return map;
  }, [items]);

  const selectedMonthItems = React.useMemo(() => {
    const monthStart = new Date(year, month, 1);
    const monthEnd = new Date(year, month + 1, 0);

    return items
      .filter((item) => !item.isRecurring).filter((item) => {
        const start = item.isRecurring
          ? item.recurringStartDate
            ? new Date(item.recurringStartDate)
            : null
          : item.startDate
            ? new Date(item.startDate)
            : null;

        const end = item.isRecurring
          ? item.recurringEndDate
            ? new Date(item.recurringEndDate)
            : start
          : item.endDate
            ? new Date(item.endDate)
            : start;

        if (!start || !end) return false;

        return start <= monthEnd && end >= monthStart;
      })
      .sort((a, b) => {
        const dateA = a.isRecurring
          ? new Date(a.recurringStartDate ?? a.startDate ?? 0).getTime()
          : new Date(a.startDate ?? 0).getTime();

        const dateB = b.isRecurring
          ? new Date(b.recurringStartDate ?? b.startDate ?? 0).getTime()
          : new Date(b.startDate ?? 0).getTime();

        return dateA - dateB;
      });
  }, [items, year, month]);

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  return (
    <section className="bg-[#F8FAFC] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-bold tracking-[0.35em] uppercase text-[#C60C30] mb-3">
            Member Calendar
          </p>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#111111]">
            Monthly Training Calendar
          </h2>

          <p className="mt-4 text-black/60 text-base md:text-lg leading-relaxed">
            View weekly themes, gradings, demonstrations, events, and important
            HCA community updates.
          </p>

          <div className="mt-6 mx-auto flex h-1 w-40 overflow-hidden rounded-full">
            <div className="w-1/2 bg-[#C60C30]" />
            <div className="w-1/2 bg-[#003478]" />
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          {/* Calendar */}
          <div className="hidden lg:block rounded-3xl border border-black/10 bg-white p-5 md:p-7 shadow-sm">
            <div className="mb-6 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={goToPreviousMonth}
                className="h-10 w-10 rounded-full border border-black/10 text-[#003478] hover:text-[#C60C30] transition"
                aria-label="Previous month"
              >
                ←
              </button>

              <h3 className="text-2xl font-extrabold text-[#111111]">
                {currentMonth.toLocaleDateString("en-AU", {
                  month: "long",
                  year: "numeric",
                })}
              </h3>

              <button
                type="button"
                onClick={goToNextMonth}
                className="h-10 w-10 rounded-full border border-black/10 bg-[#003478] text-white hover:bg-[#002B63] transition"
                aria-label="Next month"
              >
                →
              </button>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {days.map((day) => (
                <div
                  key={day}
                  className="text-center text-xs font-bold uppercase tracking-wide text-black/45"
                >
                  {day}
                </div>
              ))}

              {Array.from({ length: blanks }).map((_, index) => (
                <div key={`blank-${index}`} />
              ))}

              {Array.from({ length: daysInMonth }).map((_, index) => {
                const dayNumber = index + 1;
                const date = new Date(year, month, dayNumber);
                const key = formatKey(date);
                const dayItems = itemsByDate.get(key) ?? [];

                return (
                  <div
                    key={key}
                    className="
                      min-h-[88px]
                      rounded-2xl
                      border
                      border-black/10
                      bg-[#F8FAFC]
                      p-2
                    "
                  >
                    <div className="font-bold text-[#111111]">{dayNumber}</div>

                    <div className="mt-2 space-y-1">
                      {dayItems.slice(0, 2).map((item) => (
                        <div
                          key={item.id}
                          className="truncate rounded-full bg-[#003478]/10 px-2 py-1 text-[10px] font-semibold text-[#003478]"
                          title={item.title}
                        >
                          {item.title}
                        </div>
                      ))}

                      {dayItems.length > 2 && (
                        <div className="text-[10px] font-semibold text-[#C60C30]">
                          +{dayItems.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Month Events */}
          <aside className="rounded-3xl border border-black/10 bg-white p-6 md:p-7 shadow-sm">
            <h3 className="text-2xl font-extrabold text-[#111111]">
              This Month
            </h3>

            <div className="mt-5 flex h-1 w-32 overflow-hidden rounded-full">
              <div className="w-1/2 bg-[#C60C30]" />
              <div className="w-1/2 bg-[#003478]" />
            </div>

            <div className="mt-6 space-y-4">
              {selectedMonthItems.length === 0 ? (
                <p className="text-black/55">
                  No events have been added for this month yet.
                </p>
              ) : (
                selectedMonthItems.map((item) => {
                  const start = item.isRecurring
                    ? new Date(item.recurringStartDate!)
                    : new Date(item.startDate!);

                  const end = item.isRecurring
                    ? new Date(
                        item.recurringEndDate ?? item.recurringStartDate!,
                      )
                    : new Date(item.endDate ?? item.startDate!);

                  return (
                    <div
                      key={item.id}
                      className="rounded-2xl border border-black/10 bg-[#F8FAFC] p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="rounded-full bg-[#003478]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#003478]">
                          {typeLabels[item.type]}
                        </span>

                        <span className="text-sm font-semibold text-[#C60C30]">
                          {item.isRecurring
                            ? `Every ${item.recurringDay}`
                            : `${start.toLocaleDateString("en-AU", {
                                day: "numeric",
                                month: "short",
                              })}${
                                item.endDate
                                  ? ` - ${end.toLocaleDateString("en-AU", {
                                      day: "numeric",
                                      month: "short",
                                    })}`
                                  : ""
                              }`}
                        </span>
                      </div>

                      <h4 className="mt-3 font-bold text-[#111111]">
                        {item.title}
                      </h4>

                      {item.description && (
                        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-black/60">
                          {item.description}
                        </p>
                      )}

                      {item.location && (
                        <p className="mt-3 text-sm font-semibold text-[#003478]">
                          {item.location}
                        </p>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
