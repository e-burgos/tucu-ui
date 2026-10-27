# Prompt: Revisar y Cerrar Ciclo

> **Regla cero (⓪ del dual-harness):** antes de actuar escribí `Regla cero → tier · modelo · esfuerzo`
> y mantené el contexto mínimo.

> Para uso en cualquier monorepo que implemente SDD

## Cómo usarlo

```
Revisar el Ciclo [N] — Spec [spec-id] — Módulo [nombre].

Invocar el agente sdd-reviewer con el output completo del ciclo:
- Historias de usuario generadas
- Tasks del Planner
- Schema y contratos del Arquitecto
- Código del Implementador Backend
- Código del Implementador Frontend

Si el reviewer aprueba — realizar EN ESTE ORDEN:
0. ⛔ VALIDATION GATE (pre-review): correr pnpm sdd:validate
   → si falla, los registros del ciclo están mal estructurados: devolver al implementador
1. Actualizar sdd/global.json:
   - Mover [módulo] de in_progress_modules a completed_modules (apps[], cycles_completed, completed_at)
2. Actualizar cycle.json a status "completed" con reviewer_report
3. Confirmar que sdd/schema.json y sdd/api.json están actualizados
4. Dejar toda task del ciclo resuelta en sdd/specs/{spec-id}/cycles/cycle-[XX]/tasks.json:
   "done" la implementada, "skipped" la que no aplica (motivo en reviewer_report.notes y
   cuenta en metrics.tasks_skipped). skipped es un cierre válido, no un pendiente: nunca
   marcar "done" algo que no se hizo. Cierra cuando tasks_completed + tasks_skipped == tasks_total
   + regenerar índice (pnpm sdd:rebuild-tasks-index)
4c. ⛔ TELEMETRÍA GATE — OBLIGATORIO: consolidar cycle.json → metrics.usage. No es una
   estimación nueva del reviewer — es la SUMA de lo que cada unidad ya registró al cerrar:
   → Verificar que metrics.usage.by_agent[] está completo: una entrada por cada task
     "done" de tasks.json, una por cada documento del ciclo (functional/planner/architect),
     una del orquestador (si consumió tokens propios coordinando) y, al final, la del
     reviewer mismo. Si falta alguna, volver al agente responsable — no inventarla acá.
   → Agregar la propia entrada del reviewer: { "agent": "reviewer", "provider_model",
     "effort", "tokens_in", "tokens_out", "approx", "source", "recorded_at" }.
   → Derivar by_tier agrupando by_agent por provider_model (claude/opus, gemini/pro,
     copilot/claude-sonnet; Antigravity va bajo gemini/*) — nunca escribir by_tier a mano.
   → Sumar tokens_in/tokens_out top-level de metrics.usage a partir de by_agent.
   → Declarar proveedor y modelo no es opcional: el modelo siempre se conoce.
     Con contador (reporte de sesión en Claude Code, /stats en Gemini CLI — pedíselos al
     dev, el agente no puede ejecutarlos): approx false + source correspondiente. Sin
     contador (Copilot, Antigravity): estimación de orden de magnitud con approx: true y
     source: "declared-estimate". NUNCA omitir el campo.
   → El ciclo NO se cierra ("completed") sin metrics.usage con by_agent completo y la
     suma consistente (sum(by_agent) == by_tier == top-level).
   → Además: usage en cada fix validado/absorbido este ciclo (ver hotfix-bypass-gate.prompt.md)
4b. ⛔ VALIDATION GATE (post-cierre): pnpm sdd:validate DEBE quedar en verde
   → registrar el resultado en reviewer_report.tests["sdd:validate"]
   → el mismo check corre en CI (sdd-validate.yml): un cierre en rojo rompe el PR
5. ⛔ CONTEXTO GATE — OBLIGATORIO — no cerrar el ciclo sin completar:
   a. Escribir el fragmento aditivo del subproyecto (NO editar constitution.md ni
      context_prompt.md del subproyecto durante el ciclo — regla 🧩 del dual-harness):
      sdd/context/[apps|libs|tools]/[nombre]/updates/YYYY-MM-DD-[spec-id]-cycle-[XX].md
      → solo el delta: Estado / Estructura / Dependencias / Qué sigue
      → si algo "pendiente" del base quedó implementado, anotarlo como "resuelve: ..."
      → NO tocar la línea "Última actualización:" del base (solo cambia al consolidar)
   b. Actualizar sdd/context/constitution.md (global)
      → solo la fila del subproyecto en la tabla-snapshot (sección 3)
      → agregar fila nueva al final si se creó un nuevo app/lib/tool
   c. Actualizar sdd/context/context_prompt.md (global)
      → agregar fila nueva al final si se creó un nuevo app/lib/tool
   d. Si updates/ del subproyecto acumula ≥5 fragmentos → consolidar (un solo actor):
      fundir fragmentos en los archivos base, actualizar encabezado, borrar fragmentos,
      commit dedicado "chore(sdd): consolidate context updates for [nombre]"

Si requiere cambios:
1. Identificar el agente responsable de cada issue
2. Re-ejecutar solo ese agente con el issue específico
3. Re-ejecutar el reviewer
```

---

## ⛔ CONTEXTO GATE — Regla de frescura

El contexto vigente de un subproyecto = archivos base + `updates/*.md` en orden de
nombre (el prefijo de fecha ordena solo). Se considera **desactualizado** (= ciclo NO
cerrado) si:

- No existe fragmento en `updates/` para el ciclo que se está cerrando
- El conjunto base+fragmentos describe estructura de paquetes que no coincide con el código real
- El conjunto base+fragmentos menciona como "pendiente" funcionalidad ya implementada sin fragmento que lo corrija
- Le faltan dependencias o patrones que sí existen en el código

**El reviewer NO puede marcar el ciclo como `completed` en `cycle.json` mientras el contexto esté desactualizado.**
