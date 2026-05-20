# Spec 04 — macOS Tahoe 26 Liquid Glass Design System

**Fecha:** 2026-05-11
**Version:** 1.1
**Estado:** Propuesto
**Branch:** `feat/macos-design-system`
**Dependencias:** Spec 03 — macOS Sonoma 14 Design System

## Resumen

Actualizar el theme macOS de `tucu-ui` para que represente macOS Tahoe 26, cuyo lenguaje visual se basa en Liquid Glass, mayor redondeo, capas translucidas adaptativas, iconografia renovada, sidebars/toolbars con profundidad y una separacion mas clara entre contenido y controles.

La Spec 03 define una base Sonoma. Esta spec reemplaza el objetivo visual por Tahoe 26 y agrega el inventario completo de componentes basicos y avanzados que un agente debe desarrollar o adaptar para conseguir una experiencia macOS moderna, coherente y accesible dentro de `@e-burgos/tucu-ui`.

## Diferencias frente a Spec 03 / Sonoma

Esta spec no es una continuacion estetica menor de Sonoma. Tahoe cambia la prioridad visual del theme macOS y por eso debe tratarse como un nuevo objetivo de diseno sobre el mismo contrato tecnico.

| Area                | Spec 03 — Sonoma                                                              | Spec 04 — Tahoe / Liquid Glass                                                                             | Implicacion para Tucu UI                                                                       |
| ------------------- | ----------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Objetivo visual     | Vibrancy/blur estilo Sonoma, radios contenidos y superficies sobrias.         | Liquid Glass como material dinamico, radios mas generosos y capas funcionales translucidas.                | Recalibrar tokens `html.macos` en vez de crear un theme paralelo.                              |
| Uso de materiales   | Blur/vibrancy principalmente en sidebar, toolbar, popover y sheet.            | Liquid Glass `regular`, `clear` y `prominent`, con scroll edge, highlights, sombras y adaptividad.         | Agregar tokens/materiales especificos, con fallback opaco para reduced transparency.           |
| Contenido           | Cards y panels pueden parecer superficies elevadas tradicionales.             | El contenido debe liderar y evitar glass decorativo; el vidrio pertenece a navegacion/controles flotantes. | Tablas, formularios, cards de datos y lectura usan material estandar o fondo solido.           |
| Forma y profundidad | Ventanas alrededor de 10px, cards/inputs 6-8px.                               | Formas mas redondeadas, concentricas y con profundidad de capa.                                            | Aumentar radios de ventanas, sheets, popovers y controles sin romper densidad desktop.         |
| Toolbar/sidebar     | Layout macOS clasico con toolbar superior y source list.                      | Toolbars/sidebars mas translucidas, flotantes o extendidas sobre contenido con legibilidad protegida.      | Implementar background extension, scroll edge y estados active/inactive.                       |
| Iconografia         | Iconos compatibles con estilo macOS clasico.                                  | Iconos claros/oscuros/tintados y app icons por capas segun Tahoe.                                          | Usar `LucideIcons` como aproximacion web y documentar equivalencias a SF Symbols.              |
| Tipografia/fuentes  | Spec 03 proponia SF Pro via archivos `.woff2`.                                | Usar stack del sistema y no redistribuir SF Pro sin aprobacion legal.                                      | Mantener fallback seguro `-apple-system`/SF local; no bundlear fuentes propietarias.           |
| Accesibilidad       | Light/dark, reduced motion y focus ring.                                      | Suma increased contrast y reduced transparency como requisitos de primer nivel.                            | Los tokens deben variar por modo y media queries; ningun estado depende solo de transparencia. |
| Alcance             | Transformar componentes existentes y mantener 8 componentes macOS exclusivos. | Transformar el theme macOS y definir inventario basico/avanzado Tahoe para futuras fases.                  | Distinguir componentes existentes a adaptar de candidatos nuevos antes de implementar.         |

Tahoe reemplaza el destino visual de `colorScheme: 'macos'`. Si una implementacion decide exponer una variante de layout temporal para comparar Sonoma/Tahoe, debe documentarla como compatibilidad de layout y no como nuevo theme publico `macosTahoe` salvo aprobacion explicita.

## Fuentes oficiales consultadas

| Fuente                                     | URL                                                                                 | Uso en esta spec                                                                                                              |
| ------------------------------------------ | ----------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| Apple — macOS Tahoe                        | https://www.apple.com/macos/                                                        | Rasgos publicos de Tahoe: Liquid Glass, menu bar transparente, iconos claros/oscuros/tintados, sidebars/toolbars refrescados. |
| Apple Developer — Adopting Liquid Glass    | https://developer.apple.com/documentation/TechnologyOverviews/adopting-liquid-glass | Reglas tecnicas para Liquid Glass, controles, navegacion, ventanas, modales, layout, search, accesibilidad y performance.     |
| HIG — Designing for macOS                  | https://developer.apple.com/design/human-interface-guidelines/designing-for-macos   | Patrones macOS: pantallas grandes, ventanas redimensionables, menu bar, teclado, precision del puntero.                       |
| HIG — Materials                            | https://developer.apple.com/design/human-interface-guidelines/materials             | Liquid Glass regular/clear, materiales estandar, vibrancy y jerarquia de capas.                                               |
| HIG — Color                                | https://developer.apple.com/design/human-interface-guidelines/color                 | Colores dinamicos, Liquid Glass color, light/dark/increased contrast, system colors.                                          |
| HIG — Typography                           | https://developer.apple.com/design/human-interface-guidelines/typography            | SF Pro, estilos tipograficos macOS, tamanos minimos y tracking.                                                               |
| Apple Fonts                                | https://developer.apple.com/fonts/                                                  | Familia SF Pro, SF Mono, New York y restricciones de fuente.                                                                  |
| HIG — Buttons                              | https://developer.apple.com/design/human-interface-guidelines/buttons               | Push buttons, square buttons, help buttons, image buttons, roles y estados.                                                   |
| HIG — Toolbars                             | https://developer.apple.com/design/human-interface-guidelines/toolbars              | Toolbar Liquid Glass, agrupacion, iconos, search, titulos y acciones prominentes.                                             |
| HIG — Sidebars                             | https://developer.apple.com/design/human-interface-guidelines/sidebars              | Sidebar flotante, contenido extendido debajo, jerarquia, row sizes y accent color.                                            |
| HIG — Windows                              | https://developer.apple.com/design/human-interface-guidelines/windows               | Estados main/key/inactive, anatomia de ventana, redimensionamiento y modales.                                                 |
| HIG — The menu bar                         | https://developer.apple.com/design/human-interface-guidelines/the-menu-bar          | Orden de menus macOS, menu bar extras, comandos y shortcuts.                                                                  |
| HIG — Menus                                | https://developer.apple.com/design/human-interface-guidelines/menus                 | Labels, iconos, submenus, items toggled y organizacion.                                                                       |
| HIG — Search fields                        | https://developer.apple.com/design/human-interface-guidelines/search-fields         | Search en toolbar/sidebar, scope controls, tokens y sugerencias.                                                              |
| HIG — Text fields                          | https://developer.apple.com/design/human-interface-guidelines/text-fields           | Text fields, secure fields, validacion, combo boxes.                                                                          |
| HIG — Toggles                              | https://developer.apple.com/design/human-interface-guidelines/toggles               | Switches, checkboxes, radios y jerarquia de settings.                                                                         |
| HIG — Segmented controls                   | https://developer.apple.com/design/human-interface-guidelines/segmented-controls    | Single/multiple choice, uso en toolbar/inspector y limite de segmentos.                                                       |
| HIG — Sliders                              | https://developer.apple.com/design/human-interface-guidelines/sliders               | Linear/circular sliders, ticks, labels, live feedback.                                                                        |
| Apple Developer — What's New               | https://developer.apple.com/design/whats-new/                                       | macOS 26 UI Kit, Liquid Glass materials, updated colors, app icons y componentes.                                             |
| WWDC25 — Meet Liquid Glass                 | https://developer.apple.com/videos/play/wwdc2025/219                                | Principios, dinamica, adaptividad y ubicacion correcta de Liquid Glass.                                                       |
| WWDC25 — Get to know the new design system | https://developer.apple.com/videos/play/wwdc2025/356                                | Cambios de lenguaje visual, estructura, continuidad y componentes del sistema.                                                |

## Principios de diseno Tahoe

| Principio                          | Regla para tucu-ui                                                                                                                               |
| ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| Liquid Glass es una capa funcional | Usarlo para navegacion, barras, controles flotantes, popovers, sheets y menus; no convertir todo el contenido en vidrio.                         |
| El contenido lidera                | Cards, tablas, formularios y vistas de contenido deben permanecer legibles y con materiales estandar, no competir visualmente con los controles. |
| Jerarquia clara                    | Separar capa de contenido, capa organizacional y capa funcional con tokens distintos de fondo, blur, borde y sombra.                             |
| Formas concentricas                | Controles, barras y contenedores deben usar radios coherentes con el contenedor padre. Evitar radios aleatorios.                                 |
| Adaptividad                        | El vidrio debe responder a light/dark, increased contrast, reduced transparency, reduced motion, contenido debajo y estado hover/focus.          |
| Color con moderacion               | Reservar color de Liquid Glass para acciones primarias, seleccion, estado o feedback. No tintar todos los controles.                             |
| Familiaridad Mac                   | Mantener ventanas redimensionables, toolbar superior, sidebar leading, menu bar, tooltips, keyboard shortcuts y densidad de escritorio.          |
| Accesibilidad primero              | Nunca depender solo de color/transparencia/movimiento; cada icon button requiere `aria-label` o tooltip.                                         |

## Compatibilidad con Tucu UI

### Decisiones base

