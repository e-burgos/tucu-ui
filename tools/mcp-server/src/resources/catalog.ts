// ─── Resource: Component Catalog ────────────────────────────────────────────

export function getCatalogContent(): string {
  return `# Component Catalog — @e-burgos/tucu-ui

## Package Info
- **Name**: @e-burgos/tucu-ui
- **Version**: 2.8.0
- **Peer Deps**: react >=18, react-dom >=18, tailwindcss >=4
- **Dependencies**: framer-motion, lucide-react, react-hook-form, react-router-dom v7.16, recharts v3.8, swiper v12.2, zustand v5, classnames, prismjs (lazy-loaded per language), @tanstack/react-table, @dnd-kit/core + modifiers + sortable + utilities, lodash-es, @tailwindcss/typography

## Universal Import
\`\`\`typescript
import { Button, CardContainer, Form, Input, Select, ThemeProvider, useTheme, useToastStore, LucideIcons, Typography } from '@e-burgos/tucu-ui';
\`\`\`

## Component Categories

### Auth — Authentication Forms
| Component | Description |
|-----------|-------------|
| SignInForm | Login with email/password, visibility toggle, remember me |
| SignUpForm | Registration with name, email, password, accept terms |
| ForgetPasswordForm | Password recovery via email |
| ResetPinForm | PIN entry with validation |

### Buttons
| Component | Description |
|-----------|-------------|
| Button | Main button with ripple, loading, tooltip |
| Hamburger | Animated hamburger button (hamburger ↔ X) |
| TopupButton | Action button with dashed border and icon |

**Button Props:**
- \`variant\`: "solid" | "ghost" | "transparent" (NEVER "primary", "outline", "destructive")
- \`size\`: "large" | "medium" | "small" | "mini" | "tiny" (NEVER "lg", "sm", "md", "xs")
- \`shape\`: "rounded" | "pill" | "circle"
- \`color\`: "primary" | "white" | "gray" | "success" | "info" | "warning" | "danger"

### Cards
| Component | Description |
|-----------|-------------|
| Card | Versatile card with header, footer, actions slots |
| CardContainer | Wrapper with border, shadow, rounded, dark |
| CardTitle | Container with floating title |
| AuthorCard | Author card with avatar |
| InfoCard | Structured multi-column info card |
| PanelCard | Card with header and scrollable content |
| PanelActionCard | PanelCard with action buttons |

### Carousel
| Component | Description |
|-----------|-------------|
| Carousel | Swiper wrapper with navigation/pagination |
| CarouselCards | Card carousel with size/variant options |
| CarouselImage | Image carousel with lazy loading |

### Common
| Component | Description |
|-----------|-------------|
| Avatar | Avatar with size variants (xl/lg/md/sm/xs) |
| Badge | Multi-variant badge (solid/ghost/outline/soft) |
| Collapse | Animated accordion |
| KeyValueRow | Label-value row for detail views |
| Pagination | Page navigation with ellipsis |
| Scrollbar | Custom scrollbar |
| Skeleton | Skeleton loader (pulse/wave/shimmer) |
| Stepper | Step navigation indicator |
| Tooltip | Portal tooltip with auto-theme |

### Dialog
| Component | Description |
|-----------|-------------|
| Modal | Portal modal with backdrop, escape |
| Drawer | Configurable side drawer |
| DrawerContainer | Sliding portal container |
| Sidebar | Generic sidebar with scroll |
| SidebarMenu | Sidebar with navigation menu |
| TabModal | Portal modal with tab bar |

### Forms
| Component | Description |
|-----------|-------------|
| Form | react-hook-form wrapper with FormProvider |
| FormField | Field wrapper with Controller |

### Inputs
| Component | Description |
|-----------|-------------|
| Input | Input with password toggle, date picker, i18n |
| Select | HeadlessUI Listbox wrapper |
| Checkbox | Custom checkbox with variants |
| Radio | Custom radio button |
| RadioGroup | Controlled radio group |
| Textarea | Textarea with variants |
| Switch | Toggle switch ON/OFF |
| PinCode | Multi-digit PIN input |
| FileInput | Drag & drop upload with preview |
| ToggleBar | Switch in card format |
| InputSearcher | Autocomplete/search with dropdown |

**Input Variants:** "ghost" | "solid" | "transparent"

### Notifications
| Component | Description |
|-----------|-------------|
| Alert | Dismissible banner (info/warning/error/success) |
| Toast | Auto-dismiss toasts via useToastStore |
| NotificationCard | Social notification card |

### Table
| Component | Description |
|-----------|-------------|
| BasicTable<T> | Generic table with custom render |
| DataTable | Advanced table with state persistence, sorting, global search/filtering, paging, pinning, resizing, selection, column visibility drawer, and custom header actions |
| DataTableComponent | Low-level table component parameterized by TanStack Table |

**DataTable Key Props:**
- \`tableId\`: string (required unique key for state persistence)
- \`columns\`: Array of ColumnDef
- \`data\`: Array of objects
- \`showHeader\`: boolean (default: \`true\`)
- \`showFooter\`: boolean (default: \`true\`)
- \`enableHideColumns\`: boolean (shows a drawer button to toggle columns visibility)
- \`searchableColumns\`: string[] (list of column accessor keys/IDs to include in the global search filter)
- \`rightActions\`: React.ReactNode (renders custom buttons/dropdowns next to the column visibility controls)
- \`rowSelection\`: \`{ type: 'checkbox' | 'radio', getSelection?: (rows) => void }\` (enables row selection)
- \`rowActions\`: \`Array<{ action, label, onClick, ... }>\` (enables row action menus)
- \`renderSubComponent\`: React component to render when a row is expanded


### Tabs
| Component | Description |
|-----------|-------------|
| TabGroup | HeadlessUI TabGroup wrapper |
| TabList | Tab container |
| TabItem | Individual tab with animation |
| TabPanels | Wrapper with LayoutGroup animation |
| TabPanel | Panel with focus styling |
| ParamTab | Tabs synchronized with URL params |

### Typography
| Component | Description |
|-----------|-------------|
| Typography | 30+ semantic tags (h1-h6, body, headline, caption, legal, code, kbd) |

### Layouts
| Component | Description |
|-----------|-------------|
| RootLayout | Main layout orchestrator |
| AdminLayout | Collapsible sidebar + fixed header |
| CleanLayout | Minimal layout without nav |
| HorizontalLayout | Top horizontal navigation |
| MacOSLayout | macOS-style sidebar + toolbar |

### Charts (Recharts wrappers)
| Component | Description |
|-----------|-------------|
| LineChart | Trends over time |
| BarChart | Comparisons between categories |
| AreaChart | Volume/accumulation over time |
| PieChart | Part-to-whole proportions |
| RadarChart | Multi-dimensional comparison |
| ComposedChart | Mix lines, bars, areas |

### Icons
- 97+ native SVG icons (ArrowUp, Check, Close, Copy, Eye, Home, Menu, Plus, Search, Sun, Moon, etc.)
- LucideIcons namespace: 1500+ icons via \`LucideIcons.IconName\`

### Utils
| Component | Description |
|-----------|-------------|
| CodeBlock | Code with Prism highlight, copy, expand |
| Image | Image with lazy, blur, fallback |
| RevealContent | Expandable "See More" content |
| ScrollToTop | Floating scroll-to-top button |

## Critical Warnings
- NEVER use variant="primary" on Button — causes runtime crash
- NEVER use variant="outline" or "destructive" on Button
- NEVER use size="lg", "sm", "md", "xs" on Button
- ALWAYS import from '@e-burgos/tucu-ui' (single entry point)
- Invalid variants cause: "Cannot read properties of undefined (reading '0')"
`;
}
