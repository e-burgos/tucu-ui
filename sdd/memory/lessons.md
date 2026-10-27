# 🧠 Memoria del proyecto — lecciones destiladas

> Versión 1.1 | Última destilación: 2026-10-27 (journal de spec-e-burgos-001 y spec-e-burgos-002)
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
- Con implementadores en paralelo sobre un mismo checkout, prohibir `git stash`/`checkout`/
  `reset` en el brief; para comparar contra la base usar `git diff` o `git show HEAD:<path>`.

## Técnica (stack, herramientas, gotchas transversales)

- Verificar `NX_WORKSPACE_ROOT_PATH` antes de cualquier `nx …`: si apunta a otro repo,
  Nx ejecuta los targets de ESE repo sin error visible (pasó en Claude Code con otro
  directorio primario).
- No dar por verde un `init` sin correr `nx run-many -t lint test build`: `sdd:validate`
  no compila nada.
- Verificar la librería desde el paquete compilado (`pnpm tucu-ui:test-local` + la demo en el
  navegador) antes de cerrar un ciclo: los bugs de `dist` (dependencias inlineadas, CSS
  copiado, tipos a mano) no los ve ningún test unitario.
- Revertir `apps/demo/package.json`, `pnpm-lock.yaml` y los demás `package.json` que reescribe
  `test-local` antes de cualquier `git add`.
- Cubrir con un check automático de paridad todo lo que se publica fuera del grafo de JS
  (CSS copiado a `dist`, `.d.ts` escritos a mano).
- No encadenar comandos con `-n` (p. ej. `sed -n`, `grep -n`) en la misma línea que un
  `git commit`: el hook `block-no-verify` lo confunde con `--no-verify`.

## Costo (qué gastó tokens/tiempo de más y cómo evitarlo)

- Registrar el consumo por unidad de trabajo al cerrarla (task, documento, fix): sin
  registro por agente el total del ciclo se reconstruye de memoria al final y el
  dashboard de Costos miente.
- Capturar `subagent_tokens` de la notificación de cada subagente (Claude Code) en el
  momento: es la única medición exacta gratuita y no se recupera después.
- Ante una preview en blanco, leer `preview_logs` para confirmar el puerto real (la demo sirve
  en 3000 aunque `launch.json` diga 4200) antes de recargar.
