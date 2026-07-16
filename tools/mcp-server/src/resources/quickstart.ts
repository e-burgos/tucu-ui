// ─── Resource: Quick Start ───────────────────────────────────────────────────

export function getQuickStartContent(): string {
  return `# Quick Start — @e-burgos/tucu-ui

## Installation
\`\`\`bash
pnpm add @e-burgos/tucu-ui
# or
npm install @e-burgos/tucu-ui
\`\`\`

## Peer Dependencies
\`\`\`bash
pnpm add react react-dom tailwindcss
\`\`\`

## Setup
\`\`\`tsx
import { ThemeProvider, LucideIcons } from '@e-burgos/tucu-ui';

function App() {
  return (
    <ThemeProvider
      showSettings
      logo={{ name: 'My', secondName: 'App' }}
      menuItems={[
        { name: 'Home', path: '/', icon: <LucideIcons.Home />, component: <Home /> },
        { name: 'About', path: '/about', icon: <LucideIcons.Info />, component: <About /> },
      ]}
    />
  );
}
\`\`\`

## First Component
\`\`\`tsx
import { Button } from '@e-burgos/tucu-ui';

<Button variant="solid" size="medium" color="primary">
  Click me
</Button>
\`\`\`

## First Form
\`\`\`tsx
import { Form, Input, Button } from '@e-burgos/tucu-ui';

<Form
  onSubmit={(data) => console.log(data)}
  useFormProps={{ defaultValues: { name: '', email: '' } }}
  className="space-y-4"
>
  <Input name="name" label="Name" />
  <Input name="email" label="Email" type="email" />
  <Button type="submit" variant="solid" size="medium">Submit</Button>
</Form>
\`\`\`

## Theme Control
\`\`\`tsx
import { useTheme, LAYOUT_OPTIONS } from '@e-burgos/tucu-ui';

const { mode, setMode, setLayout } = useTheme();
setMode('dark');
setLayout(LAYOUT_OPTIONS.ADMIN);
\`\`\`

## Navigation
\`\`\`tsx
import { ReactRouter } from '@e-burgos/tucu-ui';

const navigate = ReactRouter.useNavigate();
navigate('/users');
\`\`\`

## Important Warnings
- NEVER use variant="primary" or "outline" on Button — causes runtime crash
- NEVER use size="lg" or "sm" — use "large", "medium", "small", "mini", "tiny"
- ALWAYS import from '@e-burgos/tucu-ui' (single entry point)
- ALWAYS use ReactRouter from tucu-ui, never import react-router-dom directly
- Invalid variants cause: "Cannot read properties of undefined (reading '0')"

## Tailwind CSS Setup

There are TWO ways to bring in tucu-ui's CSS — pick ONE, never both.

**Option A — \`./styles\` (no Tailwind of your own)**
Use this if your app doesn't run its own Tailwind build.
\`\`\`css
@import '@e-burgos/tucu-ui/styles';
\`\`\`
This ships tokens + base/component styles + all utilities, prefixed (\`tucu-text-h1\`, etc.)
and unprefixed legacy aliases (\`text-h1\`, etc.) for backward compatibility.

**Option B — \`./theme\` (you already run your own Tailwind v4)**
Use this if your app has its own \`@import 'tailwindcss'\` — do NOT combine it with \`./styles\`,
that duplicates Tailwind's base layer and causes conflicts.
\`\`\`css
@import 'tailwindcss';
@import '@e-burgos/tucu-ui/theme';
@source '../../node_modules/@e-burgos/tucu-ui/dist';
\`\`\`
\`./theme\` is tokens-only: \`@theme\` variables + base/component styles re-scoped to Tailwind's
native \`@layer base\`/\`@layer components\` + utilities registered via \`@utility\` — all prefixed
with \`tucu-\` (e.g. \`tucu-text-h1\`, \`tucu-animation-delay-200\`). No legacy unprefixed aliases
in this path, so it never collides with your own utility classes regardless of import order.

## Project Structure (Standalone)
\`\`\`
src/
├── App.tsx           ← ThemeProvider + menuItems
├── pages/
│   ├── Home.tsx
│   ├── Users.tsx
│   └── Settings.tsx
├── components/       ← Shared components
└── main.tsx          ← Entry point
\`\`\`
`;
}
