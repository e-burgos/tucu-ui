/* eslint-disable @typescript-eslint/ban-ts-comment */
import { CSSProperties, FC, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { flexRender, Header, HeaderGroup } from '@tanstack/react-table';
import {
  HeaderActionType,
  HoverType,
  IHeaderOptions,
  TData,
} from '../../../common/types';
import useGetCommonPinningStyles from '../../../hooks/useGetCommonPinningStyles';
import useTableColors from '../../../hooks/useTableColors';
import DragIndicator from '../../Assets/DragIndicator';
import ColumnPin from './ColumnPin';
import ColumnSearcher from './ColumnSearcher';
import ColumnSort from './ColumnSort';
import ColumnVisibility from './ColumnVisibility';
import styles from './table-header.module.css';

interface TableHeaderProps {
  header: Header<TData, unknown>;
  headerGroup: HeaderGroup<TData>;
  index: number;
  headerOptions?: IHeaderOptions;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const TableHeader: FC<TableHeaderProps> = ({
  header,
  headerGroup,
  index,
  headerOptions,
  disabled,
  style,
}) => {
  const { colors } = useTableColors();
  const { pinStyles, isPinned } = useGetCommonPinningStyles(header.column);
  const { attributes, isDragging, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
    });

  const [hoverColumn, setHoverColumn] = useState<boolean>(false);
  const [hoverDrag, setHoverDrag] = useState<HoverType>({
    hover: false,
    index,
  });

  const handleHeaderAction = (action: HeaderActionType) => {
    if (disabled) return false;
    else
      switch (action) {
        case 'drag':
          return headerOptions?.enableDragColumns ?? true;
        case 'sort':
          return headerOptions?.enableSortColumns ?? true;
        case 'pin-left':
          return headerOptions?.enablePinLeftColumns ?? true;
        case 'pin-right':
          return headerOptions?.enablePinRightColumns;
        case 'visibility':
          return headerOptions?.enableHideColumns;
        case 'resize':
          return headerOptions?.enableResizeColumns ?? true;
        default:
          break;
      }
  };

  const enableDragColumns = handleHeaderAction('drag');
  const enableSortColumns = handleHeaderAction('sort');
  const enablePinLeftColumns = handleHeaderAction('pin-left');
  const enablePinRightColumns = handleHeaderAction('pin-right');
  const enableHideColumns = handleHeaderAction('visibility');
  const enableResizeColumns = handleHeaderAction('resize');

  // @ts-ignore
  const noDraggableColumnConfig = header.column.columnDef.meta?.noDraggable;
  const expandedColumn = header.column.columnDef.id === 'Expanded';
  const rowActionsColumn = header.column.columnDef.id === 'RowActionsColumn';
  const draggableColumn =
    !noDraggableColumnConfig &&
    enableDragColumns &&
    !expandedColumn &&
    !rowActionsColumn;

  const handleBgColor = () => {
    if (isDragging) return colors.paperBg;
    if (isPinned) {
      if (rowActionsColumn) return 'transparent';
      if (expandedColumn) return style?.backgroundColor || colors.headerBg;
    }
    return style?.backgroundColor || colors.headerBg;
  };

  const dragStyle: CSSProperties = {
    position: 'relative',
    transform: CSS.Translate.toString(transform),
    transition: 'width transform 0.2s ease-in-out',
    whiteSpace: 'nowrap',
    width: header.column.getSize(),
    opacity: isDragging ? 0.8 : 1,
  };

  const handleColumnDividerIndicator = () => {
    if (index !== headerGroup.headers?.length - 1) {
      if (hoverDrag.hover) {
        return `4px solid ${colors.secondaryText}`;
      } else if (!header.column.getIsResizing()) {
        return `2px solid ${colors.divider}`;
      } else if (header.column.getIsResizing()) {
        return `4px solid ${colors.secondaryText}`;
      }
    }
    return undefined;
  };

  return (
    <th
      id={`col-${header.column.id}`}
      colSpan={header.colSpan}
      ref={setNodeRef}
      style={{
        ...style,
        ...dragStyle,
        ...pinStyles,
        zIndex: isDragging || isPinned ? 10 : 0,
        backgroundColor: handleBgColor(),
      }}
      onDoubleClick={() => header.column.resetSize()}
      onMouseDown={
        enableResizeColumns && !hoverDrag.hover
          ? header.getResizeHandler()
          : undefined
      }
      onTouchStart={
        enableResizeColumns && !hoverDrag.hover
          ? header.getResizeHandler()
          : undefined
      }
      className={`${
        enableResizeColumns && header.column.getCanResize()
          ? styles.resizer
          : undefined
      }`}
      onMouseEnter={() => setHoverColumn(true)}
      onMouseLeave={() => setHoverColumn(false)}
      onBlur={() => setHoverColumn(false)}
    >
      <div
        className={`
          ${styles.headerLeftContent} 
          ${expandedColumn ? styles.flexHeader : undefined}
        `}
      >
        {draggableColumn && hoverColumn && (
          <button
            className={styles.draggableButton}
            onMouseEnter={() => setHoverDrag({ hover: true, index })}
            onMouseLeave={() => setHoverDrag({ hover: false, index })}
            {...attributes}
            {...listeners}
          >
            <DragIndicator
              size={20}
              direction="vertical"
              color={
                isDragging || hoverDrag.hover
                  ? colors.primaryText
                  : colors.disabled
              }
            />
          </button>
        )}
        {header.isPlaceholder
          ? null
          : flexRender(
              // Name of the column
              header.column.columnDef.header,
              header.getContext()
            )}
      </div>
      <div className={styles.headerRightContent}>
        <div
          style={{
            borderRight: handleColumnDividerIndicator(),
          }}
          className={styles.columnDivider}
        />
        {header.column.getCanPin() && (
          <>
            {header.column.getIsPinned() && (
              <ColumnPin
                enablePinLeftColumns={enablePinLeftColumns}
                enablePinRightColumns={enablePinRightColumns}
                header={header}
                color={colors.primaryText}
              />
            )}
            {!header.column.getIsPinned() && hoverColumn && (
              <ColumnPin
                enablePinLeftColumns={enablePinLeftColumns}
                enablePinRightColumns={enablePinRightColumns}
                header={header}
                color={colors.disabled}
              />
            )}
          </>
        )}

        {enableHideColumns && header.column.getCanHide() && hoverColumn && (
          <ColumnVisibility header={header} />
        )}

        {enableSortColumns && header.column.getCanSort() && (
          <>
            {header.column.getIsSorted() && (
              <ColumnSort header={header} color={colors.primaryText} />
            )}
            {!header.column.getIsSorted() && hoverColumn && (
              <ColumnSort header={header} color={colors.disabled} />
            )}
          </>
        )}
        {/* TODO */}
        {header.column.getCanFilter() && hoverColumn && (
          <ColumnSearcher column={header.column} />
        )}
      </div>
    </th>
  );
};

export default TableHeader;
