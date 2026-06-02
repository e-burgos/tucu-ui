import React, {
  CSSProperties,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDndContext } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Cell, ColumnDef, flexRender, Row, Table } from '@tanstack/react-table';
import { IGNORE_REPORT_COLUMNS } from '../../../common/constants';
import { parseNumericValueForExport } from '../../../common/helpers/parseNumericValueToExport';
import { useDataTableContext } from '../../../context';
import { cn } from '../../../common/helpers/cn';
import { ExpandedColumn } from '../../../common/helpers/ExpandedColumn';
import { RowActionsColumn } from '../../../common/helpers/RowActionsColumn';
import { RowSelectionColumn } from '../../../common/helpers/RowSelectionColumn';
import {
  HoverType,
  IRowActions,
  IRowSelection,
  TData,
} from '../../../common/types';
import useGetCommonPinningStyles from '../../../hooks/useGetCommonPinningStyles';
import ExpandedRowCell from './ExpandedRowCell';
import RowActionsCell from './RowActionsCell';
import RowSelectionCell from './RowSelectionCell';

/**
 * Props for the TableCell component.
 *
 * @category libs/datatable
 * @subcategory Components
 *
 * @property {string} tableId - The id of the table.
 * @property {Table<TData>} table - The table instance.
 * @property {Cell<TData, unknown>} cell - The cell instance.
 * @property {Row<TData>} row - The row instance.
 * @property {HoverType} hoverRow - The hover row instance.
 * @property {Array<IRowActions<TData>>} rowActions - The row actions.
 * @property {React.CSSProperties} style - The style of the cell.
 * @property {function(HoverType): void} setHoverRow - The function to set the hover row.
 * @property {function(boolean): void} setOpenActions - The function to set the open actions.
 * @property {boolean} forceShowMenuActions - Whether to force show the menu actions.
 * @property {IRowSelection<TData>} rowSelection - The row selection.
 *
 * @template TData - The type of the data in the table.
 */

export type ColumnDefWithAccessor<TData> = ColumnDef<TData, unknown> & {
  accessorFn?: (row: TData) => unknown;
  exportAsNumber?: boolean;
  exportAsPercentage?: boolean;
  hasSubTable?: boolean;
};
interface TableCellProps {
  tableId: string;
  table: Table<TData>;
  row: Row<TData>;
  cell: Cell<TData, unknown>;
  hoverRow: HoverType;
  rowActions?: IRowActions<TData>[];
  style?: React.CSSProperties;
  forceShowMenuActions?: boolean;
  rowSelection?: IRowSelection<TData>;
  setHoverRow: (value: HoverType) => void;
  setOpenActions?: (value: boolean) => void;
}

