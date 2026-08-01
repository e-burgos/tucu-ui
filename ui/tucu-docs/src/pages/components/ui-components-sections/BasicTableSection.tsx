import React from 'react';
import {
  Alert,
  Badge,
  BasicTable,
  CardContainer,
  CardTitle,
  CodeBlock,
  HeroCard,
  LucideIcons,
  Typography,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';

import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

const exampleColumns = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
  { key: 'city', label: 'City' },
];

const exampleData = [
  { name: 'John Doe', age: 30, city: 'New York' },
  { name: 'Jane Smith', age: 25, city: 'Los Angeles' },
  { name: 'Bob Johnson', age: 35, city: 'Chicago' },
];

const teamData = [
  { name: 'Alice', role: 'Developer', status: 'Active', commits: 128 },
  { name: 'Bob', role: 'Designer', status: 'Inactive', commits: 42 },
  { name: 'Carol', role: 'Manager', status: 'Active', commits: 87 },
];

/** Demonstrates `render`: a column can return any ReactNode, not just text. */
const renderedColumns = [
  {
    key: 'name',
    label: 'Name',
    render: (value: unknown) => <strong>{String(value)}</strong>,
  },
  { key: 'role', label: 'Role' },
  {
    key: 'status',
    label: 'Status',
    render: (value: unknown) => (
      <Badge
        color={value === 'Active' ? 'success' : 'gray'}
        variant="soft"
        size="small"
      >
        {String(value)}
      </Badge>
    ),
  },
  {
    key: 'commits',
    label: 'Commits',
    render: (value: unknown) => (
      <code className="text-xs text-brand">{String(value)}</code>
    ),
  },
];

/** Demonstrates `width` / `minWidth`, which seed the drag-to-resize handles. */
const sizedColumns = [
  { key: 'name', label: 'Name', width: 160, minWidth: 100 },
  { key: 'role', label: 'Role', width: 140, minWidth: 80 },
  { key: 'status', label: 'Status', width: 120, minWidth: 80 },
];

const scrollColumns = [
  { key: 'name', label: 'Name' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status' },
];

const scrollData = Array.from({ length: 12 }, (_, i) => ({
  name: `Member ${i + 1}`,
  role: i % 2 === 0 ? 'Developer' : 'Designer',
  status: i % 3 === 0 ? 'Inactive' : 'Active',
}));

const columnOptionColumns = [
  {
    key: 'property',
    label: 'Property',
    render: (value: unknown) => (
      <code className="text-xs text-brand">{String(value)}</code>
    ),
  },
  {
    key: 'type',
    label: 'Type',
    render: (value: unknown) => (
      <code className="text-xs text-gray-600 dark:text-gray-400">
        {String(value)}
      </code>
    ),
  },
  {
    key: 'required',
    label: 'Required',
    render: (value: unknown) => (
      <Badge
        color={value === 'Yes' ? 'danger' : 'gray'}
        variant="soft"
        size="small"
      >
        {String(value)}
      </Badge>
    ),
  },
  { key: 'description', label: 'Description' },
];

const columnOptionData = [
  {
    property: 'key',
    type: 'string',
    required: 'Yes',
    description: 'Row property this column reads its value from.',
  },
  {
    property: 'label',
    type: 'string',
    required: 'Yes',
    description: "Text rendered in the column's header cell.",
  },
  {
    property: 'render',
    type: '(value, row, index) => ReactNode',
    required: 'No',
    description:
      'Custom cell renderer. Without it the value is coerced with String().',
  },
  {
    property: 'className',
    type: 'string',
    required: 'No',
    description: 'Extra class names for every body cell of this column.',
  },
  {
    property: 'headerClassName',
    type: 'string',
    required: 'No',
    description: "Extra class names for this column's header cell.",
  },
  {
    property: 'width',
    type: 'number',
    required: 'No',
    description: 'Initial width in pixels, used as the resize starting size.',
  },
  {
    property: 'minWidth',
    type: 'number',
    required: 'No',
    description:
      'Smallest width the column can be dragged to. Defaults to 40px.',
  },
];

const BasicTableSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="BasicTable"
        description="A lightweight, dependency-free table with custom cell rendering, striping,
          hover highlighting, a sticky header, drag-to-resize columns and a
          mobile card layout that is on by default."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Table2 className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <Alert variant="info">
        <div>
          <div className="flex items-center gap-2 font-semibold">
            <LucideIcons.Info className="h-4 w-4" />
            BasicTable is not DataTable
          </div>
          <div className="text-sm mt-1">
            <strong>BasicTable</strong> is standalone and declares columns as{' '}
            <code>{'{ key, label, render? }'}</code>. It does not use{' '}
            <code>@tanstack/react-table</code>, so it has no{' '}
            <code>accessorKey</code> or <code>header</code> fields. Reach for{' '}
            <strong>DataTable</strong> when you need sorting, filtering,
            pagination, row selection or column pinning.
          </div>
        </div>
      </Alert>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Table
                </Typography>
                <BasicTable columns={exampleColumns} data={exampleData} />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Striped Table
                </Typography>
                <BasicTable
                  columns={exampleColumns}
                  data={exampleData}
                  striped
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Without Border
                </Typography>
                <BasicTable
                  columns={exampleColumns}
                  data={exampleData}
                  border={false}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Without Header
                </Typography>
                <BasicTable
                  columns={exampleColumns}
                  data={exampleData}
                  showHeader={false}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Square Corners, No Hover
                </Typography>
                <BasicTable
                  columns={exampleColumns}
                  data={exampleData}
                  rounded={false}
                  hoverable={false}
                />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Custom Cell Rendering" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 space-y-4">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              A column&apos;s <code>render</code> receives the cell value, the
              whole row and the row index, and may return any ReactNode.
            </Typography>
            <BasicTable columns={renderedColumns} data={teamData} striped />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Scrolling and Row Styling" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 space-y-4">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              <code>maxRows</code> caps the visible height — the body scrolls
              past it while the header stays sticky. <code>rowClassName</code>{' '}
              accepts a function, so rows can be styled from their own data.
            </Typography>
            <BasicTable
              columns={scrollColumns}
              data={scrollData}
              maxRows={5}
              rowClassName={(row) =>
                row.status === 'Inactive' ? 'opacity-50' : ''
              }
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Resizable Columns" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 space-y-4">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              Resizing is on by default. Drag the divider on a header edge —{' '}
              <code>width</code> seeds the starting size and{' '}
              <code>minWidth</code> bounds how far it can shrink. The last
              column has no handle.
            </Typography>
            <BasicTable columns={sizedColumns} data={teamData} />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Mobile Card Layout" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 space-y-4">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              On narrow screens a table either overflows sideways or squeezes
              its columns to nothing. Instead, each row collapses into a card
              that stacks every column as a <code>label</code> / value pair.
              This is <strong>on by default</strong> below <code>md</code>.
            </Typography>
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              It is a pure-CSS switch over the same markup — no resize listener,
              no hydration mismatch, and each cell stays in the DOM once. The
              table below uses <code>cardBreakpoint=&quot;lg&quot;</code> so you
              can see the card layout without a phone: narrow the window past
              1024px.
            </Typography>
            <BasicTable
              columns={renderedColumns}
              data={teamData}
              cardBreakpoint="lg"
              striped
            />
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              Pass <code>mobileCards={'{false}'}</code> to keep a real table at
              every width — useful when the data is genuinely tabular and
              horizontal scrolling is acceptable.
            </Typography>
            <BasicTable
              columns={renderedColumns}
              data={teamData}
              mobileCards={false}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Column Options (TableColumn)" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 space-y-4">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              Each entry of <code>columns</code> is a <code>TableColumn</code>:
            </Typography>
            <BasicTable
              columns={columnOptionColumns}
              data={columnOptionData}
              maxRows={7}
              striped
            />
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="BasicTable"
        title="BasicTable Playground"
        defaultValues={{
          border: true,
          hoverable: true,
          rounded: true,
          striped: false,
          showHeader: true,
          resizable: true,
          maxRows: 10,
          mobileCards: true,
          cardBreakpoint: 'md',
        }}
        excludeProps={[
          'columns',
          'data',
          'containerClassName',
          'headerClassName',
          'tableClassName',
          'cardClassName',
        ]}
      >
        {(props) => (
          <BasicTable {...props} columns={renderedColumns} data={teamData} />
        )}
      </PropPlayground>

      <AutoPropsTable componentName="BasicTable" showFilePath />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { BasicTable, Badge } from '@e-burgos/tucu-ui';

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'age', label: 'Age' },
  { key: 'city', label: 'City' },
];

