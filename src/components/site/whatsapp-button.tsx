"use client";

import { MessageCircle } from "lucide-react";

import { trackEvent } from "@/lib/analytics";

export function WhatsAppButton({
  phoneDigits,
  message = "Hi, I'd like more information.",
  projectSlug,
  className,
  variant = "floating",
}: {
  phoneDigits: string;
  message?: string;
  projectSlug?: string;
  className?: string;
  variant?: "floating" | "inline";
}) {
  const href = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(message)}`;

  if (variant === "inline") {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackEvent("whatsapp_click", projectSlug)}
        className={className}
      >
        <MessageCircle className="size-4" />
        <span>WhatsApp</span>
      </a>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent("whatsapp_click", projectSlug)}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 md:bottom-6 md:right-6"
    >
      <MessageCircle className="size-7" fill="currentColor" strokeWidth={0} />
    </a>
  );
}
