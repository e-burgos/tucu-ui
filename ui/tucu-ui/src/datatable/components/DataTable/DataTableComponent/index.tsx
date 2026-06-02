import React, { Dispatch, Fragment, memo, RefObject, useState } from 'react';
import {
  ColumnOrderState,
  Table,
  VisibilityState,
} from '@tanstack/react-table';
import { cn } from '../../../common/helpers/cn';
import {
  IOptionalDataTableProps,
  IRowSelection,
  ManualPaginationState,
  TData,
} from '../../../common/types';
import Footer from '../../Footer';
import ManualPagination from '../../ManualPagination';
import Pagination from '../../Pagination';
import DragDropContentContext from '../../../context/DragDropContentContext';
import DragDropTableContext from '../../../context/DragDropTableContext';
import { IScrollProps, useDataTableContext } from '../../../context/index';
import StateTableHandler from '../StateTableHandler';
import SubComponentDataTable from '../SubComponentDataTable';
import TableHead from '../TableHead';
import TableRow from '../TableRow';
import TableWrapper from '../TableWrapper';

/**
 * Props for the DataTableComponent.
 *
 * @category libs/datatable
 * @subcategory Props
 *
 * @template TData - The type of data used in the table.
 * @extends IOptionalDataTableProps<TData> - Extends the optional properties for the data table.
 *
 * @property {string} tableId - Unique identifier for the table.
 * @property {Table<TData>} table - The table instance.
 * @property {Array<TData>} data - The data to be displayed in the table.
 * @property {boolean} [showHeader] - Whether to show the table header.
 * @property {ColumnOrderState} columnOrder - The order of columns in the table.
 * @property {VisibilityState} columnVisibility - The visibility state of columns.
 * @property {Dispatch<SetStateAction<ColumnOrderState>>} setColumnOrder - Function to set the order of columns.
 * @property {Dispatch<SetStateAction<VisibilityState>>} setColumnVisibility - Function to set the visibility of columns.
 * @property {Dispatch<SetStateAction<ManualPaginationState>>} setManualPagination - Function to manage manual pagination state.
 * @property {RefObject<HTMLDivElement>} [tableContainerRef] - Reference to the table container element.
 * @property {IScrollProps} [scrollProps] - Scroll-related properties for the table.
 */
export interface DataTableComponentProps<TData>
  extends IOptionalDataTableProps<TData> {
  tableId: string;
  table: Table<TData>;
  data: Array<TData>;
  showHeader?: boolean;
  setColumnOrder: Dispatch<ColumnOrderState>;
  setColumnVisibility: Dispatch<VisibilityState>;
  setManualPagination: Dispatch<ManualPaginationState>;
  tableContainerRef?: RefObject<HTMLDivElement>;
  scrollProps?: IScrollProps;
}

/**
 * DataTableComponent is a React component that displays a data table with sorting, pagination,
 * and optional subComponents, is a versatile and customizable table component designed to handle various data display needs.
 * It supports features like pagination, row selection, column visibility, and sub-components rendering.
 * This component is parameterized by a table of type `Table<TData>`
 * provided by TanStack Table. Without this implementation, it cannot function.
 * For more information, see the [React Table documentation](https://tanstack.com/react-table/).
 *
 * @category libs/datatable
 * @subcategory Components
 *
 * @component
 * @extends IOptionalDataTableProps<TData> - The data table properties.
 * @template TData - The type of data being displayed in the table.
 *
 * @param {DataTableComponentProps<TData>} props - The properties object.
 * @param {string} props.tableId - The unique identifier for the table.
 * @param {Table<TData>} props.table - The table instance.
 * @param {Array<TData>} props.data - The data to be displayed in the table.
 * @param {ColumnOrderState} props.columnOrder - The state of the column order.
 * @param {VisibilityState} props.columnVisibility - The state of the column visibility.
 * @param {Dispatch<SetStateAction<ColumnOrderState>>} props.setColumnOrder - Function to set the column order state.
 * @param {Dispatch<SetStateAction<VisibilityState>>} props.setColumnVisibility - Function to set the column visibility state.
 * @param {Dispatch<SetStateAction<ManualPaginationState>>} props.setManualPagination - Function to set the manual pagination state.
 * @param {RefObject<HTMLDivElement>} [props.tableContainerRef] - Optional reference to the table container element.
 * @param {IScrollProps} [props.scrollProps] - Optional scroll properties for the table.
 *
 * @returns {JSX.Element} The rendered DataTableComponent or null if the table instance is not provided.
 */

