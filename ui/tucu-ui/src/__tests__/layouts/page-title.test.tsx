import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { MacOSTahoeLayout } from '../../components/layouts/macos-layout/macos-tahoe-layout';
import { findCurrentPageTitle } from '../../components/layouts/macos-layout/utils';
import type { IMenuItem } from '../../components/layouts/menus/menu-item';

const menuItems = [
  { name: 'Comercios', path: '/commerces', icon: null },
  { name: 'Usuarios', path: '/users', icon: null },
] as unknown as IMenuItem[];

describe('macOS layout page title', () => {
  it('matches nested routes to the owning menu item', () => {
    expect(findCurrentPageTitle(menuItems, '/commerces')).toBe('Comercios');
    expect(findCurrentPageTitle(menuItems, '/commerces/abc-123')).toBe(
      'Comercios'
    );
    expect(findCurrentPageTitle(menuItems, '/other')).toBeNull();
  });

  const renderAt = (path: string, pageTitle?: string) =>
    render(
      <MemoryRouter initialEntries={[path]}>
        <MacOSTahoeLayout menuItems={menuItems} pageTitle={pageTitle}>
          <div>contenido</div>
        </MacOSTahoeLayout>
      </MemoryRouter>
    );

  it('never falls back to a hardcoded "Overview"', () => {
    renderAt('/unknown/route');
    expect(screen.queryByText('Overview')).toBeNull();
  });

  it('lets the consumer override the title', () => {
    renderAt('/commerces/abc-123', 'Óptica Central');
    const center = document.querySelector(
      '[data-tucu="macos-tahoe-toolbar-center"]'
    );
    expect(center).toHaveTextContent('Óptica Central');
  });

  it('derives the title from the menu for nested routes', () => {
    renderAt('/commerces/abc-123');
    const center = document.querySelector(
      '[data-tucu="macos-tahoe-toolbar-center"]'
    );
    expect(center).toHaveTextContent('Comercios');
  });
});
