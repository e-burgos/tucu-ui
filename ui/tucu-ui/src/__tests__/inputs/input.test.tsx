import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Input } from '../../components/inputs/input';

describe('Input', () => {
  it('renders without crashing', () => {
    const { container } = render(<Input placeholder="Enter text" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with label', () => {
    render(<Input label="Name" placeholder="Enter name" />);
    expect(screen.getByPlaceholderText('Enter name')).toBeInTheDocument();
  });

  it('renders with a given variant', () => {
    const { container } = render(
      <Input variant="ghost" placeholder="ghost input" />
    );
    expect(
      container.querySelector('[data-variant="ghost"]')
    ).toBeInTheDocument();
  });
});
