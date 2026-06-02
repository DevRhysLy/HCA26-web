import type { MetadataRoute } from "next";

import {
  getClasses,
  getInstructors,
  getLocations,
  getAbout,
} from "@/lib/contentful";

const BASE_URL = "https://www.hapkidocollege.com.au";

function createSitemapEntry(
  path: string,
  options?: {
    priority?: number;
    changeFrequency?: MetadataRoute.Sitemap[number]["changeFrequency"];
  },
): MetadataRoute.Sitemap[number] {
  return {
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: options?.changeFrequency ?? "monthly",
    priority: options?.priority ?? 0.7,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [classes, instructorsData, locations, aboutPages] = await Promise.all([
    getClasses(),
    getInstructors(),
    getLocations(),
    getAbout(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    createSitemapEntry("/", {
      priority: 1,
      changeFrequency: "weekly",
    }),
    createSitemapEntry("/classes", {
      priority: 0.9,
      changeFrequency: "monthly",
    }),
    createSitemapEntry("/locations", {
      priority: 0.9,
      changeFrequency: "monthly",
    }),
    createSitemapEntry("/instructors", {
      priority: 0.8,
      changeFrequency: "monthly",
    }),
    createSitemapEntry("/about", {
      priority: 0.7,
      changeFrequency: "monthly",
    }),
    createSitemapEntry("/contact", {
      priority: 0.9,
      changeFrequency: "monthly",
    }),
    createSitemapEntry("/faq", {
      priority: 0.7,
      changeFrequency: "monthly",
    }),
  ];

  const classPages = classes.map((item: any) =>
    createSitemapEntry(`/classes/${item.fields.slug}`, {
      priority: 0.8,
      changeFrequency: "monthly",
    }),
  );

  const instructorPages = instructorsData.items.map((item: any) =>
    createSitemapEntry(`/instructors/${item.fields.slug}`, {
      priority: 0.6,
      changeFrequency: "monthly",
    }),
  );

  const locationPages = locations.map((item: any) =>
    createSitemapEntry(`/locations/${item.fields.slug}`, {
      priority: 0.85,
      changeFrequency: "monthly",
    }),
  );

  const aboutSlugPages = aboutPages.map((item: any) =>
    createSitemapEntry(`/about/${item.fields.slug}`, {
      priority: 0.6,
      changeFrequency: "monthly",
    }),
  );

  return [
    ...staticPages,
    ...classPages,
    ...instructorPages,
    ...locationPages,
    ...aboutSlugPages,
  ];
}
