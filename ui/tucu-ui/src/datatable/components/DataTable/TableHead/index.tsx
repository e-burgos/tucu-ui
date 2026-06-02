import { ColumnOrderState, Table } from '@tanstack/react-table';
import { cn } from '../../../common/helpers/cn';
import { IDataTableStyles, IHeaderOptions } from '../../../common/types';
import DragDropContentContext from '../../../context/DragDropContentContext';
import TableHeader from '../TableHeader';

/**
 * Props for the TableHead component.
 *
 * @category libs/datatable
 * @subcategory Components
 *
 * @property {IDataTableStyles} sx - The styles for the table head.
 * @property {string} tableId - The id of the table.
 * @property {Table<TData>} table - The table instance.
 * @property {Array<TData>} data - The data to be displayed in the table.
 * @property {ColumnOrderState} columnOrder - The order of the columns.
 * @property {boolean} smallAnatomy - Whether the table is in small anatomy mode.
 * @property {IHeaderOptions} headerOptions - The options for the header.
 * @property {boolean} disabled - Whether the table is disabled.
 * @property {function(boolean): void} setHoverColumns - The function to set the hover columns.
 *
 * @template TData - The type of the data in the table.
 */

export interface TableHeadProps<TData> {
  sx?: IDataTableStyles;
  tableId: string;
  table: Table<TData>;
  data: TData[];
  columnOrder: ColumnOrderState;
  smallAnatomy?: boolean;
  headerOptions?: IHeaderOptions;
  disabled?: boolean;
  setHoverColumns: (value: boolean) => void;
}

function TableHead<TData>({
  sx,
  tableId,
  table,
  columnOrder,
  smallAnatomy,
  headerOptions,
  disabled,
  setHoverColumns,
}: TableHeadProps<TData>) {
  return (
    <div
      id={`${tableId}-header`}
      data-testid="table-header"
      onMouseEnter={() => setHoverColumns(true)}
      onMouseLeave={() => setHoverColumns(false)}
      className={cn([
        'box-border border-collapse border-spacing-0 text-table-primary-text sticky top-0 z-1',
        smallAnatomy
          ? 'h-10 max-h-10 min-h-10'
          : 'h-[52px] max-h-[52px] min-h-[52px]',
        headerOptions?.className,
      ])}
      style={sx?.thead}
    >
      <DragDropContentContext
        key={'drag-context-header'}
        columnOrder={columnOrder}
      >
        {table.getHeaderGroups().map((headerGroup) => (
          <div
            key={headerGroup.id}
            role="rowgroup"
            data-testid="table-rowgroup"
            className="flex items-center h-full max-h-full min-h-full bg-table-header-bg border-b border-table-divider"
            style={sx?.header}
          >
            {headerGroup.headers
              .filter((header) => header.column.getIsVisible()) // filter only visible columns
              .map((header, index) => {
                return (
                  <TableHeader
                    key={`${header.id}-${index}`}
                    index={index}
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    header={header as any}
                    headerOptions={headerOptions}
                    disabled={disabled}
                    style={sx?.header}
                    tableId={tableId}
                  />
                );
              })}
          </div>
        ))}
      </DragDropContentContext>
    </div>
  );
}

export default TableHead;
