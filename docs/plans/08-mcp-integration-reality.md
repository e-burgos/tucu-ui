# Plan 08 — MCP: documentar la realidad de integración de tucu-ui

**Spec:** docs/specs/08-mcp-integration-reality.md
**Branch:** feat/sidebar-pinning-mcp-reality
**Depende de:** Spec 07 implementada (collapsedLogo / pin ya en el código)

## Estado inicial requerido

```bash
pnpm nx run tucu-ui-mcp:test   # suite previa en verde
```

## Fase A — Relevamiento (todo contra ui/tucu-ui/src)

1. `grep -rn 'data-tucu' ui/tucu-ui/src` → mapa de anclajes componente→selector.
2. Identificar componentes sin gancho (CleanLayout, scroller del ThemeWrapper,
   backdrop del Drawer, DataTable) — re-verificar cada uno en tucu-ui.
3. `theme-wrapper`/`use-theme`: claves reales del mapa de paleta custom, shape del
   store, clave de localStorage, migración, partialize, presets reales.
4. CSS real (`themes.css` o equivalente): tokens publicados vs existentes,
   breakpoints, estrategia dark.
5. DrawerContainer/Drawer/DataTable/Input/forms: props y comportamientos reales.

## Fase B — Escritura de resources

- `styling-overrides.ts` + `shell.ts` nuevos, registrados en `resources/index.ts`.
- `theme.ts`, `tokens.ts`, `layouts.ts`, `forms.ts` extendidos.
- `component-registry.ts` + `catalog.ts`: gaps de catálogo.

## Fase C — Tests

- `tests/resources.test.ts`: conteo de resources, contenido no vacío, anti-regresión
  `type=` en el ejemplo de Drawer.
- `tests/component-tools.test.ts`: DrawerContainer presente con props reales.

## Criterios de aceptación

- [ ] Los de la spec 08

## Verificación

```bash
pnpm nx run tucu-ui-mcp:test
pnpm nx build tucu-ui-mcp
pnpm nx lint tucu-ui-mcp
```

## Post-implementación

- [ ] CHANGELOG del MCP se regenera en el release (scripts/publish.mjs), no a mano
