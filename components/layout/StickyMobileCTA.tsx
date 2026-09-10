"use client";

import { usePathname } from "next/navigation";
import { ButtonLink } from "@/components/ui/Button";

export default function StickyMobileCTA() {
  const pathname = usePathname();

  if (pathname === "/contact") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-hca-border bg-hca-surface/95 p-4 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_rgba(17,24,39,0.08)] lg:hidden">
      <div className="flex gap-4">
        <ButtonLink href="/contact" className="hca-press-static flex-1">
          Book Free Trial
        </ButtonLink>

        <ButtonLink
          href="/locations"
          variant="secondary"
          className="hca-press-static"
        >
          Locations
        </ButtonLink>
      </div>
    </div>
  );
}
