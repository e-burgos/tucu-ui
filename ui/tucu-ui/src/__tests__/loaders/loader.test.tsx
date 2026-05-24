import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { Loader } from '../../components/loaders/loader';

describe('Loader', () => {
  it('renders without crashing', () => {
    const { container } = render(<Loader />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with data-tucu attribute', () => {
    const { container } = render(<Loader />);
    expect(container.querySelector('[data-tucu="loader"]')).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    const { container } = render(<Loader size="large" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with custom variant', () => {
    const { container } = render(<Loader variant="blink" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders as span tag', () => {
    const { container } = render(<Loader tag="span" />);
    expect(
      container.querySelector('span[data-tucu="loader"]')
    ).toBeInTheDocument();
  });
});
