import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

import { Drawer } from '../../components/dialog/drawer';

describe('Drawer', () => {
  it('renders without crashing when open', () => {
    const { baseElement } = render(
      <MemoryRouter>
        <Drawer isOpen={true} setIsOpen={vi.fn()} type="sidebar">
          <p>Drawer content</p>
        </Drawer>
      </MemoryRouter>
    );
    expect(baseElement).toBeInTheDocument();
  });

  it('renders sidebar-menu type without crashing', () => {
    const menuItems = [{ name: 'Home', path: '/', icon: <span>H</span> }];
    const { baseElement } = render(
      <MemoryRouter>
        <Drawer
          isOpen={true}
          setIsOpen={vi.fn()}
          type="sidebar-menu"
          menuItems={menuItems}
        />
      </MemoryRouter>
    );
    expect(baseElement).toBeInTheDocument();
  });
});
