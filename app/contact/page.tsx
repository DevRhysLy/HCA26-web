import ContactForm from "@/components/contact/ContactForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with us here at Hapkido College of Australia.",
};

export default function ContactPage() {
  return (
    <main className="bg-[#F8FAFC] min-h-screen">
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <p className="text-xs font-bold tracking-[0.35em] uppercase text-[#C60C30] mb-3">
            Book a Free Trial
          </p>

          <h1 className="text-4xl md:text-5xl font-extrabold text-[#111111]">
            Start Your Hapkido Journey
          </h1>

          <p className="mt-4 text-black/60 max-w-2xl mx-auto">
            Send us your details and our team will contact you about trial class availability.
          </p>

          <div className="mt-6 mx-auto flex h-1 w-40 overflow-hidden rounded-full">
            <div className="w-1/2 bg-[#C60C30]" />
            <div className="w-1/2 bg-[#003478]" />
          </div>
        </div>

        <ContactForm />
      </section>
    </main>
  );
}