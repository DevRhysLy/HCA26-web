import { notFound } from "next/navigation";
import type { Metadata } from "next";

import MarkdownPage from "@/components/content/MarkdownPage";
import CTASection from "@/components/content/CTASection";

import {
  getClasses,
  getClassBySlug,
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
  const classes = await getClasses();

  return classes.map((classItem: any) => ({
    slug: classItem.fields.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const { entry, imageUrl } = await getSlugPageData({
    slug,
    fetcher: getClassBySlug,
  });

  if (!entry) {
    return {
      title: "Class Not Found",
    };
  }

  return createSeoMetadata({
    title: entry.fields.title,
    description: getSeoDescription({
      entry,
      fallback: `${entry.fields.title} at Hapkido College of Australia.`,
    }),
    imageUrl,
  });
}

export const revalidate = 60;

export default async function ClassPage({ params }: PageProps) {
  const { slug } = await params;

  const { entry, imageUrl } = await getSlugPageData({
    slug,
    fetcher: getClassBySlug,
  });

  if (!entry) return notFound();

  return (
    <main className="bg-[#F8FAFC] min-h-screen">
      <MarkdownPage
        title={entry.fields.title}
        body={entry.fields.body ?? ""}
        heroImage={createHeroImage(entry, imageUrl)}
      />

      <CTASection />
    </main>
  );
}