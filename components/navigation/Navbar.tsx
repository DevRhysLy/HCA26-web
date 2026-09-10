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

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <div className="relative" ref={menuRef}>
      <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Main navigation">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(`${item.href}/`));

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`group relative whitespace-nowrap font-sans text-sm font-semibold tracking-wide focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hca-blue xl:text-base ${
                isActive
                  ? "text-hca-blue"
                  : "text-hca-ink/60 hover:text-hca-red"
              }`}
            >
              {item.label}

              <span
                className={`hca-nav-line absolute -bottom-2 left-0 h-[3px] w-full rounded-full ${
                  isActive
                    ? "scale-x-100 bg-hca-red"
                    : "scale-x-0 bg-hca-blue group-hover:scale-x-100"
                }`}
              />
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="hca-press inline-flex min-h-11 min-w-11 items-center justify-center rounded-xl border border-hca-border bg-hca-surface p-2 text-hca-blue hover:border-hca-red/30 hover:text-hca-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hca-blue lg:hidden"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
      >
        {isOpen ? <X size={26} aria-hidden="true" /> : <Menu size={26} aria-hidden="true" />}
      </button>

      {isOpen && (
        <div
          id="mobile-nav"
          className="hca-menu-enter absolute right-0 top-14 z-[999] w-72 overflow-hidden rounded-2xl border border-hca-border bg-hca-surface shadow-[0_8px_24px_rgba(17,24,39,0.08)] lg:hidden"
        >
          <div className="flex h-1 w-full" aria-hidden="true">
            <div className="w-1/2 bg-hca-red" />
            <div className="w-1/2 bg-hca-blue" />
          </div>

          <nav className="flex flex-col p-3" aria-label="Mobile navigation">
            {navItems.map((item) => {
              const isActive =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(`${item.href}/`));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-xl px-4 py-3 text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hca-blue ${
                    isActive
                      ? "bg-hca-blue/5 text-hca-blue"
                      : "text-hca-ink/70 hover:bg-hca-red/5 hover:text-hca-red"
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
