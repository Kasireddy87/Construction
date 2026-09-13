"use client";

import type { AnalyticsEventInput } from "@/lib/validation";

function getSessionId(): string {
  try {
    const key = "cw_session_id";
    let id = sessionStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID();
      sessionStorage.setItem(key, id);
    }
    return id;
  } catch {
    return "unknown";
  }
}

/** Fire-and-forget analytics event. Never throws, never blocks the UI thread. */
export function trackEvent(event: AnalyticsEventInput["event"], projectSlug?: string) {
  try {
    const payload: AnalyticsEventInput = {
      event,
      projectSlug: projectSlug || "",
      path: typeof window !== "undefined" ? window.location.pathname : "",
      sessionId: getSessionId(),
    };
    const sent = navigator.sendBeacon?.(
      "/api/analytics",
      new Blob([JSON.stringify(payload)], { type: "application/json" }),
    );
    if (!sent) {
      fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      }).catch(() => {});
    }
  } catch {
    // analytics must never break the page
  }
}
