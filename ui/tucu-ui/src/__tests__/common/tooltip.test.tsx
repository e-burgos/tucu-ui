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

describe('Tooltip always in the DOM', () => {
  it('renders the tooltip hidden while closed and linked from the trigger', () => {
    render(
      <Tooltip content="Always here">
        <button>Trigger</button>
      </Tooltip>
    );
    const tooltip = screen.getByRole('tooltip', { hidden: true });
    expect(tooltip).toHaveTextContent('Always here');
    expect(tooltip).toBeInTheDocument();
    expect(tooltip).not.toBeVisible();
    expect(tooltip).toHaveAttribute('aria-hidden', 'true');
    expect(screen.getByText('Trigger')).toHaveAttribute(
      'aria-describedby',
      tooltip.id
    );
  });

  it('becomes visible on hover and is not portaled to body', () => {
    const { container } = render(
      <Tooltip content="Shown" leaveDelay={0}>
        <button>Trigger</button>
      </Tooltip>
    );
    fireEvent.mouseEnter(screen.getByText('Trigger'));
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toBeVisible();
    expect(container).toContainElement(tooltip);
    fireEvent.mouseLeave(screen.getByText('Trigger'));
    expect(screen.getByRole('tooltip', { hidden: true })).not.toBeVisible();
  });
});

describe('Tooltip size', () => {
  it('applies size and contentClassName', () => {
    render(
      <Tooltip content="Tip" size="xs" contentClassName="extra-box">
        <button>Anchor</button>
      </Tooltip>
    );
    const tip = screen.getByRole('tooltip', { hidden: true });
    expect(tip.className).toContain('text-xs');
    expect(tip.className).toContain('extra-box');
  });

  it('keeps the default md look', () => {
    render(
      <Tooltip content="Tip">
        <button>Anchor</button>
      </Tooltip>
    );
    const tip = screen.getByRole('tooltip', { hidden: true });
    expect(tip.className).toContain('text-sm');
    expect(tip.className).toContain('px-3');
  });
});
