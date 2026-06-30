"use client";

import * as React from "react";
import { createPortal } from "react-dom";

const TOOLTIP_WIDTH = 240;
const TOOLTIP_GAP = 8;
const VIEWPORT_MARGIN = 8;

interface TooltipPosition {
  top: number;
  left: number;
  placement: "top" | "bottom";
}

interface HoverTooltipProps {
  content?: string;
  children: React.ReactNode;
  className?: string;
}

export default function HoverTooltip({
  content,
  children,
  className,
}: HoverTooltipProps) {
  const triggerRef = React.useRef<HTMLDivElement>(null);
  const tooltipRef = React.useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [isTouch, setIsTouch] = React.useState(false);
  const [position, setPosition] = React.useState<TooltipPosition | null>(null);

  const hasContent = !!content?.trim();

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
    const tooltipHeight = tooltipRef.current?.offsetHeight ?? 80;

    const spaceAbove = rect.top;
    const placement: "top" | "bottom" =
      spaceAbove >= tooltipHeight + TOOLTIP_GAP + VIEWPORT_MARGIN
        ? "top"
        : "bottom";

    const top =
      placement === "top"
        ? rect.top - TOOLTIP_GAP - tooltipHeight
        : rect.bottom + TOOLTIP_GAP;

    let left = rect.left;
    const maxLeft = window.innerWidth - TOOLTIP_WIDTH - VIEWPORT_MARGIN;
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
      if (tooltipRef.current?.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () =>
      document.removeEventListener("pointerdown", handlePointerDown);
  }, [open, isTouch]);

  if (!hasContent) {
    return <>{children}</>;
  }

  const show = () => setOpen(true);
  const hide = () => setOpen(false);
  const toggle = () => setOpen((prev) => !prev);

  return (
    <div
      ref={triggerRef}
      className={className}
      onMouseEnter={!isTouch ? show : undefined}
      onMouseLeave={!isTouch ? hide : undefined}
      onFocus={!isTouch ? show : undefined}
      onBlur={!isTouch ? hide : undefined}
      onClick={isTouch ? toggle : undefined}
      role={isTouch ? "button" : undefined}
      aria-expanded={isTouch ? open : undefined}
      tabIndex={0}
    >
      {children}

      {mounted &&
        open &&
        createPortal(
          <div
            ref={tooltipRef}
            role="tooltip"
            style={{
              position: "fixed",
              top: position?.top ?? -9999,
              left: position?.left ?? -9999,
              width: TOOLTIP_WIDTH,
              zIndex: 2147483647,
              visibility: position ? "visible" : "hidden",
            }}
            className="pointer-events-none rounded-xl border border-black/10 bg-white p-3 shadow-[0_8px_24px_rgba(0,0,0,0.14)]"
          >
            <p className="text-xs leading-relaxed text-black/70">{content}</p>
          </div>,
          document.body,
        )}
    </div>
  );
}
