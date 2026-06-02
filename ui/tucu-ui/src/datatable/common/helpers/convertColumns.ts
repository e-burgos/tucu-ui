/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode } from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { RowData } from '@tanstack/table-core';

/**
 * Basic interface of columns
 * @category libs/datatable
 * @subcategory Helpers
 *
 * @param headerName - The header name
 * @param renderCell - The render cell
 * @param field - The field
 * @param width - The width
 * @param minWidth - The min width
 * @param resizable - The resizable
 * @param sortable - The sortable
 * @param pinnable - The pinnable
 * @param filterable - The filterable
 * @param disableReorder - The disable reorder
 * @param [key: string]: any - The any
 */
export interface GridColumns {
  headerName?: string;
  renderCell?: (props: any) => ReactNode;
  field: string;
  width?: number;
  minWidth?: number;
  resizable?: boolean;
  sortable?: boolean;
  pinnable?: boolean;
  filterable?: boolean;
  disableReorder?: boolean;
  [key: string]: any;
}

/**
 * Convert columns
 * @category libs/datatable
 * @subcategory Helpers
 *
 * @param datagridColumns - The datagrid columns
 * @returns The columns
 */
export function convertColumns<TData extends RowData, TValue = unknown>(
  datagridColumns: GridColumns[]
): Array<ColumnDef<TData, TValue>> {
  return datagridColumns?.map((column) => {
    return {
      ...column,
      key: column?.field,
      id: column?.field,
      accessorKey: column?.field,
      minSize: column?.minWidth,
      size: column?.width,
      enableResizing: column?.resizable,
      enableSorting: column?.sortable,
      enableDraggable: !column?.disableReorder,
      enableVisible: !column?.hide,
      // enableColumnFilter: column?.filterable, // TODO: enable active search box in column header
      enablePinning: column?.pinnable,
      header: () => column?.headerName || column?.renderHeader?.(),
      cell(info) {
        if (column?.renderCell) {
          return column.renderCell({
            row: info?.row?.original,
          });
        }
        return info?.getValue?.();
      },
    } as ColumnDef<TData, TValue>;
  });
}
