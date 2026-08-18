# Spec 06 — Dedicated DataTable MCP tool and resource

**Fecha:** 2026-08-12
**Versión:** 1.0
**Estado:** En progreso
**Branch:** `feat/mcp-datatable-tool`
**Dependencias:** Spec 05 (tucu-ui MCP agentic server)

## Resumen

El MCP server (`@e-burgos/tucu-ui-mcp`) hoy conoce el DataTable solo de forma
superficial: entradas en `component-registry.ts`, una subsección del resource
`tucu://catalog` y menciones en el changelog. No existe ni un resource dedicado
ni una tool de generación específica, a pesar de que DataTable es el componente
más complejo de la librería (TanStack Table v8, 20+ props opcionales,
persistencia Zustand, 3 modos de paginación, dnd-kit, row actions con scopes,
expansión anidada, export/report, theming propio).

Este spec agrega:

1. **Resource `tucu://datatable`**: referencia completa y fiel al código de
   `ui/tucu-ui/src/datatable/` — arquitectura, props, extensiones de ColumnDef,
   semántica exacta de cada feature, persistencia, export, theming y gotchas.
2. **Tool `generate_datatable`**: genera TSX listo para usar contra la API real
   de `@e-burgos/tucu-ui`, parametrizado por columnas y features. La lógica es
   un builder puro exportado (`buildDataTable`) testeable sin MCP, siguiendo el
   precedente de `generateDocumentation`.
3. **Enriquecimiento** del component-registry y del catalog con referencias
   cruzadas a la nueva tool/resource.
4. **Docs**: README del MCP (contando además los 3 tools ya registrados pero
   no listados) y AGENTS.md.

## Fuente de verdad

Todo el contenido se verificó contra el source de este repo
(`ui/tucu-ui/src/datatable/`, tucu-ui 3.0.0). Diferencias relevantes contra la
implementación hermana de flex-ui:

- `setScopes`/`getScopes`/`validateScopes` existen internamente
  (`common/functions/user-scopes/`) pero **no se exportan** desde
  `@e-burgos/tucu-ui`. El gating por `requiredScopes` funciona, pero el
  consumidor no puede registrar scopes; la alternativa pública es
  `disabled`/`hidden` por acción. La tool genera código acorde y lo anota.
- `DataTableProps` y `DataTableProvider` no son API pública; todo se importa
  del root `'@e-burgos/tucu-ui'` (no hay subpath `/datatable`).
- El CSS no se importa automáticamente: requiere `@e-burgos/tucu-ui/styles`
  (bundle) o `@e-burgos/tucu-ui/theme` + `@source` (Tailwind v4 propio).

## Arquitectura / Diseño

Archivos nuevos:

- `tools/mcp-server/src/resources/datatable.ts` — `getDataTableContent(): string`
  (markdown, mismo patrón que los 12 resources existentes).
- `tools/mcp-server/src/tools/datatable-tools.ts` —
  - `export interface DataTableToolInput` / `DataTableOutput`
  - `export function buildDataTable(input): { componentCode, imports, types, notes }`
    (pura, sin dependencias MCP)
  - `export function registerDataTableTools(server: McpServer)` que registra
    `generate_datatable` con `server.tool(name, description, zodRawShape, handler)`.
- `tools/mcp-server/tests/datatable-tools.test.ts`

Archivos modificados:

- `tools/mcp-server/src/resources/index.ts` — entrada `tucu://datatable` (13 resources).
- `tools/mcp-server/src/server.ts` — `registerDataTableTools(server)`.
- `tools/mcp-server/src/data/component-registry.ts` — entrada DataTable
  referencia `generate_datatable` y `tucu://datatable`.
- `tools/mcp-server/src/resources/catalog.ts` — sección Table cruza a la tool/resource.
- `tools/mcp-server/tests/resources.test.ts` — conteo 12→13 + content assertions.
- `tools/mcp-server/README.md` — Features (11 tools / 13 resources), sección de
  la tool, fila del resource, y alta de los tools faltantes
  (`search_components`, `get_props`, `generate_documentation`).
