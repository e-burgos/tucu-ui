import { afterEach, describe, expect, it } from 'vitest';
import {
  defineThemePreset,
  getThemePreset,
  listThemePresets,
  registerThemePresets,
  resetThemePresets,
  resolveThemePreset,
  themePresetToAttributes,
  themePresetToCssVars,
} from '../../themes/presets';

afterEach(() => resetThemePresets());

describe('theme preset registry', () => {
  it('ships six neutral built-in presets', () => {
    expect(listThemePresets().map((p) => p.name)).toEqual([
      'glass',
      'classic',
      'elegant',
      'fresh',
      'minimal',
      'vibrant',
    ]);
  });

  it('registers and retrieves a custom preset', () => {
    registerThemePresets({ name: 'brand', accent: '#ff0000' });
    expect(getThemePreset('brand')?.accent).toBe('#ff0000');
  });

  it('overrides a built-in and restores it on reset', () => {
    registerThemePresets({ name: 'glass', accent: '#123456' });
    expect(getThemePreset('glass')?.accent).toBe('#123456');
    resetThemePresets();
    expect(getThemePreset('glass')?.accent).toBe('#0d9488');
  });

  it('returns undefined for unknown names', () => {
    expect(getThemePreset('nope')).toBeUndefined();
  });

  it('rejects a non-hex accent', () => {
    expect(() => defineThemePreset({ name: 'bad', accent: 'red' })).toThrow(
      /accent/
    );
    expect(() =>
      defineThemePreset({ name: 'bad', accent: '#fff', darkAccent: 'blue' })
    ).toThrow(/darkAccent/);
  });

  it('accepts short hex accents', () => {
    expect(defineThemePreset({ name: 'short', accent: '#abc' }).name).toBe(
      'short'
    );
  });
});

