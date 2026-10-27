# SPEC-e-burgos-002: Absorción de componentes, layouts y temas de los consumidores

> Estado: **completed** (2026-10-27). Plan de cinco ciclos aprobado por el dueño el 2026-10-27. Numeración: c00→cycle-01, c01→cycle-02, c02→cycle-03, c03→cycle-04 y c04→cycle-05, porque el schema exige `cycle ≥ 1`.

## Resumen Ejecutivo

display-ads, opticagestion y el Studio de sdd-harness reimplementan primitivas, componentes genéricos, layouts y presets de tema que deberían vivir en `@e-burgos/tucu-ui`. Esta spec arregla primero las primitivas (ergonomía, a11y, i18n) y el sistema de temas, después sube los componentes y layouts genéricos, y por último deja una guía y un skill de diseño servidos por el MCP, para que los consumidores generen interfaces de esa calidad sin copiar código.

## Contexto de Negocio

Cada consumidor parchea la librería por su cuenta (wrappers, `!important`, `globals.css`) o la reemplaza con copias propias. Esos parches se desincronizan y cada proyecto nuevo arranca desde cero. Con la absorción, cada consumidor borra su copia en su propio ciclo de adopción.

## Evidencia y decisiones

- Evidencia: el `issues_found` de sdd-harness spec-e-burgos-009 cycle-01 (Studio en 3.4.0) lista 18 fricciones de primitivas: Button, Modal, Input/Textarea, Select, Radio/Checkbox, Alert/Badge/Spinner, colorScheme, CSS de swiper y tamaño del CSS.
- Evidencia: relevamientos en solo lectura de display-ads y opticagestion (sesiones SDD Steward, 2026-10-27). Hallaron GlassPanel con 129 usos, StateBadge 88, InlineNotice 79, MoneyText 61, más SplitModal, StatCard, Lightbox, AnimatedTabs, Nav/Footer, AuthShell, stack-table y `THEME_PRESETS` del storefront.
- Decisión del dueño (2026-10-27): no subir bloques de contenido completos de la landing, solo componentes y layouts genéricos; el layout de la landing entra como layout nuevo.
- Decisión del dueño (2026-10-27): tucu-ui tiene que poder generar diseños de esa calidad mediante un skill y su MCP.
- Decisión del dueño (2026-10-27): los temas (c01) van antes que los componentes (c02), para que los componentes no nazcan atados a un tema fijo.
- Decisión del dueño (2026-10-27): cada release o push a npm necesita su OK. La adopción la hace cada consumidor en su sesión.

## Requisitos Funcionales (RF)

- RF-1 (c00): las primitivas aceptan `className` con merge real (tailwind-merge), reenvían `aria-*`/`data-*` a la raíz real, traducen sus labels y tienen tamaño `xs`. Se corrigen los bugs reportados de Button, Modal, Input, Textarea, Select, Radio, Checkbox, Alert, Badge, Spinner, Tooltip, DataTable, tema y CSS.
- RF-2 (c01): un registro de presets de marca con nombre emite variables `--tucu-*`; `ThemeProvider` es anidable y con scope, resuelve por tenant/host, y los portales heredan el tema del scope. Hay un contrato público de tokens y de atributos `data-tucu`.
- RF-3 (c02): componentes genéricos: GlassPanel, StateBadge, InlineNotice, MoneyText, SafeImage, SegmentedControl, FilterPill con su barra de filtros, vistas de estado vacío/error/sistema, ConfirmDialog, SplitModal y SplitModalWizard, StatCard con tendencia, Lightbox con swipe y AnimatedTabs.
- RF-4 (c03): MarketingLayout (nav pública con menú móvil y footer, todo por props), SplitAuthLayout y un modo responsive del DataTable que muestra tarjetas en mobile.
- RF-5 (c04): un skill de diseño instalable sin marca, el recurso MCP `tucu://design-guide`, los parámetros `style`/`motion`/`density` en `generate_page` y `generate_component`, y el prompt `design-review`.

## Requisitos No-Funcionales (RNF)

- RNF-1: compatibilidad 3.x. Los defaults visuales actuales se conservan salvo los bugs listados; lo nuevo es opt-in y el barrel raíz solo suma exports. La única excepción es el default de `colorScheme`, que pasa a `default` (cambio de comportamiento documentado en el CHANGELOG).
- RNF-2: todo componente nuevo funciona en Vite y en Next (`'use client'`, sin acceso al DOM durante el render).
- RNF-3: cada componente nuevo o modificado tiene tests vitest, props generadas, una entrada en el registry del MCP y una página en tucu-docs.
- RNF-4: sin marca de ningún consumidor en el código, en el skill ni en la guía.

## Dependencias

- Subproyectos: `libs/tucu-ui` (`ui/tucu-ui`), `libs/tucu-docs` (`ui/tucu-docs`), `tools/mcp-server`.
- Externas: `tailwind-merge` (dependencia nueva de la librería).
- Consumidores (solo lectura): display-ads, opticagestion, sdd-harness.

## Criterios de Aceptación

- CA-001 (c00): cada fricción de primitivas del `issues_found` de sdd-harness spec-009 cycle-01 queda resuelta o documentada como fuera de alcance, con un test que la cubre.
- CA-002 (c01): dos `ThemeProvider` con presets distintos en la misma página se renderizan cada uno con su tema, y un Modal o Select abierto desde un scope hereda el tema de ese scope.
- CA-003 (c02): los 13 componentes de la tabla existen en tucu-ui, sin duplicar Carousel, Stepper, Drawer, TabModal, Skeleton ni useTabParam.
- CA-004 (c03): MarketingLayout y SplitAuthLayout funcionan en Vite y en Next, y el DataTable muestra tarjetas en mobile con paginación.
- CA-005 (c04): el MCP sirve `tucu://design-guide`, acepta `style`/`motion`/`density` y expone el prompt `design-review`; el skill se instala sin referencias a ningún consumidor.
- CA-006: cada ciclo cierra con `pnpm sdd:validate` en verde, versiones publicadas con OK del dueño y una nota de adopción por consumidor.
