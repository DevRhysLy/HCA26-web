import { FAQ_DEFAULT_CATEGORY } from "@/config/faq";
import {
  getAssetUrl,
  resolveEntryImage,
  type FallbackImageKind,
} from "@/lib/contentful";
import {
  formatDateKey,
  WEEKLY_THEME_COLORS,
  type CalendarItem,
  type WeeklyTheme,
  type WeeklyThemeColor,
} from "@/lib/calendarUtils";
import type {
  TimetableCardVariant,
  TimetableClassCard,
  TimetableDay,
  TimetableLinkedClass,
  TimetableLocation,
} from "@/components/timetable/types";
import { parseTimeToMinutes } from "@/components/timetable/time";

const TIMETABLE_VARIANTS: TimetableCardVariant[] = [
  "kids",
  "youth",
  "adults",
  "advanced",
  "generic",
];

const DAY_ORDER: Record<TimetableDay, number> = {
  Monday: 0,
  Tuesday: 1,
  Wednesday: 2,
  Thursday: 3,
  Friday: 4,
  Saturday: 5,
};

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  order?: number;
}

export function mapFaqItem(faq: any): FaqItem {
  const categoryValue = faq.fields.category;
  const category =
    typeof categoryValue === "string" && categoryValue.trim()
      ? categoryValue.trim()
      : FAQ_DEFAULT_CATEGORY;

  return {
    id: faq.sys.id,
    question: faq.fields.question ?? faq.fields.title ?? "",
    answer: faq.fields.answer ?? faq.fields.description ?? "",
    category,
    order:
      typeof faq.fields.order === "number" ? faq.fields.order : undefined,
  };
}

export function mapFaqs(faqs: any[]): FaqItem[] {
  return faqs.map(mapFaqItem);
}

export function sortFaqs(faqs: FaqItem[]): FaqItem[] {
  return [...faqs].sort((a, b) => {
    const orderDiff = (a.order ?? 999) - (b.order ?? 999);
    if (orderDiff !== 0) {
      return orderDiff;
    }

    return a.question.localeCompare(b.question);
  });
}

export function groupFaqsByCategory(
  faqs: FaqItem[],
  categoryOrder: readonly string[] = [],
): { category: string; faqs: FaqItem[] }[] {
  const sortedFaqs = sortFaqs(faqs);
  const grouped = new Map<string, FaqItem[]>();

  for (const faq of sortedFaqs) {
    const category = faq.category || FAQ_DEFAULT_CATEGORY;
    const items = grouped.get(category) ?? [];
    items.push(faq);
    grouped.set(category, items);
  }

  const orderedCategories = [
    ...categoryOrder.filter((category) => grouped.has(category)),
    ...[...grouped.keys()]
      .filter((category) => !categoryOrder.includes(category))
      .sort((a, b) => a.localeCompare(b)),
  ];

  return orderedCategories.map((category) => ({
    category,
    faqs: grouped.get(category) ?? [],
  }));
}

export function normalizeOrder(value: unknown): number {
  return typeof value === "number" ? value : 999;
}

export function sortByOrder<T extends { fields: { order?: number } }>(
  items: T[]
) {
  return [...items].sort(
    (a, b) =>
      normalizeOrder(a.fields.order) - normalizeOrder(b.fields.order),
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
    meta:
      typeof item.fields.address === "string" ? item.fields.address : undefined,
    ctaLabel: options.ctaLabel ?? "View more",
  };
}

export function mapToImageCardItem(
  item: any,
  data: any,
  options: {
    basePath: string;
    ctaLabel?: string;
    badge?: string;
    fallbackImage?: FallbackImageKind | string;
  }
) {
  return {
    ...mapToCardItem(item, options),
    image: {
      src: resolveEntryImage(
        data,
        item,
        options.fallbackImage ?? "header",
      ),
      alt: item.fields.title,
    },
  };
}

export function inferTimetableVariant(classEntry: any): TimetableCardVariant {
  const explicit = classEntry.fields?.timetableVariant;
  if (TIMETABLE_VARIANTS.includes(explicit)) {
    return explicit;
  }

  const text =
    `${classEntry.fields?.slug ?? ""} ${classEntry.fields?.tag ?? ""} ${classEntry.fields?.ageRange ?? ""} ${classEntry.fields?.title ?? ""}`.toLowerCase();

  if (
    text.includes("kid") ||
    text.includes("child") ||
    text.includes("tiger")
  ) {
    return "kids";
  }

  if (text.includes("youth") || text.includes("teen")) {
    return "youth";
  }

  if (
    text.includes("eagle") ||
    text.includes("team") ||
    text.includes("advanced")
  ) {
    return "advanced";
  }

  if (text.includes("adult")) {
    return "adults";
  }

  return "generic";
}

function mapLinkedClass(classEntry: any): TimetableLinkedClass {
  const tagValue = classEntry.fields?.tag;

  return {
    id: classEntry.sys.id,
    slug: classEntry.fields.slug,
    title: classEntry.fields.title ?? "",
    tag:
      typeof tagValue === "string" && tagValue.trim()
        ? tagValue.trim()
        : undefined,
    ageRange: classEntry.fields.ageRange,
    description: classEntry.fields.description,
    href: `/classes/${classEntry.fields.slug}`,
  };
}

function resolveLinkedClasses(item: any, data: any): any[] {
  const refs = item.fields?.classes ?? [];
  if (!Array.isArray(refs)) {
    return [];
  }

  return refs
    .map((ref: any) => {
      const id = ref?.sys?.id;
      if (!id) return null;

      return data.includes?.Entry?.find(
        (entry: any) =>
          entry.sys.id === id &&
          entry.sys?.contentType?.sys?.id === "martialClass",
      );
    })
    .filter((entry): entry is any => entry != null);
}

