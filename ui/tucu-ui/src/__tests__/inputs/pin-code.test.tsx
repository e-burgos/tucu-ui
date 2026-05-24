import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { PinCode } from '../../components/inputs/pin-code';

describe('PinCode', () => {
  it('renders without crashing', () => {
    const { container } = render(<PinCode onChange={vi.fn()} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the correct number of inputs by default (4)', () => {
    const { container } = render(<PinCode onChange={vi.fn()} />);
    const inputs = container.querySelectorAll('input');
    expect(inputs.length).toBe(4);
  });

  it('renders custom length', () => {
    const { container } = render(<PinCode length={6} onChange={vi.fn()} />);
    const inputs = container.querySelectorAll('input');
    expect(inputs.length).toBe(6);
  });
});
