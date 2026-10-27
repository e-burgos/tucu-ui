---
name: init-nx-workspace
description: 'Inicializa un repo desde cero hasta la estructura canónica de este monorepo — Nx 23 + pnpm, apps/libs/tools, sdd/ con su arnés dual y CI. USE WHEN - (1) el repo no tiene nx.json / pnpm-workspace.yaml todavía, (2) hay que portar sdd/ a un repo nuevo, (3) la estructura existe pero está desalineada (glob packages/*, lockfile de npm, customConditions que no matchea, sdd/templates apareciendo como proyectos Nx). Para crear apps/libs en un workspace YA inicializado usar scaffold-nx.'
---

# Skill: init-nx-workspace

Lleva un repositorio de cero a la estructura canónica de este monorepo. Es la contraparte de
`scaffold-nx`: acá se monta **el workspace**; ahí se generan **apps y libs** una vez montado.

> ⛔ Esta skill toca solo config raíz y `sdd/`. No crea apps ni libs — eso pasa por el ciclo SDD
> con `scaffold-nx`.

---

## 0. Detectar el estado antes de tocar nada

```bash
node -v && pnpm -v                    # requeridos: node >=22, pnpm >=10
ls nx.json pnpm-workspace.yaml 2>/dev/null
ls package-lock.json yarn.lock 2>/dev/null   # si existen → migración, no init
cat pnpm-workspace.yaml 2>/dev/null
```

| Hallazgo                                     | Ir a      |
| -------------------------------------------- | --------- |
| No hay `nx.json`                             | sección 1 |
| Hay `nx.json` + `package-lock.json`          | sección 2 |
| Hay `nx.json` + pnpm, pero glob `packages/*` | sección 3 |
| Todo montado, falta `sdd/`                   | sección 5 |
| Todo montado — solo verificar                | sección 7 |

Si el repo ya tiene proyectos, **nunca** correr `create-nx-workspace` encima: migrar (sección 2).

---

## 1. Workspace nuevo desde cero

Usar el generador oficial. Produce el **TS solution setup** (project references +
`customConditions`), que es la wiring que este repo usa — copiar `tsconfig.base.json` a mano no
lo reproduce.

```bash
pnpm dlx create-nx-workspace@latest <nombre-del-repo> \
  --preset=apps --packageManager=pnpm --nxCloud=skip --no-interactive
```

`--packageManager=pnpm` es **obligatorio**: define el lockfile, y Nx infiere el package manager
del lockfile. Con npm quedan `package-lock.json` y comandos `npx` en el CI generado.

Después seguir de la sección 3 en adelante para alinear con las convenciones SDD.

---

## 2. Migrar un workspace npm/yarn existente a pnpm

```bash
rm -f package-lock.json yarn.lock && rm -rf node_modules
```

En `package.json`: agregar `"packageManager": "pnpm@<version>"` y `engines`, y **borrar el campo
`workspaces`** (pnpm no lo usa; los globs van en `pnpm-workspace.yaml`).

```bash
pnpm install
pnpm nx report        # debe listar pnpm como package manager
```

Si `pnpm install` avisa `Ignored build scripts`, agregar esos paquetes a `onlyBuiltDependencies`
(sección 3) y reinstalar — pnpm 10+ bloquea lifecycle scripts por default.

---

## 3. Config raíz — plantillas en `sdd/templates/nx-workspace/`

Copiar y adaptar (los dos primeros van sin punto en el template, hay que renombrarlos):

| Template              | Destino                | Qué aporta                                                  |
| --------------------- | ---------------------- | ----------------------------------------------------------- |
| `npmrc`               | `.npmrc`               | pnpm-only, resolución de workspace packages a fuente        |
| `gitignore`           | `.gitignore`           | bloquea lockfiles rivales, `.nx/`, `graphify-out`           |
| `pnpm-workspace.yaml` | `pnpm-workspace.yaml`  | globs `apps/* libs/* tools/*` + `onlyBuiltDependencies`     |
| `nx.json`             | `nx.json`              | `workspaceLayout`, `namedInputs`, plugins, analytics off    |
| `package.json`        | `package.json` (merge) | scripts `sdd:*` + `setup:agents`, deps de Nx 23             |
| `tsconfig.base.json`  | `tsconfig.base.json`   | solo si el repo NO usa el TS solution setup (ver más abajo) |

