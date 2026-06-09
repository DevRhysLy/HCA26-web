import dynamic from "next/dynamic";
import {
  buildItemsByDate,
  type CalendarItem,
} from "@/lib/calendarUtils";
import MonthlyCalendarSkeleton from "@/components/home/MonthlyCalendarSkeleton";

const MonthlyCalendarClient = dynamic(
  () => import("@/components/home/MonthlyCalendarClient"),
  { loading: () => <MonthlyCalendarSkeleton /> },
);

interface MonthlyCalendarSectionProps {
  items: CalendarItem[];
}

export default function MonthlyCalendarSection({
  items,
}: MonthlyCalendarSectionProps) {
  const itemsByDate = buildItemsByDate(items);

  return (
    <section className="bg-[#F8FAFC] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <p className="text-xs font-bold tracking-[0.35em] uppercase text-[#C60C30] mb-3">
            Member Calendar
          </p>

          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#111111]">
            Monthly Training Calendar
          </h2>

          <p className="mt-4 text-black/60 text-base md:text-lg leading-relaxed">
            View weekly themes, gradings, demonstrations, events, and important
            HCA community updates.
          </p>

          <div className="mt-6 mx-auto flex h-1 w-40 overflow-hidden rounded-full">
            <div className="w-1/2 bg-[#C60C30]" />
            <div className="w-1/2 bg-[#003478]" />
          </div>
        </div>

        <MonthlyCalendarClient items={items} itemsByDate={itemsByDate} />
      </div>
    </section>
  );
}
