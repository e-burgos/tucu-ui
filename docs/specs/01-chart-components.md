# Spec 01 — Chart Components Module

**Fecha:** 2025-05-06
**Versión:** 1.0
**Estado:** Completado
**Branch:** `feat/v2.0.3-improvements`
**Dependencias:** Ninguna

## Resumen

Módulo de componentes de charts para `@e-burgos/tucu-ui`, construido sobre Recharts 3.x. Cada chart es un wrapper con estilos consistentes con el design system (dark/light mode, tokens, tipografía).

## Arquitectura / Diseño

```
ui/tucu-ui/src/components/charts/
├── index.ts                    # Public exports
├── types.ts                    # Shared types & interfaces
├── hooks/
│   ├── index.ts
│   └── use-chart-theme.ts      # Hook for chart theming (dark/light)
├── components/
│   ├── index.ts
│   ├── chart-container.tsx     # ResponsiveContainer wrapper
│   ├── chart-tooltip.tsx       # Custom tooltip component
│   └── chart-empty-state.tsx   # Empty state when no data
├── line-chart/
│   ├── index.ts
│   └── line-chart.tsx
├── bar-chart/
│   ├── index.ts
│   └── bar-chart.tsx
├── area-chart/
│   ├── index.ts
│   └── area-chart.tsx
├── pie-chart/
│   ├── index.ts
│   └── pie-chart.tsx
├── radar-chart/
│   ├── index.ts
│   └── radar-chart.tsx
└── composed-chart/
    ├── index.ts
    └── composed-chart.tsx
```

## Charts incluidos

| #   | Componente          | Tipo      | Caso de Uso                                        |
| --- | ------------------- | --------- | -------------------------------------------------- |
| 1   | `TucuLineChart`     | Cartesian | Trends, series comparison                          |
| 2   | `TucuBarChart`      | Cartesian | Category comparisons, horizontal/vertical, stacked |
| 3   | `TucuAreaChart`     | Cartesian | Volume/accumulation with gradients                 |
| 4   | `TucuPieChart`      | Polar     | Part-to-whole, donut with center content           |
| 5   | `TucuRadarChart`    | Polar     | Multi-dimensional comparison                       |
| 6   | `TucuComposedChart` | Cartesian | Mixed (line + bar + area)                          |

## Fases de implementación

### Fase A — Infraestructura compartida (Completada)

- [x] `types.ts` con interfaces compartidas
- [x] `useChartTheme` hook integrado con `useTheme()`
- [x] `ChartContainer` wrapper responsive
- [x] `ChartTooltip` componente custom
- [x] `ChartEmptyState` para datos vacíos

### Fase B — Chart Components (Completada)

- [x] `TucuLineChart`
- [x] `TucuBarChart`
- [x] `TucuAreaChart`
- [x] `TucuPieChart`
- [x] `TucuRadarChart`
- [x] `TucuComposedChart`

### Fase C — Documentación (Pendiente)

- [ ] Crear section file para demo app
- [ ] Regenerar props metadata
- [ ] Agregar a TOC

## Criterios de aceptación

- [x] Build exitoso (`pnpm nx build tucu-ui`)
- [x] 6 chart components exportados desde `@e-burgos/tucu-ui`
- [x] Dark/light mode via `useTheme`
- [x] TypeScript: tipos exportados
- [x] Empty state handling
- [x] Responsive via ResponsiveContainer
- [x] Accessible: aria-label en chart wrapper
- [x] Respeta `prefers-reduced-motion`

## Out of scope

- Treemap, Sankey, Funnel (charts especializados)
- Chart interactivity (click handlers, zoom, brush)
- Real-time streaming data
- Export to image/PDF

## Decisiones de diseño

| #   | Decisión                              | Alternativa        | Razón                                          |
| --- | ------------------------------------- | ------------------ | ---------------------------------------------- |
| 1   | Prefijo `Tucu` en nombres             | Sin prefijo        | Evitar colisión con exports de recharts        |
| 2   | `useChartTheme` hook separado         | Inline theme logic | Reutilización y consistencia                   |
| 3   | Gradient por defecto en AreaChart     | Flat fill          | Más atractivo visualmente, moderno             |
| 4   | 8 colores por paleta                  | 5 colores          | Suficiente para charts con múltiples series    |
| 5   | `showDots` auto basado en data length | Siempre mostrar    | Performance y legibilidad con datasets grandes |
