import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ExpandableSidebar } from '../../components/layouts/menus/expandable-sidebar';

vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    ul: 'ul',
    li: 'li',
    span: 'span',
    aside: 'aside',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

const mockMenuItems = [
  {
    name: 'Dashboard',
    icon: (
      <span role="img" aria-label="chart">
        📊
      </span>
    ),
    path: '/dashboard',
  },
  { name: 'Users', icon: <span>👥</span>, path: '/users' },
];

describe('ExpandableSidebar', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <ExpandableSidebar menuItems={mockMenuItems} />
      </MemoryRouter>
    );
    expect(
      container.querySelector('[data-tucu="expandable-sidebar"]')
    ).toBeTruthy();
  });

  it('renders menu item icons in collapsed state', () => {
    render(
      <MemoryRouter>
        <ExpandableSidebar menuItems={mockMenuItems} />
      </MemoryRouter>
    );
    // In collapsed state (default), the sidebar renders icons with empty names
    expect(screen.getByText('📊')).toBeInTheDocument();
    expect(screen.getByText('👥')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <MemoryRouter>
        <ExpandableSidebar menuItems={mockMenuItems} className="sidebar-cls" />
      </MemoryRouter>
    );
    expect(
      container.querySelector('[data-tucu="expandable-sidebar"]')
    ).toHaveClass('sidebar-cls');
  });

  it('runs the item own onClick when selecting an item in the expanded state', () => {
    const onItemClick = vi.fn();
    const { container } = render(
      <MemoryRouter>
        <ExpandableSidebar
          menuItems={[
            { name: 'Dashboard', path: '/dashboard', onClick: onItemClick },
          ]}
        />
      </MemoryRouter>
    );
    const sidebar = container.querySelector('[data-tucu="expandable-sidebar"]');
    if (!sidebar) throw new Error('Expected the sidebar to render');
    fireEvent.mouseEnter(sidebar);
    fireEvent.click(screen.getByText('Dashboard'));
    expect(onItemClick).toHaveBeenCalledTimes(1);
  });

  it('runs the dropdown item own onClick when selecting a subitem', () => {
    const onSubItemClick = vi.fn();
    const { container } = render(
      <MemoryRouter>
        <ExpandableSidebar
          menuItems={[
            {
              name: 'Settings',
              path: '/settings',
              dropdownItems: [
                {
                  name: 'Profile',
                  path: '/settings/profile',
                  onClick: onSubItemClick,
                },
              ],
            },
          ]}
        />
      </MemoryRouter>
    );
    const sidebar = container.querySelector('[data-tucu="expandable-sidebar"]');
    if (!sidebar) throw new Error('Expected the sidebar to render');
    fireEvent.mouseEnter(sidebar);
    fireEvent.click(screen.getByText('Profile'));
    expect(onSubItemClick).toHaveBeenCalledTimes(1);
  });
});
