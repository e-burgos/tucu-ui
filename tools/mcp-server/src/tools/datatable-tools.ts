// ─── DataTable Tools ─────────────────────────────────────────────────────────
// generate_datatable: scaffolds a production-ready DataTable (TanStack Table v8)
// against the real @e-burgos/tucu-ui public API.
// The core logic lives in the pure, exported buildDataTable() so it can be
// unit-tested without the MCP layer (same pattern as generateDocumentation).

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { toCamelCase, toPascalCase } from '../utils/code-generator.js';

// ─── Input / output types ────────────────────────────────────────────────────

export type DataTableColumnType =
  | 'text'
  | 'number'
  | 'date'
  | 'badge'
  | 'currency'
  | 'percentage';

export type DataTableFilterVariant = 'text' | 'range' | 'select';

export type DataTableRowActionType =
  | 'more'
  | 'open-new-tab'
  | 'view'
  | 'edit'
  | 'delete'
  | 'download'
  | 'void';

export interface DataTableColumnInput {
  key: string;
  header?: string;
  type?: DataTableColumnType;
  size?: number;
  sortable?: boolean;
  filterVariant?: DataTableFilterVariant;
  exportAs?: 'number' | 'percentage';
}

export interface DataTableFeaturesInput {
  paginationMode?: 'none' | 'client' | 'server' | 'manual';
  rowSelection?: 'none' | 'checkbox' | 'radio';
  rowActions?: DataTableRowActionType[];
  withScopes?: boolean;
  expansion?: 'none' | 'subComponent' | 'subDataTable';
  globalSearch?: boolean;
  columnVisibilityManager?: boolean;
  multiSort?: boolean;
  manualSorting?: boolean;
  showFooter?: boolean;
  persistStateVersion?: number;
  smallAnatomy?: boolean;
  statesHandling?: boolean;
}

export interface DataTableToolInput {
  entityName?: string;
  tableId?: string;
  columns?: DataTableColumnInput[];
  features?: DataTableFeaturesInput;
}

