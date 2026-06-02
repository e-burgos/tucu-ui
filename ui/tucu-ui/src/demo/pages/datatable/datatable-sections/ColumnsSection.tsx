import React from 'react';
import {
  DataTable,
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  HeroCard,
  LucideIcons,
  Badge,
  Avatar,
  TanstackTable,
} from '../../../../index';

interface ProjectRecord {
  id: string;
  name: string;
  leader: {
    name: string;
    avatar: string;
  };
  progress: number; // 0 to 100
  status: 'Active' | 'On Hold' | 'Completed' | 'Planning';
  priority: 'High' | 'Medium' | 'Low';
  budget: number;
}

const mockProjects: ProjectRecord[] = [
  {
    id: 'PRJ-001',
    name: 'Apollo Design System',
    leader: {
      name: 'Esteban Burgos',
      avatar:
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80',
    },
    progress: 85,
    status: 'Active',
    priority: 'High',
    budget: 45000,
  },
  {
    id: 'PRJ-002',
    name: 'E-commerce Gateway',
    leader: {
      name: 'Sarah Connor',
      avatar:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
    },
    progress: 40,
    status: 'Active',
    priority: 'High',
    budget: 125000,
  },
  {
    id: 'PRJ-003',
    name: 'Analytics Dashboard',
    leader: {
      name: 'John Doe',
      avatar:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
    },
    progress: 100,
    status: 'Completed',
    priority: 'Medium',
    budget: 68000,
  },
  {
    id: 'PRJ-004',
    name: 'Mobile App Migration',
    leader: {
      name: 'Alice Vance',
      avatar:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
    },
    progress: 15,
    status: 'Planning',
    priority: 'Low',
    budget: 95000,
  },
  {
    id: 'PRJ-005',
    name: 'API Cloud Sync Refactor',
    leader: {
      name: 'Marcus Aurelius',
      avatar:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
    },
    progress: 0,
    status: 'On Hold',
    priority: 'High',
    budget: 32000,
  },
];

