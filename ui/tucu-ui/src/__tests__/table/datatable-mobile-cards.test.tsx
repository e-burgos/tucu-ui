import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act, fireEvent, within } from '@testing-library/react';
import React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../../datatable';
import { useTheme } from '../../themes/hooks/use-theme';
import type { DataTableProps } from '../../datatable/context';
import type { TData } from '../../datatable/common/types';

interface Person {
  name: string;
  role: string;
  email: string;
  note: string;
}

const people: Person[] = [
  { name: 'Ana', role: 'Admin', email: 'ana@x.io', note: 'n1' },
  { name: 'Beto', role: 'Editor', email: 'beto@x.io', note: 'n2' },
  { name: 'Cleo', role: 'Viewer', email: 'cleo@x.io', note: 'n3' },
  { name: 'Dana', role: 'Admin', email: 'dana@x.io', note: 'n4' },
  { name: 'Eli', role: 'Editor', email: 'eli@x.io', note: 'n5' },
];

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'role', header: 'Role' },
  { accessorKey: 'email', header: 'Email' },
  { id: 'note', accessorKey: 'note', header: '' },
] as unknown as ColumnDef<TData, TData>[];

let tableCounter = 0;

const renderTable = (props: Partial<DataTableProps<TData>> = {}) => {
  tableCounter += 1;
  return render(
    <DataTable
      tableId={`cards-${tableCounter}`}
      data={people as unknown as TData[]}
      columns={columns}
      pagination={{ showPagination: true, pageSize: 2, takeDefaultPagination: true }}
      {...props}
    />
  );
};

const cardsRoot = () =>
  document.querySelector('[data-tucu="datatable-cards"]') as HTMLElement;

const cards = () =>
  within(cardsRoot()).queryAllByRole('listitem') as HTMLElement[];

