import { describe, it, expect } from 'vitest';
import {
  buildDataTable,
  registerDataTableTools,
} from '../src/tools/datatable-tools.js';
import { createMcpServer } from '../src/server.js';

function assertBalanced(code: string): void {
  const pairs: Array<[string, string]> = [
    ['{', '}'],
    ['(', ')'],
    ['[', ']'],
  ];
  for (const [open, close] of pairs) {
    const opens = code.split(open).length - 1;
    const closes = code.split(close).length - 1;
    expect(opens, `unbalanced ${open}${close}`).toBe(closes);
  }
}

describe('buildDataTable — basic', () => {
  it('generates a default table with no input', () => {
    const out = buildDataTable();
    expect(out.componentCode).toContain("const TABLE_ID = 'item-table';");
    expect(out.componentCode).toContain('export interface Item {');
    expect(out.componentCode).toContain(
      'const itemColumns: TanstackTable.ColumnDef<Item, Item>[] = ['
    );
    expect(out.componentCode).toContain('export function ItemTable({');
    expect(out.componentCode).toContain(
      'pagination={{ showPagination: true, rowsInfo: true }}'
    );
    expect(out.imports).toContain(
      "import { DataTable, TanstackTable } from '@e-burgos/tucu-ui';"
    );
    // default sample columns
    expect(out.componentCode).toContain("id: 'id',");
    expect(out.componentCode).toContain("id: 'createdAt',");
    expect(out.componentCode).toContain('toLocaleDateString()');
    assertBalanced(out.componentCode);
  });

  it('always includes the persistence + CSS notes', () => {
    const out = buildDataTable();
    expect(out.notes.join('\n')).toContain('item-table-datatable');
    expect(out.notes.join('\n')).toContain("'@e-burgos/tucu-ui/styles'");
    expect(out.notes.join('\n')).toContain('373px');
  });

  it('derives tableId from entityName and respects explicit tableId', () => {
    expect(buildDataTable({ entityName: 'UserAccount' }).componentCode).toContain(
      "const TABLE_ID = 'user-account-table';"
    );
    expect(
      buildDataTable({ entityName: 'User', tableId: 'my-users' }).componentCode
    ).toContain("const TABLE_ID = 'my-users';");
  });
});

describe('buildDataTable — custom columns', () => {
  const out = buildDataTable({
    entityName: 'Invoice',
    columns: [
      { key: 'code', header: 'Code', type: 'text', size: 100, sortable: false },
      { key: 'amount', header: 'Amount', type: 'currency', size: 140 },
      { key: 'status', header: 'Status', type: 'badge' },
      { key: 'items', type: 'number' },
    ],
  });

  it('emits explicit id + accessorKey per column', () => {
    expect(out.componentCode).toContain("id: 'code',");
    expect(out.componentCode).toContain("accessorKey: 'code',");
    expect(out.componentCode).toContain("id: 'amount',");
  });

  it('maps column types to TS types', () => {
    expect(out.types).toContain('code: string;');
    expect(out.types).toContain('amount: number;');
    expect(out.types).toContain('items: number;');
  });

  it('handles size and sortable:false', () => {
    expect(out.componentCode).toContain('size: 100,');
    expect(out.componentCode).toContain('enableSorting: false,');
  });

  it('generates a currency formatter and badge renderer', () => {
    expect(out.componentCode).toContain('const currencyFormatter =');
    expect(out.componentCode).toContain(
      'currencyFormatter.format(row.original.amount)'
    );
    expect(out.componentCode).toContain('rounded-full');
  });

  it('humanizes missing headers', () => {
    expect(out.componentCode).toContain("header: 'Items',");
  });

  it('stays balanced', () => {
    assertBalanced(out.componentCode);
  });
});

describe('buildDataTable — pagination modes', () => {
  it('server pagination wires parent state + persisted-page restore note', () => {
    const out = buildDataTable({
      entityName: 'Order',
      features: { paginationMode: 'server' },
    });
    expect(out.componentCode).toContain(
      "import { useState } from 'react';"
    );
    expect(out.componentCode).toContain(
      'useState<TanstackTable.PaginationState>({ pageIndex: 0, pageSize: 10 })'
    );
    expect(out.componentCode).toContain('serverPagination: {');
    expect(out.componentCode).toContain('setPagination: handlePaginationChange,');
    expect(out.componentCode).toContain('totalCount,');
    expect(out.types).toContain('totalCount: number;');
    expect(out.types).toContain('onPaginationChange?:');
    expect(out.notes.join('\n')).toContain('restores the persisted page');
    expect(out.notes.join('\n')).toContain('takeDefaultPagination');
    assertBalanced(out.componentCode);
  });

  it('manual pagination is fully controlled', () => {
    const out = buildDataTable({ features: { paginationMode: 'manual' } });
    expect(out.componentCode).toContain('manualPagination: {');
    expect(out.componentCode).toContain('enabled: true,');
    expect(out.componentCode).toContain('rowCount: totalCount,');
    expect(out.componentCode).toContain('useEffect(() => {');
    expect(out.notes.join('\n')).toContain('fully controlled');
    assertBalanced(out.componentCode);
  });

  it('none hides controls with an oversized pageSize + warning note', () => {
    const out = buildDataTable({ features: { paginationMode: 'none' } });
    expect(out.componentCode).toContain(
      'pagination={{ showPagination: false, pageSize: 1000 }}'
    );
    expect(out.notes.join('\n')).toContain('client pagination row model');
  });
});

