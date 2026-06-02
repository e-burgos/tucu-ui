import {
  ColumnFiltersState,
  ColumnOrderState,
  ColumnPinningState,
  ColumnSizingState,
  PaginationState,
  SortingState,
  VisibilityState,
} from '@tanstack/react-table';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ManualPaginationState } from '../common/types';

/**
 * ITableData
 * @category libs/datatable
 * @subcategory Hooks
 *
 * @property {string} id - The id of the table.
 * @property {PaginationState} pagination - The pagination state of the table.
 * @property {SortingState} sorting - The sorting state of the table.
 * @property {ColumnOrderState} columnOrder - The column order state of the table.
 * @property {VisibilityState} columnVisibility - The column visibility state of the table.
 * @property {ColumnPinningState} columnPinning - The column pinning state of the table.
 * @property {ColumnFiltersState} columnFilters - The column filters state of the table.
 * @property {ManualPaginationState} manualPagination - The manual pagination state of the table.
 *
 * @template TData - The type of the data in the table.
 */

export interface ITableData {
  id: string;
  pagination: PaginationState;
  sorting: SortingState;
  columnOrder: ColumnOrderState;
  columnVisibility: VisibilityState;
  columnPinning: ColumnPinningState;
  columnFilters: ColumnFiltersState;
  columnSizing: ColumnSizingState;
  manualPagination: ManualPaginationState;
  totalCount?: number;
}

export interface DataTableStore {
  tableData: ITableData;
  setPagination: (value: PaginationState) => void;
  setTotalCount?: (value: number) => void;
  setSorting: (value: SortingState) => void;
  setColumnOrder: (value: ColumnOrderState) => void;
  setColumnVisibility: (value: VisibilityState) => void;
  setColumnPinning: (value: ColumnPinningState) => void;
  setColumnFilters: (value: ColumnFiltersState) => void;
  setColumnSizing: (value: ColumnSizingState) => void;
  setManualPagination: (value: ManualPaginationState) => void;
  resetStoreData: () => void;
}

// Store singleton map to ensure one store per tableId
const storeMap = new Map<string, ReturnType<typeof createStore>>();

function createStore(tableId: string) {
  return create<DataTableStore>()(
    persist(
      (set) => ({
        tableData: {
          id: tableId,
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
          columnSizing: {},
          manualPagination: {
            enabled: false,
            rowCount: 0,
            pagination: {
              pageSize: 5,
              pageIndex: 0,
            },
          },
        },
        setPagination: (value: PaginationState) => {
          set((state) => ({
            tableData: {
              ...state.tableData,
              pagination: value,
            },
          }));
        },
        setTotalCount: (value: number) => {
          set((state) => ({
            tableData: {
              ...state.tableData,
              totalCount: value,
            },
          }));
        },
        setSorting: (value: SortingState) => {
          set((state) => ({
            tableData: {
              ...state.tableData,
              sorting: value,
            },
          }));
        },
        setColumnOrder: (value: ColumnOrderState) => {
          set((state) => ({
            tableData: {
              ...state.tableData,
              columnOrder: value,
            },
          }));
        },
        setColumnVisibility: (value: VisibilityState) => {
          set((state) => ({
            tableData: {
              ...state.tableData,
              columnVisibility: value,
            },
          }));
        },
        setColumnPinning: (value: ColumnPinningState) => {
          set((state) => ({
            tableData: {
              ...state.tableData,
              columnPinning: value,
            },
          }));
        },
        setColumnFilters: (value: ColumnFiltersState) => {
          set((state) => ({
            tableData: {
              ...state.tableData,
              columnFilters: value,
            },
          }));
        },
        setColumnSizing: (value: ColumnSizingState) => {
          set((state) => ({
            tableData: {
              ...state.tableData,
              columnSizing: value,
            },
          }));
        },
        setManualPagination: (value: ManualPaginationState) => {
          set((state) => ({
            tableData: {
              ...state.tableData,
              manualPagination: value,
            },
          }));
        },
        resetStoreData: () => {
          set(() => ({
            tableData: {
              id: tableId,
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
              columnSizing: {},
              manualPagination: {
                enabled: false,
                rowCount: 0,
                pagination: {
                  pageSize: 5,
                  pageIndex: 0,
                },
              },
            },
          }));
        },
      }),
      {
        name: `${tableId}-datatable`,
        partialize: (state) => ({ tableData: state.tableData }),
      }
    )
  );
}

export const useDataTableStore = (tableId: string) => {
  // Get or create store singleton for this tableId
  if (!storeMap.has(tableId)) {
    storeMap.set(tableId, createStore(tableId));
  }
  const useTableStore = storeMap.get(tableId)!;

  const {
    tableData: {
      pagination,
      sorting,
      columnOrder,
      columnVisibility,
      columnPinning,
      columnFilters,
      columnSizing,
      manualPagination,
    },
    setPagination,
    setTotalCount,
    setSorting,
    setColumnOrder,
    setColumnVisibility,
    setColumnPinning,
    setColumnFilters,
    setColumnSizing,
    setManualPagination,
    resetStoreData,
  } = useTableStore();

  return {
    pagination,
    sorting,
    columnOrder,
    columnVisibility,
    columnPinning,
    columnFilters,
    columnSizing,
    manualPagination,
    setPagination,
    setTotalCount,
    setSorting,
    setColumnOrder,
    setColumnVisibility,
    setColumnPinning,
    setColumnFilters,
    setColumnSizing,
    setManualPagination,
    resetStoreData,
  };
};
export default useDataTableStore;
