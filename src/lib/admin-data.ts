import "server-only";

import { getSupabaseAdmin } from "@/lib/supabase";

export interface LeadRow {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  project_slug: string | null;
  source: string;
  message: string | null;
  status: string;
  notes: string | null;
}

export interface LeadFilters {
  status?: string;
  source?: string;
  project_slug?: string;
}

export async function getLeads(filters: LeadFilters = {}): Promise<LeadRow[]> {
  const supabase = getSupabaseAdmin();
  let query = supabase.from("leads").select("*").order("created_at", { ascending: false });

  if (filters.status) query = query.eq("status", filters.status);
  if (filters.source) query = query.eq("source", filters.source);
  if (filters.project_slug) query = query.eq("project_slug", filters.project_slug);

  const { data, error } = await query;
  if (error) {
    console.error("[admin-data] getLeads failed:", error);
    return [];
  }
  return data as LeadRow[];
}

export interface SiteVisitRow {
  id: string;
  created_at: string;
  preferred_date: string | null;
  preferred_slot: string | null;
  confirmed: boolean;
  lead: { name: string; phone: string; project_slug: string | null } | null;
}

export async function getSiteVisits(): Promise<SiteVisitRow[]> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("site_visits")
    .select("id, created_at, preferred_date, preferred_slot, confirmed, lead:leads(name, phone, project_slug)")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[admin-data] getSiteVisits failed:", error);
    return [];
  }
  // Supabase types the joined relation as an array even for a to-one FK; normalize it.
  return (data ?? []).map((row) => ({
    ...row,
    lead: Array.isArray(row.lead) ? (row.lead[0] ?? null) : row.lead,
  })) as SiteVisitRow[];
}

export interface AnalyticsSummary {
  totalLeads: number;
  newLeadsLast7Days: number;
  brochureDownloads: number;
  whatsappClicks: number;
  instagramClicks: number;
  callClicks: number;
  byProject: { project_slug: string; views: number; enquiries: number }[];
}

export async function getAnalyticsSummary(): Promise<AnalyticsSummary> {
  const supabase = getSupabaseAdmin();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [{ count: totalLeads }, { count: newLeadsLast7Days }, events] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase.from("leads").select("*", { count: "exact", head: true }).gte("created_at", sevenDaysAgo),
    supabase.from("analytics_events").select("event, project_slug"),
  ]);

  const rows = events.data ?? [];
  const brochureDownloads = rows.filter((r) => r.event === "brochure_click").length;
  const whatsappClicks = rows.filter((r) => r.event === "whatsapp_click").length;
  const instagramClicks = rows.filter((r) => r.event === "instagram_click").length;
  const callClicks = rows.filter((r) => r.event === "call_click").length;

  const byProjectMap = new Map<string, { views: number; enquiries: number }>();
  for (const row of rows) {
    if (!row.project_slug) continue;
    const entry = byProjectMap.get(row.project_slug) ?? { views: 0, enquiries: 0 };
    if (row.event === "project_view") entry.views += 1;
    if (row.event === "enquiry_submit") entry.enquiries += 1;
    byProjectMap.set(row.project_slug, entry);
  }

  return {
    totalLeads: totalLeads ?? 0,
    newLeadsLast7Days: newLeadsLast7Days ?? 0,
    brochureDownloads,
    whatsappClicks,
    instagramClicks,
    callClicks,
    byProject: Array.from(byProjectMap.entries()).map(([project_slug, v]) => ({ project_slug, ...v })),
  };
}

export interface DailyEventCount {
  date: string;
  count: number;
}

export async function getDailyEventCounts(days = 14): Promise<DailyEventCount[]> {
  const supabase = getSupabaseAdmin();
  const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await supabase.from("analytics_events").select("created_at").gte("created_at", since);
  if (error || !data) return [];

  const counts = new Map<string, number>();
  for (let i = 0; i < days; i++) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    counts.set(d, 0);
  }
  for (const row of data) {
    const d = row.created_at.slice(0, 10);
    if (counts.has(d)) counts.set(d, (counts.get(d) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({ date, count }));
}
