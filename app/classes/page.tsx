import { getClasses } from "@/lib/contentful";
import CardGridPage from "@/components/content/CardGridPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Classes",
  description:
    "Explore Hapkido classes for children, youth, and adults at Hapkido College of Australia.",
};

export default async function Classes() {
  const classes = await getClasses();

  const items = classes.map((service: any) => ({
    id: service.sys.id,
    title: service.fields.service,
    description: service.fields.shortDescription,
    href: `/classes/${service.fields.slug}`,
    badge: service.fields.age,
    ctaLabel: "View Class",
  }));

  return (
    <CardGridPage
      title="Our Classes"
      description="Explore our traditional Hapkido programs designed to support students of all ages in a safe and welcoming environment."
      items={items}
    />
  );
}
