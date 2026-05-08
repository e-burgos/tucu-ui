# Spec 03 — macOS Sonoma 14 Design System (Theme Style)

**Fecha:** 2025-05-08
**Versión:** 1.0
**Estado:** En progreso
**Branch:** `feat/macos-design-system`
**Dependencias:** Ninguna

## Resumen

Implementar "macOS Sonoma 14" como un **Theme Style** completo dentro de `tucu-ui`. Al activarlo, **todos** los componentes existentes de la librería deben transformar su apariencia para sentirse nativos de macOS Sonoma — no solo colores, sino bordes, radios, sombras, tipografía, espaciado, animaciones y materiales (vibrancy/blur).

El mecanismo ya existe parcialmente: `useTheme().colorScheme === 'macos'` agrega la clase `html.macos` al DOM. La tarea es extender los **CSS tokens** y agregar **overrides por componente** en `globals.css` para que cada uno de los ~208 componentes base se transforme.

## Principios de diseño macOS Sonoma 14

| Aspecto       | Valor macOS                                                       |
| ------------- | ----------------------------------------------------------------- |
| Border radius | Ventanas: 10px, Cards/inputs: 8px, Botones: 6px, Pills: 999px     |
| Font          | SF Pro Display/Text (fallback: system-ui, -apple-system)          |
| Font weight   | Regular 400, Medium 500, Semibold 600 (evitar Bold 700+)          |
| Sombras       | Difusas, multi-capa, sutiles en light / más profundas en dark     |
| Bordes        | 0.5px–1px, colores con alpha (separatorColor)                     |
| Materiales    | backdrop-blur + bg translúcido (sidebar, toolbar, popover, sheet) |
| Espaciado     | 8px grid, padding interno generoso                                |
| Animaciones   | spring-based, 200-300ms, ease-out                                 |
| Focus ring    | 3px systemBlue al 50% opacity, offset 2px                         |
| Colores       | System colors de Apple (blue, gray scale, orange accent)          |

## Arquitectura / Estrategia

### Estrategia: CSS Overrides en cascada (Estrategia A)

Usar `html.macos` como selector padre para overriders de todos los componentes. NO crear variantes de componentes duplicados. Los 8 componentes macOS exclusivos (Window, Sidebar, etc.) quedan como complementos opcionales.

### Estructura de archivos

```
ui/tucu-ui/src/assets/
  fonts/
    sf-pro/
      SF-Pro-Display-Regular.woff2
      SF-Pro-Display-Medium.woff2
      SF-Pro-Display-Semibold.woff2
      SF-Pro-Display-Bold.woff2
      SF-Pro-Text-Regular.woff2
      SF-Pro-Text-Medium.woff2
      SF-Pro-Text-Semibold.woff2
  css/
    globals.css                    # Tokens base (ya existe, se extiende)
    macos/
      macos-fonts.css              # @font-face declarations para SF Pro
      macos-foundations.css        # Tokens globales macOS (tipografía, spacing, radii, focus)
      macos-buttons.css            # Overrides para Button, TopupButton
      macos-cards.css              # Overrides para Card, CardContainer, InfoCard, PanelCard, etc.
      macos-inputs.css             # Overrides para Input, Select, Checkbox, Radio, Switch, etc.
      macos-dialogs.css            # Overrides para Modal, Drawer, Sidebar
      macos-tables.css             # Overrides para BasicTable, Pagination
      macos-navigation.css         # Overrides para Tabs, ParamTab, CollapsibleMenu
      macos-feedback.css           # Overrides para Alert, Badge, Spinner, Toast, Progressbar
      macos-typography.css         # Overrides para tipografía general, links
      macos-layouts.css            # Overrides para layouts (header, sidebar, scrollbar)
      macos-misc.css               # Overrides restantes: Carousel, Collapse, Tooltip, etc.
      index.css                    # Barrel import de todos los archivos macOS
```

### Import chain

`globals.css` → `@import './macos/index.css'` al final del archivo.

### Mecanismo de activación

1. `applyMacOSTheme()` → setea `colorScheme: 'macos'` + `layout: LAYOUT_OPTIONS.MACOS` + presets de colores
2. `ThemeWrapper` → agrega/remueve clase `macos` en `<html>`
3. CSS cascade → `html.macos .component-class { ... }` transforma visualmente
4. Componentes macOS exclusivos (Window, Toolbar, etc.) solo se renderizan en `MacOSLayout`

## Fases de implementación

### Fase A — Foundations & Infraestructura CSS

