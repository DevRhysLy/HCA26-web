import type { ReactNode } from "react";
import Image from "next/image";
import MarkdownContent from "@/components/content/MarkdownContent";
import SectionDivider from "@/components/ui/SectionDivider";
import PageBreadcrumb, {
  type BreadcrumbItem,
} from "@/components/content/PageBreadcrumb";
import { ButtonLink } from "@/components/ui/Button";

interface CtaLink {
  href: string;
  label: string;
  external?: boolean;
}

interface Media {
  src: string;
  alt?: string;
}

interface MarkdownPageProps {
  title: string;
  body: string;
  eyebrow: string;
  breadcrumbs?: BreadcrumbItem[];
  description?: string;
  fact?: ReactNode;
  profileImage?: Media;
  heroImage?: Media;
  primaryCta?: CtaLink | null;
  secondaryCta?: CtaLink;
  aside?: ReactNode;
  after?: ReactNode;
}

function CtaRow({
  primaryCta,
  secondaryCta,
}: {
  primaryCta?: CtaLink | null;
  secondaryCta?: CtaLink;
}) {
  if (primaryCta === null) return null;

  const primary = primaryCta ?? {
    href: "/contact",
    label: "Book Free Trial",
  };

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row">
      <ButtonLink
        href={primary.href}
        {...(primary.external
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
      >
        {primary.label}
      </ButtonLink>
      {secondaryCta && (
        <ButtonLink
          href={secondaryCta.href}
          variant="secondary"
          {...(secondaryCta.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {secondaryCta.label}
        </ButtonLink>
      )}
    </div>
  );
}

function TitleBlock({
  title,
  eyebrow,
  breadcrumbs,
  description,
  fact,
  primaryCta,
  secondaryCta,
  centered,
}: Pick<
  MarkdownPageProps,
  | "title"
  | "eyebrow"
  | "breadcrumbs"
  | "description"
  | "fact"
  | "primaryCta"
  | "secondaryCta"
> & {
  centered?: boolean;
}) {
  return (
    <div className={centered ? "text-center" : undefined}>
      {breadcrumbs && <PageBreadcrumb items={breadcrumbs} />}

      <p className="mb-3 font-sans text-xs font-bold uppercase tracking-[0.16em] text-hca-red">
        {eyebrow}
      </p>

      <h1 className="text-pretty font-serif text-4xl font-semibold tracking-tight text-hca-ink md:text-5xl">
        {title}
      </h1>

      {description && (
        <p
          className={`mt-4 max-w-[42rem] text-lg leading-relaxed text-hca-ink/65${
            centered ? " mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}

      {fact && <div className="mt-4">{fact}</div>}

      <SectionDivider
        className="mt-6"
        centered={centered}
      />

      <CtaRow primaryCta={primaryCta} secondaryCta={secondaryCta} />
    </div>
  );
}

function FramedPhoto({
  image,
  title,
  aspect,
}: {
  image: Media;
  title: string;
  aspect: string;
}) {
  return (
    <div className="overflow-hidden rounded-[20px] border border-hca-border bg-hca-surface shadow-[0_8px_24px_rgba(17,24,39,0.08)]">
      <div className={`relative ${aspect}`}>
        <Image
          src={image.src}
          alt={image.alt ?? title}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}

export default function MarkdownPage({
  title,
  body,
  eyebrow,
  breadcrumbs,
  description,
  fact,
  profileImage,
  heroImage,
  primaryCta,
  secondaryCta,
  aside,
  after,
}: MarkdownPageProps) {
  const isEditorialArticle = Boolean(
    heroImage && !aside && primaryCta === null,
  );

  const article = (
    <article className={isEditorialArticle ? "prose max-w-none" : "prose max-w-[65ch]"}>
      <MarkdownContent body={body} />
    </article>
  );

  const titleBlock = (
    <TitleBlock
      title={title}
      eyebrow={eyebrow}
      breadcrumbs={isEditorialArticle ? undefined : breadcrumbs}
      description={description}
      fact={fact}
      primaryCta={primaryCta}
      secondaryCta={secondaryCta}
      centered={isEditorialArticle}
    />
  );

  return (
    <div className="min-h-screen bg-hca-cream">
      <div className="hca-container hca-section">
        {profileImage ? (
          <header className="flex flex-col gap-8 md:flex-row md:items-center">
            <div className="flex shrink-0">
              <div className="relative h-40 w-40 overflow-hidden rounded-full">
                <Image
                  src={profileImage.src}
                  alt={profileImage.alt ?? title}
                  fill
                  sizes="160px"
                  priority
                  className="object-cover object-top"
                />
              </div>
            </div>
            <div className="flex-1">{titleBlock}</div>
          </header>
        ) : isEditorialArticle && heroImage ? (
          <header>
            {breadcrumbs && <PageBreadcrumb items={breadcrumbs} />}
            <div className="mx-auto max-w-3xl">{titleBlock}</div>
            <div className="mx-auto mt-10 max-w-3xl">
              <FramedPhoto
                image={heroImage}
                title={title}
                aspect="aspect-[16/9]"
              />
            </div>
          </header>
        ) : (
          <header className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {titleBlock}
            {heroImage && (
              <FramedPhoto
                image={heroImage}
                title={title}
                aspect="aspect-[4/3]"
              />
            )}
          </header>
        )}

        {aside ? (
          <div className="mt-16 grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-16 xl:grid-cols-[minmax(0,1fr)_24rem]">
            <div className="order-2 lg:order-1">{article}</div>
            <div className="order-1 lg:sticky lg:top-28 lg:order-2">
              {aside}
            </div>
          </div>
        ) : isEditorialArticle ? (
          <div className="mx-auto mt-12 max-w-3xl">{article}</div>
        ) : (
          <div className="mt-12">{article}</div>
        )}

        {after && <div className="mt-16">{after}</div>}
      </div>
    </div>
  );
}
