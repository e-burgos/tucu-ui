import React, {
  createContext,
  MutableRefObject,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  IOptionalDataTableProps,
  ManualPaginationState,
  ReportDataState,
  TData,
} from '../common/types';
import {
  ColumnDef,
  ColumnFiltersState,
  ColumnOrderState,
  ColumnPinningState,
  ColumnSizingState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  Table,
  Updater,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { ExpandedColumn } from '../common/helpers/ExpandedColumn';
import { RowActionsColumn } from '../common/helpers/RowActionsColumn';
import { RowSelectionColumn } from '../common/helpers/RowSelectionColumn';
import { getColumns } from '../hooks/useColumns';
import useScrollableTable, {
  UseScrollableTable,
} from '../hooks/useScrollableTable';
import useDataTableStore from '../hooks/useDataTableStore';

/**
 * Props for the DataTable component.
 *
 * @category libs/datatable
 * @subcategory Props
 *
 * @template T - The type of data used in the table.
 * @extends IOptionalDataTableProps<T> - Extends the optional properties for the data table.
 *
 * @property {string} tableId - Unique identifier for the table.
 * @property {Array<T>} data - The data to be displayed in the table.
 * @property {Array<ColumnDef<T, T>>} columns - The column definitions for the table.
 * @property {boolean} [showHeader] - Whether to show the table header.
 */
export interface DataTableProps<T = TData> extends IOptionalDataTableProps<T> {
  tableId: string;
  data: Array<T>;
  columns: Array<ColumnDef<T, T>>;
  showHeader?: boolean;
  mode?: 'dark' | 'light';
}

/**
 * Interface for the table data.
 *
 * @category libs/datatable
 * @subcategory Props
 *
 * @property {string} id - The id of the table.
 * @property {PaginationState} pagination - The pagination state of the table.
 * @property {SortingState} sorting - The sorting state of the table.
 * @property {ColumnOrderState} columnOrder - The column order state of the table.
 * @property {VisibilityState} columnVisibility - The column visibility state of the table.
 * @property {ColumnPinningState} columnPinning - The column pinning state of the table.
 * @property {ColumnFiltersState} columnFilters - The column filters state of the table.
 * @property {ManualPaginationState} manualPagination - The manual pagination state of the table.
 * @property {RowSelectionState} rowSelection - The row selection state of the table.
 * @property {number} totalCount - The total count of the table.
 */

export interface ITableData {
  id: string;
  pagination: PaginationState;
  sorting: SortingState;
  columnOrder: ColumnOrderState;
  columnVisibility: VisibilityState;
  columnPinning: ColumnPinningState;
  columnFilters: ColumnFiltersState;
  manualPagination: ManualPaginationState;
  rowSelection?: RowSelectionState;
  totalCount?: number;
  reportData: ReportDataState;
}

/**
 * Interface for the initial table data.
 *
 * @category libs/datatable
 * @subcategory Props
 *
 * @property {SortingState} initialSorting - The initial sorting state of the table.
 * @property {ColumnOrderState} initialColumnOrder - The initial column order state of the table.
 * @property {VisibilityState} initialColumnVisibility - The initial column visibility state of the table.
 * @property {ColumnPinningState} initialColumnPinning - The initial column pinning state of the table.
 * @property {ColumnFiltersState} initialColumnFilters - The initial column filters state of the table.
 * @property {ManualPaginationState} initialManualPagination - The initial manual pagination state of the table.
 * @property {PaginationState} initialPagination - The initial pagination state of the table.
 * @property {RowSelectionState} initialRowSelection - The initial row selection state of the table.
 * @property {number} initialTotalCount - The initial total count of the table.
 */

export interface ITableInitialData {
  initialSorting: SortingState;
  initialColumnOrder: ColumnOrderState;
  initialColumnVisibility: VisibilityState;
  initialColumnPinning: ColumnPinningState;
  initialColumnFilters: ColumnFiltersState;
  initialColumnSizing: ColumnSizingState;
  initialManualPagination: ManualPaginationState;
  initialPagination: PaginationState;
  initialRowSelection?: RowSelectionState;
  initialTotalCount?: number;
  reportData: ReportDataState;
}

/**
 * Interface for the data table store.
 *
 * @category libs/datatable
 * @subcategory Props
 *
 * @property {ITableData} tableState - The table state of the table.
 * @property {ITableInitialData} initialState - The initial state of the table.
 * @property {Omit<DataTableProps, 'data'>} config - The config of the table.
 * @property {UseScrollableTable} scrollProps - The scroll props of the table.
 * @property {Table<TData>} table - The table of the table.
 * @property {MutableRefObject<HTMLDivElement>} tableContainerRef - The table container ref of the table.
 * @property {Utils} utils - The utils of the table.
 */

/**
 * Interface for the utils of the table.
 *
 * @category libs/datatable
 * @subcategory Props
 *
 * @property {boolean} isEmpty - Whether the table is empty.
 * @property {boolean} checkState - Whether the table is in a check state.
 * @property {boolean} handleFetch - Whether the table is fetching.
 * @property {boolean} isSubComponent - Whether the table has a sub component.
 * @property {boolean} isManualPagination - Whether the table has a manual pagination.
 * @property {boolean} isRowSelection - Whether the table has a row selection.
 */

export interface DataTableStore {
  tableState: ITableData;
  initialState: ITableInitialData;
  actions: {
    setTotalCount?: (value: number) => void;
    resetStoreData: () => void;
    setColumnFilters: (value: ColumnFiltersState) => void;
    onSetReportCellValue: (
      value: string,
      rowIndex: string,
      cellIndex: number,
      options?: { hasSubTable?: boolean }
    ) => void;
    onSetReportHeader: (value: string, cellIndex: number) => void;
    resetReportData: () => void;
  };
  config: Omit<DataTableProps, 'data'>;
  scrollProps: UseScrollableTable;
  table: Table<TData>;
  tableContainerRef: MutableRefObject<HTMLDivElement>;
  utils: {
    isEmpty: boolean;
    checkState: boolean;
    handleFetch: boolean;
    isSubComponent: boolean;
    isManualPagination: boolean;
    isRowSelection: boolean;
  };
  globalFilter: string;
  setGlobalFilter: (value: string) => void;
}

/**
 * Interface for the scroll props of the table.
 *
 * @category libs/datatable
 * @subcategory Props
 *
 * @property {UseScrollableTable} scrollProps - The scroll props of the table.
 */
export type IScrollProps = UseScrollableTable;

/**
 * Context for the data table.
 *
 * @category libs/datatable
 * @subcategory Context
 *
 * @property {DataTableStore} tableState - The table state of the table.
 */

export const DataTableContext = createContext<DataTableStore | null>(null);

export function DataTableProvider<TData>({
  children,
  data,
  ...config
}: PropsWithChildren<DataTableProps<TData>>) {
  const {
    tableId,
    columns: definedColumns,
    rowActions,
    rowSelection: propRowSelection,
    renderSubDataTable,
    renderSubComponent,
    onSortModelChange,
    enableMultiSort,
    manualSorting,
    initialConfig,
    isLoading,
    isError,
    isFetching,
    pagination: paginationProp,
  } = config;

  const defaultColumns = useMemo(() => {
    return definedColumns;
  }, [definedColumns]);

  const isEmpty = !data || data?.length === 0;
  const checkState = isLoading || isError || isEmpty;
  const handleFetch = !isLoading && isFetching;
  const isRowSelection = !!propRowSelection;
  const isSubComponent = !!renderSubComponent || !!renderSubDataTable;
  const isServerPagination = !!paginationProp?.serverPagination;
  const isManualPagination =
    paginationProp?.manualPagination?.enabled || isServerPagination;
  const isRowActions = !!rowActions;

  const tableContainerRef = React.useRef<HTMLDivElement>(null);

  const offset = [
    isRowActions ? RowActionsColumn.size : 0,
    propRowSelection ? RowSelectionColumn.size : 0,
    isSubComponent ? ExpandedColumn.size : 0,
  ].reduce((acc, r) => (acc ?? 0) + (r ?? 0), 0);

  // Get store data and setters - Zustand persist handles all persistence
  const {
    pagination: storePagination,
    sorting: storeSorting,
    columnOrder: storeColumnOrder,
    columnVisibility: storeColumnVisibility,
    columnPinning: storeColumnPinning,
    columnFilters: storeColumnFilters,
    columnSizing: storeColumnSizing,
    setPagination: setStorePagination,
    setTotalCount: setStoreTotalCount,
    setSorting: setStoreSorting,
    setColumnOrder: setStoreColumnOrder,
    setColumnVisibility: setStoreColumnVisibility,
    setColumnPinning: setStoreColumnPinning,
    setColumnFilters: setStoreColumnFilters,
    setColumnSizing: setStoreColumnSizing,
    resetStoreData: resetStoreDataFromStore,
  } = useDataTableStore(tableId);

  const initialColumnOrder = useMemo(() => {
    const columns =
      defaultColumns?.map(
        (c) => c?.id || (c as unknown as { accessorKey: string })?.accessorKey
      ) || [];
    return storeColumnOrder?.length ? storeColumnOrder : columns;
  }, [defaultColumns, storeColumnOrder]);

  const initialColumnVisibility =
    storeColumnVisibility && Object.keys(storeColumnVisibility).length > 0
      ? storeColumnVisibility
      : defaultColumns?.reduce<VisibilityState>?.((acc, item) => {
          acc[item.id as string] = true;
          return acc;
        }, {} as VisibilityState);

  const initialState: ITableInitialData = useMemo(() => {
    return {
      initialTotalCount: 0, // Will be set by setTotalCount when needed
      initialColumnFilters: storeColumnFilters ?? [],
      initialColumnSizing: storeColumnSizing ?? {},
      initialSorting: storeSorting ?? [],
      initialColumnOrder: initialColumnOrder,
      initialColumnVisibility: initialColumnVisibility,
      initialColumnPinning: storeColumnPinning ?? {
        left: [],
        right: [],
      },
      initialManualPagination: paginationProp?.manualPagination
        ? {
            enabled: paginationProp.manualPagination.enabled,
            rowCount: paginationProp.manualPagination.rowCount,
            pagination: paginationProp.manualPagination.pagination,
          }
        : {
            enabled: false,
            rowCount: 0,
            pagination: {
              pageSize: 5,
              pageIndex: 0,
            },
          },
      initialPagination:
        isServerPagination && paginationProp?.serverPagination
          ? // For server pagination, use persisted store or fallback to prop
            storePagination ?? paginationProp.serverPagination.pagination
          : paginationProp?.takeDefaultPagination
          ? {
              pageIndex: paginationProp?.pageIndex ?? 0,
              pageSize: paginationProp?.pageSize ?? 10,
            }
          : storePagination ?? {
              pageIndex: paginationProp?.pageIndex ?? 0,
              pageSize: paginationProp?.pageSize ?? 10,
            },
      initialRowSelection: {},
      reportData: {
        headers: new Map<number, string>(),
        rows: new Map<string, Map<number, string>>(),
      },
    };
  }, [
    initialColumnOrder,
    initialColumnVisibility,
    paginationProp,
    storeColumnFilters,
    storeColumnSizing,
    storeSorting,
    storeColumnPinning,
    storePagination,
    isServerPagination,
  ]);

  // states
  const [totalCount, setTotalCount] = useState<number>(
    initialState?.initialTotalCount ?? 0
  );
  const [sorting, setSorting] = useState<SortingState>(
    initialState?.initialSorting
  );
  const [columnOrder, setColumnOrder] = useState<ColumnOrderState>(
    initialState.initialColumnOrder
  );
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
    initialState.initialColumnVisibility
  );
  const [columnPinning, setColumnPinning] = useState<ColumnPinningState>(
    initialState.initialColumnPinning
  );
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    initialState.initialColumnFilters
  );
  const [columnSizing, setColumnSizing] = useState<ColumnSizingState>(
    initialState.initialColumnSizing
  );
  const [pagination, setPagination] = useState<PaginationState>(
    initialState.initialPagination
  );
  const [manualPagination, setManualPagination] =
    useState<ManualPaginationState>(initialState.initialManualPagination);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>(
    initialState.initialRowSelection ?? {}
  );

  const [reportData, setReportData] = useState<ReportDataState>(
    initialState.reportData
  );

  const [globalFilter, setGlobalFilter] = useState<string>('');

  const scrollProps = useScrollableTable(
    tableContainerRef as MutableRefObject<HTMLDivElement>
  );

  const containerWidth = tableContainerRef.current?.clientWidth || 0;

  const initialColumns = useMemo(
    () =>
      getColumns({
        columns: defaultColumns,
        containerWidth,
        offset: offset ?? 0,
        isSubComponent,
        isRowActions,
        isRowSelection,
        columnVisibility,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [scrollProps, columnVisibility, containerWidth]
  );

  // Wrapper for serverPagination.setPagination that also updates internal table state
  const serverPaginationSetPagination = React.useCallback(
    (newPagination: PaginationState) => {
      if (isServerPagination && paginationProp?.serverPagination) {
        // Update internal table state first (this will persist to Zustand)
        setPagination(newPagination);
        setStorePagination(newPagination);
        // Then update parent component (this will trigger API call)
        paginationProp.serverPagination.setPagination(newPagination);
      }
    },
    [
      isServerPagination,
      paginationProp?.serverPagination,
      setPagination,
      setStorePagination,
    ]
  );

  const onSetInternalPagination = useCallback(
    (updater: Updater<PaginationState>) => {
      setPagination((prev) => {
        const newValues = updater instanceof Function ? updater(prev) : updater;
        // Zustand persist handles persistence automatically
        // Defer store update to avoid updating during render
        queueMicrotask(() => {
          setStorePagination(newValues);
        });

        // Update manualPagination state for ManualPagination component
        if (isManualPagination) {
          if (isServerPagination && paginationProp?.serverPagination) {
            const updatedManualPagination = {
              enabled: true,
              rowCount: paginationProp.serverPagination.totalCount,
              pagination: newValues,
              setPagination: serverPaginationSetPagination,
            };
            setManualPagination(updatedManualPagination);
            // Call the external setPagination to trigger API call in parent component
            paginationProp.serverPagination.setPagination(newValues);
          } else if (manualPagination?.enabled) {
            const updatedManualPagination = {
              ...manualPagination,
              pagination: newValues,
            };
            setManualPagination(updatedManualPagination);
          }
        }

        return newValues;
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      tableId,
      setStorePagination,
      isManualPagination,
      isServerPagination,
      manualPagination,
      setManualPagination,
      paginationProp?.serverPagination,
      serverPaginationSetPagination,
    ]
  );

  const onSetInternalColumnOrder = useCallback(
    (updater: Updater<ColumnOrderState>) => {
      resetReportData();

      setColumnOrder((prev) => {
        const newValue = updater instanceof Function ? updater(prev) : updater;
        // Zustand persist handles persistence automatically
        // Defer store update to avoid updating during render
        queueMicrotask(() => {
          setStoreColumnOrder(newValue);
        });
        return newValue;
      });
    },
    [tableId, setStoreColumnOrder] //eslint-disable-line
  );

  const onSetInternalSorting = useCallback(
    (updater: Updater<SortingState>) => {
      resetReportData();
      setSorting((prev) => {
        const newValues = updater instanceof Function ? updater(prev) : updater;
        // Zustand persist handles persistence automatically
        // Defer store update to avoid updating during render
        queueMicrotask(() => {
          setStoreSorting(newValues);
        });
        onSortModelChange?.(newValues);

        return newValues;
      });
    },
    [onSortModelChange, tableId, setStoreSorting] //eslint-disable-line
  );

  const onSetInternalColumnVisibility = useCallback(
    (updater: Updater<VisibilityState>) => {
      resetReportData();

      setColumnVisibility((prev) => {
        const newValues = updater instanceof Function ? updater(prev) : updater;
        // Zustand persist handles persistence automatically
        // Defer store update to avoid updating during render
        queueMicrotask(() => {
          setStoreColumnVisibility(newValues);
        });
        return newValues;
      });
    },
    [tableId, setStoreColumnVisibility] //eslint-disable-line
  );

  const onSetInternalColumnPinning = useCallback(
    (updater: Updater<ColumnPinningState>) => {
      setColumnPinning((prev) => {
        const newValues = updater instanceof Function ? updater(prev) : updater;
        // Zustand persist handles persistence automatically
        // Defer store update to avoid updating during render
        queueMicrotask(() => {
          setStoreColumnPinning(newValues);
        });
        return newValues;
      });
    },
    [setStoreColumnPinning]
  );

  const onSetInternalRowSelection = useCallback(
    (updater: Updater<RowSelectionState>) => {
      resetReportData();
      setRowSelection((prev) => {
        const newValues = updater instanceof Function ? updater(prev) : updater;
        // Note: rowSelection is not persisted in Zustand store (not in ITableData)
        return newValues;
      });
    },
    [tableId] //eslint-disable-line
  );

  const onSetInternalColumnFilters = useCallback(
    (value: ColumnFiltersState) => {
      resetReportData();
      // Zustand persist handles persistence automatically
      // Defer store update to avoid updating during render
      queueMicrotask(() => {
        setStoreColumnFilters(value);
      });
      return setColumnFilters(value);
    },
    [setStoreColumnFilters] //eslint-disable-line
  );

  const onSetInternalColumnSizing = useCallback(
    (updater: Updater<ColumnSizingState>) => {
      setColumnSizing((prev) => {
        const newValues = updater instanceof Function ? updater(prev) : updater;
        // Zustand persist handles persistence automatically
        // Defer store update to avoid updating during render
        queueMicrotask(() => {
          setStoreColumnSizing(newValues);
        });
        return newValues;
      });
    },
    [setStoreColumnSizing] //eslint-disable-line
  );

  const onSetInternalTotalCount = useCallback(
    (value: number) => {
      // Zustand persist handles persistence automatically
      setStoreTotalCount?.(value);
      return setTotalCount(value);
    },
    [setStoreTotalCount]
  );

  // Sync manual pagination from props (simple, no persistence)
  React.useEffect(() => {
    if (
      isManualPagination &&
      paginationProp?.manualPagination &&
      !isServerPagination
    ) {
      const newManualPagination = {
        enabled: paginationProp.manualPagination.enabled,
        rowCount: paginationProp.manualPagination.rowCount,
        pagination: paginationProp.manualPagination.pagination,
      };
      setManualPagination(newManualPagination);
      // Also update internal pagination state to match
      setPagination(paginationProp.manualPagination.pagination);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isManualPagination,
    isServerPagination,
    paginationProp?.manualPagination?.enabled,
    paginationProp?.manualPagination?.rowCount,
    paginationProp?.manualPagination?.pagination?.pageIndex,
    paginationProp?.manualPagination?.pagination?.pageSize,
    setManualPagination,
    setPagination,
  ]);

  // Sync server pagination: update manualPagination state for table compatibility
  // Note: serverPagination uses persisted store for pagination state
  const isFirstMountRef = React.useRef(true);
  React.useEffect(() => {
    if (isServerPagination && paginationProp?.serverPagination) {
      const serverPagination = paginationProp.serverPagination;
      const newManualPagination = {
        enabled: true,
        rowCount: serverPagination.totalCount,
        pagination: pagination, // Use current pagination state (from store or props)
        setPagination: serverPaginationSetPagination, // Use wrapper that syncs both states
      };
      setManualPagination(newManualPagination);

      // Sync persisted store state back to parent component only on first mount
      // This ensures parent state matches persisted state without causing loops
      if (isFirstMountRef.current) {
        isFirstMountRef.current = false;
        if (
          pagination &&
          (pagination.pageIndex !== serverPagination.pagination.pageIndex ||
            pagination.pageSize !== serverPagination.pagination.pageSize)
        ) {
          serverPagination.setPagination(pagination);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isServerPagination,
    paginationProp?.serverPagination?.totalCount,
    paginationProp?.serverPagination?.pagination?.pageIndex,
    paginationProp?.serverPagination?.pagination?.pageSize,
    pagination,
    setManualPagination,
    serverPaginationSetPagination,
  ]);

  const resetStoreData = useCallback(() => {
    // Zustand persist handles localStorage cleanup
    resetStoreDataFromStore();
    setSorting(initialState.initialSorting);
    setColumnOrder(initialState.initialColumnOrder);
    setColumnVisibility(initialState.initialColumnVisibility);
    setColumnPinning(initialState.initialColumnPinning);
    setColumnSizing(initialState.initialColumnSizing);
    setManualPagination(initialState.initialManualPagination);
    setPagination(initialState.initialPagination);
    setRowSelection(
      initialState.initialRowSelection ?? ({} as RowSelectionState)
    );
    setColumnFilters(initialState.initialColumnFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    initialState.initialColumnFilters,
    initialState.initialColumnOrder,
    initialState.initialColumnPinning,
    initialState.initialColumnSizing,
    initialState.initialColumnVisibility,
    initialState.initialManualPagination,
    initialState.initialPagination,
    initialState.initialRowSelection,
    initialState.initialSorting,
    resetStoreDataFromStore,
    setColumnFilters,
    setColumnOrder,
    setColumnPinning,
    setColumnSizing,
    setColumnVisibility,
    setManualPagination,
    setPagination,
    setRowSelection,
    setSorting,
    tableId,
  ]);

  const table = useReactTable<TData>({
    data: data,
    columns: initialColumns as ColumnDef<TData, unknown>[],
    state: {
      pagination:
        // For server pagination, use persisted store state (pagination)
        // For manual pagination, use prop pagination
        // Otherwise, use internal pagination state
        isManualPagination && paginationProp?.manualPagination?.pagination
          ? paginationProp.manualPagination.pagination
          : pagination,
      sorting,
      columnOrder,
      columnVisibility,
      columnSizing,
      rowSelection,
      columnPinning: {
        ...columnPinning,
        left: [
          ExpandedColumn.id,
          RowSelectionColumn.id,
          ...(columnPinning.left ?? []),
        ] as string[],
        right: [
          ...(columnPinning.right ?? []),
          RowActionsColumn.id,
        ] as string[],
      },
      globalFilter,
    },
    onPaginationChange: onSetInternalPagination,
    onColumnOrderChange: onSetInternalColumnOrder,
    onSortingChange: onSetInternalSorting,
    onColumnVisibilityChange: onSetInternalColumnVisibility,
    onColumnSizingChange: onSetInternalColumnSizing,
    onColumnPinningChange: onSetInternalColumnPinning,
    onRowSelectionChange: onSetInternalRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      if (config.searchableColumns && config.searchableColumns.length > 0) {
        if (!config.searchableColumns.includes(columnId)) {
          return false;
        }
      }
      const cellValue = row.getValue(columnId);
      if (cellValue == null) return false;
      return String(cellValue)
        .toLowerCase()
        .includes(String(filterValue).toLowerCase());
    },
    manualPagination: manualPagination?.enabled ?? false,
    rowCount: manualPagination?.enabled ? manualPagination.rowCount : undefined,
    columnResizeMode: 'onChange' as const,
    enableMultiSort,
    manualSorting,
    maxMultiSortColCount: 2,
    autoResetPageIndex: false,
    enableRowSelection: true,
    isMultiSortEvent: () => true,
    getRowCanExpand: () => true,
    getRowId: (_row, index) => index.toString(),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    ...(isManualPagination
      ? {}
      : { getPaginationRowModel: getPaginationRowModel() }),
    defaultColumn: {
      size: initialConfig?.size,
      minSize: initialConfig?.minSize,
      maxSize: initialConfig?.maxSize,
      enableResizing: initialConfig?.enableResizing || true,
      enableSorting: initialConfig?.enableSorting || true,
      enableMultiSort: initialConfig?.enableMultiSort || enableMultiSort,
      enablePinning: initialConfig?.enablePinning || true,
      enableHiding: initialConfig?.enableHiding || true,
      enableColumnFilter: initialConfig?.enableColumnFilter || false,
      ...(initialConfig as ColumnDef<TData, unknown> | undefined),
    },
  });

  const onSetReportCellValue = useCallback(
    (
      value: string,
      rowId: string,
      cellIndex: number,
      options?: { hasSubTable?: boolean }
    ) => {
      const adjustedIndex =
        options?.hasSubTable && cellIndex > 0 ? cellIndex - 1 : cellIndex;

      if (adjustedIndex < 0) return;

      setReportData((prev) => {
        const newRows = new Map(prev.rows);
        const rowMap = newRows.get(rowId) ?? new Map<number, string>();
        rowMap.set(adjustedIndex, value);
        newRows.set(rowId, rowMap);
        return { ...prev, rows: newRows };
      });
    },
    []
  );

  const onSetReportHeader = useCallback((name: string, index: number) => {
    setReportData((prev) => {
      const headers = new Map(prev.headers);
      headers.set(index, name);
      return { ...prev, headers };
    });
  }, []);

  const resetReportData = useCallback(() => {
    setReportData({
      headers: new Map(),
      rows: new Map<string, Map<number, string>>(),
    });
  }, []);

  return (
    <DataTableContext.Provider
      // @ts-expect-error - useMemo is used for performance optimization
      value={useMemo(() => {
        return {
          tableState: {
            id: tableId,
            pagination,
            sorting,
            columnOrder,
            columnVisibility,
            columnPinning,
            columnFilters,
            manualPagination,
            rowSelection,
            totalCount,
            reportData,
          },
          initialState,
          actions: {
            setTotalCount: onSetInternalTotalCount,
            resetStoreData: resetStoreData,
            setColumnFilters: onSetInternalColumnFilters,
            onSetReportCellValue,
            onSetReportHeader,
            resetReportData,
          },
          config: config as Omit<DataTableProps, 'data'>,
          scrollProps,
          table,
          tableContainerRef:
            tableContainerRef as MutableRefObject<HTMLDivElement>,
          utils: {
            isEmpty,
            checkState,
            handleFetch,
            isSubComponent,
            isManualPagination,
            isRowSelection,
          },
          globalFilter,
          setGlobalFilter,
        };
      }, [
        checkState,
        columnFilters,
        columnOrder,
        columnPinning,
        columnVisibility,
        config,
        handleFetch,
        reportData,
        initialState,
        isEmpty,
        isManualPagination,
        isRowSelection,
        isSubComponent,
        manualPagination,
        onSetInternalColumnFilters,
        onSetInternalTotalCount,
        pagination,
        resetStoreData,
        rowSelection,
        scrollProps,
        sorting,
        table,
        tableId,
        totalCount,
        onSetReportCellValue,
        onSetReportHeader,
        resetReportData,
        globalFilter,
        setGlobalFilter,
      ])}
    >
      {children}
    </DataTableContext.Provider>
  );
}

/**
 * Hook for the data table context.
 *
 * @category libs/datatable
 * @subcategory Hooks
 *
 * @returns {DataTableStore | null} The data table context.
 */

export function useDataTableContext(): DataTableStore | null {
  const context = useContext(DataTableContext);
  if (!context) {
    console.error(
      'useDataTableContext must be used within a DataTableProvider'
    );
    return null;
  }
  return context;
}
