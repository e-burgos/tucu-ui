import React from 'react';
import {
  IOptionalDataTableProps,
  SubComponentDataTableProps,
  TData,
} from '../../../common/types';
import DataTable from '../DataTable';

/**
 * Props for the SubComponentDataTable component.
 *
 * @category libs/datatable
 * @subcategory Components
 *
 * @property {TData} row - The row data.
 * @property {string} tableId - The id of the table.
 * @property {React.ReactNode} renderSubDataTable - The sub-table to render.
 * @property {IOptionalDataTableProps<TData>} props - The props for the DataTable component.
 *
 * @template TData - The type of the data in the table.
 */

type IDataTableProps = SubComponentDataTableProps &
  IOptionalDataTableProps<TData>;

const SubComponentDataTable: React.FC<IDataTableProps> = ({
  row,
  tableId,
  renderSubDataTable,
  ...props
}) => {
  return (
    <DataTable
      tableId={`${tableId}-${row?.index || 'sub-table'}`}
      smallAnatomy
      data={renderSubDataTable.data}
      columns={renderSubDataTable.columns}
      pagination={{
        pageSize: 5,
        pageIndex: 0,
        showPagination: true,
        hideRecordsSelector: true,
        takeDefaultPagination: true,
        ...props.pagination,
      }}
      headerOptions={{
        enableDragColumns: false,
        enableResizeColumns: false,
        enablePinLeftColumns: false,
        ...props.headerOptions,
      }}
      border={false}
      stateMessage={{
        className: '[&_tr]:top-[52px]',
        ...props.stateMessage,
      }}
      sx={{
        wrapper: {
          backgroundColor: 'var(--color-table-row-expanded-bg)',
        },
        wrapperContainer: {
          backgroundColor: 'transparent',
        },
        tableContainer: {
          paddingLeft:
            renderSubDataTable?.expandedColumnSize === 0
              ? 0
              : renderSubDataTable?.expandedColumnSize || 50,
        },
        header: {
          borderTop: '1px solid var(--color-table-divider)',
        },
      }}
      {...props}
    />
  );
};

export default SubComponentDataTable;
