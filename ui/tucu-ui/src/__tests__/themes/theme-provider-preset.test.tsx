import React from 'react';
import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { TucuNavigationContext } from '../../themes/navigation';
import type { TucuNavigation } from '../../themes/navigation';
import { useTheme } from '../../themes/hooks/use-theme';
import { ThemeWrapper } from '../../themes/components/theme-provider/theme-wrapper';
import { registerThemePresets, resetThemePresets } from '../../themes/presets';

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

const renderWrapper = (props: Record<string, unknown>) =>
  render(
    <TucuNavigationContext.Provider value={navigation}>
      <ThemeWrapper menuItems={[]} layout="clean" {...(props as object)}>
        <p>content</p>
      </ThemeWrapper>
    </TucuNavigationContext.Provider>
  );

const html = () => document.documentElement;

describe('ThemeWrapper preset', () => {
  beforeEach(() => {
    window.localStorage.clear();
    useTheme.setState({ mode: 'light' });
  });

  afterEach(() => {
    resetThemePresets();
    window.localStorage.clear();
    useTheme.setState({ colorScheme: 'default', mode: 'light' });
  });

  it('writes preset variables and attributes on <html> and cleans them up', () => {
    const { unmount } = renderWrapper({ preset: 'glass' });
    expect(html().style.getPropertyValue('--tucu-accent')).toBe('#0d9488');
    expect(html().style.getPropertyValue('--tucu-radius')).toBe('0.75rem');
    expect(html().getAttribute('data-tucu-cards')).toBe('glass');
    expect(html().getAttribute('data-tucu-buttons')).toBe('rounded');
    unmount();
    expect(html().style.getPropertyValue('--tucu-accent')).toBe('');
    expect(html().hasAttribute('data-tucu-cards')).toBe(false);
  });

  it('aligns the store primary presets with the preset accents', () => {
    registerThemePresets({ name: 'duo', accent: '#102030', darkAccent: '#a0b0c0' });
    renderWrapper({ preset: 'duo' });
    expect(useTheme.getState().primaryPreset.value).toBe('#102030');
    expect(useTheme.getState().darkPrimaryPreset.value).toBe('#a0b0c0');
  });

  it('wins over brandColor', () => {
    renderWrapper({ preset: { name: 'inline', accent: '#123456' }, brandColor: 'Pink' });
    expect(useTheme.getState().primaryPreset.value).toBe('#123456');
  });

  it('re-applies the dark accent when the mode changes', () => {
    registerThemePresets({ name: 'duo', accent: '#102030', darkAccent: '#a0b0c0' });
    renderWrapper({ preset: 'duo' });
    expect(html().style.getPropertyValue('--tucu-accent')).toBe('#102030');
    React.act(() => useTheme.setState({ mode: 'dark' }));
    expect(html().style.getPropertyValue('--tucu-accent')).toBe('#a0b0c0');
  });

  it('leaves <html> untouched without a preset', () => {
    renderWrapper({});
    expect(html().style.getPropertyValue('--tucu-accent')).toBe('');
    expect(html().hasAttribute('data-tucu-cards')).toBe(false);
  });
});
