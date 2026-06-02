/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from '@tanstack/react-table';

/**
 * Expanded column
 * @category libs/datatable
 * @subcategory Helpers
 *
 * @param any - The any
 */

export const ExpandedColumn: ColumnDef<any, any> = {
  id: 'Expanded',
  enableResizing: false,
  enableSorting: false,
  enablePinning: false,
  enableHiding: false,
  size: 50,
  maxSize: 50,
  minSize: 50,
  header: () => null,
  cell: () => null,
};

// Expanded all rows example
// header: ({ table }) => {
//   return (
//     <AssetButton onClick={table.getToggleAllRowsExpandedHandler()}>
//       {table.getIsAllRowsExpanded() ? (
//         <ArrowIndicator direction="up" />
//       ) : (
//         <ArrowIndicator direction="down" />
//       )}
//     </AssetButton>
//   );
// },
// cell: ({ row }) => {
//   return (
//     <div
//       style={{
//         display: 'flex',
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: '100%',
//         height: '100%',
//         backgroundColor: 'inherit',
//       }}
//     >
//       <AssetButton onClick={row.getToggleExpandedHandler()}>
//         {row.getIsExpanded() ? (
//           <ArrowIndicator direction="up" size={20} />
//         ) : (
//           <ArrowIndicator direction="down" size={20} />
//         )}
//       </AssetButton>
//     </div>
//   );
// },
