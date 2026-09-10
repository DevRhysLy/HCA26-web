"use client";

import * as React from "react";
import HoverTooltip from "@/components/ui/HoverTooltip";
import {
  buildMonthWeeks,
  calendarDayLabels,
  calendarTypeLabels,
  formatThemeDateRange,
  getEventsForMonth,
  getMonthDays,
  getMonthStart,
  getThemesForMonth,
  getWeeklyThemeStyles,
  type CalendarDay,
  type CalendarItem,
  type CalendarWeek,
  type ItemsByDate,
  type WeeklyTheme,
  type WeeklyThemeStyles,
} from "@/lib/calendarUtils";

interface MonthlyCalendarClientProps {
  themes: WeeklyTheme[];
  events: CalendarItem[];
  eventsByDate: ItemsByDate;
  initialYear: number;
  initialMonthIndex: number;
  initialWeeks: CalendarWeek[];
}

function eventPillClass(type: CalendarItem["type"]) {
  if (type === "grading") {
    return "bg-hca-red/10 text-hca-red";
  }

  if (type === "event") {
    return "bg-hca-blue/10 text-hca-blue";
  }

  return "bg-hca-blue/10 text-hca-blue";
}

function MonthNav({
  currentMonth,
  onPrevious,
  onNext,
}: {
  currentMonth: Date;
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <button
        type="button"
        onClick={onPrevious}
        className="h-10 w-10 rounded-full border border-black/10 text-hca-blue hover:text-hca-red transition"
        aria-label="Previous month"
      >
        ←
      </button>

      <h3 className="text-2xl font-extrabold text-hca-ink">
        {currentMonth.toLocaleDateString("en-AU", {
          month: "long",
          year: "numeric",
        })}
      </h3>

      <button
        type="button"
        onClick={onNext}
        className="h-10 w-10 rounded-full border border-black/10 bg-hca-blue text-white hover:bg-hca-blue-hover transition"
        aria-label="Next month"
      >
        →
      </button>
    </div>
  );
}

