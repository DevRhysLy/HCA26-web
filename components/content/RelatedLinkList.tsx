import Link from "next/link";

export interface RelatedLinkItem {
  title: string;
  href?: string;
  meta?: string;
}

export default function RelatedLinkList({
  title,
  items,
}: {
  title: string;
  items: RelatedLinkItem[];
}) {
  if (items.length === 0) return null;

  return (
    <div>
      <h3 className="text-sm font-semibold text-hca-ink/55">{title}</h3>
      <ul className="mt-3 space-y-2">
        {items.map((item) => {
          const content = (
            <>
              <span className="font-semibold text-hca-ink">{item.title}</span>
              {item.meta && (
                <span className="text-sm font-normal text-hca-ink/60">
                  {item.meta}
                </span>
              )}
            </>
          );

          return (
            <li key={`${item.title}-${item.href ?? item.meta}`}>
              {item.href ? (
                <Link
                  href={item.href}
                  className="flex flex-wrap items-baseline gap-x-2 text-hca-blue hover:text-hca-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hca-blue"
                >
                  {content}
                </Link>
              ) : (
                <div className="flex flex-wrap items-baseline gap-x-2">
                  {content}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
