import { Timetable } from "@/components/timetable/Timetable";
import { getScheduleEntries } from "@/lib/contentful";
import { buildTimetableData } from "@/lib/contentfulMappers";

export default async function Schedule() {
  let locations: Awaited<ReturnType<typeof buildTimetableData>>["locations"] =
    [];
  let entries: Awaited<ReturnType<typeof buildTimetableData>>["entries"] = [];
  let timeSlots: Awaited<ReturnType<typeof buildTimetableData>>["timeSlots"] =
    [];
  let timeSlotsByLocation: Awaited<
    ReturnType<typeof buildTimetableData>
  >["timeSlotsByLocation"] = {};
  let loadError = false;

  try {
    const data = await getScheduleEntries();
    const built = buildTimetableData(data);
    locations = built.locations;
    entries = built.entries;
    timeSlots = built.timeSlots;
    timeSlotsByLocation = built.timeSlotsByLocation;
  } catch (error) {
    console.error("Failed to load schedule from Contentful:", error);
    loadError = true;
  }

  if (loadError || entries.length === 0) {
    return (
      <div>
        <section className="mx-auto max-w-7xl px-4 sm:px-6 py-16 md:py-24">
          <div className="rounded-3xl border border-black/10 bg-white p-8 md:p-10 text-center shadow-sm">
            <h1 className="text-3xl font-extrabold tracking-tight text-[#111111]">
              Weekly Class Timetable
            </h1>
            <p className="mt-4 text-black/60 leading-relaxed">
              {loadError
                ? "We could not load the timetable right now. Please try again shortly or contact us for class times."
                : "The timetable is being updated in Contentful. Please check back soon or contact us for class availability."}
            </p>
            <a
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-2xl bg-[#003478] px-8 py-4 text-white font-semibold shadow-lg shadow-[#003478]/20 transition-all duration-200 hover:bg-[#002B63]"
            >
              Contact Us
            </a>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <Timetable
        title="WEEKLY CLASS TIMETABLE"
        subtitle="Select a location to view its specific training hours and curriculum availability."
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
