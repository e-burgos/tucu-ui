import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Badge } from '../../components/common/badge';

describe('Badge', () => {
  it('renders without crashing', () => {
    const { container } = render(<Badge>Active</Badge>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children text', () => {
    render(
      <Badge variant="solid" color="primary">
        Status
      </Badge>
    );
    expect(screen.getByText('Status')).toBeInTheDocument();
  });
});

describe('Badge contrast', () => {
  it.each([
    ['success', 'bg-green-700'],
    ['info', 'bg-blue-600'],
    ['warning', 'bg-yellow-700'],
    ['danger', 'bg-red-600'],
    ['gray', 'bg-gray-600'],
  ] as const)('solid %s uses an AA-contrast background', (color, expected) => {
    const { container } = render(<Badge color={color}>Estado</Badge>);
    const badge = container.querySelector('[data-tucu="badge"]') as HTMLElement;
    expect(badge.className).toContain(expected);
    expect(badge.className).toContain('text-white');
  });
});
