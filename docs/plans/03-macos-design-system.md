# Plan 03 — macOS Sonoma 14 Design System

**Spec:** `docs/specs/03-macos-design-system.md`
**Branch:** `feat/macos-design-system`
**Recursos de investigación:** `docs/macos-resources/css/` (valores Apple HIG de referencia)
**Depende de:** Ninguna

---

## Stack obligatorio (de la spec)

| Capa       | Herramienta                | Uso en este plan                                                 |
| ---------- | -------------------------- | ---------------------------------------------------------------- |
| Estilos    | Tailwind CSS v4 + CSS puro | Los overrides van en archivos `.css` con selectores `html.macos` |
| State      | Zustand (`useTheme()`)     | Controla `colorScheme`, `layout`, presets                        |
| Build      | Vite + Nx                  | `pnpm nx build tucu-ui` para verificar                           |
| Utilidades | `cn()` (clsx + twMerge)    | Ya en componentes — no se modifica                               |
| **Nuevo**  | `.woff2` de SF Pro         | `@font-face` con `local()` + `url()`                             |

**Restricciones:** NO Framer Motion, NO CSS-in-JS, NO Sass/Less, NO component wrappers, NO cambios a API pública.

---

## Pre-requisitos

```bash
git checkout feat/macos-design-system
pnpm install
pnpm nx build tucu-ui  # Verificar que el build actual funciona
```

---

## Fase A — Foundations & Infraestructura

**Objetivo:** Corregir el store, crear la infraestructura CSS, tipografía SF Pro, tokens globales.

### A1. Corregir `applyMacOSTheme()` y `applyDefaultTheme()` en el store

**Archivo:** `ui/tucu-ui/src/themes/hooks/use-theme.tsx`

**Bug actual:** `applyMacOSTheme()` no setea `layout` → el MacOSLayout nunca se activa automáticamente. `applyDefaultTheme()` no restaura el layout al default.

**Cambio:**

```ts
// ANTES:
applyMacOSTheme: () =>
  set({ ...macosLightPresets, colorScheme: 'macos' }),

applyDefaultTheme: () =>
  set({ ...defaultPresets, colorScheme: 'default' }),

// DESPUÉS:
applyMacOSTheme: () =>
  set({ ...macosLightPresets, colorScheme: 'macos', layout: LAYOUT_OPTIONS.MACOS }),

applyDefaultTheme: () =>
  set({ ...defaultPresets, colorScheme: 'default', layout: defaultLayout }),
```

### A2. Obtener y colocar los archivos `.woff2` de SF Pro

**Directorio destino:** `ui/tucu-ui/src/assets/fonts/sf-pro/`

**Proceso manual (requiere macOS):**

1. Descargar DMG desde https://developer.apple.com/fonts/
2. Montar → instalar `.pkg`
3. Convertir `.otf` → `.woff2`:
   ```bash
   brew install woff2
   cd /Library/Fonts
   for f in SF-Pro-Display-Regular SF-Pro-Display-Medium SF-Pro-Display-Semibold SF-Pro-Display-Bold \
            SF-Pro-Text-Regular SF-Pro-Text-Medium SF-Pro-Text-Semibold; do
     woff2_compress "${f}.otf"
   done
   ```
4. Copiar los 7 archivos `.woff2` al directorio destino

**Archivos esperados (7):**

| Archivo                         | Weight | Optical size    |
| ------------------------------- | ------ | --------------- |
| `SF-Pro-Display-Regular.woff2`  | 400    | Display (≥20pt) |
| `SF-Pro-Display-Medium.woff2`   | 500    | Display         |
| `SF-Pro-Display-Semibold.woff2` | 600    | Display         |
| `SF-Pro-Display-Bold.woff2`     | 700    | Display         |
| `SF-Pro-Text-Regular.woff2`     | 400    | Text (<20pt)    |
| `SF-Pro-Text-Medium.woff2`      | 500    | Text            |
| `SF-Pro-Text-Semibold.woff2`    | 600    | Text            |

