"use client";

import * as React from "react";
import TimetableEntryCard from "@/components/timetable/TimetableEntryCard";
import { formatTime, parseTimeToMinutes } from "@/components/timetable/time";
import {
  DEFAULT_DAYS,
  type TimetableClassCard,
  type TimetableDay,
  type TimetableProps,
} from "@/components/timetable/types";

export type {
  TimetableDay,
  TimetableLocation,
  TimetableCardVariant,
  TimetableClassCard,
  TimetableProps,
} from "@/components/timetable/types";

export { DEFAULT_DAYS };

/* ------------------------------ Helpers ------------------------------ */

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

function LocationIconFallback() {
  return (
    <div className="h-10 w-10 rounded-xl bg-white border border-black/10 flex items-center justify-center shadow-sm">
      <span className="h-2.5 w-2.5 rounded-full bg-[#C60C30]" />
      <span className="ml-1 h-2.5 w-2.5 rounded-full bg-[#003478]" />
    </div>
  );
}

function shortDay(d: TimetableDay) {
  return d.slice(0, 3);
}

interface FilterPillRowProps {
  label: string;
  allLabel: string;
  options: string[];
  active: string | null;
  onChange: (value: string | null) => void;
}

function FilterPillRow({
  label,
  allLabel,
  options,
  active,
  onChange,
}: FilterPillRowProps) {
  if (options.length === 0) return null;

  const pill = (selected: boolean) =>
    cn(
      "px-4 py-2 rounded-full text-sm font-semibold transition-colors flex-shrink-0 border whitespace-nowrap",
      selected
        ? "bg-[#003478] text-white border-[#003478]"
        : "bg-white text-black/60 border-black/10 hover:border-[#003478]/40 hover:text-[#003478]",
    );

  return (
    <div className="flex items-center gap-3">
      <span className="hidden sm:block text-xs font-bold tracking-widest text-black/40 uppercase flex-shrink-0">
        {label}
      </span>

      <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          type="button"
          aria-pressed={active === null}
          onClick={() => onChange(null)}
          className={pill(active === null)}
        >
          {allLabel}
        </button>

        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            aria-pressed={active === opt}
            onClick={() => onChange(opt)}
            className={pill(active === opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------ Calendar ------------------------------ */

const DEFAULT_HOUR_HEIGHT = 80;
const GRID_PAD = 12;
const DEFAULT_DURATION = 60;
const GAP_THRESHOLD = 60;
const GAP_HEIGHT = 36;
const MIN_CARD_HEIGHT = 56;

interface PositionedEvent {
  entry: TimetableClassCard;
  start: number;
  end: number;
  col: number;
  cols: number;
}

interface TimeSegment {
  type: "active" | "gap";
  startMin: number;
  endMin: number;
  pxStart: number;
  height: number;
}

function buildSegments(
  entries: TimetableClassCard[],
  startMin: number,
  endMin: number,
  pxPerMin: number,
  gapThreshold: number,
): TimeSegment[] {
  const intervals = entries
    .map((e) => {
      const s = parseTimeToMinutes(e.timeSlot);
      if (s === null) return null;
      return { start: s, end: s + (e.durationMinutes ?? DEFAULT_DURATION) };
    })
    .filter((v): v is { start: number; end: number } => v !== null)
    .sort((a, b) => a.start - b.start);

  // Merge class intervals, keeping gaps <= threshold inside one active block.
  const blocks: Array<{ start: number; end: number }> = [];
  for (const iv of intervals) {
    const last = blocks[blocks.length - 1];
    if (last && iv.start - last.end <= gapThreshold) {
      last.end = Math.max(last.end, iv.end);
    } else {
      blocks.push({ start: iv.start, end: iv.end });
    }
  }

  // Build the raw (typed) segment list, with active blocks spanning the
  // full grid range at the edges and compressed gaps in between.
  const raw: Array<Pick<TimeSegment, "type" | "startMin" | "endMin">> = [];

  if (blocks.length === 0) {
    raw.push({ type: "active", startMin, endMin });
  } else {
    blocks[0].start = Math.min(blocks[0].start, startMin);
    blocks[blocks.length - 1].end = Math.max(
      blocks[blocks.length - 1].end,
      endMin,
    );

    blocks.forEach((block, i) => {
      if (i > 0) {
        raw.push({
          type: "gap",
          startMin: blocks[i - 1].end,
          endMin: block.start,
        });
      }
      raw.push({ type: "active", startMin: block.start, endMin: block.end });
    });
  }

  let cursor = 0;
  return raw.map((seg) => {
    const height =
      seg.type === "gap" ? GAP_HEIGHT : (seg.endMin - seg.startMin) * pxPerMin;
    const segment: TimeSegment = { ...seg, pxStart: cursor, height };
    cursor += height;
    return segment;
  });
}

function minuteToPixel(min: number, segments: TimeSegment[]): number {
  for (const seg of segments) {
    if (min < seg.startMin) return seg.pxStart;
    if (min <= seg.endMin) {
      const span = seg.endMin - seg.startMin || 1;
      return seg.pxStart + ((min - seg.startMin) / span) * seg.height;
    }
  }

  const last = segments[segments.length - 1];
  return last ? last.pxStart + last.height : 0;
}

function formatGapLabel(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hrs === 0) return `${mins} min`;
  if (mins === 0) return `${hrs} hr${hrs > 1 ? "s" : ""}`;
  return `${hrs}h ${mins}m`;
}

function layoutDayEvents(dayEntries: TimetableClassCard[]): PositionedEvent[] {
  const items = dayEntries
    .map((entry) => {
      const start = parseTimeToMinutes(entry.timeSlot) ?? 0;
      const end = start + (entry.durationMinutes ?? DEFAULT_DURATION);
      return { entry, start, end };
    })
    .sort((a, b) => a.start - b.start || a.end - b.end);

  const positioned: PositionedEvent[] = [];
  let cluster: Array<{ entry: TimetableClassCard; start: number; end: number }> =
    [];
  let clusterEnd = -Infinity;

  const flush = () => {
    if (cluster.length === 0) return;

    const colEnds: number[] = [];
    const assigned = cluster.map((it) => {
      let col = colEnds.findIndex((e) => e <= it.start);
      if (col === -1) {
        col = colEnds.length;
        colEnds.push(it.end);
      } else {
        colEnds[col] = it.end;
      }
      return { ...it, col };
    });

    const cols = colEnds.length;
    for (const a of assigned) positioned.push({ ...a, cols });

    cluster = [];
    clusterEnd = -Infinity;
  };

  for (const it of items) {
    if (cluster.length > 0 && it.start >= clusterEnd) flush();
    cluster.push(it);
    clusterEnd = Math.max(clusterEnd, it.end);
  }
  flush();

  return positioned;
}

interface WeekCalendarProps {
  days: TimetableDay[];
  entries: TimetableClassCard[];
  dayStartHour?: number;
  dayEndHour?: number;
  hourHeight?: number;
}

function WeekCalendar({
  days,
  entries,
  dayStartHour,
  dayEndHour,
  hourHeight = DEFAULT_HOUR_HEIGHT,
}: WeekCalendarProps) {
  const { startMin, endMin } = React.useMemo(() => {
    let min = Infinity;
    let max = -Infinity;

    for (const e of entries) {
      const s = parseTimeToMinutes(e.timeSlot);
      if (s === null) continue;
      const en = s + (e.durationMinutes ?? DEFAULT_DURATION);
      if (s < min) min = s;
      if (en > max) max = en;
    }

    if (!Number.isFinite(min) || !Number.isFinite(max)) {
      min = 9 * 60;
      max = 21 * 60;
    }

    let startH = dayStartHour ?? Math.floor(min / 60);
    let endH = dayEndHour ?? Math.ceil(max / 60);
    if (endH <= startH) endH = startH + 1;

    return { startMin: startH * 60, endMin: endH * 60 };
  }, [entries, dayStartHour, dayEndHour]);

  const pxPerMin = hourHeight / 60;

  const segments = React.useMemo(
    () => buildSegments(entries, startMin, endMin, pxPerMin, GAP_THRESHOLD),
    [entries, startMin, endMin, pxPerMin],
  );

  const innerHeight = segments.reduce((sum, seg) => sum + seg.height, 0);
  const totalHeight = innerHeight + GRID_PAD * 2;

  const toPx = React.useCallback(
    (min: number) => GRID_PAD + minuteToPixel(min, segments),
    [segments],
  );

  const isActive = React.useCallback(
    (min: number) =>
      segments.some(
        (seg) =>
          seg.type === "active" && min >= seg.startMin && min <= seg.endMin,
      ),
    [segments],
  );

  const hours: number[] = [];
  for (let h = startMin; h <= endMin; h += 60) {
    if (isActive(h)) hours.push(h);
  }

  const gapSegments = segments.filter((seg) => seg.type === "gap");

  const eventsByDay = React.useMemo(() => {
    const map = new Map<TimetableDay, PositionedEvent[]>();
    for (const d of days) {
      map.set(
        d,
        layoutDayEvents(entries.filter((e) => e.day === d)),
      );
    }
    return map;
  }, [entries, days]);

  const gridTemplate = `64px repeat(${days.length}, minmax(0, 1fr))`;

  return (
    <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
      <div className="grid" style={{ gridTemplateColumns: gridTemplate }}>
        <div className="border-b border-black/10 bg-[#F8FAFC]" />
        {days.map((d) => (
          <div
            key={d}
            className="px-3 py-4 border-b border-l border-black/10 bg-[#F8FAFC] text-center"
          >
            <span className="text-[#003478] font-bold text-sm">{d}</span>
          </div>
        ))}
      </div>

      <div className="grid" style={{ gridTemplateColumns: gridTemplate }}>
        <div className="relative bg-[#F8FAFC]" style={{ height: totalHeight }}>
          {hours.map((h) => (
            <div
              key={h}
              className="absolute right-2 -translate-y-1/2 text-[10px] font-semibold text-black/40 whitespace-nowrap"
              style={{ top: toPx(h) }}
            >
              {formatTime(h)}
            </div>
          ))}
        </div>

        {days.map((d) => {
          const positioned = eventsByDay.get(d) ?? [];

          return (
            <div
              key={d}
              className="relative border-l border-black/10"
              style={{ height: totalHeight }}
            >
              {hours.map((h) => (
                <div
                  key={h}
                  className="absolute inset-x-0 border-t border-black/[0.06]"
                  style={{ top: toPx(h) }}
                />
              ))}

              {gapSegments.map((seg) => {
                const top = GRID_PAD + seg.pxStart;

                return (
                  <div
                    key={`gap-${seg.startMin}`}
                    className="absolute inset-x-0 flex items-center justify-center"
                    style={{ top, height: seg.height }}
                  >
                    <div className="flex items-center gap-2 w-full px-3">
                      <span className="h-px flex-1 bg-black/[0.07]" />
                      <span className="text-[9px] font-semibold uppercase tracking-wide text-black/30 whitespace-nowrap">
                        No Classes
                      </span>
                      <span className="h-px flex-1 bg-black/[0.07]" />
                    </div>
                  </div>
                );
              })}

              {positioned.map(({ entry, start, end, col, cols }) => {
                const top = toPx(start);
                const naturalHeight = toPx(end) - toPx(start);
                const cardHeight = Math.max(naturalHeight, MIN_CARD_HEIGHT);
                const widthPct = 100 / cols;

                return (
                  <div
                    key={entry.id}
                    className="absolute p-1"
                    style={{
                      top,
                      height: cardHeight,
                      left: `${col * widthPct}%`,
                      width: `${widthPct}%`,
                    }}
                  >
                    <TimetableEntryCard
                      entry={entry}
                      fill
                      clipped={naturalHeight >= MIN_CARD_HEIGHT}
                    />
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------ Component ------------------------------ */

export function Timetable(props: TimetableProps) {
  const {
    title,
    subtitle,
    locations,
    selectedLocationId,
    defaultSelectedLocationId,
    onLocationChange,
    days = DEFAULT_DAYS,
    timeSlots,
    timeSlotsByLocation,
    entries,
    containerClassName,
    enableFilters = true,
    dayStartHour,
    dayEndHour,
    hourHeight,
  } = props;

  const isControlled = selectedLocationId !== undefined;

  const [internalSelected, setInternalSelected] = React.useState<string>(() => {
    if (defaultSelectedLocationId) return defaultSelectedLocationId;
    return locations[0]?.id ?? "";
  });

  const currentLocationId = isControlled
    ? selectedLocationId!
    : internalSelected;

  const setLocation = (id: string) => {
    if (!isControlled) setInternalSelected(id);
    onLocationChange?.(id);
  };

  const effectiveTimeSlots =
    timeSlotsByLocation?.[currentLocationId] ?? timeSlots;

  const [activeClassFilter, setActiveClassFilter] = React.useState<
    string | null
  >(null);
  const [activeTimeFilter, setActiveTimeFilter] = React.useState<string | null>(
    null,
  );

  React.useEffect(() => {
    setActiveClassFilter(null);
    setActiveTimeFilter(null);
  }, [currentLocationId]);

  const availableClassTags = React.useMemo(() => {
    const seen = new Set<string>();
    const tags: string[] = [];

    for (const e of entries) {
      if (e.locationId !== currentLocationId) continue;
      if (!e.tag || seen.has(e.tag)) continue;
      seen.add(e.tag);
      tags.push(e.tag);
    }

    return tags;
  }, [entries, currentLocationId]);

  const filtered = React.useMemo(
    () =>
      entries.filter((e) => {
        if (e.locationId !== currentLocationId) return false;
        if (activeClassFilter && e.tag !== activeClassFilter) return false;
        if (activeTimeFilter && e.timeSlot !== activeTimeFilter) return false;
        return true;
      }),
    [entries, currentLocationId, activeClassFilter, activeTimeFilter],
  );

  const [activeDay, setActiveDay] = React.useState<TimetableDay>(() => days[0]);

  React.useEffect(() => {
    if (!days.includes(activeDay)) setActiveDay(days[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days.join("|")]);

  const mobileGroups = React.useMemo(() => {
    const groups = new Map<string, TimetableClassCard[]>();

    for (const slot of effectiveTimeSlots) groups.set(slot, []);

    for (const e of filtered) {
      if (e.day !== activeDay) continue;
      if (!groups.has(e.timeSlot)) groups.set(e.timeSlot, []);
      groups.get(e.timeSlot)!.push(e);
    }

    return groups;
  }, [filtered, activeDay, effectiveTimeSlots]);

  return (
    <section className="w-full bg-[#F8FAFC]">
      <div
        className={cn(
          "mx-auto px-4 sm:px-6 py-12 md:py-16",
          containerClassName ?? "max-w-7xl",
        )}
      >
        <div className="text-center mb-8 md:mb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.35em] text-[#C60C30]">
            Hapkido College of Australia
          </p>

          <h2 className="text-[#111111] font-extrabold tracking-tight text-3xl sm:text-4xl md:text-5xl">
            {title}
          </h2>

          {subtitle && (
            <p className="mt-3 text-black/60 text-sm sm:text-base md:text-lg">
              {subtitle}
            </p>
          )}

          <div className="mt-6 mx-auto flex h-1 w-40 overflow-hidden rounded-full">
            <div className="w-1/2 bg-[#C60C30]" />
            <div className="w-1/2 bg-[#003478]" />
          </div>
        </div>

        <div className="mb-8 md:mb-10">
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {locations.map((loc) => {
                const active = loc.id === currentLocationId;

                return (
                  <button
                    key={loc.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setLocation(loc.id)}
                    className={cn(
                      "group relative text-left rounded-2xl border transition-all duration-200",
                      "px-5 py-5 min-w-[280px] flex-shrink-0",
                      active
                        ? "bg-white border-[#003478] shadow-[0_12px_35px_rgba(0,52,120,0.14)]"
                        : "bg-white/80 border-black/10 hover:border-[#C60C30]/40",
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "h-12 w-12 rounded-2xl flex items-center justify-center border",
                          active
                            ? "bg-[#003478]/5 border-[#003478]/20"
                            : "bg-white border-black/10",
                        )}
                      >
                        {loc.icon ?? <LocationIconFallback />}
                      </div>

                      <div>
                        <div
                          className={cn(
                            "text-xs tracking-widest font-semibold uppercase",
                            active ? "text-[#C60C30]" : "text-black/40",
                          )}
                        >
                          {loc.badge}
                        </div>

                        <div
                          className={cn(
                            "text-xl font-bold",
                            active ? "text-[#003478]" : "text-black/70",
                          )}
                        >
                          {loc.name}
                        </div>
                      </div>
                    </div>

                    {active && (
                      <div className="absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-gradient-to-r from-[#C60C30] to-[#003478]" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations.map((loc) => {
              const active = loc.id === currentLocationId;

              return (
                <button
                  key={loc.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setLocation(loc.id)}
                  className={cn(
                    "group relative text-left rounded-2xl border transition-all duration-200",
                    "px-6 py-6 overflow-hidden",
                    active
                      ? "bg-white border-[#003478] shadow-[0_12px_35px_rgba(0,52,120,0.14)]"
                      : "bg-white/80 border-black/10 hover:border-[#C60C30]/40 hover:bg-white",
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "h-12 w-12 rounded-2xl flex items-center justify-center border",
                        active
                          ? "bg-[#003478]/5 border-[#003478]/20"
                          : "bg-white border-black/10",
                      )}
                    >
                      {loc.icon ?? <LocationIconFallback />}
                    </div>

                    <div>
                      <div
                        className={cn(
                          "text-xs tracking-widest font-semibold uppercase",
                          active ? "text-[#C60C30]" : "text-black/40",
                        )}
                      >
                        {loc.badge}
                      </div>

                      <div
                        className={cn(
                          "text-xl font-bold",
                          active ? "text-[#003478]" : "text-black/70",
                        )}
                      >
                        {loc.name}
                      </div>
                    </div>
                  </div>

                  {active && (
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#C60C30] to-[#003478]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {enableFilters &&
          (availableClassTags.length > 0 || effectiveTimeSlots.length > 0) && (
            <div className="mb-8 md:mb-10 flex flex-col gap-3">
              <FilterPillRow
                label="Class"
                allLabel="All classes"
                options={availableClassTags}
                active={activeClassFilter}
                onChange={setActiveClassFilter}
              />

              <FilterPillRow
                label="Time"
                allLabel="All times"
                options={effectiveTimeSlots}
                active={activeTimeFilter}
                onChange={setActiveTimeFilter}
              />
            </div>
          )}

        <div className="md:hidden">
          <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden mb-4">
            <div
              role="tablist"
              aria-label="Select day"
              className="flex overflow-x-auto gap-1 p-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {days.map((d) => {
                const active = d === activeDay;

                return (
                  <button
                    key={d}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveDay(d)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex-shrink-0 border",
                      active
                        ? "bg-[#003478] text-white border-[#003478]"
                        : "bg-white text-black/60 border-black/10 hover:text-[#C60C30]",
                    )}
                  >
                    {shortDay(d)}
                  </button>
                );
              })}
            </div>
          </div>

          <div role="tabpanel" aria-label={activeDay} className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-black/10 bg-[#F8FAFC]">
              <div className="text-[#003478] font-bold">{activeDay}</div>
              <div className="text-black/45 text-xs mt-1">
                Times shown below for{" "}
                {locations.find((l) => l.id === currentLocationId)?.name ??
                  "selected location"}
              </div>
            </div>

            <div className="divide-y divide-black/10">
              {effectiveTimeSlots.map((slot) => {
                const cards = mobileGroups.get(slot) ?? [];

                return (
                  <div key={slot} className="px-5 py-5">
                    <div className="text-[#003478] font-semibold tracking-wide mb-3">
                      {slot}
                    </div>

                    {cards.length === 0 ? (
                      <div className="text-black/35 text-sm">No classes</div>
                    ) : (
                      <div className="flex flex-col gap-3">
                        {cards.map((entry) => (
                          <TimetableEntryCard key={entry.id} entry={entry} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="hidden md:block">
          <WeekCalendar
            days={days}
            entries={filtered}
            dayStartHour={dayStartHour}
            dayEndHour={dayEndHour}
            hourHeight={hourHeight}
          />
        </div>
      </div>
    </section>
  );
}
