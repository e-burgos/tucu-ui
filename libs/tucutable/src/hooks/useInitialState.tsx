import React, { useEffect } from 'react';
import {
  ColumnDef,
  ColumnPinningState,
  PaginationState,
  VisibilityState,
} from '@tanstack/react-table';
import { ExpandedColumn } from '../common/helpers/ExpandedColumn';
import { RowActionsColumn } from '../common/helpers/RowActionsColumn';
import { TData } from '../common/types';
import useDataTableStore from './useDataTableStore';

const useInitialState = (
  tableId: string,
  defaultColumns: ColumnDef<TData, TData>[],
  data: TData[]
) => {
  const {
    pagination,
    columnOrder,
    columnVisibility,
    setColumnOrder,
    setColumnVisibility,
  } = useDataTableStore(tableId);

  const columns = React.useMemo<typeof defaultColumns>(
    () => [ExpandedColumn, ...defaultColumns, RowActionsColumn],
    [defaultColumns]
  );

  const initialColumnOrder = React.useMemo<string[]>(() => {
    const initialState = columns.map((c) => c.id) as string[];
    return initialState;
  }, [columns]);

  const initialColumnVisibility = React.useMemo<VisibilityState>(() => {
    const initialState = columns.reduce<VisibilityState>((acc, c) => {
      acc[c.id as keyof VisibilityState] = true;
      return acc;
    }, {} as VisibilityState);
    return initialState;
  }, [columns]);

  const initialColumnPinning = React.useMemo<ColumnPinningState>(() => {
    const initialState: ColumnPinningState = {
      left: [] as string[],
      right: [] as string[],
    };
    return initialState;
  }, []);

  const initialPagination = React.useMemo<PaginationState>(() => {
    return {
      pageIndex: pagination?.pageIndex || 0,
      pageSize: pagination?.pageSize || 10,
    };
  }, [pagination?.pageIndex, pagination?.pageSize]);

  useEffect(() => {
    if (columnOrder?.length === 0) setColumnOrder(initialColumnOrder);
    if (Object.keys(columnVisibility).length === 0)
      setColumnVisibility(initialColumnVisibility);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [columnOrder, columnVisibility, data]);

  return {
    columns,
    initialColumnOrder,
    initialColumnVisibility,
    initialColumnPinning,
    initialPagination,
  };
};

export default useInitialState;
