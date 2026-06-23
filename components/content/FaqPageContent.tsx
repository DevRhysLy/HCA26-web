import Link from "next/link";
import CTASection from "@/components/content/CTASection";
import FaqList from "@/components/content/FaqList";
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
        <section className="max-w-4xl mx-auto px-6 py-16 md:py-24">
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

          <div className="mt-16">
            <SectionHeader
              as="h2"
              eyebrow="Still Have Questions?"
              title="We Are Here to Help"
              description="If you cannot find the answer you need, contact our team and we will guide you through trial classes, programs, and enrolments."
              className="text-center mb-10"
            />

            <div className="grid gap-4 md:grid-cols-3">
              <a
                href="tel:+61297470822"
                className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#003478]/25"
              >
                <p className="text-sm font-bold uppercase tracking-wide text-[#C60C30]">
                  Call Us
                </p>
                <p className="mt-2 text-xl font-extrabold text-[#111111]">
                  (02) 9747 0822
                </p>
                <p className="mt-2 text-sm text-black/55">
                  Speak with our team about trial class availability.
                </p>
              </a>

              <a
                href="mailto:train@hapkidocollege.com.au"
                className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#003478]/25"
              >
                <p className="text-sm font-bold uppercase tracking-wide text-[#C60C30]">
                  Email Us
                </p>
                <p className="mt-2 text-xl font-extrabold text-[#111111]">
                  train@hapkidocollege.com.au
                </p>
                <p className="mt-2 text-sm text-black/55">
                  Send us any questions about classes, locations, or enrolments.
                </p>
              </a>

              <Link
                href="/contact"
                className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#003478]/25"
              >
                <p className="text-sm font-bold uppercase tracking-wide text-[#C60C30]">
                  Book a Trial
                </p>
                <p className="mt-2 text-xl font-extrabold text-[#111111]">
                  Contact Form
                </p>
                <p className="mt-2 text-sm text-black/55">
                  Request a free trial class and we will get back to you soon.
                </p>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <CTASection />
    </>
  );
}
