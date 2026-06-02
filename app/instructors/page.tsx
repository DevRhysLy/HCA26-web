import CardGridPage from "@/components/content/CardGridPage";
import { getInstructors } from "@/lib/contentful";
import {
  sortInstructorsByRank,
  mapToImageCardItem,
} from "@/lib/contentfulMappers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instructors",
  description:
    "Meet our friendly instructors at Hapkido College of Australia.",

  openGraph: {
    title: "Instructors",
    description:
      "Meet our friendly instructors at Hapkido College of Australia.",
  },
};

export default async function InstructorsPage() {
  const instructorsData = await getInstructors();

  const items = sortInstructorsByRank(
    instructorsData.items
  ).map((instructor: any) =>
    mapToImageCardItem(instructor, instructorsData, {
      basePath: "/instructors",
      badge: instructor.fields.rank ?? "Instructor",
      ctaLabel: "View Profile",
    })
  );

  return (
    <CardGridPage
      title="Our Instructors"
      description="Meet the instructors guiding our students."
      items={items}
    />
  );
}