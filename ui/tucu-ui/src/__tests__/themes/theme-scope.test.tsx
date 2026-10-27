import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import {
  ThemeScope,
  registerThemePresets,
  resetThemePresets,
  useThemeScope,
} from '../../themes';
import { usePortalContainer } from '../../themes/components/theme-scope/portal-container';
import { Modal } from '../../components/dialog/modal';
import { Select } from '../../components/inputs/select';

afterEach(() => {
  document.documentElement.classList.remove('dark');
  resetThemePresets();
});

const scopeOf = (id: string) => screen.getByTestId(id);

describe('ThemeScope', () => {
  it('renders each scope with its own inline accent variable', () => {
    registerThemePresets(
      { name: 'one', accent: '#112233' },
      { name: 'two', accent: '#445566' }
    );
    render(
      <>
        <ThemeScope preset="one" data-testid="a">
          x
        </ThemeScope>
        <ThemeScope preset="two" data-testid="b">
          y
        </ThemeScope>
      </>
    );
    expect(scopeOf('a').style.getPropertyValue('--tucu-accent')).toBe('#112233');
    expect(scopeOf('b').style.getPropertyValue('--tucu-accent')).toBe('#445566');
    expect(scopeOf('a')).toHaveAttribute('data-tucu', 'theme-scope');
    expect(scopeOf('a')).toHaveAttribute('data-tucu-theme', 'one');
    expect(scopeOf('b')).toHaveAttribute('data-tucu-theme', 'two');
  });

  it('accepts an inline preset and extra tokens', () => {
    render(
      <ThemeScope
        preset={{ name: 'inline', accent: '#abcdef', cards: 'glass', buttons: 'pill' }}
        tokens={{ '--custom': '1px' }}
        data-testid="s"
      />
    );
    const scope = scopeOf('s');
    expect(scope.style.getPropertyValue('--tucu-accent')).toBe('#abcdef');
    expect(scope.style.getPropertyValue('--custom')).toBe('1px');
    expect(scope).toHaveAttribute('data-tucu-cards', 'glass');
    expect(scope).toHaveAttribute('data-tucu-buttons', 'pill');
  });

  it('marks a presetless scope as custom', () => {
    render(<ThemeScope data-testid="s" />);
    expect(scopeOf('s')).toHaveAttribute('data-tucu-theme', 'custom');
  });

  it('forces light mode inside a dark page', () => {
    document.documentElement.classList.add('dark');
    render(<ThemeScope mode="light" data-testid="s" />);
    expect(scopeOf('s')).toHaveAttribute('data-tucu-mode', 'light');
    expect(scopeOf('s').classList.contains('dark')).toBe(false);
  });

  it('forces dark mode inside a light page', () => {
    render(<ThemeScope mode="dark" data-testid="s" />);
    expect(scopeOf('s')).toHaveAttribute('data-tucu-mode', 'dark');
    expect(scopeOf('s').classList.contains('dark')).toBe(true);
  });

  it('follows the page color scheme in auto mode', async () => {
    render(<ThemeScope data-testid="s" />);
    expect(scopeOf('s')).toHaveAttribute('data-tucu-mode', 'light');
    await act(async () => {
      document.documentElement.classList.add('dark');
    });
    expect(scopeOf('s')).toHaveAttribute('data-tucu-mode', 'dark');
  });

  it('uses the preset surface when no mode is given and swaps accent per mode', () => {
    registerThemePresets({
      name: 'night',
      accent: '#111111',
      darkAccent: '#eeeeee',
      surface: 'dark',
    });
    render(<ThemeScope preset="night" data-testid="s" />);
    expect(scopeOf('s')).toHaveAttribute('data-tucu-mode', 'dark');
    expect(scopeOf('s').style.getPropertyValue('--tucu-accent')).toBe('#eeeeee');
  });

  it('renders as the requested element', () => {
    render(<ThemeScope as="section" data-testid="s" />);
    expect(scopeOf('s').tagName).toBe('SECTION');
  });

  it('exposes preset and mode through useThemeScope and inherits into nested scopes', () => {
    const Probe = () => {
      const scope = useThemeScope();
      return <span data-testid="probe">{`${scope?.preset?.name}:${scope?.mode}`}</span>;
    };
    render(
      <ThemeScope preset="glass" mode="dark">
        <ThemeScope>
          <Probe />
        </ThemeScope>
      </ThemeScope>
    );
    expect(screen.getByTestId('probe')).toHaveTextContent('glass:dark');
  });

  it('returns null from useThemeScope outside a scope', () => {
    const Probe = () => <span data-testid="p">{String(useThemeScope())}</span>;
    render(<Probe />);
    expect(screen.getByTestId('p')).toHaveTextContent('null');
  });
});

describe('portal container', () => {
  it('falls back to document.body outside a scope', () => {
    const Probe = () => (
      <span data-testid="p">{String(usePortalContainer() === document.body)}</span>
    );
    render(<Probe />);
    expect(screen.getByTestId('p')).toHaveTextContent('true');
  });

  it('mounts a Modal opened inside a scope into that scope portal host', () => {
    render(
      <>
        <ThemeScope preset="glass" data-testid="scope">
          <Modal isOpen setIsOpen={vi.fn()} text={{ title: 'Scoped' }} hideButtons>
            <p>inside</p>
          </Modal>
        </ThemeScope>
        <ThemeScope preset="classic" data-testid="other" />
      </>
    );
    const host = scopeOf('scope').querySelector('[data-tucu="theme-scope-portal"]');
    expect(host).not.toBeNull();
    expect(host?.contains(screen.getByText('inside'))).toBe(true);
    expect(
      scopeOf('other')
        .querySelector('[data-tucu="theme-scope-portal"]')
        ?.contains(screen.getByText('inside'))
    ).toBe(false);
  });

  it('keeps a Modal outside any scope in document.body', () => {
    render(
      <div data-testid="app">
        <Modal isOpen setIsOpen={vi.fn()} hideButtons>
          <p>outside</p>
        </Modal>
      </div>
    );
    expect(screen.getByTestId('app').contains(screen.getByText('outside'))).toBe(false);
    expect(document.body.contains(screen.getByText('outside'))).toBe(true);
  });

  it('opens a Select listbox inside the scope portal host', () => {
    render(
      <ThemeScope preset="glass" data-testid="scope">
        <Select
          options={[
            { name: 'Apple', value: 'apple' },
            { name: 'Pear', value: 'pear' },
          ]}
          onSelect={vi.fn()}
        />
      </ThemeScope>
    );
    fireEvent.click(screen.getByRole('combobox'));
    const listbox = screen.getByRole('listbox');
    const host = scopeOf('scope').querySelector('[data-tucu="theme-scope-portal"]');
    expect(host?.contains(listbox)).toBe(true);
  });

  it('opens a Select listbox in document.body outside a scope', () => {
    render(
      <div data-testid="app">
        <Select options={[{ name: 'Apple', value: 'apple' }]} onSelect={vi.fn()} />
      </div>
    );
    fireEvent.click(screen.getByRole('combobox'));
    const listbox = screen.getByRole('listbox');
    expect(screen.getByTestId('app').contains(listbox)).toBe(false);
    expect(listbox.closest('[data-tucu="theme-scope-portal"]')).toBeNull();
  });
});
