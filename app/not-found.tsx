import Link from "next/link";
import SectionDivider from "@/components/ui/SectionDivider";
import { ButtonLink } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-hca-cream px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.16em] text-hca-red">
          Page not found
        </p>

        <h1 className="font-serif text-5xl font-semibold text-hca-ink md:text-7xl">
          We cannot find that page
        </h1>

        <p className="mt-6 text-lg leading-relaxed text-hca-ink/60">
          The page you are looking for does not exist, may have been moved, or
          the link may be incorrect.
        </p>

        <SectionDivider centered className="mt-6" />

        <div className="mt-12 flex flex-col justify-center gap-4 sm:flex-row">
          <ButtonLink href="/contact">Book Free Trial</ButtonLink>
          <ButtonLink href="/classes" variant="secondary">
            View Classes
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          <Link
            href="/locations"
            className="hca-card-lift rounded-2xl border border-hca-border bg-hca-surface p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hca-blue"
          >
            <h2 className="font-serif font-semibold text-hca-ink">Find a Dojang</h2>
            <p className="mt-2 text-sm text-hca-ink/60">
              View all HCA training locations.
            </p>
          </Link>

          <Link
            href="/instructors"
            className="hca-card-lift rounded-2xl border border-hca-border bg-hca-surface p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hca-blue"
          >
            <h2 className="font-serif font-semibold text-hca-ink">
              Meet Our Instructors
            </h2>
            <p className="mt-2 text-sm text-hca-ink/60">
              Meet the instructors who teach at HCA.
            </p>
          </Link>

          <Link
            href="/about"
            className="hca-card-lift rounded-2xl border border-hca-border bg-hca-surface p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hca-blue"
          >
            <h2 className="font-serif font-semibold text-hca-ink">About Hapkido</h2>
            <p className="mt-2 text-sm text-hca-ink/60">
              Discover what makes Hapkido unique.
            </p>
          </Link>
        </div>

        <div className="mt-12">
          <Link
            href="/"
            className="font-semibold text-hca-blue hover:text-hca-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hca-blue"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
