import Link from "next/link";

interface LocationPreviewItem {
  id: string;
  title: string;
  description?: string;
  href: string;

  image?: {
    src: string;
    alt?: string;
  };
}

interface LocationPreviewSectionProps {
  locations: LocationPreviewItem[];
}

export default function LocationPreviewSection({
  locations,
}: LocationPreviewSectionProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-bold tracking-[0.35em] uppercase text-[#C60C30] mb-3">
            Our Locations
          </p>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#111111]">
            Find Your Nearest Dojang
          </h2>

          <p className="mt-4 text-black/60 text-base md:text-lg leading-relaxed">
            Train in a welcoming and family-oriented environment across our HCA
            locations.
          </p>

          <div className="mt-6 mx-auto flex h-1 w-40 overflow-hidden rounded-full">
            <div className="w-1/2 bg-[#C60C30]" />
            <div className="w-1/2 bg-[#003478]" />
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {locations.map((location) => (
            <Link
              key={location.id}
              href={location.href}
              className="group"
            >
              <div
                className="
                  relative
                  h-full
                  overflow-hidden
                  rounded-3xl
                  border
                  border-black/10
                  bg-[#F8FAFC]
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-[#003478]/25
                  hover:bg-white
                  hover:shadow-[0_18px_45px_rgba(0,52,120,0.10)]
                "
              >
                {/* Top accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#C60C30] to-[#003478]" />

                {/* Optional image */}
                {location.image && (
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={location.image.src}
                      alt={location.image.alt ?? location.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  </div>
                )}

                <div className="p-7">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#003478]/15 bg-[#003478]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#003478]">
                    <span className="h-2 w-2 rounded-full bg-[#C60C30]" />
                    HCA Dojang
                  </div>

                  {/* Title */}
                  <h3 className="mt-5 text-2xl font-bold tracking-tight text-[#111111] transition-colors duration-200 group-hover:text-[#003478]">
                    {location.title}
                  </h3>

                  {/* Description */}
                  {location.description && (
                    <p className="mt-4 text-black/65 leading-relaxed">
                      {location.description}
                    </p>
                  )}

                  {/* CTA */}
                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#003478] group-hover:text-[#C60C30] transition-colors">
                      View Location
                    </span>

                    <div
                      className="
                        flex
                        h-10
                        w-10
                        items-center
                        justify-center
                        rounded-full
                        border
                        border-black/10
                        bg-white
                        transition-all
                        duration-300
                        group-hover:border-[#003478]/30
                        group-hover:bg-[#003478]
                      "
                    >
                      <span className="text-[#003478] group-hover:text-white transition-colors">
                        →
                      </span>
                    </div>
                  </div>
                </div>

                {/* Decorative accents */}
                <div className="absolute bottom-0 left-0 h-16 w-16 rounded-tr-full bg-[#C60C30]/5" />
                <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-[#003478]/5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/locations"
            className="
              inline-flex
              items-center
              justify-center
              rounded-2xl
              bg-[#003478]
              px-8
              py-4
              text-white
              font-semibold
              shadow-lg
              shadow-[#003478]/20
              transition-all
              duration-200
              hover:bg-[#002B63]
              hover:-translate-y-0.5
            "
          >
            View All Locations
          </Link>
        </div>
      </div>
    </section>
  );
}