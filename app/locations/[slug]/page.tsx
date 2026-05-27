import { notFound } from "next/navigation";
import type { Metadata } from "next";

import MarkdownPage from "@/components/content/MarkdownPage";
import GoogleMapSection from "@/components/location/GoogleMapSection";
import CTASection from "@/components/content/CTASection";

import {
  getStudioLocationBySlug,
  getStudioLocations,
  createSeoMetadata,
  getAssetUrl
} from "@/lib/contentful";

interface PageProps {
  params: Promise<{ slug: string }>;
}

function getLocationSeoDescription(location: any) {
  return (
    location.fields.description ??
    `Train at ${location.fields.location} with Hapkido College of Australia.`
  );
}

export async function generateStaticParams() {
  const locations = await getStudioLocations();

  return locations.map((location: any) => ({
    slug: location.fields.slug,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;

  const locationData = await getStudioLocationBySlug(slug);
  const location = locationData.items?.[0];

  if (!location) {
    return {
      title: "Location Not Found",
    };
  }

  const imageUrl = getAssetUrl(
    locationData,
    location.fields.bannerImage?.sys?.id
  );

  return createSeoMetadata({
    title: location.fields.location,
    description:
      location.fields.description ??
      `Train at ${location.fields.location} with Hapkido College of Australia.`,
    imageUrl,
  });
}

export const revalidate = 60;

export default async function LocationPage({ params }: PageProps) {
  const { slug } = await params;

  const locationData = await getStudioLocationBySlug(slug);
  const location = locationData.items?.[0];

  if (!location) return notFound();

  const bannerImageUrl = getAssetUrl(
    locationData,
    location.fields.bannerImage?.sys?.id
  );

  return (
    <main className="bg-[#F8FAFC] min-h-screen">
      <MarkdownPage
        title={location.fields.location}
        body={location.fields.body ?? ""}
        heroImage={
          bannerImageUrl
            ? {
                src: bannerImageUrl,
                alt: location.fields.location,
              }
            : undefined
        }
      />

      <div className="max-w-5xl mx-auto px-6 pb-16">
        <GoogleMapSection
          locationName={location.fields.location}
          address={location.fields.address}
          googleMapsEmbedUrl={location.fields.googleMapsEmbedUrl}
        />
      </div>

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