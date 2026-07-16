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
  Button,
} from '@e-burgos/tucu-ui';

interface ProjectRecord {
  id: string;
  name: string;
  leader: {
    name: string;
    avatar: string;
  };
  progress: number;
  status: 'Active' | 'On Hold' | 'Completed' | 'Planning';
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
    budget: 32000,
  },
];

const SearchSection: React.FC = () => {
  const columns: TanstackTable.ColumnDef<ProjectRecord>[] = [
    {
      id: 'id',
      accessorKey: 'id',
      header: 'ID',
      size: 100,
      cell: (info) => (
        <code className="text-xs font-mono font-bold text-indigo-600 dark:text-indigo-400">
          {String(info.getValue())}
        </code>
      ),
    },
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Project Name',
      size: 220,
      cell: (info) => (
        <span className="font-semibold text-foreground">
          {String(info.getValue())}
        </span>
      ),
    },
    {
      id: 'leader',
      accessorKey: 'leader',
      header: 'Leader',
      size: 200,
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
            <span className="text-sm font-medium text-foreground">
              {val.name}
            </span>
          </div>
        );
      },
    },
    {
      id: 'progress',
      accessorKey: 'progress',
      header: 'Progress',
      size: 130,
      cell: (info) => {
        const val = info.getValue() as number;
        return (
          <div className="flex flex-col gap-1 w-full max-w-[100px]">
            <span className="text-xs text-foreground/70">{val}%</span>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-brand h-full rounded-full"
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
        let color: 'success' | 'primary' | 'danger' | 'warning' = 'primary';
        if (val === 'Completed') color = 'success';
        if (val === 'On Hold') color = 'danger';
        if (val === 'Planning') color = 'warning';
        return (
          <Badge variant="soft" color={color}>
            {val}
          </Badge>
        );
      },
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <HeroCard
        title="Global Search"
        description="Enable users to search and filter row data across the table. Restrict text query validation to selected columns by specifying column identifiers."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Search className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        }
      />

      {/* ─── Architectural Concept ─────────────────────────────────── */}
      <CardContainer className="p-6">
        <CardTitle title="Search Scope Configuration" className="mb-4">
          <Typography className="text-sm text-foreground/70 mb-4">
            Global Search integrates directly into the table's state using
            TanStack Table's internal filtering engine. To enable search, pass
            the <code>searchableColumns</code> prop to the{' '}
            <code>DataTable</code> containing an array of column IDs. The search
            bar will render automatically next to the title (or in the header
            action containers).
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-3">
              <Typography tag="h6" className="font-semibold text-brand">
                Selective Column Target
              </Typography>
              <Typography className="text-xs text-foreground/60 leading-relaxed">
                By setting <code>searchableColumns={['id', 'name']}</code>,
                queries are validated only against these columns. Any matched
                text inside non-configured columns (e.g., Progress or Status)
                will be ignored, preventing unwanted false positives.
              </Typography>
            </div>
            <div className="space-y-3">
              <Typography tag="h6" className="font-semibold text-brand">
                Case-Insensitive Match
              </Typography>
              <Typography className="text-xs text-foreground/60 leading-relaxed">
                The filtering logic safely converts cell data to lowercase
                strings, guaranteeing reliable, case-insensitive substring
                comparisons for strings, numbers, and state objects.
              </Typography>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      {/* ─── Live Demo ─────────────────────────────────────────────── */}
      <CardContainer className="p-6">
        <CardTitle title="Interactive Search Demo" className="mb-4">
          <Typography className="text-sm text-foreground/70 mb-6">
            Try searching below. In this example, search is restricted to the{' '}
            <strong>ID</strong>, <strong>Project Name</strong>, and{' '}
            <strong>Status</strong> columns (e.g., type <code>"Apollo"</code> or{' '}
            <code>"Planning"</code>).
          </Typography>

          <DataTable
            tableId="search-demo-table"
            columns={columns}
            data={mockProjects}
            title="Workspaces Catalog"
            searchableColumns={['id', 'name', 'status']}
            pagination={{
              showPagination: true,
              pageSize: 5,
            }}
            rightActions={
              <Button
                variant="solid"
                size="small"
                color="primary"
                onClick={() => alert('Reloading data...')}
              >
                <LucideIcons.RefreshCw className="w-4 h-4" />
                <span className="text-xs font-semibold">Reload</span>
              </Button>
            }
          />
        </CardTitle>
      </CardContainer>

      {/* ─── Code Snippet ────────────────────────────────────────── */}
      <CardContainer className="p-6">
        <CardTitle title="Implementation Code" className="mb-4">
          <CodeBlock
            language="tsx"
            code={`import { DataTable, TanstackTable } from '@e-burgos/tucu-ui';

interface Project {
  id: string;
  name: string;
  leader: { name: string; avatar: string };
  progress: number;
  status: 'Active' | 'Completed' | 'On Hold' | 'Planning';
}

const columns: TanstackTable.ColumnDef<Project, any>[] = [
  {
    id: 'id',
    accessorKey: 'id',
    header: 'ID',
    size: 100,
  },
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Project Name',
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
  }
];

export default function WorkspaceCatalog({ data }: { data: Project[] }) {
  return (
    <DataTable
      tableId="workspaces-table"
      columns={columns}
      data={data}
      title="Workspaces Catalog"
      // Configure columns allowed to be searched
      searchableColumns={['id', 'name', 'status']}
      pagination={{
        showPagination: true,
        pageSize: 5,
      }}
    />
  );
}`}
          />
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default SearchSection;
