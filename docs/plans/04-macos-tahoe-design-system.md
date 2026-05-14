# Plan 04 — macOS Tahoe 26 / Liquid Glass Design System

**Spec:** `docs/specs/04-macos-tahoe-design-system.md` (v1.1)
**Branch:** `feat/macos-tahoe-design-system`
**Depende de:** Spec 03 — macOS Sonoma 14 Design System (base existente)
**Fecha:** 2026-05-12

---

## Estado inicial requerido

### Precondiciones

1. La spec `docs/specs/04-macos-tahoe-design-system.md` v1.1 debe estar aprobada.
2. El theme macOS actual (Spec 03/Sonoma) debe estar funcionando: `colorScheme: 'macos'` aplica `html.macos`.
3. El barrel export `ui/tucu-ui/index.ts` debe estar actualizado.
4. No se requiere macOS 26 UI Kit descargado para iniciar; las fases visuales finales lo usaran para calibracion.

### Comandos de verificacion inicial

```bash
git checkout -b feat/macos-tahoe-design-system main
git status --short

# Verificar estructura CSS macOS existente
ls ui/tucu-ui/src/assets/css/macos/

# Verificar theme hooks
ls ui/tucu-ui/src/themes/hooks/

# Verificar exports
head -100 ui/tucu-ui/src/index.ts

# Verificar que el build pasa ANTES de empezar
pnpm nx build tucu-ui
pnpm nx lint tucu-ui
```

---

## Resumen de fases

| Fase | Nombre                                         | Complejidad | Dependencias | Componentes cubiertos   |
| ---- | ---------------------------------------------- | ----------- | ------------ | ----------------------- |
| 1    | Fuentes: Inter + JetBrains Mono                | S           | Ninguna      | 0 (infraestructura)     |
| 2    | Tokens fundacionales y Liquid Glass            | L           | Fase 1       | ~10 foundations         |
| 3    | Tipografia macOS                               | M           | Fase 1, 2    | Typography, CodeBlock   |
| 4    | Theme integration (hooks, store, wrapper)      | M           | Fase 2       | 0 (infraestructura)     |
| 5    | Shell macOS (Window, Toolbar, Sidebar)         | L           | Fase 2, 4    | ~15 shell components    |
| 6    | Layouts existentes restyling                   | L           | Fase 2, 4    | ~12 layout components   |
| 7    | Buttons y controles core                       | M           | Fase 2       | ~8 button components    |
| 8    | Inputs y forms                                 | L           | Fase 2, 7    | ~16 form components     |
| 9    | Seleccion y entrada numerica                   | M           | Fase 2, 8    | ~8 selection components |
| 10   | Navegacion y menus                             | L           | Fase 5       | ~12 nav components      |
| 11   | Organizacion de contenido                      | L           | Fase 2       | ~18 content components  |
| 12   | Componentes F.bis (parte 1): UI general        | XL          | Fase 2, 7, 8 | ~25 components          |
| 13   | Componentes F.bis (parte 2): Auth + Blockchain | L           | Fase 12      | ~13 components          |
| 14   | Presentacion, modales y feedback               | L           | Fase 2, 5    | ~12 overlay/feedback    |
| 15   | Charts y data visualization                    | M           | Fase 2, 4    | ~10 chart components    |
| 16   | Iconografia Tahoe                              | M           | Fase 5, 7    | ~3 icon utilities       |
| 17   | Componentes avanzados (P1 + P2)                | L           | Fase 5, 10   | ~6 advanced components  |
| 18   | Documentacion y demo                           | L           | Todas        | 0 (docs)                |
| 19   | QA visual, accesibilidad y performance         | M           | Todas        | 0 (verificacion)        |

**Total estimado: ~160+ componentes/tokens cubiertos en 19 fases.**

---

## Fase 1 — Fuentes: Inter + JetBrains Mono (Complejidad: S)

### Objetivo

Descargar, integrar y declarar las fuentes libres que reemplazan a SF Pro como base tipografica del theme macOS.

### Dependencias

Ninguna — puede ejecutarse en paralelo con cualquier otra fase.

### Archivos a crear/modificar

| Accion    | Ruta                                                                      |
| --------- | ------------------------------------------------------------------------- |
| Crear     | `ui/tucu-ui/src/assets/fonts/Inter-Variable.woff2`                        |
| Crear     | `ui/tucu-ui/src/assets/fonts/Inter-Variable-Italic.woff2` (si disponible) |
| Crear     | `ui/tucu-ui/src/assets/fonts/JetBrainsMono-Variable.woff2`                |
| Crear     | `ui/tucu-ui/src/assets/fonts/LICENSE-Inter.txt`                           |
| Crear     | `ui/tucu-ui/src/assets/fonts/LICENSE-JetBrainsMono.txt`                   |
| Crear     | `ui/tucu-ui/src/assets/css/macos/macos-fonts.css`                         |
| Modificar | `ui/tucu-ui/src/assets/css/macos/index.css`                               |
| Verificar | `ui/tucu-ui/vite.config.ts` (asset handling)                              |

### Sub-tareas detalladas

