import type { FaqItem } from "@/lib/contentfulMappers";

interface FaqAccordionProps {
  faq: FaqItem;
}

export default function FaqAccordion({ faq }: FaqAccordionProps) {
  return (
    <details className="group rounded-2xl border border-black/10 bg-white p-6 shadow-sm">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
        <span className="text-lg font-bold text-[#111111] group-open:text-[#003478]">
          {faq.question}
        </span>

        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-black/10 text-[#003478] transition group-open:rotate-45">
          +
        </span>
      </summary>

      <div className="mt-4 border-t border-black/10 pt-4">
        <p className="text-black/65 leading-relaxed">{faq.answer}</p>
      </div>
    </details>
  );
}
