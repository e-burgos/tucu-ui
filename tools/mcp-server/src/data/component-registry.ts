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
    description:
      'Primary action button with multiple variants and sizes. Renders the `<button>` directly (no wrapper) unless `tooltip` is set; then `wrapperClassName` styles the wrapper. `type` defaults to `"button"`. `className` is merged with tailwind-merge, so `h-*`, `bg-*` or `text-*` overrides win. Font size scales with `size` (xs/tiny/mini 12px, small 13px, medium 14px, large 16px). `ghost` has a 2px border, `outline` a 1px border. `shape` rounded | pill | circle | square (`square` is an icon-only square with the same sizes as `circle`).',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      variant: ['solid', 'ghost', 'outline', 'transparent'],
      size: ['large', 'medium', 'small', 'mini', 'tiny', 'xs'],
      shape: ['rounded', 'pill', 'circle', 'square'],
    },
    example: `import { Button } from '@e-burgos/tucu-ui';

<Button variant="solid" size="medium" onClick={() => {}}>
  Click me
</Button>`,
    relatedComponents: ['IconButton'],
    themeAware: true,
    warnings: [
      "NEVER use variant='primary' or 'destructive' — causes runtime crash. Use color='danger' for destructive actions.",
      "NEVER use size='lg', 'sm', 'md' — causes runtime crash. The smallest size is 'xs'.",
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
      'Text input field with label, validation, masks and variants. `icon` renders in a 40px slot on the left and adds `pl-[40px]` automatically. **Masks** (`mask`): `phone` (Argentina by default: `+54 9 11 2345-6789`, `11 2345-6789`; other countries via `phoneCountry` / `registerPhoneCountry`, generic `INTL`), `cuit` (`20-12345678-6`), `currency` (`$ 1.234,56`, locale from `maskOptions.locale` or the theme lang) and `number`, or a custom `MaskDefinition` from `createMask`. With `unmask`, `onChange` receives the raw value (E.164 phone, CUIT digits, plain number string) while the input keeps showing the formatted text. **Built-in validation** (`autoValidate`, default true): `type="email" | "tel" | "url"`, `mask="phone" | "cuit"`, `validationType` and `required` validate on blur (and on change after the first blur) and show a localized message (es/en/fr from `ThemeProvider lang`) when no `error` prop is given; `onValidationChange` reports the result. `error` sets `aria-invalid` and links the message via `aria-describedby`. `type="date"` is a custom picker: the input is `readOnly`, displays `dateFormat` (default `DD/MM/YYYY`), `onChange` receives ISO `YYYY-MM-DD`, `min`/`max` (ISO) disable out-of-range days, and `locale` defaults to the theme lang (es → es-AR). `suffix` is a LEADING adornment rendered at the start of the field (legacy name); `endAdornment` (ReactNode) renders at the end. `shortcut` (string, e.g. "⌘K") renders a `<kbd>` hint at the end and sets `aria-keyshortcuts`; `shortcutHideOnValue` (default true) hides the hint once the field has a value.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      variant: ['solid', 'ghost', 'transparent'],
      mask: ['phone', 'cuit', 'currency', 'number'],
      size: ['xs', 'sm', 'md', 'lg'],
    },
    example: `import { Input } from '@e-burgos/tucu-ui';

<Input label="Email" type="email" placeholder="you@example.com" />

<Input label="Teléfono" type="tel" mask="phone" phoneCountry="AR" unmask
  value={phone} onChange={(e) => setPhone(e.target.value)} />  // phone = '+5491123456789'

<Input label="CUIT" mask="cuit" />
<Input label="Precio" mask="currency" unmask maskOptions={{ locale: 'es-AR', decimals: 2 }} />

<Input label="Nacimiento" type="date" max={new Date().toISOString().slice(0, 10)}
  value={value} onChange={(e) => setValue(e.target.value)} />`,
    relatedComponents: ['FormField', 'Form', 'InputSearcher'],
    themeAware: true,
    warnings: [
      '`type="date"` makes the visible input `readOnly` — only picking from the calendar updates the value.',
      '`onChange` for `type="date"` always receives ISO (`YYYY-MM-DD`) regardless of `dateFormat`.',
      'Inside `FormField`, the Input skips its own validation (FormField adds the same rules to react-hook-form and renders the error).',
      '`unmask` is meant for controlled inputs (`value` + `onChange`, or `FormField`); with uncontrolled `register` the DOM keeps the formatted text.',
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
    description:
      'Dropdown select with options list (custom listbox in a portal). `native` renders a real `<select>`/`<option>` with the same `options` and `onChange(option)`. `id` links an external `<label htmlFor>`; external `aria-labelledby`/`aria-describedby` are merged with the helper/error ids. Options with the same `group` render under a non-selectable header (`<optgroup>` in native mode). `onChange` does not fire when the selected option is picked again. `size="xs"` is compact (trigger and listbox); `listboxClassName` styles the listbox. `hideLabel` and `hideHelperText` hide the label / helper text visually; `appearance` (default | neutral) switches the trigger look (token `--tucu-select-radius`). Escape closes only the open listbox; inside a Modal a second Escape closes the Modal. `label` accepts a ReactNode. `menuWidth` (trigger | content) sizes the listbox to the trigger or to its content, `maxMenuHeight` caps it (number, CSS length or "auto" to fit the viewport), `wrapDescription` wraps option descriptions and `descriptionClassName` styles them. `renderValue(option)` customizes the trigger content, an option `triggerLabel` shortens what the trigger shows for that option, and `triggerClassName` styles the trigger.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      variant: ['solid', 'ghost', 'transparent'],
      size: ['xs', 'sm', 'md', 'lg'],
    },
    example: `import { Select } from '@e-burgos/tucu-ui';

<Select
  options={[{ name: 'Option A', value: 'a' }]}
  value="a"
  onSelect={(value) => console.log(value)}
  variant="ghost"
  label="Choose"
/>

<Select
  label={<strong>Plan</strong>}
  options={[
    { name: 'Professional monthly plan', value: 'pro', description: 'Billed every month', triggerLabel: 'Pro' },
    { name: 'Enterprise yearly plan', value: 'ent', description: 'Billed every year', triggerLabel: 'Enterprise' },
  ]}
  selectedOption={plan}
  onChange={setPlan}
  menuWidth="content"
  maxMenuHeight="auto"
  wrapDescription
/>`,
    relatedComponents: ['InputSearcher', 'Form', 'FilterBar'],
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
    description:
      'Multi-line text input. Same class convention as Input: `className`/`wrapperClassName` style the container, `inputClassName` the `<textarea>`, `labelTextClassName` the label. `size="xs"` is a compact control. `aria-invalid` is set only with `error`.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      variant: ['solid', 'ghost', 'transparent'],
      size: ['xs', 'sm', 'md', 'lg'],
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
  {
    name: 'SegmentedControl',
    category: 'inputs',
    description:
      'Single-choice segmented switch with a sliding thumb (radiogroup semantics, arrow-key navigation). `options` ({ value, label, icon, disabled }), `value`, `onChange(value)`, `size` xs | sm | md, `fullWidth`, `scrollable`, `label` / `aria-label`, `disabled`. Tokens `--tucu-segmented-*`.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      size: ['xs', 'sm', 'md'],
    },
    example: `import { SegmentedControl } from '@e-burgos/tucu-ui';

const [view, setView] = useState('list');

<SegmentedControl
  aria-label="View"
  value={view}
  onChange={setView}
  options={[
    { value: 'list', label: 'List' },
    { value: 'grid', label: 'Grid' },
  ]}
/>`,
    relatedComponents: ['TabGroup', 'AnimatedTabs', 'FilterPill'],
    themeAware: true,
  },
  {
    name: 'FilterPill',
    category: 'inputs',
    description:
      'Toggle pill for quick filters. `active` marks it as pressed (`aria-pressed`), `count` shows a counter, `tone` green | orange | red | teal | purple | neutral colors the active state. Extends button attributes.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      tone: ['green', 'orange', 'red', 'teal', 'purple', 'neutral'],
    },
    example: `import { FilterPill } from '@e-burgos/tucu-ui';

<FilterPill active={status === 'pending'} count={4} tone="orange" onClick={() => setStatus('pending')}>
  Pending
</FilterPill>`,
    relatedComponents: ['FilterBar', 'SegmentedControl', 'StateBadge'],
    themeAware: true,
  },
  {
    name: 'FilterBar',
    category: 'inputs',
    description:
      'Toolbar for list filtering. `search` ({ value, onChange, placeholder }), `filters` (select filters with `id`, `label`, `value`, `onChange`, `options`, `ignoreInActiveCount`), `pills` (FilterPill nodes), `toggle` ({ checked, onChange, label }), `actions`, `onClear` (shows a clear button when filters are active), `activeCount` (overrides the computed count), `collapsible` (collapses secondary filters on small screens) and `children` for extra controls.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { FilterBar, FilterPill } from '@e-burgos/tucu-ui';

<FilterBar
  search={{ value: query, onChange: setQuery, placeholder: 'Search orders' }}
  filters={[
    {
      id: 'status',
      label: 'Status',
      value: status,
      onChange: setStatus,
      options: [
        { name: 'All', value: 'all' },
        { name: 'Paid', value: 'paid' },
      ],
    },
  ]}
  pills={<FilterPill active={onlyOpen} onClick={() => setOnlyOpen(!onlyOpen)}>Open</FilterPill>}
  onClear={() => resetFilters()}
  collapsible
/>`,
    relatedComponents: ['FilterPill', 'Select', 'InputSearcher'],
    themeAware: true,
  },

  // ─── FORMS ───────────────────────────────────────────────
  {
    name: 'Form',
    category: 'forms',
    description:
      'Form wrapper built on react-hook-form (FormProvider + handleSubmit). Fields are connected with `FormField`, which infers validators from the child Input (email, tel, url, phone/cuit masks) and localizes `required: true`. Standalone validators and masks are exported too: `validateEmail`, `validatePhone`, `validateUrl`, `validateCuit`, `validateRequired`, `getValidationRules(type, { lang, required, phoneCountry })`, `formatPhone`, `normalizePhone`, `formatCuit`, `isValidCuit`, `formatNumber`, `parseNumber`, `createMask`, `registerPhoneCountry`.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { Form, FormField, Input, Button } from '@e-burgos/tucu-ui';

<Form<Customer> onSubmit={save} useFormProps={{ defaultValues: { email: '', phone: '' }, mode: 'onTouched' }}>
  <FormField<Customer> name="email" label="Email" rules={{ required: true }}>
    <Input type="email" />
  </FormField>
  <FormField<Customer> name="phone" label="Teléfono">
    <Input type="tel" mask="phone" unmask />
  </FormField>
  <Button type="submit">Guardar</Button>
</Form>`,
    relatedComponents: ['FormField', 'Input', 'Select', 'Checkbox', 'Switch'],
    themeAware: true,
    warnings: [
      'Form has no `defaultValues` prop: pass them through `useFormProps={{ defaultValues }}`.',
      'Inputs are NOT auto-registered by `name`: wrap each one in `FormField name="..."` (or use the render-function `register`).',
    ],
  },
  {
    name: 'FormField',
    category: 'forms',
    description:
      'Connects a child control (Input, Select, Checkbox, Radio, PinCode, Textarea…) to the parent Form through a react-hook-form Controller, and renders the error below it. `autoValidate` (default true) adds the validator inferred from the child Input (`type="email"|"tel"|"url"`, `mask="phone"|"cuit"`, `validationType`) on top of your own `rules`, and turns `required: true` into a localized message. The Input gets `aria-invalid` and `aria-describedby` pointing at the error.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { FormField, Input, getValidationRules } from '@e-burgos/tucu-ui';

<FormField name="email" label="Email" rules={{ required: true }}>
  <Input type="email" />
</FormField>

<FormField name="cuit" label="CUIT" rules={getValidationRules('cuit', { lang: 'es', required: true })}>
  <Input mask="cuit" unmask autoValidate={false} />
</FormField>`,
    relatedComponents: ['Form', 'Input'],
    themeAware: true,
  },

  // ─── CARDS ───────────────────────────────────────────────
  {
    name: 'Card',
    category: 'cards',
    description:
      'Container card with optional header, footer, and actions. Flex column whose body (`data-tucu="card-body"`) is `flex-1`, so the footer sticks to the bottom. `density` (compact | default | comfortable) sets the padding; `bodyClassName` styles the body; `className` overrides bg/rounded; `aria-*`/`data-*` reach the root.',
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
  {
    name: 'StatCard',
    category: 'cards',
    description:
      'KPI card. `title`, `value`, `subtitle`, `icon`, `tone` brand | neutral | success | warning | danger | info, `trend` ({ value, direction up | down | flat, label, positiveIsGood }), `progress` ({ value, max, label }), `loading` skeleton, and `onClick` or `href` to make it interactive.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      tone: ['brand', 'neutral', 'success', 'warning', 'danger', 'info'],
    },
    example: `import { StatCard, MoneyText } from '@e-burgos/tucu-ui';

<StatCard
  title="Revenue"
  value={<MoneyText value={48200} currency="USD" variant="total" />}
  tone="success"
  trend={{ value: '12%', direction: 'up', label: 'vs last month' }}
  progress={{ value: 72, max: 100, label: 'Goal' }}
/>`,
    relatedComponents: ['StatsCard', 'InfoCard', 'MoneyText'],
    themeAware: true,
  },

  // ─── TABLES ──────────────────────────────────────────────
  {
    name: 'BasicTable',
    category: 'tables',
    description:
      'Lightweight generic table (no @tanstack/react-table). Columns are declared as { key, label, render? }. Supports striped/hoverable rows, borders, rounded corners, a sticky header, column resizing and a maxRows scroll cap. Responsive by default: below the cardBreakpoint (md) each row collapses into a stacked card of label/value pairs — pass mobileCards={false} to keep a table at every width. `resizable` and `mobileCards` default to true. `density` (compact | snug | default; compact is text-xs px-2 py-1), hover color from `--tucu-table-row-hover`, `cellDividers={false}` removes inner dividers but keeps the outer border, `rowHeight` makes `maxRows` exact (otherwise the first row is measured). Colors come from `--tucu-table-*` tokens; `data-testid`/`aria-*` reach the root. For sorting, filtering, pagination and row selection use DataTable instead.',
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
      "Full admin layout with pinnable expandable sidebar, header, and content area. `isOpen`/`setIsOpen` (required) drive the mobile drawer. Sidebar pinning: `sidebarPinned` (controlled), `defaultSidebarPinned`, `onSidebarPinnedChange` — forwarded to the internal ExpandableSidebar's `pinned`/`defaultPinned`/`onPinnedChange`. In uncontrolled mode the pinned state persists automatically via the theme store. While pinned, the content area pads to the expanded sidebar width (288px xl / 320px 2xl) so it is never covered. `collapsedLogo` shows a distinct brand mark on the collapsed 96px rail.",
    importPath: '@e-burgos/tucu-ui',
    example: `import { useState } from 'react';
import { AdminLayout } from '@e-burgos/tucu-ui';

const [isOpen, setIsOpen] = useState(false);

<AdminLayout
  logo={{ name: 'Acme', secondName: 'Admin' }}
  collapsedLogo={{ name: 'A' }}
  menuItems={[{ name: 'Home', path: '/' }]}
  isOpen={isOpen}
  setIsOpen={setIsOpen}
  defaultSidebarPinned
>
  <Outlet />
</AdminLayout>`,
    relatedComponents: ['ExpandableSidebar', 'MacOSLayout', 'ThemeProvider'],
    themeAware: true,
    warnings: [
      '`isOpen` and `setIsOpen` are required — they drive the mobile drawer, not the desktop sidebar pin.',
      'Menu items use `name`, not `label` (IMenuItem).',
    ],
  },
  {
    name: 'ExpandableSidebar',
    category: 'layouts',
    description:
      "Collapsible sidebar rail (96px, 112px on 2xl) that expands on hover and can be pinned open via a subtle arrow toggle on its outer edge (aria-pressed, data-tucu=\"sidebar-pin\", titles 'Expand menu'/'Collapse menu'). Pin state: `pinned` (controlled), `defaultPinned`, `onPinnedChange`; uncontrolled mode persists automatically through useTheme().isSidebarPinned (theme-storage localStorage key). Hovering the edge toggle deliberately does not hover-expand the sidebar (the button would move away mid-click). `collapsedLogo` renders a distinct brand in the collapsed rail, falling back to `logo` with isoType. Items with `hide: true` are filtered individually; the active item highlights in both the collapsed rail and the expanded panel. Usually consumed through AdminLayout, which also pads its content while pinned.",
    importPath: '@e-burgos/tucu-ui',
    example: `import { ExpandableSidebar } from '@e-burgos/tucu-ui';

<ExpandableSidebar
  logo={{ name: 'Acme', secondName: 'Admin' }}
  collapsedLogo={{ name: 'A' }}
  menuItems={[{ name: 'Home', path: '/' }]}
  defaultPinned
  onPinnedChange={(pinned) => console.log('pinned:', pinned)}
/>`,
    relatedComponents: ['AdminLayout', 'MenuItem', 'Logo'],
    themeAware: true,
    warnings: [
      'Standalone usage does not shift surrounding content while pinned — that adaptive padding lives in AdminLayout. Compose your own layout padding if you mount it directly.',
      'Controlled `pinned` bypasses the built-in persistence — pair it with `onPinnedChange` and your own storage.',
    ],
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
      'Theme context provider. Wraps the app to enable theming via useTheme hook. `lang` (`en` | `es` | `fr`, also `es-AR`-style tags) sets the language of built-in strings: validation messages, aria labels, DataTable pagination and empty states, date picker.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { ThemeProvider } from '@e-burgos/tucu-ui';

<ThemeProvider preset="elegant" defaultMode="system" menuItems={menuItems}>
  <App />
</ThemeProvider>`,
    relatedComponents: ['AdminLayout', 'MacOSLayout', 'ThemeScope'],
    themeAware: false,
  },
  {
    name: 'ThemeScope',
    category: 'layouts',
    description:
      'Applies a theme preset to a subtree without touching the rest of the page: sets the preset CSS variables (`--tucu-accent`, `--tucu-radius`, `--tucu-card-*`, fonts), the `data-tucu-*` attributes and the `dark` class for its own mode. `preset` is a registered name or an inline `ThemePreset`; `mode` is `light | dark | auto` (auto follows `<html class="dark">`, default is the preset surface); `tokens` adds raw CSS variables; `as` changes the root element. Nested scopes without a preset inherit the parent preset and mode. Overlays (Modal, Drawer, Select listbox, tooltips) opened inside a scope mount in its own `[data-tucu="theme-scope-portal"]` host so they keep the scope theme; read it with `usePortalContainer()`. `dark:` utilities honor one level of opposite-mode nesting (a light scope inside `html.dark`). Presets: built-ins `glass | classic | elegant | fresh | minimal | vibrant`, plus `defineThemePreset`, `registerThemePresets`, `getThemePreset`, `listThemePresets` and `resolveThemePreset({ host, tenant, rules, fallback })` to pick one per host/tenant.',
    importPath: '@e-burgos/tucu-ui',
    example: `import {
  ThemeScope,
  registerThemePresets,
  resolveThemePreset,
} from '@e-burgos/tucu-ui';

registerThemePresets({ name: 'acme', accent: '#e11d48', radius: 'lg', cards: 'solid' });

const preset = resolveThemePreset({
  host: window.location.host,
  rules: [{ host: '*.acme.com', preset: 'acme' }],
  fallback: 'glass',
});

<ThemeScope preset={preset ?? 'glass'} mode="dark" className="p-6 rounded-xl">
  <Card>...</Card>
  <Button>Open modal</Button>
</ThemeScope>`,
    relatedComponents: ['ThemeProvider', 'Modal', 'Select', 'Card'],
    themeAware: true,
    warnings: [
      'Portals opened inside a scope mount in the scope portal host; give the scope `relative` or `isolate` if you need to contain its z-index.',
      'Only one level of opposite-mode nesting is supported for `dark:` utilities (a light scope inside html.dark, or the inverse).',
      'Use `styles-core` when you do not use the macOS themes; it is about half the size of `styles`.',
    ],
  },

  // ─── DIALOGS ─────────────────────────────────────────────
  {
    name: 'Modal',
    category: 'dialogs',
    description:
      'Overlay modal dialog. `isOpen` + `setIsOpen` are required; `text.title` accepts a ReactNode and `header` replaces the whole title area. `size` (sm | md | lg | xl | full, default md) sets width and body height. `aria-label`, `aria-describedby` and `data-*` reach the `role="dialog"` element. Escape closes only the top-most modal (handled on the dialog) and a click on the overlay closes it; `closeable={false}` disables both. The close button label comes from the theme lang (override with `closeLabel`). Closing is immediate (no delay). `overlayClassName` and `headerClassName` style the overlay and header; `closeButtonProps` (button attributes and `data-*`) customizes the close button and its `aria-label` wins over `closeLabel`; `maxWidth` and `maxHeight` (number | string) cap the dialog; `initialFocusRef` picks the initially focused element (default: the dialog). The title is a full-width `<div data-tucu="modal-title">` so block content is allowed; ids come from `useId`. `role` (dialog | alertdialog) sets the dialog role and `aria-labelledby` overrides the generated title id.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      size: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    example: `import { Modal } from '@e-burgos/tucu-ui';

const [isOpen, setIsOpen] = useState(false);

<Modal
  isOpen={isOpen}
  setIsOpen={setIsOpen}
  size="sm"
  aria-label="Confirm deletion"
  text={{ title: 'Confirm' }}
>
  <p>Are you sure?</p>
</Modal>`,
    relatedComponents: ['Drawer', 'ConfirmDialog', 'SplitModal'],
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
    description:
      'Confirmation dialog built on Modal with `role="alertdialog"`: `title` labels it and `description` describes it. `tone` (danger | warning | info | success) sets the icon and the confirm button colour; `loading` shows a spinner on confirm, disables both buttons and blocks Escape and overlay closing. Initial focus is the cancel button for `danger` and the confirm button otherwise (`initialFocus` overrides). `onCancel` runs on cancel, Escape and overlay click. Labels default to localized `confirmDialog.confirm` / `confirmDialog.cancel`. Props are `isOpen`, `onConfirm`, `onCancel`, `title`, `description` (not `message`).',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      tone: ['danger', 'warning', 'info', 'success'],
      initialFocus: ['confirm', 'cancel'],
    },
    example: `import { ConfirmDialog } from '@e-burgos/tucu-ui';

const [open, setOpen] = useState(false);
const [deleting, setDeleting] = useState(false);

<ConfirmDialog
  isOpen={open}
  tone="danger"
  title="Delete invoice?"
  description="This action cannot be undone."
  confirmLabel="Delete"
  loading={deleting}
  onConfirm={async () => {
    setDeleting(true);
    await removeInvoice();
    setDeleting(false);
    setOpen(false);
  }}
  onCancel={() => setOpen(false)}
/>`,
    relatedComponents: ['Modal', 'SplitModal'],
    themeAware: true,
  },
  {
    name: 'SplitModal',
    category: 'dialogs',
    description:
      'Two-pane dialog (sidebar navigation + scrollable body) built on Modal; below the `md` breakpoint the sidebar becomes a tab bar. `sections` groups `SplitModalNavItem`s (`id`, `label`, `icon`, `badge`, `status` neutral | success | warning | danger | info rendered as a dot with a screen-reader description, `disabled`, `description`). Active item is controlled with `activeItemId` + `onActiveItemChange(id)` or uncontrolled with `defaultActiveItemId`; arrow keys move between items. `sidebarHeader`, `sidebarFooter`, `sidebar`, `sidebarPosition` (start | end), `sidebarWidth`, `footer`, `chips`, `headerActions`, `maxWidth` / `maxHeight` / `size`. `onClose` and `setIsOpen(false)` both run on close. Tokens: `--tucu-split-modal-*`.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      sidebarPosition: ['start', 'end'],
      size: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    example: `import { SplitModal, Badge, Button } from '@e-burgos/tucu-ui';

const [open, setOpen] = useState(true);
const [activeId, setActiveId] = useState('overview');

<SplitModal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Contract 2024-117"
  chips={<Badge tone="success" variant="soft">Signed</Badge>}
  activeItemId={activeId}
  onActiveItemChange={setActiveId}
  sections={[
    {
      id: 'main',
      label: 'Document',
      items: [
        { id: 'overview', label: 'Overview', status: 'success' },
        { id: 'clauses', label: 'Clauses', badge: <Badge tone="warning" size="xs">3</Badge>, status: 'warning' },
        { id: 'payments', label: 'Payments', status: 'danger', description: '1 overdue' },
      ],
    },
    { id: 'extra', label: 'Other', items: [{ id: 'history', label: 'History' }] },
  ]}
  sidebarFooter={
    <div className="flex gap-2">
      <Button size="small" variant="ghost">Download</Button>
      <Button size="small">Share</Button>
    </div>
  }
>
  <p>Content for {activeId}</p>
</SplitModal>`,
    relatedComponents: ['SplitModalWizard', 'Modal', 'ConfirmDialog'],
    themeAware: true,
  },
  {
    name: 'SplitModalWizard',
    category: 'dialogs',
    description:
      'Step-by-step wizard on top of SplitModal: steps are listed in the sidebar and the active one renders in the body with previous / next buttons. `steps` (`id`, `title`, `description`, `icon`, `heading`, `hint`, `content`, `disabled`), controlled `activeStepId` + `onStepChange(id)`. `validateStep(id)` may return a boolean or a Promise and runs before moving forward (going back never validates); a failed validation keeps the step. `primaryAction` replaces the next button on the last step (`primaryAlwaysVisible` shows it on every step), `onCancel` shows the cancel button, `showProgress` adds "Step i of N" and a progress bar, `subtitle` and `sidebarAside` fill the sidebar. Accepts the SplitModal layout props (`maxWidth`, `size`, `sidebarWidth`, ...).',
    importPath: '@e-burgos/tucu-ui',
    example: `import { SplitModalWizard, Button } from '@e-burgos/tucu-ui';

const [open, setOpen] = useState(true);
const [step, setStep] = useState('account');

<SplitModalWizard
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Create workspace"
  subtitle="Three quick steps"
  activeStepId={step}
  onStepChange={setStep}
  showProgress
  validateStep={async (id) => {
    if (id === 'account') return (await checkEmailAvailable(email)) === true;
    return true;
  }}
  onCancel={() => setOpen(false)}
  primaryAction={<Button onClick={() => submit()}>Create</Button>}
  steps={[
    { id: 'account', title: 'Account', content: <AccountForm /> },
    { id: 'team', title: 'Team', description: 'Invite people', content: <TeamForm /> },
    { id: 'review', title: 'Review', content: <ReviewSummary /> },
  ]}
/>`,
    relatedComponents: ['SplitModal', 'Modal'],
    themeAware: true,
  },

  // ─── NOTIFICATIONS ───────────────────────────────────────
  {
    name: 'Alert',
    category: 'notifications',
    description:
      'Inline alert message with variant-based styling. `live="polite"` renders `role="status"` for non-urgent messages (default is `role="alert"`, assertive). `appearance` (soft | ink | line) switches to theme-token tones. `aria-*` and `data-*` reach the root. `density` (default | compact) tightens padding.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      variant: ['error', 'success', 'info', 'warning'],
      appearance: ['soft', 'ink', 'line'],
      density: ['default', 'compact'],
      live: ['assertive', 'polite'],
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
    name: 'InlineNotice',
    category: 'notifications',
    description:
      'Compact inline status message for forms and panels. `tone` error | success | info | warning (error announces assertively, the rest politely). `messages` takes a string, an array (rendered as a bullet list) or a node, and renders nothing when empty.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      tone: ['error', 'success', 'info', 'warning'],
    },
    example: `import { InlineNotice } from '@e-burgos/tucu-ui';

<InlineNotice tone="error" messages={['Email is required', 'Password is too short']} />
<InlineNotice tone="success" messages="Changes saved" />`,
    relatedComponents: ['Alert', 'StateBadge'],
    themeAware: true,
  },
  {
    name: 'Toast',
    category: 'notifications',
    description:
      'Toast region driven by the toast store. ThemeProvider layouts already mount the right renderer for each theme (default, macOS Sonoma, macOS Tahoe), so apps only call `showToast(message, { title, variant, timeout })` or `useToastStore().addToast({...})`. Variants: `default`, `success`, `info`, `warning`, `destructive`. Toasts use an opaque surface with AA contrast in light/dark; restyle via the `--tucu-toast-bg | -fg | -fg-muted | -border | -shadow` CSS variables. Auto-dismiss (default 3000 ms) pauses while hovered or focused.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      variant: ['default', 'success', 'info', 'warning', 'destructive'],
    },
    example: `import { showToast, useToastStore } from '@e-burgos/tucu-ui';

showToast('Cambios guardados', { variant: 'success' });
showToast('No se pudo guardar', { title: 'Error', variant: 'destructive', timeout: 6000 });

// Same thing through the store (id is optional now)
useToastStore.getState().addToast({ message: 'Hola', variant: 'info' });`,
    relatedComponents: ['Alert', 'Notification'],
    themeAware: true,
    warnings: [
      '`<Toast />` takes no props and is already mounted by ThemeProvider layouts — do not render it again or pass `variant`/`message` to it.',
    ],
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
      'Placeholder loading skeleton for content that is being fetched. Colors come from `--tucu-skeleton-bg` / `--tucu-skeleton-shine`; `data-tucu="skeleton"`.',
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
  {
    name: 'EmptyState',
    category: 'feedback',
    description:
      'Empty-list placeholder (`role="status"`). `title`, `description`, `icon`, `action`, `secondaryAction`, `size` sm | md | lg, `variant` plain | card. Tokens `--tucu-state-view-*`.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      size: ['sm', 'md', 'lg'],
      variant: ['plain', 'card'],
    },
    example: `import { EmptyState, Button } from '@e-burgos/tucu-ui';

<EmptyState
  title="No invoices yet"
  description="Create your first invoice to see it here."
  action={<Button onClick={create}>New invoice</Button>}
/>`,
    relatedComponents: ['ErrorState', 'SystemStatePage'],
    themeAware: true,
  },
  {
    name: 'ErrorState',
    category: 'feedback',
    description:
      'Error placeholder (`role="alert"`). `title` (localized default), `description`, `onRetry` shows a retry button (`retryLabel`), `error` is rendered inside a details disclosure (`detailsLabel`), plus the EmptyState props `icon`, `action`, `size`, `variant`.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { ErrorState } from '@e-burgos/tucu-ui';

<ErrorState
  description="We could not load your invoices."
  error={error}
  onRetry={() => refetch()}
/>`,
    relatedComponents: ['EmptyState', 'SystemStatePage'],
    themeAware: true,
  },
  {
    name: 'SystemStatePage',
    category: 'feedback',
    description:
      'Full-page state for 404, 500 or maintenance screens. `code` (large figure), `title`, `description`, `icon`, `action`, `secondaryAction`, `tone` neutral | error.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      tone: ['neutral', 'error'],
    },
    example: `import { SystemStatePage, Button } from '@e-burgos/tucu-ui';

<SystemStatePage
  code="404"
  title="Page not found"
  description="The page you are looking for does not exist."
  action={<Button onClick={goHome}>Back to home</Button>}
/>`,
    relatedComponents: ['EmptyState', 'ErrorState'],
    themeAware: true,
  },

  // ─── TABS ────────────────────────────────────────────────
  {
    name: 'TabGroup',
    category: 'tabs',
    description:
      'Accessible tabs (roving tabindex, arrow/Home/End keys, aria-controls). Compose `TabGroup` › `TabList` › `TabItem` and `TabPanels` › `TabPanel`. Controlled (`selectedIndex` + `onChange`) or uncontrolled (`defaultIndex`). Variants: underline, pills, bordered, solid. On xs/sm, `TabList` renders a dropdown unless `responsive={false}`. To keep the tab in the URL (survives reload, linkable, back/forward), use `useTabParam` or `ParamTab`.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      variant: ['underline', 'pills', 'bordered', 'solid'],
    },
    example: `import { TabGroup, TabList, TabItem, TabPanels, TabPanel, useTabParam } from '@e-burgos/tucu-ui';

const TABS = ['general', 'branches', 'payments'] as const;
const [tab, setTab] = useTabParam({ values: TABS, param: 'tab' }); // ?tab=branches

<TabGroup variant="pills" selectedIndex={TABS.indexOf(tab)} onChange={(i) => setTab(TABS[i])}>
  <TabList variant="pills">
    <TabItem variant="pills">General</TabItem>
    <TabItem variant="pills">Sucursales</TabItem>
    <TabItem variant="pills">Formas de pago</TabItem>
  </TabList>
  <TabPanels>
    <TabPanel>…</TabPanel>
    <TabPanel>…</TabPanel>
    <TabPanel>…</TabPanel>
  </TabPanels>
</TabGroup>`,
    relatedComponents: ['ParamTab', 'TabSelect'],
    themeAware: true,
    warnings: [
      'There is no `Tabs` component — use TabGroup/TabList/TabItem/TabPanels/TabPanel, or ParamTab.',
      'useTabParam and ParamTab need the router context (ThemeProvider provides it).',
    ],
  },
  {
    name: 'ParamTab',
    category: 'tabs',
    description:
      'Tabs whose selection lives in a URL search param (default `?view=<path>`). The selected tab is derived from the URL on every render, so it follows reloads, links, back/forward and external navigation. Props: `tabMenu` ({ title, path, icon }[]), `paramName`, `defaultIndex`, `replace` (default true; false pushes history entries), `onChange(index, item)`, `variant`, `size`, `showMobileSelect`.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { ParamTab, TabPanel } from '@e-burgos/tucu-ui';

<ParamTab paramName="tab" replace={false} tabMenu={[
  { title: 'General', path: 'general' },
  { title: 'Sucursales', path: 'branches' },
]}>
  <TabPanel><GeneralSettings /></TabPanel>
  <TabPanel><BranchesSettings /></TabPanel>
</ParamTab>`,
    relatedComponents: ['TabGroup'],
    themeAware: true,
  },
  {
    name: 'AnimatedTabs',
    category: 'tabs',
    description:
      'Tab bar with an animated indicator. `tabs` ({ id, label, icon, badge, disabled }), `activeTab`, `onChange(id)`, `size` sm | md, `mobile` select | scroll (how it collapses on small screens) and `queryParamKey` to sync the active tab with a URL search param.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      size: ['sm', 'md'],
      mobile: ['select', 'scroll'],
    },
    example: `import { AnimatedTabs } from '@e-burgos/tucu-ui';

const [tab, setTab] = useState('overview');

<AnimatedTabs
  activeTab={tab}
  onChange={setTab}
  tabs={[
    { id: 'overview', label: 'Overview' },
    { id: 'activity', label: 'Activity', badge: 3 },
  ]}
/>`,
    relatedComponents: ['TabGroup', 'ParamTab', 'SegmentedControl'],
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
    description:
      'Small status badge/tag. With `tone` (primary | success | info | warning | danger | neutral) the colors come from theme tokens; `variant` soft (tinted), ink (solid) or line (1px border) sets the appearance. Tones `green | orange | red | teal | purple` read the `--tucu-state-<tone>-soft|ink|line` tokens. `struck` strikes the label through (cancelled or expired). For order/payment states prefer `StateBadge`. `size="micro"` is the smallest badge.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      variant: ['solid', 'ghost', 'outline', 'soft', 'ink', 'line'],
      tone: [
        'primary',
        'success',
        'info',
        'warning',
        'danger',
        'neutral',
        'green',
        'orange',
        'red',
        'teal',
        'purple',
      ],
      size: ['micro', 'xs', 'tiny', 'small', 'medium', 'large'],
    },
    example: `import { Badge } from '@e-burgos/tucu-ui';

<Badge variant="solid">Active</Badge>`,
    relatedComponents: ['Avatar', 'Button', 'StateBadge'],
    themeAware: true,
    warnings: [
      "NEVER use variant='secondary' or 'flat' — causes runtime crash.",
    ],
  },
  {
    name: 'Image',
    category: 'common',
    description:
      'Image with lazy loading, blur placeholder and fallback. When `src` is missing or fails to load it renders, in order, `fallbackSrc`, `fallback` (any node) or a centered `fallbackIcon`; `fallbackClassName` styles the fallback box. `fill`, `aspectRatio`, `objectFit`, `containerClassName` control layout. `alt` is required.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { Image } from '@e-burgos/tucu-ui';

<Image
  src={product.photoUrl}
  alt={product.name}
  aspectRatio="4/3"
  fallbackSrc="/placeholder.png"
/>`,
    relatedComponents: ['SafeImage', 'Lightbox', 'Avatar'],
    themeAware: true,
  },
  {
    name: 'SafeImage',
    category: 'common',
    description:
      'Image that never shows a broken-image glyph: same props as `Image`, with an empty `fallbackIcon` by default so a failed load renders a neutral box. Pass `fallbackIcon`, `fallback` or `fallbackSrc` to customize.',
    importPath: '@e-burgos/tucu-ui',
    example: `import { SafeImage } from '@e-burgos/tucu-ui';

<SafeImage
  src={user.avatarUrl}
  alt={user.name}
  aspectRatio="1/1"
  fallbackIcon={<UserIcon />}
/>`,
    relatedComponents: ['Image', 'Avatar', 'Lightbox'],
    themeAware: true,
  },
  {
    name: 'GlassPanel',
    category: 'common',
    description:
      'Translucent surface. `material` thin | regular | thick | sub (sub is blur-free) reads `--tucu-glass-<material>-bg` and `--tucu-glass-blur-<material>`; `radius` control | card | panel reads `--tucu-radius-*`; `elevation` none | card | panel | float reads `--tucu-shadow-*`; `condense` plays a short mount animation; `as` changes the root element. Extends HTML attributes.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      material: ['thin', 'regular', 'thick', 'sub'],
      radius: ['control', 'card', 'panel'],
      elevation: ['none', 'card', 'panel', 'float'],
    },
    example: `import { GlassPanel } from '@e-burgos/tucu-ui';

<GlassPanel material="regular" radius="card" elevation="card" className="p-4">
  Balance overview
</GlassPanel>`,
    relatedComponents: ['Card', 'StatCard'],
    themeAware: true,
  },
  {
    name: 'StateBadge',
    category: 'common',
    description:
      'Badge preset for business states. `tone` green (paid) | orange (pending) | red (alert) | teal (ready) | purple (online) | neutral (delivered, expired) is required; `dot` adds a 6px dot, `struck` strikes the label through (cancelled), `size` sm | md. Colors come from `--tucu-state-<tone>-soft|ink|line`.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      tone: ['green', 'orange', 'red', 'teal', 'purple', 'neutral'],
      size: ['sm', 'md'],
    },
    example: `import { StateBadge } from '@e-burgos/tucu-ui';

<StateBadge tone="green" dot>Paid</StateBadge>
<StateBadge tone="neutral" struck>Cancelled</StateBadge>`,
    relatedComponents: ['Badge', 'InlineNotice'],
    themeAware: true,
  },
  {
    name: 'MoneyText',
    category: 'common',
    description:
      'Formats a monetary amount with Intl.NumberFormat. `value` (number or numeric string; non-finite renders an em dash), `currency` (ISO 4217), `locale` (defaults to the theme lang), `variant` total | subtotal | row sets the scale, `tone` default | positive | negative | auto (follows the sign), `showSign`, `minimumFractionDigits` / `maximumFractionDigits`, `as`.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      variant: ['total', 'subtotal', 'row'],
      tone: ['default', 'positive', 'negative', 'auto'],
    },
    example: `import { MoneyText } from '@e-burgos/tucu-ui';

<MoneyText value={1234.5} currency="ARS" variant="total" />
<MoneyText value={-80} currency="USD" tone="auto" showSign />`,
    relatedComponents: ['StatCard', 'StateBadge'],
    themeAware: true,
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
    description:
      "Tooltip that appears on hover/focus. The content is always in the DOM (no portal) and hidden while closed, so the trigger's `aria-describedby` always resolves. `size` (xs | sm | md, default md) sets font size and padding; `contentClassName` styles the bubble; `maxWidth` (number | string) caps its width. `lazy` (default false) mounts the content only while the tooltip is open, so `aria-describedby` resolves only then.",
    importPath: '@e-burgos/tucu-ui',
    variants: {
      size: ['xs', 'sm', 'md'],
    },
    example: `import { Tooltip } from '@e-burgos/tucu-ui';

<Tooltip content="More info" size="xs">
  <span>Hover me</span>
</Tooltip>`,
    relatedComponents: ['Popover'],
    themeAware: true,
  },
  {
    name: 'Collapse',
    category: 'common',
    description:
      'Disclosure section. Uncontrolled with `initialOpen`, or controlled with `open` + `onOpenChange`. `label` accepts a ReactNode. The header is a button with `aria-expanded`/`aria-controls`; the panel is a `role="region"`. `variant`: card (default, 54px uppercase card header), compact (h-8 header, normal case, for dense accordions) or unstyled (layout only, for navigation trees). `headerClassName`/`panelClassName` style each part.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      variant: ['card', 'compact', 'unstyled'],
    },
    example: `import { Collapse } from '@e-burgos/tucu-ui';

const [open, setOpen] = useState(false);

<Collapse label="Advanced" variant="compact" open={open} onOpenChange={setOpen}>
  <p>Details</p>
</Collapse>`,
    relatedComponents: ['Accordion'],
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
    relatedComponents: ['TabGroup', 'Card'],
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
  {
    name: 'Lightbox',
    category: 'carousel',
    description:
      'Fullscreen image viewer. Controlled: `items` ({ src, alt, caption, thumbnail, render }), `index` (null = closed), `onIndexChange`, `onClose`. Options: `loop`, `fit` contain | cover, `showThumbnails`, `showCounter`, `zoom`, `swipeThreshold`, localized labels override (`label`, `closeLabel`, `previousLabel`, `nextLabel`). Keyboard arrows and Escape, swipe on touch. Tokens `--tucu-lightbox-*`.',
    importPath: '@e-burgos/tucu-ui',
    variants: {
      fit: ['contain', 'cover'],
    },
    example: `import { Lightbox } from '@e-burgos/tucu-ui';

const [index, setIndex] = useState<number | null>(null);

<Lightbox
  items={photos.map((p) => ({ src: p.url, alt: p.title, caption: p.title }))}
  index={index}
  onIndexChange={setIndex}
  onClose={() => setIndex(null)}
  showThumbnails
  loop
/>`,
    relatedComponents: ['Image', 'Carousel', 'Modal'],
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
