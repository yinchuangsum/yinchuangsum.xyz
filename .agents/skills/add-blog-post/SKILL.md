---
name: add-blog-post
description: Create a new blog post in the Astro content collection with proper frontmatter, slug, and conventions. Use when user wants to add, write, create, or publish a new blog post.
---

# Add Blog Post

## Schema

Collection in `src/content.config.ts`, files in `src/content/blog/*.md`.

| Field | Type | Required | Convention |
|-------|------|----------|-----------|
| `title` | `string` | yes | `"Title Case"` |
| `description` | `string` | yes | Lead text / excerpt |
| `date` | `Date` | yes | `YYYY-MM-DD` (YAML auto-parses) |
| `tags` | `string[]` | yes | Capitalised: `["Kotlin", "Architecture"]` |
| `readTime` | `string` | yes | `"N min"` — ~200 words/min |
| `draft` | `boolean` | no | `true` hides from listing |

## Workflow

1. **Slug** — kebab-case from title, append `.md`. Check `src/content/blog/` for uniqueness.
2. **Scaffold** — `src/content/blog/<slug>.md` with frontmatter + body (use `Content coming soon.` as placeholder if draft).
3. **Validate** — `npx astro check`

### Template

```markdown
---
title: "Post Title"
description: "Subtitle excerpt."
date: 2026-06-21
tags: ["Tag1", "Tag2"]
readTime: "5 min"
---

Content here.
```

## Existing components

- `LogRow` (src/components/LogRow.astro) — used in blog listings: displays date, title, description, tags, readTime
- Blog post page at `src/pages/blog/[slug].astro` handles full post rendering automatically
