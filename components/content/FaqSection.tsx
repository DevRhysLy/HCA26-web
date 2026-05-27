interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
}

interface FaqSectionProps {
  faqs: FaqItem[];
}

export default function FaqSection({ faqs }: FaqSectionProps) {
  const sortedFaqs = [...faqs].sort(
    (a, b) => (a.order ?? 999) - (b.order ?? 999)
  );

  return (
    <section className="bg-[#F8FAFC] py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="text-xs font-bold tracking-[0.35em] uppercase text-[#C60C30] mb-3">
            Frequently Asked Questions
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#111111]">
            Questions We Get Asked Often
          </h1>

          <p className="mt-4 text-black/60 text-base md:text-lg leading-relaxed">
            Learn more about trial classes, training, uniforms, safety, and what
            to expect when starting at Hapkido College of Australia.
          </p>

          <div className="mt-6 mx-auto flex h-1 w-40 overflow-hidden rounded-full">
            <div className="w-1/2 bg-[#C60C30]" />
            <div className="w-1/2 bg-[#003478]" />
          </div>
        </div>

        <div className="space-y-4">
          {sortedFaqs.map((faq) => (
            <details
              key={faq.id}
              className="group rounded-2xl border border-black/10 bg-white p-6 shadow-sm"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
}