describe('buildDataTable — row actions and scopes', () => {
  it('generates typed row actions with scopes and the setScopes caveat', () => {
    const out = buildDataTable({
      entityName: 'Invoice',
      features: {
        rowActions: ['edit', 'delete', 'download'],
        withScopes: true,
      },
    });
    expect(out.componentCode).toContain(
      'const invoiceRowActions: IRowActions<Invoice>[] = ['
    );
    expect(out.componentCode).toContain("action: 'edit',");
    expect(out.componentCode).toContain("action: 'delete',");
    expect(out.componentCode).toContain("requiredScopes: ['invoice:edit'],");
    expect(out.componentCode).toContain('rowActions={invoiceRowActions}');
    expect(out.imports.join('\n')).toContain(
      "import type { IRowActions } from '@e-burgos/tucu-ui';"
    );
    expect(out.notes.join('\n')).toContain('setScopes');
    expect(out.notes.join('\n')).toContain('disabled/hidden');
    assertBalanced(out.componentCode);
  });

  it('mentions the inline-icon behavior for a single action', () => {
    const out = buildDataTable({ features: { rowActions: ['view'] } });
    expect(out.notes.join('\n')).toContain('inline icon');
  });
});

describe('buildDataTable — row selection', () => {
  it('checkbox selection with getSelection and index-identity note', () => {
    const out = buildDataTable({ features: { rowSelection: 'checkbox' } });
    expect(out.componentCode).toContain("type: 'checkbox',");
    expect(out.componentCode).toContain('getSelection: (rows) => {');
    expect(out.notes.join('\n')).toContain('INDEX');
    expect(out.notes.join('\n')).toContain('never persisted');
  });

  it('radio selection', () => {
    const out = buildDataTable({ features: { rowSelection: 'radio' } });
    expect(out.componentCode).toContain("type: 'radio',");
  });
});

describe('buildDataTable — expansion', () => {
  it('subComponent renders free-form content', () => {
    const out = buildDataTable({ features: { expansion: 'subComponent' } });
    expect(out.componentCode).toContain('renderSubComponent={({ row }) => (');
    expect(out.componentCode).toContain('row?.original');
    assertBalanced(out.componentCode);
  });

  it('subDataTable generates a nested detail table', () => {
    const out = buildDataTable({
      entityName: 'Order',
      features: { expansion: 'subDataTable' },
    });
    expect(out.componentCode).toContain('renderSubDataTable={{');
    expect(out.componentCode).toContain(
      'const orderDetailColumns: TanstackTable.ColumnDef<OrderDetail, OrderDetail>[] = ['
    );
    expect(out.types).toContain('export interface OrderDetail {');
    expect(out.types).toContain('detailData: OrderDetail[];');
    expect(out.componentCode).toContain('expandedColumnSize: 50,');
    expect(out.notes.join('\n')).toContain('static dataset');
    assertBalanced(out.componentCode);
  });
});

describe('buildDataTable — search, visibility, multi-sort, footer', () => {
  const out = buildDataTable({
    entityName: 'Product',
    columns: [
      { key: 'sku', type: 'text' },
      { key: 'name', type: 'text' },
      { key: 'price', type: 'currency' },
    ],
    features: {
      globalSearch: true,
      columnVisibilityManager: true,
      multiSort: true,
      showFooter: true,
    },
  });

  it('restricts global search to string columns', () => {
    expect(out.componentCode).toContain("searchableColumns={['sku', 'name']}");
  });

  it('enables the Manage Columns drawer and multi-sort', () => {
    expect(out.componentCode).toContain('enableHideColumns');
    expect(out.componentCode).toContain('enableMultiSort');
    expect(out.notes.join('\n')).toContain('2 columns');
  });

  it('adds a footer to the first numeric column', () => {
    expect(out.componentCode).toContain('showFooter');
    expect(out.componentCode).toContain("footer: () => 'Total',");
  });

  it('stays balanced', () => {
    assertBalanced(out.componentCode);
  });
});

