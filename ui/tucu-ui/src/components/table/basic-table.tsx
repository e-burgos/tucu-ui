import { ReactNode } from 'react';
import cn from 'classnames';

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
  const getRowClassName = (row: T, index: number): string => {
    const baseClasses = cn('transition-colors', {
      'hover:bg-gray-100 dark:hover:bg-gray-900/50 hover:shadow-sm': hoverable,
      'bg-gray-50 dark:bg-gray-900/50': striped && index % 2 === 0,
    });

    if (typeof rowClassName === 'function') {
      return cn(baseClasses, rowClassName(row, index));
    }

    return cn(baseClasses, rowClassName);
  };

  const getCellValue = (column: TableColumn<T>, row: T): unknown => {
    return row[column.key];
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
        className={cn(
          'overflow-x-auto basic-table-scroll',
          containerClassName,
          className
        )}
        style={{
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(0, 0, 0, 0.2) rgba(0, 0, 0, 0.05)',
        }}
      >
        {rounded ? (
          <div
            className={cn(
              'overflow-x-auto overflow-y-auto rounded-xl',
              border && 'border border-gray-300 dark:border-gray-700'
            )}
            style={{ maxHeight: `${maxHeight}px` }}
          >
            <table
              className={cn(
                'min-w-max w-full border-separate border-spacing-0',
                tableClassName
              )}
            >
              {showHeader && (
                <thead className="sticky top-0 z-10">
                  <tr
                    className={cn(
                      'bg-gray-200 dark:bg-gray-800 shadow-sm',
                      headerClassName
                    )}
                  >
                    {columns.map((column, colIndex) => {
                      const isLastCol = colIndex === columns.length - 1;
                      return (
                        <th
                          key={column.key}
                          className={cn(
                            'p-3 text-left text-sm font-semibold',
                            border &&
                              'border-b border-gray-300 dark:border-gray-700',
                            border &&
                              !isLastCol &&
                              'border-r border-r-gray-300 dark:border-r-gray-700',
                            rounded &&
                              showHeader &&
                              colIndex === 0 &&
                              'rounded-tl-xl',
                            rounded &&
                              showHeader &&
                              colIndex === columns.length - 1 &&
                              'rounded-tr-xl',
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
                            className={cn(
                              'p-3 text-xs text-gray-600 dark:text-gray-400',
                              border &&
                                'border-b border-gray-300 dark:border-gray-700',
                              border &&
                                !isLastCol &&
                                'border-r border-gray-300 dark:border-gray-700',
                              border && isLastRow && 'border-b-0',
                              rounded &&
                                isLastRow &&
                                isFirstCol &&
                                !showHeader &&
                                'rounded-bl-xl',
                              rounded &&
                                isLastRow &&
                                isLastCol &&
                                !showHeader &&
                                'rounded-br-xl',
                              rounded &&
                                isLastRow &&
                                isFirstCol &&
                                showHeader &&
                                'rounded-bl-xl',
                              rounded &&
                                isLastRow &&
                                isLastCol &&
                                showHeader &&
                                'rounded-br-xl',
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
            className={cn('overflow-x-auto overflow-y-auto')}
            style={{ maxHeight: `${maxHeight}px` }}
          >
            <table
              className={cn(
                'min-w-max w-full border-collapse',
                border && 'border border-gray-300 dark:border-gray-700',
                tableClassName
              )}
            >
              {showHeader && (
                <thead className="sticky top-0 z-10">
                  <tr
                    className={cn(
                      'bg-gray-200 dark:bg-gray-800 shadow-sm',
                      headerClassName
                    )}
                  >
                    {columns.map((column, colIndex) => (
                      <th
                        key={column.key}
                        className={cn(
                          'p-3 text-left text-sm font-semibold',
                          border &&
                            'border-r border-b border-gray-300 dark:border-gray-700',
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
                            className={cn(
                              'p-3 text-xs text-gray-600 dark:text-gray-400',
                              border &&
                                'border-r border-b border-gray-300 dark:border-gray-700',
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
