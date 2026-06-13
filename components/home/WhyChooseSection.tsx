import SectionHeader from "@/components/ui/SectionHeader";

const reasons = [
  {
    title: "Confidence",
    description:
      "Helping children build self-belief through structured training, achievable goals, and positive reinforcement.",
  },
  {
    title: "Discipline & Respect",
    description:
      "Students learn focus, manners, responsibility, and respect for instructors, parents, and peers.",
  },
  {
    title: "Real Self-Defence",
    description:
      "Practical Hapkido skills taught safely, with an emphasis on control, awareness, and confidence.",
  },
  {
    title: "Family Community",
    description:
      "A welcoming environment where children, parents, and instructors grow together as part of the HCA family.",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          eyebrow="Why Parents Choose HCA"
          title="More Than Martial Arts"
          description="Hapkido College of Australia helps children develop confidence, discipline, respect, and practical skills in a safe and supportive traditional martial arts environment."
        />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="group relative overflow-hidden rounded-3xl border border-black/10 bg-[#F8FAFC] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#003478]/30 hover:bg-white hover:shadow-[0_18px_45px_rgba(0,52,120,0.10)]"
            >
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#C60C30] to-[#003478]" />

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white border border-black/10 shadow-sm">
                <span className="text-xl font-extrabold text-[#003478]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h3 className="text-xl font-bold text-[#111111] group-hover:text-[#003478] transition-colors">
                {reason.title}
              </h3>

              <p className="mt-4 text-sm leading-relaxed text-black/60">
                {reason.description}
              </p>

              <div className="absolute bottom-0 left-0 h-16 w-16 rounded-tr-full bg-[#C60C30]/5" />
              <div className="absolute top-0 right-0 h-16 w-16 rounded-bl-full bg-[#003478]/5" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
