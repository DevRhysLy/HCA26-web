import FaqPageContent from "@/components/content/FaqPageContent";
import { getFaqs } from "@/lib/contentful";
import { mapFaqs } from "@/lib/contentfulMappers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Find answers about trial classes, training, uniforms, safety, and what to expect at Hapkido College of Australia.",
  openGraph: {
    title: "FAQ",
    description:
      "Find answers about trial classes, training, uniforms, safety, and what to expect at Hapkido College of Australia.",
  },
};

export const revalidate = 60;

function buildFaqJsonLd(faqs: ReturnType<typeof mapFaqs>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export default async function FaqPage() {
  const faqData = await getFaqs();
  const faqs = mapFaqs(faqData);
  const jsonLd = buildFaqJsonLd(faqs);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
      <FaqPageContent faqs={faqs} />
    </>
  );
}
