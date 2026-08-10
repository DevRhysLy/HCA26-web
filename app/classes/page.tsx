import { getClasses } from "@/lib/contentful";
import CardGridPage from "@/components/content/CardGridPage";
import { mapToCardItem } from "@/lib/contentfulMappers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Classes",
  description:
    "Explore Hapkido classes for children, youth, and adults at Hapkido College of Australia.",

  openGraph: {
    title: "Classes",
    description:
      "Explore Hapkido classes for children, youth, and adults at Hapkido College of Australia.",
  },
};

export default async function Classes() {
  const classes = await getClasses();

  const items = classes.map((classItem: any) =>
    mapToCardItem(classItem, {
      basePath: "/classes",
      badge: classItem.fields.ageRange,
      ctaLabel: "View Class",
    }),
  );

  return (
    <CardGridPage
      title="Our Curriculum"
      description="A structured Hapkido curriculum for every age, from Little Tigers through Adults — 35+ years of one traditional system, built for personal development and real self-defence, not competition."
      items={items}
    />
  );
}