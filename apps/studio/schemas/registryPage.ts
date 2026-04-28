import { defineField, defineType } from "sanity";

const paragraphList = [
  {
    type: "object",
    fields: [
      defineField({
        name: "text",
        title: "Text",
        type: "text",
        rows: 4,
        validation: (Rule) => Rule.required(),
      }),
    ],
    preview: {
      select: {
        title: "text",
      },
    },
  },
];

const labeledCard = [
  {
    type: "object",
    fields: [
      defineField({
        name: "label",
        title: "Label",
        type: "string",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "description",
        title: "Description",
        type: "text",
        rows: 4,
        validation: (Rule) => Rule.required(),
      }),
    ],
    preview: {
      select: {
        title: "label",
      },
    },
  },
];

const numberedCard = [
  {
    type: "object",
    fields: [
      defineField({
        name: "number",
        title: "Number",
        type: "string",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "title",
        title: "Title",
        type: "string",
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: "description",
        title: "Description",
        type: "text",
        rows: 4,
        validation: (Rule) => Rule.required(),
      }),
    ],
    preview: {
      select: {
        title: "title",
        subtitle: "number",
      },
    },
  },
];

export const registryPage = defineType({
  name: "registryPage",
  title: "Registry Page",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Hero Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "primaryCta",
      title: "Hero CTA",
      type: "object",
      fields: [
        defineField({ name: "label", title: "Label", type: "string" }),
        defineField({ name: "href", title: "Href", type: "string" }),
      ],
    }),
    defineField({
      name: "introSection",
      title: "Intro Section",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "paragraphs",
          title: "Paragraphs",
          type: "array",
          of: paragraphList,
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
    }),
    defineField({
      name: "capabilitiesLabel",
      title: "Capabilities Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "capabilities",
      title: "Capabilities",
      type: "array",
      of: labeledCard,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "architecture",
      title: "Architecture",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "image",
          title: "Image",
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
            }),
          ],
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "layers",
          title: "Layers",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({
                  name: "label",
                  title: "Label",
                  type: "string",
                  validation: (Rule) => Rule.required(),
                }),
                defineField({
                  name: "value",
                  title: "Value",
                  type: "text",
                  rows: 4,
                  validation: (Rule) => Rule.required(),
                }),
              ],
              preview: {
                select: {
                  title: "label",
                },
              },
            },
          ],
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
    }),
    defineField({
      name: "principlesLabel",
      title: "Principles Label",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "principles",
      title: "Principles",
      type: "array",
      of: numberedCard,
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "audience",
      title: "Audience Section",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "paragraphs",
          title: "Paragraphs",
          type: "array",
          of: paragraphList,
          validation: (Rule) => Rule.required().min(1),
        }),
        defineField({
          name: "cards",
          title: "Cards",
          type: "array",
          of: labeledCard,
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
    }),
    defineField({
      name: "practice",
      title: "Practice Section",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "paragraphs",
          title: "Paragraphs",
          type: "array",
          of: paragraphList,
          validation: (Rule) => Rule.required().min(1),
        }),
      ],
    }),
    defineField({
      name: "pullQuote",
      title: "Pull Quote",
      type: "object",
      fields: [
        defineField({
          name: "text",
          title: "Text",
          type: "text",
          rows: 4,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "cite",
          title: "Attribution",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
      ],
    }),
    defineField({
      name: "cta",
      title: "CTA Section",
      type: "object",
      fields: [
        defineField({
          name: "label",
          title: "Label",
          type: "string",
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "description",
          title: "Description",
          type: "text",
          rows: 4,
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: "primaryLink",
          title: "Primary Link",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Href", type: "string" }),
          ],
        }),
        defineField({
          name: "secondaryLink",
          title: "Secondary Link",
          type: "object",
          fields: [
            defineField({ name: "label", title: "Label", type: "string" }),
            defineField({ name: "href", title: "Href", type: "string" }),
          ],
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "label",
      media: "architecture.image",
    },
  },
});
