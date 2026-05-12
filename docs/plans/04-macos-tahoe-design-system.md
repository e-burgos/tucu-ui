# Plan 04 — macOS Tahoe 26 / Liquid Glass Design System

**Spec:** `docs/specs/04-macos-tahoe-design-system.md`
**Branch recomendado:** `feat/macos-tahoe-design-system`
**Branch actual compatible:** `feat/macos-design-system`
**Depende de:** Spec 03 — macOS Sonoma 14 Design System
**Fecha:** 2026-05-11

> El branch recomendado para este alcance es `feat/macos-tahoe-design-system`, porque Tahoe/Liquid Glass cambia el objetivo visual completo del theme macOS y conviene aislarlo de la continuidad Sonoma. Si el equipo decide mantener continuidad con Spec 03, el branch actual `feat/macos-design-system` puede usarse, dejando claro en PR y commits que Spec 04 reemplaza el destino visual de macOS.

---

## Estado inicial requerido

- La spec debe existir y leerse antes de implementar: `docs/specs/04-macos-tahoe-design-system.md`.
- No modificar la spec durante la implementación de este plan salvo que el equipo apruebe una actualización de alcance.
- El theme Tahoe debe evolucionar el contrato existente `colorScheme: 'macos'`, `html.macos`, `LAYOUT_OPTIONS.MACOS`/`LAYOUT_OPTIONS.MACOS_TAHOE`, `ThemeWrapper`, `useTheme()` y settings, sin crear APIs publicas paralelas incompatibles.
- Todo componente visible exportado o documentado debe quedar cubierto por tokens, clases y/o atributos estables `data-tucu` del theme/layout Tahoe. El objetivo es evitar pantallas mixtas donde algunos componentes queden con estilo Default dentro de una experiencia macOS.
- No usar assets propietarios de Apple: no wallpapers, screenshots, iconos, SF Symbols, fuentes embebidas SF Pro ni derivados visuales copiables. Los fondos espaciales deben ser originales del proyecto, generados internamente o CSS propio.
- Las variantes publicas existentes se conservan. Ejemplos criticos: `Button` usa `variant="solid|ghost|transparent"` y `size="large|medium|small|mini|tiny"`; no introducir aliases incompatibles como `primary`, `outline`, `lg` o `sm`.
- El worktree puede tener cambios no relacionados. Ignorarlos y tocar solo los archivos de la fase activa.

### Comandos de inspección inicial

```bash
git branch --show-current
git status --short
test -f docs/specs/04-macos-tahoe-design-system.md
test -f docs/plans/04-macos-tahoe-design-system.md
find ui/tucu-ui/src/assets/css/macos -maxdepth 1 -type f | sort
find ui/tucu-ui/src -maxdepth 3 -type f | sort | sed -n '1,220p'
```

### Inventario publico reproducible

Usar este comando para cruzar exports publicos contra la metadata de props antes de decidir cobertura real por componente:

```bash
node <<'NODE'
const ts = require('typescript');
const fs = require('fs');
const path = require('path');

const root = path.resolve('ui/tucu-ui/src/index.ts');
const configPath = ts.findConfigFile(process.cwd(), ts.sys.fileExists, 'ui/tucu-ui/tsconfig.lib.json');
const config = ts.readConfigFile(configPath, ts.sys.readFile);
const parsed = ts.parseJsonConfigFileContent(config.config, ts.sys, path.dirname(configPath));
const program = ts.createProgram([root], { ...parsed.options, skipLibCheck: true, noEmit: true });
const checker = program.getTypeChecker();
const moduleSymbol = checker.getSymbolAtLocation(program.getSourceFile(root));
const rootExports = new Set(checker.getExportsOfModule(moduleSymbol).map((symbol) => symbol.getName()));
const text = fs.readFileSync('ui/tucu-ui/src/demo/generated/props-metadata.ts', 'utf8');
const registryNames = [...text.matchAll(/^  '([^']+)': \{/gm)].map((match) => match[1]);
const publicComponents = registryNames.filter((name) => rootExports.has(name)).sort();

console.log(`registry=${registryNames.length} publicRegistryComponents=${publicComponents.length}`);
console.log(publicComponents.join('\n'));
NODE
```

---

## Fase A — Auditoría e inventario real de componentes/export públicos

**Objetivo:** cerrar el inventario real de componentes visibles que deben recibir Tahoe antes de escribir CSS o tocar componentes. Esta fase evita implementar por intuición y deja una matriz de cobertura verificable.

