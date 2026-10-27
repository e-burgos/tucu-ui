import { describe, it, expect } from 'vitest';
import { createMcpServer } from '../src/server.js';
import { getThemeSetupPrompt } from '../src/prompts/theme-setup.js';
import { getQuickStartContent } from '../src/resources/quickstart.js';
import { getRoutingContent } from '../src/resources/routing.js';
import { getShellContent } from '../src/resources/shell.js';

type ToolHandler = (args: Record<string, unknown>, extra: unknown) => Promise<{
  content: { text: string }[];
}>;

const server = createMcpServer() as unknown as {
  _registeredTools: Record<string, { handler: ToolHandler }>;
};

async function callTool(name: string, args: Record<string, unknown>) {
  const result = await server._registeredTools[name].handler(args, {});
  return JSON.parse(result.content[0].text) as Record<string, any>;
}

const USE_CLIENT = "'use client';";

describe('generate_component framework next', () => {
  it('uses NextThemeProvider and the next entry when a theme is applied', async () => {
    const out = await callTool('generate_component', {
      component: 'Button',
      theme: 'default',
      framework: 'next',
    });
    expect(out.code).toContain('<NextThemeProvider');
    expect(out.code).not.toContain('<ThemeProvider');
    expect(out.imports).toContain(
      "import { NextThemeProvider } from '@e-burgos/tucu-ui/next';"
    );
    expect(out.clientDirective).toBe(USE_CLIENT);
    expect(out.framework).toBe('next');
  });

  it('keeps the plain snippet without a theme', async () => {
    const vite = await callTool('generate_component', { component: 'Button' });
    const next = await callTool('generate_component', {
      component: 'Button',
      framework: 'next',
    });
    expect(next.code).toBe(vite.code);
    expect(next.warnings.some((w: string) => w.includes('use client'))).toBe(true);
  });
});

describe('generate_form framework next', () => {
  it('prefixes custom forms with use client', async () => {
    const out = await callTool('generate_form', {
      fields: [{ name: 'email', type: 'email', label: 'Email' }],
      framework: 'next',
    });
    expect(out.componentCode.startsWith(`${USE_CLIENT}\n\n`)).toBe(true);
    expect(out.notes[0]).toContain('use client');
  });

  it('prefixes pattern forms with use client', async () => {
    const out = await callTool('generate_form', {
      pattern: 'login',
      framework: 'next',
    });
    expect(out.componentCode.startsWith(`${USE_CLIENT}\n\n`)).toBe(true);
  });
});

describe('generate_page framework next', () => {
  const sections = [
    { type: 'cards' },
    { type: 'table', title: 'Users' },
    { type: 'form' },
    { type: 'list' },
  ];

  it('emits a Server Component page and a client sections file', async () => {
    const out = await callTool('generate_page', {
      name: 'User Admin',
      layout: 'dashboard',
      sections,
      withRouting: true,
      framework: 'next',
    });
    const [page, client] = out.files;
    expect(page.path).toBe('app/user-admin/page.tsx');
    expect(page.code).toContain('export default function UserAdminPage()');
    expect(page.code).not.toContain("'use client'");
    expect(page.code).not.toContain('react-router');
    expect(page.code).toContain("from './user-admin-sections'");
    expect(page.code).not.toContain('onSubmit');
    expect(client.path).toBe('app/user-admin/user-admin-sections.tsx');
    expect(client.code.startsWith(USE_CLIENT)).toBe(true);
    expect(client.code).toContain('onSubmit');
    expect(client.code).toContain('onClick');
    expect(out.routeConfig).toBe('');
    expect(out.clientCode).toBe(client.code);
  });

  it('emits only page.tsx when no section involves functions', async () => {
    const out = await callTool('generate_page', {
      name: 'Home',
      layout: 'stacked',
      sections: [{ type: 'hero' }, { type: 'cards' }, { type: 'chart' }],
      framework: 'next',
    });
    expect(out.files).toHaveLength(1);
    expect(out.clientCode).toBe('');
    expect(out.pageCode).toContain('export default function HomePage()');
    expect(out.pageCode).not.toContain("'use client'");
  });
});

describe('generate_chart framework next', () => {
  it('prefixes the chart with use client', async () => {
    const out = await callTool('generate_chart', {
      type: 'bar',
      dataShape: { xKey: 'm', yKeys: ['v'] },
      framework: 'next',
    });
    expect(out.componentCode.startsWith(`${USE_CLIENT}\n\n`)).toBe(true);
    expect(out.framework).toBe('next');
  });
});

describe('generate_datatable framework next', () => {
  it('prefixes the table with use client and adds a boundary note', async () => {
    const vite = await callTool('generate_datatable', { entityName: 'Invoice' });
    const next = await callTool('generate_datatable', {
      entityName: 'Invoice',
      framework: 'next',
    });
    expect(next.componentCode).toBe(`${USE_CLIENT}\n\n${vite.componentCode}`);
    expect(next.notes.length).toBe(vite.notes.length + 1);
    expect(next.imports).toEqual(vite.imports);
  });
});

describe('Next.js resources and prompt', () => {
  const contents = {
    quickstart: getQuickStartContent(),
    routing: getRoutingContent(),
    shell: getShellContent(),
  };

  for (const [name, text] of Object.entries(contents)) {
    it(`${name} has a Next.js (App Router) section`, () => {
      expect(text).toContain('## Next.js (App Router)');
      expect(text).toContain('NextThemeProvider');
      expect(text).toContain('@e-burgos/tucu-ui/next');
    });
  }

  it('quickstart covers install, peer, tailwind, boundary and static export', () => {
    const text = contents.quickstart;
    expect(text).toContain('next >=16');
    expect(text).toContain('app/layout.tsx');
    expect(text).toContain("@source '../node_modules/@e-burgos/tucu-ui'");
    expect(text).toContain('Server / client boundary');
    expect(text).toContain("output: 'export'");
    expect(text).toContain('ReactRouter');
  });

  it('theme-setup branches on framework', () => {
    const next = getThemeSetupPrompt('Blue', 'dark', 'next');
    expect(next).toContain('NextThemeProvider');
    expect(next).toContain('PRESET: Blue');
    expect(next).toContain('DARK MODE: dark');
    expect(next).not.toContain("import { ThemeProvider, LAYOUT_OPTIONS }");
    expect(getThemeSetupPrompt('Blue', 'dark', 'vite')).toBe(
      getThemeSetupPrompt('Blue', 'dark')
    );
  });
});
