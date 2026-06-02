/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Column,
  ColumnDef,
  PaginationState,
  Row,
  Table,
  SortingState,
} from '@tanstack/react-table';

/**
 * Represents a generic data record.
 *
 * @category libs/datatable
 * @subcategory Types
 */
export type TData = Record<string | number | symbol | (string & object), any>;

/**
 * Represents the hover state of a row.
 *
 * @category libs/datatable
 * @subcategory Types
 */
export type HoverType = {
  /** Whether the row is hovered. */
  hover: boolean;
  /** Index of the row. */
  index: number;
};

/**
 * Represents the open state of a row.
 *
 * @category libs/datatable
 * @subcategory Types
 */
export type OpenType = {
  /** Whether the row is open. */
  open: boolean;
  /** Index of the row. */
  index: number;
};

/**
 * Enum type for row actions.
 *
 * @category libs/datatable
 * @subcategory Types
 */
export type RowActionsType =
  | 'more'
  | 'open-new-tab'
  | 'view'
  | 'edit'
  | 'delete'
  | 'download'
  | 'void';

/**
 * Enum type for header actions.
 *
 * @category libs/datatable
 * @subcategory Types
 */
export type HeaderActionType =
  | 'sort'
  | 'pin-left'
  | 'pin-right'
  | 'visibility'
  | 'drag'
  | 'resize';

/**
 * Options for manual pagination.
 *
 * @category libs/datatable
 * @subcategory Types
 */
export interface IManualPaginationOptions {
  /** Whether manual pagination is enabled. */
  enabled: boolean;
  /** Total row count. */
  rowCount: number;
  /** Current pagination state. */
  pagination: PaginationState;
  /** Function to update pagination state. */
  setPagination: (value: PaginationState) => void;
}

/**
 * Options for pagination in the data table.
 *
 * @category libs/datatable
 * @subcategory Types
 */
export interface IPaginationOptions {
  /** Whether to show pagination controls. */
  showPagination: boolean;
  /** Whether to display row information. */
  rowsInfo?: boolean;
  /** The current page index. */
  pageIndex?: number;
  /** Number of rows per page. */
  pageSize?: number;
  /** Total number of rows available. */
  totalCount?: number;
  /** Whether to hide the records selector. */
  hideRecordsSelector?: boolean;
  /** Manual pagination configuration. */
  manualPagination?: IManualPaginationOptions;
  /** Server-side pagination configuration. */
  serverPagination?: IServerPagination;
  /** Whether to take default pagination settings. */
  takeDefaultPagination?: boolean;
}

/**
 * Interface representing the styles for various components of a data table.
 * Each property is optional and can be used to customize the CSS properties
 * of the corresponding component.
 *
 * @category libs/datatable
 * @subcategory Types
 */
export interface IDataTableStyles {
  /** Styles for the wrapper element. */
  wrapper?: React.CSSProperties;
  /** Styles for the wrapper container element. */
  wrapperContainer?: React.CSSProperties;
  /** Styles for the table container element. */
  tableContainer?: React.CSSProperties;
  /** Styles for the message container element. */
  messageContainer?: React.CSSProperties;
  /** Styles for the table element. */
  table?: React.CSSProperties;
  /** Styles for the table header (thead) element. */
  thead?: React.CSSProperties;
  /** Styles for the table body (tbody) element. */
  tbody?: React.CSSProperties;
  /** Styles for the table footer (tfoot) element. */
  tfoot?: React.CSSProperties;
  /** Styles for the header element. */
  header?: React.CSSProperties;
  /** Styles for the table row element. */
  row?: React.CSSProperties;
  /** Styles for the expanded table row element. */
  rowExpanded?: React.CSSProperties;
  /** Styles for the table cell element. */
  cell?: React.CSSProperties;
  /** Styles for the pagination element. */
  pagination?: React.CSSProperties;
  /** Styles for the container element. */
  container?: React.CSSProperties;
}

/**
 * Props for the header container component.
 * @template TData
 *
 * @category libs/datatable
 * @subcategory Props
 */
export interface HeaderContainerProps<TData> {
  /** The table instance. */
  table?: Table<TData>;
  /** React children nodes. */
  children?: React.ReactNode;
}

/**
 * Interface representing the options for configuring the header of a data table.
 *
 * @category libs/datatable
 * @subcategory Types
 */
export interface IHeaderOptions {
  /** Optional custom React node to be used as the header container. */
  headerContainer?: React.ReactNode | null;
  /** Flag to enable or disable the ability to hide columns. */
  enableHideColumns?: boolean;
  /** Flag to enable or disable the ability to pin columns to the left. */
  enablePinLeftColumns?: boolean;
  /** Flag to enable or disable the ability to pin columns to the right. */
  enablePinRightColumns?: boolean;
  /** Flag to enable or disable the ability to sort columns. */
  enableSortColumns?: boolean;
  /** Flag to enable or disable the ability to resize columns. */
  enableResizeColumns?: boolean;
  /** Flag to enable or disable the ability to drag columns. */
  enableDragColumns?: boolean;
  /** Optional custom class name to be applied to the header. */
  className?: string;
}

