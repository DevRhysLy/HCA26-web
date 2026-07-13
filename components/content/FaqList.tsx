import FaqAccordion from "@/components/content/FaqAccordion";
import type { FaqItem } from "@/lib/contentfulMappers";

interface FaqListProps {
  faqs: FaqItem[];
}

export default function FaqList({ faqs }: FaqListProps) {
  return (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <FaqAccordion key={faq.id} faq={faq} />
      ))}
    </div>
  );
}