describe('buildDataTable — manual sorting', () => {
  it('wires manualSorting + onSortModelChange to a parent callback', () => {
    const out = buildDataTable({ features: { manualSorting: true } });
    expect(out.componentCode).toContain('manualSorting');
    expect(out.componentCode).toContain(
      'onSortModelChange={(model) => onSortChange?.(model)}'
    );
    expect(out.types).toContain('onSortChange?:');
    expect(out.notes.join('\n')).toContain('SortingState');
  });
});

describe('buildDataTable — persisted state versioning', () => {
  it('emits useResetCacheVersion inside the component', () => {
    const out = buildDataTable({ features: { persistStateVersion: 3 } });
    expect(out.componentCode).toContain(
      'useResetCacheVersion(TABLE_ID, { version: 3 });'
    );
    expect(out.imports.join('\n')).toContain('useResetCacheVersion');
    expect(out.notes.join('\n')).toContain('in-memory state until remount');
  });
});

describe('buildDataTable — column filters and export flags', () => {
  it('emits enableColumnFilter + meta.filterVariant and export flags', () => {
    const out = buildDataTable({
      entityName: 'Metric',
      columns: [
        { key: 'name', filterVariant: 'text' },
        { key: 'value', type: 'number', filterVariant: 'range', exportAs: 'number' },
        { key: 'rate', type: 'percentage', exportAs: 'percentage' },
        { key: 'kind', filterVariant: 'select' },
      ],
    });
    expect(out.componentCode).toContain('enableColumnFilter: true,');
    expect(out.componentCode).toContain("meta: { filterVariant: 'text' },");
    expect(out.componentCode).toContain("meta: { filterVariant: 'range' },");
    expect(out.componentCode).toContain("meta: { filterVariant: 'select' },");
    expect(out.componentCode).toContain('exportAsNumber: true,');
    expect(out.componentCode).toContain('exportAsPercentage: true,');
    expect(out.notes.join('\n')).toContain('enableColumnFilter');
    expect(out.notes.join('\n')).toContain('parseNumericValueForExport');
    assertBalanced(out.componentCode);
  });
});

describe('buildDataTable — states handling', () => {
  it('wires isLoading/isError and a stateMessage without the default support link', () => {
    const out = buildDataTable({ features: { statesHandling: true } });
    expect(out.componentCode).toContain('isLoading={isLoading}');
    expect(out.componentCode).toContain('isError={isError}');
    expect(out.componentCode).toContain('hideContactSupport: true,');
    expect(out.types).toContain('isLoading?: boolean;');
    expect(out.notes.join('\n')).toContain('Contact Support');
  });
});

describe('buildDataTable — everything at once', () => {
  it('generates balanced, coherent code with all features enabled', () => {
    const out = buildDataTable({
      entityName: 'Invoice',
      tableId: 'invoices-main',
      columns: [
        { key: 'code', header: 'Code', size: 100, sortable: false },
        { key: 'customer', type: 'text', filterVariant: 'text' },
        { key: 'amount', type: 'currency', size: 140, exportAs: 'number' },
        { key: 'taxRate', type: 'percentage', exportAs: 'percentage', filterVariant: 'range' },
        { key: 'status', type: 'badge', filterVariant: 'select' },
        { key: 'issuedAt', type: 'date' },
      ],
      features: {
        paginationMode: 'server',
        rowSelection: 'checkbox',
        rowActions: ['view', 'edit', 'delete', 'download'],
        withScopes: true,
        expansion: 'subDataTable',
        globalSearch: true,
        columnVisibilityManager: true,
        multiSort: true,
        showFooter: true,
        persistStateVersion: 2,
        smallAnatomy: true,
        statesHandling: true,
      },
    });
    expect(out.componentCode).toContain("const TABLE_ID = 'invoices-main';");
    expect(out.componentCode).toContain('smallAnatomy');
    expect(out.componentCode).toContain('serverPagination: {');
    expect(out.componentCode).toContain('renderSubDataTable={{');
    expect(out.componentCode).toContain('useResetCacheVersion(TABLE_ID, { version: 2 });');
    expect(out.imports.join('\n')).toContain('useState');
    expect(out.notes.length).toBeGreaterThanOrEqual(10);
    assertBalanced(out.componentCode);
  });
});

describe('registerDataTableTools', () => {
  it('is exported and the server registers without throwing', () => {
    expect(typeof registerDataTableTools).toBe('function');
    expect(() => createMcpServer()).not.toThrow();
  });
});
