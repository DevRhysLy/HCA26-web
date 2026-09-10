import { notFound } from "next/navigation";
import type { Metadata } from "next";

import MarkdownPage from "@/components/content/MarkdownPage";
import CTASection from "@/components/content/CTASection";
import RelatedLinkList from "@/components/content/RelatedLinkList";
import AtAGlance from "@/components/content/AtAGlance";
import SessionList from "@/components/content/SessionList";

import {
  getInstructorBySlug,
  getInstructors,
  getScheduleEntries,
  createSeoMetadata,
} from "@/lib/contentful";
import { buildTimetableData } from "@/lib/contentfulMappers";
import {
  relateByInstructor,
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
    fallbackImage: "instructor",
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
    fallbackImage: "instructor",
    imageOptions: {
      width: 800,
      quality: 85,
    },
  });

  if (!entry) return notFound();

  const timetable = await safeBuildTimetable(
    getScheduleEntries,
    buildTimetableData,
  );
  const related = relateByInstructor(timetable, slug);
  const sessions = toSessionItems(
    related.entries,
    related.locations,
    "instructor",
  );
  const rank =
    typeof entry.fields.rank === "string" ? entry.fields.rank : undefined;
  const hasAside =
    related.locations.length > 0 ||
    related.classes.length > 0 ||
    sessions.length > 0;

  return (
    <>
      <MarkdownPage
        eyebrow="Instructor"
        title={entry.fields.title}
        description={
          typeof entry.fields.description === "string"
            ? entry.fields.description
            : undefined
        }
        body={entry.fields.body ?? ""}
        profileImage={createHeroImage(entry, imageUrl)}
        fact={
          rank && (
            <p className="text-base font-semibold text-hca-ink/70">{rank}</p>
          )
        }
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Instructors", href: "/instructors" },
          { label: entry.fields.title },
        ]}
        aside={
          hasAside ? (
            <AtAGlance>
              <RelatedLinkList
                title="Teaches at"
                items={related.locations.map((item) => ({
                  title: item.name,
                  href: `/locations/${item.id}`,
                }))}
              />
              <RelatedLinkList
                title="Classes"
                items={related.classes.map((item) => ({
                  title: item.title,
                  href: item.href,
                  meta: item.ageRange,
                }))}
              />
              <SessionList items={sessions} />
            </AtAGlance>
          ) : undefined
        }
      />
      <CTASection />
    </>
  );
}