**Archivos probables a crear/modificar:**

- `docs/plans/04-macos-tahoe-design-system.md` si se necesita actualizar la matriz de avance.
- No tocar codigo en esta fase salvo que el equipo apruebe registrar el inventario en un archivo auxiliar.

**Pasos concretos:**

1. Leer `docs/specs/04-macos-tahoe-design-system.md`, `.github/skills/tucu-ui/SKILL.md`, `.github/skills/tucu-ui-catalog/SKILL.md`, `.github/skills/tucu-ui-design-system/SKILL.md` y `.github/skills/tucu-ui-docs/SKILL.md`.
2. Ejecutar el inventario publico reproducible de arriba y guardar el resultado en la nota de trabajo o comentario de PR.
3. Revisar `ui/tucu-ui/src/index.ts` para detectar exports publicos que no aparecen en `props-metadata.ts`.
4. Revisar `ui/tucu-ui/src/demo/generated/props-metadata.ts` para detectar componentes documentados pero no exportados desde el barrel publico.
5. Agrupar cobertura por familias: buttons, forms/inputs, navigation/layout, overlays/dialogs, feedback/loaders, data display, charts, macOS, blockchain/auth/docs-specific.
6. Para cada familia, marcar si ya existe `data-tucu`, clase estable, wrapper semantico o selector fiable para tematizar con `html.macos`.
7. Identificar componentes que requieren agregar `data-tucu` sin cambiar props publicas.
8. Registrar brechas de iconografia donde `LucideIcons` no alcanza y se justifica SVG propio original.

**Salida esperada:** una matriz de cobertura por componente/familia con estado `cubierto`, `requiere data-tucu`, `requiere token`, `requiere demo/docs` o `fuera de alcance por no ser visible/publico`.

---

## Fase B — Tokens/foundations Tahoe, Liquid Glass, fondos espaciales propios y accesibilidad base

**Objetivo:** establecer la base visual Tahoe en CSS puro, acotada a `html.macos`, con materiales Liquid Glass, fondos espaciales originales y fallbacks de accesibilidad.

**Archivos probables a crear/modificar:**

- `ui/tucu-ui/src/assets/css/macos/index.css`
- `ui/tucu-ui/src/assets/css/macos/macos-foundations.css`
- `ui/tucu-ui/src/assets/css/macos/macos-liquid-glass.css`
- `ui/tucu-ui/src/assets/css/macos/macos-backgrounds.css`
- `ui/tucu-ui/src/assets/css/macos/macos-typography.css`
- `ui/tucu-ui/src/assets/css/globals.css`

**Pasos concretos:**

1. Recalibrar tokens Tahoe sobre `html.macos`: labels, separators, window/content/grouped backgrounds, control backgrounds, accent, focus ring, shadows, radii, spacing y z-index de capas.
2. Separar tokens de Liquid Glass en `macos-liquid-glass.css`: `regular`, `clear`, `prominent`, border, highlight, shadow, scroll edge y dim layer.
3. Crear `macos-backgrounds.css` con fondos espaciales originales: aurora/depth/demo, overlays de contraste y clases de root/window background. No incluir imagenes ni nombres derivados de assets Apple.
4. Mantener fuentes con stack seguro del sistema: `-apple-system`, `BlinkMacSystemFont`, `SF Pro Text`, `SF Pro Display`, `Helvetica Neue`, `Arial`, `sans-serif`; no agregar `.woff2` propietarios.
5. Agregar soporte de `@media (prefers-reduced-transparency: reduce)` para reemplazar blur/transparencia por materiales opacos.
6. Agregar soporte de `@media (prefers-reduced-motion: reduce)` para eliminar animaciones no esenciales.
7. Agregar soporte de `@media (prefers-contrast: more)` para labels, borders, focus y backgrounds con contraste aumentado.
8. Garantizar que contenido principal, tablas, cards de datos y formularios usen material estandar u opaco, no Liquid Glass decorativo.
9. Importar los nuevos CSS desde `macos/index.css` al final del bundle macOS, manteniendo todo acotado a `html.macos`.

**Salida esperada:** foundations Tahoe listas para consumo transversal, con fallback opaco accesible y fondos espaciales propios aplicables solo a root/window/hero/demo surfaces.

---

## Fase C — Theme/layout Tahoe y activación en ThemeWrapper/useTheme/settings

**Objetivo:** asegurar que activar macOS desde runtime aplique Tahoe de forma coherente en theme, layout y settings sin dejar clases residuales ni romper standalone/MFE.

