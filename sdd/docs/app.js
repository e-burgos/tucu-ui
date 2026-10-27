const SDD_BASE = new URL('../', import.meta.url);

const LANG_STORAGE_KEY = 'sdd-docs-lang';
const SUPPORTED_LANGS = ['es', 'en'];

function detectInitialLang() {
  try {
    const stored = localStorage.getItem(LANG_STORAGE_KEY);
    if (SUPPORTED_LANGS.includes(stored)) return stored;
  } catch {}
  const browserLang = (navigator.language ?? 'es').toLowerCase();
  return browserLang.startsWith('es') ? 'es' : 'en';
}

let currentLang = detectInitialLang();

/* Flat es→en dictionary: keys ARE the Spanish UI strings (gettext style). A key
 * missing here falls back to Spanish — visible, never breaking. User data (specs,
 * cycles, fixes, memory) is rendered as written and never translated. */
const EN_STRINGS = {
  // Shell / nav / errors
  'Cambiar idioma a {lang}': 'Switch language to {lang}',
  'Cargando SDD Docs…': 'Loading SDD Docs…',
  'Cerrar menú': 'Close menu',
  'Abrir menú': 'Open menu',
  'Navegación principal': 'Main navigation',
  'Ocurrió un error inesperado.': 'An unexpected error occurred.',
  'No se pudo cargar la vista': 'Could not load the view',
  'Error de red al pedir {path}': 'Network error fetching {path}',
  'No encontrado: {path}': 'Not found: {path}',
  'Error HTTP {status} al pedir {path}': 'HTTP error {status} fetching {path}',
  'JSON inválido en {path}': 'Invalid JSON in {path}',
  'No se pudo cargar sdd/catalog.json — mostrando catálogo estático embebido.':
    'Could not load sdd/catalog.json — showing embedded static catalog.',
  'Vista no encontrada': 'View not found',
  'El hash no coincide con ninguna vista disponible.':
    'The hash does not match any available view.',
  'No encontrada': 'Not found',
  'Limpiar búsqueda': 'Clear search',
  'Ver detalle de {label}': 'View details of {label}',
  'Ver contexto de {name}': 'View context of {name}',
  'Ver {label} de {name}': 'View {label} of {name}',
  'No disponible': 'Not available',
  'no disponible': 'not available',

  // Dashboard
  'Sin datos del proyecto': 'No project data',
  'No se pudo cargar global.json': 'Could not load global.json',
  Actualizar: 'Refresh',
  'Última sincronización: {syncLabel}': 'Last synced: {syncLabel}',
  Specs: 'Specs',
  Ciclos: 'Cycles',
  'En progreso': 'In progress',
  Ciclos: 'Cycles',
  Fixes: 'Fixes',
  'No se pudo determinar la lista de apps del monorepo.':
    'Could not determine the monorepo app list.',
  'Sin apps registradas': 'No apps registered',
  'global.json.monorepo.apps está vacío.': 'global.json.monorepo.apps is empty.',
  '{count} proyectos': '{count} projects',
  'Sin libs registradas': 'No libs registered',
  'No hay subproyectos de categoría libs con contexto disponible.':
    'There are no libs subprojects with context available.',
  '{count} librerías': '{count} libraries',
  'Sin tools registradas': 'No tools registered',
  'No hay subproyectos de categoría tools con contexto disponible.':
    'There are no tools subprojects with context available.',
  '{count} herramientas': '{count} tools',
  'Sin datos del monorepo': 'No monorepo data',
  'Ciclos completados': 'Cycles completed',
  Versión: 'Version',
  'El ciclo SDD aún no ha iniciado. Todos los módulos están en estado <span style="font-family:var(--font-mono);color:var(--text-muted)">pending</span>.':
    'The SDD cycle has not started yet. All modules are in <span style="font-family:var(--font-mono);color:var(--text-muted)">pending</span> state.',

  // Planning
  Planificación: 'Planning',
  'Horas, story points y progreso derivados de tasks.json, specs/index.json y fixes.json.':
    'Hours, story points and progress derived from tasks.json, specs/index.json and fixes.json.',
  'Horas estimadas': 'Estimated hours',
  Referencias: 'Legend',
  'Sin datos de planificación': 'No planning data',
  'No se pudo cargar tasks.json ni fixes.json.':
    'Could not load tasks.json or fixes.json.',
  'Horas totales': 'Total hours',
  '{done} completadas · fixes incl.': '{done} completed · fixes incl.',
  '{count} completados': '{count} completed',
  'no disponible': 'not available',
  'Tareas + Fixes': 'Tasks + Fixes',
  '{pct}% completado': '{pct}% completed',
  'Fixes registrados': 'Fixes registered',
  '{hours} estimadas': '{hours} estimated',
  'Progreso global': 'Overall progress',
  '{done} de {total} items (tareas + fixes)': '{done} of {total} items (tasks + fixes)',
  'Sin tareas en este ciclo': 'No tasks in this cycle',
  '{done}/{total} tareas': '{done}/{total} tasks',
  'Story points: {done} / {total}': 'Story points: {done} / {total}',
  Horas: 'Hours',
  Progreso: 'Progress',
  'Sin datos de tareas': 'No task data',
  'No se pudo cargar tasks.json.': 'Could not load tasks.json.',
  'Sin specs registradas en tasks.json': 'No specs registered in tasks.json',
  'El desglose aparece cuando un ciclo SDD genera su tasks.json.':
    'The breakdown appears once an SDD cycle generates its tasks.json.',
  'Sin datos de fixes': 'No fix data',
  'No se pudo cargar fixes.json.': 'Could not load fixes.json.',
  'Sin fixes registrados': 'No fixes registered',
  'Los fixes aparecen al usar los prefijos [HOTFIX], [BUGFIX], [FIX] o [IMPROVEMENT] para bypasear el SPEC GATE.':
    'Fixes appear when using the [HOTFIX], [BUGFIX], [FIX] or [IMPROVEMENT] prefixes to bypass the SPEC GATE.',
  'Fixes &amp; Mejoras': 'Fixes &amp; Improvements',
  '{count} fix{suffix}': '{count} fix{suffix}',
  '{done}/{total} completados': '{done}/{total} completed',

  // Specs
  '{count} registrada{suffix}': '{count} registered',
  'Especificaciones técnicas registradas en sdd/specs/index.json, convención spec-[gh-user]-[NNN]-[slug].':
    'Technical specs registered in sdd/specs/index.json, convention spec-[gh-user]-[NNN]-[slug].',
  Título: 'Title',
  Estado: 'Status',
  'Convención de archivos': 'File convention',
  'Cada spec tiene un ID único por autor registrado en <code>sdd/specs/index.json</code>. NNN es el contador personal del dev.':
    'Each spec has a unique per-author ID registered in <code>sdd/specs/index.json</code>. NNN is the developer’s personal counter.',
  Autor: 'Author',
  Módulo: 'Module',
  Creada: 'Created',
  Completada: 'Completed',
  'Depende de': 'Depends on',
  Archivo: 'File',
  'Ciclos ({count})': 'Cycles ({count})',
  'No hay archivo de spec definido.': 'No spec file defined.',
  Detalles: 'Details',
  Especificación: 'Specification',
  'Sin specs registradas': 'No specs registered',
  'Las especificaciones técnicas aparecen aquí una vez registradas en sdd/specs/index.json. El ciclo SDD aún no ha iniciado.':
    'Technical specs appear here once registered in sdd/specs/index.json. The SDD cycle has not started yet.',

  // Cycles
  '{total} ciclo{totalSuffix} en {groups} spec{groupsSuffix}':
    '{total} cycle{totalSuffix} across {groups} spec{groupsSuffix}',
  'Historial de ciclos SDD — cada ciclo representa una unidad de trabajo completa, de brief.yaml a cycle.json completed.':
    'History of SDD cycles — each cycle is a complete unit of work, from brief.yaml to cycle.json completed.',
  'Buscar por spec, ciclo, título o estado…': 'Search by spec, cycle, title or status…',
  'Sin ciclos iniciados': 'No cycles started',
  'Los ciclos SDD aparecerán aquí una vez que el Orquestador cree el primer sdd/specs/{spec-id}/cycles/cycle-01/brief.yaml.':
    'SDD cycles will appear here once the Orchestrator creates the first sdd/specs/{spec-id}/cycles/cycle-01/brief.yaml.',
  'Sin resultados': 'No results',
  'No se encontraron ciclos que coincidan con "{query}".':
    'No cycles found matching "{query}".',
  'No se pudo cargar cycle.json para este ciclo.': 'Could not load cycle.json for this cycle.',
  'Ciclo {number} — {module}': 'Cycle {number} — {module}',
  'Inicio: {started} · Fin: {completed}': 'Start: {started} · End: {completed}',
  'Objetivos ({count})': 'Objectives ({count})',
  '{done}/{total} tareas · {points} SP · {files} archivo{suffix}':
    '{done}/{total} tasks · {points} SP · {files} file{suffix}',
  Agentes: 'Agents',
  'Agentes del ciclo': 'Cycle agents',
  Ciclo: 'Cycle',
  'Reporte del reviewer': 'Reviewer report',
  'Artefactos ({count})': 'Artifacts ({count})',
  hecho: 'done',
  'en progreso': 'in progress',
  omitido: 'skipped',
  pendiente: 'pending',
  '{count} archivo{suffix}': '{count} file{suffix}',
  'abre {cycleId} ({module}) · brief + cycle.json': 'opens {cycleId} ({module}) · brief + cycle.json',
  'functional.md — requisitos y user stories': 'functional.md — requirements and user stories',
  'planner.md — tasks y estimaciones': 'planner.md — tasks and estimates',
  'architect.md — diseño validado': 'architect.md — validated design',
  aprobado: 'approved',
  'con observaciones': 'with observations',
  'sin reviewer_report': 'no reviewer_report',
  'cierra {cycleId} ✓ · {verdict} · CONTEXTO + MEMORIA GATE':
    'closes {cycleId} ✓ · {verdict} · CONTEXT + MEMORY GATE',
  'Actividad del ciclo — derivada de los registros': 'Cycle activity — derived from the records',
  'Documentos ({count})': 'Documents ({count})',
  'Ciclo #{number}': 'Cycle #{number}',
  Resumen: 'Summary',

  // Tasks
  Tareas: 'Tasks',
  '{count} tarea{suffix} en {groups} spec{groupsSuffix}':
    '{count} task{suffix} across {groups} spec{groupsSuffix}',
  'Tareas técnicas agrupadas por spec y ciclo SDD · {done} de {total} resueltas · {hours} estimadas · {points} SP':
    'Technical tasks grouped by spec and SDD cycle · {done} of {total} resolved · {hours} estimated · {points} SP',
  Tipo: 'Type',
  Estimación: 'Estimate',
  Historias: 'Stories',
  Archivos: 'Files',
  '{shown} / {total} tarea{suffix}': '{shown} / {total} task{suffix}',
  '{done}/{total} tareas': '{done}/{total} tasks',
  'Sin tareas registradas': 'No tasks registered',
  'Las tareas técnicas son generadas por el agente Planner y aparecen aquí una vez que el primer ciclo SDD ha iniciado.':
    'Technical tasks are generated by the Planner agent and appear here once the first SDD cycle has started.',
  'Buscar por ID, título, tipo, estado, ciclo o spec…':
    'Search by ID, title, type, status, cycle or spec…',
  'No se encontraron tareas que coincidan con "{query}".':
    'No tasks found matching "{query}".',
  'SPEC GATE': 'SPEC GATE',
  'Una tarea no puede implementarse sin TODOS los documentos del ciclo generados: brief.yaml, functional.md, planner.md, architect.md, cycle.json y tasks.json.':
    'A task cannot be implemented unless ALL cycle documents have been generated: brief.yaml, functional.md, planner.md, architect.md, cycle.json and tasks.json.',

  // Fixes
  'Fixes globales (sin spec asociada)': 'Global fixes (no associated spec)',
  '{count} registrado{suffix}': '{count} registered',
  'Registro de fixes fuera del flujo SDD normal (FIX GATE).':
    'Log of fixes outside the normal SDD flow (FIX GATE).',
  'Los fixes aparecen aquí cuando se usan los prefijos [HOTFIX], [BUGFIX], [FIX] o [IMPROVEMENT] para bypasear el SPEC GATE.':
    'Fixes appear here when using the [HOTFIX], [BUGFIX], [FIX] or [IMPROVEMENT] prefixes to bypass the SPEC GATE.',
  'Buscar por ID, título, tipo, estado, autor o spec…':
    'Search by ID, title, type, status, author or spec…',
  'No se encontraron fixes que coincidan con "{query}".':
    'No fixes found matching "{query}".',
  'Prefijos FIX GATE': 'FIX GATE prefixes',
  'Producción bloqueada, regresión crítica, dato corrupto':
    'Production blocked, critical regression, corrupted data',
  'Error confirmado en desarrollo o testing': 'Confirmed error in development or testing',
  'Alias genérico — el orquestador pedirá clasificar':
    'Generic alias — the orchestrator will ask to classify it',
  'Mejora menor out-of-spec': 'Minor out-of-spec improvement',
  'ciclo: {cycle}': 'cycle: {cycle}',
  'Nivel repositorio': 'Repository level',
  '{shown} / {total} fix{suffix}': '{shown} / {total} fix{suffix}',
  'sin fix_document': 'no fix_document',
  'Archivos afectados ({count})': 'Affected files ({count})',
  'Módulos: {modules}': 'Modules: {modules}',
  'Creado: {created} · Resuelto: {resolved} · Validado: {validated}':
    'Created: {created} · Resolved: {resolved} · Validated: {validated}',
  'Ciclo: {cycle}': 'Cycle: {cycle}',
  'Spec: {spec}': 'Spec: {spec}',
  'Estimación: {hours}': 'Estimate: {hours}',

  // Context
  'Buscar por nombre, categoría o archivo…': 'Search by name, category or file…',
  'Sin contexto registrado': 'No context registered',
  'No se encontraron archivos en sdd/context/.': 'No files found in sdd/context/.',
  'No se encontraron entradas que coincidan con "{query}".':
    'No entries found matching "{query}".',
  'Contexto SDD': 'SDD Context',
  '{count} subproyectos': '{count} subprojects',
  'Constitution y context prompt de cada subproyecto del monorepo: la fuente de verdad de convenciones, stack y estado por app, lib y tool.':
    'Constitution and context prompt for each monorepo subproject: the source of truth for conventions, stack and status per app, lib and tool.',
  '{count} entrada{suffix}': '{count} entry{suffix}',
  'Ver {label} de {name}': 'View {label} of {name}',
  Contexto: 'Context',

  // Agents
  'Agentes SDD': 'SDD Agents',
  '{count} agentes activos': '{count} active agents',
  'Pipeline de {count} agentes que coordina el ciclo SDD de principio a fin. Cada agente tiene un rol específico e invoca al siguiente.':
    'A pipeline of {count} agents that coordinates the SDD cycle from start to finish. Each agent has a specific role and invokes the next.',
  'Cómo invocar un agente': 'How to invoke an agent',
  'Los agentes se invocan desde Claude Code usando el flag <code>--agent</code> o prefijando el mensaje con el rol del agente. El Orquestador es siempre el punto de entrada al ciclo SDD.':
    'Agents are invoked from Claude Code using the <code>--agent</code> flag or by prefixing the message with the agent’s role. The Orchestrator is always the entry point to the SDD cycle.',
  Orquestador: 'Orchestrator',
  Funcional: 'Functional',
  Arquitecto: 'Architect',
  'Impl. Backend': 'Backend Impl.',
  'Impl. Frontend': 'Frontend Impl.',

  // Skills
  '{count} skills activos': '{count} active skills',
  'Habilidades especializadas disponibles en el entorno Claude Code. Cada skill encapsula un conjunto de instrucciones y parámetros para tareas específicas.':
    'Specialized abilities available in the Claude Code environment. Each skill encapsulates a set of instructions and parameters for specific tasks.',

  // Prompts
  '{count} prompts activos': '{count} active prompts',
  'Prompts estructurados que guían los momentos críticos del flujo SDD: apertura, verificación, bypass y cierre de ciclos.':
    'Structured prompts that guide the critical moments of the SDD flow: opening, verification, bypass and closing of cycles.',
  'Trigger: {trigger}': 'Trigger: {trigger}',
  'Flujo de prompts': 'Prompt flow',
  'Inicio de ciclo': 'Cycle start',
  'Verificación SPEC GATE': 'SPEC GATE verification',
  'Revisión de ciclo': 'Cycle review',
  'Guía al Orquestador para iniciar un nuevo ciclo SDD. Verifica precondiciones, crea brief.yaml y ciclo.json.':
    'Guides the Orchestrator to start a new SDD cycle. Checks preconditions, creates brief.yaml and cycle.json.',
  'Checklist obligatorio que verifica que todos los documentos del ciclo existen antes de implementar.':
    'Mandatory checklist that verifies all cycle documents exist before implementing.',
  'Proceso ligero para fixes urgentes. Registra en fixes.json y autoriza implementación sin ciclo completo.':
    'Lightweight process for urgent fixes. Registers in fixes.json and authorizes implementation without a full cycle.',
  'Guía al Reviewer para cerrar un ciclo SDD. Evalúa entregables, valida specs, ejecuta el CONTEXTO GATE aditivo (escribe el fragmento en updates/ del subproyecto) y marca cycle.json como completed.':
    'Guides the Reviewer to close an SDD cycle. Evaluates deliverables, validates specs, runs the additive CONTEXT GATE (writes the fragment under the subproject’s updates/) and marks cycle.json as completed.',
  'Al iniciar un nuevo ciclo SDD': 'When starting a new SDD cycle',
  'Antes de cualquier implementación': 'Before any implementation',
  'Con prefijos [HOTFIX], [BUGFIX], [FIX], [IMPROVEMENT]': 'With prefixes [HOTFIX], [BUGFIX], [FIX], [IMPROVEMENT]',
  'Al cerrar un ciclo SDD': 'When closing an SDD cycle',

  // Schema / API / Components / Schemas
  '{count} tabla{suffix}': '{count} table{suffix}',
  'Tablas y entidades de base de datos definidas en el proyecto.':
    'Database tables and entities defined in the project.',
  'Schema vacío': 'Empty schema',
  'Las tablas de base de datos serán definidas por el agente Arquitecto y aparecerán aquí una vez que el primer ciclo SDD lo defina.':
    'Database tables will be defined by the Architect agent and will appear here once the first SDD cycle defines them.',
  '{count} col{suffix}': '{count} col{suffix}',
  'Sin columnas definidas': 'No columns defined',
  Historial: 'History',
  'ciclo {cycle} · {date} — {change}': 'cycle {cycle} · {date} — {change}',
  'ciclo {created}{updatedSuffix} · {app}': 'cycle {created}{updatedSuffix} · {app}',
  '{count} endpoint{suffix}': '{count} endpoint{suffix}',
  'Endpoints definidos en el contrato del sistema.': 'Endpoints defined in the system contract.',
  'Sin endpoints registrados': 'No endpoints registered',
  'Los endpoints del API serán definidos por el agente Arquitecto en sdd/api.json a medida que avanzan los ciclos SDD.':
    'API endpoints will be defined by the Architect agent in sdd/api.json as SDD cycles progress.',
  'Path params:': 'Path params:',
  'Headers requeridos:': 'Required headers:',
  'Request body': 'Request body',
  Responses: 'Responses',
  'ciclo {cycle} · {app}': 'cycle {cycle} · {app}',
  'Sin componentes registrados': 'No components registered',
  'Los componentes React son registrados en sdd/components.json por el agente sdd-implementor-front al finalizar cada implementación frontend.':
    'React components are registered in sdd/components.json by the sdd-implementor-front agent when each frontend implementation is finished.',
  Componentes: 'Components',
  'Registro de componentes React del monorepo. Actualizado por el Implementador Frontend al finalizar cada implementación.':
    'Log of the monorepo’s React components. Updated by the Frontend Implementer when each implementation is finished.',
  'ID: {id} · Módulo: {module} · Spec: {spec}': 'ID: {id} · Module: {module} · Spec: {spec}',
  'Consume:': 'Consumes:',
  'Sin propiedades': 'No properties',
  Campo: 'Field',
  Detalle: 'Detail',
  'Valida: {target}': 'Validates: {target}',
  'Escriben: {writers}': 'Written by: {writers}',
  '* = campo requerido · "$schema" en {target} · pnpm sdd:validate lo exige en verde':
    '* = required field · "$schema" points to {target} · pnpm sdd:validate enforces it green',
  '{available} de {total} disponibles': '{available} of {total} available',
  'Tipado estricto de los registros SDD. Cada *.json de sdd/ declara su $schema y valida contra estos archivos.':
    'Strict typing of the SDD records. Every *.json in sdd/ declares its $schema and validates against these files.',
  'Si la documentación en prosa y el schema difieren, gana el schema. <code>pnpm sdd:validate</code> lo exige en verde (local, Reviewer y CI).':
    'If the prose documentation and the schema disagree, the schema wins. <code>pnpm sdd:validate</code> enforces it green (local, Reviewer and CI).',
  '{properties} propiedades · {required} requeridas{strictSuffix}':
    '{properties} properties · {required} required{strictSuffix}',
  estricto: 'strict',

  // Help
  'No se pudo cargar el documento': 'Could not load the document',
  Ayuda: 'Help',
  'Documentación del sistema SDD: guía de uso y referencia completa.':
    'SDD system documentation: usage guide and full reference.',
  'Documentación SDD': 'SDD Documentation',
  'Ejemplos completos': 'Full examples',
  'Repos SDD reales generados por la CLI, uno por modo (monorepo Nx, standalone y proyecto existente), regenerados desde npm en cada release: <a href="https://github.com/e-burgos/sdd-harness-examples" target="_blank" rel="noreferrer" style="color:var(--text-bright)">github.com/e-burgos/sdd-harness-examples</a>':
    'Real SDD repos generated by the CLI, one per mode (Nx monorepo, standalone and existing project), regenerated from npm on every release: <a href="https://github.com/e-burgos/sdd-harness-examples" target="_blank" rel="noreferrer" style="color:var(--text-bright)">github.com/e-burgos/sdd-harness-examples</a>',
  'Instalar y actualizar': 'Install and update',
  'Cómo usar SDD': 'How to use SDD',
  Guía: 'Guide',
  Referencia: 'Reference',
  'Cómo instalar el framework en un repo y actualizar un kit ya instalado con update sdd.':
    'How to install the framework in a repo and update an already-installed kit with update sdd.',
  'Guía paso a paso para usar el sistema SDD: setup, flujo de trabajo, FIX GATE y cheat sheet.':
    'Step-by-step guide to using the SDD system: setup, workflow, FIX GATE and cheat sheet.',
  'Referencia completa del sistema SDD: estructura, gates, agentes, skills y artefactos.':
    'Full reference of the SDD system: structure, gates, agents, skills and artifacts.',

  // Costs
  Costos: 'Costs',
  '{cycles} ciclos': '{cycles} cycles',
  '{cycles} ciclos · {fixes} fixes': '{cycles} cycles · {fixes} fixes',
  'Tokens, tiempos y comparativa de costos del modo agéntico contra la estimación tradicional de las tasks.':
    'Tokens, timings and a cost comparison of agentic mode against the traditional estimate of the tasks.',
  'Tokens, tiempos y comparativa de costos del modo agéntico contra la estimación tradicional.':
    'Tokens, timings and a cost comparison of agentic mode against the traditional estimate.',
  'Sin ciclos todavía': 'No cycles yet',
  'Cuando el loop SDD complete ciclos con tasks estimadas y telemetría de tokens, el tablero aparece acá.':
    'Once the SDD loop completes cycles with estimated tasks and token telemetry, the dashboard shows up here.',
  'Costo tradicional': 'Traditional cost',
  'Tokens consumidos': 'Tokens consumed',
  'Costo agéntico aprox.': 'Approx. agentic cost',
  'Ahorro proyectado': 'Projected savings',
  '{pct}% menos': '{pct}% less',
  Tradicional: 'Traditional',
  Agéntico: 'Agentic',
  '{specId} — estimación tradicional: {cost} (horas de tasks × tarifa {rate}/h)':
    '{specId} — traditional estimate: {cost} (task hours × {rate}/h rate)',
  '{specId} — costo agéntico aproximado: {cost} (tokens × tarifa del modelo)':
    '{specId} — approximate agentic cost: {cost} (tokens × model rate)',
  '{specId} — sin telemetría de tokens todavía': '{specId} — no token telemetry yet',
  'Costo por spec — tradicional vs agéntico': 'Cost per spec — traditional vs agentic',
  'Estimación tradicional (horas × tarifa) contra el costo aproximado de tokens del modo agéntico. Incluye ciclos y fixes.':
    'Traditional estimate (hours × rate) against the approximate token cost of agentic mode. Cycles and fixes included.',
  Entrada: 'Input',
  Salida: 'Output',
  'Tokens por ciclo': 'Tokens per cycle',
  'Sin telemetría todavía. Se registra al cerrar cada ciclo: <code>cycle.json → metrics.usage</code> (lo hace el sdd-reviewer) o por task en <code>tasks.json → usage</code>.':
    'No telemetry yet. It gets recorded when each cycle closes: <code>cycle.json → metrics.usage</code> (done by sdd-reviewer) or per task in <code>tasks.json → usage</code>.',
  '{specId} {cycleId} — entrada: {tokensIn} tokens · salida: {tokensOut} tokens':
    '{specId} {cycleId} — input: {tokensIn} tokens · output: {tokensOut} tokens',
  'Detalle por ciclo y fix': 'Detail per cycle and fix',
  '{cycles} ciclos y {fixes} fixes en una sola tabla: horas estimadas contra tokens y costo agéntico registrado.':
    '{cycles} cycles and {fixes} fixes in a single table: estimated hours against recorded tokens and agentic cost.',
  Unidad: 'Unit',
  Unidades: 'Units',
  Tokens: 'Tokens',
  'Horas est.': 'Est. hours',
  'Costo trad.': 'Trad. cost',
  'Tokens in/out': 'Tokens in/out',
  'Costo agéntico': 'Agentic cost',
  Ahorro: 'Savings',
  'Consumo por proveedor y modelo': 'Usage by provider and model',
  Modelo: 'Model',
  'Sin modelo declarado': 'No model declared',
  'Subtotal {provider}': 'Subtotal {provider}',
  'Consumo por agente': 'Usage by agent',
  Agente: 'Agent',
  'Sin agente declarado': 'No agent declared',
  Otro: 'Other',
  Funcional: 'Functional',
  Arquitecto: 'Architect',
  'Implementor back': 'Implementor back',
  'Implementor front': 'Implementor front',
  Orquestador: 'Orchestrator',
  'Uso por agente ({count})': 'Usage by agent ({count})',
  'Sin telemetría por agente todavía. Se registra en <code>metrics.usage.by_agent</code> de cada ciclo y en el <code>usage</code> de cada fix.':
    'No per-agent telemetry yet. It is recorded in each cycle\u2019s <code>metrics.usage.by_agent</code> and in each fix\u2019s <code>usage</code>.',
  'Tokens y costo agrupados por rol SDD, a partir de las entradas <code>by_agent</code> de ciclos y fixes y del <code>usage</code> por task.':
    'Tokens and cost grouped by SDD role, from the <code>by_agent</code> entries of cycles and fixes and from the per-task <code>usage</code>.',
  'Sin telemetría con proveedor declarado todavía. Las claves de {field} llevan la forma {example}.':
    'No telemetry with a declared provider yet. {field} keys use the form {example}.',
  'Sin proveedor declarado': 'No provider declared',
  'Tokens y costo agéntico por modelo completo (proveedor/modelo), con subtotal por proveedor. Incluye ciclos y fixes.':
    'Tokens and agentic cost per full model (provider/model), with a subtotal per provider. Cycles and fixes included.',
  // Descripciones del kit (frontmatter de agentes y skills, catálogo de prompts).
  'Agente Arquitecto SDD. Define schema de DB, contratos de API y decisiones técnicas del módulo. Invocar después del Funcional, en paralelo con el Planner.':
    'SDD Architect agent. Defines the DB schema, the API contracts and the module\'s technical decisions. Invoke after the Functional agent, in parallel with the Planner.',
  'Agente Funcional SDD. Convierte objetivos de negocio en historias de usuario y requisitos funcionales concretos. Invocar después del Orquestador.':
    'SDD Functional agent. Turns business goals into user stories and concrete functional requirements. Invoke after the Orchestrator.',
  'Agente Implementador Backend SDD. Implementa módulos backend task por task. Invocar con una sola task a la vez después del Arquitecto.':
    'SDD Backend Implementor agent. Implements backend modules task by task. Invoke with a single task at a time, after the Architect.',
  'Agente Implementador Frontend SDD. Implementa vistas y componentes frontend task por task. Invocar después de que el backend correspondiente esté listo.':
    'SDD Frontend Implementor agent. Implements frontend views and components task by task. Invoke once the matching backend is ready.',
  'Orquestador del ciclo SDD. Coordina todos los agentes del proyecto de este repositorio. Invocar al iniciar cualquier ciclo de desarrollo.':
    'SDD cycle Orchestrator. Coordinates every project agent in this repository. Invoke when starting any development cycle.',
  'Agente Planner SDD. Convierte historias de usuario en tasks técnicas ordenadas y estimadas para el sprint. Invocar después del Funcional.':
    'SDD Planner agent. Turns user stories into ordered, estimated technical tasks for the sprint. Invoke after the Functional agent.',
  'Agente Reviewer SDD. Valida la calidad de todo el output del ciclo antes de cerrarlo. Invocar al finalizar todas las tasks de implementación del ciclo.':
    'SDD Reviewer agent. Validates the quality of the whole cycle output before closing it. Invoke once every implementation task in the cycle is finished.',
  'Conserje y puerta de entrada del kit SDD. Invocar para cualquier pedido sobre el kit en sí — status del harness/SDD, actualizar la librería, arrancar una idea, costos, salud de los arneses, dudas de metodología. Rutea todo lo demás al agente dueño sin bypassear ningún gate.':
    'Concierge and entry point of the SDD kit. Invoke for any request about the kit itself — harness/SDD status, updating the library, kicking off an idea, costs, harness health, methodology questions. Routes everything else to the owning agent without bypassing a single gate.',
  'Genera contratos completos de endpoints REST para el proyecto.':
    'Generates complete REST endpoint contracts for the project.',
  'Genera la estructura base de un módulo NestJS para el proyecto.':
    'Generates the base structure of a NestJS module for the project.',
  'Genera bloques de schema Prisma completos y listos para pegar.':
    'Generates complete, paste-ready Prisma schema blocks.',
  'Genera la estructura base de un componente/página React para el proyecto.':
    'Generates the base structure of a React component or page for the project.',
  'Genera una API o microservicio Spring Boot completo dentro del monorepo Nx (Maven, hexagonal, seguridad JWT, Flyway/Liquibase, tests). Fuente de verdad para scaffolding de backends Java nuevos.':
    'Generates a complete Spring Boot API or microservice inside the Nx monorepo (Maven, hexagonal, JWT security, Flyway/Liquibase, tests). Source of truth for scaffolding new Java backends.',
  'Inicializa un repo desde cero hasta la estructura canónica de este monorepo — Nx 23 + pnpm, apps/libs/tools, sdd/ con su arnés dual y CI. USE WHEN - (1) el repo no tiene nx.json / pnpm-workspace.yaml todavía, (2) hay que portar sdd/ a un repo nuevo, (3) la estructura existe pero está desalineada (glob packages/*, lockfile de npm, customConditions que no matchea, sdd/templates apareciendo como proyectos Nx). Para crear apps/libs en un workspace YA inicializado usar scaffold-nx.':
    'Initializes a repo from scratch up to this monorepo\'s canonical structure — Nx 23 + pnpm, apps/libs/tools, sdd/ with its dual harness and CI. USE WHEN - (1) the repo has no nx.json / pnpm-workspace.yaml yet, (2) sdd/ has to be ported to a new repo, (3) the structure exists but is misaligned (packages/* glob, npm lockfile, non-matching customConditions, sdd/templates showing up as Nx projects). To create apps/libs in an ALREADY initialized workspace use scaffold-nx.',
  'Scaffolding del workspace Nx y de apps/libs nuevas. Vía preferida — generadores oficiales de Nx y su MCP server; los templates de sdd/templates/ aportan las convenciones SDD que los generadores no conocen.':
    'Scaffolding for the Nx workspace and for new apps/libs. Preferred route — the official Nx generators and their MCP server; the templates in sdd/templates/ add the SDD conventions the generators do not know about.',
  'Skill del Agente Arquitecto SDD. Define schema de DB, contratos de API y decisiones técnicas. Invocar después del Funcional, en paralelo con el Planner.':
    'SDD Architect agent skill. Defines the DB schema, API contracts and technical decisions. Invoke after the Functional agent, in parallel with the Planner.',
  'Referencia canónica de todos los schemas de datos del sistema SDD. Cubre campo por campo cada archivo JSON del registro SDD, valores de status, convenciones de IDs, reglas de actualización y anti-patrones frecuentes. LECTURA OBLIGATORIA para cualquier agente que cree o modifique documentos SDD (api.json, schema.json, components.json, tasks.json, fixes.json, global.json, specs/index.json, cycle.json).':
    'Canonical reference for every data schema in the SDD system. Covers each SDD registry JSON field by field, status values, ID conventions, update rules and frequent anti-patterns. REQUIRED READING for any agent that creates or modifies SDD documents (api.json, schema.json, components.json, tasks.json, fixes.json, global.json, specs/index.json, cycle.json).',
  'Referencia canónica de la estructura de archivos del sistema SDD de este monorepo. Contiene convenciones de naming, árboles de directorios y templates completos de cada documento de ciclo. LECTURA OBLIGATORIA para el agente sdd-orchestrator antes de crear, mover o referenciar cualquier archivo SDD.':
    'Canonical reference for the file structure of this monorepo\'s SDD system. Contains naming conventions, directory trees and complete templates for every cycle document. REQUIRED READING for the sdd-orchestrator agent before creating, moving or referencing any SDD file.',
  'Skill del Agente Funcional SDD. Convierte objetivos de negocio en historias de usuario y requisitos funcionales. Invocar después del Orquestador.':
    'SDD Functional agent skill. Turns business goals into user stories and functional requirements. Invoke after the Orchestrator.',
  'Loop agéntico punta a punta - de una idea en lenguaje natural a producto funcionando. Descubre requisitos, decide y configura el stack con la CLI harness, siembra specs y conduce ciclos SDD encadenados hasta agotar el backlog, con presupuesto de modelo/esfuerzo por fase y condiciones de corte explícitas. Invocar cuando el usuario trae una idea u objetivo, no una spec.':
    'End-to-end agentic loop - from an idea in plain language to a working product. Discovers requirements, decides and configures the stack with the harness CLI, seeds specs and drives chained SDD cycles until the backlog runs out, with a model/effort budget per phase and explicit stop conditions. Invoke when the user brings an idea or a goal, not a spec.',
  'Skill del Agente Implementador Backend SDD. Implementa una task backend a la vez siguiendo el contrato del Arquitecto y el stack del subproyecto. Invocar una task por vez.':
    'SDD Backend Implementor agent skill. Implements one backend task at a time, following the Architect\'s contract and the subproject\'s stack. Invoke one task at a time.',
  'Skill del Agente Implementador Frontend SDD. Implementa una task frontend a la vez siguiendo el contrato de API y el stack del subproyecto. Invocar solo después de que el backend esté listo.':
    'SDD Frontend Implementor agent skill. Implements one frontend task at a time, following the API contract and the subproject\'s stack. Invoke only once the backend is ready.',
  'Skill del Agente Orquestador SDD. Prepara el brief del ciclo con el contexto mínimo para cada agente. Invocar al iniciar cualquier ciclo nuevo.':
    'SDD Orchestrator agent skill. Prepares the cycle brief with the minimum context each agent needs. Invoke when starting any new cycle.',
  'Skill del Agente Planner SDD. Convierte historias de usuario en tasks técnicas ordenadas y estimadas. Invocar después del Funcional, en paralelo con el Arquitecto.':
    'SDD Planner agent skill. Turns user stories into ordered, estimated technical tasks. Invoke after the Functional agent, in parallel with the Architect.',
  'Skill del Agente Reviewer SDD. Valida la calidad de todo el output del ciclo y ejecuta los gates de cierre. Invocar cuando todas las tasks de implementación del ciclo estén completas.':
    'SDD Reviewer agent skill. Validates the quality of the whole cycle output and runs the closing gates. Invoke once every implementation task in the cycle is complete.',
  'Conserje del kit SDD - puerta de entrada para status del harness, actualización de la librería, arranque de ideas, costos y salud de los arneses. Clasifica cualquier pedido con la tabla de ruteo, ejecuta solo lo que no tiene otro dueño y delega el resto sin bypassear gates. Invocar ante cualquier pregunta u operación sobre el kit en sí.':
    'SDD kit concierge - entry point for harness status, library updates, kicking off ideas, costs and harness health. Classifies any request with the routing table, runs only what has no other owner and delegates the rest without bypassing gates. Invoke for any question or operation about the kit itself.',
  'Instala y configura graphify (grafo de conocimiento del repo) para un dev que lo quiera usar. Elige un backend gratuito, valida el modelo con una medición real y construye el primer grafo. Invocar solo si el dev pide habilitar graphify.':
    'Installs and configures graphify (the repo\'s knowledge graph) for a dev who wants to use it. Picks a free backend, validates the model with a real measurement and builds the first graph. Invoke only if the dev asks to enable graphify.',
  'Prompt standalone para retomar el loop agéntico en una sesión nueva: carga lecciones y global.json, diagnostica en qué punto quedó el ciclo y sigue desde ahí.':
    'Standalone prompt to resume the agentic loop in a fresh session: loads lessons and global.json, diagnoses where the cycle was left and carries on from there.',
  'Punto de entrada para cualquier pedido sobre el kit: estado del arnés, actualización de la librería, costos y salud. Resuelve lo que no tiene otro dueño y rutea el resto sin bypassear gates.':
    'Entry point for any request about the kit: harness status, library updates, costs and health. Resolves what has no other owner and routes the rest without bypassing gates.',
  'Retomar el loop':
    'Resume the loop',
  'Conserje del kit':
    'Kit concierge',
  'Al retomar un loop en una sesión nueva':
    'When resuming a loop in a fresh session',
  'Ante cualquier pregunta u operación sobre el kit':
    'For any question or operation about the kit',
  Memoria: 'Memory',
  'Lo aprendido en un ciclo no se vuelve a pagar en el siguiente.':
    'What one cycle learned is never paid for twice.',
  'Lo aprendido en un ciclo no se vuelve a pagar en el siguiente. Lo escribe el MEMORIA GATE al cerrar; el orquestador lo destila al abrir el próximo.':
    'What one cycle learned is never paid for twice. The MEMORIA GATE writes it at close; the orchestrator distills it when the next cycle opens.',
  'Sin memoria registrada todavía': 'No memory recorded yet',
  'El MEMORIA GATE escribe una entrada en memory/journal/ cuando un ciclo deja una lección real — un supuesto que falló, un descubrimiento costoso, un gasto de tokens evitable. Con ≥5 entradas el orquestador las destila en memory/lessons.md.':
    'The MEMORIA GATE writes an entry in memory/journal/ when a cycle leaves a real lesson — a failed assumption, a costly discovery, an avoidable token spend. At ≥5 entries the orchestrator distills them into memory/lessons.md.',
  'Lecciones destiladas': 'Distilled lessons',
  'líneas en lessons.md · cap {cap}': 'lines in lessons.md · cap {cap}',
  'Entradas del journal': 'Journal entries',
  'umbral de destilación: {n}': 'distillation threshold: {n}',
  'Última entrada': 'Latest entry',
  '{n} entradas acumuladas (≥{cap}): el orquestador las destila en lessons.md al iniciar el próximo ciclo y borra lo destilado.':
    '{n} entries accumulated (≥{cap}): the orchestrator distills them into lessons.md when the next cycle opens and deletes what it distilled.',
  'lessons.md pasó las {cap} líneas: toca podar lo que ya no aplica.':
    'lessons.md is over {cap} lines: time to prune what no longer applies.',
  'Una línea por lección. Se lee al iniciar cada sesión — por eso tiene tope: lo que no se aplica más, se poda.':
    'One line per lesson. It is read at the start of every session — hence the cap: what no longer applies gets pruned.',
  'Todavía no hay lecciones destiladas': 'No distilled lessons yet',
  'Se escriben cuando el journal acumula ≥{n} entradas.':
    'They are written once the journal accumulates ≥{n} entries.',
  'Journal episódico': 'Episodic journal',
  'Qué pasó, qué lección dejó y qué costo era evitable — una entrada por ciclo o fix que enseñó algo. Más reciente primero.':
    'What happened, what lesson it left and what cost was avoidable — one entry per cycle or fix that taught something. Newest first.',
  'No se pudo cargar {file}': 'Could not load {file}',
  '{lessons} líneas · {entries} entrada{suffix}': '{lessons} lines · {entries} journal entries',
  ciclo: 'cycle',
  Proveedor: 'Provider',
  'Modelos usados': 'Models used',
  Origen: 'Source',
  exacto: 'exact',
  estimado: 'estimated',
  mixto: 'mixed',
  '<strong>Origen</strong>: exacto = leído de un contador de la sesión (por ejemplo <code>agent-usage-notification</code>, el conteo por subagente que reporta el arnés); estimado = aproximación declarada por el agente (arneses sin contador, como Copilot o Antigravity); mixto = mezcla de ambos.':
    '<strong>Source</strong>: exact = read from a session counter (for example <code>agent-usage-notification</code>, the per-subagent count the harness reports); estimated = an approximation declared by the agent (harnesses with no counter, such as Copilot or Antigravity); mixed = a blend of both.',
  ' · {n} omitida{suffix}': ' · {n} skipped',
  'skipped — resuelta / no aplica': 'skipped — resolved / not applicable',
  'Tokens in': 'Tokens in',
  'Tokens out': 'Tokens out',
  'Costo aprox.': 'Approx. cost',
  'Metodología y tarifas': 'Methodology and rates',
  'Σ estimation_hours de las tasks × {rate}/h.': 'Σ estimation_hours of the tasks × {rate}/h.',
  'tokens registrados × tarifa del modelo (USD por millón de tokens).':
    'tokens recorded × model rate (USD per million tokens).',
  'Prioridad de fuentes por ciclo: <code>metrics.usage.by_agent</code> → <code>metrics.usage.by_tier</code> → <code>tasks[].usage</code> → tokens top-level de <code>metrics.usage</code>.':
    'Source priority per cycle: <code>metrics.usage.by_agent</code> → <code>metrics.usage.by_tier</code> → <code>tasks[].usage</code> → top-level tokens of <code>metrics.usage</code>.',
  'La telemetría la escribe cada agente al cerrar su unidad de trabajo y el sdd-reviewer la consolida al cerrar el ciclo (<code>metrics.usage</code>); es obligatoria y, cuando el arnés no expone contador, se registra como estimación declarada (<code>approx: true</code>) — nunca se omite.':
    'Each agent writes the telemetry when it closes its unit of work and sdd-reviewer consolidates it at cycle close (<code>metrics.usage</code>); it is mandatory and, when the harness exposes no counter, it is recorded as a declared estimate (<code>approx: true</code>) — never omitted.',
  '* Tokens sin modelo declarado (o con un modelo sin tarifa) se tarifan como <code>{tier}</code>.':
    '* Tokens with no declared model (or with a model that has no rate) are priced as <code>{tier}</code>.',
  'No hay <code>sdd/pricing.json</code> — usando tarifas por defecto del kit.':
    'There is no <code>sdd/pricing.json</code> — using the kit’s default rates.',
  'Tarifas editables en <code>sdd/pricing.json</code>.': 'Rates editable in <code>sdd/pricing.json</code>.',

  // Views / nav sections
  'Visión general': 'Overview',
  'Herramientas SDD': 'SDD Tools',
  Arquitectura: 'Architecture',

  // STATUS_META (registry status badges)
  Completado: 'Completed',
  Hecho: 'Done',
  Implementado: 'Implemented',
  Resuelto: 'Resolved',
  Validado: 'Validated',
  Migrado: 'Migrated',
  Aprobado: 'Approved',
  Abierto: 'Open',
  Actualizado: 'Updated',
  Pendiente: 'Pending',
  Planificado: 'Planned',
  Borrador: 'Draft',
  Definido: 'Defined',
  Archivado: 'Archived',
  Omitido: 'Skipped',
  Obsoleto: 'Deprecated',
  Cancelado: 'Cancelled',
  Absorbido: 'Absorbed',
  Disponible: 'Available',

  // Cycle field labels reused elsewhere
  Inicio: 'Start',
  Fin: 'End',
  '{count} ciclo{suffix}': '{count} cycle{suffix}',
  '{count} tarea{suffix}': '{count} task{suffix}',
  '{shown} / {total} ciclo{suffix}': '{shown} / {total} cycle{suffix}',

  // taskTypeLabel
  Infraestructura: 'Infrastructure',

  // Schema/API field-table columns not already covered
  Notas: 'Notes',
  Nombre: 'Name',
  Columnas: 'Columns',
  Código: 'Code',
  Descripción: 'Description',
  Columna: 'Column',

  // Costs — tabs, charts, RTK
  'Vistas de costos':
    'Cost views',
  'Sin datos para graficar todavía.':
    'No data to chart yet.',
  'Otros ({count})':
    'Other ({count})',
  'Distribución':
    'Breakdown',
  'Gráfico de columnas':
    'Column chart',
  'Gráfico de línea':
    'Line chart',
  'Se muestran {shown} de {total}; el resto está en la tabla.':
    'Showing {shown} of {total}; the rest is in the table.',
  'Fixes globales':
    'Global fixes',
  'Costo agéntico por agente':
    'Agentic cost per agent',
  'Qué parte del gasto se lleva cada rol SDD.':
    'How much of the spend each SDD role takes.',
  'Tokens por proveedor':
    'Tokens per provider',
  'Reparto de los tokens registrados entre proveedores.':
    'How the recorded tokens split across providers.',
  'Origen de la telemetría':
    'Telemetry origin',
  'Registros leídos de un contador real contra estimaciones declaradas por el agente.':
    'Records read from a real counter against estimates declared by the agent.',
  'Exacto':
    'Exact',
  'Estimado':
    'Estimated',
  '{count} registros':
    '{count} records',
  'Costo por spec — solo ciclos':
    'Cost per spec — cycles only',
  'Horas estimadas de las tasks contra los tokens registrados en cada ciclo de la spec.':
    'Estimated task hours against the tokens recorded in each cycle of the spec.',
  'Entrada y salida apiladas por ciclo, en orden de spec.':
    'Input and output stacked per cycle, in spec order.',
  'Specs con ciclos':
    'Specs with cycles',
  'Ciclos':
    'Cycles',
  '{count} ciclos. La tabla tiene alto fijo: desplazá dentro de ella.':
    '{count} cycles. The table has a fixed height: scroll inside it.',
  'Detalle por ciclo':
    'Cycle detail',
  'Costo por tipo de fix':
    'Cost per fix type',
  'Tradicional contra agéntico, agrupado por HOTFIX / BUGFIX / FIX.':
    'Traditional against agentic, grouped by HOTFIX / BUGFIX / FIX.',
  'Fixes por severidad':
    'Fixes by severity',
  'Cuántos fixes entraron por cada nivel.':
    'How many fixes came in at each level.',
  'Crítica':
    'Critical',
  'Alta':
    'High',
  'Media':
    'Medium',
  'Baja':
    'Low',
  'Sin severidad':
    'No severity',
  'Fixes por estado':
    'Fixes by status',
  'Pendientes, en curso y cerrados.':
    'Pending, in progress and closed.',
  'Tokens por fix':
    'Tokens per fix',
  'Los fixes que más tokens consumieron, de mayor a menor.':
    'The fixes that consumed the most tokens, highest first.',
  'Sin telemetría por fix todavía. Se registra en el <code>usage</code> de cada fix al cerrarlo.':
    'No per-fix telemetry yet. It is recorded in each fix’s <code>usage</code> when it closes.',
  'Fixes abiertos':
    'Open fixes',
  'Sin fixes todavía':
    'No fixes yet',
  'Cuando el FIX GATE registre fixes con horas estimadas y telemetría, el tablero aparece acá.':
    'Once the FIX GATE records fixes with estimated hours and telemetry, the board shows up here.',
  '{count} fixes. La tabla tiene alto fijo: desplazá dentro de ella.':
    '{count} fixes. The table has a fixed height: scroll inside it.',
  'Detalle por fix':
    'Fix detail',
  'Apagado':
    'Off',
  'Sin binario':
    'No binary',
  'Activo':
    'Active',
  'Estado':
    'Status',
  'Binario':
    'Binary',
  'Alcance':
    'Scope',
  'no encontrado':
    'not found',
  'Detalle por comando':
    'Per-command detail',
  'leído de la base local de rtk':
    'read from rtk’s local database',
  'no disponible en este runtime (Node ≥ 22.5 lo habilita)':
    'not available on this runtime (Node ≥ 22.5 enables it)',
  'rtk en este repo':
    'rtk in this repo',
  'rtk comprime la salida de los comandos de shell antes de que el agente la lea. Viene activo por defecto con el kit; los hooks de Claude Code y Gemini CLI pasan por <code>sdd/scripts/rtk-hook.mjs</code>, y <code>sdd/tools.json</code> es el interruptor.':
    'rtk compresses the output of shell commands before the agent reads it. It ships enabled with the kit; the Claude Code and Gemini CLI hooks go through <code>sdd/scripts/rtk-hook.mjs</code>, and <code>sdd/tools.json</code> is the switch.',
  'Apagar / prender: <code>pnpm sdd:rtk -- --disable</code> · <code>pnpm sdd:rtk -- --enable</code>, o pedírselo al sdd-steward. Estos números viven en la máquina donde corre <code>sdd:docs</code> (rtk guarda su historial por usuario, no en el repo) y son estimaciones: rtk cuenta bytes ÷ 4, no tokens del proveedor.':
    'Turn off / on: <code>pnpm sdd:rtk -- --disable</code> · <code>pnpm sdd:rtk -- --enable</code>, or ask the sdd-steward. These numbers live on the machine running <code>sdd:docs</code> (rtk keeps its history per user, not in the repo) and are estimates: rtk counts bytes ÷ 4, not provider tokens.',
  'Actualizar':
    'Refresh',
  'Comandos comprimidos':
    'Compressed commands',
  'Tokens generados':
    'Tokens generated',
  'Tokens leídos por el agente':
    'Tokens read by the agent',
  'Tokens ahorrados':
    'Tokens saved',
  '{pct}% promedio':
    '{pct}% average',
  'Equivalente aprox.':
    'Approx. equivalent',
  'a tarifa input de {tier}':
    'at {tier} input rate',
  'Últimos 30 días — leído vs ahorrado':
    'Last 30 days — read vs saved',
  'Cada columna es la salida completa de los comandos del día: la parte que el agente leyó y la que rtk recortó.':
    'Each column is the full output of the day’s commands: the part the agent read and the part rtk trimmed.',
  'Leído por el agente':
    'Read by the agent',
  'Ahorrado':
    'Saved',
  '{commands} comandos · leídos {read} · ahorrados {saved} ({pct}%)':
    '{commands} commands · read {read} · saved {saved} ({pct}%)',
  'Ahorro acumulado (30 días)':
    'Cumulative savings (30 days)',
  'Tokens que el agente no tuvo que leer, sumados día a día.':
    'Tokens the agent never had to read, added up day by day.',
  'acumulado: {saved} tokens ahorrados':
    'cumulative: {saved} tokens saved',
  'Por mes':
    'Per month',
  'Mismo desglose, agrupado por mes.':
    'Same breakdown, grouped by month.',
  'Comando':
    'Command',
  'Veces':
    'Times',
  'Generados':
    'Generated',
  'Leídos':
    'Read',
  'Ahorrados':
    'Saved',
  'Tiempo':
    'Time',
  'Cuándo':
    'When',
  '{count} familias de comando. La tabla tiene alto fijo: desplazá dentro de ella.':
    '{count} command families. The table has a fixed height: scroll inside it.',
  'Ahorro por comando':
    'Savings per command',
  'Qué comandos recortan más. Agrupados por familia (<code>git status</code>, <code>pnpm test</code>, …).':
    'Which commands trim the most. Grouped by family (<code>git status</code>, <code>pnpm test</code>, …).',
  'Últimos comandos':
    'Recent commands',
  'Los {count} más recientes en este repo.':
    'The {count} most recent in this repo.',
  'Solo con el servidor local':
    'Local server only',
  'La ganancia de rtk se lee de la máquina que corre pnpm sdd:docs; en hosting estático no está disponible.':
    'rtk savings are read from the machine running pnpm sdd:docs; they are not available on static hosting.',
  'El servidor no respondió':
    'The server did not answer',
  'Reiniciá pnpm sdd:docs para tomar la versión nueva del visor.':
    'Restart pnpm sdd:docs to pick up the new viewer version.',
  'rtk no está instalado en esta máquina':
    'rtk is not installed on this machine',
  'Corré pnpm sdd:rtk para instalarlo (descarga el binario oficial con checksum verificado). Si la red lo bloquea: curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/refs/heads/master/install.sh | sh':
    'Run pnpm sdd:rtk to install it (downloads the official binary with a verified checksum). If the network blocks it: curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/refs/heads/master/install.sh | sh',
  'Todavía sin comandos comprimidos en este repo':
    'No compressed commands in this repo yet',
  'Apenas un agente corra comandos de shell con el hook activo, el ahorro aparece acá.':
    'As soon as an agent runs shell commands with the hook active, the savings show up here.',
  'rtk está apagado en sdd/tools.json. Prendelo con pnpm sdd:rtk -- --enable.':
    'rtk is off in sdd/tools.json. Turn it on with pnpm sdd:rtk -- --enable.',
  'Cuando el loop SDD complete ciclos con tasks estimadas y telemetría de tokens, el tablero aparece acá. La pestaña RTK ya muestra el ahorro de tokens en comandos.':
    'Once the SDD loop completes cycles with estimated tasks and token telemetry, the board shows up here. The RTK tab already shows the token savings on commands.',
};

function t(text, params) {
  let resolved = currentLang === 'es' ? text : (EN_STRINGS[text] ?? text);
  if (params) {
    resolved = resolved.replace(/\{(\w+)\}/g, (match, key) =>
      key in params ? String(params[key]) : match,
    );
  }
  return resolved;
}

function localeTag() {
  return currentLang === 'es' ? 'es-AR' : 'en-US';
}

function localizedDocPath(path) {
  return path.replace('documentation/es/', `documentation/${currentLang}/`);
}

function persistLang(lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
  } catch {}
}

function setLang(lang) {
  if (!SUPPORTED_LANGS.includes(lang) || lang === currentLang) return;
  currentLang = lang;
  persistLang(lang);
  document.documentElement.lang = lang;
  paintLangToggle();
  paintStaticChrome();
  buildNav();
  paintShellChrome();
  onRoute();
}

function paintStaticChrome() {
  document
    .getElementById('sidebar-close')
    ?.setAttribute('aria-label', t('Cerrar menú'));
  document
    .getElementById('menu-button')
    ?.setAttribute('aria-label', t('Abrir menú'));
  document
    .getElementById('nav-sections')
    ?.setAttribute('aria-label', t('Navegación principal'));
  const initialState = document.querySelector('.initial-state');
  if (initialState) initialState.textContent = t('Cargando SDD Docs…');
}

function paintLangToggle() {
  const next = currentLang === 'es' ? 'en' : 'es';
  const label = t('Cambiar idioma a {lang}', {
    lang: next === 'es' ? 'español' : 'English',
  });
  for (const button of document.querySelectorAll('.lang-toggle')) {
    button.textContent = next.toUpperCase();
    button.setAttribute('aria-label', label);
    button.title = label;
  }
}

function sddUrl(path) {
  return new URL(path, SDD_BASE).href;
}

const CATALOG = Object.freeze({
  agents: [
    {
      file: 'sdd-orchestrator.agent.md',
      num: '01',
      label: 'Orquestador',
      accent: 'emerald',
    },
    {
      file: 'sdd-functional.agent.md',
      num: '02',
      label: 'Funcional',
      accent: 'sky',
    },
    {
      file: 'sdd-planner.agent.md',
      num: '03',
      label: 'Planner',
      accent: 'violet',
    },
    {
      file: 'sdd-architect.agent.md',
      num: '04',
      label: 'Arquitecto',
      accent: 'amber',
    },
    {
      file: 'sdd-implementor-back.agent.md',
      num: '05',
      label: 'Impl. Backend',
      accent: 'blue',
    },
    {
      file: 'sdd-implementor-front.agent.md',
      num: '06',
      label: 'Impl. Frontend',
      accent: 'pink',
    },
    {
      file: 'sdd-reviewer.agent.md',
      num: '07',
      label: 'Reviewer',
      accent: 'teal',
    },
  ],
  skills: [
    { dir: 'generate-api-contract', file: 'SKILL.md', category: 'Generator' },
    { dir: 'generate-nestjs-module', file: 'SKILL.md', category: 'Generator' },
    { dir: 'generate-prisma-schema', file: 'SKILL.md', category: 'Generator' },
    {
      dir: 'generate-react-component',
      file: 'SKILL.md',
      category: 'Generator',
    },
    { dir: 'generate-springboot-api', file: 'SKILL.md', category: 'Generator' },
    { dir: 'sdd-architect', file: 'SKILL.md', category: 'SDD Agent' },
    { dir: 'sdd-data-schemas', file: 'SKILL.md', category: 'SDD Utility' },
    { dir: 'sdd-file-structure', file: 'SKILL.md', category: 'SDD Utility' },
    { dir: 'sdd-functional', file: 'SKILL.md', category: 'SDD Agent' },
    { dir: 'sdd-implementor-back', file: 'SKILL.md', category: 'SDD Agent' },
    { dir: 'sdd-implementor-front', file: 'SKILL.md', category: 'SDD Agent' },
    { dir: 'sdd-orchestrator', file: 'SKILL.md', category: 'SDD Agent' },
    { dir: 'sdd-planner', file: 'SKILL.md', category: 'SDD Agent' },
    { dir: 'sdd-reviewer', file: 'SKILL.md', category: 'SDD Agent' },
  ],
  prompts: [
    {
      file: 'start-sdd-cycle.prompt.md',
      label: 'Inicio de ciclo',
      description:
        'Guía al Orquestador para iniciar un nuevo ciclo SDD. Verifica precondiciones, crea brief.yaml y ciclo.json.',
      trigger: 'Al iniciar un nuevo ciclo SDD',
    },
    {
      file: 'check-spec-before-implement.prompt.md',
      label: 'Verificación SPEC GATE',
      description:
        'Checklist obligatorio que verifica que todos los documentos del ciclo existen antes de implementar.',
      trigger: 'Antes de cualquier implementación',
    },
    {
      file: 'hotfix-bypass-gate.prompt.md',
      label: 'FIX GATE bypass',
      description:
        'Proceso ligero para fixes urgentes. Registra en fixes.json y autoriza implementación sin ciclo completo.',
      trigger: 'Con prefijos [HOTFIX], [BUGFIX], [FIX], [IMPROVEMENT]',
    },
    {
      file: 'hermes-resume.prompt.md',
      label: 'Retomar el loop',
      description:
        'Prompt standalone para retomar el loop agéntico en una sesión nueva: carga lecciones y global.json, diagnostica en qué punto quedó el ciclo y sigue desde ahí.',
      trigger: 'Al retomar un loop en una sesión nueva',
    },
    {
      file: 'sdd-steward.prompt.md',
      label: 'Conserje del kit',
      description:
        'Punto de entrada para cualquier pedido sobre el kit: estado del arnés, actualización de la librería, costos y salud. Resuelve lo que no tiene otro dueño y rutea el resto sin bypassear gates.',
      trigger: 'Ante cualquier pregunta u operación sobre el kit',
    },
    {
      file: 'review-cycle.prompt.md',
      label: 'Revisión de ciclo',
      description:
        'Guía al Reviewer para cerrar un ciclo SDD. Evalúa entregables, valida specs, ejecuta el CONTEXTO GATE aditivo (escribe el fragmento en updates/ del subproyecto) y marca cycle.json como completed.',
      trigger: 'Al cerrar un ciclo SDD',
    },
  ],
  schemas: [
    {
      file: 'global.schema.json',
      name: 'Global',
      target: 'sdd/global.json',
      writers: 'Orquestador · Reviewer',
    },
    {
      file: 'specs-index.schema.json',
      name: 'Specs Index',
      target: 'sdd/specs/index.json',
      writers: 'Autor de la spec · Reviewer',
    },
    {
      file: 'cycle.schema.json',
      name: 'Cycle',
      target: 'cycles/cycle-XX/cycle.json',
      writers: 'Orquestador · Reviewer',
    },
    {
      file: 'cycle-tasks.schema.json',
      name: 'Cycle Tasks',
      target: 'cycles/cycle-XX/tasks.json',
      writers: 'Planner · Implementadores · Reviewer',
    },
    {
      file: 'tasks-index.schema.json',
      name: 'Tasks Index',
      target: 'sdd/tasks.json',
      writers: 'Generado (rebuild-tasks-index)',
    },
    {
      file: 'api.schema.json',
      name: 'API',
      target: 'sdd/api.json',
      writers: 'Arquitecto · Implementador back · Reviewer',
    },
    {
      file: 'db-schema.schema.json',
      name: 'DB Schema',
      target: 'sdd/schema.json',
      writers: 'Arquitecto · Implementador back · Reviewer',
    },
    {
      file: 'components.schema.json',
      name: 'Components',
      target: 'sdd/components.json',
      writers: 'Arquitecto · Implementador front · Reviewer',
    },
    {
      file: 'fixes.schema.json',
      name: 'Fixes',
      target: 'sdd/fixes.json',
      writers: 'Orquestador (FIX GATE) · dev · Reviewer',
    },
  ],
  contextSeeds: [],
  helpDocs: [
    {
      id: 'install',
      path: 'documentation/es/INSTALL.md',
      label: 'Instalar y actualizar',
      badge: 'Setup',
      description:
        'Cómo instalar el framework en un repo y actualizar un kit ya instalado con update sdd.',
    },
    {
      id: 'how-to',
      path: 'documentation/es/HOW-TO-USE-SDD.md',
      label: 'Cómo usar SDD',
      badge: 'Guía',
      description:
        'Guía paso a paso para usar el sistema SDD: setup, flujo de trabajo, FIX GATE y cheat sheet.',
    },
    {
      id: 'readme',
      path: 'documentation/es/README.md',
      label: 'README SDD',
      badge: 'Referencia',
      description:
        'Referencia completa del sistema SDD: estructura, gates, agentes, skills y artefactos.',
    },
  ],
});

const AGENT_ACCENT_CYCLE = [
  'emerald',
  'sky',
  'violet',
  'amber',
  'blue',
  'pink',
  'teal',
];

function deriveLabelFromFile(file, stripPrefixes, stripSuffix) {
  let base = stripSuffix ? file.replace(stripSuffix, '') : file;
  for (const prefix of stripPrefixes) {
    if (base.startsWith(prefix)) {
      base = base.slice(prefix.length);
      break;
    }
  }
  return base
    .split(/[-_]/)
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function enrichAgentManifest(manifestAgents) {
  const known = new Map(CATALOG.agents.map((agent) => [agent.file, agent]));
  const maxKnownNum = Math.max(
    ...CATALOG.agents.map((agent) => Number(agent.num)),
  );
  const unknownFiles = sortBy(
    manifestAgents
      .map((entry) => entry.file)
      .filter((file) => !known.has(file)),
    (file) => file,
  );
  const merged = manifestAgents.map((entry) => {
    if (known.has(entry.file)) return known.get(entry.file);
    const offset = unknownFiles.indexOf(entry.file);
    return {
      file: entry.file,
      num: String(maxKnownNum + 1 + offset).padStart(2, '0'),
      label: deriveLabelFromFile(entry.file, ['sdd-'], /\.agent\.md$/),
      accent:
        AGENT_ACCENT_CYCLE[(maxKnownNum + offset) % AGENT_ACCENT_CYCLE.length],
    };
  });
  return sortBy(merged, (agent) => agent.num);
}

function deriveSkillCategory(dir) {
  if (dir.startsWith('generate-')) return 'Generator';
  if (dir.startsWith('sdd-')) return 'SDD Utility';
  return 'Tool';
}

function enrichSkillManifest(manifestSkills) {
  const known = new Map(CATALOG.skills.map((skill) => [skill.dir, skill]));
  return manifestSkills.map(
    (entry) =>
      known.get(entry.dir) ?? {
        dir: entry.dir,
        file: entry.file,
        category: deriveSkillCategory(entry.dir),
      },
  );
}

function enrichPromptManifest(manifestPrompts) {
  const known = new Map(CATALOG.prompts.map((prompt) => [prompt.file, prompt]));
  return manifestPrompts.map(
    (entry) =>
      known.get(entry.file) ?? {
        file: entry.file,
        label: deriveLabelFromFile(entry.file, [], /\.prompt\.md$/),
        description: '',
        trigger: '',
      },
  );
}

function enrichSchemaManifest(manifestSchemas) {
  const known = new Map(CATALOG.schemas.map((schema) => [schema.file, schema]));
  return manifestSchemas.map(
    (entry) =>
      known.get(entry.file) ?? {
        file: entry.file,
        name: deriveLabelFromFile(entry.file, [], /\.schema\.json$/),
        target: '—',
        writers: '—',
      },
  );
}

function manifestFallbackHint() {
  return `<p class="card-hint" style="margin:-8px 0 16px">${t('No se pudo cargar sdd/catalog.json — mostrando catálogo estático embebido.')}</p>`;
}

const CYCLE_ROOT_DOCS = [
  'brief.yaml',
  'functional.md',
  'planner.md',
  'architect.md',
  'cycle.json',
  'tasks.json',
];
const MAX_CYCLE_PROBE = 20;

function escapeHtml(text) {
  return String(text)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function stripSddPrefix(path) {
  return path.replace(/^sdd\//, '');
}

function formatHours(hours) {
  if (hours === null || hours === undefined || Number.isNaN(Number(hours)))
    return '—';
  const value = Number(hours);
  return value % 1 === 0 ? `${value}h` : `${value.toFixed(1)}h`;
}

function pad3(num) {
  return String(num).padStart(3, '0');
}

function sortBy(items, keyFn) {
  return [...items].sort((a, b) => {
    const ka = keyFn(a);
    const kb = keyFn(b);
    if (ka < kb) return -1;
    if (ka > kb) return 1;
    return 0;
  });
}

function groupBy(items, keyFn) {
  const groups = new Map();
  for (const item of items) {
    const key = keyFn(item);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(item);
  }
  return groups;
}

class SddError extends Error {
  constructor(message, kind, path) {
    super(message);
    this.name = 'SddError';
    this.kind = kind;
    this.path = path;
  }
}

const cache = new Map();
let lastLoadedAt = null;

function invalidateCache() {
  cache.clear();
}

async function fetchJson(path) {
  const url = sddUrl(path);
  if (cache.has(url)) return cache.get(url);
  const promise = (async () => {
    let response;
    try {
      response = await fetch(url);
    } catch (err) {
      throw new SddError(
        t('Error de red al pedir {path}', { path }),
        'network',
        path,
      );
    }
    if (response.status === 404) {
      throw new SddError(
        t('No encontrado: {path}', { path }),
        'not-found',
        path,
      );
    }
    if (!response.ok) {
      throw new SddError(
        t('Error HTTP {status} al pedir {path}', {
          status: response.status,
          path,
        }),
        'http',
        path,
      );
    }
    const text = await response.text();
    try {
      const data = JSON.parse(text);
      lastLoadedAt = new Date();
      return data;
    } catch (err) {
      throw new SddError(
        t('JSON inválido en {path}', { path }),
        'invalid-json',
        path,
      );
    }
  })();
  cache.set(url, promise);
  return promise;
}

async function fetchText(path) {
  const url = sddUrl(path);
  if (cache.has(url)) return cache.get(url);
  const promise = (async () => {
    let response;
    try {
      response = await fetch(url);
    } catch (err) {
      throw new SddError(
        t('Error de red al pedir {path}', { path }),
        'network',
        path,
      );
    }
    if (response.status === 404) {
      throw new SddError(
        t('No encontrado: {path}', { path }),
        'not-found',
        path,
      );
    }
    if (!response.ok) {
      throw new SddError(
        t('Error HTTP {status} al pedir {path}', {
          status: response.status,
          path,
        }),
        'http',
        path,
      );
    }
    const text = await response.text();
    lastLoadedAt = new Date();
    return text;
  })();
  cache.set(url, promise);
  return promise;
}

async function resourceExists(path) {
  try {
    const response = await fetch(sddUrl(path), { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
}

async function loadGlobal() {
  return fetchJson('global.json');
}

async function loadSpecsIndex() {
  return fetchJson('specs/index.json');
}

async function loadFixes() {
  return fetchJson('fixes.json');
}

async function loadSchemaRegistry() {
  return fetchJson('schema.json');
}

async function loadApiRegistry() {
  return fetchJson('api.json');
}

async function loadComponentsRegistry() {
  return fetchJson('components.json');
}

async function loadManifest() {
  return fetchJson('catalog.json');
}

async function loadAssembledTasks() {
  const index = await fetchJson('tasks.json');
  const specs = {};

  const entries = Object.entries(index.specs ?? {}).flatMap(([specId, spec]) =>
    Object.entries(spec.cycles ?? {}).map(([cycleId, entry]) => ({
      specId,
      cycleId,
      entry,
    })),
  );

  const results = await Promise.allSettled(
    entries.map(async ({ specId, cycleId, entry }) => {
      const cycle = await fetchJson(stripSddPrefix(entry.file));
      return { specId, cycleId, cycle };
    }),
  );

  for (const result of results) {
    if (result.status !== 'fulfilled') continue;
    const { specId, cycleId, cycle } = result.value;
    specs[specId] ??= { cycles: {} };
    specs[specId].cycles[cycleId] = {
      module: cycle.module,
      app: cycle.apps?.[0],
      apps: cycle.apps,
      flow: cycle.flow,
      user_stories_generated: cycle.user_stories_generated,
      prerequisites: cycle.prerequisites,
      tasks: cycle.tasks,
    };
  }

  return { sdd_version: index.sdd_version, specs };
}

async function loadCycleIndex() {
  const seen = new Map();

  const [tasksIndexResult, specsIndexResult] = await Promise.allSettled([
    fetchJson('tasks.json'),
    loadSpecsIndex(),
  ]);

  if (
    tasksIndexResult.status !== 'fulfilled' &&
    specsIndexResult.status !== 'fulfilled'
  ) {
    throw tasksIndexResult.reason;
  }

  if (tasksIndexResult.status === 'fulfilled') {
    for (const [specId, spec] of Object.entries(
      tasksIndexResult.value.specs ?? {},
    )) {
      const cycleIds = Object.keys(spec.cycles ?? {});
      if (!seen.has(specId)) seen.set(specId, new Set());
      for (const cycleId of cycleIds) seen.get(specId).add(cycleId);
    }
  }

  const specIds =
    specsIndexResult.status === 'fulfilled'
      ? specsIndexResult.value.specs.map((s) => s.id)
      : [];

  const probeResults = await Promise.allSettled(
    specIds.map(async (specId) => {
      const known = seen.get(specId) ?? new Set();
      let highest = 0;
      for (const cycleId of known) {
        const match = /^cycle-(\d+)$/.exec(cycleId);
        if (match) highest = Math.max(highest, Number(match[1]));
      }
      const discovered = [];
      let probeCount = 0;
      let next = highest + 1;
      while (probeCount < MAX_CYCLE_PROBE) {
        const cycleId = `cycle-${String(next).padStart(2, '0')}`;
        const exists = await resourceExists(
          `specs/${specId}/cycles/${cycleId}/cycle.json`,
        );
        probeCount++;
        if (!exists) break;
        discovered.push(cycleId);
        next++;
      }
      return { specId, discovered };
    }),
  );

  for (const result of probeResults) {
    if (result.status !== 'fulfilled') continue;
    const { specId, discovered } = result.value;
    if (!seen.has(specId)) seen.set(specId, new Set());
    for (const cycleId of discovered) seen.get(specId).add(cycleId);
  }

  const index = [];
  for (const [specId, cycleIds] of seen.entries()) {
    for (const cycleId of cycleIds) index.push({ specId, cycleId });
  }
  return index;
}

async function loadCycleJson(specId, cycleId) {
  return fetchJson(`specs/${specId}/cycles/${cycleId}/cycle.json`);
}

async function resolveCycleFiles(specId, cycleId, cycleJson) {
  const known = new Set(
    [
      ...Object.values(cycleJson?.documents ?? {}),
      ...(cycleJson?.artifacts ?? []),
    ].map((p) => stripSddPrefix(p)),
  );

  const files = [];
  const basePath = `specs/${specId}/cycles/${cycleId}`;

  for (const name of CYCLE_ROOT_DOCS) {
    const path = `${basePath}/${name}`;
    if (known.has(path)) {
      files.push({ name, path, kind: 'document' });
      continue;
    }
    const exists = await resourceExists(path);
    if (exists) files.push({ name, path, kind: 'document' });
  }

  for (const artifactPath of cycleJson?.artifacts ?? []) {
    const path = stripSddPrefix(artifactPath);
    const name = path.split('/').pop();
    files.push({ name, path, kind: 'artifact' });
  }

  return files;
}

async function loadMarkdown(path) {
  const key = `markdown:${sddUrl(path)}`;
  if (cache.has(key)) return cache.get(key);
  const promise = fetchText(path).then((source) => {
    const imageBase = sddUrl(path.slice(0, path.lastIndexOf('/') + 1));
    return renderMarkdown(source, { imageBase });
  });
  cache.set(key, promise);
  return promise;
}

const FENCE_MARKER = '@@SDDFENCE';
const INLINE_CODE_TOKEN = '@@SDDCODE';
const INLINE_LINK_TOKEN = '@@SDDLINK';
const HEADING_PATTERN = /^ {0,3}(#{1,6})(?:\s+(.*?))?\s*$/;

function renderMarkdown(source, options = {}) {
  const { imageBase } = options;
  const normalized = normalizeMarkdownSource(source);
  const { text, fences } = parkCodeFences(normalized);
  const blocks = parseBlocks(text.split('\n'));
  const seenIds = new Set();
  return blocks
    .map((block) => renderBlock(block, fences, imageBase, seenIds))
    .join('\n');
}

function normalizeMarkdownSource(source) {
  return String(source).replace(/\r\n?/g, '\n').replace(/\t/g, '    ');
}

function matchFenceOpen(line) {
  const match = /^ {0,3}(`{3,}|~{3,})[ \t]*([^\s`]*)[ \t]*$/.exec(line);
  if (!match) return null;
  return { char: match[1][0], length: match[1].length, lang: match[2] };
}

function matchFenceClose(line, open) {
  const match = /^ {0,3}(`{3,}|~{3,})[ \t]*$/.exec(line);
  if (!match) return false;
  return match[1][0] === open.char && match[1].length >= open.length;
}

function parkCodeFences(text) {
  const lines = text.split('\n');
  const output = [];
  const fences = new Map();
  let index = 0;
  let i = 0;
  while (i < lines.length) {
    const open = matchFenceOpen(lines[i]);
    if (!open) {
      output.push(lines[i]);
      i++;
      continue;
    }
    const content = [];
    i++;
    while (i < lines.length && !matchFenceClose(lines[i], open)) {
      content.push(lines[i]);
      i++;
    }
    if (i < lines.length) i++;
    const token = `${FENCE_MARKER}${index}@@`;
    fences.set(token, { lang: open.lang, content: content.join('\n') });
    output.push(token);
    index++;
  }
  return { text: output.join('\n'), fences };
}

function isFenceToken(line) {
  return line.startsWith(FENCE_MARKER);
}

function isHeadingLine(line) {
  return HEADING_PATTERN.test(line);
}

function parseHeadingBlock(line) {
  const match = HEADING_PATTERN.exec(line);
  return {
    type: 'heading',
    level: Math.min(match[1].length, 5),
    text: match[2] ?? '',
  };
}

function isHrLine(line) {
  const trimmed = line.trim().replace(/\s+/g, '');
  if (trimmed.length < 3) return false;
  return /^-+$/.test(trimmed) || /^\*+$/.test(trimmed) || /^_+$/.test(trimmed);
}

function isBlockquoteLine(line) {
  return /^ {0,3}>/.test(line);
}

function collectBlockquote(lines, start) {
  const content = [];
  let i = start;
  while (i < lines.length && isBlockquoteLine(lines[i])) {
    content.push(lines[i].replace(/^ {0,3}>\s?/, ''));
    i++;
  }
  return {
    block: { type: 'blockquote', blocks: parseBlocks(content) },
    next: i,
  };
}

function splitTableRow(line) {
  const trimmed = line.trim().replace(/^\|/, '').replace(/\|$/, '');
  const cells = [];
  let current = '';
  for (let idx = 0; idx < trimmed.length; idx++) {
    const char = trimmed[idx];
    if (char === '\\' && trimmed[idx + 1] === '|') {
      current += '|';
      idx++;
      continue;
    }
    if (char === '|') {
      cells.push(current);
      current = '';
      continue;
    }
    current += char;
  }
  cells.push(current);
  return cells;
}

function isTableDelimiterRow(line) {
  const trimmed = line.trim();
  if (!trimmed.includes('-')) return false;
  const cells = splitTableRow(trimmed);
  return (
    cells.length > 0 && cells.every((cell) => /^:?-+:?$/.test(cell.trim()))
  );
}

function isTableHeaderStart(lines, i) {
  if (i + 1 >= lines.length) return false;
  if (!lines[i].includes('|')) return false;
  return isTableDelimiterRow(lines[i + 1]);
}

function parseColumnAlign(cell) {
  const trimmed = cell.trim();
  const left = trimmed.startsWith(':');
  const right = trimmed.endsWith(':');
  if (left && right) return 'center';
  if (right) return 'right';
  if (left) return 'left';
  return null;
}

function collectTable(lines, start) {
  const headerCells = splitTableRow(lines[start]).map((cell) => cell.trim());
  const aligns = splitTableRow(lines[start + 1]).map(parseColumnAlign);
  const rows = [];
  let i = start + 2;
  while (i < lines.length && lines[i].includes('|') && lines[i].trim() !== '') {
    rows.push(splitTableRow(lines[i]).map((cell) => cell.trim()));
    i++;
  }
  return { block: { type: 'table', headerCells, aligns, rows }, next: i };
}

function matchListMarker(line) {
  const match = /^(\s*)([-*+]|\d+[.)])(\s+)(.*)$/.exec(line);
  if (!match) return null;
  return {
    indent: match[1].length,
    ordered: /\d/.test(match[2][0]),
    rest: match[4],
    markerWidth: match[2].length + match[3].length,
  };
}

function isListItemLine(line) {
  return matchListMarker(line) !== null;
}

function getIndent(line) {
  return line.length - line.trimStart().length;
}

function extractTaskMarker(text) {
  const match = /^\[([ xX])\]\s+(.*)$/.exec(text);
  if (!match) return { text, checked: false, isTask: false };
  return {
    text: match[2],
    checked: match[1].toLowerCase() === 'x',
    isTask: true,
  };
}

function looksLikeBlockStart(line) {
  return (
    isFenceToken(line) ||
    isHeadingLine(line) ||
    isHrLine(line) ||
    isBlockquoteLine(line) ||
    isListItemLine(line)
  );
}

function parseListItem(lines, start, indent) {
  const marker = matchListMarker(lines[start]);
  const contentIndent = indent + marker.markerWidth;
  const textParts = [marker.rest];
  let i = start + 1;
  while (
    i < lines.length &&
    lines[i].trim() !== '' &&
    getIndent(lines[i]) >= contentIndent &&
    !looksLikeBlockStart(lines[i].slice(contentIndent))
  ) {
    textParts.push(lines[i].slice(contentIndent).trim());
    i++;
  }
  const childLines = [];
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === '') {
      childLines.push('');
      i++;
      continue;
    }
    if (getIndent(line) < contentIndent) break;
    childLines.push(line.slice(contentIndent));
    i++;
  }
  while (childLines.length && childLines[childLines.length - 1] === '')
    childLines.pop();
  const taskMarker = extractTaskMarker(textParts.join(' '));
  const nestedBlocks = childLines.length ? parseBlocks(childLines) : [];
  return {
    item: {
      text: taskMarker.text,
      checked: taskMarker.checked,
      isTask: taskMarker.isTask,
      nestedBlocks,
    },
    next: i,
  };
}

function parseListLevel(lines, start, indent) {
  const ordered = matchListMarker(lines[start]).ordered;
  const items = [];
  let i = start;
  while (i < lines.length) {
    const marker = matchListMarker(lines[i]);
    if (!marker || getIndent(lines[i]) !== indent || marker.ordered !== ordered)
      break;
    const { item, next } = parseListItem(lines, i, indent);
    items.push(item);
    i = next;
  }
  return { block: { type: 'list', ordered, items }, next: i };
}

function collectList(lines, start) {
  return parseListLevel(lines, start, getIndent(lines[start]));
}

function collectParagraph(lines, start) {
  const textLines = [];
  let i = start;
  while (
    i < lines.length &&
    lines[i].trim() !== '' &&
    !isFenceToken(lines[i]) &&
    !isHeadingLine(lines[i]) &&
    !isHrLine(lines[i]) &&
    !isBlockquoteLine(lines[i]) &&
    !isListItemLine(lines[i]) &&
    !isTableHeaderStart(lines, i)
  ) {
    textLines.push(lines[i].trim());
    i++;
  }
  return { block: { type: 'paragraph', text: textLines.join(' ') }, next: i };
}

function parseBlocks(lines) {
  const blocks = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === '') {
      i++;
      continue;
    }
    if (isFenceToken(line)) {
      blocks.push({ type: 'fence', token: line });
      i++;
      continue;
    }
    if (isHeadingLine(line)) {
      blocks.push(parseHeadingBlock(line));
      i++;
      continue;
    }
    if (isHrLine(line)) {
      blocks.push({ type: 'hr' });
      i++;
      continue;
    }
    if (isBlockquoteLine(line)) {
      const result = collectBlockquote(lines, i);
      blocks.push(result.block);
      i = result.next;
      continue;
    }
    if (isTableHeaderStart(lines, i)) {
      const result = collectTable(lines, i);
      blocks.push(result.block);
      i = result.next;
      continue;
    }
    if (isListItemLine(line)) {
      const result = collectList(lines, i);
      blocks.push(result.block);
      i = result.next;
      continue;
    }
    const result = collectParagraph(lines, i);
    blocks.push(result.block);
    i = result.next;
  }
  return blocks;
}

function decodeNumericEntity(entity) {
  const hex = /^&#x([0-9a-fA-F]+);$/.exec(entity);
  if (hex) return String.fromCodePoint(parseInt(hex[1], 16));
  const dec = /^&#(\d+);$/.exec(entity);
  if (dec) return String.fromCodePoint(parseInt(dec[1], 10));
  return entity;
}

function decodeHtmlEntities(text) {
  return text
    .replaceAll('&amp;', '&')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replace(/&#x?[0-9a-fA-F]+;/g, decodeNumericEntity);
}

function stripWhitespaceAndControlChars(text) {
  let result = '';
  for (const char of text) {
    if (char.charCodeAt(0) <= 32) continue;
    result += char;
  }
  return result;
}

function sanitizeHref(escapedHref) {
  const decoded = decodeHtmlEntities(escapedHref);
  const normalized = stripWhitespaceAndControlChars(decoded);
  const lower = normalized.toLowerCase();
  if (!normalized) return null;
  if (lower.startsWith('#') || /^(https?:\/\/|mailto:)/.test(lower))
    return escapeHtml(decoded);
  const hasScheme = /^[a-z][a-z0-9+.-]*:/.test(lower);
  if (hasScheme) return null;
  return escapeHtml(decoded);
}

function sanitizeImageSrc(escapedSrc, imageBase) {
  const decoded = decodeHtmlEntities(escapedSrc);
  const normalized = stripWhitespaceAndControlChars(decoded);
  const lower = normalized.toLowerCase();
  if (!normalized || lower.startsWith('#')) return null;
  const hasScheme = /^[a-z][a-z0-9+.-]*:/.test(lower);
  if (hasScheme && !/^https?:\/\//.test(lower)) return null;
  if (/^https?:\/\//.test(lower)) return escapeHtml(normalized);
  if (!imageBase) return null;
  try {
    return escapeHtml(new URL(normalized, imageBase).href);
  } catch {
    return null;
  }
}

function renderEmphasis(text) {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/__([^_]+)__/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/_([^_]+)_/g, '<em>$1</em>')
    .replace(/~~([^~]+)~~/g, '<del>$1</del>');
}

function renderLinkTag(label, href) {
  const labelHtml = renderEmphasis(label);
  const safeHref = sanitizeHref(href);
  if (!safeHref) return labelHtml;
  return `<a href="${safeHref}" rel="noopener noreferrer">${labelHtml}</a>`;
}

function renderImageTag(alt, src, imageBase) {
  const safeSrc = sanitizeImageSrc(src, imageBase);
  if (!safeSrc) return alt;
  return `<img src="${safeSrc}" alt="${alt}" loading="lazy">`;
}

function parkInlineCode(text) {
  const codes = new Map();
  let result = '';
  let index = 0;
  let i = 0;
  while (i < text.length) {
    if (text[i] !== '`') {
      result += text[i];
      i++;
      continue;
    }
    const runStart = i;
    let runLength = 0;
    while (text[i] === '`') {
      runLength++;
      i++;
    }
    const closeSeq = '`'.repeat(runLength);
    const closeIndex = text.indexOf(closeSeq, i);
    if (closeIndex === -1) {
      result += text.slice(runStart, i);
      continue;
    }
    const content = text.slice(i, closeIndex);
    const token = `${INLINE_CODE_TOKEN}${index}@@`;
    codes.set(token, `<code>${content.trim()}</code>`);
    result += token;
    index++;
    i = closeIndex + runLength;
  }
  return { text: result, codes };
}

function parkInlineLinks(text, imageBase) {
  const links = new Map();
  let index = 0;
  let result = text.replace(
    /(!?)\[([^\]]*)\]\(([^)]*)\)/g,
    (match, bang, label, href) => {
      const token = `${INLINE_LINK_TOKEN}${index}@@`;
      links.set(
        token,
        bang
          ? renderImageTag(label, href, imageBase)
          : renderLinkTag(label, href),
      );
      index++;
      return token;
    },
  );
  result = result.replace(
    /&lt;((?:https?:\/\/|mailto:)[^ &]+)&gt;/g,
    (match, href) => {
      const token = `${INLINE_LINK_TOKEN}${index}@@`;
      links.set(token, renderLinkTag(href, href));
      index++;
      return token;
    },
  );
  return { text: result, links };
}

function restoreTokens(text, tokenMap) {
  let result = text;
  for (const [token, html] of tokenMap) {
    result = result.split(token).join(html);
  }
  return result;
}

function renderInline(text, imageBase) {
  const escaped = escapeHtml(text);
  const { text: withoutCode, codes } = parkInlineCode(escaped);
  const { text: withoutLinks, links } = parkInlineLinks(withoutCode, imageBase);
  const emphasized = renderEmphasis(withoutLinks);
  return restoreTokens(restoreTokens(emphasized, links), codes);
}

function alignAttr(align) {
  return align ? ` style="text-align:${align}"` : '';
}

function renderFenceBlock(block, fences) {
  const fence = fences.get(block.token);
  if (!fence) return '';
  const langClass = fence.lang
    ? ` class="language-${escapeHtml(fence.lang)}"`
    : '';
  return `<pre><code${langClass}>${escapeHtml(fence.content)}</code></pre>`;
}

function headingAnchorId(text, seenIds) {
  const base = decodeHtmlEntities(text)
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N} _-]/gu, '')
    .replace(/ /g, '-');
  let candidate = base || 'seccion';
  let suffix = 1;
  while (seenIds.has(candidate)) {
    candidate = `${base}-${suffix}`;
    suffix += 1;
  }
  seenIds.add(candidate);
  return candidate;
}

function renderHeadingBlock(block, imageBase, seenIds) {
  const anchor = seenIds
    ? ` id="${escapeHtml(headingAnchorId(block.text, seenIds))}"`
    : '';
  return `<h${block.level}${anchor}>${renderInline(block.text, imageBase)}</h${block.level}>`;
}

function renderBlockquoteBlock(block, fences, imageBase) {
  const inner = block.blocks
    .map((child) => renderBlock(child, fences, imageBase))
    .join('\n');
  return `<blockquote>${inner}</blockquote>`;
}

function renderTableBlock(block, imageBase) {
  const head = block.headerCells
    .map(
      (cell, idx) =>
        `<th${alignAttr(block.aligns[idx])}>${renderInline(cell, imageBase)}</th>`,
    )
    .join('');
  const body = block.rows
    .map(
      (row) =>
        `<tr>${row.map((cell, idx) => `<td${alignAttr(block.aligns[idx])}>${renderInline(cell, imageBase)}</td>`).join('')}</tr>`,
    )
    .join('');
  return `<div class="table-wrapper"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
}

function renderListItem(item, fences, imageBase) {
  const nested = item.nestedBlocks
    .map((child) => renderBlock(child, fences, imageBase))
    .join('');
  if (item.isTask) {
    const checkedAttr = item.checked ? ' checked' : '';
    return `<li class="task-list-item"><input type="checkbox" disabled${checkedAttr}>${renderInline(item.text, imageBase)}${nested}</li>`;
  }
  return `<li>${renderInline(item.text, imageBase)}${nested}</li>`;
}

function renderListBlock(block, fences, imageBase) {
  const tag = block.ordered ? 'ol' : 'ul';
  const items = block.items
    .map((item) => renderListItem(item, fences, imageBase))
    .join('');
  return `<${tag}>${items}</${tag}>`;
}

function renderParagraphBlock(block, imageBase) {
  return `<p>${renderInline(block.text, imageBase)}</p>`;
}

function renderBlock(block, fences, imageBase, seenIds) {
  switch (block.type) {
    case 'fence':
      return renderFenceBlock(block, fences);
    case 'heading':
      return renderHeadingBlock(block, imageBase, seenIds);
    case 'hr':
      return '<hr>';
    case 'blockquote':
      return renderBlockquoteBlock(block, fences, imageBase);
    case 'table':
      return renderTableBlock(block, imageBase);
    case 'list':
      return renderListBlock(block, fences, imageBase);
    case 'paragraph':
      return renderParagraphBlock(block, imageBase);
    default:
      return '';
  }
}

const ICONS = {
  dashboard: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1.5" y="1.5" width="5" height="5" rx="1" /><rect x="9.5" y="1.5" width="5" height="5" rx="1" /><rect x="1.5" y="9.5" width="5" height="5" rx="1" /><rect x="9.5" y="9.5" width="5" height="5" rx="1" /></svg>`,
  planning: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1.5" y="10" width="3" height="4.5" rx="0.5" /><rect x="6.5" y="6.5" width="3" height="8" rx="0.5" /><rect x="11.5" y="2" width="3" height="12.5" rx="0.5" /><line x1="1.5" y1="14.5" x2="14.5" y2="14.5" /></svg>`,
  file: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 1.5H3.5A1 1 0 0 0 2.5 2.5v11A1 1 0 0 0 3.5 14.5h9A1 1 0 0 0 13.5 13.5V6L9 1.5Z" /><path d="M9 1.5V6h4.5" /><line x1="5" y1="9" x2="11" y2="9" /><line x1="5" y1="11.5" x2="8.5" y2="11.5" /></svg>`,
  cycle: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.5 8a5.5 5.5 0 1 1-1.64-3.9" /><polyline points="13.5 2 13.5 5.5 10 5.5" /></svg>`,
  task: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="1.5 4 4 6.5 7 3" /><line x1="9" y1="4.75" x2="14.5" y2="4.75" /><polyline points="1.5 9.5 4 12 7 8.5" /><line x1="9" y1="10.25" x2="14.5" y2="10.25" /></svg>`,
  fix: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.5 2.5 9 7l-2.5-.5L6 9l1.5 1.5 1-2.5 4.5-4.5Z" /><path d="M2.5 13.5l3.5-3.5" /></svg>`,
  context: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 3.5C2 2.67 2.67 2 3.5 2h4L10 4.5V7" /><path d="M10 4.5H7.5A1.5 1.5 0 0 1 6 3V2" /><rect x="6" y="7" width="8" height="7" rx="1" /><line x1="8" y1="10" x2="12" y2="10" /><line x1="8" y1="12" x2="11" y2="12" /></svg>`,
  agent: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="5.5" r="2.5" /><path d="M3 14c0-2.76 2.24-5 5-5s5 2.24 5 5" /><circle cx="8" cy="8" r="7" /></svg>`,
  skill: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="8,1.5 10,6 14.5,6 11,9 12.5,13.5 8,11 3.5,13.5 5,9 1.5,6 6,6" /></svg>`,
  prompt: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 2.5h12v8.5H9.5L7 13.5V11H2z" /><line x1="5" y1="5.5" x2="11" y2="5.5" /><line x1="5" y1="7.5" x2="9" y2="7.5" /></svg>`,
  database: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="8" cy="4.5" rx="5.5" ry="2" /><path d="M2.5 4.5V12c0 1.1 2.46 2 5.5 2s5.5-.9 5.5-2V4.5" /><path d="M2.5 8.25c0 1.1 2.46 2 5.5 2s5.5-.9 5.5-2" /></svg>`,
  api: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1.5 5.5h4l2 2-2 2h-4" /><path d="M14.5 5.5h-4l-2 2 2 2h4" /><line x1="6" y1="3" x2="6" y2="13" /><line x1="10" y1="3" x2="10" y2="13" /></svg>`,
  components: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1" /><rect x="9" y="1.5" width="5.5" height="5.5" rx="1" /><rect x="1.5" y="9" width="5.5" height="5.5" rx="1" /><path d="M9 11.75h5.5M11.75 9v5.5" /></svg>`,
  schemaFix: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 1.5L2 4v4.5c0 3 2.5 5.5 6 6 3.5-.5 6-3 6-6V4L8 1.5Z" /><polyline points="5.5,8 7,9.5 10.5,6" /></svg>`,
  help: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="8" cy="8" r="6.5" /><path d="M6.5 6.5a1.5 1.5 0 0 1 3 .5c0 1-1.5 1.5-1.5 2.5" /><circle cx="8" cy="11.5" r="0.5" fill="currentColor" stroke="none" /></svg>`,
  empty: `<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="24" cy="24" r="18" stroke-dasharray="4 3" /><line x1="16" y1="24" x2="32" y2="24" /></svg>`,
  close: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><line x1="2" y1="2" x2="14" y2="14" /><line x1="14" y1="2" x2="2" y2="14" /></svg>`,
  refresh: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13.5 8a5.5 5.5 0 1 1-1.9-4.16" /><polyline points="13.5 1.5 13.5 4.5 10.5 4.5" /></svg>`,
  memory: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3.5C8 2.4 7.1 1.5 6 1.5S4 2.4 4 3.5c-1.1 0-2 .9-2 2 0 .6.3 1.2.7 1.5-.4.4-.7.9-.7 1.5 0 1.1.9 2 2 2 0 1.1.9 2 2 2s2-.9 2-2" /><path d="M8 3.5C8 2.4 8.9 1.5 10 1.5s2 .9 2 2c1.1 0 2 .9 2 2 0 .6-.3 1.2-.7 1.5.4.4.7.9.7 1.5 0 1.1-.9 2-2 2 0 1.1-.9 2-2 2s-2-.9-2-2" /><line x1="8" y1="3.5" x2="8" y2="14" /></svg>`,
  costs: `<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 2v12h12" /><path d="M5 10.5v-3" /><path d="M8.5 10.5v-6" /><path d="M12 10.5v-4.5" /></svg>`,
};

function icon(name) {
  return ICONS[name] ?? ICONS.empty;
}

const STATUS_META = {
  completed: { label: 'Completado', tone: 'emerald' },
  done: { label: 'Hecho', tone: 'emerald' },
  implemented: { label: 'Implementado', tone: 'emerald' },
  resolved: { label: 'Resuelto', tone: 'emerald' },
  validated: { label: 'Validado', tone: 'emerald' },
  migrated: { label: 'Migrado', tone: 'emerald' },
  approved: { label: 'Aprobado', tone: 'teal' },
  'in-progress': { label: 'En progreso', tone: 'amber' },
  open: { label: 'Abierto', tone: 'amber' },
  updated: { label: 'Actualizado', tone: 'amber' },
  pending: { label: 'Pendiente', tone: 'zinc' },
  planned: { label: 'Planificado', tone: 'zinc' },
  draft: { label: 'Borrador', tone: 'zinc' },
  defined: { label: 'Definido', tone: 'zinc' },
  archived: { label: 'Archivado', tone: 'zinc-mute' },
  skipped: { label: 'Omitido', tone: 'zinc-mute' },
  deprecated: { label: 'Obsoleto', tone: 'zinc-mute' },
  cancelled: { label: 'Cancelado', tone: 'rose' },
  absorbed: { label: 'Absorbido', tone: 'sky' },
};

function pageHeader({ title, meta, subtitle } = {}) {
  return `
    <header class="page-header">
      <div class="page-header-top">
        <h1 class="page-title">${escapeHtml(title ?? '')}</h1>
        ${meta ? `<span class="page-meta">${escapeHtml(meta)}</span>` : ''}
      </div>
      ${subtitle ? `<p class="page-subtitle">${escapeHtml(subtitle)}</p>` : ''}
    </header>
  `;
}

function skeleton(width, height, extraClass = '') {
  const w = typeof width === 'number' ? `${width}px` : width;
  const h = typeof height === 'number' ? `${height}px` : height;
  const className = extraClass
    ? `skel animate-shimmer ${extraClass}`
    : 'skel animate-shimmer';
  return `<span class="${className}" style="width:${w};height:${h}"></span>`;
}

function skeletonRow() {
  return `
    <div class="skeleton-row">
      <div class="skeleton-row-main">
        ${skeleton(32, 12)}
        ${skeleton(192, 12)}
      </div>
      ${skeleton(80, 20)}
    </div>
  `;
}

function skeletonStat() {
  return `
    <div class="skeleton-stat">
      ${skeleton(40, 28, 'skeleton-stat-value')}
      ${skeleton(64, 12)}
    </div>
  `;
}

function skeletonLines(widths = ['75%', '100%', '83%', '67%']) {
  return `<div class="skeleton-lines">${widths.map((width) => skeleton(width, 16)).join('')}</div>`;
}

function skeletonRows(count = 5) {
  return Array.from({ length: count }, () => skeletonRow()).join('');
}

function emptyState(title, hint) {
  return `
    <div class="empty-state">
      <span class="empty-state-icon">${icon('empty')}</span>
      <p class="empty-state-title">${escapeHtml(title)}</p>
      ${hint ? `<p class="empty-state-hint">${escapeHtml(hint)}</p>` : ''}
    </div>
  `;
}

function errorState(error) {
  const message =
    error instanceof SddError ? error.message : t('Ocurrió un error inesperado.');
  return `
    <div class="error-state">
      <span class="error-state-icon">${icon('empty')}</span>
      <p class="error-state-title">${t('No se pudo cargar la vista')}</p>
      <p class="error-state-message">${escapeHtml(message)}</p>
    </div>
  `;
}

function liveIndicator({ live, project, version, updatedAt }) {
  const dotClass = live ? 'live-dot live-dot--on' : 'live-dot';
  const labelClass = live ? 'live-label live-label--on' : 'live-label';
  const labelText = live ? 'LOCAL · LIVE' : 'PRODUCTION';
  const ping = live ? `<span class="live-ping"></span>` : '';
  return `
    <div class="live">
      <span class="${dotClass}">${ping}</span>
      <span class="${labelClass}">${labelText}</span>
    </div>
    ${updatedAt ? `<p class="live-meta">${escapeHtml(updatedAt)}</p>` : ''}
    <p class="live-version">${escapeHtml(project)} · v${escapeHtml(version)}</p>
  `;
}

function badge(text, variant) {
  const meta = STATUS_META[String(text).toLowerCase()];
  if (!meta) {
    const className = variant ? `badge ${variant}` : 'badge';
    return `<span class="${className}">${escapeHtml(t(text))}</span>`;
  }
  return `<span class="badge badge--${meta.tone}"><span class="badge-dot"></span>${escapeHtml(t(meta.label))}</span>`;
}

function card({ title, subtitle, value, hint } = {}) {
  return `
    <div class="card">
      <div class="card-header">
        <span class="card-title">${escapeHtml(title ?? '')}</span>
      </div>
      ${subtitle ? `<p class="card-subtitle">${escapeHtml(subtitle)}</p>` : ''}
      ${value !== undefined && value !== null ? `<p class="card-value">${escapeHtml(String(value))}</p>` : ''}
      ${hint ? `<p class="card-hint">${escapeHtml(hint)}</p>` : ''}
    </div>
  `;
}

function dataTable(columns, rows) {
  const head = columns
    .map((column) => `<th>${escapeHtml(t(column.label))}</th>`)
    .join('');
  const body = rows
    .map(
      (row) =>
        `<tr>${columns.map((column) => `<td>${column.render(row)}</td>`).join('')}</tr>`,
    )
    .join('');
  return `
    <div class="table-wrapper">
      <table class="data-table">
        <thead><tr>${head}</tr></thead>
        <tbody>${body}</tbody>
      </table>
    </div>
  `;
}

function handleModalKeydown(event) {
  if (event.key === 'Escape') closeModal();
}

function lockScroll() {
  document.documentElement.classList.add('is-modal-open');
}

function unlockScroll() {
  document.documentElement.classList.remove('is-modal-open');
}

const MODAL_SIZE_CLASS = { md: 'modal--md', lg: 'modal--lg', xl: 'modal--xl' };

function normalizeModalArgs(a, b, c) {
  if (a !== null && typeof a === 'object' && !Array.isArray(a)) return a;
  return { title: a, bodyHtml: b, ...(c || {}) };
}

function modalTabBarHtml(tabs, activeId) {
  const items = tabs
    .map((tab) => {
      const isActive = tab.id === activeId;
      const classes = ['modal-tab'];
      if (isActive) classes.push('modal-tab--active');
      const disabledAttr = tab.disabled ? 'disabled' : '';
      const label = tab.disabled
        ? `${escapeHtml(tab.label)} —`
        : escapeHtml(tab.label);
      return `<button type="button" class="${classes.join(' ')}" data-tab="${escapeHtml(tab.id)}" ${disabledAttr} role="tab" aria-selected="${isActive}">${label}</button>`;
    })
    .join('');
  return `<div class="modal-tabs" role="tablist">${items}</div>`;
}

let activeModal = null;
let modalToken = 0;

function openModal(a, b, c) {
  const opts = normalizeModalArgs(a, b, c);
  const {
    title = '',
    subtitle = '',
    size = 'lg',
    bodyHtml = '',
    tabs = null,
    activeTabId = null,
  } = opts;
  closeModal();
  modalToken += 1;
  const token = modalToken;
  const sizeClass = MODAL_SIZE_CLASS[size] ?? MODAL_SIZE_CLASS.lg;
  const hasTabs = Array.isArray(tabs) && tabs.length > 0;
  const initialTabId = hasTabs
    ? (activeTabId ?? tabs.find((tab) => !tab.disabled)?.id ?? tabs[0].id)
    : null;

  const backdrop = document.createElement('div');
  backdrop.id = 'sdd-modal-backdrop';
  backdrop.className = 'modal-backdrop';
  backdrop.innerHTML = `
    <div class="modal ${sizeClass}" role="dialog" aria-modal="true" aria-label="${escapeHtml(title)}">
      <div class="modal-header">
        <div class="modal-header-text">
          <h2 class="modal-title">${escapeHtml(title)}</h2>
          ${subtitle ? `<p class="modal-subtitle">${escapeHtml(subtitle)}</p>` : ''}
        </div>
        <button class="icon-button" type="button" data-modal-close aria-label="Cerrar">${icon('close')}</button>
      </div>
      ${hasTabs ? modalTabBarHtml(tabs, initialTabId) : ''}
      <div class="modal-body" data-modal-body>${hasTabs ? skeletonLines() : bodyHtml}</div>
    </div>
  `;
  backdrop.addEventListener('click', (event) => {
    if (event.target === backdrop) closeModal();
  });
  backdrop
    .querySelector('[data-modal-close]')
    .addEventListener('click', closeModal);
  document.addEventListener('keydown', handleModalKeydown);
  document.body.append(backdrop);
  lockScroll();

  activeModal = {
    token,
    root: backdrop,
    bodyEl: backdrop.querySelector('[data-modal-body]'),
    tabs: hasTabs ? tabs : null,
    tabCache: new Map(),
    activeTabId: initialTabId,
  };

  if (hasTabs) {
    backdrop.addEventListener('click', (event) => {
      const tabButton = event.target.closest('[data-tab]');
      if (!tabButton || tabButton.disabled || !backdrop.contains(tabButton))
        return;
      loadModalTab(token, tabButton.dataset.tab);
    });
    loadModalTab(token, initialTabId);
  }
}

function paintModalTabBar(token) {
  if (!activeModal || activeModal.token !== token) return;
  const tabBarEl = activeModal.root.querySelector('.modal-tabs');
  if (!tabBarEl) return;
  tabBarEl.outerHTML = modalTabBarHtml(
    activeModal.tabs,
    activeModal.activeTabId,
  );
}

async function loadModalTab(token, tabId) {
  if (!activeModal || activeModal.token !== token) return;
  const tab = activeModal.tabs.find((entry) => entry.id === tabId);
  if (!tab || tab.disabled) return;
  activeModal.activeTabId = tabId;
  paintModalTabBar(token);
  if (activeModal.tabCache.has(tabId)) {
    setModalBody(token, activeModal.tabCache.get(tabId));
    return;
  }
  setModalBody(token, skeletonLines());
  try {
    const html = await tab.load();
    if (
      !activeModal ||
      activeModal.token !== token ||
      activeModal.activeTabId !== tabId
    )
      return;
    activeModal.tabCache.set(tabId, html);
    setModalBody(token, html);
  } catch (error) {
    if (
      !activeModal ||
      activeModal.token !== token ||
      activeModal.activeTabId !== tabId
    )
      return;
    setModalBody(token, errorState(error));
  }
}

function setModalBody(token, html) {
  if (!activeModal || activeModal.token !== token) return;
  activeModal.bodyEl.innerHTML = html;
}

function openAsyncModal({ title, subtitle, size, skeletonHtml, load }) {
  openModal({
    title,
    subtitle,
    size,
    bodyHtml: skeletonHtml ?? skeletonLines(),
  });
  const token = modalToken;
  load().then(
    (html) => setModalBody(token, html),
    (error) => setModalBody(token, errorState(error)),
  );
}

function closeModal() {
  const backdrop = document.getElementById('sdd-modal-backdrop');
  if (backdrop) backdrop.remove();
  document.removeEventListener('keydown', handleModalKeydown);
  activeModal = null;
  unlockScroll();
}

async function renderDashboard(container, params) {
  const [globalResult, specsResult, tasksResult, fixesResult, contextResult] =
    await Promise.allSettled([
      loadGlobal(),
      loadSpecsIndex(),
      loadAssembledTasks(),
      loadFixes(),
      loadContextCatalog(),
    ]);

  const globalData =
    globalResult.status === 'fulfilled' ? globalResult.value : null;
  const specsData =
    specsResult.status === 'fulfilled' ? specsResult.value : null;
  const tasksData =
    tasksResult.status === 'fulfilled' ? tasksResult.value : null;
  const fixesData =
    fixesResult.status === 'fulfilled' ? fixesResult.value : null;
  const contextEntries =
    contextResult.status === 'fulfilled' ? contextResult.value : [];
  const contextError =
    contextResult.status === 'rejected' ? contextResult.reason : null;
  const totalCycles = tasksData ? countAssembledCycles(tasksData) : null;

  container.innerHTML = `
    ${renderDashboardHeader(globalData, totalCycles)}
    ${renderDashboardKpis(specsData, totalCycles, globalData, fixesData)}
    <section style="display:flex;flex-wrap:wrap;gap:24px">
      <div style="flex:2 1 420px;display:flex;flex-direction:column;gap:24px;min-width:0">
        ${renderDashboardAppsSection(globalData, contextEntries)}
        ${renderDashboardLibsSection(contextEntries, contextError)}
        ${renderDashboardToolsSection(contextEntries, contextError)}
      </div>
      <div style="flex:1 1 240px;min-width:0">
        ${renderDashboardMonorepoPanel(globalData)}
      </div>
    </section>
  `;

  attachDashboardCardHandlers(container, contextEntries);
}

function renderDashboardHeader(globalData, totalCycles) {
  if (!globalData) {
    return emptyState(
      'Sin datos del proyecto',
      'No se pudo cargar global.json',
    );
  }
  const inProgressCount = globalData.in_progress_modules?.length ?? 0;
  const overallStatus =
    inProgressCount > 0
      ? 'in-progress'
      : (totalCycles ?? 0) > 0
        ? 'completed'
        : 'pending';
  const syncLabel = lastLoadedAt
    ? new Intl.DateTimeFormat(localeTag(), {
        dateStyle: 'short',
        timeStyle: 'medium',
      }).format(lastLoadedAt)
    : null;
  return `
    <header class="page-header">
      <div class="page-header-top">
        <div style="display:flex;align-items:center;gap:10px;min-width:0;flex-wrap:wrap">
          <h1 class="page-title page-title--lg">${escapeHtml(globalData.project ?? '—')}</h1>
          ${badge(overallStatus)}
        </div>
        <button type="button" data-dashboard-refresh style="display:inline-flex;align-items:center;gap:6px;padding:6px 12px;border-radius:var(--radius-md);border:1px solid var(--border);background:transparent;color:var(--text-faint);font-size:var(--text-12);cursor:pointer">${icon('refresh')}${t('Actualizar')}</button>
      </div>
      <p class="page-subtitle">${escapeHtml(globalData.description ?? '')}</p>
      ${syncLabel ? `<p style="margin-top:12px;font-family:var(--font-mono);font-size:var(--text-10);color:var(--text-subtle)">${escapeHtml(t('Última sincronización: {syncLabel}', { syncLabel }))}</p>` : ''}
    </header>
  `;
}

function countAssembledCycles(tasksData) {
  return Object.values(tasksData?.specs ?? {}).reduce(
    (sum, spec) => sum + Object.keys(spec.cycles ?? {}).length,
    0,
  );
}

function dashboardStatCell({ value, label, href, accent = false, sub = '' }) {
  const valueColor = accent
    ? 'rgb(var(--rgb-emerald-400))'
    : 'var(--text-strong)';
  // El dato secundario va en su propia línea: metido dentro del valor obligaba
  // a partir el número en dos renglones en las tarjetas angostas.
  const subHtml = sub
    ? `<div class="tile-sub${accent ? ' tile-sub--accent' : ''}">${escapeHtml(String(sub))}</div>`
    : '';
  return `
    <a class="tile stat-tile" href="${escapeHtml(href)}">
      <div class="stat-tile-value" style="color:${valueColor}">${escapeHtml(String(value))}</div>
      <div class="stat-tile-label">${escapeHtml(label)}</div>
      ${subHtml}
    </a>
  `;
}

function renderDashboardKpis(specsData, totalCycles, globalData, fixesData) {
  const totalSpecs = specsData?.specs?.length ?? '—';
  const cyclesValue = totalCycles ?? '—';
  const inProgressCount = globalData?.in_progress_modules?.length ?? '—';
  const totalFixes = fixesData?.fixes?.length ?? '—';

  const cells = [
    dashboardStatCell({ value: totalSpecs, label: 'Specs', href: '#/specs' }),
    dashboardStatCell({
      value: cyclesValue,
      label: t('Ciclos'),
      href: '#/cycles',
    }),
    dashboardStatCell({
      value: inProgressCount,
      label: t('En progreso'),
      href: '#/specs',
      accent: typeof inProgressCount === 'number' && inProgressCount > 0,
    }),
    dashboardStatCell({ value: totalFixes, label: 'Fixes', href: '#/fixes' }),
  ];

  return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px">${cells.join('')}</div>`;
}

function dashboardLoadingSkeleton() {
  return `
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:8px;margin-bottom:24px">
      ${skeletonStat()}${skeletonStat()}${skeletonStat()}${skeletonStat()}
    </div>
    ${skeletonRows(4)}
  `;
}

function dashboardAppStatus(globalData, appKey) {
  const key = appKey.startsWith('apps/') ? appKey : `apps/${appKey}`;
  const isInGroup = (modules) =>
    (modules ?? []).some((moduleEntry) =>
      (moduleEntry.apps ?? []).includes(key),
    );
  if (isInGroup(globalData?.completed_modules)) return 'completed';
  if (isInGroup(globalData?.in_progress_modules)) return 'in-progress';
  return 'pending';
}

function dashboardStatusChip(status) {
  const meta = STATUS_META[status] ?? STATUS_META.pending;
  return `<span class="badge badge--${meta.tone}">${escapeHtml(t(meta.label))}</span>`;
}

function dashboardInferTech(description) {
  const text = String(description).toLowerCase();
  if (
    text.includes('springboot') ||
    text.includes('spring boot') ||
    text.includes('java')
  )
    return 'Java';
  if (text.includes('react')) return 'React';
  return 'TS';
}

function dashboardTruncateAfterEmDash(description) {
  const text = String(description);
  const parts = text.split('—');
  return parts.length > 1 ? parts[1].trim() : text;
}

function dashboardContextKey(category, name) {
  return `${category}:${name}`;
}

function findDashboardContextEntry(contextEntries, category, name) {
  return contextEntries.find(
    (entry) => entry.category === category && entry.name === name,
  );
}

function dashboardSectionHeading(title, meta) {
  return `
    <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:12px">
      <h2 style="font-size:var(--text-12);font-weight:var(--weight-semibold);text-transform:uppercase;letter-spacing:var(--tracking-widest);color:var(--text-faint)">${escapeHtml(title)}</h2>
      <span style="font-family:var(--font-mono);font-size:var(--text-10);color:var(--text-subtle)">${escapeHtml(meta)}</span>
    </div>
  `;
}

function dashboardAppRow(name, description, status, index, contextEntries) {
  const ref = deriveMonorepoAppRef(name, description);
  const entry = findDashboardContextEntry(
    contextEntries,
    ref.category,
    ref.name,
  );
  const rowAttrs = entry
    ? ` tabindex="0" role="button" data-dashboard-context="${escapeHtml(dashboardContextKey(ref.category, ref.name))}" style="cursor:pointer" aria-label="${escapeHtml(t('Ver contexto de {name}', { name }))}"`
    : '';
  return `
    <div class="row"${rowAttrs}>
      <span class="row-lead" style="font-family:var(--font-mono);font-size:var(--text-12);color:var(--text-subtle)">${String(index + 1).padStart(2, '0')}</span>
      <div class="row-main">
        <p style="font-family:var(--font-mono);font-size:var(--text-14);color:var(--text-bright);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(name)}</p>
        <p style="font-size:var(--text-11);color:var(--text-subtle);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${escapeHtml(dashboardInferTech(description))} · ${escapeHtml(dashboardTruncateAfterEmDash(description))}</p>
      </div>
      <span class="row-trail">
        ${dashboardStatusChip(status)}
        ${entry ? `<span class="row-chevron">›</span>` : ''}
      </span>
    </div>
  `;
}

function dashboardSubprojectRow(entry, index) {
  return `
    <div class="row" tabindex="0" role="button" data-dashboard-context="${escapeHtml(dashboardContextKey(entry.category, entry.name))}" style="cursor:pointer" aria-label="${escapeHtml(t('Ver contexto de {name}', { name: entry.name }))}">
      <span class="row-lead" style="font-family:var(--font-mono);font-size:var(--text-12);color:var(--text-subtle)">${String(index + 1).padStart(2, '0')}</span>
      <div class="row-main">
        <p style="font-family:var(--font-mono);font-size:var(--text-14);color:var(--text-bright)">${escapeHtml(entry.name)}</p>
      </div>
      <span class="row-chevron">›</span>
    </div>
  `;
}

function renderDashboardAppsSection(globalData, contextEntries) {
  if (!globalData) {
    return `<div>${dashboardSectionHeading('Apps', '—')}${emptyState(t('No se pudo cargar global.json'), t('No se pudo determinar la lista de apps del monorepo.'))}</div>`;
  }
  const apps = Object.entries(globalData?.monorepo?.apps ?? {});
  const body =
    apps.length === 0
      ? emptyState(
          t('Sin apps registradas'),
          t('global.json.monorepo.apps está vacío.'),
        )
      : apps
          .map(([name, description], index) =>
            dashboardAppRow(
              name,
              description,
              dashboardAppStatus(globalData, name),
              index,
              contextEntries,
            ),
          )
          .join('');
  return `<div>${dashboardSectionHeading('Apps', t('{count} proyectos', { count: apps.length }))}${body}</div>`;
}

function renderDashboardLibsSection(contextEntries, contextError) {
  const libs = contextEntries.filter((entry) => entry.category === 'libs');
  const body = contextError
    ? errorState(contextError)
    : libs.length === 0
      ? emptyState(
          t('Sin libs registradas'),
          t('No hay subproyectos de categoría libs con contexto disponible.'),
        )
      : libs.map((entry, index) => dashboardSubprojectRow(entry, index)).join('');
  return `<div>${dashboardSectionHeading('Libs', contextError ? '—' : t('{count} librerías', { count: libs.length }))}${body}</div>`;
}

function renderDashboardToolsSection(contextEntries, contextError) {
  const tools = contextEntries.filter((entry) => entry.category === 'tools');
  // A repo with no tools registered in global.json shows nothing: the section would
  // be permanent noise for the (many) workspaces that only have apps and libs.
  if (!contextError && tools.length === 0) return '';
  const body = contextError
    ? errorState(contextError)
    : tools.map((entry, index) => dashboardSubprojectRow(entry, index)).join('');
  return `<div>${dashboardSectionHeading('Tools', contextError ? '—' : t('{count} herramientas', { count: tools.length }))}${body}</div>`;
}

function dashboardCyclesCompletedTotal(globalData) {
  return (globalData?.completed_modules ?? []).reduce(
    (sum, moduleEntry) => sum + (moduleEntry.cycles_completed ?? 0),
    0,
  );
}

function dashboardMonorepoField(label, value) {
  return `
    <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;padding:6px 0;border-bottom:1px solid rgb(var(--rgb-zinc-800) / 0.4)">
      <span style="font-size:var(--text-11);color:var(--text-faint)">${escapeHtml(label)}</span>
      <span style="font-family:var(--font-mono);font-size:var(--text-11);color:var(--text-muted);text-align:right">${escapeHtml(value)}</span>
    </div>
  `;
}

function renderDashboardMonorepoPanel(globalData) {
  if (!globalData)
    return emptyState(
      t('Sin datos del monorepo'),
      t('No se pudo cargar global.json'),
    );
  const fields = [
    ['Tool', globalData.monorepo?.tool ?? '—'],
    ['Package manager', globalData.monorepo?.package_manager ?? '—'],
    [t('Ciclos completados'), String(dashboardCyclesCompletedTotal(globalData))],
    [t('Versión'), globalData.version ?? '—'],
  ];
  // Miraba pending + in_progress: un proyecto con TODO terminado (pending 0,
  // in_progress 0, completed N) caía acá y decía que el ciclo no había empezado.
  const hasNotStarted =
    (globalData.completed_modules ?? []).length === 0 &&
    (globalData.in_progress_modules ?? []).length === 0;
  const note = hasNotStarted
    ? `<div style="margin-top:16px;padding:16px;border-radius:var(--radius-lg);border:1px solid var(--border);background:rgb(var(--rgb-zinc-900) / 0.4)"><p style="font-size:var(--text-11);color:var(--text-faint);line-height:var(--leading-relaxed)">${t('El ciclo SDD aún no ha iniciado. Todos los módulos están en estado <span style="font-family:var(--font-mono);color:var(--text-muted)">pending</span>.')}</p></div>`
    : '';
  return `
    <div>
      <h2 style="font-size:var(--text-12);font-weight:var(--weight-semibold);text-transform:uppercase;letter-spacing:var(--tracking-widest);color:var(--text-faint);margin-bottom:12px">Monorepo</h2>
      <div>${fields.map(([label, value]) => dashboardMonorepoField(label, value)).join('')}</div>
      ${note}
    </div>
  `;
}

function attachDashboardCardHandlers(container, contextEntries) {
  const entryByKey = new Map(
    contextEntries.map((entry) => [
      dashboardContextKey(entry.category, entry.name),
      entry,
    ]),
  );
  for (const rowEl of container.querySelectorAll('[data-dashboard-context]')) {
    const entry = entryByKey.get(rowEl.dataset.dashboardContext);
    const open = () => openDashboardContextModal(entry);
    rowEl.addEventListener('click', open);
    rowEl.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      open();
    });
  }
  const refreshButton = container.querySelector('[data-dashboard-refresh]');
  if (refreshButton) {
    refreshButton.addEventListener('click', () => {
      invalidateCache();
      onRoute();
    });
  }
}

function openDashboardContextModal(entry) {
  if (!entry) {
    openModal('Contexto', emptyState('Sin contexto SDD'));
    return;
  }
  openContextDocModal(entry);
}

async function renderPlanning(container, params) {
  const [tasksResult, specsResult, fixesResult] = await Promise.allSettled([
    loadAssembledTasks(),
    loadSpecsIndex(),
    loadFixes(),
  ]);

  const specsIndex =
    specsResult.status === 'fulfilled' ? specsResult.value : null;
  const specGroups =
    tasksResult.status === 'fulfilled'
      ? planningBuildSpecGroups(tasksResult.value, specsIndex)
      : null;
  const fixList =
    fixesResult.status === 'fulfilled' ? (fixesResult.value.fixes ?? []) : null;

  const allTasks = specGroups
    ? specGroups.flatMap((group) =>
        group.cycles.flatMap((cycle) => cycle.tasks),
      )
    : null;
  const taskStats = allTasks ? planningItemStats(allTasks) : null;
  const fixStats = fixList ? planningFixStats(fixList) : null;

  container.innerHTML = `
    ${planningHeader()}
    ${planningKpisSection(taskStats, fixStats)}
    ${planningProgressSection(taskStats, fixStats)}
    ${planningSpecSection(specGroups)}
    ${planningFixesSection(fixList)}
    ${planningLegend()}
  `;

  bindPlanningInteractions(container);
}

function planningHeader() {
  return pageHeader({
    title: t('Planificación'),
    subtitle: t(
      'Horas, story points y progreso derivados de tasks.json, specs/index.json y fixes.json.',
    ),
  });
}

function planningChevron(open) {
  return `<svg data-chevron viewBox="0 0 10 6" width="10" height="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" style="flex-shrink:0;transition:transform 0.2s;transform:rotate(${open ? 0 : -90}deg);color:var(--text-faint)"><path d="M1 1l4 4 4-4"></path></svg>`;
}

function planningDomId(prefix, ...parts) {
  return [prefix, ...parts].join('-').replace(/[^a-zA-Z0-9_-]/g, '-');
}

function planningHoursSummaryRow(doneHours, totalHours, extraHtml) {
  return `
    <div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap;padding:10px 16px;background:rgb(var(--rgb-zinc-900) / 0.15);">
      <div style="display:flex;align-items:center;gap:8px;">
        <span class="card-hint" style="margin:0;text-transform:uppercase;letter-spacing:0.05em;">${t('Horas estimadas')}</span>
        ${planningHoursBar(doneHours, totalHours)}
      </div>
      ${extraHtml ?? ''}
    </div>
  `;
}

function bindPlanningInteractions(container) {
  container.addEventListener('click', (event) => {
    const toggle = event.target.closest('[data-toggle]');
    if (!toggle || !container.contains(toggle)) return;
    const target = document.getElementById(toggle.getAttribute('data-toggle'));
    if (!target) return;
    const wasHidden = target.hidden;
    target.hidden = !wasHidden;
    toggle.setAttribute('aria-expanded', String(wasHidden));
    const chevron = toggle.querySelector('[data-chevron]');
    if (chevron) chevron.style.transform = `rotate(${wasHidden ? 0 : -90}deg)`;
  });
}

function planningLegend() {
  const items = [
    { color: 'var(--ok)', label: 'done / completed' },
    { color: 'var(--warn)', label: 'in-progress' },
    { color: 'var(--text-faint)', label: 'pending' },
    { color: 'rgb(var(--rgb-zinc-600))', label: 'skipped — resuelta / no aplica' },
    { color: 'rgb(var(--rgb-violet-400))', label: 'SP — story points' },
    { color: 'rgb(var(--rgb-rose-500))', label: 'HOTFIX' },
  ];
  return `
    <div style="border-radius:var(--radius-lg);border:1px solid rgb(var(--rgb-zinc-800) / 0.4);background:rgb(var(--rgb-zinc-900) / 0.1);padding:16px 20px;">
      <p class="card-hint" style="margin:0 0 12px;text-transform:uppercase;letter-spacing:0.05em;">${t('Referencias')}</p>
      <div style="display:flex;flex-wrap:wrap;gap:8px 24px;">
        ${items
          .map(
            (item) => `
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="width:8px;height:8px;border-radius:999px;background:${item.color};flex-shrink:0;"></span>
            <span class="card-hint" style="margin:0;">${escapeHtml(item.label)}</span>
          </div>
        `,
          )
          .join('')}
      </div>
    </div>
  `;
}

function planningSumHours(items) {
  return items.reduce(
    (sum, item) => sum + (Number(item.estimation_hours) || 0),
    0,
  );
}

function planningSumPoints(items) {
  return items.reduce((sum, item) => sum + (Number(item.story_points) || 0), 0);
}

function planningCountDone(items) {
  return items.filter((item) => item.status === 'done').length;
}

function planningCountSkipped(items) {
  return items.filter((item) => item.status === 'skipped').length;
}

function planningDoneFraction(items) {
  if (items.length === 0) return 0;
  return (planningCountDone(items) + planningCountSkipped(items)) / items.length;
}

function planningFixIsCompleted(fix) {
  return ['implemented', 'validated', 'absorbed'].includes(fix.status);
}

function planningItemStats(items) {
  const doneItems = items.filter((item) => item.status === 'done');
  const skipped = planningCountSkipped(items);
  return {
    total: items.length,
    done: doneItems.length,
    skipped,
    resolved: doneItems.length + skipped,
    hours: planningSumHours(items),
    doneHours: planningSumHours(doneItems),
    points: planningSumPoints(items),
    donePoints: planningSumPoints(doneItems),
  };
}

function planningFixStats(fixList) {
  const doneFixes = fixList.filter(planningFixIsCompleted);
  return {
    total: fixList.length,
    done: doneFixes.length,
    hours: planningSumHours(fixList),
    doneHours: planningSumHours(doneFixes),
  };
}

function planningBuildSpecGroups(assembled, specsIndex) {
  return sortBy(
    Object.entries(assembled?.specs ?? {}),
    ([specId]) => specId,
  ).map(([specId, spec]) => ({
    specId,
    title: findSpecTitle(specsIndex, specId) ?? specId,
    cycles: sortBy(
      Object.entries(spec.cycles ?? {}),
      ([cycleId]) => cycleId,
    ).map(([cycleId, cycle]) => ({
      cycleId,
      tasks: cycle.tasks ?? [],
    })),
  }));
}

function planningProgressColor(fraction) {
  if (fraction >= 1) return 'var(--ok)';
  if (fraction > 0) return 'var(--warn)';
  return 'var(--border-soft)';
}

function planningProgressBar(fraction) {
  const pct = Math.round(Math.min(Math.max(fraction, 0), 1) * 100);
  return `<div style="height:4px;border-radius:999px;background:var(--surface-2);overflow:hidden;"><div style="height:100%;width:${pct}%;border-radius:999px;background:${planningProgressColor(fraction)};"></div></div>`;
}

function planningHoursBar(doneHours, totalHours) {
  const fraction = totalHours > 0 ? doneHours / totalHours : 0;
  const pct = Math.round(fraction * 100);
  return `
    <div style="display:flex;align-items:center;gap:8px;">
      <div style="flex:1;min-width:60px;">${planningProgressBar(fraction)}</div>
      <span class="card-hint" style="margin:0;white-space:nowrap;">${escapeHtml(`${formatHours(doneHours)} / ${formatHours(totalHours)} (${pct}%)`)}</span>
    </div>
  `;
}

function planningStatusDotColor(status) {
  if (status === 'done') return 'var(--ok)';
  if (status === 'in-progress') return 'var(--warn)';
  return 'var(--border-soft)';
}

function planningStatusDot(status) {
  return `<span style="display:inline-block;width:7px;height:7px;border-radius:999px;background:${planningStatusDotColor(status)};flex-shrink:0;"></span>`;
}

function planningFixStatusDot(fix) {
  return planningStatusDot(planningFixIsCompleted(fix) ? 'done' : fix.status);
}

function planningKpisSection(taskStats, fixStats) {
  if (!taskStats && !fixStats) {
    return emptyState(
      t('Sin datos de planificación'),
      t('No se pudo cargar tasks.json ni fixes.json.'),
    );
  }
  const totalHours = (taskStats?.hours ?? 0) + (fixStats?.hours ?? 0);
  const doneHours = (taskStats?.doneHours ?? 0) + (fixStats?.doneHours ?? 0);
  const totalItems = (taskStats?.total ?? 0) + (fixStats?.total ?? 0);
  const doneItems = (taskStats?.resolved ?? 0) + (fixStats?.done ?? 0);
  const velocityPct =
    totalItems > 0 ? Math.round((doneItems / totalItems) * 100) : 0;

  const cards = [
    card({
      title: t('Horas totales'),
      value: formatHours(totalHours),
      hint: t('{done} completadas · fixes incl.', {
        done: formatHours(doneHours),
      }),
    }),
    card({
      title: 'Story Points',
      value: taskStats ? taskStats.points : '—',
      hint: taskStats
        ? t('{count} completados', { count: taskStats.donePoints })
        : t('no disponible'),
    }),
    card({
      title: t('Tareas + Fixes'),
      value: `${doneItems} / ${totalItems}`,
      hint: t('{pct}% completado', { pct: velocityPct }),
    }),
    card({
      title: t('Fixes registrados'),
      value: fixStats ? fixStats.total : '—',
      hint: fixStats
        ? t('{hours} estimadas', { hours: formatHours(fixStats.hours) })
        : t('no disponible'),
    }),
  ];
  return `<div class="card-grid">${cards.join('')}</div>`;
}

function planningProgressSection(taskStats, fixStats) {
  const totalItems = (taskStats?.total ?? 0) + (fixStats?.total ?? 0);
  if (totalItems === 0) return '';
  const doneItems = (taskStats?.resolved ?? 0) + (fixStats?.done ?? 0);
  const fraction = doneItems / totalItems;
  const pct = Math.round(fraction * 100);
  return `
    <div class="card">
      <div class="card-header">
        <span class="card-title">${t('Progreso global')}</span>
        ${badge(`${pct}%`)}
      </div>
      <p class="card-hint">${escapeHtml(t('{done} de {total} items (tareas + fixes)', { done: doneItems, total: totalItems }))}</p>
      ${planningProgressBar(fraction)}
    </div>
  `;
}

const PLANNING_TASK_COLUMNS = [
  { label: '', render: (task) => planningStatusDot(task.status) },
  { label: 'ID', render: (task) => `<code>${escapeHtml(task.id)}</code>` },
  { label: 'Título', render: (task) => escapeHtml(task.title ?? '—') },
  {
    label: 'Historias',
    render: (task) =>
      task.user_stories?.length
        ? task.user_stories
            .map((hu) => `<code>${escapeHtml(hu)}</code>`)
            .join(' ')
        : '—',
  },
  {
    label: 'SP',
    render: (task) =>
      task.story_points === undefined || task.story_points === null
        ? '—'
        : String(task.story_points),
  },
  {
    label: 'Horas',
    render: (task) => escapeHtml(formatHours(task.estimation_hours)),
  },
];

function planningCycleCard(specId, cycleId, tasks, defaultOpen) {
  const stats = planningItemStats(tasks);
  const fraction = planningDoneFraction(tasks);
  const body =
    tasks.length === 0
      ? emptyState(t('Sin tareas en este ciclo'))
      : dataTable(PLANNING_TASK_COLUMNS, tasks);
  const contentId = planningDomId('planning-cycle', specId, cycleId);
  return `
    <div style="border-radius:var(--radius-lg);border:1px solid rgb(var(--rgb-zinc-800) / 0.4);overflow:hidden;">
      <button type="button" data-toggle="${contentId}" aria-expanded="${defaultOpen}" aria-controls="${contentId}" style="all:unset;box-sizing:border-box;cursor:pointer;text-align:left;display:flex;align-items:center;gap:12px;width:100%;padding:10px 14px;background:rgb(var(--rgb-zinc-900) / 0.3);">
        ${planningChevron(defaultOpen)}
        <span style="flex:1;min-width:0;font-family:var(--font-mono);font-size:var(--text-12);color:var(--text-dim);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(cycleId)}</span>
        <span class="card-hint" style="margin:0;white-space:nowrap;">${escapeHtml(t('{done}/{total} tareas', { done: stats.resolved, total: stats.total }))}${stats.skipped > 0 ? escapeHtml(t(' · {n} omitida{suffix}', { n: stats.skipped, suffix: stats.skipped === 1 ? '' : 's' })) : ''}</span>
        ${stats.points > 0 ? `<span style="font-family:var(--font-mono);font-size:var(--text-10);color:rgb(var(--rgb-violet-400) / 0.7);white-space:nowrap;">${stats.points} SP</span>` : ''}
        <span class="card-hint" style="margin:0;white-space:nowrap;">${escapeHtml(formatHours(stats.hours))}</span>
        <span style="width:80px;flex-shrink:0;">${planningProgressBar(fraction)}</span>
      </button>
      <div id="${contentId}" ${defaultOpen ? '' : 'hidden'}>
        ${planningHoursSummaryRow(
          stats.doneHours,
          stats.hours,
          stats.points > 0
            ? `<div class="card-hint" style="margin:0;">${escapeHtml(t('Story points: {done} / {total}', { done: stats.donePoints, total: stats.points }))}</div>`
            : '',
        )}
        ${body}
      </div>
    </div>
  `;
}

function planningSpecCard(group) {
  const allTasks = group.cycles.flatMap((cycle) => cycle.tasks);
  const stats = planningItemStats(allTasks);
  const fraction = planningDoneFraction(allTasks);
  const contentId = planningDomId('planning-spec', group.specId);
  return `
    <div style="border-radius:var(--radius-xl);border:1px solid rgb(var(--rgb-zinc-800) / 0.6);overflow:hidden;">
      <button type="button" data-toggle="${contentId}" aria-expanded="false" aria-controls="${contentId}" style="all:unset;box-sizing:border-box;cursor:pointer;text-align:left;display:flex;align-items:flex-start;gap:16px;width:100%;padding:16px 20px;background:rgb(var(--rgb-zinc-900) / 0.3);">
        ${planningChevron(false)}
        <div style="flex:1;min-width:0;">
          <p class="card-hint" style="margin:0;letter-spacing:0.05em;">${escapeHtml(group.specId)}</p>
          <p style="margin:2px 0 0;font-size:var(--text-14);color:var(--text-bright);font-weight:var(--weight-medium);">${escapeHtml(group.title)}</p>
          <div style="margin-top:10px;">${planningProgressBar(fraction)}</div>
        </div>
        <div style="flex-shrink:0;display:flex;gap:16px;align-items:flex-start;">
          <div style="text-align:right;">
            <p class="card-hint" style="margin:0;text-transform:uppercase;">${t('Horas')}</p>
            <p style="margin:0;font-family:var(--font-mono);font-size:var(--text-14);color:var(--text-dim);">${escapeHtml(formatHours(stats.doneHours))} <span style="color:var(--text-ghost);">/ ${escapeHtml(formatHours(stats.hours))}</span></p>
          </div>
          ${
            stats.points > 0
              ? `<div style="text-align:right;">
            <p class="card-hint" style="margin:0;text-transform:uppercase;">SP</p>
            <p style="margin:0;font-family:var(--font-mono);font-size:var(--text-14);color:rgb(var(--rgb-violet-400));">${stats.donePoints} <span style="color:var(--text-ghost);">/ ${stats.points}</span></p>
          </div>`
              : ''
          }
          <div style="text-align:right;">
            <p class="card-hint" style="margin:0;text-transform:uppercase;">${t('Progreso')}</p>
            <p style="margin:0;font-family:var(--font-mono);font-size:var(--text-14);color:${fraction >= 1 ? 'var(--ok)' : 'var(--warn)'};">${Math.round(fraction * 100)}%</p>
          </div>
        </div>
      </button>
      <div id="${contentId}" hidden style="padding:12px;background:rgb(var(--rgb-black) / 0.15);">
        <div style="display:flex;flex-direction:column;gap:8px;">
          ${group.cycles.map((cycle, index) => planningCycleCard(group.specId, cycle.cycleId, cycle.tasks, index === 0)).join('')}
        </div>
      </div>
    </div>
  `;
}

function planningSpecSection(specGroups) {
  if (!specGroups) {
    return emptyState(
      t('Sin datos de tareas'),
      t('No se pudo cargar tasks.json.'),
    );
  }
  if (specGroups.length === 0) {
    return emptyState(
      t('Sin specs registradas en tasks.json'),
      t('El desglose aparece cuando un ciclo SDD genera su tasks.json.'),
    );
  }
  return `<div style="display:flex;flex-direction:column;gap:12px;">${specGroups.map((group) => planningSpecCard(group)).join('')}</div>`;
}

function planningFixCard(fix) {
  return `
    <div style="display:flex;align-items:flex-start;gap:12px;padding:10px 16px;border-bottom:1px solid var(--border);">
      ${planningFixStatusDot(fix)}
      <div style="flex:1;min-width:0;">
        <div style="display:flex;align-items:baseline;gap:8px;flex-wrap:wrap;">
          <span class="card-hint" style="margin:0;">${escapeHtml(fix.id)}</span>
          <span style="font-size:var(--text-14);color:var(--text-dim);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(fix.title ?? '—')}</span>
        </div>
        <div style="display:flex;align-items:center;gap:8px;margin-top:4px;flex-wrap:wrap;">
          ${badge(fix.type ?? '—', fixTypeClass(fix.type))}
          ${fix.spec_id ? `<span class="card-hint" style="margin:0;">${escapeHtml(fix.spec_id.replace(/^spec-/, ''))}</span>` : ''}
          ${fix.cycle ? `<span class="card-hint" style="margin:0;">${escapeHtml(fix.cycle)}</span>` : ''}
        </div>
      </div>
      <span class="card-hint" style="margin:0;white-space:nowrap;">${fix.estimation_hours != null ? escapeHtml(formatHours(fix.estimation_hours)) : '—'}</span>
    </div>
  `;
}

function planningFixesSection(fixList) {
  if (!fixList) {
    return emptyState(t('Sin datos de fixes'), t('No se pudo cargar fixes.json.'));
  }
  if (fixList.length === 0) {
    return emptyState(
      t('Sin fixes registrados'),
      t(
        'Los fixes aparecen al usar los prefijos [HOTFIX], [BUGFIX], [FIX] o [IMPROVEMENT] para bypasear el SPEC GATE.',
      ),
    );
  }
  const stats = planningFixStats(fixList);
  const fraction = stats.total > 0 ? stats.done / stats.total : 0;
  const contentId = 'planning-fixes';
  return `
    <div style="border-radius:var(--radius-xl);border:1px solid rgb(var(--rgb-zinc-800) / 0.6);overflow:hidden;">
      <button type="button" data-toggle="${contentId}" aria-expanded="false" aria-controls="${contentId}" style="all:unset;box-sizing:border-box;cursor:pointer;text-align:left;display:flex;align-items:flex-start;gap:16px;width:100%;padding:16px 20px;background:rgb(var(--rgb-zinc-900) / 0.3);">
        ${planningChevron(false)}
        <div style="flex:1;min-width:0;">
          <div style="display:flex;align-items:center;gap:8px;">
            <span style="font-family:var(--font-mono);font-size:var(--text-12);color:var(--text-dim);">${t('Fixes &amp; Mejoras')}</span>
            ${badge(
              t('{count} fix{suffix}', {
                count: fixList.length,
                suffix: fixList.length === 1 ? '' : 'es',
              }),
            )}
          </div>
          <div style="margin-top:10px;">${planningProgressBar(fraction)}</div>
        </div>
        <div style="flex-shrink:0;text-align:right;">
          <p class="card-hint" style="margin:0;text-transform:uppercase;">${t('Progreso')}</p>
          <p style="margin:0;font-family:var(--font-mono);font-size:var(--text-14);color:${fraction >= 1 ? 'var(--ok)' : 'var(--warn)'};">${Math.round(fraction * 100)}%</p>
          <p class="card-hint" style="margin:2px 0 0;">${escapeHtml(t('{done}/{total} completados', { done: stats.done, total: stats.total }))}</p>
        </div>
      </button>
      <div id="${contentId}" hidden>
        ${planningHoursSummaryRow(stats.doneHours, stats.hours)}
        <div>${fixList.map((fix) => planningFixCard(fix)).join('')}</div>
      </div>
    </div>
  `;
}

function specStatusClass(status) {
  if (status === 'completed') return 'status--done';
  if (status === 'cancelled') return 'status--skipped';
  return `status--${status ?? 'pending'}`;
}

function cyclesBySpec(cycleIndex) {
  const map = new Map();
  for (const { specId, cycleId } of cycleIndex) {
    if (!map.has(specId)) map.set(specId, []);
    map.get(specId).push(cycleId);
  }
  for (const cycleIds of map.values()) cycleIds.sort();
  return map;
}

function specsHeader(total) {
  return pageHeader({
    title: 'Specs',
    meta: t('{count} registrada{suffix}', {
      count: total,
      suffix: total === 1 ? '' : 's',
    }),
    subtitle: t(
      'Especificaciones técnicas registradas en sdd/specs/index.json, convención spec-[gh-user]-[NNN]-[slug].',
    ),
  });
}

function specsListHeaderRow() {
  return `
    <div style="display:flex;align-items:center;gap:16px;padding:8px 4px;border-bottom:1px solid var(--border);">
      <span class="card-hint" style="margin:0;width:34px;flex-shrink:0;text-transform:uppercase;letter-spacing:0.05em;">ID</span>
      <span class="card-hint" style="margin:0;flex:1;text-transform:uppercase;letter-spacing:0.05em;">${t('Título')}</span>
      <span class="card-hint" style="margin:0;flex-shrink:0;text-transform:uppercase;letter-spacing:0.05em;">${t('Estado')}</span>
    </div>
  `;
}

function renderSpecRow(spec, index) {
  const number = String(index + 1).padStart(3, '0');
  const stagger = `stagger-${Math.min(index + 1, 8)}`;
  const subMeta = [spec.module, spec.file].filter(Boolean).join(' · ');
  return `
    <div class="row animate-fade-in-up ${stagger}" tabindex="0" role="button" data-row="${index}" aria-label="${escapeHtml(t('Ver detalle de {label}', { label: spec.title ?? spec.id }))}">
      <span class="row-lead" style="width:34px;font-family:var(--font-mono);font-size:var(--text-12);color:rgb(var(--rgb-emerald-500) / 0.6);">${number}</span>
      <span class="row-main">
        <span style="font-size:var(--text-14);color:var(--text-bright);font-weight:var(--weight-medium);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(spec.title ?? spec.id)}</span>
        ${subMeta ? `<span style="font-family:var(--font-mono);font-size:var(--text-10);color:var(--text-faint);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${escapeHtml(subMeta)}</span>` : ''}
      </span>
      <span class="row-trail">
        ${badge(spec.status ?? '—', specStatusClass(spec.status))}
        <span class="row-chevron">›</span>
      </span>
    </div>
  `;
}

function specsFileConventionPanel() {
  return `
    <div style="border-radius:var(--radius-lg);border:1px solid rgb(var(--rgb-zinc-800) / 0.6);background:rgb(var(--rgb-zinc-900) / 0.2);padding:16px 20px;">
      <p class="card-hint" style="margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em;">${t('Convención de archivos')}</p>
      <p style="margin:0;font-family:var(--font-mono);font-size:var(--text-12);">
        <span style="color:rgb(var(--rgb-emerald-400) / 0.7);">sdd/specs/</span><span style="color:var(--text-muted);">spec-[gh-user]-[NNN]-[slug]/</span>
      </p>
      <p class="card-hint" style="margin-top:6px;">${t('Cada spec tiene un ID único por autor registrado en <code>sdd/specs/index.json</code>. NNN es el contador personal del dev.')}</p>
    </div>
  `;
}

function bindSpecsInteractions(container, specs, cyclesMap) {
  const openFromRow = (row) => {
    const spec = specs[Number(row.dataset.row)];
    if (!spec) return;
    openSpecDetailModal(spec, cyclesMap.get(spec.id) ?? []);
  };
  container.addEventListener('click', (event) => {
    const row = event.target.closest('[data-row]');
    if (!row || !container.contains(row)) return;
    openFromRow(row);
  });
  container.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const row = event.target.closest('[data-row]');
    if (!row || !container.contains(row)) return;
    event.preventDefault();
    openFromRow(row);
  });
}

function specField(label, valueHtml) {
  return `
    <div>
      <p class="card-hint" style="margin:0 0 2px;text-transform:uppercase;letter-spacing:0.05em;">${escapeHtml(label)}</p>
      <p style="margin:0;font-family:var(--font-mono);font-size:var(--text-12);color:var(--text-dim);">${valueHtml}</p>
    </div>
  `;
}

function specDetailsTab(spec, cycleNames) {
  return `
    <div style="display:flex;flex-direction:column;gap:14px;">
      ${badge(spec.status ?? '—', specStatusClass(spec.status))}
      ${specField('ID', `<code>${escapeHtml(spec.id)}</code>`)}
      ${spec.author ? specField(t('Autor'), escapeHtml(spec.author)) : ''}
      ${spec.slug ? specField('Slug', escapeHtml(spec.slug)) : ''}
      ${specField(t('Módulo'), escapeHtml(spec.module ?? '—'))}
      ${specField('App', escapeHtml(spec.app ?? '—'))}
      ${specField(t('Creada'), escapeHtml(spec.created_at ?? '—'))}
      ${specField(t('Completada'), escapeHtml(spec.completed_at ?? '—'))}
      ${
        (spec.depends_on ?? []).length > 0
          ? specField(
              t('Depende de'),
              spec.depends_on
                .map((dep) => `<code>${escapeHtml(dep)}</code>`)
                .join(' '),
            )
          : ''
      }
      ${
        spec.file
          ? specField(
              t('Archivo'),
              `<span style="color:rgb(var(--rgb-emerald-400) / 0.7);word-break:break-all;">${escapeHtml(spec.file)}</span>`,
            )
          : ''
      }
      ${
        cycleNames.length > 0
          ? `
        <div>
          <p class="card-hint" style="margin:0 0 8px;text-transform:uppercase;letter-spacing:0.05em;">${escapeHtml(t('Ciclos ({count})', { count: cycleNames.length }))}</p>
          <div style="display:flex;flex-wrap:wrap;gap:8px;">
            ${cycleNames
              .map(
                (name) =>
                  `<span class="chip chip--sm" style="color:var(--text-dim);background:rgb(var(--rgb-zinc-900) / 0.5);">${escapeHtml(name)}</span>`,
              )
              .join('')}
          </div>
        </div>
      `
          : ''
      }
    </div>
  `;
}

function specSkeletonLines() {
  const widths = [92, 100, 84, 96, 70, 88];
  return `
    <div style="display:flex;flex-direction:column;gap:10px;">
      ${widths.map((width) => `<div class="animate-shimmer" style="height:12px;width:${width}%;border-radius:4px;"></div>`).join('')}
    </div>
  `;
}

function specTabButton(tab, active) {
  return `<button type="button" data-spec-tab="${tab.id}" style="all:unset;cursor:pointer;padding:8px 14px;font-family:var(--font-mono);font-size:var(--text-12);border-bottom:2px solid ${active ? 'var(--accent)' : 'transparent'};color:${active ? 'rgb(var(--rgb-emerald-400))' : 'var(--text-faint)'};margin-bottom:-1px;">${escapeHtml(t(tab.label))}</button>`;
}

function bindSpecModalTabs(spec) {
  const backdrop = document.getElementById('sdd-modal-backdrop');
  const root = backdrop?.querySelector('[data-spec-modal]');
  if (!root) return;
  const specPanel = root.querySelector('[data-tab-panel="spec"]');
  let specMdLoaded = false;

  const activate = async (tabId) => {
    root.dataset.activeTab = tabId;
    for (const button of root.querySelectorAll('[data-spec-tab]')) {
      const isActive = button.dataset.specTab === tabId;
      button.style.borderColor = isActive ? 'var(--accent)' : 'transparent';
      button.style.color = isActive
        ? 'rgb(var(--rgb-emerald-400))'
        : 'var(--text-faint)';
    }
    for (const panel of root.querySelectorAll('[data-tab-panel]')) {
      panel.hidden = panel.dataset.tabPanel !== tabId;
    }
    if (tabId !== 'spec' || specMdLoaded) return;
    specMdLoaded = true;
    if (!spec.file) {
      specPanel.innerHTML = `<p class="card-hint" style="margin:0;">${t('No hay archivo de spec definido.')}</p>`;
      return;
    }
    specPanel.innerHTML = specSkeletonLines();
    try {
      const html = await loadMarkdown(stripSddPrefix(spec.file));
      if (root.dataset.activeTab !== 'spec') return;
      specPanel.innerHTML = `<div class="markdown">${html}</div>`;
    } catch (error) {
      specPanel.innerHTML = errorState(error);
    }
  };

  root.addEventListener('click', (event) => {
    const button = event.target.closest('[data-spec-tab]');
    if (!button) return;
    activate(button.dataset.specTab);
  });
}

async function openSpecDetailModal(spec, cycleNames) {
  const tabs = [
    { id: 'details', label: 'Detalles' },
    { id: 'spec', label: 'Especificación' },
  ];
  const bodyHtml = `
    <div data-spec-modal data-active-tab="details">
      <div style="display:flex;gap:4px;border-bottom:1px solid var(--border);margin-bottom:16px;">
        ${tabs.map((tab) => specTabButton(tab, tab.id === 'details')).join('')}
      </div>
      <div data-tab-panel="details">${specDetailsTab(spec, cycleNames)}</div>
      <div data-tab-panel="spec" hidden></div>
    </div>
  `;
  openModal(spec.title ?? spec.id, bodyHtml, { size: 'xl' });
  bindSpecModalTabs(spec);
}

async function renderSpecs(container, params) {
  let specsIndex;
  try {
    specsIndex = await loadSpecsIndex();
  } catch (error) {
    container.innerHTML = errorState(error);
    return;
  }
  const specs = specsIndex.specs ?? [];
  const cycleIndex = await loadCycleIndex().catch(() => []);
  const cyclesMap = cyclesBySpec(cycleIndex);

  if (specs.length === 0) {
    container.innerHTML = `
      ${specsHeader(0)}
      ${emptyState(
        t('Sin specs registradas'),
        t(
          'Las especificaciones técnicas aparecen aquí una vez registradas en sdd/specs/index.json. El ciclo SDD aún no ha iniciado.',
        ),
      )}
    `;
    return;
  }

  container.innerHTML = `
    ${specsHeader(specs.length)}
    <div>
      ${specsListHeaderRow()}
      ${specs.map((spec, index) => renderSpecRow(spec, index)).join('')}
    </div>
    ${specsFileConventionPanel()}
  `;

  bindSpecsInteractions(container, specs, cyclesMap);
}

function cyclesHeader(total, groupCount) {
  return pageHeader({
    title: t('Ciclos'),
    meta: t('{total} ciclo{totalSuffix} en {groups} spec{groupsSuffix}', {
      total,
      totalSuffix: total === 1 ? '' : 's',
      groups: groupCount,
      groupsSuffix: groupCount === 1 ? '' : 's',
    }),
    subtitle: t(
      'Historial de ciclos SDD — cada ciclo representa una unidad de trabajo completa, de brief.yaml a cycle.json completed.',
    ),
  });
}

function listSearchBox(placeholder, value) {
  return `
    <div style="position:relative;">
      <span style="position:absolute; top:0; bottom:0; left:12px; display:flex; align-items:center; pointer-events:none; color: var(--text-subtle);">
        <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><circle cx="6.5" cy="6.5" r="4.5" /><path d="M10.5 10.5l3 3" stroke-linecap="round" /></svg>
      </span>
      <input type="text" data-list-search value="${escapeHtml(value)}" placeholder="${escapeHtml(placeholder)}"
        style="width:100%; box-sizing:border-box; background: rgb(var(--rgb-zinc-900) / 0.6); border:1px solid var(--border); border-radius: var(--radius-lg); padding:8px 32px; font-family: var(--font-mono); font-size: var(--text-14); color: var(--text-muted);" />
      <button type="button" data-list-search-clear ${value ? '' : 'hidden'} aria-label="${escapeHtml(t('Limpiar búsqueda'))}"
        style="position:absolute; top:0; bottom:0; right:12px; background:none; border:none; padding:0; color: var(--text-subtle); cursor:pointer;">
        <span style="display:flex; align-items:center; justify-content:center; width:100%; height:100%">
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"><path d="M2 2l12 12M14 2L2 14" stroke-linecap="round" /></svg>
        </span>
      </button>
    </div>
  `;
}

function bindListSearch(container, onChange) {
  const input = container.querySelector('[data-list-search]');
  const clearBtn = container.querySelector('[data-list-search-clear]');
  if (!input) return;
  input.addEventListener('input', () => {
    if (clearBtn) clearBtn.hidden = input.value === '';
    onChange(input.value);
  });
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      input.value = '';
      clearBtn.hidden = true;
      onChange('');
      input.focus();
    });
  }
}

function specStatusChip(status) {
  if (!status) return '';
  return `<span style="font-family:var(--font-mono); font-size:var(--text-10); padding:2px 6px; border-radius:var(--radius-sm); border:1px solid var(--border); color:var(--text-subtle); white-space:nowrap;">${escapeHtml(status)}</span>`;
}

function groupHeaderButton(
  { eyebrow, title, subtitle, meta, statusChip },
  contentId,
  groupAttr,
  collapsed,
) {
  return `
    <button type="button" data-toggle="${contentId}" ${groupAttr} aria-expanded="${!collapsed}" aria-controls="${contentId}"
      style="all:unset; box-sizing:border-box; cursor:pointer; text-align:left; display:flex; align-items:center; gap:12px; width:100%; padding-bottom:8px; border-bottom:1px solid var(--border);">
      ${planningChevron(!collapsed)}
      <span style="flex:1; min-width:0;">
        <p class="card-hint" style="margin:0; text-transform:uppercase; letter-spacing:0.05em;">${escapeHtml(eyebrow)}</p>
        <p style="margin:2px 0 0; font-size:var(--text-14); color:var(--text-bright); font-weight:var(--weight-medium); overflow-wrap:break-word;">${escapeHtml(title)}</p>
        ${subtitle ? `<p class="card-hint" style="margin:2px 0 0; font-family:var(--font-mono);">${escapeHtml(subtitle)}</p>` : ''}
      </span>
      <span style="display:flex; align-items:center; gap:8px; flex-shrink:0;">
        ${statusChip ?? ''}
        <span class="card-hint" style="margin:0; white-space:nowrap;">${escapeHtml(meta)}</span>
      </span>
    </button>
  `;
}

function cycleStatusClass(status) {
  if (status === 'completed') return 'status--done';
  if (status === 'in-progress') return 'status--in-progress';
  return 'status--pending';
}

function cycleDisplayNumber(cycleId, cycle) {
  const match = /^cycle-(\d+)$/.exec(cycleId);
  if (match) return match[1];
  return cycle?.cycle !== undefined ? String(cycle.cycle) : cycleId;
}

function renderCycleApps(apps) {
  if (!apps || apps.length === 0) return '';
  return `<p class="card-hint">${apps.map((app) => `<code>${escapeHtml(app)}</code>`).join(' ')}</p>`;
}

function renderCycleObjectives(objectives) {
  if (!objectives || objectives.length === 0) return '';
  const items = objectives
    .map((objective) => `<li>${escapeHtml(objective)}</li>`)
    .join('');
  return `<p class="card-hint">${escapeHtml(t('Objetivos ({count})', { count: objectives.length }))}</p><ul>${items}</ul>`;
}

function renderCycleMetrics(metrics) {
  if (!metrics) return '';
  const filesTotal =
    metrics.files_created.length +
    metrics.files_modified.length +
    metrics.files_deleted.length;
  const skipped = metrics.tasks_skipped ?? 0;
  const resolved = metrics.tasks_completed + skipped;
  const skippedNote =
    skipped > 0
      ? t(' · {n} omitida{suffix}', { n: skipped, suffix: skipped === 1 ? '' : 's' })
      : '';
  return `<p class="card-hint">${escapeHtml(t('{done}/{total} tareas · {points} SP · {files} archivo{suffix}', { done: resolved, total: metrics.tasks_total, points: metrics.story_points, files: filesTotal, suffix: filesTotal === 1 ? '' : 's' }) + skippedNote)}</p>`;
}

function renderCycleCard({ specId, cycleId, cycle }, index, animate) {
  const staggerClass = animate
    ? ` animate-fade-in-up stagger-${Math.min(index + 1, 8)}`
    : '';
  if (!cycle) {
    return `
      <div class="tile${staggerClass}" tabindex="0" role="button" style="cursor:pointer" data-spec-id="${escapeHtml(specId)}" data-cycle-id="${escapeHtml(cycleId)}" aria-label="${escapeHtml(t('Ver detalle de {label}', { label: cycleId }))}">
        <div class="card-header">
          <span class="card-title">${escapeHtml(cycleId)}</span>
          ${badge('no disponible', 'status--skipped')}
        </div>
        <p class="card-hint">${t('No se pudo cargar cycle.json para este ciclo.')}</p>
      </div>
    `;
  }
  const number = cycleDisplayNumber(cycleId, cycle);
  return `
    <div class="tile${staggerClass}" tabindex="0" role="button" style="cursor:pointer" data-spec-id="${escapeHtml(specId)}" data-cycle-id="${escapeHtml(cycleId)}" aria-label="${escapeHtml(t('Ver detalle de {label}', { label: t('Ciclo {number} — {module}', { number, module: cycle.module ?? '—' }) }))}">
      <div class="card-header">
        <span class="card-title">${escapeHtml(t('Ciclo {number} — {module}', { number, module: cycle.module ?? '—' }))}</span>
        ${badge(cycle.status ?? '—', cycleStatusClass(cycle.status))}
      </div>
      <p class="card-subtitle">${escapeHtml(cycle.phase ?? '—')}</p>
      ${renderCycleApps(cycle.apps)}
      <p class="card-hint">${escapeHtml(t('Inicio: {started} · Fin: {completed}', { started: cycle.started_at ?? '—', completed: cycle.completed_at ?? '—' }))}</p>
      ${renderCycleObjectives(cycle.objectives)}
      ${renderCycleMetrics(cycle.metrics)}
    </div>
  `;
}

function collectCycleSpecGroups(items, specsIndex) {
  const groups = groupBy(items, (item) => item.specId);
  const collected = [...groups.entries()].map(([specId, cycles]) => ({
    specId,
    title: findSpecTitle(specsIndex, specId) ?? specId,
    status: findSpecStatus(specsIndex, specId),
    cycles: sortBy(cycles, (item) => item.cycleId),
  }));
  return sortBy(collected, (group) => group.specId);
}

function cycleMatchesQuery(item, q) {
  return (
    item.specId.toLowerCase().includes(q) ||
    item.cycleId.toLowerCase().includes(q) ||
    (item.cycle?.module ?? '').toLowerCase().includes(q) ||
    (item.cycle?.status ?? '').toLowerCase().includes(q)
  );
}

function renderCycleSpecSection(group, displayCycles, collapsed, animate) {
  const contentId = planningDomId('cycles-spec', group.specId);
  const meta =
    displayCycles.length === group.cycles.length
      ? t('{count} ciclo{suffix}', {
          count: group.cycles.length,
          suffix: group.cycles.length === 1 ? '' : 's',
        })
      : t('{shown} / {total} ciclo{suffix}', {
          shown: displayCycles.length,
          total: group.cycles.length,
          suffix: group.cycles.length === 1 ? '' : 's',
        });
  return `
    <div>
      ${groupHeaderButton(
        {
          eyebrow: 'Spec',
          title: group.title,
          subtitle: group.specId,
          meta,
          statusChip: specStatusChip(group.status),
        },
        contentId,
        `data-spec-group="${escapeHtml(group.specId)}"`,
        collapsed,
      )}
      <div id="${contentId}" ${collapsed ? 'hidden' : ''}>
        <div style="padding-left:12px; border-left:1px solid rgb(var(--rgb-zinc-800) / 0.6); margin-top:12px; display:flex; flex-direction:column; gap:12px;">
          ${displayCycles.map((item, idx) => renderCycleCard(item, idx, animate)).join('')}
        </div>
      </div>
    </div>
  `;
}

async function renderCycles(container, params) {
  let cycleIndex;
  try {
    cycleIndex = await loadCycleIndex();
  } catch (error) {
    container.innerHTML = errorState(error);
    return;
  }

  if (cycleIndex.length === 0) {
    container.innerHTML = `
      ${cyclesHeader(0, 0)}
      ${emptyState(
        t('Sin ciclos iniciados'),
        t(
          'Los ciclos SDD aparecerán aquí una vez que el Orquestador cree el primer sdd/specs/{spec-id}/cycles/cycle-01/brief.yaml.',
        ),
      )}
      ${cycleRolesPanel()}
    `;
    return;
  }

  const specsIndex = await loadSpecsIndex().catch(() => null);

  const results = await Promise.allSettled(
    cycleIndex.map(({ specId, cycleId }) => loadCycleJson(specId, cycleId)),
  );
  const items = cycleIndex.map(({ specId, cycleId }, index) => ({
    specId,
    cycleId,
    cycle: results[index].status === 'fulfilled' ? results[index].value : null,
  }));

  const groups = collectCycleSpecGroups(items, specsIndex);
  const state = { query: '', expandedSpecs: new Set() };

  function visibleGroups() {
    const q = state.query.trim().toLowerCase();
    if (!q)
      return groups.map((group) => ({ group, displayCycles: group.cycles }));
    return groups
      .map((group) => ({
        group,
        displayCycles: group.cycles.filter((item) =>
          cycleMatchesQuery(item, q),
        ),
      }))
      .filter((entry) => entry.displayCycles.length > 0);
  }

  function bindCycleCardClicks(scopeEl) {
    scopeEl.querySelectorAll('[data-cycle-id]').forEach((cardEl) => {
      const specId = cardEl.dataset.specId;
      const cycleId = cardEl.dataset.cycleId;
      const item = items.find(
        (entry) => entry.specId === specId && entry.cycleId === cycleId,
      );
      if (!item) return;
      const open = () => openCycleDetailModal(item);
      cardEl.addEventListener('click', open);
      cardEl.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        open();
      });
    });
  }

  function paintList() {
    const listRoot = container.querySelector('[data-list-root]');
    if (!listRoot) return;
    const entries = visibleGroups();
    listRoot.innerHTML =
      entries.length === 0
        ? emptyState(
            t('Sin resultados'),
            t('No se encontraron ciclos que coincidan con "{query}".', {
              query: state.query,
            }),
          )
        : entries
            .map(({ group, displayCycles }) =>
              renderCycleSpecSection(
                group,
                displayCycles,
                state.query ? false : !state.expandedSpecs.has(group.specId),
                false,
              ),
            )
            .join('');
    bindCycleCardClicks(listRoot);
  }

  const initialEntries = groups.map((group) => ({
    group,
    displayCycles: group.cycles,
  }));

  container.innerHTML = `
    ${cyclesHeader(items.length, groups.length)}
    ${listSearchBox(t('Buscar por spec, ciclo, título o estado…'), '')}
    <div data-list-root>${initialEntries
      .map(({ group, displayCycles }) =>
        renderCycleSpecSection(
          group,
          displayCycles,
          !state.expandedSpecs.has(group.specId),
          true,
        ),
      )
      .join('')}</div>
  `;

  attachCycleCardHandlers(container, items);

  container.addEventListener('click', (event) => {
    const toggle = event.target.closest('[data-toggle]');
    if (
      !toggle ||
      !container.contains(toggle) ||
      toggle.dataset.specGroup === undefined
    )
      return;
    const target = document.getElementById(toggle.getAttribute('data-toggle'));
    if (!target) return;
    const wasHidden = target.hidden;
    target.hidden = !wasHidden;
    toggle.setAttribute('aria-expanded', String(wasHidden));
    const chevron = toggle.querySelector('[data-chevron]');
    if (chevron) chevron.style.transform = `rotate(${wasHidden ? 0 : -90}deg)`;
    const collapsedNow = !wasHidden;
    if (collapsedNow) state.expandedSpecs.delete(toggle.dataset.specGroup);
    else state.expandedSpecs.add(toggle.dataset.specGroup);
  });

  bindListSearch(container, (value) => {
    state.query = value;
    paintList();
  });
}

function attachCycleCardHandlers(container, items) {
  for (const cardEl of container.querySelectorAll('[data-cycle-id]')) {
    const specId = cardEl.dataset.specId;
    const cycleId = cardEl.dataset.cycleId;
    const item = items.find(
      (entry) => entry.specId === specId && entry.cycleId === cycleId,
    );
    if (!item) continue;
    const open = () => openCycleDetailModal(item);
    cardEl.addEventListener('click', open);
    cardEl.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      open();
    });
  }
  container.insertAdjacentHTML('beforeend', cycleRolesPanel());
}

let cycleModalToken = 0;

const CYCLE_EYEBROW_STYLE =
  'font-family: var(--font-mono); font-size: var(--text-10); text-transform: uppercase; letter-spacing: var(--tracking-widest); color: var(--text-subtle); margin: 0 0 8px';
const CYCLE_HINT_STYLE =
  'font-size: var(--text-11); color: var(--text-faint); margin: 0';
const CYCLE_PANEL_STYLE =
  'border: 1px solid rgb(var(--rgb-zinc-800) / 0.6); border-radius: var(--radius-xl); background: rgb(var(--rgb-zinc-900) / 0.2); padding: 16px 20px';

const CYCLE_ROLES = [
  ['01', 'Orquestador', 'brief.yaml + cycle.json'],
  ['02', 'Funcional', 'functional.md'],
  ['03', 'Planner', 'planner.md'],
  ['04', 'Arquitecto', 'architect.md'],
  ['05', 'Impl. Back', '—'],
  ['06', 'Impl. Front', '—'],
  ['07', 'Reviewer', 'CONTEXTO GATE → completed'],
];

function cycleRoleRow([num, role, artifact]) {
  return `
    <div style="display:flex; align-items:center; gap:8px">
      <span style="width:20px; flex-shrink:0; font-family: var(--font-mono); font-size: var(--text-10); color: rgb(var(--rgb-emerald-500) / 0.5)">${escapeHtml(num)}</span>
      <span style="font-size: var(--text-11); color: var(--text-dim)">${escapeHtml(role)}</span>
      <span style="margin-left:auto; font-family: var(--font-mono); font-size: var(--text-10); color: var(--text-subtle)">${escapeHtml(artifact)}</span>
    </div>
  `;
}

function cycleRolesPanel() {
  return `
    <div style="${CYCLE_PANEL_STYLE}">
      <p style="${CYCLE_EYEBROW_STYLE}">${t('Agentes del ciclo')}</p>
      <div style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 4px 32px">
        ${CYCLE_ROLES.map(cycleRoleRow).join('')}
      </div>
    </div>
  `;
}

function cycleDocRenderMode(name) {
  if (name.endsWith('.md')) return 'markdown';
  if (name.endsWith('.json')) return 'json';
  return 'raw';
}

function cycleJsonFieldRow(label, valueHtml) {
  return `
    <div style="display:flex; align-items:flex-start; gap:16px; padding:12px 16px; border-bottom:1px solid rgb(var(--rgb-zinc-800) / 0.6)">
      <span style="width:96px; flex-shrink:0; font-family: var(--font-mono); font-size: var(--text-10); text-transform: uppercase; letter-spacing: var(--tracking-widest); color: var(--text-subtle)">${escapeHtml(label)}</span>
      <div style="flex:1; min-width:0">${valueHtml}</div>
    </div>
  `;
}

function cycleJsonMono(text, color = 'var(--text-muted)') {
  return `<span style="font-family: var(--font-mono); font-size: var(--text-12); color: ${color}">${escapeHtml(String(text))}</span>`;
}

function cycleJsonView(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) {
    return `<pre><code>${escapeHtml(JSON.stringify(data, null, 2))}</code></pre>`;
  }

  const fields = [];
  if (data.cycle !== undefined)
    fields.push(
      cycleJsonFieldRow(
        t('Ciclo'),
        cycleJsonMono(`#${data.cycle}`, 'var(--text-bright)'),
      ),
    );
  else if (data.id)
    fields.push(
      cycleJsonFieldRow('ID', cycleJsonMono(data.id, 'var(--text-bright)')),
    );
  if (data.module)
    fields.push(cycleJsonFieldRow(t('Módulo'), cycleJsonMono(data.module)));
  else if (data.title)
    fields.push(
      cycleJsonFieldRow(
        t('Título'),
        `<span style="font-size: var(--text-12); color: var(--text-bright)">${escapeHtml(data.title)}</span>`,
      ),
    );
  if (data.app)
    fields.push(
      cycleJsonFieldRow('App', cycleJsonMono(data.app, 'var(--text-faint)')),
    );
  fields.push(
    cycleJsonFieldRow(
      t('Estado'),
      badge(data.status ?? '—', cycleStatusClass(data.status)),
    ),
  );
  if (data.spec)
    fields.push(
      cycleJsonFieldRow('Spec', cycleJsonMono(data.spec, 'var(--text-faint)')),
    );
  if (data.started_at)
    fields.push(cycleJsonFieldRow(t('Inicio'), cycleJsonMono(data.started_at)));
  if (data.completed_at)
    fields.push(
      cycleJsonFieldRow(t('Completado'), cycleJsonMono(data.completed_at)),
    );

  const reviewerReport =
    data.reviewer_report !== undefined && data.reviewer_report !== null
      ? `
        <div>
          <p style="${CYCLE_EYEBROW_STYLE}">${t('Reporte del reviewer')}</p>
          <div style="${CYCLE_PANEL_STYLE}">
            <p style="margin:0; font-size: var(--text-12); color: var(--text-muted); line-height: var(--leading-relaxed); white-space: pre-wrap">${escapeHtml(
              typeof data.reviewer_report === 'string'
                ? data.reviewer_report
                : JSON.stringify(data.reviewer_report, null, 2),
            )}</p>
          </div>
        </div>
      `
      : '';

  const artifacts =
    Array.isArray(data.artifacts) && data.artifacts.length > 0
      ? `
        <div>
          <p style="${CYCLE_EYEBROW_STYLE}">${escapeHtml(t('Artefactos ({count})', { count: data.artifacts.length }))}</p>
          <div style="display:flex; flex-direction:column; gap:6px">
            ${data.artifacts
              .map(
                (artifact) => `
                  <div style="display:flex; align-items:center; gap:8px; padding:6px 10px; border-radius: var(--radius-md); border:1px solid rgb(var(--rgb-amber-500) / 0.2); background: rgb(var(--rgb-amber-500) / 0.05)">
                    <span style="width:4px; height:4px; border-radius:999px; background: rgb(var(--rgb-amber-500)); flex-shrink:0"></span>
                    <span style="font-family: var(--font-mono); font-size: var(--text-12); color: rgb(var(--rgb-amber-400))">${escapeHtml(typeof artifact === 'string' ? artifact : JSON.stringify(artifact))}</span>
                  </div>
                `,
              )
              .join('')}
          </div>
        </div>
      `
      : '';

  return `
    <div style="display:flex; flex-direction:column; gap:20px">
      <div style="border:1px solid rgb(var(--rgb-zinc-800) / 0.6); border-radius: var(--radius-xl); overflow:hidden">${fields.join('')}</div>
      ${reviewerReport}
      ${artifacts}
    </div>
  `;
}

const CYCLE_TASK_STATUS_META = {
  done: {
    dot: 'rgb(var(--rgb-emerald-500))',
    text: 'rgb(var(--rgb-emerald-400))',
    label: 'hecho',
  },
  'in-progress': {
    dot: 'rgb(var(--rgb-amber-400))',
    text: 'rgb(var(--rgb-amber-400))',
    label: 'en progreso',
  },
  skipped: {
    dot: 'rgb(var(--rgb-zinc-600))',
    text: 'var(--text-faint)',
    label: 'omitido',
  },
  pending: {
    dot: 'rgb(var(--rgb-zinc-500))',
    text: 'var(--text-dim)',
    label: 'pendiente',
  },
};

function cycleTaskStatusMeta(status) {
  return CYCLE_TASK_STATUS_META[status] ?? CYCLE_TASK_STATUS_META.pending;
}

function toggleCycleTaskFiles(toggle) {
  const wrapper = toggle.closest('[data-files-label]');
  const list = wrapper?.querySelector('.cycle-task-file-list');
  if (!wrapper || !list) return;
  const isOpen = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!isOpen));
  list.style.display = isOpen ? 'none' : 'flex';
  toggle.textContent = `${isOpen ? '▸' : '▾'} ${wrapper.dataset.filesLabel}`;
}

function cycleTaskFilesToggle(files) {
  if (files.length === 0) return '';
  const label = t('{count} archivo{suffix}', {
    count: files.length,
    suffix: files.length === 1 ? '' : 's',
  });
  return `
    <div style="margin-top:8px; padding-left:16px" data-files-label="${escapeHtml(label)}">
      <button type="button" data-files-toggle aria-expanded="false" style="background:none; border:none; padding:0; cursor:pointer; font-family: var(--font-mono); font-size: var(--text-10); color: var(--text-subtle)">${escapeHtml(`▸ ${label}`)}</button>
      <div class="cycle-task-file-list" style="display:none; margin-top:6px; flex-direction:column; gap:4px">
        ${files
          .map(
            (file) =>
              `<span title="${escapeHtml(file)}" style="font-family: var(--font-mono); font-size: var(--text-10); color: var(--text-faint); overflow:hidden; text-overflow:ellipsis; white-space:nowrap">${escapeHtml(file)}</span>`,
          )
          .join('')}
      </div>
    </div>
  `;
}

function cycleTaskRow(task) {
  const meta = cycleTaskStatusMeta(task.status);
  const userStories = task.user_stories ?? [];
  const dependsOn = task.depends_on ?? [];
  const files = task.files ?? [];

  return `
    <div style="${CYCLE_PANEL_STYLE}">
      <div style="display:flex; align-items:flex-start; gap:10px">
        <span style="width:6px; height:6px; margin-top:6px; border-radius:999px; flex-shrink:0; background:${meta.dot}"></span>
        <div style="flex:1; min-width:0">
          <div style="display:flex; align-items:baseline; gap:8px; flex-wrap:wrap">
            <span style="font-family: var(--font-mono); font-size: var(--text-10); color: var(--text-faint)">${escapeHtml(task.id)}</span>
            <span style="font-size: var(--text-12); color: var(--text-bright)">${escapeHtml(task.title)}</span>
          </div>
          <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap; margin-top:6px">
            <span style="font-family: var(--font-mono); font-size: var(--text-10); color: ${meta.text}">${escapeHtml(t(meta.label))}</span>
            ${userStories.map((hu) => `<span class="chip chip--sm">${escapeHtml(hu)}</span>`).join('')}
            ${
              dependsOn.length
                ? `<span style="font-family: var(--font-mono); font-size: var(--text-10); color: var(--text-ghost)">${escapeHtml(`← ${dependsOn.join(', ')}`)}</span>`
                : ''
            }
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:6px; flex-shrink:0">
          ${task.story_points !== undefined ? `<span class="chip chip--sm">${escapeHtml(`${task.story_points} SP`)}</span>` : ''}
          ${task.estimation_hours !== undefined ? `<span class="chip chip--sm">${escapeHtml(formatHours(task.estimation_hours))}</span>` : ''}
        </div>
      </div>
      ${cycleTaskFilesToggle(files)}
    </div>
  `;
}

function cycleTasksSummary(data, totals) {
  const pct =
    totals.count > 0 ? Math.round((totals.resolved / totals.count) * 100) : 0;
  const flowChip =
    data.flow === 'reduced'
      ? `<span class="chip chip--sm" style="font-family: var(--font-mono)">flow: reduced</span>`
      : '';
  const appsChips = (data.apps ?? [])
    .map(
      (app) =>
        `<span class="chip chip--sm" style="font-family: var(--font-mono)">${escapeHtml(app)}</span>`,
    )
    .join('');
  return `
    <div style="${CYCLE_PANEL_STYLE}; display:flex; flex-direction:column; gap:12px">
      <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap">
        <span style="font-family: var(--font-mono); font-size: var(--text-12); color: var(--text-bright)">${escapeHtml(data.module ?? '—')}</span>
        ${flowChip}
        ${appsChips}
        <span style="margin-left:auto; font-family: var(--font-mono); font-size: var(--text-10); color: var(--text-faint)">${escapeHtml(
          `${totals.storyPoints} SP · ${formatHours(totals.hours)} estimadas`,
        )}</span>
      </div>
      <div style="display:flex; align-items:center; gap:12px">
        <div style="flex:1; height:6px; border-radius:999px; background: rgb(var(--rgb-zinc-800)); overflow:hidden">
          <div style="height:100%; border-radius:999px; background: var(--accent); width:${pct}%"></div>
        </div>
        <span style="font-family: var(--font-mono); font-size: var(--text-10); color: var(--text-faint); flex-shrink:0">${escapeHtml(
          `${totals.resolved}/${totals.count} tasks · ${pct}%`,
        )}</span>
      </div>
    </div>
  `;
}

function cycleTasksView(data) {
  if (!data || !Array.isArray(data.tasks)) {
    return `<pre><code>${escapeHtml(JSON.stringify(data, null, 2))}</code></pre>`;
  }
  const totals = sumTaskTotals([{ tasks: data.tasks }]);
  return `
    <div style="display:flex; flex-direction:column; gap:16px">
      ${cycleTasksSummary(data, totals)}
      <div style="display:flex; flex-direction:column; gap:8px">
        ${data.tasks.map((task) => cycleTaskRow(task)).join('')}
      </div>
    </div>
  `;
}

async function loadCycleDocSection(file, cycleJson) {
  try {
    if (file.name === 'cycle.json') {
      const data = cycleJson ?? (await fetchJson(file.path));
      return { file, html: cycleJsonView(data) };
    }
    if (file.name === 'tasks.json') {
      const data = await fetchJson(file.path);
      return { file, html: cycleTasksView(data) };
    }
    const mode = cycleDocRenderMode(file.name);
    if (mode === 'markdown') {
      return {
        file,
        html: `<div class="markdown">${await loadMarkdown(file.path)}</div>`,
      };
    }
    if (mode === 'json') {
      const data = await fetchJson(file.path);
      return {
        file,
        html: `<pre><code>${escapeHtml(JSON.stringify(data, null, 2))}</code></pre>`,
      };
    }
    const text = await fetchText(file.path);
    return { file, html: `<pre><code>${escapeHtml(text)}</code></pre>` };
  } catch {
    return { file, html: null };
  }
}

function cycleDocLabel(file) {
  return file.kind === 'artifact' ? `${file.name} · artifact` : file.name;
}

function cycleModalResumenChip(text) {
  return `<span class="chip chip--sm" style="font-family: var(--font-mono)">${escapeHtml(text)}</span>`;
}

const ACTIVITY_TONES = Object.freeze({
  emerald: 'rgb(var(--rgb-emerald-400))',
  amber: 'rgb(var(--rgb-amber-400))',
  muted: 'var(--text-muted)',
  faint: 'var(--text-faint)',
});

/**
 * Actividad del ciclo reconstruida SOLO desde los registros (cycle.json +
 * tasks.json): qué agente abrió, qué documentos existen, cada task con sus
 * tokens/tier si el implementador los registró, y el cierre del reviewer.
 * Es la versión real del feed que el sitio muestra como demo — acá no se
 * inventa nada: si un dato no está en los registros, la línea no aparece.
 */
function cycleActivityFeed(cycle, tasks, cycleId) {
  if (!cycle) return '';
  const rows = [];
  const push = (actor, text, tone) => rows.push({ actor, text, tone });

  push(
    'sdd-orchestrator',
    t('abre {cycleId} ({module}) · brief + cycle.json', {
      cycleId,
      module: cycle.module ?? '—',
    }),
    'emerald',
  );
  const docs = cycle.documents ?? {};
  if (docs.functional)
    push(
      'sdd-functional',
      t('functional.md — requisitos y user stories'),
      'muted',
    );
  if (docs.planner)
    push('sdd-planner', t('planner.md — tasks y estimaciones'), 'muted');
  if (docs.architect)
    push('sdd-architect', t('architect.md — diseño validado'), 'muted');

  for (const task of tasks?.tasks ?? []) {
    const u = task.usage;
    const model = u ? (u.provider_model ?? u.model_tier ?? null) : null;
    const tokens = u
      ? ` · ${costsTokensFormat().format(u.tokens_total ?? (u.tokens_in ?? 0) + (u.tokens_out ?? 0))} tokens${model ? ` (${model})` : ''}`
      : '';
    const tone =
      task.status === 'done'
        ? 'emerald'
        : task.status === 'in-progress'
          ? 'amber'
          : 'faint';
    push(task.id, `${task.status} · ${task.title}${tokens}`, tone);
  }

  if (cycle.status === 'completed') {
    const rep = cycle.reviewer_report;
    const verdict =
      rep && typeof rep === 'object'
        ? rep.approved
          ? t('aprobado')
          : t('con observaciones')
        : t('sin reviewer_report');
    push(
      'sdd-reviewer',
      t('cierra {cycleId} ✓ · {verdict} · CONTEXTO + MEMORIA GATE', {
        cycleId,
        verdict,
      }),
      'emerald',
    );
  }

  const lines = rows
    .map(
      (row) => `
        <div style="display:flex; gap:10px; align-items:baseline; min-width:0">
          <span style="flex:0 0 auto; font-family: var(--font-mono); font-size: var(--text-11); color:${ACTIVITY_TONES[row.tone]}">${escapeHtml(row.actor)}</span>
          <span style="min-width:0; font-family: var(--font-mono); font-size: var(--text-11); color: var(--text-muted); overflow-wrap:break-word">${escapeHtml(row.text)}</span>
        </div>`,
    )
    .join('');
  return `
    <div>
      <p style="${CYCLE_EYEBROW_STYLE}">${t('Actividad del ciclo — derivada de los registros')}</p>
      <div style="display:flex; flex-direction:column; gap:8px; padding:12px 14px; border:1px solid var(--border); border-radius: var(--radius-lg)">${lines}</div>
    </div>
  `;
}

function cycleAgentUsageBlock(cycle) {
  const byAgent = cycle?.metrics?.usage?.by_agent;
  if (!Array.isArray(byAgent) || byAgent.length === 0) return '';
  const lines = byAgent
    .map((entry) => {
      const bucket = { agent: entry.agent ?? null, label: entry.label ?? null };
      const model = normalizeTierKey(entry.provider_model ?? null) ?? '—';
      const tokens = costsTokensFormat().format(
        entry.tokens_total ?? (entry.tokens_in ?? 0) + (entry.tokens_out ?? 0),
      );
      const origin = originBadge(
        entry.approx === true ? COSTS_ORIGIN_ESTIMATED : COSTS_ORIGIN_EXACT,
      );
      const effort = entry.effort ? ` · ${entry.effort}` : '';
      return `
        <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap; min-width:0">
          <span style="flex:0 0 auto; font-family: var(--font-mono); font-size: var(--text-11); color: rgb(var(--rgb-emerald-400))">${escapeHtml(costsAgentLabel(bucket))}</span>
          <span style="font-family: var(--font-mono); font-size: var(--text-11); color: var(--text-muted)">${escapeHtml(`${model}${effort} · ${tokens} tokens`)}</span>
          ${origin}
        </div>`;
    })
    .join('');
  return `
    <div>
      <p style="${CYCLE_EYEBROW_STYLE}">${escapeHtml(t('Uso por agente ({count})', { count: byAgent.length }))}</p>
      <div style="display:flex; flex-direction:column; gap:8px; padding:12px 14px; border:1px solid var(--border); border-radius: var(--radius-lg)">${lines}</div>
    </div>
  `;
}

function cycleModalResumenView(specId, cycleId, cycle, files, onTabIndex, tasks) {
  const docsBlock = files.length
    ? `
      <div>
        <p style="${CYCLE_EYEBROW_STYLE}">${escapeHtml(t('Documentos ({count})', { count: files.length }))}</p>
        <div style="display:flex; flex-wrap:wrap; gap:8px">
          ${files
            .map(
              (file, index) =>
                `<button type="button" class="chip chip--sm" data-cycle-tab="${onTabIndex(index)}" style="cursor:pointer; background:none; font-family: var(--font-mono)">${escapeHtml(cycleDocLabel(file))}</button>`,
            )
            .join('')}
        </div>
      </div>
    `
    : '';

  if (!cycle) {
    return `
      <div style="display:flex; flex-direction:column; gap:16px">
        <p style="${CYCLE_HINT_STYLE}">${escapeHtml(`${specId} · ${cycleId}`)}</p>
        <p style="${CYCLE_HINT_STYLE}">${t('No se pudo cargar cycle.json para este ciclo.')}</p>
        ${docsBlock}
      </div>
    `;
  }

  const number = cycleDisplayNumber(cycleId, cycle);
  const specChip = cycle.spec
    ? cycleModalResumenChip(`spec: ${cycle.spec}`)
    : '';

  const dateFields = [];
  if (cycle.started_at) {
    dateFields.push(`
      <div>
        <p style="${CYCLE_EYEBROW_STYLE}">${t('Inicio')}</p>
        <p style="margin:0; font-family: var(--font-mono); font-size: var(--text-12); color: var(--text-muted)">${escapeHtml(cycle.started_at)}</p>
      </div>
    `);
  }
  if (cycle.completed_at) {
    dateFields.push(`
      <div>
        <p style="${CYCLE_EYEBROW_STYLE}">${t('Fin')}</p>
        <p style="margin:0; font-family: var(--font-mono); font-size: var(--text-12); color: var(--text-muted)">${escapeHtml(cycle.completed_at)}</p>
      </div>
    `);
  }

  const artifactsBlock =
    Array.isArray(cycle.artifacts) && cycle.artifacts.length > 0
      ? `
        <div>
          <p style="${CYCLE_EYEBROW_STYLE}">${escapeHtml(t('Artefactos ({count})', { count: cycle.artifacts.length }))}</p>
          <div style="display:flex; flex-direction:column; gap:4px">
            ${cycle.artifacts
              .map(
                (artifact) => `
                  <span style="display:flex; align-items:center; gap:8px; padding:6px 10px; border-radius: var(--radius-md); border:1px solid rgb(var(--rgb-amber-500) / 0.2); background: rgb(var(--rgb-amber-500) / 0.05)">
                    <span style="width:4px; height:4px; border-radius:999px; background: rgb(var(--rgb-amber-500)); flex-shrink:0"></span>
                    <span style="font-family: var(--font-mono); font-size: var(--text-12); color: rgb(var(--rgb-amber-400))">${escapeHtml(String(artifact))}</span>
                  </span>
                `,
              )
              .join('')}
          </div>
        </div>
      `
      : '';

  return `
    <div style="display:flex; flex-direction:column; gap:20px">
      <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap">
        ${badge(cycle.status ?? '—', cycleStatusClass(cycle.status))}
        <span style="font-family: var(--font-mono); font-size: var(--text-10); color: var(--text-faint)">${escapeHtml(t('Ciclo #{number}', { number }))}</span>
        ${specChip}
      </div>
      ${dateFields.length ? `<div style="display:grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap:16px">${dateFields.join('')}</div>` : ''}
      ${cycleActivityFeed(cycle, tasks, cycleId)}
      ${cycleAgentUsageBlock(cycle)}
      ${docsBlock}
      ${artifactsBlock}
    </div>
  `;
}

function cycleModalTabBar(tabs, activeIndex) {
  return `
    <div class="cycle-tabs" role="tablist">
      ${tabs
        .map((tab, index) => {
          const active = index === activeIndex;
          return `<button type="button" class="cycle-tab${active ? ' cycle-tab--active' : ''}" role="tab" aria-selected="${active}" data-cycle-tab="${index}" style="flex-shrink:0; padding:8px 12px; margin-bottom:-1px; background:none; cursor:pointer; font-family: var(--font-mono); font-size: var(--text-12); font-weight: var(--weight-medium); border:none; border-bottom:2px solid ${active ? 'var(--accent)' : 'transparent'}; color:${active ? 'rgb(var(--rgb-emerald-400))' : 'var(--text-faint)'}">${escapeHtml(tab.label)}</button>`;
        })
        .join('')}
    </div>
  `;
}

async function openCycleDetailModal(item) {
  const { specId, cycleId, cycle } = item;
  const number = cycleDisplayNumber(cycleId, cycle);
  const title = cycle
    ? t('Ciclo {number} — {module}', { number, module: cycle.module ?? '—' })
    : cycleId;

  openModal({ title, size: 'xl', bodyHtml: skeletonLines() });
  const openId = modalToken;

  const [files, cycleTasks] = await Promise.all([
    resolveCycleFiles(specId, cycleId, cycle ?? {}).catch(() => []),
    fetchJson(`specs/${specId}/cycles/${cycleId}/tasks.json`).catch(() => null),
  ]);
  if (!activeModal || activeModal.token !== openId) return;

  const tabs = [
    { id: '__resumen__', label: t('Resumen') },
    ...files.map((file) => ({
      id: file.path,
      label: cycleDocLabel(file),
      file,
    })),
  ];
  const token = ++cycleModalToken;
  const cache = new Map();
  let activeIndex = 0;

  setModalBody(
    openId,
    `
      ${cycleModalTabBar(tabs, activeIndex)}
      <div data-cycle-tab-panel>${cycleModalResumenView(specId, cycleId, cycle, files, (index) => index + 1, cycleTasks)}</div>
    `,
  );

  const backdrop = document.getElementById('sdd-modal-backdrop');
  if (!backdrop) return;

  const setActiveTabButtons = (index) => {
    for (const btn of backdrop.querySelectorAll('.cycle-tab[data-cycle-tab]')) {
      const active = Number(btn.dataset.cycleTab) === index;
      btn.classList.toggle('cycle-tab--active', active);
      btn.style.borderBottomColor = active ? 'var(--accent)' : 'transparent';
      btn.style.color = active
        ? 'rgb(var(--rgb-emerald-400))'
        : 'var(--text-faint)';
      btn.setAttribute('aria-selected', String(active));
    }
  };

  const selectTab = async (index) => {
    if (token !== cycleModalToken || index === activeIndex || !tabs[index])
      return;
    activeIndex = index;
    setActiveTabButtons(index);
    const bodyEl = backdrop.querySelector('.modal-body');
    if (bodyEl) bodyEl.scrollTop = 0;
    const panelEl = backdrop.querySelector('[data-cycle-tab-panel]');
    if (!panelEl) return;

    if (index === 0) {
      panelEl.innerHTML = cycleModalResumenView(
        specId,
        cycleId,
        cycle,
        files,
        (fileIndex) => fileIndex + 1,
        cycleTasks,
      );
      return;
    }

    const tab = tabs[index];
    if (cache.has(tab.id)) {
      panelEl.innerHTML = cache.get(tab.id);
      return;
    }

    panelEl.innerHTML = skeletonLines();
    const section = await loadCycleDocSection(tab.file, cycle);
    if (token !== cycleModalToken || activeIndex !== index) return;
    const html =
      section.html ?? emptyState(t('No disponible'), section.file.path);
    cache.set(tab.id, html);
    panelEl.innerHTML = html;
  };

  backdrop.addEventListener('click', (event) => {
    const tabTarget = event.target.closest('[data-cycle-tab]');
    if (tabTarget && backdrop.contains(tabTarget)) {
      selectTab(Number(tabTarget.dataset.cycleTab));
      return;
    }
    const toggleTarget = event.target.closest('[data-files-toggle]');
    if (toggleTarget && backdrop.contains(toggleTarget)) {
      toggleCycleTaskFiles(toggleTarget);
    }
  });
}

function sumTaskTotals(groups) {
  const tasks = groups.flatMap((group) => group.tasks ?? []);
  const skipped = tasks.filter((task) => task.status === 'skipped').length;
  const hours = tasks.reduce(
    (sum, task) => sum + (Number(task.estimation_hours) || 0),
    0,
  );
  const storyPoints = tasks.reduce(
    (sum, task) => sum + (Number(task.story_points) || 0),
    0,
  );
  const done = tasks.filter((task) => task.status === 'done').length;
  return {
    count: tasks.length,
    hours,
    storyPoints,
    done,
    skipped,
    resolved: done + skipped,
  };
}

function collectTaskSpecGroups(assembled, specsIndex) {
  return Object.entries(assembled?.specs ?? {}).map(([specId, spec]) => {
    const cycles = sortBy(
      Object.entries(spec.cycles ?? {}),
      ([cycleId]) => cycleId,
    ).map(([cycleId, cycle]) => {
      const tasks = cycle.tasks ?? [];
      return {
        cycleId,
        module: cycle.module,
        tasks,
        totals: sumTaskTotals([{ tasks }]),
      };
    });
    return {
      specId,
      title: findSpecTitle(specsIndex, specId) ?? specId,
      status: findSpecStatus(specsIndex, specId),
      cycles,
      totals: sumTaskTotals(cycles),
    };
  });
}

function taskStatusClass(status) {
  return `status--${status ?? 'pending'}`;
}

function renderTaskTagList(items) {
  if (!items || items.length === 0) return '—';
  return items.map((item) => `<code>${escapeHtml(item)}</code>`).join(' ');
}

function taskTypeTone(type) {
  if (type === 'BE') return 'blue';
  if (type === 'FE') return 'violet';
  if (type === 'INFRA') return 'orange';
  return 'blue';
}

function taskTypeLabel(type) {
  if (type === 'BE') return 'Backend';
  if (type === 'FE') return 'Frontend';
  if (type === 'INFRA') return 'Infraestructura';
  return null;
}

function taskTypeBadge(type) {
  if (!type) return '';
  return `<span class="chip chip--sm chip--${taskTypeTone(type)}">${escapeHtml(type)}</span>`;
}

function taskTable(columns, tasks) {
  const head = columns
    .map((column) => `<th>${escapeHtml(t(column.label))}</th>`)
    .join('');
  const body = tasks
    .map(
      (task) =>
        `<tr data-task-row>${columns.map((column) => `<td>${column.render(task)}</td>`).join('')}</tr>`,
    )
    .join('');
  return `
    <div class="table-wrapper">
      <table class="data-table">
        <thead><tr>${head}</tr></thead>
        <tbody>${body}</tbody>
      </table>
    </div>
  `;
}

const TASK_TABLE_COLUMNS = [
  { label: 'ID', render: (task) => `<code>${escapeHtml(task.id)}</code>` },
  { label: 'Tipo', render: (task) => taskTypeBadge(task.type) || '—' },
  { label: 'Título', render: (task) => escapeHtml(task.title ?? '—') },
  {
    label: 'Estado',
    render: (task) =>
      badge(task.status ?? 'pending', taskStatusClass(task.status)),
  },
  {
    label: 'Estimación',
    render: (task) => escapeHtml(formatHours(task.estimation_hours)),
  },
  {
    label: 'SP',
    render: (task) =>
      escapeHtml(
        task.story_points === undefined || task.story_points === null
          ? '—'
          : String(task.story_points),
      ),
  },
  {
    label: 'Historias',
    render: (task) => renderTaskTagList(task.user_stories),
  },
  { label: 'Depende de', render: (task) => renderTaskTagList(task.depends_on) },
  { label: 'Archivos', render: (task) => renderTaskTagList(task.files) },
];

function tasksHeader(totals, groupCount) {
  return pageHeader({
    title: t('Tareas'),
    meta: t('{count} tarea{suffix} en {groups} spec{groupsSuffix}', {
      count: totals.count,
      suffix: totals.count === 1 ? '' : 's',
      groups: groupCount,
      groupsSuffix: groupCount === 1 ? '' : 's',
    }),
    subtitle:
      t(
        'Tareas técnicas agrupadas por spec y ciclo SDD · {done} de {total} resueltas · {hours} estimadas · {points} SP',
        {
          done: totals.resolved,
          total: totals.count,
          hours: formatHours(totals.hours),
          points: totals.storyPoints,
        },
      ) +
      (totals.skipped > 0
        ? t(' · {n} omitida{suffix}', {
            n: totals.skipped,
            suffix: totals.skipped === 1 ? '' : 's',
          })
        : ''),
  });
}

function taskDetailFieldRow(label, valueHtml) {
  return `
    <div style="padding:10px 0; border-bottom:1px solid rgb(var(--rgb-zinc-800) / 0.6);">
      <p style="font-family:var(--font-mono); font-size:var(--text-10); text-transform:uppercase; letter-spacing:0.05em; color:var(--text-subtle); margin:0 0 4px;">${escapeHtml(label)}</p>
      <div style="font-size:var(--text-14); color:var(--text-muted);">${valueHtml}</div>
    </div>
  `;
}

function openTaskDetailModal(task, specId, cycleId) {
  const rows = [
    taskDetailFieldRow('ID', `<code>${escapeHtml(task.id)}</code>`),
    taskDetailFieldRow('Spec', `<code>${escapeHtml(specId)}</code>`),
    taskDetailFieldRow(t('Ciclo'), `<code>${escapeHtml(cycleId)}</code>`),
  ];
  const typeLabel = taskTypeLabel(task.type);
  if (typeLabel)
    rows.push(taskDetailFieldRow(t('Tipo'), escapeHtml(t(typeLabel))));
  const body = `
    <p style="display:flex; gap:8px; flex-wrap:wrap; margin:0 0 16px;">${taskTypeBadge(task.type)}${badge(task.status ?? 'pending', taskStatusClass(task.status))}</p>
    <div>${rows.join('')}</div>
  `;
  openModal(task.title ?? task.id, body, { subtitle: task.id, size: 'md' });
}

function taskMatchesQuery(task, specId, cycleId, q) {
  return (
    (task.id ?? '').toLowerCase().includes(q) ||
    (task.title ?? '').toLowerCase().includes(q) ||
    (task.type ?? '').toLowerCase().includes(q) ||
    (task.status ?? '').toLowerCase().includes(q) ||
    cycleId.toLowerCase().includes(q) ||
    specId.toLowerCase().includes(q)
  );
}

function renderTaskCycleBlock(specId, cycle, collapsed, animate) {
  const displayTasks = cycle.displayTasks;
  const body =
    displayTasks.length === 0
      ? emptyState(t('Sin tareas en este ciclo'))
      : taskTable(TASK_TABLE_COLUMNS, displayTasks);
  const contentId = planningDomId('tasks-cycle', specId, cycle.cycleId);
  const meta =
    displayTasks.length === cycle.tasks.length
      ? t('{count} tarea{suffix}', {
          count: cycle.tasks.length,
          suffix: cycle.tasks.length === 1 ? '' : 's',
        })
      : t('{shown} / {total} tarea{suffix}', {
          shown: displayTasks.length,
          total: cycle.tasks.length,
          suffix: cycle.tasks.length === 1 ? '' : 's',
        });
  return `
    <div class="${animate ? 'animate-fade-in-up' : ''}">
      ${groupHeaderButton(
        {
          eyebrow: t('Ciclo'),
          title: cycle.cycleId,
          subtitle: cycle.module ?? null,
          meta,
        },
        contentId,
        `data-cycle-group="${escapeHtml(`${specId}::${cycle.cycleId}`)}"`,
        collapsed,
      )}
      <div id="${contentId}" data-task-cycle-body data-spec-id="${escapeHtml(specId)}" data-cycle-id="${escapeHtml(cycle.cycleId)}" ${collapsed ? 'hidden' : ''} style="margin-top:12px;">
        ${body}
      </div>
    </div>
  `;
}

function renderTaskSpecSection(
  group,
  displayCycles,
  collapsedSpec,
  queryActive,
  collapsedCycles,
  animate,
) {
  const contentId = planningDomId('tasks-spec', group.specId);
  return `
    <div>
      ${groupHeaderButton(
        {
          eyebrow: 'Spec',
          title: group.title,
          subtitle: group.specId,
          meta: t('{done}/{total} tareas', {
            done: group.totals.resolved,
            total: group.totals.count,
          }),
          statusChip: specStatusChip(group.status),
        },
        contentId,
        `data-spec-group="${escapeHtml(group.specId)}"`,
        collapsedSpec,
      )}
      <div id="${contentId}" ${collapsedSpec ? 'hidden' : ''}>
        <div style="padding-left:12px; border-left:1px solid rgb(var(--rgb-zinc-800) / 0.6); margin-top:12px; display:flex; flex-direction:column; gap:16px;">
          ${displayCycles
            .map((cycle) => {
              const key = `${group.specId}::${cycle.cycleId}`;
              const cycleCollapsed = queryActive
                ? false
                : collapsedCycles.has(key);
              return renderTaskCycleBlock(
                group.specId,
                cycle,
                cycleCollapsed,
                animate,
              );
            })
            .join('')}
        </div>
      </div>
    </div>
  `;
}

function tasksSpecGatePanel() {
  return `
    <div style="${CYCLE_PANEL_STYLE}">
      <p style="${CYCLE_EYEBROW_STYLE}">SPEC GATE</p>
      <p style="font-size:var(--text-11); color:var(--text-dim); line-height:1.6; margin:0;">${escapeHtml(
        t(
          'Una tarea no puede implementarse sin TODOS los documentos del ciclo generados: brief.yaml, functional.md, planner.md, architect.md, cycle.json y tasks.json.',
        ),
      )}</p>
    </div>
  `;
}

async function renderTasks(container, params) {
  let assembled;
  try {
    assembled = await loadAssembledTasks();
  } catch (error) {
    container.innerHTML = errorState(error);
    return;
  }
  const specsIndex = await loadSpecsIndex().catch(() => null);
  const specGroups = collectTaskSpecGroups(assembled, specsIndex);
  const totals = sumTaskTotals(specGroups.flatMap((group) => group.cycles));

  if (specGroups.length === 0) {
    container.innerHTML = `
      ${tasksHeader(totals, 0)}
      ${emptyState(
        t('Sin tareas registradas'),
        t(
          'Las tareas técnicas son generadas por el agente Planner y aparecen aquí una vez que el primer ciclo SDD ha iniciado.',
        ),
      )}
      ${tasksSpecGatePanel()}
    `;
    return;
  }

  const state = {
    query: '',
    expandedSpecs: new Set(),
    collapsedCycles: new Set(),
  };
  for (const group of specGroups) {
    for (const cycle of group.cycles)
      state.collapsedCycles.add(`${group.specId}::${cycle.cycleId}`);
  }

  function visibleGroups() {
    const q = state.query.trim().toLowerCase();
    if (!q) {
      return specGroups.map((group) => ({
        group,
        displayCycles: group.cycles.map((cycle) => ({
          ...cycle,
          displayTasks: cycle.tasks,
        })),
      }));
    }
    return specGroups
      .map((group) => {
        const displayCycles = group.cycles
          .map((cycle) => ({
            ...cycle,
            displayTasks: cycle.tasks.filter((task) =>
              taskMatchesQuery(task, group.specId, cycle.cycleId, q),
            ),
          }))
          .filter((cycle) => cycle.displayTasks.length > 0);
        return { group, displayCycles };
      })
      .filter((entry) => entry.displayCycles.length > 0);
  }

  function paintList() {
    const listRoot = container.querySelector('[data-list-root]');
    if (!listRoot) return;
    const entries = visibleGroups();
    listRoot.innerHTML =
      entries.length === 0
        ? emptyState(
            t('Sin resultados'),
            t('No se encontraron tareas que coincidan con "{query}".', {
              query: state.query,
            }),
          )
        : entries
            .map(({ group, displayCycles }) =>
              renderTaskSpecSection(
                group,
                displayCycles,
                state.query ? false : !state.expandedSpecs.has(group.specId),
                Boolean(state.query),
                state.collapsedCycles,
                false,
              ),
            )
            .join('');
  }

  const initialEntries = specGroups.map((group) => ({
    group,
    displayCycles: group.cycles.map((cycle) => ({
      ...cycle,
      displayTasks: cycle.tasks,
    })),
  }));

  container.innerHTML = `
    ${tasksHeader(totals, specGroups.length)}
    ${listSearchBox(t('Buscar por ID, título, tipo, estado, ciclo o spec…'), '')}
    <div data-list-root>${initialEntries
      .map(({ group, displayCycles }) =>
        renderTaskSpecSection(
          group,
          displayCycles,
          !state.expandedSpecs.has(group.specId),
          false,
          state.collapsedCycles,
          true,
        ),
      )
      .join('')}</div>
    ${tasksSpecGatePanel()}
  `;

  container.addEventListener('click', (event) => {
    const toggle = event.target.closest('[data-toggle]');
    if (toggle && container.contains(toggle)) {
      const target = document.getElementById(
        toggle.getAttribute('data-toggle'),
      );
      if (!target) return;
      const wasHidden = target.hidden;
      target.hidden = !wasHidden;
      toggle.setAttribute('aria-expanded', String(wasHidden));
      const chevron = toggle.querySelector('[data-chevron]');
      if (chevron)
        chevron.style.transform = `rotate(${wasHidden ? 0 : -90}deg)`;
      const collapsedNow = !wasHidden;
      if (toggle.dataset.specGroup !== undefined) {
        if (collapsedNow) state.expandedSpecs.delete(toggle.dataset.specGroup);
        else state.expandedSpecs.add(toggle.dataset.specGroup);
      } else if (toggle.dataset.cycleGroup !== undefined) {
        if (collapsedNow) state.collapsedCycles.add(toggle.dataset.cycleGroup);
        else state.collapsedCycles.delete(toggle.dataset.cycleGroup);
      }
      return;
    }
    const row = event.target.closest('[data-task-row]');
    if (!row || !container.contains(row)) return;
    const body = row.closest('[data-task-cycle-body]');
    if (!body) return;
    const specId = body.dataset.specId;
    const cycleId = body.dataset.cycleId;
    const rows = Array.from(body.querySelectorAll('[data-task-row]'));
    const rowIndex = rows.indexOf(row);
    const entries = visibleGroups();
    const groupEntry = entries.find((entry) => entry.group.specId === specId);
    const cycleEntry = groupEntry?.displayCycles.find(
      (cycle) => cycle.cycleId === cycleId,
    );
    const task = cycleEntry?.displayTasks[rowIndex];
    if (task) openTaskDetailModal(task, specId, cycleId);
  });

  bindListSearch(container, (value) => {
    state.query = value;
    paintList();
  });
}

const FIX_REPO_LEVEL_KEY = '__repo__';

function findSpecTitle(specsIndex, specId) {
  return specsIndex?.specs?.find((spec) => spec.id === specId)?.title ?? null;
}

function findSpecStatus(specsIndex, specId) {
  return specsIndex?.specs?.find((spec) => spec.id === specId)?.status ?? null;
}

function collectFixGroups(fixesRegistry, specsIndex) {
  const list = fixesRegistry?.fixes ?? [];
  const groups = groupBy(list, (fix) => fix.spec_id ?? FIX_REPO_LEVEL_KEY);
  const orderedKeys = [
    FIX_REPO_LEVEL_KEY,
    ...[...groups.keys()].filter((key) => key !== FIX_REPO_LEVEL_KEY),
  ].filter((key) => groups.has(key));
  return orderedKeys.map((key) => {
    const isRepo = key === FIX_REPO_LEVEL_KEY;
    return {
      key,
      isRepo,
      specId: isRepo ? null : key,
      title: isRepo
        ? t('Fixes globales (sin spec asociada)')
        : (findSpecTitle(specsIndex, key) ?? key),
      status: isRepo ? null : findSpecStatus(specsIndex, key),
      fixes: groups.get(key),
    };
  });
}

function fixesHeader(total) {
  return pageHeader({
    title: 'Fixes',
    meta: t('{count} registrado{suffix}', {
      count: total,
      suffix: total === 1 ? '' : 's',
    }),
    subtitle: t('Registro de fixes fuera del flujo SDD normal (FIX GATE).'),
  });
}

async function renderFixes(container, params) {
  let fixesRegistry;
  try {
    fixesRegistry = await loadFixes();
  } catch (error) {
    container.innerHTML = errorState(error);
    return;
  }
  const specsIndex = await loadSpecsIndex().catch(() => null);
  const groups = collectFixGroups(fixesRegistry, specsIndex);
  const total = groups.reduce((sum, group) => sum + group.fixes.length, 0);

  if (total === 0) {
    container.innerHTML = `
      ${fixesHeader(0)}
      ${emptyState(
        t('Sin fixes registrados'),
        t(
          'Los fixes aparecen aquí cuando se usan los prefijos [HOTFIX], [BUGFIX], [FIX] o [IMPROVEMENT] para bypasear el SPEC GATE.',
        ),
      )}
      ${fixGatePrefixesPanel()}
    `;
    return;
  }

  const state = { query: '', expandedSpecs: new Set() };

  function visibleGroups() {
    const q = state.query.trim().toLowerCase();
    if (!q)
      return groups.map((group) => ({ group, displayFixes: group.fixes }));
    return groups
      .map((group) => ({
        group,
        displayFixes: group.fixes.filter((fix) => fixMatchesQuery(fix, q)),
      }))
      .filter((entry) => entry.displayFixes.length > 0);
  }

  function paintList() {
    const listRoot = container.querySelector('[data-list-root]');
    if (!listRoot) return;
    const entries = visibleGroups();
    listRoot.innerHTML =
      entries.length === 0
        ? emptyState(
            t('Sin resultados'),
            t('No se encontraron fixes que coincidan con "{query}".', {
              query: state.query,
            }),
          )
        : entries
            .map(({ group, displayFixes }) =>
              renderFixGroupSection(
                group,
                displayFixes,
                state.query ? false : !state.expandedSpecs.has(group.key),
                false,
              ),
            )
            .join('');
  }

  const initialEntries = groups.map((group) => ({
    group,
    displayFixes: group.fixes,
  }));

  container.innerHTML = `
    ${fixesHeader(total)}
    ${listSearchBox(t('Buscar por ID, título, tipo, estado, autor o spec…'), '')}
    <div data-list-root>${initialEntries
      .map(({ group, displayFixes }) =>
        renderFixGroupSection(
          group,
          displayFixes,
          !state.expandedSpecs.has(group.key),
          true,
        ),
      )
      .join('')}</div>
    ${fixGatePrefixesPanel()}
  `;

  container.addEventListener('click', (event) => {
    const toggle = event.target.closest('[data-toggle]');
    if (toggle && container.contains(toggle)) {
      const target = document.getElementById(
        toggle.getAttribute('data-toggle'),
      );
      if (!target) return;
      const wasHidden = target.hidden;
      target.hidden = !wasHidden;
      toggle.setAttribute('aria-expanded', String(wasHidden));
      const chevron = toggle.querySelector('[data-chevron]');
      if (chevron)
        chevron.style.transform = `rotate(${wasHidden ? 0 : -90}deg)`;
      const collapsedNow = !wasHidden;
      if (collapsedNow) state.expandedSpecs.delete(toggle.dataset.specGroup);
      else state.expandedSpecs.add(toggle.dataset.specGroup);
      return;
    }
    const row = event.target.closest('[data-fix-row]');
    if (!row || !container.contains(row)) return;
    const entries = visibleGroups();
    const groupEntry = entries.find((entry) =>
      entry.displayFixes.some((fix) => fix.id === row.dataset.fixId),
    );
    const fix = groupEntry?.displayFixes.find(
      (item) => item.id === row.dataset.fixId,
    );
    if (!fix) return;
    const specTitle = groupEntry.group.isRepo ? null : groupEntry.group.title;
    openFixDetailModal(fix, specTitle);
  });

  bindListSearch(container, (value) => {
    state.query = value;
    paintList();
  });
}

function fixTypeClass(type) {
  return `fix--${(type ?? 'fix').toLowerCase()}`;
}

function fixTypeTone(type) {
  const key = (type ?? 'FIX').toUpperCase();
  if (key === 'HOTFIX') return 'red';
  if (key === 'BUGFIX') return 'orange';
  if (key === 'IMPROVEMENT') return 'teal';
  return 'amber';
}

function fixTypeBadge(type) {
  const label = (type ?? 'FIX').toUpperCase();
  return `<span class="chip chip--sm chip--${fixTypeTone(type)}">${escapeHtml(label)}</span>`;
}

const FIX_GATE_PREFIXES = [
  {
    prefix: '[HOTFIX]',
    desc: 'Producción bloqueada, regresión crítica, dato corrupto',
    tone: 'red',
  },
  {
    prefix: '[BUGFIX]',
    desc: 'Error confirmado en desarrollo o testing',
    tone: 'orange',
  },
  {
    prefix: '[FIX]',
    desc: 'Alias genérico — el orquestador pedirá clasificar',
    tone: 'amber',
  },
  { prefix: '[IMPROVEMENT]', desc: 'Mejora menor out-of-spec', tone: 'teal' },
];

function fixGatePrefixRow({ prefix, desc, tone }) {
  return `
    <div style="display:flex; align-items:flex-start; gap:12px;">
      <span style="width:112px; flex-shrink:0; font-family:var(--font-mono); font-size:var(--text-11); font-weight:var(--weight-semibold); color:rgb(var(--rgb-${tone}-400));">${escapeHtml(prefix)}</span>
      <span style="font-size:var(--text-11); color:var(--text-faint);">${escapeHtml(t(desc))}</span>
    </div>
  `;
}

function fixGatePrefixesPanel() {
  return `
    <div style="${CYCLE_PANEL_STYLE}">
      <p style="${CYCLE_EYEBROW_STYLE}">${t('Prefijos FIX GATE')}</p>
      <div style="display:flex; flex-direction:column; gap:8px;">
        ${FIX_GATE_PREFIXES.map(fixGatePrefixRow).join('')}
      </div>
    </div>
  `;
}

function fixMatchesQuery(fix, q) {
  return (
    (fix.id ?? '').toLowerCase().includes(q) ||
    (fix.title ?? '').toLowerCase().includes(q) ||
    (fix.type ?? '').toLowerCase().includes(q) ||
    (fix.status ?? '').toLowerCase().includes(q) ||
    (fix.spec_id ?? '').toLowerCase().includes(q) ||
    (fix.author ?? '').toLowerCase().includes(q)
  );
}

function renderFixCard(fix, index, animate) {
  const staggerClass = animate
    ? ` animate-fade-in-up stagger-${Math.min(index + 1, 8)}`
    : '';
  return `
    <button type="button" class="row${staggerClass}" data-fix-row data-fix-id="${escapeHtml(fix.id)}"
      style="align-items:flex-start; width:100%; text-align:left; background:none; border:none; cursor:pointer; color:inherit; font:inherit; border-bottom:1px solid var(--border);"
      aria-label="${escapeHtml(t('Ver detalle de {label}', { label: fix.title ?? fix.id }))}">
      <span style="display:flex; align-items:flex-start; gap:16px; min-width:0;">
        <span style="width:64px; flex-shrink:0; font-family:var(--font-mono); font-size:var(--text-10); color:rgb(var(--rgb-emerald-500) / 0.6); padding-top:2px;">${escapeHtml(fix.id)}</span>
        <span style="min-width:0;">
          <span style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
            ${fixTypeBadge(fix.type)}
            ${fix.cycle ? `<span class="card-hint" style="margin:0;">${escapeHtml(t('ciclo: {cycle}', { cycle: fix.cycle }))}</span>` : ''}
          </span>
          <span style="display:block; font-size:var(--text-14); color:var(--text-muted); overflow-wrap:break-word;">${escapeHtml(fix.title ?? '—')}</span>
          <span style="display:block; font-family:var(--font-mono); font-size:var(--text-10); color:var(--text-subtle); margin-top:4px;">${escapeHtml(fix.created_at ?? '—')}</span>
        </span>
      </span>
      <span style="flex-shrink:0;">${badge(fix.status ?? '—', fixStatusClass(fix.status))}</span>
    </button>
  `;
}

function renderFixGroupSection(group, displayFixes, collapsed, animate) {
  const contentId = planningDomId('fixes-group', group.key);
  const meta =
    displayFixes.length === group.fixes.length
      ? t('{count} fix{suffix}', {
          count: group.fixes.length,
          suffix: group.fixes.length === 1 ? '' : 'es',
        })
      : t('{shown} / {total} fix{suffix}', {
          shown: displayFixes.length,
          total: group.fixes.length,
          suffix: group.fixes.length === 1 ? '' : 'es',
        });
  return `
    <div>
      ${groupHeaderButton(
        {
          eyebrow: group.isRepo ? t('Nivel repositorio') : 'Spec',
          title: group.title,
          subtitle: group.isRepo ? null : group.specId,
          meta,
          statusChip: specStatusChip(group.status),
        },
        contentId,
        `data-spec-group="${escapeHtml(group.key)}"`,
        collapsed,
      )}
      <div id="${contentId}" ${collapsed ? 'hidden' : ''} style="padding-left:12px; border-left:1px solid rgb(var(--rgb-zinc-800) / 0.6); margin-top:8px;">
        ${displayFixes.map((fix, idx) => renderFixCard(fix, idx, animate)).join('')}
      </div>
    </div>
  `;
}

function fixStatusClass(status) {
  if (status === 'validated') return 'status--implemented';
  if (status === 'absorbed') return 'status--skipped';
  return `status--${status ?? 'pending'}`;
}

function openFixDetailModal(fix, specTitle) {
  const path = stripSddPrefix(fix.fix_document ?? '');
  openAsyncModal({
    title: fix.title ?? fix.id,
    subtitle: fix.id,
    size: 'lg',
    load: async () => {
      const html = path ? await loadMarkdown(path).catch(() => null) : null;
      const markdownSection =
        html === null
          ? emptyState(t('No disponible'), path || t('sin fix_document'))
          : `<div class="markdown">${html}</div>`;
      return fixDetailBody(fix, specTitle, markdownSection);
    },
  });
}

function fixAffectedFilesSection(fix) {
  const files = fix.affected_files ?? [];
  if (files.length === 0) return '';
  const items = files
    .map((file) => `<li><code>${escapeHtml(file)}</code></li>`)
    .join('');
  return `<p class="card-hint">${escapeHtml(t('Archivos afectados ({count})', { count: files.length }))}</p><ul>${items}</ul>`;
}

function fixRelatedModulesSection(fix) {
  const modules = fix.related_modules ?? [];
  if (modules.length === 0) return '';
  return `<p class="card-hint">${escapeHtml(t('Módulos: {modules}', { modules: modules.join(' · ') }))}</p>`;
}

function fixDetailBody(fix, specTitle, markdownSection) {
  return `
    <p style="display:flex; gap:8px; flex-wrap:wrap; margin:0 0 12px;">${fixTypeBadge(fix.type)}${badge(fix.status ?? '—', fixStatusClass(fix.status))}${fix.severity ? badge(fix.severity) : ''}</p>
    <p class="card-hint">${escapeHtml(
      t('Creado: {created} · Resuelto: {resolved} · Validado: {validated}', {
        created: fix.created_at ?? '—',
        resolved: fix.resolved_at ?? '—',
        validated: fix.validated_at ?? '—',
      }),
    )}</p>
    ${fix.cycle ? `<p class="card-hint">${escapeHtml(t('Ciclo: {cycle}', { cycle: fix.cycle }))}</p>` : ''}
    ${specTitle ? `<p class="card-hint">${escapeHtml(t('Spec: {spec}', { spec: specTitle }))}</p>` : ''}
    <p class="card-hint">${escapeHtml(t('Estimación: {hours}', { hours: formatHours(fix.estimation_hours) }))}</p>
    ${fix.description ? `<p class="card-subtitle" style="margin-top:12px;">${escapeHtml(fix.description)}</p>` : ''}
    ${fix.justification && fix.justification !== fix.description ? `<p class="card-hint">${escapeHtml(fix.justification)}</p>` : ''}
    ${fixRelatedModulesSection(fix)}
    ${fixAffectedFilesSection(fix)}
    ${markdownSection}
  `;
}

const CONTEXT_DOC_LABELS = {
  'constitution.md': 'Constitution',
  'context_prompt.md': 'Context Prompt',
};

const CONTEXT_CATEGORY_LABELS = {
  global: 'Global',
  apps: 'Apps',
  libs: 'Libs',
  tools: 'Tools',
};

const CONTEXT_CATEGORY_ORDER = ['global', 'apps', 'libs', 'tools'];
const CONTEXT_DOCS = ['context_prompt.md', 'constitution.md'];
const MAX_CONTEXT_CANDIDATES = 40;

function contextDocPath(category, name, file) {
  const prefix =
    category === 'global' ? 'context' : `context/${category}/${name}`;
  return `${prefix}/${file}`;
}

function parseAppRef(ref) {
  if (typeof ref !== 'string') return null;
  const prefixed = /^(apps|libs|tools)\/([a-z][a-z0-9-]*)$/.exec(ref);
  if (prefixed) return { category: prefixed[1], name: prefixed[2] };
  if (/^[a-z][a-z0-9-]*$/.test(ref)) return { category: 'apps', name: ref };
  return null;
}

function deriveMonorepoAppRef(name, description) {
  const contextOverride =
    /sdd\/context\/(apps|libs|tools)\/([a-z][a-z0-9-]*)\//.exec(
      String(description ?? ''),
    );
  if (contextOverride)
    return { category: contextOverride[1], name: contextOverride[2] };
  return { category: 'apps', name };
}

function addContextCandidate(candidates, category, name) {
  if (!['apps', 'libs', 'tools'].includes(category)) return;
  if (!/^[a-z][a-z0-9-]*$/.test(String(name))) return;
  const key = `${category}/${name}`;
  if (candidates.has(key)) return;
  if (candidates.size >= MAX_CONTEXT_CANDIDATES) return;
  candidates.set(key, { category, name });
}

function addParsedContextCandidate(candidates, ref, knownAppNames) {
  const parsed = parseAppRef(ref);
  if (!parsed) return;
  if (
    parsed.category === 'apps' &&
    knownAppNames &&
    !knownAppNames.has(parsed.name)
  )
    return;
  addContextCandidate(candidates, parsed.category, parsed.name);
}

function collectContextCandidates({
  global,
  specsIndex,
  api,
  schema,
  components,
}) {
  const candidates = new Map();
  const knownAppNames = new Set();

  for (const [name, description] of Object.entries(
    global?.monorepo?.apps ?? {},
  )) {
    const ref = deriveMonorepoAppRef(name, description);
    addContextCandidate(candidates, ref.category, ref.name);
    if (ref.category === 'apps') knownAppNames.add(ref.name);
  }

  const monorepoLibs = global?.monorepo?.libs;
  if (monorepoLibs && typeof monorepoLibs === 'object') {
    for (const name of Object.keys(monorepoLibs))
      addContextCandidate(candidates, 'libs', name);
  }

  const monorepoTools = global?.monorepo?.tools;
  if (monorepoTools && typeof monorepoTools === 'object') {
    for (const name of Object.keys(monorepoTools))
      addContextCandidate(candidates, 'tools', name);
  }

  const modules = [
    ...(global?.completed_modules ?? []),
    ...(global?.in_progress_modules ?? []),
    ...(global?.pending_modules ?? []),
  ];
  for (const module of modules) {
    for (const ref of module?.apps ?? [])
      addParsedContextCandidate(candidates, ref, knownAppNames);
  }

  for (const spec of specsIndex?.specs ?? []) {
    for (const ref of [spec?.app, ...(spec?.apps ?? [])].filter(Boolean)) {
      addParsedContextCandidate(candidates, ref, knownAppNames);
    }
  }

  for (const registry of [api, schema, components]) {
    for (const key of Object.keys(registry ?? {})) {
      if (key.startsWith('$') || key.startsWith('_')) continue;
      addParsedContextCandidate(candidates, key, knownAppNames);
    }
  }

  for (const seed of CATALOG.contextSeeds)
    addContextCandidate(candidates, seed.category, seed.name);

  return [...candidates.values()];
}

function extractContextFreshness(text) {
  const match = /Última actualización:\s*([^|\n]+)/.exec(text);
  return match ? match[1].trim() : null;
}

async function probeContextEntry(category, name) {
  const docs = await Promise.all(
    CONTEXT_DOCS.map(async (file) => {
      const path = contextDocPath(category, name, file);
      const available = await resourceExists(path);
      return { file, path, key: `${category}:${name}:${file}`, available };
    }),
  );
  return { category, name, docs };
}

async function loadContextCatalog() {
  const settledValue = (result) =>
    result.status === 'fulfilled' ? result.value : null;
  const registryResults = await Promise.allSettled([
    loadGlobal(),
    loadSpecsIndex(),
    loadApiRegistry(),
    loadSchemaRegistry(),
    loadComponentsRegistry(),
  ]);
  if (registryResults.every((result) => result.status === 'rejected')) {
    throw registryResults[0].reason;
  }
  const [
    globalResult,
    specsIndexResult,
    apiResult,
    schemaResult,
    componentsResult,
  ] = registryResults;

  const candidates = collectContextCandidates({
    global: settledValue(globalResult),
    specsIndex: settledValue(specsIndexResult),
    api: settledValue(apiResult),
    schema: settledValue(schemaResult),
    components: settledValue(componentsResult),
  });

  const [globalEntry, ...probedEntries] = await Promise.all([
    probeContextEntry('global', 'global'),
    ...candidates.map((candidate) =>
      probeContextEntry(candidate.category, candidate.name),
    ),
  ]);

  const entries = [
    globalEntry,
    ...probedEntries.filter((entry) => entry.docs.some((doc) => doc.available)),
  ];

  const withFreshness = await Promise.all(
    entries.map(async (entry) => {
      const promptDoc = entry.docs.find(
        (doc) => doc.file === 'context_prompt.md' && doc.available,
      );
      if (!promptDoc) return { ...entry, freshness: null };
      const text = await fetchText(promptDoc.path).catch(() => null);
      return {
        ...entry,
        freshness: text ? extractContextFreshness(text) : null,
      };
    }),
  );

  return sortBy(
    withFreshness,
    (entry) =>
      `${CONTEXT_CATEGORY_ORDER.indexOf(entry.category)}:${entry.name}`,
  );
}

const contextCollapsedCategories = new Set();
const contextCollapsedEntries = new Set();

function contextChevron(open) {
  return `<svg viewBox="0 0 10 6" width="10" height="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex-shrink:0;transition:transform 0.2s;transform:rotate(${open ? 0 : -90}deg);color:var(--text-faint)"><path d="M1 1l4 4 4-4"></path></svg>`;
}

function contextEntryPath(entry) {
  return entry.category === 'global'
    ? 'sdd/context/'
    : `sdd/context/${entry.category}/${entry.name}/`;
}

function contextSearchBar() {
  return `
    <div style="position:relative; margin: 8px 0 20px">
      <span aria-hidden="true" style="position:absolute; left:12px; top:50%; transform:translateY(-50%); display:flex; color:var(--text-subtle); pointer-events:none">
        <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><circle cx="7" cy="7" r="5"></circle><line x1="11" y1="11" x2="14.5" y2="14.5"></line></svg>
      </span>
      <input type="text" data-context-search placeholder="${escapeHtml(t('Buscar por nombre, categoría o archivo…'))}" style="width:100%; box-sizing:border-box; background: rgb(var(--rgb-zinc-900) / 0.6); border:1px solid var(--border); border-radius: var(--radius-lg); padding: 8px 32px; font-size: var(--text-14); font-family: var(--font-mono); color: var(--text-bright)">
      <button type="button" data-context-clear hidden aria-label="${escapeHtml(t('Limpiar búsqueda'))}" style="position:absolute; right:10px; top:50%; transform:translateY(-50%); width:12px; height:12px; background:none; border:none; cursor:pointer; color:var(--text-subtle); padding:0"><span style="display:flex; align-items:center; justify-content:center; width:100%; height:100%">${icon('close')}</span></button>
    </div>
  `;
}

function contextMatchesQuery(entry, query) {
  if (!query) return true;
  const haystack = [
    entry.name,
    entry.category,
    ...entry.docs.map((doc) => doc.file),
  ]
    .join(' ')
    .toLowerCase();
  return haystack.includes(query);
}

function renderContextList(entries, query) {
  if (entries.length === 0) {
    return emptyState(
      t('Sin contexto registrado'),
      t('No se encontraron archivos en sdd/context/.'),
    );
  }
  const filtered = entries.filter((entry) => contextMatchesQuery(entry, query));
  if (filtered.length === 0) {
    return emptyState(
      t('Sin resultados'),
      t('No se encontraron entradas que coincidan con "{query}".', { query }),
    );
  }
  const groups = groupBy(filtered, (entry) => entry.category);
  return CONTEXT_CATEGORY_ORDER.filter((category) => groups.has(category))
    .map((category) =>
      renderContextCategorySection(category, groups.get(category), query),
    )
    .join('');
}

async function renderContext(container, params) {
  let entries;
  try {
    entries = await loadContextCatalog();
  } catch (error) {
    container.innerHTML = errorState(error);
    return;
  }
  const totalSubprojects = Math.max(entries.length - 1, 0);

  container.innerHTML = `
    ${pageHeader({
      title: t('Contexto SDD'),
      meta: t('{count} subproyectos', { count: totalSubprojects }),
      subtitle: t(
        'Constitution y context prompt de cada subproyecto del monorepo: la fuente de verdad de convenciones, stack y estado por app, lib y tool.',
      ),
    })}
    ${entries.length > 0 ? contextSearchBar() : ''}
    <div data-context-list-root>${renderContextList(entries, '')}</div>
  `;

  attachContextDocHandlers(container, entries);
}

function renderContextCategorySection(category, entries, query) {
  const collapsed = query === '' && contextCollapsedCategories.has(category);
  const contentId = `context-category-${category}`;
  return `
    <section style="margin-bottom:16px">
      <button type="button" data-context-toggle-category="${escapeHtml(category)}" aria-expanded="${!collapsed}" aria-controls="${contentId}" style="all:unset; box-sizing:border-box; cursor:pointer; display:flex; align-items:center; gap:10px; width:100%; padding:8px 4px; border-bottom:1px solid var(--border)">
        ${contextChevron(!collapsed)}
        <span style="font-family:var(--font-mono); font-size:var(--text-11); font-weight:var(--weight-semibold); text-transform:uppercase; letter-spacing:0.05em; color:var(--text-dim)">${escapeHtml(CONTEXT_CATEGORY_LABELS[category] ?? category)}</span>
        <span class="card-hint" style="margin-left:auto">${escapeHtml(t('{count} entrada{suffix}', { count: entries.length, suffix: entries.length === 1 ? '' : 's' }))}</span>
      </button>
      <div id="${contentId}" ${collapsed ? 'hidden' : ''} style="padding-left:12px; border-left:1px solid rgb(var(--rgb-zinc-800) / 0.6); margin-top:8px">
        <div style="display:flex; flex-direction:column; gap:4px">
          ${entries.map((entry) => renderContextEntrySection(entry, query)).join('')}
        </div>
      </div>
    </section>
  `;
}

function renderContextEntrySection(entry, query) {
  const key = `${entry.category}/${entry.name}`;
  const collapsed = query === '' && contextCollapsedEntries.has(key);
  const contentId = `context-entry-${key.replace(/[^a-zA-Z0-9]/g, '-')}`;
  return `
    <div>
      <button type="button" data-context-toggle-entry="${escapeHtml(key)}" aria-expanded="${!collapsed}" aria-controls="${contentId}" style="all:unset; box-sizing:border-box; cursor:pointer; display:flex; align-items:center; gap:10px; width:100%; padding:8px 4px">
        ${contextChevron(!collapsed)}
        <span class="card-title" style="margin:0; font-size:var(--text-12)">${escapeHtml(entry.name)}</span>
        ${entry.freshness ? `<span class="card-hint" style="margin:0">${escapeHtml(entry.freshness)}</span>` : ''}
        <span class="card-hint" style="margin-left:auto">${entry.docs.length} docs</span>
      </button>
      <div id="${contentId}" ${collapsed ? 'hidden' : ''} style="margin-left:24px">
        <div style="display:flex; flex-direction:column; gap:6px; padding:6px 0 4px">
          ${entry.docs.map((doc) => renderContextDocCard(entry, doc)).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderContextDocCard(entry, doc) {
  const label = CONTEXT_DOC_LABELS[doc.file] ?? doc.file;
  const attrs = doc.available
    ? ` tabindex="0" role="button" style="cursor:pointer; border-radius:var(--radius-lg); padding:10px 12px" data-context-key="${escapeHtml(doc.key)}" aria-label="${escapeHtml(t('Ver {label} de {name}', { label, name: entry.name }))}"`
    : ` style="border-radius:var(--radius-lg); padding:10px 12px; opacity:0.5"`;
  const trailing = doc.available
    ? `<span class="row-chevron">›</span>`
    : `<span class="empty-state-hint" style="margin:0">${t('No disponible')}</span>`;
  return `
    <div class="tile"${attrs}>
      <div style="display:flex; align-items:center; justify-content:space-between; gap:12px">
        <div style="display:flex; align-items:center; gap:10px; min-width:0">
          <span aria-hidden="true" style="color:var(--text-ghost); flex-shrink:0">${icon('file')}</span>
          <span class="card-title" style="margin:0; font-size:var(--text-12)">${escapeHtml(label)}</span>
          <span class="card-hint" style="margin:0">${escapeHtml(doc.file)}</span>
        </div>
        ${trailing}
      </div>
    </div>
  `;
}

function attachContextDocHandlers(container, entries) {
  const docsByKey = new Map();
  for (const entry of entries) {
    for (const doc of entry.docs) {
      if (!doc.available) continue;
      docsByKey.set(doc.key, { entry, doc });
    }
  }

  const listRoot = container.querySelector('[data-context-list-root]');
  const searchInput = container.querySelector('[data-context-search]');
  const clearButton = container.querySelector('[data-context-clear]');
  let query = '';

  const paint = () => {
    if (listRoot) listRoot.innerHTML = renderContextList(entries, query);
  };

  container.addEventListener('input', (event) => {
    if (!event.target.matches('[data-context-search]')) return;
    query = event.target.value.trim().toLowerCase();
    if (clearButton) clearButton.hidden = query === '';
    paint();
  });

  container.addEventListener('click', (event) => {
    const clearTarget = event.target.closest('[data-context-clear]');
    if (clearTarget) {
      query = '';
      if (searchInput) searchInput.value = '';
      clearTarget.hidden = true;
      paint();
      searchInput?.focus();
      return;
    }

    const categoryToggle = event.target.closest(
      '[data-context-toggle-category]',
    );
    if (categoryToggle) {
      const category = categoryToggle.dataset.contextToggleCategory;
      if (contextCollapsedCategories.has(category))
        contextCollapsedCategories.delete(category);
      else contextCollapsedCategories.add(category);
      paint();
      return;
    }

    const entryToggle = event.target.closest('[data-context-toggle-entry]');
    if (entryToggle) {
      const key = entryToggle.dataset.contextToggleEntry;
      if (contextCollapsedEntries.has(key)) contextCollapsedEntries.delete(key);
      else contextCollapsedEntries.add(key);
      paint();
      return;
    }

    const docCard = event.target.closest('[data-context-key]');
    if (docCard) {
      const found = docsByKey.get(docCard.dataset.contextKey);
      if (found) openContextDocModal(found.entry, found.doc);
    }
  });

  container.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    const docCard = event.target.closest('[data-context-key]');
    if (!docCard) return;
    event.preventDefault();
    const found = docsByKey.get(docCard.dataset.contextKey);
    if (found) openContextDocModal(found.entry, found.doc);
  });
}

function openContextDocModal(entry, doc) {
  const tabs = entry.docs.map((item) => ({
    id: item.file,
    label: CONTEXT_DOC_LABELS[item.file] ?? item.file,
    disabled: !item.available,
    load: () =>
      loadMarkdown(item.path).then(
        (html) => `<div class="markdown">${html}</div>`,
        () => emptyState(t('No disponible'), `sdd/${item.path}`),
      ),
  }));
  openModal({
    title: entry.name,
    subtitle: contextEntryPath(entry),
    size: 'lg',
    tabs,
    activeTabId: doc?.available ? doc.file : undefined,
  });
}

async function renderAgents(container, params) {
  let manifest = null;
  let manifestFailed = false;
  try {
    manifest = await loadManifest();
  } catch {
    manifestFailed = true;
  }
  const agentList = manifest
    ? enrichAgentManifest(manifest.agents)
    : CATALOG.agents;

  const results = await Promise.allSettled(
    agentList.map((agent) => fetchText(`agents/${agent.file}`)),
  );
  const agents = agentList.map((agent, index) =>
    buildAgentEntry(agent, results[index]),
  );

  container.innerHTML = `
    ${pageHeader({
      title: t('Agentes SDD'),
      meta: t('{count} agentes activos', { count: agents.length }),
      subtitle: t(
        'Pipeline de {count} agentes que coordina el ciclo SDD de principio a fin. Cada agente tiene un rol específico e invoca al siguiente.',
        { count: agents.length },
      ),
    })}
    ${manifestFailed ? manifestFallbackHint() : ''}
    <div style="display:flex; flex-direction:column; gap:12px; margin-bottom:16px">
      ${agents.map((agent, index) => renderAgentCard(agent, index)).join('')}
    </div>
    ${agentsInvokePanel()}
  `;

  attachAgentCardHandlers(container, agents);
}

function buildAgentEntry(agent, result) {
  if (result.status !== 'fulfilled')
    return { ...agent, available: false, description: '' };
  const { description } = parseAgentFrontmatter(result.value);
  return { ...agent, available: true, description };
}

// El frontmatter admite `description: texto` y block scalars de YAML
// (`description: >` / `|`, con o sin chomping). Sin plegar la continuación, la
// descripción quedaba en el literal `>` y la tarjeta salía vacía.
function parseFrontmatterDescription(block) {
  const lines = block.split('\n');
  const index = lines.findIndex((line) => /^description:/.test(line));
  if (index === -1) return '';

  // El block scalar se detecta primero: en la forma inline un lookahead negativo
  // retrocedería sobre los espacios y terminaría devolviendo el propio `>`.
  const marker = /^description:[ \t]*([>|][-+]?)[ \t]*$/.exec(lines[index]);
  if (marker) {
    const folded = [];
    for (const line of lines.slice(index + 1)) {
      if (line.trim() === '' || !/^\s/.test(line)) break;
      folded.push(line.trim());
    }
    return folded.join(' ').trim();
  }

  const inline = /^description:[ \t]*(.*)$/.exec(lines[index])?.[1] ?? '';
  return inline.trim().replace(/^["']|["']$/g, '');
}

function parseAgentFrontmatter(source) {
  const match = /^---\n([\s\S]*?)\n---/.exec(source);
  if (!match) return { description: '' };
  return { description: parseFrontmatterDescription(match[1]) };
}

const AGENT_ACCENT_TONE = {
  '01': 'emerald',
  '02': 'sky',
  '03': 'violet',
  '04': 'amber',
  '05': 'blue',
  '06': 'pink',
  '07': 'teal',
};

function agentAccentSquare(num) {
  const tone = AGENT_ACCENT_TONE[num] ?? 'emerald';
  return `<span aria-hidden="true" style="display:flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius: var(--radius-lg); flex-shrink:0; font-family: var(--font-mono); font-size: var(--text-12); font-weight: var(--weight-bold); color: rgb(var(--rgb-${tone}-400)); background: rgb(var(--rgb-${tone}-500) / 0.05); border: 1px solid rgb(var(--rgb-${tone}-500) / 0.2)">${escapeHtml(num)}</span>`;
}

function agentsInvokePanel() {
  return `
    <div style="border-radius: var(--radius-lg); border: 1px solid rgb(var(--rgb-zinc-800) / 0.6); background: rgb(var(--rgb-zinc-900) / 0.2); padding: 16px 20px">
      <p style="margin:0 0 8px; font-family: var(--font-mono); font-size: var(--text-10); text-transform:uppercase; letter-spacing:0.05em; color: var(--text-faint)">${t('Cómo invocar un agente')}</p>
      <p class="card-hint" style="margin:0">${t('Los agentes se invocan desde Claude Code usando el flag <code>--agent</code> o prefijando el mensaje con el rol del agente. El Orquestador es siempre el punto de entrada al ciclo SDD.')}</p>
    </div>
  `;
}

function renderAgentCard(agent, index) {
  const description = agent.available
    ? agent.description
      ? `<p class="card-hint">${escapeHtml(t(agent.description))}</p>`
      : ''
    : `<p class="empty-state-hint">${t('No disponible')}</p>`;
  const attrs = agent.available
    ? ` tabindex="0" role="button" style="cursor:pointer" data-agent-index="${index}" aria-label="${escapeHtml(t('Ver detalle de {label}', { label: agent.label }))}"`
    : '';
  const staggerClass = ` animate-fade-in-up stagger-${Math.min(index + 1, 8)}`;
  return `
    <div class="tile${staggerClass}"${attrs}>
      <div style="display:flex; align-items:flex-start; gap:12px">
        ${agentAccentSquare(agent.num)}
        <div style="flex:1; min-width:0">
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap">
            <span class="card-title" style="margin:0">${escapeHtml(t(agent.label))}</span>
            <span class="card-hint" style="margin:0">${escapeHtml(agent.file)}</span>
          </div>
          ${description}
        </div>
      </div>
    </div>
  `;
}

function attachAgentCardHandlers(container, agents) {
  for (const [index, agent] of agents.entries()) {
    if (!agent.available) continue;
    const trigger = container.querySelector(`[data-agent-index="${index}"]`);
    if (!trigger) continue;
    const open = () => openAgentModal(agent);
    trigger.addEventListener('click', open);
    trigger.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      open();
    });
  }
}

function openAgentModal(agent) {
  const path = `agents/${agent.file}`;
  openAsyncModal({
    title: t(agent.label),
    subtitle: `sdd/${path}`,
    size: 'xl',
    load: () =>
      loadMarkdown(path).then(
        (html) => `<div class="markdown">${html}</div>`,
        () => emptyState(t('No disponible'), `sdd/${path}`),
      ),
  });
}

async function renderSkills(container, params) {
  let manifest = null;
  let manifestFailed = false;
  try {
    manifest = await loadManifest();
  } catch {
    manifestFailed = true;
  }
  const skillList = manifest
    ? enrichSkillManifest(manifest.skills)
    : CATALOG.skills;

  const results = await Promise.allSettled(
    skillList.map((skill) => fetchText(`skills/${skill.dir}/${skill.file}`)),
  );
  const skills = skillList.map((skill, index) =>
    buildSkillEntry(skill, results[index]),
  );
  const groups = groupBy(skills, (skill) => skill.category);

  container.innerHTML = `
    ${pageHeader({
      title: 'Skills',
      meta: t('{count} skills activos', { count: skills.length }),
      subtitle: t(
        'Habilidades especializadas disponibles en el entorno Claude Code. Cada skill encapsula un conjunto de instrucciones y parámetros para tareas específicas.',
      ),
    })}
    ${manifestFailed ? manifestFallbackHint() : ''}
    ${[...groups.entries()].map(([category, items]) => renderSkillCategory(category, items)).join('')}
  `;

  attachSkillCardHandlers(container, skills);
}

function buildSkillEntry(skill, result) {
  if (result.status !== 'fulfilled')
    return { ...skill, available: false, description: '' };
  const { description } = parseSkillFrontmatter(result.value);
  return { ...skill, available: true, description };
}

function parseSkillFrontmatter(source) {
  const match = /^---\n([\s\S]*?)\n---/.exec(source);
  if (!match) return { description: '' };
  return { description: parseFrontmatterDescription(match[1]) };
}

function formatSkillLabel(dir) {
  return dir
    .replace(/^generate-/, 'gen: ')
    .replace(/^sdd-/, 'sdd: ')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

const SKILL_CATEGORY_TONE = {
  'SDD Agent': 'emerald',
  'SDD Utility': 'sky',
  Generator: 'violet',
};

function skillCategoryChip(category) {
  const tone = SKILL_CATEGORY_TONE[category];
  if (!tone)
    return `<span class="chip chip--sm" style="flex-shrink:0">${escapeHtml(category)}</span>`;
  return `<span style="display:inline-flex; align-items:center; flex-shrink:0; padding: 2px 8px; border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: var(--text-10); color: rgb(var(--rgb-${tone}-400)); background: rgb(var(--rgb-${tone}-500) / 0.05); border: 1px solid rgb(var(--rgb-${tone}-500) / 0.2)">${escapeHtml(category)}</span>`;
}

function renderSkillCategory(category, items) {
  return `
    <section style="margin-bottom:24px">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px">
        <p style="margin:0; font-family: var(--font-mono); font-size: var(--text-10); text-transform:uppercase; letter-spacing:0.05em; color: var(--text-dim)">${escapeHtml(category)}</p>
        <span class="card-hint" style="margin:0">${items.length}</span>
      </div>
      <div style="display:flex; flex-direction:column; gap:8px">${items.map((skill) => renderSkillCard(skill, category)).join('')}</div>
    </section>
  `;
}

function renderSkillCard(skill, category) {
  const title = formatSkillLabel(skill.dir);
  const hint = skill.available
    ? skill.description
      ? `<p class="card-hint" style="margin:2px 0 0">${escapeHtml(t(skill.description))}</p>`
      : ''
    : `<p class="empty-state-hint" style="margin:2px 0 0">${t('No disponible')}</p>`;
  const attrs = skill.available
    ? ` tabindex="0" role="button" style="cursor:pointer" data-skill-dir="${escapeHtml(skill.dir)}" aria-label="${escapeHtml(t('Ver detalle de {label}', { label: title }))}"`
    : '';
  return `
    <div class="tile" style="padding:14px 16px"${attrs}>
      <div style="display:flex; align-items:flex-start; gap:12px">
        ${skillCategoryChip(category)}
        <div style="flex:1; min-width:0">
          <p class="card-title" style="margin:0; font-family: var(--font-mono); font-size: var(--text-14)">${escapeHtml(title)}</p>
          ${hint}
          <p class="card-hint" style="margin:4px 0 0; color: var(--text-ghost)">/${escapeHtml(skill.dir)}</p>
        </div>
      </div>
    </div>
  `;
}

function attachSkillCardHandlers(container, skills) {
  for (const skill of skills) {
    if (!skill.available) continue;
    const trigger = container.querySelector(`[data-skill-dir="${skill.dir}"]`);
    if (!trigger) continue;
    const open = () => openSkillModal(skill);
    trigger.addEventListener('click', open);
    trigger.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      open();
    });
  }
}

function openSkillModal(skill) {
  const path = `skills/${skill.dir}/${skill.file}`;
  openAsyncModal({
    title: formatSkillLabel(skill.dir),
    subtitle: `sdd/${path}`,
    size: 'xl',
    load: () =>
      loadMarkdown(path).then(
        (html) => `<div class="markdown">${html}</div>`,
        () => emptyState(t('No disponible'), `sdd/${path}`),
      ),
  });
}

const PROMPT_FLOW = [
  'start-sdd-cycle',
  'check-spec-before-implement',
  'hotfix-bypass-gate',
  'review-cycle',
];

function promptsFlowPanel() {
  const chain = PROMPT_FLOW.map((step, index) => {
    const arrow =
      index < PROMPT_FLOW.length - 1
        ? `<span style="color: var(--text-ghost); font-size: var(--text-12)">›</span>`
        : '';
    return `<span style="font-family: var(--font-mono); font-size: var(--text-10); color: var(--text-dim)">${escapeHtml(step)}</span>${arrow}`;
  }).join('');
  return `
    <div style="border-radius: var(--radius-lg); border: 1px solid rgb(var(--rgb-zinc-800) / 0.6); background: rgb(var(--rgb-zinc-900) / 0.2); padding: 16px 20px">
      <p style="margin:0 0 8px; font-family: var(--font-mono); font-size: var(--text-10); text-transform:uppercase; letter-spacing:0.05em; color: var(--text-faint)">${t('Flujo de prompts')}</p>
      <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap">${chain}</div>
    </div>
  `;
}

async function renderPrompts(container, params) {
  let manifest = null;
  let manifestFailed = false;
  try {
    manifest = await loadManifest();
  } catch {
    manifestFailed = true;
  }
  const promptList = manifest
    ? enrichPromptManifest(manifest.prompts)
    : CATALOG.prompts;

  const results = await Promise.allSettled(
    promptList.map((entry) => loadMarkdown(`prompts/${entry.file}`)),
  );

  const prompts = promptList.map((entry, index) => {
    const result = results[index];
    return result.status === 'fulfilled'
      ? { ...entry, html: result.value, error: null }
      : { ...entry, html: null, error: result.reason };
  });

  const body = prompts.every((prompt) => prompt.error)
    ? errorState(prompts[0].error)
    : `<div style="display:flex; flex-direction:column; gap:12px; margin-bottom:16px">${prompts.map((prompt, index) => promptCardMarkup(prompt, index)).join('')}</div>`;

  container.innerHTML = `
    ${pageHeader({
      title: 'Prompts',
      meta: t('{count} prompts activos', { count: prompts.length }),
      subtitle: t(
        'Prompts estructurados que guían los momentos críticos del flujo SDD: apertura, verificación, bypass y cierre de ciclos.',
      ),
    })}
    ${manifestFailed ? manifestFallbackHint() : ''}
    ${body}
    ${promptsFlowPanel()}
  `;

  attachPromptCardListeners(container, prompts);
}

function promptCardMarkup(prompt, index) {
  const labelChip = prompt.error
    ? ''
    : `<span style="display:inline-flex; padding:2px 8px; border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: var(--text-10); color: rgb(var(--rgb-emerald-400)); background: rgb(var(--rgb-emerald-500) / 0.05); border: 1px solid rgb(var(--rgb-emerald-500) / 0.2)">${escapeHtml(t(prompt.label))}</span>`;
  const body = prompt.error
    ? `<p class="empty-state-hint" style="margin:6px 0 0">${t('No disponible')}</p>`
    : `
      <p class="card-subtitle" style="margin-top:6px">${escapeHtml(t(prompt.description))}</p>
      <p class="card-hint">${escapeHtml(t('Trigger: {trigger}', { trigger: t(prompt.trigger) }))}</p>
    `;
  const staggerClass = ` animate-fade-in-up stagger-${Math.min(index + 1, 8)}`;
  return `
    <div class="tile${staggerClass}" role="button" tabindex="0" data-prompt-index="${index}" style="cursor:pointer">
      <div style="display:flex; align-items:flex-start; gap:12px">
        <div style="flex:1; min-width:0">
          <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap">
            ${labelChip}
            <span class="card-hint" style="margin:0; font-family: var(--font-mono)">${escapeHtml(prompt.file)}</span>
          </div>
          ${body}
        </div>
        <span class="row-chevron">›</span>
      </div>
    </div>
  `;
}

function promptDetailBody(prompt) {
  if (prompt.error) return errorState(prompt.error);
  return `<div class="markdown">${prompt.html}</div>`;
}

function openPromptDetail(prompt) {
  openModal(t(prompt.label), promptDetailBody(prompt), { size: 'xl' });
}

function attachPromptCardListeners(container, prompts) {
  for (const cardEl of container.querySelectorAll('[data-prompt-index]')) {
    const prompt = prompts[Number(cardEl.dataset.promptIndex)];
    cardEl.addEventListener('click', () => openPromptDetail(prompt));
    cardEl.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openPromptDetail(prompt);
    });
  }
}

function isRegistryAppEntry(key, value) {
  if (key.startsWith('_') || key.startsWith('$')) return false;
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function statusTag(status) {
  const meta =
    STATUS_META[String(status ?? '').toLowerCase()] ?? STATUS_META.defined;
  const toneColor = {
    emerald: 'rgb(var(--rgb-emerald-400))',
    teal: 'rgb(var(--rgb-teal-400))',
    amber: 'rgb(var(--rgb-amber-400))',
    zinc: 'var(--text-dim)',
    'zinc-mute': 'var(--text-faint)',
    rose: 'rgb(var(--rgb-rose-400))',
    sky: 'rgb(var(--rgb-sky-400))',
  };
  const color = toneColor[meta.tone] ?? 'var(--text-dim)';
  return `<span class="status-tag" style="color:${color}">${escapeHtml(t(meta.label))}</span>`;
}

function methodBadge(method) {
  const value = (method ?? 'GET').toUpperCase();
  return `<span class="method--${value.toLowerCase()}" style="display:inline-flex;align-items:center;justify-content:center;font-family:var(--font-mono);font-size:var(--text-10);font-weight:var(--weight-medium);padding:2px 6px;border-style:solid;border-width:1px;border-radius:var(--radius-sm);">${escapeHtml(value)}</span>`;
}

function inlineExpandToggle({ open }) {
  return `<span class="inline-toggle" style="color:var(--text-subtle);font-size:var(--text-12);line-height:1;">${open ? '▲' : '▼'}</span>`;
}

function inlineRowOpenAttrs(label) {
  return `role="button" tabindex="0" aria-expanded="false" aria-label="${escapeHtml(label)}" style="cursor:pointer"`;
}

function attachInlineExpandHandlers(container, rowSelector) {
  const rows = Array.from(container.querySelectorAll(rowSelector)).filter(
    (el) => el.getAttribute('role') === 'button',
  );
  const setOpen = (rowEl, open) => {
    const detailEl = rowEl.nextElementSibling;
    if (!detailEl) return;
    detailEl.hidden = !open;
    rowEl.setAttribute('aria-expanded', String(open));
    const toggleEl = rowEl.querySelector('.inline-toggle');
    if (toggleEl) toggleEl.textContent = open ? '▲' : '▼';
  };
  const activate = (rowEl) => {
    const wasOpen = rowEl.getAttribute('aria-expanded') === 'true';
    for (const other of rows) {
      if (other !== rowEl) setOpen(other, false);
    }
    setOpen(rowEl, !wasOpen);
  };
  for (const rowEl of rows) {
    rowEl.addEventListener('click', () => activate(rowEl));
    rowEl.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      activate(rowEl);
    });
  }
}

async function renderSchema(container, params) {
  let registry;
  try {
    registry = await loadSchemaRegistry();
  } catch (error) {
    container.innerHTML = errorState(error);
    return;
  }
  const tables = collectSchemaTables(registry);
  const header = pageHeader({
    title: 'Schema',
    meta: t('{count} tabla{suffix}', {
      count: tables.length,
      suffix: tables.length === 1 ? '' : 's',
    }),
    subtitle: t('Tablas y entidades de base de datos definidas en el proyecto.'),
  });
  if (tables.length === 0) {
    container.innerHTML = `
      ${header}
      ${emptyState(
        t('Schema vacío'),
        t(
          'Las tablas de base de datos serán definidas por el agente Arquitecto y aparecerán aquí una vez que el primer ciclo SDD lo defina.',
        ),
      )}
    `;
    return;
  }
  container.innerHTML = `
    ${header}
    <div class="row-list">${tables.map((table) => renderSchemaTableRow(table)).join('')}</div>
  `;
  attachInlineExpandHandlers(container, '[data-schema-row]');
}

function collectSchemaTables(registry) {
  return Object.entries(registry ?? {})
    .filter(([key, value]) => isRegistryAppEntry(key, value))
    .flatMap(([appKey, value]) =>
      Object.entries(value?.tables ?? {}).map(([name, table]) => ({
        ...table,
        name,
        _app: appKey,
      })),
    );
}

function hasSchemaDetail(table) {
  return (
    Object.keys(table.columns ?? {}).length > 0 ||
    (table.indexes ?? []).length > 0
  );
}

function renderSchemaTableRow(table) {
  const key = `${table._app}::${table.name}`;
  const columnCount = Object.keys(table.columns ?? {}).length;
  const detail = hasSchemaDetail(table);
  return `
    <div class="row-item">
      <div class="row" data-schema-row="${escapeHtml(key)}" ${detail ? inlineRowOpenAttrs(t('Ver detalle de {label}', { label: table.name })) : ''}>
        <div class="row-main">
          <span style="font-family:var(--font-mono);font-size:var(--text-14);color:var(--text-bright)">${escapeHtml(table.name)}</span>
          <span class="card-hint">${escapeHtml(table.module ?? '—')}</span>
        </div>
        <div class="row-trail">
          ${statusTag(table.status ?? 'defined')}
          <span class="card-hint" style="font-family:var(--font-mono)">${escapeHtml(t('{count} col{suffix}', { count: columnCount, suffix: columnCount === 1 ? '' : 's' }))}</span>
          ${table.migration_file ? `<span class="card-hint" style="font-family:var(--font-mono)">${escapeHtml(table.migration_file)}</span>` : ''}
          ${detail ? inlineExpandToggle({ open: false }) : ''}
        </div>
      </div>
      ${detail ? `<div class="row-detail" hidden style="background:rgb(var(--rgb-zinc-900) / 0.2);">${schemaTableDetailBody(table)}</div>` : ''}
    </div>
  `;
}

function schemaTableDetailBody(table) {
  const columns = Object.entries(table.columns ?? {}).map(([name, col]) => ({
    name,
    ...col,
  }));
  const columnsSection = columns.length
    ? dataTable(
        [
          {
            label: 'Columna',
            render: (row) => `<code>${escapeHtml(row.name)}</code>`,
          },
          { label: 'Tipo', render: (row) => escapeHtml(row.type ?? '—') },
          {
            label: 'Constraints',
            render: (row) =>
              escapeHtml((row.constraints ?? []).join(' · ') || '—'),
          },
          { label: 'Notas', render: (row) => escapeHtml(row.notes ?? '') },
        ],
        columns,
      )
    : emptyState(t('Sin columnas definidas'));
  const indexes = table.indexes ?? [];
  const indexesSection = indexes.length
    ? dataTable(
        [
          { label: 'Nombre', render: (row) => escapeHtml(row.name ?? '—') },
          { label: 'Tipo', render: (row) => escapeHtml(row.type ?? '—') },
          {
            label: 'Columnas',
            render: (row) => escapeHtml((row.columns ?? []).join(', ')),
          },
        ],
        indexes,
      )
    : '';
  const changelog = table.changelog ?? [];
  const changelogSection = changelog.length
    ? `<p class="card-hint">${t('Historial')}</p><ul>${changelog
        .map(
          (entry) =>
            `<li>${escapeHtml(
              t('ciclo {cycle} · {date} — {change}', {
                cycle: entry.cycle ?? '—',
                date: entry.date ?? '—',
                change: entry.change ?? '',
              }),
            )}</li>`,
        )
        .join('')}</ul>`
    : '';
  return `
    <div style="padding:var(--space-4) 4px;display:flex;flex-direction:column;gap:var(--space-3);">
      ${table.spec ? `<p class="card-hint">${escapeHtml(stripSddPrefix(table.spec))}</p>` : ''}
      ${columnsSection}
      ${indexesSection}
      ${changelogSection}
      <p class="card-hint" style="color:var(--text-ghost)">${escapeHtml(
        t('ciclo {created}{updatedSuffix} · {app}', {
          created: String(table.created_in_cycle ?? '—'),
          updatedSuffix: table.updated_in_cycle
            ? ` → ${String(table.updated_in_cycle)}`
            : '',
          app: table._app,
        }),
      )}</p>
    </div>
  `;
}

async function renderApi(container, params) {
  let registry;
  try {
    registry = await loadApiRegistry();
  } catch (error) {
    container.innerHTML = errorState(error);
    return;
  }
  const endpoints = collectApiEndpoints(registry);
  const header = pageHeader({
    title: 'API',
    meta: t('{count} endpoint{suffix}', {
      count: endpoints.length,
      suffix: endpoints.length === 1 ? '' : 's',
    }),
    subtitle: t('Endpoints definidos en el contrato del sistema.'),
  });
  if (endpoints.length === 0) {
    container.innerHTML = `
      ${header}
      ${emptyState(
        t('Sin endpoints registrados'),
        t(
          'Los endpoints del API serán definidos por el agente Arquitecto en sdd/api.json a medida que avanzan los ciclos SDD.',
        ),
      )}
    `;
    return;
  }
  container.innerHTML = `
    ${header}
    <div class="row-list">${endpoints.map((endpoint) => renderApiEndpointRow(endpoint)).join('')}</div>
  `;
  attachInlineExpandHandlers(container, '[data-api-row]');
}

function collectApiEndpoints(registry) {
  return Object.entries(registry ?? {})
    .filter(([key, value]) => isRegistryAppEntry(key, value))
    .flatMap(([appKey, value]) =>
      (value?.endpoints ?? []).map((endpoint, index) => ({
        ...endpoint,
        _app: appKey,
        _key: `${appKey}::${index}`,
      })),
    );
}

function hasApiDetail(endpoint) {
  return Boolean(
    endpoint.description ||
    (endpoint.path_params ?? []).length ||
    (endpoint.required_headers ?? []).length ||
    Object.keys(endpoint.responses ?? {}).length ||
    Object.keys(endpoint.request_body ?? {}).length ||
    (endpoint.changelog ?? []).length,
  );
}

function renderApiEndpointRow(endpoint) {
  const detail = hasApiDetail(endpoint);
  return `
    <div class="row-item">
      <div class="row" data-api-row="${escapeHtml(endpoint._key)}" ${detail ? inlineRowOpenAttrs(t('Ver detalle de {label}', { label: endpoint.path ?? '' })) : ''}>
        <span class="row-lead">${methodBadge(endpoint.method)}</span>
        <div class="row-main row-main--inline">
          <span class="api-path">${escapeHtml(endpoint.path ?? '')}</span>
          ${endpoint.module ? `<span class="api-module">${escapeHtml(endpoint.module)}</span>` : ''}
        </div>
        <div class="row-trail">
          ${statusTag(endpoint.status ?? 'defined')}
          ${detail ? inlineExpandToggle({ open: false }) : ''}
        </div>
      </div>
      ${detail ? `<div class="row-detail" hidden style="background:rgb(var(--rgb-zinc-900) / 0.2);">${apiEndpointDetailBody(endpoint)}</div>` : ''}
    </div>
  `;
}

function apiEndpointDetailBody(endpoint) {
  const pathParams = endpoint.path_params ?? [];
  const headers = endpoint.required_headers ?? [];
  const responses = Object.entries(endpoint.responses ?? {});
  const changelog = endpoint.changelog ?? [];
  const requestBodyKeys = Object.keys(endpoint.request_body ?? {});
  const responsesSection = responses.length
    ? dataTable(
        [
          { label: 'Código', render: (row) => escapeHtml(row.code) },
          {
            label: 'Descripción',
            render: (row) => escapeHtml(row.description),
          },
        ],
        responses.map(([code, description]) => ({
          code,
          description:
            typeof description === 'string'
              ? description
              : JSON.stringify(description),
        })),
      )
    : '';
  const changelogSection = changelog.length
    ? `<p class="card-hint">${t('Historial')}</p><ul>${changelog
        .map(
          (entry) =>
            `<li>${escapeHtml(
              t('ciclo {cycle} · {date} — {change}', {
                cycle: entry.cycle ?? '—',
                date: entry.date ?? '—',
                change: entry.change ?? '',
              }),
            )}</li>`,
        )
        .join('')}</ul>`
    : '';
  return `
    <div style="padding:var(--space-4) 4px;display:flex;flex-direction:column;gap:var(--space-3);">
      ${endpoint.description ? `<p class="card-subtitle">${escapeHtml(endpoint.description)}</p>` : ''}
      ${pathParams.length ? `<p class="card-hint">${escapeHtml(t('Path params:'))} ${pathParams.map((param) => `<code>${escapeHtml(param)}</code>`).join(' ')}</p>` : ''}
      ${headers.length ? `<p class="card-hint">${escapeHtml(t('Headers requeridos:'))} ${headers.map((header) => `<code>${escapeHtml(header)}</code>`).join(' ')}</p>` : ''}
      ${requestBodyKeys.length ? `<p class="card-hint">${t('Request body')}</p><pre><code>${escapeHtml(JSON.stringify(endpoint.request_body, null, 2))}</code></pre>` : ''}
      ${responsesSection ? `<p class="card-hint">${t('Responses')}</p>${responsesSection}` : ''}
      ${changelogSection}
      <p class="card-hint" style="color:var(--text-ghost)">${escapeHtml(
        t('ciclo {cycle} · {app}', {
          cycle: String(endpoint.created_in_cycle ?? '—'),
          app: endpoint._app,
        }),
      )}</p>
    </div>
  `;
}

async function renderComponents(container, params) {
  let registry;
  try {
    registry = await loadComponentsRegistry();
  } catch (error) {
    container.innerHTML = errorState(error);
    return;
  }
  const components = collectComponentEntries(registry);
  const header = componentsHeader(components.length);

  if (components.length === 0) {
    container.innerHTML = `
      ${header}
      ${emptyState(
        t('Sin componentes registrados'),
        t(
          'Los componentes React son registrados en sdd/components.json por el agente sdd-implementor-front al finalizar cada implementación frontend.',
        ),
      )}
    `;
    return;
  }

  container.innerHTML = `
    ${header}
    <div class="row-list">${components.map((component) => renderComponentRow(component)).join('')}</div>
  `;
  attachInlineExpandHandlers(container, '[data-component-row]');
}

function collectComponentEntries(registry) {
  return Object.entries(registry ?? {})
    .filter(([key, value]) => isRegistryAppEntry(key, value))
    .flatMap(([appKey, value]) =>
      (value?.components ?? []).map((component) => ({
        ...component,
        _app: appKey,
      })),
    );
}

function componentsHeader(total) {
  return pageHeader({
    title: t('Componentes'),
    meta: t('{count} registrado{suffix}', {
      count: total,
      suffix: total === 1 ? '' : 's',
    }),
    subtitle: t(
      'Registro de componentes React del monorepo. Actualizado por el Implementador Frontend al finalizar cada implementación.',
    ),
  });
}

function componentStatusBadge(status) {
  return badge(status ?? '—', status ? `status--${status}` : undefined);
}

function formatComponentConsumes(consumes) {
  if (!Array.isArray(consumes) || consumes.length === 0) return '—';
  return escapeHtml(consumes.join(', '));
}

function formatComponentCycle(component) {
  const created = component.created_in_cycle;
  const updated = component.updated_in_cycle;
  if (created === null || created === undefined) return '—';
  return escapeHtml(updated ? `${created} → ${updated}` : String(created));
}

function hasComponentDetail(component) {
  return Boolean(
    component.description ||
    component.module ||
    component.spec ||
    (component.consumes ?? []).length ||
    (component.changelog ?? []).length,
  );
}

function renderComponentRow(component) {
  const key = `${component._app}::${component.id ?? component.name ?? ''}`;
  const detail = hasComponentDetail(component);
  return `
    <div class="row-item">
      <div class="row" data-component-row="${escapeHtml(key)}" ${detail ? inlineRowOpenAttrs(t('Ver detalle de {label}', { label: component.name ?? component.id ?? '' })) : ''}>
        <div class="row-main">
          <span style="font-family:var(--font-mono);font-size:var(--text-14);color:var(--text-bright)">${escapeHtml(component.name ?? '—')}</span>
          <span class="card-hint">${escapeHtml(component.path ?? '—')}</span>
        </div>
        <div class="row-trail">
          ${badge(component.type ?? '—')}
          ${componentStatusBadge(component.status)}
          <span class="card-hint" style="font-family:var(--font-mono)">${escapeHtml(formatComponentCycle(component))}</span>
          ${detail ? inlineExpandToggle({ open: false }) : ''}
        </div>
      </div>
      ${detail ? `<div class="row-detail" hidden style="background:rgb(var(--rgb-zinc-900) / 0.2);">${componentDetailBody(component)}</div>` : ''}
    </div>
  `;
}

function componentDetailBody(component) {
  const changelog = component.changelog ?? [];
  const changelogSection = changelog.length
    ? `<p class="card-hint">${t('Historial')}</p><ul>${changelog
        .map(
          (entry) =>
            `<li>${escapeHtml(
              t('ciclo {cycle} · {date} — {change}', {
                cycle: entry.cycle ?? '—',
                date: entry.date ?? '—',
                change: entry.change ?? '',
              }),
            )}</li>`,
        )
        .join('')}</ul>`
    : '';
  return `
    <div style="padding:var(--space-4) 4px;display:flex;flex-direction:column;gap:var(--space-3);">
      ${component.description ? `<p class="card-subtitle">${escapeHtml(component.description)}</p>` : ''}
      <p class="card-hint">${escapeHtml(
        t('ID: {id} · Módulo: {module} · Spec: {spec}', {
          id: component.id ?? '—',
          module: component.module ?? '—',
          spec: stripSddPrefix(component.spec ?? '—'),
        }),
      )}</p>
      <p class="card-hint">${escapeHtml(t('Consume:'))} ${formatComponentConsumes(component.consumes)}</p>
      ${changelogSection}
      <p class="card-hint" style="color:var(--text-ghost)">${escapeHtml(component._app)}</p>
    </div>
  `;
}

function schemaRefName(ref) {
  if (typeof ref !== 'string') return '—';
  const segments = ref.split('/');
  return segments[segments.length - 1] || ref;
}

function schemaTypeLabel(prop) {
  if (!prop || typeof prop !== 'object') return '—';
  if (prop.$ref) return schemaRefName(prop.$ref);
  if (prop.enum) return 'enum';
  if (Array.isArray(prop.oneOf))
    return prop.oneOf.map(schemaTypeLabel).join(' | ');
  if (prop.type === 'array')
    return prop.items ? `${schemaTypeLabel(prop.items)}[]` : 'array';
  if (prop.type === 'object') {
    if (prop.patternProperties) {
      const firstValue = Object.values(prop.patternProperties)[0];
      return firstValue ? `map<${schemaTypeLabel(firstValue)}>` : 'map';
    }
    return 'object';
  }
  if (Array.isArray(prop.type)) return prop.type.join(' | ');
  return prop.type ?? '—';
}

function schemaFieldEnumValues(prop) {
  if (Array.isArray(prop.enum)) return prop.enum;
  if (Array.isArray(prop.oneOf))
    return prop.oneOf.flatMap((option) => option.enum ?? []);
  return [];
}

function schemaFieldPattern(prop) {
  if (prop.pattern) return prop.pattern;
  const withPattern = Array.isArray(prop.oneOf)
    ? prop.oneOf.find((option) => option.pattern)
    : undefined;
  return withPattern ? withPattern.pattern : null;
}

function schemaFieldDetailHtml(prop) {
  const parts = [];
  if (prop.description)
    parts.push(
      `<span class="fieldtable-description">${escapeHtml(prop.description)}</span>`,
    );
  const enumValues = schemaFieldEnumValues(prop);
  if (enumValues.length) {
    parts.push(
      `<span class="fieldtable-enum">${escapeHtml(enumValues.join(' · '))}</span>`,
    );
  }
  const pattern = schemaFieldPattern(prop);
  if (pattern)
    parts.push(
      `<span class="fieldtable-pattern">${escapeHtml(`pattern: ${pattern}`)}</span>`,
    );
  return parts.length ? parts.join('<br>') : '—';
}

function schemaFieldRows(entity) {
  const properties = entity.properties ?? {};
  const required = new Set(entity.required ?? []);
  return Object.entries(properties).map(([field, prop]) => ({
    field,
    prop,
    isRequired: required.has(field),
  }));
}

function fieldTableRowHtml({ field, prop, isRequired }) {
  const requiredMark = isRequired
    ? `<span class="fieldtable-required">*</span>`
    : '';
  return `
    <tr class="fieldtable-row">
      <td class="fieldtable-field" title="${escapeHtml(field)}">${escapeHtml(field)}${requiredMark}</td>
      <td class="fieldtable-type">${escapeHtml(schemaTypeLabel(prop))}</td>
      <td class="fieldtable-detail" style="white-space:normal">${schemaFieldDetailHtml(prop)}</td>
    </tr>
  `;
}

function fieldTable({ title, entity }) {
  const rows = schemaFieldRows(entity);
  const strictBadge =
    entity.additionalProperties === false
      ? badge('additionalProperties: false', 'badge--strict')
      : '';
  const body = rows.length
    ? rows.map(fieldTableRowHtml).join('')
    : `<tr><td class="fieldtable-detail" colspan="3">${escapeHtml(t('Sin propiedades'))}</td></tr>`;
  return `
    <div class="fieldtable-block">
      <div class="fieldtable-title-row">
        <span class="card-title">${escapeHtml(title)}</span>
        ${strictBadge}
      </div>
      <div class="table-wrapper">
        <table class="data-table fieldtable">
          <thead>
            <tr class="fieldtable-head">
              <th>${t('Campo')}</th>
              <th>${t('Tipo')}</th>
              <th>${t('Detalle')}</th>
            </tr>
          </thead>
          <tbody>${body}</tbody>
        </table>
      </div>
    </div>
  `;
}

function schemaDefinitionTables(schema) {
  const definitions = schema.definitions ?? {};
  return Object.entries(definitions)
    .map(([name, definition]) =>
      fieldTable({ title: name, entity: definition }),
    )
    .join('');
}

function schemaModalChips(entry) {
  return `
    <div class="chip-row">
      ${badge(t('Valida: {target}', { target: entry.target }), 'badge--target')}
      ${badge(t('Escriben: {writers}', { writers: entry.writers }), 'badge--writers')}
    </div>
  `;
}

function schemaModalFooter(entry) {
  return `<p class="card-hint">${escapeHtml(
    t('* = campo requerido · "$schema" en {target} · pnpm sdd:validate lo exige en verde', {
      target: entry.target,
    }),
  )}</p>`;
}

async function renderSchemas(container, params) {
  let manifest = null;
  let manifestFailed = false;
  try {
    manifest = await loadManifest();
  } catch {
    manifestFailed = true;
  }
  const schemaList = manifest
    ? enrichSchemaManifest(manifest.schemas)
    : CATALOG.schemas;

  const results = await Promise.allSettled(
    schemaList.map((entry) => fetchJson(`schemas/${entry.file}`)),
  );
  const schemas = schemaList.map((entry, index) =>
    buildSchemaEntry(entry, results[index]),
  );
  const available = schemas.filter((entry) => entry.available).length;

  container.innerHTML = `
    ${pageHeader({
      title: 'Schemas JSON',
      meta: t('{available} de {total} disponibles', {
        available,
        total: schemas.length,
      }),
      subtitle: t(
        'Tipado estricto de los registros SDD. Cada *.json de sdd/ declara su $schema y valida contra estos archivos.',
      ),
    })}
    ${manifestFailed ? manifestFallbackHint() : ''}
    <div class="card-grid">${schemas.map((entry) => renderSchemaCard(entry)).join('')}</div>
    <div class="card">
      <p class="card-title">Source of truth</p>
      <p class="card-subtitle">sdd/schemas/</p>
      <p class="card-hint">${t('Si la documentación en prosa y el schema difieren, gana el schema. <code>pnpm sdd:validate</code> lo exige en verde (local, Reviewer y CI).')}</p>
    </div>
  `;

  attachSchemaCardHandlers(container, schemas);
}

function buildSchemaEntry(entry, result) {
  if (result.status !== 'fulfilled')
    return { ...entry, available: false, schema: null, stats: null };
  return {
    ...entry,
    available: true,
    schema: result.value,
    stats: computeSchemaStats(result.value),
  };
}

function sumSchemaFieldStats(schema) {
  let propertyCount = Object.keys(schema.properties ?? {}).length;
  let requiredCount = (schema.required ?? []).length;
  for (const def of Object.values(schema.definitions ?? {})) {
    propertyCount += Object.keys(def.properties ?? {}).length;
    requiredCount += (def.required ?? []).length;
  }
  return { propertyCount, requiredCount };
}

function computeSchemaStats(schema) {
  const { propertyCount, requiredCount } = sumSchemaFieldStats(schema);
  return {
    title: schema.title ?? null,
    propertyCount,
    requiredCount,
    strict: schema.additionalProperties === false,
  };
}

function renderSchemaCard(entry) {
  const statusBadge = entry.available
    ? badge('Disponible', 'status--implemented')
    : badge('No disponible', 'status--pending');
  if (!entry.available) {
    return `
      <div class="card">
        <div class="card-header">
          <span class="card-title">${escapeHtml(entry.name)}</span>
          ${statusBadge}
        </div>
        <p class="card-subtitle">sdd/schemas/${escapeHtml(entry.file)}</p>
        <p class="empty-state-hint">${t('No disponible')}</p>
      </div>
    `;
  }
  const { title, propertyCount, requiredCount, strict } = entry.stats;
  const strictSuffix = strict ? ` · ${t('estricto')}` : '';
  return `
    <div class="card" tabindex="0" role="button" style="cursor:pointer" data-schema-file="${escapeHtml(entry.file)}" aria-label="${escapeHtml(t('Ver detalle de {label}', { label: entry.name }))}">
      <div class="card-header">
        <span class="card-title">${escapeHtml(entry.name)}</span>
        ${statusBadge}
      </div>
      <p class="card-subtitle">${escapeHtml(entry.target)}</p>
      ${title ? `<p class="card-hint">${escapeHtml(title)}</p>` : ''}
      <p class="card-hint">${escapeHtml(
        t('{properties} propiedades · {required} requeridas{strictSuffix}', {
          properties: propertyCount,
          required: requiredCount,
          strictSuffix,
        }),
      )}</p>
      <p class="card-hint">${escapeHtml(t('Escriben: {writers}', { writers: entry.writers }))}</p>
    </div>
  `;
}

function attachSchemaCardHandlers(container, schemas) {
  for (const entry of schemas) {
    if (!entry.available) continue;
    const trigger = container.querySelector(
      `[data-schema-file="${entry.file}"]`,
    );
    if (!trigger) continue;
    const open = () => openSchemaModal(entry);
    trigger.addEventListener('click', open);
    trigger.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      open();
    });
  }
}

function openSchemaModal(entry) {
  const body = `
    <p class="card-subtitle">sdd/schemas/${escapeHtml(entry.file)}</p>
    ${schemaModalChips(entry)}
    ${fieldTable({ title: entry.schema.title ?? entry.name, entity: entry.schema })}
    ${schemaDefinitionTables(entry.schema)}
    ${schemaModalFooter(entry)}
  `;
  openModal(entry.name, body, { size: 'xl' });
}

async function renderHelp(container, params) {
  const results = await Promise.allSettled(
    CATALOG.helpDocs.map((doc) => loadMarkdown(localizedDocPath(doc.path))),
  );
  const docs = CATALOG.helpDocs.map((doc, index) =>
    buildHelpDocEntry(doc, results[index]),
  );
  container.innerHTML = renderHelpShell(docs);
  attachHelpTabHandlers(container, docs);
}

function buildHelpDocEntry(doc, result) {
  if (result.status !== 'fulfilled')
    return { ...doc, html: null, error: result.reason };
  return { ...doc, html: result.value, error: null };
}

const HELP_DOC_TONE = { 'how-to': 'emerald', readme: 'sky' };

function helpDocToneColor(id) {
  const toneMap = {
    emerald: 'rgb(var(--rgb-emerald-400))',
    sky: 'rgb(var(--rgb-sky-400))',
  };
  return toneMap[HELP_DOC_TONE[id]] ?? 'var(--text-dim)';
}

function renderHelpPill(doc, active) {
  const color = helpDocToneColor(doc.id);
  const borderColor = active ? color : 'var(--border)';
  const textColor = active ? color : 'var(--text-faint)';
  return `
    <button type="button" data-help-tab="${escapeHtml(doc.id)}" role="tab" aria-selected="${active}" style="display:inline-flex;align-items:center;gap:8px;padding:8px 14px;border-radius:var(--radius-lg);border-style:solid;border-width:1px;font-size:var(--text-14);font-weight:var(--weight-medium);background:transparent;cursor:pointer;transition:border-color var(--transition-fast), color var(--transition-fast);border-color:${borderColor};color:${textColor}">
      ${escapeHtml(t(doc.label))}
      <span style="font-family:var(--font-mono);font-size:var(--text-10);padding:2px 6px;border-radius:var(--radius-sm);background:var(--surface-2);color:inherit">${escapeHtml(t(doc.badge))}</span>
    </button>
  `;
}

function renderHelpDescription(doc) {
  const color = helpDocToneColor(doc.id);
  return `<div style="border:1px solid ${color};border-radius:var(--radius-xl);padding:12px 16px;font-size:var(--text-14);color:var(--text-dim)">${escapeHtml(t(doc.description))}</div>`;
}

function renderHelpContent(doc) {
  if (doc.error)
    return emptyState(t('No se pudo cargar el documento'), doc.path);
  return `<div class="tile markdown">${doc.html}</div>`;
}

function renderHelpShell(docs) {
  const pills = docs
    .map((doc, index) => renderHelpPill(doc, index === 0))
    .join('');
  return `
    ${pageHeader({
      title: t('Ayuda'),
      subtitle: t('Documentación del sistema SDD: guía de uso y referencia completa.'),
    })}
    <div role="tablist" aria-label="${escapeHtml(t('Documentación SDD'))}" style="display:flex;gap:var(--space-2);flex-wrap:wrap">${pills}</div>
    <div data-help-description>${renderHelpDescription(docs[0])}</div>
    <div data-help-content role="tabpanel">${renderHelpContent(docs[0])}</div>
    <section class="card" style="margin-top:16px">
      <div class="card-header"><span class="card-title">${t('Ejemplos completos')}</span></div>
      <p class="card-hint" style="margin:0">
        ${t(
          'Repos SDD reales generados por la CLI, uno por modo (monorepo Nx, standalone y proyecto existente), regenerados desde npm en cada release: <a href="https://github.com/e-burgos/sdd-harness-examples" target="_blank" rel="noreferrer" style="color:var(--text-bright)">github.com/e-burgos/sdd-harness-examples</a>',
        )}
      </p>
    </section>
  `;
}

function setActiveHelpTab(container, docs, activeId) {
  for (const tabEl of container.querySelectorAll('[data-help-tab]')) {
    const isActive = tabEl.dataset.helpTab === activeId;
    tabEl.setAttribute('aria-selected', String(isActive));
    const color = helpDocToneColor(tabEl.dataset.helpTab);
    tabEl.style.borderColor = isActive ? color : 'var(--border)';
    tabEl.style.color = isActive ? color : 'var(--text-faint)';
  }
  const doc = docs.find((entry) => entry.id === activeId);
  container.querySelector('[data-help-description]').innerHTML =
    renderHelpDescription(doc);
  container.querySelector('[data-help-content]').innerHTML =
    renderHelpContent(doc);
}

function attachHelpTabHandlers(container, docs) {
  for (const tabEl of container.querySelectorAll('[data-help-tab]')) {
    tabEl.addEventListener('click', () =>
      setActiveHelpTab(container, docs, tabEl.dataset.helpTab),
    );
  }
}

const COSTS_FALLBACK_PRICING = Object.freeze({
  currency: 'USD',
  traditional_hourly_rate: 50,
  model_prices_per_mtok: {
    'claude/haiku': { input: 1, output: 5 },
    'claude/sonnet': { input: 3, output: 15 },
    'claude/opus': { input: 5, output: 25 },
    'claude/fable': { input: 10, output: 50 },
    'gemini/flash-lite': { input: 0.25, output: 1.5 },
    'gemini/flash': { input: 0.5, output: 3 },
    'gemini/pro': { input: 2, output: 12 },
    'copilot/gpt-5-mini': { input: 0.25, output: 2 },
    'copilot/claude-sonnet': { input: 3, output: 15 },
    'copilot/claude-opus': { input: 5, output: 25 },
    'copilot/gemini-flash': { input: 1.5, output: 9 },
  },
});

const COSTS_ASSUMED_TIER = 'claude/sonnet';
const COSTS_UNTIERED = '_untiered';
const COSTS_LEGACY_TIERS = new Set(['haiku', 'sonnet', 'opus', 'fable']);
const COSTS_PROVIDER_LABELS = {
  claude: 'Claude',
  gemini: 'Gemini',
  copilot: 'GitHub Copilot',
};

function normalizeTierKey(tier) {
  if (!tier) return null;
  return COSTS_LEGACY_TIERS.has(tier) ? `claude/${tier}` : tier;
}

function providerOfTier(tier) {
  if (!tier || tier === COSTS_UNTIERED) return null;
  const slash = tier.indexOf('/');
  return slash === -1 ? null : tier.slice(0, slash);
}

function normalizePricingKeys(prices) {
  const normalized = {};
  for (const [tier, price] of Object.entries(prices ?? {})) {
    normalized[normalizeTierKey(tier)] = price;
  }
  return normalized;
}

const COSTS_SERIES = Object.freeze({
  traditional: '#8b5cf6',
  agentic: '#059669',
  tokensIn: '#0284c7',
  tokensOut: '#d97706',
});

async function loadPricing() {
  try {
    const pricing = await fetchJson('pricing.json');
    return {
      ...COSTS_FALLBACK_PRICING,
      ...pricing,
      model_prices_per_mtok: {
        ...normalizePricingKeys(COSTS_FALLBACK_PRICING.model_prices_per_mtok),
        ...normalizePricingKeys(pricing.model_prices_per_mtok ?? {}),
      },
      missing: false,
    };
  } catch {
    return { ...COSTS_FALLBACK_PRICING, missing: true };
  }
}

const COSTS_ORIGIN_EXACT = 'exacto';
const COSTS_ORIGIN_ESTIMATED = 'estimado';
const COSTS_ORIGIN_MIXED = 'mixto';
const COSTS_NO_AGENT = '_no_agent';

const COSTS_AGENT_LABELS = {
  functional: 'Funcional',
  planner: 'Planner',
  architect: 'Arquitecto',
  'implementor-back': 'Implementor back',
  'implementor-front': 'Implementor front',
  reviewer: 'Reviewer',
  orchestrator: 'Orquestador',
  steward: 'Steward',
  hermes: 'Hermes',
  custom: 'Otro',
};

function emptyCostUsage() {
  return {
    tokensIn: 0,
    tokensOut: 0,
    tokensDisplay: 0,
    hasExplicitTotal: false,
    durationMinutes: 0,
    byTier: {},
    entries: [],
    exactUnits: 0,
    approxUnits: 0,
    hasData: false,
    approx: false,
    basis: null,
  };
}

function addTierTokens(
  usage,
  tier,
  tokensIn,
  tokensOut,
  approx = false,
  tokensTotal = null,
) {
  const key = normalizeTierKey(tier) ?? COSTS_UNTIERED;
  usage.byTier[key] ??= {
    tokensIn: 0,
    tokensOut: 0,
    tokensDisplay: 0,
    approx: false,
    exactUnits: 0,
    approxUnits: 0,
  };
  const hasTotal = typeof tokensTotal === 'number' && tokensTotal >= 0;
  const display = hasTotal ? tokensTotal : tokensIn + tokensOut;
  const bucket = usage.byTier[key];
  bucket.tokensIn += tokensIn;
  bucket.tokensOut += tokensOut;
  bucket.tokensDisplay += display;
  bucket.approx ||= approx;
  if (approx) bucket.approxUnits += 1;
  else bucket.exactUnits += 1;
  usage.tokensIn += tokensIn;
  usage.tokensOut += tokensOut;
  usage.tokensDisplay += display;
  usage.hasExplicitTotal ||= hasTotal;
  if (approx) usage.approxUnits += 1;
  else usage.exactUnits += 1;
  usage.hasData = true;
  usage.approx ||= approx;
}

function pushUsageEntry(usage, entry) {
  const providerModel = normalizeTierKey(entry.providerModel ?? null);
  const approx = entry.approx === true;
  const tokensIn = entry.tokensIn ?? 0;
  const tokensOut = entry.tokensOut ?? 0;
  const tokensTotal =
    typeof entry.tokensTotal === 'number' ? entry.tokensTotal : null;
  usage.entries.push({
    agent: entry.agent ?? null,
    label: entry.label ?? null,
    providerModel,
    effort: entry.effort ?? null,
    tokensIn,
    tokensOut,
    tokensTotal,
    tokensDisplay: tokensTotal ?? tokensIn + tokensOut,
    approx,
    source: entry.source ?? null,
    recordedAt: entry.recordedAt ?? null,
    unitLabel: entry.unitLabel ?? null,
  });
  addTierTokens(usage, providerModel, tokensIn, tokensOut, approx, tokensTotal);
}

function usageOrigin(counts) {
  const exact = counts?.exactUnits ?? 0;
  const approx = counts?.approxUnits ?? 0;
  if (exact > 0 && approx > 0) return COSTS_ORIGIN_MIXED;
  if (approx > 0) return COSTS_ORIGIN_ESTIMATED;
  if (exact > 0) return COSTS_ORIGIN_EXACT;
  return null;
}

function originBadge(origin) {
  if (!origin) return '—';
  if (origin === COSTS_ORIGIN_EXACT)
    return badge(COSTS_ORIGIN_EXACT, 'badge--origin-exact');
  if (origin === COSTS_ORIGIN_MIXED)
    return badge(COSTS_ORIGIN_MIXED, 'badge--origin-mixed');
  return badge(COSTS_ORIGIN_ESTIMATED, 'badge--origin-estimated');
}

function usageFromAgentList(byAgent, unitLabel) {
  const usage = emptyCostUsage();
  for (const item of byAgent ?? []) {
    usage.durationMinutes += item.duration_minutes ?? 0;
    pushUsageEntry(usage, {
      agent: item.agent ?? null,
      label: item.label ?? null,
      providerModel: item.provider_model ?? null,
      effort: item.effort ?? null,
      tokensIn: item.tokens_in ?? 0,
      tokensOut: item.tokens_out ?? 0,
      tokensTotal: item.tokens_total ?? null,
      approx: item.approx === true,
      source: item.source ?? null,
      recordedAt: item.recorded_at ?? null,
      unitLabel: item.label ?? unitLabel ?? null,
    });
  }
  return usage;
}

function usageFromTierMap(byTier, parentApprox, parentSource, unitLabel) {
  const usage = emptyCostUsage();
  for (const [tier, tokens] of Object.entries(byTier ?? {})) {
    pushUsageEntry(usage, {
      providerModel: tier,
      tokensIn: tokens.tokens_in ?? 0,
      tokensOut: tokens.tokens_out ?? 0,
      approx: tokens.approx ?? parentApprox,
      source: tokens.source ?? parentSource,
      unitLabel,
    });
  }
  return usage;
}

function usageFromTopLevelMetrics(metricsUsage, unitLabel) {
  const usage = emptyCostUsage();
  usage.durationMinutes = metricsUsage.duration_minutes ?? 0;
  pushUsageEntry(usage, {
    providerModel: null,
    tokensIn: metricsUsage.tokens_in ?? 0,
    tokensOut: metricsUsage.tokens_out ?? 0,
    tokensTotal: metricsUsage.tokens_total ?? null,
    approx: metricsUsage.approx === true,
    source: metricsUsage.source ?? null,
    unitLabel,
  });
  return usage;
}

function usageFromTasks(tasks) {
  const usage = emptyCostUsage();
  for (const task of tasks ?? []) {
    const entry = task.usage;
    if (!entry) continue;
    usage.durationMinutes += entry.duration_minutes ?? 0;
    pushUsageEntry(usage, {
      agent: entry.agent ?? null,
      label: entry.agent === 'custom' ? (task.id ?? null) : null,
      providerModel: entry.provider_model ?? entry.model_tier ?? null,
      effort: entry.effort ?? null,
      tokensIn: entry.tokens_in ?? 0,
      tokensOut: entry.tokens_out ?? 0,
      tokensTotal: entry.tokens_total ?? null,
      approx: entry.approx === true,
      source: entry.source ?? null,
      recordedAt: entry.recorded_at ?? null,
      unitLabel: task.id ?? null,
    });
  }
  return usage;
}

/**
 * Prioridad de fuentes para un ciclo, de más específica a más gruesa:
 * metrics.usage.by_agent → metrics.usage.by_tier → tasks[].usage → tokens
 * top-level de metrics.usage. by_tier puede faltar o estar desincronizado en
 * datos viejos, por eso by_agent manda cuando existe.
 */
function resolveCycleUsage(cycle, tasks) {
  const metricsUsage = cycle?.metrics?.usage ?? null;
  if (
    Array.isArray(metricsUsage?.by_agent) &&
    metricsUsage.by_agent.length > 0
  ) {
    const usage = usageFromAgentList(metricsUsage.by_agent);
    if (usage.durationMinutes === 0)
      usage.durationMinutes = metricsUsage.duration_minutes ?? 0;
    usage.basis = 'by_agent';
    return usage;
  }
  if (
    metricsUsage?.by_tier &&
    Object.keys(metricsUsage.by_tier).length > 0
  ) {
    const usage = usageFromTierMap(
      metricsUsage.by_tier,
      metricsUsage.approx === true,
      metricsUsage.source ?? null,
    );
    usage.durationMinutes = metricsUsage.duration_minutes ?? 0;
    usage.basis = 'by_tier';
    return usage;
  }
  const fromTasks = usageFromTasks(tasks);
  if (fromTasks.hasData) {
    if (fromTasks.durationMinutes === 0)
      fromTasks.durationMinutes = metricsUsage?.duration_minutes ?? 0;
    fromTasks.basis = 'tasks';
    return fromTasks;
  }
  if (metricsUsage) {
    const usage = usageFromTopLevelMetrics(metricsUsage);
    usage.basis = 'metrics';
    return usage;
  }
  return emptyCostUsage();
}

function usageFromFixEntry(fix) {
  const entry = fix?.usage;
  if (!entry) return emptyCostUsage();
  if (Array.isArray(entry.by_agent) && entry.by_agent.length > 0) {
    const usage = usageFromAgentList(entry.by_agent, fix.id);
    if (usage.durationMinutes === 0)
      usage.durationMinutes = entry.duration_minutes ?? 0;
    usage.basis = 'by_agent';
    return usage;
  }
  const usage = emptyCostUsage();
  usage.durationMinutes = entry.duration_minutes ?? 0;
  pushUsageEntry(usage, {
    agent: entry.agent ?? null,
    label: entry.agent === 'custom' ? (fix.id ?? null) : null,
    providerModel: entry.provider_model ?? entry.model_tier ?? null,
    effort: entry.effort ?? null,
    tokensIn: entry.tokens_in ?? 0,
    tokensOut: entry.tokens_out ?? 0,
    tokensTotal: entry.tokens_total ?? null,
    approx: entry.approx === true,
    source: entry.source ?? null,
    recordedAt: entry.recorded_at ?? null,
    unitLabel: fix.id ?? null,
  });
  usage.basis = 'fix';
  return usage;
}

function modelCostUsd(tier, tokensIn, tokensOut, pricing) {
  const key = normalizeTierKey(tier);
  let prices = key ? pricing.model_prices_per_mtok[key] : null;
  let assumed = false;
  if (!prices) {
    prices =
      pricing.model_prices_per_mtok[COSTS_ASSUMED_TIER] ??
      COSTS_FALLBACK_PRICING.model_prices_per_mtok[COSTS_ASSUMED_TIER];
    assumed = true;
  }
  return {
    cost:
      (tokensIn / 1_000_000) * prices.input +
      (tokensOut / 1_000_000) * prices.output,
    assumed,
  };
}

function agenticCostUsd(usage, pricing) {
  let cost = 0;
  let assumed = false;
  for (const [tier, tokens] of Object.entries(usage.byTier)) {
    const priced = modelCostUsd(
      tier === COSTS_UNTIERED ? null : tier,
      tokens.tokensIn,
      tokens.tokensOut,
      pricing,
    );
    cost += priced.cost;
    assumed ||= priced.assumed;
  }
  return { cost, assumed };
}

async function loadCostsData() {
  const [pricing, cycleIndex, fixesData] = await Promise.all([
    loadPricing(),
    loadCycleIndex(),
    loadFixes().catch(() => null),
  ]);

  const results = await Promise.allSettled(
    cycleIndex.map(async ({ specId, cycleId }) => {
      const cycle = await loadCycleJson(specId, cycleId);
      let tasks = [];
      try {
        const tasksJson = await fetchJson(
          `specs/${specId}/cycles/${cycleId}/tasks.json`,
        );
        tasks = tasksJson.tasks ?? [];
      } catch {}
      return { specId, cycleId, cycle, tasks };
    }),
  );

  const rows = [];
  for (const result of results) {
    if (result.status !== 'fulfilled') continue;
    const { specId, cycleId, cycle, tasks } = result.value;
    const usage = resolveCycleUsage(cycle, tasks);
    const estimationHours = tasks.reduce(
      (sum, task) => sum + (task.estimation_hours ?? 0),
      0,
    );
    const agentic = agenticCostUsd(usage, pricing);
    rows.push({
      kind: 'cycle',
      id: `${specId} · ${cycleId}`,
      href: '#/cycles',
      specId,
      cycleId,
      module: cycle.module ?? specId,
      status: cycle.status ?? 'in-progress',
      tasksTotal: tasks.length,
      estimationHours,
      traditionalCost: estimationHours * pricing.traditional_hourly_rate,
      usage,
      agenticCost: agentic.cost,
      tierAssumed: agentic.assumed,
    });
  }

  rows.sort((a, b) =>
    a.specId === b.specId
      ? a.cycleId.localeCompare(b.cycleId)
      : a.specId.localeCompare(b.specId),
  );

  const fixRows = (fixesData?.fixes ?? []).map((fix) => {
    const usage = usageFromFixEntry(fix);
    const agentic = agenticCostUsd(usage, pricing);
    const estimationHours = fix.estimation_hours ?? 0;
    return {
      kind: 'fix',
      id: fix.id,
      href: '#/fixes',
      fixId: fix.id,
      title: fix.title ?? fix.id,
      module: fix.title ?? fix.id,
      type: fix.type ?? 'FIX',
      severity: fix.severity ?? null,
      status: fix.status ?? 'pending',
      specId: fix.spec_id,
      estimationHours,
      traditionalCost: estimationHours * pricing.traditional_hourly_rate,
      usage,
      agenticCost: agentic.cost,
      tierAssumed: agentic.assumed,
    };
  });

  return { pricing, rows, fixRows };
}

function costsAgentKey(entry) {
  if (entry.agent === 'custom') return `custom:${entry.label ?? ''}`;
  return entry.agent ?? COSTS_NO_AGENT;
}

function costsAgentLabel(bucket) {
  if (!bucket.agent) return t('Sin agente declarado');
  if (bucket.agent === 'custom') return bucket.label ?? t('Otro');
  return t(COSTS_AGENT_LABELS[bucket.agent] ?? bucket.agent);
}

function costsAgentAggregation(rows, fixRows, pricing) {
  const totals = new Map();
  const accumulate = (usage) => {
    for (const entry of usage.entries) {
      const key = costsAgentKey(entry);
      const bucket = totals.get(key) ?? {
        key,
        agent: entry.agent ?? null,
        label: entry.label ?? null,
        units: 0,
        tokensIn: 0,
        tokensOut: 0,
        tokensDisplay: 0,
        cost: 0,
        models: new Set(),
        exactUnits: 0,
        approxUnits: 0,
        assumed: false,
      };
      bucket.units += 1;
      bucket.tokensIn += entry.tokensIn;
      bucket.tokensOut += entry.tokensOut;
      bucket.tokensDisplay += entry.tokensDisplay;
      const priced = modelCostUsd(
        entry.providerModel,
        entry.tokensIn,
        entry.tokensOut,
        pricing,
      );
      bucket.cost += priced.cost;
      bucket.assumed ||= priced.assumed;
      if (entry.providerModel) bucket.models.add(entry.providerModel);
      if (entry.approx) bucket.approxUnits += 1;
      else bucket.exactUnits += 1;
      totals.set(key, bucket);
    }
  };
  for (const row of rows) accumulate(row.usage);
  for (const fix of fixRows) accumulate(fix.usage);
  return [...totals.values()].sort((a, b) => b.cost - a.cost);
}

function costsModelAggregation(rows, fixRows, pricing) {
  const totals = new Map();
  const accumulate = (usage) => {
    for (const [tier, tokens] of Object.entries(usage.byTier)) {
      const bucket = totals.get(tier) ?? {
        model: tier,
        provider: providerOfTier(tier) ?? COSTS_UNTIERED,
        units: 0,
        tokensIn: 0,
        tokensOut: 0,
        tokensDisplay: 0,
        cost: 0,
        exactUnits: 0,
        approxUnits: 0,
        assumed: false,
      };
      bucket.units += tokens.exactUnits + tokens.approxUnits;
      bucket.tokensIn += tokens.tokensIn;
      bucket.tokensOut += tokens.tokensOut;
      bucket.tokensDisplay += tokens.tokensDisplay;
      bucket.exactUnits += tokens.exactUnits;
      bucket.approxUnits += tokens.approxUnits;
      const priced = modelCostUsd(
        tier === COSTS_UNTIERED ? null : tier,
        tokens.tokensIn,
        tokens.tokensOut,
        pricing,
      );
      bucket.cost += priced.cost;
      bucket.assumed ||= priced.assumed;
      totals.set(tier, bucket);
    }
  };
  for (const row of rows) accumulate(row.usage);
  for (const fix of fixRows) accumulate(fix.usage);
  return [...totals.values()];
}

function costsProviderGroups(modelRows) {
  const groups = new Map();
  for (const model of modelRows) {
    const group = groups.get(model.provider) ?? {
      provider: model.provider,
      models: [],
      tokensIn: 0,
      tokensOut: 0,
      tokensDisplay: 0,
      cost: 0,
      exactUnits: 0,
      approxUnits: 0,
    };
    group.models.push(model);
    group.tokensIn += model.tokensIn;
    group.tokensOut += model.tokensOut;
    group.tokensDisplay += model.tokensDisplay;
    group.cost += model.cost;
    group.exactUnits += model.exactUnits;
    group.approxUnits += model.approxUnits;
    groups.set(model.provider, group);
  }
  const list = [...groups.values()];
  for (const group of list) group.models.sort((a, b) => b.cost - a.cost);
  return list.sort((a, b) => b.cost - a.cost);
}

function providerLabel(provider) {
  if (provider === COSTS_UNTIERED) return t('Sin proveedor declarado');
  return COSTS_PROVIDER_LABELS[provider] ?? provider;
}

function costsModelShortName(model) {
  if (model.model === COSTS_UNTIERED) return t('Sin modelo declarado');
  return model.model;
}

function costsMoneyFormatter(currency) {
  return new Intl.NumberFormat(localeTag(), {
    style: 'currency',
    currency,
    maximumFractionDigits: 2,
  });
}

function costsTokensFormat() {
  return new Intl.NumberFormat(localeTag(), {
    notation: 'compact',
    maximumFractionDigits: 1,
  });
}
function costsExactFormat() {
  return new Intl.NumberFormat(localeTag());
}

function costsLegend(entries) {
  const chips = entries
    .map(
      ({ label, color }) => `
        <span style="display:inline-flex;align-items:center;gap:6px;font-family:var(--font-mono);font-size:var(--text-11);color:var(--text-dim)">
          <span style="width:10px;height:10px;border-radius:3px;background:${color}" aria-hidden="true"></span>${escapeHtml(label)}
        </span>`,
    )
    .join('');
  return `<div style="display:flex;gap:16px;flex-wrap:wrap;margin-bottom:12px">${chips}</div>`;
}

function costBarTrack({ segments, max, tip }) {
  const parts = segments
    .filter((segment) => segment.value > 0)
    .map((segment) => {
      const pct = max > 0 ? (segment.value / max) * 100 : 0;
      return `<span style="display:block;width:${pct.toFixed(2)}%;min-width:2px;height:14px;background:${segment.color};border-radius:0 4px 4px 0"></span>`;
    })
    .join('');
  return `
    <span data-cost-tip="${escapeHtml(tip)}" style="display:flex;align-items:center;gap:2px;flex:1;min-width:0;padding:3px 0">
      ${parts || '<span style="display:block;width:2px;height:14px;background:var(--border)"></span>'}
    </span>`;
}

function costBarRow({ label, href, valueLabel, segments, max, tip }) {
  const labelHtml = href
    ? `<a href="${escapeHtml(href)}" style="color:var(--text-muted);text-decoration:none">${escapeHtml(label)}</a>`
    : escapeHtml(label);
  return `
    <div style="display:flex;align-items:center;gap:12px;min-height:22px">
      <span style="flex:0 0 clamp(148px, 20%, 240px);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-family:var(--font-mono);font-size:var(--text-11);color:var(--text-muted)" title="${escapeHtml(label)}">${labelHtml}</span>
      ${costBarTrack({ segments, max, tip })}
      <span style="flex:0 0 auto;font-family:var(--font-mono);font-size:var(--text-11);color:var(--text-bright)">${escapeHtml(valueLabel)}</span>
    </div>`;
}

function shortSpecLabel(specId) {
  return specId.replace(/^spec-/, '');
}

const COSTS_REPO_LEVEL_KEY = '__repo__';

function costsUnitRow(row, money) {
  const tokens = row.usage.hasData
    ? `${costsExactFormat().format(row.usage.tokensIn)} / ${costsExactFormat().format(row.usage.tokensOut)}`
    : '—';
  const total = row.usage.hasData
    ? costsExactFormat().format(row.usage.tokensDisplay)
    : '—';
  const agentic = row.usage.hasData
    ? money.format(row.agenticCost) + (row.tierAssumed ? ' *' : '')
    : '—';
  const saving = row.usage.hasData
    ? money.format(row.traditionalCost - row.agenticCost)
    : '—';
  const typeBadge =
    row.kind === 'cycle'
      ? badge('ciclo', 'badge--sky')
      : badge('fix', 'badge--amber');
  return `
    <tr>
      <td><a href="${row.href}" style="color:var(--text-bright)">${escapeHtml(row.id)}</a></td>
      <td>${typeBadge}</td>
      <td>${escapeHtml(row.module)}</td>
      <td style="text-align:right">${costsExactFormat().format(row.estimationHours)} h</td>
      <td style="text-align:right">${money.format(row.traditionalCost)}</td>
      <td style="text-align:right">${escapeHtml(tokens)}</td>
      <td style="text-align:right">${escapeHtml(total)}</td>
      <td>${originBadge(usageOrigin(row.usage))}</td>
      <td style="text-align:right">${escapeHtml(agentic)}</td>
      <td style="text-align:right">${escapeHtml(saving)}</td>
    </tr>`;
}

function costsAgentsCard(rows, fixRows, pricing, money) {
  const buckets = costsAgentAggregation(rows, fixRows, pricing);
  if (buckets.length === 0) {
    return `
      <section class="card" style="margin-bottom:16px">
        <div class="card-header"><span class="card-title">${t('Consumo por agente')}</span></div>
        <p class="card-hint">${t('Sin telemetría por agente todavía. Se registra en <code>metrics.usage.by_agent</code> de cada ciclo y en el <code>usage</code> de cada fix.')}</p>
      </section>`;
  }
  const body = buckets
    .map((bucket) => {
      const models =
        bucket.models.size > 0 ? [...bucket.models].sort().join(', ') : '—';
      return `
        <tr>
          <td>${escapeHtml(costsAgentLabel(bucket))}</td>
          <td style="text-align:right">${costsExactFormat().format(bucket.units)}</td>
          <td>${escapeHtml(models)}</td>
          <td style="text-align:right">${costsExactFormat().format(bucket.tokensIn)}</td>
          <td style="text-align:right">${costsExactFormat().format(bucket.tokensOut)}</td>
          <td style="text-align:right">${costsExactFormat().format(bucket.tokensDisplay)}</td>
          <td>${originBadge(usageOrigin(bucket))}</td>
          <td style="text-align:right">${escapeHtml(money.format(bucket.cost) + (bucket.assumed ? ' *' : ''))}</td>
        </tr>`;
    })
    .join('');
  return `
    <section class="card" style="margin-bottom:16px">
      <div class="card-header"><span class="card-title">${t('Consumo por agente')}</span></div>
      <p class="card-subtitle">${t('Tokens y costo agrupados por rol SDD, a partir de las entradas <code>by_agent</code> de ciclos y fixes y del <code>usage</code> por task.')}</p>
      <div class="table-wrapper"><table class="data-table">
        <thead><tr><th>${t('Agente')}</th><th style="text-align:right">${t('Unidades')}</th><th>${t('Modelos usados')}</th><th style="text-align:right">${t('Tokens in')}</th><th style="text-align:right">${t('Tokens out')}</th><th style="text-align:right">${t('Tokens')}</th><th>${t('Origen')}</th><th style="text-align:right">${t('Costo aprox.')}</th></tr></thead>
        <tbody>${body}</tbody>
      </table></div>
    </section>`;
}

function costsProvidersCard(rows, fixRows, pricing, money) {
  const modelRows = costsModelAggregation(rows, fixRows, pricing);
  if (modelRows.length === 0) {
    return `
      <section class="card" style="margin-bottom:16px">
        <div class="card-header"><span class="card-title">${t('Consumo por proveedor y modelo')}</span></div>
        <p class="card-hint">${t('Sin telemetría con proveedor declarado todavía. Las claves de {field} llevan la forma {example}.', { field: '<code>by_agent.provider_model</code> / <code>by_tier</code>', example: '<code>proveedor/modelo</code> (<code>claude/opus</code>, <code>gemini/pro</code>, <code>copilot/gpt-5-mini</code>)' })}</p>
      </section>`;
  }
  const groups = costsProviderGroups(modelRows);
  const body = groups
    .map((group) => {
      const modelLines = group.models
        .map(
          (model) => `
        <tr>
          <td>${escapeHtml(providerLabel(group.provider))}</td>
          <td><code>${escapeHtml(costsModelShortName(model))}</code></td>
          <td style="text-align:right">${costsExactFormat().format(model.units)}</td>
          <td>${originBadge(usageOrigin(model))}</td>
          <td style="text-align:right">${costsExactFormat().format(model.tokensIn)}</td>
          <td style="text-align:right">${costsExactFormat().format(model.tokensOut)}</td>
          <td style="text-align:right">${costsExactFormat().format(model.tokensDisplay)}</td>
          <td style="text-align:right">${escapeHtml(money.format(model.cost) + (model.assumed ? ' *' : ''))}</td>
        </tr>`,
        )
        .join('');
      const subtotal =
        group.models.length > 1
          ? `
        <tr style="background:rgb(var(--rgb-zinc-900) / 0.25)">
          <td colspan="2" style="color:var(--text-dim)">${escapeHtml(t('Subtotal {provider}', { provider: providerLabel(group.provider) }))}</td>
          <td style="text-align:right">${costsExactFormat().format(group.models.reduce((sum, model) => sum + model.units, 0))}</td>
          <td>${originBadge(usageOrigin(group))}</td>
          <td style="text-align:right">${costsExactFormat().format(group.tokensIn)}</td>
          <td style="text-align:right">${costsExactFormat().format(group.tokensOut)}</td>
          <td style="text-align:right">${costsExactFormat().format(group.tokensDisplay)}</td>
          <td style="text-align:right">${escapeHtml(money.format(group.cost))}</td>
        </tr>`
          : '';
      return modelLines + subtotal;
    })
    .join('');
  return `
    <section class="card" style="margin-bottom:16px">
      <div class="card-header"><span class="card-title">${t('Consumo por proveedor y modelo')}</span></div>
      <p class="card-subtitle">${t('Tokens y costo agéntico por modelo completo (proveedor/modelo), con subtotal por proveedor. Incluye ciclos y fixes.')} ${t('<strong>Origen</strong>: exacto = leído de un contador de la sesión (por ejemplo <code>agent-usage-notification</code>, el conteo por subagente que reporta el arnés); estimado = aproximación declarada por el agente (arneses sin contador, como Copilot o Antigravity); mixto = mezcla de ambos.')}</p>
      <div class="table-wrapper"><table class="data-table">
        <thead><tr><th>${t('Proveedor')}</th><th>${t('Modelo')}</th><th style="text-align:right">${t('Unidades')}</th><th>${t('Origen')}</th><th style="text-align:right">${t('Tokens in')}</th><th style="text-align:right">${t('Tokens out')}</th><th style="text-align:right">${t('Tokens')}</th><th style="text-align:right">${t('Costo aprox.')}</th></tr></thead>
        <tbody>${body}</tbody>
      </table></div>
    </section>`;
}

function costsMethodologyCard(pricing, anyAssumed, money) {
  const tierRows = Object.entries(pricing.model_prices_per_mtok)
    .map(
      ([tier, prices]) =>
        `<tr><td>${escapeHtml(tier)}</td><td style="text-align:right">${money.format(prices.input)}</td><td style="text-align:right">${money.format(prices.output)}</td></tr>`,
    )
    .join('');
  return `
    <section class="card">
      <div class="card-header"><span class="card-title">${t('Metodología y tarifas')}</span></div>
      <p class="card-hint">
        <strong>${t('Tradicional')}</strong> = ${t('Σ estimation_hours de las tasks × {rate}/h.', { rate: money.format(pricing.traditional_hourly_rate) })}
        <strong>${t('Agéntico')}</strong> = ${t('tokens registrados × tarifa del modelo (USD por millón de tokens).')}
        ${t('Prioridad de fuentes por ciclo: <code>metrics.usage.by_agent</code> → <code>metrics.usage.by_tier</code> → <code>tasks[].usage</code> → tokens top-level de <code>metrics.usage</code>.')}
        ${t('La telemetría la escribe cada agente al cerrar su unidad de trabajo y el sdd-reviewer la consolida al cerrar el ciclo (<code>metrics.usage</code>); es obligatoria y, cuando el arnés no expone contador, se registra como estimación declarada (<code>approx: true</code>) — nunca se omite.')}
        ${t('<strong>Origen</strong>: exacto = leído de un contador de la sesión (por ejemplo <code>agent-usage-notification</code>, el conteo por subagente que reporta el arnés); estimado = aproximación declarada por el agente (arneses sin contador, como Copilot o Antigravity); mixto = mezcla de ambos.')}
        ${anyAssumed ? t('* Tokens sin modelo declarado (o con un modelo sin tarifa) se tarifan como <code>{tier}</code>.', { tier: COSTS_ASSUMED_TIER }) : ''}
        ${pricing.missing ? t('No hay <code>sdd/pricing.json</code> — usando tarifas por defecto del kit.') : t('Tarifas editables en <code>sdd/pricing.json</code>.')}
      </p>
      <div class="table-wrapper"><table class="data-table">
        <thead><tr><th>${t('Modelo')}</th><th style="text-align:right">Input /MTok</th><th style="text-align:right">Output /MTok</th></tr></thead>
        <tbody>${tierRows}</tbody>
      </table></div>
    </section>`;
}

function attachCostsTooltip(container) {
  const tooltip = document.createElement('div');
  tooltip.setAttribute('role', 'status');
  tooltip.style.cssText =
    'position:fixed;z-index:80;max-width:320px;padding:8px 10px;border-radius:var(--radius-md);border:1px solid var(--border-soft);background:var(--surface-2);color:var(--text-bright);font-family:var(--font-mono);font-size:var(--text-11);line-height:1.5;pointer-events:none;display:none';
  container.appendChild(tooltip);

  const move = (event) => {
    const x = Math.min(event.clientX + 14, window.innerWidth - 330);
    const y = Math.min(event.clientY + 14, window.innerHeight - 80);
    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
  };
  container.addEventListener('mouseover', (event) => {
    const target = event.target.closest('[data-cost-tip]');
    if (!target) return;
    tooltip.textContent = target.dataset.costTip;
    tooltip.style.display = 'block';
    move(event);
  });
  container.addEventListener('mousemove', (event) => {
    if (tooltip.style.display === 'block') move(event);
  });
  container.addEventListener('mouseout', (event) => {
    if (event.target.closest('[data-cost-tip]')) {
      tooltip.style.display = 'none';
    }
  });
}

// ─── Costs: tabs, chart primitives and the four sub-views ─────────────────────
// Charts are inline SVG on purpose: the viewer runs offline and ships no libraries.
// Marks follow the same spec everywhere — thin bars (≤ 24px) with a rounded data-end,
// 2px surface gaps between stacked segments, hairline gridlines, and every value also
// reachable in a table (the tooltip never gates a number).

const COSTS_TABS = [
  { id: 'general', label: 'General' },
  { id: 'specs', label: 'Specs' },
  { id: 'fixes', label: 'Fixes' },
  { id: 'rtk', label: 'RTK' },
];
const COSTS_DEFAULT_TAB = 'general';
const COSTS_TABLE_ROWS_VISIBLE = 8;

/** Ordered categorical palette (dark surface), validated with the dataviz six checks. */
const VIZ_CATEGORICAL = Object.freeze([
  '#3987e5',
  '#d95926',
  '#199e70',
  '#c98500',
  '#d55181',
  '#008300',
  '#9085e9',
  '#e66767',
]);
const VIZ_OTHER = '#71717a';
const VIZ_MAX_SLICES = 6;
const RTK_SERIES = Object.freeze({ saved: '#059669', read: '#0284c7' });

/** Colour follows the entity, never its rank: a filter must not repaint the survivors. */
const VIZ_AGENT_SLOT = {
  'implementor-front': 0,
  'implementor-back': 1,
  architect: 2,
  reviewer: 3,
  planner: 4,
  functional: 5,
  orchestrator: 6,
  steward: 7,
  hermes: 7,
};
const VIZ_PROVIDER_SLOT = { claude: 0, gemini: 1, copilot: 2 };
const VIZ_STATUS_TONE = {
  emerald: '#059669',
  teal: '#0d9488',
  amber: '#d97706',
  orange: '#ea580c',
  sky: '#0284c7',
  zinc: '#71717a',
  'zinc-mute': '#52525b',
  rose: '#e11d48',
  red: '#dc2626',
};

function vizAgentColor(agent) {
  const slot = VIZ_AGENT_SLOT[agent];
  return slot === undefined ? VIZ_OTHER : VIZ_CATEGORICAL[slot];
}

function vizProviderColor(provider, index) {
  const slot = VIZ_PROVIDER_SLOT[provider];
  return VIZ_CATEGORICAL[(slot === undefined ? 3 + index : slot) % VIZ_CATEGORICAL.length];
}

function vizStatusColor(status) {
  return VIZ_STATUS_TONE[STATUS_META[status]?.tone] ?? VIZ_OTHER;
}

function costsTabBar(active) {
  return `
    <nav class="costs-tabs" role="tablist" aria-label="${escapeHtml(t('Vistas de costos'))}">
      ${COSTS_TABS.map(
        (tab) =>
          `<a class="pill${tab.id === active ? ' pill--active' : ''}" role="tab" aria-selected="${tab.id === active}" href="#/costs/${tab.id}" data-costs-tab="${tab.id}">${escapeHtml(t(tab.label))}</a>`,
      ).join('')}
    </nav>`;
}

function costsSectionCard({ title, subtitle, body, hint, grid = false }) {
  return `
    <section class="card${grid ? ' costs-grid-item' : ''}"${grid ? '' : ' style="margin-bottom:16px"'}>
      <div class="card-header"><span class="card-title">${escapeHtml(title)}</span></div>
      ${subtitle ? `<p class="card-subtitle" style="margin-bottom:12px">${subtitle}</p>` : ''}
      ${body}
      ${hint ? `<p class="card-hint" style="margin-top:10px">${hint}</p>` : ''}
    </section>`;
}

/** Fixed-height table: the header stays put, the body scrolls. Row count is in the caption. */
function scrollTable({ head, body, rows, caption }) {
  const tall = rows > COSTS_TABLE_ROWS_VISIBLE;
  return `
    ${caption ? `<p class="card-hint" style="margin-bottom:8px">${caption}</p>` : ''}
    <div class="table-wrapper${tall ? ' table-wrapper--scroll' : ''}"><table class="data-table">
      <thead><tr>${head}</tr></thead>
      <tbody>${body}</tbody>
    </table></div>`;
}

function vizNiceMax(value) {
  if (!(value > 0)) return 1;
  const magnitude = 10 ** Math.floor(Math.log10(value));
  const normalized = value / magnitude;
  const step = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return step * magnitude;
}

function vizRoundedTopRect(x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height);
  if (r <= 0) return `M${x} ${y}h${width}v${height}h${-width}Z`;
  return `M${x} ${y + r}q0 ${-r} ${r} ${-r}h${width - 2 * r}q${r} 0 ${r} ${r}v${height - r}h${-width}Z`;
}

function vizRoundedRightRect(x, y, width, height, radius) {
  const r = Math.min(radius, height / 2, width);
  if (r <= 0) return `M${x} ${y}h${width}v${height}h${-width}Z`;
  return `M${x} ${y}h${width - r}q${r} 0 ${r} ${r}v${height - 2 * r}q0 ${r} ${-r} ${r}h${-(width - r)}Z`;
}

/** Periodic x labels plus the last one — unless the last would sit on top of a periodic one. */
function vizShowsXLabel(index, count, every) {
  const last = count - 1;
  if (index === last) return true;
  if (index % every !== 0) return false;
  return every === 1 || last - index >= every;
}

/** Mono 10px ≈ 6px por caracter: adelgaza el eje x hasta que la etiqueta más larga entre. */
function vizLabelEvery(points, slot) {
  const widest = points.reduce(
    (max, point) => Math.max(max, String(point.label ?? '').length),
    0,
  );
  return Math.max(1, Math.ceil((widest * 6 + 8) / Math.max(1, slot)));
}

const VIZ_MIN_WIDTH = 240;
const vizCharts = new Map();
let vizChartSeq = 0;
let vizResizeObserver = null;
let vizResizeQueued = false;

/**
 * Los SVG se dibujan 1:1: el ancho real recién se conoce cuando el HTML está montado,
 * así que cada gráfico deja un host con su spec y `fitVizCharts` lo vuelve a dibujar
 * con el `clientWidth` medido. Sin esto el viewBox escalaba el texto al doble.
 */
function vizChart(kind, spec) {
  const id = `viz${++vizChartSeq}`;
  vizCharts.set(id, { kind, spec, host: null });
  return `<div class="viz-host" data-viz="${id}">${vizChartSvg(kind, spec, spec.width)}</div>`;
}

function vizChartSvg(kind, spec, width) {
  return kind === 'line'
    ? vizLineSvg({ ...spec, width })
    : vizColumnsSvg({ ...spec, width });
}

function vizChartObserver() {
  if (vizResizeObserver || typeof ResizeObserver !== 'function') return vizResizeObserver;
  vizResizeObserver = new ResizeObserver(() => {
    if (vizResizeQueued) return;
    vizResizeQueued = true;
    requestAnimationFrame(() => {
      vizResizeQueued = false;
      fitVizCharts();
    });
  });
  return vizResizeObserver;
}

function fitVizCharts(root) {
  const hosts = (root ?? document).querySelectorAll('[data-viz]');
  const observer = vizChartObserver();
  const seen = new Set();
  for (const host of hosts) {
    const entry = vizCharts.get(host.dataset.viz);
    if (!entry) continue;
    seen.add(host.dataset.viz);
    entry.host = host;
    observer?.observe(host);
    const measured = Math.round(host.clientWidth);
    // Host todavía sin montar (o en una pestaña oculta): el observer reintenta.
    if (measured <= 0) continue;
    const width = Math.max(VIZ_MIN_WIDTH, measured);
    if (host.dataset.vizWidth === String(width)) continue;
    host.dataset.vizWidth = String(width);
    host.innerHTML = vizChartSvg(entry.kind, entry.spec, width);
  }
  if (root) return;
  for (const [id, entry] of vizCharts) {
    if (seen.has(id)) continue;
    if (entry.host) observer?.unobserve(entry.host);
    vizCharts.delete(id);
  }
}

function vizLegend(entries) {
  return `<div class="viz-legend">${entries
    .map(
      ({ label, color, value }) => `
        <span class="viz-legend-item">
          <span class="viz-swatch" style="background:${color}" aria-hidden="true"></span>
          <span>${escapeHtml(label)}</span>
          ${value !== undefined ? `<span class="viz-legend-value">${escapeHtml(String(value))}</span>` : ''}
        </span>`,
    )
    .join('')}</div>`;
}

/**
 * Columns over an ordered axis (days, months, categories). `points[].values` aligns with
 * `series`; `mode` stacks them (part-to-whole per slot) or groups them side by side (two
 * measures of the same unit). A slot-wide transparent hit rect carries the tooltip so the
 * reader aims at the slot, not at a 2px column. `labels` prints the value on each cap —
 * only for short categorical axes where the disparity between series is the story.
 */
function vizColumns(spec) {
  return vizChart('columns', spec);
}

function vizColumnsSvg({
  points,
  series,
  format,
  height = 190,
  width = 640,
  xLabelEvery,
  mode = 'stacked',
  labels = false,
}) {
  const padLeft = 44;
  const padRight = 8;
  const padTop = labels ? 18 : 8;
  const padBottom = 24;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;
  const grouped = mode === 'grouped';
  const totals = points.map((point) =>
    grouped
      ? Math.max(0, ...point.values)
      : point.values.reduce((sum, value) => sum + (value > 0 ? value : 0), 0),
  );
  const max = vizNiceMax(Math.max(0, ...totals));
  const slot = points.length > 0 ? plotW / points.length : plotW;
  const perSlot = grouped ? series.length : 1;
  const barW = Math.max(3, Math.min(24, (slot * 0.68 - (perSlot - 1) * 2) / perSlot));
  const groupW = barW * perSlot + (perSlot - 1) * 2;
  const ticks = 4;
  const every = Math.max(xLabelEvery ?? 1, vizLabelEvery(points, slot));

  const gridlines = Array.from({ length: ticks + 1 }, (_, index) => {
    const y = padTop + plotH - (plotH * index) / ticks;
    const value = (max * index) / ticks;
    return `
      <line x1="${padLeft}" x2="${width - padRight}" y1="${y.toFixed(1)}" y2="${y.toFixed(1)}" class="viz-grid" />
      <text x="${padLeft - 6}" y="${(y + 3).toFixed(1)}" text-anchor="end" class="viz-tick">${escapeHtml(format(value))}</text>`;
  }).join('');

  const capLabel = (x, top, value) =>
    labels && value > 0
      ? `<text x="${x.toFixed(1)}" y="${(top - 4).toFixed(1)}" text-anchor="middle" class="viz-tick viz-tick--value">${escapeHtml(format(value))}</text>`
      : '';

  const columns = points
    .map((point, index) => {
      const groupX = padLeft + slot * index + (slot - groupW) / 2;
      let marks = '';
      if (grouped) {
        let previousLabelTop = null;
        marks = point.values
          .map((value, seriesIndex) => {
            if (!(value > 0)) return '';
            const h = Math.max(1, (value / max) * plotH);
            const x = groupX + seriesIndex * (barW + 2);
            const top = padTop + plotH - h;
            // Two short neighbours would print their values on the same line: stagger.
            const labelTop =
              previousLabelTop !== null && Math.abs(previousLabelTop - top) < 14
                ? previousLabelTop - 12
                : top;
            previousLabelTop = labelTop;
            return `<path d="${vizRoundedTopRect(x, top, barW, h, 4)}" fill="${series[seriesIndex].color}" />${capLabel(x + barW / 2, labelTop, value)}`;
          })
          .join('');
      } else {
        let cursor = padTop + plotH;
        marks = point.values
          .map((value, seriesIndex) => {
            if (!(value > 0)) return '';
            const h = (value / max) * plotH;
            const isTop = point.values.slice(seriesIndex + 1).every((v) => !(v > 0));
            const gap = isTop ? 0 : 2;
            const top = cursor - h;
            const body = isTop
              ? vizRoundedTopRect(groupX, top, barW, h, 4)
              : `M${groupX} ${top + gap}h${barW}v${h - gap}h${-barW}Z`;
            cursor = top;
            return `<path d="${body}" fill="${series[seriesIndex].color}" />${isTop ? capLabel(groupX + barW / 2, top, totals[index]) : ''}`;
          })
          .join('');
      }
      const label = vizShowsXLabel(index, points.length, every)
        ? `<text x="${(padLeft + slot * index + slot / 2).toFixed(1)}" y="${height - 8}" text-anchor="middle" class="viz-tick">${escapeHtml(point.label)}</text>`
        : '';
      return `
        <g class="viz-col">
          ${marks}
          ${label}
          <rect x="${(padLeft + slot * index).toFixed(1)}" y="${padTop}" width="${slot.toFixed(1)}" height="${plotH}" fill="transparent" data-cost-tip="${escapeHtml(point.tip)}" />
        </g>`;
    })
    .join('');

  return `
    <svg class="viz-svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(t('Gráfico de columnas'))}">
      ${gridlines}
      <line x1="${padLeft}" x2="${width - padRight}" y1="${padTop + plotH}" y2="${padTop + plotH}" class="viz-axis" />
      ${columns}
    </svg>`;
}

/** Single-series line with a soft area wash; the end marker carries a 2px surface ring. */
function vizLine(spec) {
  return vizChart('line', spec);
}

function vizLineSvg({ points, color, format, height = 170, width = 640 }) {
  const padLeft = 44;
  const padRight = 12;
  const padTop = 10;
  const padBottom = 24;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;
  const max = vizNiceMax(Math.max(0, ...points.map((point) => point.value)));
  const step = points.length > 1 ? plotW / (points.length - 1) : 0;
  const coords = points.map((point, index) => ({
    x: padLeft + step * index,
    y: padTop + plotH - (Math.max(0, point.value) / max) * plotH,
  }));
  const ticks = 4;
  const gridlines = Array.from({ length: ticks + 1 }, (_, index) => {
    const y = padTop + plotH - (plotH * index) / ticks;
    return `
      <line x1="${padLeft}" x2="${width - padRight}" y1="${y.toFixed(1)}" y2="${y.toFixed(1)}" class="viz-grid" />
      <text x="${padLeft - 6}" y="${(y + 3).toFixed(1)}" text-anchor="end" class="viz-tick">${escapeHtml(format((max * index) / ticks))}</text>`;
  }).join('');
  const linePath = coords
    .map((c, index) => `${index === 0 ? 'M' : 'L'}${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
    .join('');
  const areaPath =
    coords.length > 1
      ? `${linePath}L${coords[coords.length - 1].x.toFixed(1)} ${padTop + plotH}L${coords[0].x.toFixed(1)} ${padTop + plotH}Z`
      : '';
  const every = vizLabelEvery(points, step || plotW);
  const labels = points
    .map((point, index) =>
      vizShowsXLabel(index, points.length, every)
        ? `<text x="${coords[index].x.toFixed(1)}" y="${height - 8}" text-anchor="middle" class="viz-tick">${escapeHtml(point.label)}</text>`
        : '',
    )
    .join('');
  const hits = points
    .map((point, index) => {
      const left = index === 0 ? padLeft : coords[index].x - step / 2;
      return `<rect x="${left.toFixed(1)}" y="${padTop}" width="${(step || plotW).toFixed(1)}" height="${plotH}" fill="transparent" data-cost-tip="${escapeHtml(point.tip)}" />`;
    })
    .join('');
  const last = coords[coords.length - 1];
  return `
    <svg class="viz-svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img" aria-label="${escapeHtml(t('Gráfico de línea'))}">
      ${gridlines}
      ${areaPath ? `<path d="${areaPath}" fill="${color}" fill-opacity="0.1" />` : ''}
      <path d="${linePath}" fill="none" stroke="${color}" stroke-width="2" stroke-linejoin="round" stroke-linecap="round" />
      ${last ? `<circle cx="${last.x.toFixed(1)}" cy="${last.y.toFixed(1)}" r="4" fill="${color}" stroke="var(--bg)" stroke-width="2" />` : ''}
      ${labels}
      ${hits}
    </svg>`;
}

/**
 * Part-to-whole as ONE horizontal stacked bar (never a pie): segments beyond the sixth
 * fold into "Otros", 2px surface gaps separate neighbours, the legend carries the values.
 */
function vizShareBar({ segments, format }) {
  const positive = segments.filter((segment) => segment.value > 0);
  const total = positive.reduce((sum, segment) => sum + segment.value, 0);
  if (total <= 0) {
    return `<p class="card-hint">${t('Sin datos para graficar todavía.')}</p>`;
  }
  const sorted = [...positive].sort((a, b) => b.value - a.value);
  const kept = sorted.slice(0, VIZ_MAX_SLICES);
  const rest = sorted.slice(VIZ_MAX_SLICES);
  if (rest.length > 0) {
    kept.push({
      label: t('Otros ({count})', { count: rest.length }),
      value: rest.reduce((sum, segment) => sum + segment.value, 0),
      color: VIZ_OTHER,
    });
  }
  const parts = kept
    .map((segment, index) => {
      const pct = (segment.value / total) * 100;
      const tip = `${segment.label}: ${format(segment.value)} (${pct.toFixed(1)}%)`;
      return `<span class="viz-share-seg" style="width:${pct.toFixed(2)}%;background:${segment.color}${index === kept.length - 1 ? ';border-radius:0 4px 4px 0' : ''}" data-cost-tip="${escapeHtml(tip)}"></span>`;
    })
    .join('');
  return `
    <div class="viz-share" role="img" aria-label="${escapeHtml(t('Distribución'))}">${parts}</div>
    ${vizLegend(
      kept.map((segment) => ({
        label: segment.label,
        color: segment.color,
        value: `${format(segment.value)} · ${((segment.value / total) * 100).toFixed(0)}%`,
      })),
    )}`;
}

/** Horizontal bars for one measure across categories: a single hue, value at the tip. */
function vizBarList({ rows, format, color, maxRows = 12 }) {
  const shown = rows.slice(0, maxRows);
  const max = Math.max(1e-9, ...shown.map((row) => row.value));
  return `<div style="display:grid;gap:4px">${shown
    .map((row) =>
      costBarRow({
        label: row.label,
        href: row.href,
        valueLabel: row.valueLabel ?? format(row.value),
        segments: [{ value: row.value, color: row.color ?? color }],
        max,
        tip: row.tip ?? `${row.label}: ${format(row.value)}`,
      }),
    )
    .join('')}</div>${
    rows.length > shown.length
      ? `<p class="card-hint" style="margin-top:8px">${t('Se muestran {shown} de {total}; el resto está en la tabla.', { shown: shown.length, total: rows.length })}</p>`
      : ''
  }`;
}

// Tope de 4 por fila: con 7 KPIs, `auto-fit` los apretaba hasta recortar el valor.
function costsKpiRow(cells) {
  return `<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(max(170px,calc(25% - 6px)),1fr));gap:8px;margin-bottom:20px">${cells.join('')}</div>`;
}

function costsTotals(units) {
  const totals = units.reduce(
    (acc, row) => {
      acc.hours += row.estimationHours;
      acc.traditional += row.traditionalCost;
      acc.tokens += row.usage.tokensDisplay;
      acc.agentic += row.agenticCost;
      acc.hasUsage ||= row.usage.hasData;
      acc.anyAssumed ||= row.tierAssumed;
      return acc;
    },
    { hours: 0, traditional: 0, tokens: 0, agentic: 0, hasUsage: false, anyAssumed: false },
  );
  totals.saving = totals.traditional - totals.agentic;
  totals.savingPct =
    totals.traditional > 0
      ? Math.round((totals.saving / totals.traditional) * 100)
      : 0;
  return totals;
}

function costsHeadlineKpis(totals, money, hrefs) {
  return [
    dashboardStatCell({
      value: `${costsExactFormat().format(totals.hours)} h`,
      label: t('Horas estimadas'),
      href: hrefs.hours,
    }),
    dashboardStatCell({
      value: money.format(totals.traditional),
      label: t('Costo tradicional'),
      href: hrefs.hours,
    }),
    dashboardStatCell({
      value: totals.hasUsage ? costsTokensFormat().format(totals.tokens) : '—',
      label: t('Tokens consumidos'),
      href: hrefs.usage,
    }),
    dashboardStatCell({
      value: totals.hasUsage ? money.format(totals.agentic) : '—',
      label: t('Costo agéntico aprox.'),
      href: hrefs.usage,
    }),
    dashboardStatCell({
      value: totals.hasUsage ? money.format(totals.saving) : '—',
      label: t('Ahorro proyectado'),
      href: hrefs.usage,
      accent: totals.hasUsage && totals.saving > 0,
      sub: totals.hasUsage ? t('{pct}% menos', { pct: totals.savingPct }) : '',
    }),
  ];
}

// ─── General ────────────────────────────────────────────────────────────────

function costsTraditionalVsAgenticCard(rows, fixRows, pricing, money) {
  const bySpec = new Map();
  const bucketFor = (key) => {
    const entry = bySpec.get(key) ?? { traditional: 0, agentic: 0, hasUsage: false };
    bySpec.set(key, entry);
    return entry;
  };
  for (const row of rows) {
    const entry = bucketFor(row.specId);
    entry.traditional += row.traditionalCost;
    entry.agentic += row.agenticCost;
    entry.hasUsage ||= row.usage.hasData;
  }
  for (const fix of fixRows) {
    const entry = bucketFor(fix.specId ?? COSTS_REPO_LEVEL_KEY);
    entry.traditional += fix.traditionalCost;
    entry.agentic += fix.agenticCost;
    entry.hasUsage ||= fix.usage.hasData;
  }
  const labels = [...bySpec.keys()];
  const points = labels.map((key) => {
    const entry = bySpec.get(key);
    const label = key === COSTS_REPO_LEVEL_KEY ? t('Fixes globales') : shortSpecLabel(key);
    return {
      label: label.length > 14 ? `${label.slice(0, 13)}…` : label,
      values: [entry.traditional, entry.agentic],
      tip: `${key === COSTS_REPO_LEVEL_KEY ? t('Fixes globales (sin spec asociada)') : key} — ${t('Tradicional')}: ${money.format(entry.traditional)} · ${t('Agéntico')}: ${entry.hasUsage ? money.format(entry.agentic) : '—'}`,
    };
  });
  // Two measures of the same unit (money) side by side per spec; the gap between them IS
  // the story, so every cap carries its value (an agentic column is often too short to see).
  const body =
    points.length === 0
      ? `<p class="card-hint">${t('Sin datos para graficar todavía.')}</p>`
      : `${vizLegend([
          { label: t('Tradicional'), color: COSTS_SERIES.traditional },
          { label: t('Agéntico'), color: COSTS_SERIES.agentic },
        ])}${vizColumns({
          points,
          series: [
            { label: t('Tradicional'), color: COSTS_SERIES.traditional },
            { label: t('Agéntico'), color: COSTS_SERIES.agentic },
          ],
          format: (value) => money.format(value),
          mode: 'grouped',
          labels: true,
          height: 210,
          xLabelEvery: 1,
        })}`;
  return costsSectionCard({
    title: t('Costo por spec — tradicional vs agéntico'),
    subtitle: t(
      'Estimación tradicional (horas × tarifa) contra el costo aproximado de tokens del modo agéntico. Incluye ciclos y fixes.',
    ),
    body,
  });
}

function costsAgentShareCard(rows, fixRows, pricing, money) {
  const buckets = costsAgentAggregation(rows, fixRows, pricing);
  const segments = buckets.map((bucket) => ({
    label: costsAgentLabel(bucket),
    value: bucket.cost,
    color: vizAgentColor(bucket.agent),
  }));
  return costsSectionCard({
    grid: true,
    title: t('Costo agéntico por agente'),
    subtitle: t('Qué parte del gasto se lleva cada rol SDD.'),
    body: vizShareBar({ segments, format: (value) => money.format(value) }),
  });
}

function costsProviderShareCard(rows, fixRows, pricing) {
  const groups = costsProviderGroups(costsModelAggregation(rows, fixRows, pricing));
  const segments = groups.map((group, index) => ({
    label: providerLabel(group.provider),
    value: group.tokensDisplay,
    color: vizProviderColor(group.provider, index),
  }));
  return costsSectionCard({
    grid: true,
    title: t('Tokens por proveedor'),
    subtitle: t('Reparto de los tokens registrados entre proveedores.'),
    body: vizShareBar({ segments, format: (value) => costsTokensFormat().format(value) }),
  });
}

function costsOriginCard(rows, fixRows) {
  let exact = 0;
  let approx = 0;
  for (const row of [...rows, ...fixRows]) {
    exact += row.usage.exactUnits;
    approx += row.usage.approxUnits;
  }
  return costsSectionCard({
    grid: true,
    title: t('Origen de la telemetría'),
    subtitle: t('Registros leídos de un contador real contra estimaciones declaradas por el agente.'),
    body: vizShareBar({
      segments: [
        { label: t('Exacto'), value: exact, color: COSTS_SERIES.agentic },
        { label: t('Estimado'), value: approx, color: COSTS_SERIES.tokensOut },
      ],
      format: (value) => t('{count} registros', { count: costsExactFormat().format(value) }),
    }),
  });
}

async function renderCostsGeneral(container, data) {
  const { pricing, rows, fixRows, money } = data;
  const totals = costsTotals([...rows, ...fixRows]);
  container.innerHTML = `
    ${costsPageHeader(data, 'general')}
    ${costsKpiRow(costsHeadlineKpis(totals, money, { hours: '#/tasks', usage: '#/costs/specs' }))}
    ${costsTraditionalVsAgenticCard(rows, fixRows, pricing, money)}
    <div class="costs-grid">
      ${costsAgentShareCard(rows, fixRows, pricing, money)}
      ${costsProviderShareCard(rows, fixRows, pricing)}
      ${costsOriginCard(rows, fixRows)}
    </div>
    ${costsAgentsCard(rows, fixRows, pricing, money)}
    ${costsProvidersCard(rows, fixRows, pricing, money)}
    ${costsMethodologyCard(pricing, totals.anyAssumed, money)}
  `;
}

// ─── Specs ──────────────────────────────────────────────────────────────────

function costsSpecComparisonCard(rows, money) {
  const bySpec = new Map();
  for (const row of rows) {
    const entry = bySpec.get(row.specId) ?? { traditional: 0, agentic: 0, hasUsage: false, cycles: 0 };
    entry.traditional += row.traditionalCost;
    entry.agentic += row.agenticCost;
    entry.hasUsage ||= row.usage.hasData;
    entry.cycles += 1;
    bySpec.set(row.specId, entry);
  }
  const max = Math.max(1e-9, ...[...bySpec.values()].flatMap((e) => [e.traditional, e.agentic]));
  const blocks = [...bySpec.entries()]
    .map(
      ([specId, entry]) => `
        <div style="display:grid;gap:2px;margin-bottom:14px">
          <a href="#/cycles" style="font-family:var(--font-mono);font-size:var(--text-12);color:var(--text-strong);text-decoration:none;margin-bottom:2px">${escapeHtml(specId)} <span style="color:var(--text-faint)">· ${escapeHtml(t('{count} ciclo{suffix}', { count: entry.cycles, suffix: entry.cycles === 1 ? '' : 's' }))}</span></a>
          ${costBarRow({
            label: t('Tradicional'),
            valueLabel: money.format(entry.traditional),
            segments: [{ value: entry.traditional, color: COSTS_SERIES.traditional }],
            max,
            tip: `${specId} — ${t('Tradicional')}: ${money.format(entry.traditional)}`,
          })}
          ${costBarRow({
            label: t('Agéntico'),
            valueLabel: entry.hasUsage ? money.format(entry.agentic) : '—',
            segments: [{ value: entry.agentic, color: COSTS_SERIES.agentic }],
            max,
            tip: entry.hasUsage
              ? `${specId} — ${t('Agéntico')}: ${money.format(entry.agentic)}`
              : t('{specId} — sin telemetría de tokens todavía', { specId }),
          })}
        </div>`,
    )
    .join('');
  return costsSectionCard({
    title: t('Costo por spec — solo ciclos'),
    subtitle: t('Horas estimadas de las tasks contra los tokens registrados en cada ciclo de la spec.'),
    body: `${vizLegend([
      { label: t('Tradicional'), color: COSTS_SERIES.traditional },
      { label: t('Agéntico'), color: COSTS_SERIES.agentic },
    ])}${blocks || `<p class="card-hint">${t('Sin datos para graficar todavía.')}</p>`}`,
  });
}

function costsCycleTokensChartCard(rows) {
  const withTokens = rows.filter((row) => row.usage.hasData);
  if (withTokens.length === 0) {
    return costsSectionCard({
      title: t('Tokens por ciclo'),
      body: `<p class="card-hint">${t('Sin telemetría todavía. Se registra al cerrar cada ciclo: <code>cycle.json → metrics.usage</code> (lo hace el sdd-reviewer) o por task en <code>tasks.json → usage</code>.')}</p>`,
    });
  }
  const points = withTokens.map((row) => ({
    label: `${shortSpecLabel(row.specId).slice(0, 10)}·${row.cycleId.replace('cycle-', 'c')}`,
    values: [row.usage.tokensIn, row.usage.tokensOut],
    tip: t('{specId} {cycleId} — entrada: {tokensIn} tokens · salida: {tokensOut} tokens', {
      specId: row.specId,
      cycleId: row.cycleId,
      tokensIn: costsExactFormat().format(row.usage.tokensIn),
      tokensOut: costsExactFormat().format(row.usage.tokensOut),
    }),
  }));
  return costsSectionCard({
    title: t('Tokens por ciclo'),
    subtitle: t('Entrada y salida apiladas por ciclo, en orden de spec.'),
    body: `${vizLegend([
      { label: t('Entrada'), color: COSTS_SERIES.tokensIn },
      { label: t('Salida'), color: COSTS_SERIES.tokensOut },
    ])}${vizColumns({
      points,
      series: [
        { label: t('Entrada'), color: COSTS_SERIES.tokensIn },
        { label: t('Salida'), color: COSTS_SERIES.tokensOut },
      ],
      format: (value) => costsTokensFormat().format(value),
      xLabelEvery: Math.max(1, Math.ceil(points.length / 10)),
    })}`,
  });
}

function costsUnitsTable(units, money, caption) {
  return scrollTable({
    head: `<th>${t('Unidad')}</th><th>${t('Tipo')}</th><th>${t('Módulo')}</th><th style="text-align:right">${t('Horas est.')}</th><th style="text-align:right">${t('Costo trad.')}</th><th style="text-align:right">${t('Tokens in/out')}</th><th style="text-align:right">${t('Tokens')}</th><th>${t('Origen')}</th><th style="text-align:right">${t('Costo agéntico')}</th><th style="text-align:right">${t('Ahorro')}</th>`,
    body: units.map((row) => costsUnitRow(row, money)).join(''),
    rows: units.length,
    caption,
  });
}

async function renderCostsSpecs(container, data) {
  const { rows, money } = data;
  const totals = costsTotals(rows);
  const specCount = new Set(rows.map((row) => row.specId)).size;
  const kpis = [
    dashboardStatCell({ value: String(specCount), label: t('Specs con ciclos'), href: '#/specs' }),
    dashboardStatCell({ value: String(rows.length), label: t('Ciclos'), href: '#/cycles' }),
    ...costsHeadlineKpis(totals, money, { hours: '#/tasks', usage: '#/cycles' }),
  ];
  const empty =
    rows.length === 0
      ? emptyState(
          t('Sin ciclos todavía'),
          t('Cuando el loop SDD complete ciclos con tasks estimadas y telemetría de tokens, el tablero aparece acá.'),
        )
      : '';
  container.innerHTML = `
    ${costsPageHeader(data, 'specs')}
    ${costsKpiRow(kpis)}
    ${empty}
    ${rows.length > 0 ? costsSpecComparisonCard(rows, money) : ''}
    ${rows.length > 0 ? costsCycleTokensChartCard(rows) : ''}
    ${
      rows.length > 0
        ? costsSectionCard({
            title: t('Detalle por ciclo'),
            body: costsUnitsTable(
              rows,
              money,
              t('{count} ciclos. La tabla tiene alto fijo: desplazá dentro de ella.', { count: rows.length }),
            ),
          })
        : ''
    }
  `;
}

// ─── Fixes ──────────────────────────────────────────────────────────────────

const FIX_SEVERITY_ORDER = ['critical', 'high', 'medium', 'low'];
const FIX_SEVERITY_LABELS = { critical: 'Crítica', high: 'Alta', medium: 'Media', low: 'Baja' };

function costsFixesByTypeCard(fixRows, money) {
  const byType = new Map();
  for (const fix of fixRows) {
    const entry = byType.get(fix.type) ?? { traditional: 0, agentic: 0, count: 0 };
    entry.traditional += fix.traditionalCost;
    entry.agentic += fix.agenticCost;
    entry.count += 1;
    byType.set(fix.type, entry);
  }
  const points = [...byType.entries()].map(([type, entry]) => ({
    label: `${type} (${entry.count})`,
    values: [entry.traditional, entry.agentic],
    tip: `${type} (${entry.count}) — ${t('Tradicional')}: ${money.format(entry.traditional)} · ${t('Agéntico')}: ${money.format(entry.agentic)}`,
  }));
  return costsSectionCard({
    title: t('Costo por tipo de fix'),
    subtitle: t('Tradicional contra agéntico, agrupado por HOTFIX / BUGFIX / FIX.'),
    body: `${vizLegend([
      { label: t('Tradicional'), color: COSTS_SERIES.traditional },
      { label: t('Agéntico'), color: COSTS_SERIES.agentic },
    ])}${vizColumns({
      points,
      series: [
        { label: t('Tradicional'), color: COSTS_SERIES.traditional },
        { label: t('Agéntico'), color: COSTS_SERIES.agentic },
      ],
      format: (value) => money.format(value),
      mode: 'grouped',
      labels: true,
      height: 200,
      xLabelEvery: 1,
    })}`,
  });
}

function costsFixesBySeverityCard(fixRows) {
  const counts = new Map();
  for (const fix of fixRows) {
    const key = FIX_SEVERITY_ORDER.includes(fix.severity) ? fix.severity : 'other';
    counts.set(key, (counts.get(key) ?? 0) + 1);
  }
  const rows = [...FIX_SEVERITY_ORDER, 'other']
    .filter((key) => counts.has(key))
    .map((key) => ({
      label: key === 'other' ? t('Sin severidad') : t(FIX_SEVERITY_LABELS[key]),
      value: counts.get(key),
      href: '#/fixes',
    }));
  return costsSectionCard({
    grid: true,
    title: t('Fixes por severidad'),
    subtitle: t('Cuántos fixes entraron por cada nivel.'),
    body: vizBarList({
      rows,
      color: COSTS_SERIES.tokensOut,
      format: (value) => costsExactFormat().format(value),
    }),
  });
}

function costsFixesStatusCard(fixRows) {
  const counts = new Map();
  for (const fix of fixRows) counts.set(fix.status, (counts.get(fix.status) ?? 0) + 1);
  const segments = [...counts.entries()].map(([status, count]) => ({
    label: STATUS_META[status]?.label ? t(STATUS_META[status].label) : status,
    value: count,
    color: vizStatusColor(status),
  }));
  return costsSectionCard({
    grid: true,
    title: t('Fixes por estado'),
    subtitle: t('Pendientes, en curso y cerrados.'),
    body: vizShareBar({ segments, format: (value) => costsExactFormat().format(value) }),
  });
}

function costsFixesTokensCard(fixRows) {
  const withTokens = fixRows.filter((fix) => fix.usage.hasData);
  const rows = withTokens
    .map((fix) => ({
      label: fix.id,
      href: '#/fixes',
      value: fix.usage.tokensDisplay,
      tip: `${fix.id} — ${fix.title} · ${costsExactFormat().format(fix.usage.tokensDisplay)} tokens`,
    }))
    .sort((a, b) => b.value - a.value);
  return costsSectionCard({
    title: t('Tokens por fix'),
    subtitle: t('Los fixes que más tokens consumieron, de mayor a menor.'),
    body:
      rows.length === 0
        ? `<p class="card-hint">${t('Sin telemetría por fix todavía. Se registra en el <code>usage</code> de cada fix al cerrarlo.')}</p>`
        : vizBarList({ rows, color: COSTS_SERIES.agentic, format: (value) => costsTokensFormat().format(value) }),
  });
}

async function renderCostsFixes(container, data) {
  const { fixRows, money } = data;
  const totals = costsTotals(fixRows);
  const open = fixRows.filter((fix) => !['resolved', 'validated', 'absorbed', 'implemented'].includes(fix.status)).length;
  const kpis = [
    dashboardStatCell({ value: String(fixRows.length), label: t('Fixes'), href: '#/fixes' }),
    dashboardStatCell({ value: String(open), label: t('Fixes abiertos'), href: '#/fixes', accent: open === 0 && fixRows.length > 0 }),
    ...costsHeadlineKpis(totals, money, { hours: '#/fixes', usage: '#/fixes' }),
  ];
  const empty =
    fixRows.length === 0
      ? emptyState(
          t('Sin fixes todavía'),
          t('Cuando el FIX GATE registre fixes con horas estimadas y telemetría, el tablero aparece acá.'),
        )
      : '';
  container.innerHTML = `
    ${costsPageHeader(data, 'fixes')}
    ${costsKpiRow(kpis)}
    ${empty}
    ${
      fixRows.length > 0
        ? `${costsFixesByTypeCard(fixRows, money)}
          <div class="costs-grid">
            ${costsFixesBySeverityCard(fixRows)}
            ${costsFixesStatusCard(fixRows)}
          </div>
          ${costsFixesTokensCard(fixRows)}
          ${costsSectionCard({
            title: t('Detalle por fix'),
            body: costsUnitsTable(
              fixRows,
              money,
              t('{count} fixes. La tabla tiene alto fijo: desplazá dentro de ella.', { count: fixRows.length }),
            ),
          })}`
        : ''
    }
  `;
}

// ─── RTK ────────────────────────────────────────────────────────────────────

async function loadRtkGain() {
  if (!isLiveHost()) return { unavailable: 'static' };
  try {
    const response = await fetch(new URL('__rtk', window.location.href).href, {
      cache: 'no-store',
    });
    if (!response.ok) return { unavailable: 'endpoint' };
    return await response.json();
  } catch {
    return { unavailable: 'endpoint' };
  }
}

function rtkDayKey(date) {
  return date.toISOString().slice(0, 10);
}

/** Last N days, oldest first, with rtk's daily rows filled in and missing days at zero. */
function rtkDailySeries(daily, days = 30) {
  const byDate = new Map(daily.map((row) => [row.date, row]));
  const out = [];
  const today = new Date();
  for (let offset = days - 1; offset >= 0; offset--) {
    const date = new Date(today);
    date.setUTCDate(today.getUTCDate() - offset);
    const key = rtkDayKey(date);
    const row = byDate.get(key);
    out.push({
      date: key,
      commands: row?.commands ?? 0,
      input: row?.input_tokens ?? 0,
      output: row?.output_tokens ?? 0,
      saved: row?.saved_tokens ?? 0,
    });
  }
  return out;
}

function rtkShortDay(key) {
  return key.slice(5).replace('-', '/');
}

function rtkStatusBadge(gain) {
  if (!gain.enabled) return badge(t('Apagado'), 'badge--amber');
  if (!gain.binary) return badge(t('Sin binario'), 'badge--rose');
  return badge(t('Activo'), 'badge--emerald');
}

function rtkStatusCard(gain) {
  const rows = [
    [t('Estado'), rtkStatusBadge(gain)],
    [t('Binario'), gain.binary ? `<code>${escapeHtml(gain.binary)}</code> · ${escapeHtml(gain.version ?? '?')}` : `<span style="color:var(--text-faint)">${t('no encontrado')}</span>`],
    [t('Alcance'), `<code>${escapeHtml(gain.scope ?? '')}</code>`],
    [t('Detalle por comando'), gain.history_source === 'sqlite' ? t('leído de la base local de rtk') : t('no disponible en este runtime (Node ≥ 22.5 lo habilita)')],
  ];
  return costsSectionCard({
    title: t('rtk en este repo'),
    subtitle: t(
      'rtk comprime la salida de los comandos de shell antes de que el agente la lea. Viene activo por defecto con el kit; los hooks de Claude Code y Gemini CLI pasan por <code>sdd/scripts/rtk-hook.mjs</code>, y <code>sdd/tools.json</code> es el interruptor.',
    ),
    body: `
      <dl class="rtk-status">${rows
        .map(([label, value]) => `<dt>${escapeHtml(label)}</dt><dd>${value}</dd>`)
        .join('')}</dl>`,
    hint: `${t('Apagar / prender: <code>pnpm sdd:rtk -- --disable</code> · <code>pnpm sdd:rtk -- --enable</code>, o pedírselo al sdd-steward. Estos números viven en la máquina donde corre <code>sdd:docs</code> (rtk guarda su historial por usuario, no en el repo) y son estimaciones: rtk cuenta bytes ÷ 4, no tokens del proveedor.')} <button type="button" class="pill" data-rtk-refresh style="margin-left:8px;padding:2px 10px;font-size:var(--text-11)">${t('Actualizar')}</button>`,
  });
}

function rtkKpis(gain, pricing, money) {
  const summary = gain.summary ?? {};
  const saved = summary.total_saved ?? 0;
  const inputPrice =
    pricing.model_prices_per_mtok[COSTS_ASSUMED_TIER]?.input ??
    COSTS_FALLBACK_PRICING.model_prices_per_mtok[COSTS_ASSUMED_TIER].input;
  const usd = (saved / 1_000_000) * inputPrice;
  return [
    dashboardStatCell({ value: costsExactFormat().format(summary.total_commands ?? 0), label: t('Comandos comprimidos'), href: '#/costs/rtk' }),
    dashboardStatCell({ value: costsTokensFormat().format(summary.total_input ?? 0), label: t('Tokens generados'), href: '#/costs/rtk' }),
    dashboardStatCell({ value: costsTokensFormat().format(summary.total_output ?? 0), label: t('Tokens leídos por el agente'), href: '#/costs/rtk' }),
    dashboardStatCell({
      value: costsTokensFormat().format(saved),
      label: t('Tokens ahorrados'),
      href: '#/costs/rtk',
      accent: saved > 0,
      sub: summary.avg_savings_pct !== undefined ? t('{pct}% promedio', { pct: Math.round(summary.avg_savings_pct) }) : '',
    }),
    dashboardStatCell({
      value: money.format(usd),
      label: t('Equivalente aprox.'),
      href: '#/costs/rtk',
      accent: usd > 0,
      sub: t('a tarifa input de {tier}', { tier: COSTS_ASSUMED_TIER }),
    }),
  ];
}

function rtkDailyCard(series) {
  const points = series.map((day) => ({
    label: rtkShortDay(day.date),
    values: [day.output, day.saved],
    tip: `${day.date} — ${t('{commands} comandos · leídos {read} · ahorrados {saved} ({pct}%)', {
      commands: costsExactFormat().format(day.commands),
      read: costsExactFormat().format(day.output),
      saved: costsExactFormat().format(day.saved),
      pct: day.input > 0 ? Math.round((day.saved / day.input) * 100) : 0,
    })}`,
  }));
  return costsSectionCard({
    title: t('Últimos 30 días — leído vs ahorrado'),
    subtitle: t('Cada columna es la salida completa de los comandos del día: la parte que el agente leyó y la que rtk recortó.'),
    body: `${vizLegend([
      { label: t('Leído por el agente'), color: RTK_SERIES.read },
      { label: t('Ahorrado'), color: RTK_SERIES.saved },
    ])}${vizColumns({
      points,
      series: [
        { label: t('Leído por el agente'), color: RTK_SERIES.read },
        { label: t('Ahorrado'), color: RTK_SERIES.saved },
      ],
      format: (value) => costsTokensFormat().format(value),
      xLabelEvery: 5,
    })}`,
  });
}

function rtkCumulativeCard(series) {
  let running = 0;
  const points = series.map((day) => {
    running += day.saved;
    return {
      label: rtkShortDay(day.date),
      value: running,
      tip: `${day.date} — ${t('acumulado: {saved} tokens ahorrados', { saved: costsExactFormat().format(running) })}`,
    };
  });
  return costsSectionCard({
    grid: true,
    title: t('Ahorro acumulado (30 días)'),
    subtitle: t('Tokens que el agente no tuvo que leer, sumados día a día.'),
    body: vizLine({ points, color: RTK_SERIES.saved, format: (value) => costsTokensFormat().format(value), width: 400 }),
  });
}

function rtkMonthlyCard(monthly) {
  const points = monthly.slice(-12).map((row) => ({
    label: row.month,
    values: [row.output_tokens ?? 0, row.saved_tokens ?? 0],
    tip: `${row.month} — ${t('{commands} comandos · leídos {read} · ahorrados {saved} ({pct}%)', {
      commands: costsExactFormat().format(row.commands ?? 0),
      read: costsExactFormat().format(row.output_tokens ?? 0),
      saved: costsExactFormat().format(row.saved_tokens ?? 0),
      pct: Math.round(row.savings_pct ?? 0),
    })}`,
  }));
  return costsSectionCard({
    grid: true,
    title: t('Por mes'),
    subtitle: t('Mismo desglose, agrupado por mes.'),
    body:
      points.length === 0
        ? `<p class="card-hint">${t('Sin datos para graficar todavía.')}</p>`
        : `${vizLegend([
            { label: t('Leído por el agente'), color: RTK_SERIES.read },
            { label: t('Ahorrado'), color: RTK_SERIES.saved },
          ])}${vizColumns({
            points,
            series: [
              { label: t('Leído por el agente'), color: RTK_SERIES.read },
              { label: t('Ahorrado'), color: RTK_SERIES.saved },
            ],
            format: (value) => costsTokensFormat().format(value),
            height: 170,
            width: 400,
            xLabelEvery: 1,
          })}`,
  });
}

function rtkByCommandCard(byCommand) {
  if (byCommand.length === 0) return '';
  const rows = byCommand.map((row) => ({
    label: row.command,
    value: row.saved_tokens,
    valueLabel: `${costsTokensFormat().format(row.saved_tokens)} · ${Math.round(row.savings_pct)}%`,
    tip: `${row.command} — ${t('{commands} comandos · leídos {read} · ahorrados {saved} ({pct}%)', {
      commands: costsExactFormat().format(row.commands),
      read: costsExactFormat().format(row.output_tokens),
      saved: costsExactFormat().format(row.saved_tokens),
      pct: Math.round(row.savings_pct),
    })}`,
  }));
  const table = scrollTable({
    head: `<th>${t('Comando')}</th><th style="text-align:right">${t('Veces')}</th><th style="text-align:right">${t('Generados')}</th><th style="text-align:right">${t('Leídos')}</th><th style="text-align:right">${t('Ahorrados')}</th><th style="text-align:right">%</th><th style="text-align:right">${t('Tiempo')}</th>`,
    body: byCommand
      .map(
        (row) => `
        <tr>
          <td><code>${escapeHtml(row.command)}</code></td>
          <td style="text-align:right">${costsExactFormat().format(row.commands)}</td>
          <td style="text-align:right">${costsExactFormat().format(row.input_tokens)}</td>
          <td style="text-align:right">${costsExactFormat().format(row.output_tokens)}</td>
          <td style="text-align:right">${costsExactFormat().format(row.saved_tokens)}</td>
          <td style="text-align:right">${Math.round(row.savings_pct)}%</td>
          <td style="text-align:right">${costsExactFormat().format(row.total_time_ms)} ms</td>
        </tr>`,
      )
      .join(''),
    rows: byCommand.length,
    caption: t('{count} familias de comando. La tabla tiene alto fijo: desplazá dentro de ella.', { count: byCommand.length }),
  });
  return costsSectionCard({
    title: t('Ahorro por comando'),
    subtitle: t('Qué comandos recortan más. Agrupados por familia (<code>git status</code>, <code>pnpm test</code>, …).'),
    body: `${vizBarList({ rows, color: RTK_SERIES.saved, format: (value) => costsTokensFormat().format(value) })}<div style="height:16px"></div>${table}`,
  });
}

function rtkRecentCard(recent) {
  if (recent.length === 0) return '';
  const body = recent
    .map(
      (row) => `
      <tr>
        <td style="color:var(--text-faint)">${escapeHtml(String(row.at ?? '').replace('T', ' ').slice(0, 16))}</td>
        <td><code>${escapeHtml(row.command)}</code></td>
        <td style="text-align:right">${costsExactFormat().format(row.input_tokens)}</td>
        <td style="text-align:right">${costsExactFormat().format(row.output_tokens)}</td>
        <td style="text-align:right">${costsExactFormat().format(row.saved_tokens)}</td>
        <td style="text-align:right">${Math.round(row.savings_pct)}%</td>
      </tr>`,
    )
    .join('');
  return costsSectionCard({
    title: t('Últimos comandos'),
    body: scrollTable({
      head: `<th>${t('Cuándo')}</th><th>${t('Comando')}</th><th style="text-align:right">${t('Generados')}</th><th style="text-align:right">${t('Leídos')}</th><th style="text-align:right">${t('Ahorrados')}</th><th style="text-align:right">%</th>`,
      body,
      rows: recent.length,
      caption: t('Los {count} más recientes en este repo.', { count: recent.length }),
    }),
  });
}

function rtkUnavailable(gain) {
  if (gain.unavailable === 'static') {
    return emptyState(
      t('Solo con el servidor local'),
      t('La ganancia de rtk se lee de la máquina que corre pnpm sdd:docs; en hosting estático no está disponible.'),
    );
  }
  if (gain.unavailable === 'endpoint') {
    return emptyState(
      t('El servidor no respondió'),
      t('Reiniciá pnpm sdd:docs para tomar la versión nueva del visor.'),
    );
  }
  if (!gain.binary) {
    return `${rtkStatusCard(gain)}${emptyState(
      t('rtk no está instalado en esta máquina'),
      t('Corré pnpm sdd:rtk para instalarlo (descarga el binario oficial con checksum verificado). Si la red lo bloquea: curl -fsSL https://raw.githubusercontent.com/rtk-ai/rtk/refs/heads/master/install.sh | sh'),
    )}`;
  }
  return null;
}

async function renderCostsRtk(container, data) {
  const { pricing, money } = data;
  const gain = await loadRtkGain();
  const blocked = rtkUnavailable(gain);
  if (blocked) {
    container.innerHTML = `${costsPageHeader(data, 'rtk')}${blocked}`;
    bindRtkRefresh(container);
    return;
  }
  const series = rtkDailySeries(gain.daily ?? []);
  const hasData = (gain.summary?.total_commands ?? 0) > 0;
  container.innerHTML = `
    ${costsPageHeader(data, 'rtk')}
    ${costsKpiRow(rtkKpis(gain, pricing, money))}
    ${rtkStatusCard(gain)}
    ${
      hasData
        ? `${rtkDailyCard(series)}
           <div class="costs-grid">
             ${rtkCumulativeCard(series)}
             ${rtkMonthlyCard(gain.monthly ?? [])}
           </div>
           ${rtkByCommandCard(gain.by_command ?? [])}
           ${rtkRecentCard(gain.recent ?? [])}`
        : emptyState(
            t('Todavía sin comandos comprimidos en este repo'),
            gain.enabled
              ? t('Apenas un agente corra comandos de shell con el hook activo, el ahorro aparece acá.')
              : t('rtk está apagado en sdd/tools.json. Prendelo con pnpm sdd:rtk -- --enable.'),
          )
    }
  `;
  bindRtkRefresh(container);
}

function bindRtkRefresh(container) {
  container.querySelector('[data-rtk-refresh]')?.addEventListener('click', () => {
    liveRefreshActiveView();
  });
}

// ─── Page ───────────────────────────────────────────────────────────────────

function costsPageHeader(data, tab) {
  const { rows, fixRows } = data;
  return `
    ${pageHeader({
      title: t('Costos'),
      meta:
        fixRows.length > 0
          ? t('{cycles} ciclos · {fixes} fixes', { cycles: rows.length, fixes: fixRows.length })
          : t('{cycles} ciclos', { cycles: rows.length }),
      subtitle: t(
        'Tokens, tiempos y comparativa de costos del modo agéntico contra la estimación tradicional de las tasks.',
      ),
    })}
    ${costsTabBar(tab)}`;
}

const COSTS_TAB_RENDERERS = {
  general: renderCostsGeneral,
  specs: renderCostsSpecs,
  fixes: renderCostsFixes,
  rtk: renderCostsRtk,
};

async function renderCosts(container, params = []) {
  const tab = COSTS_TAB_RENDERERS[params[0]] ? params[0] : COSTS_DEFAULT_TAB;
  const loaded = await loadCostsData();
  const data = {
    ...loaded,
    money: costsMoneyFormatter(loaded.pricing.currency ?? 'USD'),
  };

  if (tab === 'general' && data.rows.length === 0 && data.fixRows.length === 0) {
    container.innerHTML = `
      ${costsPageHeader(data, tab)}
      ${emptyState(
        t('Sin ciclos todavía'),
        t('Cuando el loop SDD complete ciclos con tasks estimadas y telemetría de tokens, el tablero aparece acá. La pestaña RTK ya muestra el ahorro de tokens en comandos.'),
      )}`;
    return;
  }

  await COSTS_TAB_RENDERERS[tab](container, data);
  fitVizCharts(container);
  attachCostsTooltip(container);
}

async function renderNotFound(container, params) {
  container.innerHTML = emptyState(
    t('Vista no encontrada'),
    t('El hash no coincide con ninguna vista disponible.'),
  );
}

const MEMORY_DISTILLATION_THRESHOLD = 5;
const MEMORY_LESSONS_LINE_CAP = 120;

// El nombre del journal es YYYY-MM-DD-<origen>.md: la fecha va al frente por diseño,
// así el orden alfabético descendente ya es cronológico inverso.
function memoryEntryMeta(file) {
  const match = /^(\d{4}-\d{2}-\d{2})-(.+)\.md$/.exec(file);
  if (!match) return { date: null, label: file.replace(/\.md$/, ''), kind: 'otro' };
  const origin = match[2];
  return {
    date: match[1],
    label: origin,
    kind: origin.startsWith('fix-') ? 'fix' : 'ciclo',
  };
}

async function renderMemory(container) {
  let manifest = null;
  try {
    manifest = await loadManifest();
  } catch {}
  const journalFiles = (manifest?.memory ?? []).map((entry) => entry.file);

  const lessonsSource = await fetchText('memory/lessons.md').catch(() => null);
  const lessonsHtml = lessonsSource
    ? renderMarkdown(lessonsSource, { imageBase: sddUrl('memory/') })
    : null;
  const lessonsLines = lessonsSource
    ? lessonsSource.split('\n').filter((line) => line.trim().length > 0).length
    : 0;

  if (!lessonsHtml && journalFiles.length === 0) {
    container.innerHTML = `
      ${pageHeader({ title: t('Memoria'), subtitle: t('Lo aprendido en un ciclo no se vuelve a pagar en el siguiente.') })}
      ${emptyState(
        t('Sin memoria registrada todavía'),
        t('El MEMORIA GATE escribe una entrada en memory/journal/ cuando un ciclo deja una lección real — un supuesto que falló, un descubrimiento costoso, un gasto de tokens evitable. Con ≥5 entradas el orquestador las destila en memory/lessons.md.'),
      )}
    `;
    return;
  }

  const entries = await Promise.all(
    journalFiles.map(async (file) => {
      const html = await loadMarkdown(`memory/journal/${file}`).catch(() => null);
      return { file, html, ...memoryEntryMeta(file) };
    }),
  );

  const newest = entries.find((entry) => entry.date)?.date ?? null;
  const dueDistillation = entries.length >= MEMORY_DISTILLATION_THRESHOLD;
  const overCap = lessonsLines > MEMORY_LESSONS_LINE_CAP;

  const kpis = `
    <div class="card-grid" style="margin-bottom:16px">
      ${card({ title: t('Lecciones destiladas'), value: lessonsHtml ? String(lessonsLines) : '—', hint: t('líneas en lessons.md · cap {cap}', { cap: MEMORY_LESSONS_LINE_CAP }) })}
      ${card({ title: t('Entradas del journal'), value: String(entries.length), hint: t('umbral de destilación: {n}', { n: MEMORY_DISTILLATION_THRESHOLD }) })}
      ${card({ title: t('Última entrada'), value: newest ?? '—', hint: t('memory/journal/') })}
    </div>`;

  const notices = [
    dueDistillation
      ? `<p class="memory-notice">${escapeHtml(t('{n} entradas acumuladas (≥{cap}): el orquestador las destila en lessons.md al iniciar el próximo ciclo y borra lo destilado.', { n: entries.length, cap: MEMORY_DISTILLATION_THRESHOLD }))}</p>`
      : '',
    overCap
      ? `<p class="memory-notice">${escapeHtml(t('lessons.md pasó las {cap} líneas: toca podar lo que ya no aplica.', { cap: MEMORY_LESSONS_LINE_CAP }))}</p>`
      : '',
  ].filter(Boolean).join('');

  const lessonsCard = `
    <section class="card" style="margin-bottom:16px">
      <div class="card-header">
        <span class="card-title">${t('Lecciones destiladas')}</span>
        <span class="card-hint" style="margin:0;font-family:var(--font-mono)">memory/lessons.md</span>
      </div>
      <p class="card-subtitle">${t('Una línea por lección. Se lee al iniciar cada sesión — por eso tiene tope: lo que no se aplica más, se poda.')}</p>
      ${notices}
      ${lessonsHtml ? `<div class="markdown markdown--compact">${lessonsHtml}</div>` : emptyState(t('Todavía no hay lecciones destiladas'), t('Se escriben cuando el journal acumula ≥{n} entradas.', { n: MEMORY_DISTILLATION_THRESHOLD }))}
    </section>`;

  const journalCard = entries.length === 0
    ? ''
    : `
    <section class="card">
      <div class="card-header">
        <span class="card-title">${t('Journal episódico')}</span>
        <span class="card-hint" style="margin:0;font-family:var(--font-mono)">memory/journal/</span>
      </div>
      <p class="card-subtitle">${t('Qué pasó, qué lección dejó y qué costo era evitable — una entrada por ciclo o fix que enseñó algo. Más reciente primero.')}</p>
      <div style="display:flex;flex-direction:column;gap:8px;margin-top:12px">
        ${entries.map((entry, index) => {
          const contentId = `memory-entry-${index}`;
          const open = index === 0;
          return `
            <div style="border-radius:var(--radius-lg);border:1px solid rgb(var(--rgb-zinc-800) / 0.4);overflow:hidden">
              <button type="button" data-toggle="${contentId}" aria-expanded="${open}" aria-controls="${contentId}" style="all:unset;box-sizing:border-box;cursor:pointer;display:flex;align-items:center;gap:12px;width:100%;padding:10px 14px;background:rgb(var(--rgb-zinc-900) / 0.3)">
                <span data-chevron style="display:inline-flex;transition:transform 0.2s;transform:rotate(${open ? 0 : -90}deg);color:var(--text-faint)">
                  <svg viewBox="0 0 10 6" width="10" height="6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 1l4 4 4-4"></path></svg>
                </span>
                <span style="font-family:var(--font-mono);font-size:var(--text-12);color:var(--text-dim);flex-shrink:0">${escapeHtml(entry.date ?? '—')}</span>
                <span style="flex:1;min-width:0;font-size:var(--text-13);color:var(--text-bright);overflow:hidden;text-overflow:ellipsis;white-space:nowrap">${escapeHtml(entry.label)}</span>
                ${badge(entry.kind === 'fix' ? 'fix' : 'ciclo', entry.kind === 'fix' ? 'status--absorbed' : 'status--done')}
              </button>
              <div id="${contentId}" ${open ? '' : 'hidden'} style="padding:14px">
                ${entry.html ? `<div class="markdown markdown--compact">${entry.html}</div>` : errorState(new Error(t('No se pudo cargar {file}', { file: entry.file })))}
              </div>
            </div>`;
        }).join('')}
      </div>
    </section>`;

  container.innerHTML = `
    ${pageHeader({
      title: t('Memoria'),
      meta: t('{lessons} líneas · {entries} entrada{suffix}', { lessons: lessonsLines, entries: entries.length, suffix: entries.length === 1 ? '' : 's' }),
      subtitle: t('Lo aprendido en un ciclo no se vuelve a pagar en el siguiente. Lo escribe el MEMORIA GATE al cerrar; el orquestador lo destila al abrir el próximo.'),
    })}
    ${kpis}
    ${lessonsCard}
    ${journalCard}
  `;

  bindPlanningInteractions(container);
}

const VIEWS = {
  dashboard: {
    label: 'Dashboard',
    section: 'Visión general',
    icon: 'dashboard',
    render: renderDashboard,
    loading: dashboardLoadingSkeleton,
    deps: ['global', 'specs', 'tasks', 'fixes', 'context', 'arch'],
  },
  planning: {
    label: 'Planificación',
    section: 'Visión general',
    icon: 'planning',
    render: renderPlanning,
    deps: ['global', 'specs', 'tasks'],
  },
  costs: {
    label: 'Costos',
    section: 'Visión general',
    icon: 'costs',
    render: renderCosts,
    loading: dashboardLoadingSkeleton,
    deps: ['specs', 'tasks', 'fixes', 'pricing'],
  },
  specs: {
    label: 'Specs', section: 'SDD', icon: 'file', render: renderSpecs,
    deps: ['specs', 'global', 'tasks'],
  },
  cycles: {
    label: 'Ciclos',
    section: 'SDD',
    icon: 'cycle',
    render: renderCycles,
    deps: ['specs', 'tasks', 'global'],
  },
  tasks: {
    label: 'Tareas', section: 'SDD', icon: 'task', render: renderTasks,
    deps: ['specs', 'tasks'],
  },
  fixes: {
    label: 'Fixes', section: 'SDD', icon: 'fix', render: renderFixes,
    deps: ['fixes', 'specs'],
  },
  context: {
    label: 'Contexto',
    section: 'SDD',
    icon: 'context',
    render: renderContext,
    deps: ['context', 'global'],
  },
  agents: {
    label: 'Agentes',
    section: 'Herramientas SDD',
    icon: 'agent',
    render: renderAgents,
    deps: ['agents', 'catalog'],
  },
  skills: {
    label: 'Skills',
    section: 'Herramientas SDD',
    icon: 'skill',
    render: renderSkills,
    deps: ['skills', 'catalog'],
  },
  prompts: {
    label: 'Prompts',
    section: 'Herramientas SDD',
    icon: 'prompt',
    render: renderPrompts,
    deps: ['prompts', 'catalog'],
  },
  schema: {
    label: 'Schema',
    section: 'Arquitectura',
    icon: 'database',
    render: renderSchema,
    deps: ['arch', 'global'],
  },
  api: {
    label: 'API',
    section: 'Arquitectura',
    icon: 'api',
    render: renderApi,
    deps: ['arch', 'global'],
  },
  components: {
    label: 'Componentes',
    section: 'Arquitectura',
    icon: 'components',
    render: renderComponents,
    deps: ['arch', 'global'],
  },
  schemas: {
    label: 'Schemas JSON',
    section: 'Arquitectura',
    icon: 'schemaFix',
    render: renderSchemas,
    deps: ['schemas', 'catalog'],
  },
  memory: {
    label: 'Memoria',
    section: 'SDD',
    icon: 'memory',
    render: renderMemory,
    deps: ['memory', 'catalog'],
  },
  help: {
    label: 'Documentación SDD',
    section: 'Ayuda',
    icon: 'help',
    render: renderHelp,
    deps: ['meta'],
  },
};

const DEFAULT_VIEW = 'dashboard';

let mountToken = 0;
let activeViewKey = DEFAULT_VIEW;
const navPinned = new Set(['Visión general', 'SDD']);

function parseHash(hash) {
  const raw = hash.replace(/^#/, '');
  const segments = raw
    .split('/')
    .filter((segment) => segment.length > 0)
    .map((segment) => decodeURIComponent(segment));
  const [view = DEFAULT_VIEW, ...params] = segments;
  if (!(view in VIEWS)) return { view: 'notFound', params: [] };
  return { view, params };
}

function navItemHtml(key, meta) {
  return `
    <li class="nav-item">
      <span class="nav-bar"></span>
      <a class="nav-link" href="#/${key}" data-view="${key}">
        <span class="nav-icon">${icon(meta.icon)}</span>
        ${escapeHtml(t(meta.label))}
      </a>
    </li>
  `;
}

function navSectionHtml(section, entries) {
  const expanded = navPinned.has(section);
  const items = entries.map(([key, meta]) => navItemHtml(key, meta)).join('');
  return `
    <div class="nav-section">
      <button
        type="button"
        class="nav-section-toggle"
        data-nav-section="${escapeHtml(section)}"
        aria-expanded="${expanded}"
      >
        <span class="nav-section-title">${escapeHtml(t(section))}</span>
        <svg class="nav-section-chevron" viewBox="0 0 12 12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <polyline points="4,2 8,6 4,10" />
        </svg>
      </button>
      <div class="nav-list-collapse${expanded ? ' is-expanded' : ''}" data-nav-collapse>
        <ul class="nav-list">${items}</ul>
      </div>
    </div>
  `;
}

function buildNav() {
  const container = document.getElementById('nav-sections');
  const groups = groupBy(Object.entries(VIEWS), ([, meta]) => meta.section);
  container.innerHTML = [...groups.entries()]
    .map(([section, entries]) => navSectionHtml(section, entries))
    .join('');
}

function sectionHasView(section, currentView) {
  const meta = VIEWS[currentView];
  return meta?.section === section;
}

function syncNavSections(currentView) {
  const container = document.getElementById('nav-sections');
  for (const toggle of container.querySelectorAll('[data-nav-section]')) {
    const section = toggle.dataset.navSection;
    const expanded =
      navPinned.has(section) || sectionHasView(section, currentView);
    toggle.setAttribute('aria-expanded', String(expanded));
    const collapse = toggle.nextElementSibling;
    if (!collapse) continue;
    collapse.classList.toggle('is-expanded', expanded);
    for (const link of collapse.querySelectorAll('.nav-link')) {
      link.tabIndex = expanded ? 0 : -1;
    }
  }
}

function toggleNavSection(section) {
  if (navPinned.has(section) && !sectionHasView(section, activeViewKey)) {
    navPinned.delete(section);
  } else if (navPinned.has(section)) {
    navPinned.delete(section);
  } else {
    navPinned.add(section);
  }
  syncNavSections(activeViewKey);
}

function updateActiveNavLink(view) {
  const links = document.querySelectorAll('#nav-sections .nav-link');
  for (const link of links) {
    const active = link.dataset.view === view;
    link.classList.toggle('nav-link--active', active);
    link.closest('.nav-item')?.classList.toggle('nav-item--active', active);
  }
  activeViewKey = view;
  syncNavSections(view);
}

function setViewTitle(label) {
  document.title = `${label} · SDD Docs`;
}

function openSidebar() {
  document.getElementById('nav').classList.add('sidebar--open');
  document.getElementById('sidebar-backdrop').hidden = false;
  document.getElementById('menu-button').setAttribute('aria-expanded', 'true');
}

function closeSidebar() {
  document.getElementById('nav').classList.remove('sidebar--open');
  document.getElementById('sidebar-backdrop').hidden = true;
  document.getElementById('menu-button').setAttribute('aria-expanded', 'false');
}

function isLiveHost() {
  return location.hostname === '127.0.0.1' || location.hostname === 'localhost';
}

async function paintShellChrome() {
  const brandEl = document.getElementById('brand-project');
  const liveEl = document.getElementById('live-indicator');
  if (!brandEl && !liveEl) return;
  let project = 'SDD Docs';
  let version = '—';
  try {
    const global = await loadGlobal();
    project = global.project ?? project;
    version = global.version ?? version;
  } catch {}
  if (brandEl) brandEl.textContent = project;
  if (liveEl) {
    const updatedAt = lastLoadedAt
      ? lastLoadedAt.toLocaleTimeString(localeTag(), {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      : null;
    liveEl.innerHTML = liveIndicator({
      live: isLiveHost(),
      project,
      version,
      updatedAt,
    });
  }
}

async function mountView(view, params) {
  const token = ++mountToken;
  const meta = VIEWS[view];
  const label = view === 'notFound' ? t('No encontrada') : t(meta.label);
  setViewTitle(label);
  updateActiveNavLink(view);
  const viewport = document.getElementById('view');
  viewport.innerHTML = meta?.loading ? meta.loading() : skeletonRows(4);
  const container = document.createElement('div');
  container.className = 'view-page animate-fade-in-up';
  try {
    if (view === 'notFound') {
      await renderNotFound(container, params);
    } else {
      await meta.render(container, params);
    }
    if (token !== mountToken) return;
    viewport.replaceChildren(container);
    fitVizCharts();
  } catch (error) {
    if (token !== mountToken) return;
    viewport.innerHTML = errorState(error);
  }
  paintShellChrome();
}

function onRoute() {
  closeModal();
  const { view, params } = parseHash(window.location.hash);
  mountView(view, params);
  closeSidebar();
}

function scrollToMarkdownAnchor(event) {
  const link = event.target.closest('.markdown a[href^="#"]');
  if (!link) return;
  const anchor = decodeURIComponent(link.getAttribute('href').slice(1));
  if (anchor.startsWith('/')) return;
  event.preventDefault();
  const scope = link.closest('.modal-body') ?? document.getElementById('view');
  const target = scope?.querySelector(`[id="${CSS.escape(anchor)}"]`);
  target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

const LIVE_SYNC_INTERVAL_MS = 4000;
const LIVE_SYNC_MAX_FAILURES = 3;

function captureViewUiState() {
  const view = document.getElementById('view');
  if (!view) return null;
  const expanded = [];
  for (const toggle of view.querySelectorAll('[data-toggle][aria-expanded]')) {
    expanded.push([
      toggle.dataset.toggle,
      toggle.getAttribute('aria-expanded') === 'true',
    ]);
  }
  const tabs = [];
  for (const tab of view.querySelectorAll(
    '[data-help-tab][aria-selected="true"]',
  )) {
    tabs.push(tab.dataset.helpTab);
  }
  const inputs = [];
  view.querySelectorAll('input').forEach((el, index) => {
    if (el.value) inputs.push([index, el.value]);
  });
  return {
    expanded,
    tabs,
    inputs,
    scrollTop: document.scrollingElement?.scrollTop ?? 0,
  };
}

function restoreViewUiState(state) {
  if (!state) return;
  const view = document.getElementById('view');
  if (!view) return;
  for (const [key, wasExpanded] of state.expanded) {
    const toggle = view.querySelector(`[data-toggle="${CSS.escape(key)}"]`);
    if (!toggle) continue;
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    if (isExpanded !== wasExpanded) toggle.click();
  }
  for (const tabId of state.tabs) {
    const tab = view.querySelector(`[data-help-tab="${CSS.escape(tabId)}"]`);
    if (tab && tab.getAttribute('aria-selected') !== 'true') tab.click();
  }
  const inputEls = view.querySelectorAll('input');
  for (const [index, value] of state.inputs) {
    const el = inputEls[index];
    if (el && el.value !== value) {
      el.value = value;
      el.dispatchEvent(new Event('input', { bubbles: true }));
    }
  }
  if (document.scrollingElement) {
    document.scrollingElement.scrollTop = state.scrollTop;
  }
}

function viewDependsOn(viewKey, changedAreas) {
  const deps = VIEWS[viewKey]?.deps;
  if (!deps) return true;
  return deps.some((area) => changedAreas.has(area));
}

async function liveRefreshActiveView() {
  const { view, params } = parseHash(window.location.hash);
  const uiState = captureViewUiState();
  await mountView(view, params);
  restoreViewUiState(uiState);
}

function diffStateAreas(previous, next) {
  const changed = new Set();
  for (const [area, hash] of Object.entries(next)) {
    if (previous[area] !== hash) changed.add(area);
  }
  for (const area of Object.keys(previous)) {
    if (!(area in next)) changed.add(area);
  }
  return changed;
}

function startLiveSync() {
  if (!isLiveHost()) return;
  const stateUrl = new URL('__state', window.location.href).href;
  let knownAreas = null;
  let failures = 0;
  let timer = null;

  const tick = async () => {
    if (document.visibilityState !== 'visible') return;
    if (activeModal) return;
    try {
      const response = await fetch(stateUrl, { cache: 'no-store' });
      if (!response.ok) throw new Error(String(response.status));
      const state = await response.json();
      failures = 0;
      const nextAreas = state.areas ?? { all: state.fingerprint };
      if (knownAreas === null) {
        knownAreas = nextAreas;
        return;
      }
      const changed = diffStateAreas(knownAreas, nextAreas);
      if (changed.size === 0) return;
      knownAreas = nextAreas;
      invalidateCache();
      const { view } = parseHash(window.location.hash);
      if (changed.has('all') || viewDependsOn(view, changed)) {
        await liveRefreshActiveView();
      } else if (changed.has('global') || changed.has('meta')) {
        paintShellChrome();
      }
    } catch {
      failures++;
      if (failures >= LIVE_SYNC_MAX_FAILURES && timer) {
        clearInterval(timer);
        timer = null;
      }
    }
  };

  timer = setInterval(tick, LIVE_SYNC_INTERVAL_MS);
  tick();
}

function bootstrap() {
  document.documentElement.lang = currentLang;
  paintLangToggle();
  paintStaticChrome();
  for (const button of document.querySelectorAll('.lang-toggle')) {
    button.addEventListener('click', () => {
      setLang(currentLang === 'es' ? 'en' : 'es');
    });
  }
  buildNav();
  startLiveSync();
  document.addEventListener('click', scrollToMarkdownAnchor);
  document.getElementById('menu-button').addEventListener('click', openSidebar);
  document
    .getElementById('sidebar-close')
    .addEventListener('click', closeSidebar);
  document
    .getElementById('sidebar-backdrop')
    .addEventListener('click', closeSidebar);
  document.getElementById('nav-sections').addEventListener('click', (event) => {
    const toggle = event.target.closest('[data-nav-section]');
    if (!toggle) return;
    toggleNavSection(toggle.dataset.navSection);
  });
  window.addEventListener('hashchange', onRoute);
  paintShellChrome();
  onRoute();
}

bootstrap();