export interface DataTableOutput {
  componentCode: string;
  imports: string[];
  types: string;
  notes: string[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function toKebabCase(str: string): string {
  return str
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[_\s]+/g, '-')
    .toLowerCase();
}

const DEFAULT_COLUMNS: DataTableColumnInput[] = [
  { key: 'id', header: 'ID', type: 'text', size: 80 },
  { key: 'name', header: 'Name', type: 'text' },
  { key: 'createdAt', header: 'Created At', type: 'date' },
];

function tsTypeFor(col: DataTableColumnInput): string {
  switch (col.type) {
    case 'number':
    case 'currency':
    case 'percentage':
      return 'number';
    default:
      return 'string';
  }
}

function headerLabel(col: DataTableColumnInput): string {
  if (col.header) return col.header;
  // humanize the key: createdAt -> Created At
  return toPascalCase(col.key).replace(/([a-z0-9])([A-Z])/g, '$1 $2');
}

function cellRenderer(col: DataTableColumnInput): string | null {
  const accessor = `row.original.${col.key}`;
  switch (col.type) {
    case 'currency':
      return `    cell: ({ row }) => currencyFormatter.format(${accessor}),`;
    case 'percentage':
      return `    cell: ({ row }) => \`\${${accessor}}%\`,`;
    case 'date':
      return `    cell: ({ row }) => new Date(${accessor}).toLocaleDateString(),`;
    case 'badge':
      return [
        '    cell: ({ row }) => (',
        '      <span className="rounded-full bg-brand/10 px-2 py-0.5 text-xs font-medium text-brand">',
        `        {${accessor}}`,
        '      </span>',
        '    ),',
      ].join('\n');
    default:
      return null;
  }
}

function buildColumnDef(col: DataTableColumnInput, withFooter: boolean): string {
  const lines: string[] = [];
  lines.push(`    id: '${col.key}',`);
  lines.push(`    accessorKey: '${col.key}',`);
  lines.push(`    header: '${headerLabel(col)}',`);
  if (col.size !== undefined) lines.push(`    size: ${col.size},`);
  if (col.sortable === false) lines.push('    enableSorting: false,');
  if (col.filterVariant) {
    lines.push('    enableColumnFilter: true,');
    lines.push(`    meta: { filterVariant: '${col.filterVariant}' },`);
  }
  if (col.exportAs === 'number') lines.push('    exportAsNumber: true,');
  if (col.exportAs === 'percentage') lines.push('    exportAsPercentage: true,');
  if (withFooter) lines.push("    footer: () => 'Total',");
  const cell = cellRenderer(col);
  if (cell) lines.push(cell);
  return `  {\n${lines.join('\n')}\n  },`;
}

function actionLabel(action: DataTableRowActionType): string {
  switch (action) {
    case 'open-new-tab':
      return 'Open in New Tab';
    case 'more':
      return 'More';
    case 'void':
      return 'Void';
    default:
      return toPascalCase(action);
  }
}

// ─── Pure builder ────────────────────────────────────────────────────────────

export function buildDataTable(
  input: DataTableToolInput = {}
): DataTableOutput {
  const entity = toPascalCase(input.entityName || 'Item');
  const entityCamel = toCamelCase(entity);
  const tableId = input.tableId || `${toKebabCase(entity)}-table`;
  const features = input.features ?? {};
  const paginationMode = features.paginationMode ?? 'client';
  const selectionMode = features.rowSelection ?? 'none';
  const expansionMode = features.expansion ?? 'none';
  const rowActions = features.rowActions ?? [];
  const columns = input.columns?.length ? input.columns : DEFAULT_COLUMNS;
  const notes: string[] = [];

  const hasCurrency = columns.some((c) => c.type === 'currency');
  const hasFilters = columns.some((c) => c.filterVariant);
  const hasExportFlags = columns.some((c) => c.exportAs);
  const usesResetCacheVersion = features.persistStateVersion !== undefined;
  const needsPaginationState =
    paginationMode === 'server' || paginationMode === 'manual';

  // ── Types block ──
  const typeLines = columns.map((c) => `  ${c.key}: ${tsTypeFor(c)};`);
  let types = `export interface ${entity} {\n${typeLines.join('\n')}\n}`;
  if (expansionMode === 'subDataTable') {
    types += `\n\nexport interface ${entity}Detail {\n  id: string;\n  description: string;\n  amount: number;\n}`;
  }

  const propsFields: string[] = [`  data: ${entity}[];`];
  if (needsPaginationState) {
    propsFields.push('  totalCount: number;');
    propsFields.push(
      '  onPaginationChange?: (pagination: TanstackTable.PaginationState) => void;'
    );
  }
  if (features.manualSorting) {
    propsFields.push(
      '  onSortChange?: (model: TanstackTable.SortingState) => void;'
    );
  }
  if (features.statesHandling) {
    propsFields.push('  isLoading?: boolean;');
    propsFields.push('  isError?: boolean;');
  }
  if (expansionMode === 'subDataTable') {
    propsFields.push(`  detailData: ${entity}Detail[];`);
  }
  const propsInterface = `export interface ${entity}TableProps {\n${propsFields.join(
    '\n'
  )}\n}`;
  types += `\n\n${propsInterface}`;

  // ── Imports ──
  const reactImports = new Set<string>();
  if (needsPaginationState) reactImports.add('useState');
  if (paginationMode === 'manual') reactImports.add('useEffect');

  const tucuValueImports = new Set<string>(['DataTable', 'TanstackTable']);
  if (usesResetCacheVersion) tucuValueImports.add('useResetCacheVersion');
  const tucuTypeImports = new Set<string>();
  if (rowActions.length > 0) tucuTypeImports.add('IRowActions');

  const imports: string[] = [];
  if (reactImports.size > 0) {
    imports.push(
      `import { ${[...reactImports].sort().join(', ')} } from 'react';`
    );
  }
  imports.push(
    `import { ${[...tucuValueImports]
      .sort()
      .join(', ')} } from '@e-burgos/tucu-ui';`
  );
  if (tucuTypeImports.size > 0) {
    imports.push(
      `import type { ${[...tucuTypeImports]
        .sort()
        .join(', ')} } from '@e-burgos/tucu-ui';`
    );
  }

  // ── Module-level declarations ──
  const moduleDecls: string[] = [`const TABLE_ID = '${tableId}';`];

  if (hasCurrency) {
    moduleDecls.push(
      "const currencyFormatter = new Intl.NumberFormat('en-US', {\n  style: 'currency',\n  currency: 'USD',\n});"
    );
  }

  const footerTargetKey = features.showFooter
    ? (columns.find((c) => c.type === 'number' || c.type === 'currency') ??
        columns[0])?.key
    : undefined;
  const columnDefs = columns
    .map((c) => buildColumnDef(c, c.key === footerTargetKey))
    .join('\n');
  moduleDecls.push(
    `const ${entityCamel}Columns: TanstackTable.ColumnDef<${entity}, ${entity}>[] = [\n${columnDefs}\n];`
  );

  if (expansionMode === 'subDataTable') {
    moduleDecls.push(
      [
        `const ${entityCamel}DetailColumns: TanstackTable.ColumnDef<${entity}Detail, ${entity}Detail>[] = [`,
        "  { id: 'id', accessorKey: 'id', header: 'ID', size: 80 },",
        "  { id: 'description', accessorKey: 'description', header: 'Description' },",
        "  { id: 'amount', accessorKey: 'amount', header: 'Amount', size: 120 },",
        '];',
      ].join('\n')
    );
  }

  if (rowActions.length > 0) {
    const scopeComment = features.withScopes
      ? [
          '// NOTE: tucu-ui validates requiredScopes against an internal scope list,',
          '// but its setter (setScopes) is NOT exported from @e-burgos/tucu-ui 3.0.0.',
          '// Until it is public, actions gated only by requiredScopes stay disabled —',
          '// use the disabled/hidden callbacks below for permission gating instead.',
        ].join('\n') + '\n'
      : '';
    const actionDefs = rowActions
      .map((action) => {
        const lines: string[] = [
          `    action: '${action}',`,
          `    label: () => '${actionLabel(action)}',`,
          '    onClick: (row) => {',
          `      console.log('${action}', row.original);`,
          '    },',
        ];
        if (features.withScopes) {
          lines.push(`    requiredScopes: ['${entityCamel}:${action}'],`);
          lines.push('    disabled: () => false, // TODO: wire your own permission check');
        }
        return `  {\n${lines.join('\n')}\n  },`;
      })
      .join('\n');
    moduleDecls.push(
      `${scopeComment}const ${entityCamel}RowActions: IRowActions<${entity}>[] = [\n${actionDefs}\n];`
    );
  }

  // ── Component body ──
  const bodyLines: string[] = [];
  if (usesResetCacheVersion) {
    bodyLines.push(
      `  // Bump this version whenever the column schema changes to wipe stale`,
      `  // persisted layouts (localStorage key: \`\${TABLE_ID}-datatable\`).`,
      `  useResetCacheVersion(TABLE_ID, { version: ${features.persistStateVersion} });`,
      ''
    );
  }
  if (paginationMode === 'server') {
    bodyLines.push(
      '  const [pagination, setPagination] =',
      '    useState<TanstackTable.PaginationState>({ pageIndex: 0, pageSize: 10 });',
      '',
      '  const handlePaginationChange = (next: TanstackTable.PaginationState) => {',
      '    setPagination(next);',
      '    // DataTable already synced its persisted store; refetch your page here.',
      '    onPaginationChange?.(next);',
      '  };',
      ''
    );
  }
  if (paginationMode === 'manual') {
    bodyLines.push(
      '  const [pagination, setPagination] =',
      '    useState<TanstackTable.PaginationState>({ pageIndex: 0, pageSize: 10 });',
      '',
      '  useEffect(() => {',
      '    // Fully controlled mode: fetch the page for the new pagination state.',
      '    onPaginationChange?.(pagination);',
      '  }, [pagination, onPaginationChange]);',
      ''
    );
  }

  // ── DataTable props ──
  const dtProps: string[] = [
    '      tableId={TABLE_ID}',
    '      data={data}',
    `      columns={${entityCamel}Columns}`,
    '      showHeader',
  ];

  switch (paginationMode) {
    case 'client':
      dtProps.push(
        '      pagination={{ showPagination: true, rowsInfo: true }}'
      );
      break;
    case 'none':
      dtProps.push(
        '      // The client row model always paginates: hide the controls and use a',
        '      // pageSize larger than the dataset to render every row.',
        '      pagination={{ showPagination: false, pageSize: 1000 }}'
      );
      break;
    case 'server':
      dtProps.push(
        '      pagination={{',
        '        showPagination: true,',
        '        rowsInfo: true,',
        '        serverPagination: {',
        '          totalCount,',
        '          pagination,',
        '          setPagination: handlePaginationChange,',
        '        },',
        '      }}'
      );
      break;
    case 'manual':
      dtProps.push(
        '      pagination={{',
        '        showPagination: true,',
        '        rowsInfo: true,',
        '        manualPagination: {',
        '          enabled: true,',
        '          rowCount: totalCount,',
        '          pagination,',
        '          setPagination,',
        '        },',
        '      }}'
      );
      break;
  }

  if (selectionMode !== 'none') {
    dtProps.push(
      '      rowSelection={{',
      `        type: '${selectionMode}',`,
      '        getSelection: (rows) => {',
      "          console.log('selected', rows.map((row) => row.original));",
      '        },',
      '      }}'
    );
  }

  if (rowActions.length > 0) {
    dtProps.push(`      rowActions={${entityCamel}RowActions}`);
  }

  if (expansionMode === 'subComponent') {
    dtProps.push(
      '      renderSubComponent={({ row }) => (',
      '        <div className="p-4">',
      '          <pre>{JSON.stringify(row?.original, null, 2)}</pre>',
      '        </div>',
      '      )}'
    );
  }
  if (expansionMode === 'subDataTable') {
    dtProps.push(
      '      renderSubDataTable={{',
      `        columns: ${entityCamel}DetailColumns,`,
      '        data: detailData,',
      '        expandedColumnSize: 50,',
      '      }}'
    );
  }

  if (features.globalSearch) {
    const searchable = columns
      .filter((c) => tsTypeFor(c) === 'string')
      .map((c) => `'${c.key}'`);
    const keys = searchable.length
      ? searchable
      : columns.map((c) => `'${c.key}'`);
    dtProps.push(`      searchableColumns={[${keys.join(', ')}]}`);
  }
  if (features.columnVisibilityManager) {
    dtProps.push('      enableHideColumns');
  }
  if (features.multiSort) {
    dtProps.push('      enableMultiSort');
  }
  if (features.manualSorting) {
    dtProps.push(
      '      manualSorting',
      '      onSortModelChange={(model) => onSortChange?.(model)}'
    );
  }
  if (features.showFooter) {
    dtProps.push('      showFooter');
  }
  if (features.smallAnatomy) {
    dtProps.push('      smallAnatomy');
  }
  if (features.statesHandling) {
    dtProps.push(
      '      isLoading={isLoading}',
      '      isError={isError}',
      '      stateMessage={{',
      `        noData: 'No ${entityCamel} records found',`,
      `        errorData: 'There was a problem loading ${entityCamel} data',`,
      '        hideContactSupport: true,',
      '      }}'
    );
  }

  // ── Component ──
  const destructured: string[] = ['data'];
  if (needsPaginationState) destructured.push('totalCount', 'onPaginationChange');
  if (features.manualSorting) destructured.push('onSortChange');
  if (features.statesHandling) destructured.push('isLoading', 'isError');
  if (expansionMode === 'subDataTable') destructured.push('detailData');

  const component = [
    `export function ${entity}Table({`,
    `  ${destructured.join(',\n  ')},`,
    `}: ${entity}TableProps) {`,
    ...(bodyLines.length ? bodyLines : []),
    '  return (',
    '    <DataTable',
    ...dtProps,
    '    />',
    '  );',
    '}',
  ].join('\n');

  const componentCode = [
    imports.join('\n'),
    "// Styles are not auto-imported by the library. Add once in your app entry:\n// import '@e-burgos/tucu-ui/styles';",
    types,
    moduleDecls.join('\n\n'),
    component,
  ].join('\n\n');

  // ── Notes (gotchas relevant to the requested features) ──
  notes.push(
    `tableId ('${tableId}') must be unique and stable: it keys the persisted state in localStorage ('${tableId}-datatable') and the cache-version registry.`
  );
  notes.push(
    'Every column has an explicit id — required for stable column order, visibility, pinning and sizing state.'
  );
  notes.push(
    "Import the CSS once per app: '@e-burgos/tucu-ui/styles' (compiled) or '@e-burgos/tucu-ui/theme' + @source directive with your own Tailwind v4 build."
  );
  notes.push(
    'Columns without an explicit size split the remaining container width evenly; the table body maxHeight defaults to 373px (override via sx.tableContainer).'
  );
  notes.push(
    'Persisted state (pagination, sorting, column layout) seeds the table on mount and can shadow prop changes — use pagination.takeDefaultPagination or bump the cache version to reset.'
  );
  if (paginationMode === 'server') {
    notes.push(
      'Server pagination: on mount DataTable restores the persisted page/size and pushes it back through setPagination, so your parent refetches the restored page. Pass takeDefaultPagination: true to always start from your own defaults.'
    );
  }
  if (paginationMode === 'manual') {
    notes.push(
      'Manual pagination is fully controlled: the table reads manualPagination.pagination from the prop on every render; pass already-paginated data plus rowCount.'
    );
  }
  if (paginationMode === 'none') {
    notes.push(
      'paginationMode "none" still uses the client pagination row model — the generated pageSize: 1000 must stay larger than your dataset or trailing rows will be hidden.'
    );
  }
  if (selectionMode !== 'none') {
    notes.push(
      'Row identity is the array INDEX (getRowId = index), not a data id: replacing or reordering the data array remaps the selection. Selection is never persisted and resets on remount.'
    );
  }
  if (rowActions.length === 1 && !features.withScopes) {
    notes.push(
      'A single row action renders as an inline icon; pass forceShowMenuActions to force the "..." menu.'
    );
  }
  if (rowActions.length > 1) {
    notes.push(
      'Multiple row actions render as a "..." menu in a portal on document.body.'
    );
  }
  if (features.withScopes) {
    notes.push(
      'setScopes/validateScopes are internal in tucu-ui 3.0.0 (not exported). requiredScopes is emitted for forward compatibility, but gate permissions through the disabled/hidden callbacks.'
    );
  }
  if (expansionMode === 'subDataTable') {
    notes.push(
      'renderSubDataTable uses ONE static dataset for every expanded row (nested table id `${tableId}-${row.index}`, pageSize 5, takeDefaultPagination). For per-row detail data use renderSubComponent instead.'
    );
  }
  if (features.multiSort) {
    notes.push(
      'Multi-sort is hard-capped at 2 columns (maxMultiSortColCount) and every header click is a multi-sort event — no Shift key needed.'
    );
  }
  if (features.manualSorting) {
    notes.push(
      'manualSorting disables client-side sorting; onSortModelChange fires with the new SortingState ({ id, desc }[]) after every sort interaction, including clearing.'
    );
  }
  if (hasFilters) {
    notes.push(
      "Column filters only render on columns with enableColumnFilter: true (default false). filterVariant 'select' currently shows placeholder options — its option list is not data-driven."
    );
  }
  if (hasExportFlags) {
    notes.push(
      'exportAsNumber/exportAsPercentage feed the reportData mirror (via parseNumericValueForExport) used to build exports; there is no built-in export button — read reportData from useDataTableContext().'
    );
  }
  if (features.showFooter) {
    notes.push(
      'showFooter renders each column\'s own footer definition — columns without a footer render an empty footer cell.'
    );
  }
  if (usesResetCacheVersion) {
    notes.push(
      'useResetCacheVersion is a plain function despite the name: it clears the localStorage record when the version changes, but an already-mounted table keeps its in-memory state until remount.'
    );
  }
  if (features.statesHandling) {
    notes.push(
      'Default stateMessage copy includes a "Contact Support" link to the library author\'s site — the generated code hides it (hideContactSupport: true); override contactSupportLink to point at your own support page.'
    );
  }

  return { componentCode, imports, types, notes };
}

// ─── MCP registration ────────────────────────────────────────────────────────

const columnSchema = z.object({
  key: z.string().describe('Field name on the row object (used as column id and accessorKey)'),
  header: z.string().optional().describe('Header label. Default: humanized key'),
  type: z
    .enum(['text', 'number', 'date', 'badge', 'currency', 'percentage'])
    .optional()
    .describe('Column data type — drives the TS type and the generated cell renderer'),
  size: z.number().optional().describe('Fixed column width in px. Unsized columns split the remaining width'),
  sortable: z.boolean().optional().describe('Set false to disable sorting for this column'),
  filterVariant: z
    .enum(['text', 'range', 'select'])
    .optional()
    .describe('Enables the per-column filter with this UI variant'),
  exportAs: z
    .enum(['number', 'percentage'])
    .optional()
    .describe('Marks the column for numeric/percentage parsing in report/export data'),
});

const featuresSchema = z.object({
  paginationMode: z
    .enum(['none', 'client', 'server', 'manual'])
    .optional()
    .describe('client (default): in-memory. server: parent refetches, persisted page restored on mount. manual: fully controlled. none: hide controls'),
  rowSelection: z.enum(['none', 'checkbox', 'radio']).optional(),
  rowActions: z
    .array(z.enum(['more', 'open-new-tab', 'view', 'edit', 'delete', 'download', 'void']))
    .optional()
    .describe('Row action types. One action = inline icon; several = "..." menu'),
  withScopes: z
    .boolean()
    .optional()
    .describe('Emit requiredScopes on row actions (see notes: setScopes is not public in tucu-ui 3.0.0)'),
  expansion: z
    .enum(['none', 'subComponent', 'subDataTable'])
    .optional()
    .describe('Expanded row content: free component or nested compact DataTable'),
  globalSearch: z.boolean().optional().describe('Global search box over the string columns (searchableColumns)'),
  columnVisibilityManager: z.boolean().optional().describe('"Columns" button + Manage Columns drawer (enableHideColumns)'),
  multiSort: z.boolean().optional().describe('Multi-column sorting (hard-capped at 2 columns)'),
  manualSorting: z.boolean().optional().describe('Server-side sorting via onSortModelChange'),
  showFooter: z.boolean().optional(),
  persistStateVersion: z
    .number()
    .optional()
    .describe('Emit useResetCacheVersion(tableId, { version }) to invalidate persisted layouts'),
  smallAnatomy: z.boolean().optional().describe('Compact 40px rows instead of 52px'),
  statesHandling: z.boolean().optional().describe('isLoading/isError props + custom stateMessage'),
});

export function registerDataTableTools(server: McpServer): void {
  server.tool(
    'generate_datatable',
    'Generate a complete, production-ready DataTable component (TanStack Table v8) for @e-burgos/tucu-ui: typed columns with cell renderers, client/server/manual pagination, sorting, per-column filters, row actions, row selection, expandable rows (including nested sub-tables), persisted-state versioning and export flags. Returns componentCode, imports, types and feature-specific implementation notes. For the full API reference read the tucu://datatable resource.',
    {
      entityName: z
        .string()
        .optional()
        .describe("Entity name in any casing, e.g. 'Invoice' or 'user account'. Default: Item"),
      tableId: z
        .string()
        .optional()
        .describe('Unique, stable table id (persistence key). Default: derived from entityName'),
      columns: z.array(columnSchema).optional().describe('Column definitions. Default: id/name/createdAt sample'),
      features: featuresSchema.optional(),
    },
    async (args) => {
      const output = buildDataTable(args as DataTableToolInput);
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(output, null, 2),
          },
        ],
      };
    }
  );
}
