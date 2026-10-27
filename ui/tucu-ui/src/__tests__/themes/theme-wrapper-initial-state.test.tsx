import React from 'react';
import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { TucuNavigationContext } from '../../themes/navigation';
import type { TucuNavigation } from '../../themes/navigation';
import { useTheme } from '../../themes/hooks/use-theme';
import { ThemeWrapper } from '../../themes/components/theme-provider/theme-wrapper';

const navigation: TucuNavigation = {
  pathname: '/',
  searchParams: new URLSearchParams(),
  useParams: () => ({}),
  navigate: () => undefined,
  setSearchParams: () => undefined,
  Link: ({ to, children, className }) => (
    <a href={typeof to === 'string' ? to : to.pathname} className={className}>
      {children}
    </a>
  ),
};

const renderWrapper = (props: Partial<React.ComponentProps<typeof ThemeWrapper>>) =>
  render(
    <TucuNavigationContext.Provider value={navigation}>
      <ThemeWrapper menuItems={[]} {...(props as object)}>
        <p>content</p>
      </ThemeWrapper>
    </TucuNavigationContext.Provider>
  );

describe('ThemeWrapper initial state', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  afterEach(() => {
    window.localStorage.clear();
    useTheme.setState({ colorScheme: 'default', mode: 'light' });
  });

  it('switches a persisted macos-tahoe scheme to default when the layout is clean', () => {
    useTheme.setState({ colorScheme: 'macos-tahoe' });
    renderWrapper({ layout: 'clean' });
    expect(useTheme.getState().colorScheme).toBe('default');
    expect(document.documentElement.classList.contains('macos-tahoe')).toBe(false);
  });

  it('keeps an explicit themeStyle', () => {
    renderWrapper({ themeStyle: 'macos-tahoe', layout: 'macos-tahoe' } as never);
    expect(useTheme.getState().colorScheme).toBe('macos-tahoe');
  });

  it('applies defaultMode when no theme state is persisted', () => {
    useTheme.setState({ mode: 'light' });
    window.localStorage.removeItem('theme-storage');
    renderWrapper({ layout: 'clean', defaultMode: 'dark' });
    expect(useTheme.getState().mode).toBe('dark');
  });

  it('resolves defaultMode system from prefers-color-scheme', () => {
    const original = window.matchMedia;
    window.matchMedia = ((query: string) => ({
      matches: query === '(prefers-color-scheme: dark)',
    })) as unknown as typeof window.matchMedia;
    useTheme.setState({ mode: 'light' });
    window.localStorage.removeItem('theme-storage');
    renderWrapper({ layout: 'clean', defaultMode: 'system' });
    expect(useTheme.getState().mode).toBe('dark');
    window.matchMedia = original;
  });

  it('keeps the persisted mode over defaultMode', () => {
    useTheme.setState({ mode: 'light' });
    expect(window.localStorage.getItem('theme-storage')).not.toBeNull();
    renderWrapper({ layout: 'clean', defaultMode: 'dark' });
    expect(useTheme.getState().mode).toBe('light');
  });

  it('forces mode when the mode prop is set', () => {
    useTheme.setState({ mode: 'light' });
    renderWrapper({ layout: 'clean', mode: 'dark' });
    expect(useTheme.getState().mode).toBe('dark');
  });
});
