import { getAbout } from "@/lib/contentful";
import CardGridPage from "@/components/content/CardGridPage";
import type { Metadata } from "next";
import { mapToImageCardItem } from "@/lib/contentfulMappers";
export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Hapkido College of Australia and Hapkido in general",
};

export default async function About() {
  const aboutData = await getAbout();
  const items = aboutData.items.map((page: any) =>
    mapToImageCardItem(page, aboutData, {
      basePath: "/about",
      ctaLabel: "Read article",
      fallbackImage: "about",
    }),
  );

  return (
    <CardGridPage
      title="About Us"
      description="What Hapkido is, and how HCA teaches it."
      items={items}
    />
  );
}
