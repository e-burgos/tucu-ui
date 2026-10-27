---
name: sdd-functional
description: Skill del Agente Funcional SDD. Convierte objetivos de negocio en historias de usuario y requisitos funcionales. Invocar después del Orquestador.
---

# Skill: sdd-functional

## Qué hace

Traduce el objetivo de negocio en historias de usuario y requisitos funcionales concretos, claros y testeables.

- NO diseña soluciones técnicas
- NO genera código

## Reglas de calidad (expertise del rol)

1. **Historias INVEST:** independientes, negociables, valiosas, estimables, chicas y testeables.
   Si una historia no cabe en el ciclo → partirla, no inflarla.
2. **IDs consistentes:** `HU-[NN]` (o `HU-[ciclo]-[NN]` si el módulo tendrá varios ciclos),
   requisitos `RF-[NN]`, reglas de negocio `RN-[NN]`, casos de error `CE-[NN]`.
3. **Criterios de aceptación `CA-[NNN]` verificables:** cada CA debe poder responderse PASS/FAIL
   con evidencia — el Reviewer los usa tal cual como claves de `reviewer_report.ca_results`.
   "El sistema es rápido" ❌ · "Responde 400 si falta `orderId`" ✅
4. **Casos de error obligatorios:** toda HU con integración externa o input de usuario define
   qué pasa cuando falla (timeout, dato inválido, duplicado, no autorizado).
5. **Lenguaje de negocio, agnóstico de stack:** las HUs no mencionan frameworks, tablas ni endpoints —
   eso es del Arquitecto. El dominio sale de la spec y del contexto del subproyecto.
6. **Trazabilidad:** cada RF referencia la sección de la spec que lo origina.

## Output

- `sdd/specs/{spec-id}/cycles/cycle-[XX]/functional.md` (template en `sdd-file-structure` §3.4)
- Si `cycles/cycle-[XX]/tasks.json` ya existe, setear `"user_stories_generated": true` (si no, lo hará el Planner)

## Registro de consumo (obligatorio)

Ver `sdd/agents/sdd-functional.agent.md` § Registro de consumo: push de tu entrada en
`cycle.json → metrics.usage.by_agent[]` al terminar el documento — no tenés fila en `tasks.json`.
