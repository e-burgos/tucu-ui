---
name: publish
description: "Full publish workflow for @e-burgos/tucu-ui and @e-burgos/tucu-ui-mcp. INVOKE when the user says: 'publica tucu-ui', 'publica el mcp', 'publish tucu-ui', 'publish mcp', 'release', 'nueva versión', 'nueva release', 'bump version', 'lanzar versión', 'hacer un patch', 'hacer un minor', 'hacer un major', or any variation asking to publish or release either package."
---

# Publish Skill — tucu-ui & tucu-ui-mcp

Guía paso a paso para publicar cualquiera de los dos paquetes del monorepo.

---

## Paquetes disponibles

| Paquete                 | Directorio          | Script                    |
| ----------------------- | ------------------- | ------------------------- |
| `@e-burgos/tucu-ui`     | `ui/tucu-ui/`       | `scripts/publish.mjs`     |
| `@e-burgos/tucu-ui-mcp` | `tools/mcp-server/` | `scripts/publish-mcp.mjs` |

---

## Paso 1 — Identificar qué publicar

Determina qué paquete debe publicarse según el pedido del usuario:

- Menciona "tucu-ui", "biblioteca", "library", "componentes" → `@e-burgos/tucu-ui`
- Menciona "mcp", "mcp server", "servidor mcp", "tucu-ui-mcp" → `@e-burgos/tucu-ui-mcp`
- Si no está claro, **pregunta al usuario** antes de continuar.

---

## Paso 2 — Determinar el tipo de bump

Si el usuario no lo especificó, determínalo usando esta guía:

| Tipo    | Cuándo usarlo                                                |
| ------- | ------------------------------------------------------------ |
| `patch` | Bugfixes, correcciones de docs, cambios de config, refactors |
| `minor` | Nuevas features compatibles hacia atrás (nuevos componentes) |
| `major` | Breaking changes: API rota, props renombradas, eliminaciones |

Si no está claro, **pregunta al usuario**: `¿patch, minor o major?`

---

## Paso 3 — Verificar estado del repositorio

**El script rechaza publicar si hay cambios sin commitear.**

Verifica el estado antes de correr el script:

```bash
git status
```

Si hay cambios pendientes no relacionados con el release, ayuda al usuario a commitearlos primero:

```bash
git add <archivos>
git commit -m "descripción de los cambios"
```

> ⚠️ El script `checkCleanWorkingTree()` abortará si `git status --porcelain` no está limpio (excepto en `--dry-run`).

---

## Paso 4 — Verificar autenticación en npm

El script publica en npm con tus credenciales. Verifica que estás logueado:

```bash
npm whoami   # debe mostrar tu usuario de npm (ej: e-burgos)
```

Si no estás autenticado:

```bash
npm login    # abre el browser para autenticarte via npm.com
```

> ℹ️ Para publicar bajo el scope `@e-burgos` necesitas pertenecer a la organización `e-burgos` en npmjs.com.

---

## Paso 5 — Ejecutar el publish

### Para `@e-burgos/tucu-ui`

```bash
# Patch (bug fixes, docs, config)
pnpm tucu-ui:publish:patch

# Minor (nuevas features)
pnpm tucu-ui:publish:minor

# Major (breaking changes)
pnpm tucu-ui:publish:major

# Simular sin publicar (útil para previsualizar)
pnpm tucu-ui:publish:dry
```

### Para `@e-burgos/tucu-ui-mcp`

```bash
# Patch
pnpm mcp:publish:patch

# Minor
pnpm mcp:publish:minor

# Major
pnpm mcp:publish:major

# Simular sin publicar
pnpm mcp:publish:dry
```

---

## Qué hace el script automáticamente

