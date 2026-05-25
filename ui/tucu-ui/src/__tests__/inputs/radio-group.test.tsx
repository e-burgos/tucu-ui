import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { RadioGroup } from '../../components/inputs/radio-group';

describe('RadioGroup', () => {
  const options = [
    { label: 'Option 1', value: 'opt1' },
    { label: 'Option 2', value: 'opt2' },
    { label: 'Option 3', value: 'opt3' },
  ];

  it('renders without crashing', () => {
    const { container } = render(
      <RadioGroup options={options} onChange={vi.fn()} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<RadioGroup options={options} onChange={vi.fn()} />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });
});
