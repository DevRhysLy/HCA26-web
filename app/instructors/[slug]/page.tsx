import { notFound } from "next/navigation";
import type { Metadata } from "next";

import MarkdownPage from "@/components/content/MarkdownPage";
import CTASection from "@/components/content/CTASection";

import {
  getInstructorBySlug,
  getInstructors,
  createSeoMetadata,
} from "@/lib/contentful";

import {
  getSlugPageData,
  getSeoDescription,
  createHeroImage,
} from "@/lib/contentfulSlugHelpers";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const instructorsData = await getInstructors();

  return instructorsData.items.map((instructor: any) => ({
    slug: instructor.fields.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const { entry, imageUrl } = await getSlugPageData({
    slug,
    fetcher: getInstructorBySlug,
  });

  if (!entry) {
    return {
      title: "Instructor Not Found",
    };
  }

  return createSeoMetadata({
    title: entry.fields.title,
    description: getSeoDescription({
      entry,
      fallback: `Meet ${entry.fields.title}, instructor at Hapkido College of Australia.`,
    }),
    imageUrl,
  });
}

export const revalidate = 60;

export default async function InstructorPage({ params }: PageProps) {
  const { slug } = await params;

  const { entry, imageUrl } = await getSlugPageData({
    slug,
    fetcher: getInstructorBySlug,
    imageOptions: {
      width: 800,
      quality: 85,
    },
  });

  if (!entry) return notFound();

  return (
    <>
      <MarkdownPage
        title={entry.fields.title}
        body={entry.fields.body ?? ""}
        profileImage={createHeroImage(entry, imageUrl)}
      />

      <CTASection />
    </>
  );
}
