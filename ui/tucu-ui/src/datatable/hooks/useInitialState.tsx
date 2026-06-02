import React from 'react';
import {
  ColumnDef,
  ColumnOrderState,
  ColumnPinningState,
  PaginationState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import { ExpandedColumn } from '../common/helpers/ExpandedColumn';
import { OffsetColumn } from '../common/helpers/OffsetColumn';
import { RowActionsColumn } from '../common/helpers/RowActionsColumn';
import { RowSelectionColumn } from '../common/helpers/RowSelectionColumn';
import { ManualPaginationState, TData } from '../common/types';
import useDataTableStore from './useDataTableStore';

/**
 * useInitialState
 * @category libs/datatable
 * @subcategory Hooks
 *
 * @param {string} tableId - The id of the table.
 * @param {Array<ColumnDef<TData, TData>>} defaultColumns - The default columns of the table.
 *
 * @template TData - The type of the data in the table.
 */

export const useInitialState = (
  tableId: string,
  defaultColumns: ColumnDef<TData, TData>[]
) => {
  const {
    pagination: paginationStore,
    sorting: sortingStore,
    columnOrder: columnOrderStore,
    columnVisibility: columnVisibilityStore,
    columnPinning: columnPinningStore,
    manualPagination: manualPaginationStore,
  } = useDataTableStore(tableId);

  const columns = React.useMemo<typeof defaultColumns>(
    () => [
      ExpandedColumn,
      RowSelectionColumn,
      ...defaultColumns,
      RowActionsColumn,
      OffsetColumn,
    ],
    [defaultColumns]
  );

  const initialPagination = React.useMemo<PaginationState>(() => {
    return {
      pageIndex: paginationStore?.pageIndex || 0,
      pageSize: paginationStore?.pageSize || 10,
    };
  }, [paginationStore]);

  const defaultPagination = React.useMemo<PaginationState>(() => {
    return {
      pageIndex: 0,
      pageSize: 10,
    };
  }, []);

  const initialSorting = React.useMemo<SortingState>(() => {
    if (sortingStore?.length === 0) return [];
    return sortingStore;
  }, [sortingStore]);

  const defaultSorting = React.useMemo<SortingState>(() => {
    return [];
  }, []);

  const initialColumnOrder = React.useMemo<ColumnOrderState>(() => {
    if (columnOrderStore?.length !== 0) return columnOrderStore;
    const initialState = columns.map((c) => c?.id ?? '');
    return initialState;
  }, [columnOrderStore, columns]);

  const defaultColumnOrder = React.useMemo<ColumnOrderState>(() => {
    return columns.map((c) => c?.id ?? '');
  }, [columns]);

  const initialColumnVisibility = React.useMemo<VisibilityState>(() => {
    if (columnVisibilityStore !== undefined) return columnVisibilityStore;
    return columns.reduce<VisibilityState>((acc, c) => {
      acc[c?.id ?? ''] = c?.enableVisible ?? true;
      return acc;
    }, {});
  }, [columnVisibilityStore, columns]);

  const initialColumnPinning = React.useMemo<ColumnPinningState>(() => {
    if (columnPinningStore !== undefined) return columnPinningStore;
    const initialState: ColumnPinningState = {
      left: [] as string[],
      right: [] as string[],
    };
    return initialState;
  }, [columnPinningStore]);

  const defaultColumnPinning = React.useMemo<ColumnPinningState>(() => {
    return {
      left: [] as string[],
      right: [] as string[],
    };
  }, []);

  const initialManualPagination = React.useMemo<ManualPaginationState>(() => {
    return {
      enabled: manualPaginationStore?.enabled ?? false,
      rowCount: manualPaginationStore?.rowCount ?? undefined,
    };
  }, [manualPaginationStore]);

  const defaultManualPagination = React.useMemo<ManualPaginationState>(() => {
    return {
      enabled: false,
      rowCount: 0,
    };
  }, []);

  return {
    columns,
    initialPagination,
    initialSorting,
    initialColumnOrder,
    initialColumnVisibility,
    initialColumnPinning,
    initialManualPagination,
    defaultPagination,
    defaultSorting,
    defaultColumnOrder,
    defaultColumnPinning,
    defaultManualPagination,
  };
};

export default useInitialState;
