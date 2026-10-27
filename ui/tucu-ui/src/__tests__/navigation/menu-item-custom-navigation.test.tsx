import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MenuItem } from '../../components/layouts/menus/menu-item';
import { TucuNavigationContext } from '../../themes/navigation';
import type { TucuNavigation } from '../../themes/navigation';

vi.mock('framer-motion', () => ({
  motion: { div: 'div', ul: 'ul', li: 'li', span: 'span' },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

const buildAdapter = (pathname: string) => {
  const navigate = vi.fn();
  const adapter: TucuNavigation = {
    pathname,
    searchParams: new URLSearchParams(),
    useParams: () => ({}),
    navigate,
    setSearchParams: vi.fn(),
    Link: ({
      to,
      prefetch: _p,
      replace: _r,
      state: _s,
      children,
      onClick,
      ...rest
    }) => (
      <a
        href={to}
        onClick={(event) => {
          event.preventDefault();
          onClick?.(event);
        }}
        {...rest}
      >
        {children}
      </a>
    ),
  };
  return { adapter, navigate };
};

describe('MenuItem with a custom navigation provider', () => {
  it('marks the item active from the provider pathname without any Router', () => {
    const { adapter } = buildAdapter('/reports');
    render(
      <TucuNavigationContext.Provider value={adapter}>
        <MenuItem name="Reports" path="/reports" />
        <MenuItem name="Settings" path="/settings" />
      </TucuNavigationContext.Provider>
    );
    expect(screen.getByText('Reports').closest('a')).toHaveClass('text-white!');
    expect(screen.getByText('Settings').closest('a')).not.toHaveClass(
      'text-white!'
    );
  });

  it('navigates through the provider when clicked', () => {
    const { adapter, navigate } = buildAdapter('/reports');
    render(
      <TucuNavigationContext.Provider value={adapter}>
        <MenuItem name="Settings" path="/settings" />
      </TucuNavigationContext.Provider>
    );
    fireEvent.click(screen.getByText('Settings'));
    expect(navigate).toHaveBeenCalledWith('/settings');
  });
});
