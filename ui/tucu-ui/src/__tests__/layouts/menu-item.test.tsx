import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { MenuItem } from '../../components/layouts/menus/menu-item';

vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    ul: 'ul',
    li: 'li',
    span: 'span',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

describe('MenuItem', () => {
  it('renders a simple menu item', () => {
    render(
      <MemoryRouter>
        <MenuItem name="Dashboard" path="/dashboard" />
      </MemoryRouter>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    render(
      <MemoryRouter>
        <MenuItem
          name="Home"
          path="/"
          icon={<span data-testid="icon">🏠</span>}
        />
      </MemoryRouter>
    );
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });

  it('renders dropdown items when present', () => {
    render(
      <MemoryRouter initialEntries={['/sub']}>
        <MenuItem
          name="Parent"
          path="/parent"
          dropdownItems={[{ name: 'Sub Item', path: '/sub' }]}
        />
      </MemoryRouter>
    );
    const parents = screen.getAllByText('Parent');
    expect(parents.length).toBeGreaterThanOrEqual(1);
    expect(screen.getByText('Sub Item')).toBeInTheDocument();
  });
});