> **Nota:** Si los `.woff2` no están disponibles, la estrategia `local()` + `system-ui` fallback sigue funcionando. Los archivos se pueden agregar después.

### A3. Crear `macos-fonts.css` — @font-face declarations

**Archivo:** `ui/tucu-ui/src/assets/css/macos/macos-fonts.css`
**Referencia:** `docs/macos-resources/css/macos-fonts.css`

Contiene 7 `@font-face` declarations (4 Display + 3 Text), cada una con:

- `local()` nombres: nombre display, nombre PostScript interno (`.SFNSDisplay-*`), nombre camelCase (`SFProDisplay-*`)
- `url()` fallback apuntando a `../../fonts/sf-pro/SF-Pro-*.woff2`
- `font-display: swap`

### A4. Crear `macos-foundations.css` — Tokens globales

**Archivo:** `ui/tucu-ui/src/assets/css/macos/macos-foundations.css`
**Referencia:** `docs/macos-resources/css/macos-foundations.css`

Tokens dentro de `html.macos { ... }`:

- **Tipografía:** `--macos-font-family`, `--macos-font-display`, `--macos-font-mono`, 9 tamaños, 9 leadings, 8 trackings, 4 weights
- **Radii:** 7 niveles (xs=3px ... full=999px)
- **Control sizes:** heights, checkbox, radio, switch
- **Spacing:** 8pt grid (space-1 a space-8)
- **Layout:** sidebar width, toolbar height, titlebar, content padding
- **Colors light:** labels, separator, window-bg, control-bg, accent, link, 9 system colors, 6 gray scale
- **Shadows:** window, card, button-pressed, focus
- **Materials:** sidebar, toolbar, popover, sheet, overlay (bg + blur values)
- **Traffic lights:** close, minimize, maximize, inactive
- **Focus ring:** color, width, offset
- **Transitions:** fast, normal, slow
- **Base apply:** font-family, font-size, line-height, letter-spacing, font-smoothing

Dark mode override `html.macos.dark { ... }`:

- Labels, separator, colors, grays, shadows, materials, focus ring recalculados

Reduced motion `@media (prefers-reduced-motion: reduce)`:

- Transitions → 0ms

### A5. Crear barrel `macos/index.css`

**Archivo:** `ui/tucu-ui/src/assets/css/macos/index.css`

```css
@import './macos-fonts.css';
@import './macos-foundations.css';
/* Fases B-D descomentarán las siguientes líneas: */
/* @import './macos-buttons.css'; */
/* @import './macos-cards.css'; */
/* @import './macos-inputs.css'; */
/* @import './macos-dialogs.css'; */
/* @import './macos-tables.css'; */
/* @import './macos-navigation.css'; */
/* @import './macos-feedback.css'; */
/* @import './macos-typography.css'; */
/* @import './macos-layouts.css'; */
/* @import './macos-misc.css'; */
```

### A6. Importar desde `globals.css`

**Archivo:** `ui/tucu-ui/src/assets/css/globals.css`

Agregar al final del archivo:

```css
/* macOS Sonoma 14 Theme Style */
@import './macos/index.css';
```

### A7. Limpiar `globals.css` — Remover tokens macOS inline

El `globals.css` actual ya tiene bloques `html.macos { ... }` y `html.macos.dark { ... }` inline (de commits previos en la branch). Estos se deben **eliminar** de `globals.css` ya que ahora viven en `macos-foundations.css`.

### A8. Verificación Fase A

```bash
pnpm nx build tucu-ui
```

**Checks manuales:**

- [ ] Toggle macOS en Settings → `html.macos` class aparece
- [ ] Tipografía cambia a SF Pro (o system-ui fallback)
- [ ] Font size base cambia a 13px
- [ ] MacOSLayout se activa automáticamente
- [ ] Toggle Default → layout restaurado, clase `macos` removida

---

## Fase B — Componentes de alta visibilidad

