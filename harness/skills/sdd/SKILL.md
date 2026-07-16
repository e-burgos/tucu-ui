---
name: sdd
description: "SDD (Spec-Driven Development) flow for the tucu-ui project. INVOKE IMMEDIATELY when the user asks to implement a feature, start a task, work on a module, code something, or any implementation-related work. ALSO INVOKE when user mentions a spec number (e.g. 'Spec 3', 'spec 5'), a branch name, or says 'start implementing'. SKIP if user explicitly says 'quick fix', 'quick change', 'hotfix', 'minor tweak', or describes a change to a single file."
---

# SDD Flow — Tucu UI

Este proyecto usa **Spec-Driven Development (SDD)**. Antes de escribir código de feature significativa, debes verificar que existe la spec y el plan correspondiente.

---

## Regla de oro

> **Sin spec + plan aprobados → no hay implementación.**
>
> Excepción: el usuario dice explícitamente "quick fix", "hotfix", "cambio rápido" o describe una corrección de una sola línea/archivo.

---

## Decisión de flujo

Cuando el usuario pide implementar algo, evalúa primero:

```
¿El usuario usa palabras como "quick fix", "hotfix", "cambio rápido", "solo modifica X"?
  └─ SÍ → Implementar directamente. No hace falta flujo SDD.
  └─ NO → Seguir el flujo SDD completo (ver abajo).
```

---

## Flujo SDD completo

### Paso 1 — Verificar spec y plan existentes

```bash
# ¿Existe spec?
ls docs/specs/NN-nombre.md

# ¿Existe plan?
ls docs/plans/NN-nombre.md
```

**Si spec Y plan existen → ir al Paso 2.**

**Si NO existen:**

Presenta al usuario este menú antes de continuar:

```
Antes de implementar, el flujo SDD de este proyecto requiere:
  1. Una spec (docs/specs/NN-nombre.md)
  2. Un plan de implementación (docs/plans/NN-nombre.md)

Opciones:
  A) Crear spec + plan ahora (recomendado para features nuevas)
  B) Implementar directamente como "quick change" sin spec
  C) Cancelar

¿Qué preferís?
```

No implementar nada hasta recibir respuesta del usuario.

---

### Paso 2 — Leer spec y plan antes de implementar

```bash
cat docs/specs/NN-nombre.md
cat docs/plans/NN-nombre.md
```

Confirmar:

- ¿Qué fase se va a implementar (A, B, C...)?
- ¿Cuáles son los criterios de aceptación de esa fase?
- ¿Cuál es el branch correcto?

---

### Paso 3 — Crear o verificar branch

```bash
# Ver branch actual
git branch --show-current

# Verificar que estemos en el branch correcto para la feature
git log --oneline -3
```

**Si el branch de la spec NO existe todavía, crearlo:**

```bash
# Siempre partir de main actualizado
git checkout main && git pull origin main
git checkout -b feat/nombre-branch
```

> No esperar a que el usuario lo cree. La branch se crea en este paso.

**Si el branch ya existe:**

```bash
git checkout feat/nombre-branch
git pull origin feat/nombre-branch
```

---

### Paso 4 — Implementar

- Seguir **exactamente** el plan de la fase activa
- No implementar más allá de la fase activa sin confirmar con el usuario
- Commits descriptivos: `feat(módulo): descripción — Spec NN`

---

### Paso 5 — Verificación antes de cerrar

```bash
# Build de la librería
pnpm nx build tucu-ui

# Build de la demo (si se tocó documentación)
pnpm nx build demo

# Lint
pnpm nx lint tucu-ui
```

**No crear PR con build roto.**

---

### Paso 6 — Cierre de branch

1. `git push origin feat/nombre-branch`
2. Crear PR con descripción del spec
3. Si hay cambios en componentes → invocar al agente `tucu-ui-docs-sync` para actualizar documentación

---

## Dónde viven los documentos

| Tipo                         | Ruta                                       |
| ---------------------------- | ------------------------------------------ |
| Specs de features            | `docs/specs/NN-nombre.md`                  |
| Planes de implementación     | `docs/plans/NN-nombre.md`                  |
| Skills (contexto de agentes) | `.github/skills/<nombre>/SKILL.md`         |
| Agentes GitHub Copilot       | `.github/agents/<nombre>.agent.md`         |
| Índice principal             | `AGENTS.md`                                |

