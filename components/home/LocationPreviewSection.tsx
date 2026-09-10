import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";

interface LocationPreviewItem {
  id: string;
  title: string;
  description?: string;
  href: string;
  image: {
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
    <section className="hca-section bg-hca-surface">
      <div className="hca-container">
        <SectionHeader
          eyebrow="Our Locations"
          title="Find your nearest dojang"
          description="Train in a welcoming, family-oriented environment across our HCA locations."
        />

        <div className="space-y-4">
          {locations.map((location) => (
            <Link
              key={location.id}
              href={location.href}
              className="hca-card-lift group grid overflow-hidden rounded-2xl border border-hca-border bg-hca-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hca-blue md:grid-cols-[240px_1fr]"
            >
              <div className="hca-photo-zoom relative min-h-40 overflow-hidden">
                <Image
                  src={location.image.src}
                  alt={location.image.alt ?? location.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 240px"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-col justify-center p-6 md:p-8">
                <h3 className="hca-color-shift font-serif text-2xl font-semibold tracking-tight text-hca-ink group-hover:text-hca-blue">
                  {location.title}
                </h3>

                {location.description && (
                  <p className="mt-3 leading-relaxed text-hca-ink/65">
                    {location.description}
                  </p>
                )}

                <p className="hca-color-shift mt-4 text-sm font-semibold text-hca-blue group-hover:text-hca-red">
                  View location
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <ButtonLink href="/locations">View All Locations</ButtonLink>
        </div>
      </div>
    </section>
  );
}
