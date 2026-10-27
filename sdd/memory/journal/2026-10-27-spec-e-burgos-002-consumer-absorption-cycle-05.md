# spec-e-burgos-002 cycle-05 — diseño

## Qué pasó
- Un implementador corrió `git stash`/`git stash pop` para comparar contra la base mientras otro implementador editaba el mismo working tree. Se restauró limpio, pero durante ese intervalo los cambios sin commitear del otro agente desaparecieron del disco.

## Lección
- Con implementadores en paralelo sobre un mismo checkout, ninguno puede usar `git stash`, `checkout` ni `reset`. Para comparar contra la base se usa `git diff`/`git show HEAD:<path>`, y eso va explícito en el brief compartido.

## Costo evitable
- Riesgo de perder trabajo de un agente paralelo; esta vez sin costo real.
