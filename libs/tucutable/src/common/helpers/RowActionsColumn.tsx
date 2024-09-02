/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from '@tanstack/react-table';

export const RowActionsColumn: ColumnDef<any, any> = {
  id: 'RowActionsColumn',
  enableResizing: false,
  enableSorting: false,
  enablePinning: false,
  enableHiding: false,
  size: 24,
  maxSize: 24,
  minSize: 24,
  header: () => null,
  cell: () => null,
};