- Mantener el mecanismo actual `useTheme().colorScheme === 'macos'` y la clase `html.macos` para no romper la API publica.
- Tahoe debe ser el objetivo visual por defecto del theme macOS. La palabra Sonoma queda solo como antecedente historico de Spec 03.
- No crear wrappers duplicados de todos los componentes. Usar CSS tokens y overrides por `html.macos` + atributos estables `data-tucu`.
- No modificar las props publicas de componentes existentes salvo que una fase posterior lo apruebe explicitamente.
- Los componentes exclusivos macOS (`MacOSWindow`, `MacOSSidebar`, `MacOSToolbar`, etc.) deben evolucionar a Tahoe sin duplicar nombres como `TahoeWindow`.
- Evitar hardcodear colores Apple como unica fuente de verdad. Usar tokens semanticos y valores de referencia adaptables.

### Cobertura transversal del restyling

Cuando se selecciona `colorScheme: 'macos'`, `LAYOUT_OPTIONS.MACOS` o `applyMacOSTheme()`, todo componente visible de Tucu UI debe adoptar el lenguaje Tahoe si aparece en una pantalla, demo o documentacion. El alcance incluye componentes basicos, forms, navegacion, overlays/dialogs, feedback, data display, charts y componentes blockchain/demo-specific cuando esten exportados o documentados.

El restyling debe resolverse con tokens CSS, clases acotadas a `html.macos`, atributos estables `data-tucu` y reglas de tema/layout. No se deben duplicar APIs publicas, crear variantes incompatibles ni reemplazar componentes existentes por wrappers Tahoe paralelos salvo aprobacion explicita. Si un componente necesita selectores mas estables para tematizarse, la implementacion puede agregar `data-tucu` o clases internas sin cambiar props publicas.

Charts deben consumir tokens del theme y wrappers Tucu UI; componentes blockchain/demo-specific deben reinterpretar sus superficies, badges, iconos y estados con el mismo sistema visual. El objetivo es que una pantalla mixta no tenga piezas visualmente Default dentro del layout Tahoe.

### Contratos de arquitectura Tucu UI

- `ThemeProvider` sigue siendo el punto de entrada para standalone y MFE. La spec no cambia los contratos `menuItems`, `appRoutesConfig`, `basePath`, `isAuthenticated` ni `loginUrl`.
- `useTheme()` sigue siendo la fuente de verdad runtime: `mode`, `colorScheme`, `layout`, presets y acciones como `applyMacOSTheme()`/`applyDefaultTheme()`.
- `applyMacOSTheme()` debe activar el theme macOS y un layout macOS coherente; `applyDefaultTheme()` debe restaurar el layout default sin dejar clases `html.macos` residuales.
- La clase `html.macos` activa los overrides visuales. Si existe una clase auxiliar para Tahoe, debe ser complementaria y acotada, no reemplazar `html.macos`.
- El styling debe seguir Tailwind CSS v4 con CSS puro importado por `@import`; no se agregan Sass, CSS-in-JS ni dependencias visuales nuevas para resolver Liquid Glass.
- Los componentes publicos se importan desde `@e-burgos/tucu-ui`; no se documentan imports desde rutas internas en ejemplos o demos.
- En routing o demos, usar el namespace `ReactRouter` exportado por Tucu UI cuando haga falta navegar; no importar directo desde `react-router-dom`.
- Forms deben apoyarse en `Form`, `useFormContext` y los inputs existentes (`Input`, `Select`, `InputSearcher`, `Checkbox`, etc.) antes de crear controles duplicados.
- Charts deben usar wrappers Tucu UI (`LineChart`, `BarChart`, `ChartContainer`, `ChartTooltip`, `ChartEmptyState`) y adaptar su tema via tokens, no con Recharts crudo en demos del design system.
- Si se agregan componentes publicos nuevos, se debe actualizar el barrel export, regenerar props metadata y sincronizar docs con `tucu-ui-docs-sync`.

### Coexistencia Layout existente y Shell macOS

Tucu UI tiene layouts propios (`RootLayout`, `AdminLayout`, `CleanLayout`, `HorizontalLayout`) con headers (`Header`, `AdminHeader`, `HorizontalHeader`), menus (`CollapsibleMenu`, `ExpandableSidebar`, `HorizontalNavMenu`) y areas auxiliares (`AdminRightArea`, `HorizontalRightArea`). Al activar `colorScheme: 'macos'`, el sistema debe resolver como conviven con el shell macOS:

| Layout/componente existente                   | Comportamiento en `colorScheme: 'macos'`                                                                     |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `RootLayout`                                  | Sigue siendo el wrapper raiz; aplica `html.macos` y fondo espacial Tahoe si corresponde.                     |
| `AdminLayout`                                 | Se adapta visualmente: el sidebar se restylea como source list Tahoe, el header como toolbar Tahoe.          |
| `CleanLayout`                                 | Layout sin sidebar/header; aplica tokens Tahoe a fondos y tipografia.                                        |
| `HorizontalLayout`                            | Se adapta: la nav horizontal hereda glass regular; no se reemplaza por sidebar.                              |
| `Header` / `AdminHeader` / `HorizontalHeader` | Se restylean con Liquid Glass regular, toolbar height Tahoe y slots compatibles con `MacOSToolbar`.          |
| `CollapsibleMenu` / `ExpandableSidebar`       | Se restylean como source list Tahoe con row states, badges y secciones. No se reemplazan por `MacOSSidebar`. |
| `HorizontalNavMenu`                           | Hereda glass regular y estilos de menu bar Tahoe en modo macOS.                                              |
| `SidebarMenu`                                 | Se restylea como sidebar Tahoe con disclosure y secciones.                                                   |
| `AdminRightArea` / `HorizontalRightArea`      | Se restylean con tokens de controles Tahoe y densidad de escritorio.                                         |
| `MenuItem`                                    | Hereda estados hover/pressed/selected Tahoe y tipografia del menu.                                           |

Reglas:

- `LAYOUT_OPTIONS.MACOS` activa tanto el `colorScheme: 'macos'` como un layout coherente. La implementacion debe definir si MACOS usa `AdminLayout` restyleado o un layout exclusivo con `MacOSWindow` + `MacOSToolbar` + `MacOSSidebar`.
- Los layouts existentes NO se reemplazan ni duplican; se restylean via CSS tokens + `html.macos`. Los componentes macOS exclusivos (`MacOSWindow`, `MacOSSidebar`, `MacOSToolbar`) pueden usarse como alternativa de layout avanzada pero no son obligatorios para el restyling basico.
- `applyMacOSTheme()` activa el theme y opcionalmente cambia al layout macOS coherente; `applyDefaultTheme()` restaura layout y limpia `html.macos`.

### Transicion entre themes

Cuando el usuario cambia entre Default y macOS en runtime:

- La transicion debe ser inmediata (no animada) por defecto para evitar artefactos de layout shift.
- `applyMacOSTheme()` agrega `html.macos`, aplica tokens y cambia layout; `applyDefaultTheme()` revierte todo sin dejar clases residuales.
- Si una implementacion futura quiere animacion suave, debe usar `view-transition-name` o `@starting-style` CSS, nunca JavaScript timers.
- El cambio de theme no debe causar re-mount de componentes; solo re-render de estilos via CSS custom properties.

### Adaptacion de hooks y utilities

| Hook / Utility    | Adaptacion en macOS                                                                                        |
| ----------------- | ---------------------------------------------------------------------------------------------------------- |
| `useChartTheme`   | Debe consumir tokens macOS automaticamente cuando `colorScheme === 'macos'`. Ver seccion Tokens de Charts. |
| `useBreakpoint`   | No cambia; los breakpoints responsive se mantienen iguales.                                                |
| `useThemeColor`   | Debe resolver colores via tokens macOS cuando el theme esta activo.                                        |
| `useGridSwitcher` | Se mantiene funcional; el grid layout sigue siendo valido en macOS.                                        |
| `useDirection`    | Sin cambios; macOS soporta LTR y RTL.                                                                      |
| `useToastStore`   | Sin cambios en API; el componente `Toast` se restylea via CSS.                                             |

### Performance de `backdrop-filter`

`backdrop-filter` es costoso en web (GPU compositing, repaints en cada frame de scroll). Reglas obligatorias:

- No anidar mas de 2 capas de `backdrop-filter` simultaneas en el viewport visible.
- Elementos con `backdrop-filter` deben tener `will-change: transform` o `contain: paint` para aislar la composicion.
- Usar `@supports (backdrop-filter: blur(1px))` con fallback opaco para browsers sin soporte o GPU debil.
- En `prefers-reduced-transparency: reduce`, eliminar `backdrop-filter` y usar fondo opaco tokenizado.
- En `prefers-reduced-motion: reduce`, mantener `backdrop-filter` estatico pero eliminar transiciones de blur.
- No aplicar `backdrop-filter` a listas largas, tablas con muchas rows ni componentes que se renderizan en loop. Solo en barras, popovers, sheets y controles flotantes de capa unica.
- Medir FPS en Chrome DevTools con Layout Shift y Paint Flashing antes de agregar blur a un nuevo componente.

### Estrategia de fuentes

#### Restriccion legal: SF Pro NO es redistribuible

La licencia de Apple es explicita:

> "THE APPLE SAN FRANCISCO FONT IS TO BE USED SOLELY FOR CREATING MOCK-UPS OF USER INTERFACES TO BE USED IN SOFTWARE PRODUCTS RUNNING ON APPLE'S iOS, OS X OR tvOS OPERATING SYSTEMS"
> "You may not embed the Apple Font in any software programs or other products"

Esto significa que **no podemos**: embeber `.woff2`, incluirla en el bundle, ni referenciarla via CDN propio.

#### Solucion: Inter como fuente primaria del theme macOS

**Inter** (por Rasmus Andersson) es la fuente libre elegida para el theme macOS:

