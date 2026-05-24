# Prompt: Implementar Spec 05 — Tucu UI MCP Agentic Server

> **Uso:** Copiar este prompt completo y pasarlo a un agente con contexto limpio.
> **Branch:** `feat/mcp-agentic-server`
> **NO hacer merge.** Commitear ordenadamente al finalizar cada fase.

---

## Contexto del Proyecto

Estás trabajando en un **monorepo NX** (`pnpm`) en `/Users/macbookprom2/github/UI/tucu-ui`.
El proyecto a implementar vive en `tools/mcp-server/`.

**Stack:** TypeScript 5.7, ESM (`"type": "module"`), `@modelcontextprotocol/sdk` ^1.12.0, Zod, Vitest.

**Estado actual:**
- ✅ **Plan A completado** — Core + Component Discovery (19 tests passing)
- 🔲 **Plan B** — Generation Tools + Theme
- 🔲 **Plan C** — Resources + Prompts + Distribution
- 🔲 **Plan D** — Remote Deployment (HTTP, Auth, Docker, Fly.io, CI/CD)

**Comandos de verificación:**
```bash
pnpm nx build tucu-ui-mcp   # TypeScript compile
pnpm nx test tucu-ui-mcp    # Vitest (debe ser 100% pass)
```

---

## Instrucciones Generales

1. **Implementar secuencialmente** Plan B → C → D. Cada plan tiene fases numeradas.
2. **Commitear al concluir cada PLAN** (no cada fase interna). Formato:
   - `feat(mcp): add generation tools + theme registry (Plan B)`
   - `feat(mcp): add resources, prompts + distribution config (Plan C)`
   - `feat(mcp): add HTTP transport, auth, Docker + CI/CD (Plan D)`
3. **NO hacer merge** a `main`. Dejar la branch `feat/mcp-agentic-server` lista para PR.
4. **Tests obligatorios** — Cada plan incluye una fase de tests. No commitear sin tests verdes.
5. **Verificación** — Antes de cada commit: `pnpm nx build tucu-ui-mcp && pnpm nx test tucu-ui-mcp`.
6. **Archivos existentes** — Lee los archivos ya implementados antes de modificarlos.

---

## Plan B — Generation Tools + Theme

### Lectura previa obligatoria
```
docs/plans/05-B-mcp-generation-and-theme.md
tools/mcp-server/src/server.ts
tools/mcp-server/src/data/component-registry.ts
tools/mcp-server/src/tools/component-tools.ts
```

### Fases (ejecutar en orden)

| # | Fase | Archivos a crear/modificar |
|---|------|--------------------------|
| 1 | Theme Registry | `src/data/theme-registry.ts` |
| 2 | Icon Registry | `src/data/icon-registry.ts` |
| 3 | Form Patterns Registry | `src/data/form-patterns.ts` |
| 4 | Generation Utilities | `src/utils/code-generator.ts`, `src/utils/version.ts` |
| 5 | Generation Tools (5 tools) | `src/tools/generation-tools.ts` |
| 6 | Server Integration | `src/server.ts` (actualizar a v0.2.0, registrar generation tools) |
| 7 | Tests | `tests/generation-tools.test.ts` |
| 8 | Verificación | build + test + revisión manual |

### Criterios de aceptación Plan B
- [ ] 5 tools nuevas: `generate_component`, `generate_form`, `generate_page`, `generate_chart`, `search_icons`
- [ ] `tools/list` retorna 9 tools (4 existentes + 5 nuevas)
- [ ] Generación determinista: mismo input → mismo output
- [ ] NINGÚN código generado usa variantes inválidas (`primary`, `outline`, `destructive`, `lg`, `sm`)
- [ ] Tests verdes para generation-tools
- [ ] Build limpio

### Commit
```bash
git add tools/mcp-server/
git commit -m "feat(mcp): add generation tools + theme registry (Plan B)"
```

---

## Plan C — Resources + Prompts + Distribution

### Lectura previa obligatoria
```
docs/plans/05-C-mcp-resources-distribution.md
tools/mcp-server/src/server.ts  (versión actualizada de Plan B)
```

### Contexto adicional necesario (leer skills del repo)
Para el contenido de los resources, consultar:
- `.github/skills/tucu-ui-catalog/SKILL.md` → catálogo completo de componentes
- `.github/skills/tucu-ui-forms/SKILL.md` → sistema de formularios
- `.github/skills/tucu-ui-design-system/SKILL.md` → tokens, layouts, theme
- `.github/skills/tucu-ui-routing/SKILL.md` → routing patterns
- `.github/skills/recharts/SKILL.md` → charts

### Fases (ejecutar en orden)

