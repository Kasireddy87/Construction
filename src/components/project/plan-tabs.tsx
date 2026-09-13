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
        <TabsContent key={c.configLabel} value={c.configLabel} className="mt-6">
          <div className="grid gap-8 md:grid-cols-2">
            <Lightbox src={c.planImage} alt={`${c.configLabel} floor plan`} aspect="aspect-[4/5]" imgClassName="object-contain bg-muted" />
            <div className="space-y-4">
              <dl className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="text-muted-foreground">Carpet Area</dt>
                  <dd className="font-medium">{formatSqft(c.carpetAreaSqft)}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Built-up Area</dt>
                  <dd className="font-medium">{formatSqft(c.builtUpAreaSqft)}</dd>
                </div>
                {c.facing && (
                  <div>
                    <dt className="text-muted-foreground">Facing</dt>
                    <dd className="font-medium">{c.facing}</dd>
                  </div>
                )}
                {c.towerInfo && (
                  <div>
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
                        <th className="px-3 py-2 text-left font-medium">Carpet</th>
                        <th className="px-3 py-2 text-left font-medium">Built-up</th>
                      </tr>
                    </thead>
                    <tbody>
                      {c.variants.map((v) => (
                        <tr key={v.label} className="border-t border-border">
                          <td className="px-3 py-2">{v.label}</td>
                          <td className="px-3 py-2">{formatSqft(v.carpetAreaSqft)}</td>
                          <td className="px-3 py-2">{formatSqft(v.builtUpAreaSqft)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
