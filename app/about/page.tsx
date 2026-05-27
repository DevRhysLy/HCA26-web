import { getAbout } from "@/lib/contentful";
import CardGridPage from "@/components/content/CardGridPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Hapkido College of Australia and Hapkido in general",
};

export default async function About() {
  const aboutpage = await getAbout();

  const items = aboutpage.map((about: any) => ({
    id: about.sys.id,
    title: about.fields.title,
    description: about.fields.subtitle,
    href: `/about/${about.fields.slug}`,
    badge: about.fields.age,
    ctaLabel: "Learn More",
  }));

  return (
    <>
      <CardGridPage
        title="About Us"
        description="Learn more about what Hapkido is and what it can do for you."
        items={items}
      />
    </>
  );
}
