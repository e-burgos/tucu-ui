/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from '@tanstack/react-table';

/**
 * Offset column
 * @category libs/datatable
 * @subcategory Helpers
 *
 * @param any - The any
 */

export const OffsetColumn: ColumnDef<any, any> = {
  id: 'OffsetColumn',
  enableResizing: false,
  enableSorting: false,
  enablePinning: true,
  enableHiding: false,
  enableDraggable: false,
  size: 0,
  header: () => null,
  cell: () => null,
};