1. **Descargar Inter Variable** desde https://github.com/rsms/inter/releases (latest):

   - Archivo: `InterVariable.woff2` (~300KB)
   - Cubre pesos 100-900 + optical sizes 14-32
   - Renombrar a `Inter-Variable.woff2`
   - Si existe italic: `Inter-Variable-Italic.woff2`

2. **Descargar JetBrains Mono Variable** desde https://github.com/JetBrains/JetBrainsMono/releases:

   - Archivo: `JetBrainsMono[wght].woff2` (~150KB)
   - Cubre pesos 100-800
   - Renombrar a `JetBrainsMono-Variable.woff2`

3. **Incluir licencias**:

   - Copiar SIL OFL de Inter → `LICENSE-Inter.txt`
   - Copiar SIL OFL de JetBrains Mono → `LICENSE-JetBrainsMono.txt`

4. **Crear `macos-fonts.css`**:

   ```css
   /* Solo se carga cuando html.macos esta activo (importado desde index.css) */
   @font-face {
     font-family: 'Inter';
     font-style: normal;
     font-weight: 100 900;
     font-display: swap;
     src: url('../../fonts/Inter-Variable.woff2') format('woff2-variations');
     font-variation-settings: 'opsz' 16;
   }

   @font-face {
     font-family: 'JetBrains Mono';
     font-style: normal;
     font-weight: 100 800;
     font-display: swap;
     src: url('../../fonts/JetBrainsMono-Variable.woff2') format('woff2-variations');
   }
   ```

5. **Actualizar `macos/index.css`** — agregar `@import './macos-fonts.css';` como PRIMER import

6. **Verificar Vite asset handling** — Confirmar que `.woff2` se procesa como static asset. Si no:
   ```ts
   // vite.config.ts
   assetsInclude: ['**/*.woff2'];
   ```

### Criterios de aceptacion de fase

- [ ] Archivos `.woff2` existen con tamano esperado (~300KB Inter, ~150KB JBMono)
- [ ] `@font-face` declara rangos de peso correctos
- [ ] Licencias SIL OFL incluidas
- [ ] `pnpm nx build tucu-ui` pasa sin errores de assets

### Verificacion

```bash
ls -la ui/tucu-ui/src/assets/fonts/
pnpm nx build tucu-ui
```

### Riesgos de fase

- Ruta relativa de font incorrecta en CSS → verificar con build
- Italic no disponible como archivo separado → usar solo normal y documentar

---

## Fase 2 — Tokens fundacionales y Liquid Glass (Complejidad: L)

### Objetivo

Establecer TODOS los tokens CSS: colores semanticos, system colors, materiales Liquid Glass, fondos espaciales, shapes, spacing, elevacion, chart tokens y fallbacks de accesibilidad.

### Dependencias

- Fase 1 (fuentes disponibles para font-family tokens)

### Archivos a crear/modificar

| Accion     | Ruta                                                           |
| ---------- | -------------------------------------------------------------- |
| Reescribir | `ui/tucu-ui/src/assets/css/macos/macos-foundations.css`        |
| Reescribir | `ui/tucu-ui/src/assets/css/macos/macos-liquid-glass.css`       |
| Reescribir | `ui/tucu-ui/src/assets/css/macos/macos-backgrounds.css`        |
| Modificar  | `ui/tucu-ui/src/assets/css/macos/index.css` (orden de imports) |

### Sub-tareas detalladas

#### 2.1 — `macos-foundations.css`

1. **Font-family tokens** en `html.macos`:

   ```css
   --macos-font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
   --macos-font-display: 'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
   --macos-font-mono: 'JetBrains Mono', 'SF Mono', SFMono-Regular, ui-monospace, Menlo, Monaco, Consolas, monospace;
   font-optical-sizing: auto;
   font-feature-settings: 'liga' 1, 'calt' 1, 'kern' 1;
   ```

2. **Tokens semanticos LIGHT** (14 tokens):

   - `--macos-label: rgba(0,0,0,.88)`
   - `--macos-secondary-label: rgba(60,60,67,.68)`
   - `--macos-tertiary-label: rgba(60,60,67,.42)`
   - `--macos-quaternary-label: rgba(60,60,67,.24)`
   - `--macos-separator: rgba(60,60,67,.24)`
   - `--macos-opaque-separator: #c6c6c8`
   - `--macos-window-bg: #f5f5f7`
   - `--macos-content-bg: #ffffff`
   - `--macos-grouped-bg: #f2f2f7`
   - `--macos-control-bg: rgba(255,255,255,.72)`
   - `--macos-control-bg-hover: rgba(255,255,255,.86)`
   - `--macos-control-bg-active: rgba(0,0,0,.06)`
   - `--macos-accent: #0088ff`
   - `--macos-focus-ring: rgba(0,136,255,.48)`

3. **Tokens semanticos DARK** en `html.macos.dark` (mismos 14 con valores dark de la spec)

4. **Increased contrast** via `@media (prefers-contrast: more)`:

   - Labels con mayor opacidad, borders mas visibles, focus ring mas opaco

5. **12 System colors** × 4 variantes (light, dark, light-hc, dark-hc):

   - Red, Orange, Yellow, Green, Mint, Teal, Cyan, Blue, Indigo, Purple, Pink, Brown
   - Formato: `--macos-system-red: #ff383c` (light), `--macos-system-red-dark: #ff4245`, etc.

