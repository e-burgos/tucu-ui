# Tucu UI

Librería de componentes React construida con TypeScript y Tailwind CSS v4 — layouts automáticos, sistemas de diseño macOS (Sonoma & Tahoe), routing avanzado (Standalone & MFE), sistema de formularios, gráficos, 5000+ iconos, componentes blockchain y accesibilidad WCAG 2.1 AA.

**📚 [Documentación](https://tucu-ui.netlify.app/) · [NPM](https://www.npmjs.com/package/@e-burgos/tucu-ui)**

---

## Características

| Característica | Descripción | Docs |
|----------------|-------------|------|
| 🎨 **Sistema de Layouts** | Classic, Minimal, None, macOS Sonoma & Tahoe | [Layouts](https://tucu-ui.netlify.app/design-system/layout-system) |
| 🎭 **Temas** | 34+ presets de color, dark/light, RTL, variables CSS | [Guía de Temas](https://tucu-ui.netlify.app/design-system/theming-guide) |
| 📝 **Formularios** | React Hook Form, validación, todos los tipos de inputs | [Sistema de Forms](https://tucu-ui.netlify.app/form-system/example) |
| 💻 **macOS Sonoma** | Sidebar translúcido, toolbar, efectos de vibrancia | [Sonoma](https://tucu-ui.netlify.app/macos/sonoma) |
| 🪟 **macOS Tahoe** | Dock Liquid Glass, paneles esmerilados, 9 bundles de acento | [Tahoe](https://tucu-ui.netlify.app/macos/tahoe) |
| 🧩 **UI Components** | 95+ componentes: modales, drawers, cards, tooltips… | [Componentes](https://tucu-ui.netlify.app/components/ui-components) |
| ⌨️ **Input Components** | Todos los inputs con validación y accesibilidad | [Inputs](https://tucu-ui.netlify.app/components/inputs-components) |
| 📊 **Gráficos** | BarChart, LineChart, AreaChart, PieChart, Radar, Composed | [Charts](https://tucu-ui.netlify.app/components/charts) |
| 🪙 **Blockchain** | Componentes para DeFi, NFT y crypto wallets | [Blockchain](https://tucu-ui.netlify.app/components/blockchain) |
| 🎯 **Iconos** | 5000+ Lucide + 97 custom (crypto, social, UI) | [Iconos](https://tucu-ui.netlify.app/features/icons-system) |
| 🌐 **Routing** | Standalone (auto-generación) & MFE (explícito) | [Routing](https://tucu-ui.netlify.app/features/routing-system) |
| ♿ **Accesibilidad** | WCAG 2.1 AA, ARIA, navegación por teclado | [A11y](https://tucu-ui.netlify.app/features/accessibility) |
| 🪝 **Hooks & Utils** | useTheme, useBreakpoint y más | [Hooks](https://tucu-ui.netlify.app/features/hooks-utilities) |
| 🎨 **Tailwind CSS v4** | Todas las utilidades preconfiguradas, sin setup extra | [Tailwind](https://tucu-ui.netlify.app/tailwind-utilities/layout-utilities) |
| 🤖 **MCP Server** | Integración con agentes de IA via Model Context Protocol | [MCP Server](https://tucu-ui.netlify.app/mcp-server) |

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

Para la referencia completa de API, patrones y ejemplos, consulta la **[documentación en vivo](https://tucu-ui.netlify.app/)**.

---

## Stack Tecnológico

React 19 · TypeScript · Tailwind CSS v4 · React Hook Form · Zustand · Framer Motion · Recharts · Lucide React · Swiper · Vitest

## Licencia

MIT © [e-burgos](https://github.com/e-burgos)
