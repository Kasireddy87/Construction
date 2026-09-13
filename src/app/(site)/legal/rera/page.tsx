import type { Metadata } from "next";
import Link from "next/link";

import { getAllProjects } from "@/lib/data";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "RERA Disclosures" };

export default async function ReraPage() {
  const projects = await getAllProjects();

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-heading text-4xl font-bold">RERA Disclosures</h1>
      <p className="mt-3 text-muted-foreground">
        Registration numbers and possession timelines for every ongoing and completed project, as required under
        the Real Estate (Regulation and Development) Act, 2016. Copies of the registration certificates are
        available from our sales offices on request.
      </p>

      <div className="mt-10 overflow-x-auto rounded-xl border border-border">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-muted text-left text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-medium">Project</th>
              <th className="px-4 py-3 font-medium">City</th>
              <th className="px-4 py-3 font-medium">RERA Number</th>
              <th className="px-4 py-3 font-medium">Possession</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p) => (
              <tr key={p.slug} className="border-t border-border">
                <td className="px-4 py-3">
                  <Link href={`/projects/${p.slug}`} className="font-medium hover:underline">
                    {p.name}
                  </Link>
                </td>
                <td className="px-4 py-3">{p.city}</td>
                <td className="px-4 py-3">{p.reraNumber || "—"}</td>
                <td className="px-4 py-3">{formatDate(p.possessionDate)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
