import Link from "next/link";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function PageBreadcrumb({ items }: { items: BreadcrumbItem[] }) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-2 text-sm font-medium text-hca-ink/55">
        {items.map((item, index) => {
          const last = index === items.length - 1;

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && <span aria-hidden="true">/</span>}
              {item.href && !last ? (
                <Link
                  href={item.href}
                  className="text-hca-blue hover:text-hca-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hca-blue"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={last ? "text-hca-ink" : undefined}
                  aria-current={last ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
