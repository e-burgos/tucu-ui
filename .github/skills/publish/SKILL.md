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

### Paso 5 — Verificar autenticación npm

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

### Paso 6 — Publicar en npm

**Orden**: Si son ambos paquetes → MCP primero, luego tucu-ui.

#### Publicar `@e-burgos/tucu-ui-mcp`:

```bash
# 1. Actualizar versión en http-server.ts (welcome page y health check)
node -e "
const fs = require('fs');
const v = '<NEW_VERSION>';
const file = './tools/mcp-server/src/http-server.ts';
let src = fs.readFileSync(file, 'utf8');
src = src.replace(/<span class=\\\"version\\\">v[^<]+<\/span>/, '<span class=\\\"version\\\">v' + v + '<\/span>');
src = src.replace(/res\.json\(\{ status: 'ok', version: '[^']+' \}\)/, \"res.json({ status: 'ok', version: '\" + v + \"' })\");
fs.writeFileSync(file, src);
console.log('http-server.ts actualizado a v' + v);
"

# 2. Build
pnpm nx run tucu-ui-mcp:build

# 3. Publish (npm solicita OTP automáticamente si 2FA está habilitado)
cd tools/mcp-server && npm publish --access public
```

#### Publicar `@e-burgos/tucu-ui`:

```bash
# 1. Build
pnpm nx run tucu-ui:build

# 2. Sync version en dist/ui/tucu-ui/package.json
node -e "
const fs = require('fs');
const p = './dist/ui/tucu-ui/package.json';
const pkg = JSON.parse(fs.readFileSync(p));
pkg.version = '<NEW_VERSION>';
fs.writeFileSync(p, JSON.stringify(pkg, null, 2) + '\n');
"

# 3. Publish desde dist
cd dist/ui/tucu-ui && npm publish --access public
```

> El publish con OTP funciona automáticamente — npm solicita el código en la terminal.

**Después de cada publicación exitosa**, crear commit y tag:

```bash
git add <archivos modificados>
git commit -m "chore: release @e-burgos/<package>@<version>"
git tag <prefix><version>
```

---

### Paso 7 — Deploy a fly.io (solo MCP)

Si se publicó el MCP:

```bash
cd tools/mcp-server && flyctl deploy
```

Verificar deploy:

```bash
curl https://tucu-ui-mcp.fly.dev/health
```

Si `flyctl` no está disponible:

```bash
brew install flyctl
flyctl auth login
```

---

### Paso 8 — Verificación final y push

1. Verificar publicación:

   ```bash
   npm view @e-burgos/tucu-ui version          # si se publicó tucu-ui
   npm view @e-burgos/tucu-ui-mcp version       # si se publicó mcp
   ```

2. Mostrar resumen al usuario:

   ```
   ✅ Publicación completada:
   - @e-burgos/tucu-ui: X.Y.Z → A.B.C (npm ✓)
   - @e-burgos/tucu-ui-mcp: X.Y.Z → A.B.C (npm ✓, fly.io ✓)
   ```

3. **Preguntar al usuario** si desea push a origin:

   ```bash
   git push origin <branch> --tags
   ```

   > ⚠️ Acción irreversible en remoto — SIEMPRE pedir confirmación.

4. Si la rama fue creada desde `main` (Paso 0), **crear un PR** hacia `main` al finalizar el push:

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

Los scripts individuales están disponibles para uso directo o desde el agente:

```bash
# tucu-ui (gestión completa)
node scripts/publish.mjs [--dry-run] [--skip-docs] [--skip-git] <patch|minor|major>

# mcp (gestión completa)
node scripts/publish-mcp.mjs [--dry-run] [--skip-docs] [--skip-git] <patch|minor|major>
```

### Flags

| Flag          | Efecto                                                       |
| ------------- | ------------------------------------------------------------ |
| `--dry-run`   | Simula todo sin aplicar cambios ni publicar                  |
| `--skip-docs` | Salta la actualización de CHANGELOG y README                 |
| `--skip-git`  | Salta verificación de working tree limpio y commit/tag final |

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

| Problema                              | Solución                                                                 |
| ------------------------------------- | ------------------------------------------------------------------------ |
| `Version X.Y.Z already exists on npm` | Elegir un tipo de bump diferente                                         |
| `403 Forbidden` / `401 Unauthorized`  | `npm login` y verificar pertenencia a org `e-burgos`                     |
| Build falla                           | Revisar errores: `pnpm nx run <project>:lint`                            |
| `git tag` ya existe                   | Borrar: `git tag -d <tag>` y re-ejecutar                                 |
| `flyctl: command not found`           | `brew install flyctl && flyctl auth login`                               |
| OTP no llega                          | Verificar email/authenticator configurado en npmjs.com                   |
| Publish exitoso sin tag               | Crear tag manual: `git tag <prefix>v<version> && git push origin --tags` |

---

## Notas importantes

- **El agente NUNCA ejecuta `npm login`** — siempre lo hace el usuario interactivamente
- **El agente NUNCA hace `git push`** sin confirmación explícita del usuario
- **Si se publican ambas**: MCP primero, tucu-ui después
- **Los scripts con `--skip-git`** permiten que el agente maneje commits de forma granular antes de publicar
- **OTP**: npm solicita el código automáticamente durante `npm publish` si 2FA está habilitado — el agente debe ejecutar el publish en modo interactivo para que el usuario pueda ingresar el OTP
