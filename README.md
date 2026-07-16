# Tucu UI

A modern React component library built with TypeScript and Tailwind CSS v4 — automatic layouts, macOS design systems (Sonoma & Tahoe), advanced routing (Standalone & MFE), form system, charts, 5000+ icons, blockchain components, and WCAG 2.1 AA compliance.

**📚 [Live Docs](https://tucu-ui.netlify.app/) · [NPM](https://www.npmjs.com/package/@e-burgos/tucu-ui)**

---

## Features

| Feature | Description | Docs |
|---------|-------------|------|
| 🎨 **Layout System** | Classic, Minimal, None, macOS Sonoma & Tahoe | [Layout](https://tucu-ui.netlify.app/design-system/layout-system) |
| 🎭 **Theming** | 34+ color presets, dark/light, RTL, CSS vars | [Theming Guide](https://tucu-ui.netlify.app/design-system/theming-guide) |
| 📝 **Forms** | React Hook Form integration, validation, all input types | [Form System](https://tucu-ui.netlify.app/form-system/example) |
| 💻 **macOS Sonoma** | Translucent sidebar, toolbar, vibrancy effects | [Sonoma](https://tucu-ui.netlify.app/macos/sonoma) |
| 🪟 **macOS Tahoe** | Liquid Glass dock, frosted panels, 9 accent bundles | [Tahoe](https://tucu-ui.netlify.app/macos/tahoe) |
| 🧩 **UI Components** | 95+ components: modals, drawers, cards, tooltips… | [Components](https://tucu-ui.netlify.app/components/ui-components) |
| ⌨️ **Input Components** | All form inputs with validation and accessibility | [Inputs](https://tucu-ui.netlify.app/components/inputs-components) |
| 📊 **Charts** | BarChart, LineChart, AreaChart, PieChart, Radar, Composed | [Charts](https://tucu-ui.netlify.app/components/charts) |
| 🪙 **Blockchain** | DeFi, NFT, crypto wallet components | [Blockchain](https://tucu-ui.netlify.app/components/blockchain) |
| 🎯 **Icons** | 5000+ Lucide + 97 custom (crypto, social, UI) | [Icons](https://tucu-ui.netlify.app/features/icons-system) |
| 🌐 **Routing** | Standalone (auto-gen) & MFE (explicit) patterns | [Routing](https://tucu-ui.netlify.app/features/routing-system) |
| ♿ **Accessibility** | WCAG 2.1 AA, ARIA, keyboard nav | [A11y](https://tucu-ui.netlify.app/features/accessibility) |
| 🪝 **Hooks & Utils** | useTheme, useBreakpoint, and more | [Hooks](https://tucu-ui.netlify.app/features/hooks-utilities) |
| 🎨 **Tailwind CSS v4** | All utilities pre-configured, zero extra setup | [Tailwind](https://tucu-ui.netlify.app/tailwind-utilities/layout-utilities) |
| 🤖 **MCP Server** | AI-agent integration via Model Context Protocol | [MCP Server](https://tucu-ui.netlify.app/mcp-server) |

---

## Installation

```bash
npm install @e-burgos/tucu-ui
# or
pnpm add @e-burgos/tucu-ui
```

In your main CSS file:

```css
@import '@e-burgos/tucu-ui/styles';
```

> Includes full Tailwind CSS v4 — no additional Tailwind setup required.

### Already using Tailwind CSS v4 in your project?

Don't import `./styles` alongside your own `@import 'tailwindcss'` — that
runs two separate Tailwind builds in the same page, and their layers can
override each other unpredictably. Use `./theme` instead: tokens and
component styles only, no bundled Tailwind, so your own build generates
every utility class (yours and Tucu UI's) from one instance.

```css
@import 'tailwindcss';
@import '@e-burgos/tucu-ui/theme';
@source '../node_modules/@e-burgos/tucu-ui';
```

Import order between these three lines doesn't matter — your own utility
classes always win over Tucu UI's defaults either way.

---

## Quick Start

```tsx
import { ThemeProvider, LucideIcons } from '@e-burgos/tucu-ui';

const menuItems = [
  {
    name: 'Dashboard',
    href: '/',
    icon: <LucideIcons.LayoutDashboard />,
    component: <Dashboard />,
  },
];

export default function App() {
  return (
    <ThemeProvider
      logo={{ name: 'My App' }}
      layout="minimal"
      brandColor="Blue"
      menuItems={menuItems}
      isAuthenticated={true}
    />
  );
}
```

→ Routing, navigation, theming and responsive layout are auto-generated.

For full API reference, patterns, and examples see the **[live documentation](https://tucu-ui.netlify.app/)**.

---

## Tech Stack

React 19 · TypeScript · Tailwind CSS v4 · React Hook Form · Zustand · Framer Motion · Recharts · Lucide React · Swiper · Vitest

## License

MIT © [e-burgos](https://github.com/e-burgos)
