---
name: add-event
description: Add a speaking event to the content collection. Handles one-time collection setup if missing. Use when user wants to add, schedule, or log a speaking event.
---

# Add Event

## First-run setup

Check if `speaking` exists in `content.config.ts` exports. If missing, add:

```ts
const speaking = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/speaking" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),          // display: "June 15, 2026" or "May 2025"
    location: z.string(),      // "Conference · City, Country"
    category: z.enum(["upcoming", "past"]),
    tags: z.array(z.string()).optional().default([]),
    virtual: z.boolean().optional().default(false),
    primaryAction: z.object({ label: z.string(), href: z.string() }).optional(),
    secondaryAction: z.object({
      label: z.string(),
      href: z.string(),
      variant: z.enum(["secondary", "ghost"]).optional().default("ghost"),
    }).optional(),
  }),
});
```

Update export: `export const collections = { blog, speaking };`

Create `src/content/speaking/` directory.

**Rewrite `src/pages/speaking.astro`** — query `getCollection("speaking")`, group by `category`, render a `grid-2` of `EventCard` components per group (Upcoming section first, then Archive).

## Adding an event

Create `src/content/speaking/<slug>.md`:

```markdown
---
title: "Talk Title"
description: "Short lead text."
date: "June 15, 2026"
location: "Conference · City, Country"
category: "upcoming"
tags: ["Tag1", "Tag2"]
virtual: false
primaryAction:
  label: "Register"
  href: "https://..."
secondaryAction:
  label: "View Details"
  href: "https://..."
  variant: "ghost"
---

Optional body content.
```

## EventCard prop mapping

When rendering, map collection fields to `src/components/EventCard.astro` props:

- `tags` → `tags: [{ label: t } for each]`. If `virtual: true`, prepend `{ label: "Virtual", variant: "pill" }`
- `primaryAction` → `primaryAction: { label, href }`
- `secondaryAction` → `secondaryAction: { label, href, variant }`

## Validate

`npx astro check`
