# yinchuangsum-website

Personal website of **Yin Chuang Sum** — a static CTO/personal site built with Astro, deployed on Cloudflare Pages.

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Astro (pure `.astro` — **no** React/Vue/Svelte) |
| Deployment | Cloudflare Pages (static, `@astrojs/cloudflare` adapter) |
| Language | TypeScript |
| Styling | CSS custom properties, scoped `<style>` tags |
| Content | Astro content collections (blog, education, speaking, projects) |

## Design system

All tokens are defined as CSS custom properties in `src/styles/global.css`.

### Colors

| Token | Value | Role |
|-------|-------|------|
| `--bg` | #FAFAFA | Page background |
| `--surface` | #FDFDFD | Card surface, lifted containers |
| `--fg` | #273338 | Primary text, headings |
| `--muted` | #618764 | Secondary text, borders, tags, hover states |
| `--border` | #9CB080 | Hairline borders, code block tint |
| `--accent` | #2B5748 | CTAs, active states, bold structural elements |

Derived tokens: `--accent-soft` (accent at 14% opacity), `--fg-soft` (fg at 6% opacity).

### Typography
- Display & body: `Scope One` (fallback: system-ui, sans-serif)
- Code & labels: `JetBrains Mono` (fallback: ui-monospace, SFMono, Menlo, monospace)
- Headings use `--font-display`, mono for `.meta`, `.eyebrow`, `.num`, `.pill`, `.tag`, `.uses-ref`

### Spacing
- `--gap-xs`: 8px — small inline gaps, tag clusters
- `--gap-sm`: 12px — button groups, input-adjacent
- `--gap-md`: 20px — default inter-component gap
- `--gap-lg`: 32px — section gaps, grid gaps
- `--gap-xl`: 56px — major section breaks
- `--gap-2xl`: 96px — page section padding

Container: `--container` 1120px max-width, `--gutter` 32px padding.

### Radii
- `--radius`: 10px — default
- `--radius-lg`: 16px — cards, featured containers

