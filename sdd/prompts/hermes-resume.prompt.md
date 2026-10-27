# Prompt: Retomar el loop hermes desde los registros

> **Regla cero (⓪ del dual-harness):** antes de actuar escribí `Regla cero → tier · modelo · esfuerzo`
> y mantené el contexto mínimo.

> Prompt standalone para reanudar el punta-a-punta (skill `sdd-hermes`) en una sesión
> nueva, un cron/Routine o un `/loop`. No asume memoria de sesiones anteriores: TODO el
> estado vive en los registros SDD.

Sos el conductor del loop SDD de este repo. Retomá el trabajo exactamente donde quedó:

1. **Presupuesto y entorno primero** (regla ⚙️ del dual-harness): decidí el tier de
   modelo/esfuerzo propio y de cada subagente antes de ejecutar nada — la equivalencia
   por proveedor (Claude/Gemini/Copilot) está en la tabla canónica ⚙️; en Antigravity,
   verificá el dropdown y pedí el cambio si no coincide con el tier. Si
   `NX_WORKSPACE_ROOT_PATH` está definida y no apunta al cwd, cualquier comando de la
   CLI (`init`, `add`, `update`, los scripts `sdd:*`) puede ejecutar contra el repo
   equivocado sin error visible — corregila o avisá al dev antes de continuar.
2. **Cargar memoria y estado** (barato, en este orden):
   - `sdd/memory/lessons.md` — completo (MEMORIA GATE).
   - `harness.idea.md` (si existe) — idea, evidencia del descubrimiento y decisiones del
     dev ya registradas.
   - `harness.config.json` (si existe) — stack decidido.
   - `sdd/global.json` — módulos `in_progress` y `pending`.
   - `sdd/specs/index.json` — specs activas y su `status`.
3. **Declarar en qué FASE está el loop (1 a 5)**, a partir de qué archivos existen —
   nunca asumir, leer:
   - Solo `harness.idea.md` existe, sin la sección "Evidencia del descubrimiento"
     completa → **FASE 1** (descubrimiento incompleto): retomar ahí, no avanzar a stack.
   - `harness.config.json` existe con `project.name` distinto de `my-project` y
     `description` sin `TODO`, pero **no** existe `sdd/global.json` → **FASE 2 aprobada /
     FASE 3 pendiente**: el stack ya fue decidido y aprobado por el usuario, falta
     generar el workspace. Correr `init --config ./harness.config.json` **en el cwd**
     (no crea subcarpeta si el cwd ya contiene ese config o `basename(cwd) ==
     project.name`) y dejar el gate de FASE 3 (`sdd:validate` + lint/test/build) en verde
     antes de seguir.
   - `sdd/global.json` existe y hay `nx.json` o `package.json` de workspace, pero las
     specs de `sdd/specs/index.json` están en `status: "draft"` sin ningún ciclo abierto,
     o `pending_modules` está vacío mientras la idea lista módulos sin sembrar →
     **FASE 4**: falta convertir los módulos del descubrimiento en specs (`add spec` o el
     sembrado de `sdd.modules` del config) antes de abrir el primer ciclo.
   - `pending_modules`/`in_progress_modules` tienen entradas con ciclos ya abiertos o
     completados → **FASE 5** (el caso más común — diagnóstico de posición dentro del
     loop, paso 4).
4. **Diagnóstico de posición dentro de FASE 5** — elegir UNA de estas situaciones y
   actuar (una spec `draft` nunca se implementa directamente: primero el orquestador
   abre su cycle-01 y la pasa a `in-progress`):
   - **Hay un ciclo `in-progress`** (buscar el `cycle.json` del módulo in_progress):
     continuar ese ciclo en la fase que corresponda — tasks `pending`/`in-progress` →
     implementadores; todas `done` (con `usage` completo) → `sdd-reviewer` para el cierre.
   - **No hay ciclo abierto y quedan `pending_modules`**: iniciar el siguiente por orden de
     dependencias vía `sdd-orchestrator` (SPEC GATE completo; la spec pasa `draft →
     in-progress` al crear cycle-01).
   - **No hay ciclo abierto ni pendientes**: el backlog está agotado — correr
     `pnpm sdd:validate` y `build`/`tests`, reportar el estado final y NO inventar trabajo.
5. **Condiciones de corte** (idénticas a la skill `sdd-hermes` FASE 5): validación o tests
   rojos 2 veces en el mismo punto → parar y reportar; decisión de producto fuera de spec →
   preguntar; presupuesto agotado → cierre limpio del registro y reporte de posición.
6. **Al cerrar cada ciclo**: gates de siempre (CONTEXTO, MEMORIA, TELEMETRÍA). El GATE de
   telemetría exige `metrics.usage.by_agent[]` completo — una entrada por task `done`,
   por documento del ciclo (functional/planner/architect), por el orquestador y por el
   reviewer al cerrar (captando `agent-usage-notification` de cada subagente lanzado con
   la tool `Agent`) — con `by_tier` derivado de `by_agent`, y `usage` en cada fix del loop
   resuelto en `sdd/fixes.json`. El próximo resume parte de registros completos, no de
   reconstrucción. Declarar proveedor/modelo es obligatorio; sin contador (Copilot,
   Antigravity) va estimación declarada con `approx: true`, nunca omisión.

Regla de oro: si un registro y este prompt divergen, **manda el registro**.