- [ ] Corregir `applyMacOSTheme()` para setear `layout: LAYOUT_OPTIONS.MACOS`
- [ ] Corregir `applyDefaultTheme()` para restaurar layout al default
- [ ] Crear `macos/macos-foundations.css` con tokens globales (tipografía, radii, spacing, focus, transitions)
- [ ] Crear `macos/index.css` barrel
- [ ] Importar desde `globals.css`
- [ ] Verificar que el toggle en Settings funcione end-to-end

### Fase B — Componentes de alta visibilidad

- [ ] `macos-buttons.css` — Button (todas las variantes: solid, ghost, transparent × todos los colores × todos los shapes)
- [ ] `macos-cards.css` — Card, CardContainer, CardTitle, InfoCard, PanelCard, PanelActionCard, AuthorCard
- [ ] `macos-inputs.css` — Input, Select, InputSearcher, Checkbox, Radio, RadioGroup, Switch, ToggleBar, Textarea, FileInput, PinCode
- [ ] `macos-dialogs.css` — Modal, Drawer, DrawerContainer, Sidebar, SidebarMenu, TabModal

### Fase C — Componentes de datos y navegación

- [ ] `macos-tables.css` — BasicTable, Pagination, SpikeBar
- [ ] `macos-navigation.css` — Tabs (Tab, TabSelect, ParamTab), CollapsibleMenu, ActiveLink, Collapse
- [ ] `macos-feedback.css` — Alert, Badge, Toast, NotificationCard, Spinner, Progressbar, Skeleton, Stepper

### Fase D — Componentes secundarios y layout

- [ ] `macos-typography.css` — Headings, paragraphs, links (ArrowLink, ExternalLink, AnchorLink, LinkIcon)
- [ ] `macos-layouts.css` — AdminHeader, HorizontalHeader, Scrollbar, ScrollbarNative, ScrollToTop
- [ ] `macos-misc.css` — Carousel, Tooltip, Tag, Avatar, Image, CodeBlock, RevealContent, CompactGrid, NftGrid, NormalGrid, Collapse, KeyValueRow

### Fase E — Charts y componentes especializados

- [ ] Charts: ChartContainer, ChartTooltip, ChartEmptyState — ajustar tema a match macOS
- [ ] Blockchain components: CoinCard, CoinInfoCard, CoinListbox, LivePriceFeed, LivePricing, etc.
- [ ] Auth forms: SignInForm, SignUpForm, ForgetPasswordForm, ResetPinForm
- [ ] Logos: ajustar si es necesario

### Fase F — Polish, animaciones y QA

- [ ] Agregar transiciones CSS (`transition`) para smooth switching entre themes
- [ ] Verificar dark mode macOS completo
- [ ] Verificar responsive (mobile, tablet, desktop)
- [ ] Asegurar `prefers-reduced-motion` respetado
- [ ] QA visual completo de cada componente en ambos temas
- [ ] Demo page actualizada con comparación side-by-side

## Criterios de aceptación

- [ ] Build exitoso (`pnpm nx build tucu-ui`)
- [ ] Al activar "macOS" en Theme Style, **todos** los componentes visibles cambian su apariencia
- [ ] Light + Dark mode funcionan correctamente en macOS theme
- [ ] El cambio entre Default ↔ macOS es fluido (transiciones CSS)
- [ ] No hay regresión visual en el tema Default
- [ ] `prefers-reduced-motion` respetado
- [ ] Los 8 componentes macOS exclusivos siguen funcionando
- [ ] MacOSLayout se activa automáticamente al elegir macOS theme
- [ ] Se restaura el layout original al volver a Default

## Stack técnico obligatorio

La implementación **debe** usar exclusivamente el stack actual de la librería. No se agregan dependencias nuevas salvo que esta sección lo indique explícitamente.

| Capa             | Herramienta actual      | Versión | Notas                                                                                                     |
| ---------------- | ----------------------- | ------- | --------------------------------------------------------------------------------------------------------- |
| Framework        | React                   | 18+     | Hooks, functional components                                                                              |
| Lenguaje         | TypeScript              | 5.x     | Strict mode                                                                                               |
| Estilos          | Tailwind CSS v4         | 4.x     | `@import` based, sin `tailwind.config` — los overrides macOS van en CSS puro con `@layer` si es necesario |
| CSS tooling      | PostCSS                 | —       | Ya configurado en Vite pipeline                                                                           |
| State management | Zustand                 | 4.x     | `useTheme()` store para theme switching                                                                   |
| Build            | Vite                    | 5.x     | Bundler de la librería y apps                                                                             |
| Monorepo         | Nx                      | —       | `pnpm nx build tucu-ui` para verificar                                                                    |
| Package manager  | pnpm                    | —       | Workspaces                                                                                                |
| Utilidades CSS   | `cn()` (clsx + twMerge) | —       | Merge de clases en componentes                                                                            |

