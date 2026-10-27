# spec-e-burgos-002-consumer-absorption — cycle-04 (c03) · plan (lite)

> Módulo: consumer-absorption | Subproyectos: libs/tucu-ui, libs/tucu-docs, tools/mcp-server | Fecha: 2026-10-27
> Objetivo: layouts genéricos de sitio público y de autenticación, y un modo responsive del DataTable que muestra tarjetas en mobile (RF-4, CA-004). Fuera de alcance: la guía de diseño, el skill y el MCP de diseño (cycle-05).

## Evidencia (relevamiento de solo lectura)
- **Nav de la landing de display-ads (`apps/landing/src/components/Nav.tsx`).**
  - Barra fija, transparente hasta 32 px de scroll; el blur se aplica solo en desktop por jank en mobile.
  - Grilla de 3 columnas: logo, links centrados y acciones.
  - Menú móvil en dropdown, sin focus trap ni Escape.
  - El Footer arma grupos de links y redes; los externos abren con `noopener`.
- **opticagestion.**
  - Landing con nav y footer simples.
  - Header del storefront con `currentPath` como link activo.
  - `mobile-menu-drawer.tsx` es la mejor referencia de a11y móvil: foco al panel, Escape, Tab trap, foco de vuelta y targets de 44 a 48 px.
- **AuthShell.**
  - La versión split real es la de opticagestion: columna de marca con headline, lead y highlights `{icon, text}`, columna de formulario con título, subtítulo e icono, y footer.
  - En mobile la marca colapsa a un logo compacto.
  - El de display-ads es una tarjeta centrada.
- **StackTable de display-ads.**
  - Cambia por JS con `useIsMobile`.
  - La primera celda es el título de la tarjeta y el resto se muestra como filas `label: valor`.
  - Las acciones van arriba a la derecha, con `stopPropagation`.
  - `mobileRowClick` opt-in, paginación manual con textos fijos en español y sin selección.
- **tucu-ui.**
  - `RootLayout` exige `menuItems` y un shell de app; `CleanLayout` es una columna vacía.
  - BasicTable ya tiene `mobileCards` solo con CSS.
  - DataTable (TanStack) no tiene modo mobile.
  - Existen los formularios `SignInForm`, `SignUpForm`, etc. en `components/auth`.

## Historias
- US-001 — Como dev de un sitio público quiero un `MarketingLayout` (nav, menú móvil, contenido y footer) configurable por props y agnóstico del router, para no copiar el Nav/Footer de cada app. CA:
  - Funciona en Vite y en Next.
  - Menú móvil accesible.
  - Link activo.
  - Transparente hasta hacer scroll.
- US-002 — Como dev quiero un `SplitAuthLayout` (marca y formulario) que envuelva los formularios de `components/auth`. CA:
  - En mobile apila con logo compacto.
  - Funciona en Vite y en Next.
- US-003 — Como dev quiero que el DataTable muestre tarjetas en mobile con paginación. CA:
  - Opt-in por prop.
  - Sin cambio de markup entre servidor y cliente.
  - Título, campos `label: valor` y acciones.
  - Click y selección.
  - Paginación compacta, con textos de i18n.

## Tasks (detalle en tasks.json)
- TASK-001 — `MarketingLayout`:
  - Compuesto por `MarketingNav`, `MarketingFooter` y `main`, exportables por separado.
  - Links `{label, href, external?, icon?, active?}` y acciones (ReactNode).
  - `transparentUntilScroll` y `sticky`.
  - Menú móvil como panel con focus trap, Escape y foco de vuelta.
  - Footer con grupos, redes, legal y slot inferior.
  - Links renderizados con el `Link` de `TucuNavigationContext` cuando existe, o un `<a>`; `renderLink` opcional.
- TASK-002 — `SplitAuthLayout`:
  - Slot de marca (logo, headline, lead, highlights, fondo), formulario (título, subtítulo, icono, children) y footer.
  - `brandPosition` `start` o `end`, y `surface` `glass` (GlassPanel) o `solid`.
  - Logo compacto en mobile.
- TASK-003 — DataTable con tarjetas:
  - `mobileCards` (`boolean` o `{ breakpoint, titleColumnId, subtitleColumnId, hiddenColumnIds }`), renderizado por CSS (tabla y tarjetas con `hidden`/`md:` según el breakpoint) sobre el mismo row model.
  - Acciones de fila, `onRowClick` y selección en la tarjeta.
  - Paginación compacta en mobile.
  - Estados vacío y error con i18n.
- TASK-004 — Integración: generate-props, registry del MCP, changelog y páginas de tucu-docs.
- TASK-005 — Verificación: tests, lint, checks de build, test-local y navegador (desktop y mobile).

## Decisiones técnicas
- **Layouts como componentes, no como `LAYOUT_OPTIONS`.** Sumar un valor al enum obliga a tocar seis lugares y `RootLayout` exige `menuItems`. `MarketingLayout` y `SplitAuthLayout` se usan dentro de `layout="clean"` o sin `ThemeProvider` layout, igual que una página.
- **Router agnóstico.** Los links usan el `Link` de `TucuNavigationContext` (lo proveen `ThemeProvider` y `NextThemeProvider`) cuando existe; si no, `<a>`. `renderLink` permite otro router.
- **Tarjetas del DataTable por CSS**, como BasicTable, para no cambiar el markup entre servidor y cliente ni depender de `useIsMobile`. El costo es renderizar las filas dos veces, solo con `mobileCards` activo y solo para la página visible.
- **Release:** minor `3.8.0` de la librería y minor `0.14.0` del MCP, con OK del dueño por ciclo (2026-10-27).

## Agregado durante el ciclo
- TASK-006 — Fricciones 76 a 83 del Studio al adoptar 3.7.0:
  - SplitModal:
    - Selección por sección (`selectionMode` `nav`/`option`/`none`).
    - `sidebarActions`.
    - Ítems `kind: 'info'`.
    - `maxHeight` default alineado con Modal.
  - SegmentedControl: `semantics` `radio`/`tabs`/`nav`, con `idBase`, props por opción y `emphasis`.
  - Badge: `micro` con padding propio.
  - `tooltipDefaults` en ThemeProvider.
  - `--tucu-table-line-height` por densidad.