6. **Shape tokens**:

   - `--macos-radius-window: 18px`, `--macos-radius-sheet: 24px`
   - `--macos-radius-popover: 16px`, `--macos-radius-control: 10px`
   - `--macos-radius-small-control: 8px`, `--macos-radius-pill: 999px`

7. **Spacing/layout tokens**:

   - `--macos-grid: 8px`, `--macos-toolbar-height: 52px`
   - `--macos-titlebar-height: 28px`, `--macos-sidebar-width: 240px`
   - `--macos-inspector-width: 300px`

8. **Chart tokens** (12):
   - `--macos-chart-grid`, `--macos-chart-axis`
   - `--macos-chart-tooltip-bg`, `--macos-chart-tooltip-border`
   - `--macos-chart-series-1` through `--macos-chart-series-6`

#### 2.2 — `macos-liquid-glass.css`

1. **Tokens de materiales glass**:

   - `--macos-glass-regular-bg`, `--macos-glass-clear-bg`, `--macos-glass-prominent-bg`
   - `--macos-glass-border`, `--macos-glass-highlight`, `--macos-glass-shadow`
   - `--macos-scroll-edge`
   - Fallbacks opacos para cada material

2. **Utility classes**:

   - `.macos-glass-regular` — `backdrop-filter: blur(28px) saturate(1.8)` + bg + border + highlight
   - `.macos-glass-clear` — menos opacidad, blur menor
   - `.macos-glass-prominent` — accent tint
   - `.macos-scroll-edge-top` / `.macos-scroll-edge-bottom`
   - `.macos-dim-layer` — 35% oscurecimiento

3. **Reduced transparency** — `@media (prefers-reduced-transparency: reduce)`:

   - Aumentar opacidad, reducir/eliminar `backdrop-filter`

4. **Performance rule** — Comentario:

   ```css
   /* PERFORMANCE: Max 2 capas de backdrop-filter simultaneas en viewport.
      Usar will-change: transform SOLO en elementos que realmente animan.
      Preferir background opaco sobre backdrop-filter cuando sea posible. */
   ```

5. **@supports fallback**:
   ```css
   @supports not (backdrop-filter: blur(1px)) {
     html.macos .macos-glass-regular {
       background: var(--macos-glass-regular-fallback);
     }
     /* ... */
   }
   ```

#### 2.3 — `macos-backgrounds.css`

1. **Tokens de fondos espaciales** (light + dark)
2. **Classes**:
   - `.macos-bg-spatial-aurora` — gradientes CSS aurora (azul/cyan/halo)
   - `.macos-bg-spatial-depth` — mas sobrio, graphite
   - `.macos-bg-spatial-demo` — expresivo, para hero/showcase
3. **Overlay classes**: `.macos-wallpaper-overlay`
4. **Accessibility**: reduced-transparency → fondo opaco

### Criterios de aceptacion de fase

- [ ] 14 tokens semanticos × 2 modos (light/dark) + increased contrast
- [ ] 12 system colors × 4 variantes
- [ ] 6 shape tokens, 5 spacing tokens
- [ ] 12 chart tokens
- [ ] 7 glass tokens + 5 utility classes + @supports fallback
- [ ] 5 tokens de fondo espacial + 3 classes + overlay
- [ ] `pnpm nx build tucu-ui` pasa

### Verificacion

```bash
pnpm nx build tucu-ui
```

### Riesgos de fase

- Valores pueden no coincidir exactamente con UI Kit → declarar como referencia, calibrar en F19
- backdrop-filter blur(28px) pesado en Safari → preparar valor menor como fallback

---

## Fase 3 — Tipografia macOS (Complejidad: M)

### Objetivo

Implementar los 11 text styles macOS con tracking correcto y mapeo a elementos HTML.

### Dependencias

- Fase 1 (Inter bundleada)
- Fase 2 (font-family tokens)

### Archivos a crear/modificar

| Accion     | Ruta                                                   |
| ---------- | ------------------------------------------------------ |
| Reescribir | `ui/tucu-ui/src/assets/css/macos/macos-typography.css` |

### Sub-tareas detalladas

1. **Tokens por text style** (11 × 4 propiedades: size, weight, line-height, tracking):

   - Large Title: 26px / 400 / 32px / 0.22px
   - Title 1: 22px / 400 / 26px / -0.26px
   - Title 2: 17px / 400 / 22px / -0.43px
   - Title 3: 15px / 400 / 20px / -0.23px
   - Headline: 13px / 700 / 16px / -0.08px
   - Body: 13px / 400 / 16px / -0.08px
   - Callout: 12px / 400 / 15px / 0
   - Subheadline: 11px / 400 / 14px / 0.06px
   - Footnote: 10px / 400 / 13px / 0.12px
   - Caption 1: 10px / 400 / 13px / 0.12px
   - Caption 2: 10px / 500 / 13px / 0.12px

2. **Utility classes**: `.macos-large-title`, `.macos-title-1`, ..., `.macos-caption-2`

3. **Emphasized variants**: `.macos-body-emphasized` (weight 600), etc.