| Caracteristica    | Inter                                            | SF Pro                           |
| ----------------- | ------------------------------------------------ | -------------------------------- |
| Licencia          | SIL Open Font License 1.1 (libre redistribucion) | Propietaria Apple (solo mockups) |
| Pesos             | 9 (100-900)                                      | 9 (Ultralight-Black)             |
| Variable font     | Si (wght + opsz)                                 | Si                               |
| Optical sizes     | 14pt-32pt (text → display)                       | Text / Display                   |
| x-height          | Alta (1118 UPM @ opsz=14)                        | Alta                             |
| Disenada para     | Pantallas, UI, legibilidad                       | Pantallas Apple                  |
| Tabular numbers   | Si (tnum)                                        | Si                               |
| Idiomas           | 147                                              | ~100                             |
| OpenType features | Contextual alternates, slashed zero, fracs       | Similares                        |

**Justificacion**: Inter tiene metricas muy similares a SF Pro (x-height alta, diseno geometrico-grotesque hibrido, optimizada para 13-16px), es la fuente UI libre mas usada del mundo (GitHub, Mozilla, Figma), y su licencia SIL OFL permite redistribucion completa.

**Para monospace**: JetBrains Mono (SIL OFL, ligatures, 8 pesos, disenada para codigo).

#### Font stack con fallback inteligente

```css
/* @font-face: Inter se bundlea con el theme */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 100 900;
  font-display: swap;
  src: url('./fonts/Inter-Variable.woff2') format('woff2-variations');
  font-variation-settings: 'opsz' 16;
}

@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 100 800;
  font-display: swap;
  src: url('./fonts/JetBrainsMono-Variable.woff2') format('woff2-variations');
}

html.macos {
  /* En macOS real: -apple-system resuelve a SF Pro automaticamente.
     En otros OS: Inter se carga del bundle.
     Resultado: aspecto macOS-autentico en TODAS las plataformas. */
  --macos-font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
  --macos-font-display: 'Inter', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Arial, sans-serif;
  --macos-font-mono: 'JetBrains Mono', 'SF Mono', SFMono-Regular, ui-monospace, Menlo, Monaco, Consolas, monospace;

  /* Optical sizing automatico */
  font-optical-sizing: auto;

  /* Features tipograficas macOS-like */
  font-feature-settings: 'liga' 1, 'calt' 1, 'kern' 1;
}
```

#### Estructura de archivos de fuentes

```txt
ui/tucu-ui/src/assets/fonts/
  Inter-Variable.woff2           # ~300KB, cubre todos los pesos + italica
  JetBrainsMono-Variable.woff2   # ~150KB, monospace con ligatures
```

#### Reglas de implementacion

1. **Inter se bundlea** dentro del paquete CSS del theme macOS (SIL OFL lo permite)
2. **En macOS nativo** el browser prioriza `-apple-system` → SF Pro se usa si esta disponible
3. **En Windows/Linux** Inter se carga del bundle → aspecto consistente macOS-like
4. **Subset opcional**: si el bundle size es critico, crear subset Latin (reduce a ~90KB)
5. **font-display: swap** para evitar FOIT (flash of invisible text)
6. **No usar CDN externo** (Google Fonts) — self-hosted para independencia y privacidad

## Arquitectura propuesta

```txt
ui/tucu-ui/src/assets/css/macos/
  index.css
  macos-foundations.css          # tokens Tahoe globales
  macos-backgrounds.css          # fondos espaciales originales y wallpaper-like surfaces
  macos-liquid-glass.css         # materiales, glass layers, scroll edge
  macos-typography.css           # text styles macOS y ajustes de tracking
  macos-window.css               # window, titlebar, traffic lights, status bar
  macos-toolbar.css              # toolbar, toolbar groups, icon buttons, search slot
  macos-sidebar.css              # source list, sections, row states, badges
  macos-buttons.css              # push, prominent, ghost, square, help, icon
  macos-inputs.css               # fields, select/combo, search, token, textarea
  macos-selection.css            # checkbox, radio, switch, segmented, slider, stepper
  macos-menus.css                # menu bar, menus, pop-up, pull-down, context menu
  macos-layouts.css              # split view, inspector, forms, lists, tables
  macos-presentation.css         # sheets, popovers, alerts, panels, dialogs
  macos-feedback.css             # progress, badges, notifications, empty states
  macos-widgets.css              # widgets, live activity chip, app icon previews
```

`globals.css` importa `./macos/index.css` al final. Cada archivo debe estar acotado a `html.macos`.

## Tokens fundacionales

### Tipografia macOS

| Text style  | Weight | Size | Line height | Emphasized |
| ----------- | ------ | ---: | ----------: | ---------- |
| Large Title | 400    | 26px |        32px | 700        |
| Title 1     | 400    | 22px |        26px | 700        |
| Title 2     | 400    | 17px |        22px | 700        |
| Title 3     | 400    | 15px |        20px | 600        |
| Headline    | 700    | 13px |        16px | 800        |
| Body        | 400    | 13px |        16px | 600        |
| Callout     | 400    | 12px |        15px | 600        |
| Subheadline | 400    | 11px |        14px | 600        |
| Footnote    | 400    | 10px |        13px | 600        |
| Caption 1   | 400    | 10px |        13px | 500        |
| Caption 2   | 500    | 10px |        13px | 600        |

Reglas:

- El tamano base de UI macOS es 13px. El minimo legible es 10px.
- Usar `font-size` fijo por token, no escalado por viewport.
- Usar `letter-spacing: 0` por defecto; aplicar tracking negativo/positivo solo si el token tipografico lo requiere.
- Evitar pesos `300` o inferiores. Priorizar 400, 500, 600 y 700.
- Headings compactos en paneles y sidebars no deben usar hero type.

### Tracking de referencia

| Size | Tracking CSS recomendado |
| ---: | -----------------------: |
| 10px |                   0.12px |
| 11px |                   0.06px |
| 12px |                        0 |
| 13px |                  -0.08px |
| 15px |                  -0.23px |
| 17px |                  -0.43px |
| 22px |                  -0.26px |
| 26px |                   0.22px |

### Colores de sistema

Los valores siguientes son referencias oficiales de Apple HIG para system colors. Deben exponerse como tokens y no usarse directamente en componentes.

| Color  | Light     | Dark      | Light increased contrast | Dark increased contrast |
| ------ | --------- | --------- | ------------------------ | ----------------------- |
| Red    | `#ff383c` | `#ff4245` | `#e9152d`                | `#ff6165`               |
| Orange | `#ff8d28` | `#ff9230` | `#c55300`                | `#ffa056`               |
| Yellow | `#ffcc00` | `#ffd600` | `#a16a00`                | `#fedf43`               |
| Green  | `#34c759` | `#30d158` | `#008932`                | `#4ad968`               |
| Mint   | `#00c8b3` | `#00dac3` | `#008575`                | `#54dfcb`               |
| Teal   | `#00c3d0` | `#00d2e0` | `#008198`                | `#3bddec`               |
| Cyan   | `#00c0e8` | `#3cd3fe` | `#007eae`                | `#6dd9ff`               |
| Blue   | `#0088ff` | `#0091ff` | `#1e6ef4`                | `#5cb8ff`               |
| Indigo | `#6155f5` | `#6d7cff` | `#564ade`                | `#a7aaff`               |
| Purple | `#cb30e0` | `#db34f2` | `#b02fc2`                | `#ea8dff`               |
| Pink   | `#ff2d55` | `#ff375f` | `#e7124d`                | `#ff8ac4`               |
| Brown  | `#ac7f5e` | `#b78a66` | `#956d51`                | `#dba679`               |

### Tokens semanticos requeridos

| Token                       | Light                   | Dark                    | Uso                                   |
| --------------------------- | ----------------------- | ----------------------- | ------------------------------------- |
| `--macos-label`             | `rgba(0,0,0,.88)`       | `rgba(255,255,255,.92)` | Texto primario                        |
| `--macos-secondary-label`   | `rgba(60,60,67,.68)`    | `rgba(235,235,245,.72)` | Texto secundario                      |
| `--macos-tertiary-label`    | `rgba(60,60,67,.42)`    | `rgba(235,235,245,.44)` | Metadatos, placeholders debiles       |
| `--macos-quaternary-label`  | `rgba(60,60,67,.24)`    | `rgba(235,235,245,.26)` | Texto decorativo o disabled adicional |
| `--macos-separator`         | `rgba(60,60,67,.24)`    | `rgba(84,84,88,.60)`    | Separadores visibles                  |
| `--macos-opaque-separator`  | `#c6c6c8`               | `#38383a`               | Separadores opacos                    |
| `--macos-window-bg`         | `#f5f5f7`               | `#1e1e20`               | Fondo de ventana                      |
| `--macos-content-bg`        | `#ffffff`               | `#151516`               | Contenido principal                   |
| `--macos-grouped-bg`        | `#f2f2f7`               | `#1c1c1e`               | Formularios/listas agrupadas          |
| `--macos-control-bg`        | `rgba(255,255,255,.72)` | `rgba(255,255,255,.10)` | Controles estandar                    |
| `--macos-control-bg-hover`  | `rgba(255,255,255,.86)` | `rgba(255,255,255,.16)` | Hover de controles                    |
| `--macos-control-bg-active` | `rgba(0,0,0,.06)`       | `rgba(255,255,255,.22)` | Pressed/selected base                 |
| `--macos-accent`            | `#0088ff`               | `#0091ff`               | Accent color por defecto              |
| `--macos-focus-ring`        | `rgba(0,136,255,.48)`   | `rgba(0,145,255,.56)`   | Focus visible                         |

Los valores semanticos deben validarse contra el macOS 26 UI Kit de Apple Design Resources antes de cerrar implementacion final.

### Materiales Liquid Glass

