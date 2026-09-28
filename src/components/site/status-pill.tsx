import { Badge } from "@/components/ui/badge";
import { formatStatus } from "@/lib/format";
import type { ProjectStatus } from "@/types/project";
import { cn } from "@/lib/utils";

const styles: Record<ProjectStatus, string> = {
  "new-launch": "bg-accent text-accent-foreground border-transparent",
  "under-construction": "bg-primary text-primary-foreground border-transparent",
  "ready-to-move": "bg-emerald-600 text-white border-transparent",
  completed: "bg-secondary text-secondary-foreground border-border",
  sold: "bg-rose-600 text-white border-transparent",
};

export function StatusPill({ status, className }: { status: ProjectStatus; className?: string }) {
  return (
    <Badge className={cn(styles[status], "rounded-full px-3 py-1 text-xs font-medium tracking-wide", className)}>
      {formatStatus(status)}
    </Badge>
  );
}
