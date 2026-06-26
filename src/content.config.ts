import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()),
    readTime: z.string(),
    draft: z.boolean().optional(),
  }),
});

const education = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/education" }),
  schema: z.object({
    title: z.string(),
    tagline: z.string().optional(),
    description: z.string(),
    outline: z.string(),
    status: z.enum(["active", "upcoming", "past"]),
    cohort: z.string(),
    order: z.number().default(99),
    price: z.string().optional(),
    duration: z.string().optional(),
    format: z.string().optional(),
    lead: z.string().optional(),
    syllabusIntro: z.string().optional(),
    audience: z.string().optional(),
    instructor: z.string().optional(),
    pricingNote: z.string().optional(),
    needsNote: z.string().optional(),
    prerequisitesLead: z.string().optional(),
    outcomes: z
      .array(
        z.object({
          label: z.string(),
          desc: z.string(),
        }),
      )
      .optional(),
    modules: z
      .array(
        z.object({
          title: z.string(),
          desc: z.string(),
        }),
      )
      .optional(),
    needs: z.array(z.string()).optional(),
  }),
});

export const collections = { blog, education };
