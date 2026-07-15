---
name: publish
description: "Full publish workflow for @e-burgos/tucu-ui and @e-burgos/tucu-ui-mcp. INVOKE when the user says: 'publica tucu-ui', 'publica el mcp', 'publish tucu-ui', 'publish mcp', 'release', 'nueva versión', 'nueva release', 'bump version', 'lanzar versión', 'hacer un patch', 'hacer un minor', 'hacer un major', or any variation asking to publish or release either package."
---

# Publish Skill — tucu-ui & tucu-ui-mcp

Workflow completo y orquestado para publicar uno o ambos paquetes del monorepo.

---

## Paquetes

| Paquete                 | Directorio          | Tag prefix  | npm                                                 |
| ----------------------- | ------------------- | ----------- | --------------------------------------------------- |
| `@e-burgos/tucu-ui`     | `ui/tucu-ui/`       | `tucu-ui-v` | https://www.npmjs.com/package/@e-burgos/tucu-ui     |
| `@e-burgos/tucu-ui-mcp` | `tools/mcp-server/` | `mcp-v`     | https://www.npmjs.com/package/@e-burgos/tucu-ui-mcp |

---

## Workflow Completo (pasos obligatorios en orden)

### Paso 0 — Verificar y preparar rama de trabajo

**Antes de cualquier otra acción**, verificar en qué rama se está trabajando:

```bash
git branch --show-current
```

#### Si la rama actual es `main`:

1. Determinar la versión del release (puede hacerse a continuación en el Paso 3, pero si el usuario ya la indicó, usarla aquí directamente).
2. Crear una nueva rama de release **a partir de `main`** con el formato `release/v<version>`:

   ```bash
   git checkout -b release/v<version>
   ```

   Ejemplo: `git checkout -b release/v2.5.0`

   > Si aún no se conoce la versión exacta (porque el tipo de bump se pregunta en el Paso 3), crear la rama con un nombre provisional como `release/next` y **renombrarla** al confirmar la versión:
   >
   > ```bash
   > git checkout -b release/next
   > # ... tras determinar la versión ...
   > git branch -m release/next release/v<version>
   > ```

3. Informar al usuario:
   ```
   ⚠️  Estabas en 'main'. Se creó la rama 'release/v<version>' a partir de main.
   Todos los commits del release irán a esta rama y se abrirá un PR hacia main al finalizar.
   ```

#### Si la rama actual ya es una rama de release o feature:

- Continuar sin crear ninguna rama nueva.
- Informar al usuario la rama activa: `ℹ️  Trabajando en la rama '<branch>'.`

#### Nunca commitear directamente en `main`:

> ⚠️ REGLA ABSOLUTA: Todos los commits del proceso de release (CHANGELOG, bump de versión, tags) deben ir en una rama dedicada. **Nunca** en `main` directamente.

---

### Paso A — Consultar qué publicar

**Pregunta al usuario** (si no lo indicó explícitamente):

> ¿Qué deseas publicar?
>
> - `tucu-ui` — Solo la librería de componentes
> - `mcp` — Solo el MCP server
> - `ambas` — Ambos paquetes (MCP primero, luego tucu-ui)

**Regla de orden**: Si se publican ambas, SIEMPRE se publica **MCP primero** y luego **tucu-ui**.

---

### Paso 1 — Revisar cambios y actualizar documentación

Para cada paquete seleccionado:

1. Obtener commits desde el último tag del paquete:
   ```bash
   git log $(git tag -l "<prefix>*" --sort=-version:refname | head -1)..HEAD --pretty=format:"%s" --no-merges
   ```
2. Clasificar commits según conventional commits (feat→Added, fix→Fixed, etc.)
3. Generar entrada en `CHANGELOG.md` del paquete correspondiente:
   - tucu-ui: `ui/tucu-ui/CHANGELOG.md`
   - mcp: `tools/mcp-server/CHANGELOG.md`
