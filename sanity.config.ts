/**
 * Standalone Sanity Studio config. Run with `npm run studio` (sanity dev,
 * served at http://localhost:3333) or `npm run studio:deploy` (hosts it free
 * at https://<project>.sanity.studio). Kept as its own app — not embedded in
 * the Next.js build — to avoid bundling Studio's browser-only UI into Next's
 * server compiler. See src/sanity/schemas for the content model and
 * src/lib/data.ts for how the Next app reads what you publish here.
 *
 * Uses relative imports (not the "@/*" alias) since this file is loaded by
 * the Sanity CLI directly, outside Next's module resolution.
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";

import { apiVersion, dataset, projectId } from "./src/sanity/env";
import { schema } from "./src/sanity/schemas";

const singletonTypes = new Set(["companyInfo"]);

export default defineConfig({
  name: "default",
  title: "Meridian Developers CMS",
  basePath: "/",
  projectId: projectId || "placeholder",
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Company Info")
              .child(S.document().schemaType("companyInfo").documentId("companyInfo")),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => item.getId() && !singletonTypes.has(item.getId()!),
            ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
