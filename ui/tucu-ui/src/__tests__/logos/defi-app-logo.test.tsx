import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';

import { DefiAppLogo } from '../../components/logos/defi-app-logo';

describe('DefiAppLogo', () => {
  it('renders without crashing', () => {
    const { container } = render(<DefiAppLogo />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders an SVG element', () => {
    const { container } = render(<DefiAppLogo />);
    expect(container.querySelector('svg')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<DefiAppLogo className="my-logo" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('my-logo');
  });

  it('applies custom width and height', () => {
    const { container } = render(<DefiAppLogo width={64} height={64} />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('width', '64');
    expect(svg).toHaveAttribute('height', '64');
  });
});
