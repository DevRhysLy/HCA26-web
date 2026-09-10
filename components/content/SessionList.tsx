import Link from "next/link";
import { DEFAULT_DAYS, type TimetableDay } from "@/components/timetable/types";
import type { SessionItem } from "@/lib/scheduleRelations";

function groupByDay(items: SessionItem[]) {
  const groups = new Map<TimetableDay, SessionItem[]>();

  for (const day of DEFAULT_DAYS) {
    const rows = items.filter((item) => item.day === day);
    if (rows.length > 0) groups.set(day, rows);
  }

  return groups;
}

export default function SessionList({ items }: { items: SessionItem[] }) {
  if (items.length === 0) return null;

  const groups = groupByDay(items);

  return (
    <div>
      <h3 className="text-sm font-semibold text-hca-ink/55">Next sessions</h3>
      <div className="mt-3 space-y-4">
        {[...groups.entries()].map(([day, rows]) => (
          <div key={day}>
            <p className="font-semibold text-hca-ink">{day}</p>
            <ul className="mt-1 space-y-1">
              {rows.map((row) => (
                <li
                  key={row.id}
                  className="flex flex-wrap items-baseline gap-x-2 text-sm text-hca-ink/70"
                >
                  <span className="tabular-nums text-hca-ink">{row.time}</span>
                  {row.href ? (
                    <Link
                      href={row.href}
                      className="text-hca-blue hover:text-hca-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hca-blue"
                    >
                      {row.label}
                    </Link>
                  ) : (
                    <span>{row.label}</span>
                  )}
                  {row.meta && <span>{row.meta}</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-4">
        <Link
          href="/schedule"
          className="text-sm font-semibold text-hca-blue hover:text-hca-red focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-hca-blue"
        >
          Full timetable
        </Link>
      </p>
    </div>
  );
}
