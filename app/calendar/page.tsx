import MonthlyCalendarSection from "@/components/home/MonthlyCalendarSection";
import { getCalendarEvents, getWeeklyThemes } from "@/lib/contentful";
import { mapCalendarEvents, mapWeeklyThemes } from "@/lib/contentfulMappers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member Calendar",
  description:
    "View weekly themes, gradings, demonstrations, events, and important HCA community updates.",
  openGraph: {
    title: "Member Calendar",
    description:
      "View weekly themes, gradings, demonstrations, events, and important HCA community updates.",
  },
};

export const revalidate = 60;

export default async function CalendarPage() {
  const [calendarData, themesData] = await Promise.all([
    getCalendarEvents(),
    getWeeklyThemes(),
  ]);

  return (
    <MonthlyCalendarSection
      headingAs="h1"
      themes={mapWeeklyThemes(themesData)}
      events={mapCalendarEvents(calendarData)}
    />
  );
}
