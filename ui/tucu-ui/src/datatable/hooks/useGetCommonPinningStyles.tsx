import { CSSProperties } from 'react';
import { Column } from '@tanstack/react-table';
import { TData } from '../common/types';

/**
 * useGetCommonPinningStyles
 * @category libs/datatable
 * @subcategory Hooks
 *
 * @param {Column<TData>} column - The column of the table.
 * @returns {Object} The object with the pin styles, is pinned, is last left pinned column, and is first right pinned column.
 *
 * @template TData - The type of the data in the table.
 */

export const useGetCommonPinningStyles = (column: Column<TData>) => {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right');
  const expandedColumn = column.id === 'Expanded';
  const rowActionsColumn = column.id === 'RowActionsColumn';
  const rowSelectionColumn = column.id === 'RowSelectionColumn';
  const isPinColumn = expandedColumn || rowActionsColumn || rowSelectionColumn;

  const pinStyles: Omit<CSSProperties, 'width'> & { width: number } = {
    boxShadow: isLastLeftPinnedColumn
      ? `-5px 0 4px -4px ${isPinColumn ? 'transparent' : 'var(--color-table-divider)'} inset`
      : isFirstRightPinnedColumn
        ? `5px 0 4px -4px ${isPinColumn ? 'transparent' : 'var(--color-table-divider)'} inset`
        : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isPinned ? 1 : undefined,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    // REMOVE: if not the resize not working and columns not set width correctly
    minWidth: column.columnDef?.minSize,
    maxWidth: column.columnDef?.maxSize,
    zIndex: isPinned ? 1 : 0,
  };

  return {
    pinStyles,
    isPinned,
    isFirstRightPinnedColumn,
    isLastLeftPinnedColumn,
  };
};

export default useGetCommonPinningStyles;
