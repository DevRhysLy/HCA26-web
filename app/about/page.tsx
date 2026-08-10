import { getAbout } from "@/lib/contentful";
import CardGridPage from "@/components/content/CardGridPage";
import type { Metadata } from "next";
import { mapToCardItem } from "@/lib/contentfulMappers";
export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Hapkido College of Australia — a traditional martial arts school for children, youth, and adults, focused on personal development and self-defence.",
};

export default async function About() {
  const aboutPages = await getAbout();
  const items = aboutPages.map((page: any) =>
    mapToCardItem(page, {
      basePath: "/about",
      ctaLabel: "Learn More",
    }),
  );

  return (
    <CardGridPage
      title="About HCA"
      description="Founded by Master Young Kil Kim, an 8th Dan Master with 40+ years preserving traditional Korean Hapkido — a lineage, not a trend. Discover the college, the faculty, and the community he built, for personal development and real self-defence at every age."
      items={items}
    />
  );
}
