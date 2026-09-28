import { Building2, Car, GraduationCap, HeartPulse, Landmark, MapPin, ShoppingBag } from "lucide-react";

import type { ConnectivityItem, Geo } from "@/types/project";

const categoryIcons: Record<ConnectivityItem["category"], React.ComponentType<{ className?: string }>> = {
  transit: Car,
  education: GraduationCap,
  healthcare: HeartPulse,
  retail: ShoppingBag,
  business: Building2,
  other: Landmark,
};

export function LocationMap({
  geo,
  address,
  connectivity,
}: {
  geo: Geo;
  address: string;
  connectivity: ConnectivityItem[];
}) {
  const mapSrc = `https://www.google.com/maps?q=${geo.lat},${geo.lng}&z=15&output=embed`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${geo.lat},${geo.lng}`;

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <div className={connectivity.length > 0 ? "lg:col-span-3" : "lg:col-span-5"}>
        <div className="aspect-[4/3] overflow-hidden rounded-xl border border-border sm:aspect-video">
          <iframe src={mapSrc} title="Project location map" className="size-full" loading="lazy" />
        </div>
        <div className="mt-3 flex items-start justify-between gap-3">
          <p className="flex items-start gap-1.5 text-sm text-muted-foreground">
            <MapPin className="mt-0.5 size-4 shrink-0" />
            {address}
          </p>
          <a
            href={directionsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 text-sm font-medium text-accent-foreground underline underline-offset-4"
          >
            Get Directions
          </a>
        </div>
      </div>

      {connectivity.length > 0 && (
        <div className="lg:col-span-2">
          <h3 className="font-heading text-lg font-semibold">Connectivity</h3>
          <ul className="mt-4 space-y-3">
            {connectivity.map((item) => {
              const Icon = categoryIcons[item.category];
              return (
                <li key={item.label} className="flex items-center justify-between gap-3 border-b border-border pb-3 text-sm">
                  <span className="flex items-center gap-2.5">
                    <Icon className="size-4 shrink-0 text-accent-foreground" />
                    {item.label}
                  </span>
                  <span className="shrink-0 font-medium text-muted-foreground">
                    {item.distanceKm ? `${item.distanceKm} km` : item.timeMin ? `${item.timeMin} min` : ""}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