- `AGENTS.md` — tabla de capacidades del MCP (11 tools / 13 resources).

### Input schema de `generate_datatable` (zod raw shape)

- `entityName?: string` — nombre PascalCase de la entidad (default `Item`).
- `tableId?: string` — default derivado de entityName (kebab-case).
- `columns?: Array<{ key, header?, type? ('text'|'number'|'date'|'badge'|'currency'|'percentage'), size?, sortable?, filterVariant? ('text'|'range'|'select'), exportAs? ('number'|'percentage') }>`
- `features?: { paginationMode? ('none'|'client'|'server'|'manual'), rowSelection? ('none'|'checkbox'|'radio'), rowActions?: RowActionsType[], withScopes?, expansion? ('none'|'subComponent'|'subDataTable'), globalSearch?, columnVisibilityManager?, multiSort?, manualSorting?, showFooter?, persistStateVersion?: number, smallAnatomy?, statesHandling? }`

### Output

`{ componentCode: string, imports: string[], types: string, notes: string[] }`,
devuelto por el handler como bloque `text` con JSON pretty-printed (patrón del
resto de los tools). Las `notes` incluyen solo los gotchas relevantes a las
features pedidas.

## Fases de implementación

### Fase A — Resource

- [ ] `src/resources/datatable.ts` con el conocimiento completo verificado.
- [ ] Registro en `src/resources/index.ts`.

### Fase B — Tool

- [ ] `src/tools/datatable-tools.ts` con `buildDataTable` puro + registro MCP.
- [ ] Wiring en `src/server.ts`.

### Fase C — Conocimiento existente y docs

- [ ] component-registry + catalog con cross-references.
- [ ] README del MCP y AGENTS.md.

### Fase D — Tests y verificación

- [ ] `tests/datatable-tools.test.ts` (casos: básico, columnas custom,
      server/manual pagination, row actions + scopes, selección, sub-tabla,
      search+visibility+multiSort+footer, manual sorting, cache version,
      filtros por columna, export flags, balance de llaves).
- [ ] `tests/resources.test.ts` actualizado.
- [ ] `pnpm nx build tucu-ui-mcp` y `pnpm nx test tucu-ui-mcp` en verde.

## Criterios de aceptación

- [ ] Build exitoso (`pnpm nx build tucu-ui-mcp`)
- [ ] Suite completa del MCP en verde (`pnpm nx test tucu-ui-mcp`)
- [ ] `tucu://datatable` registrado y con contenido fiel al código
- [ ] `generate_datatable` registrado; `buildDataTable` exportado y puro
- [ ] El TSX generado usa exclusivamente API pública de `@e-burgos/tucu-ui`
- [ ] README y AGENTS.md consistentes con los conteos reales (11/13)

## Out of scope

- Cambios en la librería `tucu-ui` (el datatable no se toca).
- Publicación a npm / release (flujo aparte vía skill publish).
- Exponer `setScopes` como API pública (sería un cambio de librería).

## Decisiones de diseño

| # | Decisión | Alternativa | Razón |
|---|----------|-------------|-------|
| 1 | Builder puro exportado + registro separado | Handler inline como generate_form | Precedente de `generateDocumentation`; testeable sin MCP, pedido explícito de la tarea |
| 2 | Generar `requiredScopes` + `disabled` y anotar que `setScopes` no es público | Generar `import { setScopes }` | Ese import no compila contra tucu-ui 3.0.0; el código gana |
| 3 | Resource nuevo en vez de engordar `catalog` | Extender catalog | catalog es un índice general; el nivel de detalle requerido justifica un resource dedicado (igual que charts/forms) |
| 4 | Corregir de paso el conteo/listado de tools del README | Dejarlo stale | El README dice 7 tools y el código registra 10 (11 con esta); tocarlo igual era parte del pedido |