1. **Verifica tree limpio** (`git status --porcelain`) — aborta si hay cambios sin commitear
2. **Valida en npm registry** — aborta si la versión ya existe
3. **Genera entrada CHANGELOG** desde commits git desde el último tag del paquete
4. **Actualiza README** — reemplaza referencias `@oldVersion` → `@newVersion`
5. **Bumps `package.json`** con la nueva versión
6. **Builda** — `pnpm nx run tucu-ui:build` o `pnpm nx run tucu-ui-mcp:build`
7. **Publica en npm**
8. **Crea commit de release** — `git commit -m "chore: release @pkg@version"`
9. **Crea git tag** — `tucu-ui-vX.Y.Z` o `mcp-vX.Y.Z`
10. _(solo mcp)_ **Deploya a fly.io** — `flyctl deploy` desde `tools/mcp-server/`

---

## Tags de git por paquete

Cada paquete usa un prefijo de tag para evitar colisiones en el monorepo:

- `@e-burgos/tucu-ui` → tags `tucu-ui-v2.0.12`, `tucu-ui-v2.1.0`, etc.
- `@e-burgos/tucu-ui-mcp` → tags `mcp-v0.4.1`, `mcp-v0.5.0`, etc.

El script `getLastTag(prefix)` filtra por el prefijo correspondiente, por lo que el CHANGELOG de cada paquete solo incluye commits desde el último release **de ese paquete**.

---

## Paso 6 — Verificar post-publish

Después de que el script finalice con éxito:

1. Confirma que el paquete se publicó en npm:

   - tucu-ui: `https://www.npmjs.com/package/@e-burgos/tucu-ui`
   - mcp: `https://www.npmjs.com/package/@e-burgos/tucu-ui-mcp`

   O desde terminal:

   ```bash
   npm view @e-burgos/tucu-ui version          # versión publicada de tucu-ui
   npm view @e-burgos/tucu-ui-mcp version       # versión publicada del mcp
   ```

2. _(solo mcp)_ Confirma que el servidor está activo en fly.io:

   ```bash
   curl https://tucu-ui-mcp.fly.dev/health     # debe responder 200 OK
   ```

   O abre en el browser: `https://tucu-ui-mcp.fly.dev/health`

   También puedes revisar el estado del deploy:

   ```bash
   flyctl status --app tucu-ui-mcp
   ```

3. Confirma el tag local:

   ```bash
   git tag -l "tucu-ui-v*" | tail -5   # para tucu-ui
   git tag -l "mcp-v*" | tail -5        # para mcp
   ```

4. Si el usuario quiere subir el tag a origin:
   ```bash
   git push origin --tags
   ```
   > ⚠️ **Acción irreversible sobre origin** — pide confirmación antes de ejecutar.

---

## Flags opcionales

| Flag          | Efecto                                       |
| ------------- | -------------------------------------------- |
| `--dry-run`   | Simula todo, no aplica cambios ni publica    |
| `--skip-docs` | Salta la actualización de CHANGELOG y README |

Ejemplo de dry-run manual:

```bash
node scripts/publish.mjs --dry-run minor
node scripts/publish-mcp.mjs --dry-run patch
```

---

## Troubleshooting

| Problema                              | Solución                                                                      |
| ------------------------------------- | ----------------------------------------------------------------------------- |
| `Working tree must be clean`          | Commitear o hacer stash de los cambios pendientes                             |
| `Version X.Y.Z already exists on npm` | Elegir un tipo de bump diferente o verificar que la versión es correcta       |
| `403 Forbidden` / `401 Unauthorized`  | Correr `npm login` y verificar pertenencia a la org `e-burgos` en npm         |
| Build falla (`nx run ... failed`)     | Revisar errores de TypeScript con `pnpm nx run tucu-ui:lint`                  |
| `git tag` ya existe                   | El tag fue creado manualmente; borrarlo con `git tag -d <tag>` y re-ejecutar  |
| Publicación exitosa pero sin commit   | Verificar con `git log --oneline -3` y `git tag -l "prefix-v*"`               |
| `flyctl: command not found`           | Instalar flyctl: `brew install flyctl` y autenticarse con `flyctl auth login` |
