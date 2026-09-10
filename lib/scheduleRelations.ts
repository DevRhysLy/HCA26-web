import type {
  TimetableClassCard,
  TimetableLinkedClass,
  TimetableLocation,
} from "@/components/timetable/types";
import type { TimetableData } from "@/lib/contentfulMappers";

export interface RelatedClass {
  slug: string;
  title: string;
  ageRange?: string;
  href: string;
}

export interface RelatedInstructor {
  name: string;
  rank?: string;
  href?: string;
}

export interface SessionItem {
  id: string;
  day: TimetableClassCard["day"];
  time: string;
  label: string;
  href?: string;
  meta?: string;
}

export function toSessionItems(
  entries: TimetableClassCard[],
  locations: TimetableLocation[],
  mode: "class" | "location" | "instructor",
): SessionItem[] {
  const locationName = (id: string) =>
    locations.find((location) => location.id === id)?.name ?? id;

  return entries.map((entry) => {
    const linked = entry.linkedClasses?.[0];
    const time = entry.timeLabelOverride ?? entry.timeSlot;

    if (mode === "class") {
      return {
        id: entry.id,
        day: entry.day,
        time,
        label: locationName(entry.locationId),
        href: `/locations/${entry.locationId}`,
        meta: entry.instructor?.name,
      };
    }

    if (mode === "location") {
      return {
        id: entry.id,
        day: entry.day,
        time,
        label: linked?.title ?? entry.title,
        href: linked?.href,
        meta: entry.instructor?.name,
      };
    }

    return {
      id: entry.id,
      day: entry.day,
      time,
      label: linked?.title ?? entry.title,
      href: linked?.href,
      meta: locationName(entry.locationId),
    };
  });
}

function uniqueClasses(entries: TimetableClassCard[]): RelatedClass[] {
  const seen = new Set<string>();
  const classes: RelatedClass[] = [];

  for (const entry of entries) {
    for (const linked of entry.linkedClasses ?? []) {
      if (!linked.slug || seen.has(linked.slug)) continue;
      seen.add(linked.slug);
      classes.push({
        slug: linked.slug,
        title: linked.title,
        ageRange: linked.ageRange,
        href: linked.href,
      });
    }
  }

  return classes;
}

function uniqueInstructors(entries: TimetableClassCard[]): RelatedInstructor[] {
  const seen = new Set<string>();
  const instructors: RelatedInstructor[] = [];

  for (const entry of entries) {
    const instructor = entry.instructor;
    if (!instructor?.name) continue;
    const key = instructor.slug ?? instructor.name;
    if (seen.has(key)) continue;
    seen.add(key);
    instructors.push({
      name: instructor.name,
      rank: instructor.rank,
      href: instructor.href,
    });
  }

  return instructors;
}

function uniqueLocations(
  entries: TimetableClassCard[],
  locations: TimetableLocation[],
): TimetableLocation[] {
  const ids = new Set(entries.map((entry) => entry.locationId));
  return locations.filter((location) => ids.has(location.id));
}

export function relateByLocation(data: TimetableData, slug: string) {
  const entries = data.entries.filter((entry) => entry.locationId === slug);
  const location = data.locations.find((item) => item.id === slug);

  return {
    location,
    entries,
    classes: uniqueClasses(entries),
    instructors: uniqueInstructors(entries),
    locations: location ? [location] : [],
    timeSlots: data.timeSlotsByLocation[slug] ?? [],
  };
}

export function relateByClass(data: TimetableData, slug: string) {
  const entries = data.entries.filter((entry) =>
    entry.linkedClasses?.some((linked: TimetableLinkedClass) => linked.slug === slug),
  );

  return {
    entries,
    classes: uniqueClasses(entries),
    instructors: uniqueInstructors(entries),
    locations: uniqueLocations(entries, data.locations),
    timeSlots: data.timeSlots,
    timeSlotsByLocation: data.timeSlotsByLocation,
  };
}

export function relateByInstructor(data: TimetableData, slug: string) {
  const entries = data.entries.filter(
    (entry) =>
      entry.instructor?.slug === slug ||
      entry.instructor?.href === `/instructors/${slug}`,
  );

  return {
    entries,
    classes: uniqueClasses(entries),
    instructors: uniqueInstructors(entries),
    locations: uniqueLocations(entries, data.locations),
    timeSlots: data.timeSlots,
    timeSlotsByLocation: data.timeSlotsByLocation,
  };
}

export function emptySchedule(): TimetableData {
  return {
    locations: [],
    entries: [],
    timeSlots: [],
    timeSlotsByLocation: {},
  };
}

export async function safeBuildTimetable(
  loader: () => Promise<unknown>,
  builder: (data: any) => TimetableData,
): Promise<TimetableData> {
  try {
    const data = await loader();
    return builder(data);
  } catch {
    return emptySchedule();
  }
}
