"use client";

import { useMemo, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbox } from "@/components/project/lightbox";
import { formatDate } from "@/lib/format";
import type { GalleryCategory, GalleryImage } from "@/types/project";

const categoryLabels: Record<GalleryCategory, string> = {
  elevation: "Outside",
  amenity: "Amenities",
  interior: "Inside",
  "construction-progress": "Construction Progress",
};

export function Gallery({
  images,
  walkthroughVideoUrl,
  tourEmbedUrl,
}: {
  images: GalleryImage[];
  walkthroughVideoUrl?: string;
  tourEmbedUrl?: string;
}) {
  const [filter, setFilter] = useState<GalleryCategory | "all">("all");

  const categories = useMemo(
    () => Array.from(new Set(images.map((i) => i.category))) as GalleryCategory[],
    [images],
  );

  const filtered = filter === "all" ? images : images.filter((i) => i.category === filter);

  return (
    <div className="space-y-6">
      {(walkthroughVideoUrl || tourEmbedUrl) && (
        <div className="grid gap-4 sm:grid-cols-2">
          {walkthroughVideoUrl && (
            <div className="aspect-video overflow-hidden rounded-xl border border-border">
              <iframe
                src={walkthroughVideoUrl}
                title="Project walkthrough video"
                className="size-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
          {tourEmbedUrl && (
            <div className="aspect-video overflow-hidden rounded-xl border border-border">
              <iframe src={tourEmbedUrl} title="360° / 3D tour" className="size-full" allowFullScreen />
            </div>
          )}
        </div>
      )}

      <Tabs value={filter} onValueChange={(v) => setFilter(v as GalleryCategory | "all")}>
        <TabsList className="flex-wrap">
          <TabsTrigger value="all">All</TabsTrigger>
          {categories.map((c) => (
            <TabsTrigger key={c} value={c}>
              {categoryLabels[c]}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={filter} className="mt-6">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {filtered.map((image, i) => (
              <div key={i} className="space-y-1.5">
                <Lightbox src={image.url} alt={image.caption ?? categoryLabels[image.category]} />
                {image.caption && (
                  <p className="text-xs text-muted-foreground">
                    {image.caption}
                    {image.date ? ` · ${formatDate(image.date)}` : ""}
                  </p>
                )}
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
