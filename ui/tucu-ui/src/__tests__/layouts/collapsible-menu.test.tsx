import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { CollapsibleMenu } from '../../components/layouts/menus/collapsible-menu';

vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    ul: 'ul',
    li: 'li',
    span: 'span',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

describe('CollapsibleMenu', () => {
  it('renders a menu item with name', () => {
    render(
      <MemoryRouter>
        <CollapsibleMenu name="Section" path="/section" />
      </MemoryRouter>
    );
    expect(screen.getByText('Section')).toBeInTheDocument();
  });

  it('renders with icon', () => {
    render(
      <MemoryRouter>
        <CollapsibleMenu
          name="Section"
          path="/section"
          icon={
            <span role="img" aria-label="folder" data-testid="menu-icon">
              📁
            </span>
          }
        />
      </MemoryRouter>
    );
    expect(screen.getByTestId('menu-icon')).toBeInTheDocument();
  });

  it('renders dropdown items', () => {
    render(
      <MemoryRouter>
        <CollapsibleMenu
          name="Parent"
          path="/parent"
          dropdownItems={[
            { name: 'Child A', path: '/parent/a', href: '/parent/a' },
            { name: 'Child B', path: '/parent/b', href: '/parent/b' },
          ]}
        />
      </MemoryRouter>
    );
    expect(screen.getByText('Parent')).toBeInTheDocument();
  });

  it('toggles open state on click', () => {
    render(
      <MemoryRouter>
        <CollapsibleMenu
          name="Toggle"
          path="/toggle"
          dropdownItems={[
            { name: 'Sub', path: '/toggle/sub', href: '/toggle/sub' },
          ]}
        />
      </MemoryRouter>
    );
    const trigger = screen.getByText('Toggle');
    const clickable = trigger.closest('div');
    if (!clickable) throw new Error('Expected the trigger to sit inside a div');
    fireEvent.click(clickable);
    // After click, the dropdown should be toggled
    expect(screen.getByText('Sub')).toBeInTheDocument();
  });

  it('runs both the subitem own onClick and the menu-level onClick', () => {
    const menuOnClick = vi.fn();
    const subItemOnClick = vi.fn();
    render(
      <MemoryRouter>
        <CollapsibleMenu
          name="Parent"
          path="/parent"
          onClick={menuOnClick}
          dropdownItems={[
            {
              name: 'Child A',
              path: '/parent/a',
              href: '/parent/a',
              onClick: subItemOnClick,
            },
          ]}
        />
      </MemoryRouter>
    );
    fireEvent.click(screen.getByText('Child A'));
    expect(subItemOnClick).toHaveBeenCalledTimes(1);
    expect(menuOnClick).toHaveBeenCalledTimes(1);
  });

  it('does not break when a subitem has no onClick', () => {
    const menuOnClick = vi.fn();
    render(
      <MemoryRouter>
        <CollapsibleMenu
          name="Parent"
          path="/parent"
          onClick={menuOnClick}
          dropdownItems={[
            { name: 'Child B', path: '/parent/b', href: '/parent/b' },
          ]}
        />
      </MemoryRouter>
    );
    expect(() => fireEvent.click(screen.getByText('Child B'))).not.toThrow();
    expect(menuOnClick).toHaveBeenCalledTimes(1);
  });
});
