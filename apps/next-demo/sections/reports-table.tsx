'use client';

import { DataTable } from '@e-burgos/tucu-ui';
import type { ColumnDef } from '@tanstack/react-table';

type Report = { id: number; name: string; owner: string; total: number };

const reports: Report[] = [
  { id: 1, name: 'Quarterly sales', owner: 'Ana', total: 12400 },
  { id: 2, name: 'Churn analysis', owner: 'Luis', total: 3100 },
  { id: 3, name: 'Marketing spend', owner: 'Marta', total: 8750 },
  { id: 4, name: 'Support load', owner: 'Diego', total: 1980 },
];

const columns: ColumnDef<Report, Report>[] = [
  { accessorKey: 'name', header: 'Report', size: 320 },
  { accessorKey: 'owner', header: 'Owner', size: 200 },
  {
    accessorKey: 'total',
    header: 'Total',
    size: 160,
    cell: ({ row }) => `$${row.original.total.toLocaleString('en-US')}`,
  },
];

export function ReportsTable() {
  return <DataTable tableId="reports" data={reports} columns={columns} />;
}
