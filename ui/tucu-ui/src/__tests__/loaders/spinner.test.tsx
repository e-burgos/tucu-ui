import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { Spinner } from '../../components/loaders/spinner';

describe('Spinner', () => {
  it('renders without crashing', () => {
    const { container } = render(<Spinner />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with data-tucu attribute', () => {
    const { container } = render(<Spinner />);
    expect(
      container.querySelector('[data-tucu="spinner"]')
    ).toBeInTheDocument();
  });

  it('renders with small size', () => {
    const { container } = render(<Spinner size="sm" />);
    expect(container.querySelector('.w-4')).toBeInTheDocument();
  });

  it('renders with large size', () => {
    const { container } = render(<Spinner size="lg" />);
    expect(container.querySelector('.w-8')).toBeInTheDocument();
  });

  it('renders with custom color', () => {
    const { container } = render(<Spinner color="success" />);
    expect(container.querySelector('.border-t-green-500')).toBeInTheDocument();
  });
});
