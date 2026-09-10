import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";

const base =
  "hca-press inline-flex items-center justify-center rounded-2xl font-sans font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";

const sizes = {
  md: "px-8 py-4 text-base",
  sm: "min-h-11 px-4 py-2 text-sm",
} as const;

const variants = {
  primary:
    "bg-hca-blue text-white hover:bg-hca-blue-hover focus-visible:ring-hca-blue",
  secondary:
    "border border-hca-border bg-hca-surface text-hca-ink hover:border-hca-blue/30 hover:text-hca-blue focus-visible:ring-hca-blue",
  inverse:
    "bg-white text-hca-blue hover:bg-hca-cream focus-visible:ring-white focus-visible:ring-offset-hca-blue",
  inverseOutline:
    "border border-white/70 text-white hover:bg-white/10 focus-visible:ring-white focus-visible:ring-offset-hca-blue",
} as const;

type Variant = keyof typeof variants;
type Size = keyof typeof sizes;

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, "href" | "className" | "children">;

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      href={href}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </Link>
  );
}

type ButtonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">;

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
}