function DayCell({
  day,
  themeStyles,
}: {
  day: CalendarDay;
  themeStyles?: WeeklyThemeStyles;
}) {
  const isEmpty = day.dayNumber === null;
  const isThemed = !!themeStyles && !day.isClosed;

  return (
    <div
      className={`min-h-[88px] rounded-2xl border p-2 ${
        isEmpty
          ? "border-transparent bg-transparent"
          : day.isClosed
            ? "border-black/10 bg-black/[0.03]"
            : isThemed
              ? `${themeStyles.cellBg} ${themeStyles.cellBorder}`
              : "border-black/10 bg-hca-cream"
      }`}
    >
      {!isEmpty && (
        <>
          <div
            className={`font-bold ${
              day.isClosed ? "text-black/45" : "text-hca-ink"
            }`}
          >
            {day.dayNumber}
          </div>

          {day.isClosed ? (
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-black/40">
              Closed
            </div>
          ) : (
            <div className="mt-2 space-y-1">
              {day.events.slice(0, 2).map((item) => (
                <HoverTooltip
                  key={item.id}
                  content={item.description}
                  className="block min-w-0"
                >
                  <div
                    className={`truncate rounded-full px-2 py-1 text-[10px] font-semibold ${eventPillClass(item.type)}`}
                  >
                    {item.title}
                  </div>
                </HoverTooltip>
              ))}

              {day.events.length > 2 && (
                <div className="text-[10px] font-semibold text-hca-red">
                  +{day.events.length - 2} more
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

function WeekRow({ week }: { week: CalendarWeek }) {
  const themeStyles = week.theme
    ? getWeeklyThemeStyles(week.theme.themeColor)
    : undefined;
  const sunday = week.days[0];
  const weekdays = week.days.slice(1);

  return (
    <div className="grid grid-cols-7 gap-2">
      <DayCell day={sunday} />

      <div
        className={`col-span-6 overflow-hidden rounded-2xl border ${
          themeStyles ? themeStyles.cellBorder : "border-black/10 bg-hca-cream"
        }`}
      >
        {week.theme && themeStyles && (
          <HoverTooltip content={week.theme.description}>
            <div className={`px-3 py-1.5 ${themeStyles.headerBg}`}>
              <p className="truncate font-semibold">{week.theme.title}</p>
            </div>
          </HoverTooltip>
        )}

        <div className="grid grid-cols-6 gap-2 p-2">
          {weekdays.map((day) => (
            <DayCell key={day.dateKey} day={day} themeStyles={themeStyles} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function MonthlyCalendarClient({
  themes,
  events,
  eventsByDate,
  initialYear,
  initialMonthIndex,
  initialWeeks,
}: MonthlyCalendarClientProps) {
  const [currentMonth, setCurrentMonth] = React.useState(() =>
    getMonthStart(new Date()),
  );

  const { year, month } = getMonthDays(currentMonth);

  const weeks = React.useMemo(() => {
    if (year === initialYear && month === initialMonthIndex) {
      return initialWeeks;
    }

    return buildMonthWeeks(year, month, themes, eventsByDate);
  }, [
    year,
    month,
    themes,
    eventsByDate,
    initialYear,
    initialMonthIndex,
    initialWeeks,
  ]);

  const selectedMonthThemes = React.useMemo(
    () => getThemesForMonth(themes, year, month),
    [themes, year, month],
  );

  const selectedMonthEvents = React.useMemo(
    () => getEventsForMonth(events, year, month),
    [events, year, month],
  );

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  return (
    <div className="space-y-8">
      <div className="hidden w-full rounded-2xl border border-hca-border bg-hca-surface p-6 md:p-8 shadow-sm lg:block">
        <div className="mb-6">
          <MonthNav
            currentMonth={currentMonth}
            onPrevious={goToPreviousMonth}
            onNext={goToNextMonth}
          />
        </div>

        <div className="grid grid-cols-7 gap-2 mb-3">
          {calendarDayLabels.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-bold uppercase tracking-wide text-black/45"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="space-y-3">
          {weeks.map((week) => (
            <WeekRow key={week.weekIndex} week={week} />
          ))}
        </div>
      </div>

      <aside className="rounded-2xl border border-hca-border bg-hca-surface p-6 md:p-8 lg:hidden">
        <MonthNav
          currentMonth={currentMonth}
          onPrevious={goToPreviousMonth}
          onNext={goToNextMonth}
        />

        <div className="mt-5 flex h-1 w-32 overflow-hidden rounded-full">
          <div className="w-1/2 bg-hca-red" />
          <div className="w-1/2 bg-hca-blue" />
        </div>

        <div className="mt-8">
          <h4 className="text-sm font-bold uppercase tracking-wide text-hca-blue">
            Weekly Themes
          </h4>

          <div className="mt-4 space-y-4">
            {selectedMonthThemes.length === 0 ? (
              <p className="text-sm text-black/55">
                No weekly themes have been added for this month yet.
              </p>
            ) : (
              selectedMonthThemes.map((theme) => {
                const themeStyles = getWeeklyThemeStyles(theme.themeColor);

                return (
                  <div
                    key={theme.id}
                    className={`rounded-2xl border border-black/10 bg-hca-cream p-4 ${themeStyles.sidebarBorder}`}
                  >
                    <span
                      className={`text-sm font-semibold ${themeStyles.sidebarBadge}`}
                    >
                      {formatThemeDateRange(theme)}
                    </span>

                    <h5 className="mt-2 font-bold text-hca-ink">
                      {theme.title}
                    </h5>

                    {theme.description && (
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-black/60">
                        {theme.description}
                      </p>
                    )}

                    {theme.location && (
                      <p
                        className="mt-3 text-sm font-semibold"
                        style={{ color: themeStyles.accent }}
                      >
                        {theme.location}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className="mt-8">
          <h4 className="text-sm font-bold uppercase tracking-wide text-hca-blue">
            Events
          </h4>

          <div className="mt-4 space-y-4">
            {selectedMonthEvents.length === 0 ? (
              <p className="text-sm text-black/55">
                No events have been added for this month yet.
              </p>
            ) : (
              selectedMonthEvents.map((item) => {
                const start = new Date(item.startDate!);
                const end = new Date(item.endDate ?? item.startDate!);

                return (
                  <div
                    key={item.id}
                    className="rounded-2xl border border-black/10 bg-hca-cream p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="rounded-full bg-hca-blue/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-hca-blue">
                        {calendarTypeLabels[item.type]}
                      </span>

                      <span className="text-sm font-semibold text-hca-red">
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

                    <h5 className="mt-3 font-bold text-hca-ink">
                      {item.title}
                    </h5>

                    {item.description && (
                      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-black/60">
                        {item.description}
                      </p>
                    )}

                    {item.location && (
                      <p className="mt-3 text-sm font-semibold text-hca-blue">
                        {item.location}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