**Objetivo:** Transformar los componentes más visibles: Button, Card, Input, Modal.

### B0. Agregar `data-tucu` attributes a componentes core

Antes de crear los CSS overrides, necesitamos selectores estables. Los componentes usan Tailwind inline con `cn()` — no hay clases CSS estables.

**Solución:** Agregar `data-tucu="nombre"` al elemento raíz de cada componente core. Es un atributo interno que no cambia la API pública.

**Lista de componentes a modificar (25):**

| Archivo                     | Atributo                     | Elemento                    |
| --------------------------- | ---------------------------- | --------------------------- |
| `buttons/button/index.tsx`  | `data-tucu="button"`         | `<button>` raíz             |
| `cards/card.tsx`            | `data-tucu="card"`           | `<div>` raíz                |
| `inputs/input.tsx`          | `data-tucu="input"`          | `<div>` wrapper o `<input>` |
| `inputs/select.tsx`         | `data-tucu="select"`         | `<div>` wrapper             |
| `inputs/checkbox.tsx`       | `data-tucu="checkbox"`       | `<input type="checkbox">`   |
| `inputs/radio-group.tsx`    | `data-tucu="radio"`          | `<input type="radio">`      |
| `inputs/switch.tsx`         | `data-tucu="switch"`         | `<div>` wrapper             |
| `inputs/textarea.tsx`       | `data-tucu="textarea"`       | `<textarea>`                |
| `inputs/input-searcher.tsx` | `data-tucu="input-searcher"` | `<div>` wrapper             |
| `inputs/toggle-bar.tsx`     | `data-tucu="toggle-bar"`     | `<div>` wrapper             |
| `dialog/modal.tsx`          | `data-tucu="modal"`          | `<div>` modal container     |
| `dialog/drawer.tsx`         | `data-tucu="drawer"`         | `<div>` drawer container    |
| `notifications/alert.tsx`   | `data-tucu="alert"`          | `<div>` raíz                |
| `notifications/badge.tsx`   | `data-tucu="badge"`          | `<span>` raíz               |
| `notifications/toast.tsx`   | `data-tucu="toast"`          | `<div>` raíz                |
| `tabs/tab.tsx`              | `data-tucu="tab"`            | `<button>` tab item         |
| `tabs/param-tab.tsx`        | `data-tucu="param-tab"`      | contenedor tabs             |
| `table/basic-table.tsx`     | `data-tucu="table"`          | `<table>` o wrapper         |
| `table/pagination.tsx`      | `data-tucu="pagination"`     | `<div>` wrapper             |
| `common/tooltip.tsx`        | `data-tucu="tooltip"`        | tooltip content             |
| `loaders/spinner.tsx`       | `data-tucu="spinner"`        | `<div>` spinner             |
| `loaders/progressbar.tsx`   | `data-tucu="progressbar"`    | `<div>` wrapper             |
| `loaders/skeleton.tsx`      | `data-tucu="skeleton"`       | `<div>` skeleton            |
| `common/avatar.tsx`         | `data-tucu="avatar"`         | `<div>` wrapper             |
| `common/tag.tsx`            | `data-tucu="tag"`            | `<span>` raíz               |

**Patrón de implementación (1 línea por componente):**

```tsx
// Ejemplo: buttons/button/index.tsx
// En el <button> raíz, agregar:
<button
  data-tucu="button"
  data-variant={variant}
  data-shape={shape}
  data-size={size}
  // ... resto de props existentes
>
```

Los `data-variant`, `data-shape`, `data-size` son opcionales — solo se agregan a componentes que tienen variantes que el CSS necesita diferenciar (Button, Input, Alert, Badge).

### B1. Crear `macos-buttons.css`

**Archivo:** `ui/tucu-ui/src/assets/css/macos/macos-buttons.css`
**Referencia:** `docs/macos-resources/css/macos-buttons.css`

Selectores:

