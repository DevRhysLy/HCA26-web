import Link from "next/link";
import type { HeaderProps } from "@/types/navigation";
import Navbar from "@/components/navigation/Navbar";

export default function Header({ navItems, cta }: HeaderProps) {
  return (
    <header className="bg-white border-b border-black/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-4">
            <span className="text-xl lg:text-2xl font-bold tracking-tight text-black">
              Hapkido College of{" "}
              <span className="text-[#003478]">Australia</span>
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <Navbar navItems={navItems} />

            {cta && (
              <Link
                href={cta.href}
                className="
  hidden lg:inline-flex
  items-center justify-center
  whitespace-nowrap

  rounded-xl
  bg-[#003478]
  hover:bg-[#002B63]

  text-white
  font-semibold
  transition-all duration-200

  px-4 py-2 text-sm
  xl:px-6 xl:py-2.5 xl:text-base

  shadow-md shadow-[#003478]/20
  border border-[#003478]
"
              >
                {cta.label}
              </Link>
            )}
          </div>
        </div>
      </div>

      <div className="flex h-1 w-full">
        <div className="w-1/2 bg-[#C60C30]" />
        <div className="w-1/2 bg-[#003478]" />
      </div>
    </header>
  );
}
