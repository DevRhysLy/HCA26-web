import {
  Timetable,
  TimetableLocation,
  TimetableClassCard,
} from "@/components/timetable/Timetable";

const locations: TimetableLocation[] = [
  { id: "croydon", badge: "MAIN DOJANG", name: "Croydon HQ" },
  { id: "ermington", badge: "PART TIME DOJANG", name: "Ermington" },
  { id: "belrose", badge: "PART TIME DOJANG", name: "Belrose" },
];

const timeSlots = ["04:00 PM", "05:00 PM", "07:00 PM", "08:30 PM"];

const entries: TimetableClassCard[] = [
  {
    id: "c1",
    locationId: "croydon",
    day: "Monday",
    timeSlot: "04:00 PM",
    tag: "KIDS (Beg)",
    title: "Beginner Children",
    variant: "kids",
  },
  {
    id: "c2",
    locationId: "croydon",
    day: "Monday",
    timeSlot: "05:00 PM",
    tag: "KIDS (Adv)",
    title: "Advanced Children",
    variant: "kids",
  },
  {
    id: "c3",
    locationId: "croydon",
    day: "Monday",
    timeSlot: "06:00 PM",
    tag: "YOUTH",
    title: "Youth Class",
    variant: "youth",
  },
  {
    id: "c4",
    locationId: "croydon",
    day: "Monday",
    timeSlot: "07:00 PM",
    tag: "ADULTS",
    title: "Adult Class",
    variant: "adults",
  },

  {
    id: "c5",
    locationId: "croydon",
    day: "Tuesday",
    timeSlot: "04:00 PM",
    tag: "LITTLE TIGERS",
    title: "Little Tigers",
    variant: "kids",
  },
  {
    id: "c6",
    locationId: "croydon",
    day: "Tuesday",
    timeSlot: "05:00 PM",
    tag: "KIDS",
    title: "All Children",
    variant: "kids",
  },
  {
    id: "c7",
    locationId: "croydon",
    day: "Tuesday",
    timeSlot: "06:00 PM",
    tag: "YOUTH",
    title: "Youth Class",
    variant: "youth",
  },
  {
    id: "c8",
    locationId: "croydon",
    day: "Tuesday",
    timeSlot: "07:00 PM",
    tag: "ADULTS",
    title: "Adult Class",
    variant: "adults",
  },

  {
    id: "c9",
    locationId: "croydon",
    day: "Wednesday",
    timeSlot: "04:00 PM",
    tag: "KIDS (Beg)",
    title: "Beginner Children",
    variant: "kids",
  },
  {
    id: "c10",
    locationId: "croydon",
    day: "Wednesday",
    timeSlot: "05:00 PM",
    tag: "KIDS (Adv)",
    title: "Advanced Children",
    variant: "kids",
  },
  {
    id: "c11",
    locationId: "croydon",
    day: "Wednesday",
    timeSlot: "06:00 PM",
    tag: "YOUTH",
    title: "Youth Class",
    variant: "youth",
  },
  {
    id: "c12",
    locationId: "croydon",
    day: "Wednesday",
    timeSlot: "07:00 PM",
    tag: "ADULTS",
    title: "Adult Class",
    variant: "adults",
  },

  {
    id: "c13",
    locationId: "croydon",
    day: "Thursday",
    timeSlot: "04:00 PM",
    tag: "LITTLE TIGERS",
    title: "Little Tigers",
    variant: "kids",
  },
  {
    id: "c14",
    locationId: "croydon",
    day: "Thursday",
    timeSlot: "05:00 PM",
    tag: "KIDS",
    title: "All Children",
    variant: "kids",
  },
  {
    id: "c15",
    locationId: "croydon",
    day: "Thursday",
    timeSlot: "06:00 PM",
    tag: "YOUTH",
    title: "Youth Class",
    variant: "youth",
  },
  {
    id: "c16",
    locationId: "croydon",
    day: "Thursday",
    timeSlot: "07:00 PM",
    tag: "ADULTS",
    title: "Adult Class",
    variant: "adults",
  },

  {
    id: "c17",
    locationId: "croydon",
    day: "Friday",
    timeSlot: "05:00 PM",
    tag: "TEAM",
    title: "HCA Eagles",
    variant: "advanced",
  },

  {
    id: "c18",
    locationId: "croydon",
    day: "Saturday",
    timeSlot: "04:00 PM",
    tag: "CHILDREN",
    title: "All Childrens (9:00 AM)",
    variant: "youth",
  },
  {
    id: "c19",
    locationId: "croydon",
    day: "Saturday",
    timeSlot: "05:00 PM",
    tag: "YOUTH & ADULTS",
    title: "Mixed Class (10:00 AM)",
    variant: "adults",
  },

  // ERMINGTON
  {
    id: "e1",
    locationId: "ermington",
    day: "Tuesday",
    timeSlot: "05:00 PM",
    tag: "KIDS (Beg)",
    title: "Children 1",
    variant: "kids",
  },
  {
    id: "e2",
    locationId: "ermington",
    day: "Tuesday",
    timeSlot: "05:50 PM",
    tag: "KIDS (Adv)",
    title: "Children 2",
    variant: "kids",
  },
  {
    id: "e3",
    locationId: "ermington",
    day: "Tuesday",
    timeSlot: "07:00 PM",
    tag: "YOUTH & ADULTS",
    title: "Mixed Class",
    variant: "adults",
  },

  {
    id: "e4",
    locationId: "ermington",
    day: "Thursday",
    timeSlot: "05:00 PM",
    tag: "KIDS (Beg)",
    title: "Children 1",
    variant: "kids",
  },
  {
    id: "e5",
    locationId: "ermington",
    day: "Thursday",
    timeSlot: "05:50 PM",
    tag: "KIDS (Adv)",
    title: "Children 2",
    variant: "kids",
  },
  {
    id: "e6",
    locationId: "ermington",
    day: "Thursday",
    timeSlot: "07:00 PM",
    tag: "YOUTH & ADULTS",
    title: "Mixed Class",
    variant: "adults",
  },

  // BELROSE
  {
    id: "b1",
    locationId: "belrose",
    day: "Monday",
    timeSlot: "05:30 PM",
    tag: "KIDS",
    title: "Children Class",
    variant: "kids",
  },
  {
    id: "b2",
    locationId: "belrose",
    day: "Monday",
    timeSlot: "06:45 PM",
    tag: "YOUTH & ADULTS",
    title: "Mixed Class",
    variant: "adults",
  },

  {
    id: "b3",
    locationId: "belrose",
    day: "Wednesday",
    timeSlot: "05:30 PM",
    tag: "KIDS",
    title: "Children Class",
    variant: "kids",
  },
  {
    id: "b4",
    locationId: "belrose",
    day: "Wednesday",
    timeSlot: "06:45 PM",
    tag: "YOUTH & ADULTS",
    title: "Mixed Class",
    variant: "adults",
  },
];

