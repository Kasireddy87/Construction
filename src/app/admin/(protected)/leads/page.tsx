import { LeadsTable } from "@/components/admin/leads-table";
import { getLeads } from "@/lib/admin-data";

export default async function AdminLeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; source?: string; project?: string }>;
}) {
  const params = await searchParams;
  const leads = await getLeads({ status: params.status, source: params.source, project_slug: params.project });

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Leads</h1>
      <p className="mt-1 text-sm text-muted-foreground">{leads.length} lead(s)</p>
      <div className="mt-6">
        <LeadsTable leads={leads} />
      </div>
    </div>
  );
}
