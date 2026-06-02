import type { MetadataRoute } from "next";

import {
  getClasses,
  getInstructors,
  getLocations,
  getAbout,
} from "@/lib/contentful";

const BASE_URL = "https://www.hapkidocollege.com.au";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [
    classes,
    instructorsData,
    locations,
    aboutPages,
  ] = await Promise.all([
    getClasses(),
    getInstructors(),
    getLocations(),
    getAbout(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
    },

    {
      url: `${BASE_URL}/classes`,
      lastModified: new Date(),
    },

    {
      url: `${BASE_URL}/locations`,
      lastModified: new Date(),
    },

    {
      url: `${BASE_URL}/instructors`,
      lastModified: new Date(),
    },

    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
    },

    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
    },

    {
      url: `${BASE_URL}/faq`,
      lastModified: new Date(),
    },
  ];

  const classPages = classes.map((item: any) => ({
    url: `${BASE_URL}/classes/${item.fields.slug}`,
    lastModified: new Date(),
  }));

  const instructorPages = instructorsData.items.map((item: any) => ({
    url: `${BASE_URL}/instructors/${item.fields.slug}`,
    lastModified: new Date(),
  }));

  const locationPages = locations.map((item: any) => ({
    url: `${BASE_URL}/locations/${item.fields.slug}`,
    lastModified: new Date(),
  }));

  const aboutSlugPages = aboutPages.map((item: any) => ({
    url: `${BASE_URL}/about/${item.fields.slug}`,
    lastModified: new Date(),
  }));

  return [
    ...staticPages,
    ...classPages,
    ...instructorPages,
    ...locationPages,
    ...aboutSlugPages,
  ];
}