4. Actualizar badges de versión y comandos de install en README:
   - tucu-ui: `README.md` (root)
   - mcp: `tools/mcp-server/README.md`

---

### Paso 2 — Sincronizar MCP con la librería (solo si se publica MCP o ambas)

Si se está publicando el MCP (solo o junto con tucu-ui):

1. Revisar los cambios recientes en `ui/tucu-ui/src/` para identificar:
   - Componentes nuevos
   - Props modificadas
   - Componentes eliminados o renombrados
2. Verificar que los archivos de contexto del MCP están actualizados:
   - `tools/mcp-server/src/resources/` — resources con catálogo, tokens, etc.
   - `tools/mcp-server/src/tools/` — tools de generación
3. Si hay desincronización, **informar al usuario** qué archivos del MCP necesitan actualización y preguntar si desea actualizar ahora o publicar tal cual.

> ⚠️ No actualizar automáticamente sin confirmación — los cambios en el MCP deben ser validados.

---

### Paso 3 — Determinar versionado

Para cada paquete seleccionado:

1. Leer la versión actual desde `package.json`:
   ```bash
   node -p "require('./ui/tucu-ui/package.json').version"       # tucu-ui
   node -p "require('./tools/mcp-server/package.json').version"  # mcp
   ```
2. Mostrar la versión actual al usuario
3. **Preguntar tipo de bump** (si no lo indicó):

   | Tipo    | Cuándo                                                       |
   | ------- | ------------------------------------------------------------ |
   | `patch` | Bugfixes, docs, config, refactors internos                   |
   | `minor` | Nuevas features compatibles hacia atrás                      |
   | `major` | Breaking changes: API rota, props renombradas, eliminaciones |

4. Calcular y mostrar la versión resultante al usuario para confirmación
5. Verificar que la versión no exista en npm:
   ```bash
   npm view @e-burgos/tucu-ui@<version> version 2>/dev/null
   npm view @e-burgos/tucu-ui-mcp@<version> version 2>/dev/null
   ```

---

### Paso 4 — Commitear cambios pendientes

1. Revisar el estado del repositorio:
   ```bash
   git status
   git diff --stat          # cambios no staged
   git diff --cached --stat # cambios staged
   ```
2. Si hay cambios sin commitear:

   - Agrupar archivos por contexto lógico (library, mcp, docs, config)
   - Crear commits con mensajes descriptivos usando conventional commits
   - Ejemplo de agrupación:

     ```bash
     git add ui/tucu-ui/...
     git commit -m "feat(tucu-ui): add new Button variants"

     git add tools/mcp-server/...
     git commit -m "feat(mcp): sync catalog with library changes"

     git add docs/ README.md CHANGELOG.md
     git commit -m "docs: update changelog and readme for release"
     ```

3. Si todos los cambios son del release (CHANGELOG, README, version bumps), commitearlos juntos:
   ```bash
   git add -A
   git commit -m "chore: prepare release <package>@<version>"
   ```

---

### Paso 5 — Verificar autenticación npm (solo si se usará `--local-publish`)

> El flujo normal (Paso 6 sin `--local-publish` + push del tag en Paso 8)
> **no necesita esto** — el pipeline publica con su propio token de CI. Este
> paso solo aplica al modo de emergencia.

Si existe un `NPM_TOKEN` en la raíz del repo en `.env.local` (gitignored, el
mismo automation token que ya está en el secret `NPM_TOKEN` de GitHub
Actions) o exportado en el shell, `--local-publish` lo usa automáticamente
para autenticar — **sin pedir OTP**, igual que en CI. En ese caso este Paso 5
no aplica; saltar directo al Paso 6.

Si no hay `NPM_TOKEN` disponible, `--local-publish` cae al login interactivo:

1. Verificar login:
   ```bash
   npm whoami
   ```
