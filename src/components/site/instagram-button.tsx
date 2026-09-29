"use client";

import { trackEvent } from "@/lib/analytics";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-7" aria-hidden="true">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="white" strokeWidth="2" />
      <circle cx="12" cy="12" r="4.5" stroke="white" strokeWidth="2" />
      <circle cx="17.4" cy="6.6" r="1.2" fill="white" />
    </svg>
  );
}

export function InstagramButton({
  url,
  projectSlug,
  className,
  variant = "floating",
}: {
  url: string;
  projectSlug?: string;
  className?: string;
  variant?: "floating" | "inline";
}) {
  if (variant === "inline") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("instagram_click", projectSlug)}
        className={className}
      >
        <InstagramIcon />
        <span>Instagram</span>
      </a>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("instagram_click", projectSlug)}
      aria-label="Message us on Instagram"
      className="fixed bottom-[92px] right-5 z-50 flex size-14 items-center justify-center rounded-full bg-gradient-to-tr from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white shadow-lg transition-transform hover:scale-105 md:bottom-24 md:right-6"
    >
      <InstagramIcon />
    </a>
  );
}
