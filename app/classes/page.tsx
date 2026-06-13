import { getClasses } from "@/lib/contentful";
import CardGridPage from "@/components/content/CardGridPage";
import { sortByOrder, mapToCardItem } from "@/lib/contentfulMappers";
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

  const items = sortByOrder(classes).map((classItem: any) =>
    mapToCardItem(classItem, {
      basePath: "/classes",
      badge: classItem.fields.ageRange,
      ctaLabel: "View Class",
    }),
  );

  return (
    <CardGridPage
      title="Our Classes"
      description="Explore our traditional Hapkido programs designed to support students of all ages in a safe and welcoming environment."
      items={items}
    />
  );
}