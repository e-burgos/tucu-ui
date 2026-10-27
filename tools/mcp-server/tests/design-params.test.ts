import { describe, it, expect } from 'vitest';
import { createMcpServer } from '../src/server.js';
import {
  applyDensityToProps,
  mapDensity,
  mapMotion,
  mapStyle,
} from '../src/utils/design-params.js';

type ToolHandler = (
  args: Record<string, unknown>,
  extra: unknown
) => Promise<{ content: { text: string }[] }>;

const server = createMcpServer() as unknown as {
  _registeredTools: Record<string, { handler: ToolHandler }>;
};

async function callTool(name: string, args: Record<string, unknown>) {
  const result = await server._registeredTools[name].handler(args, {});
  return JSON.parse(result.content[0].text) as Record<string, any>;
}

describe('design-params mappers', () => {
  it('maps styles to presets and surfaces', () => {
    expect(mapStyle('clean')).toMatchObject({ preset: 'minimal', surface: 'solid' });
    expect(mapStyle('glass')).toMatchObject({ preset: 'glass', surface: 'glass' });
    expect(mapStyle('bold')).toMatchObject({ preset: 'vibrant', surface: 'solid' });
    expect(mapStyle('editorial')).toMatchObject({ preset: 'classic', surface: 'plain' });
  });

  it('maps density to real prop values', () => {
    expect(mapDensity('compact', 'Card')).toEqual({ density: 'compact' });
    expect(mapDensity('compact', 'BasicTable')).toEqual({ density: 'compact' });
    expect(mapDensity('spacious', 'Button')).toEqual({ size: 'large' });
    expect(mapDensity('compact', 'Badge')).toEqual({});
  });

  it('keeps explicit props over density', () => {
    const { props, applied } = applyDensityToProps('Button', { size: 'tiny' }, 'spacious');
    expect(props.size).toBe('tiny');
    expect(applied).toEqual([]);
  });

  it('maps motion', () => {
    expect(mapMotion('none').configProps).toBe('reducedMotion="always"');
    expect(mapMotion('subtle').configProps).toBeNull();
    expect(mapMotion('expressive').configProps).toContain('spring');
  });
});

describe('generate_component design params', () => {
  it('omits the design key and wrappers by default', async () => {
    const out = await callTool('generate_component', { component: 'Card' });
    expect(out.design).toBeUndefined();
    expect(out.code).not.toContain('ThemeScope');
  });

  it('applies density props', async () => {
    const out = await callTool('generate_component', { component: 'Card', density: 'compact' });
    expect(out.code).toContain('density="compact"');
    expect(out.design.density).toBe('compact');
    expect(out.design.applied.join(' ')).toContain('Card density="compact"');
  });

  it('does not override explicit props', async () => {
    const out = await callTool('generate_component', {
      component: 'Button',
      props: { size: 'small' },
      density: 'spacious',
    });
    expect(out.code).toContain('size="small"');
    expect(out.code).not.toContain('size="large"');
  });

  it('skips components without density support', async () => {
    const out = await callTool('generate_component', { component: 'Badge', density: 'compact' });
    expect(out.code).not.toContain('density=');
    expect(out.design.applied).toEqual([]);
  });

  it('wraps with ThemeScope per style', async () => {
    const out = await callTool('generate_component', { component: 'Card', style: 'glass' });
    expect(out.code).toContain('<ThemeScope preset="glass">');
    expect(out.imports[0]).toContain('ThemeScope');
  });

  it('wraps with MotionConfig for motion none and imports framer-motion', async () => {
    const out = await callTool('generate_component', { component: 'Card', motion: 'none' });
    expect(out.code).toContain('<MotionConfig reducedMotion="always">');
    expect(out.imports).toContain("import { MotionConfig } from 'framer-motion';");
  });

  it('leaves subtle motion unwrapped', async () => {
    const out = await callTool('generate_component', { component: 'Card', motion: 'subtle' });
    expect(out.code).not.toContain('MotionConfig');
    expect(out.design.motion).toBe('subtle');
  });

  it('combines with theme and keeps imports consistent', async () => {
    const out = await callTool('generate_component', {
      component: 'Card',
      theme: 'default',
      style: 'bold',
    });
    expect(out.imports[0]).toContain('ThemeProvider');
    expect(out.imports[0]).toContain('ThemeScope');
  });

  it('still reports use client directive for next', async () => {
    const out = await callTool('generate_component', {
      component: 'Card',
      style: 'clean',
      framework: 'next',
    });
    expect(out.clientDirective).toBe("'use client';");
    expect(out.design.style).toBe('clean');
  });
});

