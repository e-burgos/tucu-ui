// ─── Resource: Best Practices ────────────────────────────────────────────────

export function getBestPracticesContent(): string {
  return `# Best Practices — @e-burgos/tucu-ui

## DO's

### Imports
- ALWAYS import from \`'@e-burgos/tucu-ui'\` (single entry point)
- Use named imports: \`import { Button, Input, Form } from '@e-burgos/tucu-ui'\`

### Variants
- Button: variant="solid" | "ghost" | "transparent"
- Button: size="large" | "medium" | "small" | "mini" | "tiny"
- Badge: variant="solid" | "ghost" | "outline" | "soft"
- Input/Select: variant="ghost" | "solid" | "transparent"
- Alert: variant="info" | "warning" | "error" | "success"

### Routing
- Use \`ReactRouter\` from \`@e-burgos/tucu-ui\` for all router hooks
- Define routes via \`menuItems\` prop on ThemeProvider
- Use \`hide: true\` for routes that shouldn't appear in navigation

### Theming
- Use semantic tokens (bg-primary, text-secondary, etc.)
- Never hardcode colors — use theme-aware Tailwind classes
- Use \`useTheme()\` for runtime theme changes

### Forms
- Use \`<Form />\` component instead of raw react-hook-form
- Define validation in \`validationSchema\` prop (centralized)
- Use \`useFormContext()\` in child components for form methods
- All inputs auto-register when placed inside Form with \`name\` prop

### Performance
- Memoize menu items with useMemo when they depend on state
- Use lazy loading for route components
- Prefer \`InputSearcher\` over custom dropdown implementations

## DON'Ts (Anti-Patterns)

### Variant Crashes
\`\`\`tsx
// NEVER — These crash at runtime
<Button variant="primary">...</Button>     // Use variant="solid" color="primary"
<Button variant="outline">...</Button>     // Use variant="ghost"
<Button variant="destructive">...</Button> // Use variant="solid" color="danger"
<Button size="lg">...</Button>             // Use size="large"
<Button size="sm">...</Button>             // Use size="small"
<Badge variant="secondary">...</Badge>     // Use variant="ghost"
<Alert variant="destructive">...</Alert>   // Use variant="error"
\`\`\`

### Import Errors
\`\`\`tsx
// NEVER — Direct react-router-dom import
import { useNavigate } from 'react-router-dom';

// ALWAYS — Use ReactRouter namespace
import { ReactRouter } from '@e-burgos/tucu-ui';
const navigate = ReactRouter.useNavigate();
\`\`\`

### Hardcoded Colors
\`\`\`tsx
// NEVER — Won't adapt to dark mode or presets
<div className="bg-blue-500 text-white">...</div>

// ALWAYS — Semantic tokens
<div className="bg-primary text-primary-foreground">...</div>
\`\`\`

### Custom Dropdowns
\`\`\`tsx
// NEVER — Don't create custom expandable lists
// ALWAYS — Use Select or InputSearcher from the library
<Select options={options} variant="ghost" label="Choose" />
<InputSearcher options={options} variant="ghost" label="Search" />
\`\`\`

### Direct Form Control
\`\`\`tsx
// NEVER — Don't use raw useState for form fields
const [email, setEmail] = useState('');
<input value={email} onChange={e => setEmail(e.target.value)} />

// ALWAYS — Use Form component
<Form onSubmit={handleSubmit}>
  <Input name="email" label="Email" />
</Form>
\`\`\`

## Common Mistakes & Fixes
| Mistake | Error | Fix |
|---------|-------|-----|
| variant="primary" on Button | Cannot read properties of undefined | Use variant="solid" color="primary" |
| size="lg" on Button | Cannot read properties of undefined | Use size="large" |
| Import from 'react-router-dom' | Module conflicts | Use ReactRouter from '@e-burgos/tucu-ui' |
| Hardcoded colors | Theme doesn't apply | Use semantic tokens |
| Missing name on Input in Form | Field not registered | Always provide name prop |
`;
}
