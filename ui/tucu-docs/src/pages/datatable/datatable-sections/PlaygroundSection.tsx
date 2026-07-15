/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  DataTable,
  HeroCard,
  LucideIcons,
  Badge,
  Typography,
  TanstackTable,
  ListContainer,
} from '@e-burgos/tucu-ui';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

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

const PlaygroundSection: React.FC = () => {
  // ─── Column Definitions ──────────────────────────────────────────
  const basicColumns: TanstackTable.ColumnDef<UserRecord, any>[] = [
    {
      id: 'name',
      accessorKey: 'name',
      header: 'Name',
      footer: 'Name',
      cell: (info) => (
        <span className="font-semibold">{String(info.getValue())}</span>
      ),
    },
    {
      id: 'email',
      accessorKey: 'email',
      header: 'Email',
      footer: 'Email',
    },
    {
      id: 'role',
      accessorKey: 'role',
      header: 'Role',
      footer: 'Role',
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Status',
      footer: 'Status',
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
        <Typography tag="h6" className="text-brand font-bold mb-2">
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
        title="DataTable Playground"
        description="Interact with the props controls below to modify the DataTable in real-time. Test loading, error states, and toggle pinning, resizing, or expanding behaviors."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Wand2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        }
      />

      {/* ─── Prop Playground ──────────────────────────────────────── */}
      <PropPlayground
        componentName="DataTable"
        defaultValues={{
          title: 'Interactive User Table',
          border: true,
          isLoading: false,
          isError: false,
          isFetching: false,
          showHeader: true,
          showFooter: true,
          smallAnatomy: false,
          enableMultiSort: true,
          manualSorting: false,
          mode: 'light',
          forceShowMenuActions: false,
          enableHideColumns: true,
          enablePinLeftColumns: true,
          enablePinRightColumns: true,
          enableSortColumns: true,
          enableResizeColumns: true,
          enableDragColumns: true,
          showPagination: true,
          rowsInfo: true,
          hideRecordsSelector: false,
          noDataMessage: 'No matching users found.',
          rowSelectionType: 'checkbox',
          enableRowActions: true,
          enableSubComponent: true,
          enableSearch: true,
          enableRightActions: true,
        }}
        controlOverrides={[
          {
            name: 'title',
            type: 'text',
            description: 'Header title of the table',
          },
          {
            name: 'border',
            type: 'boolean',
            description: 'Show table borders',
          },
          {
            name: 'isLoading',
            type: 'boolean',
            description: 'Simulates table loading state',
          },
          {
            name: 'isError',
            type: 'boolean',
            description: 'Simulates table error state',
          },
          {
            name: 'isFetching',
            type: 'boolean',
            description: 'Simulates background data fetching',
          },
          {
            name: 'showHeader',
            type: 'boolean',
            description: 'Whether to show the top header block',
          },
          {
            name: 'showFooter',
            type: 'boolean',
            description: 'Whether to show the bottom footer block',
          },
          {
            name: 'smallAnatomy',
            type: 'boolean',
            description: 'Reduces padding for a denser table layout',
          },
          {
            name: 'enableMultiSort',
            type: 'boolean',
            description: 'Enable multi-column sorting (Ctrl+Click)',
          },
          {
            name: 'manualSorting',
            type: 'boolean',
            description: 'Server-side sorting mode',
          },
          {
            name: 'mode',
            type: 'select',
            options: ['light', 'dark'],
            description: 'Theme mode of the DataTable',
          },
          {
            name: 'forceShowMenuActions',
            type: 'boolean',
            description: 'Always show action menus regardless of hover state',
          },
          {
            name: 'enableHideColumns',
            type: 'boolean',
            description: 'Allow users to hide/show columns from header options',
          },
          {
            name: 'enablePinLeftColumns',
            type: 'boolean',
            description: 'Allow pinning columns to the left side',
          },
          {
            name: 'enablePinRightColumns',
            type: 'boolean',
            description: 'Allow pinning columns to the right side',
          },
          {
            name: 'enableSortColumns',
            type: 'boolean',
            description: 'Allow columns to be sorted',
          },
          {
            name: 'enableResizeColumns',
            type: 'boolean',
            description: 'Allow resizing columns by dragging boundaries',
          },
          {
            name: 'enableDragColumns',
            type: 'boolean',
            description: 'Allow dragging column headers to reorder them',
          },
          {
            name: 'showPagination',
            type: 'boolean',
            description: 'Show bottom pagination controls',
          },
          {
            name: 'rowsInfo',
            type: 'boolean',
            description: 'Display page and row count information in footer',
          },
          {
            name: 'hideRecordsSelector',
            type: 'boolean',
            description: 'Hide the page-size records selector dropdown',
          },
          {
            name: 'noDataMessage',
            type: 'text',
            description: 'Custom message displayed when data is empty',
          },
          {
            name: 'rowSelectionType',
            type: 'select',
            options: ['checkbox', 'radio', 'none'],
            description: 'Method for row selection in the table',
          },
          {
            name: 'enableRowActions',
            type: 'boolean',
            description:
              'Demonstrates custom context row actions (Edit/Delete)',
          },
          {
            name: 'enableSubComponent',
            type: 'boolean',
            description: 'Demonstrates expandable detail sub-component panels',
          },
          {
            name: 'enableSearch',
            type: 'boolean',
            description:
              'Allow users to search row data from header search bar (restricted to Name, Email and Role)',
          },
          {
            name: 'enableRightActions',
            type: 'boolean',
            description:
              'Renders custom action components (e.g. ListContainer menu button) on the right of the header',
          },
        ]}
        includeProps={[
          'title',
          'border',
          'isLoading',
          'isError',
          'isFetching',
          'showHeader',
          'showFooter',
          'smallAnatomy',
          'enableMultiSort',
          'manualSorting',
          'mode',
          'forceShowMenuActions',
          'enableHideColumns',
          'enablePinLeftColumns',
          'enablePinRightColumns',
          'enableSortColumns',
          'enableResizeColumns',
          'enableDragColumns',
          'showPagination',
          'rowsInfo',
          'hideRecordsSelector',
          'noDataMessage',
          'rowSelectionType',
          'enableRowActions',
          'enableSubComponent',
          'enableSearch',
          'enableRightActions',
        ]}
      >
        {(props: any) => {
          const headerOptions = {
            enableHideColumns: props.enableHideColumns,
            enablePinLeftColumns: props.enablePinLeftColumns,
            enablePinRightColumns: props.enablePinRightColumns,
            enableSortColumns: props.enableSortColumns,
            enableResizeColumns: props.enableResizeColumns,
            enableDragColumns: props.enableDragColumns,
          };

          const pagination = {
            showPagination: props.showPagination,
            rowsInfo: props.rowsInfo,
            hideRecordsSelector: props.hideRecordsSelector,
            pageSize: 5,
          };

          const stateMessage = {
            noData: props.noDataMessage,
          };

          const rowSelection =
            props.rowSelectionType !== 'none'
              ? {
                  type: props.rowSelectionType,
                  getSelection: (rows: any) => {
                    console.log(
                      'Playground Selection:',
                      rows.map((r: any) => r.original.id)
                    );
                  },
                }
              : undefined;

          const rowActions = props.enableRowActions
            ? [
                {
                  action: 'edit' as const,
                  label: () => 'Edit User',
                  onClick: (row: any) =>
                    alert(`Playground Edit: ${row.original.name}`),
                },
                {
                  action: 'delete' as const,
                  label: () => 'Delete User',
                  onClick: (row: any) =>
                    alert(`Playground Delete: ${row.original.name}`),
                },
              ]
            : undefined;

          const renderSubComponent = props.enableSubComponent
            ? renderDetail
            : null;

          const rightActions = props.enableRightActions ? (
            <ListContainer
              label="Actions"
              position="bottom"
              align="end"
              trigger="click"
              items={[
                {
                  id: 'action-1',
                  label: 'Export CSV',
                  onClick: () => alert('Exporting to CSV...'),
                },
                {
                  id: 'action-2',
                  label: 'Export PDF',
                  onClick: () => alert('Exporting to PDF...'),
                },
                {
                  id: 'action-3',
                  label: 'Archive Data',
                  onClick: () => alert('Archiving data...'),
                  disabled: true,
                },
              ]}
            />
          ) : undefined;

          return (
            <div className="w-full">
              <DataTable
                tableId="playground-datatable-demo"
                columns={basicColumns}
                data={mockUsers}
                title={props.title}
                border={props.border}
                isLoading={props.isLoading}
                isError={props.isError}
                isFetching={props.isFetching}
                showHeader={props.showHeader}
                showFooter={props.showFooter}
                smallAnatomy={props.smallAnatomy}
                enableMultiSort={props.enableMultiSort}
                manualSorting={props.manualSorting}
                mode={props.mode}
                forceShowMenuActions={props.forceShowMenuActions}
                headerOptions={headerOptions}
                pagination={pagination}
                stateMessage={stateMessage}
                rowSelection={rowSelection}
                rowActions={rowActions}
                renderSubComponent={renderSubComponent}
                enableHideColumns={props.enableHideColumns}
                searchableColumns={
                  props.enableSearch ? ['name', 'email', 'role'] : undefined
                }
                rightActions={rightActions}
              />
            </div>
          );
        }}
      </PropPlayground>
    </div>
  );
};

export default PlaygroundSection;
