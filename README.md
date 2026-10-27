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
| ▲ **Next.js 16** | App Router via `@e-burgos/tucu-ui/next`, `'use client'` per module, static export | [Next.js section](#nextjs-app-router) |
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
@source '../node_modules/@e-burgos/tucu-ui/**/*.mjs';
```

Scan only `**/*.mjs`: that is where the class names live. Pointing `@source` at the whole package also scans the CJS bundle (it inlines `tailwind-merge`'s class table), `index.css`, `.d.ts` and docs, which adds ~100 KB of unused utilities to your CSS. The `theme` entry already includes the Swiper, carousel, datatable and prism styles; no JS file in the package imports a stylesheet.

Import order between these three lines doesn't matter — your own utility
classes always win over Tucu UI's defaults either way.

---

## Next.js (App Router)

Requires `next >=16` (optional peer dependency) and React 19.

```bash
pnpm add @e-burgos/tucu-ui next react react-dom
```

`app/layout.tsx` — `NextThemeProvider` comes from the `/next` entry and uses `next/navigation` and `next/link`; no router of your own is needed:

```tsx
import { LucideIcons } from '@e-burgos/tucu-ui';
import { NextThemeProvider } from '@e-burgos/tucu-ui/next';
import './globals.css';

const menuItems = [
  { name: 'Dashboard', path: '/', icon: <LucideIcons.LayoutDashboard /> },
  { name: 'Reports', path: '/reports', icon: <LucideIcons.Table /> },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <NextThemeProvider logo={{ name: 'My App' }} layout="admin" menuItems={menuItems}>
          {children}
        </NextThemeProvider>
      </body>
    </html>
  );
}
```

`app/globals.css` (Tailwind v4 — use `theme`, not `styles`, and point `@source` at the package's `.mjs` files):

```css
@import 'tailwindcss';
@import '@e-burgos/tucu-ui/theme';
@source '../node_modules/@e-burgos/tucu-ui/**/*.mjs';
```

- **Server/client boundary:** every tucu-ui module ships with `'use client'`, so you can import components from Server Components. Functions cannot cross that boundary — a `DataTable` column `cell`, an `onClick` or any render prop must live in a `'use client'` component of your app, which the Server Component then renders.
- **Static export:** `output: 'export'` works; the shell prerenders.
- **Vite only:** the `react-router` namespace and routing hooks (`ThemeProvider` with its own router, `RouterProvider`, route helpers) are for Vite apps. In Next, routing is the App Router's file system.
- A complete example lives in [`apps/next-demo`](apps/next-demo).

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
