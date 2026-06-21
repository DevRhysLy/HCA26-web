import { getAssetUrl } from "@/lib/contentful";
import type {
  TimetableClassCard,
  TimetableLocation,
} from "@/components/timetable/types";

export function sortByOrder<T extends { fields: { order?: number } }>(
  items: T[]
) {
  return [...items].sort(
    (a, b) => (a.fields.order ?? 999) - (b.fields.order ?? 999)
  );
}

export function mapToCardItem(
  item: any,
  options: {
    basePath: string;
    ctaLabel?: string;
    badge?: string;
  }
) {
  return {
    id: item.sys.id,
    title: item.fields.title,
    description: item.fields.description,
    href: `${options.basePath}/${item.fields.slug}`,
    badge: options.badge,
    ctaLabel: options.ctaLabel ?? "View More",
  };
}

export function mapToImageCardItem(
  item: any,
  data: any,
  options: {
    basePath: string;
    ctaLabel?: string;
    badge?: string;
  }
) {
  const imageUrl = getAssetUrl(data, item.fields.image?.sys?.id);

  return {
    ...mapToCardItem(item, options),
    image: imageUrl
      ? {
          src: imageUrl,
          alt: item.fields.title,
        }
      : undefined,
  };
}

export function mapScheduleEntry(item: any, data: any): TimetableClassCard {
  const locationRef = item.fields.location?.sys?.id;
  const locationEntry = data.includes?.Entry?.find(
    (e: any) => e.sys.id === locationRef,
  );
  const locationId: string = locationEntry?.fields?.slug ?? locationRef ?? "";

  const instructorRef = item.fields.instructor?.sys?.id;
  const instructorEntry = data.includes?.Entry?.find(
    (e: any) => e.sys.id === instructorRef,
  );

  let instructor: TimetableClassCard["instructor"] = undefined;
  if (instructorEntry) {
    const photoId = instructorEntry.fields.image?.sys?.id;
    instructor = {
      name: instructorEntry.fields.name ?? instructorEntry.fields.title ?? "",
      rank: instructorEntry.fields.rank,
      photo: photoId ? getAssetUrl(data, photoId, { width: 80 }) : undefined,
    };
  }

  return {
    id: item.sys.id,
    locationId,
    day: item.fields.day,
    timeSlot: item.fields.timeSlot,
    tag: item.fields.tag ?? "",
    title: item.fields.title ?? "",
    variant: item.fields.variant,
    description: item.fields.description,
    ageRange: item.fields.ageRange,
    duration: item.fields.duration,
    instructor,
  };
}

function timeSlotToMinutes(slot: string): number {
  const match = slot.trim().match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
  if (!match) return Number.MAX_SAFE_INTEGER;

  let hours = parseInt(match[1], 10) % 12;
  const minutes = parseInt(match[2], 10);
  if (match[3].toUpperCase() === "PM") hours += 12;

  return hours * 60 + minutes;
}

export interface TimetableData {
  locations: TimetableLocation[];
  entries: TimetableClassCard[];
  timeSlots: string[];
  timeSlotsByLocation: Record<string, string[]>;
}

export function buildTimetableData(data: any): TimetableData {
  const items: any[] = data?.items ?? [];
  const entries = items.map((item) => mapScheduleEntry(item, data));

  const locationEntries: any[] = (data?.includes?.Entry ?? []).filter(
    (e: any) => e.sys?.contentType?.sys?.id === "location",
  );

  const locationMeta = new Map<
    string,
    { badge: string; name: string; order: number }
  >();

  for (const loc of locationEntries) {
    const id = loc.fields?.slug;
    if (!id) continue;
    locationMeta.set(id, {
      badge: loc.fields?.badge ?? "DOJANG",
      name: loc.fields?.title ?? id,
      order: loc.fields?.order ?? 999,
    });
  }

  const locationOrder: string[] = [];
  const timeSlotsByLocation: Record<string, Set<string>> = {};
  const allTimeSlots = new Set<string>();

  for (const entry of entries) {
    if (!entry.locationId) continue;
    if (!timeSlotsByLocation[entry.locationId]) {
      timeSlotsByLocation[entry.locationId] = new Set<string>();
      locationOrder.push(entry.locationId);
    }
    if (entry.timeSlot) {
      timeSlotsByLocation[entry.locationId].add(entry.timeSlot);
      allTimeSlots.add(entry.timeSlot);
    }
  }

  const locations: TimetableLocation[] = locationOrder
    .map((id) => ({
      id,
      badge: locationMeta.get(id)?.badge ?? "DOJANG",
      name: locationMeta.get(id)?.name ?? id,
      order: locationMeta.get(id)?.order ?? 999,
    }))
    .sort((a, b) => a.order - b.order)
    .map(({ id, badge, name }) => ({ id, badge, name }));

  const sortSlots = (slots: Iterable<string>) =>
    [...slots].sort((a, b) => timeSlotToMinutes(a) - timeSlotToMinutes(b));

  const mappedTimeSlotsByLocation: Record<string, string[]> = {};
  for (const [id, slots] of Object.entries(timeSlotsByLocation)) {
    mappedTimeSlotsByLocation[id] = sortSlots(slots);
  }

  return {
    locations,
    entries,
    timeSlots: sortSlots(allTimeSlots),
    timeSlotsByLocation: mappedTimeSlotsByLocation,
  };
}

export function sortInstructorsByRank(items: any[]) {
  function extractRankNumber(rank?: string): number {
    const match = rank?.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  return [...items].sort((a, b) => {
    const rankA = extractRankNumber(a.fields.rank);
    const rankB = extractRankNumber(b.fields.rank);

    if (rankA !== rankB) {
      return rankB - rankA;
    }

    return (a.fields.order ?? 999) - (b.fields.order ?? 999);
  });
}