| Token                        | Intencion                            | CSS base esperado                                                 |
| ---------------------------- | ------------------------------------ | ----------------------------------------------------------------- |
| `--macos-glass-regular-bg`   | Barras, sidebars, popovers con texto | Fondo translucid plus `backdrop-filter: blur(28px) saturate(1.8)` |
| `--macos-glass-clear-bg`     | Controles sobre media/imagenes       | Fondo muy translucido plus blur menor y borde luminoso            |
| `--macos-glass-prominent-bg` | Accion primaria                      | Accent tint aplicado al fondo, label blanco o alto contraste      |
| `--macos-glass-border`       | Separacion optica                    | Borde 0.5px/1px con alpha adaptable                               |
| `--macos-glass-highlight`    | Bisel/reflejo superior               | Inset shadow claro en top/left                                    |
| `--macos-glass-shadow`       | Elevacion flotante                   | Sombra difusa multicapa, mas profunda en dark                     |
| `--macos-scroll-edge`        | Legibilidad al scroll                | Gradiente/blur que oscurece o aclara contenido bajo barras        |

Reglas:

- `regular` para toolbars, sidebars, popovers, alerts y componentes con texto.
- `clear` solo sobre fondos visualmente ricos donde se quiere ver el contenido debajo.
- Si `clear` queda sobre contenido brillante, agregar dim layer oscuro de 35% como recomienda Apple.
- No anidar Liquid Glass dentro de Liquid Glass salvo grupos de toolbar controlados.
- Con `prefers-reduced-transparency` o modo high contrast, aumentar opacidad y reducir blur.

### Fondos espaciales Tahoe

Tahoe puede usar fondos espaciales, aurora, halos, profundidad, blur y capas glass para reforzar la sensacion de sistema operativo moderno, pero la libreria no debe incluir, copiar ni derivar assets propietarios de Apple: wallpapers, screenshots, iconos, SF Symbols, imagenes promocionales o recursos del UI Kit. La alternativa implementable es crear fondos originales del proyecto mediante gradientes CSS, assets propios, imagenes generadas internamente o bitmaps optimizados que solo esten inspirados en el lenguaje visual general de Tahoe.

| Token / variante            | Light sugerido                                                      | Dark sugerido                                                       | Uso                                                                |
| --------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------- | ------------------------------------------------------------------ |
| `--macos-spatial-bg`        | Aurora suave azul/cyan con halo blanco y profundidad gris luminosa  | Aurora azul/violeta con halo cyan tenue y profundidad navy/graphite | Fondo root/window detras de la app, no para controles individuales |
| `--macos-spatial-bg-muted`  | Version de baja saturacion para superficies de documentacion        | Version oscura de baja saturacion para demos tecnicos               | Hero/demo surface y previews largos                                |
| `--macos-wallpaper-overlay` | Capa blanca/translucida para sostener contraste sobre fondos claros | Capa negra/translucida para sostener contraste sobre fondos oscuros | Overlay global cuando hay texto o glass encima                     |
| `--macos-spatial-halo`      | Radial highlight amplio, sin blobs decorativos discretos            | Radial highlight frio y difuso, con alpha menor                     | Profundidad de wallpaper-like app background                       |
| `--macos-spatial-blur`      | Blur moderado solo en capas grandes                                 | Blur moderado/alto con saturacion controlada                        | Fondo o hero, nunca repetido dentro de cada componente             |
| `.macos-bg-spatial-aurora`  | Variante principal para light                                       | Variante principal para dark                                        | Root/window background                                             |
| `.macos-bg-spatial-depth`   | Fondo mas sobrio para apps de datos                                 | Fondo graphite profundo para apps de datos                          | Wallpaper-like app background                                      |
| `.macos-bg-spatial-demo`    | Fondo expresivo, limitado a hero o demo surface                     | Fondo expresivo dark, con dim layer por defecto                     | Documentacion, landing interna o showcase                          |

Reglas de uso:

- Aplicar estos fondos en root/window background, hero/demo surface o wallpaper-like app background. No deben colocarse dentro de todos los componentes, cards, tablas, botones ni formularios.
- Las superficies de contenido (`Card`, `BasicTable`, `Form`, panels de lectura) deben mantener fondo solido o material estandar para conservar legibilidad.
- Texto primario sobre fondos espaciales o glass debe mantener contraste AA. Si el fondo rompe contraste, agregar `--macos-wallpaper-overlay`, dim layer, scroll edge o aumentar opacidad del material.
- En `prefers-reduced-transparency: reduce`, `prefers-contrast: more` o modo high contrast, reemplazar el wallpaper translucid por un fondo opaco/tokenizado y reducir `backdrop-filter`.
- Evitar animaciones continuas, parallax costoso o filtros blur por componente. Preferir gradientes CSS estaticos, `image-set()` para bitmaps optimizados, compresion adecuada y una sola capa de blur de gran superficie.
- Demos y docs deben indicar que los assets espaciales son propios/generados internamente y no recursos Apple.

### Shape, spacing y elevacion

| Token                          | Valor inicial | Uso                           |
| ------------------------------ | ------------: | ----------------------------- |
| `--macos-radius-window`        |          18px | Ventanas y sheets grandes     |
| `--macos-radius-sheet`         |          24px | Half sheets, modal sheets     |
| `--macos-radius-popover`       |          16px | Popovers y menus flotantes    |
| `--macos-radius-control`       |          10px | Text fields, buttons, selects |
| `--macos-radius-small-control` |           8px | Mini buttons, segmented items |
| `--macos-radius-pill`          |         999px | Search, switches, chips       |
| `--macos-grid`                 |           8px | Base spacing                  |
| `--macos-toolbar-height`       |          52px | Toolbar desktop estandar      |
| `--macos-titlebar-height`      |          28px | Area de titulo/traffic lights |
| `--macos-sidebar-width`        |         240px | Sidebar mediana               |
| `--macos-inspector-width`      |         300px | Inspector trailing            |

Los radios son punto de partida web. La implementacion debe calibrarlos visualmente con el macOS 26 UI Kit; si el UI Kit contradice estos valores, gana el UI Kit.

## Inventario de componentes a desarrollar/adaptar

Este inventario mezcla tres tipos de trabajo y debe leerse con esa distincion:

- **Existente a adaptar:** componentes ya exportados por Tucu UI, por ejemplo `Button`, `Input`, `Select`, `BasicTable`, `Modal`, `Toast`, charts y los macOS actuales (`MacOSWindow`, `MacOSSidebar`, `MacOSToolbar`, `MacOSWidget`, `MacOSSegmentedControl`, `MacOSSearchBar`, `MacOSPopover`, `MacOSNotificationBanner`).
- **Primitiva CSS/conceptual:** tokens, materials, focus rings, separators y utilities que pueden vivir como CSS o helpers internos sin API publica nueva.
- **Candidato nuevo:** componentes Tahoe avanzados como `MacOSControlCenterPanel`, `MacOSCommandPalette` o `MacOSAppIconPreview`. No son obligatorios en la primera implementacion; requieren plan aprobado, exports y documentacion si se vuelven publicos.

La prioridad de implementacion debe favorecer primero el comportamiento transversal del theme macOS sobre los componentes existentes. Los candidatos avanzados no deben bloquear que `colorScheme: 'macos'` se vea Tahoe en la libreria actual.

### A. Foundations

| Componente                 | Tipo     | Requerimiento Tahoe                                                                     |
| -------------------------- | -------- | --------------------------------------------------------------------------------------- |
| `MacOSThemeTokens`         | Basico   | Tokens CSS para color, typography, shape, spacing, shadows, materials y states.         |
| `MacOSLiquidGlass`         | Basico   | Utility class/primitive para regular, clear y prominent glass.                          |
| `MacOSMaterial`            | Basico   | Standard material para contenido: ultra-thin, thin, regular, thick.                     |
| `MacOSFocusRing`           | Basico   | Focus visible azul, accesible y consistente en todos los controles.                     |
| `MacOSSeparator`           | Basico   | Hairline separators adaptativos para lists, menus, panels.                              |
| `MacOSScrollEdge`          | Avanzado | Blur/gradient para mantener legibilidad cuando contenido scrollea debajo de barras.     |
| `MacOSBackgroundExtension` | Avanzado | Efecto que extiende visualmente contenido debajo de sidebars/inspectors.                |
| `MacOSSpatialBackground`   | Basico   | Tokens/classes para fondos aurora/wallpaper originales, con light/dark y fallbacks.     |
| `MacOSTypography`          | Basico   | Clases/tokens para los 11 text styles macOS.                                            |
| `MacOSIcon`                | Basico   | Wrapper conceptual para iconos con sizing, stroke, optical alignment y label accesible. |

### B. Window, shell y layout estructural

| Componente                 | Tipo     | Requerimiento Tahoe                                                                    |
| -------------------------- | -------- | -------------------------------------------------------------------------------------- |
| `MacOSWindow`              | Basico   | Ventana redondeada, shadow multicapa, estados key/main/inactive, content body.         |
| `MacOSTitleBar`            | Basico   | Area superior con drag region, titulo opcional y slots.                                |
| `MacOSTrafficLights`       | Basico   | Close/minimize/zoom con estado active/inactive y hover glyphs.                         |
| `MacOSToolbar`             | Basico   | Liquid Glass, grupos leading/center/trailing, titulo, search slot y overflow.          |
| `MacOSToolbarGroup`        | Basico   | Agrupa items relacionados en una misma capsula/material. Maximo recomendado: 3 grupos. |
| `MacOSToolbarButton`       | Basico   | Icon-only por defecto, tooltip/aria-label obligatorio, hover/pressed/selected.         |
| `MacOSToolbarOverflowMenu` | Avanzado | Menu automatico para acciones que no caben en width reducido.                          |
| `MacOSSidebar`             | Basico   | Source list Liquid Glass, sections, disclosure, row states y badges.                   |
| `MacOSSidebarSection`      | Basico   | Header title-style, rows agrupadas, opcion collapsible.                                |
| `MacOSSidebarItem`         | Basico   | Icono accent-aware, selected state, badge/count, disabled.                             |
| `MacOSSplitView`           | Avanzado | Sidebar/content/inspector redimensionables con safe areas.                             |
| `MacOSInspector`           | Avanzado | Panel trailing para propiedades, usa regular glass/material y forms compactos.         |
| `MacOSStatusBar`           | Avanzado | Bottom bar de informacion minima; no ubicar acciones criticas.                         |
| `MacOSContentPane`         | Basico   | Area de contenido no glass, con scroll y safe area.                                    |
| `MacOSScrollView`          | Basico   | Scrollbar estilo overlay, scroll edge y reduced motion.                                |

