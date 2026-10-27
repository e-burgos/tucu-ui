# spec-e-burgos-002-consumer-absorption — cycle-05 (c04) · plan (lite)

> Módulo: consumer-absorption | Subproyectos: libs/tucu-ui, libs/tucu-docs, tools/mcp-server | Fecha: 2026-10-27
> Objetivo: que tucu-ui pueda generar interfaces con la calidad de los consumidores sin copiar su código (RF-5, CA-005). Se agregan:
> - un skill de diseño instalable y sin marca;
> - el recurso MCP `tucu://design-guide`;
> - los parámetros `style`/`motion`/`density` en `generate_page` y `generate_component`;
> - el prompt `design-review`.
>
> Se cierran además dos pendientes del cycle-04: `generate_page` con MarketingLayout y SplitAuthLayout, y el respeto de `prefers-reduced-motion` en los componentes con framer-motion.

## Evidencia (relevamiento)
- **MCP:**
  - Recursos: 15 recursos `tucu://` como strings TS (`src/resources/*.ts`, registrados en `src/resources/index.ts`).
  - Prompts: 8 prompts con `server.prompt` (`src/prompts/*`).
  - Tools: `generate_component` y `generate_page` en `src/tools/generation-tools.ts`. El `layout` de `generate_page` es dashboard/sidebar/fullpage/stacked.
  - Transportes: stdio y HTTP comparten `createMcpServer()`.
  - Tests: `framework-parity` toma snapshots de la salida por defecto, así que los parámetros nuevos tienen que dejar esa salida idéntica byte a byte (RNF-1).
- **Skills:**
  - Viven en `harness/skills/*` con symlinks verificados por `scripts/check-harness-symlinks.mjs`.
  - Hoy no se distribuye ningún skill a los consumidores: el paquete del MCP publica `dist` y nada escribe archivos.
- **Diseño ya documentado:**
  - Recursos `best-practices`, `tokens`, `styling-overrides`, `theme` y `layouts`.
  - Páginas de design-system en tucu-docs (spacing, typography, sizing, shadows), sin secciones de motion ni density.
  - Densidad repartida en props: Card, BasicTable, Alert, Select/Input/Button `xs`, DataTable `mobileCards`.
  - `usePrefersReducedMotion` solo se usa en charts y Lightbox; el resto de framer-motion no respeta reduced motion.

## Historias
- US-001 — Como agente o dev quiero leer `tucu://design-guide` para saber cómo componer interfaces de calidad con tucu-ui. CA: cubre jerarquía, espaciado, tipografía, color por tokens y presets, superficies, densidad, motion, estados, responsive, a11y y anti-patrones, con ejemplos que usan componentes reales. Sin marca de consumidor.
- US-002 — Como agente quiero pedir `style`, `motion` y `density` a `generate_page` y `generate_component`, y layouts `marketing` y `auth`. CA:
  - Sin esos parámetros la salida es idéntica a 0.14.0.
  - Con ellos, la salida cambia de forma documentada.
- US-003 — Como agente quiero un prompt `design-review` que revise una UI contra la guía. CA: devuelve un checklist accionable con severidades.
- US-004 — Como consumidor quiero instalar un skill de diseño en mi proyecto con un comando. CA:
  - `npx -p @e-burgos/tucu-ui-mcp tucu-ui-skill install` copia `tucu-ui-design` a `.claude/skills/`, con `--dir` configurable.
  - El skill no tiene marca y apunta a `tucu://design-guide`.
- US-005 — Como usuario con `prefers-reduced-motion` quiero que las animaciones de la librería se reduzcan. CA: `MotionConfig reducedMotion="user"` en ThemeProvider/NextThemeProvider, con test.

## Tasks (detalle en tasks.json)
- TASK-001 — `tucu://design-guide` (`src/resources/design-guide.ts`, export `getDesignGuideContent`) y prompt `design-review` (`src/prompts/design-review.ts`), con tests.
- TASK-002 — Parámetros `style` (`clean|glass|bold|editorial`), `motion` (`none|subtle|expressive`) y `density` (`compact|comfortable|spacious`) en `generate_page` y `generate_component` (schemas en `src/utils/design-params.ts`), y `layout` `marketing`/`auth` en `generate_page`. Salida por defecto intacta y tests nuevos por parámetro.
- TASK-003 — Skill:
  - Fuente canónica `harness/skills/tucu-ui-design/` (SKILL.md y checklist).
  - Symlink en `.claude/skills/` y su entrada en `check-harness-symlinks`.
  - El build del MCP copia el skill a `dist/skills/` y genera `references/design-guide.md` desde `getDesignGuideContent`.
  - Bin `tucu-ui-skill` con `install [--dir] [--force]`.
  - `MotionConfig reducedMotion="user"` en la librería.
- TASK-004 — Docs: sección Motion & Density en el design-system de tucu-docs, y páginas del MCP (resources, prompts, tools) y README del MCP actualizados.
- TASK-005 — Verificación, cierre de la spec y notas de adopción por consumidor.

## Decisiones técnicas
- **Una sola fuente para la guía.** El texto vive en `design-guide.ts` (lo sirve el MCP), y el skill instalado recibe una copia generada en el build. Así no hay dos guías que se desincronicen.
- **Distribución por el paquete del MCP**, que ya instalan los consumidores que usan agentes. Un bin aparte (`tucu-ui-skill`) evita tocar el arranque del servidor stdio.
- **Parámetros opt-in:**
  - `style` mapea a un preset y una superficie (`glass` → GlassPanel/preset `glass`; `bold` → `vibrant`; `editorial` → `classic`; `clean` → `minimal`).
  - `density` mapea a las props de densidad existentes.
  - `motion` mapea a `MotionConfig` y a las props de animación.
  - Todos son documentados y sin valor por defecto.
- **Release:** minor `3.9.0` de la librería (por `MotionConfig`) y minor `0.15.0` del MCP, con OK del dueño por ciclo (2026-10-27).
