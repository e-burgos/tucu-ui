/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { SubComponentDataTableProps, TData } from '../../common/types';
import useTableColors from '../../hooks/useTableColors';
import DataTable from '../DataTable/DataTable';
import { IOptionalDataTableProps } from '../DataTable/DataTableComponent';
import styles from './sub-component-datatable.module.css';

type IDataTableProps = SubComponentDataTableProps &
  IOptionalDataTableProps<TData>;

const SubComponentDataTable: React.FC<IDataTableProps> = ({
  row,
  tableId,
  data,
  columns,
  expandedColumnSize,
  ...props
}) => {
  const { colors } = useTableColors();

  return (
    <DataTable
      tableId={`${tableId}-${row?.index || 'sub-table'}`}
      smallAnatomy
      data={data}
      columns={columns}
      pagination={{
        pageSize: 5,
        pageIndex: 0,
        showPagination: true,
        hideRecordsSelector: true,
      }}
      headerOptions={{
        headerSticky: false,
        enableDragColumns: false,
        enableResizeColumns: false,
        enablePinLeftColumns: false,
      }}
      border={false}
      stateMessage={{
        className: styles.subComponentDataTable,
      }}
      sx={{
        wrapper: {
          backgroundColor: colors.rowExpandedBg,
          paddingLeft: expandedColumnSize || 50,
        },
        container: {
          backgroundColor: colors.rowExpandedBg,
        },
        header: {
          borderTop: `1px solid ${colors.divider}`,
          backgroundColor: colors.headerExpandedBg,
        },
        row: {
          backgroundColor: colors.rowExpandedBg,
        },
        pagination: {
          backgroundColor: colors.rowExpandedBg,
        },
      }}
      {...props}
    />
  );
};

export default SubComponentDataTable;