4. **Mapeo a HTML elements** scoped a `html.macos`:

   - h1→Large Title, h2→Title 1, h3→Title 2, h4→Title 3
   - h5→Headline, h6→Subheadline
   - body/p→Body, code/pre→font-family mono

5. **Base font-size**: `html.macos { font-size: 13px; line-height: 16px; }`

6. **Regla**: No pesos < 400. Priorizar 400, 500, 600, 700.

### Criterios de aceptacion de fase

- [ ] 11 text styles con clases CSS funcionando
- [ ] Tracking aplicado por tamano
- [ ] Inter como font-family base en `html.macos`
- [ ] JetBrains Mono para `code`, `pre`
- [ ] `pnpm nx build tucu-ui` pasa

### Verificacion

```bash
pnpm nx build tucu-ui
```

---

## Fase 4 — Theme integration: hooks, store y wrapper (Complejidad: M)

### Objetivo

Asegurar que la activacion/desactivacion del theme macOS funciona correctamente con Tahoe, sin residuos y con hooks de accesibilidad.

### Dependencias

- Fase 2 (tokens disponibles)

### Archivos a crear/modificar

| Accion    | Ruta                                        |
| --------- | ------------------------------------------- |
| Modificar | `ui/tucu-ui/src/themes/hooks/use-theme.tsx` |
| Modificar | `ui/tucu-ui/src/themes/theme-wrapper.tsx`   |
| Verificar | `ui/tucu-ui/src/themes/theme-provider.tsx`  |
| Verificar | `ui/tucu-ui/src/themes/settings/*`          |
| Verificar | `ui/tucu-ui/src/types/*` (layout types)     |

### Sub-tareas detalladas

1. **Verificar `applyMacOSTheme()`**:

   - Aplica `html.macos` al `<html>`
   - Establece `colorScheme: 'macos'` en Zustand store
   - Activa layout macOS coherente
   - No deja clases residuales de otro theme

2. **Verificar `applyDefaultTheme()`**:

   - Remueve `html.macos`
   - Restaura `colorScheme` default
   - No deja estilos Tahoe filtrados
   - Restaura layout default

3. **Transicion entre themes**:

   - Debe ser **inmediata** (sin animacion morph/fade)
   - No debe causar layout shift
   - CSS custom properties se aplican instantaneamente

4. **Hooks de accesibilidad**:

   - `useReducedMotion()` — detecta media query
   - `useDarkMode()` — detecta dark en macOS theme
   - Si existe `useAccessibility()` → verificar que retorna estados

5. **ThemeWrapper**:

   - `html.macos` en nodo `<html>` correcto
   - `dark` class junto a `macos` (no excluyentes)
   - `dir` attribute preservado

6. **Settings UI**: Opcion macOS muestra destino Tahoe, no theme separado

7. **LAYOUT_OPTIONS**: Verificar si existe `MACOS_TAHOE` o solo `MACOS`

### Criterios de aceptacion de fase

- [ ] Toggle macOS ↔ default funciona sin residuos
- [ ] Transicion inmediata sin layout shift
- [ ] Hooks de accesibilidad funcionan en modo macOS
- [ ] `pnpm nx build tucu-ui` pasa

### Verificacion

```bash
pnpm nx build tucu-ui
pnpm nx lint tucu-ui
```

---

## Fase 5 — Shell macOS: Window, Toolbar, Sidebar (Complejidad: L)

### Objetivo

Evolucionar componentes exclusivos macOS a Tahoe con Liquid Glass y estados actualizados.

### Dependencias

- Fase 2 (tokens y glass materials)
- Fase 4 (theme integration)

### Archivos a crear/modificar

| Accion     | Ruta                                                                  |
| ---------- | --------------------------------------------------------------------- |
| Reescribir | `ui/tucu-ui/src/assets/css/macos/macos-window.css`                    |
| Reescribir | `ui/tucu-ui/src/assets/css/macos/macos-toolbar.css`                   |
| Reescribir | `ui/tucu-ui/src/assets/css/macos/macos-sidebar.css`                   |
| Modificar  | Componentes en `ui/tucu-ui/src/components/macos/` (agregar data-tucu) |

### Sub-tareas detalladas

#### 5.1 — Window

1. MacOSWindow: radius-window (18px), shadow multicapa 3 niveles, estados key/main/inactive
2. MacOSTitleBar: 28px altura, drag region, titulo centrado opcional
3. MacOSTrafficLights: 12px, gap 8px, active/inactive/hover glyphs

#### 5.2 — Toolbar

4. MacOSToolbar: glass-regular, 52px altura, leading|center|trailing
5. MacOSToolbarGroup: capsula agrupadora, max 3 grupos
6. MacOSToolbarButton: icon-only, tooltip obligatorio, 5 estados
7. Scroll edge bottom activado por scroll
8. MacOSToolbarOverflowMenu: overflow automatico

#### 5.3 — Sidebar

9. MacOSSidebar: glass-regular, 240px, background extension
10. MacOSSidebarSection: header headline, collapsible
11. MacOSSidebarItem: 28px row, icon+label, selected accent bg, badge
12. MacOSContentPane: content-bg, scroll overlay, safe area
13. MacOSScrollView: overlay scrollbar 6px, auto-hide, scroll edge
14. MacOSSplitView: sidebar/content/inspector redimensionables
15. MacOSInspector: trailing panel, glass/material, forms compactos

