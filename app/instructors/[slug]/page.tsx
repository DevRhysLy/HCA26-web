import { notFound } from "next/navigation";
import type { Metadata } from "next";

import MarkdownPage from "@/components/content/MarkdownPage";
import CTASection from "@/components/content/CTASection";

import {
  getInstructorBySlug,
  getInstructors,
  getAssetUrl,
  createSeoMetadata,
} from "@/lib/contentful";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const instructorData = await getInstructorBySlug(slug);
  const instructor = instructorData.items?.[0];

  if (!instructor) {
    return {
      title: "Instructor Not Found",
    };
  }

  const avatarUrl = getAssetUrl(
    instructorData,
    instructor.fields.avatar?.sys?.id
  );

  return createSeoMetadata({
    title: instructor.fields.name,
    description:
      instructor.fields.shortBio ??
      `Meet ${instructor.fields.name}, instructor at Hapkido College of Australia.`,
    imageUrl: avatarUrl,
  });
}

export async function generateStaticParams() {
  const instructorsData = await getInstructors();

  return instructorsData.items.map((instructor: any) => ({
    slug: instructor.fields.slug,
  }));
}

export const revalidate = 60;

export default async function InstructorPage({ params }: PageProps) {
  const { slug } = await params;

  const instructorData = await getInstructorBySlug(slug);
  const instructor = instructorData.items?.[0];

  if (!instructor) return notFound();

  const avatarUrl = getAssetUrl(
    instructorData,
    instructor.fields.avatar?.sys?.id
  );

  return (
    <>
      <MarkdownPage
        title={instructor.fields.name}
        body={instructor.fields.fullBio ?? ""}
        profileImage={
          avatarUrl
            ? {
                src: avatarUrl,
                alt: instructor.fields.name,
              }
            : undefined
        }
      />

      <CTASection
        title="Ready to Book a Free Trial?"
        description="Contact us today and we’ll help you find the right class for your child."
        primaryLabel="Book Free Trial"
        primaryHref="/contact"
        secondaryLabel="View Timetable"
        secondaryHref="/schedule"
      />
    </>
  );
}