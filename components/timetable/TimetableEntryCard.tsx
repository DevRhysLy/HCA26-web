import type { TimetableCardVariant, TimetableClassCard } from "./types";

function cn(...classes: Array<string | undefined | false | null>) {
  return classes.filter(Boolean).join(" ");
}

function getCardStyle(variant: TimetableCardVariant) {
  switch (variant) {
    case "kids":
      return {
        wrap: "bg-[#003478]/5 border border-[#003478]/20 hover:border-[#003478]/40",
        accent: "bg-[#003478]",
        tag: "text-[#003478]",
        title: "text-[#111111]",
      };
    case "youth":
      return {
        wrap: "bg-[#C60C30]/5 border border-[#C60C30]/20 hover:border-[#C60C30]/40",
        accent: "bg-[#C60C30]",
        tag: "text-[#C60C30]",
        title: "text-[#111111]",
      };
    case "advanced":
      return {
        wrap: "bg-white border border-[#003478]/30 hover:border-[#003478]/50 shadow-sm",
        accent: "bg-[#003478]",
        tag: "text-[#003478]",
        title: "text-[#111111]",
      };
    case "adults":
      return {
        wrap: "bg-white border border-black/10 hover:border-[#C60C30]/40 shadow-sm",
        accent: "bg-[#C60C30]",
        tag: "text-black/60",
        title: "text-[#111111]",
      };
    default:
      return {
        wrap: "bg-white border border-black/10 hover:border-[#003478]/30 shadow-sm",
        accent: "bg-black/30",
        tag: "text-black/60",
        title: "text-[#111111]",
      };
  }
}

interface TimetableEntryCardProps {
  entry: TimetableClassCard;
}

export default function TimetableEntryCard({ entry }: TimetableEntryCardProps) {
  const variant = entry.variant ?? "generic";
  const style = getCardStyle(variant);
  const timeInside = entry.showTimeInsideCard
    ? (entry.timeLabelOverride ?? entry.timeSlot)
    : null;

  return (
    <div
      className={cn(
        "relative rounded-xl px-4 py-4 transition-colors min-h-[84px]",
        style.wrap,
      )}
    >
      <div
        className={cn(
          "absolute left-0 top-3 bottom-3 w-1 rounded-full",
          style.accent,
        )}
      />

      <div className="pl-3">
        {timeInside && (
          <div className="text-xs font-semibold tracking-wide text-black/50 mb-2">
            {timeInside}
          </div>
        )}

        {entry.tag && (
          <div
            className={cn(
              "text-xs font-bold tracking-wide uppercase",
              style.tag,
            )}
          >
            {entry.tag}
          </div>
        )}

        <div className={cn("mt-1 text-sm font-semibold", style.title)}>
          {entry.title}
        </div>
      </div>
    </div>
  );
}
