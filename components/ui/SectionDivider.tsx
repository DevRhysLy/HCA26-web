interface SectionDividerProps {
  centered?: boolean;
  width?: string;
  className?: string;
  tone?: "default" | "onDark";
}

export default function SectionDivider({
  centered,
  width = "w-40",
  className,
  tone = "default",
}: SectionDividerProps) {
  const classes = [
    "korea-bar",
    tone === "onDark" && "korea-bar-on-dark",
    width,
    centered && "mx-auto",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} aria-hidden="true">
      <span />
      <span />
    </div>
  );
}
