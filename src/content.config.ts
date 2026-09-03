import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const announcements = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/announcements" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string(),
    pinned: z.boolean().default(false),
  }),
});

export const collections = { announcements };
