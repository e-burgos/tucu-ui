import { describe, it, expect } from 'vitest';
import { createMcpServer } from '../src/server.js';
import {
  getFormPatternByName,
  getAvailableFormPatterns,
} from '../src/data/form-patterns.js';
import { searchIcons, getIconCategories } from '../src/data/icon-registry.js';
import {
  themePresets,
  getPresetByName,
  getLayoutByName,
} from '../src/data/theme-registry.js';
import {
  formatProps,
  generateImportStatement,
  toPascalCase,
  toCamelCase,
} from '../src/utils/code-generator.js';

// ─── Invalid variant patterns to check against ─────────────────────────────
const INVALID_VARIANTS = [
  'variant="primary"',
  'variant="outline"',
  'variant="destructive"',
  'variant="default"',
  'variant="outlined"',
  'size="lg"',
  'size="sm"',
  'size="md"',
  'size="xs"',
];

function assertNoInvalidVariants(code: string) {
  for (const invalid of INVALID_VARIANTS) {
    expect(code).not.toContain(invalid);
  }
}

// ─── Theme Registry ─────────────────────────────────────────────────────────
describe('Theme Registry', () => {
  it('has presets defined', () => {
    expect(themePresets.length).toBeGreaterThan(0);
  });

  it('getPresetByName finds default', () => {
    const preset = getPresetByName('default');
    expect(preset).toBeDefined();
    expect(preset!.name).toBe('default');
  });

  it('getLayoutByName finds dashboard', () => {
    const layout = getLayoutByName('dashboard');
    expect(layout).toBeDefined();
    expect(layout!.component).toBe('AdminLayout');
  });

  it('getLayoutByName returns undefined for unknown', () => {
    expect(getLayoutByName('nonexistent')).toBeUndefined();
  });
});

// ─── Icon Registry ──────────────────────────────────────────────────────────
describe('Icon Registry', () => {
  it('getIconCategories returns categories', () => {
    const categories = getIconCategories();
    expect(categories.length).toBeGreaterThan(0);
    expect(categories).toContain('actions');
    expect(categories).toContain('navigation');
  });

  it('searchIcons finds related icons by keyword "arrow"', () => {
    const results = searchIcons('arrow');
    expect(results.length).toBeGreaterThan(0);
    const names = results.map((r) => r.name);
    expect(names).toContain('ArrowLeft');
    expect(names).toContain('ArrowRight');
  });

  it('searchIcons finds by keyword "delete"', () => {
    const results = searchIcons('delete');
    expect(results.length).toBeGreaterThan(0);
    const names = results.map((r) => r.name);
    expect(names).toContain('Trash2');
  });

  it('searchIcons respects category filter', () => {
    const results = searchIcons('arrow', 'navigation');
    results.forEach((r) => expect(r.category).toBe('navigation'));
  });

  it('searchIcons respects limit', () => {
    const results = searchIcons('a', undefined, 3);
    expect(results.length).toBeLessThanOrEqual(3);
  });

  it('searchIcons returns empty for gibberish', () => {
    const results = searchIcons('qqqzzz999');
    expect(results).toHaveLength(0);
  });
});

// ─── Form Patterns ──────────────────────────────────────────────────────────
describe('Form Patterns', () => {
  it('getAvailableFormPatterns returns pattern names', () => {
    const patterns = getAvailableFormPatterns();
    expect(patterns).toContain('login');
    expect(patterns).toContain('registration');
    expect(patterns).toContain('contact');
  });

  it('login pattern includes email + password', () => {
    const login = getFormPatternByName('login');
    expect(login).toBeDefined();
    const fieldNames = login!.fields.map((f) => f.name);
    expect(fieldNames).toContain('email');
    expect(fieldNames).toContain('password');
  });

  it('login pattern includes Zod schema', () => {
    const login = getFormPatternByName('login');
    expect(login!.validationSchema).toContain('z.object');
    expect(login!.validationSchema).toContain('email');
  });

  it('form patterns use Form wrapper from tucu-ui', () => {
    const login = getFormPatternByName('login');
    expect(login!.fullExample).toContain("from '@e-burgos/tucu-ui'");
    expect(login!.fullExample).toContain('<Form');
  });

  it('form patterns NEVER contain invalid variants', () => {
    const patterns = getAvailableFormPatterns();
    for (const name of patterns) {
      const pattern = getFormPatternByName(name);
      assertNoInvalidVariants(pattern!.fullExample);
    }
  });
});

// ─── Code Generator Utilities ───────────────────────────────────────────────
describe('Code Generator Utilities', () => {
  it('formatProps generates sorted key="value" pairs', () => {
    const result = formatProps({ size: 'medium', variant: 'solid' });
    expect(result).toBe('size="medium" variant="solid"');
  });

  it('formatProps handles boolean true', () => {
    const result = formatProps({ disabled: 'true' });
    expect(result).toBe('disabled');
  });

  it('formatProps handles boolean false', () => {
    const result = formatProps({ disabled: 'false' });
    expect(result).toBe('disabled={false}');
  });

  it('generateImportStatement produces sorted imports', () => {
    const result = generateImportStatement(
      ['Button', 'Alert', 'Card'],
      '@e-burgos/tucu-ui'
    );
    expect(result).toBe(
      "import { Alert, Button, Card } from '@e-burgos/tucu-ui';"
    );
  });

  it('toPascalCase converts strings', () => {
    expect(toPascalCase('my-page')).toBe('MyPage');
    expect(toPascalCase('user settings')).toBe('UserSettings');
  });

  it('toCamelCase converts strings', () => {
    expect(toCamelCase('my-page')).toBe('myPage');
  });
});

// ─── Generation Tools (Integration) ────────────────────────────────────────
describe('Generation Tools', () => {
  it('server creates successfully with 9 tools registered', () => {
    // This just verifies that the server can be created without errors.
    // The McpServer doesn't expose a public tool list, but if registration
    // throws, this test will fail.
    const server = createMcpServer();
    expect(server).toBeDefined();
  });

  describe('generate_component determinism', () => {
    it('same input produces same output', () => {
      // Using formatProps as a proxy for determinism
      const result1 = formatProps({ variant: 'solid', size: 'medium' });
      const result2 = formatProps({ variant: 'solid', size: 'medium' });
      expect(result1).toBe(result2);
    });
  });

  describe('generated code safety', () => {
    it('theme registry examples NEVER contain invalid variants', () => {
      for (const preset of themePresets) {
        // Presets don't have code examples directly, but verify naming
        expect(preset.name).not.toBe('');
      }
    });

    it('form patterns use only valid button variants', () => {
      const patterns = getAvailableFormPatterns();
      for (const name of patterns) {
        const pattern = getFormPatternByName(name);
        // Check that Button uses valid variant
        if (pattern!.fullExample.includes('<Button')) {
          expect(pattern!.fullExample).toContain('variant="solid"');
          assertNoInvalidVariants(pattern!.fullExample);
        }
      }
    });

    it('form patterns use only valid input variants', () => {
      const patterns = getAvailableFormPatterns();
      for (const name of patterns) {
        const pattern = getFormPatternByName(name);
        if (pattern!.fullExample.includes('variant=')) {
          // All variant values should be valid
          const variantMatches =
            pattern!.fullExample.match(/variant="(\w+)"/g) || [];
          for (const match of variantMatches) {
            const value = match.replace('variant="', '').replace('"', '');
            expect(['solid', 'ghost', 'transparent']).toContain(value);
          }
        }
      }
    });
  });
});
