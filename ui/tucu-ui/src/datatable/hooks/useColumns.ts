'use client';

import { ColumnDef, RowData, VisibilityState } from '@tanstack/react-table';
import { ExpandedColumn } from '../common/helpers/ExpandedColumn';
import { RowActionsColumn } from '../common/helpers/RowActionsColumn';
import { RowSelectionColumn } from '../common/helpers/RowSelectionColumn';
import {
  fillColumnsToWidth,
  resolveBaseColumnSize,
} from '../common/functions/fillColumnsToWidth';
import type { DataTableColumnSizing } from '../common/types';

/**
 * getColumns
 * @category libs/datatable
 * @subcategory Hooks
 *
 * @param {Array<ColumnDef<TData, TValue>>} columns - The columns of the table.
 * @param {number} containerWidth - The width of the container.
 * @param {boolean} isSubComponent - Whether the table has a sub component.
 * @param {boolean} isRowActions - Whether the table has a row actions.
 * @param {boolean} isRowSelection - Whether the table has a row selection.
 * @param {number} offset - The offset of the columns.
 * @param {VisibilityState} columnVisibility - The visibility of the columns.
 * @returns {Array<ColumnDef<TData, TValue>>} The columns of the table.
 *
 * @template TData - The type of the data in the table.
 * @template TValue - The type of the value in the table.
 */

const isColumnVisible = (
  column: ColumnDef<unknown, unknown>,
  columnVisibility: VisibilityState
): boolean => columnVisibility[column?.id ?? ''] !== false;

export function distributeLeftoverColumnWidth<TData = RowData, TValue = unknown>({
  columns,
  containerWidth,
  offset = 0,
  columnVisibility,
}: {
  columns: Array<ColumnDef<TData, TValue>>;
  containerWidth: number;
  offset?: number;
  columnVisibility: VisibilityState;
}): number {
  const visibleColumns = (columns ?? []).filter(
    (column) =>
      column?.enableVisible !== false &&
      isColumnVisible(column as ColumnDef<unknown, unknown>, columnVisibility)
  );
  const explicitSizeTotal = visibleColumns.reduce(
    (total, column) => total + (column?.size ?? 0),
    offset
  );
  const fluidColumnCount = visibleColumns.filter(
    (column) => column?.size === undefined
  ).length;
  if (fluidColumnCount === 0) return 0;
  return Math.max((containerWidth - explicitSizeTotal) / fluidColumnCount, 0);
}

const isColumnFillable = (
  column: ColumnDef<unknown, unknown>,
  columnVisibility: VisibilityState
): boolean =>
  column?.enableVisible !== false && isColumnVisible(column, columnVisibility);

function fillVisibleColumns<TData, TValue>({
  columns,
  availableWidth,
  columnVisibility,
}: {
  columns: Array<ColumnDef<TData, TValue>>;
  availableWidth: number;
  columnVisibility: VisibilityState;
}): Array<ColumnDef<TData, TValue>> {
  const visibleIndexes = columns.flatMap((column, index) =>
    isColumnFillable(column as ColumnDef<unknown, unknown>, columnVisibility)
      ? [index]
      : []
  );
  const filled = fillColumnsToWidth(
    visibleIndexes.map((index) => ({
      ...columns[index],
      size: resolveBaseColumnSize(columns[index]),
    })),
    availableWidth
  );
  const result = [...columns];
  visibleIndexes.forEach((columnIndex, position) => {
    result[columnIndex] = filled[position];
  });
  return result;
}

export function getColumns<TData = RowData, TValue = unknown>({
  columns,
  containerWidth,
  isSubComponent,
  isRowActions,
  isRowSelection,
  columnVisibility,
  offset = 0,
  columnSizing = 'fill-leftover',
}: {
  columns: Array<ColumnDef<TData, TValue>>;
  containerWidth: number;
  offset: number;
  columnSizing?: DataTableColumnSizing;
  isSubComponent: boolean;
  isRowActions: boolean;
  isRowSelection: boolean;
  columnVisibility: VisibilityState;
}): Array<ColumnDef<TData, TValue>> {
  const sizedColumns =
    columnSizing === 'fill'
      ? fillVisibleColumns({
          columns,
          availableWidth: containerWidth - offset,
          columnVisibility,
        })
      : columns;
  let OutputColumns: Array<ColumnDef<TData, TValue>> = sizedColumns;

  const fluidColumnWidth =
    columnSizing === 'fill-leftover'
      ? distributeLeftoverColumnWidth({
          columns,
          containerWidth,
          offset,
          columnVisibility,
        })
      : 0;

  if (isSubComponent) {
    // add to first columns the ExpandedColumn
    OutputColumns = [
      ExpandedColumn as ColumnDef<TData, TValue>,
      ...OutputColumns,
    ];
  }
  if (isRowSelection) {
    // add to first columns the RowSelectionColumn
    OutputColumns = [
      RowSelectionColumn as ColumnDef<TData, TValue>,
      ...OutputColumns,
    ];
  }
  if (isRowActions) {
    // add to last columns the RowActionsColumn
    OutputColumns = [
      ...OutputColumns,
      RowActionsColumn as ColumnDef<TData, TValue>,
    ];
  }
  return OutputColumns?.map((column) => {
    const enableDraggable = column?.enableDraggable !== false;
    return {
      ...column,
      enableDraggable,
      size:
        columnSizing === 'fixed'
          ? column?.size
          : column?.size ?? Math.max(fluidColumnWidth, column?.minSize ?? 0),
    };
  });
}