### Herramientas nuevas requeridas por esta feature

| Herramienta                 | Propósito                 | Justificación                                                                                                                                      |
| --------------------------- | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| Archivos `.woff2` de SF Pro | Tipografía cross-platform | `@font-face` con `local()` + `url()` fallback — los archivos se generan desde los `.otf` oficiales de Apple (ver `docs/macos-resources/README.md`) |

### Restricciones

- **NO** agregar Framer Motion, CSS-in-JS (styled-components, emotion), ni pre-procesadores (Sass, Less)
- **NO** crear componentes wrapper duplicados — usar CSS overrides con `html.macos` selector
- **NO** modificar la API pública de ningún componente existente (props, exports)
- Los `data-tucu` attributes que se agreguen a componentes son internos y no cambian la interfaz pública
- Los archivos CSS macOS se importan condicionalmente vía `@import` en `globals.css`, no requieren lazy loading manual

## Out of scope

- Soporte para otros themes (Windows, GNOME, etc.) — solo macOS Sonoma 14
- Soporte para SF Pro Italic (solo Regular/Medium/Semibold/Bold)
- Componentes macOS exclusivos nuevos más allá de los 8 existentes
- Animaciones con Framer Motion (se usan CSS transitions puras)
- Soporte iOS/iPadOS — solo desktop macOS

## Decisiones de diseño

| #   | Decisión                                                 | Alternativa                                           | Razón                                                                                                                                                        |
| --- | -------------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | CSS overrides con `html.macos` selector                  | Component swapping (renderizar componentes distintos) | Menor código, no rompe API, más mantenible. El 90% de la transformación es visual.                                                                           |
| 2   | Archivos CSS separados por categoría                     | Todo en un solo archivo                               | Organización, legibilidad, facilidad de mantener ~200 componentes                                                                                            |
| 3   | SF Pro via `@font-face` con `local()` + `url()` fallback | Solo `system-ui` (no cross-platform)                  | En macOS, `local()` encuentra SF Pro instalada (0 bytes). En otros OS, descarga `.woff2` (~300KB). La fuente solo se carga cuando el tema macOS está activo. |
| 4   | Tokens CSS custom properties                             | Tailwind utilities inline                             | Centralización, un solo lugar para ajustar, consistencia                                                                                                     |
| 5   | `applyMacOSTheme()` setea layout automáticamente         | User elige layout por separado                        | UX coherente: macOS theme = macOS layout, no tiene sentido visual separar                                                                                    |

---

## Apéndice A — Referencia de diseño macOS Sonoma 14

> Todas las especificaciones provienen de fuentes oficiales de Apple.

### Fuentes consultadas

| #   | Fuente                      | URL                                                                       | Datos extraídos                                               |
| --- | --------------------------- | ------------------------------------------------------------------------- | ------------------------------------------------------------- |
| 1   | **Apple HIG — Typography**  | https://developer.apple.com/design/human-interface-guidelines/typography  | Text styles, font sizes, weights, tracking values             |
| 2   | **Apple HIG — Color**       | https://developer.apple.com/design/human-interface-guidelines/color       | System colors RGB exactos, gray scale, dynamic system colors  |
| 3   | **Apple HIG — Materials**   | https://developer.apple.com/design/human-interface-guidelines/materials   | Vibrancy, blur, standard materials, macOS NSVisualEffectView  |
| 4   | **Apple HIG — Buttons**     | https://developer.apple.com/design/human-interface-guidelines/buttons     | Push button, square button, macOS button types                |
| 5   | **Apple HIG — Toggles**     | https://developer.apple.com/design/human-interface-guidelines/toggles     | Switch, checkbox (14×14 rounded square), radio (16×16 circle) |
| 6   | **Apple HIG — Text Fields** | https://developer.apple.com/design/human-interface-guidelines/text-fields | Text field behavior, macOS combo box                          |
| 7   | **Apple HIG — Sidebars**    | https://developer.apple.com/design/human-interface-guidelines/sidebars    | Sidebar sizing (small/medium/large), vibrancy, icon colors    |
| 8   | **Apple HIG — Layout**      | https://developer.apple.com/design/human-interface-guidelines/layout      | Safe areas, spacing guidelines                                |
| 9   | **Apple Fonts**             | https://developer.apple.com/fonts/                                        | SF Pro, SF Compact, SF Mono, New York — download page         |
| 10  | **AppKit NSColor docs**     | Sampled from macOS Sonoma 14 via Digital Color Meter                      | Exact hex values for semantic colors                          |

