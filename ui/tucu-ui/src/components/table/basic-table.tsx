import { ReactNode, useState, useCallback, useRef } from 'react';
import cn from 'classnames';
import { useTheme } from '../../themes';
import { LAYOUT_OPTIONS } from '../../themes/config';

/**
 * Describes a single column of a {@link BasicTable}.
 *
 * Note this is **not** the `@tanstack/react-table` column shape — `BasicTable`
 * is a standalone, dependency-free table. Use `DataTable` when you need
 * sorting, filtering, pagination or column pinning.
 *
 * @template T - Shape of a single row of data.
 */
export interface TableColumn<T = Record<string, unknown>> {
  /** Key of the row property this column reads its value from. */
  key: string;
  /** Text rendered in the column's header cell. */
  label: string;
  /**
   * Custom renderer for the cell body. Receives the raw value, the whole row
   * and the row index. When omitted, the value is coerced with `String()`.
   */
  render?: (value: unknown, row: T, index: number) => ReactNode;
  /** Extra class names applied to every body cell of this column. */
  className?: string;
  /** Extra class names applied to this column's header cell. */
  headerClassName?: string;
  /** Initial column width in pixels. Used as the starting size when resizing. */
  width?: number;
  /** Smallest width in pixels the column can be dragged down to. Defaults to 40px. */
  minWidth?: number;
}

/**
 * Props of the {@link BasicTable} component.
 *
 * @template T - Shape of a single row of data.
 */
export interface BasicTableProps<T = Record<string, unknown>> {
  /** Column definitions, rendered left to right in array order. */
  columns: TableColumn<T>[];
  /** Rows to render. Each entry is looked up by each column's `key`. */
  data: T[];
  /** Round the outer corners of the table. */
  rounded?: boolean;
  /** Draw the outer border and the cell dividers. */
  border?: boolean;
  /** Extra class names for the scrollable outer wrapper. */
  className?: string;
  /** Extra class names for the `<table>` element itself. */
  tableClassName?: string;
  /** Extra class names for the header row. */
  headerClassName?: string;
  /**
   * Class names for body rows. Pass a function to vary them per row — it
   * receives the row and its index.
   */
  rowClassName?: string | ((row: T, index: number) => string);
  /** Extra class names for the scroll container. Applied before `className`. */
  containerClassName?: string;
  /** Render the header row. */
  showHeader?: boolean;
  /** Highlight rows on hover. */
  hoverable?: boolean;
  /** Shade alternating rows. */
  striped?: boolean;
  /**
   * Number of rows visible before the body starts scrolling. Drives the
   * container's max height at roughly 40px per row.
   */
  maxRows?: number;
  /** Let columns be resized by dragging their header edge. */
  resizable?: boolean;
  /**
   * Render each row as a stacked card on small screens instead of forcing a
   * horizontally scrolling table. On by default — set `false` to always
   * render the table at every width.
   *
   * The switch is pure CSS: the same table markup is restyled by a media
   * query, so there is no resize listener, no server/client mismatch, and each
   * cell's content stays in the DOM exactly once. Note `maxRows` only caps the
   * table layout — the card list grows with the page.
   */
  mobileCards?: boolean;
  /** Width at which cards give way to the table. */
  cardBreakpoint?: 'sm' | 'md' | 'lg';
  /** Extra class names applied to each row, which is the card on small screens. */
  cardClassName?: string;
}

/** Tailwind's default breakpoints, in px — the card layout ends just below these. */
const BREAKPOINT_PX: Record<
  NonNullable<BasicTableProps['cardBreakpoint']>,
  number
> = { sm: 640, md: 768, lg: 1024 };

/**
 * CSS that restyles the single `<table>` into stacked cards below `breakpoint`.
 *
 * Restyling one tree — rather than rendering a table and a card list and
 * hiding one — keeps every cell's text in the DOM exactly once. Duplicating it
 * would double the node count, invoke each column's `render` twice, and make
 * `getByText` ambiguous in consumers' tests.
 */
