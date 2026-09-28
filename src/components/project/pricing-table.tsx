import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatRowPrice } from "@/lib/format";
import type { PricingRow } from "@/types/project";

export function PricingTable({
  rows,
  priceConfirmed,
  projectType,
  perSqft,
}: {
  rows: PricingRow[];
  priceConfirmed?: boolean;
  projectType?: string;
  perSqft?: number;
}) {
  if (rows.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Configuration</TableHead>
            <TableHead className="text-right">{projectType === "apartment" ? "Rate" : "Price"}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.config}>
              <TableCell className="font-medium">{row.config}</TableCell>
              <TableCell className="text-right">
                {priceConfirmed ? (
                  formatRowPrice(row, projectType, perSqft)
                ) : (
                  <span className="text-muted-foreground">On Quote</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
