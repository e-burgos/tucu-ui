import React, { useState } from 'react';
import {
  DataTable,
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  HeroCard,
  LucideIcons,
  Badge,
  TanstackTable,
} from '../../../../index';

// ─── Example Types and Data ─────────────────────────────────────
interface UserRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'Active' | 'Inactive' | 'Pending';
  joinedDate: string;
}

const mockUsers: UserRecord[] = [
  {
    id: '1',
    name: 'Esteban Burgos',
    email: 'esteban@tucu-ui.dev',
    role: 'Maintainer',
    status: 'Active',
    joinedDate: '2025-01-10',
  },
  {
    id: '2',
    name: 'Alice Smith',
    email: 'alice@example.com',
    role: 'Developer',
    status: 'Active',
    joinedDate: '2025-03-15',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    role: 'Designer',
    status: 'Inactive',
    joinedDate: '2025-04-20',
  },
  {
    id: '4',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    role: 'Product Manager',
    status: 'Pending',
    joinedDate: '2025-05-12',
  },
  {
    id: '5',
    name: 'Diana Prince',
    email: 'diana@example.com',
    role: 'Security Analyst',
    status: 'Active',
    joinedDate: '2025-06-01',
  },
];

const ExamplesSection: React.FC = () => {
  const [selectedRowsInfo, setSelectedRowsInfo] = useState<string>('None');

  // ─── Column Definitions ──────────────────────────────────────────
  const basicColumns: TanstackTable.ColumnDef<UserRecord>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Name',
      cell: (info) => (
        <span className="font-semibold">{String(info.getValue())}</span>
      ),
    },
    {
      id: 'email',
      accessorKey: 'email',
      header: 'Email',
    },
    {
      id: 'role',
      accessorKey: 'role',
      header: 'Role',
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Status',
      cell: (info) => {
        const val = info.getValue() as string;
        const color =
          val === 'Active'
            ? 'success'
            : val === 'Inactive'
            ? 'danger'
            : 'warning';
        return (
          <Badge variant="soft" color={color}>
            {val}
          </Badge>
        );
      },
    },
  ];

  // ─── Sub-Component detail renderer ──────────────────────────────
  const renderDetail = ({ row }: { row?: TanstackTable.Row<UserRecord> }) => {
    if (!row) return null;
    const user = row.original;
    return (
      <div className="p-4 bg-gray-50/50 dark:bg-gray-900/30 rounded-lg border border-border/60 space-y-2">
        <Typography tag="h6" className="text-brand font-bold">
          Detailed Record Information
        </Typography>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold text-gray-500">Record ID:</span>{' '}
            {user.id}
          </div>
          <div>
            <span className="font-semibold text-gray-500">Joined Date:</span>{' '}
            {user.joinedDate}
          </div>
          <div>
            <span className="font-semibold text-gray-500">Full Name:</span>{' '}
            {user.name}
          </div>
          <div>
            <span className="font-semibold text-gray-500">Email Address:</span>{' '}
            {user.email}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8">
      <HeroCard
        title="DataTable Examples"
        description="Explore different ways to configure the DataTable: basic layouts, checkbox selections, row action handlers, and expandable row details."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.TableProperties className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        }
      />

      {/* ─── Basic Example ────────────────────────────────────────── */}
      <CardContainer className="p-6">
        <CardTitle title="Basic Example" className="mb-4">
          <Typography
            tag="p"
            className="text-sm text-gray-500 dark:text-gray-400 mb-6"
          >
            A simple table displaying records with columns mapping key values
            and supporting standard column header sorting out-of-the-box.
          </Typography>

          <DataTable
            tableId="basic-demo-table"
            columns={basicColumns}
            data={mockUsers}
            title="User Directory"
            pagination={{
              showPagination: true,
              pageSize: 5,
            }}
          />
        </CardTitle>
      </CardContainer>

      {/* ─── Row Selection & Actions ────────────────────────────── */}
      <CardContainer className="p-6">
        <CardTitle title="Row Selection and Actions" className="mb-4">
          <Typography
            tag="p"
            className="text-sm text-gray-500 dark:text-gray-400 mb-6"
          >
            DataTable supports checkbox row selection and custom row-level
            context actions (like Edit/Delete) with full access to the selected
            record data.
          </Typography>

          <div className="mb-4 p-3 bg-gray-50 dark:bg-gray-800/40 rounded-lg text-sm">
            <span className="font-semibold">Selected Row IDs:</span>{' '}
            {selectedRowsInfo}
          </div>

          <DataTable
            tableId="selection-demo-table"
            columns={basicColumns}
            data={mockUsers}
            rowSelection={{
              type: 'checkbox',
              getSelection: (rows) => {
                const ids = rows.map((r) => r.original.id).join(', ');
                setSelectedRowsInfo(ids || 'None');
              },
            }}
            rowActions={[
              {
                action: 'edit',
                label: () => 'Edit User',
                onClick: (row) => alert(`Edit row: ${row.original.name}`),
              },
              {
                action: 'delete',
                label: () => 'Delete User',
                onClick: (row) => alert(`Delete row: ${row.original.name}`),
              },
            ]}
          />
        </CardTitle>
      </CardContainer>

      {/* ─── Expandable Rows ──────────────────────────────────────── */}
      <CardContainer className="p-6">
        <CardTitle title="Expandable Sub-components" className="mb-4">
          <Typography
            tag="p"
            className="text-sm text-gray-500 dark:text-gray-400 mb-6"
          >
            Provide additional detail panels for individual rows using the
            `renderSubComponent` prop. This allows drilling down on specific
            records without navigating away.
          </Typography>

          <DataTable
            tableId="expandable-demo-table"
            columns={basicColumns}
            data={mockUsers}
            renderSubComponent={renderDetail}
          />
        </CardTitle>
      </CardContainer>

      {/* ─── Code Snippet ────────────────────────────────────────── */}
      <CardContainer className="p-6">
        <CardTitle title="Implementation Code" className="mb-4">
          <CodeBlock
            language="tsx"
            code={`import { DataTable, Badge, TanstackTable } from '@e-burgos/tucu-ui';

interface User {
  id: string;
  name: string;
  email: string;
  status: 'Active' | 'Inactive';
}

const columns: TanstackTable.ColumnDef<User, any>[] = [
  {
    id: 'name',
    accessorKey: 'name',
    header: 'Name',
  },
  {
    id: 'email',
    accessorKey: 'email',
    header: 'Email',
  },
  {
    id: 'status',
    accessorKey: 'status',
    header: 'Status',
    cell: (info) => (
      <Badge color={info.getValue() === 'Active' ? 'success' : 'danger'}>
        {info.getValue() as string}
      </Badge>
    ),
  },
];

const data: User[] = [
  { id: '1', name: 'Esteban Burgos', email: 'esteban@tucu-ui.dev', status: 'Active' },
];

export default function MyTable() {
  return (
    <DataTable
      tableId="users-table-key"
      columns={columns}
      data={data}
      title="Users List"
      pagination={{
        showPagination: true,
        pageSize: 10,
      }}
      rowSelection={{
        type: 'checkbox',
        getSelection: (selectedRows) => console.log(selectedRows),
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

export default ExamplesSection;
