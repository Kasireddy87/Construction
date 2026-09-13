import * as Icons from "lucide-react";
import { Building2 } from "lucide-react";

import type { Amenity } from "@/types/project";

export function AmenitiesGrid({ amenities }: { amenities: Amenity[] }) {
  if (amenities.length === 0) return null;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {amenities.map((amenity) => {
        const Icon =
          (Icons[amenity.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>) ?? Building2;
        return (
          <div
            key={amenity.name}
            className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center"
          >
            <span className="flex size-11 items-center justify-center rounded-full bg-accent/15 text-accent-foreground">
              <Icon className="size-5" />
            </span>
            <p className="text-sm font-medium">{amenity.name}</p>
          </div>
        );
      })}
    </div>
  );
}
