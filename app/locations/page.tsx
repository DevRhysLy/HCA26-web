import { getLocations } from "@/lib/contentful";
import CardGridPage from "@/components/content/CardGridPage";
import type { Metadata } from "next";
import { mapToImageCardItem } from "@/lib/contentfulMappers";

export const metadata: Metadata = {
  title: "Locations",
  description: "Find your closest Hapkido College of Australia dojang.",
  openGraph: {
    title: "Locations",
    description: "Find your closest Hapkido College of Australia dojang.",
  },
};

export default async function Locations() {
  const locationsData = await getLocations();
  const items = locationsData.items.map((location: any) =>
    mapToImageCardItem(location, locationsData, {
      basePath: "/locations",
      badge: "Training Dojang",
      ctaLabel: "View Location",
      fallbackImage: "location",
    }),
  );

  return (
    <CardGridPage
      title="Studio Locations"
      description="Choose the dojang closest to you."
      items={items}
    />
  );
}
