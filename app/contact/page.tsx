import Link from "next/link";
import ContactForm from "@/components/contact/ContactForm";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book a Free Trial",
  description:
    "Contact Hapkido College of Australia to book a free trial class and learn more about our martial arts programs for children, youth, and adults.",
  openGraph: {
    title: "Book a Free Trial",
    description:
      "Contact Hapkido College of Australia to book a free trial class and learn more about our martial arts programs.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  name: "Hapkido College of Australia",
  telephone: "+61-2-9747-0822",
  email: "train@hapkidocollege.com.au",
  url: "https://www.hapkidocollege.com.au/contact",
};

export default function ContactPage() {
  return (
    <main className="bg-[#F8FAFC] min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <section className="max-w-6xl mx-auto px-6 py-16 md:py-24">
        <SectionHeader
          as="h1"
          eyebrow="Book a Free Trial"
          title="Start Your Hapkido Journey"
          description="Send us your details and our team will contact you about trial class availability, suitable programs, and the best location for your family."
          className="text-center mb-12"
        />

        <div className="grid gap-4 md:grid-cols-3 mb-10">
          <a
            href="tel:+61297470822"
            className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#003478]/25"
          >
            <p className="text-sm font-bold uppercase tracking-wide text-[#C60C30]">
              Call Us
            </p>
            <p className="mt-2 text-xl font-extrabold text-[#111111]">
              (02) 9747 0822
            </p>
            <p className="mt-2 text-sm text-black/55">
              Speak with our team about trial class availability.
            </p>
          </a>

          <a
            href="mailto:train@hapkidocollege.com.au"
            className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#003478]/25"
          >
            <p className="text-sm font-bold uppercase tracking-wide text-[#C60C30]">
              Email Us
            </p>
            <p className="mt-2 text-xl font-extrabold text-[#111111]">
              train@hapkidocollege.com.au
            </p>
            <p className="mt-2 text-sm text-black/55">
              Send us any questions about classes, locations, or enrolments.
            </p>
          </a>

          <Link
            href="/locations"
            className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#003478]/25"
          >
            <p className="text-sm font-bold uppercase tracking-wide text-[#C60C30]">
              Find a Dojang
            </p>
            <p className="mt-2 text-xl font-extrabold text-[#111111]">
              View Locations
            </p>
            <p className="mt-2 text-sm text-black/55">
              Find the studio location that best suits your family.
            </p>
          </Link>
        </div>

        <ContactForm />
      </section>
    </main>
  );
}