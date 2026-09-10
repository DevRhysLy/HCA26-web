import {
  getAssetUrl,
  getFallbackImageSrc,
  type FallbackImageKind,
} from "@/lib/contentful";

export async function getSlugPageData({
  slug,
  fetcher,
  imageField = "image",
  fallbackImage = "header",
  imageOptions = {
    width: 2400,
    quality: 90,
  },
}: {
  slug: string;
  fetcher: (slug: string) => Promise<any>;
  imageField?: string;
  fallbackImage?: FallbackImageKind | string;
  imageOptions?: {
    width?: number;
    quality?: number;
  };
}) {
  const data = await fetcher(slug);
  const entry = data.items?.[0];

  if (!entry) {
    return {
      entry: null,
      imageUrl: getFallbackImageSrc(fallbackImage),
    };
  }

  const imageUrl =
    getAssetUrl(data, entry.fields[imageField]?.sys?.id, imageOptions) ??
    getFallbackImageSrc(fallbackImage);

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
  return {
    src: imageUrl ?? getFallbackImageSrc("header"),
    alt: entry.fields.title,
  };
}