**Archivos probables a crear/modificar:**

- `ui/tucu-ui/src/themes/hooks/use-theme.tsx`
- `ui/tucu-ui/src/themes/theme-wrapper.tsx`
- `ui/tucu-ui/src/themes/theme-provider.tsx`
- `ui/tucu-ui/src/themes/settings/*`
- `ui/tucu-ui/src/layouts/root-layout/*`
- `ui/tucu-ui/src/layouts/macos/*`
- `ui/tucu-ui/src/types/*` si ya existe un tipo de layout/theme que requiere reflejar `MACOS_TAHOE`

**Pasos concretos:**

1. Verificar el estado actual de `LAYOUT_OPTIONS.MACOS` y `LAYOUT_OPTIONS.MACOS_TAHOE` antes de cambiar defaults.
2. Confirmar que `applyMacOSTheme()` setea `colorScheme: 'macos'`, presets macOS y layout Tahoe esperado.
3. Confirmar que `applyDefaultTheme()` revierte presets/layout/default y remueve efectos residuales de `html.macos`.
4. Revisar `ThemeWrapper` para que la clase `html.macos`, `dark`, `dir` y cualquier clase auxiliar Tahoe se apliquen en el nodo correcto.
5. Revisar settings para que la opcion macOS muestre el destino Tahoe sin exponer un theme publico paralelo incompatible.
6. Revisar `RootLayout` y `MacOSLayout` para que toolbar/sidebar/content reciban las clases necesarias de Tahoe y no dependan de wrappers duplicados.
7. Validar que standalone y MFE mantienen los contratos `menuItems`, `appRoutesConfig`, `basePath`, `isAuthenticated` y `loginUrl`.
8. Si se usa una clase auxiliar para Tahoe, documentarla como interna/complementaria; `html.macos` sigue siendo el interruptor principal.

**Salida esperada:** activar macOS desde `useTheme()` o settings produce layout Tahoe coherente, reversible y compatible con el contrato publico existente.

---

## Fase D — Restyling transversal por familias de componentes

**Objetivo:** aplicar Tahoe a todos los componentes visibles exportados/documentados usando tokens, `html.macos`, clases internas y `data-tucu`, sin duplicar componentes ni cambiar APIs publicas.

**Archivos probables a crear/modificar:**

- CSS macOS existentes y nuevos en `ui/tucu-ui/src/assets/css/macos/`.
- Componentes en `ui/tucu-ui/src/components/**` solo para agregar `data-tucu`, `data-variant`, `data-size`, `data-state` o clases internas estables.
- Componentes macOS en `ui/tucu-ui/src/components/macos/**` o ruta equivalente real detectada en la Fase A.
- Charts en `ui/tucu-ui/src/components/charts/**` si requieren tokens o `data-tucu`.
- Componentes blockchain/auth/docs-specific si aparecen exportados o documentados y no heredan bien de componentes base.

### D1. Buttons

1. Cubrir `Button`, `Hamburger`, `TopupButton` y cualquier button-like publico.
2. Mapear `solid` a prominent/accent cuando sea accion primaria; `ghost` a control glass/standard; `transparent` a toolbar/plain.
3. Mantener sizes validos `large|medium|small|mini|tiny` y estados default, hover, pressed, selected, disabled, focus-visible y loading.
4. Asegurar icon-only con tooltip o `aria-label` cuando el componente lo permita.

### D2. Forms e inputs

1. Cubrir `Form`, `FormField`, `HookForm`, `Input`, `InputSearcher`, `Select`, `Checkbox`, `Radio`, `RadioGroup`, `Switch`, `Textarea`, `FileInput`, `PinCode`, `ToggleBar` y controles numericos como `Stepper`.
2. Usar grouped surfaces para forms, focus ring Tahoe y estados de error/success/warning/info sin depender solo de color.
3. Mantener patrones `react-hook-form`, `Form` y `useFormContext`; no crear controles duplicados si los existentes resuelven el caso.

### D3. Navigation/layout

1. Cubrir `MacOSWindow`, `MacOSSidebar`, `MacOSToolbar`, `MacOSSegmentedControl`, `MacOSSearchBar`, `MacOSPopover`, `MacOSWidget`, layouts, sidebars, tabs, breadcrumbs, pagination, menu items y links visibles.
2. Implementar Liquid Glass en toolbar/sidebar/popovers/menus, con scroll edge/background extension cuando haya contenido debajo.
3. Mantener contenido principal en `MacOSContentPane` o equivalente con fondo legible, no glass decorativo.