### Criterios de aceptacion de fase

- [ ] Window con radius 18px, shadow multicapa, 3 estados
- [ ] Toolbar con glass, 3 grupos, scroll edge
- [ ] Sidebar con glass, sections, selected state
- [ ] Traffic lights con 3 estados
- [ ] `pnpm nx build tucu-ui` pasa

### Riesgos de fase

- Toolbar + Sidebar = 2 capas backdrop-filter (maximo permitido)
- Scroll edge z-index puede bloquear elementos interactivos → ajustar pointer-events

---

## Fase 6 — Layouts existentes restyling (Complejidad: L)

### Objetivo

Adaptar layouts y navegacion existente para heredar Tahoe via `html.macos`.

### Dependencias

- Fase 2 (tokens), Fase 4 (theme integration)

### Archivos a crear/modificar

| Accion     | Ruta                                                 |
| ---------- | ---------------------------------------------------- |
| Reescribir | `ui/tucu-ui/src/assets/css/macos/macos-layouts.css`  |
| Modificar  | Componentes de layout (agregar `data-tucu` si falta) |

### Sub-tareas detalladas

1. **RootLayout** — Fondo espacial Tahoe, font Inter, tokens base
2. **AdminLayout** — Sidebar como source list glass, header como toolbar glass
3. **CleanLayout** — Fondo content-bg, tipografia macOS, sin barras
4. **HorizontalLayout** — Nav horizontal con glass regular
5. **Header / AdminHeader / HorizontalHeader** — Glass regular, toolbar height, slots
6. **CollapsibleMenu** — Source list: secciones, disclosure, row states, badges
7. **ExpandableSidebar** — Glass regular, width transicion, toggle button
8. **HorizontalNavMenu** — Items con glass hover, selected state
9. **SidebarMenu** — Source list con secciones y disclosure
10. **MenuItem** — Hover/pressed/selected Tahoe, icon + label
11. **AdminRightArea / HorizontalRightArea** — Controles compactos, tokens macOS

Para cada componente: verificar `data-tucu` → agregar si falta → escribir override CSS.

### Criterios de aceptacion de fase

- [ ] AdminLayout en macOS muestra sidebar glass + toolbar glass
- [ ] `applyDefaultTheme()` remueve estilos sin residuos
- [ ] Contratos `menuItems`, `appRoutesConfig`, `basePath` preservados
- [ ] `pnpm nx build tucu-ui` pasa

---

## Fase 7 — Buttons y controles core (Complejidad: M)

### Objetivo

Restyleer componentes button con estados Tahoe y glass.

### Dependencias

- Fase 2 (tokens)

### Archivos a crear/modificar

| Accion     | Ruta                                                |
| ---------- | --------------------------------------------------- |
| Reescribir | `ui/tucu-ui/src/assets/css/macos/macos-buttons.css` |
| Modificar  | Componentes button (agregar `data-tucu`)            |

### Sub-tareas detalladas

1. **Button** (`solid|ghost|transparent`, sizes `large|medium|small|mini|tiny`):

   - solid → prominent glass (accent bg, white label)
   - ghost → control glass (translucent bg)
   - transparent → toolbar/plain (no bg, hover subtle)
   - 6 estados: default, hover, pressed, disabled, focus-visible, loading

2. **Hamburger** — Icon button macOS con estados
3. **TopupButton** — Tokens macOS si exportado
4. **MacOSPushButton** — Text/icon, altura estandar, press state
5. **MacOSSquareButton** — Icon-only para acciones
6. **MacOSHelpButton** — Circular `?`
7. **MacOSIconButton** — Toolbar/contenido, label accesible
8. **MacOSToggleButton** — Selected state para toggle

### Criterios de aceptacion de fase

- [ ] Variantes `solid|ghost|transparent` correctas
- [ ] Sizes `large|medium|small|mini|tiny` mapean a alturas macOS
- [ ] Icon-only buttons con tooltip/aria-label
- [ ] Focus ring macOS
- [ ] `pnpm nx build tucu-ui` pasa

---

## Fase 8 — Inputs y forms (Complejidad: L)

### Objetivo

Restyleer todos los inputs y formularios existentes + crear nuevos macOS-specific.

### Dependencias

- Fase 2 (tokens), Fase 7 (buttons para form actions)

### Archivos a crear/modificar

| Accion     | Ruta                                               |
| ---------- | -------------------------------------------------- |
| Reescribir | `ui/tucu-ui/src/assets/css/macos/macos-inputs.css` |
| Modificar  | Componentes input (agregar `data-tucu`)            |

### Sub-tareas detalladas

