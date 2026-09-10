import Footer from "@/components/layout/Footer";
import "./globals.css";
import Header from "@/components/layout/Header";
import { navItems, headerCta } from "@/config/navigation";
import type { Metadata } from "next";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import { Figtree, Source_Sans_3 } from "next/font/google";

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
  display: "swap",
});

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hapkido College of Australia",
    template: "%s | Hapkido College of Australia",
  },

  description:
    "Traditional Hapkido training for children, youth, and adults across Australia. Build confidence, discipline, fitness, and self-defence skills in a supportive family environment.",

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

  other: {
    "theme-color": "#F7F4EE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sourceSans.variable} ${figtree.variable}`}>
      <body className="bg-hca-cream font-sans text-hca-ink">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>

        <Header
          logoText="Hapkido College of Australia"
          navItems={navItems}
          cta={headerCta}
        />

        <main id="main-content" className="pb-24 lg:pb-0">
          {children}
        </main>

        <Footer />

        <StickyMobileCTA />
      </body>
    </html>
  );
}
