"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbox } from "@/components/project/lightbox";
import { trackEvent } from "@/lib/analytics";
import { formatSqft } from "@/lib/format";
import type { UnitPlan } from "@/types/project";

export function PlanTabs({ configs, projectSlug }: { configs: UnitPlan[]; projectSlug: string }) {
  const [tab, setTab] = useState(configs[0]?.configLabel);

  if (configs.length === 0) return null;

  return (
    <Tabs
      value={tab}
      onValueChange={(v) => {
        setTab(v);
        trackEvent("plan_view", projectSlug);
      }}
    >
      <TabsList className="flex-wrap">
        {configs.map((c) => (
          <TabsTrigger key={c.configLabel} value={c.configLabel}>
            {c.configLabel}
          </TabsTrigger>
        ))}
      </TabsList>

      {configs.map((c) => (
        <TabsContent key={c.configLabel} value={c.configLabel} className="mt-6 space-y-6">
          {/* Full-width, tall preview so the plan is legible before you even zoom in */}
          <Lightbox
            src={c.planImage}
            alt={`${c.configLabel} floor plan`}
            aspect="aspect-[3/4] sm:aspect-[16/10]"
            imgClassName="object-contain bg-muted"
          />
          <p className="-mt-3 text-xs text-muted-foreground">Click the plan to view it larger / zoom in.</p>

          <dl className="grid grid-cols-2 gap-4 text-sm sm:grid-cols-4">
            <div>
              <dt className="text-muted-foreground">Area</dt>
              <dd className="font-medium">{formatSqft(c.builtUpAreaSqft)}</dd>
            </div>
            {c.facing && (
              <div>
                <dt className="text-muted-foreground">Facing</dt>
                <dd className="font-medium">{c.facing}</dd>
              </div>
            )}
            {c.towerInfo && (
              <div className="col-span-2 sm:col-span-4">
                <dt className="text-muted-foreground">Available In</dt>
                <dd className="font-medium">{c.towerInfo}</dd>
              </div>
            )}
          </dl>

          {c.variants && c.variants.length > 0 && (
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full text-sm">
                <thead className="bg-muted text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 text-left font-medium">Variant</th>
                    <th className="px-3 py-2 text-left font-medium">Area</th>
                  </tr>
                </thead>
                <tbody>
                  {c.variants.map((v) => (
                    <tr key={v.label} className="border-t border-border">
                      <td className="px-3 py-2">{v.label}</td>
                      <td className="px-3 py-2">{formatSqft(v.builtUpAreaSqft)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  );
}
