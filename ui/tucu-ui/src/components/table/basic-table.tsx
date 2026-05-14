import { ReactNode } from 'react';
import cn from 'classnames';
import { useTheme } from '../../themes';
import { LAYOUT_OPTIONS } from '../../themes/config';

export interface TableColumn<T = Record<string, unknown>> {
  key: string;
  label: string;
  render?: (value: unknown, row: T, index: number) => ReactNode;
  className?: string;
  headerClassName?: string;
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
}: BasicTableProps<T>) => {
  const { layout } = useTheme();
  const isTahoe = layout === LAYOUT_OPTIONS.MACOS_TAHOE;

  const getRowClassName = (row: T, index: number): string => {
    const baseClasses = cn('transition-colors', {
      'hover:bg-gray-5 dark:hover:bg-gray-900/50 hover:shadow-sm': hoverable,
      'bg-gray-50/50 dark:bg-gray-800/20': striped && index % 2 === 0,
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
      `,
        }}
      />
      <div
        data-tucu="table-scroll"
        className={cn(
          'overflow-x-auto basic-table-scroll min-w-0',
          rounded &&
            (isTahoe ? 'min-w-full rounded-3xl' : 'min-w-full rounded-xl'),
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
              'overflow-x-auto overflow-y-auto overflow-hidden relative z-0 isolate',
              isTahoe ? 'rounded-2xl' : 'rounded-lg',
              border && 'border border-gray-200/50 dark:border-gray-700/50'
            )}
            style={{ maxHeight: `${maxHeight}px` }}
          >
            <table
              data-tucu="table-element"
              className={cn(
                'min-w-max w-full border-separate border-spacing-0 rounded-lg overflow-hidden',
                tableClassName
              )}
            >
              {showHeader && (
                <thead data-tucu="table-header" className="sticky top-0 z-10">
                  <tr className={cn('bg-transparent', headerClassName)}>
                    {columns.map((column, colIndex) => {
                      const isLastCol = colIndex === columns.length - 1;
                      return (
                        <th
                          key={column.key}
                          data-tucu="table-header-cell"
                          className={cn(
                            'px-3 py-1 text-left text-[11px] font-medium text-gray-500 dark:text-gray-400 capitalize tracking-wider',
                            border &&
                              'border-b border-gray-200/50 dark:border-gray-700/50',
                            border &&
                              !isLastCol &&
                              'border-r border-r-gray-200/50 dark:border-r-gray-700/50',
                            rounded && showHeader && colIndex === 0 && '',
                            rounded &&
                              showHeader &&
                              colIndex === columns.length - 1 &&
                              '',
                            column.headerClassName
                          )}
                        >
                          {column.label}
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
                              'px-3 py-1.5 text-xs text-gray-700 dark:text-gray-300',
                              border &&
                                'border-b border-gray-200/50 dark:border-gray-700/50',
                              border &&
                                !isLastCol &&
                                'border-r border-gray-200/50 dark:border-gray-700/50',
                              border && isLastRow && 'border-b-0',
                              rounded &&
                                isLastRow &&
                                isFirstCol &&
                                !showHeader &&
                                '',
                              rounded &&
                                isLastRow &&
                                isLastCol &&
                                !showHeader &&
                                '',
                              rounded &&
                                isLastRow &&
                                isFirstCol &&
                                showHeader &&
                                '',
                              rounded &&
                                isLastRow &&
                                isLastCol &&
                                showHeader &&
                                '',
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
                'min-w-max w-full border-collapse',
                border && 'border border-gray-200/50 dark:border-gray-700/50',
                tableClassName
              )}
            >
              {showHeader && (
                <thead data-tucu="table-header" className="sticky top-0 z-10">
                  <tr className={cn('bg-transparent', headerClassName)}>
                    {columns.map((column, colIndex) => (
                      <th
                        key={column.key}
                        data-tucu="table-header-cell"
                        className={cn(
                          'px-3 py-1 text-left text-[11px] font-medium text-gray-500 dark:text-gray-400 capitalize tracking-wider',
                          border &&
                            'border-r border-b border-gray-200/50 dark:border-gray-700/50',
                          border &&
                            colIndex === columns.length - 1 &&
                            'border-r-0',
                          column.headerClassName
                        )}
                      >
                        {column.label}
                      </th>
                    ))}
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
                              'px-3 py-1.5 text-xs text-gray-700 dark:text-gray-300',
                              border &&
                                'border-r border-b border-gray-200/50 dark:border-gray-700/50',
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
