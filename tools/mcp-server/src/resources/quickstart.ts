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

## Complete From-Scratch Setup (Vite)

Every step to configure a brand-new app so tucu-ui's styles, theming and
settings persistence work end to end:

\`\`\`bash
# 1. Scaffold and install
pnpm create vite@latest my-app --template react-ts
cd my-app
pnpm add @e-burgos/tucu-ui
pnpm add -D tailwindcss @tailwindcss/vite   # ONLY for Option B below
\`\`\`

\`\`\`ts
// 2. vite.config.ts — ONLY for Option B (own Tailwind)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({ plugins: [react(), tailwindcss()] });
\`\`\`

\`\`\`css
/* 3. src/index.css — pick Option A or B from the section below */
\`\`\`

\`\`\`tsx
// 4. src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
\`\`\`

\`\`\`tsx
// 5. src/App.tsx — ThemeProvider IS the router; pages hang off menuItems
import { ThemeProvider, LucideIcons } from '@e-burgos/tucu-ui';

function Home() {
  return <div>Home</div>;
}

export default function App() {
  return (
    <ThemeProvider
      showSettings // settings drawer: mode, layout, colors, backgrounds
      logo={{ name: 'My', secondName: 'App' }}
      menuItems={[
        { name: 'Home', path: '/', icon: <LucideIcons.Home />, component: <Home /> },
      ]}
    />
  );
}
\`\`\`

**Persistence**: every choice the user makes in the settings drawer (mode,
layout, color presets, background, direction, language) is stored in
localStorage under the \`theme-storage\` key and restored automatically on
reload — per theme variant. Do NOT pass \`mode\`, \`layout\` or \`background\`
props to ThemeProvider unless you want to pin them: props re-apply on every
page load and override whatever the user saved.

## Tailwind CSS Setup

There are TWO ways to bring in tucu-ui's CSS — pick ONE, never both.

**Option A — \`./styles\` (no Tailwind of your own)**
Use this if your app doesn't run its own Tailwind build.
\`\`\`css
@import '@e-burgos/tucu-ui/styles';
\`\`\`
This ships tokens + base/component styles + all utilities, prefixed (\`tucu-text-h1\`, etc.)
and unprefixed legacy aliases for backward compatibility. It also loads the bundled
Inter + JetBrains Mono variable fonts (woff2 files resolved relative to the stylesheet).

**Option B — \`./theme\` (you already run your own Tailwind v4)**
Use this if your app has its own \`@import 'tailwindcss'\` — do NOT combine it with \`./styles\`,
that duplicates Tailwind's base layer and causes conflicts.
\`\`\`css
@import 'tailwindcss';
@import '@e-burgos/tucu-ui/theme';
@import '@e-burgos/tucu-ui/fonts'; /* optional — see below */
@source '../../node_modules/@e-burgos/tucu-ui/dist';
\`\`\`
\`./theme\` carries \`@theme\` tokens, base/component styles in Tailwind's native
\`@layer base\`/\`@layer components\`, \`tucu-\` prefixed \`@utility\` registrations, AND the
component-support CSS (DataTable tokens, carousel skin, prism syntax colors, themed
scrollbars, range slider, decorative backgrounds). Utilities are generated by YOUR
Tailwind — the \`@source\` line pointing at the package is required, or component
class names will silently produce no CSS.

**Fonts are opt-in on this path**: \`@import '@e-burgos/tucu-ui/fonts'\` loads the bundled
Inter + JetBrains Mono variable fonts (~1 MB of woff2). Skip it if you load fonts yourself —
the tokens reference the families with system fallbacks either way.

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
