import { describe, it, expect, beforeEach, vi } from 'vitest';

/**
 * Reproduces the user-reported bug: pick a background from the settings
 * drawer, hard-refresh the page, the choice is lost.
 *
 * A "page reload" is simulated with vi.resetModules() + a fresh dynamic
 * import of the store module, hydrating from the same localStorage the
 * previous "session" wrote to.
 */

async function freshStore() {
  vi.resetModules();
  const mod = await import('../../themes/hooks/use-theme');
  return mod.useTheme;
}

function persistedSnapshot() {
  const raw = localStorage.getItem('theme-storage');
  return raw ? JSON.parse(raw) : null;
}

describe('theme store persistence across reloads', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('persists backgroundVariant to localStorage when picked', async () => {
    const useTheme = await freshStore();

    useTheme.getState().setBackgroundVariant('wallpaper');

    const snap = persistedSnapshot();
    expect(snap?.state?.backgroundVariant).toBe('wallpaper');
  });

  it('keeps a picked background after a reload (default scheme)', async () => {
    let useTheme = await freshStore();
    useTheme.getState().setBackgroundVariant('aurora');

    useTheme = await freshStore(); // reload
    expect(useTheme.getState().backgroundVariant).toBe('aurora');
  });

  it('keeps a picked background after a reload (macOS scheme)', async () => {
    let useTheme = await freshStore();
    useTheme.getState().applyMacOSTheme();
    useTheme.getState().setBackgroundVariant('wallpaper');

    useTheme = await freshStore(); // reload
    expect(useTheme.getState().colorScheme).toBe('macos');
    expect(useTheme.getState().backgroundVariant).toBe('wallpaper');
  });

  it('keeps the background when the wrapper mount effect re-runs after reload', async () => {
    let useTheme = await freshStore();
    useTheme.getState().applyMacOSTahoeTheme();
    useTheme.getState().setBackgroundVariant('window');

    useTheme = await freshStore(); // reload

    // What ThemeWrapper's mount effect does on every page load for an app
    // passing no theme props (e.g. test-lib):
    useTheme.setState({
      logo: { path: '/' },
      showSettings: true,
    });

    expect(useTheme.getState().backgroundVariant).toBe('window');
  });

  it('keeps the background when the app passes themeStyle on every load', async () => {
    let useTheme = await freshStore();
    useTheme.getState().applyThemeStyle('macos');
    useTheme.getState().setBackgroundVariant('depth');

    useTheme = await freshStore(); // reload

    // ThemeWrapper mount with a themeStyle prop re-applies it on every load.
    useTheme.getState().applyThemeStyle('macos');

    expect(useTheme.getState().backgroundVariant).toBe('depth');
  });
});
