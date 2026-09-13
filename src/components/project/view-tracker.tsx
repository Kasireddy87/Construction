"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

/** Fires a project_view analytics event once, client-side, when the detail page mounts. */
export function ViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    trackEvent("project_view", slug);
  }, [slug]);

  return null;
}