2. Si falla o no muestra `e-burgos`:
   - **Informar al usuario** que debe loguearse
   - Indicar que ejecute en la terminal:
     ```bash
     npm login
     ```
   - **NUNCA ejecutar npm login desde el agente** — requiere interacción del usuario (OTP por email/authenticator)
   - Esperar a que el usuario confirme que se logueó
   - Verificar nuevamente con `npm whoami`

> ⚠️ **El agente nunca lee, imprime ni repite el valor de `NPM_TOKEN`** —
> ni desde `.env.local` ni desde el entorno. El script lo usa internamente
> (variable de entorno del subproceso `npm publish`), pero jamás debe
> aparecer en la salida de una terminal que el agente vea.

---

### Paso 5b — Verificar versión del MCP en tucu-ui (solo si se publica tucu-ui)

Antes de publicar tucu-ui, verificar que `ui/tucu-ui/package.json` referencia la **última versión publicada** del MCP:

1. Obtener la versión más reciente del MCP en npm:
   ```bash
   npm view @e-burgos/tucu-ui-mcp version
   ```
2. Comparar con la dependencia en `ui/tucu-ui/package.json`:
   ```bash
   node -p "require('./ui/tucu-ui/package.json').dependencies['@e-burgos/tucu-ui-mcp']"
   ```
3. Si no coincide (ej: `^0.4.2` pero la última es `0.5.0`):
   - Actualizar la referencia en `ui/tucu-ui/package.json`:
     ```json
     "@e-burgos/tucu-ui-mcp": "^<latest_version>"
     ```
   - Informar al usuario del cambio
   - Si se publican ambas en este mismo workflow, usar la nueva versión del MCP que se va a publicar

> ⚠️ Esta verificación es OBLIGATORIA. Nunca publicar tucu-ui con una referencia al MCP desactualizada.

---

### Paso 6 — Preparar el release (bump + build + tag, SIN publicar)

**El publish real a npm ahora lo hace un pipeline de GitHub Actions, disparado
por el push del tag.** Este paso solo prepara todo localmente y crea el tag —
no toca npm.

**Orden**: Si son ambos paquetes → MCP primero, luego tucu-ui (igual que antes,
por la sincronización de la dependencia `@e-burgos/tucu-ui-mcp` en Paso 5b).

```bash
# MCP
node scripts/publish.mjs mcp <patch|minor|major>

# tucu-ui
node scripts/publish.mjs tucu-ui <patch|minor|major>
```

Cada corrida: bump de versión, CHANGELOG, README, build, verificación de
artifacts, commit y `git tag <prefix><version>`. No publica nada en npm ni
hace deploy — eso lo dispara el push del tag en el Paso 8.

> ℹ️ La versión en `http-server.ts` / `server.ts` del MCP se lee dinámicamente
> desde `package.json` — no requiere cambios manuales en el código fuente.

#### Modo emergencia: publicar directo desde la máquina local

Si el pipeline no está disponible o hay una emergencia, agregar
`--local-publish` para que el script publique directo y, para el MCP, haga
`flyctl deploy` al final:

```bash
node scripts/publish.mjs mcp <patch|minor|major> --local-publish
node scripts/publish.mjs tucu-ui <patch|minor|major> --local-publish
```

Autentica con `NPM_TOKEN` (de `.env.local` o del entorno) si está disponible
— sin OTP. Si no, cae a la sesión de `npm login` del Paso 5 (con OTP).

Este modo requiere `npm whoami` autenticado (ver Paso 5) y `flyctl` instalado
para el MCP (`brew install flyctl && flyctl auth login`).

---

### Paso 7 — (Automático) Publish y deploy vía pipeline

Al pushear el tag en el Paso 8, GitHub Actions se encarga solo:

| Tag pusheado    | Workflow                                | Qué hace                                                    |
| --------------- | ---------------------------------------- | ------------------------------------------------------------ |
| `tucu-ui-v*.*.*` | `.github/workflows/publish-tucu-ui.yml` | build → verifica versión y artifacts → `npm publish`         |
| `mcp-v*.*.*`     | `.github/workflows/publish-mcp.yml`     | build → verifica versión → `npm publish` → `flyctl deploy`   |

Ambos workflows publican con un **npm automation token** guardado en el
secret `NPM_TOKEN` del repo — no piden OTP porque los automation tokens de
npm están pensados para CI (ver sección "Setup de infraestructura" al final
de este skill para crear el token si aún no existe).

Seguir el progreso en la pestaña **Actions** del repo, o con:

```bash
gh run watch
```

> Nota: `deploy-mcp.yml` sigue existiendo por separado y redeploya fly.io en
> cada push a `main` (mantiene el servidor vivo sincronizado con el código más
> reciente, independiente de si hubo un release de npm). El deploy de
> `publish-mcp.yml` es el mismo `flyctl deploy`, pero anclado específicamente
> a la versión recién publicada.

---

### Paso 8 — Push del tag (dispara el pipeline) y PR

1. **Preguntar al usuario** antes de pushear — acción irreversible en remoto:

   ```bash
   git push origin <branch>
   git push origin <prefix><version>   # este push dispara el publish en CI
   ```

   > ⚠️ Empujar el tag es lo que efectivamente publica el paquete. No hay
   > vuelta atrás sencilla una vez que el workflow corre `npm publish`.

2. Verificar que el workflow correspondiente terminó bien:

   ```bash
   gh run list --workflow=publish-tucu-ui.yml --limit 1   # si se publicó tucu-ui
   gh run list --workflow=publish-mcp.yml --limit 1       # si se publicó mcp
   ```

3. Verificar publicación en el registro:

   ```bash
   npm view @e-burgos/tucu-ui version          # si se publicó tucu-ui
   npm view @e-burgos/tucu-ui-mcp version       # si se publicó mcp
   ```

4. Mostrar resumen al usuario:

   ```
   ✅ Publicación completada (vía pipeline):
   - @e-burgos/tucu-ui: X.Y.Z → A.B.C (npm ✓)
   - @e-burgos/tucu-ui-mcp: X.Y.Z → A.B.C (npm ✓, fly.io ✓)
   ```

5. Si la rama fue creada desde `main` (Paso 0), **crear un PR** hacia `main`:

   ```bash
   gh pr create \
     --title "release: @e-burgos/<package>@<version>" \
     --body "Release automático generado por el agente de publish.

   ## Cambios incluidos
   - Bump de versión: X.Y.Z → A.B.C
   - CHANGELOG actualizado
   - README actualizado

   Ver detalles completos en CHANGELOG.md" \
     --base main \
     --head <branch>
   ```

   Informar al usuario con la URL del PR creado.

---

## Scripts de soporte

Un único script consolidado, parametrizado por paquete:

```bash
node scripts/publish.mjs <tucu-ui|mcp> <patch|minor|major> [flags]
node scripts/publish.mjs <tucu-ui|mcp> publish [--skip-build] [flags]  # publica la versión actual, sin bump
```

### Flags

| Flag              | Efecto                                                              |
| ----------------- | --------------------------------------------------------------------- |
| `--dry-run`       | Simula todo sin aplicar cambios ni publicar                           |
| `--skip-docs`     | Salta la actualización de CHANGELOG y README                          |
| `--skip-git`      | Salta verificación de working tree limpio y commit/tag final          |
| `--local-publish` | Publica directo desde la máquina local en vez de vía CI (usa `NPM_TOKEN` sin OTP si está disponible; si no, cae a `npm login` con OTP) |
| `--otp=123456`    | OTP a pasar a `npm publish` cuando se usa `--local-publish` sin `NPM_TOKEN` |

### pnpm shortcuts

