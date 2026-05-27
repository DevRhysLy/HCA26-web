import CardGridPage from "@/components/content/CardGridPage";
import { getInstructors, getAssetUrl } from "@/lib/contentful";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Instructors",
  description:
    "Meet our friendly Instructors at Hapkido College of Australia.",
};

export default async function InstructorsPage() {
  const instructorsData = await getInstructors();

  const assets = instructorsData.includes?.Asset ?? [];

  function extractRankNumber(rank: string): number {
    const match = rank.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  }

  const sortedInstructors = [...instructorsData.items].sort(
    (a: any, b: any) => {
      const rankA = extractRankNumber(a.fields.rank ?? "");
      const rankB = extractRankNumber(b.fields.rank ?? "");

      return rankB - rankA; // higher rank first
    },
  );

  const items = sortedInstructors.map((instructor: any) => {
    const avatarUrl = getAssetUrl(
    instructorsData,
    instructor.fields.avatar?.sys?.id);

    return {
      id: instructor.sys.id,
      title: instructor.fields.name,
      description: instructor.fields.bio,
      href: `/instructors/${instructor.fields.slug}`,
      badge: instructor.fields.rank ?? "Instructor",
      ctaLabel: "View Profile",
      image: avatarUrl
        ? {
            src: avatarUrl,
            alt: instructor.fields.name,
          }
        : undefined,
    };
  });

  return (
    <CardGridPage
      title="Our Instructors"
      description="Meet the instructors guiding our students."
      items={items}
    />
  );
}
