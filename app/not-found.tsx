import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-[#F8FAFC] min-h-screen flex items-center justify-center px-6">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xs font-bold tracking-[0.35em] uppercase text-[#C60C30] mb-3">
          404 Error
        </p>

        <h1 className="text-5xl md:text-7xl font-extrabold text-[#111111]">
          Page Not Found
        </h1>

        <p className="mt-6 text-lg text-black/60 leading-relaxed">
          The page you're looking for doesn't exist, may have been moved, or the
          link may be incorrect.
        </p>

        <div className="mt-6 mx-auto flex h-1 w-40 overflow-hidden rounded-full">
          <div className="w-1/2 bg-[#C60C30]" />
          <div className="w-1/2 bg-[#003478]" />
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="rounded-full bg-[#C60C30] px-8 py-4 text-white font-bold transition hover:opacity-90"
          >
            Book a Free Trial
          </Link>

          <Link
            href="/classes"
            className="rounded-full border border-[#003478] px-8 py-4 font-bold text-[#003478] transition hover:bg-[#003478] hover:text-white"
          >
            View Classes
          </Link>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <Link
            href="/locations"
            className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1"
          >
            <h2 className="font-bold text-[#111111]">
              Find a Dojang
            </h2>

            <p className="mt-2 text-sm text-black/60">
              View all HCA training locations.
            </p>
          </Link>

          <Link
            href="/instructors"
            className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1"
          >
            <h2 className="font-bold text-[#111111]">
              Meet Our Instructors
            </h2>

            <p className="mt-2 text-sm text-black/60">
              Learn more about the HCA teaching team.
            </p>
          </Link>

          <Link
            href="/about"
            className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1"
          >
            <h2 className="font-bold text-[#111111]">
              About Hapkido
            </h2>

            <p className="mt-2 text-sm text-black/60">
              Discover what makes Hapkido unique.
            </p>
          </Link>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="text-[#003478] font-semibold hover:text-[#C60C30]"
          >
            ← Return to Home
          </Link>
        </div>
      </div>
    </main>
  );
}