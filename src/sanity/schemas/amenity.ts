import { defineField, defineType } from "sanity";

export const amenity = defineType({
  name: "amenity",
  title: "Amenity",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "icon",
      title: "Icon (lucide-react name)",
      type: "string",
      description: 'e.g. "Waves", "Dumbbell", "ShieldCheck" — see lucide.dev/icons',
    }),
    defineField({ name: "category", title: "Category", type: "string" }),
  ],
});
