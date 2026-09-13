import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAnalyticsSummary } from "@/lib/admin-data";

export default async function AdminAnalyticsPage() {
  const summary = await getAnalyticsSummary();
  const sorted = [...summary.byProject].sort((a, b) => b.views - a.views);

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Per-Project Analytics</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Views vs. enquiries per project — a rough view-to-enquiry conversion rate.
      </p>

      <div className="mt-6 overflow-x-auto rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Enquiries</TableHead>
              <TableHead>Conversion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sorted.map((p) => (
              <TableRow key={p.project_slug}>
                <TableCell className="font-medium">{p.project_slug}</TableCell>
                <TableCell>{p.views}</TableCell>
                <TableCell>{p.enquiries}</TableCell>
                <TableCell>{p.views > 0 ? `${((p.enquiries / p.views) * 100).toFixed(1)}%` : "—"}</TableCell>
              </TableRow>
            ))}
            {sorted.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-muted-foreground">
                  No project view events recorded yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
