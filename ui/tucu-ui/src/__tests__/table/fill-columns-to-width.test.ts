import { describe, it, expect } from 'vitest';
import type { ColumnDef } from '@tanstack/react-table';
import {
  DEFAULT_FILL_COLUMN_SIZE,
  fillColumnsToWidth,
} from '../../datatable/common/functions/fillColumnsToWidth';
import { getColumns } from '../../datatable/hooks/useColumns';

const sizesOf = (columns: Array<{ size?: number }>) =>
  columns.map((column) => column.size);
const total = (columns: Array<{ size?: number }>) =>
  columns.reduce((sum, column) => sum + (column.size ?? 0), 0);

describe('fillColumnsToWidth', () => {
  it('grows columns proportionally to their base size', () => {
    const result = fillColumnsToWidth([{ size: 100 }, { size: 300 }], 800);
    expect(sizesOf(result)).toEqual([200, 600]);
  });

  it('returns the same columns when there is no room to grow', () => {
    const columns = [{ size: 300 }, { size: 300 }];
    expect(fillColumnsToWidth(columns, 600)).toBe(columns);
    expect(fillColumnsToWidth(columns, 400)).toBe(columns);
  });

  it('returns the same columns for an empty list or a non-positive width', () => {
    const columns = [{ size: 100 }];
    expect(fillColumnsToWidth([], 500)).toEqual([]);
    expect(fillColumnsToWidth(columns, 0)).toBe(columns);
    expect(fillColumnsToWidth(columns, -20)).toBe(columns);
  });

  it('uses the default base size for columns without size', () => {
    const result = fillColumnsToWidth([{}, {}], DEFAULT_FILL_COLUMN_SIZE * 4);
    expect(sizesOf(result)).toEqual([300, 300]);
  });

  it('floors the base size at minSize', () => {
    const result = fillColumnsToWidth(
      [{ size: 50, minSize: 150 }, { size: 150 }],
      600
    );
    expect(sizesOf(result)).toEqual([300, 300]);
  });

  it('stops growing a column at maxSize and redistributes the surplus', () => {
    const result = fillColumnsToWidth(
      [{ size: 100, maxSize: 150 }, { size: 100 }, { size: 100 }],
      600
    );
    expect(sizesOf(result)).toEqual([150, 225, 225]);
  });

  it('never overflows the available width after rounding', () => {
    const result = fillColumnsToWidth(
      [{ size: 100 }, { size: 100 }, { size: 100 }],
      1000
    );
    expect(total(result)).toBe(1000);
    expect(sizesOf(result)).toEqual([333, 333, 334]);
  });

  it('gives the rounding leftover to the last column that can grow', () => {
    const result = fillColumnsToWidth(
      [{ size: 100 }, { size: 100 }, { size: 100, maxSize: 333 }],
      1000
    );
    expect(total(result)).toBeLessThanOrEqual(1000);
    expect(result[2].size).toBeLessThanOrEqual(333);
  });

  it('keeps the total under the available width when every column is capped', () => {
    const result = fillColumnsToWidth(
      [
        { size: 100, maxSize: 120 },
        { size: 100, maxSize: 120 },
      ],
      1000
    );
    expect(sizesOf(result)).toEqual([120, 120]);
  });

  it('does not mutate the input columns', () => {
    const columns = [{ size: 100 }, { size: 100 }];
    fillColumnsToWidth(columns, 400);
    expect(sizesOf(columns)).toEqual([100, 100]);
  });
});

type Row = { a: string };
const column = (
  id: string,
  extra: Partial<ColumnDef<Row, unknown>> = {}
): ColumnDef<Row, unknown> => ({ id, ...extra });

const baseArgs = {
  offset: 0,
  isSubComponent: false,
  isRowActions: false,
  isRowSelection: false,
};

describe('getColumns columnSizing', () => {
  it("'fill' grows every column, even when all of them have a size", () => {
    const result = getColumns<Row, unknown>({
      ...baseArgs,
      columns: [column('a', { size: 100 }), column('b', { size: 300 })],
      containerWidth: 800,
      columnVisibility: { a: true, b: true },
      columnSizing: 'fill',
    });
    expect(sizesOf(result)).toEqual([200, 600]);
  });

  it("'fill' reserves the helper columns offset", () => {
    const result = getColumns<Row, unknown>({
      ...baseArgs,
      columns: [column('a', { size: 100 }), column('b', { size: 100 })],
      containerWidth: 500,
      offset: 100,
      columnVisibility: { a: true, b: true },
      columnSizing: 'fill',
    });
    expect(total(result)).toBe(400);
  });

  it("'fill' ignores hidden columns", () => {
    const result = getColumns<Row, unknown>({
      ...baseArgs,
      columns: [
        column('a', { size: 100 }),
        column('b', { size: 100 }),
        column('c', { size: 100 }),
      ],
      containerWidth: 1000,
      columnVisibility: { a: true, b: false, c: true },
      columnSizing: 'fill',
    });
    expect(sizesOf(result)).toEqual([500, 100, 500]);
  });

  it("'fill' resolves columns without size to the default base size", () => {
    const result = getColumns<Row, unknown>({
      ...baseArgs,
      columns: [column('a'), column('b')],
      containerWidth: 200,
      columnVisibility: { a: true, b: true },
      columnSizing: 'fill',
    });
    expect(sizesOf(result)).toEqual([150, 150]);
  });

  it("'fill-leftover' is the default and keeps the legacy distribution", () => {
    const args = {
      ...baseArgs,
      columns: [column('a', { size: 200 }), column('b')],
      containerWidth: 1000,
      columnVisibility: { a: true, b: true },
    };
    const implicit = getColumns<Row, unknown>(args);
    const explicit = getColumns<Row, unknown>({
      ...args,
      columnSizing: 'fill-leftover',
    });
    expect(sizesOf(implicit)).toEqual([200, 800]);
    expect(sizesOf(explicit)).toEqual([200, 800]);
  });

  it("'fixed' applies no distribution", () => {
    const result = getColumns<Row, unknown>({
      ...baseArgs,
      columns: [column('a', { size: 200 }), column('b')],
      containerWidth: 1000,
      columnVisibility: { a: true, b: true },
      columnSizing: 'fixed',
    });
    expect(sizesOf(result)).toEqual([200, undefined]);
  });
});