### D4. Overlays/dialogs

1. Cubrir `Modal`, `Drawer`, `DrawerContainer`, `Sidebar`, `SidebarMenu`, `TabModal`, popovers y panels existentes.
2. Aplicar material regular, radios Tahoe, shadow multicapa, overlay accesible y acciones default/cancel/destructive distinguibles.
3. Mantener cierre por Escape/outside cuando el componente ya lo soporte; no cambiar comportamiento publico.

### D5. Feedback/loaders

1. Cubrir `Alert`, `Toast`, `NotificationCard`, `Badge`, `Progressbar`, `Spinner`, `Loader`, `Skeleton` y empty states.
2. Asegurar variantes validas (`Alert` `error|success|info|warning`; `Badge` `solid|ghost|outline|soft`) y estados con icono/texto/shape ademas de color.
3. Reducir animaciones en `prefers-reduced-motion`.

### D6. Data display

1. Cubrir `BasicTable`, `ListItem`, `ListContainer`, `Card`, `CardContainer`, `CardTitle`, `InfoCard`, `PanelCard`, `PanelActionCard`, `Avatar`, `Tooltip`, `Collapse`, `KeyValueRow`, `Typography`, `Tag` si existe exportado.
2. Usar grouped/material standard para datos y lectura; no convertir tablas/cards de contenido en vidrio decorativo.
3. Asegurar selected/unemphasized selected, separators, row height y focus visible.

### D7. Charts

1. Cubrir `LineChart`, `BarChart`, `AreaChart`, `PieChart`, `RadarChart`, `ComposedChart`, `ChartContainer`, `ChartTooltip`, `ChartEmptyState` y `useChartTheme`.
2. Consumir tokens Tahoe para paletas, tooltip, grid, axis, legends y empty state.
3. No usar Recharts crudo en demos del design system si existe wrapper Tucu UI.

### D8. Blockchain/docs-specific

1. Cubrir componentes blockchain exportados/documentados como cards, listboxes, sliders, feeds, swap widgets y NFT grids.
2. Cubrir componentes docs/demo-specific exportados como `HeroCard`, `TableOfContents`, `LazyComponentSection`, `AutoPropsTable`, `PropPlayground`, `CodeBlock` y wrappers de documentación cuando aparezcan en la experiencia Tahoe.
3. Reinterpretar superficies, badges, iconos y estados con tokens Tahoe sin crear variantes publicas paralelas.

**Salida esperada:** cada componente visible exportado/documentado tiene cobertura Tahoe por selector estable y no queda dependiente del styling Default dentro del layout macOS.

---

## Fase E — Iconografía: LucideIcons default y SVG propios para brechas Tahoe

**Objetivo:** normalizar iconografia Tahoe con `LucideIcons` como primera opcion y SVG propios solo para brechas concretas, sin copiar SF Symbols ni agregar dependencias innecesarias.

**Archivos probables a crear/modificar:**

- `ui/tucu-ui/src/components/icons/**` si ya existe una ubicacion para iconos propios.
- `ui/tucu-ui/src/components/macos/**` para traffic lights, app icon previews o iconos internos originales.
- `ui/tucu-ui/src/index.ts` solo si se aprueba exportar un icono/componente nuevo.
- Documentación/demo correspondiente si un icono o componente se vuelve publico.

**Pasos concretos:**

1. Crear un mapa conceptual Lucide/SF Symbols-like sin copiar nombres visuales propietarios como dependencia ni asset.
2. Usar `LucideIcons` para add, remove, share, delete, filter, search, back, forward, sidebar, inspector, more, alert, check, info, upload, download y equivalentes genericos.
3. Definir normalizacion visual: `currentColor`, stroke consistente, sizing por token, alineacion optica y estados disabled/selected.
4. Para brechas Tahoe, crear SVG propio original solo si Lucide no comunica el caso: traffic lights, capas de app icon preview, menu bar extras o metaforas macOS muy especificas.
5. Marcar SVG decorativos con `aria-hidden="true"`; iconos interactivos requieren nombre accesible via label, tooltip o `aria-label`.
6. No instalar otra libreria de iconos salvo decision explicita y documentada.

**Salida esperada:** iconografia coherente con Tahoe, basada en Lucide por defecto, con SVG propios acotados y legalmente seguros.

---

## Fase F — Documentación/demo/props metadata

