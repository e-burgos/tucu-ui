// ─── Code Generator Utilities ───────────────────────────────────────────────
// Deterministic template rendering for code generation tools.

export interface TemplateContext {
  componentName: string;
  props?: Record<string, string>;
  imports?: string[];
  children?: string;
}

export function renderTemplate(
  template: string,
  ctx: TemplateContext
): string {
  return template
    .replace(/\{\{componentName\}\}/g, ctx.componentName)
    .replace(/\{\{props\}\}/g, formatProps(ctx.props || {}))
    .replace(/\{\{imports\}\}/g, (ctx.imports || []).join('\n'))
    .replace(/\{\{children\}\}/g, ctx.children || '');
}

export function formatProps(props: Record<string, string>): string {
  return Object.entries(props)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => {
      if (value === 'true') return key;
      if (value === 'false') return `${key}={false}`;
      if (value.startsWith('{') || value.startsWith('(')) {
        return `${key}=${value}`;
      }
      return `${key}="${value}"`;
    })
    .join(' ');
}

export function generateImportStatement(
  components: string[],
  from: string
): string {
  const sorted = [...components].sort();
  return `import { ${sorted.join(', ')} } from '${from}';`;
}

export function toPascalCase(str: string): string {
  return str
    .replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''))
    .replace(/^(.)/, (_, c) => c.toUpperCase());
}

export function toCamelCase(str: string): string {
  const pascal = toPascalCase(str);
  return pascal.charAt(0).toLowerCase() + pascal.slice(1);
}
