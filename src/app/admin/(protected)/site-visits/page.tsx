import { SiteVisitsTable } from "@/components/admin/site-visits-table";
import { getSiteVisits } from "@/lib/admin-data";

export default async function AdminSiteVisitsPage() {
  const visits = await getSiteVisits();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Site Visits</h1>
      <p className="mt-1 text-sm text-muted-foreground">{visits.length} request(s)</p>
      <div className="mt-6">
        <SiteVisitsTable visits={visits} />
      </div>
    </div>
  );
}
