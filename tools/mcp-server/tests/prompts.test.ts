import { describe, it, expect } from 'vitest';
import { getCreateComponentPrompt } from '../src/prompts/create-component.js';
import { getCreateFormPrompt } from '../src/prompts/create-form.js';
import { getCreatePagePrompt } from '../src/prompts/create-page.js';
import { getDebugVariantPrompt } from '../src/prompts/debug-variant.js';
import { getMigrateComponentPrompt } from '../src/prompts/migrate-component.js';
import { getThemeSetupPrompt } from '../src/prompts/theme-setup.js';
import { getAccessibilityCheckPrompt } from '../src/prompts/accessibility-check.js';
import { getPerformanceReviewPrompt } from '../src/prompts/performance-review.js';
import { registerPrompts } from '../src/prompts/index.js';

// ─── Prompt Registry ────────────────────────────────────────────────────────
describe('Prompt Registry', () => {
  it('registerPrompts is a function', () => {
    expect(typeof registerPrompts).toBe('function');
  });
});

// ─── Prompt Content ─────────────────────────────────────────────────────────
describe('create-component prompt', () => {
  it('includes component name in output', () => {
    const result = getCreateComponentPrompt('Button');
    expect(result).toContain('COMPONENT: Button');
  });

  it('includes context when provided', () => {
    const result = getCreateComponentPrompt('Card', 'dashboard widget');
    expect(result).toContain('CONTEXT: dashboard widget');
  });

  it('includes valid variant rules', () => {
    const result = getCreateComponentPrompt('Button');
    expect(result).toContain('"solid"');
    expect(result).toContain('"ghost"');
    expect(result).toContain('"transparent"');
  });

  it('warns against invalid variants', () => {
    const result = getCreateComponentPrompt('Button');
    expect(result).toContain('NEVER use');
  });
});

describe('create-form prompt', () => {
  it('includes field names', () => {
    const result = getCreateFormPrompt('name, email, password');
    expect(result).toContain('FIELDS: name, email, password');
  });

  it('includes validation when provided', () => {
    const result = getCreateFormPrompt('email', 'required, valid email');
    expect(result).toContain('VALIDATION: required, valid email');
  });

  it('references Form component pattern', () => {
    const result = getCreateFormPrompt('name');
    expect(result).toContain('Form');
    expect(result).toContain('validationSchema');
    expect(result).toContain('onSubmit');
  });
});

describe('create-page prompt', () => {
  it('includes page name and layout', () => {
    const result = getCreatePagePrompt('Dashboard', 'admin');
    expect(result).toContain('PAGE NAME: Dashboard');
    expect(result).toContain('LAYOUT: admin');
  });

  it('includes sections when provided', () => {
    const result = getCreatePagePrompt('Users', 'horizontal', 'table, filters');
    expect(result).toContain('SECTIONS: table, filters');
  });

  it('lists available layouts', () => {
    const result = getCreatePagePrompt('Home', 'horizontal');
    expect(result).toContain('LAYOUT_OPTIONS.ADMIN');
    expect(result).toContain('LAYOUT_OPTIONS.HORIZONTAL');
    expect(result).toContain('LAYOUT_OPTIONS.CLEAN');
  });
});

describe('debug-variant prompt', () => {
  it('includes error message', () => {
    const result = getDebugVariantPrompt('Cannot read properties of undefined');
    expect(result).toContain('ERROR: Cannot read properties of undefined');
  });

  it('includes component when provided', () => {
    const result = getDebugVariantPrompt('error', 'Button');
    expect(result).toContain('COMPONENT: Button');
  });

  it('lists all valid variants', () => {
    const result = getDebugVariantPrompt('error');
    expect(result).toContain('"solid"');
    expect(result).toContain('"ghost"');
    expect(result).toContain('"large"');
    expect(result).toContain('"medium"');
    expect(result).toContain('"small"');
  });

  it('lists invalid values', () => {
    const result = getDebugVariantPrompt('error');
    expect(result).toContain('variant="primary"');
    expect(result).toContain('size="lg"');
  });
});

describe('migrate-component prompt', () => {
  it('includes migration parameters', () => {
    const result = getMigrateComponentPrompt('Button', '1.x', '2.x');
    expect(result).toContain('COMPONENT: Button');
    expect(result).toContain('FROM VERSION: 1.x');
    expect(result).toContain('TO VERSION: 2.x');
  });

  it('includes variant mapping table', () => {
    const result = getMigrateComponentPrompt('Button', '1.x', '2.x');
    expect(result).toContain('variant="primary"');
    expect(result).toContain('variant="solid" color="primary"');
  });
});

describe('theme-setup prompt', () => {
  it('includes ThemeProvider configuration', () => {
    const result = getThemeSetupPrompt();
    expect(result).toContain('ThemeProvider');
    expect(result).toContain('LAYOUT_OPTIONS');
    expect(result).toContain('useTheme');
  });

  it('includes preset when provided', () => {
    const result = getThemeSetupPrompt('Green');
    expect(result).toContain('PRESET: Green');
  });

  it('includes darkMode when provided', () => {
    const result = getThemeSetupPrompt(undefined, 'dark');
    expect(result).toContain('DARK MODE: dark');
  });

  it('lists color presets', () => {
    const result = getThemeSetupPrompt();
    expect(result).toContain('Blue');
    expect(result).toContain('macOS');
  });
});

describe('accessibility-check prompt', () => {
  it('includes component name', () => {
    const result = getAccessibilityCheckPrompt('LoginForm');
    expect(result).toContain('COMPONENT: LoginForm');
  });

  it('includes code when provided', () => {
    const result = getAccessibilityCheckPrompt('Button', '<Button>Click</Button>');
    expect(result).toContain('<Button>Click</Button>');
  });

  it('covers key a11y areas', () => {
    const result = getAccessibilityCheckPrompt('Form');
    expect(result).toContain('ARIA');
    expect(result).toContain('Keyboard');
    expect(result).toContain('Color Contrast');
  });
});

describe('performance-review prompt', () => {
  it('includes the code to review', () => {
    const code = 'const App = () => <Button>Hi</Button>';
    const result = getPerformanceReviewPrompt(code);
    expect(result).toContain(code);
  });

  it('covers performance areas', () => {
    const result = getPerformanceReviewPrompt('code');
    expect(result).toContain('Re-renders');
    expect(result).toContain('Bundle Size');
    expect(result).toContain('useMemo');
  });

  it('includes anti-patterns', () => {
    const result = getPerformanceReviewPrompt('code');
    expect(result).toContain('BAD');
    expect(result).toContain('GOOD');
  });
});
