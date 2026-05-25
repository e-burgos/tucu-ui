import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Radio } from '../../components/inputs/radio';

describe('Radio', () => {
  it('renders without crashing', () => {
    const { container } = render(<Radio />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with a label', () => {
    render(<Radio label="Option A" />);
    expect(screen.getByText('Option A')).toBeInTheDocument();
  });

  it('renders as a radio input', () => {
    render(<Radio label="Option B" />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });
});