### A1. Tipografía — macOS Built-in Text Styles (oficial)

| Style       | Weight   | Size (pt) | Leading (pt) | Emphasized weight |
| ----------- | -------- | --------- | ------------ | ----------------- |
| Large Title | Regular  | 26        | 32           | Bold              |
| Title 1     | Regular  | 22        | 26           | Bold              |
| Title 2     | Regular  | 17        | 22           | Bold              |
| Title 3     | Regular  | 15        | 20           | Semibold          |
| Headline    | **Bold** | 13        | 16           | Heavy             |
| Body        | Regular  | 13        | 16           | Semibold          |
| Callout     | Regular  | 12        | 15           | Semibold          |
| Subheadline | Regular  | 11        | 14           | Semibold          |
| Footnote    | Regular  | 10        | 13           | Semibold          |
| Caption 1   | Regular  | 10        | 13           | Medium            |
| Caption 2   | Medium   | 10        | 13           | Semibold          |

**Default macOS font size: 13pt. Minimum legible: 10pt.**

### A2. Font strategy: SF Pro via `@font-face`

**Estrategia `local()` + `url()` fallback:**

- En **macOS**: `local('SF Pro Display')` encuentra la fuente instalada → **0 bytes descargados**
- En **otros OS**: `local()` falla → descarga los `.woff2` del servidor (~300KB total)
- Los `@font-face` se declaran siempre, pero el browser solo descarga cuando la fuente se usa en el DOM
- Como `--macos-font-family` solo aplica con `html.macos`, en tema Default no se descarga nada

**Archivos de fuente requeridos:** `ui/tucu-ui/src/assets/fonts/sf-pro/`

| Archivo                         | Weight | Optical size    | ~Tamaño |
| ------------------------------- | ------ | --------------- | ------- |
| `SF-Pro-Display-Regular.woff2`  | 400    | Display (≥20pt) | ~45KB   |
| `SF-Pro-Display-Medium.woff2`   | 500    | Display         | ~45KB   |
| `SF-Pro-Display-Semibold.woff2` | 600    | Display         | ~45KB   |
| `SF-Pro-Display-Bold.woff2`     | 700    | Display         | ~45KB   |
| `SF-Pro-Text-Regular.woff2`     | 400    | Text (<20pt)    | ~40KB   |
| `SF-Pro-Text-Medium.woff2`      | 500    | Text            | ~40KB   |
| `SF-Pro-Text-Semibold.woff2`    | 600    | Text            | ~40KB   |

**Obtención:** Descargar DMG desde https://developer.apple.com/fonts/ → Extraer `.otf` → Convertir a `.woff2`

**Font stack final:**

```css
/* Body/UI (< 20pt): SF Pro Text primero */
--macos-font-family: 'SF Pro Text', 'SF Pro Display', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;

/* Títulos (≥ 20pt): SF Pro Display primero */
--macos-font-display: 'SF Pro Display', system-ui, -apple-system, BlinkMacSystemFont, 'Helvetica Neue', sans-serif;

/* Code: SF Mono */
--macos-font-mono: 'SF Mono', SFMono-Regular, ui-monospace, 'Cascadia Code', Menlo, Monaco, monospace;
```

### A3. Tracking values SF Pro (macOS) — selección clave

| Size (pt) | Tracking (1/1000 em) | CSS letter-spacing |
| --------- | -------------------- | ------------------ |
| 10        | +12                  | +0.12em            |
| 11        | +6                   | +0.06em            |
| 12        | 0                    | 0                  |
| 13        | -6                   | -0.08em            |
| 14        | -11                  | -0.15em            |
| 15        | -16                  | -0.23em            |
| 17        | -26                  | -0.43em            |
| 20        | -23                  | -0.45em            |
| 22        | -12                  | -0.26em            |
| 26        | +8                   | +0.22em            |

**Nota:** Para tamaños 12–20pt el tracking es negativo (más apretado). Para 10–11pt y >23pt es positivo.

### A4. System Colors — valores RGB oficiales