- `html.macos [data-tucu="button"]` — base: radius 5px, font 13px/500, transitions
- `[data-variant="solid"]` — shadow push button, hover brightness, active inset shadow
- `[data-variant="ghost"]` — border separator, hover subtle bg
- `[data-variant="transparent"]` — hover subtle bg
- `[data-shape="pill"]`, `[data-shape="circle"]` — radius full
- `[data-size="large|medium|small|mini|tiny"]` — min-height + padding ajustados
- `:focus-visible` — focus ring macOS
- `:disabled` — opacity 0.4
- Dark variants para hover bg

**Descomentar** `@import './macos-buttons.css'` en `macos/index.css`.

### B2. Crear `macos-cards.css`

**Archivo:** `ui/tucu-ui/src/assets/css/macos/macos-cards.css`
**Referencia:** `docs/macos-resources/css/macos-cards.css`

Selectores:

- `html.macos [data-tucu="card"]` — radius 10px, border separator, shadow card, bg control-bg
- `:hover` — shadow más profundo
- Dark mode variants
- Card header, body padding con tokens macOS

**Descomentar** `@import './macos-cards.css'` en `macos/index.css`.

### B3. Crear `macos-inputs.css`

**Archivo:** `ui/tucu-ui/src/assets/css/macos/macos-inputs.css`
**Referencia:** `docs/macos-resources/css/macos-inputs.css`

Selectores:

- `html.macos [data-tucu="input"]` — height 22px, radius 5px, border, font 13px
- `:focus-within` — border accent + focus ring
- `[data-variant="ghost|solid|transparent"]`
- `[data-tucu="select"]` — mismos estilos + dropdown menu con blur popover
- `[data-tucu="checkbox"]` — 14×14, radius 3px, checked = accent blue
- `[data-tucu="radio"]` — 16×16, circle, checked = accent blue
- `[data-tucu="switch"]` — 38×22, pill, green when on
- `[data-tucu="textarea"]` — radius 5px, border, focus ring
- `[data-tucu="input-searcher"]` — misma base que input
- Dark mode para todos

**Descomentar** `@import './macos-inputs.css'` en `macos/index.css`.

### B4. Crear `macos-dialogs.css`

**Archivo:** `ui/tucu-ui/src/assets/css/macos/macos-dialogs.css`
**Referencia:** `docs/macos-resources/css/macos-dialogs.css`

Selectores:

- `html.macos [data-tucu="modal"]` — radius 12px, sheet material (blur 30px), shadow window
- Modal overlay, header, body, footer
- `[data-tucu="drawer"]` — sheet material, shadow window, border left
- Sidebar — width 220px, sidebar material (blur 20px)
- Dark mode para todos

**Descomentar** `@import './macos-dialogs.css'` en `macos/index.css`.

### B5. Verificación Fase B

```bash
pnpm nx build tucu-ui
```

**Checks:**

- [ ] Button solid/ghost/transparent se ven "Apple" con macOS theme
- [ ] Card tiene radius 10px, sombra difusa, borde separator
- [ ] Input/Select/Checkbox/Radio/Switch se ven nativos macOS
- [ ] Modal tiene blur vibrancy, radius 12px
- [ ] Focus ring azul 3px en todos los controles
- [ ] Dark mode funciona en todos
- [ ] Default theme NO cambia (sin regresiones)

---

## Fase C — Datos y navegación

**Objetivo:** Tables, tabs, feedback components.

### C1. Crear `macos-tables.css`

**Archivo:** `ui/tucu-ui/src/assets/css/macos/macos-tables.css`
**Referencia:** `docs/macos-resources/css/macos-tables.css`

- Table container: radius 10px, border
- Header: gray6 bg, 11px semibold, separator borders
- Rows: 24px height, alternating bg (Finder style), hover, selected = accent blue
- Pagination: radius 5px buttons, accent active

**Descomentar** en `macos/index.css`.

### C2. Crear `macos-navigation.css`

