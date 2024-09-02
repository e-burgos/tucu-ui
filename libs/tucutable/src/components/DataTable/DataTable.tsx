/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect } from 'react';
import { ColumnDef, Table } from '@tanstack/react-table';
import { TData } from '../../common/types';
import useDataTable from '../../hooks/useDataTable';
import DataTableComponent, {
  IOptionalDataTableProps,
} from './DataTableComponent';

/**
 * `DataTable` is a React component that displays a table of data with sorting, pagination, and optional subcomponents.
 * This component should only be imported and used directly if the parent component/module is already wrapping the child components 
 * with the necessary parameters provided by `useDataTable` hook.
 * For more information, see the [React Table documentation](https://tanstack.com/react-table/).
 *
 * @component
 * @param {DataTableProps<TData>} props The properties passed to the component.
 * 
 * Parameters for useDataTable hook.
 * @param {string} props.tableId Table ID.
 * @param {ColumnDef<TData, TData>[]} props.columns Array of column definitions.
 * @param {TData[]} props.data Array of data to display.
 * 
 * Optional data table properties.
 * @param {IOptionalDataTableProps} props Optional data table properties.

 * @returns {ReactElement} Returns the data table UI.
 */

export interface DataTableProps<TData> extends IOptionalDataTableProps<TData> {
  tableId: string;
  data: TData[];
  columns: ColumnDef<any, any>[];
  setTableIntance?: (table: Table<TData>) => void;
}

// @ts-ignore
const DataTable: React.FC<DataTableProps<TData>> = ({
  tableId,
  data: defaultData,
  columns: defaultColumns,
  setTableIntance,
  ...props
}) => {
  // hooks
  const { table, data, columnOrder, setColumnOrder } = useDataTable(
    tableId,
    defaultData,
    defaultColumns,
    props?.initialConfig,
  );

  useEffect(() => {
    setTableIntance?.(table);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  return (
    <DataTableComponent
      tableId={tableId}
      table={table}
      data={data}
      columnOrder={columnOrder}
      setColumnOrder={setColumnOrder}
      {...props}
    />
  );
};

export default DataTable;
