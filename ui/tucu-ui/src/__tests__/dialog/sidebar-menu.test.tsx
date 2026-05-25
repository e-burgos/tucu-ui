import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
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
});
