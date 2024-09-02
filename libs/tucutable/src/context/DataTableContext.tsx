/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Dispatch, SetStateAction } from 'react';
import {
  ColumnDef,
  ColumnOrderState,
  ColumnPinningState,
  PaginationState,
  SortingState,
  Table,
  VisibilityState,
} from '@tanstack/react-table';
import { create } from 'zustand';
import { TData } from '../common/types';
import useDataTable from '../hooks/useDataTable';

interface DataTableProviderValue {
  tableId: string;
  table: Table<TData>;
  data: TData[];
  pagination: PaginationState;
  sorting: SortingState;
  columnOrder: ColumnOrderState;
  columnVisibility: VisibilityState;
  columnPinning: ColumnPinningState;
  setData: Dispatch<SetStateAction<TData[]>>;
  setPagination: (value: PaginationState) => void;
  setSorting: Dispatch<SetStateAction<SortingState>>;
  setColumnOrder: (value: ColumnOrderState) => void;
  setColumnVisibility: (value: VisibilityState) => void;
  setColumnPinning: (value: ColumnPinningState) => void;
  resetTable: () => void;
}

const Context = React.createContext<DataTableProviderValue | null>(null);

const DataTableProvider = ({
  children,
  tableId,
  defaultData,
  defaultColumns,
  initialConfig,
}: {
  children: React.ReactNode;
  tableId: string;
  defaultData: TData[];
  defaultColumns: ColumnDef<any, any>[];
  initialConfig?: Partial<ColumnDef<TData, unknown>>;
}) => {
  const {
    table,
    data,
    pagination,
    sorting,
    columnOrder,
    columnVisibility,
    columnPinning,
    setData,
    setPagination,
    setSorting,
    setColumnOrder,
    setColumnVisibility,
    setColumnPinning,
    resetTable,
  } = useDataTable(tableId, defaultData, defaultColumns, initialConfig);

  const useStore = React.useMemo(
    () =>
      create<DataTableProviderValue>((_set) => ({
        tableId,
        table,
        data,
        pagination,
        sorting,
        columnOrder,
        columnVisibility,
        columnPinning,
        setData,
        setPagination,
        setSorting,
        setColumnOrder,
        setColumnVisibility,
        setColumnPinning,
        resetTable,
      })),
    [
      tableId,
      columnOrder,
      columnPinning,
      columnVisibility,
      data,
      pagination,
      resetTable,
      setColumnOrder,
      setColumnPinning,
      setColumnVisibility,
      setData,
      setPagination,
      setSorting,
      sorting,
      table,
    ],
  );

  const store = useStore();

  return <Context.Provider value={store}>{children}</Context.Provider>;
};
// Hook to access Context that indirectly exposes the created store.
const useDataTableProvider = (): DataTableProviderValue => {
  const ctx = React.useContext(Context);

  if (!ctx) throw Error(`Lack of provider`);

  return ctx;
};

export { DataTableProvider, useDataTableProvider };
