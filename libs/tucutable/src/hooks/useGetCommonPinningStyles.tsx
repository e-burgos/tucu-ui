import { CSSProperties } from 'react';
import { Column } from '@tanstack/react-table';
import { TData } from '../common/types';
import useTableColors from './useTableColors';

const useGetCommonPinningStyles = (column: Column<TData>) => {
  const { colors } = useTableColors();
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinnedColumn =
    isPinned === 'right' && column.getIsFirstColumn('right');
  const expandedColumn = column.id === 'Expanded';
  const rowActionsColumn = column.id === 'RowActionsColumn';

  const pinStyles: CSSProperties = {
    boxShadow: isLastLeftPinnedColumn
      ? `-5px 0 4px -4px ${expandedColumn || rowActionsColumn ? 'transparent' : colors.divider} inset`
      : isFirstRightPinnedColumn
        ? `5px 0 4px -4px ${expandedColumn || rowActionsColumn ? 'transparent' : colors.divider} inset`
        : undefined,
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    opacity: isPinned ? 1 : undefined,
    position: isPinned ? 'sticky' : 'relative',
    width: `${expandedColumn ? 50 : column.getSize()}px`,
    maxWidth: `${expandedColumn && 50}px`,
    minWidth: `${expandedColumn && 50}px`,
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