function DataTableComponent<T extends TData = TData>({
  data,
}: {
  data: T[];
}): React.JSX.Element {
  // hooks
  const context = useDataTableContext();
  const { table, config, scrollProps, tableState, tableContainerRef, utils } =
    context || {};

  const { columnOrder } = tableState || {};
  const {
    isEmpty,
    checkState,
    handleFetch,
    isSubComponent,
    isManualPagination,
  } = utils || {};

  const {
    isLoading,
    isError,
    headerOptions,
    pagination,
    renderSubComponent,
    renderSubDataTable,
    rowActions,
    rowSelection,
    tableId: tableIdProp,
    title,
    border,
    sx,
    smallAnatomy,
    stateMessage,
    setCurrentRow,
    forceShowMenuActions,
    showFooter,
    showHeader = true,
  } = config || {};

  const tableId = tableIdProp || 'datatable-id';

  // states
  const [hoverColumns, setHoverColumns] = useState<boolean>(false);

  // options
  const headerContainer = headerOptions?.headerContainer;
  const containerWidth = scrollProps?.containerWith || 0;
  const tableWidth = table?.getCenterTotalSize() || 0;

  if (!table) return null as unknown as React.JSX.Element;

  const mode = config?.mode;
  const filteredRowsCount = table.getRowModel()?.rows?.length ?? 0;

  return (
    <TableWrapper
      tableId={tableId}
      title={title}
      border={border}
      isEmpty={isEmpty}
      isFetching={handleFetch}
      headerContainer={headerContainer}
      containerWidth={containerWidth}
      sx={sx}
      mode={mode}
    >
      <div
        id={`${tableId}-container`}
        data-testid="table-container"
        ref={tableContainerRef}
        className={cn(
          'flex flex-col w-full p-0 z-1 h-full overflow-auto bg-table-box-bg',
          border && !title && !headerContainer && 'rounded-t'
        )}
        style={{
          maxHeight: sx?.tableContainer?.maxHeight || '373px', // valid for 6 rows
          ...sx?.tableContainer,
        }}
      >
        <DragDropTableContext
          columnOrder={columnOrder || []}
          setColumnOrder={table.setColumnOrder}
        >
          {/* table component */}
          <div
            role="table"
            id={`${tableId}-table`}
            data-testid="table"
            className="table border-collapse box-border border-spacing-0 border-transparent relative h-full! z-0"
            style={{
              width: `${tableWidth}px`,
              ...sx?.table,
            }}
          >
            {showHeader && (
              <TableHead
                sx={sx}
                tableId={tableId}
                table={table}
                data={data}
                disabled={checkState}
                headerOptions={headerOptions}
                smallAnatomy={smallAnatomy}
                columnOrder={columnOrder || []}
                setHoverColumns={setHoverColumns}
              />
            )}
            {(checkState || filteredRowsCount === 0) && showHeader && (
              <StateTableHandler
                isLoading={isLoading || false}
                isError={isError || false}
                isEmpty={isEmpty || filteredRowsCount === 0}
                containerWith={containerWidth || 0}
                stateMessage={stateMessage}
              />
            )}
            {!checkState && filteredRowsCount > 0 && (
              <div
                role="rowgroup"
                id="data-table-body"
                data-testid="table-body"
                className="z-0 h-full relative"
                style={{
                  ...sx?.tbody,
                }}
              >
                <DragDropContentContext
                  key={'drag-context-body'}
                  columnOrder={columnOrder || []}
                >
                  {table.getRowModel()?.rows?.map((row, index) => {
                    return (
                      <Fragment key={row.id}>
                        <TableRow
                          tableId={tableId}
                          table={table}
                          row={row}
                          index={index}
                          columnOrder={columnOrder || []}
                          isColumn={hoverColumns}
                          rowActions={rowActions}
                          rowSelection={
                            rowSelection || ({} as IRowSelection<TData>)
                          }
                          smallAnatomy={smallAnatomy}
                          forceShowMenuActions={forceShowMenuActions}
                          style={{
                            row: sx?.row,
                            cell: sx?.cell,
                          }}
                          onClick={
                            setCurrentRow
                              ? (e: React.MouseEvent<HTMLTableRowElement>) => {
                                  e.preventDefault();
                                  setCurrentRow(row);
                                }
                              : () => {
                                  // No action when setCurrentRow is not provided
                                }
                          }
                        />
                        {isSubComponent && row?.getIsExpanded() && (
                          <div
                            role="row"
                            data-testid="table-row-expanded"
                            className="datatable-expanded-row sticky left-0 border border-table-divider"
                            style={{
                              width: containerWidth,
                              ...sx?.rowExpanded,
                            }}
                          >
                            <div
                              role="cell"
                              data-testid="table-cell-expanded"
                              className="w-full h-full p-0 relative bg-table-row-expanded-bg"
                            >
                              <div
                                data-testid="table-row-expanded-container"
                                style={{
                                  width: containerWidth,
                                }}
                                className="flex flex-col w-full p-0! box-border relative transition-transform duration-200 [transition-behavior:smooth] [&_div[role='rowheader-fixed']]:hidden! [&_div[role='rowheader']]:visible!"
                              >
                                {renderSubDataTable ? (
                                  <SubComponentDataTable
                                    row={row}
                                    tableId={tableId}
                                    renderSubDataTable={renderSubDataTable}
                                  />
                                ) : (
                                  ((renderSubComponent?.({
                                    row,
                                    columns: table.getAllColumns(),
                                  }) ?? null) as React.ReactNode)
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                      </Fragment>
                    );
                  })}
                </DragDropContentContext>
              </div>
            )}
            {!checkState && showFooter && (
              <Footer
                className={cn(
                  'border-collapse text-indent-initial border-spacing-0 h-14 max-h-14 min-h-14 bg-table-header-bg text-table-secondary-text',
                  smallAnatomy && 'h-10! max-h-10! min-h-10!'
                )}
                sx={{
                  ...sx?.tfoot,
                }}
                table={table}
              />
            )}
          </div>
        </DragDropTableContext>
      </div>
      {!isEmpty && (
        <>
          {!checkState && !isManualPagination && pagination?.showPagination && (
            <Pagination
              tableId={tableId}
              table={table}
              pagination={pagination}
              style={sx?.pagination}
            />
          )}
          {isManualPagination && pagination?.showPagination && (
            <ManualPagination
              manualPagination={
                pagination.manualPagination ||
                (pagination.serverPagination
                  ? {
                      enabled: true,
                      rowCount: pagination.serverPagination.totalCount,
                      pagination: pagination.serverPagination.pagination,
                      setPagination: pagination.serverPagination.setPagination,
                    }
                  : undefined)
              }
              rowsInfo={pagination.rowsInfo}
              hideRecordsSelector={pagination.hideRecordsSelector}
              style={sx?.pagination}
            />
          )}
        </>
      )}
    </TableWrapper>
  );
}

export default memo(DataTableComponent);
