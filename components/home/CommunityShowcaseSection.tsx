import Image from "next/image";
import SectionHeader from "@/components/ui/SectionHeader";

export default function CommunityShowcaseSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeader
          eyebrow="Our Community"
          title="A Family You'll Feel Part Of"
          description="From first grading to black belt, HCA students of every age train side by side. Traditional Hapkido, taught with patience and respect — this is what our dojang looks like."
          align="left"
        />

        <div className="grid gap-6 md:grid-cols-5">
          <div className="relative md:col-span-3 overflow-hidden rounded-3xl border border-black/10 shadow-sm">
            <div className="relative aspect-[4/3] md:aspect-[16/11]">
              <Image
                src="/images/demo-happy.jpg"
                alt="HCA instructor and students celebrating together after training"
                fill
                sizes="(max-width: 768px) 100vw, 60vw"
                className="object-cover object-top"
              />
            </div>
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#C60C30] to-[#003478]" />
          </div>

          <div className="relative md:col-span-2 overflow-hidden rounded-3xl border border-black/10 shadow-sm">
            <div className="relative aspect-[4/3] md:aspect-[3/4] h-full">
              <Image
                src="/images/falcon-group.JPG"
                alt="HCA students practicing a traditional Hapkido technique together"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#003478] to-[#C60C30]" />
          </div>
        </div>
      </div>
    </section>
  );
}
