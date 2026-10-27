# 🧠 Memoria del proyecto — lecciones destiladas

> Versión 1.0 | Última destilación: (seed del kit v0.11.0)
> **Cap duro: 120 líneas.** Este archivo se lee COMPLETO al inicio de cada sesión de agente —
> cada línea acá cuesta tokens en todas las sesiones futuras. Si al destilar se supera el cap,
> primero podar lecciones obsoletas o absorbidas por constitutions/skills.

Reglas de este archivo (ver sección 🧠 MEMORIA GATE del dual-harness):

- **Solo lecciones destiladas**: una línea por lección, accionable, empezando por el verbo
  o la prohibición. Nada de narrativa ni historia — eso vive en `journal/`.
- **Nunca se edita durante un ciclo/fix**: las lecciones nuevas entran como entradas
  episódicas en `sdd/memory/journal/` y solo la destilación (un solo actor) las funde acá.
- **No duplicar** lo que ya dicen las constitutions, skills o el dual-harness: si una lección
  pertenece a un subproyecto concreto, va a su `constitution.md` en la consolidación de
  contexto; acá van las transversales al repo o al proceso.

## Proceso (cómo trabajan los agentes en este repo)

- Citar la evidencia y las decisiones desde `harness.idea.md` en las specs en vez de
  copiarlas a mano.

## Técnica (stack, herramientas, gotchas transversales)

- Verificar `NX_WORKSPACE_ROOT_PATH` antes de cualquier `nx …`: si apunta a otro repo,
  Nx ejecuta los targets de ESE repo sin error visible (pasó en Claude Code con otro
  directorio primario).
- No dar por verde un `init` sin correr `nx run-many -t lint test build`: `sdd:validate`
  no compila nada.

## Costo (qué gastó tokens/tiempo de más y cómo evitarlo)

- Registrar el consumo por unidad de trabajo al cerrarla (task, documento, fix): sin
  registro por agente el total del ciclo se reconstruye de memoria al final y el
  dashboard de Costos miente.
- Capturar `subagent_tokens` de la notificación de cada subagente (Claude Code) en el
  momento: es la única medición exacta gratuita y no se recupera después.
