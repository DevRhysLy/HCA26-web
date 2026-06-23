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
  "rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#003478]/25";

export default function ContactInfoCards({
  thirdCard,
  className = "",
}: ContactInfoCardsProps) {
  return (
    <div className={`grid gap-4 md:grid-cols-3 ${className}`.trim()}>
      <a href="tel:+61297470822" className={cardClassName}>
        <p className="text-sm font-bold uppercase tracking-wide text-[#C60C30]">
          Call Us
        </p>
        <p className="mt-2 text-xl font-extrabold text-[#111111]">
          (02) 9747 0822
        </p>
        <p className="mt-2 text-sm text-black/55">
          Speak with our team about trial class availability.
        </p>
      </a>

      <a href="mailto:train@hapkidocollege.com.au" className={cardClassName}>
        <p className="text-sm font-bold uppercase tracking-wide text-[#C60C30]">
          Email Us
        </p>
        <p className="mt-2 text-xl font-extrabold text-[#111111] break-words">
          train@hapkidocollege.com.au
        </p>
        <p className="mt-2 text-sm text-black/55">
          Send us any questions about classes, locations, or enrolments.
        </p>
      </a>

      <Link href={thirdCard.href} className={cardClassName}>
        <p className="text-sm font-bold uppercase tracking-wide text-[#C60C30]">
          {thirdCard.eyebrow}
        </p>
        <p className="mt-2 text-xl font-extrabold text-[#111111]">
          {thirdCard.title}
        </p>
        <p className="mt-2 text-sm text-black/55">{thirdCard.description}</p>
      </Link>
    </div>
  );
}
