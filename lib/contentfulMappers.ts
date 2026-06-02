import { getAssetUrl } from "@/lib/contentful";

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