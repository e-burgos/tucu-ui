/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { onChangeTableState } from '../common/functions';
import { TData } from '../common/types';
import useDataTableStore from './useDataTableStore';
import useInitialState from './useInitialState';

const useDataTable = (
  tableId: string,
  defaultData: TData[],
  defaultColumns: ColumnDef<any, any>[],
  initialConfig?: Partial<ColumnDef<TData, unknown>>
) => {
  const {
    pagination,
    sorting: sortingStore,
    columnOrder,
    columnVisibility,
    columnPinning,
    setPagination,
    setSorting: setSortingStore,
    setColumnOrder,
    setColumnVisibility,
    setColumnPinning,
    resetStoreData,
  } = useDataTableStore(tableId);

  // states
  const [data, setData] = useState(defaultData);
  const [sorting, setSorting] = useState(sortingStore);
  const { columns } = useInitialState(tableId, defaultColumns, data);

  const table = useReactTable({
    columns,
    data,
    state: {
      pagination,
      sorting,
      columnOrder,
      columnVisibility,
      columnPinning: {
        ...columnPinning,
        left: ['Expanded', ...(columnPinning.left ?? [])],
        right: [...(columnPinning.right ?? []), 'RowActionsColumn'],
      },
    },
    initialState: {
      pagination,
      sorting: sortingStore,
      columnOrder,
      columnVisibility,
      columnPinning,
    },
    onColumnOrderChange: (updaterFn) => {
      onChangeTableState(updaterFn, columnOrder, setColumnOrder);
    },
    onPaginationChange: (updaterFn) => {
      onChangeTableState(updaterFn, pagination, setPagination);
    },
    onSortingChange: (updaterFn) => {
      onChangeTableState(updaterFn, sorting, setSortingStore);
      setSorting(updaterFn);
    },
    onColumnVisibilityChange: (updaterFn) => {
      onChangeTableState(updaterFn, columnVisibility, setColumnVisibility);
    },
    onColumnPinningChange: (updaterFn) => {
      onChangeTableState(updaterFn, columnPinning, setColumnPinning);
    },
    columnResizeMode: 'onChange',
    enableMultiSort: true,
    maxMultiSortColCount: 2,
    isMultiSortEvent: () => true,
    getRowCanExpand: () => true,
    getRowId: (_row, index) => index.toString(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    defaultColumn: {
      size: initialConfig?.size,
      minSize: initialConfig?.minSize,
      maxSize: initialConfig?.maxSize,
      enableResizing: initialConfig?.enableResizing || true,
      enableSorting: initialConfig?.enableSorting || true,
      enableMultiSort: initialConfig?.enableMultiSort || true,
      enablePinning: initialConfig?.enablePinning || true,
      enableHiding: initialConfig?.enableHiding || true,
      enableColumnFilter: initialConfig?.enableColumnFilter || false,
      ...initialConfig,
    },
  });

  const resetTable = () => {
    table.reset();
    setSorting([]);
    resetStoreData();
  };

  useEffect(() => {
    if (defaultData) setData(defaultData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [defaultData]);

  return {
    table,
    data,
    sorting,
    pagination,
    columnOrder,
    columnVisibility,
    columnPinning,
    setData,
    setSorting,
    setPagination,
    setColumnOrder,
    setColumnVisibility,
    setColumnPinning,
    resetTable,
  };
};
export default useDataTable;
