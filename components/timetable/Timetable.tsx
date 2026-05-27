"use client";

import * as React from "react";

/** Days shown in the grid */
export type TimetableDay =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";

export const DEFAULT_DAYS: TimetableDay[] = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export interface TimetableLocation {
  id: string;
  badge: string;
  name: string;
  icon?: React.ReactNode;
}

export type TimetableCardVariant =
  | "kids"
  | "youth"
  | "adults"
  | "advanced"
  | "generic";

export interface TimetableClassCard {
  id: string;
  locationId: string;
  day: TimetableDay;
  timeSlot: string;
  tag: string;
  title: string;
  variant?: TimetableCardVariant;
  showTimeInsideCard?: boolean;
  timeLabelOverride?: string;
}

export interface TimetableProps {
  title: string;
  subtitle?: string;
  locations: TimetableLocation[];
  selectedLocationId?: string;
  defaultSelectedLocationId?: string;
  onLocationChange?: (locationId: string) => void;
  days?: TimetableDay[];
  timeSlots: string[];
  timeSlotsByLocation?: Record<string, string[]>;
  entries: TimetableClassCard[];
  containerClassName?: string;
}

/* ------------------------------ Helpers ------------------------------ */

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

function getCardStyle(variant: TimetableCardVariant) {
  switch (variant) {
    case "kids":
      return {
        wrap: "bg-[#003478]/5 border border-[#003478]/20 hover:border-[#003478]/40",
        accent: "bg-[#003478]",
        tag: "text-[#003478]",
        title: "text-[#111111]",
      };
    case "youth":
      return {
        wrap: "bg-[#C60C30]/5 border border-[#C60C30]/20 hover:border-[#C60C30]/40",
        accent: "bg-[#C60C30]",
        tag: "text-[#C60C30]",
        title: "text-[#111111]",
      };
    case "advanced":
      return {
        wrap: "bg-white border border-[#003478]/30 hover:border-[#003478]/50 shadow-sm",
        accent: "bg-[#003478]",
        tag: "text-[#003478]",
        title: "text-[#111111]",
      };
    case "adults":
      return {
        wrap: "bg-white border border-black/10 hover:border-[#C60C30]/40 shadow-sm",
        accent: "bg-[#C60C30]",
        tag: "text-black/60",
        title: "text-[#111111]",
      };
    default:
      return {
        wrap: "bg-white border border-black/10 hover:border-[#003478]/30 shadow-sm",
        accent: "bg-black/30",
        tag: "text-black/60",
        title: "text-[#111111]",
      };
  }
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

  const filtered = React.useMemo(
    () => entries.filter((e) => e.locationId === currentLocationId),
    [entries, currentLocationId]
  );

  const cellMap = React.useMemo(() => {
    const map = new Map<string, Map<TimetableDay, TimetableClassCard[]>>();

    for (const slot of effectiveTimeSlots) {
      map.set(slot, new Map<TimetableDay, TimetableClassCard[]>());
      for (const d of days) map.get(slot)!.set(d, []);
    }

    for (const e of filtered) {
      if (!map.has(e.timeSlot)) continue;
      const row = map.get(e.timeSlot)!;
      if (!row.has(e.day)) continue;
      row.get(e.day)!.push(e);
    }

    return map;
  }, [filtered, effectiveTimeSlots, days]);

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
          containerClassName ?? "max-w-7xl"
        )}
      >
        {/* Title block */}
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

        {/* Location selector */}
        <div className="mb-8 md:mb-10">
          {/* Mobile carousel */}
          <div className="md:hidden">
            <div className="flex gap-4 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {locations.map((loc) => {
                const active = loc.id === currentLocationId;

                return (
                  <button
                    key={loc.id}
                    type="button"
                    onClick={() => setLocation(loc.id)}
                    className={cn(
                      "group relative text-left rounded-2xl border transition-all duration-200",
                      "px-5 py-5 min-w-[280px] flex-shrink-0",
                      active
                        ? "bg-white border-[#003478] shadow-[0_12px_35px_rgba(0,52,120,0.14)]"
                        : "bg-white/80 border-black/10 hover:border-[#C60C30]/40"
                    )}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={cn(
                          "h-12 w-12 rounded-2xl flex items-center justify-center border",
                          active
                            ? "bg-[#003478]/5 border-[#003478]/20"
                            : "bg-white border-black/10"
                        )}
                      >
                        {loc.icon ?? <LocationIconFallback />}
                      </div>

                      <div>
                        <div
                          className={cn(
                            "text-xs tracking-widest font-semibold uppercase",
                            active ? "text-[#C60C30]" : "text-black/40"
                          )}
                        >
                          {loc.badge}
                        </div>

                        <div
                          className={cn(
                            "text-xl font-bold",
                            active ? "text-[#003478]" : "text-black/70"
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

          {/* Desktop grid */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
            {locations.map((loc) => {
              const active = loc.id === currentLocationId;

              return (
                <button
                  key={loc.id}
                  type="button"
                  onClick={() => setLocation(loc.id)}
                  className={cn(
                    "group relative text-left rounded-2xl border transition-all duration-200",
                    "px-6 py-6 overflow-hidden",
                    active
                      ? "bg-white border-[#003478] shadow-[0_12px_35px_rgba(0,52,120,0.14)]"
                      : "bg-white/80 border-black/10 hover:border-[#C60C30]/40 hover:bg-white"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={cn(
                        "h-12 w-12 rounded-2xl flex items-center justify-center border",
                        active
                          ? "bg-[#003478]/5 border-[#003478]/20"
                          : "bg-white border-black/10"
                      )}
                    >
                      {loc.icon ?? <LocationIconFallback />}
                    </div>

                    <div>
                      <div
                        className={cn(
                          "text-xs tracking-widest font-semibold uppercase",
                          active ? "text-[#C60C30]" : "text-black/40"
                        )}
                      >
                        {loc.badge}
                      </div>

                      <div
                        className={cn(
                          "text-xl font-bold",
                          active ? "text-[#003478]" : "text-black/70"
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

        {/* MOBILE VIEW */}
        <div className="md:hidden">
          {/* Day tabs */}
          <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden mb-4">
            <div className="flex overflow-x-auto gap-1 p-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {days.map((d) => {
                const active = d === activeDay;

                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setActiveDay(d)}
                    className={cn(
                      "px-4 py-2 rounded-xl text-sm font-semibold transition-colors flex-shrink-0 border",
                      active
                        ? "bg-[#003478] text-white border-[#003478]"
                        : "bg-white text-black/60 border-black/10 hover:text-[#C60C30]"
                    )}
                  >
                    {shortDay(d)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Day schedule list */}
          <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
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
                        {cards.map((c) => {
                          const variant = c.variant ?? "generic";
                          const style = getCardStyle(variant);
                          const timeInside = c.showTimeInsideCard
                            ? c.timeLabelOverride ?? c.timeSlot
                            : null;

                          return (
                            <div
                              key={c.id}
                              className={cn(
                                "relative rounded-xl px-4 py-4 transition-colors min-h-[84px]",
                                style.wrap
                              )}
                            >
                              <div
                                className={cn(
                                  "absolute left-0 top-3 bottom-3 w-1 rounded-full",
                                  style.accent
                                )}
                              />

                              <div className="pl-3">
                                {timeInside && (
                                  <div className="text-xs font-semibold tracking-wide text-black/50 mb-2">
                                    {timeInside}
                                  </div>
                                )}

                                {c.tag && (
                                  <div
                                    className={cn(
                                      "text-xs font-bold tracking-wide uppercase",
                                      style.tag
                                    )}
                                  >
                                    {c.tag}
                                  </div>
                                )}

                                <div
                                  className={cn(
                                    "mt-1 text-sm font-semibold",
                                    style.title
                                  )}
                                >
                                  {c.title}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:block">
          <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
            {/* Header row */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: `160px repeat(${days.length}, minmax(0, 1fr))`,
              }}
            >
              <div className="px-6 py-5 border-b border-black/10 bg-[#F8FAFC]">
                <span className="text-xs font-bold tracking-widest text-black/50 uppercase">
                  Time Slot
                </span>
              </div>

              {days.map((d) => (
                <div
                  key={d}
                  className="px-6 py-5 border-b border-l border-black/10 bg-[#F8FAFC] text-center"
                >
                  <span className="text-[#003478] font-bold">{d}</span>
                </div>
              ))}
            </div>

            {/* Rows */}
            <div className="divide-y divide-black/10">
              {effectiveTimeSlots.map((slot) => {
                const row = cellMap.get(slot)!;

                return (
                  <div
                    key={slot}
                    className="grid"
                    style={{
                      gridTemplateColumns: `160px repeat(${days.length}, minmax(0, 1fr))`,
                    }}
                  >
                    {/* Time cell */}
                    <div className="px-6 py-6 bg-[#F8FAFC]">
                      <div className="text-[#003478] font-bold tracking-wide">
                        {slot}
                      </div>
                    </div>

                    {/* Day cells */}
                    {days.map((d) => {
                      const cards = row.get(d) ?? [];

                      return (
                        <div key={d} className="p-4 border-l border-black/10">
                          <div className="flex flex-col gap-3">
                            {cards.map((c) => {
                              const variant = c.variant ?? "generic";
                              const style = getCardStyle(variant);
                              const timeInside = c.showTimeInsideCard
                                ? c.timeLabelOverride ?? c.timeSlot
                                : null;

                              return (
                                <div
                                  key={c.id}
                                  className={cn(
                                    "relative rounded-xl px-4 py-4 transition-colors min-h-[84px]",
                                    style.wrap
                                  )}
                                >
                                  <div
                                    className={cn(
                                      "absolute left-0 top-3 bottom-3 w-1 rounded-full",
                                      style.accent
                                    )}
                                  />

                                  <div className="pl-3">
                                    {timeInside && (
                                      <div className="text-xs font-semibold tracking-wide text-black/50 mb-2">
                                        {timeInside}
                                      </div>
                                    )}

                                    {c.tag && (
                                      <div
                                        className={cn(
                                          "text-xs font-bold tracking-wide uppercase",
                                          style.tag
                                        )}
                                      >
                                        {c.tag}
                                      </div>
                                    )}

                                    <div
                                      className={cn(
                                        "mt-1 text-sm font-semibold",
                                        style.title
                                      )}
                                    >
                                      {c.title}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}

                            {cards.length === 0 && (
                              <div className="h-[84px] rounded-xl border border-transparent" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}