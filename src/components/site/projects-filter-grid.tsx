"use client";

import { useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProjectCard } from "@/components/site/project-card";
import type { Project } from "@/types/project";

const statusOptions = [
  { value: "new-launch", label: "New Launch" },
  { value: "under-construction", label: "Under Construction" },
  { value: "ready-to-move", label: "Ready to Move" },
  { value: "completed", label: "Completed" },
];

const typeOptions = [
  { value: "apartment", label: "Apartment" },
  { value: "villa", label: "Villa" },
  { value: "plot", label: "Plot" },
  { value: "commercial", label: "Commercial" },
];

const budgetOptions = [
  { value: "0-5000000", label: "Under ₹50 L" },
  { value: "5000000-10000000", label: "₹50 L – ₹1 Cr" },
  { value: "10000000-20000000", label: "₹1 Cr – ₹2 Cr" },
  { value: "20000000-999999999", label: "Above ₹2 Cr" },
];

const ALL = "all";

export function ProjectsFilterGrid({ projects }: { projects: Project[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const city = searchParams.get("city") || ALL;
  const status = searchParams.get("status") || ALL;
  const type = searchParams.get("type") || ALL;
  const config = searchParams.get("config") || ALL;
  const budget = searchParams.get("budget") || ALL;

  const cities = useMemo(() => Array.from(new Set(projects.map((p) => p.city))).sort(), [projects]);
  const configs = useMemo(
    () => Array.from(new Set(projects.flatMap((p) => p.configs.map((c) => c.configLabel)))).sort(),
    [projects],
  );

  function setParam(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === ALL) params.delete(key);
    else params.set(key, value);
    router.replace(`/projects?${params.toString()}`, { scroll: false });
  }

  function clearAll() {
    router.replace("/projects", { scroll: false });
  }

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (city !== ALL && p.city !== city) return false;
      if (status !== ALL && p.status !== status) return false;
      if (type !== ALL && p.projectType !== type) return false;
      if (config !== ALL && !p.configs.some((c) => c.configLabel === config)) return false;
      if (budget !== ALL) {
        const [min, max] = budget.split("-").map(Number);
        if (p.priceRange.max < min || p.priceRange.min > max) return false;
      }
      return true;
    });
  }, [projects, city, status, type, config, budget]);

  const hasFilters = [city, status, type, config, budget].some((v) => v !== ALL);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Select value={city} onValueChange={(v) => setParam("city", v)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="City" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Cities</SelectItem>
            {cities.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={status} onValueChange={(v) => setParam("status", v)}>
          <SelectTrigger className="w-[170px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Statuses</SelectItem>
            {statusOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={type} onValueChange={(v) => setParam("type", v)}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>All Types</SelectItem>
            {typeOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={config} onValueChange={(v) => setParam("config", v)}>
          <SelectTrigger className="w-[130px]">
            <SelectValue placeholder="BHK" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Any BHK</SelectItem>
            {configs.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={budget} onValueChange={(v) => setParam("budget", v)}>
          <SelectTrigger className="w-[170px]">
            <SelectValue placeholder="Budget" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={ALL}>Any Budget</SelectItem>
            {budgetOptions.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearAll} className="text-muted-foreground">
            <X className="size-3.5" />
            Clear filters
          </Button>
        )}
      </div>

      <p className="mt-4 text-sm text-muted-foreground">
        {filtered.length} project{filtered.length !== 1 ? "s" : ""} found
      </p>

      {filtered.length > 0 ? (
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center text-muted-foreground">
          No projects match those filters.{" "}
          <button onClick={clearAll} className="underline underline-offset-4">
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
