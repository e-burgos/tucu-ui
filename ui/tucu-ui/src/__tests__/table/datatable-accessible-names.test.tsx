import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act, fireEvent, within } from '@testing-library/react';
import React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../../datatable';
import { useTheme } from '../../themes/hooks/use-theme';
import type { DataTableProps } from '../../datatable/context';
import type { IRowActions, TData } from '../../datatable/common/types';

interface Person {
  id: string;
  name: string;
}

const people: Person[] = [
  { id: 'p-1', name: 'Ana' },
  { id: 'p-2', name: 'Beto' },
];

const columns = [
  { accessorKey: 'name', header: 'Name' },
] as unknown as ColumnDef<TData, TData>[];

const twoActions: IRowActions<TData>[] = [
  { action: 'edit', label: () => 'Edit', onClick: vi.fn() },
  {
    action: 'delete',
    label: () => 'Delete',
    onClick: vi.fn(),
    showLabelInTooltip: true,
  },
];

const singleAction: IRowActions<TData>[] = [
  { action: 'view', label: () => 'View', onClick: vi.fn() },
];

let tableCounter = 0;

const renderTable = (props: Partial<DataTableProps<TData>> = {}) => {
  tableCounter += 1;
  return render(
    <DataTable
      tableId={`a11y-${tableCounter}`}
      data={people as unknown as TData[]}
      columns={columns}
      {...props}
    />
  );
};

const tableContainer = () => screen.getByTestId('table-container');

describe('DataTable getRowLabel', () => {
  beforeEach(() => act(() => useTheme.setState({ lang: 'en' })));

  it('names every row with the label', () => {
    renderTable({ getRowLabel: (row) => `Person ${row.name}` });
    expect(screen.getByRole('row', { name: 'Person Ana' })).toBeInTheDocument();
    expect(screen.getByRole('row', { name: 'Person Beto' })).toBeInTheDocument();
  });

  it('leaves rows unlabelled by default', () => {
    renderTable();
    screen
      .getAllByTestId('table-row')
      .forEach((row) => expect(row).not.toHaveAttribute('aria-label'));
  });

  it('names the mobile cards', () => {
    renderTable({
      mobileCards: true,
      getRowLabel: (row) => `Person ${row.name}`,
    });
    const cards = document.querySelector('[data-tucu="datatable-cards"]');
    expect(
      within(cards as HTMLElement).getByRole('listitem', { name: 'Person Ana' })
    ).toBeInTheDocument();
  });
});

describe('DataTable getRowId', () => {
  it('exposes the id as data-row-id and keeps the default untouched', () => {
    const { unmount } = renderTable();
    screen
      .getAllByTestId('table-row')
      .forEach((row) => expect(row).not.toHaveAttribute('data-row-id'));
    unmount();

    renderTable({ getRowId: (row) => row.id });
    expect(
      screen.getAllByTestId('table-row').map((row) => row.dataset.rowId)
    ).toEqual(['p-1', 'p-2']);
  });

  it('exposes the id on mobile cards', () => {
    renderTable({ mobileCards: true, getRowId: (row) => row.id });
    const cards = document.querySelectorAll('[data-tucu="datatable-card"]');
    expect(Array.from(cards).map((card) => (card as HTMLElement).dataset.rowId)).toEqual([
      'p-1',
      'p-2',
    ]);
  });
});

describe('DataTable row actions names', () => {
  beforeEach(() => act(() => useTheme.setState({ lang: 'en' })));

  it('appends the row label to the menu trigger', () => {
    renderTable({
      rowActions: twoActions,
      getRowLabel: (row) => row.name,
    });
    expect(
      within(tableContainer()).getByRole('button', { name: 'Row actions Ana' })
    ).toHaveAttribute('aria-haspopup', 'menu');
    expect(
      within(tableContainer()).getByRole('button', { name: 'Row actions Beto' })
    ).toBeInTheDocument();
  });

  it('keeps the legacy trigger name without getRowLabel', () => {
    renderTable({ rowActions: twoActions });
    expect(
      within(tableContainer()).getAllByRole('button', { name: 'Row actions' })
    ).toHaveLength(2);
  });

  it('names menu items by label and tags them with data-action', () => {
    renderTable({ rowActions: twoActions, getRowLabel: (row) => row.name });
    fireEvent.click(
      within(tableContainer()).getByRole('button', { name: 'Row actions Ana' })
    );
    const edit = screen.getByRole('menuitem', { name: 'Edit' });
    const remove = screen.getByRole('menuitem', { name: 'Delete' });
    expect(edit).toHaveAttribute('data-action', 'edit');
    expect(remove).toHaveAttribute('data-action', 'delete');
  });

  it('names the single inline action with its row', () => {
    renderTable({ rowActions: singleAction, getRowLabel: (row) => row.name });
    const button = within(tableContainer()).getByRole('button', {
      name: 'View Ana',
    });
    expect(button).toHaveAttribute('data-action', 'view');
  });

  it('keeps the single inline action name without getRowLabel', () => {
    renderTable({ rowActions: singleAction });
    expect(
      within(tableContainer()).getAllByRole('button', { name: 'View' })
    ).toHaveLength(2);
  });
});