---

## Cómo crear nuevas specs y plans

### 1. Determinar el número siguiente

```bash
ls docs/specs/ | sort
# El siguiente NN libre es el máximo actual + 1
```

### 2. Crear la spec

**Ruta:** `docs/specs/NN-nombre-kebab-case.md`

Estructura obligatoria:

```markdown
# Spec NN — Título descriptivo

**Fecha:** YYYY-MM-DD
**Versión:** 1.0
**Estado:** Propuesto | En progreso | Completado
**Branch:** `feat/nombre-kebab-case`
**Dependencias:** Spec XX (si aplica)

## Resumen

Breve descripción del feature.

## Arquitectura / Diseño

- Estructura de archivos
- Componentes a crear/modificar
- Decisiones técnicas

## Fases de implementación

### Fase A — [nombre]
- [ ] Tarea 1
- [ ] Tarea 2

### Fase B — [nombre]
- [ ] Tarea 1

## Criterios de aceptación

- [ ] Build exitoso (`pnpm nx build tucu-ui`)
- [ ] Exportado desde `@e-burgos/tucu-ui`
- [ ] TypeScript: tipos exportados
- [ ] Dark/light mode soportado
- [ ] [Criterios específicos del feature]

## Out of scope

- Cosas que NO se incluyen en este spec

## Decisiones de diseño

| # | Decisión | Alternativa | Razón |
|---|----------|-------------|-------|
| 1 | ...      | ...         | ...   |
```

### 3. Crear el plan

**Ruta:** `docs/plans/NN-nombre-kebab-case.md`

```markdown
# Plan NN — Título

**Spec:** docs/specs/NN-nombre.md
**Branch:** feat/nombre
**Depende de:** (spec anterior si aplica)

## Estado inicial requerido

Comandos bash para verificar precondiciones.

## Fase A — Nombre

Pasos detallados con archivos a crear/modificar.

## Fase B — Nombre

## Criterios de aceptación

- [ ] Lista de checkboxes

## Verificación

\`\`\`bash
pnpm nx build tucu-ui
pnpm nx lint tucu-ui
\`\`\`

## Post-implementación

- [ ] Invocar `tucu-ui-docs-sync` si hay componentes nuevos
- [ ] Regenerar props: `pnpm tsx scripts/generate-props.ts`
```

---

## Integración con otros agentes

| Situación                                      | Agente a invocar     |
| ---------------------------------------------- | -------------------- |
| Se creó un componente nuevo                    | `tucu-ui-docs-sync`  |
| Duda sobre API/props de componentes existentes | `tucu-ui-expert`     |
| Necesita explorar el workspace Nx              | Skill `nx-workspace` |
| Necesita generar nuevo proyecto/app            | Skill `nx-generate`  |

---

## Cuándo NO aplicar este skill

- "Corrige el typo en este archivo"
- "Cambia el color de este botón"
- "Arregla este error de TypeScript"
- "Quick fix para el build roto"
- "Agrega una prop a X componente" (cambio puntual)
- Cualquier cambio que el usuario describa como **puntual, urgente o de una sola línea**

En esos casos: implementar directamente sin flujo SDD.

---

## Convenciones del proyecto

### Naming
- Branches: `feat/nombre-kebab`, `fix/nombre`, `docs/nombre`
- Componentes: PascalCase, prefijo `Tucu` para charts y compuestos
- Archivos: kebab-case (`line-chart.tsx`, `use-chart-theme.ts`)

### Stack técnico
- React 18+ / TypeScript
- Tailwind CSS v4 (no config file, `@import` based)
- Zustand para state (theme store)
- Recharts 3.x para charts
- Framer Motion para animaciones
- Vite + Nx monorepo (pnpm)

### Design System
- Dark/light via `useTheme().mode`
- Colores: semantic tokens (`bg-primary`, `text-muted`, `bg-light-dark`)
- Color presets: 22 colores configurables via Zustand
- Siempre soportar `prefers-reduced-motion`
