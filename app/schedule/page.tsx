import { Timetable } from "@/components/timetable/Timetable";
import { getScheduleEntries } from "@/lib/contentful";
import { buildTimetableData } from "@/lib/contentfulMappers";
import {
  scheduleEntries,
  scheduleLocations,
  scheduleTimeSlots,
  scheduleTimeSlotsByLocation,
} from "@/data/scheduleData";

async function getTimetableData() {
  try {
    const data = await getScheduleEntries();
    const built = buildTimetableData(data);

    if (built.entries.length > 0) return built;
  } catch (error) {
    console.error("Failed to load schedule from Contentful:", error);
  }

  return {
    locations: scheduleLocations,
    entries: scheduleEntries,
    timeSlots: scheduleTimeSlots,
    timeSlotsByLocation: scheduleTimeSlotsByLocation,
  };
}

export default async function Schedule() {
  const { locations, entries, timeSlots, timeSlotsByLocation } =
    await getTimetableData();

  return (
    <div>
      <Timetable
        title="WEEKLY CLASS TIMETABLE"
        subtitle="Select a location to view its specific training hours and program availability."
        locations={locations}
        timeSlots={timeSlots}
        entries={entries}
        timeSlotsByLocation={timeSlotsByLocation}
        containerClassName="max-w-7xl"
      />
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pb-12 md:pb-16">
        <div className="rounded-3xl border border-[#003478]/10 bg-white p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#003478]/10">
              <span className="h-3 w-3 rounded-full bg-[#C60C30]" />
            </div>

            <h3 className="text-xl font-bold text-[#111111]">Schedule Notes</h3>
          </div>

          <div className="mb-5 flex h-1 w-28 overflow-hidden rounded-full">
            <div className="w-1/2 bg-[#C60C30]" />
            <div className="w-1/2 bg-[#003478]" />
          </div>

          <div className="space-y-4 text-black/70 leading-relaxed">
            <p>
              Every second Saturday, our Youth and Adult Class begins at{" "}
              <span className="font-semibold text-[#003478]">9:00 AM</span> due
              to grading sessions.
            </p>

            <p>
              Any timetable or scheduling changes will be communicated directly
              to our members.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
