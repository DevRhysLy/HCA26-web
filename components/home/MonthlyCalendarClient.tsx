"use client";

import * as React from "react";
import {
  calendarDayLabels,
  calendarTypeLabels,
  formatDateKey,
  getEventsForMonth,
  getMonthDays,
  getMonthStart,
  type CalendarItem,
  type ItemsByDate,
} from "@/lib/calendarUtils";

interface MonthlyCalendarClientProps {
  items: CalendarItem[];
  itemsByDate: ItemsByDate;
}

export default function MonthlyCalendarClient({
  items,
  itemsByDate,
}: MonthlyCalendarClientProps) {
  const [currentMonth, setCurrentMonth] = React.useState(() =>
    getMonthStart(new Date()),
  );

  const { blanks, daysInMonth, year, month } = getMonthDays(currentMonth);

  const selectedMonthItems = React.useMemo(
    () => getEventsForMonth(items, year, month),
    [items, year, month],
  );

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
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
          {calendarDayLabels.map((day) => (
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
            const key = formatDateKey(date);
            const dayItems = itemsByDate[key] ?? [];

            return (
              <div
                key={key}
                className="min-h-[88px] rounded-2xl border border-black/10 bg-[#F8FAFC] p-2"
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

      <aside className="rounded-3xl border border-black/10 bg-white p-6 md:p-7 shadow-sm">
        <h3 className="text-2xl font-extrabold text-[#111111]">This Month</h3>

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
              const start = new Date(item.startDate!);
              const end = new Date(item.endDate ?? item.startDate!);

              return (
                <div
                  key={item.id}
                  className="rounded-2xl border border-black/10 bg-[#F8FAFC] p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-[#003478]/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-[#003478]">
                      {calendarTypeLabels[item.type]}
                    </span>

                    <span className="text-sm font-semibold text-[#C60C30]">
                      {`${start.toLocaleDateString("en-AU", {
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

                  <h4 className="mt-3 font-bold text-[#111111]">{item.title}</h4>

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
  );
}
