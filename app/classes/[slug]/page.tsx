import { notFound } from "next/navigation";
import type { Metadata } from "next";

import MarkdownPage from "@/components/content/MarkdownPage";
import CTASection from "@/components/content/CTASection";

import {
  getClasses,
  getClassBySlug,
  getAssetUrl,
  createSeoMetadata,
} from "@/lib/contentful";

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

  const classData = await getClassBySlug(slug);
  const martialClass = classData.items?.[0];

  if (!martialClass) {
    return {
      title: "Class Not Found",
    };
  }

  const imageUrl = getAssetUrl(
    classData,
    martialClass.fields.image?.sys?.id
  );

  return createSeoMetadata({
    title: martialClass.fields.service,
    description:
      martialClass.fields.shortDescription ??
      `${martialClass.fields.service} at Hapkido College of Australia.`,
    imageUrl,
  });
}

export const revalidate = 60;

export default async function ClassPage({ params }: PageProps) {
  const { slug } = await params;

  const classData = await getClassBySlug(slug);
  const classItem = classData.items?.[0];

  if (!classItem) return notFound();

  const bannerImageUrl = getAssetUrl(
    classData,
    classItem.fields.image?.sys?.id
  );

  return (
    <main className="bg-[#F8FAFC] min-h-screen">
      <MarkdownPage
        title={classItem.fields.service}
        body={classItem.fields.longDescription ?? ""}
        heroImage={
          bannerImageUrl
            ? {
                src: bannerImageUrl,
                alt: classItem.fields.service,
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
    </main>
  );
}