**Archivo:** `ui/tucu-ui/src/assets/css/macos/macos-navigation.css`
**Referencia:** `docs/macos-resources/css/macos-navigation.css`

- Tabs: border-bottom separator, active = accent color + bottom border
- Segmented control (ParamTab): gray6 bg, radius 5px, active = white bg + shadow
- CollapsibleMenu: sidebar-style items, 24px height, active = accent bg
- NavLink: link color, hover underline

**Descomentar** en `macos/index.css`.

### C3. Crear `macos-feedback.css`

**Archivo:** `ui/tucu-ui/src/assets/css/macos/macos-feedback.css`
**Referencia:** `docs/macos-resources/css/macos-feedback.css`

- Alert: radius 12px, variant-specific border + subtle bg tint (color-mix)
- Badge: pill shape, 10px font, medium weight
- Toast: radius 12px, popover material + blur, shadow window
- Spinner: secondary-label color
- Progressbar: 4px height, pill, accent fill
- Skeleton: pulsing gradient animation

**Agregar `data-tucu` a:** alert.tsx, badge.tsx, toast.tsx, spinner.tsx, progressbar.tsx, skeleton.tsx

**Descomentar** en `macos/index.css`.

### C4. Verificación Fase C

```bash
pnpm nx build tucu-ui
```

---

## Fase D — Typography, layouts, misceláneos

**Objetivo:** Completar la cobertura de todos los componentes restantes.

### D1. Crear `macos-typography.css`

**Archivo:** `ui/tucu-ui/src/assets/css/macos/macos-typography.css`
**Referencia:** `docs/macos-resources/css/macos-typography.css`

- h1-h6: SF Pro Display/Text, tamaños oficiales Apple, tracking por size
- Body/paragraphs: 13px, leading 16px
- Small/caption: 10px
- Links: link color, no underline, hover underline
- Code: SF Mono
- Labels: callout size, medium weight, secondary color
- Selection color: accent 30%

### D2. Crear `macos-layouts.css`

**Archivo:** `ui/tucu-ui/src/assets/css/macos/macos-layouts.css`
**Referencia:** `docs/macos-resources/css/macos-layouts.css`

- Header: toolbar height (52px), toolbar material + blur
- Body bg: window-bg color
- Scrollbar: thin overlay style (8px, rounded, semi-transparent)
- Divider/hr: 1px separator color
- Container max-width

### D3. Crear `macos-misc.css`

**Archivo:** `ui/tucu-ui/src/assets/css/macos/macos-misc.css`
**Referencia:** `docs/macos-resources/css/macos-misc.css`

- Tooltip: radius 4px, dark bg, 11px font
- Popover: radius 6px, popover material + blur
- Tag: pill, callout size, border + gray bg
- Avatar: circle, border separator, subtle shadow
- Collapse/Accordion: radius 10px, header with gray bg
- Carousel: radius 10px, animated indicators
- Breadcrumb: callout size, link colors
- Context menu / dropdown: radius 6px, popover material, hover = accent bg

**Agregar `data-tucu` a:** tooltip.tsx, avatar.tsx, tag.tsx

### D4. Descomentar todos los imports en `macos/index.css`

Verificar que `macos/index.css` ahora importa todos los 12 archivos.

### D5. Verificación Fase D

```bash
pnpm nx build tucu-ui
```

---

## Fase E — Charts y componentes especializados

**Objetivo:** Adaptar componentes de dominio específico que heredan estilos de componentes base.

### E1. Charts

Los componentes de charts usan Recharts. Los overrides se aplican al contenedor:

- `ChartContainer`: radius 10px, shadow card macOS
- `ChartTooltip`: radius 8px, vibrancy bg, shadow
- Paleta de colores: system colors Apple (blue, green, orange, purple, pink, teal)
- `ChartEmptyState`: tipografía macOS

**No se necesitan `data-tucu` nuevos** si los charts ya usan Card como wrapper. En caso contrario, agregar `data-tucu="chart"` al ChartContainer.

