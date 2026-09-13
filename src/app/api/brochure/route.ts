import { NextRequest, NextResponse } from "next/server";

import { getProjectBySlug } from "@/lib/data";
import { notifySalesOfLead } from "@/lib/email";
import { isRateLimited } from "@/lib/rate-limit";
import { isSupabaseConfigured, supabaseAnon } from "@/lib/supabase";
import { brochureFormSchema } from "@/lib/validation";

/**
 * "Gating" here means: the download link is only ever returned from this API
 * after the visitor submits their details (it's never present in the
 * page HTML). The Sanity file asset itself is on the public CDN, so treat
 * this as lead-capture gating, not access-control — don't put anything
 * commercially sensitive in the brochure PDF.
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? "unknown";
  if (isRateLimited(`brochure:${ip}`)) {
    return NextResponse.json({ error: "Too many requests. Please try again in a minute." }, { status: 429 });
  }

  const json = await req.json().catch(() => null);
  const parsed = brochureFormSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const data = parsed.data;
  if (data.company) {
    return NextResponse.json({ ok: true, brochureUrl: null });
  }

  const project = await getProjectBySlug(data.projectSlug);
  if (!project?.brochureUrl) {
    return NextResponse.json({ error: "No brochure is available for this project yet." }, { status: 404 });
  }

  if (isSupabaseConfigured && supabaseAnon) {
    const { error } = await supabaseAnon.from("brochure_requests").insert({
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      project_slug: data.projectSlug,
      downloaded_at: new Date().toISOString(),
    });
    if (error) console.error("[api/brochure] insert failed:", error);
  } else {
    console.warn("[api/brochure] Supabase not configured — brochure request not persisted:", data);
  }

  await notifySalesOfLead({
    name: data.name,
    phone: data.phone,
    email: data.email || undefined,
    projectSlug: data.projectSlug,
    source: "brochure",
  }).catch((err) => console.error("[api/brochure] email notification failed:", err));

  return NextResponse.json({ ok: true, brochureUrl: project.brochureUrl });
}
