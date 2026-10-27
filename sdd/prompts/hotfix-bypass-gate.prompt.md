# Prompt: FIX GATE — Bypass controlado del SPEC GATE

> **Regla cero (⓪ del dual-harness):** antes de actuar escribí `Regla cero → tier · modelo · esfuerzo`
> y mantené el contexto mínimo.

> **Activado cuando:** el desarrollador usa uno de los prefijos `[FIX]`, `[BUGFIX]`, `[HOTFIX]` o `[IMPROVEMENT]`  
> **Ejecutado por:** sdd-orchestrator  
> **Propósito:** Permitir implementaciones urgentes o correctivas fuera del flujo SDD normal, manteniendo trazabilidad completa.

---

## ¿Qué es el FIX GATE?

El FIX GATE es un **bypass controlado del SPEC GATE**. No lo elimina — lo reemplaza con un proceso más ligero pero igualmente trazable.

El SPEC GATE normal exige spec, ciclo completo, agentes funcional/planner/architect, etc.  
El FIX GATE exige: **justificación + registro + documentación**.

> **`profile: solo`** (`sdd/global.json`, fuente: `sdd/dual-harness/rules/sdd-gates.md` § FIX
> GATE): el proceso es el mismo con tres atajos — el PASO 2 no es un cuestionario (el actor
> completa los datos desde el pedido y pregunta solo lo que no puede deducir), el PASO 3 se
> reduce a "no crea contratos ni entidades nuevas", y el PASO 6 usa el template mínimo
> (problema · solución · archivos). Registro en `fixes.json`, `usage`, fragmento de contexto y
> `pnpm sdd:validate` no se recortan.

---

## Palabras clave activadoras

| Prefijo         | Cuándo usarlo                                               | Severidad esperada  |
| --------------- | ----------------------------------------------------------- | ------------------- |
| `[HOTFIX]`      | Producción bloqueada, regresión crítica, dato corrupto      | `critical` / `high` |
| `[BUGFIX]`      | Error confirmado en desarrollo o testing, no bloquea prod   | `medium` / `low`    |
| `[FIX]`         | Alias genérico — el orquestador pedirá clasificar           | cualquiera          |
| `[IMPROVEMENT]` | Mejora menor (UX, wording, performance puntual) out-of-spec | `low`               |

> ⚠️ **Abuso del FIX GATE:** Si un `[IMPROVEMENT]` o `[BUGFIX]` implica más de 3 archivos modificados o un cambio de contrato de API, el orquestador DEBE rechazarlo y redirigir al flujo SDD normal.

---

## Proceso del FIX GATE (ejecutar en orden)

### PASO 1 — Detener e identificar el fix (IMPERATIVO)

> ⛔ **El orquestador NO puede escribir ninguna línea de código hasta completar el PASO 5.**
> La implementación previa al registro es una violación del FIX GATE.

Al detectar un fix (con o sin prefijo explícito), el orquestador DEBE mostrar este aviso y **detener toda implementación**:

```
⛔ FIX GATE ACTIVADO — IMPLEMENTACIÓN BLOQUEADA
───────────────────────────────────────────────────
Detecté una solicitud de fix/mejora sobre código existente.
Esto activa el FIX GATE. La implementación está BLOQUEADA
hasta completar el registro de trazabilidad.

Prefijo detectado: [HOTFIX|BUGFIX|FIX|IMPROVEMENT|sin prefijo]

Antes de escribir UNA SOLA LÍNEA de código debo:
  1. Registrar el fix en sdd/fixes.json
  2. Si el fix es de una spec: crear `sdd/specs/{spec-id}/fixes/fix-[gh-user]-[spec-NNN]-[seq].md`
     Si el fix es repo-level (sin spec): crear `sdd/fixes/fix-[gh-user]-[seq].md`

Confirmá los siguientes datos para proceder:
───────────────────────────────────────────────────
```

### PASO 2 — Recolectar datos del fix (preguntar al desarrollador)

El orquestador solicita los siguientes datos (con `profile: solo`: los completa desde el
pedido y solo pregunta los que falten):

