# SPEC-e-burgos-001: Soporte Next.js 16 (App Router) con entry desacoplado

> Estado: **completed** — `cycle-01` cerrado el 2026-10-27 (flow `lite`).

## Resumen Ejecutivo

La librería hoy es solo para SPAs con Vite: ningún módulo declara `"use client"` y el `ThemeProvider` monta su propio `BrowserRouter`, así que no se puede usar en Next.js App Router. Esta spec suma un entry `@e-burgos/tucu-ui/next` con un `NextThemeProvider` que conecta la navegación de Next, sin cambiar nada para las apps Vite que usan 3.x.

## Contexto de Negocio

SDD Studio (Next.js, export estático) va a adoptar la librería, y el kit sdd-harness la va a ofrecer como opción de UI en los proyectos que genera, incluidos los Next. Sin soporte para Next, ninguno de los dos es posible.

## Evidencia y decisiones

- Evidencia: análisis del código (2026-10-26) → 0 directivas `"use client"` en 351 módulos `.tsx`; 27 módulos de `src/` importan `react-router-dom`; `ThemeProvider` monta `BrowserRouter` + `Routes`.
- Evidencia: `npm view next` (2026-10-26) → última estable 16.4.3.
- Decisión del dev (2026-10-26): las apps Vite en 3.x tienen que seguir andando sin tocar nada; el modo Next es opcional y va en un provider propio, desacoplado.
- Decisión del dev (2026-10-26): usar la última versión de Next; flow `lite`.

## Requisitos Funcionales (RF)

- RF-1: Entry `@e-burgos/tucu-ui/next` que exporta `NextThemeProvider`, conectado a `next/navigation` y `next/link`, sin montar react-router.
- RF-2: Los componentes que navegan (layouts, menús, links, tabs por parámetro) leen la navegación de una capa interna que llenan ambos providers.
- RF-3: Los módulos cliente llevan `"use client"` en el build ESM.
- RF-4: El MCP genera código para Next cuando se le pide `framework: "next"`.

## Requisitos No-Funcionales (RNF)

- RNF-1: Compatibilidad total con 3.x: las suites existentes pasan sin modificarse y el barrel raíz solo suma exports.
- RNF-2: Una app Vite no carga `next`, y `./next` no alcanza `react-router-dom`.
- RNF-3: `next build` con `output: 'export'` termina sin errores de prerender ni diferencias de hidratación.

## Dependencias

- Subproyectos: `libs/tucu-ui`, `tools/mcp-server` (y la app nueva `apps/next-demo`).
- Externas: `next` >=16 como peer dependency opcional.

## Criterios de Aceptación

- CA-001: Las suites existentes de la librería pasan sin cambios, y `apps/demo`, `apps/test-lib` y `examples/standalone` compilan y navegan igual.
- CA-002: `apps/next-demo` (Next 16.4.3, `output: 'export'`) construye y navega con `NextThemeProvider`, y el menú marca la ruta activa.
- CA-003: `dist/index.*` no referencia `next` y el grafo de `./next` no referencia `react-router-dom`.
- CA-004: Las tools generadoras del MCP con `framework: "next"` emiten código para Next; sin el parámetro, la salida es igual a la de 0.9.0.
- CA-005: Se publican `@e-burgos/tucu-ui` 3.4.0 y `@e-burgos/tucu-ui-mcp` 0.10.0 con CHANGELOG y la guía de Next en el README.