#### Colores primarios del sistema

| Color  | Light RGB  | Light Hex | Dark RGB    | Dark Hex  |
| ------ | ---------- | --------- | ----------- | --------- |
| Blue   | 0,136,255  | `#0088ff` | 0,145,255   | `#0091ff` |
| Green  | 52,199,89  | `#34c759` | 48,209,88   | `#30d158` |
| Orange | 255,141,40 | `#ff8d28` | 255,146,48  | `#ff9230` |
| Red    | 255,56,60  | `#ff383c` | 255,66,69   | `#ff4245` |
| Yellow | 255,204,0  | `#ffcc00` | 255,214,0   | `#ffd600` |
| Purple | 203,48,224 | `#cb30e0` | 219,52,242  | `#db34f2` |
| Pink   | 255,45,85  | `#ff2d55` | 255,55,95   | `#ff375f` |
| Teal   | 0,195,208  | `#00c3d0` | 0,210,224   | `#00d2e0` |
| Indigo | 97,85,245  | `#6155f5` | 109,124,255 | `#6d7cff` |
| Brown  | 172,127,94 | `#ac7f5e` | 183,138,102 | `#b78a66` |
| Mint   | 0,200,179  | `#00c8b3` | 0,218,195   | `#00dac3` |
| Cyan   | 0,192,232  | `#00c0e8` | 60,211,254  | `#3cd3fe` |

> **Nota:** `systemBlue` que ya usamos en la branch es `#007aff` (light) / `#0a84ff` (dark) — estos son los valores de iOS/iPadOS. Los de macOS HIG son ligeramente distintos. Ambos son válidos; el valor `#007aff` está más extendido en documentación web de Apple y es el que mantendré.

#### Escala de grises del sistema (iOS/iPadOS, macOS usa valores similares)

| Gray        | Light RGB   | Light Hex | Dark RGB    | Dark Hex  |
| ----------- | ----------- | --------- | ----------- | --------- |
| systemGray  | 142,142,147 | `#8e8e93` | 142,142,147 | `#8e8e93` |
| systemGray2 | 174,174,178 | `#aeaeb2` | 99,99,102   | `#636366` |
| systemGray3 | 199,199,204 | `#c7c7cc` | 72,72,74    | `#48484a` |
| systemGray4 | 209,209,214 | `#d1d1d6` | 58,58,60    | `#3a3a3c` |
| systemGray5 | 229,229,234 | `#e5e5ea` | 44,44,46    | `#2c2c2e` |
| systemGray6 | 242,242,247 | `#f2f2f7` | 28,28,30    | `#1c1c1e` |

#### Colores semánticos de macOS (NSColor)

| Semantic Color                 | Light Value                      | Dark Value                          | Uso                               |
| ------------------------------ | -------------------------------- | ----------------------------------- | --------------------------------- |
| labelColor                     | `#000000d9` (rgba 0,0,0,0.85)    | `#ffffffd9` (rgba 255,255,255,0.85) | Texto primario                    |
| secondaryLabelColor            | `#3c3c4399` (rgba 60,60,67,0.6)  | `#ebebf599` (rgba 235,235,245,0.6)  | Texto secundario                  |
| tertiaryLabelColor             | `#3c3c434d` (rgba 60,60,67,0.3)  | `#ebebf54d` (rgba 235,235,245,0.3)  | Texto terciario                   |
| separatorColor                 | `#3c3c434a` (rgba 60,60,67,0.29) | `#545458a6` (rgba 84,84,88,0.65)    | Separadores/bordes                |
| windowBackgroundColor          | `#ececec`                        | `#1e1e1e`                           | Fondo de ventana                  |
| controlBackgroundColor         | `#ffffff`                        | `#1e1e1e`                           | Fondo de controles (input, etc.)  |
| selectedContentBackgroundColor | `#0063e1`                        | `#0058d0`                           | Fila seleccionada                 |
| controlAccentColor             | `#007aff`                        | `#0a84ff`                           | Accent del sistema (configurable) |
| linkColor                      | `#0068da`                        | `#419cff`                           | Links                             |

### A5. Dimensiones de controles nativos macOS

| Control                  | Regular | Small   | Mini    |
| ------------------------ | ------- | ------- | ------- |
| Push button height       | 22pt    | 19pt    | 16pt    |
| Text field height        | 22pt    | 19pt    | 16pt    |
| Checkbox size            | 14×14pt | 12×12pt | 10×10pt |
| Radio button size        | 16×16pt | 14×14pt | 12×12pt |
| Switch width × height    | 38×22pt | 32×18pt | —       |
| Segmented control height | 24pt    | 20pt    | 16pt    |
| Pop-up button height     | 22pt    | 19pt    | 16pt    |