```
1. Tipo exacto: [HOTFIX] / [BUGFIX] / [IMPROVEMENT]
2. Título (máx 80 chars): ___
3. Descripción del problema: ___
4. Justificación (¿por qué no puede esperar un ciclo SDD?): ___
5. Módulos/archivos afectados: ___
6. ¿Existe un test que valida el fix? (sí/no + referencia o justificación): ___
```

### PASO 3 — Validar elegibilidad

Antes de registrar, verificar (con `profile: solo` solo aplican las tres primeras):

```
[ ] El fix NO modifica el contrato de API (nuevos endpoints requieren ciclo SDD)
[ ] El fix NO agrega un nuevo módulo o entidad de dominio
[ ] El fix NO modifica sdd/schema.json con tablas nuevas
[ ] El fix afecta ≤ 5 archivos (si más → reconsiderar ciclo SDD)
[ ] El tipo [HOTFIX] tiene severidad critical o high (si no → degradar a [BUGFIX])
```

Si alguna condición falla:

- Para `[HOTFIX]`: advertir pero NO bloquear (producción no puede esperar)
- Para `[BUGFIX]` / `[IMPROVEMENT]`: DETENER y redirigir a ciclo SDD normal

### PASO 4 — Determinar el ciclo asociado

- Si hay un ciclo `in-progress` → asociar el fix a ese ciclo
- Si no hay ciclo activo → crear entrada con `cycle: null` y notificar que debe absorberse en el próximo ciclo

### PASO 5 — Registrar en sdd/fixes.json

Crear una nueva entrada en el array `fixes` de `sdd/fixes.json` con todos los campos completados.  
El ID sigue la convención: `FIX-[gh-user]-[spec-NNN]-[seq]` para fixes vinculados a una spec, o `FIX-[gh-user]-[seq]` para fixes repo-level.

- Leer los IDs existentes del autor para determinar el siguiente número de secuencia.
- Incluir siempre `spec_id` (string con ID de spec o `null` para repo-level) y `fixes_file` (ruta al fixes.md correspondiente).

> ⛔ La entrada DEBE validar contra `sdd/schemas/fixes.schema.json` (correr `pnpm sdd:validate` después de escribir).

```json
{
  "id": "FIX-[gh-user]-[spec-NNN]-[seq]",
  "author": "[gh-user]",
  "spec_id": "spec-[gh-user]-[NNN]-[slug]",
  "fix_document": "sdd/specs/spec-[gh-user]-[NNN]-[slug]/fixes/fix-[gh-user]-[spec-NNN]-[seq].md",
  "type": "BUGFIX",
  "severity": "critical",
  "created_at": "<YYYY-MM-DD>",
  "resolved_at": null,
  "validated_at": null,
  "title": "<título del fix (máx 120 chars)>",
  "estimation_hours": 1.5,
  "description": "<descripción detallada>",
  "justification": "<por qué no puede esperar un ciclo SDD>",
  "related_modules": ["<módulo afectado>"],
  "affected_files": [],
  "test_reference": null,
  "status": "pending",
  "cycle": "cycle-01"
}
```

### PASO 6 — Crear archivo de fix individual

- **Fix vinculado a una spec:** crear `sdd/specs/{spec-id}/fixes/fix-[gh-user]-[spec-NNN]-[seq].md`
- **Fix repo-level (sin spec):** crear `sdd/fixes/fix-[gh-user]-[seq].md`
- Usar el template de la sección 9 de `sdd/skills/sdd-file-structure/SKILL.md` (con
  `profile: solo`, el template mínimo de la misma sección: problema · solución · archivos).
- El nombre del archivo usa kebab-case del ID: `FIX-jdoe-001` → `fix-jdoe-001.md`

### PASO 7 — Autorizar al implementador

Una vez registrado el fix, confirmar al desarrollador:

```
✅ FIX GATE completado
───────────────────────────────────────────
Fix registrado: FIX-[gh-user]-[seq] — [título]
Espec asociada: [spec-id o "repo-level"]
Documento: sdd/specs/{spec-id}/fixes.md (o sdd/fixes.md)

Podés proceder con la implementación.
Recordá actualizar:
  - affected_files en sdd/fixes.json (FIX-XXX)
  - status → "implemented" al terminar
  - test_reference si escribiste un test
  - usage (provider_model "proveedor/modelo", effort, tokens_in/tokens_out, approx,
    source, recorded_at) con el consumo del fix — sin esto el fix NO se da por cerrado
───────────────────────────────────────────
```

