// ─── Prompt: performance-review ──────────────────────────────────────────────

export function getPerformanceReviewPrompt(code: string): string {
  return `You are reviewing React code that uses @e-burgos/tucu-ui for performance issues.

CODE:
\`\`\`tsx
${code}
\`\`\`

PERFORMANCE CHECKLIST:

### 1. Unnecessary Re-renders
- Are menuItems defined outside component or memoized with useMemo?
- Are callback functions wrapped in useCallback?
- Are complex objects passed as props stable references?
- Is useTheme() destructured to only needed properties?

### 2. Bundle Size
- Import only needed components: \`import { Button, Input } from '@e-burgos/tucu-ui'\`
- Library supports tree-shaking — named imports are efficient
- LucideIcons are tree-shaken automatically

### 3. Charts (Recharts)
- Data arrays memoized with useMemo?
- ResponsiveContainer has explicit height?
- Large datasets (>500 points): use isAnimationActive={false}
- Line charts with many points: use dot={false}

### 4. Forms
- Form defaultValues defined outside render or memoized?
- validationSchema defined outside render?
- Expensive validation functions not running on every keystroke?
- Using mode: 'onBlur' or 'onSubmit' for complex forms?

### 5. Lists & Tables
- Large lists use virtualization?
- Table maxRows prop set to limit DOM nodes?
- Key prop on mapped elements?

### 6. Images
- Using Image component with lazy loading?
- Appropriate sizes and formats?
- Priority flag only on above-the-fold images?

### 7. Route Components
- Route components lazy-loaded with React.lazy()?
- Suspense boundaries around lazy components?

### 8. Theme Store
- useTheme() selectors granular (not subscribing to entire store)?
- Theme operations (setMode, setLayout) not called in render?

COMMON ANTI-PATTERNS:
\`\`\`tsx
// BAD: menuItems recreated every render
const App = () => {
  const menuItems = [{ name: 'Home', path: '/', component: <Home /> }]; // new array each render
  return <ThemeProvider menuItems={menuItems} />;
};

// GOOD: stable reference
const menuItems = [{ name: 'Home', path: '/', component: <Home /> }];
const App = () => <ThemeProvider menuItems={menuItems} />;

// BAD: inline object in props
<Button style={{ marginTop: 10 }}>...</Button>

// GOOD: stable reference or Tailwind class
<Button className="mt-2.5">...</Button>
\`\`\`

Identify all performance issues and provide specific fixes with code.`;
}
