import { FC, CSSProperties, useState, Fragment } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Row, Table } from '@tanstack/react-table';
import { HoverType, IRowActions, TData } from '../../../common/types';
import useTableColors from '../../../hooks/useTableColors';
import TableCell from './TableCell';

interface RowProps {
  table: Table<TData>;
  row: Row<TData>;
  index: number;
  columnOrder: string[];
  style?: {
    row?: CSSProperties;
    cell?: CSSProperties;
  };
  isColumn: boolean;
  rowActions?: IRowActions<TData>[];
}

const TableRow: FC<RowProps> = ({
  row,
  index,
  style,
  isColumn,
  rowActions,
}) => {
  const [openActions, setOpenActions] = useState<boolean>(false);
  const [hoverRow, setHoverRow] = useState<HoverType>({
    hover: false,
    index: 0,
  });

  const { colors } = useTableColors();
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: index.toString(),
  });

  const cssTrasform = CSS.Transform.toString(transform);

  const handleRowBg = () => {
    if (row.getIsExpanded()) return colors.rowExpandedBg;
    if (isDragging) return colors.paperBg;
    if (hoverRow.hover) return colors.rowHover;
    return style?.row?.backgroundColor || colors.rowBg;
  };

  const dragStyles: CSSProperties = {
    position: 'relative',
    transform: cssTrasform,
    transition: transition,
    zIndex: isDragging ? 10 : openActions ? 1 : 0,
    opacity: isDragging ? 0.8 : 1,
    color: colors.primaryText,
  };

  return (
    <tr
      ref={!isColumn ? setNodeRef : undefined}
      onMouseEnter={() => setHoverRow({ hover: true, index })}
      onMouseLeave={() => setHoverRow({ hover: false, index })}
      style={{
        ...style?.row,
        ...dragStyles,
        backgroundColor: handleRowBg(),
      }}
    >
      {row.getVisibleCells().map((cell) => {
        return (
          <Fragment key={cell.id}>
            <TableCell
              key={cell.id}
              cell={cell}
              row={row}
              hoverRow={hoverRow}
              setHoverRow={setHoverRow}
              setOpenActions={setOpenActions}
              style={style?.cell}
              rowActions={rowActions}
            />
          </Fragment>
        );
      })}
    </tr>
  );
};

export default TableRow;
