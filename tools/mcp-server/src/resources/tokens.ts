// ─── Resource: Design Tokens ────────────────────────────────────────────────

export function getTokensContent(): string {
  return `# Design Tokens — @e-burgos/tucu-ui

## Architecture
Three layers:
1. **CSS Custom Properties** (\`--color-tucu-ui-*\`) — primitive color tokens
2. **Tailwind v4 Theme** (\`@theme\`) — maps tokens to utility classes
3. **Zustand Store** (\`useTheme\`) — runtime state for mode, preset, layout, direction

## Semantic Tokens (Tailwind Classes)

| Token | Light Default | Dark Default | Usage |
|-------|--------------|--------------|-------|
| \`bg-primary\` | #0052ff | #578bfa | Primary actions, emphasis |
| \`text-primary\` | #0052ff | #578bfa | Primary text, links |
| \`text-primary-foreground\` | #ffffff | #ffffff | Text on primary backgrounds |
| \`bg-secondary\` | #eef0f3 | #282b31 | Card backgrounds, surfaces |
| \`text-secondary\` | #4b5563 | #9ca3af | Secondary text, descriptions |
| \`bg-accent\` | #f7d21a | #936000 | Warnings, highlights |
| \`bg-background\` | #ffffff | #0a0b0d | Page base background |
| \`bg-light-dark\` | subtle light | subtle dark | Secondary surfaces |
| \`bg-destructive\` | red variant | red variant | Error, danger backgrounds |
| \`text-muted-foreground\` | gray | gray | Muted helper text |
| \`border-border\` | light gray | dark gray | Default border color |

## Usage Rules
\`\`\`tsx
// CORRECT — Uses semantic tokens, adapts to theme
<div className="bg-primary text-primary-foreground p-4 rounded-lg">Themed</div>
<div className="bg-secondary text-secondary-foreground p-4">Card Surface</div>
<p className="text-muted-foreground text-sm">Helper text</p>

// INCORRECT — Hardcoded colors, ignores theme
<div className="bg-blue-500 text-white p-4">Won't adapt</div>
\`\`\`

## Color Presets (34 total)

### Standard Light Presets (11)
Blue (default), Green, Orange, Red, Pink, Purple, Indigo, Teal, Yellow, Chartreuse, Gray

### Standard Dark Presets (11)
Dark Blue, Dark Green, Dark Orange, Dark Red, Dark Pink, Dark Purple, Dark Indigo, Dark Teal, Dark Yellow, Dark Chartreuse, Dark Gray

### macOS System Color Presets (12)
| Preset | Value | Role |
|--------|-------|------|
| MacOSPrimary | #007aff | systemBlue light |
| MacOSDarkPrimary | #0a84ff | systemBlue dark |
| MacOSSecondary | #ffffff | contentBackground |
| MacOSDarkSecondary | #2c2c2e | elevated surface |
| MacOSAccent | #ff9500 | systemOrange light |
| MacOSDarkAccent | #ff9f0a | systemOrange dark |
| MacOSMuted | #6c6c70 | secondaryLabel |
| MacOSDarkMuted | #aeaeb2 | systemGray2 dark |
| MacOSLightBg | #f2f2f7 | systemGray6 |
| MacOSDarkBg | #1c1c1e | systemGray5 dark |
| MacOSLightDark | #e5e5ea | systemGray5 light |
| MacOSDarkLightDark | #3a3a3c | systemGray3 dark |

## Primitive Color Tokens
~170 tokens across 13 spectrums x 13 stops:
\`--color-tucu-ui-{spectrum}-{stop}\`

**Spectrums:** red, orange, amber, yellow, chartreuse, green, teal, cyan, blue, indigo, violet, purple, fuchsia

## Breakpoints
| Name | Value |
|------|-------|
| xs | 480px |
| sm | 640px |
| md | 768px |
| lg | 1024px |
| xl | 1280px |
| 2xl | 1440px |
| 3xl | 1780px |
| 4xl | 2160px |

## Typography
- **Base Font**: Roboto (Google Fonts, loaded automatically)
- **Typography component**: 30+ semantic tags
- **Tags**: h1-h6, p, span, code, kbd, headline, body, label-1, label-2, caption, legal
- **Colors**: default, primary, secondary, dark, light, muted, success, warning, error
`;
}
