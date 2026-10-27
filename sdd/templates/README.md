# Templates — scaffolding reproducible del monorepo

Plantillas para reproducir la estructura de referencia del framework SDD en un repo nuevo.

> Para **montar el workspace desde cero** (config raíz, pnpm, CI, arnés dual) la skill es
> **[`init-nx-workspace`](../skills/init-nx-workspace/SKILL.md)** — usa `nx-workspace/` de acá.
> Para **apps y libs nuevas** en un workspace ya montado, **[`scaffold-nx`](../skills/scaffold-nx/SKILL.md)**.

Ambas comparten la regla general:

> **Todo lo que Nx sabe generar se genera con sus generadores oficiales (idealmente vía el
> Nx MCP server). Estos templates son la capa de convenciones SDD sobre ese output — y la
> fuente primaria solo para lo que Nx no genera (Spring Boot).**

## Contenido

| Template          | Reproduce                          | Vía preferida                                               |
| ----------------- | ---------------------------------- | ----------------------------------------------------------- |
| `nx-workspace/`   | Config raíz del monorepo Nx        | `pnpm dlx create-nx-workspace` + alinear con estos archivos |
| `apps/java-api/`  | App Spring Boot hexagonal bajo Nx  | Copiar template (Nx no genera Spring Boot) y renombrar      |
| `apps/react-app/` | App React (Vite + router + Docker) | `pnpm nx g @nx/react:app` + overlay de estos archivos       |
| `libs/ts-lib/`    | Lib TypeScript compartida          | `pnpm nx g @nx/js:lib` + overlay de estos archivos          |

## Nx MCP

Para que un agente descubra generadores y schemas sin adivinar flags:

```bash
claude mcp add nx-mcp -- pnpm dlx nx-mcp@latest /path/al/repo
```

Detalle completo de comandos, overlays y checklist de cierre: [skills/scaffold-nx/SKILL.md](../skills/scaffold-nx/SKILL.md)

## Política de versiones en `nx-workspace/package.json`

`nx` y `@nx/*` van en la **última versión estable** (hoy `23.1.1`). El resto del ecosistema **no**
se toma del `latest` del registry, sino de los constants que los propios generadores de Nx usan al
instalar (`node_modules/@nx/<plugin>/dist/src/utils/versions.js`).

Por eso hay divergencias deliberadas con el `latest`:

| Paquete      | Acá       | `latest` | Por qué                                                   |
| ------------ | --------- | -------- | --------------------------------------------------------- |
| `typescript` | `~6.0.3`  | `7.0.2`  | Es lo que instala `@nx/js` 23.1.1 (mín. soportado: 5.8.0) |
| `eslint`     | `^9.8.0`  | `10.8.0` | `@nx/eslint` acepta 9 y 10, pero instala 9                |
| `pnpm`       | `10.14.0` | `11.x`   | Versión verificada de punta a punta en este repo          |

**Al bumpear:** correr `pnpm nx migrate latest` en un repo real y leer los `versions.js` de los
plugins antes de tocar este archivo. Subir TypeScript o pnpm de major por delante de Nx rompe el
install de los repos nuevos, que es justo lo que estos templates tienen que evitar.

## Notas

- **Dos wirings de TypeScript, no mezclar.** `nx-workspace/tsconfig.base.json` usa el estilo
  **legacy `paths`**, que es lo que asumen `libs/ts-lib/` y `apps/react-app/` (`sourceRoot`,
  `@shared-lib`). En cambio `create-nx-workspace` de Nx 23 genera el **TS solution setup**
  (`customConditions` + project references, sin `paths`) — que es lo que usa este repo. Si el
  workspace se creó con el generador, **no** sobreescribir su `tsconfig.base.json` con este
  template. Migrar `libs/ts-lib/` y `apps/react-app/` al solution setup es trabajo pendiente.
- `apps/java-api/` mantiene internamente el nombre `example-api`: al copiarlo, renombrar carpeta,
  artifactId, package y `project.json`.
- `apps/react-app/` usa el nombre `example-app` (coincide con el app-key de ejemplo
  `"apps/example-app"` usado en la documentación de registros).
- **`--routing` de `@nx/react:app` pinnea `react-router-dom` 6.30.3**, pero este template usa `^7`.
  Si vas por el template, no pases `--routing` al generador.
- `nx-workspace/gitignore` y `nx-workspace/npmrc` no llevan punto para que no apliquen dentro de
  este repo: al copiarlos, renombrarlos a `.gitignore` y `.npmrc` (o fusionarlos con los existentes).
- Todo scaffolding ocurre dentro de un ciclo SDD (o un fix autorizado): crear el contexto del
  subproyecto y registrar la app en `sdd/global.json` es parte del cierre.
