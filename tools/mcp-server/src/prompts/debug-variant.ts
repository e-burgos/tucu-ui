// ─── Prompt: debug-variant ───────────────────────────────────────────────────

export function getDebugVariantPrompt(error: string, component?: string): string {
  return `You are debugging a tucu-ui runtime error.

ERROR: ${error}
${component ? `COMPONENT: ${component}` : ''}

COMMON CAUSE: Using invalid variant values. tucu-ui components crash with
"Cannot read properties of undefined (reading '0')" when given variants
that don't exist in the style map.

VALID VARIANTS:
- Button/IconButton: variant = "solid" | "ghost" | "transparent"
- Button/IconButton: size = "large" | "medium" | "small" | "mini" | "tiny"
- Button/IconButton: color = "primary" | "white" | "gray" | "success" | "info" | "warning" | "danger"
- Button/IconButton: shape = "rounded" | "pill" | "circle"
- Badge: variant = "solid" | "ghost" | "outline" | "soft"
- Badge: size = "tiny" | "small" | "medium" | "large"
- Input/Select: variant = "solid" | "ghost" | "transparent"
- Alert: variant = "error" | "success" | "info" | "warning"
- Checkbox: size = "sm" | "md" | "lg"
- Radio: size = "sm" | "md" | "lg" | "xl"
- Skeleton: animation = "pulse" | "wave" | "shimmer" | "none"
- Loader: variant = "blink" | "scaleUp" | "moveUp"

INVALID VALUES (will crash):
- variant="primary" (on Button) → use variant="solid" color="primary"
- variant="secondary" → use variant="ghost"
- variant="destructive" (on Button) → use variant="solid" color="danger"
- variant="outline" (on Button) → use variant="ghost"
- variant="default" (on Alert) → use variant="info"
- size="lg", "sm", "md", "xs" (on Button) → use full names

DEBUGGING STEPS:
1. Search for the invalid variant in your code
2. Check the component's valid variants above
3. Replace with the correct value
4. If the error is not variant-related, check:
   - Missing required props
   - Undefined data passed to component
   - Incorrect import path (must be '@e-burgos/tucu-ui')

Identify the problematic prop and provide the exact fix.`;
}
