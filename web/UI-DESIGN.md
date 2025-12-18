# UI Design System

This app uses a **TUI-inspired** (Terminal UI) aesthetic suited for developer tools. Clean, technical, monospace-forward.

## Core Principles

1. **Monospace everything technical** - labels, inputs, data values, addresses, hashes
2. **Sharp edges** - no border-radius on containers and buttons
3. **Lowercase actions** - "connect", "disconnect", "confirmed" not "Connect"
4. **Minimal decoration** - borders over shadows, flat over glossy

## Typography

| Context | Font | Size |
|---------|------|------|
| Technical labels | `font-mono` | `text-xs` |
| Form inputs | `font-mono` | default |
| Data values (addresses, hashes) | `font-mono` | varies |
| Prose/descriptions | `font-sans` | `text-xs` or `text-sm` |

## Status Indicators

```
Success:  ●  text-green-600 dark:text-green-500
Pending:  ◌  text-blue-500 animate-pulse
Error:    ×  text-destructive
```

## Card Pattern

```tsx
<div className="border border-border bg-card">
  {/* Header */}
  <div className="border-b border-border px-4 py-3 bg-muted/30">
    <h2 className="font-mono text-sm font-medium">Title</h2>
  </div>

  {/* Content */}
  <div className="p-4">...</div>

  {/* Footer (optional) */}
  <div className="border-t border-border px-4 py-3 bg-muted/20">...</div>
</div>
```

## Data Row Pattern

```tsx
<div className="flex justify-between gap-4 text-xs py-1.5 border-b border-border/50">
  <span className="text-muted-foreground">label</span>
  <span className="font-mono text-right break-all">value</span>
</div>
```

## Form Fields

- Labels: `className="font-mono text-xs"`
- Inputs: `className="font-mono"`
- Descriptions: `className="font-mono"` (for technical info)
- Nested groups (tuple, list): `border border-border p-4 bg-muted/10`

## Links

- Internal: `text-primary hover:underline`
- External: prefix with `→`, e.g., `→ explorer`

## Buttons

- Primary actions: default Button
- Secondary: `variant="outline" size="sm"` or `size="xs"`
- Destructive/remove: `variant="ghost" size="xs"` with `×`
- Text should be lowercase

## Collapsible Sections

Use native `<details>` with styled `<summary>`:

```tsx
<details className="border-t border-border">
  <summary className="px-4 py-3 cursor-pointer hover:bg-muted/30">
    <span className="text-xs text-muted-foreground uppercase">Section</span>
  </summary>
  <div className="px-4 pb-3">...</div>
</details>
```

## Colors

The primary color is amber/orange. Use semantic colors:

- `text-muted-foreground` for secondary text
- `text-destructive` for errors
- `bg-muted/10`, `bg-muted/20`, `bg-muted/30` for subtle backgrounds
- `border-border` for all borders