const cardLayoutCss = (
  breakpoint: NonNullable<BasicTableProps['cardBreakpoint']>
) => `
  @media (max-width: ${BREAKPOINT_PX[breakpoint] - 0.02}px) {
    [data-tucu='table-scroll'][data-cards='${breakpoint}'] {
      overflow-x: visible;
    }
    [data-tucu='table-scroll'][data-cards='${breakpoint}'] [data-tucu='table'],
    [data-tucu='table-scroll'][data-cards='${breakpoint}'] [data-tucu='table'] > div {
      max-height: none !important;
      overflow: visible !important;
      border: 0 !important;
      border-radius: 0 !important;
    }
    [data-tucu='table-scroll'][data-cards='${breakpoint}'] table,
    [data-tucu='table-scroll'][data-cards='${breakpoint}'] tbody,
    [data-tucu='table-scroll'][data-cards='${breakpoint}'] tr {
      display: block;
      width: 100% !important;
      min-width: 0 !important;
      table-layout: auto !important;
    }
    [data-tucu='table-scroll'][data-cards='${breakpoint}'] colgroup,
    [data-tucu='table-scroll'][data-cards='${breakpoint}'] thead,
    [data-tucu='table-scroll'][data-cards='${breakpoint}'] .basic-table-resize-handle {
      display: none !important;
    }
    [data-tucu='table-scroll'][data-cards='${breakpoint}'] tr {
      margin-bottom: 0.75rem;
      border: 1px solid var(--color-border);
      border-radius: 0.5rem;
      overflow: hidden;
    }
    [data-tucu='table-scroll'][data-cards='${breakpoint}'] tr:last-child {
      margin-bottom: 0;
    }
    [data-tucu='table-scroll'][data-cards='${breakpoint}'] td {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 0.75rem;
      width: auto !important;
      max-width: none !important;
      white-space: normal !important;
      overflow: visible !important;
      text-overflow: clip !important;
      text-align: right;
      border-right: 0 !important;
      border-left: 0 !important;
    }
    [data-tucu='table-scroll'][data-cards='${breakpoint}'] td:last-child {
      border-bottom: 0 !important;
    }
    [data-tucu='table-scroll'][data-cards='${breakpoint}'] .basic-table-cell-label {
      display: inline;
    }
  }
`;

/**
 * A lightweight, dependency-free table with custom cell rendering, optional
 * striping, hover highlighting, a sticky header and drag-to-resize columns.
 *
 * On small screens each row collapses into a stacked card instead of forcing a
 * horizontally scrolling table. That is on by default — pass
 * `mobileCards={false}` to keep the table at every width, or `cardBreakpoint`
 * to move the switch.
 *
 * Columns are declared as `{ key, label, render? }`. For sorting, filtering,
 * pagination, row selection or column pinning, use `DataTable` instead.
 *
 * @example
 * ```tsx
 * const columns = [
 *   { key: 'name', label: 'Name' },
 *   { key: 'age', label: 'Age' },
 * ];
 * const data = [{ name: 'John Doe', age: 30 }];
 *
 * // Cards below md, table from md up
 * <BasicTable columns={columns} data={data} striped />
 *
 * // Always a table
 * <BasicTable columns={columns} data={data} mobileCards={false} />
 * ```
 *
 * @template T - Shape of a single row of data.
 */
export const BasicTable = <
  T extends Record<string, unknown> = Record<string, unknown>
