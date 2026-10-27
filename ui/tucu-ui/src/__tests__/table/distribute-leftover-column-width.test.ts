import { describe, it, expect } from 'vitest';
import type { ColumnDef } from '@tanstack/react-table';
import {
  distributeLeftoverColumnWidth,
  getColumns,
} from '../../datatable/hooks/useColumns';

type Row = { a: string };
const column = (id: string, size?: number): ColumnDef<Row, unknown> => ({
  id,
  size,
});

describe('distributeLeftoverColumnWidth', () => {
  it('splits only the leftover width among columns without size', () => {
    const columns = [column('a', 200), column('b'), column('c')];
    const width = distributeLeftoverColumnWidth({
      columns,
      containerWidth: 1000,
      columnVisibility: { a: true, b: true, c: true },
    });
    expect(width).toBe(400);
  });

  it('subtracts the offset of helper columns', () => {
    const width = distributeLeftoverColumnWidth({
      columns: [column('a', 100), column('b')],
      containerWidth: 600,
      offset: 100,
      columnVisibility: { a: true, b: true },
    });
    expect(width).toBe(400);
  });

  it('ignores hidden columns', () => {
    const width = distributeLeftoverColumnWidth({
      columns: [column('a', 300), column('b'), column('c')],
      containerWidth: 1000,
      columnVisibility: { a: false, b: true, c: true },
    });
    expect(width).toBe(500);
  });

  it('counts columns without id as visible', () => {
    const width = distributeLeftoverColumnWidth({
      columns: [{ size: 200 }, {}],
      containerWidth: 1000,
      columnVisibility: {},
    });
    expect(width).toBe(800);
  });

  it('never returns a negative width', () => {
    const width = distributeLeftoverColumnWidth({
      columns: [column('a', 900), column('b')],
      containerWidth: 500,
      columnVisibility: { a: true, b: true },
    });
    expect(width).toBe(0);
  });

  it('returns zero when every column has explicit size', () => {
    const width = distributeLeftoverColumnWidth({
      columns: [column('a', 100), column('b', 100)],
      containerWidth: 1000,
      columnVisibility: { a: true, b: true },
    });
    expect(width).toBe(0);
  });
});

describe('getColumns sizing', () => {
  it('respects explicit sizes and fills the rest', () => {
    const result = getColumns<Row, unknown>({
      columns: [column('a', 200), column('b'), column('c', 100)],
      containerWidth: 1000,
      offset: 0,
      isSubComponent: false,
      isRowActions: false,
      isRowSelection: false,
      columnVisibility: { a: true, b: true, c: true },
    });
    expect(result.map((c) => c.size)).toEqual([200, 700, 100]);
  });
});
