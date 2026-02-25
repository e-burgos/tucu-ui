# Skill: Tucu-UI — Overview & Quick Start

This skill provides the essential knowledge to work with `@e-burgos/tucu-ui`, a modern React component library. Use this as the entry point, then consult specialized skills for deeper guidance.

> **Live Documentation**: [tucu-ui.netlify.app](https://tucu-ui.netlify.app/) > **npm**: `@e-burgos/tucu-ui` > **Repository**: [github.com/e-burgos/tucu-ui](https://github.com/e-burgos/tucu-ui)

---

## 1. What is Tucu-UI?

A production-ready React component library built with **TypeScript** and **Tailwind CSS v4**. It provides:

- **70+ UI components** across 20 categories (auth, blockchain, forms, dialogs, tables, etc.)
- **14 utility hooks** for responsive design, state, and lifecycle management
- **Advanced form system** wrapping `react-hook-form` with validation
- **Theming engine** with 22 color presets, semantic tokens, light/dark mode, and RTL support
- **3 layout systems** (Admin, Horizontal, Clean) for enterprise applications
- **Built-in routing** for Standalone SPAs and Micro Frontend architectures
- **10 error pages**, **97+ SVG icons**, and full **Lucide React** namespace (1500+ icons)
- **Accessibility** compliance (WCAG 2.1 AA)

### Key Dependencies

`react >=18`, `react-dom >=18`, `tailwindcss >=4`, `react-router-dom v7.9`, `zustand v5`, `framer-motion`, `@headlessui/react`, `lucide-react`, `swiper v11.2`, `recharts`, `prismjs`

---

## 2. Installation

```bash
# npm
npm install @e-burgos/tucu-ui

# pnpm
pnpm add @e-burgos/tucu-ui

# yarn
yarn add @e-burgos/tucu-ui
```

Ensure peer dependencies are installed:

```bash
pnpm add react react-dom tailwindcss
```

---

## 3. Universal Import

All public exports come from the package root. Never import from internal paths.

```typescript
import {
  // Components
  Button,
  CardContainer,
  Form,
  Input,
  Select,
  ThemeProvider,
  Modal,
  BasicTable,
  Typography,
  Alert,
  Carousel,
  Avatar,
  Badge,
  Skeleton,
  Tabs,
  // Hooks
  useTheme,
  useBreakpoint,
  useIsMobile,
  useToastStore,
  useFormContext,
  // Icons
  LucideIcons,
  // Types
  IMenuItem,
  IAppRouteConfig,
  LAYOUT_OPTIONS,
} from '@e-burgos/tucu-ui';
```

---

## 4. Architecture Modes

The library supports two operation modes controlled by `ThemeProvider`. Choose based on your application type.

### A. Standalone Mode (default)

For monolithic SPAs. The application owns its routing and navigation.

```tsx
import { ThemeProvider, LucideIcons } from '@e-burgos/tucu-ui';

function App() {
  return (
    <ThemeProvider
      showSettings
      logo={{ name: 'My', secondName: 'App' }}
      menuItems={[
        { name: 'Home', path: '/', icon: <LucideIcons.Home />, component: <Home /> },
        { name: 'Users', path: '/users', icon: <LucideIcons.Users />, component: <Users /> },
      ]}
    />
  );
}
```

### B. Micro Frontend Mode

For applications that integrate into a host/shell. Delegates global navigation to the orchestrator.

```tsx
import { ThemeProvider } from '@e-burgos/tucu-ui';

function App() {
  return (
    <ThemeProvider
      architecturalPatterns="mfe"
      basePath="/my-module"
      appRoutesConfig={[
        { key: 'home', path: '/', element: <Home />, isPublic: true },
        { key: 'detail', path: '/:id', element: <Detail />, isPublic: false },
      ]}
      isAuthenticated={isUserLoggedIn}
      loginUrl="/auth/login"
    />
  );
}
```

> **Deep dive**: See the `tucu-ui-routing` skill for nested routes, dropdown menus, dynamic/permission-based routes, and MFE integration patterns.

---

## 5. Skill Index

For specific topics, consult these specialized skills:

| Skill                     | Covers                                                                                              |
| ------------------------- | --------------------------------------------------------------------------------------------------- |
| **tucu-ui** (this file)   | Overview, installation, architecture modes, agent guidelines                                        |
| **tucu-ui-catalog**       | Complete API reference: all 70+ components, 14 hooks, utilities, types, and code examples           |
| **tucu-ui-forms**         | Form system, validation patterns, all input components, `useFormContext`, advanced form patterns    |
| **tucu-ui-design-system** | Layouts, semantic tokens, color presets, `useTheme`, dark/light mode, typography, CSS design tokens |
| **tucu-ui-routing**       | Standalone routing, MFE routing, nested routes, dynamic routes, permissions, navigation patterns    |
| **tucu-ui-standalone**    | Standalone architecture, menu-driven routes, auth guards, layout strategy, Vite setup               |
| **tucu-ui-mfe**           | MFE architecture, shell orchestrator, inter-app navigation, shared auth, Vite config, deployment    |
| **tucu-ui-docs**          | Documentation site patterns, TOC, hero, lazy sections, props tables, code blocks, page composition  |

---

## 6. Implementation Guidelines for Agents

1. **Architecture Detection**: Before generating `App.tsx` configuration code, determine if the user is building a Standalone app or a Micro Frontend.
2. **Import from package root**: Always import from `@e-burgos/tucu-ui` — never from internal paths.
3. **Icon Consistency**: Always import `LucideIcons` from `@e-burgos/tucu-ui`. Do not install `lucide-react` separately.
4. **Semantic Styling**: Use semantic tokens (`bg-primary`, `text-secondary`) instead of static Tailwind colors (`bg-blue-500`). Prefer library container components (`CardContainer`) over raw `div`s.
5. **Router Consistency**: Always use the `tucu-ui` routing system (`ThemeProvider` with `menuItems` or `appRoutesConfig`) instead of `react-router-dom` directly.
6. **Form Validations**: Define validation rules in `validationSchema` of the `Form` component. Keep input components free of validation logic.
7. **Hooks Over Custom Code**: Use the library's utility hooks (`useBreakpoint`, `useIsMobile`, `useCopyToClipboard`, etc.) before writing custom implementations.
8. **Theming**: Never hardcode colors. Use semantic token classes and the `useTheme` hook for programmatic theme access.
9. **Documentation**: Refer users to [tucu-ui.netlify.app](https://tucu-ui.netlify.app/) for live examples and component demos.
