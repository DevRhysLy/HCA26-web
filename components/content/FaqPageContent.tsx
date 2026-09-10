import CTASection from "@/components/content/CTASection";
import FaqList from "@/components/content/FaqList";
import ContactInfoCards from "@/components/contact/ContactInfoCards";
import RevealOnView from "@/components/ui/RevealOnView";
import SectionHeader from "@/components/ui/SectionHeader";
import { FAQ_CATEGORY_ORDER } from "@/config/faq";
import { groupFaqsByCategory, type FaqItem } from "@/lib/contentfulMappers";

interface FaqPageContentProps {
  faqs: FaqItem[];
}

export default function FaqPageContent({ faqs }: FaqPageContentProps) {
  const groupedFaqs = groupFaqsByCategory(faqs, FAQ_CATEGORY_ORDER);

  return (
    <>
      <div className="min-h-screen bg-hca-cream">
        <section className="hca-container hca-section">
          <div className="mx-auto max-w-4xl">
            <SectionHeader
              as="h1"
              eyebrow="Frequently Asked Questions"
              title="Everything You Need to Know"
              description="Browse answers about trial classes, training, uniforms, safety, and what to expect when starting at Hapkido College of Australia."
              className="mb-8 text-center"
            />

            <RevealOnView className="space-y-12">
              {groupedFaqs.map(({ category, faqs: categoryFaqs }) => (
                <div key={category}>
                  <h2 className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-hca-red">
                    {category}
                  </h2>
                  <FaqList faqs={categoryFaqs} />
                </div>
              ))}
            </RevealOnView>
          </div>

          <RevealOnView className="mt-16">
            <SectionHeader
              as="h2"
              eyebrow="Still Have Questions?"
              title="We Are Here to Help"
              description="If you cannot find the answer you need, contact our team and we will guide you through trial classes, programs, and enrolments."
              className="mb-8 text-center"
            />

            <ContactInfoCards
              thirdCard={{
                eyebrow: "Book a Trial",
                title: "Contact Form",
                description:
                  "Request a free trial class and we will get back to you soon.",
                href: "/contact",
              }}
            />
          </RevealOnView>
        </section>
      </div>

      <RevealOnView>
        <CTASection />
      </RevealOnView>
    </>
  );
}
