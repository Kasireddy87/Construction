import { defineField, defineType } from "sanity";

export const companyInfo = defineType({
  name: "companyInfo",
  title: "Company Info",
  type: "document",
  // Singleton — hide from create menu / restrict via structure.ts in Sanity Studio.
  fields: [
    defineField({ name: "name", title: "Company Name", type: "string" }),
    defineField({ name: "logo", title: "Logo", type: "image" }),
    defineField({ name: "aboutTitle", title: "About Title", type: "string" }),
    defineField({ name: "aboutBody", title: "About Body", type: "text" }),
    defineField({
      name: "stats",
      title: "Stats",
      type: "array",
      of: [
        {
          type: "object",
          name: "stat",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "value", type: "string", title: "Value" },
          ],
        },
      ],
    }),
    defineField({
      name: "offices",
      title: "Offices",
      type: "array",
      of: [
        {
          type: "object",
          name: "office",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "address", type: "text", title: "Address" },
            { name: "phone", type: "string", title: "Phone" },
            { name: "email", type: "string", title: "Email" },
          ],
        },
      ],
    }),
    defineField({ name: "whatsappNumber", title: "WhatsApp Number (with country code, digits only)", type: "string" }),
    defineField({ name: "phone", title: "Phone (display)", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({
      name: "socials",
      title: "Social Links",
      type: "array",
      of: [
        {
          type: "object",
          name: "social",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "url", type: "url", title: "URL" },
          ],
        },
      ],
    }),
  ],
});

export const testimonial = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string" }),
    defineField({ name: "role", title: "Role / Project", type: "string" }),
    defineField({ name: "quote", title: "Quote", type: "text" }),
    defineField({ name: "photo", title: "Photo", type: "image" }),
    defineField({ name: "project", title: "Related Project", type: "reference", to: [{ type: "project" }] }),
  ],
});
