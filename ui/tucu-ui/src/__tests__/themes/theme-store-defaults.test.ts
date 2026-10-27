import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useTheme } from '../../themes/hooks/use-theme';

describe('theme store defaults and setters', () => {
  beforeEach(() => {
    localStorage.clear();
    useTheme.setState({ colorScheme: 'default', mode: 'dark' });
  });

  it('starts a plain app on the default scheme without wallpaper', async () => {
    vi.resetModules();
    const { useTheme: freshTheme } = await import('../../themes/hooks/use-theme');
    expect(freshTheme.getState().colorScheme).toBe('default');
    expect(freshTheme.getState().backgroundVariant).toBe('none');
  });

  it('keeps macos-tahoe available when requested explicitly', () => {
    useTheme.getState().applyThemeStyle('macos-tahoe');
    expect(useTheme.getState().colorScheme).toBe('macos-tahoe');
  });

  it('setMode applied twice through getState always reads the latest state', () => {
    useTheme.getState().setMode('light');
    useTheme.getState().setMode('dark');
    useTheme.getState().setMode('light');
    expect(useTheme.getState().mode).toBe('light');
  });

  it('toggles mode from the current state on every call', () => {
    const toggleMode = () =>
      useTheme
        .getState()
        .setMode(useTheme.getState().mode === 'dark' ? 'light' : 'dark');
    toggleMode();
    expect(useTheme.getState().mode).toBe('light');
    toggleMode();
    expect(useTheme.getState().mode).toBe('dark');
  });
});
