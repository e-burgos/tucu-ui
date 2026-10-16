import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, screen } from '@testing-library/react';
import React from 'react';

import Button from '../../components/buttons/button/index';

describe('Button', () => {
  it('renders without crashing', () => {
    const { container } = render(<Button>Click me</Button>);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children text', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn();
    const { getByText } = render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(getByText('Click'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('does not call onClick when disabled', () => {
    const handleClick = vi.fn();
    const { getByText } = render(
      <Button onClick={handleClick} disabled>
        Click
      </Button>
    );
    fireEvent.click(getByText('Click'));
    expect(handleClick).not.toHaveBeenCalled();
  });
});

describe('Button contrast', () => {
  it.each([
    ['success', 'bg-green-700'],
    ['info', 'bg-blue-600'],
    ['warning', 'bg-yellow-700'],
    ['danger', 'bg-red-600'],
    ['gray', 'bg-gray-600'],
  ] as const)('solid %s uses an AA-contrast background', (color, expected) => {
    render(<Button color={color}>Guardar</Button>);
    const button = screen.getByRole('button', { name: 'Guardar' });
    expect(button.className).toContain(expected);
    expect(button.className).not.toMatch(/bg-\w+-500/);
  });
});
