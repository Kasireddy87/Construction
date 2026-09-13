"use client";

import Image from "next/image";
import { useState } from "react";
import { ZoomIn } from "lucide-react";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

/** Click any image to open a full-screen zoomable view. */
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
        <DialogContent className="max-w-5xl border-none bg-transparent p-0 shadow-none [&>button]:text-white">
          <DialogTitle className="sr-only">{alt}</DialogTitle>
          <div className="relative aspect-[4/3] w-full sm:aspect-[16/10]">
            <Image src={src} alt={alt} fill sizes="90vw" className="rounded-lg object-contain" />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