describe('DataTable mobileCards', () => {
  beforeEach(() => {
    localStorage.clear();
    act(() => useTheme.setState({ lang: 'en' }));
  });

  describe('off by default', () => {
    it('renders only the table', () => {
      renderTable();
      expect(cardsRoot()).toBeNull();
      expect(screen.queryByRole('navigation')).toBeNull();
      expect(screen.getByTestId('table-container').className).not.toMatch(
        /\bhidden\b/
      );
    });

    it('keeps the regular pagination unwrapped', () => {
      renderTable();
      const range = screen.getByText('1-2 of 5');
      expect(range.closest('.hidden')).toBeNull();
    });
  });

  describe('markup', () => {
    it('renders the table and the card list, switched by breakpoint classes', () => {
      renderTable({ mobileCards: true });
      expect(screen.getByTestId('table-container').className).toContain(
        'hidden md:flex'
      );
      expect(cardsRoot().className).toContain('md:hidden');
      expect(cards()).toHaveLength(2);
    });

    it.each(['sm', 'lg'] as const)('honours the %s breakpoint', (breakpoint) => {
      renderTable({ mobileCards: { breakpoint } });
      expect(screen.getByTestId('table-container').className).toContain(
        `hidden ${breakpoint}:flex`
      );
      expect(cardsRoot().className).toContain(`${breakpoint}:hidden`);
    });

    it('lists the current page rows as a labelled list', () => {
      renderTable({ mobileCards: true });
      const list = within(cardsRoot()).getByRole('list', { name: 'Rows' });
      expect(within(list).getAllByRole('listitem')).toHaveLength(2);
    });

    it('applies the card className last', () => {
      renderTable({ mobileCards: { className: 'my-card' } });
      expect(cards()[0].className).toMatch(/my-card$/);
    });
  });

  describe('card content', () => {
    it('uses the first column as title and the rest as label/value rows', () => {
      renderTable({ mobileCards: true });
      const [first] = cards();
      expect(within(first).getByText('Ana').closest('[data-tucu="datatable-card-title"]')).not.toBeNull();
      const terms = within(first).getAllByRole('term').map((t) => t.textContent);
      expect(terms).toEqual(['Role', 'Email']);
      const definitions = within(first)
        .getAllByRole('definition')
        .map((d) => d.textContent);
      expect(definitions).toEqual(['Admin', 'ana@x.io']);
    });

    it('supports a custom title and subtitle column', () => {
      renderTable({
        mobileCards: { titleColumnId: 'email', subtitleColumnId: 'role' },
      });
      const [first] = cards();
      expect(
        first.querySelector('[data-tucu="datatable-card-title"]')?.textContent
      ).toBe('ana@x.io');
      expect(
        first.querySelector('[data-tucu="datatable-card-subtitle"]')
          ?.textContent
      ).toBe('Admin');
      expect(within(first).getAllByRole('term').map((t) => t.textContent)).toEqual(['Name']);
    });

    it('leaves out hiddenColumnIds', () => {
      renderTable({ mobileCards: { hiddenColumnIds: ['email'] } });
      const [first] = cards();
      expect(within(first).queryByText('Email')).toBeNull();
      expect(within(first).queryByText('ana@x.io')).toBeNull();
      expect(within(first).getByText('Role')).toBeInTheDocument();
    });

    it('skips columns whose header is empty', () => {
      renderTable({ mobileCards: true });
      const [first] = cards();
      expect(within(first).queryByText('n1')).toBeNull();
    });
  });

  describe('row click and actions', () => {
    const edit = vi.fn();
    const actions = [
      { action: 'edit' as const, label: () => 'Edit person', onClick: edit },
    ];

    it('activates the row from the card by click and keyboard', () => {
      const setCurrentRow = vi.fn();
      renderTable({ mobileCards: true, setCurrentRow });
      const [first, second] = cards();
      fireEvent.click(first);
      expect(setCurrentRow).toHaveBeenCalledTimes(1);
      expect(setCurrentRow.mock.calls[0][0].original.name).toBe('Ana');
      fireEvent.keyDown(second, { key: 'Enter' });
      fireEvent.keyDown(second, { key: ' ' });
      expect(setCurrentRow).toHaveBeenCalledTimes(3);
      expect(first).toHaveAttribute('tabindex', '0');
    });

    it('is not focusable without a row click handler', () => {
      renderTable({ mobileCards: true });
      expect(cards()[0]).not.toHaveAttribute('tabindex');
    });

    it('renders row actions that do not trigger the row click', () => {
      const setCurrentRow = vi.fn();
      edit.mockClear();
      renderTable({ mobileCards: true, setCurrentRow, rowActions: actions });
      const button = within(cards()[0]).getByRole('button', {
        name: 'Edit person',
      });
      fireEvent.click(button);
      expect(edit).toHaveBeenCalledTimes(1);
      expect(setCurrentRow).not.toHaveBeenCalled();
    });

    it('opens the actions menu without activating the row', () => {
      const setCurrentRow = vi.fn();
      renderTable({
        mobileCards: true,
        setCurrentRow,
        rowActions: [
          ...actions,
          { action: 'delete' as const, label: () => 'Delete person', onClick: vi.fn() },
        ],
      });
      fireEvent.click(
        within(cards()[0]).getByRole('button', { name: 'Row actions' })
      );
      fireEvent.click(screen.getByRole('menuitem', { name: 'Delete person' }));
      expect(setCurrentRow).not.toHaveBeenCalled();
    });
  });

  describe('selection', () => {
    it('toggles the shared TanStack selection and the table checkbox follows', () => {
      const getSelection = vi.fn();
      renderTable({
        mobileCards: true,
        rowSelection: { type: 'checkbox', getSelection },
      });
      const cardBox = within(cards()[0]).getByRole('checkbox', {
        name: 'Select row',
      });
      expect(cardBox).not.toBeChecked();
      fireEvent.click(cardBox);
      expect(cardBox).toBeChecked();
      const tableBox = within(screen.getByTestId('table-body')).getAllByRole(
        'checkbox'
      )[0];
      expect(tableBox).toBeChecked();
      expect(cards()[0]).toHaveAttribute('data-selected', 'true');
      expect(getSelection).toHaveBeenLastCalledWith([
        expect.objectContaining({ id: '0' }),
      ]);
    });

    it('describes the checkbox by the card title and does not activate the row', () => {
      const setCurrentRow = vi.fn();
      renderTable({
        mobileCards: true,
        setCurrentRow,
        rowSelection: { type: 'checkbox' },
      });
      const box = within(cards()[1]).getByRole('checkbox');
      expect(box).toHaveAccessibleDescription('Beto');
      fireEvent.click(box);
      expect(setCurrentRow).not.toHaveBeenCalled();
    });

    it('selects a single row with radios', () => {
      renderTable({ mobileCards: true, rowSelection: { type: 'radio' } });
      const [a, b] = cards().map((c) => within(c).getByRole('radio'));
      fireEvent.click(a);
      expect(a).toBeChecked();
      fireEvent.click(b);
      expect(b).toBeChecked();
      expect(a).not.toBeChecked();
    });
  });

  describe('compact pagination', () => {
    it('renders next to the regular pagination and navigates (client mode)', () => {
      renderTable({ mobileCards: true });
      const nav = screen.getByRole('navigation', { name: 'Pagination' });
      expect(nav.className).toContain('md:hidden');
      expect(nav.parentElement).not.toBeNull();
      expect(within(nav).getByText('Page 1 of 3')).toBeInTheDocument();
      expect(within(nav).getByText('1-2 of 5')).toBeInTheDocument();
      expect(
        within(nav).getByRole('button', { name: 'Previous page' })
      ).toBeDisabled();
      fireEvent.click(within(nav).getByRole('button', { name: 'Next page' }));
      expect(within(nav).getByText('Page 2 of 3')).toBeInTheDocument();
      expect(within(nav).getByText('3-4 of 5')).toBeInTheDocument();
      expect(cards().map((c) => within(c).getByText(/^(Cleo|Dana)$/).textContent)).toEqual(['Cleo', 'Dana']);
    });

    it('navigates in manual mode through setPagination', () => {
      const setPagination = vi.fn();
      renderTable({
        mobileCards: true,
        data: people.slice(0, 2) as unknown as TData[],
        pagination: {
          showPagination: true,
          manualPagination: {
            enabled: true,
            rowCount: 5,
            pagination: { pageIndex: 1, pageSize: 2 },
            setPagination,
          },
        },
      });
      const nav = screen.getByRole('navigation', { name: 'Pagination' });
      expect(within(nav).getByText('Page 2 of 3')).toBeInTheDocument();
      fireEvent.click(within(nav).getByRole('button', { name: 'Next page' }));
      expect(setPagination).toHaveBeenLastCalledWith({ pageIndex: 2, pageSize: 2 });
      fireEvent.click(within(nav).getByRole('button', { name: 'Previous page' }));
      expect(setPagination).toHaveBeenLastCalledWith({ pageIndex: 0, pageSize: 2 });
    });

    it('navigates in server mode', () => {
      const setPagination = vi.fn();
      renderTable({
        mobileCards: true,
        data: people.slice(0, 2) as unknown as TData[],
        pagination: {
          showPagination: true,
          serverPagination: {
            totalCount: 5,
            pagination: { pageIndex: 0, pageSize: 2 },
            setPagination,
          },
        },
      });
      const nav = screen.getByRole('navigation', { name: 'Pagination' });
      fireEvent.click(within(nav).getByRole('button', { name: 'Next page' }));
      expect(setPagination).toHaveBeenCalledWith({ pageIndex: 1, pageSize: 2 });
    });

    it('does not render without mobileCards, in either mode', () => {
      renderTable({
        pagination: {
          showPagination: true,
          manualPagination: {
            enabled: true,
            rowCount: 5,
            pagination: { pageIndex: 0, pageSize: 2 },
            setPagination: vi.fn(),
          },
        },
      });
      expect(screen.queryByRole('navigation')).toBeNull();
    });
  });

  describe('states', () => {
    it('shows skeleton cards while loading', () => {
      renderTable({ mobileCards: true, isLoading: true });
      const skeleton = cardsRoot().querySelector('[aria-busy="true"]');
      expect(skeleton).not.toBeNull();
      expect(within(cardsRoot()).queryByRole('list', { name: 'Rows' })).toBeNull();
    });

    it('shows the empty message, honouring stateMessage', () => {
      renderTable({
        mobileCards: true,
        data: [],
        stateMessage: { noData: 'No people' },
      });
      expect(within(cardsRoot()).getByRole('status')).toHaveTextContent('No people');
    });

    it('shows the error message', () => {
      renderTable({ mobileCards: true, isError: true });
      expect(within(cardsRoot()).getByRole('alert')).toHaveTextContent(
        'There was a problem loading the data'
      );
    });
  });

  describe('i18n', () => {
    it('translates the card chrome and compact pagination in es', () => {
      act(() => useTheme.setState({ lang: 'es' }));
      renderTable({
        mobileCards: true,
        rowSelection: { type: 'checkbox' },
      });
      expect(within(cards()[0]).getByRole('checkbox', { name: 'Seleccionar fila' })).toBeInTheDocument();
      expect(within(cardsRoot()).getByRole('list', { name: 'Filas' })).toBeInTheDocument();
      const nav = screen.getByRole('navigation', { name: 'Paginación' });
      expect(within(nav).getByText('Página 1 de 3')).toBeInTheDocument();
      expect(within(nav).getByText('1-2 de 5')).toBeInTheDocument();
      expect(within(nav).getByRole('button', { name: 'Página siguiente' })).toBeInTheDocument();
    });

    it('translates the empty state in es', () => {
      act(() => useTheme.setState({ lang: 'es' }));
      renderTable({ mobileCards: true, data: [] });
      expect(within(cardsRoot()).getByRole('status')).toHaveTextContent('No hay datos disponibles');
    });
  });
});
