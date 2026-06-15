# Brand Spec — Personal CTO Website

Extracted from user brief. Strictly light mode, earthy green palette.

## Color Tokens (OKLch + hex)

| Token | OKLch | Hex | Role |
|-------|-------|-----|------|
| `--bg` | oklch(98% 0.002 100) | #FAFAFA | Page background — crisp off-white |
| `--surface` | oklch(99% 0.001 100) | #FDFDFD | Cards, lifted containers |
| `--fg` | oklch(25% 0.02 200) | #273338 | Primary text, headings, footer bg |
| `--muted` | oklch(55% 0.08 150) | #618764 | Secondary text, borders, tags, hover |
| `--border` | oklch(70% 0.08 140) | #9CB080 | Subtle borders, highlights, code blocks |
| `--accent` | oklch(35% 0.08 160) | #2B5748 | Primary buttons, active states, bold structural |

## Typography

- **Display & Body:** Scope (fallback: system-ui, sans-serif)
- **Mono / Code / Tags:** JetBrains Mono (fallback: ui-monospace, SFMono, Menlo, monospace)

## Layout Posture

- Light, airy, high-contrast developer documentation feel
- Hairline borders using `--border` (#9CB080)
- Cards lift with 1px `--border` and subtle shadow
- Radius: 8px default, 12px for featured cards
- Accent budget: deep forest green used for primary CTAs and active states only
- No gradients, no dark mode
- Code blocks in `--border` tinted background

## Surface Rules

- Page background: #FAFAFA (never pure white)
- Card surface: #FDFDFD (slightly lighter, almost imperceptible lift)
- Footer background: #273338 (dark slate, inverted text)
- Code blocks: #9CB080 at 0.08 opacity tint (or solid #F5F7F4)
- Tags: solid background #E8F0E8 (muted fern at ~0.10 over bg), text #618764
