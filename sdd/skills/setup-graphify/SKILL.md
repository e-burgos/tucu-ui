---
name: setup-graphify
description: Instala y configura graphify (grafo de conocimiento del repo) para un dev que lo quiera usar. Elige un backend gratuito, valida el modelo con una medición real y construye el primer grafo. Invocar solo si el dev pide habilitar graphify.
---

# Skill: setup-graphify

Guía para dejarle a un dev el grafo de conocimiento del repo andando, con un backend
**gratuito**. graphify es **opt-in**: nada del flujo SDD depende de él, y `graphify-out/`
está gitignoreado, así que cada dev lo instala en su máquina si quiere.

## Cuándo invocar

Solo cuando el dev pide habilitar graphify, o cuando pregunta cómo usarlo y no lo tiene
instalado. **No lo instales por iniciativa propia**: consume cupo de API del dev y
requiere una key que solo él puede dar.

## Qué le da al dev

Consultas acotadas sobre el repo en vez de `grep`/`Read` a ciegas — devuelven la
respuesta citando `source_file`/`source_location`:

| Comando                        | Para qué                                                          |
| ------------------------------ | ----------------------------------------------------------------- |
| `graphify query "<pregunta>"`  | Arquitectura, dependencias, flujos. `--budget N` acota la salida. |
| `graphify explain "<nodo>"`    | Un archivo, clase o concepto **antes de tocarlo**.                |
| `graphify path "<A>" "<B>"`    | Camino más corto entre dos partes lejanas del sistema.            |
| `graphify affected "<nodo>"`   | Traversal inverso: qué se impacta si cambiás ese nodo.            |
| `graphify-out/GRAPH_REPORT.md` | God Nodes, hyperedges y comunidades etiquetadas.                  |

## Paso 1 — Instalar

```bash
uv tool install --upgrade 'graphifyy[gemini]'   # o [ollama] según el paso 2
graphify --help | head -5
```

Si no hay `uv`, servir con `pip install 'graphifyy[gemini]'`. Guardá el intérprete real
para los pasos siguientes: `uv tool run graphifyy python -c "import sys; print(sys.executable)"`.

> El extra `[gemini]` instala `openai` + `tiktoken`, **no** `google-genai`: graphify habla
> con Gemini por su API compatible-OpenAI. Si buscás `google.genai` y no está, es normal.

## Paso 2 — Elegir backend gratuito

Preguntale al dev cuál prefiere. Los dos son gratis; el trade-off es distinto:

| Backend              | Key                   | Costo                  | Contra                                                                       |
| -------------------- | --------------------- | ---------------------- | ---------------------------------------------------------------------------- |
| **Gemini free tier** | sí (`GEMINI_API_KEY`) | gratis con cupo diario | el cupo se agota y resetea 00:00 UTC                                         |
| **Ollama local**     | no                    | gratis e ilimitado     | corre en la máquina del dev; más lento y la calidad depende del modelo local |

Para Gemini, la key se saca de Google AI Studio. **Nunca le pidas la key por chat ni la
escribas en un archivo versionado**: que la ponga él en el `.env` del root, que ya está
gitignoreado. Para Ollama, alcanza con tenerlo corriendo (`ollama serve`) y
`OLLAMA_HOST` si no usa el puerto default.

## Paso 3 — Configurar el `.env` del root

```
GEMINI_API_KEY=...            # la pone el dev, no vos
GRAPHIFY_GEMINI_MODEL=gemini-3.1-flash-lite
```

Verificá que la key llegó **sin imprimir su valor**:

```bash
set -a && source .env && set +a
python3 -c "import os; print('key presente:', bool(os.environ.get('GEMINI_API_KEY')))"
```

