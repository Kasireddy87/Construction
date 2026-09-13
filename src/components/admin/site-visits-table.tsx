"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { confirmSiteVisit } from "@/app/admin/actions";
import type { SiteVisitRow } from "@/lib/admin-data";

export function SiteVisitsTable({ visits }: { visits: SiteVisitRow[] }) {
  const [rows, setRows] = useState(visits);
  const [isPending, startTransition] = useTransition();

  function toggle(id: string, confirmed: boolean) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, confirmed } : r)));
    startTransition(async () => {
      try {
        await confirmSiteVisit(id, confirmed);
      } catch {
        toast.error("Could not update visit");
      }
    });
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Requested</TableHead>
            <TableHead>Visitor</TableHead>
            <TableHead>Project</TableHead>
            <TableHead>Preferred</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((v) => (
            <TableRow key={v.id}>
              <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                {new Date(v.created_at).toLocaleString()}
              </TableCell>
              <TableCell className="text-sm">
                <div className="font-medium">{v.lead?.name}</div>
                <div className="text-xs text-muted-foreground">{v.lead?.phone}</div>
              </TableCell>
              <TableCell className="text-sm">{v.lead?.project_slug ?? "—"}</TableCell>
              <TableCell className="text-sm">
                {v.preferred_date ?? "—"} {v.preferred_slot}
              </TableCell>
              <TableCell>
                <Button
                  size="sm"
                  variant={v.confirmed ? "default" : "outline"}
                  disabled={isPending}
                  onClick={() => toggle(v.id, !v.confirmed)}
                >
                  {v.confirmed ? "Confirmed" : "Confirm"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
          {rows.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="py-10 text-center text-muted-foreground">
                No site visit requests yet.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
