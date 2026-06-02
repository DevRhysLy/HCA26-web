import { notFound } from "next/navigation";
import type { Metadata } from "next";

import MarkdownPage from "@/components/content/MarkdownPage";
import GoogleMapSection from "@/components/location/GoogleMapSection";
import CTASection from "@/components/content/CTASection";

import {
  getLocationBySlug,
  getLocations,
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
  const locations = await getLocations();

  return locations.map((location: any) => ({
    slug: location.fields.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const { entry, imageUrl } = await getSlugPageData({
    slug,
    fetcher: getLocationBySlug,
  });

  if (!entry) {
    return {
      title: "Location Not Found",
    };
  }

  return createSeoMetadata({
    title: entry.fields.title,
    description: getSeoDescription({
      entry,
      fallback: `Train at ${entry.fields.title} with Hapkido College of Australia.`,
    }),
    imageUrl,
  });
}

export const revalidate = 60;

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;

  const { entry, imageUrl } = await getSlugPageData({
    slug,
    fetcher: getLocationBySlug,
  });

  if (!entry) return notFound();

  return (
    <main className="bg-[#F8FAFC] min-h-screen">
      <MarkdownPage
        title={entry.fields.title}
        body={entry.fields.body ?? ""}
        heroImage={createHeroImage(entry, imageUrl)}
      />

      <div className="max-w-5xl mx-auto px-6 pb-16">
        <GoogleMapSection
          locationName={entry.fields.title}
          address={entry.fields.address}
          googleMapsEmbedUrl={entry.fields.googleMapsEmbedUrl}
        />
      </div>

      <CTASection />
    </main>
  );
}