import dynamic from "next/dynamic";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  buildItemsByDate,
  buildMonthWeeks,
  getMonthStart,
  type CalendarItem,
  type WeeklyTheme,
} from "@/lib/calendarUtils";
import MonthlyCalendarSkeleton from "@/components/home/MonthlyCalendarSkeleton";

const MonthlyCalendarClient = dynamic(
  () => import("@/components/home/MonthlyCalendarClient"),
  { loading: () => <MonthlyCalendarSkeleton /> },
);

interface MonthlyCalendarSectionProps {
  themes: WeeklyTheme[];
  events: CalendarItem[];
}

export default function MonthlyCalendarSection({
  themes,
  events,
}: MonthlyCalendarSectionProps) {
  const eventsByDate = buildItemsByDate(events);
  const initialMonth = getMonthStart(new Date());
  const initialYear = initialMonth.getFullYear();
  const initialMonthIndex = initialMonth.getMonth();
  const initialWeeks = buildMonthWeeks(
    initialYear,
    initialMonthIndex,
    themes,
    eventsByDate,
  );

  return (
    <section className="bg-[#F8FAFC] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          eyebrow="Life at HCA"
          title="What's Happening This Month"
          description="Weekly themes, gradings, demonstrations, and community events — a look at the active, everyday life of our dojang community."
        />

        <MonthlyCalendarClient
          themes={themes}
          events={events}
          eventsByDate={eventsByDate}
          initialYear={initialYear}
          initialMonthIndex={initialMonthIndex}
          initialWeeks={initialWeeks}
        />
      </div>
    </section>
  );
}