### C. Navegacion y comandos

| Componente                   | Tipo     | Requerimiento Tahoe                                                                 |
| ---------------------------- | -------- | ----------------------------------------------------------------------------------- |
| `MacOSMenuBar`               | Avanzado | Estructura App/File/Edit/Format/View/App/Window/Help.                               |
| `MacOSMenuBarExtra`          | Avanzado | Icono 24pt, menu al click, no popover salvo complejidad real.                       |
| `MacOSMenu`                  | Basico   | Liquid Glass, separators, icons de acciones comunes, shortcuts, disabled.           |
| `MacOSMenuItem`              | Basico   | Label title-style, optional icon, shortcut, checkmark, destructive.                 |
| `MacOSSubmenu`               | Basico   | Un nivel preferido; evitar profundidad excesiva.                                    |
| `MacOSContextMenu`           | Basico   | Acciones frecuentes del contexto; iconos solo si aclaran.                           |
| `MacOSPopUpButton`           | Basico   | Seleccion de una opcion entre varias, estilo control.                               |
| `MacOSPullDownButton`        | Basico   | Boton que ejecuta/revela acciones relacionadas.                                     |
| `MacOSTabView`               | Basico   | Tabs para cambio de vistas en contenido principal.                                  |
| `MacOSSegmentedViewSwitcher` | Basico   | Segmented control en toolbar/inspector, no reemplaza tab view principal.            |
| `MacOSCommandPalette`        | Avanzado | Experiencia tipo Spotlight con search, acciones, quick keys y resultados agrupados. |
| `MacOSBreadcrumbPath`        | Avanzado | Ruta/document path o menu de documento en toolbar leading.                          |

### D. Controles basicos

| Componente                           | Tipo     | Requerimiento Tahoe                                                                                             |
| ------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------- |
| `Button`                             | Basico   | Mapear `solid` a prominent/glass primary cuando aplica; `ghost` a control glass; `transparent` a toolbar/plain. |
| `MacOSPushButton`                    | Basico   | Text/icon button con altura estandar, press state y optional primary role.                                      |
| `MacOSSquareButton`                  | Basico   | Icon-only para acciones sobre una vista, no toolbar.                                                            |
| `MacOSHelpButton`                    | Basico   | Circular con `?`, maximo uno por contexto.                                                                      |
| `MacOSIconButton`                    | Basico   | Para toolbar o contenido; label accesible obligatorio.                                                          |
| `MacOSToggleButton`                  | Basico   | Boton con selected state para filtros/acciones toggle.                                                          |
| `Input` / `MacOSTextField`           | Basico   | Campo compacto 13px, placeholder, clear affordance si aplica, focus ring.                                       |
| `MacOSSecureField`                   | Basico   | Password con affordance de visibilidad si la API existente lo soporta.                                          |
| `Textarea` / `MacOSTextView`         | Basico   | Multiline content field, resize opcional, scrollbars overlay.                                                   |
| `Select` / `MacOSComboBox`           | Basico   | Input + lista de opciones para seleccion o autocompletado.                                                      |
| `InputSearcher` / `MacOSSearchField` | Basico   | Search icon, clear button, suggestions, scope/tokens cuando aplique.                                            |
| `MacOSTokenField`                    | Avanzado | Tokens editables para filtros de busqueda.                                                                      |
| `MacOSColorWell`                     | Avanzado | Swatch/control para color picker cuando se requiera.                                                            |
| `MacOSDateTimeField`                 | Avanzado | Fecha/hora con picker o popover asociado.                                                                       |
| `FileInput` / `MacOSFileDrop`        | Avanzado | File picker/drop zone estilo Finder, con states drag-over.                                                      |

### E. Seleccion y entrada numerica

| Componente                       | Tipo     | Requerimiento Tahoe                                                           |
| -------------------------------- | -------- | ----------------------------------------------------------------------------- |
| `Checkbox`                       | Basico   | 3 estados: off/on/mixed, cuadrado redondeado, alineacion para jerarquias.     |
| `RadioGroup`                     | Basico   | 2 a 5 opciones ideales, circulos, spacing consistente horizontal/vertical.    |
| `Switch`                         | Basico   | Regular y mini, usar para settings de mayor peso visual.                      |
| `SegmentedControl` / `ToggleBar` | Basico   | Single/multiple/momentary; igualdad de ancho; tooltip por segmento icon-only. |
| `Slider`                         | Basico   | Linear con thumb lozenge, track accent, optional icons y live feedback.       |
| `CircularSlider`                 | Avanzado | Valores ciclicos o rotacion 0-360.                                            |
| `Stepper`                        | Basico   | Increment/decrement junto a text field para valores precisos.                 |
| `RatingIndicator`                | Avanzado | Solo si el catalogo lo requiere; usar simbolos y label accesible.             |

### F. Organizacion de contenido

| Componente               | Tipo     | Requerimiento Tahoe                                                                |
| ------------------------ | -------- | ---------------------------------------------------------------------------------- |
| `MacOSForm`              | Basico   | Grouped form, labels alineados, row height mayor que Sonoma, sections title-style. |
| `MacOSFormRow`           | Basico   | Label/control/help/error con densidad escritorio.                                  |
| `MacOSGroupBox`          | Basico   | Contenedor de settings o seccion; no usar card decorativa.                         |
| `Card` / `CardContainer` | Basico   | En macOS Tahoe debe sentirse como grouped surface, no como card marketing.         |
| `BasicTable`             | Basico   | Rows con separators sutiles, selected/unemphasized selected, header text color.    |
| `MacOSList`              | Basico   | Lists con row height/padding Tahoe, selected state y keyboard focus.               |
| `MacOSOutlineList`       | Avanzado | Jerarquia con disclosure controls, ideal para source lists profundas.              |
| `DisclosureGroup`        | Basico   | Expand/collapse con chevron, animacion reducida si corresponde.                    |
| `MacOSBox`               | Basico   | Equivalente AppKit box para agrupar contenido relacionado.                         |
| `MacOSEmptyState`        | Basico   | Icono, titulo corto y accion primaria; sin hero decorativo.                        |

### F.bis Componentes existentes sin mencion explicita

Estos componentes ya estan exportados por Tucu UI y son visibles en pantallas del theme macOS. Deben restylearse via tokens CSS + `html.macos` sin cambiar su API publica.

| Componente         | Tipo   | Requerimiento Tahoe                                                                              |
| ------------------ | ------ | ------------------------------------------------------------------------------------------------ |
| `Avatar`           | Basico | Borde sutil adaptativo, shadow macOS, tamano coherente con row height Tahoe.                     |
| `Tooltip`          | Basico | Material regular glass, tamano 11px, placement consistente y delay macOS (~0.5s).                |
| `Collapse`         | Basico | Disclosure chevron animado (reduced motion compatible), borde sutil, padding Tahoe.              |
| `KeyValueRow`      | Basico | Label secundario, valor primario, separador hairline, tipografia compacta macOS.                 |
| `Pagination`       | Basico | Controles compactos con radios Tahoe, estados hover/disabled, numeros en Body style.             |
| `Tab` / `ParamTab` | Basico | Mapear a tab bar Tahoe con selected underline o filled state y tipografia Title 3.               |
| `TabSelect`        | Basico | Variante de seleccion de tabs; adaptar a segmented control Tahoe si es toolbar context.          |
| `ActiveLink`       | Basico | Color accent macOS por defecto, underline sutil, visited no cambia (macOS convention).           |
| `AnchorLink`       | Basico | Igual que ActiveLink; color accent y transicion suave.                                           |
| `Carousel`         | Basico | Controles prev/next con icon button glass, indicators con radius pill, spacing Tahoe.            |
| `CarouselCards`    | Basico | Cards internas como surfaces macOS sobrias, sin glass.                                           |
| `CarouselImage`    | Basico | Aspect ratio preservado, corners redondeados, shadow Tahoe.                                      |
| `PinCode`          | Basico | Inputs individuales con radius-control, focus ring macOS, gap consistente.                       |
| `Scrollbar`        | Basico | Overlay scrollbar macOS, 6px track, radius pill, auto-hide con hover reveal.                     |
| `ScrollbarNative`  | Basico | CSS overrides para `::-webkit-scrollbar` con colores macOS tokenizados.                          |
| `ListContainer`    | Basico | Fondo grouped, separadores hairline, padding Tahoe.                                              |
| `ListItem`         | Basico | Row height macOS, selected state, hover state, icon + label layout.                              |
| `Typography`       | Basico | Mapear variantes h1-h6, body, code a text styles macOS (Large Title, Title 1-3, Body, etc.).     |
| `CodeBlock`        | Basico | Font mono macOS, fondo grouped, borde sutil, radius-control.                                     |
| `Image`            | Basico | Corners redondeados opcionales, shadow Tahoe para images elevadas.                               |
| `Hamburger`        | Basico | Adaptar a icon button macOS con estados; considerar hide en layout macOS con sidebar permanente. |
| `Loader`           | Basico | Circular indeterminate macOS, color accent, reduced motion: estatico con opacity pulse.          |
| `Alert`            | Basico | Material regular, icono semantico, colores system (Red/Green/Blue/Yellow), borde sutil.          |
| `FormField`        | Basico | Label alineado, spacing macOS, error text con color system red.                                  |
| `HookForm`         | Basico | Wrapper; hereda estilos de Form. Sin cambios propios, se restylea transitivamente.               |

