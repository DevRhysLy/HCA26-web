import Link from "next/link";
import FaqList from "@/components/content/FaqList";
import SectionHeader from "@/components/ui/SectionHeader";
import { FAQ_HOME_PREVIEW_LIMIT } from "@/config/faq";
import { sortFaqs, type FaqItem } from "@/lib/contentfulMappers";

interface FaqSectionProps {
  faqs: FaqItem[];
}

export default function FaqSection({ faqs }: FaqSectionProps) {
  const previewFaqs = sortFaqs(faqs).slice(0, FAQ_HOME_PREVIEW_LIMIT);

  return (
    <section className="bg-[#F8FAFC] py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <SectionHeader
          as="h2"
          eyebrow="Frequently Asked Questions"
          title="Questions We Get Asked Often"
          description="Learn more about trial classes, training, uniforms, safety, and what to expect when starting at Hapkido College of Australia."
          className="text-center mb-14"
        />

        <FaqList faqs={previewFaqs} />

        <div className="mt-12 text-center">
          <Link
            href="/faq"
            className="inline-flex items-center justify-center rounded-2xl bg-[#003478] px-8 py-4 text-white font-semibold shadow-lg shadow-[#003478]/20 transition-all duration-200 hover:bg-[#002B63] hover:-translate-y-0.5"
          >
            View All FAQs
          </Link>
        </div>
      </div>
    </section>
  );
}
