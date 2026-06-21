import { Timetable } from "@/components/timetable/Timetable";
import {
  scheduleEntries,
  scheduleLocations,
  scheduleTimeSlots,
  scheduleTimeSlotsByLocation,
} from "@/data/scheduleData";

export default function Schedule() {
  return (
    <div>
      <Timetable
        title="WEEKLY CLASS TIMETABLE"
        subtitle="Select a location to view its specific training hours and program availability."
        locations={scheduleLocations}
        timeSlots={scheduleTimeSlots}
        entries={scheduleEntries}
        timeSlotsByLocation={scheduleTimeSlotsByLocation}
        containerClassName="max-w-7xl"
      />
      <section className="mt-10">
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
