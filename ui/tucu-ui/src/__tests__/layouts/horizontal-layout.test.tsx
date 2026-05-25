import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { HorizontalLayout } from '../../components/layouts/horizontal';

const mockMenuItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
];

describe('HorizontalLayout', () => {
  const defaultProps = {
    menuItems: mockMenuItems,
    isOpen: false,
    setIsOpen: vi.fn(),
  };

  it('renders children', () => {
    render(
      <MemoryRouter>
        <HorizontalLayout {...defaultProps}>
          Horizontal content
        </HorizontalLayout>
      </MemoryRouter>
    );
    expect(screen.getByText('Horizontal content')).toBeInTheDocument();
  });

  it('renders with data-tucu attribute', () => {
    const { container } = render(
      <MemoryRouter>
        <HorizontalLayout {...defaultProps}>Content</HorizontalLayout>
      </MemoryRouter>
    );
    expect(
      container.querySelector('[data-tucu="horizontal-layout"]')
    ).toBeTruthy();
  });

  it('renders main content area', () => {
    const { container } = render(
      <MemoryRouter>
        <HorizontalLayout {...defaultProps}>Content</HorizontalLayout>
      </MemoryRouter>
    );
    expect(
      container.querySelector('[data-tucu="horizontal-content"]')
    ).toBeTruthy();
  });

  it('applies contentClassName to main', () => {
    const { container } = render(
      <MemoryRouter>
        <HorizontalLayout {...defaultProps} contentClassName="h-content">
          Content
        </HorizontalLayout>
      </MemoryRouter>
    );
    expect(
      container.querySelector('[data-tucu="horizontal-content"]')
    ).toHaveClass('h-content');
  });

  it('applies custom className', () => {
    const { container } = render(
      <MemoryRouter>
        <HorizontalLayout {...defaultProps} className="h-layout">
          Content
        </HorizontalLayout>
      </MemoryRouter>
    );
    expect(
      container.querySelector('[data-tucu="horizontal-layout"]')
    ).toHaveClass('h-layout');
  });
});
