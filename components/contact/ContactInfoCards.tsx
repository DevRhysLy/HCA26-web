import Link from "next/link";

interface ContactInfoCardsProps {
  thirdCard: {
    eyebrow: string;
    title: string;
    description: string;
    href: string;
  };
  className?: string;
}

const cardClassName =
  "hca-card-lift rounded-2xl border border-hca-border bg-hca-surface p-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hca-blue";

export default function ContactInfoCards({
  thirdCard,
  className = "",
}: ContactInfoCardsProps) {
  return (
    <div className={`grid gap-4 md:grid-cols-3 ${className}`.trim()}>
      <a href="tel:+61297470822" className={cardClassName}>
        <p className="text-sm font-bold uppercase tracking-wide text-hca-red">
          Call Us
        </p>
        <p className="mt-2 font-serif text-xl font-semibold text-hca-ink">
          (02) 9747 0822
        </p>
        <p className="mt-2 text-sm text-hca-ink/55">
          Speak with our team about trial class availability.
        </p>
      </a>

      <a href="mailto:train@hapkidocollege.com.au" className={cardClassName}>
        <p className="text-sm font-bold uppercase tracking-wide text-hca-red">
          Email Us
        </p>
        <p className="mt-2 break-words font-serif text-xl font-semibold text-hca-ink">
          train@hapkidocollege.com.au
        </p>
        <p className="mt-2 text-sm text-hca-ink/55">
          Send us any questions about classes, locations, or enrolments.
        </p>
      </a>

      <Link href={thirdCard.href} className={cardClassName}>
        <p className="text-sm font-bold uppercase tracking-wide text-hca-red">
          {thirdCard.eyebrow}
        </p>
        <p className="mt-2 font-serif text-xl font-semibold text-hca-ink">
          {thirdCard.title}
        </p>
        <p className="mt-2 text-sm text-hca-ink/55">{thirdCard.description}</p>
      </Link>
    </div>
  );
}
