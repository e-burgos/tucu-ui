const LEADING_DIRECTIVE = /^\s*(['"])use client\1;?[ \t]*\r?\n?/;

export function preserveUseClient() {
  const clientModules = new Set();

  return {
    name: 'preserve-use-client',
    enforce: 'post',
    buildStart() {
      clientModules.clear();
    },
    transform(code, id) {
      if (!LEADING_DIRECTIVE.test(code)) return null;
      clientModules.add(id);
      return { code: code.replace(LEADING_DIRECTIVE, ''), map: null };
    },
    renderChunk(code, chunk, outputOptions) {
      if (outputOptions.format !== 'es') return null;
      if (!chunk.moduleIds.some((id) => clientModules.has(id))) return null;
      return { code: `'use client';\n${code}`, map: null };
    },
  };
}
