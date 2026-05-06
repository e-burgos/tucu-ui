# Plan 01 — Chart Components Module

**Spec:** docs/specs/01-chart-components.md
**Branch:** feat/v2.0.3-improvements
**Depende de:** Ninguna

## Estado inicial requerido

```bash
# recharts ya es dependencia
grep recharts ui/tucu-ui/package.json

# La carpeta charts existe pero está vacía
ls ui/tucu-ui/src/components/charts/
```

## Fase A — Infraestructura compartida

1. Crear `types.ts` con `ChartDataPoint`, `ChartSeries`, `ChartBaseProps`, `PieDataPoint`, `RadarDataPoint`
2. Crear `hooks/use-chart-theme.ts` — lee `useTheme().mode` y devuelve paleta de colores
3. Crear `components/chart-container.tsx` — wrapper `ResponsiveContainer`
4. Crear `components/chart-tooltip.tsx` — tooltip custom estilizado
5. Crear `components/chart-empty-state.tsx` — estado vacío

## Fase B — Chart Components

1. `line-chart/line-chart.tsx` — TucuLineChart
2. `bar-chart/bar-chart.tsx` — TucuBarChart
3. `area-chart/area-chart.tsx` — TucuAreaChart con gradientes
4. `pie-chart/pie-chart.tsx` — TucuPieChart con soporte donut
5. `radar-chart/radar-chart.tsx` — TucuRadarChart
6. `composed-chart/composed-chart.tsx` — TucuComposedChart
7. `index.ts` barrel export
8. Registrar en `components/index.ts`

## Fase C — Documentación

1. Ejecutar `pnpm tsx scripts/generate-props.ts`
2. Crear section file en demo app
3. Registrar en TOC y lazy imports

## Criterios de aceptación

- [x] `pnpm nx build tucu-ui` exitoso
- [x] Todos los tipos exportados
- [x] Dark/light mode funcional
- [ ] Documentación actualizada (Fase C pendiente)

## Verificación

```bash
pnpm nx build tucu-ui
pnpm nx lint tucu-ui
```

## Post-implementación

- [ ] Invocar `tucu-ui-docs-sync` para crear documentation sections
- [ ] Regenerar props: `pnpm tsx scripts/generate-props.ts`
