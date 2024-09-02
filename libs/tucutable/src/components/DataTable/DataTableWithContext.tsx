/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { useDataTableProvider } from '../../context/DataTableContext';
import DataTableComponent, {
  IOptionalDataTableProps,
} from './DataTableComponent';

/**
 * `DataTableWithContext` is a React component that displays a table of data with sorting, pagination, and optional subcomponents.
 * This component should only be imported inside within the DataTableContext context using the DataTableProvider provider to be 
 * able to take the data and columns necessary for its rendering. The main idea of this implementation is to share the table 
 * instance provided by the provider with other isolated components.
 * For more information, see the [React Table documentation](https://tanstack.com/react-table/).
 *
 * @component
 * @param {DataTableProps<TData>} props The properties passed to the component.
 * 
 * Parameters for useDataTableProvider hook.
 * @param {string} props.tableId Table ID.
 * 
 * Optional data table properties.
 * @param {IOptionalDataTableProps<TData>} props Optional data table properties.

 * @returns {ReactElement} Returns the data table UI.
 */

export interface DataTableWithContextProps<TData>
  extends IOptionalDataTableProps<TData> {
  tableId?: string;
}

// @ts-ignore
const DataTableWithContext: React.FC<DataTableWithContextProps<TData>> = ({
  tableId,
  ...props
}) => {
  const {
    tableId: contextTableId,
    table,
    data,
    columnOrder,
    setColumnOrder,
  } = useDataTableProvider();

  return (
    <DataTableComponent
      tableId={tableId || contextTableId}
      table={table}
      data={data}
      columnOrder={columnOrder}
      setColumnOrder={setColumnOrder}
      {...props}
    />
  );
};

export default DataTableWithContext;
