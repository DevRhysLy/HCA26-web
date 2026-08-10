import ContactForm from "@/components/contact/ContactForm";
import ContactInfoCards from "@/components/contact/ContactInfoCards";
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
  description:
    "Traditional Hapkido martial arts training focused on personal development and self-defence for children, youth, and adults — not sport competition.",
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
          title="Enrol in Your Free Trial"
          description="Send us your details and our team will contact you about trial class availability, the right curriculum for your age group, and the best location for your family — no experience needed, no obligation."
          className="text-center mb-12"
        />

        <ContactInfoCards
          className="mb-10"
          thirdCard={{
            eyebrow: "Find a Dojang",
            title: "View Locations",
            description: "Find the studio location that best suits your family.",
            href: "/locations",
          }}
        />

        <ContactForm />
      </section>
    </main>
  );
}