### E2. Blockchain components

Estos ya heredan los overrides de Card, Input, Table. Verificar visualmente:

- CoinCard, CoinInfoCard → hereda de Card
- CoinListbox → hereda de Select/List
- LivePriceFeed → hereda de Table
- CurrencySwap → hereda de Input + Button

Solo agregar overrides específicos si alguno no se transforma correctamente.

### E3. Auth forms

- SignInForm, SignUpForm, ForgetPasswordForm, ResetPinForm
- Heredan de Card + Input + Button
- Verificar que el layout del form se vea bien con los nuevos tamaños

### E4. Verificación Fase E

```bash
pnpm nx build tucu-ui
```

---

## Fase F — Polish, animaciones y QA

**Objetivo:** Pulir transitions, dark mode completo, responsive, accessibility.

### F1. Transiciones suaves entre temas

Agregar en `macos-foundations.css` (o un archivo dedicado):

```css
/* Smooth transition when switching Default ↔ macOS */
html {
  transition: background-color 300ms ease, color 300ms ease;
}

[data-tucu] {
  transition: border-radius 300ms ease, box-shadow 300ms ease, background-color 300ms ease, border-color 300ms ease;
}
```

> **Cuidado:** Esta transición global solo debe aplicarse al switching, no constantemente. Evaluar si es mejor aplicar solo con una clase temporal `html.theme-transitioning`.

### F2. Auditoría dark mode

Recorrer cada archivo CSS macOS y verificar que toda regla `html.macos` tiene su contraparte `html.macos.dark` cuando los valores difieren.

Checklist:

- [ ] `macos-foundations.css` — labels, separator, colors, grays, shadows, materials
- [ ] `macos-buttons.css` — ghost/transparent hover bg
- [ ] `macos-cards.css` — bg, border, shadow
- [ ] `macos-inputs.css` — bg, border, switch bg
- [ ] `macos-dialogs.css` — material colors
- [ ] `macos-tables.css` — header bg, row alternating
- [ ] `macos-navigation.css` — tab hover, segmented active
- [ ] `macos-feedback.css` — alert tints, badge soft, toast bg, skeleton gradient
- [ ] `macos-typography.css` — headings color (inherit from token), code bg
- [ ] `macos-layouts.css` — header, scrollbar, body bg
- [ ] `macos-misc.css` — tooltip, tag, collapse header

### F3. Responsive

- Verificar que overrides no rompen layouts mobile/tablet
- MacOSLayout sidebar: debe collapsar en viewports < 768px
- Control heights (22px) pueden ser muy pequeños en mobile → considerar media query para aumentar a 44px tap target

### F4. `prefers-reduced-motion`

Ya incluido en `macos-foundations.css`:

```css
@media (prefers-reduced-motion: reduce) {
  html.macos,
  html.macos.dark {
    --macos-transition-fast: 0ms;
    --macos-transition-normal: 0ms;
    --macos-transition-slow: 0ms;
  }
}
```

Verificar que todos los archivos CSS usan los tokens `--macos-transition-*` (no valores hardcoded).

### F5. QA visual completo

Recorrer cada sección de la demo app comparando Default vs macOS:

- [ ] Buttons (todas las variantes × colores × sizes × shapes)
- [ ] Cards (Card, InfoCard, PanelCard, StatsCard, AuthorCard)
- [ ] Inputs (text, password, date, select, checkbox, radio, switch, textarea, pin)
- [ ] Dialogs (modal, drawer, sidebar)
- [ ] Tables (con datos, paginación, empty state)
- [ ] Tabs (tab, param-tab, segmented)
- [ ] Feedback (alert ×4, badge, toast, spinner, progress, skeleton)
- [ ] Typography (headings, body, links, code)
- [ ] Layouts (header, sidebar, scrollbar)
- [ ] Misc (tooltip, tag, avatar, collapse, carousel)
- [ ] Charts (line, bar, area, pie)
- [ ] Auth forms
- [ ] Blockchain components

