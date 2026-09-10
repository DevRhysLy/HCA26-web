import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import SectionDivider from "@/components/ui/SectionDivider";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-hca-cream">
      <div className="hca-container hca-section relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="hca-reveal font-sans text-xs font-bold uppercase tracking-[0.16em] text-hca-red">
              Hapkido College of Australia
            </p>

            <h1 className="hca-reveal hca-reveal-delay-1 mt-6 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-hca-ink lg:text-6xl">
              Confidence and discipline
              <span className="block text-hca-blue">through Hapkido</span>
            </h1>

            <p className="hca-reveal hca-reveal-delay-2 mt-4 max-w-xl text-lg leading-relaxed text-hca-ink/65">
              Traditional training in a safe, structured dojang where children grow with their family.
            </p>

            <SectionDivider className="hca-reveal hca-reveal-delay-2 mt-8" />

            <div className="hca-reveal hca-reveal-delay-3 mt-8 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/contact">Book Free Trial</ButtonLink>
              <ButtonLink href="/locations" variant="secondary">
                Find a Location
              </ButtonLink>
            </div>

            <div className="mt-12 grid max-w-xl grid-cols-3 gap-6">
              <div>
                <div className="font-serif text-3xl font-semibold text-hca-ink">35+</div>
                <div className="mt-1 text-sm text-hca-ink/60">Years experience</div>
              </div>
              <div>
                <div className="font-serif text-3xl font-semibold text-hca-ink">1500+</div>
                <div className="mt-1 text-sm text-hca-ink/60">Students trained</div>
              </div>
              <div>
                <div className="font-serif text-3xl font-semibold text-hca-ink">Family</div>
                <div className="mt-1 text-sm text-hca-ink/60">Community focus</div>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative overflow-hidden rounded-[20px] border border-hca-border bg-hca-surface shadow-[0_8px_24px_rgba(17,24,39,0.08)]">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/khlock.webp"
                  alt="Hapkido students training"
                  fill
                  priority
                  sizes="(max-width: 1024px) 0px, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
