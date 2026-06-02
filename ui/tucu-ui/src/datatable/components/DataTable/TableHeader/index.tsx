import {
  Children,
  CSSProperties,
  FC,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useDndContext } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Column,
  flexRender,
  Header,
  HeaderContext,
} from '@tanstack/react-table';
import { IGNORE_REPORT_COLUMNS } from '../../../common/constants';
import { useDataTableContext } from '../../../context';
import { cn } from '../../../common/helpers/cn';
import { ExpandedColumn } from '../../../common/helpers/ExpandedColumn';
import { RowActionsColumn } from '../../../common/helpers/RowActionsColumn';
import { RowSelectionColumn } from '../../../common/helpers/RowSelectionColumn';
import {
  HeaderActionType,
  HoverType,
  IHeaderOptions,
  TData,
} from '../../../common/types';
import DragIndicator from '../../Assets/DragIndicator';
import { useComponentEventListener } from '../../../hooks/useComponentEventListener';
import useGetCommonPinningStyles from '../../../hooks/useGetCommonPinningStyles';
import ColumnPin from './ColumnPin';
import ColumnSearcher from './ColumnSearcher';
import ColumnSort from './ColumnSort';
import ColumnVisibility from './ColumnVisibility';

/**
 * Props for the TableHeader component.
 *
 * @category libs/datatable
 * @subcategory Components
 *
 * @property {Header<TData, unknown>} header - The header of the column.
 * @property {HeaderGroup<TData>} headerGroup - The header group of the column.
 * @property {number} index - The index of the column.
 * @property {IHeaderOptions} headerOptions - The header options of the column.
 * @property {boolean} disabled - Whether the column is disabled.
 * @property {boolean} isHeaderFixed - Whether the header is fixed.
 * @property {React.CSSProperties} style - The style of the column.
 * @property {string} tableId - The id of the table.
 *
 * @template TData - The type of the data in the table.
 */

interface TableHeaderProps {
  header: Header<TData, unknown>;
  index: number;
  headerOptions?: IHeaderOptions;
  disabled?: boolean;
  isHeaderFixed?: boolean;
  style?: React.CSSProperties;
  tableId: string;
}

