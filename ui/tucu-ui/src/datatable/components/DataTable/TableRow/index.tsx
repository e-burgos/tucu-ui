import { FC, CSSProperties, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Row, Table } from '@tanstack/react-table';
import { cn } from '../../../common/helpers/cn';
import {
  HoverType,
  IRowActions,
  IRowSelection,
  TData,
} from '../../../common/types';
import TableCell from '../TableCell';

/**
 * Props for the TableRow component.
 *
 * @category libs/datatable
 * @subcategory Components
 *
 * @property {string} tableId - The id of the table.
 * @property {Table<TData>} table - The table instance.
 * @property {Row<TData>} row - The row instance.
 * @property {number} index - The index of the row.
 * @property {Array<string>} columnOrder - The order of the columns.
 * @property {CSSProperties} style - The style of the row.
 * @property {boolean} isColumn - Whether the row is a column.
 * @property {Array<IRowActions<TData>>} rowActions - The row actions.
 * @property {function(React.MouseEvent<HTMLTableRowElement>): void} onClick - The function to call when the row is clicked.
 * @property {boolean} forceShowMenuActions - Whether to force show the menu actions.
 * @property {IRowSelection<TData>} rowSelection - The row selection.
 * @property {boolean} smallAnatomy - Whether the row is a small anatomy.
 *
 * @template TData - The type of the data in the table.
 */

interface RowProps {
  tableId: string;
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
  onClick: React.MouseEventHandler<HTMLTableRowElement>;
  forceShowMenuActions?: boolean;
  rowSelection: IRowSelection<TData>;
  smallAnatomy?: boolean;
}

const TableRow: FC<RowProps> = ({
  tableId,
  table,
  row,
  index,
  style,
  isColumn,
  rowActions,
  onClick,
  forceShowMenuActions,
  rowSelection,
  smallAnatomy,
}) => {
  const [openActions, setOpenActions] = useState<boolean>(false);
  const [hoverRow, setHoverRow] = useState<HoverType>({
    hover: false,
    index: 0,
  });

  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: index.toString(),
  });

  const cssTransform = CSS.Transform.toString(transform);

  const isExpanded = row.getIsExpanded();

  // Determine background color classes based on state
  const getRowBgClass = () => {
    if (row.getIsExpanded()) {
      return hoverRow.hover ? 'bg-table-row-hover' : 'bg-table-row-expanded-bg';
    }
    if (isDragging) return 'bg-table-dragged-bg';
    if (hoverRow.hover) return 'bg-table-row-hover';
    return 'bg-table-row-bg';
  };

  const dragStyles: CSSProperties = {
    transform: cssTransform,
    transition: transition,
  };

  return (
    <div
      role="row"
      data-testid="table-row"
      ref={!isColumn ? setNodeRef : undefined}
      onClick={onClick}
      onMouseEnter={() => {
        setHoverRow({ hover: true, index });
      }}
      onMouseLeave={() => setHoverRow({ hover: false, index })}
      className={cn(
        'text-table-primary-text! relative flex min-w-(--table-width) w-fit transition-all duration-200 ease-in-out',
        smallAnatomy
          ? 'h-10 max-h-10 min-h-10'
          : 'h-[52px] max-h-[52px] min-h-[52px]',
        getRowBgClass(),
        isExpanded && 'data-table-expanded-principal-row',
        hoverRow.hover && 'table-row-hover-shadow',
        !isExpanded && 'border-b border-table-divider',
        isDragging && 'opacity-80',
        openActions ? 'z-11' : hoverRow.hover ? 'z-10' : 'z-0'
      )}
      style={{
        ...style?.row,
        ...dragStyles,
        color: 'var(--color-table-primary-text)',
      }}
    >
      {row.getVisibleCells().map((cell) => {
        return (
          <TableCell
            key={cell.id}
            tableId={tableId}
            table={table}
            cell={cell}
            row={row}
            hoverRow={hoverRow}
            setHoverRow={setHoverRow}
            setOpenActions={setOpenActions}
            style={{
              ...style?.cell,
            }}
            rowActions={rowActions}
            forceShowMenuActions={forceShowMenuActions}
            rowSelection={rowSelection}
          />
        );
      })}
    </div>
  );
};

export default TableRow;
