# Tucu UI

Librería de componentes React construida con TypeScript y Tailwind CSS v4 — layouts automáticos, sistemas de diseño macOS (Sonoma & Tahoe), routing avanzado (Standalone & MFE), sistema de formularios, gráficos, 5000+ iconos, componentes blockchain y accesibilidad WCAG 2.1 AA.

**📚 [Documentación](https://ui.estebanburgos.com.ar/) · [NPM](https://www.npmjs.com/package/@e-burgos/tucu-ui)**

---

## Características

| Característica | Descripción | Docs |
|----------------|-------------|------|
| 🎨 **Sistema de Layouts** | Classic, Minimal, None, macOS Sonoma & Tahoe | [Layouts](https://ui.estebanburgos.com.ar/design-system/layout-system) |
| 🎭 **Temas** | 34+ presets de color, dark/light, RTL, variables CSS | [Guía de Temas](https://ui.estebanburgos.com.ar/design-system/theming-guide) |
| 📝 **Formularios** | React Hook Form, validación, todos los tipos de inputs | [Sistema de Forms](https://ui.estebanburgos.com.ar/form-system/example) |
| 💻 **macOS Sonoma** | Sidebar translúcido, toolbar, efectos de vibrancia | [Sonoma](https://ui.estebanburgos.com.ar/macos/sonoma) |
| 🪟 **macOS Tahoe** | Dock Liquid Glass, paneles esmerilados, 9 bundles de acento | [Tahoe](https://ui.estebanburgos.com.ar/macos/tahoe) |
| 🧩 **UI Components** | 95+ componentes: modales, drawers, cards, tooltips… | [Componentes](https://ui.estebanburgos.com.ar/components/ui-components) |
| ⌨️ **Input Components** | Todos los inputs con validación y accesibilidad | [Inputs](https://ui.estebanburgos.com.ar/components/inputs-components) |
| 📊 **Gráficos** | BarChart, LineChart, AreaChart, PieChart, Radar, Composed | [Charts](https://ui.estebanburgos.com.ar/components/charts) |
| 🪙 **Blockchain** | Componentes para DeFi, NFT y crypto wallets | [Blockchain](https://ui.estebanburgos.com.ar/components/blockchain) |
| 🎯 **Iconos** | 5000+ Lucide + 97 custom (crypto, social, UI) | [Iconos](https://ui.estebanburgos.com.ar/features/icons-system) |
| 🌐 **Routing** | Standalone (auto-generación) & MFE (explícito) | [Routing](https://ui.estebanburgos.com.ar/features/routing-system) |
| ♿ **Accesibilidad** | WCAG 2.1 AA, ARIA, navegación por teclado | [A11y](https://ui.estebanburgos.com.ar/features/accessibility) |
| 🪝 **Hooks & Utils** | useTheme, useBreakpoint y más | [Hooks](https://ui.estebanburgos.com.ar/features/hooks-utilities) |
| 🎨 **Tailwind CSS v4** | Todas las utilidades preconfiguradas, sin setup extra | [Tailwind](https://ui.estebanburgos.com.ar/tailwind-utilities/layout-utilities) |
| ▲ **Next.js 16** | App Router con `@e-burgos/tucu-ui/next`, `'use client'` por módulo, export estático | [Sección Next.js](#nextjs-app-router) |
| 🤖 **MCP Server** | Integración con agentes de IA via Model Context Protocol | [MCP Server](https://ui.estebanburgos.com.ar/mcp-server) |

---

## Instalación

```bash
npm install @e-burgos/tucu-ui
# o con pnpm
pnpm add @e-burgos/tucu-ui
```

En tu archivo CSS principal:

```css
@import '@e-burgos/tucu-ui/styles';
```

> Incluye Tailwind CSS v4 completo — no se requiere configuración adicional de Tailwind.

---

## Next.js (App Router)

Requiere `next >=16` (peer dependency opcional) y React 19.

```bash
pnpm add @e-burgos/tucu-ui next react react-dom
```

`app/layout.tsx` — `NextThemeProvider` viene del entry `/next` y usa `next/navigation` y `next/link`; no necesitás un router propio:

```tsx
import { LucideIcons } from '@e-burgos/tucu-ui';
import { NextThemeProvider, ThemeModeScript } from '@e-burgos/tucu-ui/next';
import './globals.css';

const menuItems = [
  { name: 'Dashboard', path: '/', icon: <LucideIcons.LayoutDashboard /> },
  { name: 'Reportes', path: '/reports', icon: <LucideIcons.Table /> },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <ThemeModeScript defaultMode="system" />
      </head>
      <body>
        <NextThemeProvider logo={{ name: 'Mi App' }} layout="admin" menuItems={menuItems}>
          {children}
        </NextThemeProvider>
      </body>
    </html>
  );
}
```

`app/globals.css` (Tailwind v4 — usá `theme`, no `styles`, y apuntá `@source` a los `.mjs` del paquete):

```css
@import 'tailwindcss';
@import '@e-burgos/tucu-ui/theme';
@source '../node_modules/@e-burgos/tucu-ui/**/*.mjs';
```

Escaneá solo `**/*.mjs`: ahí viven los nombres de clase. Apuntar `@source` al paquete entero también escanea el bundle CJS (que inlinea la tabla de clases de `tailwind-merge`), `index.css`, los `.d.ts` y la documentación, lo que suma ~100 KB de utilidades sin uso a tu CSS. La entrada `theme` ya incluye los estilos de Swiper, carousel, datatable y prism; ningún JS del paquete importa una hoja de estilos.

`ThemeModeScript` (Server Component, acepta `nonce`) aplica la clase `dark`/`light` en `<html>` antes de la hidratación, así que no hay parpadeo del modo equivocado.

- **Frontera server/client:** todos los módulos de tucu-ui llevan `'use client'`, así que podés importar componentes desde Server Components. Las funciones no cruzan esa frontera: el `cell` de una columna de `DataTable`, un `onClick` o cualquier render prop tienen que vivir en un componente `'use client'` de tu app, que el Server Component luego renderiza.
- **Export estático:** `output: 'export'` funciona; el shell se prerenderiza.
- **Solo Vite:** el namespace de `react-router` y los hooks de ruteo (`ThemeProvider` con router propio, `RouterProvider`, helpers de rutas) son para apps Vite. En Next el ruteo lo da el sistema de archivos del App Router.
- Un ejemplo completo está en [`apps/next-demo`](apps/next-demo).

---

## Presets de tema y scopes

Seis presets incluidos (`glass`, `classic`, `elegant`, `fresh`, `minimal`, `vibrant`), los tuyos con `registerThemePresets`, y `ThemeScope` para tematizar un subárbol. Los overlays abiertos dentro de un scope (Modal, Drawer, Select) se montan en el portal host del propio scope y conservan su tema.

```tsx
import { ThemeProvider, ThemeScope, registerThemePresets, resolveThemePreset } from '@e-burgos/tucu-ui';

registerThemePresets({ name: 'acme', accent: '#e11d48', radius: 'lg', cards: 'solid' });

const preset = resolveThemePreset({
  host: window.location.host,
  rules: [{ host: '*.acme.com', preset: 'acme' }],
  fallback: 'glass',
});

<ThemeProvider preset={preset} defaultMode="system" menuItems={menuItems} />

<ThemeScope preset="vibrant" mode="light">
  <Card>Con scope</Card>
</ThemeScope>
```

Los presets escriben `--tucu-accent`, `--tucu-radius`, `--tucu-card-*` y atributos `data-tucu-*`. Las utilidades `dark:` respetan un nivel de anidación de modo opuesto.

### CSS más liviano: `styles-core`

Si no usás los temas macOS, `@import '@e-burgos/tucu-ui/styles-core';` entrega los mismos estilos con aproximadamente la mitad del tamaño (~356 KB vs ~717 KB); con tu propio Tailwind usá `@e-burgos/tucu-ui/theme-core`.

---

## Inicio Rápido

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
      logo={{ name: 'Mi App' }}
      layout="minimal"
      brandColor="Blue"
      menuItems={menuItems}
      isAuthenticated={true}
    />
  );
}
```

→ Routing, navegación, temas y layout responsive se generan automáticamente.

Para la referencia completa de API, patrones y ejemplos, consulta la **[documentación en vivo](https://ui.estebanburgos.com.ar/)**.

---

## Stack Tecnológico

React 19 · TypeScript · Tailwind CSS v4 · React Hook Form · Zustand · Framer Motion · Recharts · Lucide React · Swiper · Vitest

## Licencia

MIT © [e-burgos](https://github.com/e-burgos)
