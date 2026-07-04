# Project guidelines

## File structure

Projects live in `src/content/projects/`. Each project is a single `.md` file:

```
src/content/projects/
└── my-project-slug.md
```

## Slug

The filename (minus `.md`) is used as the entry ID. Kebab-case, check for uniqueness.

Projects currently have no detail page — they render as cards on `/projects`. A `/projects/[slug]` detail page can be added later if needed.

## Frontmatter

| Field | Type | Required | Convention |
|-------|------|----------|-----------|
| `title` | `string` | yes | `"Project Name"` |
| `subtitle` | `string` | no | Mono uppercase subtitle: `"Tagline or Role"` |
| `description` | `string` | yes | What it does and why it matters (1-2 sentences) |
| `badge` | `string` | no | Displayed as a pill: `"Commercial"`, `"NDA"`, `"Open Source"` |
| `href` | `string` | no | External URL (GitHub, product page). If set, card shows "Learn more" button. |
| `category` | `"commercial" \| "open-source"` | yes | Groups projects into sections on the page |

Example:

```yaml
title: "Lazyman TUI"
subtitle: "Local-First Terminal HTTP Client"
description: "A terminal UI for HTTP requests, inspired by lazygit."
badge: "Open Source"
href: "https://github.com/yinchuangsum/lazyman"
category: "open-source"
```

## Body

Body content is optional. Currently unused — the `/projects` page displays card data only. Body can be added later if a detail page is introduced.

## Category ordering on page

| Category | Section |
|----------|---------|
| `commercial` | "COMMERCIAL — Closed source." (first) |
| `open-source` | "OPEN SOURCE — Built in public." (second) |

Within each category, projects appear in the order defined in the collection query (default: alphabetical by slug).

## Validate

```bash
npm run dev        # Preview at localhost:4321
npx astro check    # Type-check before committing
```
