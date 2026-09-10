"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface RevealOnViewProps {
  children: ReactNode;
  className?: string;
}

export default function RevealOnView({
  children,
  className = "",
}: RevealOnViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"idle" | "pending" | "visible">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setState("visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible");
          observer.disconnect();
          return;
        }

        setState("pending");
      },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const motionClass =
    state === "pending"
      ? "hca-inview-pending"
      : state === "visible"
        ? "hca-inview-visible"
        : "";

  return (
    <div ref={ref} className={`hca-inview ${motionClass} ${className}`.trim()}>
      {children}
    </div>
  );
}
