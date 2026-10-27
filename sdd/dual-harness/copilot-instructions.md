<!--
  Archivo REAL en .github/ a propósito (no symlink): los lectores server-side de GitHub
  (Copilot code review, features que leen blobs sin checkout) no siguen symlinks.
  `pnpm setup:agents` lo copia desde sdd/dual-harness/copilot-instructions.md SOLO si no existe;
  después es tuyo. El contenido canónico vive en sdd/ — este archivo es resumen + punteros.
-->

# Instrucciones para GitHub Copilot

Este repo usa **Spec-Driven Development (SDD)**. Nombre y descripción del proyecto:
`sdd/global.json`. Las reglas completas están en [AGENTS.md](../AGENTS.md) (fuente:
`sdd/dual-harness/AGENTS.md`) y el contexto en `sdd/context/context_prompt.md`. Leerlos antes
de cualquier cambio; al iniciar sesión leer también `sdd/memory/lessons.md`.

Reglas mínimas no negociables:

0. **REGLA CERO** (⓪ de AGENTS.md): antes de cualquier acción de una tarea nueva, una línea
   visible `Regla cero → tier · modelo · esfuerzo`; el tier más barato que cumpla.

1. **SPEC GATE** (fuente: `sdd/dual-harness/rules/sdd-gates.md`): ninguna línea de código de
   implementación sin spec registrada, `cycle.json` in-progress y `tasks.json`. Lo responde un
   comando: `pnpm sdd:gate <spec-id>` (abrir ciclo) · `pnpm sdd:gate <spec-id> cycle-XX`
   (implementar). `BLOCKED` = cero código.
2. **Flow del ciclo**: `full` (brief/functional/planner/architect), `reduced` o `lite` (un solo
   actor, `plan.md`). Lo fija `sdd/global.json → profile` (`team`/`solo`) o el prefijo
   `[LITE]`/`[FULL]`; queda escrito en `cycle.json → flow`.
3. **FIX GATE**: cambios sobre código existente se registran primero en `sdd/fixes.json`
   (prefijos `[HOTFIX]` `[BUGFIX]` `[IMPROVEMENT]`) — `sdd/prompts/hotfix-bypass-gate.prompt.md`.
4. **Tipado estricto**: todo `sdd/**/*.json` valida contra `sdd/schemas/*.schema.json`.
   Después de escribir cualquier registro: `pnpm sdd:validate` debe quedar en verde (también
   corre en CI).
5. **Modelo y esfuerzo antes de empezar** (regla ⚙️ de AGENTS.md): el tier más barato que
   cumpla; los agentes de `.github/agents/*.agent.md` llevan `model:` pinneado por rol. Al
   cerrar cada unidad de trabajo registrar `usage` (proveedor/modelo + tokens; en Copilot,
   estimación declarada con `approx: true`) — contrato en
   `sdd/dual-harness/rules/sdd-model-budget.md`.
6. Las tasks canónicas viven en `sdd/specs/{spec-id}/cycles/cycle-XX/tasks.json`;
   `sdd/tasks.json` es un índice generado (`pnpm sdd:rebuild-tasks-index`) — no editarlo a mano.
7. **Código sin comentarios**: la documentación vive en los documentos SDD, no en el código.
8. Código, commits y nombres en inglés; documentos SDD en el idioma del kit.
