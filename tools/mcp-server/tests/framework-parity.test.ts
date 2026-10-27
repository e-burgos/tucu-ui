import { describe, it, expect } from 'vitest';
import { createMcpServer } from '../src/server.js';
import { getThemeSetupPrompt } from '../src/prompts/theme-setup.js';

type ToolHandler = (args: Record<string, unknown>, extra: unknown) => Promise<{
  content: { text: string }[];
}>;

const server = createMcpServer() as unknown as {
  _registeredTools: Record<string, { handler: ToolHandler }>;
};

async function callTool(name: string, args: Record<string, unknown>) {
  const result = await server._registeredTools[name].handler(args, {});
  return JSON.parse(result.content[0].text) as Record<string, unknown>;
}

const allSections = ['hero', 'cards', 'table', 'form', 'chart', 'list'].map(
  (type) => ({ type, title: `T ${type}` })
);

const viteCases: [string, string, Record<string, unknown>][] = [
  ['component plain', 'generate_component', { component: 'Button', props: { variant: 'solid' } }],
  ['component wrapper theme', 'generate_component', { component: 'Card', withWrapper: true, theme: 'default' }],
  ['component input', 'generate_component', { component: 'Input' }],
  ['form pattern', 'generate_form', { pattern: getPatternName() }],
  ['form fields', 'generate_form', {
    fields: [
      { name: 'email', type: 'email', label: 'Email', required: true },
      { name: 'bio', type: 'textarea', label: 'Bio' },
      { name: 'role', type: 'select', label: 'Role', options: ['Admin', 'User'] },
      { name: 'ok', type: 'checkbox', label: 'OK' },
    ],
  }],
  ['page full', 'generate_page', { name: 'Users Admin', layout: 'dashboard', sections: allSections, withRouting: true }],
  ['page mfe', 'generate_page', { name: 'Home', layout: 'stacked', sections: [{ type: 'hero' }], withRouting: true, architecture: 'mfe' }],
  ['chart line', 'generate_chart', { type: 'line', dataShape: { xKey: 'month', yKeys: ['a', 'b'] } }],
  ['chart donut', 'generate_chart', { type: 'donut', dataShape: { xKey: 'k', yKeys: ['v'] }, withTheme: false }],
  ['datatable default', 'generate_datatable', {}],
  ['datatable rich', 'generate_datatable', {
    entityName: 'Invoice',
    columns: [{ key: 'id' }, { key: 'amount', type: 'currency' }],
    features: { rowActions: ['edit'], paginationMode: 'server', statesHandling: true },
  }],
  ['documentation', 'generate_documentation', { component: 'Button' }],
];

function getPatternName(): string {
  return 'login';
}

describe('framework parity: vite output is unchanged', () => {
  for (const [label, tool, args] of viteCases) {
    it(`${label} - no framework`, async () => {
      const out = await callTool(tool, args);
      expect(out).toMatchSnapshot();
    });
    it(`${label} - framework vite equals no framework`, async () => {
      const base = await callTool(tool, args);
      const vite = await callTool(tool, { ...args, framework: 'vite' });
      expect(vite).toEqual(base);
    });
  }

  it('theme-setup prompt without framework', () => {
    expect(getThemeSetupPrompt('Blue', 'system')).toMatchSnapshot();
    expect(getThemeSetupPrompt()).toMatchSnapshot();
  });
});