describe('generate_page design params and layouts', () => {
  const sections = [
    { type: 'hero', title: 'Welcome' },
    { type: 'table' },
    { type: 'form' },
  ];

  it('keeps default output free of design', async () => {
    const out = await callTool('generate_page', { name: 'Home', layout: 'stacked', sections });
    expect(out.design).toBeUndefined();
    expect(out.pageCode).not.toContain('ThemeScope');
  });

  it('applies density to sections', async () => {
    const out = await callTool('generate_page', {
      name: 'Home',
      layout: 'stacked',
      sections: sections.slice(1),
      density: 'compact',
    });
    expect(out.pageCode).toContain('<Card density="compact"');
    expect(out.pageCode).toContain('density="compact"');
    expect(out.pageCode).toContain('size="small"');
    expect(out.design.density).toBe('compact');
  });

  it('wraps with ThemeScope and uses GlassPanel for glass hero', async () => {
    const out = await callTool('generate_page', {
      name: 'Home',
      layout: 'stacked',
      sections,
      style: 'glass',
    });
    expect(out.pageCode).toContain('<ThemeScope preset="glass">');
    expect(out.pageCode).toContain('<GlassPanel');
    expect(out.imports[0]).toContain('GlassPanel');
    expect(out.imports[0]).toContain('ThemeScope');
  });

  it('wraps with MotionConfig for motion none', async () => {
    const out = await callTool('generate_page', {
      name: 'Home',
      layout: 'stacked',
      sections,
      motion: 'none',
    });
    expect(out.pageCode).toContain('<MotionConfig reducedMotion="always">');
    expect(out.imports).toContain("import { MotionConfig } from 'framer-motion';");
  });

  it('generates a marketing page with MarketingLayout', async () => {
    const out = await callTool('generate_page', {
      name: 'Landing',
      layout: 'marketing',
      sections,
      withRouting: true,
    });
    expect(out.pageCode).toContain('<MarketingLayout');
    expect(out.imports[0]).toContain('MarketingLayout');
    expect(out.imports[0]).toContain('Button');
    expect(out.pageCode).toContain('groups:');
    expect(out.pageCode).toContain('<Card');
    expect(out.layout.component).toBe('MarketingLayout');
    expect(out.routeConfig).toContain('/landing');
  });

  it('generates an auth page and warns about ignored sections', async () => {
    const out = await callTool('generate_page', {
      name: 'Login',
      layout: 'auth',
      sections,
    });
    expect(out.pageCode).toContain('<SplitAuthLayout');
    expect(out.pageCode).toContain('<SignInForm');
    expect(out.imports[0]).toContain('SignInForm');
    expect(out.imports[0]).toContain('SplitAuthLayout');
    expect(out.warnings[0]).toContain('ignores');
    expect(out.layout.component).toBe('SplitAuthLayout');
  });

  it('passes the style surface to SplitAuthLayout', async () => {
    const out = await callTool('generate_page', {
      name: 'Login',
      layout: 'auth',
      sections: [],
      style: 'glass',
    });
    expect(out.pageCode).toContain('surface="glass"');
    expect(out.warnings).toBeUndefined();
  });

  it('keeps next pages client-marked for special layouts', async () => {
    const out = await callTool('generate_page', {
      name: 'Login',
      layout: 'auth',
      sections: [],
      framework: 'next',
    });
    expect(out.pageCode.startsWith("'use client';")).toBe(true);
    expect(out.pageCode).toContain('export default function LoginPage');
    expect(out.files[0].path).toBe('app/login/page.tsx');
  });

  it('reports design for next pages with sections', async () => {
    const out = await callTool('generate_page', {
      name: 'Home',
      layout: 'stacked',
      sections,
      style: 'glass',
      density: 'compact',
      framework: 'next',
    });
    expect(out.design.applied.length).toBeGreaterThan(0);
    expect(out.pageCode).toContain('GlassPanel');
  });
});
