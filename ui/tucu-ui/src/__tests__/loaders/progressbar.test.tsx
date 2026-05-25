import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Progressbar } from '../../components/loaders/progressbar';

describe('Progressbar', () => {
  it('renders without crashing', () => {
    const { container } = render(<Progressbar value={50} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with data-tucu attribute', () => {
    const { container } = render(<Progressbar value={30} />);
    expect(
      container.querySelector('[data-tucu="progressbar"]')
    ).toBeInTheDocument();
  });

  it('sets aria-valuenow correctly', () => {
    render(<Progressbar value={75} />);
    const bar = screen.getByRole('progressbar');
    expect(bar).toHaveAttribute('aria-valuenow', '75');
  });

  it('renders with label when size is xl', () => {
    render(<Progressbar value={60} label="60%" size="xl" />);
    expect(screen.getByText('60%')).toBeInTheDocument();
  });

  it('renders with different variants', () => {
    const { container } = render(<Progressbar value={40} variant="flat" />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
