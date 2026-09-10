import Link from "next/link";
import type { HeaderProps } from "@/types/navigation";
import Navbar from "@/components/navigation/Navbar";
import { ButtonLink } from "@/components/ui/Button";

export default function Header({ navItems, cta }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-hca-border bg-hca-surface">
      <div className="hca-container">
        <div className="flex h-20 items-center justify-between">
          <Link href="/" className="flex items-center gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hca-blue focus-visible:ring-offset-2">
            <span className="font-serif text-xl font-semibold tracking-tight text-hca-ink lg:text-2xl">
              Hapkido College of{" "}
              <span className="text-hca-blue">Australia</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Navbar navItems={navItems} />

            {cta && (
              <ButtonLink
                href={cta.href}
                size="sm"
                className="hidden shadow-none lg:inline-flex"
              >
                {cta.label}
              </ButtonLink>
            )}
          </div>
        </div>
      </div>

      <div className="flex h-1 w-full" aria-hidden="true">
        <div className="w-1/2 bg-hca-red" />
        <div className="w-1/2 bg-hca-blue" />
      </div>
    </header>
  );
}
