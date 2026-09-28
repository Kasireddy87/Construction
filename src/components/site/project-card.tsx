import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";

import { StatusPill } from "@/components/site/status-pill";
import { formatPriceDisplay } from "@/lib/format";
import type { Project } from "@/types/project";

export function ProjectCard({ project }: { project: Project }) {
  const configs = project.configs.map((c) => c.configLabel).join(", ");

  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block overflow-hidden rounded-2xl border border-border bg-card transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.heroImage}
          alt={project.name}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute left-3 top-3">
          <StatusPill status={project.status} />
        </div>
      </div>
      <div className="space-y-2 p-4">
        <h3 className="font-heading text-lg font-semibold leading-tight">{project.name}</h3>
        <p className="flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" />
          {project.locality}, {project.city}
        </p>
        <p className="text-sm text-muted-foreground">{configs}</p>
        <p className="pt-1 text-sm font-medium">{formatPriceDisplay(project)}</p>
      </div>
    </Link>
  );
}
