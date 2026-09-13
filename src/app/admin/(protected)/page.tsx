import Link from "next/link";

import { StatCard } from "@/components/admin/stat-card";
import { TrendChart } from "@/components/admin/trend-chart";
import { getAnalyticsSummary, getDailyEventCounts } from "@/lib/admin-data";

export default async function AdminOverviewPage() {
  const [summary, daily] = await Promise.all([getAnalyticsSummary(), getDailyEventCounts()]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold">Overview</h1>
        <p className="mt-1 text-sm text-muted-foreground">Last 7 days of activity across all projects.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <StatCard label="Total Leads" value={summary.totalLeads} />
        <StatCard label="New Leads (7d)" value={summary.newLeadsLast7Days} />
        <StatCard label="Brochure Downloads" value={summary.brochureDownloads} />
        <StatCard label="WhatsApp Clicks" value={summary.whatsappClicks} />
        <StatCard label="Call Clicks" value={summary.callClicks} />
      </div>

      <div>
        <h2 className="mb-3 text-sm font-semibold text-muted-foreground">Site Activity (14 days)</h2>
        <TrendChart data={daily} />
      </div>

      <div className="flex gap-4 text-sm">
        <Link href="/admin/leads" className="font-medium text-accent-foreground underline underline-offset-4">
          View all leads →
        </Link>
        <Link href="/admin/analytics" className="font-medium text-accent-foreground underline underline-offset-4">
          Per-project analytics →
        </Link>
      </div>
    </div>
  );
}
