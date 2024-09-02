/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { CSSProperties } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Cell, flexRender, Row } from '@tanstack/react-table';
import { HoverType, IRowActions, TData } from '../../../../common/types';
import useGetCommonPinningStyles from '../../../../hooks/useGetCommonPinningStyles';
import useTableColors from '../../../../hooks/useTableColors';
import ExpandedRowCell from './ExpandedRowCell';
import RowActionsCell from './RowActionsCell';

interface TableCellProps {
  row: Row<TData>;
  cell: Cell<TData, unknown>;
  hoverRow: HoverType;
  rowActions?: IRowActions<TData>[];
  style?: React.CSSProperties;
  setHoverRow: (value: HoverType) => void;
  setOpenActions?: (value: boolean) => void;
}

const TableCell: React.FC<TableCellProps> = ({
  cell,
  row,
  hoverRow,
  rowActions,
  style,
  setHoverRow,
  setOpenActions,
}) => {
  const { colors } = useTableColors();
  const { pinStyles, isPinned } = useGetCommonPinningStyles(cell.column);
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
  });

  const columnSize = cell.column.getSize();
  const isExpanded = row.getIsExpanded();
  const isExpandedColumn = cell.column.id === 'Expanded';
  const isRowActionsColumn = cell.column.id === 'RowActionsColumn';

  const paddingStyles = isExpandedColumn ? 0 : '0 16px';

  const handleRowBg = () => {
    if (isDragging) return colors.paperBg;
    if (isRowActionsColumn) return 'transparent';
    if (isExpandedColumn) {
      return 'transparent';
    } else return style?.backgroundColor || 'inherit';
  };

  const customStyles: CSSProperties = {
    position: 'relative',
    transform: CSS.Translate.toString(transform),
    transition: 'width transform 0.2s ease-in-out',
    width: cell.column.getSize(),
    opacity: isDragging ? 0.8 : 1,
  };

  const handleCellComponents = () => {
    if (isRowActionsColumn)
      return (
        <RowActionsCell
          row={row}
          hoverRow={hoverRow}
          setHoverRow={setHoverRow}
          rowActions={rowActions}
          setOpenActions={setOpenActions}
        />
      );
    if (isExpandedColumn)
      return <ExpandedRowCell row={row} hoverRow={hoverRow} />;
    if (columnSize < 40) return <span>...</span>;
    return flexRender(cell.column.columnDef.cell, cell.getContext());
  };

  return (
    <td
      ref={setNodeRef}
      style={{
        ...style,
        ...customStyles,
        ...pinStyles,
        zIndex: isDragging || isPinned ? 10 : 0,
        backgroundColor: handleRowBg(),
        borderBottom: isExpanded ? 'none' : `1px solid ${colors.divider}`,
        padding: paddingStyles,
      }}
    >
      {handleCellComponents()}
    </td>
  );
};

export default TableCell;
