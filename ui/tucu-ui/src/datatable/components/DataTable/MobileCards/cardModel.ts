import type { Cell, Header, Row, Table } from '@tanstack/react-table';
import { ExpandedColumn } from '../../../common/helpers/ExpandedColumn';
import { RowActionsColumn } from '../../../common/helpers/RowActionsColumn';
import { RowSelectionColumn } from '../../../common/helpers/RowSelectionColumn';
import type { TData } from '../../../common/types';
import type { ResolvedMobileCards } from './breakpoints';

export interface CardField {
  cell: Cell<TData, unknown>;
  header: Header<TData, unknown>;
}

export interface CardModel {
  title?: Cell<TData, unknown>;
  subtitle?: Cell<TData, unknown>;
  fields: CardField[];
}

const STRUCTURAL_COLUMN_IDS = new Set<string>([
  RowActionsColumn.id as string,
  RowSelectionColumn.id as string,
  ExpandedColumn.id as string,
]);

export function hasHeaderContent(header: unknown): boolean {
  if (typeof header === 'function') return true;
  return header !== undefined && header !== null && header !== '' && header !== false;
}

export function headersByColumnId(
  table: Table<TData>
): Map<string, Header<TData, unknown>> {
  return new Map(
    table.getLeafHeaders().map((header) => [header.column.id, header])
  );
}

export function buildCardModel(
  row: Row<TData>,
  headers: Map<string, Header<TData, unknown>>,
  options: ResolvedMobileCards
): CardModel {
  const hidden = new Set(options.hiddenColumnIds);
  const cells = row
    .getVisibleCells()
    .filter(
      (cell) =>
        !STRUCTURAL_COLUMN_IDS.has(cell.column.id) &&
        !hidden.has(cell.column.id)
    );

  const title =
    cells.find((cell) => cell.column.id === options.titleColumnId) ?? cells[0];
  const subtitle = cells.find(
    (cell) => cell.column.id === options.subtitleColumnId && cell !== title
  );

  const fields = cells.reduce<CardField[]>((acc, cell) => {
    if (cell === title || cell === subtitle) return acc;
    const header = headers.get(cell.column.id);
    if (!header || !hasHeaderContent(cell.column.columnDef.header)) return acc;
    acc.push({ cell, header });
    return acc;
  }, []);

  return { title, subtitle, fields };
}