### Constraints
- **Light mode only.** No dark mode. No auto theme switching.
- **No gradients.** Flat colors and semi-transparent overlays only.
- **Hairline borders.** Border color is `--border`.
- **Cards lift on hover** with `box-shadow: 0 4px 24px rgba(0,0,0,0.05)`.
- **Accent budget.** `--accent` is for CTAs and active states only. Do not apply accent to headings, body text, or decorative elements.
- **No pure white backgrounds.** Page bg is `--bg` (#FAFAFA), not #FFFFFF.
- **OKLch color space** for derived/interpolated colors where possible.

### Accessibility
- WCAG 2.2 AA contrast: minimum 4.5:1 for body text, 3:1 for large text.
- All interactive elements must have `:hover`, `:focus-visible`, and `:active` states.
- Focus rings must be visible (`outline: 2px solid var(--accent)` or similar).
- Skip link present at page start for keyboard navigation.
- Heading hierarchy: h1 → h2 → h3 only. Skip levels only for structural grouping.

### Writing Tone
Concise, professional, personal. Write for a technical audience. No marketing fluff. Use active voice. Avoid jargon where plain English suffices.

**Karpathy lens active by default.** When writing blog posts, event descriptions, project pages, course content, or any other site content, apply a karpathy mode — engineering realism, Software 2.0 framing, AI skepticism, "build to understand" ethos. Makes content resonate with builders who ship real systems, not hype.

### Do
- Use CSS custom properties for every token
- Prefer semantic token names over literal values
- Keep layouts airy with generous `--gap-*` spacing
- Use mono text for labels, dates, tags, code, and metadata
- Use 60ch max-width for prose/paragraphs
- Preserve responsive behavior across viewports
- Use `text-wrap: balance` on headings, `text-wrap: pretty` on paragraphs

### Don't
- Do not introduce warm/beige/pink/peach background tones
- Do not use pure white (#FFFFFF) for backgrounds
- Do not add gradients or dark mode
- Do not substitute system fonts for Scope One or JetBrains Mono
- Do not use accent color for decorative/non-interactive elements
- Do not flatten domain-specific content into generic card patterns
- Do not use raw hex values outside the 6-token palette
- Do not add color tokens without revisiting the entire system

### Quality Gates
1. All color values reference a CSS custom property — no raw hex in component code.
2. Text on background contrast ≥ 4.5:1 for body text, ≥ 3:1 for large text (18px+ bold or 24px+ regular).
3. Every interactive element has `:focus-visible` styling detectable by the user.
4. Headings follow a logical hierarchy without gaps (h1→h2→h3, no h1→h4).
5. Mono font is applied only to code, labels, metadata, tags — not prose body.
6. No horizontal overflow at viewport widths between 360px and 1920px.
7. No component uses a background color outside the token set.

## Routes

| Route | Description | Reference |
|-------|-------------|-----------|
| `/` | Now page — focus areas | `reference/home.html` |
| `/blog` | Blog listing — hero notes all posts hand-written, no AI | `reference/blog.html` |
| `/blog/[slug]` | Individual blog post | Content collection |
| `/projects` | Projects — commercial + open source | Custom (no reference) |
| `/speaking` | Speaking — upcoming + past | `reference/speaking.html` |
| `/uses` | Tools & setup | `reference/uses.html`

## Content guidelines

Per-content-type writing guides live in `guideline/`:

| File | Content type |
|------|-------------|
| `guideline/blog.md` | Blog posts |
| `guideline/course.md` | Education / courses |
| `guideline/event.md` | Speaking events |
| `guideline/project.md` | Projects |

When creating a new content collection, add a corresponding `guideline/<type>.md` file.

## ImageMagick

Resize images with ImageMagick using `magick input.jpg -resize <width>x <height> output.jpg`. Always preserve aspect ratio by omitting the height dimension: `magick input.jpg -resize 1000x output.jpg` scales width to 1000px and adjusts height proportionally. Do not use the `!` flag (forces exact dimensions, breaks ratio). Verify with `magick identify -format "%f: %wx%h\n" <file>`.

## Commands

| Command | Action |
|---------|--------|
| `npm run dev` | Start dev server |
| `npm run build` | Build to `dist/` |
| `npm run preview` | Preview production build |
| `npx astro check` | Type-check |

## Project structure

```
src/
├── components/        # Reusable .astro components
│   ├── EventCard.astro
│   ├── Hero.astro
│   ├── LogRow.astro
│   ├── ProjectCard.astro
│   └── SubscribeBlock.astro
├── content/
│   ├── blog/          # Blog content collection (markdown)
│   ├── education/     # Course content collection
│   ├── projects/      # Project content collection
│   └── speaking/      # Speaking event content collection
├── layouts/           # Base layout wrappers
├── pages/             # Route pages
│   ├── blog/[slug].astro
│   ├── blog.astro
│   ├── index.astro
│   ├── projects.astro
│   ├── speaking.astro
│   └── uses.astro
└── styles/
    └── global.css     # Design tokens + base styles
```

## Skills

| Skill | Role |
|-------|------|
| `.agents/skills/draft-on-staging` | Draft any content on the `staging` branch — read `guideline/<type>.md` for conventions |
| `.agents/skills/publish-to-main` | Selectively promote content from `staging` to `main` for production deploy |
| `.agents/skills/create-astro-component` | Scaffold new `.astro` components |

Content conventions live in `guideline/` — each content type has its own file.

## Branching & publishing

The site deploys via **Cloudflare Pages** — pushing to `main` triggers an automatic production build and deploy. All content is drafted on the `staging` branch, which gets its own Cloudflare preview URL.

| Branch | Purpose | Deploys to |
|--------|---------|------------|
| `main` | Production — live site | yinchuangsum.xyz |
| `staging` | Drafting, preview, review | Cloudflare preview URL |

### Lifecycle

1. **Draft** → switch to `staging`, sync with main, write content per `guideline/<type>.md`, validate with `npx astro check`, commit `draft: <slug>`, push `staging`
2. **Review** → preview via Cloudflare preview URL, iterate if needed
3. **Publish** → on `main`, cherry-pick specific content from staging via file-level checkout (`git checkout staging -- src/content/<type>/<slug>`), validate + build, commit `publish: <slug>`, push `main` → live
4. **Sync** → merge `main` back into `staging` after each publish

Use `.agents/skills/draft-on-staging` and `.agents/skills/publish-to-main` for automated workflows.

## Obsidian

| Key | Path |
|-----|------|
| Vault | `/Users/yinchuangsum/obsidian/Knowledge-Base` |
| Blog ideas directory | `BlogIdeas/` (relative to vault) |
| Idea tracker file | `BlogIdeas/tracker.md` (relative to vault) |

All Obsidian-related skills and subagents read these paths from here.
Update only this section if the vault moves.
