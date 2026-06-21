"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import type { NavItem } from "@/types/navigation";

interface NavbarProps {
  navItems: NavItem[];
}

export default function Navbar({ navItems }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on Escape key or click outside
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsOpen(false);
    }

    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close when route changes (e.g. Link click on same page)
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="relative" ref={menuRef}>
      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-6 xl:gap-10" aria-label="Main navigation">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`group relative text-sm xl:text-base font-semibold tracking-wide whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? "text-[#003478]"
                  : "text-black/60 hover:text-[#C60C30]"
              }`}
            >
              {item.label}

              <span
                className={`absolute -bottom-2 left-0 h-[3px] rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-full bg-[#C60C30]"
                    : "w-0 bg-[#003478] group-hover:w-full"
                }`}
              />
            </Link>
          );
        })}
      </nav>

      {/* Hamburger Toggle */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="lg:hidden inline-flex items-center justify-center rounded-xl border border-black/10 bg-white p-2.5 text-[#003478] shadow-sm hover:border-[#C60C30]/30 hover:text-[#C60C30] transition-colors duration-200"
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
      >
        {isOpen ? <X size={26} /> : <Menu size={26} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div
          id="mobile-nav"
          className="absolute right-0 top-14 z-[999] w-72 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl lg:hidden"
        >
          <div className="flex h-1 w-full">
            <div className="w-1/2 bg-[#C60C30]" />
            <div className="w-1/2 bg-[#003478]" />
          </div>

          <nav className="flex flex-col p-3" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-xl px-4 py-3 text-base font-semibold transition-colors ${
                    isActive
                      ? "bg-[#003478]/5 text-[#003478]"
                      : "text-black/70 hover:bg-[#C60C30]/5 hover:text-[#C60C30]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </div>
  );
}
