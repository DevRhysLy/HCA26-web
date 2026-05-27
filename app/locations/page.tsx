import { getStudioLocations } from "@/lib/contentful";
import CardGridPage from "@/components/content/CardGridPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Find your closest Hapkido College of Australia dojang.",
};

export default async function Locations() {
  const studioLocations = await getStudioLocations();

  const items = studioLocations.map((location: any) => ({
    id: location.sys.id,
    title: location.fields.location,
    description: location.fields.description,
    href: `/locations/${location.fields.slug}`,
    badge: "Training Dojang",
    ctaLabel: "View Location",
  }));

  return (
    <CardGridPage
      title="Studio Locations"
      description="Discover our training locations across Australia and find the dojang that best suits your journey."
      items={items}
    />
  );
}
