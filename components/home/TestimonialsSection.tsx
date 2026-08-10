import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";

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
    <div className="flex gap-1 text-[#C60C30]">
      {Array.from({ length: rating }).map((_, index) => (
        <span key={index}>★</span>
      ))}
    </div>
  );
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  return (
    <section className="bg-[#F8FAFC] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          eyebrow="Testimonials"
          title="Trusted by Families and Students"
          description="Hear from families and students who have experienced the confidence, discipline, and community that HCA training provides."
        />

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/95 backdrop-blur-sm p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#003478]/25 hover:shadow-[0_18px_45px_rgba(0,52,120,0.10)]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#C60C30] to-[#003478]" />

              <div className="relative z-10">
                <Stars rating={testimonial.rating} />

                <blockquote className="mt-5 text-black/70 leading-relaxed">
                  "{testimonial.testimonialDescription}"
                </blockquote>

                <div className="mt-6 border-t border-black/10 pt-5">
                  <p className="font-bold text-[#111111]">{testimonial.name}</p>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 h-16 w-16 rounded-tr-full bg-[#C60C30]/5" />
              <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-[#003478]/5" />
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-2xl bg-[#003478] px-8 py-4 text-white font-semibold shadow-lg shadow-[#003478]/20 transition-all duration-200 hover:bg-[#002B63] hover:-translate-y-0.5"
          >
            Book Your Free Trial
          </Link>

          <Link
            href="https://www.google.com/search?q=Hapkido+College+of+Australia+Reviews"
            className="text-sm font-semibold text-[#003478] hover:text-[#C60C30] transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read more reviews on Google →
          </Link>
        </div>
      </div>
    </section>
  );
}