#### Layouts y navegacion estructural existente

| Componente                                    | Tipo   | Requerimiento Tahoe                                                                      |
| --------------------------------------------- | ------ | ---------------------------------------------------------------------------------------- |
| `RootLayout`                                  | Basico | Aplica fondo espacial Tahoe, fuente del sistema, transicion de theme.                    |
| `AdminLayout`                                 | Basico | Sidebar como source list glass, header como toolbar glass, content pane solido.          |
| `CleanLayout`                                 | Basico | Fondo content-bg, tipografia macOS, sin barras.                                          |
| `HorizontalLayout`                            | Basico | Nav horizontal con glass regular, spacing Tahoe, selected state.                         |
| `Header` / `AdminHeader` / `HorizontalHeader` | Basico | Glass regular, toolbar height, slots leading/center/trailing, title bar area si aplica.  |
| `CollapsibleMenu`                             | Basico | Source list Tahoe: secciones, disclosure chevrons, row states, badges, accent selection. |
| `ExpandableSidebar`                           | Basico | Glass regular, width transicion, toggle icon button, scroll overlay.                     |
| `HorizontalNavMenu`                           | Basico | Items con glass hover, selected underline o filled, spacing horizontal macOS.            |
| `SidebarMenu`                                 | Basico | Source list con secciones y disclosure; estados active/inactive.                         |
| `MenuItem`                                    | Basico | Hover/pressed/selected states Tahoe, icon + label, shortcut area si aplica.              |
| `AdminRightArea` / `HorizontalRightArea`      | Basico | Controles compactos, tokens macOS, densidad escritorio.                                  |

#### Cards variantes y dialog adicionales

| Componente         | Tipo   | Requerimiento Tahoe                                                    |
| ------------------ | ------ | ---------------------------------------------------------------------- |
| `CardTitle`        | Basico | Tipografia Title 2 o Title 3, color label primario.                    |
| `AuthorCard`       | Basico | Avatar + nombre + metadata; surface macOS sobria, separadores sutiles. |
| `InfoCard`         | Basico | Surface grouped, icono semantico, tipografia Body/Callout.             |
| `PanelActionCard`  | Basico | Surface con accion primaria; boton prominent glass si es CTA.          |
| `PanelCard`        | Basico | Surface grouped neutra, sin glass, borde sutil.                        |
| `TabModal`         | Basico | Dialog con tabs internos; tabs restyleados como tab bar Tahoe.         |
| `DrawerContainer`  | Basico | Container del drawer; adaptar a sheet/sidebar visual segun direccion.  |
| `Sidebar` (dialog) | Basico | Sidebar como overlay; glass regular con dimming del fondo.             |

#### Auth forms

| Componente           | Tipo   | Requerimiento Tahoe                                                                           |
| -------------------- | ------ | --------------------------------------------------------------------------------------------- |
| `SignInForm`         | Basico | Inputs, buttons y labels con tokens macOS; validacion con system colors; layout form grouped. |
| `SignUpForm`         | Basico | Igual que SignInForm; campos adicionales con spacing macOS consistente.                       |
| `ForgetPasswordForm` | Basico | Layout compacto, input email con focus ring macOS, boton prominent.                           |
| `ResetPinForm`       | Basico | PinCode inputs con tokens macOS, boton prominent.                                             |

#### Blockchain / DeFi

Estos componentes deben reinterpretar sus superficies, badges, iconos y estados con el sistema visual Tahoe cuando `colorScheme === 'macos'`. No deben quedar con aspecto Default dentro de un layout Tahoe.

| Componente             | Tipo   | Requerimiento Tahoe                                                                     |
| ---------------------- | ------ | --------------------------------------------------------------------------------------- |
| `CoinCard`             | Basico | Surface grouped, icono con shadow macOS, tipografia numerica mono, badge soft.          |
| `CoinInfoCard`         | Basico | KeyValue layout con tokens macOS, separadores hairline, color semantico para variacion. |
| `CoinListbox`          | Basico | List con row states macOS, search integrado, scroll overlay.                            |
| `CollectionCard`       | Basico | Surface con imagen (corners redondeados), metadata en Callout style.                    |
| `CollectionSelectList` | Basico | List seleccionable con selected state macOS, badges.                                    |
| `CurrencySwapIcons`    | Basico | Iconos con shadow macOS, transicion swap sutil.                                         |
| `LivePriceFeed`        | Basico | Numeros mono, color semantico Green/Red para variacion, ticker compacto.                |
| `NFTGrid`              | Basico | Grid con cards grouped, corners redondeados, hover shadow macOS.                        |
| `TransactionInfo`      | Basico | KeyValue rows, separator hairline, badge status con colores semanticos macOS.           |

### G. Presentacion, modales y feedback

| Componente              | Tipo     | Requerimiento Tahoe                                                                |
| ----------------------- | -------- | ---------------------------------------------------------------------------------- |
| `Modal` / `MacOSDialog` | Basico   | Dialog con material regular, acciones alineadas, default/cancel/destructive roles. |
| `MacOSAlert`            | Basico   | Icono opcional, mensaje claro, boton default y cancel correctos.                   |
| `MacOSSheet`            | Basico   | Sheet con radio aumentado, inset cuando aplique, contenido no pegado a esquinas.   |
| `MacOSPopover`          | Basico   | Liquid Glass regular, flecha/anchor, cierre por outside/escape.                    |
| `MacOSPanel`            | Avanzado | Panel auxiliar flotante, puede ser key window, no reemplaza dialog.                |
| `Drawer`                | Basico   | Si se mantiene por API, adaptar visualmente a sheet/sidebar segun direccion.       |
| `Toast`                 | Basico   | En macOS preferir notification/banner discreto; no bloquear flujo.                 |
| `Badge`                 | Basico   | Count/status, alto contraste, no solo color.                                       |
| `Progressbar`           | Basico   | Determinate/indeterminate, lineal o circular segun contexto.                       |
| `Spinner`               | Basico   | Actividad breve; no usar para operaciones largas sin texto.                        |
| `Skeleton`              | Basico   | Material neutral, no glass, reduced motion compatible.                             |
| `NotificationCard`      | Avanzado | Notification Center style, acciones claras, contenido escaneable.                  |

### H. Componentes avanzados Tahoe/especiales

Priorizados como P1 (util inmediatamente), P2 (nice to have) y P3 (futuro). Solo P1 deberia considerarse en la primera iteracion.

| Componente                 | Tipo     | Prioridad | Requerimiento Tahoe                                                                     |
| -------------------------- | -------- | --------- | --------------------------------------------------------------------------------------- |
| `MacOSCommandPalette`      | Avanzado | **P1**    | Experiencia tipo Spotlight con search, acciones, quick keys y resultados agrupados.     |
| `MacOSControlCenterPanel`  | Avanzado | **P2**    | Panel de controles agrupados con Liquid Glass, toggles, sliders y third-party controls. |
| `MacOSControlTile`         | Avanzado | **P2**    | Tile para Wi-Fi/Bluetooth/etc. con icono, estado y accion.                              |
| `MacOSWidget`              | Avanzado | **P2**    | Widget translucent compatible con wallpaper/content.                                    |
| `MacOSMenuBarLiveActivity` | Avanzado | **P2**    | Chip en menu bar para actividad en vivo, compacto y expandible.                         |
| `MacOSSpotlightResultList` | Avanzado | **P2**    | Resultados agrupados, quick keys, acciones y preview.                                   |
| `MacOSAppIconPreview`      | Avanzado | **P3**    | Preview de iconos light/dark/clear/tinted por capas.                                    |
| `MacOSIconLayer`           | Avanzado | **P3**    | Representacion de foreground/middle/background para iconos.                             |
| `MacOSPhoneCallPanel`      | Avanzado | **P3**    | Panel de llamada/continuity con acciones primarias y poster opcional.                   |
| `MacOSGameOverlay`         | Avanzado | **P3**    | Overlay in-game no intrusivo, controles de sistema y chat.                              |
| `MacOSMarkdownExportPanel` | Avanzado | **P3**    | Caso Notes/Tahoe: dialog de exportacion con formato y destino.                          |

### I. Charts y data visualization

Los chart wrappers de Tucu UI (`LineChart`, `BarChart`, `AreaChart`, `PieChart`, `RadarChart`, `ComposedChart`) y los shared components (`ChartContainer`, `ChartTooltip`, `ChartEmptyState`) deben consumir tokens macOS automaticamente via `useChartTheme`. No deben usarse con Recharts crudo en demos del design system.

| Componente        | Tipo   | Requerimiento Tahoe                                                                 |
| ----------------- | ------ | ----------------------------------------------------------------------------------- |
| `LineChart`       | Basico | Colores de series con system colors macOS, grid sutil, axis en secondary-label.     |
| `BarChart`        | Basico | Bars con radius-small-control, colores system, hover highlight sutil.               |
| `AreaChart`       | Basico | Fill con opacity Tahoe, stroke accent, gradient suave.                              |
| `PieChart`        | Basico | Colores system, labels en Body/Callout style, leyenda con secondary-label.          |
| `RadarChart`      | Basico | Grid sutil, fill con alpha baja, colores system.                                    |
| `ComposedChart`   | Basico | Hereda estilos de Line/Bar/Area combinados.                                         |
| `ChartContainer`  | Basico | Fondo content-bg o grouped-bg, borde sutil, padding Tahoe.                          |
| `ChartTooltip`    | Basico | Material glass regular o fondo solido con shadow; tipografia Callout.               |
| `ChartEmptyState` | Basico | Icono + mensaje en secondary-label, accion si aplica.                               |
| `useChartTheme`   | Hook   | Debe detectar `colorScheme === 'macos'` y devolver palette/config con tokens Tahoe. |

