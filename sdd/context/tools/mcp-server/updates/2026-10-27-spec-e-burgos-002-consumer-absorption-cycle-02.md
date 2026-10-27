# tools/mcp-server — spec-e-burgos-002-consumer-absorption cycle-02 (2026-10-27)

## Estado
- 0.12.0: el registry cubre `ThemeScope`, la prop `preset`/`defaultMode: 'system'` de ThemeProvider y las props nuevas de Modal, Alert, BasicTable, Select y Tooltip.

## Estructura
- `tucu://tokens` agrega la sección "Theme presets & scopes (public contract)": variables `--tucu-*` de preset, atributos `data-tucu-theme|mode|cards|buttons|font|heading-font`, límite de anidado y regla de precedencia `var(--tucu-x, var(--tucu-x-default))`.
- `next-guide`, `quickstart` y `datatable` mencionan `ThemeModeScript` y `styles-core`. El changelog tiene v3.6.0 como Current.

## Dependencias
- Sin cambios.

## Qué sigue
- cycle-03: entradas de SplitModal y del resto de los componentes de RF-3.
