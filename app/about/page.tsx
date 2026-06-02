import { getAbout } from "@/lib/contentful";
import CardGridPage from "@/components/content/CardGridPage";
import type { Metadata } from "next";
import { mapToCardItem } from "@/lib/contentfulMappers";
export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Hapkido College of Australia and Hapkido in general",
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
    <>
      <CardGridPage
        title="About Us"
        description="Learn more about what Hapkido is and what it can do for you."
        items={items}
      />
    </>
  );
}
