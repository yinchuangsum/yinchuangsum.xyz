# Event (Speaking) guidelines

## File structure

Events live in `src/content/speaking/`. Each event is a single `.md` file:

```
src/content/speaking/
└── my-talk-slug.md
```

## Slug

The filename (minus `.md`) is used as the entry ID. Kebab-case, check for uniqueness.

## Frontmatter

| Field | Type | Required | Convention |
|-------|------|----------|-----------|
| `title` | `string` | yes | `"Talk Title"` |
| `description` | `string` | yes | Short lead text — appears on the EventCard |
| `date` | `date` | yes | `YYYY-MM-DD`. Controls sort order on the speaking page. |
| `location` | `string` | yes | Format: `"Conference · City, Country"` |
| `category` | `"upcoming" \| "past"` | yes | Sections on the speaking page |
| `tags` | `string[]` | no | Capitalised: `["Kotlin", "Architecture"]`. Mapped to pill/tag on EventCard. |
| `virtual` | `boolean` | no | `true` prepends a "Virtual" pill tag on the card. Default `false`. |
| `primaryAction` | `{label, href}` | no | CTA button — usually "Register" with a URL |
| `secondaryAction` | `{label, href, variant}` | no | Secondary action — `variant` can be `"secondary"` or `"ghost"` (default) |

Example:

```yaml
title: "Building AI Agents in Production"
description: "Lessons from deploying LLM-based agents at scale."
date: 2026-09-15
location: "KotlinConf · Copenhagen, Denmark"
category: "upcoming"
tags: ["AI", "Architecture"]
virtual: false
primaryAction:
  label: "Register"
  href: "https://ticket.example.com"
secondaryAction:
  label: "Event Details"
  href: "https://conf.example.com"
  variant: "ghost"
```

## Body

Body content is optional. If provided, it renders on the event detail page (`/speaking/<id>`). Keep it concise — 2-3 paragraphs, describing the talk content or takeaways.

## Prop mapping to EventCard

| Collection field | EventCard.astro prop | Notes |
|---|---|---|
| `tags` | `tags: [{ label: t } for each]` | If `virtual: true`, prepend `{ label: "Virtual", variant: "pill" }` |
| `primaryAction` | `primaryAction: { label, href }` | Passed directly as-is |
| `secondaryAction` | `secondaryAction: { label, href, variant }` | `variant` defaults to `"ghost"` if not set |

The speaking page at `src/pages/speaking.astro` handles this mapping.

## Category workflow

| Category | Section on speaking page |
|----------|--------------------------|
| `upcoming` | Appears in "Upcoming" section (first) |
| `past` | Appears in "Archive" section (second) |

Events are sorted by date descending within each section.

## Validate

```bash
npm run dev        # Preview at localhost:4321
npx astro check    # Type-check before committing
```
