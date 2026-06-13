import SectionDivider from "@/components/ui/SectionDivider";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  /**
   * Heading level. "h1" renders at text-4xl/5xl, "h2" at text-3xl/5xl.
   * Default "h2".
   */
  as?: "h1" | "h2";
  /**
   * "center" adds text-center, max-w-3xl, mx-auto, mb-14.
   * "left" adds max-w-3xl only.
   * Pass className to override entirely.
   * Default "center".
   */
  align?: "center" | "left";
  /** Overrides the wrapper className completely. */
  className?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  align = "center",
  className,
}: SectionHeaderProps) {
  const centered = align === "center";
  const wrapperClass =
    className ?? (centered ? "text-center max-w-3xl mx-auto mb-14" : "max-w-3xl");
  const headingClass =
    Tag === "h1"
      ? "text-4xl md:text-5xl font-extrabold tracking-tight text-[#111111]"
      : "text-3xl md:text-5xl font-extrabold tracking-tight text-[#111111]";

  return (
    <div className={wrapperClass}>
      <p className="text-xs font-bold tracking-[0.35em] uppercase text-[#C60C30] mb-3">
        {eyebrow}
      </p>

      <Tag className={headingClass}>{title}</Tag>

      {description && (
        <p className="mt-4 text-black/60 text-base md:text-lg leading-relaxed">
          {description}
        </p>
      )}

      <SectionDivider centered={centered} className="mt-6" />
    </div>
  );
}