const ColumnsSection: React.FC = () => {
  const columns: TanstackTable.ColumnDef<ProjectRecord>[] = [
    {
      id: 'id',
      accessorKey: 'id',
      header: 'ID',
      size: 100, // Explicit size in pixels
      enableResizing: false, // Prevent resizing for this column
      cell: (info) => (
        <code className="text-xs font-mono text-gray-500 dark:text-gray-400">
          {String(info.getValue())}
        </code>
      ),
    },
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Project Name',
      // Will take a share of the remaining dynamic width since size is not specified
      cell: (info) => (
        <span className="font-semibold text-foreground">
          {String(info.getValue())}
        </span>
      ),
    },
    {
      id: 'leader',
      accessorKey: 'leader',
      header: 'Project Leader',
      size: 200,
      enableSorting: false, // Sorting doesn't make sense for object structures
      cell: (info) => {
        const val = info.getValue() as ProjectRecord['leader'];
        return (
          <div className="flex items-center gap-3">
            <Avatar
              image={val.avatar}
              alt={val.name}
              size="sm"
              border={false}
              className="w-8 h-8 rounded-full overflow-hidden"
            />
            <span className="text-sm font-medium">{val.name}</span>
          </div>
        );
      },
    },
    {
      id: 'progress',
      accessorKey: 'progress',
      header: 'Progress',
      size: 150,
      cell: (info) => {
        const val = info.getValue() as number;
        return (
          <div className="flex flex-col gap-1 w-full max-w-[120px]">
            <div className="flex justify-between items-center text-xs text-gray-500">
              <span>{val}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-brand h-full rounded-full transition-all duration-300"
                style={{ width: `${val}%` }}
              />
            </div>
          </div>
        );
      },
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Status',
      size: 120,
      cell: (info) => {
        const val = info.getValue() as string;
        const color =
          val === 'Completed'
            ? 'success'
            : val === 'Active'
            ? 'primary'
            : val === 'On Hold'
            ? 'danger'
            : 'warning';
        return (
          <Badge variant="soft" color={color}>
            {val}
          </Badge>
        );
      },
    },
    {
      id: 'priority',
      accessorKey: 'priority',
      header: 'Priority',
      size: 100,
      cell: (info) => {
        const val = info.getValue() as string;
        const color =
          val === 'High' ? 'danger' : val === 'Medium' ? 'warning' : 'gray';
        return (
          <Badge variant="outline" color={color}>
            {val}
          </Badge>
        );
      },
    },
    {
      id: 'budget',
      accessorKey: 'budget',
      header: () => <div className="text-right">Budget</div>,
      size: 120,
      cell: (info) => {
        const val = info.getValue() as number;
        return (
          <div className="text-right font-mono font-medium">
            {new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              maximumFractionDigits: 0,
            }).format(val)}
          </div>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <HeroCard
        title="Columns Configuration"
        description="Learn how to structure, style, and customize columns inside the DataTable. Leverage full power of TanStack Table properties combined with custom tucu-ui size calculations."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Sliders className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        }
      />

      {/* ─── Architectural Concept ─────────────────────────────────── */}
      <CardContainer className="p-6">
        <CardTitle title="Column Declarations & Sizing" className="mb-4">
          <Typography className="text-sm text-foreground/70 mb-4">
            The columns in <code>DataTable</code> are defined as an array of{' '}
            <code>TanstackTable.ColumnDef&lt;T&gt;</code> objects. To simplify
            package management and avoid direct dependencies on{' '}
            <code>@tanstack/react-table</code>,<code>tucu-ui</code> re-exports
            the entire TanStack Table API namespace via{' '}
            <code>TanstackTable</code>. You should always import these types
            directly from the library.
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-3">
              <Typography tag="h6" className="font-semibold text-brand">
                Dynamic Auto-Layout
              </Typography>
              <Typography className="text-xs text-foreground/60 leading-relaxed">
                If a column does not have an explicit <code>size</code> defined,{' '}
                <code>DataTable</code> dynamically calculates and assigns its
                width at runtime. It divides the remaining space of the parent
                container (after subtracting all fixed-width columns and row
                helper columns) equally among all columns that lack an explicit
                size.
              </Typography>
            </div>
            <div className="space-y-3">
              <Typography tag="h6" className="font-semibold text-brand">
                Fixed Width Dimensions
              </Typography>
              <Typography className="text-xs text-foreground/60 leading-relaxed">
                To specify exact widths, use the <code>size</code> parameter
                inside the column definition (e.g. <code>size: 150</code>). You
                can also set boundary constraints using <code>minSize</code> and{' '}
                <code>maxSize</code> to restrict the columns when users
                interactively drag to resize them.
              </Typography>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* ─── Column Feature Controls ────────────────────────────────── */}
      <CardContainer className="p-6">
        <CardTitle title="Feature Toggles and Controls" className="mb-4">
          <Typography className="text-sm text-foreground/70 mb-6">
            Columns support granular control over user interactions. Features
            like sorting, reordering, pinning, and resizing can be
            enabled/disabled both at the column level and table level.
          </Typography>

          <div className="space-y-6 text-sm">
            <div className="border-l-2 border-brand/40 pl-4 py-1 space-y-1">
              <strong className="text-foreground">
                Column-Level Overrides (inside <code>ColumnDef</code>):
              </strong>
              <ul className="list-disc list-inside text-xs text-foreground/70 space-y-1 mt-1">
                <li>
                  <code>enableSorting?: boolean</code> - Enables or disables
                  sorting header triggers on this column.
                </li>
                <li>
                  <code>enableResizing?: boolean</code> - Restricts drag
                  resizing operations on this specific column.
                </li>
                <li>
                  <code>enableHiding?: boolean</code> - Controls whether users
                  can hide this column through the header visibility menu.
                </li>
                <li>
                  <code>enableDraggable?: boolean</code> - Allows or prevents
                  users from dragging the column header laterally to reorder it.
                </li>
              </ul>
            </div>

            <div className="border-l-2 border-indigo-500/40 pl-4 py-1 space-y-1">
              <strong className="text-foreground">
                Table-Level Configurations (props on{' '}
                <code>&lt;DataTable&gt;</code>):
              </strong>
              <ul className="list-disc list-inside text-xs text-foreground/70 space-y-1 mt-1">
                <li>
                  <code>initialConfig</code> - A partial column definition
                  applied as defaults for all columns in the table (e.g.,
                  setting a default <code>minSize</code> or disabling sorting by
                  default).
                </li>
                <li>
                  <code>headerOptions</code> - Dictates what header actions are
                  enabled globally (e.g., <code>enableResizeColumns</code>,{' '}
                  <code>enableDragColumns</code>,{' '}
                  <code>enablePinLeftColumns</code>).
                </li>
              </ul>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* ─── Live Interactive Demo ──────────────────────────────────── */}
      <CardContainer className="p-6">
        <CardTitle
          title="Interactive Column Configuration Demo"
          className="mb-4"
        >
          <Typography
            tag="p"
            className="text-sm text-gray-500 dark:text-gray-400 mb-6"
          >
            The table below demonstrates custom sizing, alignment, disabled
            sorting on object columns, and beautiful custom cell renderers like
            avatars and progress bars. Feel free to drag to resize headers, drag
            columns to reorder them, or toggle visibility.
          </Typography>

          <DataTable
            tableId="columns-demo-table"
            columns={columns}
            data={mockProjects}
            title="Active Workspaces"
            pagination={{
              showPagination: true,
              pageSize: 5,
            }}
            headerOptions={{
              enableHideColumns: true,
              enableResizeColumns: true,
              enableDragColumns: true,
              enablePinLeftColumns: true,
              enablePinRightColumns: true,
            }}
            enableHideColumns={true}
          />
        </CardTitle>
      </CardContainer>

      {/* ─── Code Snippet ────────────────────────────────────────── */}
      <CardContainer className="p-6">
        <CardTitle title="Implementation Code" className="mb-4">
          <CodeBlock
            language="tsx"
            code={`import { DataTable, Badge, Avatar, TanstackTable } from '@e-burgos/tucu-ui';

interface Project {
  id: string;
  name: string;
  leader: { name: string; avatar: string };
  progress: number;
  status: 'Active' | 'Completed' | 'On Hold';
  budget: number;
}

const columns: TanstackTable.ColumnDef<Project, any>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: 'ID',
    size: 100, // Fixed width
    enableResizing: false, // Cannot resize this specific column
    cell: (info) => <code className="text-xs font-mono">{String(info.getValue())}</code>,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Project Name',
    // Dynamic width: will grow to consume remaining available space
  },
  {
    id: 'leader',
    accessorKey: 'leader',
    header: 'Project Leader',
    size: 200,
    enableSorting: false, // Non-sortable column
    cell: (info) => {
      const val = info.getValue() as Project['leader'];
      return (
        <div className="flex items-center gap-3">
          <Avatar image={val.avatar} alt={val.name} size="sm" border={false} className="w-8 h-8 rounded-full overflow-hidden" />
          <span className="text-sm font-medium">{val.name}</span>
        </div>
      );
    },
  },
  {
    id: 'progress',
    accessorKey: 'progress',
    header: 'Progress',
    size: 150,
    cell: (info) => {
      const val = info.getValue() as number;
      return (
        <div className="flex flex-col gap-1 w-full max-w-[120px]">
          <span className="text-xs text-gray-500">{val}%</span>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
            <div className="bg-brand h-full rounded-full" style={{ width: \`\${val}%\` }} />
          </div>
        </div>
      );
    },
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    size: 120,
    cell: (info) => {
      const val = info.getValue() as string;
      const color = val === 'Completed' ? 'success' : val === 'Active' ? 'brand' : 'danger';
      return (
        <Badge variant="soft" color={color}>
          {val}
        </Badge>
      );
    },
  },
  {
    id: 'budget',
    accessorKey: 'budget',
    header: () => <div className="text-right">Budget</div>,
    size: 120,
    cell: (info) => (
      <div className="text-right font-mono font-medium">
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 0,
        }).format(info.getValue() as number)}
      </div>
    ),
  },
];

export default function WorkspacesTable({ data }: { data: Project[] }) {
  return (
    <DataTable
      tableId="workspaces-table"
      columns={columns}
      data={data}
      title="Active Workspaces"
      headerOptions={{
        enableHideColumns: true,
        enableResizeColumns: true,
        enableDragColumns: true,
        enablePinLeftColumns: true,
        enablePinRightColumns: true,
      }}
      enableHideColumns={true}
    />
  );
}`}
          />
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default ColumnsSection;
