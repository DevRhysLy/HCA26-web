"use client";

import * as React from "react";
import TimetableEntryCard from "@/components/timetable/TimetableEntryCard";
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
    [entries, currentLocationId],
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
          <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
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
                    <div className="px-6 py-6 bg-[#F8FAFC]">
                      <div className="text-[#003478] font-bold tracking-wide">
                        {slot}
                      </div>
                    </div>

                    {days.map((d) => {
                      const cards = row.get(d) ?? [];

                      return (
                        <div key={d} className="p-4 border-l border-black/10">
                          <div className="flex flex-col gap-3">
                            {cards.map((entry) => (
                              <TimetableEntryCard
                                key={entry.id}
                                entry={entry}
                              />
                            ))}

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
