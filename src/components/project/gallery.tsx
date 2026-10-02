"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = useMemo(
    () => Array.from(new Set(images.map((i) => i.category))) as GalleryCategory[],
    [images],
  );

  const filtered = filter === "all" ? images : images.filter((i) => i.category === filter);
  const current = lightboxIndex !== null ? filtered[lightboxIndex] : null;

  function showNext() {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % filtered.length));
  }
  function showPrev() {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + filtered.length) % filtered.length));
  }

  useEffect(() => {
    if (lightboxIndex === null) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightboxIndex, filtered.length]);

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
                <button
                  type="button"
                  onClick={() => setLightboxIndex(i)}
                  className="group relative block aspect-[4/3] w-full overflow-hidden rounded-xl border border-border"
                >
                  <Image
                    src={image.url}
                    alt={image.caption ?? categoryLabels[image.category]}
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover"
                  />
                  <span className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100">
                    <ZoomIn className="size-4" />
                  </span>
                </button>
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

      <Dialog open={lightboxIndex !== null} onOpenChange={(v) => !v && setLightboxIndex(null)}>
        <DialogContent className="flex max-h-[95vh] w-fit max-w-[95vw] items-center justify-center border-none bg-transparent p-0 shadow-none [&>button]:z-20 [&>button]:text-white">
          <DialogTitle className="sr-only">{current?.caption ?? "Gallery image"}</DialogTitle>
          {current && (
            <>
              {filtered.length > 1 && (
                <button
                  type="button"
                  onClick={showPrev}
                  aria-label="Previous image"
                  className="fixed left-2 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70 sm:left-4"
                >
                  <ChevronLeft className="size-6" />
                </button>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element -- natural aspect ratio needed; next/image `fill` would force a fixed box */}
              <img
                src={current.url}
                alt={current.caption ?? categoryLabels[current.category]}
                className="max-h-[95vh] max-w-[95vw] rounded-lg object-contain"
              />
              {filtered.length > 1 && (
                <button
                  type="button"
                  onClick={showNext}
                  aria-label="Next image"
                  className="fixed right-2 top-1/2 z-20 flex size-10 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70 sm:right-4"
                >
                  <ChevronRight className="size-6" />
                </button>
              )}
              {current.caption && (
                <p className="fixed bottom-4 left-1/2 z-20 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
                  {current.caption}
                </p>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
