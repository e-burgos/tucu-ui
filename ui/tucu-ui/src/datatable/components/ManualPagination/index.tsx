import React from 'react';
import { IManualPaginationOptions } from '../../common/types';
import ArrowIndicator from '../Assets/ArrowIndicator';
import ArrowPaginationIndicator from '../Assets/ArrowPaginationIndicator';
import { IconButton } from '../Common/IconButton';

/**
 * ManualPaginationProps
 * @category libs/datatable
 * @subcategory Components
 *
 * @param manualPagination - The manualPagination
 * @param hideRecordsSelector - The hideRecordsSelector
 * @param rowsInfo - The rowsInfo
 * @param style - The style
 */
interface ManualPaginationProps {
  manualPagination?: IManualPaginationOptions;
  hideRecordsSelector?: boolean;
  rowsInfo?: boolean;
  style?: React.CSSProperties;
}

const ManualPagination: React.FC<ManualPaginationProps> = ({
  manualPagination,
  rowsInfo = false,
  hideRecordsSelector,
  style,
}) => {
  // Pagination state
  const pagination = manualPagination?.pagination;
  const setPagination = manualPagination?.setPagination;
  const pageIndex = pagination?.pageIndex || 0;
  const pageSize = pagination?.pageSize || 5;
  const paginationRowCount = manualPagination?.rowCount || 0;
  const paginationPageCount = Math.ceil(paginationRowCount / pageSize) - 1;

  // Pagination controls
  const previousPageDisabled = pageIndex === 0;
  const nextPageDisabled =
    pageIndex === paginationPageCount || !paginationRowCount;
  const initialRows = pageSize * pageIndex + 1;
  const finalRows = pageSize * (pageIndex + 1);
  const preFinalRows = pageSize * pageIndex + 1;

  const pageSizeOptions = [5, 10, 20, 30, 40, 50];
  const options = pageSizeOptions?.includes(pageSize)
    ? pageSizeOptions
    : [pageSize, ...pageSizeOptions]?.sort((a, b) => a - b);

  return (
    <div
      className="flex flex-row items-center justify-between w-full p-4 m-0 h-[50px] box-border z-0 max-md:flex-col-reverse max-md:items-center max-md:gap-0 max-md:h-fit"
      style={style}
    >
      <div className="flex items-center justify-start w-fit gap-[5px]">
        {rowsInfo && (
          <p className="m-0 font-sans font-normal leading-5 text-xs tracking-[0.025rem] normal-case text-table-primary-text">
            {`Showing ${
              !nextPageDisabled ? initialRows : preFinalRows
            } of ${paginationRowCount} Rows`}
          </p>
        )}
      </div>
      <div className="flex items-center justify-end w-fit gap-4 max-md:w-full max-md:gap-2 max-md:flex-row max-md:justify-center max-md:flex-wrap">
        {!hideRecordsSelector && (
          <div className="flex items-center gap-2">
            <p className="m-0 font-sans font-normal leading-5 text-xs tracking-[0.025rem] normal-case text-table-primary-text whitespace-nowrap">
              per page:
            </p>
            <select
              value={pageSize}
              onChange={(e) => {
                setPagination?.({
                  pageIndex: 0,
                  pageSize: Number(e.target.value),
                });
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
            {`${!nextPageDisabled ? initialRows : preFinalRows}-${
              !nextPageDisabled ? finalRows : paginationRowCount
            } of ${paginationRowCount} Rows`}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <IconButton
            size="xl"
            isPinned
            onClick={() => {
              setPagination?.({
                pageIndex: 0,
                pageSize: pagination?.pageSize || 0,
              });
            }}
            disabled={previousPageDisabled}
            icon={<ArrowPaginationIndicator direction="first" />}
          />
          <IconButton
            size="xl"
            isPinned
            onClick={() => {
              setPagination?.({
                pageIndex: pageIndex - 1,
                pageSize: pageSize,
              });
            }}
            disabled={previousPageDisabled}
            icon={<ArrowIndicator direction="left" />}
          />
          <IconButton
            size="xl"
            isPinned
            onClick={() => {
              setPagination?.({
                pageIndex: pageIndex + 1,
                pageSize: pageSize,
              });
            }}
            disabled={nextPageDisabled}
            icon={<ArrowIndicator direction="right" />}
          />
          <IconButton
            size="xl"
            isPinned
            onClick={() => {
              setPagination?.({
                pageIndex: paginationPageCount,
                pageSize: pageSize,
              });
            }}
            disabled={nextPageDisabled}
            icon={<ArrowPaginationIndicator direction="last" />}
          />
        </div>
      </div>
    </div>
  );
};

export default ManualPagination;
