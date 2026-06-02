import { getAssetUrl } from "@/lib/contentful";

export async function getSlugPageData({
  slug,
  fetcher,
  imageField = "image",
}: {
  slug: string;
  fetcher: (slug: string) => Promise<any>;
  imageField?: string;
}) {
  const data = await fetcher(slug);
  const entry = data.items?.[0];

  if (!entry) {
    return {
      entry: null,
      imageUrl: undefined,
    };
  }

  const imageUrl = getAssetUrl(data, entry.fields[imageField]?.sys?.id);

  return {
    entry,
    imageUrl,
  };
}

export function getSeoDescription({
  entry,
  fallback,
}: {
  entry: any;
  fallback: string;
}) {
  return entry.fields.description ?? fallback;
}

export function createHeroImage(entry: any, imageUrl?: string) {
  return imageUrl
    ? {
        src: imageUrl,
        alt: entry.fields.title,
      }
    : undefined;
}