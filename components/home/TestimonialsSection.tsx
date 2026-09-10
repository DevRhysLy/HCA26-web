import SectionHeader from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  testimonialDescription: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-hca-red" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: rating }).map((_, index) => (
        <span key={index} aria-hidden="true">
          ★
        </span>
      ))}
    </div>
  );
}

export default function TestimonialsSection({
  testimonials,
}: TestimonialsSectionProps) {
  return (
    <section className="hca-section bg-hca-cream">
      <div className="hca-container">
        <SectionHeader
          eyebrow="Testimonials"
          title="Trusted by families and students"
          description="Hear from families and students who have experienced the confidence, discipline, and community that HCA training provides."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <figure
              key={testimonial.id}
              className={`rounded-2xl border border-hca-border bg-hca-surface p-8 ${
                index === 0 ? "md:col-span-1" : ""
              }`}
            >
              <Stars rating={testimonial.rating} />

              <blockquote className="mt-4 leading-relaxed text-hca-ink/70">
                “{testimonial.testimonialDescription}”
              </blockquote>

              <figcaption className="mt-6 border-t border-hca-border pt-4 font-semibold text-hca-ink">
                {testimonial.name}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 text-center">
          <ButtonLink
            href="https://www.google.com/search?q=Hapkido+College+of+Australia+Reviews"
            target="_blank"
            rel="noopener noreferrer"
          >
            View More Reviews
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
