import { ColumnDef, RowData, VisibilityState } from '@tanstack/react-table';
import { ExpandedColumn } from '../common/helpers/ExpandedColumn';
import { RowActionsColumn } from '../common/helpers/RowActionsColumn';
import { RowSelectionColumn } from '../common/helpers/RowSelectionColumn';

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

export function getColumns<TData = RowData, TValue = unknown>({
  columns,
  containerWidth,
  isSubComponent,
  isRowActions,
  isRowSelection,
  columnVisibility,
  offset = 0,
}: {
  columns: Array<ColumnDef<TData, TValue>>;
  containerWidth: number;
  offset: number;
  isSubComponent: boolean;
  isRowActions: boolean;
  isRowSelection: boolean;
  columnVisibility: VisibilityState;
}): Array<ColumnDef<TData, TValue>> {
  let OutputColumns: Array<ColumnDef<TData, TValue>> = columns;

  const OutputVisibleColumns: Array<ColumnDef<TData, TValue>> = columns?.filter(
    (column) => columnVisibility[column?.id ?? '']
  );

  const initialOffsetColumnSize = OutputVisibleColumns?.reduce(
    (acc, current) => {
      if (current?.size) {
        return acc + current.size;
      }
      return acc;
    },
    offset
  );

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
  const columnsLength = OutputVisibleColumns?.filter((column) => {
    if (column?.enableVisible === false) return false;
    return column?.size === undefined;
  }).length;

  const maxWidth = containerWidth - initialOffsetColumnSize;

  return OutputColumns?.map((column) => {
    const enableDraggable = column?.enableDraggable !== false;
    return {
      ...column,
      enableDraggable,
      size: column?.size ?? maxWidth / columnsLength,
    };
  });
}