export default function Schedule() {
  return (
    <div>
      <Timetable
        title="WEEKLY CLASS TIMETABLE"
        subtitle="Select a location to view its specific training hours and program availability."
        locations={locations}
        timeSlots={timeSlots}
        entries={entries}
        // fallback slots (used if a location is missing from timeSlotsByLocation)
        // per-location slot rows
        timeSlotsByLocation={{
          croydon: ["04:00 PM", "05:00 PM", "06:00 PM", "07:00 PM"],
          ermington: ["05:00 PM", "05:50 PM", "07:00 PM"],
          belrose: ["05:30 PM", "06:45 PM"],
        }}
        containerClassName="max-w-7xl"
      />
      <section className="mt-10">
        <div className="rounded-3xl border border-[#003478]/10 bg-white p-6 md:p-8 shadow-sm">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#003478]/10">
              <span className="h-3 w-3 rounded-full bg-[#C60C30]" />
            </div>

            <h3 className="text-xl font-bold text-[#111111]">Schedule Notes</h3>
          </div>

          {/* Korean flag accent */}
          <div className="mb-5 flex h-1 w-28 overflow-hidden rounded-full">
            <div className="w-1/2 bg-[#C60C30]" />
            <div className="w-1/2 bg-[#003478]" />
          </div>

          {/* Notes */}
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
