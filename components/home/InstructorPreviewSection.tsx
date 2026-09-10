import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import HorizontalScrollCarousel from "@/components/ui/HorizontalScrollCarousel";

interface InstructorPreviewItem {
  id: string;
  name: string;
  rank?: string;
  bio?: string;
  href: string;
  image?: {
    src: string;
    alt?: string;
  };
}

interface InstructorPreviewSectionProps {
  instructors: InstructorPreviewItem[];
}

export default function InstructorPreviewSection({
  instructors,
}: InstructorPreviewSectionProps) {
  return (
    <section className="hca-section bg-hca-cream">
      <div className="hca-container">
        <HorizontalScrollCarousel
          ariaLabel="instructors"
          scrollAmount={340}
          header={
            <SectionHeader
              eyebrow="Our Instructors"
              title="Learn from experienced martial artists"
              description="Meet the instructors guiding our students with patience, discipline, and traditional Hapkido values."
              align="left"
              showDivider={false}
            />
          }
        >
          {instructors.map((instructor) => (
            <Link
              key={instructor.id}
              href={instructor.href}
              className="group min-w-[280px] max-w-[320px] sm:min-w-[320px] focus-visible:outline-none"
            >
              <div className="hca-card-lift h-full rounded-2xl border border-hca-border bg-hca-surface p-8 text-center group-focus-visible:ring-2 group-focus-visible:ring-hca-blue">
                {instructor.image && (
                  <div className="mb-6 flex justify-center">
                    <div className="hca-photo-zoom relative h-32 w-32 overflow-hidden rounded-full">
                      <Image
                        src={instructor.image.src}
                        alt={instructor.image.alt ?? instructor.name}
                        fill
                        sizes="128px"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                )}

                <p className="text-xs font-semibold uppercase tracking-wide text-hca-blue">
                  {instructor.rank ?? "Instructor"}
                </p>

                <h3 className="hca-color-shift mt-3 font-serif text-2xl font-semibold tracking-tight text-hca-ink group-hover:text-hca-blue">
                  {instructor.name}
                </h3>

                {instructor.bio && (
                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-hca-ink/60">
                    {instructor.bio}
                  </p>
                )}

                <p className="hca-color-shift mt-8 text-sm font-semibold text-hca-blue group-hover:text-hca-red">
                  View profile
                </p>
              </div>
            </Link>
          ))}
        </HorizontalScrollCarousel>
      </div>
    </section>
  );
}
