import type { Table } from '@tanstack/react-table';
import type {
  IManualPaginationOptions,
  IPaginationOptions,
  TData,
} from '../../../common/types';

export interface CompactPaginationModel {
  pageIndex: number;
  pageSize: number;
  total: number;
  pageCount: number;
  canPrevious: boolean;
  canNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
}

export function resolveManualPaginationOptions(
  pagination: IPaginationOptions
): IManualPaginationOptions | undefined {
  if (pagination.manualPagination) return pagination.manualPagination;
  const server = pagination.serverPagination;
  if (!server) return undefined;
  return {
    enabled: true,
    rowCount: server.totalCount,
    pagination: server.pagination,
    setPagination: server.setPagination,
  };
}

export function clientPaginationModel(
  table: Table<TData>
): CompactPaginationModel {
  const { pageIndex, pageSize } = table.getState().pagination;
  return {
    pageIndex,
    pageSize,
    total: table.getRowCount(),
    pageCount: Math.max(1, table.getPageCount()),
    canPrevious: table.getCanPreviousPage(),
    canNext: table.getCanNextPage(),
    onPrevious: () => table.previousPage(),
    onNext: () => table.nextPage(),
  };
}

export function manualPaginationModel(
  manual: IManualPaginationOptions | undefined
): CompactPaginationModel {
  const pageIndex = manual?.pagination?.pageIndex || 0;
  const pageSize = manual?.pagination?.pageSize || 5;
  const total = manual?.rowCount || 0;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  const goToPage = (nextIndex: number) =>
    manual?.setPagination?.({ pageIndex: nextIndex, pageSize });
  return {
    pageIndex,
    pageSize,
    total,
    pageCount,
    canPrevious: pageIndex > 0,
    canNext: total > 0 && pageIndex < pageCount - 1,
    onPrevious: () => goToPage(pageIndex - 1),
    onNext: () => goToPage(pageIndex + 1),
  };
}
