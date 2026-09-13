import { defineField, defineType } from "sanity";

const galleryImage = defineType({
  name: "galleryImage",
  title: "Gallery Image",
  type: "object",
  fields: [
    defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Elevation", value: "elevation" },
          { title: "Amenity", value: "amenity" },
          { title: "Interior", value: "interior" },
          { title: "Construction Progress", value: "construction-progress" },
        ],
      },
    }),
    defineField({
      name: "date",
      title: "Date (for construction progress)",
      type: "date",
      hidden: ({ parent }) => parent?.category !== "construction-progress",
    }),
  ],
  preview: { select: { title: "caption", media: "image" } },
});

const connectivityItem = defineType({
  name: "connectivityItem",
  title: "Connectivity Item",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string" }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["transit", "education", "healthcare", "retail", "business", "other"],
      },
    }),
    defineField({ name: "distanceKm", title: "Distance (km)", type: "number" }),
    defineField({ name: "timeMin", title: "Time (min)", type: "number" }),
  ],
});

const pricingRow = defineType({
  name: "pricingRow",
  title: "Pricing Row",
  type: "object",
  fields: [
    defineField({ name: "config", title: "Configuration", type: "string" }),
    defineField({ name: "carpetAreaSqft", title: "Carpet Area (sqft)", type: "number" }),
    defineField({ name: "price", title: "Price (₹)", type: "number" }),
  ],
});

const faqItem = defineType({
  name: "faqItem",
  title: "FAQ",
  type: "object",
  fields: [
    defineField({ name: "question", title: "Question", type: "string" }),
    defineField({ name: "answer", title: "Answer", type: "text" }),
  ],
});

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  groups: [
    { name: "basics", title: "Basics" },
    { name: "media", title: "Media" },
    { name: "plans", title: "Plans" },
    { name: "location", title: "Location" },
    { name: "pricing", title: "Pricing" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "name", title: "Project Name", type: "string", group: "basics", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      group: "basics",
      options: { source: "name", maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({ name: "tagline", title: "Tagline", type: "string", group: "basics" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "basics",
      options: {
        list: [
          { title: "New Launch", value: "new-launch" },
          { title: "Under Construction", value: "under-construction" },
          { title: "Ready to Move", value: "ready-to-move" },
          { title: "Completed", value: "completed" },
        ],
        layout: "radio",
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "projectType",
      title: "Project Type",
      type: "string",
      group: "basics",
      options: { list: ["apartment", "villa", "plot", "commercial"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "featured", title: "Featured on homepage", type: "boolean", group: "basics", initialValue: false }),
    defineField({ name: "order", title: "Sort order", type: "number", group: "basics" }),
    defineField({ name: "reraNumber", title: "RERA Number", type: "string", group: "basics" }),
    defineField({ name: "possessionDate", title: "Possession Date", type: "date", group: "basics" }),
    defineField({ name: "overview", title: "Overview", type: "array", of: [{ type: "block" }], group: "basics" }),
    defineField({ name: "highlights", title: "Highlights", type: "array", of: [{ type: "string" }], group: "basics" }),
    defineField({
      name: "keyFacts",
      title: "Key Facts",
      type: "array",
      group: "basics",
      of: [
        {
          type: "object",
          name: "keyFact",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "value", type: "string", title: "Value" },
          ],
        },
      ],
    }),

    defineField({ name: "heroImage", title: "Hero Image", type: "image", group: "media", options: { hotspot: true } }),
    defineField({ name: "heroVideoUrl", title: "Hero Video URL", type: "url", group: "media" }),
    defineField({ name: "gallery", title: "Gallery", type: "array", of: [{ type: "galleryImage" }], group: "media" }),
    defineField({ name: "walkthroughVideoUrl", title: "Walkthrough Video URL (YouTube/Vimeo embed)", type: "url", group: "media" }),
    defineField({ name: "tourEmbedUrl", title: "360°/3D Tour Embed URL", type: "url", group: "media" }),

    defineField({ name: "configs", title: "Unit Plans / Configurations", type: "array", of: [{ type: "unitPlan" }], group: "plans" }),
    defineField({ name: "masterPlanImage", title: "Master Plan Image", type: "image", group: "plans", options: { hotspot: true } }),
    defineField({ name: "sitePlanImage", title: "Site / Layout Plan Image", type: "image", group: "plans", options: { hotspot: true } }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      group: "plans",
      of: [{ type: "reference", to: [{ type: "amenity" }] }],
    }),
    defineField({ name: "faqs", title: "FAQs", type: "array", of: [{ type: "faqItem" }], group: "plans" }),

    defineField({ name: "city", title: "City", type: "string", group: "location", validation: (r) => r.required() }),
    defineField({ name: "locality", title: "Locality", type: "string", group: "location", validation: (r) => r.required() }),
    defineField({ name: "address", title: "Full Address", type: "text", group: "location" }),
    defineField({
      name: "geo",
      title: "Map Coordinates",
      type: "geopoint",
      group: "location",
      description: "Drop the exact project pin",
    }),
    defineField({ name: "connectivity", title: "Connectivity", type: "array", of: [{ type: "connectivityItem" }], group: "location" }),

    defineField({
      name: "priceRange",
      title: "Price Range",
      type: "object",
      group: "pricing",
      fields: [
        { name: "min", title: "Min (₹)", type: "number" },
        { name: "max", title: "Max (₹)", type: "number" },
        { name: "perSqft", title: "Price per sqft (₹)", type: "number" },
      ],
    }),
    defineField({ name: "pricingTable", title: "Pricing Table", type: "array", of: [{ type: "pricingRow" }], group: "pricing" }),
    defineField({
      name: "constructionTimeline",
      title: "Construction Timeline",
      type: "array",
      group: "pricing",
      of: [
        {
          type: "object",
          name: "timelineStep",
          fields: [
            { name: "label", type: "string", title: "Milestone" },
            { name: "date", type: "date", title: "Date" },
            { name: "complete", type: "boolean", title: "Complete", initialValue: false },
          ],
        },
      ],
    }),
    defineField({ name: "brochure", title: "Brochure PDF", type: "file", group: "pricing" }),

    defineField({ name: "metaTitle", title: "Meta Title", type: "string", group: "seo" }),
    defineField({ name: "metaDescription", title: "Meta Description", type: "text", group: "seo" }),
    defineField({ name: "ogImage", title: "OG Image", type: "image", group: "seo" }),
  ],
  preview: {
    select: { title: "name", subtitle: "locality", media: "heroImage" },
  },
});

export const schemaObjects = [galleryImage, connectivityItem, pricingRow, faqItem];
