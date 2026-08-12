# Plan 06 — Dedicated DataTable MCP tool and resource

**Spec:** docs/specs/06-mcp-datatable-tool.md
**Branch:** feat/mcp-datatable-tool
**Depende de:** Spec 05

## Estado inicial requerido

```bash
git branch --show-current           # feat/mcp-datatable-tool
ls tools/mcp-server/src/resources   # 12 resources actuales
ls tools/mcp-server/src/tools       # component-tools.ts, generation-tools.ts
```

## Fase A — Resource `tucu://datatable`

1. Crear `tools/mcp-server/src/resources/datatable.ts`:
   `export function getDataTableContent(): string` con markdown que cubra:
   arquitectura (DataTable → DataTableProvider → DataTableComponent, div-based
   ARIA, TanStack v8), props requeridas y las 22 opcionales de
   `IOptionalDataTableProps`, module augmentation de ColumnDef, semántica de
   paginación (client/server/manual, sync del store persistido con el callback
   del padre y restore on mount, `takeDefaultPagination`), sorting (cap 2),
   filtros global/por columna, pinning de columnas especiales (Expanded /
   RowSelectionColumn izquierda, RowActionsColumn derecha, 50px), dnd-kit
   horizontal, resize `onChange` + doble click reset, drawer Manage Columns,
   row actions (7 tipos, scopes internos no públicos, inline vs menú portal),
   row selection (identidad por índice, no persistida), expansión
   (subComponent/subDataTable anidado), footer, estados, persistencia Zustand
   (`${tableId}-datatable`, qué se persiste), `useResetCacheVersion`,
   report/export (`reportData`, `IGNORE_REPORT_COLUMNS`,
   `parseNumericValueForExport`, `accessorHeaderFn`), theming
   (`--color-table-*`, mode, CSS imports) y gotchas.
2. Registrar en `src/resources/index.ts` (import + entrada en el array).

## Fase B — Tool `generate_datatable`

1. Crear `tools/mcp-server/src/tools/datatable-tools.ts`:
   - Tipos de input/output exportados.
   - `export function buildDataTable(input: DataTableToolInput): DataTableOutput`
     — pura, retorna `{ componentCode, imports, types, notes }`.
   - `export function registerDataTableTools(server: McpServer)` con
     `server.tool('generate_datatable', description, zodRawShape, handler)`;
     handler retorna `{ content: [{ type: 'text', text: JSON.stringify(...) }] }`.
2. `src/server.ts`: importar y llamar `registerDataTableTools(server)`.

Reglas del código generado:

- Imports solo de API pública: `DataTable`, `TanstackTable`, tipos
  (`IRowActions`, `IRowSelection`, etc.), `useResetCacheVersion`.
- `TanstackTable.ColumnDef<Entity, Entity>[]`, `id` explícito por columna.
- Server pagination: `useState<TanstackTable.PaginationState>` en el padre +
  `serverPagination: { totalCount, pagination, setPagination }`.
- Manual pagination: `manualPagination: { enabled: true, rowCount, pagination, setPagination }`.
- Scopes: `requiredScopes` + nota de que `setScopes` no es público en 3.0.0.
- `useResetCacheVersion(TABLE_ID, { version })` dentro del componente si
  `persistStateVersion` se pide.
- `notes` con los gotchas relevantes a las features elegidas.

## Fase C — Conocimiento existente y docs

1. `src/data/component-registry.ts`: la descripción de la entrada `DataTable`
   referencia `generate_datatable` y `tucu://datatable`.
2. `src/resources/catalog.ts`: la sección Table agrega la referencia cruzada.
3. `tools/mcp-server/README.md`: Features 7→11 tools y 12→13 resources;
   sección `generate_datatable`; fila `tucu://datatable`; alta de
   `search_components`, `get_props`, `generate_documentation` (registrados
   pero ausentes del README).
4. `AGENTS.md`: tabla de capacidades del MCP → 11 tools / 13 resources con los
   nombres nuevos.

## Fase D — Tests y verificación

1. `tests/datatable-tools.test.ts` (vitest, importa `buildDataTable` directo):
   básico sin args; entityName + columnas custom (number/currency/badge,
   size, sortable:false); server pagination; manual pagination; row actions
   con scopes; selección checkbox/radio; sub-tabla anidada; global search +
   visibility + multiSort + footer; manual sorting; persistStateVersion →
   `useResetCacheVersion`; filterVariant + export flags; balance de
   llaves/paréntesis del `componentCode`.
2. `tests/resources.test.ts`: `toHaveLength(13)`, `contentFns` + 1, spot
   checks del contenido nuevo.

## Verificación

```bash
pnpm nx build tucu-ui-mcp
pnpm nx test tucu-ui-mcp
```

Imprimir el output de `buildDataTable` para el caso más completo (todas las
features activas) y validarlo a ojo contra la API real.

## Post-implementación

- [ ] Push + PR a main (sin publicar a npm)
- [ ] No aplica `tucu-ui-docs-sync` (no se tocan componentes de la librería)
