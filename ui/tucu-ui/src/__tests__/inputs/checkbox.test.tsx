import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Checkbox } from '../../components/inputs/checkbox';

describe('Checkbox', () => {
  it('renders without crashing', () => {
    const { container } = render(<Checkbox />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with a label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByText('Accept terms')).toBeInTheDocument();
  });

  it('can be checked', () => {
    render(<Checkbox label="Check me" defaultChecked />);
    const input = screen.getByRole('checkbox');
    expect(input).toBeChecked();
  });
});
