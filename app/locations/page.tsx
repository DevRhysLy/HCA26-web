import { getLocations } from "@/lib/contentful";
import CardGridPage from "@/components/content/CardGridPage";
import type { Metadata } from "next";
import { sortByOrder, mapToCardItem } from "@/lib/contentfulMappers";

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
  const items = sortByOrder(locations).map((location: any) =>
    mapToCardItem(location, {
      basePath: "/locations",
      badge: "Training Dojang",
      ctaLabel: "View Location",
    }),
  );

  return (
    <CardGridPage
      title="Studio Locations"
      description="Discover our training locations across Australia and find the dojang that best suits your journey."
      items={items}
    />
  );
}
