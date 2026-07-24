# Blog post guidelines

## File structure

Posts live in `src/content/blog/`. Each post is a folder with `index.md`:

```
src/content/blog/
├── my-post-slug/
│   └── index.md
│   └── hero.png          (optional, co-located images)
```

For posts without images, a flat `.md` file works too:

```
src/content/blog/
└── my-post-slug.md
```

## Slug

The filename (minus `.md`) or folder name is the URL slug.

Examples:
- `src/content/blog/how-i-fixed-x.md` → `/blog/how-i-fixed-x`
- `src/content/blog/how-i-fixed-x/index.md` → `/blog/how-i-fixed-x`

Slugs are kebab-case. Check `src/content/blog/` for uniqueness before creating a new one.

## Frontmatter

| Field | Type | Required | Convention |
|-------|------|----------|-----------|
| `title` | `string` | yes | `"Title Case"` |
| `description` | `string` | yes | Single sentence excerpt shown on listing |
| `date` | `date` | yes | `YYYY-MM-DD` |
| `tags` | `string[]` | yes | Capitalised: `["DevOps", "Tooling"]` |
| `readTime` | `string` | yes | `"N min"` — ~200 words/min |
| `draft` | `boolean` | no | `true` hides from listing and slug page |

Example:

```yaml
title: "My Post Title"
description: "What this post is about."
date: 2026-07-03
tags: ["Kotlin", "Architecture"]
readTime: "5 min"
draft: false
```

## Markdown body

- Headings start at h2 (`##`). The title from frontmatter renders as h1 automatically on the post page.
- Use standard markdown: paragraphs, lists, bold, italic, blockquotes, code blocks.
- Code blocks should specify language: ` ```ts `, ` ```bash `, ` ```yaml `, etc.
- Inline code uses backticks: `` `variableName` ``
- Use `---` for horizontal rules sparingly (the page already has a rule under the header).

## Images

Co-locate images in the post folder alongside `index.md`. Reference them with relative paths:

```markdown
![Architecture diagram](./architecture.png)
```

This keeps images attached to the post. Avoid `public/` for blog images.

## Draft workflow

This project uses a **branch-based** publishing workflow — content is drafted on the `staging` branch and selectively promoted to `main`. See the _Branching & publishing_ section in `AGENTS.md` for the full workflow.

The `draft` frontmatter field still exists for edge cases (e.g. hiding a post already on `main`), but the primary gate is branch isolation — content on `staging` is written publish-ready.

## Preview & validate

```bash
npm run dev        # Start dev server at localhost:4321
npx astro check    # Type-check before committing
```

## Existing posts

Posts from before the folder convention (flat `.md` files) work fine. Migrate to folder structure only when adding images.
