import CTASection from "@/components/content/CTASection";
import FaqList from "@/components/content/FaqList";
import ContactInfoCards from "@/components/contact/ContactInfoCards";
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
      <main className="bg-[#F8FAFC] min-h-screen">
        <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
          <div className="max-w-4xl mx-auto">
            <SectionHeader
              as="h1"
              eyebrow="Frequently Asked Questions"
              title="Everything You Need to Know"
              description="Browse answers about trial classes, training, uniforms, safety, and what to expect when starting at Hapkido College of Australia."
              className="text-center mb-14"
            />

            <div className="space-y-12">
              {groupedFaqs.map(({ category, faqs: categoryFaqs }) => (
                <div key={category}>
                  <h2 className="mb-5 text-sm font-bold uppercase tracking-[0.25em] text-[#C60C30]">
                    {category}
                  </h2>
                  <FaqList faqs={categoryFaqs} />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-16">
            <SectionHeader
              as="h2"
              eyebrow="Still Have Questions?"
              title="We Are Here to Help"
              description="If you cannot find the answer you need, contact our team and we will guide you through trial classes, programs, and enrolments."
              className="text-center mb-10"
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
          </div>
        </section>
      </main>

      <CTASection />
    </>
  );
}
