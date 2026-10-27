# tools/mcp-server — spec-e-burgos-001-nextjs-support cycle-01 (2026-10-27)

## Estado
- 0.10.0 lista para publicar: modo Next en las tools generadoras.

## Estructura
- `framework: "vite" | "next"` (default vite) en generate_component/form/page/chart/datatable; `src/utils/next-output.ts`.
- `src/resources/next-guide.ts` agrega la sección Next a quickstart, routing y shell; `theme-setup` acepta `framework`.
- `tests/framework-parity.test.ts` (snapshots de la salida vite previa) y `tests/framework-next.test.ts`.

## Dependencias
- Sin cambios.

## Qué sigue
- Publicar 0.10.0 (tag `mcp-v0.10.0`) antes que la librería. Toda tool nueva que emita código tiene que respetar `framework` y sumar su snapshot de paridad vite.
