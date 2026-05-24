import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Select } from '../../components/inputs/select';

describe('Select', () => {
  const options = [
    { name: 'Apple', value: 'apple' },
    { name: 'Banana', value: 'banana' },
    { name: 'Cherry', value: 'cherry' },
  ];

  it('renders without crashing', () => {
    const { container } = render(
      <Select options={options} onSelect={vi.fn()} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with a label', () => {
    render(<Select options={options} label="Fruit" onSelect={vi.fn()} />);
    expect(screen.getByText('Fruit')).toBeInTheDocument();
  });
});
