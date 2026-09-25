# Tucu UI

A modern React component library built with TypeScript and Tailwind CSS v4 — automatic layouts, macOS design systems (Sonoma & Tahoe), advanced routing (Standalone & MFE), form system, charts, 5000+ icons, blockchain components, and WCAG 2.1 AA compliance.

**📚 [Live Docs](https://ui.estebanburgos.com.ar/) · [NPM](https://www.npmjs.com/package/@e-burgos/tucu-ui)**

---

## Features

| Feature | Description | Docs |
|---------|-------------|------|
| 🎨 **Layout System** | Classic, Minimal, None, macOS Sonoma & Tahoe | [Layout](https://ui.estebanburgos.com.ar/design-system/layout-system) |
| 🎭 **Theming** | 34+ color presets, dark/light, RTL, CSS vars | [Theming Guide](https://ui.estebanburgos.com.ar/design-system/theming-guide) |
| 📝 **Forms** | React Hook Form integration, validation, all input types | [Form System](https://ui.estebanburgos.com.ar/form-system/example) |
| 💻 **macOS Sonoma** | Translucent sidebar, toolbar, vibrancy effects | [Sonoma](https://ui.estebanburgos.com.ar/macos/sonoma) |
| 🪟 **macOS Tahoe** | Liquid Glass dock, frosted panels, 9 accent bundles | [Tahoe](https://ui.estebanburgos.com.ar/macos/tahoe) |
| 🧩 **UI Components** | 95+ components: modals, drawers, cards, tooltips… | [Components](https://ui.estebanburgos.com.ar/components/ui-components) |
| ⌨️ **Input Components** | All form inputs with validation and accessibility | [Inputs](https://ui.estebanburgos.com.ar/components/inputs-components) |
| 📊 **Charts** | BarChart, LineChart, AreaChart, PieChart, Radar, Composed | [Charts](https://ui.estebanburgos.com.ar/components/charts) |
| 🪙 **Blockchain** | DeFi, NFT, crypto wallet components | [Blockchain](https://ui.estebanburgos.com.ar/components/blockchain) |
| 🎯 **Icons** | 5000+ Lucide + 97 custom (crypto, social, UI) | [Icons](https://ui.estebanburgos.com.ar/features/icons-system) |
| 🌐 **Routing** | Standalone (auto-gen) & MFE (explicit) patterns | [Routing](https://ui.estebanburgos.com.ar/features/routing-system) |
| ♿ **Accessibility** | WCAG 2.1 AA, ARIA, keyboard nav | [A11y](https://ui.estebanburgos.com.ar/features/accessibility) |
| 🪝 **Hooks & Utils** | useTheme, useBreakpoint, and more | [Hooks](https://ui.estebanburgos.com.ar/features/hooks-utilities) |
| 🎨 **Tailwind CSS v4** | All utilities pre-configured, zero extra setup | [Tailwind](https://ui.estebanburgos.com.ar/tailwind-utilities/layout-utilities) |
| 🤖 **MCP Server** | AI-agent integration via Model Context Protocol | [MCP Server](https://ui.estebanburgos.com.ar/mcp-server) |

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

For full API reference, patterns, and examples see the **[live documentation](https://ui.estebanburgos.com.ar/)**.

---

## Tech Stack

React 19 · TypeScript · Tailwind CSS v4 · React Hook Form · Zustand · Framer Motion · Recharts · Lucide React · Swiper · Vitest

## License

MIT © [e-burgos](https://github.com/e-burgos)