1. **Input** — 13px, placeholder tertiary-label, radius-control, focus ring
2. **InputSearcher** — Search icon, clear button, suggestions dropdown glass
3. **Select** — Dropdown glass regular
4. **Textarea** — Multiline, resize, overlay scrollbars
5. **FileInput** — Drop zone con drag-over state
6. **PinCode** — Inputs individuales, radius-control, gap
7. **Form** — Grouped surface, labels alineados
8. **FormField** — Label + control + error (system red)
9. **HookForm** — Hereda transitivamente
10. **MacOSForm** — Grouped form, row height mayor
11. **MacOSFormRow** — Label/control/help/error densidad escritorio
12. **MacOSGroupBox** — Contenedor settings
13. **MacOSSecureField** — Password con visibility toggle
14. **MacOSTokenField** (avanzado) — Tokens editables
15. **MacOSColorWell** (avanzado) — Color picker
16. **MacOSDateTimeField** (avanzado) — Date/time

### Criterios de aceptacion de fase

- [ ] Inputs con radius-control, focus ring, placeholder tertiary
- [ ] Forms con grouped surface
- [ ] Error/success con system colors
- [ ] `pnpm nx build tucu-ui` pasa

---

## Fase 9 — Seleccion y entrada numerica (Complejidad: M)

### Dependencias: Fase 2, 8

### Sub-tareas

1. **Checkbox** — off/on/mixed, accent
2. **Radio / RadioGroup** — Circulos, 2-5 opciones
3. **Switch** — Regular/mini, accent color
4. **SegmentedControl / ToggleBar** — Single/multiple, igualdad ancho
5. **Slider** — Linear, thumb lozenge, track accent
6. **Stepper** — Increment/decrement
7. **CircularSlider** (avanzado)
8. **RatingIndicator** (avanzado)

### Archivos: `ui/tucu-ui/src/assets/css/macos/macos-selection.css`

---

## Fase 10 — Navegacion y menus (Complejidad: L)

### Dependencias: Fase 5

### Sub-tareas

1. **MacOSMenu** — Glass regular, separators, shortcuts
2. **MacOSMenuItem** — Label, icon, shortcut, checkmark, destructive
3. **MacOSSubmenu** — Un nivel preferido
4. **MacOSContextMenu** — Acciones frecuentes
5. **MacOSPopUpButton** — Seleccion opcion
6. **MacOSPullDownButton** — Ejecuta/revela acciones
7. **MacOSTabView** — Tabs vista principal
8. **MacOSSegmentedViewSwitcher** — En toolbar/inspector
9. **MacOSMenuBar** (avanzado) — App/File/Edit/View/Window/Help
10. **MacOSMenuBarExtra** (avanzado) — Icono 24pt
11. **MacOSBreadcrumbPath** (avanzado) — Document path
12. **MacOSToolbarOverflowMenu** — Overflow automatico

### Archivos: `ui/tucu-ui/src/assets/css/macos/macos-menus.css`

---

## Fase 11 — Organizacion de contenido (Complejidad: L)

### Dependencias: Fase 2

### Sub-tareas

1. **BasicTable** — Separadores hairline, selected state
2. **MacOSList** — Row height Tahoe, keyboard focus
3. **MacOSOutlineList** (avanzado) — Jerarquia con disclosure
4. **DisclosureGroup** — Chevron, reduced motion
5. **MacOSBox** — Agrupar contenido
6. **MacOSEmptyState** — Icono + titulo + accion
7. **Card / CardContainer** — Grouped surface
8. **CardTitle** — Title 2/3
9. **AuthorCard** — Avatar + nombre
10. **InfoCard** — Icono semantico, Callout
11. **PanelActionCard** — CTA prominent
12. **PanelCard** — Neutra
13. **ListContainer** — Grouped, hairline
14. **ListItem** — Row height macOS
15. **KeyValueRow** — Label secundario, valor primario
16. **Collapse** — Disclosure animado
17. **Pagination** — Controles compactos
18. **MacOSForm** (container) — Grouped labels

### Archivos: Seccion content de `macos-layouts.css` o nuevo `macos-content.css`

---

## Fase 12 — Componentes F.bis parte 1: UI general (Complejidad: XL)

### Dependencias: Fase 2, 7, 8

### Sub-tareas (25 componentes)

1. **Avatar** — Borde adaptativo, shadow, row height
2. **Tooltip** — Glass regular, 11px, delay ~0.5s
3. **Typography** — Mapear h1-h6/body/code a text styles
4. **CodeBlock** — Font mono, fondo grouped, radius-control
5. **Image** — Corners redondeados, shadow Tahoe
6. **Loader** — Circular, accent, reduced motion: pulse
7. **Alert** — Material regular, icono, `error|success|info|warning`
8. **Badge** — Count/status, `solid|ghost|outline|soft`
9. **Progressbar** — Determinate/indeterminate, accent
10. **Spinner** — Actividad breve, sizes `xs|sm|md|lg|xl`
11. **Skeleton** — Neutral, reduced motion
12. **Tab / ParamTab** — Tab bar Tahoe selected state
13. **TabSelect** — Segmented en toolbar
14. **ActiveLink** — Accent macOS, underline
15. **AnchorLink** — Accent, transicion
16. **Carousel** — Prev/next glass, indicators pill
17. **CarouselCards** — Surfaces sobrias
18. **CarouselImage** — Aspect ratio, corners, shadow
19. **Scrollbar** — Overlay 6px, pill, auto-hide
20. **ScrollbarNative** — ::-webkit-scrollbar macOS
21. **Hamburger** — Icon button, hide con sidebar
22. **NotificationCard** — Banner discreto
23. **Toast** — Notification discreto
24. **Drawer** — Sheet/sidebar visual
25. **DrawerContainer** — Container adaptado

