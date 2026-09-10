"use client";

import * as React from "react";

interface HorizontalScrollCarouselProps {
  children: React.ReactNode;
  header: React.ReactNode;
  scrollAmount?: number;
  ariaLabel: string;
}

export default function HorizontalScrollCarousel({
  children,
  header,
  scrollAmount = 360,
  ariaLabel,
}: HorizontalScrollCarouselProps) {
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        {header}

        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="hca-press h-11 w-11 rounded-full border border-hca-border bg-hca-surface text-hca-blue hover:border-hca-red/30 hover:text-hca-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hca-blue"
            aria-label={`Scroll ${ariaLabel} left`}
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            className="hca-press h-11 w-11 rounded-full border border-hca-blue bg-hca-blue text-white hover:bg-hca-blue-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hca-blue"
            aria-label={`Scroll ${ariaLabel} right`}
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </div>
    </>
  );
}