const TableHeader: FC<TableHeaderProps> = ({
  header,
  index,
  headerOptions,
  disabled,
  isHeaderFixed,
  style,
  tableId,
}) => {
  const { element: tableContainer } = useComponentEventListener(
    `${tableId}-container`
  );

  const keyId = header.column.id
    ? `${tableId}-${header.column.id}-${index}`
    : index;

  const { actions, tableState } = useDataTableContext() || {};

  const { pinStyles, isPinned } = useGetCommonPinningStyles(header.column);
  const { active } = useDndContext();
  const { attributes, listeners, setNodeRef, transform } =
    useSortable({
      id: header.column.id,
    });

  // Check if this column is being dragged (more reliable than just isDragging)
  const isColumnDragging = active?.id === header.column.id;

  const [isHoverResize, setIsHoverResize] = useState<boolean>(false);
  const [isHoverResizer, setIsHoverResizer] = useState<boolean>(false);
  const [isHover, setIsHover] = useState<boolean>(false);
  const [hoverColumn, setHoverColumn] = useState<boolean>(false);
  const [hoverDrag, setHoverDrag] = useState<HoverType>({
    hover: false,
    index,
  });

  const handleHeaderAction = (action: HeaderActionType): boolean => {
    if (disabled) return false;
    switch (action) {
      case 'drag':
        return headerOptions?.enableDragColumns ?? true;
      case 'sort':
        return headerOptions?.enableSortColumns ?? true;
      case 'pin-left':
        return headerOptions?.enablePinLeftColumns ?? true;
      case 'pin-right':
        return headerOptions?.enablePinRightColumns ?? false;
      case 'visibility':
        return headerOptions?.enableHideColumns ?? false;
      case 'resize':
        return headerOptions?.enableResizeColumns ?? true;
      default:
        return true;
    }
  };

  const enableDragColumns = handleHeaderAction('drag');
  const enableSortColumns = handleHeaderAction('sort');
  const enablePinLeftColumns = handleHeaderAction('pin-left');
  const enablePinRightColumns = handleHeaderAction('pin-right');
  const enableHideColumns = handleHeaderAction('visibility');
  const enableResizeColumns = handleHeaderAction('resize');

  const enableDraggableColumnConfig = header.column.columnDef.enableDraggable;
  const isExpandedColumn = header.column.columnDef?.id === ExpandedColumn.id;
  const rowSelectionColumn =
    header.column.columnDef?.id === RowSelectionColumn.id;
  const isRowActionsColumn = header.column.id === RowActionsColumn.id;
  const isEnabledActions = !isColumnDragging || isHoverResize;
  const isEnabledResize =
    !isRowActionsColumn && !isColumnDragging && !isExpandedColumn;

  const draggableColumn =
    enableDraggableColumnConfig &&
    enableDragColumns &&
    !isExpandedColumn &&
    !rowSelectionColumn &&
    !isRowActionsColumn;

  const getBgColorClass = () => {
    if (isColumnDragging) return 'bg-table-dragged-bg-important';
    if (isHeaderFixed) return 'bg-table-header-pinned';
    if (isPinned) {
      if (isRowActionsColumn) return 'bg-transparent';
      if (isExpandedColumn) return 'bg-table-header-pinned';
      if (rowSelectionColumn) return 'bg-table-header-pinned';
      return 'bg-table-header-pinned';
    }
    return 'bg-table-header-bg';
  };

  const isDragColumn = isHover || isColumnDragging;

  const dragStyle: CSSProperties = {
    transform: CSS.Translate.toString(transform),
  };

  const renderActions = useMemo(() => {
    const show = isHoverResize || hoverColumn;

    return [
      // sort icon
      enableSortColumns &&
        header.column.getCanSort() &&
        (header.column.getIsSorted() ? (
          <ColumnSort header={header} isPinned key={`${keyId}-sort`} />
        ) : (
          show && <ColumnSort header={header} key={`${keyId}-sort`} />
        )),

      // visibility icon
      enableHideColumns && header.column.getCanHide() && show && (
        <ColumnVisibility header={header} key={`${keyId}-visibility`} />
      ),

      // TODO: Search icon
      header.column.getCanFilter() && show && (
        <ColumnSearcher
          column={header.column as Column<TData, TData>}
          key={`${keyId}-search`}
        />
      ),

      // pin icon
      header.column.getCanPin() &&
        (header.column.getIsPinned() ? (
          <ColumnPin
            enablePinLeftColumns={enablePinLeftColumns}
            enablePinRightColumns={enablePinRightColumns}
            header={header}
            key={`${keyId}-pin`}
          />
        ) : (
          show && (
            <ColumnPin
              enablePinLeftColumns={enablePinLeftColumns}
              enablePinRightColumns={enablePinRightColumns}
              header={header}
              key={`${keyId}-pin`}
            />
          )
        )),
    ].filter(Boolean);
  }, [
    isHoverResize,
    hoverColumn,
    enableSortColumns,
    header,
    enableHideColumns,
    enablePinLeftColumns,
    enablePinRightColumns,
    keyId,
  ]);

  const actionsLength = Children.count(renderActions);

  // review
  const width = useMemo(() => {
    const value = pinStyles?.width;

    if (Number.isNaN(value)) {
      return 0;
    }

    return value;
  }, [pinStyles?.width]);

  useEffect(() => {
    if (tableContainer) {
      if (isColumnDragging) tableContainer.style.overflow = 'hidden';
      else tableContainer.style.overflow = 'auto';
    }
  }, [isColumnDragging, tableContainer]);

  // effect for reset hover resize
  useEffect(() => {
    const handleDocumentMouseUp = () => {
      setIsHoverResize(false);
    };

    document.addEventListener('mouseup', handleDocumentMouseUp);
    return () => {
      document.removeEventListener('mouseup', handleDocumentMouseUp);
    };
  }, []);

  const contentText = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!IGNORE_REPORT_COLUMNS.includes(header.column.columnDef.id)) {
      const index = header.column.getIndex();

      const resolvedHeader =
        contentText?.current?.textContent?.trim() ||
        header.column.columnDef?.accessorHeaderFn?.() ||
        (typeof header.column.columnDef?.header === 'string'
          ? header.column.columnDef?.header
          : undefined) ||
        header.column.columnDef?.id ||
        '';

      actions?.onSetReportHeader(resolvedHeader, index);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    actions?.onSetReportHeader,
    header.column.columnDef?.header,
    tableState?.columnVisibility,
  ]);

  if (width === 0) return null;

  const enabledDraggableIcon =
    (hoverColumn || isDragColumn) &&
    draggableColumn &&
    !isPinned &&
    enableDraggableColumnConfig &&
    !isHoverResize;

  return (
    <div
      role="rowheader"
      data-testid="table-rowheader"
      key={`header-${keyId}`}
      id={header.column.id}
      ref={setNodeRef}
      style={{
        ...style,
        ...dragStyle,
        ...pinStyles,
        width: width,
        minWidth: pinStyles?.minWidth,
        zIndex: isColumnDragging
          ? 500
          : isRowActionsColumn
          ? 0
          : isDragColumn || isPinned
          ? 10
          : 0,
      }}
      className={cn([
        'min-w-0 relative overflow-hidden whitespace-nowrap text-ellipsis p-0 h-full transition-[background-color] duration-200 ease-in-out',
        getBgColorClass(),
        isColumnDragging && 'border border-dashed border-table-divider',
        isPinned && '[&_.table-resizer-wrapper]:-right-[5px]',
      ])}
      onDoubleClick={() => header.column.resetSize()}
      onMouseEnter={() => setHoverColumn(true)}
      onMouseLeave={() => setHoverColumn(false)}
      onBlur={() => setHoverColumn(false)}
    >
      {/* Wrapper of column header for launch drag events */}
      <div
        data-testid="table-rowheader-container"
        className={cn([
          isExpandedColumn || rowSelectionColumn
            ? 'flex items-center! justify-center w-full! h-full'
            : 'flex items-center justify-start bg-transparent w-full max-w-full p-0 h-full box-border',
          isColumnDragging && 'opacity-80',
        ])}
      >
        {/* padding left */}
        <div className="w-3 h-full" />

        {/* Header title */}
        <div
          data-testid="table-rowheader-content"
          ref={contentText}
          className={cn([
            'font-semibold overflow-hidden text-ellipsis whitespace-nowrap items-center text-table-secondary-text',
            isColumnDragging &&
              'transition-all duration-200 ease-in-out [&_svg]:transition-all [&_svg]:duration-200 [&_svg]:ease-in-out',
            isColumnDragging ? 'pl-[5px]' : 'pl-0',
          ])}
          style={{
            // 28px width button and 2px gap and 24px of padding
            width: `calc(100% - ${
              (isEnabledActions ? actionsLength * (28 + 10) : 0) + 24
            }px)`,
          }}
        >
          {/* Only show when columns is dragging */}
          {enabledDraggableIcon && (
            <span
              className={cn([
                (hoverColumn || isColumnDragging) &&
                  'absolute left-0 top-1/2 -translate-x-0.5 -translate-y-1/2',
                'cursor-pointer transition-all duration-200 ease-in-out [&_path]:transition-[fill] [&_path]:duration-200 [&_path]:ease-in-out animate-fade-in flex items-center',
                isColumnDragging ? 'pl-[5px]' : 'pl-0',
              ])}
              onMouseEnter={() => {
                setIsHover(true);
                if (draggableColumn && hoverColumn) {
                  setHoverDrag({ hover: true, index });
                }
              }}
              onMouseLeave={() => {
                setIsHover(false);
                if (draggableColumn && hoverColumn) {
                  setHoverDrag({ hover: false, index });
                }
              }}
              {...attributes}
              {...listeners}
            >
              <DragIndicator
                size={16}
                direction="vertical"
                color={
                  isDragColumn
                    ? 'var(--color-table-primary-text)'
                    : 'var(--color-table-disabled)'
                }
              />
            </span>
          )}

          {/* Render name of the column */}
          {!header.isPlaceholder &&
            flexRender(
              header.column.columnDef.header,
              header.getContext() as HeaderContext<TData, unknown>
            )}
        </div>

        {/* padding right */}
        <div className="w-3 h-full" />
      </div>

      {/* Render actions like sort, pinned... */}
      {isEnabledActions && (
        <div
          key={`headerRightContent-${keyId}`}
          className="absolute flex items-center justify-end bg-transparent w-fit p-0 pr-4 h-full right-2 top-0 m-0 gap-0.5"
        >
          {renderActions}
        </div>
      )}

      {/* Resize component wrapper */}
      {isEnabledResize && (
        <div
          onMouseEnter={() => setIsHoverResizer(true)}
          onMouseLeave={() => setIsHoverResizer(false)}
          onMouseUp={() => setIsHoverResize(false)}
          onMouseDown={(e) => {
            setIsHoverResize(true);
            return enableResizeColumns && !hoverDrag.hover
              ? header.getResizeHandler()(e)
              : undefined;
          }}
          onTouchStart={
            enableResizeColumns && !hoverDrag.hover
              ? header.getResizeHandler()
              : undefined
          }
          className={cn([
            'table-resizer-wrapper rounded-[5px] h-full w-3 right-0 top-0 absolute flex justify-center items-center select-none touch-none z-100',
            header.column.getCanResize() && 'cursor-col-resize',
          ])}
        >
          {/* Resize ui bar */}
          <div
            className={cn([
              'table-resizer-line rounded-[5px] transition-[background-color,height,width] duration-150 ease-in-out',
              isHoverResizer || isHoverResize
                ? 'w-[3px] h-5 bg-table-primary-text'
                : 'w-[2px] h-[14px] bg-table-divider',
            ])}
          />
        </div>
      )}
    </div>
  );
};

export default memo(TableHeader);
