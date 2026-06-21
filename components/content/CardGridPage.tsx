import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";

export interface CardGridItem {
  id: string;
  title: string;
  description?: string;
  href: string;
  badge?: string;
  ctaLabel?: string;
  image?: {
    src: string;
    alt?: string;
  };
}

interface CardGridPageProps {
  eyebrow?: string;
  title: string;
  description?: string;
  items: CardGridItem[];
}

export default function CardGridPage({
  eyebrow = "Hapkido College of Australia",
  title,
  description,
  items,
}: CardGridPageProps) {
  return (
    <section className="bg-[#F8FAFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <SectionHeader
          as="h1"
          eyebrow={eyebrow}
          title={title}
          description={description}
          className="text-center mb-14"
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <Link key={item.id} href={item.href} className="group">
              <div className="relative h-full overflow-hidden rounded-3xl border border-black/10 bg-white p-8 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#003478]/20 hover:shadow-[0_18px_45px_rgba(0,52,120,0.10)]">
                {!item.image && (
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#C60C30] to-[#003478]" />
                )}

                {item.image && (
                  <div className="mb-6 flex justify-center">
                    <div className="rounded-full bg-gradient-to-br from-[#C60C30] via-white to-[#003478] p-[3px]">
                      <div className="relative h-32 w-32 overflow-hidden rounded-full bg-white p-1 shadow-md">
                        <Image
                          src={item.image.src}
                          alt={item.image.alt ?? item.title}
                          fill
                          sizes="128px"
                          className="rounded-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.03]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {item.badge && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#003478]/15 bg-[#003478]/5 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#003478]">
                    <span className="h-2 w-2 rounded-full bg-[#C60C30]" />
                    {item.badge}
                  </div>
                )}

                <h2 className="text-2xl font-bold tracking-tight text-[#111111] transition-colors duration-200 group-hover:text-[#003478]">
                  {item.title}
                </h2>

                {item.description && (
                  <p className="mt-3 text-sm text-black/60 leading-relaxed">
                    {item.description}
                  </p>
                )}

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#003478] group-hover:text-[#C60C30] transition-colors">
                    {item.ctaLabel ?? "View Details"}
                  </span>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white transition-all duration-300 group-hover:border-[#003478]/30 group-hover:bg-[#003478]">
                    <svg
                      className="h-4 w-4 text-[#003478] transition-colors duration-300 group-hover:text-white"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14m-7-7 7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 h-16 w-16 rounded-tr-full bg-[#C60C30]/5" />
                <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-[#003478]/5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
