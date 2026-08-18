# Spec 07 — ExpandableSidebar: anclado (pin) y logo dual

**Fecha:** 2026-08-18
**Versión:** 1.0
**Estado:** Completado
**Branch:** `feat/sidebar-pinning-mcp-reality`
**Dependencias:** —

## Resumen

Port a tucu-ui de las mejoras publicadas en el fork flex-ui 1.4.0 (spec 04 de ese
repo): estado de anclado (pin) controlado/no-controlado para `ExpandableSidebar`,
logo dedicado para el rail colapsado (`collapsedLogo`), y dos bug fixes que conviven
en las mismas líneas (filtro `hide` por ítem y `isActive` en la rama expandida).
`AdminLayout` forwardea las cuatro props nuevas.

## Arquitectura / Diseño

Archivos a modificar:

- `ui/tucu-ui/src/components/layouts/menus/expandable-sidebar.tsx`
- `ui/tucu-ui/src/components/layouts/admin-layout/index.tsx`
- `ui/tucu-ui/src/__tests__/layouts/expandable-sidebar.test.tsx` (solo extensiones)
- `ui/tucu-ui/src/__tests__/layouts/admin-layout.test.tsx` (solo extensiones)

Decisiones técnicas:

- Patrón controlado/no-controlado estándar de React: `pinned` (controlado),
  `defaultPinned` (no controlado), `onPinnedChange` en cada toggle.
- El "open efectivo" que gobierna todo el render es `open || isPinned`. Con
  `isPinned`: `onMouseLeave`, `useClickAway` y el colapso desktop del efecto de
  `isMobile` se vuelven no-op. El efecto mobile no se toca.
- Botón indicador con `aria-pressed`, `data-tucu="sidebar-pin"` (el atributo de
  anclaje de esta lib es `data-tucu`, no `data-flex`), `title` "Pin menu"/"Unpin
  menu", íconos `LockIcon`/`Unlocked` existentes (la lib no tiene ícono de pin).
  Se agrega DESPUÉS de los nodos existentes del header — no se reordena el DOM.
- La persistencia NO vive en la librería: JSDoc documenta el patrón
  `pinned` + `onPinnedChange` contra el storage del consumidor.
- **Divergencia respecto de flex-ui que se preserva**: en tucu-ui los `MenuItem`
  de ambas ramas ejecutan primero el `onClick` del consumidor y recién después el
  comportamiento del contenedor (fix propio de tucu-ui, PR #19). El port mantiene
  esa semántica: `sideBarMenuItems` sigue mapeando `onClick` y la rama expandida
  sigue haciendo `item.onClick?.(); setOpen(false)`.

## Fases de implementación

### Fase A — ExpandableSidebar

- [ ] Interfaz `ExpandableSidebarProps` exportada con las props nuevas + JSDoc
- [ ] Estado `internalPinned` + `isPinned` derivado + `togglePinned()`
- [ ] Guardas de no-op en mouseLeave / clickAway / colapso desktop
- [ ] Botón pin en el header (aria-pressed, data-tucu="sidebar-pin", Lock/Unlocked)
- [ ] `collapsedLogo` con fallback exacto al `isoType` actual (toggle onClick intacto)
- [ ] Fix hide: `const items = sideBarMenuItems(menuItems).filter((i) => !i.hide)`
      computado una vez y reusado por ambas ramas
- [ ] Fix isActive: la rama expandida pasa la misma expresión que la colapsada

### Fase B — AdminLayout

- [ ] Props `collapsedLogo`, `sidebarPinned`, `defaultSidebarPinned`,
      `onSidebarPinnedChange` con JSDoc, forwardeadas al `ExpandableSidebar`
- [ ] El logo del header/drawer mobile no cambia

### Fase C — Tests

- [ ] CA-1..CA-7 de abajo cubiertos con extensiones a las suites existentes

## Criterios de aceptación

- [ ] CA-1: con `defaultPinned` o pin por click, `mouseLeave`/`clickAway` no cierran;
      al desanclar vuelve el cierre por hover
- [ ] CA-2: `pinned` controlado gobierna y `onPinnedChange` reporta cada toggle
- [ ] CA-3: el botón expone `aria-pressed` coherente y `data-tucu="sidebar-pin"`
- [ ] CA-4: colapsado con `collapsedLogo` renderiza ese logo; sin la prop, fallback
- [ ] CA-5: un ítem `hide: true` desaparece solo; sus hermanos renderizan
- [ ] CA-6: expandido, el ítem cuyo `href`/submenú matchea pathname recibe `isActive`
- [ ] CA-7: `AdminLayout` forwardea las 4 props
- [ ] Suite previa completa en verde sin modificar tests existentes
- [ ] Build exitoso (`pnpm nx build tucu-ui`) y lint limpio

## Out of scope

- Persistencia del pin dentro de la librería (localStorage/cookies)
- Cambios de comportamiento mobile (drawer táctil actual se conserva)
- Íconos nuevos (se reusan LockIcon/Unlocked)

## Revisión 1.1 (2026-08-18, feedback de revisión en test-lib)

Tres cambios pedidos por el autor tras probar la implementación original:

1. **Botón en el borde, con flechas**: el toggle deja de ser un candado en el header y
   pasa a ser un botón circular sutil sobre el borde exterior del sidebar
   (`ltr:-right-[12px]`), visible en ambos estados, con `ChevronRight` (expandir) /
   `ChevronLeft` (colapsar). Conserva `aria-pressed` y `data-tucu="sidebar-pin"`;
   `title` pasa a "Expand menu"/"Collapse menu". El `mouseEnter` del aside ignora el
   puntero cuando entra por el botón (si no, la expansión por hover movía el botón
   antes del click — blanco móvil).
2. **El contenido se adapta**: `AdminLayout` deriva el pinned efectivo y cambia su
   padding `xl` de 96/112px a 288/320px mientras está anclado, con
   `transition-[padding]`.
3. **Persistencia en la librería** (revierte la decisión original "persistencia en el
   consumidor"): en modo no controlado el estado vive en `useTheme().isSidebarPinned`
   (persistido en `theme-storage`); `defaultPinned` rige hasta el primer toggle. El
   modo controlado (`pinned`/`sidebarPinned`) sigue sin tocar el store, para storages
   custom.

## Decisiones de diseño

| #   | Decisión                                        | Alternativa                 | Razón                                                        |
| --- | ----------------------------------------------- | --------------------------- | ------------------------------------------------------------ |
| 1   | Candado abierto/cerrado como ícono de pin       | Crear ícono de pin nuevo    | Reusar íconos existentes; así se resolvió también en flex-ui |
| 2   | Persistencia en el consumidor                   | localStorage en la lib      | La lib no conoce el storage ni la clave del consumidor       |
| 3   | Botón pin agregado al final del header          | Reordenar DOM               | Consumidores dependen del orden actual de nodos              |
| 4   | Conservar onClick-preservation propio (PR #19)  | Copiar flex-ui literal      | Es un fix de tucu-ui posterior al fork; no se regresiona     |
