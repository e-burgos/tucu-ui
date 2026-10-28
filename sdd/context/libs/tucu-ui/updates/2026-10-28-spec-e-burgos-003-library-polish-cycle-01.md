# libs/tucu-ui — spec-e-burgos-003-library-polish cycle-01 (2026-10-28)

## Estado
- 3.10.0: los mapas de tono de Alert (sin `appearance`), Tooltip (`color` dark/light), Badge legacy `light-dark`, ConfirmDialog, ColorCard, Button y las variantes `color` de Input/Textarea/Select/PinCode/InputSearcher/FileInput ya no fijan `dark:` ni `!important`. Un `className` o un token del consumidor gana en light, dark y dentro de ThemeScope.

## Estructura
- `assets/css/tokens/tones.css` (feedback y cards) y `tokens/tones-controls.css` (controles y Button), importados desde `theme-core.css`.
- Patrón de tono: el componente emite atributos (`data-alert-tone`, `data-color`, `data-tucu-control-tone`/`-variant`, `data-tucu-control-file-tone`) y una regla `@layer components` lee `var(--tucu-<comp>-<tone>-<part>, var(--tucu-…-default))`, con defaults en la tríada `html:root` / `html.dark` / `[data-tucu-theme]`. **El componente no debe emitir utilidades de color que compitan con la regla de tono: una utilidad interna le gana a `@layer components`.**
- `control-colors.ts` ya no exporta mapas de clases de color (`textControlColorClasses`, `fileInputColorClasses`, etc.). Exporta clases estructurales y atributos. No era API pública.
- Con un tema macOS activo, sus reglas de controles ganan también sobre ghost primary/info. Antes solo esas dos variantes se le escapaban por `!important`.

## Dependencias
- Sin cambios.

## Qué sigue
- cycle-02: auth sin tarjeta forzada e i18n; páginas de error sobre `ErrorPageShell`/`SystemStatePage`.
- cycle-03: pinch-zoom del Lightbox; `index-core.css` ≤ 300 KB (hoy ~383 KB: los tokens de tono suman reglas, pero eliminan variantes `dark:`).
