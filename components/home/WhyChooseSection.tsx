import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";

const featured = [
  {
    title: "Confidence",
    description:
      "Children build self-belief through structured training, achievable goals, and positive reinforcement.",
    image: {
      src: "/images/demo-happy.jpg",
      alt: "A young student smiling in class",
    },
    reverse: false,
  },
  {
    title: "Discipline and respect",
    description:
      "Students learn focus, manners, responsibility, and respect for instructors, parents, and peers.",
    image: {
      src: "/images/falcon-group.JPG",
      alt: "Students training together in the dojang",
    },
    reverse: true,
  },
];

const supporting = [
  {
    title: "Real self-defence",
    description:
      "Practical Hapkido skills taught safely, with an emphasis on control, awareness, and confidence.",
  },
  {
    title: "Family community",
    description:
      "A welcoming environment where children, parents, and instructors grow together as part of the HCA family.",
  },
];

export default function WhyChooseSection() {
  return (
    <section className="hca-section bg-hca-surface">
      <div className="hca-container">
        <SectionHeader
          eyebrow="Why Parents Choose HCA"
          title="More than martial arts"
          description="Hapkido College of Australia helps children develop confidence, discipline, respect, and practical skills in a safe traditional martial arts environment."
        />

        <div className="space-y-12 md:space-y-16">
          {featured.map((reason) => (
            <article
              key={reason.title}
              className={`grid items-center gap-8 md:grid-cols-2 md:gap-12 ${
                reason.reverse ? "md:[&>div:first-child]:order-2" : ""
              }`}
            >
              <div className="hca-photo-zoom relative aspect-[4/3] overflow-hidden rounded-[20px]">
                <Image
                  src={reason.image.src}
                  alt={reason.image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-serif text-3xl font-semibold text-hca-ink">
                  {reason.title}
                </h3>
                <p className="mt-4 text-lg leading-relaxed text-hca-ink/65">
                  {reason.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          {supporting.map((item) => (
            <div key={item.title}>
              <h3 className="font-serif text-2xl font-semibold text-hca-ink">
                {item.title}
              </h3>
              <p className="mt-3 leading-relaxed text-hca-ink/65">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