function buildDisplayFromClasses(classEntries: any[]): {
  title: string;
  tag: string;
  description?: string;
  ageRange?: string;
  variant?: TimetableCardVariant;
  linkedClasses: TimetableLinkedClass[];
} {
  const linkedClasses = classEntries.map(mapLinkedClass);

  if (linkedClasses.length === 0) {
    return { title: "", tag: "", linkedClasses: [] };
  }

  if (linkedClasses.length === 1) {
    const classEntry = classEntries[0];

    return {
      title: linkedClasses[0].title,
      tag: linkedClasses[0].tag ?? "",
      description: linkedClasses[0].description,
      ageRange: linkedClasses[0].ageRange,
      variant: inferTimetableVariant(classEntry),
      linkedClasses,
    };
  }

  const tags = [
    ...new Set(linkedClasses.map((cls) => cls.tag).filter(Boolean)),
  ] as string[];
  const ageRanges = [
    ...new Set(linkedClasses.map((cls) => cls.ageRange).filter(Boolean)),
  ] as string[];
  const variants = classEntries.map(inferTimetableVariant);
  const uniqueVariants = [...new Set(variants)];

  return {
    title: linkedClasses.map((cls) => cls.title).join(" & "),
    tag: tags.join(" & "),
    ageRange: ageRanges.join(" & "),
    variant: uniqueVariants.length === 1 ? uniqueVariants[0] : "generic",
    linkedClasses,
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
    const instructorSlug = instructorEntry.fields.slug;
    instructor = {
      name: instructorEntry.fields.name ?? instructorEntry.fields.title ?? "",
      rank: instructorEntry.fields.rank,
      photo: photoId ? getAssetUrl(data, photoId, { width: 80 }) : undefined,
      slug: instructorSlug,
      href: instructorSlug ? `/instructors/${instructorSlug}` : undefined,
    };
  }

  const classEntries = resolveLinkedClasses(item, data);
  const display = buildDisplayFromClasses(classEntries);

  return {
    id: item.sys.id,
    locationId,
    day: item.fields.day,
    timeSlot: item.fields.timeSlot,
    tag: display.tag,
    title: display.title,
    variant: display.variant,
    description: display.description,
    ageRange: display.ageRange,
    durationMinutes:
      typeof item.fields.durationMinutes === "number"
        ? item.fields.durationMinutes
        : undefined,
    instructor,
    linkedClasses: display.linkedClasses,
  };
}

function timeSlotToMinutes(slot: string): number {
  return parseTimeToMinutes(slot) ?? Number.MAX_SAFE_INTEGER;
}

export interface TimetableData {
  locations: TimetableLocation[];
  entries: TimetableClassCard[];
  timeSlots: string[];
  timeSlotsByLocation: Record<string, string[]>;
}

export function buildTimetableData(data: any): TimetableData {
  const items: any[] = data?.items ?? [];
  const entries = items
    .map((item) => ({
      order: item.fields?.order ?? 999,
      entry: mapScheduleEntry(item, data),
    }))
    .sort((a, b) => {
      const dayDiff = DAY_ORDER[a.entry.day] - DAY_ORDER[b.entry.day];
      if (dayDiff !== 0) return dayDiff;

      const timeDiff =
        timeSlotToMinutes(a.entry.timeSlot) - timeSlotToMinutes(b.entry.timeSlot);
      if (timeDiff !== 0) return timeDiff;

      return a.order - b.order;
    })
    .map(({ entry }) => entry);

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

function normalizeContentfulDate(value?: string) {
  if (!value) return "";
  return value.slice(0, 10);
}

function addDaysToDateKey(dateKey: string, days: number) {
  const [year, month, day] = dateKey.split("-").map(Number);
  const date = new Date(year, month - 1, day);
  date.setDate(date.getDate() + days);
  return formatDateKey(date);
}

function parseWeeklyThemeColor(value: unknown): WeeklyThemeColor {
  if (
    typeof value === "string" &&
    WEEKLY_THEME_COLORS.includes(value as WeeklyThemeColor)
  ) {
    return value as WeeklyThemeColor;
  }

  return "blue";
}

export function mapWeeklyTheme(item: any): WeeklyTheme {
  const weekStartDate = normalizeContentfulDate(item.fields.weekStartDate);

  return {
    id: item.sys.id,
    title: item.fields.title ?? "",
    description: item.fields.description,
    weekStartDate,
    weekEndDate: addDaysToDateKey(weekStartDate, 5),
    location: item.fields.location,
    themeColor: parseWeeklyThemeColor(item.fields.themeColor),
  };
}

export function mapWeeklyThemes(items: any[]): WeeklyTheme[] {
  return items.map(mapWeeklyTheme);
}

export function mapCalendarEvent(item: any): CalendarItem {
  return {
    id: item.sys.id,
    title: item.fields.title,
    startDate: item.fields.startDate,
    endDate: item.fields.endDate,
    type: item.fields.type,
    description: item.fields.description,
    location: item.fields.location,
    isRecurring: item.fields.isRecurring,
    recurringDay: item.fields.recurringDay,
    recurringStartDate: item.fields.recurringStartDate,
    recurringEndDate: item.fields.recurringEndDate,
  };
}

export function mapCalendarEvents(items: any[]): CalendarItem[] {
  return items
    .map(mapCalendarEvent)
    .filter((item) => item.type !== "weekly-theme" && !item.isRecurring);
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