import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { ExpandableSidebar } from '../../components/layouts/menus/expandable-sidebar';
import { useTheme } from '../../themes/hooks/use-theme';

beforeEach(() => {
  // The pinned state persists in the shared theme store; reset it so tests
  // stay independent.
  useTheme.setState({ isSidebarPinned: undefined });
});

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

  it('CA-1: expanding via the edge toggle survives mouseLeave; collapsing restores hover-close', () => {
    const { container } = render(
      <MemoryRouter>
        <ExpandableSidebar menuItems={mockMenuItems} />
      </MemoryRouter>
    );
    const aside = container.querySelector(
      '[data-tucu="expandable-sidebar"]'
    ) as HTMLElement;

    fireEvent.click(screen.getByTitle('Expand menu'));
    fireEvent.mouseLeave(aside);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();

    fireEvent.click(screen.getByTitle('Collapse menu'));
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();

    // Hover-to-expand behavior is restored once unpinned
    fireEvent.mouseEnter(aside);
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    fireEvent.mouseLeave(aside);
    expect(screen.queryByText('Dashboard')).not.toBeInTheDocument();
  });

  it('persists the pinned state through the theme store across remounts', () => {
    const { unmount } = render(
      <MemoryRouter>
        <ExpandableSidebar menuItems={mockMenuItems} />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByTitle('Expand menu'));
    expect(useTheme.getState().isSidebarPinned).toBe(true);
    unmount();

    render(
      <MemoryRouter>
        <ExpandableSidebar menuItems={mockMenuItems} />
      </MemoryRouter>
    );
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
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

    fireEvent.click(screen.getByTitle('Expand menu'));
    expect(onPinnedChange).toHaveBeenCalledWith(true);
    // Controlled: still collapsed until the consumer flips the prop
    expect(screen.getByTitle('Expand menu')).toBeInTheDocument();
    // Controlled mode never touches the persisted store value
    expect(useTheme.getState().isSidebarPinned).toBeUndefined();

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

    fireEvent.click(screen.getByTitle('Collapse menu'));
    expect(onPinnedChange).toHaveBeenCalledWith(false);
  });

  it('CA-3: the edge toggle exposes aria-pressed and data-tucu="sidebar-pin" in both states', () => {
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
