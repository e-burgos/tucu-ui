# SDD — Spec-Driven Development

> Sistema portable de desarrollo guiado por especificaciones. La documentación completa
> vive en [`documentation/`](documentation/), en dos idiomas — elegí el tuyo.
>
> Portable Spec-Driven Development system. The full documentation lives in
> [`documentation/`](documentation/), in two languages — pick yours.

| Documento | Español | English |
| --- | --- | --- |
| **Instalar y actualizar** el framework — empezá acá / start here | [INSTALL.md](documentation/es/INSTALL.md) | [INSTALL.md](documentation/en/INSTALL.md) |
| **Cómo usar SDD** — guía paso a paso / step-by-step guide | [HOW-TO-USE-SDD.md](documentation/es/HOW-TO-USE-SDD.md) | [HOW-TO-USE-SDD.md](documentation/en/HOW-TO-USE-SDD.md) |
| **Referencia completa** — estructura, gates, agentes / full reference | [README.md](documentation/es/README.md) | [README.md](documentation/en/README.md) |

## Acceso rápido / Quick access

```bash
pnpm sdd:docs        # visor interactivo con los tres documentos en la vista Ayuda
pnpm sdd:validate    # valida todos los registros contra sus schemas
pnpm sdd:gate <spec> [cycle-XX]   # SPEC GATE como comando: A (abrir ciclo) / B (implementar)
```

- La única fuente del nombre y descripción del proyecto es [`global.json`](global.json) —
  ningún otro archivo de `sdd/` los hardcodea. / The single source of the project name and
  description is `global.json` — no other file in `sdd/` hardcodes them.
- Ejemplos completos generados por la CLI / full generated examples:
  <https://github.com/e-burgos/sdd-harness-examples>
