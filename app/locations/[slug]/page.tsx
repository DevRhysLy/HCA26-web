import { notFound } from "next/navigation";
import type { Metadata } from "next";

import MarkdownPage from "@/components/content/MarkdownPage";
import GoogleMapSection from "@/components/location/GoogleMapSection";
import CTASection from "@/components/content/CTASection";
import RelatedLinkList from "@/components/content/RelatedLinkList";
import AtAGlance from "@/components/content/AtAGlance";
import SessionList from "@/components/content/SessionList";

import {
  getLocationBySlug,
  getLocations,
  getScheduleEntries,
  createSeoMetadata,
} from "@/lib/contentful";
import { buildTimetableData } from "@/lib/contentfulMappers";
import {
  relateByLocation,
  safeBuildTimetable,
  toSessionItems,
} from "@/lib/scheduleRelations";

import {
  getSlugPageData,
  getSeoDescription,
  createHeroImage,
} from "@/lib/contentfulSlugHelpers";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const locationsData = await getLocations();

  return locationsData.items.map((location: any) => ({
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

  const timetable = await safeBuildTimetable(
    getScheduleEntries,
    buildTimetableData,
  );
  const related = relateByLocation(timetable, slug);
  const sessions = toSessionItems(
    related.entries,
    related.locations,
    "location",
  );
  const address =
    typeof entry.fields.address === "string" ? entry.fields.address : undefined;
  const hasAside =
    related.classes.length > 0 ||
    related.instructors.length > 0 ||
    sessions.length > 0;

  return (
    <div className="min-h-screen bg-hca-cream">
      <MarkdownPage
        eyebrow="Location"
        title={entry.fields.title}
        description={
          typeof entry.fields.description === "string"
            ? entry.fields.description
            : undefined
        }
        body={entry.fields.body ?? ""}
        heroImage={createHeroImage(entry, imageUrl)}
        fact={
          address && (
            <p className="text-base leading-relaxed text-hca-ink/65">
              {address}
            </p>
          )
        }
        secondaryCta={
          address
            ? {
                href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  address,
                )}`,
                label: "Get Directions",
                external: true,
              }
            : undefined
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Locations", href: "/locations" },
          { label: entry.fields.title },
        ]}
        aside={
          hasAside ? (
            <AtAGlance>
              <div className="grid gap-8 sm:grid-cols-2">
                <RelatedLinkList
                  title="Classes"
                  items={related.classes.map((item) => ({
                    title: item.title,
                    href: item.href,
                    meta: item.ageRange,
                  }))}
                />
                <RelatedLinkList
                  title="Instructors"
                  items={related.instructors.map((item) => ({
                    title: item.name,
                    href: item.href,
                    meta: item.rank,
                  }))}
                />
              </div>
              <SessionList items={sessions} />
            </AtAGlance>
          ) : undefined
        }
        after={
          <GoogleMapSection
            locationName={entry.fields.title}
            address={entry.fields.address}
            googleMapsEmbedUrl={entry.fields.googleMapsEmbedUrl}
          />
        }
      />

      <CTASection />
    </div>
  );
}
