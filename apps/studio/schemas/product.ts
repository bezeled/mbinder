import { defineField, defineType } from "sanity";

const richText = [
  {
    type: "block",
    styles: [
      { title: "Normal", value: "normal" },
      { title: "H2", value: "h2" },
      { title: "H3", value: "h3" },
      { title: "H4", value: "h4" },
      { title: "Quote", value: "blockquote" },
    ],
    marks: {
      decorators: [
        { title: "Bold", value: "strong" },
        { title: "Italic", value: "em" },
        { title: "Code", value: "code" },
      ],
      annotations: [
        {
          name: "link",
          type: "object",
          title: "Link",
          fields: [
            {
              name: "href",
              type: "url",
              title: "URL",
              validation: (Rule: any) =>
                Rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
            },
          ],
        },
      ],
    },
  },
  {
    type: "image",
    options: { hotspot: true },
    fields: [
      { name: "alt", type: "string", title: "Alt Text" },
      { name: "caption", type: "string", title: "Caption" },
    ],
  },
];

export const product = defineType({
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      description: 'Full name, e.g. "Legally Authenticated Data"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortName",
      title: "Short Name",
      type: "string",
      description: 'Abbreviation, e.g. "LAD"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: 'Mono label, e.g. "LEGALLY AUTHENTICATED DATA"',
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Used for ordering in listings (1, 2, 3…)",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "description",
      title: "Hero Description",
      type: "text",
      rows: 4,
      description: "Short description shown in the hero section",
    }),
    defineField({
      name: "ctaText",
      title: "CTA Text",
      type: "text",
      rows: 3,
      description: "Short call-to-action copy shown near the footer CTA",
    }),
    defineField({
      name: "image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
        }),
      ],
    }),
    defineField({
      name: "steps",
      title: "How It Works",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Step Label",
              type: "string",
              description: 'e.g. "01 — AUDIT"',
            }),
            defineField({
              name: "description",
              title: "Step Description",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: { title: "label" },
          },
        },
      ],
    }),
    defineField({
      name: "body",
      title: "Body Content",
      type: "array",
      of: richText,
    }),
    defineField({
      name: "pullQuote",
      title: "Pull Quote",
      type: "object",
      fields: [
        defineField({ name: "text", title: "Quote Text", type: "text", rows: 3 }),
        defineField({ name: "cite", title: "Attribution", type: "string" }),
      ],
    }),
    defineField({
      name: "caseStudy",
      title: "Case Study",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "title", title: "Title", type: "string" }),
        defineField({ name: "description", title: "Description", type: "text", rows: 4 }),
        defineField({
          name: "metrics",
          title: "Metrics",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "label", title: "Label", type: "string" }),
                defineField({ name: "value", title: "Value", type: "string" }),
              ],
            },
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "shortName",
      subtitle: "title",
      media: "image",
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