#### Tokens de charts macOS requeridos

| Token                          | Light                           | Dark                            | Uso                        |
| ------------------------------ | ------------------------------- | ------------------------------- | -------------------------- |
| `--macos-chart-grid`           | `rgba(60,60,67,.12)`            | `rgba(84,84,88,.30)`            | Lineas de grid y ejes      |
| `--macos-chart-axis`           | `var(--macos-tertiary-label)`   | `var(--macos-tertiary-label)`   | Labels de ejes             |
| `--macos-chart-tooltip-bg`     | `var(--macos-glass-regular-bg)` | `var(--macos-glass-regular-bg)` | Fondo de tooltips de chart |
| `--macos-chart-tooltip-border` | `var(--macos-glass-border)`     | `var(--macos-glass-border)`     | Borde de tooltips de chart |
| `--macos-chart-series-1`       | `var(--macos-accent)`           | `var(--macos-accent)`           | Serie primaria (Blue)      |
| `--macos-chart-series-2`       | `#34c759`                       | `#30d158`                       | Serie secundaria (Green)   |
| `--macos-chart-series-3`       | `#ff8d28`                       | `#ff9230`                       | Serie terciaria (Orange)   |
| `--macos-chart-series-4`       | `#cb30e0`                       | `#db34f2`                       | Serie cuaternaria (Purple) |
| `--macos-chart-series-5`       | `#ff383c`                       | `#ff4245`                       | Serie 5 (Red)              |
| `--macos-chart-series-6`       | `#00c8b3`                       | `#00dac3`                       | Serie 6 (Mint)             |

## Style guide operativo

### Uso correcto de Liquid Glass

- Usar Liquid Glass en `MacOSToolbar`, `MacOSSidebar`, menus, popovers, sheets, floating controls y toolbar groups.
- Usar standard material o fondos solidos en contenido: tablas, listas, cards de datos, formularios y paneles de lectura.
- No colocar cards con glass dentro de containers con glass.
- No tintar todos los toolbar buttons. Solo accion primaria, seleccion activa o estado semantico.
- Cuando hay contenido visual bajo una barra, aplicar scroll edge o background extension para sostener legibilidad.

### Iconografia

- `LucideIcons` debe ser la primera opcion para acciones genericas, navegacion, formularios, estados, documentacion y demos: add, remove, share, delete, filter, search, back, forward, sidebar, inspector, more, alert, check, info, upload, download y similares.
- Lucide alcanza para la mayoria de acciones web de Tucu UI si se normalizan tamano, stroke, alineacion optica, color `currentColor`, tooltip y `aria-label`.
- Brechas previstas: simbolos Apple-specific o SF Symbols-like, traffic lights, app icons por capas, metaforas Finder/sidebar, menu bar extras, system controls y estados propios de macOS que Lucide no represente con claridad.
- No agregar otra libreria de iconos salvo necesidad clara, documentada y aprobada. Antes de sumar dependencia, intentar mapeo Lucide, CSS simple o SVG propio acotado.
- Usar SVG propios solo para iconos Tahoe especificos que Lucide no cubra. Deben ser originales, coherentes con el stroke/radio del theme, accesibles (`aria-hidden` o nombre visible segun contexto), themables con `currentColor` y sin copiar SF Symbols propietario.
- Traffic lights pueden implementarse como CSS/SVG propios simples con estados active/inactive/hover, sin copiar assets del sistema.
- En toolbar, preferir icon-only con tooltip y `aria-label`.
- No mezclar botones de texto e iconos dentro de un mismo grupo visual.
- No usar iconos decorativos en menus si no aclaran la accion.
- Documentar mapeos equivalentes a SF Symbols como referencia conceptual, no como dependencia ni copia visual literal.

### Copy y labels

- Menu items y toolbar text actions: Title Style en ingles; en espanol, frases cortas y consistentes con localizacion del producto.
- Los labels de menu que abren otro dialog/window llevan elipsis: `Settings...`, `Export...`.
- Section headers de lists/forms deben estar en Title Style o capitalizacion natural, nunca todo uppercase forzado.
- Botones de accion deben empezar con verbo cuando son texto: `Save`, `Export`, `Add`.

### Interaccion

- Cada control custom debe tener estados: default, hover, pressed, selected, disabled, focus-visible, loading si aplica.
- El target interactivo minimo debe ser 44x44px cuando el espacio lo permita; controles compactos de escritorio deben mantener hit area aumentada con padding invisible si son visualmente pequenos.
- Escape cierra menus/popovers/sheets no destructivos.
- Return activa el boton default en dialogs.
- Tab order debe seguir el orden visual y ser predecible.
- Tooltips aparecen en hover para icon-only y controles ambiguos.

### Accesibilidad

- Soportar light, dark, increased contrast, reduced transparency y reduced motion.
- No depender solo de color para estado; usar texto, icono, checkmark, dot, fill o shape.
- `prefers-reduced-motion: reduce` elimina morphing/blur animations no esenciales.
- `prefers-reduced-transparency: reduce` aumenta opacidad de glass y reduce `backdrop-filter`.
- VoiceOver: todo icon button necesita nombre accesible; menus deben exponer roles y shortcuts.
- Contraste: texto primario sobre glass debe mantener AA como minimo; si el fondo debajo lo rompe, aumentar opacidad o agregar dim layer.

## Fases de implementacion sugeridas

### Fase A — Research y calibracion visual

- [ ] Descargar o consultar macOS 26 UI Kit oficial de Apple Design Resources.
- [ ] Comparar Spec 03 contra Tahoe: materiales, radios, iconos, row heights y toolbar/sidebar.
- [ ] Crear mapa de equivalencias entre componentes Tucu existentes y componentes macOS Tahoe.
- [ ] Definir tokens finales light/dark/increased contrast con capturas o design kit.
- [ ] Registrar mapeo de LucideIcons a acciones macOS/SF Symbols.
- [ ] Definir estrategia de fondos espaciales originales, sin assets propietarios Apple.

### Fase B — Foundations Tahoe

- [ ] Actualizar `macos-foundations.css` con tokens Tahoe.
- [ ] Crear `macos-liquid-glass.css`.
- [ ] Crear tokens/classes para fondos espaciales light/dark con fallback opaco.
- [ ] Crear soporte CSS para `prefers-reduced-transparency` y `prefers-reduced-motion`.
- [ ] Corregir estrategia de fuentes para no distribuir SF Pro.
- [ ] Validar `applyMacOSTheme()` y layout macOS automatico.
- [ ] Agregar tokens de charts macOS (`--macos-chart-*`).

### Fase C — Shell macOS

- [ ] Adaptar `MacOSWindow` a radios, shadows y estados Tahoe.
- [ ] Adaptar `MacOSToolbar` con grupos Liquid Glass y scroll edge.
- [ ] Adaptar `MacOSSidebar` con background extension y source list states.
- [ ] Implementar o documentar `MacOSSplitView` y `MacOSInspector`.
- [ ] Agregar estados inactive/key/main para ventana simulada si aplica.

### Fase C.bis — Layouts y navegacion existente

- [ ] Restylear `RootLayout` con fondo espacial y fuente del sistema.
- [ ] Restylear `AdminLayout`: sidebar como source list glass, header como toolbar glass.
- [ ] Restylear `HorizontalLayout`: nav horizontal con glass regular.
- [ ] Restylear `CleanLayout` con tokens de fondo y tipografia macOS.
- [ ] Restylear `Header`, `AdminHeader`, `HorizontalHeader` con glass regular y toolbar height.
- [ ] Restylear `CollapsibleMenu`, `ExpandableSidebar`, `HorizontalNavMenu`, `SidebarMenu`, `MenuItem`.
- [ ] Validar que `applyMacOSTheme()` activa layout coherente sin clases residuales al revertir.

### Fase D — Controles core

- [ ] Button, IconButton, SquareButton, HelpButton.
- [ ] TextField, SearchField, Select/ComboBox, Textarea.
- [ ] Checkbox, Radio, Switch, SegmentedControl, Slider, Stepper.
- [ ] Menus, Pop-up buttons, Pull-down buttons, ContextMenu.
- [ ] Asegurar `data-tucu` estable para overrides sin cambiar API publica.

### Fase E — Organizacion y datos

- [ ] Forms/grouped forms, FormRow, GroupBox.
- [ ] Lists, OutlineList, Tables, Pagination.
- [ ] Cards existentes reinterpretadas como surfaces macOS sobrias (Card, CardTitle, AuthorCard, InfoCard, PanelCard, PanelActionCard).
- [ ] Empty states y disclosure groups.
- [ ] Avatar, Tooltip, Collapse, KeyValueRow, Scrollbar, ScrollbarNative.
- [ ] Tabs existentes (Tab, ParamTab, TabSelect) adaptados a tab bar Tahoe.
- [ ] Links (ActiveLink, AnchorLink) con color accent macOS.
- [ ] Typography mapeada a text styles macOS.
- [ ] CodeBlock con font mono macOS.
- [ ] Carousel, CarouselCards, CarouselImage con controles glass.
- [ ] PinCode con inputs y focus ring macOS.
- [ ] ListContainer, ListItem con row states macOS.

### Fase E.bis — Componentes compuestos y blockchain

- [ ] Auth forms (SignInForm, SignUpForm, ForgetPasswordForm, ResetPinForm) con tokens macOS.
- [ ] Blockchain/DeFi (CoinCard, CoinInfoCard, CoinListbox, CollectionCard, CollectionSelectList, CurrencySwapIcons, LivePriceFeed, NFTGrid, TransactionInfo) con surfaces y colores Tahoe.
- [ ] FormField, HookForm: verificar que heredan estilos transitivamente.
- [ ] Image, Hamburger, Loader: tokens macOS y estados.

