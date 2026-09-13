import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatSqft } from "@/lib/format";
import type { PricingRow } from "@/types/project";

export function PricingTable({ rows }: { rows: PricingRow[] }) {
  if (rows.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Configuration</TableHead>
            <TableHead>Carpet Area</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.config}>
              <TableCell className="font-medium">{row.config}</TableCell>
              <TableCell>{formatSqft(row.carpetAreaSqft)}</TableCell>
              <TableCell className="text-right text-muted-foreground">On Quote</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
