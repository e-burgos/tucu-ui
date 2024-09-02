import {
  ColumnFiltersState,
  ColumnOrderState,
  ColumnPinningState,
  PaginationState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import { create } from 'zustand';
import { storage } from '../local-storage';

export interface ITableData {
  id: string;
  pagination: PaginationState;
  sorting: SortingState;
  columnOrder: ColumnOrderState;
  columnVisibility: VisibilityState;
  columnPinning: ColumnPinningState;
  columnFilters: ColumnFiltersState;
}

export interface DataTableStore {
  tableData: ITableData;
  setPagination: (value: PaginationState) => void;
  setSorting: (value: SortingState) => void;
  setColumnOrder: (value: ColumnOrderState) => void;
  setColumnVisibility: (value: VisibilityState) => void;
  setColumnPinning: (value: ColumnPinningState) => void;
  setColumnFilters: (value: ColumnFiltersState) => void;
  resetStoreData: () => void;
}

const useDataTableStore = (tableId: string) => {
  const useTableStore = create<DataTableStore>((set) => {
    const tableDataStorage: ITableData =
      storage.get(`${tableId}-table-data`) || null;
    return {
      tableData: {
        id: tableId,
        pagination: {
          pageSize: tableDataStorage?.pagination?.pageSize || 10,
          pageIndex: tableDataStorage?.pagination?.pageIndex || 0,
        },
        sorting: tableDataStorage?.sorting || [],
        columnOrder: tableDataStorage?.columnOrder || [],
        columnVisibility: tableDataStorage?.columnVisibility || {},
        columnPinning: tableDataStorage?.columnPinning || {
          left: [],
          right: [],
        },
        columnFilters: tableDataStorage?.columnFilters || [],
      },
      setPagination: (value: PaginationState) => {
        if (tableId) {
          return set((state) => {
            storage.set(`${tableId}-table-data`, {
              ...state.tableData,
              pagination: value,
            });
            return {
              tableData: {
                ...state.tableData,
                pagination: value,
              },
            };
          });
        }
      },
      setSorting: (value: SortingState) => {
        if (tableId)
          return set((state) => {
            storage.set(`${tableId}-table-data`, {
              ...state.tableData,
              sorting: value,
            });
            return {
              tableData: {
                ...state.tableData,
                sorting: value,
              },
            };
          });
        return null;
      },
      setColumnOrder: (value: ColumnOrderState) => {
        if (tableId)
          return set((state) => {
            storage.set(`${tableId}-table-data`, {
              ...state.tableData,
              columnOrder: value,
            });
            return {
              tableData: {
                ...state.tableData,
                columnOrder: value,
              },
            };
          });
        return null;
      },
      setColumnVisibility: (value: VisibilityState) => {
        if (tableId)
          return set((state) => {
            storage.set(`${tableId}-table-data`, {
              ...state.tableData,
              columnVisibility: value,
            });
            return {
              tableData: {
                ...state.tableData,
                columnVisibility: value,
              },
            };
          });
        return null;
      },
      setColumnPinning: (value: ColumnPinningState) => {
        if (tableId)
          return set((state) => {
            storage.set(`${tableId}-table-data`, {
              ...state.tableData,
              columnPinning: value,
            });
            return {
              tableData: {
                ...state.tableData,
                columnPinning: value,
              },
            };
          });
        return null;
      },
      setColumnFilters: (value: ColumnFiltersState) => {
        if (tableId)
          return set((state) => {
            storage.set(`${tableId}-table-data`, {
              ...state.tableData,
              columnFilters: value,
            });
            return {
              tableData: {
                ...state.tableData,
                columnFilters: value,
              },
            };
          });
        return null;
      },
      resetStoreData: () => {
        if (tableId)
          return set(() => {
            storage.remove(`${tableId}-table-data`);
            return {
              tableData: {
                id: tableId,
                table: null,
                pagination: {
                  pageSize: 10,
                  pageIndex: 0,
                },
                sorting: [],
                columnOrder: [],
                columnVisibility: {},
                columnPinning: {
                  left: [],
                  right: [],
                },
                columnFilters: [],
              },
            };
          });
        return null;
      },
    };
  });

  const {
    tableData: {
      pagination,
      sorting,
      columnOrder,
      columnVisibility,
      columnPinning,
      columnFilters,
    },
    setPagination,
    setSorting,
    setColumnOrder,
    setColumnVisibility,
    setColumnPinning,
    setColumnFilters,
    resetStoreData,
  } = useTableStore();

  return {
    pagination,
    sorting,
    columnOrder,
    columnVisibility,
    columnPinning,
    columnFilters,
    setPagination,
    setSorting,
    setColumnOrder,
    setColumnVisibility,
    setColumnPinning,
    setColumnFilters,
    resetStoreData,
  };
};
export default useDataTableStore;