### F6. Verificación Final

```bash
pnpm nx build tucu-ui
pnpm nx build demo
pnpm nx lint tucu-ui
```

---

## Resumen de archivos a crear/modificar

### Archivos NUEVOS (14 CSS + 7 fonts)

| Archivo                                                 | Fase | Descripción                     |
| ------------------------------------------------------- | ---- | ------------------------------- |
| `ui/tucu-ui/src/assets/fonts/sf-pro/*.woff2` (×7)       | A    | Fuentes SF Pro                  |
| `ui/tucu-ui/src/assets/css/macos/macos-fonts.css`       | A    | @font-face declarations         |
| `ui/tucu-ui/src/assets/css/macos/macos-foundations.css` | A    | Tokens globales + dark          |
| `ui/tucu-ui/src/assets/css/macos/index.css`             | A    | Barrel import                   |
| `ui/tucu-ui/src/assets/css/macos/macos-buttons.css`     | B    | Button overrides                |
| `ui/tucu-ui/src/assets/css/macos/macos-cards.css`       | B    | Card overrides                  |
| `ui/tucu-ui/src/assets/css/macos/macos-inputs.css`      | B    | Input/form control overrides    |
| `ui/tucu-ui/src/assets/css/macos/macos-dialogs.css`     | B    | Modal/Drawer/Sidebar overrides  |
| `ui/tucu-ui/src/assets/css/macos/macos-tables.css`      | C    | Table/Pagination overrides      |
| `ui/tucu-ui/src/assets/css/macos/macos-navigation.css`  | C    | Tabs/Menu overrides             |
| `ui/tucu-ui/src/assets/css/macos/macos-feedback.css`    | C    | Alert/Badge/Toast/etc overrides |
| `ui/tucu-ui/src/assets/css/macos/macos-typography.css`  | D    | Typography overrides            |
| `ui/tucu-ui/src/assets/css/macos/macos-layouts.css`     | D    | Layout/scrollbar overrides      |
| `ui/tucu-ui/src/assets/css/macos/macos-misc.css`        | D    | Remaining component overrides   |

### Archivos MODIFICADOS (~28)

