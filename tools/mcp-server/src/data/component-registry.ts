export interface ComponentRegistryEntry {
  name: string;
  category: string;
  description: string;
  importPath: string;
  variants?: Record<string, string[]>;
  example: string;
  relatedComponents?: string[];
  themeAware: boolean;
  warnings?: string[];
}

export const componentRegistry: ComponentRegistryEntry[] = [
  // ─── BUTTONS ─────────────────────────────────────────────
  {
    name: 'Button',
    category: 'buttons',
    description: 'Primary action button with multiple variants and sizes.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      variant: ['solid', 'ghost', 'transparent'],
      size: ['large', 'medium', 'small', 'mini', 'tiny'],
    },
    example: `import { Button } from '@e-burgos/tucu-ui';

<Button variant="solid" size="medium" onClick={() => {}}>
  Click me
</Button>`,
    relatedComponents: ['IconButton'],
    themeAware: true,
    warnings: [
      "NEVER use variant='primary', 'outline', or 'destructive' — causes runtime crash.",
      "NEVER use size='lg', 'sm', 'md', 'xs' — causes runtime crash.",
    ],
  },
  {
    name: 'IconButton',
    category: 'buttons',
    description: 'Button that renders an icon with optional tooltip.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      variant: ['solid', 'ghost', 'transparent'],
      size: ['large', 'medium', 'small', 'mini', 'tiny'],
    },
    example: `import { IconButton } from '@e-burgos/tucu-ui';

<IconButton icon="settings" variant="ghost" size="small" onClick={() => {}} />`,
    relatedComponents: ['Button', 'Icon'],
    themeAware: true,
    warnings: ['Same variant/size restrictions as Button.'],
  },

  // ─── INPUTS ──────────────────────────────────────────────
  {
    name: 'Input',
    category: 'inputs',
    description:
      'Text input field with label, validation, and variants. `icon` renders in a 40px slot on the left and adds `pl-[40px]` to the input automatically — no manual padding needed. `type="date"` is a fully custom picker: the native input becomes `readOnly` and always displays the formatted value (per `dateFormat`, default `DD/MM/YYYY`), while `onChange` fires with a synthetic event whose value is the ISO string (`YYYY-MM-DD`) from the calendar\'s date selection, never from typing. `locale` (`\'en-US\' | \'es-ES\' | \'fr-FR\' | \'de-DE\' | \'pt-BR\'`, default `\'en-US\'`) only affects the date picker\'s weekday labels, month/year header and "Today" button text — it does not affect number/currency formatting.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      variant: ['solid', 'ghost', 'transparent'],
    },
    example: `import { Input } from '@e-burgos/tucu-ui';

<Input label="Email" placeholder="you@example.com" variant="ghost" />

<Input
  label="Birth date"
  type="date"
  dateFormat="DD/MM/YYYY"
  locale="es-ES"
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>`,
    relatedComponents: ['InputSearcher', 'Form'],
    themeAware: true,
    warnings: [
      '`type="date"` makes the visible input `readOnly` — typing a date is not possible, only picking one from the calendar dropdown updates the value.',
      '`onChange` for `type="date"` always receives the ISO format (`YYYY-MM-DD`) regardless of `dateFormat`, which only controls the display string.',
    ],
  },
  {
    name: 'InputSearcher',
    category: 'inputs',
    description:
      'Autocomplete input with search/filter capabilities for large option sets.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      variant: ['solid', 'ghost', 'transparent'],
    },
    example: `import { InputSearcher } from '@e-burgos/tucu-ui';

<InputSearcher
  options={[{ name: 'Option 1', value: '1' }]}
  initialValue=""
  onOptionSelect={(option) => console.log(option)}
  variant="ghost"
  label="Search"
  placeholder="Type to search..."
  noMatchesMessage="No results"
/>`,
    relatedComponents: ['Select', 'Input'],
    themeAware: true,
  },
  {
    name: 'Select',
    category: 'inputs',
    description: 'Dropdown select with options list.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      variant: ['solid', 'ghost', 'transparent'],
    },
    example: `import { Select } from '@e-burgos/tucu-ui';

<Select
  options={[{ name: 'Option A', value: 'a' }]}
  value="a"
  onSelect={(value) => console.log(value)}
  variant="ghost"
  label="Choose"
/>`,
    relatedComponents: ['InputSearcher', 'Form'],
    themeAware: true,
  },
  {
    name: 'Checkbox',
    category: 'inputs',
    description: 'Checkbox input with label.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { Checkbox } from '@e-burgos/tucu-ui';

<Checkbox label="Accept terms" checked={false} onChange={(val) => {}} />`,
    relatedComponents: ['Switch', 'RadioGroup', 'Form'],
    themeAware: true,
  },
  {
    name: 'Switch',
    category: 'inputs',
    description: 'Toggle switch for boolean values.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { Switch } from '@e-burgos/tucu-ui';

<Switch label="Dark mode" checked={true} onChange={(val) => {}} />`,
    relatedComponents: ['Checkbox', 'Form'],
    themeAware: true,
  },
  {
    name: 'RadioGroup',
    category: 'inputs',
    description: 'Group of radio buttons for single selection.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { RadioGroup } from '@e-burgos/tucu-ui';

<RadioGroup
  options={[{ label: 'A', value: 'a' }, { label: 'B', value: 'b' }]}
  value="a"
  onChange={(val) => {}}
/>`,
    relatedComponents: ['Checkbox', 'Select', 'Form'],
    themeAware: true,
  },
  {
    name: 'FileInput',
    category: 'inputs',
    description: 'File upload input with drag-and-drop support.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { FileInput } from '@e-burgos/tucu-ui';

<FileInput label="Upload file" onFileSelect={(file) => console.log(file)} />`,
    relatedComponents: ['Input', 'Form'],
    themeAware: true,
  },
  {
    name: 'DatePicker',
    category: 'inputs',
    description: 'Date selection input with calendar popup.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { DatePicker } from '@e-burgos/tucu-ui';

<DatePicker label="Start date" value={new Date()} onChange={(date) => {}} />`,
    relatedComponents: ['Input', 'Form'],
    themeAware: true,
  },
  {
    name: 'Textarea',
    category: 'inputs',
    description: 'Multi-line text input.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      variant: ['solid', 'ghost', 'transparent'],
    },
    example: `import { Textarea } from '@e-burgos/tucu-ui';

<Textarea label="Description" variant="ghost" rows={4} />`,
    relatedComponents: ['Input', 'Form'],
    themeAware: true,
  },
  {
    name: 'ColorPicker',
    category: 'inputs',
    description: 'Color selection input with palette and custom value.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { ColorPicker } from '@e-burgos/tucu-ui';

<ColorPicker label="Color" value="#3b82f6" onChange={(color) => {}} />`,
    relatedComponents: ['Input', 'Form'],
    themeAware: true,
  },
  {
    name: 'RangeSlider',
    category: 'inputs',
    description: 'Slider input for numeric range selection.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { RangeSlider } from '@e-burgos/tucu-ui';

<RangeSlider min={0} max={100} value={50} onChange={(val) => {}} />`,
    relatedComponents: ['Input', 'Form'],
    themeAware: true,
  },

  // ─── FORMS ───────────────────────────────────────────────
  {
    name: 'Form',
    category: 'forms',
    description:
      'Form wrapper built on react-hook-form with built-in validation and input registration.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { Form } from '@e-burgos/tucu-ui';

<Form onSubmit={(data) => console.log(data)} defaultValues={{ name: '' }}>
  {({ register }) => (
    <Input label="Name" {...register('name', { required: true })} />
  )}
</Form>`,
    relatedComponents: ['Input', 'Select', 'Checkbox', 'Switch'],
    themeAware: true,
  },

  // ─── CARDS ───────────────────────────────────────────────
  {
    name: 'Card',
    category: 'cards',
    description: 'Container card with optional header, footer, and actions.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { Card } from '@e-burgos/tucu-ui';

<Card title="My Card" subtitle="Description">
  <p>Card content here</p>
</Card>`,
    relatedComponents: ['InfoCard', 'StatsCard'],
    themeAware: true,
  },
  {
    name: 'InfoCard',
    category: 'cards',
    description: 'Card displaying key-value information pairs.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { InfoCard } from '@e-burgos/tucu-ui';

<InfoCard title="User Info" data={[{ label: 'Name', value: 'John' }]} />`,
    relatedComponents: ['Card', 'StatsCard'],
    themeAware: true,
  },
  {
    name: 'StatsCard',
    category: 'cards',
    description:
      'Card displaying a statistic value with label and optional trend indicator.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { StatsCard } from '@e-burgos/tucu-ui';

<StatsCard title="Revenue" value="$12,345" trend="+12%" />`,
    relatedComponents: ['Card', 'InfoCard'],
    themeAware: true,
  },

  // ─── TABLES ──────────────────────────────────────────────
  {
    name: 'BasicTable',
    category: 'tables',
    description:
      'Lightweight generic table (no @tanstack/react-table). Columns are declared as { key, label, render? }. Supports striped/hoverable rows, borders, rounded corners, a sticky header, column resizing and a maxRows scroll cap. Responsive by default: below the cardBreakpoint (md) each row collapses into a stacked card of label/value pairs — pass mobileCards={false} to keep a table at every width. For sorting, filtering, pagination and row selection use DataTable instead.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { BasicTable } from '@e-burgos/tucu-ui';

// Rows become stacked cards below md automatically
<BasicTable
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status', render: (value) => <Badge>{String(value)}</Badge> },
  ]}
  data={[{ name: 'Alice', status: 'Active' }]}
  striped
/>

// Opt out, or move the breakpoint
<BasicTable columns={columns} data={data} mobileCards={false} />
<BasicTable columns={columns} data={data} cardBreakpoint="lg" />`,
    relatedComponents: ['Card', 'DataTable'],
    themeAware: true,
  },
  {
    name: 'DataTable',
    category: 'tables',
    description:
      'Advanced data table with sorting, global searching/filtering, pagination (client/server/manual), pinning, resizing, drag & drop column reordering, state persistence, sub-components, row selection, columns visibility toggling, and custom header actions. Built on @tanstack/react-table and automatically theme-aware (uses CSS variables/tokens for light/dark mode). Use the generate_datatable tool to scaffold a full implementation and read the tucu://datatable resource for the complete API and behavior reference.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      mode: ['light', 'dark'],
    },
    example: `import { DataTable, Button, ListContainer } from '@e-burgos/tucu-ui';

const columns = [
  { id: 'id', header: 'ID', accessorKey: 'id' },
  { id: 'name', header: 'Name', accessorKey: 'name' },
  { id: 'role', header: 'Role', accessorKey: 'role' }
];

const data = [
  { id: '1', name: 'John Doe', role: 'Admin' },
  { id: '2', name: 'Jane Smith', role: 'User' }
];

const rightActions = (
  <ListContainer
    label="Export"
    position="bottom"
    align="end"
    trigger="click"
    items={[
      { id: 'csv', label: 'Export CSV', onClick: () => console.log('CSV') },
      { id: 'pdf', label: 'Export PDF', onClick: () => console.log('PDF') }
    ]}
  />
);

<DataTable
  tableId="users-table"
  columns={columns}
  data={data}
  showHeader={true}
  showFooter={true}
  enableHideColumns={true}
  searchableColumns={['name', 'role']}
  rightActions={rightActions}
/>`,
    relatedComponents: ['BasicTable', 'DataTableComponent'],
    themeAware: true,
    warnings: [
      "Every column SHOULD declare an explicit `id` (not just `accessorKey`). Internally `initialColumnVisibility`/`initialColumnOrder` are built from the raw column defs as `acc[c?.id ?? ''] = c?.enableVisible ?? true` (ui/tucu-ui/src/datatable/hooks/useInitialState.tsx) — every column missing `id` collapses onto the same empty-string key, so `enableHideColumns` and the per-tableId persisted visibility/order state silently track only one of them.",
    ],
  },
  {
    name: 'DataTableComponent',
    category: 'tables',
    description:
      'Internal low-level table component parameterized by TanStack Table instance, supporting advanced layouts.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { DataTableComponent } from '@e-burgos/tucu-ui';

// Used internally by DataTable or for custom TanStack integration
<DataTableComponent data={data} />`,
    relatedComponents: ['DataTable'],
    themeAware: true,
  },

  // ─── LAYOUTS ─────────────────────────────────────────────
  {
    name: 'AdminLayout',
    category: 'layouts',
    description:
      'Full admin layout with sidebar navigation, header, and content area.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { AdminLayout } from '@e-burgos/tucu-ui';

<AdminLayout menuItems={[{ label: 'Home', path: '/' }]}>
  <Outlet />
</AdminLayout>`,
    relatedComponents: ['MacOSLayout', 'ThemeProvider'],
    themeAware: true,
  },
  {
    name: 'MacOSLayout',
    category: 'layouts',
    description:
      'macOS-inspired layout with dock navigation and window management.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { MacOSLayout } from '@e-burgos/tucu-ui';

<MacOSLayout menuItems={[{ label: 'Home', path: '/', icon: 'home' }]}>
  <Outlet />
</MacOSLayout>`,
    relatedComponents: ['AdminLayout', 'ThemeProvider', 'HorizontalNavMenu'],
    themeAware: true,
  },
  {
    name: 'HorizontalNavMenu',
    category: 'layouts',
    description:
      'Horizontal navigation menu used inside navbar layout variants. Renders menu items as a top bar with dropdown support.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { HorizontalNavMenu } from '@e-burgos/tucu-ui';

<HorizontalNavMenu
  menuItems={[{ label: 'Home', path: '/', icon: 'home' }]}
  className="custom-nav"
  dropboxClassName="custom-dropdown"
/>`,
    relatedComponents: ['MacOSLayout', 'AdminLayout'],
    themeAware: true,
  },
  {
    name: 'ThemeProvider',
    category: 'layouts',
    description:
      'Theme context provider. Wraps the app to enable theming via useTheme hook.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { ThemeProvider } from '@e-burgos/tucu-ui';

<ThemeProvider defaultTheme="dark" colorPreset="blue">
  <App />
</ThemeProvider>`,
    relatedComponents: ['AdminLayout', 'MacOSLayout'],
    themeAware: false,
  },

  // ─── DIALOGS ─────────────────────────────────────────────
  {
    name: 'Modal',
    category: 'dialogs',
    description: 'Overlay modal dialog with customizable content.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { Modal } from '@e-burgos/tucu-ui';

<Modal isOpen={true} onClose={() => {}} title="Confirm">
  <p>Are you sure?</p>
</Modal>`,
    relatedComponents: ['Drawer', 'ConfirmDialog'],
    themeAware: true,
  },
  {
    name: 'Drawer',
    category: 'dialogs',
    description:
      "Side panel that slides in from the edge of the screen. Wraps DrawerContainer and adds the Sidebar/SidebarMenu chrome (title, close button, scrollable body, actionContent slot). `type` is REQUIRED — 'sidebar' renders plain content, 'sidebar-menu' renders menuItems as navigation. `setIsOpen` is also required: it is the real open/close channel. `onClose` only fires from the built-in close button, never from Esc or a backdrop click — those two only call `setIsOpen(false)` internally, so if you need a single close channel for all three (Esc, backdrop, button), use DrawerContainer directly instead.",
    importPath: '@e-burgos/tucu-ui',
    example: `import { useState } from 'react';
import { Drawer } from '@e-burgos/tucu-ui';

const [isOpen, setIsOpen] = useState(false);

<Drawer
  type="sidebar"
  isOpen={isOpen}
  setIsOpen={setIsOpen}
  position="right"
  title="Details"
>
  <p>Drawer content</p>
</Drawer>`,
    relatedComponents: ['DrawerContainer', 'Modal', 'ConfirmDialog'],
    themeAware: true,
    warnings: [
      "`type` is required ('sidebar' | 'sidebar-menu') — omitting it does not compile. `setIsOpen` is required too.",
      '`onClose` does not cover Esc or backdrop dismissal, only the internal close button. Use `setIsOpen` if you need one channel for all three.',
      'Does not expose `backdropClassName` — the backdrop always applies `bg-gray-700/10 backdrop-blur-xs` (except on macOS Tahoe layouts, where Drawer swaps in its own) and cannot be restyled through Drawer. Use DrawerContainer directly when the backdrop must not blur (e.g. a filter drawer over a data-heavy table).',
    ],
  },
  {
    name: 'DrawerContainer',
    category: 'dialogs',
    description:
      'Headless sliding panel: the primitive Drawer wraps. Renders via createPortal into document.body and provides, with zero extra code: focus moved to the first focusable element on open (setTimeout(0)), a focus trap cycling Tab/Shift+Tab inside the panel, Esc closing (calls setIsOpen(false)), backdrop click closing (only when the click target is the backdrop itself, e.target === e.currentTarget), and focus returned to the previously focused element after the close transition (setTimeout(300)). Props: isOpen, setIsOpen, children, position ("left" default | "right"), backdrop (default true), backdropClassName. Use this instead of Drawer whenever you need to compose your own panel chrome or the backdrop must not blur (Drawer hardcodes its backdrop and does not expose backdropClassName).',
    importPath: '@e-burgos/tucu-ui',
    example: `import { useState } from 'react';
import { DrawerContainer } from '@e-burgos/tucu-ui';

const [isOpen, setIsOpen] = useState(false);

<DrawerContainer
  isOpen={isOpen}
  setIsOpen={setIsOpen}
  position="right"
  backdropClassName="my-scrim"
>
  <div className="pointer-events-auto h-full w-96 bg-body p-6">
    <p>Custom panel content</p>
  </div>
</DrawerContainer>`,
    relatedComponents: ['Drawer', 'Sidebar', 'Modal'],
    themeAware: true,
    warnings: [
      'The panel wrapper itself is `pointer-events-none` — your content container MUST set `pointer-events-auto` or the drawer renders correctly but is completely inert to clicks/focus (no visible bug, no console error).',
      '`aria-label="Sidebar"` is hardcoded on the panel and there is no prop to override it (no `aria-label`/`aria-labelledby`/`id`). Workaround: render a visually-hidden heading as the first child of your content so it is the first thing announced after the dialog role.',
      '`backdropClassName`, when set, REPLACES the default appearance classes (`bg-gray-700/10 backdrop-blur-xs`) but keeps positioning/transition (`fixed inset-0 w-screen h-dvh transition-opacity duration-300 ease-out`) — pass a class with no blur to get an opaque/no-filter scrim.',
      '`backdrop={false}` removes the backdrop node entirely (unless `backdropClassName` is set), which also removes click-to-close — there is no way to keep click-to-close without some backdrop element.',
      'Closing is driven only by `setIsOpen` (Esc, backdrop click, and any button you wire up all call the same setter) — there is no separate `onClose` callback.',
    ],
  },
  {
    name: 'ConfirmDialog',
    category: 'dialogs',
    description: 'Pre-built confirmation dialog with confirm/cancel actions.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { ConfirmDialog } from '@e-burgos/tucu-ui';

<ConfirmDialog
  isOpen={true}
  title="Delete item?"
  message="This action cannot be undone."
  onConfirm={() => {}}
  onCancel={() => {}}
/>`,
    relatedComponents: ['Modal', 'Drawer'],
    themeAware: true,
  },

  // ─── NOTIFICATIONS ───────────────────────────────────────
  {
    name: 'Alert',
    category: 'notifications',
    description: 'Inline alert message with variant-based styling.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      variant: ['error', 'success', 'info', 'warning'],
    },
    example: `import { Alert } from '@e-burgos/tucu-ui';

<Alert variant="info" title="Note">This is an informational alert.</Alert>`,
    relatedComponents: ['Toast', 'Notification'],
    themeAware: true,
    warnings: [
      "NEVER use variant='destructive' — causes runtime crash. Use 'error' instead.",
    ],
  },
  {
    name: 'Toast',
    category: 'notifications',
    description: 'Temporary notification that appears and auto-dismisses.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      variant: ['error', 'success', 'info', 'warning'],
    },
    example: `import { Toast } from '@e-burgos/tucu-ui';

<Toast variant="success" message="Saved successfully!" />`,
    relatedComponents: ['Alert', 'Notification'],
    themeAware: true,
  },
  {
    name: 'Notification',
    category: 'notifications',
    description:
      'Rich notification component with icon, title, message, and actions.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { Notification } from '@e-burgos/tucu-ui';

<Notification title="New message" message="You have 3 unread messages" />`,
    relatedComponents: ['Alert', 'Toast'],
    themeAware: true,
  },

  // ─── TYPOGRAPHY ──────────────────────────────────────────
  {
    name: 'Title',
    category: 'typography',
    description: 'Heading component for page/section titles.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { Title } from '@e-burgos/tucu-ui';

<Title>Page Title</Title>`,
    relatedComponents: ['Subtitle', 'Text', 'Label'],
    themeAware: true,
  },
  {
    name: 'Subtitle',
    category: 'typography',
    description: 'Secondary heading for subsections.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { Subtitle } from '@e-burgos/tucu-ui';

<Subtitle>Section Subtitle</Subtitle>`,
    relatedComponents: ['Title', 'Text'],
    themeAware: true,
  },
  {
    name: 'Text',
    category: 'typography',
    description: 'Body text component with size and weight options.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { Text } from '@e-burgos/tucu-ui';

<Text>Body text content here.</Text>`,
    relatedComponents: ['Title', 'Subtitle', 'Label'],
    themeAware: true,
  },
  {
    name: 'Label',
    category: 'typography',
    description: 'Small label text, typically for form fields or metadata.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { Label } from '@e-burgos/tucu-ui';

<Label>Field label</Label>`,
    relatedComponents: ['Text', 'Input'],
    themeAware: true,
  },

  // ─── LOADERS ─────────────────────────────────────────────
  {
    name: 'Spinner',
    category: 'loaders',
    description: 'Circular loading spinner with configurable size.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      size: ['xs', 'sm', 'md', 'lg', 'xl'],
    },
    example: `import { Spinner } from '@e-burgos/tucu-ui';

<Spinner size="md" />`,
    relatedComponents: ['Skeleton', 'LoadingOverlay'],
    themeAware: true,
  },
  {
    name: 'Skeleton',
    category: 'loaders',
    description:
      'Placeholder loading skeleton for content that is being fetched.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { Skeleton } from '@e-burgos/tucu-ui';

<Skeleton width="100%" height="20px" />`,
    relatedComponents: ['Spinner', 'LoadingOverlay'],
    themeAware: true,
  },
  {
    name: 'LoadingOverlay',
    category: 'loaders',
    description: 'Full-screen or container loading overlay with spinner.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { LoadingOverlay } from '@e-burgos/tucu-ui';

<LoadingOverlay isLoading={true}>
  <div>Content behind overlay</div>
</LoadingOverlay>`,
    relatedComponents: ['Spinner', 'Skeleton'],
    themeAware: true,
  },

  // ─── TABS ────────────────────────────────────────────────
  {
    name: 'Tabs',
    category: 'tabs',
    description: 'Tabbed interface for switching between views.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { Tabs } from '@e-burgos/tucu-ui';

<Tabs
  tabs={[
    { label: 'Tab 1', content: <div>Content 1</div> },
    { label: 'Tab 2', content: <div>Content 2</div> },
  ]}
/>`,
    relatedComponents: ['Card'],
    themeAware: true,
  },

  // ─── LISTS ───────────────────────────────────────────────
  {
    name: 'ListContainer',
    category: 'lists',
    description:
      'Dropdown list container triggered by hover or click. Each item\'s own onClick always runs on selection; with trigger="click" the dropdown closes after selecting an item unless keepOpen is set, and with trigger="hover" it closes on mouse leave instead.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { ListContainer } from '@e-burgos/tucu-ui';

<ListContainer
  trigger="click"
  items={[
    { id: '1', label: 'Edit', onClick: () => handleEdit() },
    { id: '2', label: 'Delete', onClick: () => handleDelete() },
  ]}
/>`,
    relatedComponents: ['ListItem'],
    themeAware: true,
  },
  {
    name: 'ListItem',
    category: 'lists',
    description:
      'Individual item rendered by ListContainer. Configured via props (id, label or content, icon, onClick), not children.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { ListItem } from '@e-burgos/tucu-ui';

<ListItem id="1" label="Clickable item" onClick={() => {}} />`,
    relatedComponents: ['ListContainer'],
    themeAware: true,
  },

  // ─── LINKS ───────────────────────────────────────────────
  {
    name: 'Link',
    category: 'links',
    description: 'Styled anchor link component.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { Link } from '@e-burgos/tucu-ui';

<Link href="/about">About</Link>`,
    relatedComponents: ['NavLink'],
    themeAware: true,
  },
  {
    name: 'NavLink',
    category: 'links',
    description: 'Navigation link with active state detection.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { NavLink } from '@e-burgos/tucu-ui';

<NavLink to="/dashboard">Dashboard</NavLink>`,
    relatedComponents: ['Link'],
    themeAware: true,
  },

  // ─── COMMON ──────────────────────────────────────────────
  {
    name: 'Avatar',
    category: 'common',
    description: 'User avatar with image, initials, or icon fallback.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { Avatar } from '@e-burgos/tucu-ui';

<Avatar src="/avatar.png" alt="User" size="md" />`,
    relatedComponents: ['Badge'],
    themeAware: true,
  },
  {
    name: 'Badge',
    category: 'common',
    description: 'Small status badge/tag with variant styling.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      variant: ['solid', 'ghost', 'outline', 'soft'],
    },
    example: `import { Badge } from '@e-burgos/tucu-ui';

<Badge variant="solid">Active</Badge>`,
    relatedComponents: ['Avatar', 'Button'],
    themeAware: true,
    warnings: [
      "NEVER use variant='secondary' or 'flat' — causes runtime crash.",
    ],
  },
  {
    name: 'Divider',
    category: 'common',
    description: 'Horizontal or vertical divider line.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { Divider } from '@e-burgos/tucu-ui';

<Divider />`,
    relatedComponents: [],
    themeAware: true,
  },
  {
    name: 'Tooltip',
    category: 'common',
    description: 'Tooltip popup that appears on hover.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { Tooltip } from '@e-burgos/tucu-ui';

<Tooltip content="More info">
  <span>Hover me</span>
</Tooltip>`,
    relatedComponents: ['Popover'],
    themeAware: true,
  },
  {
    name: 'Popover',
    category: 'common',
    description: 'Floating popover triggered by click or hover.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { Popover } from '@e-burgos/tucu-ui';

<Popover content={<div>Popover content</div>}>
  <Button variant="ghost" size="small">Open</Button>
</Popover>`,
    relatedComponents: ['Tooltip', 'Modal'],
    themeAware: true,
  },
  {
    name: 'Accordion',
    category: 'common',
    description: 'Collapsible accordion sections.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { Accordion } from '@e-burgos/tucu-ui';

<Accordion items={[{ title: 'Section 1', content: <p>Content</p> }]} />`,
    relatedComponents: ['Tabs', 'Card'],
    themeAware: true,
  },

  // ─── CHARTS ──────────────────────────────────────────────
  {
    name: 'TucuLineChart',
    category: 'charts',
    description: 'Line chart built on Recharts with tucu-ui theming.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { TucuLineChart } from '@e-burgos/tucu-ui';

<TucuLineChart
  data={[{ name: 'Jan', value: 100 }, { name: 'Feb', value: 200 }]}
  lines={[{ dataKey: 'value', name: 'Revenue' }]}
/>`,
    relatedComponents: ['TucuBarChart', 'TucuAreaChart'],
    themeAware: true,
  },
  {
    name: 'TucuBarChart',
    category: 'charts',
    description: 'Bar chart built on Recharts with tucu-ui theming.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { TucuBarChart } from '@e-burgos/tucu-ui';

<TucuBarChart
  data={[{ name: 'Q1', value: 300 }]}
  bars={[{ dataKey: 'value', name: 'Sales' }]}
/>`,
    relatedComponents: ['TucuLineChart', 'TucuComposedChart'],
    themeAware: true,
  },
  {
    name: 'TucuAreaChart',
    category: 'charts',
    description: 'Area chart built on Recharts with tucu-ui theming.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { TucuAreaChart } from '@e-burgos/tucu-ui';

<TucuAreaChart
  data={[{ name: 'Jan', value: 50 }, { name: 'Feb', value: 80 }]}
  areas={[{ dataKey: 'value', name: 'Usage' }]}
/>`,
    relatedComponents: ['TucuLineChart', 'TucuComposedChart'],
    themeAware: true,
  },
  {
    name: 'TucuPieChart',
    category: 'charts',
    description: 'Pie/donut chart built on Recharts with tucu-ui theming.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { TucuPieChart } from '@e-burgos/tucu-ui';

<TucuPieChart
  data={[{ name: 'A', value: 40 }, { name: 'B', value: 60 }]}
/>`,
    relatedComponents: ['TucuBarChart'],
    themeAware: true,
  },
  {
    name: 'TucuRadarChart',
    category: 'charts',
    description: 'Radar/spider chart built on Recharts with tucu-ui theming.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { TucuRadarChart } from '@e-burgos/tucu-ui';

<TucuRadarChart
  data={[{ subject: 'Speed', A: 80 }, { subject: 'Power', A: 60 }]}
  radars={[{ dataKey: 'A', name: 'Player' }]}
/>`,
    relatedComponents: ['TucuLineChart'],
    themeAware: true,
  },
  {
    name: 'TucuComposedChart',
    category: 'charts',
    description: 'Composed chart mixing line, bar, and area in one chart.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { TucuComposedChart } from '@e-burgos/tucu-ui';

<TucuComposedChart
  data={[{ name: 'Jan', bar: 100, line: 80 }]}
  bars={[{ dataKey: 'bar' }]}
  lines={[{ dataKey: 'line' }]}
/>`,
    relatedComponents: ['TucuBarChart', 'TucuLineChart', 'TucuAreaChart'],
    themeAware: true,
  },

  // ─── ICONS ───────────────────────────────────────────────
  {
    name: 'Icon',
    category: 'icons',
    description: 'Icon component using the built-in icon set (lucide-based).',
    importPath: '@e-burgos/tucu-ui',
    example: `import { Icon } from '@e-burgos/tucu-ui';

<Icon name="settings" size={24} />`,
    relatedComponents: ['IconButton'],
    themeAware: true,
  },

  // ─── CAROUSEL ────────────────────────────────────────────
  {
    name: 'Carousel',
    category: 'carousel',
    description: 'Image/content carousel with navigation and auto-play.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { Carousel } from '@e-burgos/tucu-ui';

<Carousel items={[<img src="/1.png" />, <img src="/2.png" />]} autoPlay />`,
    relatedComponents: ['Card'],
    themeAware: true,
  },

  // ─── LOGOS ───────────────────────────────────────────────
  {
    name: 'Logo',
    category: 'logos',
    description: 'Logo component with preset variants for tucu-ui branding.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { Logo } from '@e-burgos/tucu-ui';

<Logo variant="full" size="md" />`,
    relatedComponents: [],
    themeAware: true,
  },

  // ─── MACOS SONOMA ────────────────────────────────────────
  {
    name: 'MacOSWindow',
    category: 'macos-sonoma',
    description:
      'macOS Sonoma-style window container with traffic lights and title bar.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { MacOSWindow } from '@e-burgos/tucu-ui';

<MacOSWindow title="My App">
  <div>Window content</div>
</MacOSWindow>`,
    relatedComponents: ['MacOSDock', 'MacOSDesktop'],
    themeAware: true,
  },
  {
    name: 'MacOSDock',
    category: 'macos-sonoma',
    description: 'macOS Sonoma-style dock with magnification and tooltip.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { MacOSDock } from '@e-burgos/tucu-ui';

<MacOSDock items={[{ icon: 'home', label: 'Home', onClick: () => {} }]} />`,
    relatedComponents: ['MacOSWindow', 'MacOSDesktop'],
    themeAware: true,
  },
  {
    name: 'MacOSDesktop',
    category: 'macos-sonoma',
    description:
      'Full macOS Sonoma-style desktop environment with dock and windows.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { MacOSDesktop } from '@e-burgos/tucu-ui';

<MacOSDesktop wallpaper="/wallpaper.jpg">
  <MacOSWindow title="App" />
</MacOSDesktop>`,
    relatedComponents: ['MacOSWindow', 'MacOSDock'],
    themeAware: true,
  },

  // ─── MACOS TAHOE ─────────────────────────────────────────
  {
    name: 'TahoeWindow',
    category: 'macos-tahoe',
    description:
      'macOS Tahoe-style window with liquid glass effect and updated traffic lights.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { TahoeWindow } from '@e-burgos/tucu-ui';

<TahoeWindow title="Settings" variant="default">
  <div>Window content</div>
</TahoeWindow>`,
    relatedComponents: ['TahoeDock', 'TahoeDesktop', 'TahoeMenuBar'],
    themeAware: true,
  },
  {
    name: 'TahoeDock',
    category: 'macos-tahoe',
    description:
      'macOS Tahoe-style dock with liquid glass styling and magnification.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { TahoeDock } from '@e-burgos/tucu-ui';

<TahoeDock items={[{ icon: 'finder', label: 'Finder', onClick: () => {} }]} />`,
    relatedComponents: ['TahoeWindow', 'TahoeDesktop'],
    themeAware: true,
  },
  {
    name: 'TahoeDesktop',
    category: 'macos-tahoe',
    description:
      'Full macOS Tahoe-style desktop environment with liquid glass UI.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { TahoeDesktop } from '@e-burgos/tucu-ui';

<TahoeDesktop wallpaper="/tahoe-wallpaper.jpg">
  <TahoeWindow title="App" />
</TahoeDesktop>`,
    relatedComponents: ['TahoeWindow', 'TahoeDock', 'TahoeMenuBar'],
    themeAware: true,
  },
  {
    name: 'TahoeMenuBar',
    category: 'macos-tahoe',
    description: 'macOS Tahoe-style menu bar with liquid glass effect.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { TahoeMenuBar } from '@e-burgos/tucu-ui';

<TahoeMenuBar appName="MyApp" menuItems={[{ label: 'File', items: [] }]} />`,
    relatedComponents: ['TahoeDesktop', 'TahoeWindow'],
    themeAware: true,
  },
];

export function getCategories(): string[] {
  return [...new Set(componentRegistry.map((c) => c.category))];
}

export function getComponentByName(
  name: string
): ComponentRegistryEntry | undefined {
  return componentRegistry.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );
}

export function getComponentsByCategory(
  category: string
): ComponentRegistryEntry[] {
  return componentRegistry.filter(
    (c) => c.category.toLowerCase() === category.toLowerCase()
  );
}
