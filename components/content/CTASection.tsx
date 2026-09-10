import SectionHeader from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";

interface CTASectionProps {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}

export default function CTASection({
  eyebrow = "Free trial",
  title = "Ready to begin training?",
  description = "Book a free trial class and experience traditional Hapkido training in a safe, structured, family-friendly environment.",
  primaryLabel = "Book Free Trial",
  primaryHref = "/contact",
  secondaryLabel = "View Classes",
  secondaryHref = "/classes",
}: CTASectionProps) {
  return (
    <section className="hca-section bg-hca-cream">
      <div className="hca-container">
        <div className="rounded-2xl bg-hca-blue px-8 py-12 text-hca-cream md:px-12 md:py-16">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <SectionHeader
                eyebrow={eyebrow}
                title={title}
                description={description}
                align="left"
                tone="onDark"
              />
            </div>

            <div className="flex shrink-0 flex-col gap-4 sm:flex-row md:flex-col lg:flex-row">
              <ButtonLink href={primaryHref} variant="inverse">
                {primaryLabel}
              </ButtonLink>

              <ButtonLink href={secondaryHref} variant="inverseOutline">
                {secondaryLabel}
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