### Fase F — Presentacion y estados

- [ ] Dialog/Alert/Sheet/Popover/Panel.
- [ ] Toast/NotificationCard/Badge/Progress/Spinner/Skeleton.
- [ ] TabModal, DrawerContainer, Sidebar (dialog).
- [ ] Validar acciones default/cancel/destructive y keyboard behavior.
- [ ] Evitar modales excesivos; priorizar popover/sheet cuando corresponda.

### Fase F.bis — Charts

- [ ] Adaptar `useChartTheme` para detectar `colorScheme === 'macos'` y devolver palette macOS.
- [ ] Restylear ChartContainer, ChartTooltip, ChartEmptyState con tokens macOS.
- [ ] Validar LineChart, BarChart, AreaChart, PieChart, RadarChart, ComposedChart con paleta macOS.

### Fase G — Tahoe advanced set (solo P1 y P2)

- [ ] **P1:** Spotlight/Command Palette (`MacOSCommandPalette`).
- [ ] **P2:** Control Center panel y tiles.
- [ ] **P2:** Widget visual style.
- [ ] **P2:** Menu bar extra y Live Activity chip.
- [ ] Los P3 se dejan para iteraciones futuras.

### Fase H — QA visual, accesibilidad y docs

- [ ] Demo con comparativa Default vs macOS Tahoe en light/dark.
- [ ] Demo de reduced transparency y reduced motion.
- [ ] Demo de toolbar/sidebar con contenido scrolleando debajo.
- [ ] Demo de fondos espaciales propios en root/window background y hero/demo surface.
- [ ] Validar performance de `backdrop-filter`: max 2 capas, FPS en Chrome DevTools.
- [ ] Validar transicion entre themes sin layout shift ni clases residuales.
- [ ] Props metadata regenerada si se agregan componentes.
- [ ] Invocar `tucu-ui-docs-sync` si se crean componentes nuevos.

## Estrategia de testing visual

### Validacion manual requerida

- Verificar cada componente en light, dark y increased contrast con `colorScheme: 'macos'`.
- Verificar `prefers-reduced-transparency: reduce` usando Chrome DevTools → Rendering → Emulate CSS media feature.
- Verificar `prefers-reduced-motion: reduce` usando Chrome DevTools → Rendering → Emulate CSS media feature.
- Comparar visualmente con capturas del macOS 26 UI Kit o screenshots oficiales de Apple.

### Validacion automatizada sugerida

- Screenshots de componentes clave en CI (Chromatic, Percy o `playwright screenshot`) para detectar regresiones.
- Snapshot HTML/CSS de componentes con `html.macos` para validar que los tokens se aplican correctamente.
- Lighthouse accessibility audit en la demo con theme macOS activado.
- Chequeo automatico de contraste AA para texto sobre glass usando herramientas de color contrast.

### Componentes prioritarios para screenshots

Los siguientes componentes son los mas visibles y deben tener screenshot de referencia en light + dark:

`MacOSWindow`, `MacOSToolbar`, `MacOSSidebar`, `AdminLayout` (macOS), `Button` (3 variantes), `Input`, `Select`, `Checkbox`, `Switch`, `Modal`, `Popover`, `Toast`, `BasicTable`, `Card`, `LineChart`, `BarChart`.

## Criterios de aceptacion

- [ ] `pnpm nx build tucu-ui` exitoso.
- [ ] `pnpm nx lint tucu-ui` exitoso.
- [ ] Activar theme macOS aplica visual Tahoe 26 a componentes existentes sin cambiar su API publica.
- [ ] Todo componente visible en una pantalla Tahoe queda restyleado via tokens/classes/`data-tucu`, incluyendo basicos, forms, navegacion, overlays/dialogs, feedback, data display, charts y blockchain/demo-specific exportados o documentados.
- [ ] Layouts existentes (`AdminLayout`, `HorizontalLayout`, `CleanLayout`) se restylean correctamente en modo macOS sin duplicar wrappers.
- [ ] Componentes no mencionados explicitamente en el inventario macOS pero exportados por la libreria heredan tokens Tahoe de forma transitiva via CSS custom properties.
- [ ] Light, dark e increased contrast tienen tokens diferenciados.
- [ ] `prefers-reduced-motion` y `prefers-reduced-transparency` estan soportados.
- [ ] Fondos espaciales Tahoe usan assets propios/generados internamente, nunca assets propietarios Apple, y aplican solo a root/window background, hero/demo surface o wallpaper-like app background.
- [ ] Toolbars, sidebars, menus, popovers y sheets usan Liquid Glass con moderacion.
- [ ] No hay mas de 2 capas de `backdrop-filter` simultaneas en el viewport; performance validada.
- [ ] Contenido principal, listas, tablas y formularios permanecen legibles y no usan glass decorativo innecesario.
- [ ] Charts consumen tokens macOS automaticamente via `useChartTheme`.
- [ ] Iconografia usa `LucideIcons` por defecto, documenta brechas Tahoe y usa SVG propios solo cuando Lucide no cubre el caso sin copiar SF Symbols.
- [ ] Todos los icon-only buttons tienen tooltip o `aria-label`.
- [ ] Los componentes avanzados tienen al menos una demo o story/documentacion si se implementan.
- [ ] No se distribuyen fuentes SF Pro propietarias dentro del paquete sin aprobacion legal explicita.
- [ ] El resultado se valida contra el macOS 26 UI Kit o capturas oficiales de Apple.

## Out of scope

- Implementar APIs nativas AppKit/SwiftUI; esta spec es para una libreria React/web.
- Distribuir fuentes Apple dentro del paquete.
- Incluir, copiar o derivar wallpapers, screenshots, iconos, SF Symbols o assets propietarios de Apple.
- Rehacer toda la API publica de Tucu UI.
- Crear temas Windows/GNOME/Linux.
- Implementar Apple Intelligence, Phone, Continuity o Games como funcionalidad real; solo se consideran patrones visuales si hacen falta demos.

## Decisiones de diseno

| #   | Decision                                               | Alternativa                       | Razon                                                                                                                                                                                                    |
| --- | ------------------------------------------------------ | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Tahoe reemplaza el objetivo visual del theme `macos`   | Crear `macosTahoe` paralelo       | Evita fragmentar API y mantiene continuidad con Spec 03.                                                                                                                                                 |
| 2   | Liquid Glass solo en capa funcional                    | Aplicarlo a todos los surfaces    | Apple recomienda no usarlo en contenido; evita ruido visual y baja legibilidad.                                                                                                                          |
| 3   | Bundlear Inter + JetBrains Mono como fuentes del theme | Usar solo system stack sin bundle | SF Pro no es redistribuible (licencia Apple). Inter (SIL OFL) tiene metricas similares, 9 pesos, optical sizes y es la fuente UI libre mas usada. Garantiza aspecto macOS-like en TODAS las plataformas. |
| 4   | CSS tokens + `html.macos`                              | Componentes duplicados            | Mantiene API publica y reduce duplicacion.                                                                                                                                                               |
| 5   | Valores visuales calibrables con UI Kit                | Declarar numeros como definitivos | Apple indica que colores/materiales pueden fluctuar; el UI Kit oficial debe cerrar exactitud.                                                                                                            |
| 6   | Lucide como aproximacion web documentada               | Exigir SF Symbols en React        | El paquete ya usa Lucide; SF Symbols no esta disponible como icon library web redistribuible.                                                                                                            |
| 7   | Fondos espaciales originales del proyecto              | Copiar wallpapers/assets Apple    | Evita riesgo legal y mantiene una identidad Tahoe-inspired implementable en web.                                                                                                                         |
| 8   | SVG propios solo para brechas Tahoe concretas          | Agregar otra libreria de iconos   | Reduce dependencias y evita variantes visuales incompatibles con Lucide/Tucu UI.                                                                                                                         |
| 9   | Layouts existentes se restylean, no se reemplazan      | Crear layouts macOS paralelos     | Evita duplicar API; los componentes macOS exclusivos son alternativa avanzada, no obligatoria.                                                                                                           |
| 10  | Max 2 capas de `backdrop-filter` simultaneas           | Sin limite de capas               | Performance web: GPU compositing es costoso y causa drops de FPS en scroll.                                                                                                                              |
| 11  | Transicion de theme inmediata, sin animacion           | Fade/morph entre themes           | Evita artefactos de layout shift; CSS custom properties se aplican instantaneamente.                                                                                                                     |
| 12  | Charts consumen tokens via `useChartTheme`             | Pasar colores manualmente         | Automatiza la adaptacion al theme activo y reduce errores de integracion.                                                                                                                                |
| 13  | Componentes avanzados priorizados P1/P2/P3             | Implementar todos en una fase     | Focaliza esfuerzo en CommandPalette (P1); el resto no bloquea el restyling base.                                                                                                                         |

## Checklist para agentes implementadores

- [ ] Leer esta spec completa y Spec 03 antes de tocar codigo.
- [ ] Leer `.github/skills/tucu-ui-design-system/SKILL.md` y `.github/skills/tucu-ui-catalog/SKILL.md`.
- [ ] Identificar si la fase activa modifica componentes existentes o crea nuevos.
- [ ] Si se crean componentes nuevos, preparar plan y luego invocar `tucu-ui-docs-sync`.
- [ ] Usar variantes validas de Tucu UI: Button `solid|ghost|transparent`, sizes `large|medium|small|mini|tiny`.
- [ ] No importar directo desde `react-router-dom`; usar `ReactRouter` de `@e-burgos/tucu-ui` si aparece routing en demos.
- [ ] No crear listas custom expandibles si `Select` o `InputSearcher` resuelve el caso.
- [ ] Verificar accesibilidad de teclado y estados visuales antes de cerrar.
