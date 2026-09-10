import { notFound } from "next/navigation";
import type { Metadata } from "next";

import MarkdownPage from "@/components/content/MarkdownPage";
import CTASection from "@/components/content/CTASection";
import RelatedLinkList from "@/components/content/RelatedLinkList";
import AtAGlance from "@/components/content/AtAGlance";
import SessionList from "@/components/content/SessionList";

import {
  getClasses,
  getClassBySlug,
  getScheduleEntries,
  createSeoMetadata,
} from "@/lib/contentful";
import { buildTimetableData } from "@/lib/contentfulMappers";
import {
  relateByClass,
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
  const classesData = await getClasses();

  return classesData.items.map((classItem: any) => ({
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

  const timetable = await safeBuildTimetable(
    getScheduleEntries,
    buildTimetableData,
  );
  const related = relateByClass(timetable, slug);
  const sessions = toSessionItems(related.entries, related.locations, "class");
  const ageRange = entry.fields.ageRange;
  const tag = entry.fields.tag;
  const hasAside = related.locations.length > 0 || sessions.length > 0;

  return (
    <div className="min-h-screen bg-hca-cream">
      <MarkdownPage
        eyebrow="Class"
        title={entry.fields.title}
        description={
          typeof entry.fields.description === "string"
            ? entry.fields.description
            : undefined
        }
        body={entry.fields.body ?? ""}
        heroImage={createHeroImage(entry, imageUrl)}
        fact={
          (ageRange || tag) && (
            <p className="text-base font-semibold text-hca-ink">
              {ageRange && <span className="text-hca-red">{ageRange}</span>}
              {ageRange && tag && (
                <span className="font-normal text-hca-ink/40"> </span>
              )}
              {tag && (
                <span className="font-normal text-hca-ink/60">{tag}</span>
              )}
            </p>
          )
        }
        secondaryCta={{ href: "/schedule", label: "View timetable" }}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Classes", href: "/classes" },
          { label: entry.fields.title },
        ]}
        aside={
          hasAside ? (
            <AtAGlance>
              <RelatedLinkList
                title="Locations"
                items={related.locations.map((item) => ({
                  title: item.name,
                  href: `/locations/${item.id}`,
                  meta: item.badge,
                }))}
              />
              <SessionList items={sessions} />
            </AtAGlance>
          ) : undefined
        }
      />

      <CTASection />
    </div>
  );
}
