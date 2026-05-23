// ─── Prompt: create-component ────────────────────────────────────────────────

export function getCreateComponentPrompt(component: string, context?: string): string {
  return `You are generating code for the @e-burgos/tucu-ui component library.

COMPONENT: ${component}
${context ? `CONTEXT: ${context}` : ''}

RULES:
1. Import ONLY from '@e-burgos/tucu-ui'
2. Use correct variants:
   - Button: variant="solid" | "ghost" | "transparent"
   - Button: size="large" | "medium" | "small" | "mini" | "tiny"
   - Button: color="primary" | "white" | "gray" | "success" | "info" | "warning" | "danger"
   - Button: shape="rounded" | "pill" | "circle"
   - Badge: variant="solid" | "ghost" | "outline" | "soft"
   - Input/Select: variant="ghost" | "solid" | "transparent"
   - Alert: variant="info" | "warning" | "error" | "success"
3. NEVER use: variant="primary", "outline", "destructive", size="lg", "sm", "md", "xs"
4. Use LucideIcons for icons: import { LucideIcons } from '@e-burgos/tucu-ui'

Generate a complete, ready-to-use React component that uses ${component} with:
- Correct import statement
- TypeScript types
- Proper props with valid variants
- A brief comment explaining usage

If unsure about the exact props, generate the safest possible code using only documented variants.`;
}
