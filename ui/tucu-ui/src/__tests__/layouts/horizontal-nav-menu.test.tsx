import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { HorizontalNavMenu } from '../../components/layouts/menus/horizontal-nav-menu';

const mockMenuItems = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  {
    name: 'Services',
    path: '/services',
    dropdownItems: [
      { name: 'Consulting', path: '/services/consulting' },
      { name: 'Support', path: '/services/support' },
    ],
  },
];

describe('HorizontalNavMenu', () => {
  it('renders menu items', () => {
    render(
      <MemoryRouter>
        <HorizontalNavMenu menuItems={mockMenuItems} />
      </MemoryRouter>
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
  });

  it('renders dropdown items', () => {
    render(
      <MemoryRouter>
        <HorizontalNavMenu menuItems={mockMenuItems} />
      </MemoryRouter>
    );
    expect(screen.getByText('Consulting')).toBeInTheDocument();
    expect(screen.getByText('Support')).toBeInTheDocument();
  });

  it('renders items without dropdown as links', () => {
    const items = [{ name: 'Simple', path: '/simple' }];
    render(
      <MemoryRouter>
        <HorizontalNavMenu menuItems={items} />
      </MemoryRouter>
    );
    expect(screen.getByText('Simple')).toBeInTheDocument();
  });
});
