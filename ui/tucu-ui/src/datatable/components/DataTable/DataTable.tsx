import React, { memo } from 'react';
import { DataTableProps, DataTableProvider } from '../../context/index';
import DataTableComponent from './DataTableComponent/index';

/**
 * DataTable component for rendering a data table with customizable columns, sorting, and other features. This component is a wrapper around the DataTableComponent, which is the actual table implementation.
 *
 * @category libs/datatable
 * @subcategory Components
 *
 * @component
 * @template TData - The type of data used in the table.
 * @extends IOptionalDataTableProps<TData> - Extends the optional properties for the data table.
 * @param {DataTableProps<TData>} props The properties passed to the component.
 *
 * Parameters for useDataTable hook.
 * @param {string} props.tableId Table ID.
 * @param {Array<ColumnDef<TData, TData>>} props.columns Array of column definitions.
 * @param {Array<TData>} props.data Array of data to display.
 * @param {function(SortingState): void} props.onSortModelChange Function to handle sort model changes.
 * @param {boolean} props.enableMultiSort Whether multi-sorting is enabled.
 * @param {string} props.title Title of the data table.
 *
 * @returns {ReactElement} Returns the data table UI.
 */

function DataTable<TData>(props: DataTableProps<TData>): React.JSX.Element {
  return (
    <DataTableProvider {...props}>
      <DataTableComponent data={props.data as DataTableProps<TData>[]} />
    </DataTableProvider>
  );
}

export default memo(DataTable) as typeof DataTable;
