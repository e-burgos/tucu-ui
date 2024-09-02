/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef, Row, Table } from '@tanstack/react-table';

export type TData = Record<string | number | symbol | (string & object), any>;

export type HoverType = { hover: boolean; index: number };

export type OpenType = { open: boolean; index: number };

export type RowActionsType =
  | 'more'
  | 'view'
  | 'edit'
  | 'delete'
  | 'download'
  | 'void';

export type HeaderActionType =
  | 'sort'
  | 'pin-left'
  | 'pin-right'
  | 'visibility'
  | 'drag'
  | 'resize';

export interface SubComponentProps<TData> {
  row?: Row<TData>;
  children?: React.ReactNode;
}

export interface IPaginationOptions {
  showPagination: boolean;
  rowsInfo?: boolean;
  pageIndex?: number;
  pageSize?: number;
  hideRecordsSelector?: boolean;
}

export interface IDataTableStyles {
  wrapper?: React.CSSProperties;
  container?: React.CSSProperties;
  messageContainer?: React.CSSProperties;
  table?: React.CSSProperties;
  thead?: React.CSSProperties;
  tbody?: React.CSSProperties;
  tfoot?: React.CSSProperties;
  header?: React.CSSProperties;
  row?: React.CSSProperties;
  cell?: React.CSSProperties;
  pagination?: React.CSSProperties;
}

export interface HeaderContainerProps<TData> {
  table?: Table<TData>;
  children?: React.ReactNode;
}

export interface IHeaderOptions {
  headerSticky?: boolean;
  headerContainer?: React.ReactNode | null;
  enableHideColumns?: boolean;
  enablePinLeftColumns?: boolean;
  enablePinRightColumns?: boolean;
  enableSortColumns?: boolean;
  enableResizeColumns?: boolean;
  enableDragColumns?: boolean;
  stickyClassName?: string;
  className?: string;
}

export interface IRowActions<TData> {
  action: RowActionsType;
  label: string;
  onClick: (row: Row<TData>) => void;
}

export interface IDataTableStateMessage {
  noData?: string;
  noDataDescription?: string;
  errorData?: string;
  errorDataDescription?: string;
  contactSupport?: string;
  contactSupportLink?: string;
  className?: string;
}
export interface SubComponentDataTableProps extends SubComponentProps<TData> {
  tableId: string;
  data: TData[];
  columns: ColumnDef<any, any>[];
  expandedColumnSize?: number;
}

export interface IRenderSubDataTable {
  columns: ColumnDef<any, any>[];
  data: TData[];
}
