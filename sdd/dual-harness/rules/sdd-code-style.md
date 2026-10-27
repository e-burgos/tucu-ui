---
trigger: always_on
description: Código sin comentarios - la documentación vive en los documentos SDD, no en el código
---

# ✍️ Código sin comentarios (OBLIGATORIO)

No escribir comentarios en el código de implementación. La documentación vive en los
documentos SDD (spec, functional, planner, architect, constitutions), no en
comentarios que se desactualizan y cuestan tokens en cada lectura.

Cómo lograrlo sin perder claridad:

- **Nombres declarativos**: `propagateAccountStatusToTradingApi()` en vez de
  `process()` + comentario.
- **Modularizar**: una función larga con bloques comentados (`// paso 1`) son N
  funciones con nombre propio.
- **El impulso de comentar es señal de refactor**: extraer una función cuyo nombre sea
  esa explicación.
- Prohibido: comentarios narrativos, código muerto comentado, `// TODO` (un TODO real
  es una task o un fix registrado en SDD).

Únicas excepciones (una línea, en inglés): restricción que el código no puede expresar
(workaround con link al issue, regla de negocio contra-intuitiva con referencia a su
spec) y anotaciones exigidas por framework/tooling (Swagger, Lombok, decorators;
JSDoc/Javadoc solo si el linter del subproyecto lo exige).

Regla espejo en review: un PR con comentarios fuera de estas excepciones recibe
request de cambios; el sdd-reviewer lo chequea al cerrar el ciclo.
