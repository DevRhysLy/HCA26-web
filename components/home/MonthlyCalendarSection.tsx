import dynamic from "next/dynamic";
import SectionHeader from "@/components/ui/SectionHeader";
import { ButtonLink } from "@/components/ui/Button";
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
  headingAs?: "h1" | "h2";
  pageHref?: string;
}

export default function MonthlyCalendarSection({
  themes,
  events,
  headingAs = "h2",
  pageHref,
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
    <section className="hca-section bg-hca-cream">
      <div className="hca-container">
        <SectionHeader
          as={headingAs}
          eyebrow="Member Calendar"
          title="Monthly Training Calendar"
          description="View weekly themes, gradings, demonstrations, events, and important HCA community updates."
        />

        {pageHref ? (
          <div className="mb-8 flex justify-center">
            <ButtonLink href={pageHref} variant="secondary">
              Open calendar page
            </ButtonLink>
          </div>
        ) : null}

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
