import { NextRequest, NextResponse } from "next/server";

import { isSupabaseConfigured, supabaseAnon } from "@/lib/supabase";
import { analyticsEventSchema } from "@/lib/validation";

// Fire-and-forget event logging — never blocks or breaks the page that calls it.
export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = analyticsEventSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ ok: false }, { status: 200 });
  }
  const data = parsed.data;

  if (!isSupabaseConfigured || !supabaseAnon) {
    return NextResponse.json({ ok: false }, { status: 200 });
  }

  const { error } = await supabaseAnon.from("analytics_events").insert({
    event: data.event,
    project_slug: data.projectSlug || null,
    path: data.path || null,
    referrer: req.headers.get("referer") || null,
    session_id: data.sessionId || null,
  });
  if (error) console.error("[api/analytics] insert failed:", error);

  return NextResponse.json({ ok: !error });
}
