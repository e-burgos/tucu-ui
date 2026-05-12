# Skill: Tucu-UI — Overview & Quick Start

This skill provides the essential knowledge to work with `@e-burgos/tucu-ui`, a modern React component library. Use this as the entry point, then consult specialized skills for deeper guidance.

> **Live Documentation**: [tucu-ui.netlify.app](https://tucu-ui.netlify.app/) > **npm**: `@e-burgos/tucu-ui` > **Repository**: [github.com/e-burgos/tucu-ui](https://github.com/e-burgos/tucu-ui)

---

## 1. What is Tucu-UI?

A production-ready React component library built with **TypeScript** and **Tailwind CSS v4**. It provides:

- **95+ UI components** across 23 categories (auth, blockchain, charts, forms, dialogs, tables, **macOS**, etc.)
- **14 utility hooks** for responsive design, state, and lifecycle management
- **Chart system** wrapping Recharts v3 with 6 themed chart types + 3 shared chart components
- **Advanced form system** wrapping `react-hook-form` with validation
- **Theming engine** with 22+ color presets (+ 12 macOS presets), semantic tokens, light/dark mode, RTL support, and **two theme variants** (`default` | `macos`)
- **5 layout options** (Admin, Horizontal, Clean, **macOS Classic**, **macOS Tahoe**) for enterprise applications
- **8 macOS-style components** (Window, Sidebar, Toolbar, Widget, SegmentedControl, SearchBar, Popover, NotificationBanner)
- **Built-in routing** for Standalone SPAs and Micro Frontend architectures
- **10 error pages**, **97+ SVG icons**, and full **Lucide React** namespace (1500+ icons)
- **i18n** support via `LangType` configuration
- **Accessibility** compliance (WCAG 2.1 AA)

### Key Dependencies

`react >=18`, `react-dom >=18`, `tailwindcss >=4`, `react-router-dom v7.9.1`, `zustand v5`, `framer-motion v12.23`, `lucide-react`, `swiper v11.2.8`, `recharts v3.8.1`, `react-hook-form v7.60`, `prismjs`

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
  // macOS Components
  MacOSWindow,
  MacOSSidebar,
  MacOSToolbar,
  MacOSWidget,
  MacOSWidgetHeader,
  MacOSSegmentedControl,
  MacOSSearchBar,
  MacOSPopover,
  MacOSPopoverItem,
  MacOSNotificationBanner,
  MacOSLayout,
  // Charts
  LineChart,
  BarChart,
  AreaChart,
  PieChart,
  RadarChart,
  ComposedChart,
  ChartContainer,
  ChartTooltip,
  ChartEmptyState,
  // Hooks
  useTheme,
  useBreakpoint,
  useIsMobile,
  useToastStore,
  useFormContext,
  useChartTheme,
  // Re-exported namespaces
  LucideIcons,
  ReactRouter,
  SwiperReact,
  // Types
  IMenuItem,
  IAppRouteConfig,
  LAYOUT_OPTIONS,
  THEME_VARIANT,
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

### C. Theme Variants

The library supports two visual theme variants, switchable at runtime:

- **`default`** — Standard design system with the classic tucu-ui look
- **`macos`** — Apple-inspired design with vibrancy, blur materials, traffic-light controls, and Sonoma-style widgets

```tsx
import { useTheme } from '@e-burgos/tucu-ui';

function ThemeSwitcher() {
  const { colorScheme, applyMacOSTheme, applyDefaultTheme } = useTheme();

  return (
    <button onClick={colorScheme === 'macos' ? applyDefaultTheme : applyMacOSTheme}>
      Switch to {colorScheme === 'macos' ? 'Default' : 'macOS'} theme
    </button>
  );
}
```

When using `LAYOUT_OPTIONS.MACOS`, the library applies the macOS layout with `MacOSSidebar` + `MacOSToolbar` automatically.

---

## 5. Component Categories

| Category        | Count | Key Components                                                                 |
| --------------- | ----- | ------------------------------------------------------------------------------ |
| **auth**        | 4     | SignInForm, SignUpForm, ForgetPasswordForm, ResetPinForm                        |
| **blockchain**  | 9     | CoinCard, CoinInfoCard, CoinListbox, CollectionCard, NFTGrid, LivePriceFeed... |
| **buttons**     | 5     | Button (+ ButtonDrip, ButtonLoader), Hamburger, TopupButton                    |
| **cards**       | 7     | Card, CardContainer, CardTitle, AuthorCard, InfoCard, PanelCard, PanelActionCard |
| **carousel**    | 3     | CarouselComponent, CarouselCards, CarouselImage                                |
| **charts**      | 9     | LineChart, BarChart, AreaChart, PieChart, RadarChart, ComposedChart + ChartContainer, ChartTooltip, ChartEmptyState |
| **common**      | 11    | Avatar, Badge, Collapse, KeyValueRow, Pagination, Scrollbar, ScrollbarNative, Skeleton, Stepper, Tooltip |
| **dialog**      | 6     | Modal, Drawer, DrawerContainer, Sidebar, SidebarMenu, TabModal               |
| **forms**       | 3     | Form, FormField, HookForm                                                     |
| **icons**       | 97+   | SVG icon components + brands (Facebook, GitHub, Instagram, Telegram, Twitter)  |
| **inputs**      | 13    | Input, InputSearcher, Select, Checkbox, Radio, RadioGroup, Switch, Textarea, FileInput, PinCode, ToggleBar |
| **layouts**     | 13    | AdminLayout, CleanLayout, HorizontalLayout, **MacOSLayout**, RootLayout, headers, menus |
| **links**       | 2     | ActiveLink, AnchorLink                                                        |
| **list**        | 2     | ListItem, ListContainer                                                       |
| **loaders**     | 3     | Loader, Progressbar, Spinner                                                  |
| **logos**       | 4     | Logo, FullLogo, DefiAppLogo, TucuUILogo                                       |
| **macos** ✨    | 8     | MacOSWindow, MacOSSidebar, MacOSToolbar, MacOSWidget, MacOSSegmentedControl, MacOSSearchBar, MacOSPopover, MacOSNotificationBanner |
| **notifications** | 3   | Alert, NotificationCard, Toast                                                |
| **table**       | 1     | BasicTable                                                                     |
| **tabs**        | 3     | Tab, ParamTab, TabSelect                                                      |
| **typography**  | 1     | Typography                                                                     |
| **utils**       | 4     | CodeBlock, Image, RevealContent, ScrollToTop                                  |

---

## 6. Skill Index

For specific topics, consult these specialized skills:

| Skill                     | Covers                                                                                              |
| ------------------------- | --------------------------------------------------------------------------------------------------- |
| **tucu-ui** (this file)   | Overview, installation, architecture modes, theme variants, agent guidelines                        |
| **tucu-ui-catalog**       | Complete API reference: all 95+ components, 14 hooks, utilities, types, and code examples           |
| **tucu-ui-forms**         | Form system, validation patterns, all input components, `useFormContext`, advanced form patterns    |
| **tucu-ui-design-system** | Layouts (5), semantic tokens, color presets (34+), `useTheme`, dark/light mode, macOS theme variant, typography, CSS design tokens |
| **tucu-ui-routing**       | Standalone routing, MFE routing, nested routes, dynamic routes, permissions, navigation patterns    |
| **tucu-ui-standalone**    | Standalone architecture, menu-driven routes, auth guards, layout strategy, Vite setup               |
| **tucu-ui-mfe**           | MFE architecture, shell orchestrator, inter-app navigation, shared auth, Vite config, deployment    |
| **tucu-ui-docs**          | Documentation site patterns, TOC, hero, lazy sections, props tables, code blocks, page composition  |
| **recharts**              | Recharts v3 reference, chart types, performance, theming — used internally by TucuChart components  |

---

## 7. Re-exported Namespaces

The library re-exports three third-party namespaces for consistency:

| Namespace       | Source             | Usage                                         |
| --------------- | ------------------ | --------------------------------------------- |
| `LucideIcons`   | `lucide-react`     | `<LucideIcons.Home />` — 1500+ icons          |
| `ReactRouter`   | `react-router-dom` | `ReactRouter.useNavigate()`, `ReactRouter.useParams()` |
| `SwiperReact`   | `swiper/react`     | Carousel internals, available for direct use   |

> **Rule**: Always import these from `@e-burgos/tucu-ui`. Never install `lucide-react` or use `react-router-dom` directly.

---

## 8. Implementation Guidelines for Agents

1. **Architecture Detection**: Before generating `App.tsx` configuration code, determine if the user is building a Standalone app or a Micro Frontend.
2. **Import from package root**: Always import from `@e-burgos/tucu-ui` — never from internal paths.
3. **Icon Consistency**: Always import `LucideIcons` from `@e-burgos/tucu-ui`. Do not install `lucide-react` separately.
4. **Router Consistency**: Always use `ReactRouter` from `@e-burgos/tucu-ui` for router hooks. Never import directly from `react-router-dom`.
5. **Semantic Styling**: Use semantic tokens (`bg-primary`, `text-secondary`) instead of static Tailwind colors (`bg-blue-500`). Prefer library container components (`CardContainer`) over raw `div`s.
6. **Theme Variant Awareness**: When the user targets a macOS-style UI, use `LAYOUT_OPTIONS.MACOS` and the `macos/` component family. Use `applyMacOSTheme()` / `applyDefaultTheme()` to switch variants.
7. **Form Validations**: Define validation rules in `validationSchema` of the `Form` component. Keep input components free of validation logic.
8. **Hooks Over Custom Code**: Use the library's utility hooks (`useBreakpoint`, `useIsMobile`, `useCopyToClipboard`, etc.) before writing custom implementations.
9. **Theming**: Never hardcode colors. Use semantic token classes and the `useTheme` hook for programmatic theme access.
10. **macOS Components**: When building Apple-style interfaces, prefer the dedicated `MacOS*` components (Window, Sidebar, Toolbar, Widget, SegmentedControl, SearchBar, Popover, NotificationBanner) over generic equivalents.
11. **Documentation**: Refer users to [tucu-ui.netlify.app](https://tucu-ui.netlify.app/) for live examples and component demos.
