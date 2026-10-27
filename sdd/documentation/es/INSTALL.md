# Instalación y actualización del framework SDD

## Actualizar un kit ya instalado (lo más común)

Si este repo ya tiene `sdd/` y salió una versión nueva del kit, **no hace falta nada
de lo que sigue** — un solo comando actualiza preservando todo lo tuyo:

```bash
npx @e-burgos/sdd-harness@latest update sdd
```

Qué hace, gobernado por los hashes de `sdd/kit.json`:

| Tipo de archivo | Qué pasa en el update |
| --- | --- |
| **Tus datos** — `global.json`, specs, ciclos, fixes, contextos, `memory/journal/` | **Jamás se tocan** |
| Archivos del kit **sin modificar** localmente (skills, agentes, prompts, schemas, scripts, visor) | Se reemplazan por la versión nueva |
| Archivos del kit **nuevos** en esta versión | Se agregan solos |
| Archivos del kit que **vos editaste** (típico: `dual-harness/AGENTS.md`/`CLAUDE.md`/`GEMINI.md`) | Tu versión queda intacta; la nueva aterriza al lado como `*.new` para que fundas a mano lo que te interese |

Al cierre regenera el catálogo, refresca los symlinks y corre `sdd:validate`. Si el
update lista conflictos `*.new`, fundilos (o pedíselo a tu agente) y borrá los `.new`.

---

# Instalación del framework SDD en un repo nuevo

Esta carpeta es una copia **limpia y portable** del sistema SDD: sin specs, fixes,
tasks ni contextos de ningún proyecto. Todos los registros están vacíos y validan
contra sus schemas.

## Pasos

1. **Copiar esta carpeta al repo destino como `sdd/`** (el nombre importa: scripts,
   prompts y agentes referencian rutas `sdd/...`):

   ```bash
   cp -R sdd-portable /path/al/repo/sdd
   ```

   Si el repo destino arranca de cero (sin workspace Nx), crear primero el workspace
   siguiendo `sdd/skills/scaffold-nx/SKILL.md` y los archivos de referencia de
   `sdd/templates/nx-workspace/` (`create-nx-workspace` + config raíz alineada).

2. **Registrar los scripts en el `package.json` raíz del repo destino:**

   ```json
   {
     "scripts": {
       "setup:agents": "node -e \"if(process.platform==='win32'){require('child_process').execSync('powershell -ExecutionPolicy Bypass -File sdd/scripts/setup-agents.ps1',{stdio:'inherit'})}else{require('child_process').execSync('bash sdd/scripts/setup-agents.sh',{stdio:'inherit'})}\"",
       "sdd:docs": "node sdd/docs/serve.mjs",
       "sdd:validate": "node sdd/scripts/validate-sdd.mjs",
       "sdd:gate": "node sdd/scripts/spec-gate.mjs",
       "sdd:rebuild-tasks-index": "node sdd/scripts/rebuild-tasks-index.mjs",
       "sdd:rebuild-catalog": "node sdd/scripts/rebuild-catalog.mjs"
     }
   }
   ```

3. **Generar los symlinks del arnés** (`.claude/`, `.github/`, `.agents/`, `.agent/`,
   `.gemini/`, `CLAUDE.md`/`AGENTS.md`/`GEMINI.md` raíz apuntando a `sdd/dual-harness/`):

   ```bash
   pnpm setup:agents
   ```

   El script **nunca destruye** lo que ya tenías: si `.claude/agents`, `.claude/skills`,
   `.claude/commands` o `.github/agents` son directorios reales del equipo, se conservan y los
   ítems del kit se enlazan adentro; si un nombre colisiona (tu propia
   `.github/skills/sdd-reviewer/`, un `AGENTS.md` raíz escrito a mano), lo tuyo queda y la
   versión del kit aparece al lado como `<nombre>.new`, listada al final para que la fusiones.

   También **siembra** `.github/copilot-instructions.md` desde
   `sdd/dual-harness/copilot-instructions.md` **solo si no existe** (es un archivo real, no un
   symlink: los lectores server-side de GitHub no los siguen). Si ya está, no se pisa nunca.

4. **Completar las plantillas** — buscar los marcadores `[...]`:
   - `sdd/global.json` → `project`, `description`, `monorepo` (apps/libs reales).
     **`project` y `description` son la única fuente de verdad del nombre y la descripción:
     ningún otro archivo de `sdd/` los hardcodea, todos apuntan acá.** Eso es lo que
     mantiene `sdd/` portable entre repos, y `pnpm sdd:validate` lo verifica.
   - `sdd/context/constitution.md` → visión, responsabilidades, principios, tablas
   - `sdd/context/context_prompt.md` → rol arquitectónico y estructura real
   - `sdd/context/[apps|libs|tools]/[nombre]/` → crear el contexto de cada subproyecto
     al generarlo con Nx (arranca vacío)

5. **Validar:**

   ```bash
   pnpm sdd:validate
   ```

