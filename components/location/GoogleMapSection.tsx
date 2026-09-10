import { ButtonLink } from "@/components/ui/Button";

interface GoogleMapSectionProps {
  locationName: string;
  address?: string;
  googleMapsEmbedUrl?: string;
}

export default function GoogleMapSection({
  locationName,
  address,
  googleMapsEmbedUrl,
}: GoogleMapSectionProps) {
  if (!googleMapsEmbedUrl) return null;

  return (
    <section>
      {address && (
        <p className="leading-relaxed text-hca-ink/60">{address}</p>
      )}

      <div className="mt-4 overflow-hidden rounded-[20px] border border-hca-border">
        <iframe
          src={googleMapsEmbedUrl}
          title={`${locationName} location map`}
          width="100%"
          height="420"
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="block w-full"
        />
      </div>

      {address && (
        <div className="mt-6">
          <ButtonLink
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              address,
            )}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Directions
          </ButtonLink>
        </div>
      )}
    </section>
  );
}