describe('themePresetToCssVars', () => {
  it('emits accent vars and re-points brand and primary per mode', () => {
    const preset = defineThemePreset({
      name: 'p',
      accent: '#0d9488',
      darkAccent: '#2dd4bf',
    });
    const light = themePresetToCssVars(preset, 'light');
    const dark = themePresetToCssVars(preset, 'dark');
    expect(light['--tucu-accent']).toBe('#0d9488');
    expect(light['--color-brand']).toBe('#0d9488');
    expect(light['--color-primary']).toBe('#0d9488');
    expect(light['--color-semantic-bg-primary']).toBe('#0d9488');
    expect(light['--color-semantic-dark-bg-primary']).toBe('#2dd4bf');
    expect(light['--color-semantic-dark-fg-primary']).toBe('#2dd4bf');
    expect(dark['--tucu-accent']).toBe('#2dd4bf');
    expect(dark['--color-brand']).toBe('#2dd4bf');
    expect(dark['--color-semantic-bg-primary']).toBe('#2dd4bf');
  });

  it('uses accent for dark vars when darkAccent is missing', () => {
    const vars = themePresetToCssVars(
      defineThemePreset({ name: 'p', accent: '#336699' }),
      'dark'
    );
    expect(vars['--color-semantic-dark-bg-primary']).toBe('#336699');
    expect(vars['--tucu-accent']).toBe('#336699');
  });

  it('picks the more readable contrast color', () => {
    const contrast = (accent: string) =>
      themePresetToCssVars({ name: 'p', accent }, 'light')[
        '--tucu-accent-contrast'
      ];
    expect(contrast('#111111')).toBe('#ffffff');
    expect(contrast('#ffff00')).toBe('#111111');
    expect(contrast('#1e3a8a')).toBe('#ffffff');
    expect(contrast('#fde047')).toBe('#111111');
  });

  it('maps radius and button shapes to control radius', () => {
    const vars = (radius: never, buttons?: never) =>
      themePresetToCssVars({ name: 'p', accent: '#000', radius, buttons }, 'light');
    expect(vars('none' as never)['--tucu-radius']).toBe('0');
    expect(vars('sm' as never)['--tucu-radius']).toBe('0.375rem');
    expect(vars('md' as never)['--tucu-radius']).toBe('0.75rem');
    expect(vars('lg' as never)['--tucu-radius']).toBe('1rem');
    expect(vars('xl' as never)['--tucu-radius']).toBe('1.5rem');
    expect(vars('lg' as never)['--tucu-control-radius']).toBe('1rem');
    expect(vars('lg' as never, 'pill' as never)['--tucu-control-radius']).toBe(
      '9999px'
    );
    expect(vars('lg' as never, 'square' as never)['--tucu-control-radius']).toBe(
      '0'
    );
  });

  it('omits shape, font and card vars the preset does not define', () => {
    const vars = themePresetToCssVars({ name: 'p', accent: '#000' }, 'light');
    expect(Object.keys(vars).some((key) => key.startsWith('--tucu-card'))).toBe(
      false
    );
    expect(vars['--tucu-radius']).toBeUndefined();
    expect(vars['--tucu-font']).toBeUndefined();
  });

  it('emits fonts when set', () => {
    const vars = themePresetToCssVars(
      { name: 'p', accent: '#000', fontFamily: 'serif', headingFontFamily: 'Georgia' },
      'light'
    );
    expect(vars['--tucu-font']).toBe('serif');
    expect(vars['--tucu-heading-font']).toBe('Georgia');
  });

  it('emits card vars per style and mode', () => {
    const cards = (style: 'glass' | 'solid' | 'outlined', mode: 'light' | 'dark') =>
      themePresetToCssVars({ name: 'p', accent: '#000', cards: style }, mode);
    expect(cards('glass', 'light')['--tucu-card-blur']).toBe('16px');
    expect(cards('glass', 'light')['--tucu-card-bg']).not.toBe(
      cards('glass', 'dark')['--tucu-card-bg']
    );
    expect(cards('solid', 'dark')['--tucu-card-blur']).toBe('0px');
    expect(cards('outlined', 'light')['--tucu-card-bg']).toBe('transparent');
    expect(cards('outlined', 'light')['--tucu-card-border']).toContain('solid');
  });

  it('applies tokens last and ignores keys that are not custom properties', () => {
    const vars = themePresetToCssVars(
      {
        name: 'p',
        accent: '#000000',
        tokens: {
          light: { '--tucu-accent': '#abcdef', color: 'red' },
          dark: { '--tucu-dark-only': '1' },
        },
      },
      'light'
    );
    expect(vars['--tucu-accent']).toBe('#abcdef');
    expect(vars.color).toBeUndefined();
    expect(vars['--tucu-dark-only']).toBeUndefined();
  });

  it('builds vars for every built-in preset in both modes', () => {
    for (const preset of listThemePresets()) {
      for (const mode of ['light', 'dark'] as const) {
        const vars = themePresetToCssVars(preset, mode);
        expect(vars['--tucu-accent']).toMatch(/^#/);
        expect(vars['--tucu-card-bg']).toBeDefined();
      }
    }
  });
});

describe('resolveThemePreset', () => {
  const rules = [
    { host: 'shop.example.com', preset: 'fresh' },
    { host: '*.example.com', preset: 'classic' },
    { host: /^admin\./, preset: 'minimal' },
    { tenant: 'acme', preset: { name: 'acme', accent: '#ff6600' } },
  ];

  it('matches an exact host case-insensitively and ignores the port', () => {
    expect(
      resolveThemePreset({ host: 'SHOP.Example.com:3000', rules })?.name
    ).toBe('fresh');
  });

  it('matches wildcard subdomains but not the apex', () => {
    expect(resolveThemePreset({ host: 'blog.example.com', rules })?.name).toBe(
      'classic'
    );
    expect(resolveThemePreset({ host: 'example.com', rules })).toBeUndefined();
  });

  it('matches a RegExp host', () => {
    expect(resolveThemePreset({ host: 'admin.other.io', rules })?.name).toBe(
      'minimal'
    );
  });

  it('matches by tenant and accepts inline presets', () => {
    expect(resolveThemePreset({ tenant: 'acme', rules })?.accent).toBe('#ff6600');
  });

  it('first matching rule wins', () => {
    expect(
      resolveThemePreset({
        host: 'shop.example.com',
        rules: [...rules].reverse(),
      })?.name
    ).toBe('classic');
  });

  it('requires both host and tenant when a rule has both', () => {
    const strict = [{ host: 'a.test', tenant: 't1', preset: 'glass' }];
    expect(resolveThemePreset({ host: 'a.test', tenant: 't2', rules: strict })).toBeUndefined();
    expect(resolveThemePreset({ host: 'a.test', tenant: 't1', rules: strict })?.name).toBe('glass');
  });

  it('falls back by name or inline preset', () => {
    expect(resolveThemePreset({ host: 'nowhere.io', rules, fallback: 'vibrant' })?.name).toBe('vibrant');
    expect(
      resolveThemePreset({
        rules: [],
        fallback: { name: 'inline', accent: '#000000' },
      })?.name
    ).toBe('inline');
  });

  it('resolves registered custom presets by name', () => {
    registerThemePresets({ name: 'mine', accent: '#010203' });
    expect(
      resolveThemePreset({ host: 'x.io', rules: [{ host: 'x.io', preset: 'mine' }] })?.accent
    ).toBe('#010203');
  });

  it('returns undefined with no match and no fallback', () => {
    expect(resolveThemePreset({ host: 'x.io', rules })).toBeUndefined();
  });
});

describe('themePresetToAttributes', () => {
  it('maps cards, buttons and fonts to data attributes', () => {
    expect(
      themePresetToAttributes({
        name: 'p',
        accent: '#000',
        cards: 'glass',
        buttons: 'pill',
        fontFamily: 'serif',
        headingFontFamily: 'Georgia',
      })
    ).toEqual({
      'data-tucu-cards': 'glass',
      'data-tucu-buttons': 'pill',
      'data-tucu-font': '',
      'data-tucu-heading-font': '',
    });
  });

  it('returns nothing for a bare preset', () => {
    expect(themePresetToAttributes({ name: 'p', accent: '#000' })).toEqual({});
  });
});
