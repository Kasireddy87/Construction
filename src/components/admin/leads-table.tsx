"use client";

import { useState, useTransition } from "react";
import { Download } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { updateLeadStatus } from "@/app/admin/actions";
import type { LeadRow } from "@/lib/admin-data";

const statuses = ["new", "contacted", "visited", "closed", "lost"];

export function LeadsTable({ leads }: { leads: LeadRow[] }) {
  const [isPending, startTransition] = useTransition();
  const [rows, setRows] = useState(leads);

  function handleStatusChange(id: string, status: string) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)));
    startTransition(async () => {
      try {
        await updateLeadStatus(id, status);
      } catch {
        toast.error("Could not update status");
      }
    });
  }

  function exportCsv() {
    const header = ["Date", "Name", "Phone", "Email", "Project", "Source", "Status", "Message"];
    const csvRows = rows.map((r) => [
      new Date(r.created_at).toISOString(),
      r.name,
      r.phone,
      r.email ?? "",
      r.project_slug ?? "",
      r.source,
      r.status,
      (r.message ?? "").replace(/\n/g, " "),
    ]);
    const csv = [header, ...csvRows]
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex justify-end">
        <Button variant="outline" size="sm" onClick={exportCsv}>
          <Download className="size-4" />
          Export CSV
        </Button>
      </div>

      <div className="mt-4 overflow-x-auto rounded-xl border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="whitespace-nowrap text-xs text-muted-foreground">
                  {new Date(lead.created_at).toLocaleString()}
                </TableCell>
                <TableCell className="font-medium">{lead.name}</TableCell>
                <TableCell className="text-sm">
                  <div>{lead.phone}</div>
                  {lead.email && <div className="text-xs text-muted-foreground">{lead.email}</div>}
                </TableCell>
                <TableCell className="text-sm">{lead.project_slug ?? "—"}</TableCell>
                <TableCell className="text-sm capitalize">{lead.source}</TableCell>
                <TableCell>
                  <Select
                    value={lead.status}
                    onValueChange={(v) => v && handleStatusChange(lead.id, v)}
                    disabled={isPending}
                  >
                    <SelectTrigger className="w-[130px] capitalize">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((s) => (
                        <SelectItem key={s} value={s} className="capitalize">
                          {s}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                  No leads yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
