import Link from "next/link";
import HorizontalScrollCarousel from "@/components/ui/HorizontalScrollCarousel";

interface Service {
  id: string;
  title: string;
  age?: string;
  description?: string;
  href: string;
  badge?: string;
}

interface ServiceSectionProps {
  services: Service[];
  backgroundImage?: string;
}

export default function ServiceSection({ services }: ServiceSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-16 md:py-24">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <HorizontalScrollCarousel
          ariaLabel="programs"
          scrollAmount={360}
          header={
            <div className="max-w-3xl">
              <p className="text-xs font-bold tracking-[0.35em] uppercase text-[#C60C30] mb-3">
                Our Programs
              </p>

              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#111111]">
                Classes for Every Stage of the Journey
              </h2>

              <p className="mt-4 text-black/60 text-base md:text-lg leading-relaxed">
                Explore our martial arts classes and find the program that best
                supports your child’s growth, confidence, and development.
              </p>

              <div className="mt-6 flex h-1 w-40 overflow-hidden rounded-full">
                <div className="w-1/2 bg-[#C60C30]" />
                <div className="w-1/2 bg-[#003478]" />
              </div>
            </div>
          }
        >
          {services.map((service) => (
            <Link
              key={service.id}
              href={service.href}
              className="group min-w-[280px] sm:min-w-[340px] max-w-[360px]"
            >
              <div className="relative h-full overflow-hidden rounded-3xl border border-black/10 bg-white/95 backdrop-blur-sm p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#003478]/25 hover:shadow-[0_18px_45px_rgba(0,52,120,0.10)]">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#C60C30] to-[#003478]" />

                <div className="relative z-10">
                  {service.badge && (
                    <div className="inline-flex items-center gap-2 rounded-full border border-[#003478]/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#003478] shadow-sm">
                      <span className="h-2 w-2 rounded-full bg-[#C60C30]" />
                      {service.badge}
                    </div>
                  )}

                  <h3 className="mt-5 text-2xl font-bold tracking-tight text-[#111111] transition-colors duration-200 group-hover:text-[#003478]">
                    {service.title}
                  </h3>

                  {service.age && (
                    <p className="mt-2 text-sm font-semibold text-[#C60C30]">
                      {service.age}
                    </p>
                  )}

                  {service.description && (
                    <p className="mt-4 text-black/65 leading-relaxed line-clamp-3 min-h-[72px]">
                      {service.description}
                    </p>
                  )}

                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-sm font-semibold text-[#003478] group-hover:text-[#C60C30] transition-colors">
                      Learn More
                    </span>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white transition-all duration-300 group-hover:border-[#003478]/30 group-hover:bg-[#003478]">
                      <span className="text-[#003478] group-hover:text-white transition-colors">
                        →
                      </span>
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-20 w-20 rounded-tr-full bg-[#C60C30]/5" />
                <div className="absolute top-0 right-0 h-20 w-20 rounded-bl-full bg-[#003478]/5" />
              </div>
            </Link>
          ))}
        </HorizontalScrollCarousel>

        <div className="mt-12 text-center">
          <Link
            href="/classes"
            className="inline-flex items-center justify-center rounded-2xl bg-[#003478] px-8 py-4 text-white font-semibold shadow-lg shadow-[#003478]/20 transition-all duration-200 hover:bg-[#002B63] hover:-translate-y-0.5"
          >
            View All Programs
          </Link>
        </div>
      </div>
    </section>
  );
}
