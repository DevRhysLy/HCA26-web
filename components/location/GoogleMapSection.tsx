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
    <section className="mt-12">
      <div className="rounded-3xl border border-black/10 bg-white p-6 md:p-8 shadow-sm">
        <div className="mb-6">
          <p className="text-xs font-bold tracking-[0.35em] uppercase text-[#C60C30] mb-3">
            Find Us
          </p>

          <h2 className="text-3xl font-extrabold text-[#111111]">
            Visit {locationName}
          </h2>

          {address && (
            <p className="mt-3 text-black/60 leading-relaxed">
              {address}
            </p>
          )}

          <div className="mt-5 flex h-1 w-32 overflow-hidden rounded-full">
            <div className="w-1/2 bg-[#C60C30]" />
            <div className="w-1/2 bg-[#003478]" />
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-black/10">
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
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-2xl bg-[#003478] px-6 py-3 text-white font-semibold shadow-lg shadow-[#003478]/20 transition-all duration-200 hover:bg-[#002B63] hover:-translate-y-0.5"
            >
              Get Directions
            </a>
          </div>
        )}
      </div>
    </section>
  );
}