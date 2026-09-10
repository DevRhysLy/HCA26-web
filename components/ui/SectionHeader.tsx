import SectionDivider from "@/components/ui/SectionDivider";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  as?: "h1" | "h2";
  align?: "center" | "left";
  className?: string;
  showDivider?: boolean;
  tone?: "default" | "onDark";
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  align = "center",
  className,
  showDivider = true,
  tone = "default",
}: SectionHeaderProps) {
  const centered = align === "center";
  const wrapperClass =
    className ?? (centered ? "mx-auto mb-8 max-w-3xl text-center" : "max-w-3xl");
  const onDark = tone === "onDark";
  const headingClass =
    Tag === "h1"
      ? `font-serif text-4xl md:text-5xl font-semibold tracking-tight text-pretty ${onDark ? "text-hca-cream" : "text-hca-ink"}`
      : `font-serif text-3xl md:text-5xl font-semibold tracking-tight text-pretty ${onDark ? "text-hca-cream" : "text-hca-ink"}`;

  return (
    <div className={wrapperClass}>
      <p
        className={`mb-3 font-sans text-xs font-bold uppercase tracking-[0.16em] ${
          onDark ? "text-hca-cream/80" : "text-hca-red"
        }`}
      >
        {eyebrow}
      </p>

      <Tag className={headingClass}>{title}</Tag>

      {description && (
        <p
          className={`mt-4 max-w-[42rem] text-base leading-relaxed md:text-lg ${
            centered ? "mx-auto" : ""
          } ${onDark ? "text-hca-cream/90" : "text-hca-ink/65"}`}
        >
          {description}
        </p>
      )}

      {showDivider && (
        <SectionDivider
          centered={centered}
          tone={onDark ? "onDark" : "default"}
          className="mt-6"
        />
      )}
    </div>
  );
}
