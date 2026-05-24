import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { InputSearcher } from '../../components/inputs/input-searcher';

describe('InputSearcher', () => {
  const options = [
    { name: 'React', value: 'react' },
    { name: 'Vue', value: 'vue' },
    { name: 'Angular', value: 'angular' },
  ];

  it('renders without crashing', () => {
    const { container } = render(
      <InputSearcher options={options} onOptionSelect={vi.fn()} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with a placeholder', () => {
    const { container } = render(
      <InputSearcher
        options={options}
        placeholder="Search framework"
        onOptionSelect={vi.fn()}
      />
    );
    const input = container.querySelector('input');
    expect(input).toHaveAttribute('placeholder', 'Search framework');
  });
});