6. (Opcional) **CI:** copiar el workflow de validación del repo origen
   (`.github/workflows/sdd-validate.yml`) para que todo PR que toque `sdd/**`
   corra `pnpm sdd:validate`.

## Perfil de trabajo (`team` | `solo`)

`sdd/global.json → profile` decide con qué **flow** se abren los ciclos nuevos: `team` (default,
puede omitirse) abre ciclos `full`; `solo` abre ciclos `lite` (un solo actor, `plan.md` en vez de
los cuatro documentos). Se puede fijar desde la CLI:

```bash
npx @e-burgos/sdd-harness init --profile solo          # al generar el repo
npx @e-burgos/sdd-harness configure sdd --profile team # en un repo ya generado
```

Con `init --config`, la misma opción va en el archivo de configuración:

```json
{ "sdd": { "profile": "solo" } }
```

La clave solo se escribe en `sdd/global.json` cuando la pasás; sin ella, el repo queda en `team`.
Después, el **sdd-steward** la cambia a pedido del dev. Detalle de los flows: `README.md` →
SPEC GATE.

## Qué incluye

| Carpeta / archivo  | Contenido                                                                                       |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| `agents/`          | Los 7 agentes del ciclo SDD + `sdd-steward` (conserje del kit)                                                                     |
| `skills/`          | 19 skills (ciclo SDD + sdd-hermes + sdd-steward + generadores de código + scaffold-nx + setup-graphify)       |
| `templates/`       | Scaffolding reproducible: nx-workspace, java-api, react-app, ts-lib — ver `templates/README.md` |
| `prompts/`         | Prompts de gates (SPEC GATE, FIX GATE, inicio/cierre de ciclo, hermes-resume)                   |
| `memory/`          | Memoria del proyecto: `lessons.md` destilado + `journal/` episódico (MEMORIA GATE)              |
| `pricing.json`     | Tarifas editables por proveedor del dashboard de Costos del visor (`claude/*`, `gemini/*`, `copilot/*`) |
| `tools.json`       | Interruptores de rtk (`enabled`, `auto_install`) y del mod de Claude Code (`claude_mod`) — dato del proyecto: `update sdd` no lo pisa |
| `schemas/`         | JSON Schemas estrictos de todos los registros                                                   |
| `scripts/`         | validate, spec-gate (`sdd:gate`), rebuild-tasks-index, rebuild-catalog, setup-agents (bash + PowerShell) los tres de rtk: `setup-rtk.mjs`, `rtk-hook.mjs`, `rtk-common.mjs`, `rule-zero-hook.mjs` (hook SessionStart que reinyecta la regla cero: modelo/esfuerzo/contexto; lo instala `setup-rtk.mjs` aunque rtk esté apagado), y `sdd-mod.mjs` (interruptor del mod de Claude Code) |
| `docs/`            | Visor portable y bilingüe de documentación (JS vanilla, cero deps)                               |
| `dual-harness/`    | CLAUDE.md / AGENTS.md / GEMINI.md para linkear en la raíz del repo, `copilot-instructions.md` (semilla de `.github/`) y `rules/` (gates y telemetría canónicos) |
| `context/`         | Plantillas de constitución y context prompt (global + example)                                  |
| `specs/`, `fixes/` | Vacíos, listos para las primeras specs y fixes                                                  |
| `*.json`           | Registros de estado vacíos y válidos (`sdd:validate` OK)                                        |

### rtk (opcional apagarlo)

La instalación y el `update sdd` dejan **rtk operativo solos**: `setup-agents` corre
`sdd/scripts/setup-rtk.mjs` al final, que mergea los hooks (`.claude/settings.json` y
`.gemini/settings.json`, sin pisar hooks propios) e instala el binario fuera del repo. El
`package.json` generado suma `sdd:rtk` y, si el proyecto no tenía uno propio, un `postinstall`
que lo repite: un clone nuevo queda listo con `pnpm install`. Si falla (red bloqueada, CI),
imprime **un** aviso con el comando de instalación manual y sigue: el kit funciona sin rtk.

```bash
pnpm sdd:rtk -- --status    # interruptor, binario y hooks
pnpm sdd:rtk -- --disable   # apagarlo (los hooks quedan inertes)
pnpm sdd:rtk -- --enable    # volver a prenderlo
```

El interruptor vive en `sdd/tools.json`; con `auto_install: false` nunca se descarga el binario.

### Mod de Claude Code (opcional, apagado)

`setup-agents` deja `sdd/skills/sdd-mod/` visible en `.claude/skills/` (y en ninguna carpeta de
otro agente). Viene apagado: `pnpm sdd:mod -- --enable` lo prende. Detalle en
[HOW-TO-USE-SDD.md](HOW-TO-USE-SDD.md#sdd-mod--el-sdd-dentro-de-claude-code-opcional-apagado-por-defecto).

Guía de uso completa: [HOW-TO-USE-SDD.md](HOW-TO-USE-SDD.md) · Referencia del sistema: [README.md](README.md)
