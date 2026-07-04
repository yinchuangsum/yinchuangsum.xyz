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

const speaking = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/speaking" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.date(),
    location: z.string(),
    category: z.enum(["upcoming", "past"]),
    tags: z.array(z.string()).optional().default([]),
    virtual: z.boolean().optional().default(false),
    primaryAction: z
      .object({ label: z.string(), href: z.string() })
      .optional(),
    secondaryAction: z
      .object({
        label: z.string(),
        href: z.string(),
        variant: z.enum(["secondary", "ghost"]).optional().default("ghost"),
      })
      .optional(),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    description: z.string(),
    badge: z.string().optional(),
    href: z.string().optional(),
    category: z.enum(["commercial", "open-source"]),
  }),
});

export const collections = { blog, education, speaking, projects };