/**
 * Defines row actions and their behavior.
 * @template TData
 *
 * @category libs/datatable
 * @subcategory Types
 */
export interface IRowActions<TData> {
  /** The type of row action. */
  action: RowActionsType;
  /** Function to determine visibility of options. */
  showOptions?: (row: Row<TData>) => boolean;
  /** Function to get the action label. */
  label: (row: Row<TData>) => string;
  /** Function to execute on action click. */
  onClick: (row: Row<TData>) => void;
  /** Required scopes for the action. */
  requiredScopes?: Array<string> | string;
  /** Function to determine if action is disabled. */
  disabled?: (row: Row<TData>) => boolean;
  /** Function to determine if action is hidden. */
  hidden?: (row: Row<TData>) => boolean;
  /** Whether to show the label in a tooltip. */
  showLabelInTooltip?: boolean;
}

/**
 * Defines row selection options.
 * @template TData
 *
 * @category libs/datatable
 * @subcategory Types
 */
export interface IRowSelection<TData> {
  /** Selection type (checkbox or radio). */
  type: 'checkbox' | 'radio';
  /** Function to get selected rows. */
  getSelection?: (row: Array<Row<TData>>) => void;
}

/**
 * Interface representing a tag.
 *
 * @category libs/datatable
 * @subcategory Types
 */

export type DataTableTag = {
  id: string;
  name: string;
};

/**
 * Interface representing the state messages for a data table.
 *
 * @category libs/datatable
 * @subcategory Types
 */
export interface IDataTableStateMessage {
  /** Message to display when there is no data. */
  noData?: string;
  /** Description to display when there is no data. */
  noDataDescription?: string;
  /** Message to display when there is an error with the data. */
  errorData?: string;
  /** Description to display when there is an error with the data. */
  errorDataDescription?: string;
  /** Message to prompt the user to contact support. */
  contactSupport?: string;
  /** Link to contact support. */
  contactSupportLink?: string;
  /** Flag to hide the contact support message. */
  hideContactSupport?: boolean;
  /** Additional CSS class names to apply to the message container. */
  className?: string;
}

/**
 * Defines props for rendering a sub-data table.
 *
 * @category libs/datatable
 * @subcategory Types
 */
export interface IRenderSubDataTable {
  /** Column definitions for the sub-data table. */
  columns: Array<ColumnDef<any, any>>;
  /** Data for the sub-data table. */
  data: Array<TData>;
  /** Expanded column size. */
  expandedColumnSize?: number;
}

/**
 * State for manual pagination.
 *
 * @category libs/datatable
 * @subcategory Types
 */
export interface ManualPaginationState {
  /** Whether manual pagination is enabled. */
  enabled: boolean;
  /** Total row count. */
  rowCount: number;
  /** Current pagination state (pageIndex and pageSize). */
  pagination?: PaginationState;
}

/**
 * Interface representing server-side pagination configuration.
 *
 * @category libs/datatable
 * @subcategory Types
 */
export interface IServerPagination {
  /** Optional search filter string used to filter the data. */
  searchFilter?: string;
  /** Total count of items available on the server. */
  totalCount: number;
  /** Current pagination state. */
  pagination: PaginationState;
  /** Function to update the pagination state.
   * @param value - The new pagination state. */
  setPagination: (value: PaginationState) => void;
}

/**
 * Props for a sub-component within a data table.
 *
 * @category libs/datatable
 * @subcategory Props
 *
 * @template TData - The data type used in the table.
 * @property {Row<TData>} [row] - The row data associated with the sub-component.
 * @property {string} [tableId] - Unique identifier for the table.
 * @property {Array<Column<TData>>} [columns] - The column definitions for the subcomponent.
 * @property {React.ReactNode} [children] - Child components to be rendered inside the subcomponent.
 */
export interface SubComponentProps<TData> {
  row?: Row<TData>;
  tableId?: string;
  columns?: Array<Column<TData>>;
  children?: React.ReactNode;
}

