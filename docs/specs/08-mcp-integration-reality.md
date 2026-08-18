# Spec 08 — MCP: documentar la realidad de integración de tucu-ui

**Fecha:** 2026-08-18
**Versión:** 1.0
**Estado:** Completado
**Branch:** `feat/sidebar-pinning-mcp-reality`
**Dependencias:** Spec 07 (documenta `collapsedLogo` y el pin del sidebar)

## Resumen

Port a tucu-ui-mcp de la spec 05 de flex-ui ("MCP integration reality"): el MCP
cubre el catálogo "feliz" pero no la realidad de integración (overrides de estilo,
shell/orquestación, branding completo, gaps de catálogo, tokens auditados).
**Regla central del port:** cada afirmación se re-deriva y verifica contra el código
de `ui/tucu-ui/src` — no se copia nada de flex-ui (los conteos, claves, selectores y
presets pueden divergir). Cada claim de comportamiento cita su archivo fuente con el
formato `// ui/tucu-ui/src/...`.

## Arquitectura / Diseño

Archivos en `tools/mcp-server/`:

- `src/resources/styling-overrides.ts` (nuevo) — resource `tucu://styling-overrides`
- `src/resources/shell.ts` (nuevo) — resource `tucu://shell`
- `src/resources/theme.ts` (extender)
- `src/resources/tokens.ts` (auditar y corregir)
- `src/resources/layouts.ts` (sync props nuevas de Spec 07)
- `src/resources/forms.ts` (useFormContext re-exportado)
- `src/data/component-registry.ts` (gaps de catálogo)
- `src/resources/catalog.ts` (DrawerContainer u equivalente)
- `tests/resources.test.ts`, `tests/component-tools.test.ts` (extensiones)

## Fases de implementación

### Fase A — Resources nuevos

- [ ] `tucu://styling-overrides`: mapa de anclajes `data-tucu` generado por grep del
      src real; regla del selector compuesto con ejemplo de empate verificado;
      componentes sin gancho + workaround; 4-5 recetas verificadas
- [ ] `tucu://shell`: ThemeProvider standalone vs orquestado, qué monta puertas
      adentro (Router propio, scroller del ThemeWrapper), consecuencias
      (`useLocation` solo debajo del Router, `body.style.overflow` no-op, fondo real
      `bg-body`), slot `rightButton`, navegación full-page `^https?://`

### Fase B — Resources extendidos

- [ ] `theme`: tabla completa del mapa de paleta custom con blast radius re-derivado;
      shape completo de `useTheme`; persistencia (clave, migración, partialize);
      props de logo incluido `collapsedLogo`; divergencias doc-vs-código
- [ ] `tokens`: auditoría por grep contra el CSS real (tokens fantasma, conteo de
      presets); dark mode por clase; breakpoints reales; guía "capa de tokens propia"
- [ ] `layouts`: props nuevas de AdminLayout/ExpandableSidebar (Spec 07)

### Fase C — Gaps de catálogo

- [ ] DrawerContainer (o equivalente) indexado con props y comportamientos reales
- [ ] Ejemplo de Drawer compila (`type` requerido) + advertencias onClose/backdropClassName
- [ ] DataTable: advertencia de `id` explícito con cita de línea
- [ ] Input: icon/padding, `locale`, semántica `type="date"`
- [ ] Forms: `useFormContext` re-exportado + patrón de submit programático

### Fase D — Tests

- [ ] Conteo de resources actualizado; contenido no vacío de los nuevos;
      DrawerContainer en catálogo; ejemplo de Drawer contiene `type=`

## Criterios de aceptación

- [ ] CA-1: `search_components`/`get_component` devuelven DrawerContainer con props reales
- [ ] CA-2: el ejemplo de Drawer compila tal cual contra la API real
- [ ] CA-3: los resources nuevos y extendidos se listan y sirven contenido
- [ ] CA-4: cada afirmación de comportamiento cita el archivo fuente de tucu-ui
- [ ] CA-5: build y tests del MCP en verde (`pnpm nx run tucu-ui-mcp:test`)

## Out of scope

- Cambiar código de la librería (solo `tools/mcp-server`)
- Documentar design systems de consumidores

## Decisiones de diseño

| #   | Decisión                                | Alternativa            | Razón                                                     |
| --- | --------------------------------------- | ---------------------- | --------------------------------------------------------- |
| 1   | Re-derivar todo contra tucu-ui          | Copiar de flex-ui      | El fork divergió; los conteos/claves/selectores difieren  |
| 2   | `tucu://shell` como nombre del resource | `tucu://mfe-shell`     | tucu-ui no es un ecosistema MFE; el contenido es genérico |
| 3   | Citas `// ui/tucu-ui/src/...` en docs   | Docs sin citas         | CA-4: auditabilidad de cada claim                         |
