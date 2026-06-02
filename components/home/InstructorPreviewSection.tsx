"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";

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

function extractRankNumber(rank?: string): number {
  if (!rank) return 0;

  const match = rank.match(/\d+/);
  return match ? Number.parseInt(match[0], 10) : 0;
}

export default function InstructorPreviewSection({
  instructors,
}: InstructorPreviewSectionProps) {
  const sortedInstructors = [...instructors].sort(
    (a, b) => extractRankNumber(b.rank) - extractRankNumber(a.rank),
  );

  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -340 : 340,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#F8FAFC]] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <p className="text-xs font-bold tracking-[0.35em] uppercase text-[#C60C30] mb-3">
              Our Instructors
            </p>

            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#111111]">
              Learn From Experienced Martial Artists
            </h2>

            <p className="mt-4 text-black/60 text-base md:text-lg leading-relaxed">
              Meet the instructors guiding our students with patience,
              discipline, and traditional Hapkido values.
            </p>

            <div className="mt-6 flex h-1 w-40 overflow-hidden rounded-full">
              <div className="w-1/2 bg-[#C60C30]" />
              <div className="w-1/2 bg-[#003478]" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="h-11 w-11 rounded-full border border-black/10 bg-white text-[#003478] shadow-sm hover:border-[#C60C30]/30 hover:text-[#C60C30] transition"
              aria-label="Scroll instructors left"
            >
              ←
            </button>

            <button
              type="button"
              onClick={() => scroll("right")}
              className="h-11 w-11 rounded-full border border-black/10 bg-[#003478] text-white shadow-sm hover:bg-[#002B63] transition"
              aria-label="Scroll instructors right"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {sortedInstructors.map((instructor) => (
            <Link
              key={instructor.id}
              href={instructor.href}
              className="group min-w-[280px] sm:min-w-[320px] max-w-[320px]"
            >
              <div className="relative h-full overflow-hidden rounded-3xl border border-black/10 bg-[#F8FAFC] p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#003478]/25 hover:bg-white hover:shadow-[0_18px_45px_rgba(0,52,120,0.10)]">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#C60C30] to-[#003478]" />

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
        </div>
      </div>
    </section>
  );
}
