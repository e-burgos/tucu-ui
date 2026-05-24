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
          icon={<span data-testid="menu-icon">📁</span>}
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
    fireEvent.click(trigger.closest('div')!);
    // After click, the dropdown should be toggled
    expect(screen.getByText('Sub')).toBeInTheDocument();
  });
});