/**
 * Optional properties for configuring a data table.
 *
 * @category libs/datatable
 * @subcategory Props
 *
 * @template TData The type of data used in the table.
 *
 * @property {IDataTableStyles} [sx] - Custom styles for the data table.
 * @property {Partial<ColumnDef<TData, unknown>>} [initialConfig] - Initial configuration for the table columns.
 * @property {boolean} [isLoading] - Indicates if the table is in a loading state.
 * @property {boolean} [isError] - Indicates if there was an error fetching data.
 * @property {boolean} [isFetching] - Indicates if data is currently being fetched.
 * @property {IPaginationOptions} [pagination] - Pagination options for the table.
 * @property {string} [title] - Title of the data table.
 * @property {boolean} [border] - Whether to display a border around the table.
 * @property {IHeaderOptions} [headerOptions] - Options for configuring the table header.
 * @property {boolean} [smallAnatomy] - Enables a smaller table layout.
 * @property {boolean} [showFooter] - Whether to display the table footer.
 * @property {IDataTableStateMessage} [stateMessage] - Custom state message for the table.
 * @property {Array<IRowActions<TData>>} [rowActions] - Actions available for each row in the table.
 * @property {IRowSelection<TData>} [rowSelection] - Configuration for row selection behavior.
 * @property {boolean} [forceShowMenuActions] - Forces the display of menu actions.
 * @property {React.FC<SubComponentProps<TData>> | null} [renderSubComponent] - Function to render a sub-component inside a row.
 * @property {IRenderSubDataTable} [renderSubDataTable] - Function to render a nested data table inside a row.
 * @property {function(Row<TData>): void} [setCurrentRow] - Callback to set the currently selected row.
 * @property {boolean} [enableMultiSort] - Whether multi-column sorting is enabled.
 * @property {boolean} [manualSorting] - Whether sorting is handled manually.
 * @property {function(SortingState): void} [onSortModelChange] - Callback triggered when the sorting model changes.
 */
export interface IOptionalDataTableProps<TData> {
  sx?: IDataTableStyles;
  initialConfig?: Partial<ColumnDef<TData, unknown>>;
  isLoading?: boolean;
  isError?: boolean;
  isFetching?: boolean;
  pagination?: IPaginationOptions;
  title?: string;
  border?: boolean;
  headerOptions?: IHeaderOptions;
  smallAnatomy?: boolean;
  showFooter?: boolean;
  stateMessage?: IDataTableStateMessage;
  rowActions?: Array<IRowActions<TData>>;
  rowSelection?: IRowSelection<TData>;
  forceShowMenuActions?: boolean;
  renderSubComponent?: React.FC<SubComponentProps<TData>> | null;
  renderSubDataTable?: IRenderSubDataTable;
  setCurrentRow?: (row: Row<TData>) => void;
  enableMultiSort?: boolean;
  manualSorting?: boolean;
  onSortModelChange?: (model: SortingState) => void;
  enableHideColumns?: boolean;
  searchableColumns?: string[];
  rightActions?: React.ReactNode;
}

/**
 * Props for a SubComponent that includes a nested data table.
 *
 * @category libs/datatable
 * @subcategory Props
 *
 * @template T - The type of data used in the table.
 *
 * @property {string} tableId - Unique identifier for the table.
 * @property {IRenderSubDataTable} renderSubDataTable - Function to render a nested data table inside a row.
 *
 * @extends SubComponentProps<T>
 */
export interface SubComponentDataTableProps<T = TData>
  extends SubComponentProps<T> {
  tableId: string;
  renderSubDataTable: IRenderSubDataTable;
}

/**
 * Interface representing the options to enable various row features in a data table.
 *
 * @category libs/datatable
 * @subcategory Types
 *
 * @property {boolean} [rowActions] - Indicates whether row actions are enabled.
 * @property {boolean} [rowSelection] - Indicates whether row selection is enabled.
 * @property {boolean} [renderSubDataTable] - Indicates whether a sub-data table should be rendered.
 * @property {boolean} [renderSubComponent] - Indicates whether a sub-component should be rendered.
 */
export interface EnableRows {
  rowActions?: boolean;
  rowSelection?: boolean;
  renderSubDataTable?: boolean;
  renderSubComponent?: boolean;
}

export type ReportDataState = {
  headers: Map<number, string>;
  rows: Map<string, Map<number, string>>;
};

/**
 * Interface representing the options to enable various row features in a data table.
 * @template TData
 *
 * @category libs/datatable
 * @subcategory Types
 *
 * @property {string} tableId - Unique identifier for the table.
 * @property {Array<TData>} defaultData - Default data for the table.
 * @property {Array<ColumnDef<any, any>>} defaultColumns - Default columns for the table.
 * @property {EnableRows | false} enableRows - Options to enable various row features.
 * @property {Partial<ColumnDef<TData, unknown>>} initialConfig - Initial configuration for the table columns.
 * @property {React.ReactNode} children - Child components to be rendered inside the table.
 * @property {IHeaderOptions} headerOptions - Options for configuring the table header.
 */
export interface DataTableProviderProps {
  tableId: string;
  defaultData: Array<TData>;
  defaultColumns: Array<ColumnDef<any, any>>;
  enableRows: EnableRows | false;
  initialConfig?: Partial<ColumnDef<TData, unknown>>;
  children?: React.ReactNode;
  headerOptions?: IHeaderOptions;
}