const TableCell: React.FC<TableCellProps> = ({
  tableId,
  table,
  cell,
  row,
  hoverRow,
  rowActions,
  style,
  forceShowMenuActions,
  rowSelection,
  setHoverRow,
  setOpenActions,
}) => {
  const { actions } = useDataTableContext() || {};
  const { pinStyles, isPinned } = useGetCommonPinningStyles(cell.column);
  const { active } = useDndContext();
  const { setNodeRef, transform } = useSortable({
    id: cell.column.id,
  });

  // Check if this column is being dragged (more reliable than just isDragging)
  const isColumnDragging = active?.id === cell.column.id;

  const columnSize = cell.column.getSize();
  const isExpanded = row.getIsExpanded();
  const isExpandedColumn = cell.column.id === ExpandedColumn.id;
  const isRowActionsColumn = cell.column.id === RowActionsColumn.id;
  const isRowSelectionColumn = cell.column.id === RowSelectionColumn.id;

  const customStyles: CSSProperties = {
    transform: CSS.Translate.toString(transform),
    width: cell.column.getSize(),
  };

  const handleCellComponents = () => {
    if (isRowActionsColumn)
      return (
        <RowActionsCell
          tableId={tableId}
          row={row}
          hoverRow={hoverRow}
          setHoverRow={setHoverRow}
          rowActions={rowActions}
          setOpenActions={setOpenActions || (() => null)}
          forceShowMenuActions={forceShowMenuActions}
        />
      );
    if (isExpandedColumn)
      return <ExpandedRowCell row={row} hoverRow={hoverRow} />;
    if (isRowSelectionColumn && rowSelection)
      return (
        <RowSelectionCell row={row} rowSelection={rowSelection} table={table} />
      );
    if (columnSize < 40) return <span>...</span>;
    return flexRender(cell.column.columnDef.cell, cell.getContext());
  };

  const width = useMemo(() => {
    const value = pinStyles?.width;

    if (Number.isNaN(value)) {
      return 0;
    }

    return value;
  }, [pinStyles?.width]);

  const content = handleCellComponents();
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentText, setContentText] = useState('');
  const previousResolvedValueRef = useRef<string>('');

  const cellIndex = useMemo(() => {
    return cell.column.getIndex();
  }, []); //eslint-disable-line

  const cellId = useMemo(() => {
    return cell.column.columnDef.id;
  }, [cell.column.columnDef.id]);

  const rowId = useMemo(() => {
    return cell.row.id;
  }, [cell.row.id]);

  useEffect(() => {
    if (contentRef.current) {
      const text = contentRef.current.textContent?.trim() ?? '';
      if (text) {
        setContentText(text);
      }
    }
  }, [content]);

  useEffect(() => {
    if (!IGNORE_REPORT_COLUMNS.includes(cellId)) {
      const def = cell.column.columnDef as ColumnDefWithAccessor<TData>;
      const rowData = cell.row.original;

      const leafColumns = table.getAllLeafColumns();
      const hasSubTable = leafColumns[0]?.id === ExpandedColumn.id;

      let resolvedValue =
        def?.accessorFn?.(rowData) || contentText?.trim() || '';

      if (def?.exportAsNumber && typeof resolvedValue === 'string') {
        resolvedValue = parseNumericValueForExport(resolvedValue) || '';
      }

      if (def?.exportAsPercentage && typeof resolvedValue === 'string') {
        const numericValue = parseNumericValueForExport(resolvedValue, {
          isPercentage: true,
        });
        resolvedValue =
          numericValue !== undefined ? numericValue.toString() : '';
      }

      const resolvedValueString = resolvedValue as string;

      // Only update if the value has actually changed to prevent infinite loops
      if (previousResolvedValueRef.current !== resolvedValueString) {
        previousResolvedValueRef.current = resolvedValueString;
        actions?.onSetReportCellValue(resolvedValueString, rowId, cellIndex, {
          hasSubTable,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentText, rowId, cellIndex, cellId, cell.row.original]);

  const getCellBgClass = () => {
    // Dragging has highest priority - use special class with !important
    if (isColumnDragging) return 'bg-table-dragged-bg-important';
    // Then expanded state
    if (isExpanded) return 'bg-table-row-expanded-bg';
    // Then hover state
    if (hoverRow.hover) return 'bg-table-row-hover';
    // Then pinned state
    if (isPinned) return 'bg-table-row-pinned';
    // Default background
    return 'bg-table-row-bg';
  };

  return (
    <div
      role="cell"
      ref={setNodeRef}
      id={`col-${cell.id}`}
      data-testid="table-cell"
      className={cn(
        'relative overflow-hidden whitespace-nowrap text-ellipsis min-w-0 p-0 transition-[background-color] duration-200 ease-in-out shrink-0',
        getCellBgClass(),
        isColumnDragging &&
          'border-b border-r border-l border-dashed border-table-divider z-500',
        !isColumnDragging && (isPinned ? 'z-10' : 'z-0')
      )}
      style={{
        ...style,
        ...customStyles,
        ...pinStyles,
        width: width,
        ...(isColumnDragging && {
          zIndex: 500,
        }),
      }}
    >
      <div
        ref={contentRef}
        className={cn(
          'z-1 relative w-full h-full box-border flex items-center overflow-hidden whitespace-nowrap text-ellipsis transition-[background-color] duration-200 ease-in-out',
          isRowActionsColumn ? 'justify-center p-0' : 'justify-start px-3',
          isColumnDragging && 'opacity-80 bg-transparent'
        )}
        data-testid="table-cell-content"
        data-value={contentText}
      >
        {content}
      </div>
    </div>
  );
};

export default memo(TableCell);
