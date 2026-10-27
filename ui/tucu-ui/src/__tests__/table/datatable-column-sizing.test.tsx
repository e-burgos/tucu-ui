import { describe, it, expect, afterEach, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import React from 'react';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from '../../datatable';
import type { DataTableProps } from '../../datatable/context';
import type { TData } from '../../datatable/common/types';

const columns = [
  { id: 'name', accessorKey: 'name', header: 'Name', size: 100 },
  { id: 'role', accessorKey: 'role', header: 'Role', size: 300 },
] as unknown as ColumnDef<TData, TData>[];

const data = [{ name: 'Ana', role: 'Admin' }] as unknown as TData[];

let tableCounter = 0;

const renderTable = (props: Partial<DataTableProps<TData>> = {}) => {
  tableCounter += 1;
  return render(
    <DataTable
      tableId={`sizing-${tableCounter}`}
      data={data}
      columns={columns}
      {...props}
    />
  );
};

const cellWidths = () =>
  Array.from(
    screen.getAllByTestId('table-row')[0].querySelectorAll('[role="cell"]')
  ).map((cell) => (cell as HTMLElement).style.width);

const stubContainerWidth = (width: number) =>
  vi
    .spyOn(HTMLElement.prototype, 'clientWidth', 'get')
    .mockImplementation(() => width);

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('DataTable columnSizing', () => {
  it('keeps the declared sizes by default', () => {
    stubContainerWidth(800);
    renderTable();
    expect(cellWidths()).toEqual(['100px', '300px']);
  });

  it("'fixed' keeps the declared sizes", () => {
    stubContainerWidth(800);
    renderTable({ columnSizing: 'fixed' });
    expect(cellWidths()).toEqual(['100px', '300px']);
  });

  it("'fill' grows the columns to the container width", () => {
    stubContainerWidth(800);
    renderTable({ columnSizing: 'fill' });
    expect(cellWidths()).toEqual(['200px', '600px']);
  });

  it("'fill' follows the container when it is resized", () => {
    let width = 800;
    vi.spyOn(HTMLElement.prototype, 'clientWidth', 'get').mockImplementation(
      () => width
    );
    let notifyResize: () => void = () => undefined;
    class FakeResizeObserver {
      constructor(callback: () => void) {
        notifyResize = callback;
      }
      observe = vi.fn();
      disconnect = vi.fn();
      unobserve = vi.fn();
    }
    vi.stubGlobal('ResizeObserver', FakeResizeObserver);

    renderTable({ columnSizing: 'fill' });
    expect(cellWidths()).toEqual(['200px', '600px']);

    width = 1200;
    act(() => notifyResize());
    expect(cellWidths()).toEqual(['300px', '900px']);
  });

  it("'fill' reserves the width of the helper columns", () => {
    stubContainerWidth(850);
    renderTable({
      columnSizing: 'fill',
      rowActions: [
        { action: 'view', label: () => 'View', onClick: vi.fn() },
      ],
    });
    expect(cellWidths().slice(0, 2)).toEqual(['200px', '600px']);
  });
});