>({
  columns,
  data,
  rounded = true,
  border = true,
  className,
  tableClassName,
  headerClassName,
  rowClassName,
  containerClassName,
  showHeader = true,
  hoverable = true,
  striped = false,
  maxRows = 10,
  resizable = true,
  mobileCards = true,
  cardBreakpoint = 'md',
  cardClassName,
}: BasicTableProps<T>) => {
  const { layout } = useTheme();
  const isTahoe =
    layout === LAYOUT_OPTIONS.MACOS_TAHOE ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE_DOCK;

  // ── Column resize state ──────────────────────────────────────
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(() =>
    columns.reduce((acc, col) => {
      acc[col.key] = col.width ?? 0;
      return acc;
    }, {} as Record<string, number>)
  );
  const resizingRef = useRef<{
    key: string;
    startX: number;
    startWidth: number;
  } | null>(null);
  const headerRefs = useRef<Record<string, HTMLTableCellElement | null>>({});

  const handleResizeStart = useCallback(
    (e: React.MouseEvent, colKey: string) => {
      e.preventDefault();
      e.stopPropagation();
      const th = headerRefs.current[colKey];
      const startWidth =
        columnWidths[colKey] || th?.getBoundingClientRect().width || 100;
      resizingRef.current = {
        key: colKey,
        startX: e.clientX,
        startWidth,
      };

      const handleMouseMove = (ev: MouseEvent) => {
        if (!resizingRef.current) return;
        const { key, startX, startWidth } = resizingRef.current;
        const col = columns.find((c) => c.key === key);
        const min = col?.minWidth ?? 40;
        const diff = ev.clientX - startX;
        const newWidth = Math.max(min, startWidth + diff);
        setColumnWidths((prev) => ({
          ...prev,
          [key]: newWidth,
        }));
      };

      const handleMouseUp = () => {
        resizingRef.current = null;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.body.style.cursor = '';
        document.body.style.userSelect = '';
      };

      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    },
    [columnWidths, columns]
  );

  const getRowClassName = (row: T, index: number): string => {
    const baseClasses = cn('transition-colors', {
      'hover:bg-gray-50/40 dark:hover:bg-gray-800/30': hoverable,
      'bg-gray-50/30 dark:bg-gray-800/20': striped && index % 2 === 0,
    });

    if (typeof rowClassName === 'function') {
      return cn(baseClasses, rowClassName(row, index));
    }

    return cn(baseClasses, rowClassName);
  };

  const getCellValue = (column: TableColumn<T>, row: T): unknown => {
    return row[column.key];
  };

  const isRowSelected = (row: T): boolean => {
    return row['selected'] === true || row['isSelected'] === true;
  };

  // Shared by both layouts so a column's `render` behaves identically in a
  // table cell and in a card field.
  const getCellContent = (
    column: TableColumn<T>,
    row: T,
    rowIndex: number
  ): ReactNode => {
    const value = getCellValue(column, row);
    return column.render
      ? column.render(value, row, rowIndex)
      : String(value ?? '');
  };

  // Calculate max height: approximately 40px per row (p-3 = 12px top + 12px bottom = 24px + content ~16px)
  const maxHeight = maxRows * 40; // 40px per row

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .basic-table-scroll::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }
        .basic-table-scroll::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.05);
          border-radius: 4px;
        }
        .basic-table-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
        }
        .basic-table-scroll::-webkit-scrollbar-thumb:hover {
          background-color: rgba(0, 0, 0, 0.3);
        }
        .dark .basic-table-scroll::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .dark .basic-table-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
        }
        .dark .basic-table-scroll::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
        .basic-table-resize-handle {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 6px;
          cursor: col-resize;
          user-select: none;
          z-index: 2;
        }
        .basic-table-resize-handle::after {
          content: '';
          position: absolute;
          right: 2px;
          top: 25%;
          bottom: 25%;
          width: 2px;
          border-radius: 1px;
          background: transparent;
          transition: background-color 150ms ease;
        }
        .basic-table-resize-handle:hover::after {
          background: rgba(0, 0, 0, 0.2);
        }
        .dark .basic-table-resize-handle:hover::after {
          background: rgba(255, 255, 255, 0.25);
        }
        /* Per-cell labels only exist for the card layout. */
        .basic-table-cell-label {
          display: none;
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          opacity: 0.7;
          text-align: left;
          flex-shrink: 0;
        }
        ${mobileCards ? cardLayoutCss(cardBreakpoint) : ''}
      `,
        }}
      />
      <div
        data-tucu="table-scroll"
        data-cards={mobileCards ? cardBreakpoint : undefined}
        className={cn(
          'overflow-x-auto basic-table-scroll min-w-0',
          containerClassName,
          className
        )}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor:
            'var(--basic-table-scrollbar-thumb, rgba(0, 0, 0, 0.2)) var(--basic-table-scrollbar-track, rgba(0, 0, 0, 0.05))',
        }}
      >
        {rounded ? (
          <div
            data-tucu="table"
            data-rounded={rounded ? 'true' : 'false'}
            data-border={border ? 'true' : 'false'}
            data-striped={striped ? 'true' : 'false'}
            data-hoverable={hoverable ? 'true' : 'false'}
            data-show-header={showHeader ? 'true' : 'false'}
            className={cn(
              'overflow-hidden relative z-0 isolate',
              isTahoe ? 'rounded-2xl' : 'rounded-lg',
              border && 'border border-border'
            )}
          >
            <div
              className="overflow-x-auto overflow-y-auto"
              style={{ maxHeight: `${maxHeight}px` }}
            >
              <table
                data-tucu="table-element"
                className={cn(
                  'w-full border-separate border-spacing-0',
                  !resizable && 'min-w-max',
                  tableClassName
                )}
                style={{ tableLayout: resizable ? 'fixed' : undefined }}
              >
                {resizable && (
                  <colgroup>
                    {columns.map((col) => (
                      <col
                        key={col.key}
                        style={
                          columnWidths[col.key]
                            ? { width: columnWidths[col.key] }
                            : undefined
                        }
                      />
                    ))}
                  </colgroup>
                )}
                {showHeader && (
                  <thead
                    data-tucu="table-header"
                    className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800"
                  >
                    <tr className={cn(headerClassName)}>
                      {columns.map((column, colIndex) => {
                        const isLastCol = colIndex === columns.length - 1;
                        return (
                          <th
                            key={column.key}
                            ref={(el) => {
                              headerRefs.current[column.key] = el;
                            }}
                            data-tucu="table-header-cell"
                            className={cn(
                              'px-3 py-2 text-left text-[11px] font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider relative',
                              border && 'border-b border-border',
                              border &&
                                !isLastCol &&
                                'border-r border-r-gray-200 dark:border-r-gray-700',
                              column.headerClassName
                            )}
                            style={
                              columnWidths[column.key]
                                ? { width: columnWidths[column.key] }
                                : undefined
                            }
                          >
                            <span className="overflow-hidden text-ellipsis whitespace-nowrap block">
                              {column.label}
                            </span>
                            {resizable && !isLastCol && (
                              <div
                                className="basic-table-resize-handle"
                                onMouseDown={(e) =>
                                  handleResizeStart(e, column.key)
                                }
                              />
                            )}
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                )}
                <tbody>
                  {data.map((row, rowIndex) => {
                    const isLastRow = rowIndex === data.length - 1;
                    return (
                      <tr
                        key={rowIndex}
                        data-tucu="table-row"
                        data-selected={isRowSelected(row) ? 'true' : undefined}
                        className={cn(
                          getRowClassName(row, rowIndex),
                          cardClassName
                        )}
                      >
                        {columns.map((column, colIndex) => {
                          const cellContent = getCellContent(
                            column,
                            row,
                            rowIndex
                          );

                          const isLastCol = colIndex === columns.length - 1;

                          return (
                            <td
                              key={column.key}
                              data-tucu="table-cell"
                              className={cn(
                                'px-3 py-2 text-sm text-gray-700 dark:text-gray-300 overflow-hidden text-ellipsis whitespace-nowrap',
                                border &&
                                  'border-b border-border dark:border-border/60',
                                border &&
                                  !isLastCol &&
                                  'border-r border-border dark:border-border/60',
                                border && isLastRow && 'border-b-0',
                                column.className
                              )}
                            >
                              {mobileCards && (
                                <span className="basic-table-cell-label">
                                  {column.label}
                                </span>
                              )}
                              {cellContent}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div
            data-tucu="table"
            data-rounded={rounded ? 'true' : 'false'}
            data-border={border ? 'true' : 'false'}
            data-striped={striped ? 'true' : 'false'}
            data-hoverable={hoverable ? 'true' : 'false'}
            data-show-header={showHeader ? 'true' : 'false'}
            className={cn('overflow-x-auto overflow-y-auto')}
            style={{ maxHeight: `${maxHeight}px` }}
          >
            <table
              data-tucu="table-element"
              className={cn(
                'w-full border-collapse',
                !resizable && 'min-w-max',
                border && 'border border-border',
                tableClassName
              )}
              style={{ tableLayout: resizable ? 'fixed' : undefined }}
            >
              {resizable && (
                <colgroup>
                  {columns.map((col) => (
                    <col
                      key={col.key}
                      style={
                        columnWidths[col.key]
                          ? { width: columnWidths[col.key] }
                          : undefined
                      }
                    />
                  ))}
                </colgroup>
              )}
              {showHeader && (
                <thead
                  data-tucu="table-header"
                  className="sticky top-0 z-10 bg-gray-100 dark:bg-gray-800"
                >
                  <tr className={cn(headerClassName)}>
                    {columns.map((column, colIndex) => {
                      const isLastCol = colIndex === columns.length - 1;
                      return (
                        <th
                          key={column.key}
                          ref={(el) => {
                            headerRefs.current[column.key] = el;
                          }}
                          data-tucu="table-header-cell"
                          className={cn(
                            'px-3 py-2 text-left text-[11px] font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider relative',
                            border && 'border-r border-b border-border',
                            border && isLastCol && 'border-r-0',
                            column.headerClassName
                          )}
                          style={
                            columnWidths[column.key]
                              ? { width: columnWidths[column.key] }
                              : undefined
                          }
                        >
                          <span className="overflow-hidden text-ellipsis whitespace-nowrap block">
                            {column.label}
                          </span>
                          {resizable && !isLastCol && (
                            <div
                              className="basic-table-resize-handle"
                              onMouseDown={(e) =>
                                handleResizeStart(e, column.key)
                              }
                            />
                          )}
                        </th>
                      );
                    })}
                  </tr>
                </thead>
              )}
              <tbody>
                {data.map((row, rowIndex) => {
                  const isLastRow = rowIndex === data.length - 1;
                  return (
                    <tr
                      key={rowIndex}
                      data-tucu="table-row"
                      data-selected={isRowSelected(row) ? 'true' : undefined}
                      className={cn(
                        getRowClassName(row, rowIndex),
                        cardClassName
                      )}
                    >
                      {columns.map((column, colIndex) => {
                        const cellContent = getCellContent(
                          column,
                          row,
                          rowIndex
                        );

                        const isLastCol = colIndex === columns.length - 1;

                        return (
                          <td
                            key={column.key}
                            data-tucu="table-cell"
                            className={cn(
                              'px-3 py-2 text-sm text-gray-700 dark:text-gray-300 overflow-hidden text-ellipsis whitespace-nowrap',
                              border &&
                                'border-r border-b border-border dark:border-border/60',
                              border && isLastCol && 'border-r-0',
                              border && isLastRow && 'border-b-0',
                              column.className
                            )}
                          >
                            {mobileCards && (
                              <span className="basic-table-cell-label">
                                {column.label}
                              </span>
                            )}
                            {cellContent}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default BasicTable;
