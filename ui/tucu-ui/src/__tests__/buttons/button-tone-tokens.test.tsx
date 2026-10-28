import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import Button from '../../components/buttons/button/index';

const colors = [
  'primary',
  'white',
  'gray',
  'success',
  'info',
  'warning',
  'danger',
] as const;
const variants = ['solid', 'ghost', 'outline', 'transparent'] as const;

describe('Button tone tokens', () => {
  it.each(
    colors.flatMap((color) => variants.map((variant) => [color, variant] as const))
  )('%s %s emits no dark: utilities and exposes its data attributes', (color, variant) => {
    render(
      <Button color={color} variant={variant}>
        Go
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button.className).not.toContain('dark:');
    expect(button).toHaveAttribute('data-color', color);
    expect(button).toHaveAttribute('data-variant', variant);
  });

  it.each(variants)('disabled %s emits no dark: utilities', (variant) => {
    render(
      <Button disabled variant={variant} color="gray">
        Go
      </Button>
    );
    expect(screen.getByRole('button').className).not.toContain('dark:');
  });

  it('keeps the consumer className on gray and transparent buttons', () => {
    const { rerender } = render(
      <Button color="gray" className="bg-red-500 text-white">
        Go
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('bg-red-500', 'text-white');
    rerender(
      <Button variant="transparent" className="hover:bg-red-500">
        Go
      </Button>
    );
    expect(screen.getByRole('button')).toHaveClass('hover:bg-red-500');
  });
});
