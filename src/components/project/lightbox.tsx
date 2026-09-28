"use client";

import Image from "next/image";
import { useState } from "react";
import { ZoomIn } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

/** Click any image to open a large, full-height zoomable view — sized to the image's
 * own aspect ratio (not forced into a landscape box), so tall floor plans render
 * as large as the viewport allows instead of being letterboxed down. */
export function Lightbox({
  src,
  alt,
  aspect = "aspect-[4/3]",
  imgClassName = "object-cover",
}: {
  src: string;
  alt: string;
  aspect?: string;
  imgClassName?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`group relative w-full overflow-hidden rounded-xl border border-border ${aspect}`}
      >
        <Image src={src} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className={imgClassName} />
        <span className="absolute right-2 top-2 flex size-8 items-center justify-center rounded-full bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100">
          <ZoomIn className="size-4" />
        </span>
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex max-h-[95vh] w-fit max-w-[95vw] items-center justify-center border-none bg-transparent p-0 shadow-none [&>button]:z-10 [&>button]:text-white">
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          {/* eslint-disable-next-line @next/next/no-img-element -- natural aspect ratio needed; next/image `fill` would force a fixed box and shrink tall plans */}
          <img
            src={src}
            alt={alt}
            className="max-h-[95vh] max-w-[95vw] rounded-lg object-contain"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
