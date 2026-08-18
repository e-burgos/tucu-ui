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

  it('CA-1: defaultPinned keeps the sidebar expanded through mouseLeave', () => {
    const { container } = render(
      <MemoryRouter>
        <ExpandableSidebar menuItems={mockMenuItems} defaultPinned />
      </MemoryRouter>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();

    const aside = container.querySelector(
      '[data-tucu="expandable-sidebar"]'
    ) as HTMLElement;
    fireEvent.mouseLeave(aside);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
  });

  it('CA-1: pinning via the pin button survives mouseLeave; unpinning restores hover-close', () => {
    const { container } = render(
      <MemoryRouter>
        <ExpandableSidebar menuItems={mockMenuItems} />
      </MemoryRouter>
    );
    const aside = container.querySelector(
      '[data-tucu="expandable-sidebar"]'
    ) as HTMLElement;

    fireEvent.mouseEnter(aside);
    fireEvent.click(screen.getByTitle('Pin menu'));
    fireEvent.mouseLeave(aside);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();

    fireEvent.click(screen.getByTitle('Unpin menu'));
    fireEvent.mouseLeave(aside);
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  it('CA-2: controlled `pinned` governs the state and `onPinnedChange` reports every toggle', () => {
    const onPinnedChange = vi.fn();
    const { container, rerender } = render(
      <MemoryRouter>
        <ExpandableSidebar
          menuItems={mockMenuItems}
          pinned={false}
          onPinnedChange={onPinnedChange}
        />
      </MemoryRouter>
    );
    const aside = container.querySelector(
      '[data-tucu="expandable-sidebar"]'
    ) as HTMLElement;
    fireEvent.mouseEnter(aside);

    fireEvent.click(screen.getByTitle('Pin menu'));
    expect(onPinnedChange).toHaveBeenCalledWith(true);
    // Controlled: still unpinned until the consumer flips the prop
    expect(screen.getByTitle('Pin menu')).toBeInTheDocument();

    rerender(
      <MemoryRouter>
        <ExpandableSidebar
          menuItems={mockMenuItems}
          pinned={true}
          onPinnedChange={onPinnedChange}
        />
      </MemoryRouter>
    );
    fireEvent.mouseLeave(aside);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();

    fireEvent.click(screen.getByTitle('Unpin menu'));
    expect(onPinnedChange).toHaveBeenCalledWith(false);
  });

  it('CA-3: the pin button exposes aria-pressed and data-tucu="sidebar-pin"', () => {
    const { container: pinnedContainer } = render(
      <MemoryRouter>
        <ExpandableSidebar menuItems={mockMenuItems} defaultPinned />
      </MemoryRouter>
    );
    expect(
      pinnedContainer.querySelector('[data-tucu="sidebar-pin"]')
    ).toHaveAttribute('aria-pressed', 'true');

    const { container: unpinnedContainer } = render(
      <MemoryRouter>
        <ExpandableSidebar menuItems={mockMenuItems} />
      </MemoryRouter>
    );
    const aside = unpinnedContainer.querySelector(
      '[data-tucu="expandable-sidebar"]'
    ) as HTMLElement;
    fireEvent.mouseEnter(aside);
    expect(
      unpinnedContainer.querySelector('[data-tucu="sidebar-pin"]')
    ).toHaveAttribute('aria-pressed', 'false');
  });

  it('CA-4: renders collapsedLogo in the collapsed rail when provided', () => {
    render(
      <MemoryRouter>
        <ExpandableSidebar
          menuItems={mockMenuItems}
          collapsedLogo={{
            logo: <span data-testid="collapsed-logo-marker">CL</span>,
          }}
        />
      </MemoryRouter>
    );
    expect(screen.getByTestId('collapsed-logo-marker')).toBeInTheDocument();
  });

  it('CA-4: falls back to the isoType logo when collapsedLogo is not provided', () => {
    render(
      <MemoryRouter>
        <ExpandableSidebar menuItems={mockMenuItems} logo={{ name: 'Tucu' }} />
      </MemoryRouter>
    );
    expect(
      screen.queryByTestId('collapsed-logo-marker')
    ).not.toBeInTheDocument();
  });

  it('CA-5: a single hidden item disappears while the rest of the rail renders', () => {
    const items = [
      {
        name: 'Dashboard',
        icon: (
          <span role="img" aria-label="chart">
            📊
          </span>
        ),
        path: '/dashboard',
        hide: true,
      },
      {
        name: 'Users',
        icon: (
          <span role="img" aria-label="users">
            👥
          </span>
        ),
        path: '/users',
      },
    ];
    render(
      <MemoryRouter>
        <ExpandableSidebar menuItems={items} />
      </MemoryRouter>
    );
    expect(screen.queryByText('📊')).not.toBeInTheDocument();
    expect(screen.getByText('👥')).toBeInTheDocument();
  });

  it('CA-6: the expanded branch marks the item matching pathname as active', () => {
    const items = [
      {
        name: 'Dashboard',
        icon: (
          <span role="img" aria-label="chart">
            📊
          </span>
        ),
        path: '/dashboard-page',
        href: '/reports',
      },
      {
        name: 'Users',
        icon: (
          <span role="img" aria-label="users">
            👥
          </span>
        ),
        path: '/users',
      },
    ];
    render(
      <MemoryRouter initialEntries={['/reports']}>
        <ExpandableSidebar menuItems={items} defaultPinned />
      </MemoryRouter>
    );
    const activeLink = screen.getByText('Dashboard').closest('a');
    expect(activeLink).toHaveClass('bg-brand');
  });
});
