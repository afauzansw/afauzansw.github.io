import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob, file } from "astro/loaders"

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

const experiences = defineCollection({
  loader: file("src/data/experiences.json"),
  schema: z.object({
    company: z.string(),
    role: z.string(),
    period: z.string(),
    start: z.coerce.date(),
    summary: z.string().optional(),
    stack: z.array(z.string()).optional(),
  }),
})

export const collections = { projects, experiences }
