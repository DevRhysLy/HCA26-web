import Footer from "@/components/layout/Footer";
import "./globals.css";
import Header from "@/components/layout/Header";
import { navItems, headerCta } from "@/config/navigation";
import type { Metadata } from "next";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";

export const metadata: Metadata = {
  title: {
    default: "Hapkido College of Australia",
    template: "%s | Hapkido College of Australia",
  },

  description:
    "Sydney's traditional Hapkido college — a structured curriculum for children, youth, and adults, built for personal development and real self-defence, not sport competition.",

  keywords: [
    "Hapkido",
    "Martial Arts",
    "Kids Martial Arts",
    "Self Defence",
    "Hapkido Australia",
    "Croydon Martial Arts",
    "Ermington Martial Arts",
  ],

  metadataBase: new URL("https://www.hapkidocollege.com.au"),

  openGraph: {
    title: "Hapkido College of Australia",
    description:
      "Traditional martial arts training for children, youth, and adults.",
    url: "https://www.hapkidocollege.com.au",
    siteName: "Hapkido College of Australia",
    locale: "en_AU",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Hapkido College of Australia",
    description:
      "Traditional martial arts training for children, youth, and adults.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F8FAFC]">
        <Header
          logoText="Hapkido College of Australia"
          navItems={navItems}
          cta={headerCta}
        />

        <main className="pb-24 lg:pb-0">{children}</main>

        <Footer />

        <StickyMobileCTA />
      </body>
    </html>
  );
}