### A6. Border radius nativos macOS

| Elemento                  | Radius                         |
| ------------------------- | ------------------------------ |
| Window (NSWindow)         | 10pt                           |
| Push button               | 5pt                            |
| Text field                | 5pt                            |
| Checkbox (rounded square) | 3pt                            |
| Segmented control         | 5pt (individual), ~7pt (track) |
| Alert/Sheet               | 12pt                           |
| Menu/Popover              | 6pt                            |
| Tooltip                   | 4pt                            |
| Pill shape (tags, badges) | 999pt (full round)             |

### A7. Sombras macOS Sonoma

| Tipo                  | CSS box-shadow                                                                    |
| --------------------- | --------------------------------------------------------------------------------- |
| Window shadow (light) | `0 10px 40px rgba(0,0,0,0.12), 0 2px 10px rgba(0,0,0,0.08)`                       |
| Window shadow (dark)  | `0 10px 40px rgba(0,0,0,0.45), 0 2px 10px rgba(0,0,0,0.3)`                        |
| Card/popover (light)  | `0 1px 4px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)`                         |
| Card/popover (dark)   | `0 1px 4px rgba(0,0,0,0.2), 0 4px 16px rgba(0,0,0,0.25)`                          |
| Button pressed        | `inset 0 1px 2px rgba(0,0,0,0.1)`                                                 |
| Focus ring            | `0 0 0 3px rgba(0,122,255,0.5)` (light) / `0 0 0 3px rgba(10,132,255,0.5)` (dark) |

### A8. Materials (Vibrancy / Blur)

| Material    | Light                                            | Dark                                          |
| ----------- | ------------------------------------------------ | --------------------------------------------- |
| Sidebar     | `rgba(246,246,248,0.82)` + `backdrop-blur(20px)` | `rgba(28,28,30,0.85)` + `backdrop-blur(20px)` |
| Toolbar     | `rgba(255,255,255,0.72)` + `backdrop-blur(16px)` | `rgba(40,40,42,0.8)` + `backdrop-blur(16px)`  |
| Popover     | `rgba(255,255,255,0.9)` + `backdrop-blur(24px)`  | `rgba(44,44,46,0.92)` + `backdrop-blur(24px)` |
| Sheet/Modal | `rgba(255,255,255,0.94)` + `backdrop-blur(30px)` | `rgba(44,44,46,0.96)` + `backdrop-blur(30px)` |
| Overlay dim | `rgba(0,0,0,0.4)`                                | `rgba(0,0,0,0.6)`                             |

### A9. Traffic light buttons

| Botón                | Color     | Hover           |
| -------------------- | --------- | --------------- |
| Close (×)            | `#ff5f57` | brightness(90%) |
| Minimize (−)         | `#febc2e` | brightness(90%) |
| Maximize (+)         | `#28c840` | brightness(90%) |
| Inactive (unfocused) | `#dcdcdc` | —               |

### A10. Spacing & Layout

| Elemento                    | Valor   |
| --------------------------- | ------- |
| Grid base                   | 8pt     |
| Sidebar width (default)     | 220pt   |
| Sidebar row height (medium) | 24pt    |
| Sidebar icon size (medium)  | 18×18pt |
| Toolbar height (unified)    | 52pt    |
| Title bar height (standard) | 28pt    |
| Content padding (standard)  | 20pt    |
| Section spacing             | 24pt    |
| Group spacing               | 12pt    |
| Inline item spacing         | 8pt     |
| Minimum hit target          | 44×44pt |

### A11. Animaciones y transiciones

| Propiedad           | Valor                            | Nota                             |
| ------------------- | -------------------------------- | -------------------------------- |
| Default duration    | 250ms                            | Estándar Apple                   |
| Fast interaction    | 150ms                            | Hover, press                     |
| Slow/prominent      | 350ms                            | Modal appear/dismiss             |
| Easing (default)    | `cubic-bezier(0.2, 0, 0, 1)`     | Apple spring-like curve          |
| Easing (decelerate) | `ease-out`                       | Menu open, dropdown              |
| Easing (accelerate) | `ease-in`                        | Element dismiss                  |
| Reduced motion      | Durations → 0ms, cross-fade only | `prefers-reduced-motion: reduce` |
