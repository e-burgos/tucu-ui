import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';

import { Textarea } from '../../components/inputs/textarea';

describe('Textarea', () => {
  it('renders without crashing', () => {
    const { container } = render(<Textarea placeholder="Type here" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with a label', () => {
    render(<Textarea label="Description" placeholder="Enter description" />);
    expect(screen.getByText('Description')).toBeInTheDocument();
  });

  it('renders with the correct variant attribute', () => {
    render(<Textarea variant="solid" placeholder="solid textarea" />);
    const textarea = screen.getByPlaceholderText('solid textarea');
    expect(textarea).toHaveAttribute('data-variant', 'solid');
  });
});
