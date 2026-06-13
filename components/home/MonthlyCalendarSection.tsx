import dynamic from "next/dynamic";
import SectionHeader from "@/components/ui/SectionHeader";
import { buildItemsByDate, type CalendarItem } from "@/lib/calendarUtils";
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
        <SectionHeader
          eyebrow="Member Calendar"
          title="Monthly Training Calendar"
          description="View weekly themes, gradings, demonstrations, events, and important HCA community updates."
        />

        <MonthlyCalendarClient items={items} itemsByDate={itemsByDate} />
      </div>
    </section>
  );
}
