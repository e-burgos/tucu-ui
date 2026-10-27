'use client';

import React from 'react';
import type { Row, Table } from '@tanstack/react-table';
import { cn } from '../../../common/helpers/cn';
import type {
  IDataTableStateMessage,
  IRowActions,
  IRowSelection,
  TData,
} from '../../../common/types';
import { useTucuMessages } from '../../../../libs/i18n/use-tucu-messages';
import DataTableCard from './DataTableCard';
import { MOBILE_CARDS_CLASSES, ResolvedMobileCards } from './breakpoints';
import { buildCardModel, headersByColumnId } from './cardModel';

export interface DataTableCardsProps {
  tableId: string;
  table: Table<TData>;
  options: ResolvedMobileCards;
  isLoading?: boolean;
  isError?: boolean;
  stateMessage?: IDataTableStateMessage;
  rowActions?: IRowActions<TData>[];
  rowSelection?: IRowSelection<TData>;
  forceShowMenuActions?: boolean;
  onRowClick?: (row: Row<TData>) => void;
}

const SKELETON_CARD_COUNT = 3;

const CardsSkeleton: React.FC = () => (
  <ul
    role="list"
    aria-busy="true"
    data-tucu="datatable-cards-loading"
    className="m-0 flex list-none flex-col gap-3 p-0"
  >
    {Array.from({ length: SKELETON_CARD_COUNT }, (_, index) => (
      <li
        key={index}
        aria-hidden="true"
        className="flex animate-pulse flex-col gap-3 rounded-xl border border-table-divider p-4"
      >
        <div className="h-5 w-2/3 rounded bg-table-row-hover" />
        <div className="h-4 w-full rounded bg-table-row-hover" />
        <div className="h-4 w-5/6 rounded bg-table-row-hover" />
      </li>
    ))}
  </ul>
);

const CardsMessage: React.FC<{
  kind: 'empty' | 'error';
  stateMessage?: IDataTableStateMessage;
}> = ({ kind, stateMessage }) => {
  const t = useTucuMessages().datatable;
  const isError = kind === 'error';
  const title = isError
    ? stateMessage?.errorData || t.errorData
    : stateMessage?.noData || t.noData;
  const description = isError
    ? stateMessage?.errorDataDescription || t.errorDataDescription
    : stateMessage?.noDataDescription || t.noDataDescription;

  return (
    <div
      role={isError ? 'alert' : 'status'}
      data-tucu={isError ? 'datatable-cards-error' : 'datatable-cards-empty'}
      className={cn(
        'flex flex-col items-center gap-2 px-4 py-8 text-center',
        stateMessage?.className
      )}
    >
      <h6 className="m-0 text-lg font-bold leading-6 text-table-primary-text">
        {title}
      </h6>
      <p className="m-0 text-sm leading-5 text-table-secondary-text">
        {description}
      </p>
    </div>
  );
};

const DataTableCards: React.FC<DataTableCardsProps> = ({
  tableId,
  table,
  options,
  isLoading,
  isError,
  stateMessage,
  rowActions,
  rowSelection,
  forceShowMenuActions,
  onRowClick,
}) => {
  const t = useTucuMessages().datatable;
  const rows = table.getRowModel().rows;
  const headers = headersByColumnId(table);
  const renderContent = () => {
    if (isLoading) return <CardsSkeleton />;
    if (isError) return <CardsMessage kind="error" stateMessage={stateMessage} />;
    if (rows.length === 0)
      return <CardsMessage kind="empty" stateMessage={stateMessage} />;
    return (
      <ul
        role="list"
        aria-label={t.rows}
        data-tucu="datatable-cards-list"
        className="m-0 flex list-none flex-col gap-3 p-0"
      >
        {rows.map((row, index) => (
          <DataTableCard
            key={row.id}
            tableId={tableId}
            table={table}
            row={row}
            index={index}
            model={buildCardModel(row, headers, options)}
            rowActions={rowActions}
            rowSelection={rowSelection}
            forceShowMenuActions={forceShowMenuActions}
            onActivate={onRowClick}
            className={options.className}
          />
        ))}
      </ul>
    );
  };

  return (
    <div
      data-tucu="datatable-cards"
      className={cn(
        'w-full bg-table-box-bg p-3',
        MOBILE_CARDS_CLASSES[options.breakpoint].cardsOnly
      )}
    >
      {renderContent()}
    </div>
  );
};

export default DataTableCards;
