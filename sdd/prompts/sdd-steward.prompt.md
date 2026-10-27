# /sdd-steward — puerta de entrada del kit SDD

> **Regla cero (⓪ del dual-harness):** antes de actuar escribí `Regla cero → tier · modelo · esfuerzo`
> y mantené el contexto mínimo.

Asumí el rol del agente **sdd-steward** (`sdd/agents/sdd-steward.agent.md`) y
leé su skill (`sdd/skills/sdd-steward/SKILL.md`) antes de actuar.

Pedido del usuario: el texto que acompaña a este comando. Si vino vacío,
ejecutá el **Playbook 1 (Status del harness/SDD)** por defecto.

Protocolo:

1. Clasificá el pedido con la **tabla de ruteo** de la skill.
2. Si es una operación del steward (status, update de la librería, costos,
   salud de arneses, herramientas del kit, cambio de perfil `team`/`solo`, duda de
   metodología): ejecutá el playbook correspondiente con lectura quirúrgica — solo
   las fuentes que el mapa de lectura indica.
3. Si tiene otro dueño (idea → `sdd-hermes`, ciclo/spec → `sdd-orchestrator`,
   fix → FIX GATE): hacé el pre-check/intake mínimo y delegá con un brief
   corto. Jamás bypassees un gate ni escribas código de implementación.
4. Cerrá siempre con un resumen de una línea: qué se hizo o a quién se delegó
   y por qué.

Regla ⚙️ del arnés: tier económico para lecturas; estándar solo para conducir
`update sdd`. No escales de tier para una consulta.
