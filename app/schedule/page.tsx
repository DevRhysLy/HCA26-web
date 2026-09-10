import { Timetable } from "@/components/timetable/Timetable";
import { ButtonLink } from "@/components/ui/Button";
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
        <section className="hca-container hca-section">
          <div className="rounded-2xl border border-hca-border bg-hca-surface p-8 text-center">
            <h1 className="font-serif text-3xl font-semibold tracking-tight text-hca-ink">
              Weekly Class Timetable
            </h1>
            <p className="mt-4 leading-relaxed text-hca-ink/60">
              {loadError
                ? "We could not load the timetable right now. Please try again shortly or contact us for class times."
                : "The timetable is being updated in Contentful. Please check back soon or contact us for class availability."}
            </p>
            <ButtonLink href="/contact" className="mt-8">
              Book Free Trial
            </ButtonLink>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <Timetable
        title="WEEKLY CLASS TIMETABLE"
        subtitle="Select a location to view its specific training hours and program availability."
        locations={locations}
        timeSlots={timeSlots}
        entries={entries}
        timeSlotsByLocation={timeSlotsByLocation}
      />
      <section className="hca-container pb-16 md:pb-24">
        <div className="rounded-2xl border border-hca-blue/10 bg-hca-surface p-6 md:p-8">
          <div className="mb-4 flex items-center gap-3">
            <h3 className="font-serif text-xl font-semibold text-hca-ink">
              Schedule Notes
            </h3>
          </div>

          <div className="korea-bar mb-4 w-28" aria-hidden="true">
            <span />
            <span />
          </div>

          <div className="space-y-4 leading-relaxed text-hca-ink/70">
            <p>
              Every second Saturday, our Youth and Adult Class begins at{" "}
              <span className="font-semibold text-hca-blue">9:00 AM</span> due
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
