import type { Metadata } from "next";
import { Suspense } from "react";

import { ProjectsFilterGrid } from "@/components/site/projects-filter-grid";
import { getAllProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "All Projects",
  description: "Browse every residential and commercial project — filter by city, status, configuration and budget.",
};

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-sm font-medium uppercase tracking-wide text-accent">Portfolio</p>
      <h1 className="mt-1 font-heading text-4xl font-bold">All Projects</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        {projects.length} projects across South India. Filter by city, status, configuration or budget to find
        the right fit.
      </p>

      <div className="mt-8">
        <Suspense>
          <ProjectsFilterGrid projects={projects} />
        </Suspense>
      </div>
    </div>
  );
}
