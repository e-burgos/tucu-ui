import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

import { SidebarMenu } from '../../components/dialog/sidebar-menu';

describe('SidebarMenu', () => {
  it('renders without crashing', () => {
    const menuItems = [
      { name: 'Home', path: '/', icon: <span>H</span> },
      { name: 'About', path: '/about', icon: <span>A</span> },
    ];
    const { container } = render(
      <MemoryRouter>
        <SidebarMenu menuItems={menuItems} onClose={vi.fn()} />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('runs both the item own onClick and onClose when selecting an item', () => {
    const onItemClick = vi.fn();
    const onClose = vi.fn();
    render(
      <MemoryRouter>
        <SidebarMenu
          menuItems={[
            { name: 'Logout', path: '/logout', onClick: onItemClick },
          ]}
          onClose={onClose}
        />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Logout'));
    expect(onItemClick).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('runs both the dropdown item own onClick and onClose when selecting a subitem', () => {
    const onSubItemClick = vi.fn();
    const onClose = vi.fn();
    render(
      <MemoryRouter>
        <SidebarMenu
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
          onClose={onClose}
        />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Profile'));
    expect(onSubItemClick).toHaveBeenCalledTimes(1);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
