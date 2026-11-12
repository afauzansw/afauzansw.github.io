import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      stack: z.array(z.string()),
      year: z.number(),
      cover: image(),
      coverAlt: z.string(),
      featured: z.boolean().default(false),
      link: z.string().url().optional(),
      repo: z.string().url().optional(),
    }),
});

export const collections = { projects };
