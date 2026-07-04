# Course (Education) guidelines

## File structure

Courses live in `src/content/education/`. Each course is a single `.md` file:

```
src/content/education/
└── my-course-slug.md
```

## Slug

The filename (minus `.md`) is the URL slug. Kebab-case, check for uniqueness before creating.

## Frontmatter

| Field | Type | Required | Convention |
|-------|------|----------|-----------|
| `title` | `string` | yes | `"Title Case"` |
| `tagline` | `string` | no | Mono uppercase subtitle on cards: `"Build a chatbot in a day"` |
| `description` | `string` | yes | Card body text (1-2 sentences) |
| `outline` | `string` | yes | Single-line summary — displayed in accent box on card |
| `status` | `"active" \| "upcoming" \| "past"` | yes | Controls pill styling and homepage visibility |
| `cohort` | `string` | yes | `""` when no active cohort |
| `order` | `number` | yes | Sort order on listing (1, 2, 3...) |
| `price` | `string` | no | e.g. `"MYR 799"` — omit if free or TBD |
| `duration` | `string` | no | e.g. `"1 day"`, `"4 weeks"` |
| `format` | `string` | no | e.g. `"in-person"`, `"remote"`, `"hybrid"` |
| `lead` | `string` | no | Hero paragraph displayed under the title on the detail page |
| `syllabusIntro` | `string` | no | Lead text that appears above the module list |
| `audience` | `string` | no | "Who this is for" section |
| `instructor` | `string` | no | Instructor bio paragraph |
| `pricingNote` | `string` | no | Pricing card body text |
| `needsNote` | `string` | no | Extra note below the needs/prerequisites list |
| `prerequisitesLead` | `string` | no | Lead paragraph before the needs list |
| `outcomes` | `{label, desc}[]` | no | Key outcomes — each with a bold label and description |
| `modules` | `{title, desc}[]` | no | Syllabus modules (auto-numbered on page) |
| `needs` | `string[]` | no | Checkmark-bullet prerequisites list |

Example:

```yaml
title: "My New Course"
tagline: "Short tagline"
description: "What this course covers."
outline: "Summary for accent box on card."
status: "upcoming"
cohort: ""
order: 3
price: "MYR 1,099"
duration: "1 day"
format: "in-person"
lead: "By the end of the day, you will..."
outcomes:
  - label: "Skill name"
    desc: "What you will learn"
modules:
  - title: "Module title"
    desc: "Module description."
needs:
  - "Requirement one"
```

## Body

The body of course markdown files is empty. All content goes in frontmatter fields.

## Status workflow

| Status | Behaviour |
|--------|-----------|
| `active` | Visible on listings and detail page. Shown on homepage. |
| `upcoming` | Visible with "Upcoming" pill. Shown on detail page. |
| `past` | Visible on listing page (archived section). Hidden from homepage. |

To hide a course entirely, delete the file.

## Validate

```bash
npx astro check    # Type-check before committing
```
