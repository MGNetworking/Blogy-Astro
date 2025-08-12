import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const articles = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/article" }),
  schema: z.object({
    title: z.string(),
    author: z.string().optional(),
    date: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = { articles };