| Archivo                                               | Fase | Cambio                                                     |
| ----------------------------------------------------- | ---- | ---------------------------------------------------------- |
| `ui/tucu-ui/src/themes/hooks/use-theme.tsx`           | A    | Fix `applyMacOSTheme()` + `applyDefaultTheme()` (2 líneas) |
| `ui/tucu-ui/src/assets/css/globals.css`               | A    | Agregar `@import` + limpiar bloques macOS inline           |
| `ui/tucu-ui/src/components/buttons/button/index.tsx`  | B    | +1 línea: `data-tucu="button"` + data-variant/shape/size   |
| `ui/tucu-ui/src/components/cards/card.tsx`            | B    | +1 línea: `data-tucu="card"`                               |
| `ui/tucu-ui/src/components/inputs/input.tsx`          | B    | +1 línea: `data-tucu="input"` + data-variant               |
| `ui/tucu-ui/src/components/inputs/select.tsx`         | B    | +1 línea: `data-tucu="select"`                             |
| `ui/tucu-ui/src/components/inputs/checkbox.tsx`       | B    | +1 línea: `data-tucu="checkbox"`                           |
| `ui/tucu-ui/src/components/inputs/radio-group.tsx`    | B    | +1 línea: `data-tucu="radio"`                              |
| `ui/tucu-ui/src/components/inputs/switch.tsx`         | B    | +1 línea: `data-tucu="switch"`                             |
| `ui/tucu-ui/src/components/inputs/textarea.tsx`       | B    | +1 línea: `data-tucu="textarea"`                           |
| `ui/tucu-ui/src/components/inputs/input-searcher.tsx` | B    | +1 línea: `data-tucu="input-searcher"`                     |
| `ui/tucu-ui/src/components/inputs/toggle-bar.tsx`     | B    | +1 línea: `data-tucu="toggle-bar"`                         |
| `ui/tucu-ui/src/components/dialog/modal.tsx`          | B    | +1 línea: `data-tucu="modal"`                              |
| `ui/tucu-ui/src/components/dialog/drawer.tsx`         | B    | +1 línea: `data-tucu="drawer"`                             |
| `ui/tucu-ui/src/components/notifications/alert.tsx`   | C    | +1 línea: `data-tucu="alert"` + data-variant               |
| `ui/tucu-ui/src/components/notifications/badge.tsx`   | C    | +1 línea: `data-tucu="badge"` + data-variant               |
| `ui/tucu-ui/src/components/notifications/toast.tsx`   | C    | +1 línea: `data-tucu="toast"`                              |
| `ui/tucu-ui/src/components/tabs/tab.tsx`              | C    | +1 línea: `data-tucu="tab"`                                |
| `ui/tucu-ui/src/components/tabs/param-tab.tsx`        | C    | +1 línea: `data-tucu="param-tab"`                          |
| `ui/tucu-ui/src/components/table/basic-table.tsx`     | C    | +1 línea: `data-tucu="table"`                              |
| `ui/tucu-ui/src/components/table/pagination.tsx`      | C    | +1 línea: `data-tucu="pagination"`                         |
| `ui/tucu-ui/src/components/common/tooltip.tsx`        | D    | +1 línea: `data-tucu="tooltip"`                            |
| `ui/tucu-ui/src/components/loaders/spinner.tsx`       | C    | +1 línea: `data-tucu="spinner"`                            |
| `ui/tucu-ui/src/components/loaders/progressbar.tsx`   | C    | +1 línea: `data-tucu="progressbar"`                        |
| `ui/tucu-ui/src/components/loaders/skeleton.tsx`      | C    | +1 línea: `data-tucu="skeleton"`                           |
| `ui/tucu-ui/src/components/common/avatar.tsx`         | D    | +1 línea: `data-tucu="avatar"`                             |
| `ui/tucu-ui/src/components/common/tag.tsx`            | D    | +1 línea: `data-tucu="tag"`                                |

### Resumen de esfuerzo por fase

| Fase | Objetivo                      | Archivos nuevos | Archivos modificados       | Complejidad |
| ---- | ----------------------------- | --------------- | -------------------------- | ----------- |
| A    | Foundations + infraestructura | 3 CSS + 7 fonts | 2 (useTheme, globals)      | Baja        |
| B    | Componentes alta visibilidad  | 4 CSS           | ~13 (data-tucu attrs)      | Alta        |
| C    | Datos + navegación + feedback | 3 CSS           | ~9 (data-tucu attrs)       | Media       |
| D    | Typography + layouts + misc   | 3 CSS           | ~3 (data-tucu attrs)       | Media       |
| E    | Charts + especializados       | 0 (hereda)      | ~3 (si necesita data-tucu) | Baja        |
| F    | Polish + QA                   | 0               | ~2 (tweaks)                | Media       |

---

## Criterios de aceptación

- [ ] Build exitoso: `pnpm nx build tucu-ui`
- [ ] Al activar "macOS" en Theme Style, **todos** los componentes visibles cambian su apariencia
- [ ] Light + Dark mode funcionan correctamente en macOS theme
- [ ] El cambio entre Default ↔ macOS es fluido (transiciones CSS)
- [ ] No hay regresión visual en el tema Default
- [ ] `prefers-reduced-motion` respetado
- [ ] Los 8 componentes macOS exclusivos siguen funcionando
- [ ] MacOSLayout se activa automáticamente al elegir macOS theme
- [ ] Se restaura el layout original al volver a Default

---

## Post-implementación

- [ ] Invocar `tucu-ui-docs-sync` si hay componentes nuevos
- [ ] Regenerar props: `pnpm tsx scripts/generate-props.ts`
- [ ] Actualizar README/CHANGELOG con documentación del Theme Style macOS
