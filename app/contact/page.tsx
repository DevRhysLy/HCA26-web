import ContactForm from "@/components/contact/ContactForm";
import ContactInfoCards from "@/components/contact/ContactInfoCards";
import RevealOnView from "@/components/ui/RevealOnView";
import SectionHeader from "@/components/ui/SectionHeader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Free Trial",
  description:
    "Contact Hapkido College of Australia to book a free trial class and learn more about our martial arts programs for children, youth, and adults.",
  openGraph: {
    title: "Book Free Trial",
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
    <div className="min-h-screen bg-hca-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />

      <section className="hca-container hca-section">
        <SectionHeader
          as="h1"
          eyebrow="Book Free Trial"
          title="Book a free trial class"
          description="Send us your details and our team will contact you about trial class availability, suitable programs, and the best location for your family."
          className="mb-8 text-center"
        />

        <RevealOnView>
          <ContactInfoCards
            className="mb-8"
            thirdCard={{
              eyebrow: "Find a Dojang",
              title: "View Locations",
              description: "Find the studio location that best suits your family.",
              href: "/locations",
            }}
          />

          <ContactForm />
        </RevealOnView>
      </section>
    </div>
  );
}