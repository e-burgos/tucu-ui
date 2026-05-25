import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { TucuUiLogo } from '../../components/logos/tucu-ui-logo';

describe('TucuUiLogo', () => {
  it('renders without crashing', () => {
    const { container } = render(<TucuUiLogo />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders an SVG element', () => {
    const { container } = render(<TucuUiLogo />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('renders with custom size', () => {
    const { container } = render(<TucuUiLogo size={120} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '120');
  });

  it('applies custom className', () => {
    const { container } = render(<TucuUiLogo className="custom-class" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('custom-class');
  });
});