> [!WARNING]
> **graphify no lee el `.env`.** Solo mira variables ya exportadas en el entorno
> (`graphify/llm.py` → `env_keys: ["GEMINI_API_KEY", "GOOGLE_API_KEY"]`). Y como las
> líneas del `.env` son asignaciones planas sin `export`, **`source .env` a secas no
> alcanza**: la variable queda en el shell pero no se hereda al proceso hijo. Usar
> siempre `set -a && source .env && set +a`.
>
> Si la key no llega, graphify **no falla con error**: cae en silencio al fan-out de
> subagentes del harness — es decir, se paga el modelo caro justo cuando el dev cree
> estar usando el gratuito. Verificá siempre el paso 4 antes de lanzar el build completo.

## Paso 4 — Validar el modelo con una medición real (no lo saltees)

Los modelos "lite" **degradan el grafo en silencio**: devuelven pocos nodos y cero edges
sin dar ningún error. Medí sobre 2 archivos antes de construir todo:

```bash
set -a && source .env && set +a
"$INTERPRETE" - <<'PY'
from graphify import llm
r = llm.extract_corpus_parallel(["<archivo1.md>", "<archivo2.md>"], backend="gemini")
print(len(r.get("nodes", [])), "nodos /", len(r.get("edges", [])), "edges")
PY
```

Referencia medida en este repo (2026-08), sobre el mismo par de archivos:

| Modelo                     | Resultado                | Veredicto                                             |
| -------------------------- | ------------------------ | ----------------------------------------------------- |
| `gemini-3.1-flash-lite`    | 11 nodos / 7 edges       | ✅ igual que el preview pago                          |
| `gemini-3-flash-preview`   | 10 nodos / 7 edges       | funciona pero es **pago** (es el default de graphify) |
| `gemini-3.5-flash-lite`    | 2 nodos / **0 edges**    | ❌ grafo vacío, sin error                             |
| `gemini-flash-lite-latest` | 2 nodos / **0 edges**    | ❌ ídem                                               |
| `gemini-2.x`               | `429 RESOURCE_EXHAUSTED` | ❌                                                    |
| `gemini-2.5-flash*`        | `404`                    | ❌ cerrado a cuentas nuevas                           |

**Criterio de aceptación: más de 0 edges.** Un grafo sin edges no sirve para nada — las
consultas de dependencias y flujos dependen de ellos. Si el modelo elegido da 0 edges,
probá otro de la lista antes de seguir. Si ninguno funciona, avisale al dev y pará; **no
escales a un modelo pago ni al fan-out de subagentes sin su autorización explícita**.

## Paso 5 — Construir el primer grafo

Invocá la skill `graphify` sobre el root del repo. En un repo grande la extracción
semántica va en tandas; si el modelo devuelve chunks vacíos, **bajá el `chunk_size`**: con
`flash-lite` la cobertura sube mucho de 12 archivos por request a 1–2, porque el modelo se
pierde con muchos archivos a la vez.

Los documentos muy grandes (más de ~15 KB) pueden resistirse al `flash-lite` incluso de a
uno. Es aceptable dejarlos afuera: reportale al dev cuáles quedaron sin indexar en vez de
escalar de modelo por tu cuenta.

## Paso 6 — Verificar que sirve

```bash
graphify query "<pregunta real sobre el repo>" --budget 700
```

Tiene que devolver nodos citando `source_file`. Si devuelve ruido o nada, revisá el paso 4.

## Mantenimiento

El grafo se desactualiza y entonces **miente** (archivos movidos, símbolos nuevos, docs
reescritas). Actualizarlo al cerrar cada unidad de trabajo — task/ciclo SDD, fix, o antes
de cerrar un PR — **no** después de cada edición individual.

```bash
set -a && source .env && set +a
graphify check-update .           # ¿hay re-extracción semántica pendiente?
graphify update .                 # solo código (AST): gratis, sin LLM
graphify cluster-only . --no-viz  # o `graphify label .` → re-etiquetar comunidades
```

Si lo que cambió es **documentación o `sdd/`** (no código), el `update` de AST no alcanza:
hay que correr la re-extracción semántica con la skill `graphify` y `--update`, que sí
consume LLM.

## Desinstalar

`graphify uninstall --purge` borra la config y `graphify-out/`. Como está gitignoreado, no
deja rastro en el repo: el dev puede irse sin afectar a nadie.
