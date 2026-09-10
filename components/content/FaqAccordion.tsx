import type { FaqItem } from "@/lib/contentfulMappers";

interface FaqAccordionProps {
  faq: FaqItem;
}

export default function FaqAccordion({ faq }: FaqAccordionProps) {
  return (
    <details className="group rounded-2xl border border-hca-border bg-hca-surface p-6">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hca-blue">
        <span className="font-serif text-lg font-semibold text-hca-ink group-open:text-hca-blue">
          {faq.question}
        </span>

        <span
          className="hca-faq-icon flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-hca-border text-hca-blue group-open:rotate-45 group-open:border-hca-blue/25 group-open:bg-hca-cream"
          aria-hidden="true"
        >
          +
        </span>
      </summary>

      <div className="hca-faq-panel grid grid-rows-[0fr] group-open:grid-rows-[1fr]">
        <div className="overflow-hidden">
          <div className="mt-4 border-t border-hca-border pt-4">
            <p className="leading-relaxed text-hca-ink/65">{faq.answer}</p>
          </div>
        </div>
      </div>
    </details>
  );
}
