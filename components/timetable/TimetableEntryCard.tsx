"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import type { TimetableCardVariant, TimetableClassCard } from "./types";
import { formatTime, parseTimeToMinutes } from "./time";

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

function hasHoverContent(entry: TimetableClassCard) {
  return !!(
    entry.instructor ||
    entry.description ||
    entry.ageRange ||
    entry.duration
  );
}

const POPOVER_WIDTH = 256;
const POPOVER_GAP = 8;
const VIEWPORT_MARGIN = 8;

interface PopoverPosition {
  top: number;
  left: number;
  placement: "top" | "bottom";
}

interface TimetableEntryCardProps {
  entry: TimetableClassCard;
  fill?: boolean;
  clipped?: boolean;
}

export default function TimetableEntryCard({
  entry,
  fill = false,
  clipped = true,
}: TimetableEntryCardProps) {
  const variant = entry.variant ?? "generic";
  const style = getCardStyle(variant);
  const timeInside = entry.showTimeInsideCard
    ? (entry.timeLabelOverride ?? entry.timeSlot)
    : null;
  const showPopover = hasHoverContent(entry);

  const startMinutes = parseTimeToMinutes(entry.timeSlot);
  const timeRange =
    startMinutes !== null
      ? `${formatTime(startMinutes)} \u2013 ${formatTime(
          startMinutes + (entry.durationMinutes ?? 60),
        )}`
      : entry.timeSlot;

  const triggerRef = React.useRef<HTMLDivElement>(null);
  const popoverRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [isTouch, setIsTouch] = React.useState(false);
  const [position, setPosition] = React.useState<PopoverPosition | null>(null);

  React.useEffect(() => {
    setMounted(true);

    const mql = window.matchMedia("(hover: none), (pointer: coarse)");
    const sync = () => setIsTouch(mql.matches);
    sync();
    mql.addEventListener("change", sync);

    return () => mql.removeEventListener("change", sync);
  }, []);

  const updatePosition = React.useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    const popoverHeight = popoverRef.current?.offsetHeight ?? 180;

    const spaceAbove = rect.top;
    const placement: "top" | "bottom" =
      spaceAbove >= popoverHeight + POPOVER_GAP + VIEWPORT_MARGIN
        ? "top"
        : "bottom";

    const top =
      placement === "top"
        ? rect.top - POPOVER_GAP - popoverHeight
        : rect.bottom + POPOVER_GAP;

    let left = rect.left;
    const maxLeft = window.innerWidth - POPOVER_WIDTH - VIEWPORT_MARGIN;
    if (left > maxLeft) left = maxLeft;
    if (left < VIEWPORT_MARGIN) left = VIEWPORT_MARGIN;

    setPosition({ top, left, placement });
  }, []);

  React.useEffect(() => {
    if (!open) return;

    updatePosition();

    const handle = () => updatePosition();
    window.addEventListener("scroll", handle, true);
    window.addEventListener("resize", handle);

    return () => {
      window.removeEventListener("scroll", handle, true);
      window.removeEventListener("resize", handle);
    };
  }, [open, updatePosition]);

  React.useEffect(() => {
    if (!open || !isTouch) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (triggerRef.current?.contains(target)) return;
      if (popoverRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () =>
      document.removeEventListener("pointerdown", handlePointerDown);
  }, [open, isTouch]);

  const show = () => setOpen(true);
  const hide = () => setOpen(false);
  const toggle = () => setOpen((prev) => !prev);

  return (
    <div
      ref={triggerRef}
      className={cn("relative", fill && clipped && "h-full")}
      onMouseEnter={showPopover && !isTouch ? show : undefined}
      onMouseLeave={showPopover && !isTouch ? hide : undefined}
      onFocus={showPopover && !isTouch ? show : undefined}
      onBlur={showPopover && !isTouch ? hide : undefined}
      onClick={showPopover && isTouch ? toggle : undefined}
      role={showPopover && isTouch ? "button" : undefined}
      aria-expanded={showPopover && isTouch ? open : undefined}
      tabIndex={showPopover ? 0 : undefined}
    >
      <div
        className={cn(
          "relative rounded-xl transition-colors",
          fill
            ? cn("h-full px-3 py-2", clipped && "overflow-hidden")
            : "min-h-[84px] px-4 py-4",
          style.wrap,
        )}
      >
        <div
          className={cn(
            "absolute left-0 w-1 rounded-full",
            fill ? "top-2 bottom-2" : "top-3 bottom-3",
            style.accent,
          )}
        />

        <div className="pl-3">
          {fill ? (
            <div className="text-[10px] font-semibold tracking-wide text-black/45 mb-0.5">
              {timeRange}
            </div>
          ) : (
            timeInside && (
              <div className="text-xs font-semibold tracking-wide text-black/50 mb-2">
                {timeInside}
              </div>
            )
          )}

          {entry.tag && (
            <div
              className={cn(
                "font-bold tracking-wide uppercase",
                fill ? "text-[10px]" : "text-xs",
                style.tag,
              )}
            >
              {entry.tag}
            </div>
          )}

          <div
            className={cn(
              "font-semibold",
              fill ? "text-xs leading-snug" : "mt-1 text-sm",
              style.title,
            )}
          >
            {entry.title}
          </div>

          {showPopover && !fill && (
            <div className="mt-1.5 text-[10px] font-medium text-black/40 flex items-center gap-1">
              <span className="inline-block h-1 w-1 rounded-full bg-current" />
              {isTouch ? "Tap for details" : "Details on hover"}
            </div>
          )}
        </div>
      </div>

      {showPopover &&
        mounted &&
        open &&
        createPortal(
          <div
            ref={popoverRef}
            role="tooltip"
            style={{
              position: "fixed",
              top: position?.top ?? -9999,
              left: position?.left ?? -9999,
              width: POPOVER_WIDTH,
              zIndex: 2147483647,
              visibility: position ? "visible" : "hidden",
            }}
            className={cn(
              "bg-white rounded-2xl border border-black/10 shadow-[0_12px_40px_rgba(0,0,0,0.18)]",
              "p-4 pointer-events-none",
            )}
          >
            {entry.instructor && (
              <div className="flex items-center gap-3 mb-3">
                {entry.instructor.photo ? (
                  <Image
                    src={entry.instructor.photo}
                    alt={entry.instructor.name}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover border border-black/10 flex-shrink-0"
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-[#003478]/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-[#003478] text-sm font-bold">
                      {entry.instructor.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <div className="text-sm font-bold text-[#111111]">
                    {entry.instructor.name}
                  </div>
                  {entry.instructor.rank && (
                    <div className="text-xs text-[#C60C30] font-semibold">
                      {entry.instructor.rank}
                    </div>
                  )}
                </div>
              </div>
            )}

            {entry.description && (
              <p className="text-xs text-black/60 leading-relaxed mb-3">
                {entry.description}
              </p>
            )}

            {(entry.ageRange || entry.duration) && (
              <div className="flex gap-3 flex-wrap">
                {entry.ageRange && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#003478] bg-[#003478]/8 rounded-lg px-2.5 py-1">
                    {entry.ageRange}
                  </span>
                )}
                {entry.duration && (
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-black/60 bg-black/6 rounded-lg px-2.5 py-1">
                    {entry.duration}
                  </span>
                )}
              </div>
            )}
          </div>,
          document.body,
        )}
    </div>
  );
}
