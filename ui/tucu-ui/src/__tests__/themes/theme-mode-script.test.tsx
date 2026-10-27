import { renderToStaticMarkup } from 'react-dom/server';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { ThemeModeScript } from '../../next/theme-mode-script';
import {
  getThemeModeScript,
  type ThemeModeScriptOptions,
} from '../../themes/utils/theme-mode-script';

const html = () => document.documentElement;

const run = (options?: ThemeModeScriptOptions) =>
  new Function(getThemeModeScript(options))();

const persist = (state: object, key = 'theme-storage') =>
  localStorage.setItem(key, JSON.stringify({ state, version: 0 }));

describe('getThemeModeScript', () => {
  beforeEach(() => {
    localStorage.clear();
    html().className = '';
  });
  afterEach(() => {
    localStorage.clear();
    html().className = '';
  });

  it('applies persisted dark mode', () => {
    persist({ mode: 'dark' });
    run({ defaultMode: 'light' });
    expect(html().classList.contains('dark')).toBe(true);
    expect(html().classList.contains('light')).toBe(false);
  });

  it('applies persisted light mode without dark', () => {
    html().classList.add('dark');
    persist({ mode: 'light' });
    run();
    expect(html().classList.contains('light')).toBe(true);
    expect(html().classList.contains('dark')).toBe(false);
  });

  it('resolves defaultMode system from prefers-color-scheme', () => {
    const original = window.matchMedia;
    window.matchMedia = ((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
    })) as unknown as typeof window.matchMedia;
    run({ defaultMode: 'system' });
    expect(html().classList.contains('dark')).toBe(true);
    window.matchMedia = ((query: string) => ({
      matches: query !== '(prefers-color-scheme: dark)',
    })) as unknown as typeof window.matchMedia;
    run({ defaultMode: 'system' });
    expect(html().classList.contains('light')).toBe(true);
    expect(html().classList.contains('dark')).toBe(false);
    window.matchMedia = original;
  });

  it('falls back to defaultMode when nothing is persisted', () => {
    run({ defaultMode: 'light' });
    expect(html().classList.contains('light')).toBe(true);
    run();
    expect(html().classList.contains('dark')).toBe(true);
  });

  it('falls back to defaultMode on corrupt JSON without throwing', () => {
    localStorage.setItem('theme-storage', '{not json');
    expect(() => run({ defaultMode: 'light' })).not.toThrow();
    expect(html().classList.contains('light')).toBe(true);
  });

  it('honors a custom storageKey', () => {
    persist({ mode: 'light' }, 'custom-key');
    run({ storageKey: 'custom-key', defaultMode: 'dark' });
    expect(html().classList.contains('light')).toBe(true);
  });

  it('adds macos-tahoe from the persisted colorScheme', () => {
    persist({ mode: 'dark', colorScheme: 'macos-tahoe' });
    run();
    expect(html().classList.contains('macos-tahoe')).toBe(true);
    expect(html().classList.contains('macos')).toBe(false);
  });

  it('adds macos from the persisted layout', () => {
    persist({ mode: 'dark', layout: 'macos-navbar' });
    run();
    expect(html().classList.contains('macos')).toBe(true);
  });

  it('skips macos classes when applyColorScheme is false', () => {
    persist({ mode: 'dark', colorScheme: 'macos-tahoe' });
    run({ applyColorScheme: false });
    expect(html().classList.contains('macos-tahoe')).toBe(false);
  });

  it('escapes option values so they cannot break out of the script tag', () => {
    const script = getThemeModeScript({ storageKey: '"</script><b>' });
    expect(script).not.toContain('</script>');
    expect(script).toContain('\\u003c/script>');
  });
});

describe('ThemeModeScript', () => {
  it('renders the inline script with the nonce', () => {
    const markup = renderToStaticMarkup(
      <ThemeModeScript nonce="abc123" defaultMode="light" />
    );
    expect(markup).toContain('<script');
    expect(markup).toContain('nonce="abc123"');
    expect(markup).toContain('theme-storage');
    expect(markup).toContain('"light"');
  });
});
