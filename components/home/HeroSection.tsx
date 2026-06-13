import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#F8FAFC]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-img.jpg"
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-white/5" />
      </div>

      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-[#003478]/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#C60C30]/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-3 rounded-full border border-[#003478]/10 bg-white px-4 py-2 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-[#C60C30]" />

              <span className="text-xs font-bold tracking-[0.25em] uppercase text-[#003478]">
                Hapkido College of Australia
              </span>
            </div>

            {/* Heading */}
            <h1 className="mt-8 text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111111] leading-[1.05]">
              Helping Children Build
              <span className="block text-[#003478]">
                Confidence & Discipline
              </span>
              Through Hapkido
            </h1>

            {/* Supporting Text */}
            <p className="mt-6 text-lg leading-relaxed text-black/65 max-w-2xl">
              Traditional martial arts training in a safe, structured, and
              supportive environment where children develop confidence,
              discipline, respect, and real self-defence skills.
            </p>

            {/* Korean flag accent */}
            <div className="mt-8 flex h-1 w-40 overflow-hidden rounded-full">
              <div className="w-1/2 bg-[#C60C30]" />
              <div className="w-1/2 bg-[#003478]" />
            </div>

            {/* CTA Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-2xl bg-[#003478] px-8 py-4 text-white font-semibold shadow-lg shadow-[#003478]/20 transition-all duration-200 hover:bg-[#002B63] hover:-translate-y-0.5"
              >
                Book a Free Trial
              </Link>

              <Link
                href="/locations"
                className="inline-flex items-center justify-center rounded-2xl border border-black/10 bg-white px-8 py-4 text-[#111111] font-semibold transition-all duration-200 hover:border-[#003478]/20 hover:text-[#003478]"
              >
                Find a Location
              </Link>
            </div>

            {/* Stats / Trust Indicators */}
            <div className="mt-12 grid grid-cols-3 gap-6 max-w-xl">
              <div>
                <div className="text-3xl font-extrabold text-[#111111]">
                  35+
                </div>
                <div className="mt-1 text-sm text-black/60">
                  Years Experience
                </div>
              </div>

              <div>
                <div className="text-3xl font-extrabold text-[#111111]">
                  1500+
                </div>
                <div className="mt-1 text-sm text-black/60">
                  Students Trained
                </div>
              </div>

              <div>
                <div className="text-3xl font-extrabold text-[#111111]">
                  Family
                </div>
                <div className="mt-1 text-sm text-black/60">
                  Community Focus
                </div>
              </div>
            </div>
          </div>

          {/* Right Visual */}
          <div className="relative hidden lg:block">
            {/* Main image placeholder */}
            <div className="relative overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-2xl">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src="/images/khlock.webp"
                  alt="Hapkido students training"
                  fill
                  priority
                  sizes="(max-width: 1024px) 0px, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Top accent */}
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#C60C30] to-[#003478]" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 hidden md:block rounded-2xl border border-black/10 bg-white p-5 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#003478]/10">
                  <div className="h-5 w-5 rounded-full bg-[#003478]" />
                </div>

                <div>
                  <div className="text-sm font-semibold text-[#111111]">
                    Safe & Structured
                  </div>

                  <div className="text-sm text-black/55">
                    Beginner friendly classes
                  </div>
                </div>
              </div>
            </div>

            {/* Floating accent card */}
            <div className="absolute -top-6 -right-6 hidden lg:block rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[#C60C30]" />

                <span className="text-sm font-semibold text-[#111111]">
                  Traditional Martial Arts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
