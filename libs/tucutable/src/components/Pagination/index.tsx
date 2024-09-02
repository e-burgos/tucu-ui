import React, { useEffect } from 'react';
import { Table } from '@tanstack/react-table';
import { TData, IPaginationOptions } from '../../common/types';
import useTableColors from '../../hooks/useTableColors';
import ArrowIndicator from '../Assets/ArrowIndicator';
import ArrowPaginationIndicator from '../Assets/ArrowPaginationIndicator';
import AssetButton from '../Assets/AssetButton';
import styles from './pagination.module.css';
import Typography from '@mui/material/Typography';
import Select from '@mui/material/Select';
import { MenuItem } from '@mui/material';

interface PaginationProps {
  table: Table<TData>;
  pagination?: IPaginationOptions;
  style?: React.CSSProperties;
}
const Pagination: React.FC<PaginationProps> = ({
  table,
  pagination,
  style,
}) => {
  const { colors } = useTableColors();
  const paginationPageSize = pagination?.pageSize ?? 10;
  const paginationPageIndex = pagination?.pageIndex ?? 0;

  useEffect(() => {
    if (table.getState().pagination.pageSize !== paginationPageSize)
      table.setPageSize(paginationPageSize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationPageSize, table]);

  useEffect(() => {
    if (table.getState().pagination.pageIndex !== paginationPageIndex)
      table.setPageIndex(paginationPageIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginationPageIndex, table]);

  const initialRows =
    table.getRowModel().rows.length * table.getState().pagination.pageIndex + 1;
  const finalRows =
    table.getState().pagination.pageSize *
    (table.getState().pagination.pageIndex + 1);
  const preFinalRows =
    table.getState().pagination.pageSize *
      table.getState().pagination.pageIndex +
    1;

  return (
    <div className={styles.container} style={{ ...style }}>
      <div className={styles.leftContent}>
        {pagination?.rowsInfo && (
          <Typography variant="caption">
            {`Showing ${
              table.getCanNextPage() ? initialRows : preFinalRows
            } of ${table.getRowCount()} Rows`}
          </Typography>
        )}
      </div>
      <div className={styles.rightContent}>
        {!pagination?.hideRecordsSelector && (
          <div className={styles.records}>
            <Typography
              variant="caption"
              color={colors.secondaryText}
            >{`per page:`}</Typography>
            <Select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              sx={{
                fontSize: '12px',
                color: colors.secondaryText,
                '> svg': { color: colors.secondaryText },
              }}
              label={''}
            >
              <MenuItem value={table.getState().pagination.pageSize}>{`"${
                table.getState().pagination.pageSize
              }"`}</MenuItem>
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={15}>15</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={25}>25</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={40}>40</MenuItem>
              <MenuItem value={50}>50</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </div>
        )}

        <div className={styles.pageInfo}>
          <Typography variant="caption" color={colors.primaryText}>
            {`${table.getCanNextPage() ? initialRows : preFinalRows}-${
              table.getCanNextPage() ? finalRows : table.getRowCount()
            } 
            of ${table.getRowCount()} Rows`}
          </Typography>
        </div>
        <div className={styles.buttons}>
          <AssetButton
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowPaginationIndicator
              direction="first"
              size={20}
              color={!table.getCanPreviousPage() ? colors.disabled : undefined}
            />
          </AssetButton>
          <AssetButton
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ArrowIndicator
              direction="left"
              size={20}
              color={!table.getCanPreviousPage() ? colors.disabled : undefined}
            />
          </AssetButton>
          <AssetButton
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <ArrowIndicator
              direction="right"
              size={20}
              color={!table.getCanNextPage() ? colors.disabled : ''}
            />
          </AssetButton>
          <AssetButton
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <ArrowPaginationIndicator
              direction="last"
              size={20}
              color={!table.getCanNextPage() ? colors.disabled : undefined}
            />
          </AssetButton>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
