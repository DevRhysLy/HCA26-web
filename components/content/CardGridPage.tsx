import Link from "next/link";
import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";
import RevealOnView from "@/components/ui/RevealOnView";

export interface CardGridItem {
  id: string;
  title: string;
  description?: string;
  href: string;
  badge?: string;
  meta?: string;
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
  imageShape?: "circle" | "photo";
}

export default function CardGridPage({
  eyebrow = "Hapkido College of Australia",
  title,
  description,
  items,
  imageShape = "photo",
}: CardGridPageProps) {
  const isCircle = imageShape === "circle";

  return (
    <section className="min-h-screen bg-hca-cream">
      <div className="hca-container hca-section">
        <SectionHeader
          as="h1"
          eyebrow={eyebrow}
          title={title}
          description={description}
        />

        <RevealOnView className="flex flex-wrap justify-center gap-6">
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group w-full md:w-[calc(50%-0.75rem)] xl:w-[calc((100%-3rem)/3)] focus-visible:outline-none"
            >
              <div
                className={`hca-card-lift h-full overflow-hidden rounded-2xl border border-hca-border bg-hca-surface group-focus-visible:ring-2 group-focus-visible:ring-hca-blue ${
                  isCircle ? "p-8 text-center" : ""
                }`}
              >
                {item.image && isCircle && (
                  <div className="mb-6 flex justify-center">
                    <div className="hca-photo-zoom relative h-32 w-32 overflow-hidden rounded-full">
                      <Image
                        src={item.image.src}
                        alt={item.image.alt ?? item.title}
                        fill
                        sizes="128px"
                        className="object-cover object-top"
                      />
                    </div>
                  </div>
                )}

                {item.image && !isCircle && (
                  <div className="hca-photo-zoom relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt ?? item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                )}

                <div className={isCircle ? "" : "p-8"}>
                  {item.badge && (
                    <p className="text-xs font-semibold uppercase tracking-wide text-hca-blue">
                      {item.badge}
                    </p>
                  )}

                  <h2 className="hca-color-shift font-serif text-2xl font-semibold tracking-tight text-hca-ink group-hover:text-hca-blue">
                    {item.title}
                  </h2>

                  {item.meta && (
                    <p className="mt-2 text-sm font-semibold text-hca-ink/70">
                      {item.meta}
                    </p>
                  )}

                  {item.description && (
                    <p className="mt-4 text-sm leading-relaxed text-hca-ink/60">
                      {item.description}
                    </p>
                  )}

                  <p className="hca-color-shift mt-8 text-sm font-semibold text-hca-blue group-hover:text-hca-red">
                    {item.ctaLabel ?? "View more"}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </RevealOnView>
      </div>
    </section>
  );
}
