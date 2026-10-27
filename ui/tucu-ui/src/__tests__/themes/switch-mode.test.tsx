import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { SwitchMode } from '../../themes/components/settings/switch-mode';
import { useTheme } from '../../themes/hooks/use-theme';

describe('SwitchMode', () => {
  afterEach(() => {
    useTheme.setState({ mode: 'light', lang: 'en' });
  });

  it('renders a translated label and an accessible switch', () => {
    useTheme.setState({ mode: 'light', lang: 'es' });
    render(<SwitchMode />);
    expect(screen.getByText('Modo')).toBeTruthy();
    expect(screen.getByRole('switch', { name: 'Cambiar a modo oscuro' })).toBeTruthy();
  });

  it('omits the label when label is null', () => {
    render(<SwitchMode label={null} />);
    expect(screen.queryByText('Mode')).toBeNull();
  });

  it('renders an icon-only toggle that flips the mode', () => {
    useTheme.setState({ mode: 'light' });
    render(<SwitchMode iconOnly aria-label="Theme" />);
    const button = screen.getByRole('button', { name: 'Theme' });
    expect(button.getAttribute('aria-pressed')).toBe('false');
    fireEvent.click(button);
    expect(useTheme.getState().mode).toBe('dark');
  });
});
