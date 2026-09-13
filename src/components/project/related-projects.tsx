import { ProjectCard } from "@/components/site/project-card";
import type { Project } from "@/types/project";

export function RelatedProjects({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  return (
    <div>
      <h2 className="font-heading text-2xl font-bold">You might also like</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
