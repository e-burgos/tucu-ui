import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { Hamburger } from '../../components/buttons/hamburger';

describe('Hamburger', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Hamburger isOpen={false} onClick={vi.fn()} />
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders in open state', () => {
    const { container } = render(<Hamburger isOpen={true} onClick={vi.fn()} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
