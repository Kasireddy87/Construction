"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const sections = [
  { id: "overview", label: "Overview" },
  { id: "plans", label: "Plans" },
  { id: "gallery", label: "Gallery" },
  { id: "amenities", label: "Amenities" },
  { id: "location", label: "Location" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

export function SectionNav() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: 0 },
    );

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <nav className="sticky top-20 z-30 -mx-4 overflow-x-auto border-b border-border bg-background/95 px-4 backdrop-blur sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="mx-auto flex max-w-7xl gap-6 py-3">
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={cn(
              "shrink-0 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
              active === s.id && "text-accent-foreground underline decoration-accent decoration-2 underline-offset-8",
            )}
          >
            {s.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