| # | Fase | Archivos a crear/modificar |
|---|------|--------------------------|
| 1 | Resource Infrastructure | `src/resources/index.ts` |
| 2 | 12 Resources | `src/resources/{catalog,tokens,forms,routing,layouts,theme,charts,icons,migration,best-practices,changelog,quickstart}.ts` |
| 3 | Prompt Infrastructure | `src/prompts/index.ts` |
| 4 | 8 Prompts | `src/prompts/{create-component,create-form,create-page,debug-variant,migrate-component,theme-setup,accessibility-check,performance-review}.ts` |
| 5 | Server Integration | `src/server.ts` (v0.3.0, registrar resources + prompts) |
| 6 | Distribution Config | `configs/{vscode-mcp,cursor-mcp,claude-desktop}.json` |
| 7 | Tests | `tests/resources.test.ts`, `tests/prompts.test.ts` |
| 8 | Verificación | build + test + verificar conteo de resources/prompts |

### Criterios de aceptación Plan C
- [ ] 12 resources registrados con URIs `tucu://`
- [ ] 8 prompts registrados con argumentos correctos
- [ ] Configs de cliente generados (VS Code, Cursor, Claude Desktop)
- [ ] Tests verdes para resources y prompts
- [ ] Build limpio

### Commit
```bash
git add tools/mcp-server/ 
git commit -m "feat(mcp): add resources, prompts + distribution config (Plan C)"
```

---

## Plan D — Remote Deployment

### Lectura previa obligatoria
```
docs/plans/05-D-mcp-remote-deployment.md
tools/mcp-server/src/server.ts
tools/mcp-server/package.json
tools/mcp-server/project.json
```

### Fases (ejecutar en orden)

| # | Fase | Archivos a crear/modificar |
|---|------|--------------------------|
| 1 | HTTP Transport (Express 5.x) | `src/http-server.ts`, `package.json` (agregar express) |
| 2 | Auth Middleware | `src/middleware/auth.ts` |
| 3 | Rate Limiter | `src/middleware/rate-limiter.ts` |
| 4 | Docker | `Dockerfile`, `.dockerignore`, `docker-compose.yml` |
| 5 | Fly.io | `fly.toml` |
| 6 | NX Targets + npm config | `project.json`, `package.json` (actualizar) |
| 7 | Client Config (remote) | `configs/remote-http.json` |
| 8 | CI/CD | `.github/workflows/deploy-mcp.yml` (en raíz del repo) |
| 9 | Tests | `tests/http-server.test.ts`, `tests/middleware.test.ts` |
| 10 | Verificación | build + test + curl health check |

### Criterios de aceptación Plan D
- [ ] `curl localhost:3100/health` → `{"status":"ok","version":"0.4.0"}`
- [ ] Auth con Bearer token funciona (401 sin token, 403 token inválido)
- [ ] Rate limit: 101 requests → último rechazado 429
- [ ] `timingSafeEqual` usado (NO `===` para comparar tokens)
- [ ] Docker build exitoso, imagen <150MB, corre como non-root
- [ ] fly.toml con auto-sleep configurado
- [ ] GitHub Actions workflow para deploy automático
- [ ] `npm pack` genera .tgz con dist/, README
- [ ] Tests verdes
- [ ] Build limpio

### Commit
```bash
git add tools/mcp-server/ .github/workflows/deploy-mcp.yml
git commit -m "feat(mcp): add HTTP transport, auth, Docker + CI/CD (Plan D)"
```

---

## Delegación a Subagentes (Optimización de Contexto)

Si tu ventana de contexto se llena o necesitas delegar, usa estos prompts autocontenidos:

### Subagente: Plan B
```
TAREA: Implementar Plan B del MCP server tucu-ui.
BRANCH: feat/mcp-agentic-server
DIRECTORIO: tools/mcp-server/
PLAN COMPLETO: docs/plans/05-B-mcp-generation-and-theme.md

ANTES DE EMPEZAR:
1. Lee docs/plans/05-B-mcp-generation-and-theme.md COMPLETO
2. Lee tools/mcp-server/src/server.ts (actual)
3. Lee tools/mcp-server/src/data/component-registry.ts (para patterns)
4. Consulta .github/skills/tucu-ui-catalog/SKILL.md para variantes correctas
5. Consulta .github/skills/tucu-ui-forms/SKILL.md para form patterns
6. Consulta .github/skills/recharts/SKILL.md para chart patterns
7. Consulta .github/skills/tucu-ui-design-system/SKILL.md para tokens/themes

IMPLEMENTAR las 8 fases del plan en orden.
VERIFICAR: pnpm nx build tucu-ui-mcp && pnpm nx test tucu-ui-mcp
COMMIT: git add tools/mcp-server/ && git commit -m "feat(mcp): add generation tools + theme registry (Plan B)"
NO HACER MERGE.
```

