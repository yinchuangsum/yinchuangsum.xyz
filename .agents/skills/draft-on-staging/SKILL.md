---
name: draft-on-staging
description: Draft any site content on the `staging` branch. Handles branch setup, syncing, content writing (per guideline/), validation, and commit. All content types (blog, event, project, education, uses) go through staging. Use when user wants to draft, write, create, or add content.
---

# Draft on Staging

Route all content creation through the `staging` branch. The branch is the isolation gate — no `draft: true` frontmatter needed.

## Workflow

### 1. Ensure staging branch

```
git fetch origin
git checkout staging
```

If `staging` doesn't exist locally, create from `origin/main` and push:

```
git checkout -b staging origin/main
git push -u origin staging
```

### 2. Sync with main

```
git merge origin/main
```

(Should fast-forward; staging is always a superset of main.)

### 3. Read content conventions

Before writing, read the relevant guideline:

| Content type | Guideline |
|---|---|
| Blog post | `guideline/blog.md` |
| Speaking event | `guideline/event.md` |
| Project | `guideline/project.md` |
| Education / course | `guideline/course.md` |
| Uses page | `AGENTS.md` (Routes section for `/uses`) |

### 4. Write content

Follow the guideline's schema and conventions. Key rules:
- **No `draft: true` frontmatter** — the branch is the gate
- Frontmatter fields are required as specified per content type
- Blog posts use folder-per-post (`src/content/blog/<slug>/index.md`) for posts with images, flat `.md` otherwise
- Speaking events, projects, and courses are flat `.md` files in their respective collection directories

### 5. Validate

```
npx astro check
```

Fix any errors before proceeding.

### 6. Stage, commit, and push

Stage only the files you touched:

```
git add src/content/<type>/<slug>
```

For blog posts using a folder with images:

```
git add src/content/blog/<slug>/
```

For the uses page:

```
git add src/pages/uses.astro
```

Then commit and push:

```
git commit -m "draft: <slug>"
git push origin staging
```

Pushing `staging` triggers a Cloudflare Pages preview build — share the preview URL for review.

## Rules

- Never commit content directly on `main`
- Never use `draft: true` — branch isolation is enough
- Always run `astro check` before committing
- If updating existing content on staging, commit as `update: <slug>`