**Objetivo:** reflejar Tahoe en la demo y documentación del repo, y mantener metadata de props sincronizada si se agregan o modifican componentes publicos.

**Archivos probables a crear/modificar:**

- `ui/tucu-ui/src/demo/**`
- `apps/demo/src/**`
- `ui/tucu-ui/src/demo/generated/props-metadata.ts`
- `scripts/generate-props.ts` solo si la generacion actual no contempla nuevos patrones.
- `README.md`, `README-es.md` o docs especificos solo si el cambio altera uso publico.

**Pasos concretos:**

1. Agregar o actualizar secciones de demo para macOS Tahoe con light/dark, reduced transparency, reduced motion, toolbar/sidebar con scroll edge, forms, data display, charts y overlays.
2. Mostrar fondos espaciales propios solo en root/window/hero/demo surfaces y documentar que no son assets Apple.
3. Usar imports publicos desde `@e-burgos/tucu-ui`; no documentar rutas internas.
4. Usar `ReactRouter` exportado por Tucu UI si las demos necesitan navegación.
5. Usar `LucideIcons` exportado por Tucu UI para iconos de docs/demo.
6. Si se agregan componentes o props publicas, regenerar metadata:

   ```bash
   pnpm tsx scripts/generate-props.ts
   ```

7. Si se crean componentes publicos nuevos, sincronizar documentación con el agente/flujo `tucu-ui-docs-sync`.
8. Validar que `AutoPropsTable` y `PropPlayground` resuelven los nuevos componentes o props.

**Salida esperada:** documentación y demo muestran Tahoe de forma verificable, con props metadata actualizada cuando aplique.

---

## Fase G — QA, build, lint, visual/accessibility checks

**Objetivo:** cerrar la implementación con verificación automatizada, revisión visual y checks de accesibilidad, sin dejar regresiones en Default theme.

**Archivos probables a crear/modificar:**

- No deberian modificarse archivos nuevos durante QA salvo fixes directos de la fase activa.
- Si se agregan pruebas visuales o documentación de QA, acordar ruta antes de crear archivos nuevos.

**Pasos concretos:**

1. Ejecutar build de libreria:

   ```bash
   pnpm nx build tucu-ui
   ```

2. Ejecutar lint de libreria:

   ```bash
   pnpm nx lint tucu-ui
   ```

3. Si se toca demo/docs, ejecutar build de demo:

   ```bash
   pnpm nx build demo
   ```

4. Si se agregan o modifican componentes publicos o props, regenerar metadata:

   ```bash
   pnpm tsx scripts/generate-props.ts
   ```

5. Revisar visualmente macOS Tahoe en light, dark, increased contrast, reduced transparency y reduced motion.
6. Revisar Default theme para confirmar que los overrides `html.macos` no filtran estilos.
7. Revisar contraste AA de texto sobre glass/fondos espaciales; si falla, aumentar opacidad, dim layer o scroll edge.
8. Revisar navegacion por teclado: Tab, Shift+Tab, Escape en menus/popovers/sheets y Return en dialog default action.
9. Revisar que todos los icon-only buttons tengan tooltip o `aria-label`.
10. Revisar performance de blur/transparencia: evitar blur por componente repetido, animaciones continuas o parallax costoso.

**Salida esperada:** build/lint limpios, demo compilada si aplica, props metadata sincronizada si aplica y matriz QA documentada en PR.

---

## Riesgos

- **Licencia Apple:** copiar SF Symbols, wallpapers, screenshots, UI Kit assets o fuentes SF Pro embebidas puede generar riesgo legal. Mitigación: usar stack del sistema, Lucide y assets propios.
- **Glass excesivo:** aplicar Liquid Glass a contenido de lectura puede bajar legibilidad. Mitigación: limitar glass a navegación, barras, popovers, sheets y controles flotantes.
- **Regresión Default theme:** selectores demasiado amplios pueden afectar theme default. Mitigación: todo override debe estar acotado a `html.macos`.
- **APIs duplicadas:** crear `TahoeButton`, `TahoeWindow` o variantes incompatibles fragmenta el paquete. Mitigación: evolucionar componentes existentes y agregar solo `data-tucu`/tokens internos.
- **Cobertura incompleta:** componentes blockchain, charts o docs-specific pueden quedar visualmente fuera de Tahoe. Mitigación: inventario publico real en Fase A y QA por familias.
- **Accesibilidad sobre fondos ricos:** texto sobre auroras/glass puede perder contraste. Mitigación: overlays, dim layer, opacidad aumentada y media queries de contraste/transparencia.
- **Performance:** `backdrop-filter` y blur en muchas superficies puede degradar scroll. Mitigación: una capa grande, materiales opacos en contenido y animacion reducida.
- **Worktree sucio:** cambios no relacionados pueden contaminar el alcance. Mitigación: revisar diff por archivo y tocar solo la fase activa.

