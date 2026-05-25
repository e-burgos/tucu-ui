import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { HorizontalHeader } from '../../components/layouts/header/horizontal-header';

const mockMenuItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
];

describe('HorizontalHeader', () => {
  const defaultProps = {
    menuItems: mockMenuItems,
    isOpen: false,
    setIsOpen: vi.fn(),
  };

  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <HorizontalHeader {...defaultProps} />
      </MemoryRouter>
    );
    expect(
      container.querySelector('[data-tucu="horizontal-header"]')
    ).toBeTruthy();
  });

  it('applies custom className', () => {
    const { container } = render(
      <MemoryRouter>
        <HorizontalHeader {...defaultProps} className="hh-class" />
      </MemoryRouter>
    );
    expect(
      container.querySelector('[data-tucu="horizontal-header"]')
    ).toHaveClass('hh-class');
  });

  it('renders rightButton', () => {
    render(
      <MemoryRouter>
        <HorizontalHeader
          {...defaultProps}
          rightButton={<span>Actions</span>}
        />
      </MemoryRouter>
    );
    const actions = screen.getAllByText('Actions');
    expect(actions.length).toBeGreaterThanOrEqual(1);
  });
});
