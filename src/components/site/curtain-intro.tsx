"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "sbc_curtain_shown";
const OPEN_DELAY_MS = 1200; // pause on a closed curtain before it starts opening
const OPEN_DURATION_MS = 2800; // how long the opening slide itself takes
const UNMOUNT_AFTER_MS = OPEN_DELAY_MS + OPEN_DURATION_MS + 200;

/**
 * A one-time "curtain opening" reveal, shown the first time a visitor lands
 * on the site each browser session (gated via sessionStorage — never repeats
 * on internal navigation or a second visit in the same session).
 *
 * The whole `transition` shorthand is set via inline style (not Tailwind's
 * `transition-*` utilities) so nothing else on the page can ever override the
 * duration — Tailwind's transition utilities bundle their own default
 * duration/easing into the same rule, which can win the cascade unpredictably.
 */
export function CurtainIntro() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch {
      // sessionStorage unavailable (private mode etc.) — just skip the intro
      return;
    }

    setVisible(true);
    document.body.style.overflow = "hidden";

    const openTimer = setTimeout(() => setOpen(true), OPEN_DELAY_MS);
    const removeTimer = setTimeout(() => {
      setVisible(false);
      document.body.style.overflow = "";
    }, UNMOUNT_AFTER_MS);

    return () => {
      clearTimeout(openTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  const slideTransition: React.CSSProperties = {
    transition: `transform ${OPEN_DURATION_MS}ms cubic-bezier(0.65,0,0.35,1)`,
    willChange: "transform",
  };
  const fabricTexture = {
    backgroundImage:
      "repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 2px, transparent 2px, transparent 26px), linear-gradient(180deg, #1c1c1c 0%, #101010 60%, #050505 100%)",
  };

  return (
    <div aria-hidden="true" className="fixed inset-0 z-[100] overflow-hidden">
      {/* left panel */}
      <div
        className="absolute top-0 left-0 h-full w-1/2"
        style={{ ...fabricTexture, ...slideTransition, transform: open ? "translateX(-100%)" : "translateX(0)" }}
      />
      {/* right panel */}
      <div
        className="absolute top-0 right-0 h-full w-1/2"
        style={{ ...fabricTexture, ...slideTransition, transform: open ? "translateX(100%)" : "translateX(0)" }}
      />
      {/* center seam + mark, fades out as the curtain opens */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
        style={{ transition: `opacity ${OPEN_DURATION_MS * 0.6}ms ease-out`, opacity: open ? 0 : 1 }}
      >
        <div className="flex flex-col items-center gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element -- static local logo, no optimization needed */}
          <img src="/logo-mark.png" alt="" className="h-16 w-auto brightness-0 invert" />
          <p className="text-xs font-semibold tracking-[0.35em] text-white/70">
            SRI BALAJI CONSTRUCTIONS
          </p>
        </div>
      </div>
    </div>
  );
}
