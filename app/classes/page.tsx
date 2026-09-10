import { getClasses } from "@/lib/contentful";
import CardGridPage from "@/components/content/CardGridPage";
import { mapToImageCardItem } from "@/lib/contentfulMappers";
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
  const classesData = await getClasses();

  const items = classesData.items.map((classItem: any) =>
    mapToImageCardItem(classItem, classesData, {
      basePath: "/classes",
      badge: classItem.fields.ageRange,
      ctaLabel: "View Class",
      fallbackImage: "class",
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