const data = [
  { name: 'John Doe', age: 30, city: 'New York' },
  { name: 'Jane Smith', age: 25, city: 'Los Angeles' },
];

// Basic usage
<BasicTable columns={columns} data={data} />

// Custom cell rendering — render returns any ReactNode
const richColumns = [
  {
    key: 'name',
    label: 'Name',
    render: (value) => <strong>{String(value)}</strong>,
  },
  {
    key: 'status',
    label: 'Status',
    render: (value, row, index) => (
      <Badge color={value === 'Active' ? 'success' : 'gray'} size="small">
        {String(value)}
      </Badge>
    ),
  },
];

// Presentation flags
<BasicTable columns={columns} data={data} striped />
<BasicTable columns={columns} data={data} border={false} />
<BasicTable columns={columns} data={data} hoverable={false} />
<BasicTable columns={columns} data={data} rounded={false} />
<BasicTable columns={columns} data={data} showHeader={false} />

// Scroll after 5 rows, with the header staying sticky
<BasicTable columns={columns} data={data} maxRows={5} />

// Style rows from their own data
<BasicTable
  columns={columns}
  data={data}
  rowClassName={(row, index) => (row.status === 'Inactive' ? 'opacity-50' : '')}
/>

// Seed resize sizes per column (resizable is on by default)
const sizedColumns = [
  { key: 'name', label: 'Name', width: 160, minWidth: 100 },
  { key: 'role', label: 'Role', width: 140, minWidth: 80 },
];
<BasicTable columns={sizedColumns} data={data} />
<BasicTable columns={columns} data={data} resizable={false} />

// Mobile card layout — rows become stacked cards below md by default
<BasicTable columns={columns} data={data} />

// Switch to cards earlier or later
<BasicTable columns={columns} data={data} cardBreakpoint="lg" />

// Style the card (the class lands on the row)
<BasicTable columns={columns} data={data} cardClassName="shadow-sm" />

// Opt out and keep a real table at every width
<BasicTable columns={columns} data={data} mobileCards={false} />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default BasicTableSection;
