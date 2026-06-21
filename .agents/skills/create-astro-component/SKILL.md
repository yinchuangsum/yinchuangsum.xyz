---
name: create-astro-component
description: Scaffold a new reusable .astro component following project conventions. Use when user wants to create, build, or add a new Astro component.
---

# Create Astro Component

## Conventions

From existing components in `src/components/`:

| Convention | Rule |
|-----------|------|
| Filename | PascalCase, `.astro` extension |
| Props | `export interface Props { ... }` |
| Destructure | `const { ... } = Astro.props;` with defaults |
| Optional elements | `{condition && <element>}` |
| Lists | `{array.map(item => ...)}` |
| Style | Scoped `<style>` block, kebab-case classes |
| Tokens | CSS custom properties from `src/styles/global.css` |
| No imports | Components don't import global.css (layout handles it) |

## Template

```astro
---
export interface Props {
  title: string;
  subtitle?: string;
}

const { title, subtitle } = Astro.props;
---

<div class="component-name">
  <h3>{title}</h3>
  {subtitle && <p class="subtitle">{subtitle}</p>}
  <slot />
</div>

<style>
  .component-name {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    padding: 28px;
    display: flex;
    flex-direction: column;
    gap: var(--gap-sm);
  }
  .component-name:hover {
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.05);
  }
  .subtitle {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--muted);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
</style>
```

## Workflow

1. Determine filename: PascalCase (`MyNewFeature.astro`)
2. Create in `src/components/`
3. Define `Props` interface matching data shape
4. Destructure with sensible defaults
5. Write template using design tokens
6. Add scoped `<style>` with CSS custom properties
7. Use `.btn`, `.pill`, `.tag`, `.card` from global.css for common patterns