```bash
# tucu-ui
pnpm tucu-ui:publish:patch
pnpm tucu-ui:publish:minor
pnpm tucu-ui:publish:major
pnpm tucu-ui:publish:dry

# mcp
pnpm mcp:publish:patch
pnpm mcp:publish:minor
pnpm mcp:publish:major
pnpm mcp:publish:dry
```

---

## Troubleshooting

| Problema                                  | Solución                                                                          |
| ------------------------------------------ | ------------------------------------------------------------------------------------ |
| `Version X.Y.Z already exists on npm`      | Elegir un tipo de bump diferente                                                     |
| Workflow falla en "Verify tag matches..."  | El tag no coincide con la versión del `package.json` — revisar que se pusheó el tag correcto |
| Workflow falla en `npm publish` (401/403)  | El secret `NPM_TOKEN` expiró o no tiene permisos — regenerar (ver Setup más abajo)   |
| `403 Forbidden` / `401 Unauthorized` (local) | `npm login` y verificar pertenencia a org `e-burgos` (solo aplica a `--local-publish`) |
| Build falla                                | Revisar errores: `pnpm nx run <project>:lint`                                        |
| `git tag` ya existe                        | Borrar: `git tag -d <tag>` y re-ejecutar                                             |
| `flyctl: command not found` (local)        | `brew install flyctl && flyctl auth login`                                          |
| OTP no llega (solo `--local-publish`)      | Verificar email/authenticator configurado en npmjs.com                              |
| Tag pusheado pero el workflow no corrió    | Revisar que el nombre del tag matchea el patrón exacto (`tucu-ui-v*.*.*` / `mcp-v*.*.*`) |

---

## Setup de infraestructura (una sola vez)

El pipeline necesita un secret `NPM_TOKEN` en el repo de GitHub. Si aún no
existe (o expiró), crearlo así:

1. En [npmjs.com](https://www.npmjs.com) → perfil → **Access Tokens** →
   **Generate New Token** → **Granular Access Token**.
2. Tipo: **Automation** (no requiere OTP en cada publish, pensado para CI).
   Scope: publish en `@e-burgos/tucu-ui` y `@e-burgos/tucu-ui-mcp` (o toda la
   org `e-burgos` si se prefiere no tener que regenerarlo al agregar paquetes).
3. Copiar el token generado (solo se muestra una vez).
4. Agregarlo como secret del repo:

   ```bash
   gh secret set NPM_TOKEN
   # pega el token cuando lo pida — o hacerlo desde
   # GitHub → Settings → Secrets and variables → Actions → New repository secret
   ```

> ⚠️ **El agente nunca debe generar, ver, ni pegar el valor de este token.**
> Es una acción 100% manual del usuario — crear el token requiere su login y
> 2FA en npmjs.com, y pegarlo en `gh secret set` expone el valor en la
> terminal del agente si este ejecuta el comando.

`FLY_API_TOKEN` (usado tanto por `deploy-mcp.yml` como por
`publish-mcp.yml`) ya debería existir si el deploy a fly.io funciona hoy —
no requiere ninguna acción adicional.

---

## Notas importantes

- **El agente NUNCA ejecuta `npm login`, ni genera/pega tokens de npm o GitHub** — siempre lo hace el usuario interactivamente
- **El agente NUNCA hace `git push`** sin confirmación explícita del usuario — y pushear el tag de release es lo que dispara el publish real, así que la confirmación es doblemente importante
- **Publish real = CI, no local**: por defecto el script solo prepara (bump, changelog, build, tag). `--local-publish` es exclusivamente para emergencias con el pipeline caído
- **Si se publican ambas**: MCP primero, tucu-ui después (por la sincronización de dependencia en Paso 5b)
- **Los scripts con `--skip-git`** permiten que el agente maneje commits de forma granular antes de publicar
- **OTP**: solo aparece con `--local-publish`; el flujo normal vía CI no lo necesita porque el `NPM_TOKEN` es un automation token
