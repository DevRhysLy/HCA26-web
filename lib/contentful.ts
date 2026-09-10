import type { Metadata } from "next";

import { sortByOrder } from "@/lib/contentfulMappers";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;

const BASE_URL = `https://cdn.contentful.com/spaces/${SPACE_ID}`;

async function contentfulFetch(endpoint: string) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    },
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    const errorBody = await res.text();

    throw new Error(
      `Contentful fetch failed: ${res.status} ${res.statusText}\n${errorBody}`,
    );
  }

  return res.json();
}

/* -------------------------------------------------------------------------- */
/* Generic Helpers                                                            */
/* -------------------------------------------------------------------------- */

async function getEntries(
  contentType: string,
  options?: {
    slug?: string;
    include?: number;
    fullResponse?: boolean;
  },
) {
  const params = new URLSearchParams({
    content_type: contentType,
  });

  if (options?.slug) {
    params.set("fields.slug", options.slug);
  }

  if (options?.include) {
    params.set("include", String(options.include));
  }

  const data = await contentfulFetch(`/entries?${params.toString()}`);

  return options?.fullResponse ? data : data.items;
}

export const FALLBACK_IMAGES = {
  class: "/images/hero-img.jpg",
  location: "/images/hero-img.jpg",
  about: "/images/hero-img.jpg",
  instructor: "/images/khlock.webp",
  header: "/images/hero-img.jpg",
} as const;

export type FallbackImageKind = keyof typeof FALLBACK_IMAGES;

export function getFallbackImageSrc(
  fallback: FallbackImageKind | string = "header",
) {
  if (fallback in FALLBACK_IMAGES) {
    return FALLBACK_IMAGES[fallback as FallbackImageKind];
  }

  return fallback;
}

export function getAssetUrl(
  data: any,
  assetId?: string,
  options?: {
    width?: number;
    quality?: number;
  },
) {
  if (!assetId) return undefined;

  const asset = data.includes?.Asset?.find(
    (asset: any) => asset.sys.id === assetId,
  );

  const url = asset?.fields?.file?.url;

  if (!url) return undefined;

  const width = options?.width ?? 1200;
  const quality = options?.quality ?? 80;

  return `https:${url}?w=${width}&q=${quality}&fm=webp`;
}

export function resolveEntryImage(
  data: any,
  item: any,
  fallback: FallbackImageKind | string = "header",
  options?: {
    width?: number;
    quality?: number;
  },
) {
  return (
    getAssetUrl(data, item?.fields?.image?.sys?.id, options) ??
    getFallbackImageSrc(fallback)
  );
}

export function createSeoMetadata({
  title,
  description,
  imageUrl,
}: {
  title: string;
  description: string;
  imageUrl?: string;
}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl
        ? [{ url: imageUrl, width: 1200, height: 630, alt: title }]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Content Models                                                             */
/* -------------------------------------------------------------------------- */

async function getSortedEntries(contentType: string) {
  const data = await getEntries(contentType, {
    include: 2,
    fullResponse: true,
  });

  return {
    ...data,
    items: sortByOrder(data.items ?? []),
  };
}

/* Locations */
export function getLocations() {
  return getSortedEntries("location");
}

export function getLocationBySlug(slug: string) {
  return getEntries("location", {
    slug,
    include: 2,
    fullResponse: true,
  });
}

/* Instructors */
export function getInstructors() {
  return getEntries("instructor", {
    include: 2,
    fullResponse: true,
  });
}

export function getInstructorBySlug(slug: string) {
  return getEntries("instructor", {
    slug,
    include: 2,
    fullResponse: true,
  });
}

/* Classes */
export function getClasses() {
  return getSortedEntries("martialClass");
}

export function getClassBySlug(slug: string) {
  return getEntries("martialClass", {
    slug,
    include: 2,
    fullResponse: true,
  });
}

/* About */
export function getAbout() {
  return getSortedEntries("aboutPage");
}

export function getAboutPageBySlug(slug: string) {
  return getEntries("aboutPage", {
    slug,
    include: 2,
    fullResponse: true,
  });
}

/* Testimonials */
export function getTestimonials() {
  return getEntries("testimonial");
}

/* FAQ */
export function getFaqs() {
  return getEntries("faq");
}

/* Calendar */
export function getCalendarEvents() {
  return getEntries("calendarEvent");
}

export function getWeeklyThemes() {
  return getEntries("weeklyTheme");
}

/* Schedule */
export function getScheduleEntries() {
  return getEntries("scheduleEntry", { include: 3, fullResponse: true });
}
