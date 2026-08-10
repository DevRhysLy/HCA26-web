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
    <section className="bg-[#F8FAFC] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <HorizontalScrollCarousel
          ariaLabel="instructors"
          scrollAmount={340}
          header={
            <SectionHeader
              eyebrow="Our Faculty"
              title="Learn From a Ranked Faculty"
              description="Founded by Master Young Kil Kim, an 8th Dan Master with 40+ years of martial arts experience preserving traditional Korean Hapkido — every class today carries his tradition forward, led by a senior-ranked faculty."
              align="left"
            />
          }
        >
          {instructors.map((instructor, index) => (
            <Link
              key={instructor.id}
              href={instructor.href}
              className="group min-w-[280px] sm:min-w-[320px] max-w-[320px]"
            >
              <div className="relative h-full overflow-hidden rounded-3xl border border-black/10 bg-[#F8FAFC] p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#003478]/25 hover:bg-white hover:shadow-[0_18px_45px_rgba(0,52,120,0.10)]">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#C60C30] to-[#003478]" />

                {index === 0 && (
                  <div className="absolute top-4 right-4 rounded-full bg-[#003478] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                    Senior Instructor
                  </div>
                )}

                {instructor.image && (
                  <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-gradient-to-br from-[#C60C30] via-white to-[#003478] p-[4px] shadow-md">
                      <div className="relative h-32 w-32 overflow-hidden rounded-full">
                        <Image
                          src={instructor.image.src}
                          alt={instructor.image.alt ?? instructor.name}
                          fill
                          sizes="128px"
                          className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="inline-flex items-center gap-2 rounded-full border border-[#003478]/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#003478] shadow-sm">
                  <span className="h-2 w-2 rounded-full bg-[#C60C30]" />
                  {instructor.rank ?? "Instructor"}
                </div>

                <h3 className="mt-5 text-2xl font-bold tracking-tight text-[#111111] group-hover:text-[#003478] transition-colors">
                  {instructor.name}
                </h3>

                {instructor.bio && (
                  <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-black/60">
                    {instructor.bio}
                  </p>
                )}

                <div className="mt-7 text-sm font-semibold text-[#003478] group-hover:text-[#C60C30] transition-colors">
                  View Profile →
                </div>

                <div className="absolute bottom-0 left-0 h-16 w-16 rounded-tr-full bg-[#C60C30]/5" />
                <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-[#003478]/5" />
              </div>
            </Link>
          ))}
        </HorizontalScrollCarousel>
      </div>
    </section>
  );
}
