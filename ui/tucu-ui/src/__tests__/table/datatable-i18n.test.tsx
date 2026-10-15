import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import React from 'react';
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Pagination from '../../datatable/components/Pagination';
import StateTableHandler from '../../datatable/components/DataTable/StateTableHandler';
import { useTheme } from '../../themes/hooks/use-theme';
import type { TData } from '../../datatable/common/types';

const rows = Array.from({ length: 12 }, (_, i) => ({ id: i + 1 }));

const Harness = () => {
  const table = useReactTable<TData>({
    data: rows as TData[],
    columns: [{ accessorKey: 'id' }],
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageIndex: 0, pageSize: 5 } },
  });
  return (
    <form onSubmit={() => {
      throw new Error('pagination must not submit forms');
    }}>
      <Pagination tableId="t" table={table} pagination={{ pageSize: 5 }} />
    </form>
  );
};

describe('DataTable i18n', () => {
  beforeEach(() => act(() => useTheme.setState({ lang: 'es' })));

  it('translates pagination and labels its buttons', () => {
    render(<Harness />);
    expect(screen.getByText('por página:')).toBeInTheDocument();
    expect(screen.getByText('1-5 de 12')).toBeInTheDocument();
    const next = screen.getByRole('button', { name: 'Página siguiente' });
    expect(next).toHaveAttribute('type', 'button');
    act(() => next.click());
    expect(screen.getByText('6-10 de 12')).toBeInTheDocument();
    act(() => screen.getByRole('button', { name: 'Última página' }).click());
    expect(screen.getByText('11-12 de 12')).toBeInTheDocument();
  });

  it('translates the empty state, keeping explicit messages', () => {
    const { rerender } = render(
      <StateTableHandler containerWith={500} isLoading={false} isEmpty isError={false} />
    );
    expect(screen.getByText('No hay datos disponibles')).toBeInTheDocument();
    rerender(
      <StateTableHandler
        containerWith={500}
        isLoading={false}
        isEmpty
        isError={false}
        stateMessage={{ noData: 'Sin clientes' }}
      />
    );
    expect(screen.getByText('Sin clientes')).toBeInTheDocument();
  });
});
