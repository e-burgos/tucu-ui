/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from '@tanstack/react-table';

/**
 * Row selection column
 * @category libs/datatable
 * @subcategory Helpers
 *
 * @param any - The any
 */

export const RowSelectionColumn: ColumnDef<any, any> = {
  id: 'RowSelectionColumn',
  enableResizing: false,
  enableSorting: false,
  enablePinning: false,
  enableHiding: false,
  enableDraggable: false,
  size: 50,
  maxSize: 50,
  minSize: 50,
  cell: () => null,
  header: () => null,
  // Active if you want to add a checkbox to select all rows
  // header: ({ table }) => {
  //   return (
  //     <RowSelection
  //       {...{
  //         indeterminate: table.getIsSomeRowsSelected(),
  //         checked: table.getIsAllRowsSelected(),
  //         onChange: table.getToggleAllRowsSelectedHandler(),
  //       }}
  //     />
  //   );
  // },
};