### Archivos: Distribuido en `macos-buttons.css`, `macos-feedback.css`, `macos-layouts.css`, `macos-presentation.css` segun familia

---

## Fase 13 — Componentes F.bis parte 2: Auth + Blockchain (Complejidad: L)

### Dependencias: Fase 12

### Sub-tareas (13 componentes)

#### Auth (4)

1. **SignInForm** — Tokens macOS, validacion system colors
2. **SignUpForm** — Spacing macOS
3. **ForgetPasswordForm** — Compacto, boton prominent
4. **ResetPinForm** — PinCode tokens

#### Blockchain (9)

5. **CoinCard** — Grouped, mono numeros, badge soft
6. **CoinInfoCard** — KeyValue, hairline, color variacion
7. **CoinListbox** — Row states, search
8. **CollectionCard** — Imagen corners, Callout
9. **CollectionSelectList** — Seleccionable, badges
10. **CurrencySwapIcons** — Shadow, swap sutil
11. **LivePriceFeed** — Mono, Green/Red
12. **NFTGrid** — Cards grouped, hover shadow
13. **TransactionInfo** — KeyValue, badge status

---

## Fase 14 — Presentacion, modales y feedback (Complejidad: L)

### Dependencias: Fase 2, 5

### Archivos: `macos-presentation.css`, `macos-feedback.css`

### Sub-tareas (12 componentes)

1. **Modal / MacOSDialog** — Glass regular, radius-window, roles
2. **MacOSAlert** (dialog) — Icono, mensaje, default+cancel
3. **MacOSSheet** — Radio 24px, inset
4. **MacOSPopover** — Glass, flecha, outside/escape
5. **MacOSPanel** (avanzado) — Flotante auxiliar
6. **Drawer** — Sheet/sidebar visual
7. **TabModal** — Tabs internos Tahoe
8. **Sidebar (dialog)** — Overlay glass + dimming
9. **Toast** — Notification discreto
10. **Badge** — Count/status (si no cubierto en F12)
11. **Progressbar** — Linear/circular accent
12. **Skeleton** — Neutral

---

## Fase 15 — Charts y data visualization (Complejidad: M)

### Dependencias: Fase 2 (chart tokens), Fase 4 (useTheme)

### Archivos a modificar

- `ui/tucu-ui/src/components/charts/hooks/use-chart-theme.ts` (o equivalente)
- `ui/tucu-ui/src/components/charts/shared/*`

### Sub-tareas (10)

1. **useChartTheme** — Detectar `colorScheme === 'macos'`, retornar palette macOS (6 series)
2. **ChartContainer** — content-bg/grouped-bg, borde sutil, padding Tahoe
3. **ChartTooltip** — Glass o solido, shadow, Callout font
4. **ChartEmptyState** — Icono + secondary-label
5. **LineChart** — Series system colors, grid sutil
6. **BarChart** — Radius-small-control, hover highlight
7. **AreaChart** — Fill opacity Tahoe, stroke accent
8. **PieChart** — System colors, labels Callout
9. **RadarChart** — Grid sutil, fill alpha baja
10. **ComposedChart** — Hereda Line/Bar/Area

---

## Fase 16 — Iconografia Tahoe (Complejidad: M)

### Dependencias: Fase 5, 7

### Sub-tareas

1. **Normalizacion visual**: currentColor, stroke 1.5-2px, sizing 16/20/24px
2. **Documentar mapeo** Lucide → acciones macOS (add→Plus, delete→Trash2, etc.)
3. **SVG propios** solo para brechas: traffic lights, disclosure chevron
4. **Accesibilidad**: decorativos aria-hidden, interactivos con nombre

---

## Fase 17 — Componentes avanzados P1 + P2 (Complejidad: L)

### Dependencias: Fase 5, 10

### Sub-tareas

#### P1 (primera iteracion)

1. **MacOSCommandPalette** — Search + resultados agrupados + quick keys + Cmd+K + Escape

#### P2 (nice to have)

2. **MacOSControlCenterPanel** — Toggles/sliders agrupados
3. **MacOSControlTile** — Tile individual
4. **MacOSWidget** — Translucido compatible wallpaper
5. **MacOSMenuBarLiveActivity** — Chip compacto/expandible
6. **MacOSSpotlightResultList** — Resultados para CommandPalette

#### P3 — DIFERIDO (no implementar)

- AppIconPreview, IconLayer, PhoneCallPanel, GameOverlay, MarkdownExportPanel

### Archivos: `macos-widgets.css` + nuevos componentes en `components/macos/`

---

## Fase 18 — Documentacion y demo (Complejidad: L)

### Dependencias: Todas las fases previas

### Sub-tareas

