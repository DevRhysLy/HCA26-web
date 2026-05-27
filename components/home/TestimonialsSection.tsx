import Link from "next/link";

interface Testimonial {
  id: string;
  name: string;
  rating: number;
  testimonialDescription: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  backgroundImage?: string;
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

export default function TestimonialsSection({
  testimonials,
  backgroundImage,
}: TestimonialsSectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC] py-16 md:py-24">
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt=""
            className="h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-white/5" />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-bold tracking-[0.35em] uppercase text-[#C60C30] mb-3">
            Testimonials
          </p>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#111111]">
            Trusted by Families and Students
          </h2>

          <p className="mt-4 text-black/60 text-base md:text-lg leading-relaxed">
            Hear from families and students who have experienced the confidence,
            discipline, and community that HCA training provides.
          </p>

          {/* Korean flag accent */}
          <div className="mt-6 mx-auto flex h-1 w-40 overflow-hidden rounded-full">
            <div className="w-1/2 bg-[#C60C30]" />
            <div className="w-1/2 bg-[#003478]" />
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-black/10
                bg-white/95
                backdrop-blur-sm
                p-7
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#003478]/25
                hover:shadow-[0_18px_45px_rgba(0,52,120,0.10)]
              "
            >
              {/* Top Accent */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#C60C30] to-[#003478]" />

              <div className="relative z-10">
                <Stars rating={testimonial.rating} />

                <blockquote className="mt-5 text-black/70 leading-relaxed">
                  “{testimonial.testimonialDescription}”
                </blockquote>

                <div className="mt-6 border-t border-black/10 pt-5">
                  <p className="font-bold text-[#111111]">{testimonial.name}</p>
                </div>
              </div>

              {/* Decorative accents */}
              <div className="absolute bottom-0 left-0 h-16 w-16 rounded-tr-full bg-[#C60C30]/5" />
              <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-[#003478]/5" />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="https://www.google.com/search?sca_esv=c64c21fd1a176042&sxsrf=ANbL-n6AWBAr7w4OwrcOf40k4im7_0sqqg:1779177618049&si=AL3DRZHrmvnFAVQPOO2Bzhf8AX9KZZ6raUI_dT7DG_z0kV2_x7nBHTbRnkTC9Ebqnq9ppHrPxz0l1GP6jXtNxwc3YHYusBemKesc6KoXrX1RIn2K4--b0YciyhBMyfphiVeb4hxs3BDWj59zTSp2DI0SnLUEkjITdg%3D%3D&q=Hapkido+College+of+Australia+Reviews&sa=X&ved=2ahUKEwi166mP8cSUAxUNsVYBHYnLEsQQ0bkNegQIPxAH&biw=1512&bih=827&dpr=2"
            className="
              inline-flex
              items-center
              justify-center
              rounded-2xl
              bg-[#003478]
              px-8
              py-4
              text-white
              font-semibold
              shadow-lg
              shadow-[#003478]/20
              transition-all
              duration-200
              hover:bg-[#002B63]
              hover:-translate-y-0.5
            "
            target="_blank"
            rel="noopener noreferrer"
          >
            View More Reviews
          </Link>
        </div>
      </div>
    </section>
  );
}
