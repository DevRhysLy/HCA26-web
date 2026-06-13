import FaqSection from "@/components/content/FaqSection";
import { getFaqs } from "@/lib/contentful";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Get answers about commonly asked questions at Hapkido College of Australia",
};

export const revalidate = 60;

export default async function FaqPage() {
  const faqData = await getFaqs();

  const faqs = faqData.map((faq: any) => ({
    id: faq.sys.id,
    question: faq.fields.question,
    answer: faq.fields.answer,
  }));

  return <FaqSection faqs={faqs} />;
}