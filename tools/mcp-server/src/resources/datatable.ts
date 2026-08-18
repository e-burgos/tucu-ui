// ─── Resource: DataTable (TanStack Table v8) ────────────────────────────────
// Complete implementation reference for the DataTable module.
// Verified against ui/tucu-ui/src/datatable/ (tucu-ui 3.0.0).

export function getDataTableContent(): string {
  return `# DataTable — @e-burgos/tucu-ui (Complete Implementation Reference)

Full-featured data table built on TanStack Table v8. Use the \`generate_datatable\`
tool to scaffold a working table; use this resource as the authoritative API and
behavior reference.

## Architecture

Component chain: \`DataTable<T>\` → \`DataTableProvider<T>\` (React context that owns
ALL state and the single \`useReactTable()\` call) → \`DataTableComponent<T>\`
(TableWrapper chrome, TableHead/TableHeader, rows, footer, pagination).

- **Rendering is div-based with ARIA roles** (\`role="table"\`, \`role="rowgroup"\`,
  \`role="row"\`, \`role="cell"\`, \`role="rowheader"\`) — there is no \`<table>\` element.
- Context is read with the exported \`useDataTableContext()\` hook (returns \`null\`
  and logs an error outside a provider; it does not throw).
- \`TanstackTable\` is exported as a **namespace re-export of the full
  @tanstack/react-table v8 API**: use \`TanstackTable.ColumnDef\`,
  \`TanstackTable.SortingState\`, \`TanstackTable.PaginationState\`, \`TanstackTable.Row\`, etc.

### Public exports (all from the single root path '@e-burgos/tucu-ui')

- Components: \`DataTable\`, \`DataTableComponent\` (low-level, takes a table instance via context)
- Context: \`useDataTableContext\`
- Namespace: \`TanstackTable\`
- Helpers: \`convertColumns\` (+ \`GridColumns\` type — MUI DataGrid migration),
  \`parseNumericValueForExport\`, \`checkIsPercentage\`, \`sortingCompareNumberFn\`,
  \`sortingCompareStringFn\`
- Hooks: \`useDataTableStore\`, \`getCommonPinningStyles\` (plain function;
  \`useGetCommonPinningStyles\` is a deprecated alias), \`useResetCacheVersion\`,
  \`useScrollableTable\`, \`useComponentEventListener\`
- Icons: \`ArrowIndicator\`, \`MoreIndicator\`, \`EditIndicator\`, \`DeleteIndicator\`,
  \`DownloadIndicator\`, \`ViewDetailsIndicator\`, \`OpenNewTab\`, \`VoidIndicator\`,
  \`DragIndicator\`, \`PinIndicator\`, \`VisibilityIndicator\`, \`FilterIndicator\`, and more
- Types: \`IOptionalDataTableProps\`, \`IPaginationOptions\`, \`IManualPaginationOptions\`,
  \`IServerPagination\`, \`IRowActions\`, \`RowActionsType\`, \`IRowSelection\`,
  \`IHeaderOptions\`, \`IDataTableStyles\`, \`IDataTableStateMessage\`,
  \`IRenderSubDataTable\`, \`SubComponentProps\`, \`ReportDataState\`

**NOT public** (internal despite existing in source): \`DataTableProps\`,
\`DataTableProvider\`, \`setScopes\`, \`getScopes\`, \`validateScopes\`. There is no
\`@e-burgos/tucu-ui/datatable\` subpath — everything imports from the root.

## Required props

\`\`\`ts
tableId: string;                    // unique + stable: it is the localStorage persistence key
data: Array<T>;
columns: Array<TanstackTable.ColumnDef<T, T>>;
showHeader?: boolean;               // effectively required by convention, defaults to true
mode?: 'dark' | 'light';            // per-table theme override (sets data-theme on the wrapper)
\`\`\`

## Optional props (IOptionalDataTableProps<T>)

| Prop | Type | Behavior |
|------|------|----------|
| \`sx\` | \`IDataTableStyles\` | Style slots: wrapper, wrapperContainer, tableContainer, messageContainer, table, thead, tbody, tfoot, header, row, rowExpanded, cell, pagination, container (all React.CSSProperties) |
| \`initialConfig\` | \`Partial<ColumnDef>\` | Merged into TanStack \`defaultColumn\` (size/minSize/maxSize/enableResizing/enableSorting/enablePinning/enableHiding/enableColumnFilter) |
| \`isLoading\` / \`isError\` | \`boolean\` | Drive the StateTableHandler panel (spinner / error message) |
| \`isFetching\` | \`boolean\` | Translucent overlay + spinner over the table (only when not isLoading) |
| \`pagination\` | \`IPaginationOptions\` | See Pagination modes below |
| \`title\` | \`string\` | Header bar title; also auto-enables border |
| \`border\` | \`boolean\` | When undefined, auto-derived from title/headerContainer/enableHideColumns/search/rightActions |
| \`headerOptions\` | \`IHeaderOptions\` | headerContainer, enableHideColumns (per-header eye toggle), enablePinLeftColumns, enablePinRightColumns, enableSortColumns, enableResizeColumns, enableDragColumns, className |
| \`smallAnatomy\` | \`boolean\` | 40px header/row height instead of 52px |
| \`showFooter\` | \`boolean\` | Renders Footer from each column's \`footer\` def (no default content) |
| \`stateMessage\` | \`IDataTableStateMessage\` | noData, noDataDescription, errorData, errorDataDescription, contactSupport, contactSupportLink, hideContactSupport, className |
| \`rowActions\` | \`IRowActions<T>[]\` | Adds the pinned-right RowActionsColumn |
| \`rowSelection\` | \`IRowSelection<T>\` | \`{ type: 'checkbox' \\| 'radio', getSelection?: (rows: Row<T>[]) => void }\` |
| \`forceShowMenuActions\` | \`boolean\` | Forces the "..." menu even with a single action |
| \`renderSubComponent\` | \`React.FC<SubComponentProps<T>> \\| null\` | Free-form expanded row content |
| \`renderSubDataTable\` | \`IRenderSubDataTable\` | \`{ columns, data, expandedColumnSize? }\` — nested compact DataTable; takes precedence over renderSubComponent |
| \`setCurrentRow\` | \`(row: Row<T>) => void\` | Row onClick callback |
| \`enableMultiSort\` | \`boolean\` | Multi-column sorting, hard-capped at 2 columns (\`maxMultiSortColCount: 2\`); every click is a multi-sort event (no Shift needed) |
| \`manualSorting\` | \`boolean\` | Passed to useReactTable; disables client sorting |
| \`onSortModelChange\` | \`(model: SortingState) => void\` | Fired with the new \`{ id, desc }[]\` after every sort change |
| \`enableHideColumns\` | \`boolean\` | Shows the "Columns" button that opens the "Manage Columns" drawer |
| \`searchableColumns\` | \`string[]\` | Shows the global search input, restricted to these column ids |
| \`rightActions\` | \`React.ReactNode\` | Arbitrary node in the header action row |

## ColumnDef extensions (module augmentation)

Importing anything from '@e-burgos/tucu-ui' activates the augmentation:

\`\`\`ts
// Extra fields available on every ColumnDef:
enableDraggable?: boolean;       // per-column drag opt-out (default true)
enableVisible?: boolean;         // per-column visibility manager opt-out
accessorHeaderFn?: () => string; // header label for export when header is a custom renderer
exportAsNumber?: boolean;        // report/export: parse cell text as number
exportAsPercentage?: boolean;    // report/export: parse cell text as percentage
meta?: { filterVariant?: 'text' | 'range' | 'select' };
\`\`\`

\`filterVariant\` UIs: \`'text'\` (default, debounced 500ms input), \`'range'\` (min/max
number inputs → \`[number, number]\` filter value), \`'select'\` (currently a static
placeholder select — options are not data-driven). Column filters only appear on
columns with \`enableColumnFilter: true\` (default is false).

## Pagination modes (IPaginationOptions)

\`\`\`ts
interface IPaginationOptions {
  showPagination: boolean;
  rowsInfo?: boolean;
  pageIndex?: number;
  pageSize?: number;              // default 10
  totalCount?: number;
  hideRecordsSelector?: boolean;
  manualPagination?: { enabled: boolean; rowCount: number; pagination: PaginationState; setPagination: Dispatch<SetStateAction<PaginationState>> };
  serverPagination?: { searchFilter?: string; totalCount: number; pagination: PaginationState; setPagination: (p: PaginationState) => void };
  takeDefaultPagination?: boolean; // ignore persisted page/size, use the props
}
\`\`\`

1. **Client (default)**: TanStack paginates the full in-memory array
   (\`getPaginationRowModel\`). Page/size persist per tableId.
2. **serverPagination**: parent owns data fetching. The internal wrapper around
   \`setPagination\` updates internal state and the persisted Zustand store FIRST,
   then calls the parent's \`setPagination\` so it can refetch. On mount, a
   one-shot effect restores the persisted page/size and pushes it back up to the
   parent via its \`setPagination\` (so the parent refetches the restored page).
   Set \`takeDefaultPagination: true\` to ignore the persisted value.
3. **manualPagination**: fully controlled — the table reads
   \`manualPagination.pagination\` from the prop on every render; parent passes
   already-paginated data plus \`rowCount\`.

## Column pinning

Three internal columns are ALWAYS force-pinned when present, 50px each:
\`Expanded\` (left), \`RowSelectionColumn\` (left), \`RowActionsColumn\` (right).
User columns pin via header pin buttons (\`headerOptions.enablePinLeftColumns\` /
\`enablePinRightColumns\`). Sticky positioning styles come from
\`getCommonPinningStyles(column)\` → \`{ pinStyles, isPinned, ... }\`.

## Drag & drop, resize, visibility

- **Column drag**: dnd-kit, horizontal axis only (\`restrictToHorizontalAxis\`),
  updates \`columnOrder\` (persisted). Opt out per column with
  \`enableDraggable: false\` or globally with \`headerOptions.enableDragColumns: false\`.
  Row drag is NOT a feature (vestigial hooks exist but no row SortableContext).
- **Resize**: \`columnResizeMode: 'onChange'\` (hard-coded). Double-click on the
  resize handle resets the column size. Gate with \`headerOptions.enableResizeColumns\`.
- **Visibility**: \`enableHideColumns\` (table prop) shows the "Columns" button →
  "Manage Columns" drawer (checkbox list + Show All / Hide All). The separate
  \`headerOptions.enableHideColumns\` flag adds a per-header eye toggle instead.

## Row actions

\`\`\`ts
type RowActionsType = 'more' | 'open-new-tab' | 'view' | 'edit' | 'delete' | 'download' | 'void';
interface IRowActions<T> {
  action: RowActionsType;
  label: (row: Row<T>) => string;
  onClick: (row: Row<T>) => void;
  requiredScopes?: string | string[];
  disabled?: (row: Row<T>) => boolean;   // takes precedence over scope validation
  hidden?: (row: Row<T>) => boolean;
  showOptions?: boolean;
  showLabelInTooltip?: boolean;
}
\`\`\`

- Exactly one action (and no \`forceShowMenuActions\`) → inline icon.
  Multiple actions or \`forceShowMenuActions: true\` → "..." button opening a
  dropdown rendered in a React portal on document.body.
- **Scope gating caveat**: actions with \`requiredScopes\` are validated against a
  module-level scope list, but \`setScopes\`/\`validateScopes\` are NOT exported from
  '@e-burgos/tucu-ui' (3.0.0). Without a way to register scopes, actions with
  \`requiredScopes\` end up disabled. Public alternative: implement gating with the
  \`disabled\` / \`hidden\` callbacks.

## Row selection

- \`type: 'checkbox'\` = multi-select (native TanStack toggles, supports
  indeterminate); \`type: 'radio'\` = single-select (click replaces the whole
  selection state).
- \`getSelection(rows)\` fires with the selected \`Row<T>[]\` on every change
  (\`[]\` when cleared).
- **Row identity is the array INDEX** (\`getRowId: (_row, index) => index.toString()\`),
  not a data id. Replacing/reordering the data array remaps selection to
  different logical rows. Selection is NOT persisted and resets on remount.

## Expansion

- \`renderSubComponent\`: called as a function with \`{ row, columns }\` — render
  anything inside the expanded row.
- \`renderSubDataTable: { columns, data, expandedColumnSize? }\`: renders a nested
  compact DataTable (id \`\${tableId}-\${row.index}\`, smallAnatomy, pageSize 5,
  takeDefaultPagination, drag/resize disabled). \`expandedColumnSize\` (default 50)
  controls the left padding of the nested table.

## Persistence (Zustand persist → localStorage)

- Key: \`\${tableId}-datatable\`. One store instance per tableId (module-level Map).
- **Persisted**: pagination, sorting, columnOrder, columnVisibility,
  columnPinning, columnFilters, columnSizing, manualPagination, totalCount.
- **Not persisted**: rowSelection, globalFilter, reportData.
- **Cache invalidation**: \`useResetCacheVersion(tableId, { version, onSuccess?, onError? })\`
  — despite the name it is a plain function (safe anywhere). Compares \`version\`
  against the stored version for that tableId (global store
  'datatable-cache-versions'); when different it removes the
  \`\${tableId}-datatable\` localStorage record and returns true. Bump \`version\`
  whenever you change the column schema so stale persisted layouts are wiped.
  Note it clears localStorage directly: an already-mounted table keeps its
  in-memory state until remount.

## Report / export

- \`reportData: { headers: Map<number, string>, rows: Map<string, Map<number, string>> }\`
  (via \`useDataTableContext().tableState.reportData\`) mirrors the currently
  rendered table — a building block for consumer-authored CSV/Excel export.
  There is no built-in export button.
- The three internal columns are excluded (\`IGNORE_REPORT_COLUMNS\`).
- Header label precedence: rendered DOM text → \`accessorHeaderFn()\` → string
  \`header\` → column id. Cell value precedence: \`accessorFn(rowData)\` → DOM text.
- \`exportAsNumber\` / \`exportAsPercentage\` pass cell text through
  \`parseNumericValueForExport(value, { isPercentage? })\` (strips commas/symbols,
  validates, returns number or undefined).

## Theming

- Tokens: \`--color-table-*\` family (primary, secondary, paper-bg, row-bg,
  row-hover, header-bg, action-bg, divider, dragged-bg, ...) defined in
  datatable.css and derived from global tucu-ui tokens (\`--color-brand\`,
  \`--color-muted\`, \`--color-border\`, ...), so tables follow the app theme
  automatically.
- \`mode\` prop sets \`data-theme\` on the table wrapper for a per-table override.
- **CSS must be imported explicitly** (the JS bundle imports no CSS):
  \`import '@e-burgos/tucu-ui/styles'\` (compiled bundle) or, with your own
  Tailwind v4 build, \`@import '@e-burgos/tucu-ui/theme'\` plus
  \`@source '../node_modules/@e-burgos/tucu-ui';\`.

## Gotchas

1. \`tableId\` must be unique and stable — it keys localStorage persistence and
   the cache-version registry. Duplicated ids share state; changing the id
   discards prior state.
2. Give every column an explicit stable \`id\` (falls back to \`accessorKey\`;
   columns with neither break order/visibility/pinning state).
3. Columns without \`size\` split the remaining container width evenly after
   subtracting sized columns and the 50px internal columns.
4. Default table body maxHeight is **373px** (~6 rows). Override with
   \`sx: { tableContainer: { maxHeight: '...' } }\`.
5. Persisted state seeds pagination/sorting/layout on mount and can shadow prop
   changes — use \`pagination.takeDefaultPagination: true\` or bump the
   \`useResetCacheVersion\` version.
6. \`stateMessage\` defaults include a "Contact Support" button linking to the
   library author's site — override \`contactSupportLink\` or set
   \`hideContactSupport: true\`.
7. \`convertColumns(gridColumns)\` migrates MUI DataGrid \`GridColumns[]\` to
   TanStack ColumnDefs (field → id/accessorKey, disableReorder → enableDraggable,
   hide → enableVisible). \`filterable\` is not mapped yet.
8. \`enableRowSelection\` and row expansion are always on at the TanStack level;
   the UI columns only appear when you pass \`rowSelection\` /
   \`renderSubComponent\` / \`renderSubDataTable\`.

## Minimal example

\`\`\`tsx
import { DataTable, TanstackTable } from '@e-burgos/tucu-ui';

interface User { id: string; name: string; email: string; }

const columns: TanstackTable.ColumnDef<User, User>[] = [
  { id: 'name', accessorKey: 'name', header: 'Name' },
  { id: 'email', accessorKey: 'email', header: 'Email', size: 240 },
];

export function UsersTable({ users }: { users: User[] }) {
  return (
    <DataTable
      tableId="users-table"
      data={users}
      columns={columns}
      showHeader
      pagination={{ showPagination: true, rowsInfo: true }}
    />
  );
}
\`\`\`

Use the \`generate_datatable\` tool for full scaffolds (server pagination, row
actions, selection, nested sub-tables, column filters, export flags, etc.).
`;
}
