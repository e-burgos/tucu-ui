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
    description: 'Text input field with label, validation, and variants.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      variant: ['solid', 'ghost', 'transparent'],
    },
    example: `import { Input } from '@e-burgos/tucu-ui';

<Input label="Email" placeholder="you@example.com" variant="ghost" />`,
    relatedComponents: ['InputSearcher', 'Form'],
    themeAware: true,
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
      'Data table with sorting, filtering, pagination, and row actions. Built on @tanstack/react-table.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { BasicTable } from '@e-burgos/tucu-ui';

<BasicTable
  columns={[{ header: 'Name', accessorKey: 'name' }]}
  data={[{ name: 'Alice' }]}
/>`,
    relatedComponents: ['Card'],
    themeAware: true,
  },
  {
    name: 'DataTable',
    category: 'tables',
    description:
      'Advanced data table with sorting, global searching/filtering, pagination, pinning, resizing, state persistence, sub-components, row selection, columns visibility toggling, and custom header actions. Built on @tanstack/react-table and automatically theme-aware (uses CSS variables/tokens for light/dark mode).',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      mode: ['light', 'dark'],
    },
    example: `import { DataTable, Button, ListContainer } from '@e-burgos/tucu-ui';

const columns = [
  { header: 'ID', accessorKey: 'id' },
  { header: 'Name', accessorKey: 'name' },
  { header: 'Role', accessorKey: 'role' }
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
    description: 'Side panel that slides in from the edge of the screen.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { Drawer } from '@e-burgos/tucu-ui';

<Drawer isOpen={true} onClose={() => {}} position="right">
  <p>Drawer content</p>
</Drawer>`,
    relatedComponents: ['Modal', 'ConfirmDialog'],
    themeAware: true,
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
    name: 'List',
    category: 'lists',
    description: 'Vertical list container.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { List, ListItem } from '@e-burgos/tucu-ui';

<List>
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
</List>`,
    relatedComponents: ['ListItem'],
    themeAware: true,
  },
  {
    name: 'ListItem',
    category: 'lists',
    description: 'Individual item within a List.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { List, ListItem } from '@e-burgos/tucu-ui';

<ListItem onClick={() => {}}>Clickable item</ListItem>`,
    relatedComponents: ['List'],
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
