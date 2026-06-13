import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

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
  eyebrow = "Start Your Journey",
  title = "Ready to Begin Training?",
  description = "Book a free trial class and experience traditional Hapkido training in a safe, structured, and family-friendly environment.",
  primaryLabel = "Book Free Trial",
  primaryHref = "/contact",
  secondaryLabel = "View Classes",
  secondaryHref = "/classes",
}: CTASectionProps) {
  return (
    <section className="bg-[#F8FAFC] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white p-8 md:p-12 shadow-sm">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#C60C30] to-[#003478]" />
          <div className="absolute left-0 bottom-0 h-40 w-40 rounded-tr-full bg-[#C60C30]/5" />
          <div className="absolute right-0 top-0 h-40 w-40 rounded-bl-full bg-[#003478]/5" />

          <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <SectionHeader
              eyebrow={eyebrow}
              title={title}
              description={description}
              align="left"
            />

            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-4 shrink-0">
              <Link
                href={primaryHref}
                className="inline-flex items-center justify-center rounded-2xl bg-[#003478] px-8 py-4 text-white font-semibold shadow-lg shadow-[#003478]/20 transition-all duration-200 hover:bg-[#002B63] hover:-translate-y-0.5"
              >
                {primaryLabel}
              </Link>

              <Link
                href={secondaryHref}
                className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-8 py-4 text-[#111111] font-semibold transition-all duration-200 hover:border-[#003478]/25 hover:text-[#003478] hover:-translate-y-0.5"
              >
                {secondaryLabel}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
