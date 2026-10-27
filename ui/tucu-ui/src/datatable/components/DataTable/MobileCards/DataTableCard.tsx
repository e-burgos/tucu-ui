'use client';

import React, { useId } from 'react';
import { flexRender, Row, Table } from '@tanstack/react-table';
import { cn } from '../../../common/helpers/cn';
import type {
  HoverType,
  IRowActions,
  IRowSelection,
  TData,
} from '../../../common/types';
import { useTucuMessages } from '../../../../libs/i18n/use-tucu-messages';
import { RowSelection } from '../../RowSelection';
import RowActionsCell from '../TableCell/RowActionsCell';
import type { CardModel } from './cardModel';

export interface DataTableCardProps {
  tableId: string;
  table: Table<TData>;
  row: Row<TData>;
  index: number;
  model: CardModel;
  rowActions?: IRowActions<TData>[];
  rowSelection?: IRowSelection<TData>;
  forceShowMenuActions?: boolean;
  onActivate?: (row: Row<TData>) => void;
  className?: string;
}

const ALWAYS_VISIBLE_ACTIONS: HoverType = { hover: true, index: 0 };
const ignore = () => undefined;
const INTERACTIVE_SELECTOR = 'a,button,input,select,textarea,label';

const stopPropagation = (event: React.SyntheticEvent) =>
  event.stopPropagation();

const CardSelection: React.FC<{
  table: Table<TData>;
  row: Row<TData>;
  rowSelection: IRowSelection<TData>;
  titleId: string;
}> = ({ table, row, rowSelection, titleId }) => {
  const t = useTucuMessages().datatable;
  const isRadio = rowSelection.type === 'radio';

  const selectRadioRow = () => {
    table.setRowSelection({ [row.id]: true });
    rowSelection.getSelection?.([row]);
  };

  return (
    <div
      data-tucu="datatable-card-select"
      className="shrink-0 pt-0.5"
      onClick={stopPropagation}
      onKeyDown={stopPropagation}
    >
      <RowSelection
        type={rowSelection.type}
        aria-label={t.selectRow}
        aria-describedby={titleId}
        checked={row.getIsSelected()}
        disabled={!row.getCanSelect()}
        indeterminate={isRadio ? undefined : row.getIsSomeSelected()}
        onChange={isRadio ? selectRadioRow : row.getToggleSelectedHandler()}
      />
    </div>
  );
};

const DataTableCard: React.FC<DataTableCardProps> = ({
  tableId,
  table,
  row,
  index,
  model,
  rowActions,
  rowSelection,
  forceShowMenuActions,
  onActivate,
  className,
}) => {
  const titleId = useId();
  const { title, subtitle, fields } = model;
  const isSelected = !!rowSelection && row.getIsSelected();

  const activate = () => onActivate?.(row);

  const handleClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const interactive = (event.target as HTMLElement).closest(
      INTERACTIVE_SELECTOR
    );
    if (interactive && event.currentTarget.contains(interactive)) return;
    activate();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLLIElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    activate();
  };

  return (
    <li
      data-tucu="datatable-card"
      data-selected={isSelected || undefined}
      tabIndex={onActivate ? 0 : undefined}
      aria-labelledby={title ? titleId : undefined}
      onClick={onActivate ? handleClick : undefined}
      onKeyDown={onActivate ? handleKeyDown : undefined}
      className={cn(
        'relative flex flex-col gap-3 border p-4 text-table-primary-text transition-colors',
        'rounded-[var(--tucu-datatable-card-radius,var(--tucu-datatable-card-radius-default))]',
        'border-[color:var(--tucu-datatable-card-border,var(--tucu-datatable-card-border-default))]',
        isSelected
          ? 'bg-[color:var(--tucu-datatable-card-selected-bg,var(--tucu-datatable-card-selected-bg-default))]'
          : 'bg-[color:var(--tucu-datatable-card-bg,var(--tucu-datatable-card-bg-default))]',
        onActivate &&
          'cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-table-primary',
        className
      )}
    >
      <div className="flex items-start gap-3">
        {rowSelection && (
          <CardSelection
            table={table}
            row={row}
            rowSelection={rowSelection}
            titleId={titleId}
          />
        )}
        <div className="min-w-0 flex-1">
          {title && (
            <div
              id={titleId}
              data-tucu="datatable-card-title"
              className="break-words text-base font-semibold leading-6"
            >
              {flexRender(title.column.columnDef.cell, title.getContext())}
            </div>
          )}
          {subtitle && (
            <div
              data-tucu="datatable-card-subtitle"
              className="break-words text-sm leading-5 text-[color:var(--tucu-datatable-card-label-fg,var(--tucu-datatable-card-label-fg-default))]"
            >
              {flexRender(
                subtitle.column.columnDef.cell,
                subtitle.getContext()
              )}
            </div>
          )}
        </div>
        {rowActions && (
          <div
            data-tucu="datatable-card-actions"
            className="shrink-0"
            onClick={stopPropagation}
            onKeyDown={stopPropagation}
          >
            <RowActionsCell
              tableId={tableId}
              row={row}
              hoverRow={{ ...ALWAYS_VISIBLE_ACTIONS, index }}
              setHoverRow={ignore}
              setOpenActions={ignore}
              rowActions={rowActions}
              forceShowMenuActions={forceShowMenuActions}
            />
          </div>
        )}
      </div>
      {fields.length > 0 && (
        <dl className="m-0 flex flex-col gap-2">
          {fields.map(({ cell, header }) => (
            <div
              key={cell.id}
              data-tucu="datatable-card-field"
              className="flex items-baseline justify-between gap-3 text-sm"
            >
              <dt className="m-0 shrink-0 font-medium text-[color:var(--tucu-datatable-card-label-fg,var(--tucu-datatable-card-label-fg-default))]">
                {flexRender(header.column.columnDef.header, header.getContext())}
              </dt>
              <dd className="m-0 min-w-0 break-words text-right">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </li>
  );
};

export default DataTableCard;
