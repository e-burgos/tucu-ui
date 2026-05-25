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
\`\`\`css
/* Import tucu-ui styles in your main CSS */
@import '@e-burgos/tucu-ui/styles';
\`\`\`

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
