/* eslint-disable jsx-a11y/aria-role */
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { ColumnOrderState, Table } from '@tanstack/react-table';
import styles from '../../../common/styles/main.module.css';
import { IDataTableStyles, IHeaderOptions } from '../../../common/types';
import DragDropContentContext from '../../../context/DragDropContentContext';
import useHeaderSticky from '../../../hooks/useHeaderSticky';
import useScrollableTable from '../../../hooks/useScrollableTable';
import useTableColors from '../../../hooks/useTableColors';
import TableHeader from '../TableHeader';

export interface TableHeadProps<TData> {
  sx?: IDataTableStyles;
  tableId: string;
  table: Table<TData>;
  data: TData[];
  columnOrder: ColumnOrderState;
  headerSticky: boolean;
  smallAnatomy?: boolean;
  headerOptions?: IHeaderOptions;
  disabled?: boolean;
  setHoverColumns: (value: boolean) => void;
}

// @ts-ignore
const TableHead: React.FC<TableHeadProps<TData>> = ({
  sx,
  tableId,
  table,
  columnOrder,
  headerSticky,
  smallAnatomy,
  headerOptions,
  disabled,
  setHoverColumns,
}) => {
  // hooks
  const { colors } = useTableColors();
  const { headerAnimation, headerFixed } = useHeaderSticky(tableId);
  const { containerWith, isScrollable, handleScroll } =
    useScrollableTable(tableId);

  return (
    <>
      {headerSticky && headerFixed && (
        <thead
          id={`${tableId}-header-fixed`}
          role="rowheader-fixed"
          onScroll={handleScroll}
          onMouseEnter={() => setHoverColumns(true)}
          onMouseLeave={() => setHoverColumns(false)}
          className={`
            ${styles.header} 
            ${styles.headerFixed} 
            ${headerAnimation} 
            ${headerOptions?.stickyClassName}
            `}
          style={{
            display: isScrollable ? 'block' : 'table',
            width: containerWith,
            backgroundColor: colors.headerBg,
            color: colors.primaryText,
            borderBottom: `1px solid ${colors.divider}`,
            ...sx?.thead,
          }}
        >
          <DragDropContentContext columnOrder={columnOrder}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                style={{
                  ...sx?.header,
                }}
              >
                {headerGroup.headers.map((header, index) => {
                  return (
                    <TableHeader
                      key={header.id}
                      index={index}
                      header={header}
                      headerGroup={headerGroup}
                      headerOptions={headerOptions}
                      disabled={disabled}
                      style={sx?.header}
                    />
                  );
                })}
              </tr>
            ))}
          </DragDropContentContext>
        </thead>
      )}
      <thead
        id={`${tableId}-header`}
        role="rowheader"
        onMouseEnter={() => setHoverColumns(true)}
        onMouseLeave={() => setHoverColumns(false)}
        className={`
          ${styles.header} 
          ${smallAnatomy && styles.smallHeader}
          ${headerOptions?.className}`}
        style={{
          visibility: headerSticky && headerFixed ? 'hidden' : 'visible',
          backgroundColor: colors.headerBg,
          color: colors.primaryText,
          ...sx?.thead,
        }}
      >
        <DragDropContentContext columnOrder={columnOrder}>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} style={{ ...sx?.header }}>
              {headerGroup.headers.map((header, index) => {
                return (
                  <TableHeader
                    key={header.id}
                    index={index}
                    header={header}
                    headerGroup={headerGroup}
                    headerOptions={headerOptions}
                    disabled={disabled}
                    style={sx?.header}
                  />
                );
              })}
            </tr>
          ))}
        </DragDropContentContext>
      </thead>
    </>
  );
};

export default TableHead;
