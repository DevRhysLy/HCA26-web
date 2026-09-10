import FaqList from "@/components/content/FaqList";
import SectionHeader from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
import { FAQ_HOME_PREVIEW_LIMIT } from "@/config/faq";
import { sortFaqs, type FaqItem } from "@/lib/contentfulMappers";

interface FaqSectionProps {
  faqs: FaqItem[];
}

export default function FaqSection({ faqs }: FaqSectionProps) {
  const previewFaqs = sortFaqs(faqs).slice(0, FAQ_HOME_PREVIEW_LIMIT);

  return (
    <section className="hca-section bg-hca-cream">
      <div className="hca-container">
        <div className="mx-auto max-w-4xl">
          <SectionHeader
            as="h2"
            eyebrow="Frequently Asked Questions"
            title="Questions we get asked often"
            description="Answers about trial classes, training, uniforms, safety, and what to expect when starting at Hapkido College of Australia."
            className="mb-8 text-center"
          />

          <FaqList faqs={previewFaqs} />

          <div className="mt-12 text-center">
            <ButtonLink href="/faq">View All FAQs</ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