---

## Dependencias

- Spec 04: `docs/specs/04-macos-tahoe-design-system.md`.
- Spec 03 como antecedente de arquitectura macOS: `docs/specs/03-macos-design-system.md` y `docs/plans/03-macos-design-system.md`.
- Skills de contexto: `.github/skills/tucu-ui/SKILL.md`, `.github/skills/tucu-ui-catalog/SKILL.md`, `.github/skills/tucu-ui-design-system/SKILL.md`, `.github/skills/tucu-ui-docs/SKILL.md`, `.github/skills/sdd/SKILL.md`.
- CSS macOS existente en `ui/tucu-ui/src/assets/css/macos/`.
- Theme runtime en `ui/tucu-ui/src/themes/**`.
- Layouts y componentes exportados desde `ui/tucu-ui/src/**`.
- Metadata de props en `ui/tucu-ui/src/demo/generated/props-metadata.ts`.
- Nx/pnpm para verificación.

---

## Criterios de aceptación

- [x] La implementación parte de la lectura de `docs/specs/04-macos-tahoe-design-system.md` y este plan.
- [x] Branch usado y rationale documentados: preferido `feat/macos-tahoe-design-system`; aceptable `feat/macos-design-system` si el equipo mantiene continuidad con Spec 03.
- [x] Inventario real de exports publicos/componentes documentados completado antes de restyling.
- [ ] Todo componente visible exportado o documentado queda cubierto por tokens, clases y/o `data-tucu` del theme/layout Tahoe.
- [x] No se duplican APIs publicas incompatibles ni se crean wrappers Tahoe paralelos para componentes existentes sin aprobacion explicita.
- [x] `colorScheme: 'macos'` y `html.macos` siguen siendo el contrato principal del theme macOS.
- [x] `applyMacOSTheme()` activa una experiencia Tahoe coherente y `applyDefaultTheme()` revierte sin residuos visuales.
- [x] Liquid Glass se usa en navegación, toolbars, sidebars, menus, popovers, sheets y controles flotantes, no como decoracion masiva de contenido.
- [x] Cards de datos, tablas, formularios y lectura mantienen legibilidad con material standard u opaco.
- [x] Fondos espaciales son originales del proyecto, no assets Apple, y solo se usan en root/window background, hero/demo surface o wallpaper-like app background.
- [x] Light, dark, increased contrast, reduced transparency y reduced motion tienen soporte explicito.
- [x] Iconografia usa `LucideIcons` por defecto y SVG propios originales solo para brechas Tahoe.
- [x] Todo icon-only button tiene tooltip o `aria-label`.
- [x] Charts consumen tokens Tahoe y wrappers Tucu UI.
- [x] Componentes blockchain/docs-specific exportados o documentados se reinterpretan con el mismo sistema visual.
- [x] Props metadata se regenera con `pnpm tsx scripts/generate-props.ts` cuando se agregan/modifican componentes publicos o props.
- [x] `pnpm nx build tucu-ui` pasa.
- [x] `pnpm nx lint tucu-ui` pasa.
- [x] `pnpm nx build demo` pasa si se toca demo/docs.
- [x] No se distribuyen fuentes SF Pro ni se copian SF Symbols, wallpapers, screenshots o assets propietarios Apple.

---

## Verificación final

```bash
pnpm nx build tucu-ui
pnpm nx lint tucu-ui

# Solo si se toca demo/docs:
pnpm nx build demo

# Solo si se agregan/modifican componentes publicos o props:
pnpm tsx scripts/generate-props.ts
```

---

## Post-implementación

- [ ] Revisar diff para confirmar que no se tocaron archivos fuera de la fase activa.
- [ ] Si hay componentes publicos nuevos, invocar `tucu-ui-docs-sync`.
- [ ] Documentar en PR la matriz de cobertura por familias y cualquier componente que quede diferido.
- [ ] Documentar assets/fondos propios usados y confirmar que no derivan de recursos Apple.
- [ ] Registrar cualquier decision arquitectonica nueva si cambia el contrato de theme/layout.
