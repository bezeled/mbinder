import { defineCollection, z } from "astro:content";

const legal = defineCollection({
  schema: z.object({
    page: z.string(),
    pubDate: z.date(),
  }),
});

export const collections = {
  legal,
};
