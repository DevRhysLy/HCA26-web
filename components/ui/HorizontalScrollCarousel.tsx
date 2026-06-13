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
      <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        {header}

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scroll("left")}
            className="h-11 w-11 rounded-full border border-black/10 bg-white text-[#003478] shadow-sm hover:border-[#C60C30]/30 hover:text-[#C60C30] transition"
            aria-label={`Scroll ${ariaLabel} left`}
          >
            ←
          </button>

          <button
            type="button"
            onClick={() => scroll("right")}
            className="h-11 w-11 rounded-full border border-black/10 bg-[#003478] text-white shadow-sm hover:bg-[#002B63] transition"
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
