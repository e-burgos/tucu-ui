---
name: sdd-planner
description: Skill del Agente Planner SDD. Convierte historias de usuario en tasks técnicas ordenadas y estimadas. Invocar después del Funcional, en paralelo con el Arquitecto.
---

# Skill: sdd-planner

## Input que necesita

- `functional.md` del ciclo — historias de usuario y requisitos (output del Funcional)
- `brief.yaml` del ciclo — objetivo y alcance
- `sdd/schemas/cycle-tasks.schema.json` — schema del archivo de tasks a generar
- Stack del subproyecto: `sdd/context/[apps|libs|tools]/[nombre]/constitution.md` (nunca asumir un stack)

## Archivos que genera / modifica

- `sdd/specs/{spec-id}/cycles/cycle-[XX]/planner.md` — sprint plan legible
- `sdd/specs/{spec-id}/cycles/cycle-[XX]/tasks.json` — tasks canónicas del ciclo
  (template en `sdd-file-structure` §3.3b; luego `pnpm sdd:rebuild-tasks-index && pnpm sdd:validate`)

## Reglas de descomposición (expertise del rol)

1. **Una task = una acción técnica verificable de ≤ 1 día** (máx 5 SP). Si supera 8h → dividirla.
2. **IDs:** `TASK-[NNN]` (`TASK-001`, `TASK-002`…) — el scope es el archivo del ciclo, sin prefijo de spec/ciclo.
3. **Toda task cubre al menos una HU** (`user_stories`); `[]` solo si el ciclo es `flow: "reduced"` o `"lite"`.
4. **`estimation_hours` y `story_points` obligatorios.** Escala: ≤1h→1SP · 2h→2SP · 3h→3SP · 4h→5SP · >5h→8SP.
5. **Camino crítico explícito:** `depends_on` solo con IDs del mismo archivo; identificar qué bloquea qué.
   Ordenar las tasks para que las dependencias siempre apunten hacia arriba (orden topológico).
6. **Frontend después de backend:** una task de UI que consume un endpoint depende de la task que lo implementa.
7. **Tests son tasks de primera clase:** toda HU con criterios de aceptación produce al menos una task de tests.
8. **Status inicial:** todas las tasks nacen `"pending"` con `files: []` — los implementadores las completan.
9. No inventar campos fuera del schema (`additionalProperties: false`).

## Registro de consumo (obligatorio)

Ver `sdd/agents/sdd-planner.agent.md` § Registro de consumo: push de tu entrada en
`cycle.json → metrics.usage.by_agent[]` al terminar `planner.md`/`tasks.json` — no tenés fila
propia en `tasks.json` (esa la llenan los implementadores por task).