### Los globs son `apps/*`, `libs/*`, `tools/*` — nunca `packages/*`

`create-nx-workspace` deja `packages/*`. Todo el sistema SDD asume `apps`/`libs`/`tools`
(`global.json → monorepo`, `sdd/context/[apps|libs|tools]/`, las skills `generate-*`). Si no se
corrige, una lib generada en `libs/` **no queda linkeada por pnpm** y falla con `Cannot find module`.

```bash
mkdir -p apps libs tools && touch apps/.gitkeep libs/.gitkeep tools/.gitkeep
rmdir packages 2>/dev/null   # solo si quedó vacío
pnpm install
```

> Nx borra el `.gitkeep` del directorio padre al generar el primer proyecto ahí. Es esperado.

### `tsconfig.base.json` — dos wirings, no mezclar

- **TS solution setup** (lo que produce `create-nx-workspace` en Nx 23, y lo que usa este repo):
  `customConditions` + project references en `tsconfig.json`, sin `paths`. **No lo sobreescribas
  con el template.**
- **Legacy `paths`**: es lo que traen `sdd/templates/libs/ts-lib/` y `sdd/templates/apps/react-app/`.
  Usar el `tsconfig.base.json` del template solo si vas por esta vía.

⛔ **Si el repo usa el TS solution setup, `customConditions` tiene que ser EXACTAMENTE el `name`
del `package.json` raíz.** Nx lo deriva literal de ahí (`getCustomConditionName` en
`@nx/js/dist/src/utils/typescript/ts-solution-setup.js`) y con ese string keyea los conditional
exports de cada lib. Si no matchean, TypeScript resuelve a `./dist` en vez de a `./src` y los
tipos quedan rotos hasta buildear.

```jsonc
// package.json → "name": "@acme/source"
// tsconfig.base.json → "customConditions": ["@acme/source"]   ← mismo string
```

Verificación real: generar una lib y mirar sus `exports`.

```bash
pnpm nx g @nx/js:lib libs/probe --no-interactive
cat libs/probe/package.json     # la clave de exports debe ser el mismo string
rm -rf libs/probe && pnpm nx reset
```

### `.nxignore` — sacar los templates del project graph

`sdd/templates/**/project.json` son blueprints, pero Nx los registra como proyectos reales con
executors que no están instalados, y `nx run-many` explota en el primer run de CI.

```bash
printf 'sdd/templates\n' > .nxignore
pnpm nx reset && pnpm nx show projects    # los templates no deben aparecer
```

---

## 4. CI con pnpm

Generar el workflow con Nx para no inventar flags, y después revisarlo:

```bash
pnpm nx g @nx/workspace:ci-workflow --ci=github --no-interactive
```

El generador acierta la parte pnpm — `pnpm/action-setup@v4` con `run_install: false`,
`cache: 'pnpm'`, `pnpm install --frozen-lockfile`, `pnpm exec nx ...` — pero **degrada** cosas si
el repo ya tenía un CI mejor: baja `actions/checkout` y `setup-node` de v5 a v4, baja Node, comenta
la distribución de Nx Cloud y cambia `run-many` por `affected`. Comparar contra el CI previo y
mergear a mano, quedándose con lo mejor de cada uno.

`pnpm/action-setup` debe ir **antes** de cualquier `pnpm dlx` y antes de `setup-node`, porque
`cache: 'pnpm'` necesita pnpm en el PATH.

> El `--base` de `nx format:check` apunta al branch default (`remotes/origin/main`). En un repo
> recién creado sin commits eso tira `fatal: ambiguous argument 'main'`. Se resuelve con el primer
> push, no es un error de config.

---

## 5. Montar `sdd/`

```bash
cp -R <origen>/sdd ./sdd
pnpm add -Dw ajv ajv-formats     # sdd:validate los necesita y no vienen con Nx
pnpm setup:agents                # symlinks: .claude/, .github/, AGENTS.md, CLAUDE.md
```

