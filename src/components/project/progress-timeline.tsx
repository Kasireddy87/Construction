import { Check } from "lucide-react";

import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

export function ProgressTimeline({
  steps,
}: {
  steps: { label: string; date: string; complete: boolean }[];
}) {
  if (steps.length === 0) return null;

  return (
    <ol className="space-y-0">
      {steps.map((step, i) => (
        <li key={step.label} className="flex gap-4">
          <div className="flex flex-col items-center">
            <span
              className={cn(
                "flex size-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-medium",
                step.complete
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border bg-background text-muted-foreground",
              )}
            >
              {step.complete ? <Check className="size-3.5" /> : i + 1}
            </span>
            {i < steps.length - 1 && (
              <span className={cn("w-0.5 flex-1", step.complete ? "bg-accent" : "bg-border")} style={{ minHeight: 32 }} />
            )}
          </div>
          <div className="pb-8">
            <p className="text-sm font-medium">{step.label}</p>
            <p className="text-xs text-muted-foreground">{formatDate(step.date)}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