---

## Cierre del fix (responsabilidad del desarrollador + reviewer)

Después de implementar, el desarrollador actualiza en `sdd/fixes.json`:

- `affected_files`: lista de archivos realmente modificados
- `resolved_at`: fecha de implementación
- `status`: `"implemented"`
- `test_reference`: referencia al test (si aplica)
- `usage`: consumo del fix, obligatorio para dar el fix por cerrado — `provider_model`
  con clave `proveedor/modelo` (`claude/sonnet`, `gemini/flash`, `copilot/claude-sonnet`;
  Antigravity bajo `gemini/*`), `effort`, `tokens_in`/`tokens_out`, `approx`, `source` y
  `recorded_at` (`model_tier` es el alias legacy: se lee, ya no se escribe). Si más de un
  agente trabajó el fix, listar cada unidad en `usage.by_agent[]` (mismos campos + `agent`)
  y dejar los `tokens_in`/`tokens_out` top-level como la suma. El FIX GATE no da por
  resuelto un fix sin `usage`. Alimenta la vista Costos del visor. **Declarar el modelo es
  obligatorio, y se registra al resolver el fix** — el reviewer consolida el total del ciclo
  sumando lo que fixes y tasks ya anotaron, no reconstruyéndolo al final. Fuente del número: `/stats` en Gemini CLI, reporte de sesión en Claude Code
  — comandos del cliente que el agente no puede ejecutar — y estimación declarada en
  Antigravity/Copilot, que no tienen contador. Sin contador se registra una estimación de
  orden de magnitud con `approx: true` y `source: "declared-estimate"`: no se omite el campo.
  Lo prohibido es inventar un número preciso y presentarlo como medido.

### CONTEXTO GATE del fix (mecanismo aditivo — obligatorio antes de dar el fix por cerrado)

Si el fix modificó estructura, patrones o dependencias de un subproyecto, el desarrollador
escribe el fragmento append-only correspondiente **en vez de** editar `constitution.md` o
`context_prompt.md` del subproyecto directamente:

```
sdd/context/[apps|libs|tools]/[nombre]/updates/YYYY-MM-DD-fix-[gh-user]-[seq].md
```

El nombre lleva el `gh-user` y el `seq` del fix (`FIX-[gh-user]-[seq]`) → único por
construcción, sin merge conflicts. Si el fix es puramente correctivo y no cambia
estructura/patrones/dependencias documentables, este paso se omite — indicarlo
explícitamente en el cierre (`sin cambios de contexto`).

El **sdd-reviewer**, al cerrar el ciclo, revisa todos los fixes con `status: "implemented"` y decide:

- Marcarlos `"validated"` si todo está correcto
- Marcarlos `"absorbed"` si la solución debe formalizarse en la próxima spec (completar el campo `absorption`)

La consolidación de los fragmentos en `updates/` (fusión en los archivos base del
subproyecto) sigue siendo operación de un solo actor: el Orquestador al iniciar el próximo
ciclo sobre ese subproyecto, o el Reviewer si se acumulan ≥5 fragmentos.

---

## Matriz de severidad vs tipo permitido

| Tipo            | critical | high | medium          | low |
| --------------- | -------- | ---- | --------------- | --- |
| `[HOTFIX]`      | ✅       | ✅   | ⚠️ degradar     | ❌  |
| `[BUGFIX]`      | ⚠️ subir | ✅   | ✅              | ✅  |
| `[IMPROVEMENT]` | ❌       | ❌   | ⚠️ reconsiderar | ✅  |

---

## Advertencia de abuso

Si el orquestador detecta más de **3 fixes activos no validados** en el ciclo corriente, DEBE advertir al desarrollador:

```
⚠️  ALERTA: 3 fixes sin validar en cycle-XX
Esto puede indicar problemas sistémicos que deberían abordarse
en un ciclo SDD formal. Considerá crear una nueva spec de
"deuda técnica" o "estabilización".
```
