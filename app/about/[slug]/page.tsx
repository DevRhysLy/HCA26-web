import { notFound } from "next/navigation";
import type { Metadata } from "next";

import MarkdownPage from "@/components/content/MarkdownPage";
import CTASection from "@/components/content/CTASection";

import {
  getAbout,
  getAboutPageBySlug,
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
  const aboutPages = await getAbout();

  return aboutPages.map((page: any) => ({
    slug: page.fields.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const { entry, imageUrl } = await getSlugPageData({
    slug,
    fetcher: getAboutPageBySlug,
  });

  if (!entry) {
    return {
      title: "Page Not Found",
    };
  }

  return createSeoMetadata({
    title: entry.fields.title,
    description: getSeoDescription({
      entry,
      fallback: `${entry.fields.title} | Hapkido College of Australia`,
    }),
    imageUrl,
  });
}

export const revalidate = 60;

export default async function AboutPage({ params }: PageProps) {
  const { slug } = await params;

  const { entry, imageUrl } = await getSlugPageData({
    slug,
    fetcher: getAboutPageBySlug,
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
