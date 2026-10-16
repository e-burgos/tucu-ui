import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

import { Tooltip } from '../../components/common/tooltip';

describe('Tooltip', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <Tooltip content="Tooltip text">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the trigger element', () => {
    render(
      <Tooltip content="Info">
        <button>Click here</button>
      </Tooltip>
    );
    expect(screen.getByText('Click here')).toBeInTheDocument();
  });
});

describe('Tooltip contrast', () => {
  it.each([
    ['success', 'bg-green-700'],
    ['info', 'bg-blue-600'],
    ['warning', 'bg-yellow-700'],
    ['danger', 'bg-red-600'],
  ] as const)('%s uses an AA-contrast background', (color, expected) => {
    render(
      <Tooltip content="Info" color={color}>
        <button>Trigger</button>
      </Tooltip>
    );
    fireEvent.focus(screen.getByText('Trigger'));
    fireEvent.mouseEnter(screen.getByText('Trigger'));
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip.className).toContain(expected);
    expect(tooltip.className).not.toMatch(/bg-\w+-500/);
  });
});
