import React from 'react';
import { Table } from '@tanstack/react-table';
import { TData, IPaginationOptions } from '../../common/types';
import ArrowIndicator from '../Assets/ArrowIndicator';
import ArrowPaginationIndicator from '../Assets/ArrowPaginationIndicator';
import { IconButton } from '../Common/IconButton';

/**
 * PaginationProps
 * @category libs/datatable
 * @subcategory Components
 *
 * @param tableId - The tableId
 * @param table - The table
 * @param pagination - The pagination
 * @param style - The style
 */
interface PaginationProps {
  tableId: string;
  table: Table<TData>;
  pagination?: IPaginationOptions;
  style?: React.CSSProperties;
}

const Pagination: React.FC<PaginationProps> = ({
  table,
  pagination,
  style,
}) => {
  const paginationPageSize = pagination?.pageSize || 5;

  const initialRows =
    table.getRowModel().rows.length * table.getState().pagination.pageIndex + 1;
  const finalRows =
    table.getState().pagination.pageSize *
    (table.getState().pagination.pageIndex + 1);
  const preFinalRows =
    table.getState().pagination.pageSize *
      table.getState().pagination.pageIndex +
    1;

  const pageSizeOptions = [5, 10, 20, 30, 40, 50];
  const options = pageSizeOptions?.includes(paginationPageSize)
    ? pageSizeOptions
    : [paginationPageSize, ...pageSizeOptions]?.sort((a, b) => a - b);

  return (
    <div
      className="flex flex-row items-center justify-between w-full p-4 m-0 h-[50px] box-border z-0 max-md:flex-col-reverse max-md:items-center max-md:gap-0 max-md:h-fit"
      style={{
        borderTop: '1px solid var(--color-table-divider)',
        ...style,
      }}
    >
      <div className="flex items-center justify-start w-fit gap-[5px]">
        {pagination?.rowsInfo && (
          <p className="m-0 font-sans font-normal leading-5 text-xs tracking-[0.025rem] normal-case text-table-primary-text">
            {`Showing ${
              table.getCanNextPage() ? initialRows : preFinalRows
            } of ${table.getRowCount()} Rows`}
          </p>
        )}
      </div>
      <div className="flex items-center justify-end w-fit gap-4 max-md:w-full max-md:gap-2 max-md:flex-row max-md:justify-center max-md:flex-wrap">
        {!pagination?.hideRecordsSelector && (
          <div className="flex items-center gap-2">
            <p className="m-0 font-sans font-normal leading-5 text-xs tracking-[0.025rem] normal-case text-table-primary-text whitespace-nowrap">
              per page:
            </p>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="text-table-primary-text text-xs bg-transparent border-none outline-none cursor-pointer appearance-none pr-6 pl-2 py-1 rounded hover:bg-table-row-hover transition-colors duration-200"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23b3b3b3' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 0.25rem center',
                backgroundSize: '0.75rem',
              }}
            >
              {options.map((pageSize) => (
                <option
                  key={pageSize}
                  value={pageSize}
                  className="text-table-primary-text bg-table-row-expanded-bg"
                >
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
        )}

        <div className="flex items-center gap-2 max-md:mb-2.5">
          <p className="m-0 font-sans font-normal leading-5 text-xs tracking-[0.025rem] normal-case text-table-primary-text whitespace-nowrap">
            {`${table.getCanNextPage() ? initialRows : preFinalRows}-${
              table.getCanNextPage() ? finalRows : table.getRowCount()
            } of ${table.getRowCount()} Rows`}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <IconButton
            size="xl"
            isPinned
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
            icon={<ArrowPaginationIndicator direction="first" />}
          />
          <IconButton
            size="xl"
            isPinned
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            icon={<ArrowIndicator direction="left" />}
          />
          <IconButton
            size="xl"
            isPinned
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            icon={<ArrowIndicator direction="right" />}
          />
          <IconButton
            size="xl"
            isPinned
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
            icon={<ArrowPaginationIndicator direction="last" />}
          />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