`setup:agents` es idempotente. **En Windows es obligatorio tras cada clone**: git deja los
symlinks como archivos de texto.

### Completar `sdd/global.json` — y solo ahí

```json
{
  "project": "<nombre-del-repo>",
  "description": "<qué hace, stack principal, metodología SDD>",
  "monorepo": {
    "tool": "Nx",
    "package_manager": "pnpm",
    "apps": {},
    "libs": {}
  }
}
```

⛔ **`project` y `description` son la única fuente de verdad.** Ningún otro archivo de `sdd/` los
hardcodea: `constitution.md`, `context_prompt.md`, el arnés dual y este README apuntan acá. Eso es
lo que mantiene `sdd/` portable entre repos, y `pnpm sdd:validate` **falla** si el valor se filtra
a la superficie del kit. `apps` arranca en `{}` y se llena al generar cada app.

El resto de los marcadores `[...]` de `sdd/context/constitution.md` y `context_prompt.md`
(rol arquitectónico, responsabilidades, principios) se completan acá — pero **no** el nombre.

```bash
pnpm sdd:rebuild-catalog && pnpm sdd:validate
```

---

## 6. Estructura resultante

```
<repo>/
  apps/                    → una carpeta por app generada con Nx
  libs/                    → una carpeta por lib generada con Nx
  tools/                   → herramientas del workspace
  sdd/                     → sistema SDD (portable, fuente de verdad)
  .github/workflows/ci.yml → CI con pnpm
  .npmrc                   → pnpm-only
  .nxignore                → sdd/templates fuera del project graph
  nx.json  package.json  pnpm-workspace.yaml  pnpm-lock.yaml
  tsconfig.base.json  tsconfig.json
  AGENTS.md → sdd/dual-harness/AGENTS.md      (symlink)
  CLAUDE.md → sdd/dual-harness/CLAUDE.md      (symlink)
```

---

## 7. Checklist de cierre — cada línea con su comando

- [ ] `pnpm -v` ≥ 10 y `node -v` ≥ 22
- [ ] `pnpm nx report` → lista `pnpm` como package manager
- [ ] `pnpm install --frozen-lockfile` → verde (es lo que corre el CI)
- [ ] `pnpm install` **sin** aviso `Ignored build scripts`
- [ ] `ls package-lock.json yarn.lock` → no existen
- [ ] `cat pnpm-workspace.yaml` → `apps/*`, `libs/*`, `tools/*`
- [ ] `pnpm nx show projects` → no aparece ningún proyecto de `sdd/templates`
- [ ] Solo con TS solution setup: `customConditions` de `tsconfig.base.json` === `name` del `package.json` raíz (`pnpm sdd:validate` avisa si divergen; con el template `paths` del kit no aplica)
- [ ] Lib de prueba en `libs/`: la ve `pnpm nx show projects` **y** `pnpm list --recursive`; borrarla después
- [ ] `head -1 AGENTS.md` resuelve el symlink a `sdd/dual-harness/`
- [ ] `pnpm sdd:validate` → verde
- [ ] `pnpm sdd:docs` → levanta y el dashboard muestra el `project` de `global.json`

---

## 8. Errores que ya pasaron acá

| Síntoma                                        | Causa                                                   |
| ---------------------------------------------- | ------------------------------------------------------- |
| `Cannot find module '@scope/lib'`              | glob `packages/*` con la lib en `libs/`                 |
| Tipos rotos hasta correr `build`               | `customConditions` ≠ `name` del package.json raíz       |
| `nx run-many` falla con executors inexistentes | falta `.nxignore` con `sdd/templates`                   |
| `Cannot find package 'ajv'` en `sdd:validate`  | faltan `ajv` + `ajv-formats` en la raíz                 |
| Nx no encuentra binarios tras instalar         | `Ignored build scripts` → falta `onlyBuiltDependencies` |
| CI usa `npx` y cachea npm                      | `create-nx-workspace` sin `--packageManager=pnpm`       |
| `sdd:validate` falla por nombre hardcodeado    | se copió el `project` de `global.json` a un doc del kit |
