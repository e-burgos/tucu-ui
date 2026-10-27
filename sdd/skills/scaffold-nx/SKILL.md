---
name: scaffold-nx
description: Scaffolding del workspace Nx y de apps/libs nuevas. Vía preferida — generadores oficiales de Nx y su MCP server; los templates de sdd/templates/ aportan las convenciones SDD que los generadores no conocen.
---

# Skill: scaffold-nx

Crea el workspace Nx inicial y las apps/libs nuevas del monorepo combinando dos fuentes:

1. **Generadores de Nx + Nx MCP** (preferido): todo lo que Nx sabe generar se genera con Nx —
   nunca copiar a mano lo que un generador produce mejor y actualizado.
2. **Templates de `sdd/templates/`**: capa de convenciones SDD sobre el output del generador
   (tags, targets, estructura hexagonal Java, Dockerfiles) y única fuente para lo que Nx
   NO genera (apps Spring Boot bajo Nx).

> ⛔ Crear una app/lib nueva NO exime del ciclo SDD: el scaffolding se hace dentro del primer
> ciclo que afecte a ese subproyecto, y el Orquestador debe crear su contexto en
> `sdd/context/[apps|libs]/[nombre]/` (ver `sdd/context/context_prompt.md` sección 6).

---

## 1. Nx MCP server (recomendado para agentes)

El MCP oficial de Nx expone el workspace al agente: proyectos, targets, generadores disponibles
con sus schemas, y docs. Con el MCP conectado, el agente descubre los generadores en vez de
adivinar flags.

**Registro en Claude Code (raíz del repo):**

```bash
claude mcp add nx-mcp -- pnpm dlx nx-mcp@latest /path/al/repo
```

**VS Code / Cursor (`.vscode/mcp.json` o equivalente):**

```json
{
  "servers": {
    "nx-mcp": {
      "command": "npx",
      "args": ["nx-mcp@latest", "."]
    }
  }
}
```

Herramientas típicas del MCP: `nx_workspace` (estructura y proyectos), `nx_project_details`,
`nx_generators` (lista de generadores instalados), `nx_generator_schema` (flags de un
generador), `nx_docs`. **Regla:** nunca adivinar flags de un generador — consultar su schema
vía MCP o `pnpm nx g <generador> --help`.

---

## 2. Workspace nuevo desde cero → otra skill

Montar el workspace **no** es parte de esta skill. Usar
[`init-nx-workspace`](../init-nx-workspace/SKILL.md), que cubre `create-nx-workspace` con pnpm, los
globs `apps/* libs/* tools/*`, `.npmrc`, `.nxignore`, el CI y el arnés dual, y cierra con un
checklist verificable.

Volver acá una vez que `pnpm nx report` liste pnpm y `pnpm sdd:validate` esté en verde.

---

## 3. App React nueva

**Generar con Nx:**

```bash
pnpm nx g @nx/react:app apps/[nombre] \
  --bundler=vite --routing --style=css --unitTestRunner=vitest --e2eTestRunner=none
```

**Overlay SDD desde `sdd/templates/apps/react-app/`:**

- `project.json` → tags (`scope:web`, `type:app`) y targets con executors `@nx/vite:*`
- `vite.config.ts` → `base` por env var (`VITE_BASE_PATH`), puerto, outDir en `dist/apps/`
- `Dockerfile` + `nginx.conf` → build multistage con pnpm + Nx y SPA fallback
- `src/` → estructura mínima `app/` + `pages/` con react-router

Registrar la app: fila en las tablas globales de `sdd/context/` + crear
`sdd/context/apps/[nombre]/{constitution.md,context_prompt.md,updates/}`.

---

## 4. App Spring Boot (Java) nueva

Nx no tiene generador para Spring Boot — acá el template es la fuente primaria:

1. Copiar `sdd/templates/apps/java-api/` a `apps/[nombre]/`
2. Renombrar: carpeta, `project.json` (`name`, `cwd`), `pom.xml` (`artifactId`, `name`,
   `start-class`), package `com.example.exampleapi` → `com.example.[nombre]`
3. Asignar puerto local siguiendo la tabla de puertos de `sdd/context/constitution.md`
4. Seguir `sdd/skills/generate-springboot-api/SKILL.md` para el detalle de pom, seguridad,
   JaCoCo y estructura hexagonal

El `project.json` del template integra Maven a Nx vía `nx:run-commands`
(`build`/`test`/`serve`/`lint`/`coverage` → `mvn`): la app queda visible para
`nx affected` y `nx run-many` sin plugin de Gradle/Maven.

---

## 5. Lib compartida nueva

**Generar con Nx:**

```bash
pnpm nx g @nx/js:lib libs/[nombre] --bundler=none --unitTestRunner=vitest
```

**Overlay SDD desde `sdd/templates/libs/ts-lib/`:** tags (`scope:shared`), tsconfig con
`declaration: true`, y registrar el path en `tsconfig.base.json`:

```json
"paths": { "@[nombre]": ["./libs/[nombre]/src/index.ts"] }
```

Crear su contexto en `sdd/context/libs/[nombre]/`.

---

## 6. Checklist de cierre (todo scaffolding)

- [ ] `pnpm nx show projects` lista el proyecto nuevo
- [ ] `pnpm nx build [nombre]` y `pnpm nx test [nombre]` en verde
- [ ] Contexto creado en `sdd/context/[apps|libs]/[nombre]/`
- [ ] Fila agregada en `sdd/context/constitution.md` (secciones 2.1 y 3) y
      `sdd/context/context_prompt.md` (sección 2)
- [ ] App registrada en `monorepo.apps` de `sdd/global.json`
- [ ] `pnpm sdd:validate` en verde