1. Secciones demo: Comparativa Default vs Tahoe (light+dark)
2. Demo reduced transparency + reduced motion
3. Demo toolbar/sidebar con scroll edge
4. Demo fondos espaciales
5. Imports publicos: solo `@e-burgos/tucu-ui`
6. Router: `ReactRouter` de tucu-ui
7. Iconos: `LucideIcons` de tucu-ui
8. Regenerar props metadata: `pnpm tsx scripts/generate-props.ts`
9. Si componentes nuevos: invocar `tucu-ui-docs-sync`
10. Validar `AutoPropsTable` + `PropPlayground`

### Verificacion

```bash
pnpm nx build demo
pnpm tsx scripts/generate-props.ts
```

---

## Fase 19 — QA visual, accesibilidad y performance (Complejidad: M)

### Dependencias: Todas

### Sub-tareas

#### Visual

1. Cada familia en: light, dark, increased contrast
2. `prefers-reduced-transparency: reduce` (DevTools)
3. `prefers-reduced-motion: reduce` (DevTools)
4. Comparar con macOS 26 UI Kit
5. Toggle macOS ↔ default: no residuos

#### Accesibilidad

6. Contraste AA texto sobre glass/fondos
7. Teclado: Tab, Shift+Tab, Escape, Return
8. Icon-only buttons: tooltip/aria-label
9. Lighthouse a11y audit

#### Performance

10. Max 2 capas backdrop-filter simultaneas
11. FPS scroll > 55fps (Chrome DevTools)
12. Bundle size delta < 600KB (fuentes + CSS)
13. font-display: swap (no FOIT)

#### Build

14. `pnpm nx build tucu-ui` — PASS
15. `pnpm nx lint tucu-ui` — PASS
16. `pnpm nx build demo` — PASS
17. `pnpm tsx scripts/generate-props.ts` — sin errores

---

## Matriz de cobertura completa

> Ver spec seccion "Inventario de componentes" (A-I) + F.bis.
> Cada componente aparece en exactamente una fase de este plan.
> Total: ~160 componentes/tokens/utilities.

La tabla detallada por componente se encuentra en las sub-tareas de cada fase.

---

## Riesgos globales

| #   | Riesgo                                       | Prob. | Impacto | Mitigacion                                      |
| --- | -------------------------------------------- | ----- | ------- | ----------------------------------------------- |
| 1   | Licencia Apple (SF Pro, Symbols, wallpapers) | Baja  | Critico | Inter, Lucide, assets propios                   |
| 2   | Glass excesivo reduce legibilidad            | Media | Alto    | Glass solo en nav/controles                     |
| 3   | Regresion Default theme                      | Media | Alto    | Todo scoped a `html.macos`                      |
| 4   | APIs duplicadas                              | Media | Alto    | No crear TahoeButton, evolucionar con data-tucu |
| 5   | Performance backdrop-filter                  | Media | Medio   | Max 2 capas, @supports fallback                 |
| 6   | Bundle size (fuentes + CSS)                  | Baja  | Medio   | Variable fonts ~450KB, subset opcional          |
| 7   | Conflicto Tailwind                           | Media | Medio   | Especificidad `html.macos` gana                 |
| 8   | Componentes sin data-tucu                    | Media | Medio   | Agregar en primera sub-tarea de cada fase       |
| 9   | Calibracion sin UI Kit                       | Alta  | Bajo    | Valores referencia, calibrar en F19             |
| 10  | Worktree sucio                               | Baja  | Bajo    | Branch limpio, diff solo fase activa            |

---

## Criterios de aceptacion globales

- [ ] `pnpm nx build tucu-ui` exitoso
- [ ] `pnpm nx lint tucu-ui` exitoso
- [ ] `pnpm nx build demo` exitoso
- [ ] `colorScheme: 'macos'` + `html.macos` = contrato principal
- [ ] `applyMacOSTheme()` activa Tahoe; `applyDefaultTheme()` revierte
- [ ] Todo componente visible cubierto por Tahoe
- [ ] Liquid Glass solo en navegacion/controles flotantes
- [ ] Contenido legible con material standard
- [ ] Light + dark + increased contrast diferenciados
- [ ] Reduced motion + reduced transparency soportados
- [ ] Fondos espaciales originales (CSS gradients propios)
- [ ] Inter + JetBrains Mono bundleadas
- [ ] Max 2 capas backdrop-filter
- [ ] Charts consumen tokens via useChartTheme
- [ ] LucideIcons por defecto, SVG propios solo brechas
- [ ] Icon-only buttons con tooltip/aria-label
- [ ] No SF Pro ni assets Apple distribuidos
- [ ] Props metadata regenerada
- [ ] Variantes validas preservadas: Button `solid|ghost|transparent`, Alert `error|success|info|warning`, Badge `solid|ghost|outline|soft`

---

## Verificacion final

```bash
pnpm nx build tucu-ui
pnpm nx lint tucu-ui
pnpm nx build demo
pnpm tsx scripts/generate-props.ts
```

---

## Post-implementacion

- [ ] Diff confirma scope de fase activa solamente
- [ ] Componentes nuevos → `tucu-ui-docs-sync`
- [ ] Assets/fondos documentados como propios (no Apple)
- [ ] PR con descripcion spec + matriz cobertura
- [ ] Screenshots referencia (light+dark) de componentes clave
- [ ] Decisiones nuevas registradas en spec si cambian contratos
- [ ] Changelog entry para release
