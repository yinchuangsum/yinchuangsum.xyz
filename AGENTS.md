# yinchuangsum-website

Personal website of **Yin Chuang Sum** — a static CTO/personal site built with Astro, deployed on Cloudflare Pages.

## Stack

| Layer | Choice |
|-------|--------|
| Framework | Astro (pure `.astro` — **no** React/Vue/Svelte) |
| Deployment | Cloudflare Pages (static, `@astrojs/cloudflare` adapter) |
| Language | TypeScript |
| Styling | CSS custom properties, scoped `<style>` tags |
| Content | Astro content collections (blog) |

## Design system

All tokens are defined as CSS custom properties in `src/styles/global.css`.

| Token | Value | Role |
|-------|-------|------|
| `--bg` | #FAFAFA | Page background |
| `--surface` | #FDFDFD | Card surface |
| `--fg` | #273338 | Primary text |
| `--muted` | #618764 | Secondary text |
| `--border` | #9CB080 | Hairline borders |
| `--accent` | #2B5748 | CTAs, active states |

**Typography:** Scope One (display/body), JetBrains Mono (code/labels) — loaded from Google Fonts.

**Constraints:**
- Light mode only, no dark mode
- No gradients
- Earthy green palette
- Clean, high-contrast developer documentation feel
- Hairline borders, subtle card shadows on hover

## Routes

| Route | Description | Reference |
|-------|-------------|-----------|
| `/` | Now page — focus areas | `reference/home.html` |
| `/blog` | Blog listing + subscribe | `reference/blog.html` |
| `/blog/[slug]` | Individual blog post | Content collection |
| `/speaking` | Speaking — upcoming + past | `reference/speaking.html` |
| `/uses` | Tools & setup | `reference/uses.html` |

## Design contract

The `reference/` directory contains exported HTML files from a design handoff (schema: `open-design.design-manifest.v1`).

**Rules:**
- Each HTML screen maps to its own Astro route (screen-file-first)
- `index.html` is a launcher/overview — not a combined final UI
- Extract tokens before writing components
- Match layout geometry, typography scale, spacing rhythm, colors, border radii, shadows, motion timing, and interactive states
- Preserve responsive behavior across 9 viewports (360×800 → 1920×1080)
- No introducing warm/beige/pink background washes
- No substituting default theme colors or typography
- No flattening domain-specific modules into generic cards

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
├── content/blog/      # Blog content collection (markdown)
├── layouts/           # Base layout wrappers
├── pages/             # Route pages
│   └── blog/[slug].astro
└── styles/
    └── global.css     # Design tokens + base styles
```

## Skills

- `.agents/skills/astro-framework` — Astro best practices (installed)
- `.agents/skills/*` — mattpocock/skills (29 agent skills installed)
