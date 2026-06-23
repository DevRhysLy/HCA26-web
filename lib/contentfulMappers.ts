import { FAQ_DEFAULT_CATEGORY } from "@/config/faq";
import { getAssetUrl } from "@/lib/contentful";

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