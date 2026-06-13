interface SectionDividerProps {
  /** Adds mx-auto to centre the bar. Default false. */
  centered?: boolean;
  /** Tailwind width class. Default "w-40". */
  width?: string;
  className?: string;
}

export default function SectionDivider({
  centered,
  width = "w-40",
  className,
}: SectionDividerProps) {
  const classes = [
    "flex h-1 overflow-hidden rounded-full",
    width,
    centered && "mx-auto",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      <div className="w-1/2 bg-[#C60C30]" />
      <div className="w-1/2 bg-[#003478]" />
    </div>
  );
}
