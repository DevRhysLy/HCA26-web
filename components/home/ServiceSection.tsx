import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import HorizontalScrollCarousel from "@/components/ui/HorizontalScrollCarousel";
import { ButtonLink } from "@/components/ui/Button";

interface Service {
  id: string;
  title: string;
  age?: string;
  description?: string;
  href: string;
  badge?: string;
  image: {
    src: string;
    alt?: string;
  };
}

interface ServiceSectionProps {
  services: Service[];
}

export default function ServiceSection({ services }: ServiceSectionProps) {
  return (
    <section className="hca-section relative overflow-hidden bg-hca-cream">
      <div className="hca-container relative z-10">
        <HorizontalScrollCarousel
          ariaLabel="programs"
          scrollAmount={360}
          header={
            <SectionHeader
              eyebrow="Our Programs"
              title="Classes for every stage"
              description="Find the program that best supports your child's growth, confidence, and development."
              align="left"
              showDivider={false}
            />
          }
        >
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="group min-w-[280px] max-w-[360px] sm:min-w-[340px] focus-visible:outline-none"
            >
              <div className="hca-card-lift h-full overflow-hidden rounded-2xl border border-hca-border bg-hca-surface group-focus-visible:ring-2 group-focus-visible:ring-hca-blue">
                <div className="hca-photo-zoom relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={service.image.src}
                    alt={service.image.alt ?? service.title}
                    fill
                    sizes="(max-width: 640px) 80vw, 360px"
                    className="object-cover"
                  />
                </div>

                <div className="p-8">
                  {service.badge && (
                    <p className="text-xs font-semibold uppercase tracking-wide text-hca-blue">
                      {service.badge}
                    </p>
                  )}

                  <h3 className="hca-color-shift font-serif text-2xl font-semibold tracking-tight text-hca-ink group-hover:text-hca-blue">
                    {service.title}
                  </h3>

                  {service.age && (
                    <p className="mt-2 text-sm font-semibold text-hca-red">
                      {service.age}
                    </p>
                  )}

                  {service.description && (
                    <p className="mt-4 min-h-[72px] leading-relaxed text-hca-ink/65 line-clamp-3">
                      {service.description}
                    </p>
                  )}

                  <p className="hca-color-shift mt-8 text-sm font-semibold text-hca-blue group-hover:text-hca-red">
                    View class
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </HorizontalScrollCarousel>

        <div className="mt-12 text-center">
          <ButtonLink href="/classes">View All Programs</ButtonLink>
        </div>
      </div>
    </section>
  );
}
