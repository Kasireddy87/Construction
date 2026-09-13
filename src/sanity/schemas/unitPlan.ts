import { defineField, defineType } from "sanity";

export const unitVariant = defineType({
  name: "unitVariant",
  title: "Unit Variant",
  type: "object",
  fields: [
    defineField({ name: "label", title: "Label", type: "string", description: 'e.g. "Type A"' }),
    defineField({ name: "carpetAreaSqft", title: "Carpet Area (sqft)", type: "number" }),
    defineField({ name: "builtUpAreaSqft", title: "Built-up Area (sqft)", type: "number" }),
    defineField({ name: "price", title: "Price (₹)", type: "number" }),
  ],
});

export const unitPlan = defineType({
  name: "unitPlan",
  title: "Unit Plan",
  type: "object",
  fields: [
    defineField({
      name: "configLabel",
      title: "Configuration",
      type: "string",
      description: 'e.g. "2 BHK", "3 BHK", "Shop"',
      validation: (r) => r.required(),
    }),
    defineField({ name: "carpetAreaSqft", title: "Carpet Area (sqft)", type: "number" }),
    defineField({ name: "builtUpAreaSqft", title: "Built-up Area (sqft)", type: "number" }),
    defineField({
      name: "planImage",
      title: "Floor Plan Image",
      type: "image",
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({ name: "facing", title: "Facing", type: "string" }),
    defineField({ name: "towerInfo", title: "Tower / Block Info", type: "string" }),
    defineField({
      name: "variants",
      title: "Variants",
      type: "array",
      of: [{ type: "unitVariant" }],
    }),
  ],
  preview: {
    select: { title: "configLabel", media: "planImage" },
  },
});
