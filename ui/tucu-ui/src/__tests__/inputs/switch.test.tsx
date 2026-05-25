import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
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
