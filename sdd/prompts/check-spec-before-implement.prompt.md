# Prompt: Verificar SPEC GATE antes de implementar

> **Regla cero (⓪ del dual-harness):** antes de actuar escribí `Regla cero → tier · modelo · esfuerzo`
> y mantené el contexto mínimo.

> Usar este prompt SIEMPRE antes de escribir código de implementación. Fuente canónica del
> gate: `sdd/dual-harness/rules/sdd-gates.md`.

## Qué es el SPEC GATE

Garantiza que ninguna implementación arranca sin el flujo de diseño SDD. Tiene dos momentos:
**A** (¿se puede abrir un ciclo?) y **B** (¿se puede escribir código en este ciclo?). Este
prompt es el **GATE B**: lo responde un comando, no una lectura a mano.

## Cómo usar

```bash
pnpm sdd:gate <spec-id|slug> cycle-[XX]
```

Pegar la salida completa como reporte del gate. El script lee el `flow` del ciclo y exige los
documentos de **ese** flow:

```
SPEC GATE B — implementación · spec-[…] · cycle-[XX] (flow: full|reduced|lite)
  B1. cycle.json existe con status in-progress
  B2. Módulo en in_progress_modules de global.json
  B3. tasks.json del ciclo con al menos una task
  B4. Documentos del flow: full → brief/functional/planner/architect · reduced → brief · lite → plan.md
  B5. constitution.md de cada subproyecto de cycle.json → apps[]
→ APPROVED / BLOCKED
```

**`APPROVED` → puede continuar a implementación.**
**`BLOCKED` → cero líneas de código: completar los pasos faltantes y volver a correrlo.**

> Una spec `draft` (sin ciclo abierto) nunca pasa el GATE B: primero el sdd-orchestrator corre
> el GATE A y abre el ciclo (`sdd/prompts/start-sdd-cycle.prompt.md`).

## Cómo completar lo que falta (solo lo que el script señala)

| Falta                                   | Quién lo resuelve                                                                                     |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| `cycle.json` / módulo no in-progress    | sdd-orchestrator abre el ciclo (GATE A + `start-sdd-cycle.prompt.md`)                                 |
| `brief.yaml`                            | sdd-orchestrator (template: `sdd-file-structure` §3.1)                                                |
| `functional.md`                         | sdd-functional con el brief                                                                            |
| `planner.md` / `tasks.json`             | sdd-planner con las historias (§3.5, §3.3b) + `pnpm sdd:rebuild-tasks-index`                          |
| `architect.md`, `schema.json`, `api.json` | sdd-architect con las historias (§3.6)                                                              |
| `plan.md` (flow lite)                   | el mismo actor que abrió el ciclo (§3.8)                                                              |
| `constitution.md` del subproyecto       | `harness add app|lib` lo genera; si el subproyecto ya existe sin contexto, crearlo desde el template de `sdd-file-structure` §2.3 |
| La spec no existe                       | `npx @e-burgos/sdd-harness add spec <slug> --apps apps/<app>` (registra índice + `pending_modules`) |

Leer el template de un artefacto **solo cuando toca escribirlo** — no cargar
`sdd-file-structure` ni `sdd-data-schemas` enteras para contestar el gate.

## Ejemplo de uso

```
Antes de implementar TASK-003 del módulo "migration-legacy", ciclo 1:
pnpm sdd:gate migration-legacy cycle-01 → APPROVED (flow: full)
```
