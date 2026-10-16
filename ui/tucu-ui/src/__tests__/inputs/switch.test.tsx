import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { useTheme } from '../../themes/hooks/use-theme';
import React from 'react';

import { Switch } from '../../components/inputs/switch';

describe('Switch', () => {
  it('renders without crashing', () => {
    const { container } = render(<Switch checked={false} onChange={vi.fn()} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with a label', () => {
    render(<Switch checked={true} onChange={vi.fn()} label="Enable" />);
    expect(screen.getByText('Enable')).toBeInTheDocument();
  });
});

describe('Switch accessibility and i18n', () => {
  it('exposes role=switch with aria-checked', () => {
    const { rerender } = render(
      <Switch checked={false} onChange={vi.fn()} label="Activo" />
    );
    const control = screen.getByRole('switch');
    expect(control).toHaveAttribute('aria-checked', 'false');
    rerender(<Switch checked={true} onChange={vi.fn()} label="Activo" />);
    expect(screen.getByRole('switch')).toHaveAttribute('aria-checked', 'true');
  });

  it('translates the default labels and allows omitting them', () => {
    act(() => useTheme.setState({ lang: 'es-AR' }));
    const { rerender } = render(<Switch checked={false} onChange={vi.fn()} />);
    expect(screen.getByText('SÍ')).toBeInTheDocument();
    expect(screen.getByText('NO')).toBeInTheDocument();
    rerender(
      <Switch
        checked={false}
        onChange={vi.fn()}
        onLabel={null}
        offLabel={null}
      />
    );
    expect(screen.queryByText('SÍ')).toBeNull();
    expect(screen.queryByText('NO')).toBeNull();
    act(() => useTheme.setState({ lang: 'en' }));
  });
});
