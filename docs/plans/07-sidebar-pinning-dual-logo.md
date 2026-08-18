# Plan 07 — ExpandableSidebar: anclado (pin) y logo dual

**Spec:** docs/specs/07-sidebar-pinning-dual-logo.md
**Branch:** feat/sidebar-pinning-mcp-reality
**Depende de:** —

## Estado inicial requerido

```bash
git branch --show-current   # feat/sidebar-pinning-mcp-reality
pnpm nx run tucu-ui:test    # suite previa en verde
```

## Fase A — ExpandableSidebar

`ui/tucu-ui/src/components/layouts/menus/expandable-sidebar.tsx`:

1. Exportar `ExpandableSidebarProps` con `pinned?`, `defaultPinned?`,
   `onPinnedChange?`, `collapsedLogo?` (JSDoc en inglés, persistencia = consumidor).
2. `const [internalPinned, setInternalPinned] = useState(defaultPinned)`;
   `const isPinned = pinned !== undefined ? pinned : internalPinned`;
   `const isOpen = open || isPinned` gobierna todo el render.
3. `togglePinned()`: siempre llama `onPinnedChange?.(next)`; solo setea
   `internalPinned` cuando `pinned === undefined`.
4. Guardas: `onMouseLeave={() => !isPinned && setOpen(false)}`; clickAway y colapso
   desktop del efecto `isMobile` con `if (!isPinned)`. Efecto mobile intacto.
5. Botón pin después del botón Close (mismo patrón Button), con
   `aria-pressed={isPinned}`, `data-tucu="sidebar-pin"`, title Pin/Unpin menu,
   `LockIcon`/`Unlocked`.
6. Rama colapsada: `collapsedLogo ? <Logo {...collapsedLogo} /> : fallback isoType`.
7. `const items = sideBarMenuItems(menuItems).filter((item) => !item.hide)` una vez;
   ambas ramas mapean `items`. La rama expandida agrega el mismo `isActive` que la
   colapsada. Se conservan los `onClick` tal cual están hoy.

## Fase B — AdminLayout

`ui/tucu-ui/src/components/layouts/admin-layout/index.tsx`: 4 props nuevas con JSDoc
forwardeadas (`collapsedLogo`→`collapsedLogo`, `sidebarPinned`→`pinned`,
`defaultSidebarPinned`→`defaultPinned`, `onSidebarPinnedChange`→`onPinnedChange`).

## Fase C — Tests

Extender `expandable-sidebar.test.tsx` y `admin-layout.test.tsx` con los CA-1..CA-7
de la spec (fireEvent mouseEnter/mouseLeave/click; selectores por
`[data-tucu="sidebar-pin"]` y `getByTitle`).

## Criterios de aceptación

- [ ] Los de la spec 07
- [ ] Cero tests previos modificados

## Verificación

```bash
pnpm nx run tucu-ui:test
pnpm nx build tucu-ui
pnpm nx lint tucu-ui
```

## Post-implementación

- [ ] Invocar `tucu-ui-docs-sync` / regenerar props: `pnpm tsx scripts/generate-props.ts`
- [ ] Sync del resource `tucu://layouts` del MCP (va en Spec 08)
