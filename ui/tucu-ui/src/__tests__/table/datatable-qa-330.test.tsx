import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, act, fireEvent } from '@testing-library/react';
import React from 'react';
import type { Row } from '@tanstack/react-table';
import ManualPagination from '../../datatable/components/ManualPagination';
import RowActionsCell from '../../datatable/components/DataTable/TableCell/RowActionsCell';
import { useTheme } from '../../themes/hooks/use-theme';
import type { IRowActions, TData } from '../../datatable/common/types';

const manualPagination = {
  enabled: true,
  rowCount: 12,
  pagination: { pageIndex: 0, pageSize: 5 },
  setPagination: vi.fn(),
};

describe('ManualPagination i18n', () => {
  beforeEach(() => act(() => useTheme.setState({ lang: 'es-AR' })));

  it('renders Spanish for es-AR', () => {
    render(<ManualPagination manualPagination={manualPagination} rowsInfo />);
    expect(screen.getByText('por página:')).toBeInTheDocument();
    expect(screen.getByText('1-5 de 12')).toBeInTheDocument();
    expect(screen.getByText('Mostrando 1 de 12 filas')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Página siguiente' })
    ).toBeInTheDocument();
  });

  it('keeps English by default', () => {
    act(() => useTheme.setState({ lang: 'en' }));
    render(<ManualPagination manualPagination={manualPagination} />);
    expect(screen.getByText('per page:')).toBeInTheDocument();
    expect(screen.getByText('1-5 of 12')).toBeInTheDocument();
  });
});

const row = { id: '1', original: {} } as unknown as Row<TData>;

const action = (
  name: string,
  hidden?: IRowActions<TData>['hidden']
): IRowActions<TData> => ({
  action: 'edit',
  label: () => name,
  onClick: vi.fn(),
  hidden,
});

const renderActions = (rowActions: IRowActions<TData>[]) =>
  render(
    <RowActionsCell
      tableId="t"
      row={row}
      hoverRow={{ hover: true, index: 0 }}
      rowActions={rowActions}
      setHoverRow={vi.fn()}
      setOpenActions={vi.fn()}
    />
  );

describe('RowActionsCell hidden', () => {
  beforeEach(() => act(() => useTheme.setState({ lang: 'en' })));

  it('honors hidden per action with several actions', () => {
    renderActions([
      action('Editar'),
      action('Borrar', true),
      action('Anular', () => true),
      action('Ver', () => false),
    ]);
    fireEvent.click(screen.getByRole('button', { name: 'Row actions' }));
    const items = screen.getAllByRole('menuitem').map((i) => i.textContent);
    expect(items).toEqual(['Editar', 'Ver']);
  });

  it('collapses to a single inline action when the rest are hidden', () => {
    renderActions([action('Editar'), action('Borrar', true)]);
    expect(screen.getByRole('button', { name: 'Editar' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Row actions' })).toBeNull();
  });

  it('renders nothing when every action is hidden', () => {
    const { container } = renderActions([
      action('Editar', true),
      action('Borrar', () => true),
    ]);
    expect(container).toBeEmptyDOMElement();
  });
});
