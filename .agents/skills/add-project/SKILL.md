---
name: add-project
description: Add a project to the content collection. Handles one-time collection setup if missing. Use when user wants to add, create, or showcase a new project.
---

# Add Project

## First-run setup

Check if `projects` exists in `content.config.ts` exports. If missing, add:

```ts
const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),    // mono uppercase subtitle
    description: z.string(),
    badge: z.string().optional(),        // "Commercial", "NDA", "Open Source"
    href: z.string().optional(),         // external project URL
    category: z.enum(["commercial", "open-source"]),
  }),
});
```

Update export: `export const collections = { blog, speaking, projects };`

Create `src/content/projects/` directory.

**Migrate `src/pages/projects.astro`:** rewrite to query `getCollection("projects")`, group by `category`, render each group in its own section (COMMERCIAL → OPEN SOURCE) using existing `ProjectCard` component for each entry. Keep the hero section and section headings intact. Remove hardcoded project data.

## Adding a project

Create `src/content/projects/<slug>.md`:

```markdown
---
title: "Project Name"
subtitle: "Tagline or role"
description: "What it does and why it matters."
badge: "Open Source"
href: "https://github.com/..."
category: "open-source"
---

Optional body content.
```

## ProjectCard mapping

Props map 1:1 to schema fields: `title`, `subtitle`, `description`, `badge`, `href`.

## Validate

`npx astro check`
