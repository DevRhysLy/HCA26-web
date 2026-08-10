import { getLocations } from "@/lib/contentful";
import CardGridPage from "@/components/content/CardGridPage";
import type { Metadata } from "next";
import { mapToCardItem } from "@/lib/contentfulMappers";

export const metadata: Metadata = {
  title: "Locations",
  description: "Find your closest Hapkido College of Australia dojang.",
  openGraph: {
    title: "Locations",
    description: "Find your closest Hapkido College of Australia dojang.",
  },
};

export default async function Locations() {
  const locations = await getLocations();
  const items = locations.map((location: any) =>
    mapToCardItem(location, {
      basePath: "/locations",
      badge: "Training Dojang",
      ctaLabel: "View Location",
    }),
  );

  return (
    <CardGridPage
      title="Our Dojang Locations"
      description="Find the HCA dojang nearest you — every location teaches the same traditional curriculum, for every age, side by side."
      items={items}
    />
  );
}
