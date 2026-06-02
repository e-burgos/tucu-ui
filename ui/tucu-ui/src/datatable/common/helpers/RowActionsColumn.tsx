/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from '@tanstack/react-table';

/**
 * Row actions column
 * @category libs/datatable
 * @subcategory Helpers
 *
 * @param any - The any
 */

export const RowActionsColumn: ColumnDef<any, any> = {
  id: 'RowActionsColumn',
  enableResizing: false,
  enableSorting: false,
  enablePinning: false,
  enableHiding: false,
  enableDraggable: false,
  size: 50,
  maxSize: 50,
  minSize: 50,
  header: () => null,
  cell: () => null,
};
