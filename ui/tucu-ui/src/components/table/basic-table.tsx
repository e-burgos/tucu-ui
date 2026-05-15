import { ReactNode, useState, useCallback, useRef } from 'react';
import cn from 'classnames';
import { useTheme } from '../../themes';
import { LAYOUT_OPTIONS } from '../../themes/config';

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  label: string;
  render?: (value: unknown, row: T, index: number) => ReactNode;
  className?: string;
  headerClassName?: string;
  width?: number;
  minWidth?: number;
}

export interface BasicTableProps<T = Record<string, unknown>> {
  columns: TableColumn<T>[];
  data: T[];
  rounded?: boolean;
  border?: boolean;
  className?: string;
  tableClassName?: string;
  headerClassName?: string;
  rowClassName?: string | ((row: T, index: number) => string);
  containerClassName?: string;
  showHeader?: boolean;
  hoverable?: boolean;
  striped?: boolean;
  maxRows?: number;
  resizable?: boolean;
}

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
        const col = columns.find((c) => c.key === resizingRef.current!.key);
        const min = col?.minWidth ?? 40;
        const diff = ev.clientX - resizingRef.current.startX;
        const newWidth = Math.max(min, resizingRef.current.startWidth + diff);
        setColumnWidths((prev) => ({
          ...prev,
          [resizingRef.current!.key]: newWidth,
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
      `,
        }}
      />
      <div
        data-tucu="table-scroll"
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
              border && 'ring-1 ring-gray-200 dark:ring-gray-700'
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
                              border &&
                                'border-b border-gray-200 dark:border-gray-700',
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
                        className={getRowClassName(row, rowIndex)}
                      >
                        {columns.map((column, colIndex) => {
                          const value = getCellValue(column, row);
                          const cellContent = column.render
                            ? column.render(value, row, rowIndex)
                            : String(value ?? '');

                          const isFirstCol = colIndex === 0;
                          const isLastCol = colIndex === columns.length - 1;

                          return (
                            <td
                              key={column.key}
                              data-tucu="table-cell"
                              className={cn(
                                'px-3 py-2 text-sm text-gray-700 dark:text-gray-300 overflow-hidden text-ellipsis whitespace-nowrap',
                                border &&
                                  'border-b border-gray-100 dark:border-gray-700/60',
                                border &&
                                  !isLastCol &&
                                  'border-r border-gray-100 dark:border-gray-700/60',
                                border && isLastRow && 'border-b-0',
                                column.className
                              )}
                            >
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
                border && 'border border-gray-200 dark:border-gray-700',
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
                            border &&
                              'border-r border-b border-gray-200 dark:border-gray-700',
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
                      className={getRowClassName(row, rowIndex)}
                    >
                      {columns.map((column, colIndex) => {
                        const value = getCellValue(column, row);
                        const cellContent = column.render
                          ? column.render(value, row, rowIndex)
                          : String(value ?? '');

                        const isLastCol = colIndex === columns.length - 1;

                        return (
                          <td
                            key={column.key}
                            data-tucu="table-cell"
                            className={cn(
                              'px-3 py-2 text-sm text-gray-700 dark:text-gray-300 overflow-hidden text-ellipsis whitespace-nowrap',
                              border &&
                                'border-r border-b border-gray-100 dark:border-gray-700/60',
                              border && isLastCol && 'border-r-0',
                              border && isLastRow && 'border-b-0',
                              column.className
                            )}
                          >
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