### Subagente: Plan C
```
TAREA: Implementar Plan C del MCP server tucu-ui.
BRANCH: feat/mcp-agentic-server
DIRECTORIO: tools/mcp-server/
PLAN COMPLETO: docs/plans/05-C-mcp-resources-distribution.md

ANTES DE EMPEZAR:
1. Lee docs/plans/05-C-mcp-resources-distribution.md COMPLETO
2. Lee tools/mcp-server/src/server.ts (actual, ya tiene gen tools)
3. Para contenido de resources, consulta estos skills:
   - .github/skills/tucu-ui-catalog/SKILL.md (catálogo completo)
   - .github/skills/tucu-ui-forms/SKILL.md (formularios)
   - .github/skills/tucu-ui-design-system/SKILL.md (tokens, layouts, theme)
   - .github/skills/tucu-ui-routing/SKILL.md (routing)
   - .github/skills/recharts/SKILL.md (charts)

IMPLEMENTAR las 8 fases del plan en orden.
VERIFICAR: pnpm nx build tucu-ui-mcp && pnpm nx test tucu-ui-mcp
COMMIT: git add tools/mcp-server/ && git commit -m "feat(mcp): add resources, prompts + distribution config (Plan C)"
NO HACER MERGE.
```

### Subagente: Plan D
```
TAREA: Implementar Plan D del MCP server tucu-ui (remote deployment).
BRANCH: feat/mcp-agentic-server
DIRECTORIO: tools/mcp-server/
PLAN COMPLETO: docs/plans/05-D-mcp-remote-deployment.md

ANTES DE EMPEZAR:
1. Lee docs/plans/05-D-mcp-remote-deployment.md COMPLETO
2. Lee tools/mcp-server/package.json y project.json (actual)
3. Lee tools/mcp-server/src/server.ts (actual, v0.3.0 con resources+prompts)

IMPLEMENTAR las 10 fases del plan en orden.
AGREGAR express como dependency (no devDep).
VERIFICAR: pnpm nx build tucu-ui-mcp && pnpm nx test tucu-ui-mcp
COMMIT: 
  git add tools/mcp-server/ .github/workflows/deploy-mcp.yml
  git commit -m "feat(mcp): add HTTP transport, auth, Docker + CI/CD (Plan D)"
NO HACER MERGE.
```

---

## Reglas Críticas (NO VIOLAR)

### Variantes válidas — MEMORIZAR
| Componente | Prop | Valores válidos | NUNCA usar |
|-----------|------|-----------------|------------|
| Button/IconButton | variant | `solid`, `ghost`, `transparent` | ~~primary~~, ~~outline~~, ~~destructive~~ |
| Button/IconButton | size | `large`, `medium`, `small`, `mini`, `tiny` | ~~lg~~, ~~sm~~, ~~md~~, ~~xs~~ |
| Badge | variant | `solid`, `ghost`, `outline`, `soft` | ~~secondary~~, ~~flat~~ |
| Alert | variant | `error`, `success`, `info`, `warning` | ~~destructive~~ |
| Input/Select | variant | `solid`, `ghost`, `transparent` | ~~default~~, ~~outlined~~ |

### Imports
- TODO se importa desde `'@e-burgos/tucu-ui'` (un solo entry point)
- Router: `ReactRouter.useNavigate()` — NUNCA `react-router-dom` directo
- Forms: `Form`, `Input`, `Select` desde tucu-ui (wrapper de react-hook-form)

### Generación determinista
- Mismo input a cualquier tool → mismo output siempre
- Usar string templates (NO AST generation)
- NO random, NO timestamps en output

---

## Checklist Final (post Plan D)

Antes de declarar la spec completa:

```bash
# 1. Build limpio
pnpm nx build tucu-ui-mcp

# 2. Todos los tests pasan
pnpm nx test tucu-ui-mcp

# 3. Conteo de tools
# Verificar que tools/list retorna 9 tools

# 4. Conteo de resources
# Verificar que resources/list retorna 12 resources

# 5. Conteo de prompts
# Verificar que prompts/list retorna 8 prompts

# 6. Health check HTTP
# cd tools/mcp-server && npx tsx src/http-server.ts &
# curl http://localhost:3100/health → {"status":"ok","version":"0.4.0"}

# 7. Docker
# docker build -t tucu-ui-mcp tools/mcp-server/
# docker run -p 3100:3100 tucu-ui-mcp
# curl localhost:3100/health

# 8. npm pack
# cd tools/mcp-server && npm pack → .tgz <500KB
```

---

## Historial de Commits Esperado

```
cbbdf44 docs: add MCP agentic server spec and aligned plans
xxxxxxx feat(mcp): add MCP foundation — core + component discovery (Plan A)
xxxxxxx feat(mcp): add generation tools + theme registry (Plan B)
xxxxxxx feat(mcp): add resources, prompts + distribution config (Plan C)
xxxxxxx feat(mcp): add HTTP transport, auth, Docker + CI/CD (Plan D)
```

> **Nota:** Plan A ya está implementado pero NO commiteado. El primer paso es commitear Plan A.
