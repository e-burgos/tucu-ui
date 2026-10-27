import React from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { NextThemeProvider } from '../../next';
import { normalizeNextPathname } from '../../next/next-navigation';
import { MenuItem } from '../../components/layouts/menus/menu-item';
import { useTucuNavigation } from '../../themes/navigation/core';

const router = vi.hoisted(() => ({ push: vi.fn(), replace: vi.fn() }));
const state = vi.hoisted(() => ({
  pathname: '/reports/',
  search: 'tab=info',
}));

vi.mock('next/navigation', () => ({
  usePathname: () => state.pathname,
  useRouter: () => router,
  useSearchParams: () => new URLSearchParams(state.search),
  useParams: () => ({ id: '7' }),
}));

vi.mock('next/link', () => ({
  default: React.forwardRef<
    HTMLAnchorElement,
    React.AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
      replace?: boolean;
      prefetch?: boolean;
    }
  >(({ href, replace, prefetch, children, ...rest }, ref) => (
    <a
      ref={ref}
      href={href}
      data-next-link="true"
      data-replace={String(Boolean(replace))}
      data-prefetch={String(prefetch)}
      {...rest}
    >
      {children}
    </a>
  )),
}));

vi.mock('framer-motion', () => ({
  motion: { div: 'div', ul: 'ul', li: 'li', span: 'span' },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  MotionConfig: ({ children }: { children: React.ReactNode }) => children,
}));

const menuItems = [
  { name: 'Reports', path: '/reports', icon: <span>R</span> },
  { name: 'Settings', path: '/settings', icon: <span>S</span> },
];

const Probe = () => {
  const { navigate, setSearchParams, searchParams, pathname, Link, useParams } =
    useTucuNavigation();
  const params = useParams();
  return (
    <div>
      <span data-testid="pathname">{pathname}</span>
      <span data-testid="tab">{searchParams.get('tab')}</span>
      <span data-testid="id">{params.id}</span>
      <button onClick={() => navigate('/settings')}>push</button>
      <button
        onClick={() =>
          navigate(
            { pathname: '/settings', search: '?a=1' },
            {
              replace: true,
              state: { ignored: true },
            }
          )
        }
      >
        replace
      </button>
      <button
        onClick={() =>
          setSearchParams((previous) => {
            previous.set('tab', 'next');
            return previous;
          })
        }
      >
        push-params
      </button>
      <button
        onClick={() =>
          setSearchParams(new URLSearchParams({ q: 'x' }), { replace: true })
        }
      >
        replace-params
      </button>
      <button onClick={() => setSearchParams(new URLSearchParams())}>
        clear-params
      </button>
      <Link to="/string-link" prefetch={false} className="mine">
        string-link
      </Link>
      <Link
        to={{ pathname: '/object', search: '?x=1', hash: '#top' }}
        replace
        preventScrollReset
        relative="path"
        viewTransition
        discover="none"
        state={{ a: 1 }}
      >
        object-link
      </Link>
      <Link to="https://example.com/docs" target="_blank">
        external-link
      </Link>
      <Link to="/reload" reloadDocument>
        reload-link
      </Link>
    </div>
  );
};

const renderProvider = () =>
  render(
    <NextThemeProvider menuItems={menuItems} layout="admin">
      <Probe />
      <MenuItem name="Reports Item" path="/reports" />
      <MenuItem name="Settings Item" path="/settings" />
    </NextThemeProvider>
  );

describe('NextThemeProvider', () => {
  beforeEach(() => {
    router.push.mockClear();
    router.replace.mockClear();
    state.pathname = '/reports/';
    state.search = 'tab=info';
  });

  it('normalises the trailing slash so the active menu item matches', () => {
    renderProvider();
    expect(screen.getByTestId('pathname')).toHaveTextContent('/reports');
    expect(screen.getByText('Reports Item').closest('a')).toHaveClass(
      'text-white!'
    );
    expect(screen.getByText('Settings Item').closest('a')).not.toHaveClass(
      'text-white!'
    );
  });

  it('exposes search params and route params from next/navigation', () => {
    renderProvider();
    expect(screen.getByTestId('tab')).toHaveTextContent('info');
    expect(screen.getByTestId('id')).toHaveTextContent('7');
  });

  it('navigates with router.push and ignores state', () => {
    renderProvider();
    fireEvent.click(screen.getByText('push'));
    expect(router.push).toHaveBeenCalledWith('/settings');
  });

  it('navigates with router.replace when requested', () => {
    renderProvider();
    fireEvent.click(screen.getByText('replace'));
    expect(router.replace).toHaveBeenCalledWith('/settings?a=1');
    expect(router.push).not.toHaveBeenCalled();
  });

  it('updates search params without scrolling', () => {
    renderProvider();
    fireEvent.click(screen.getByText('push-params'));
    expect(router.push).toHaveBeenCalledWith('/reports?tab=next', {
      scroll: false,
    });
    fireEvent.click(screen.getByText('replace-params'));
    expect(router.replace).toHaveBeenCalledWith('/reports?q=x', {
      scroll: false,
    });
    fireEvent.click(screen.getByText('clear-params'));
    expect(router.push).toHaveBeenLastCalledWith('/reports', { scroll: false });
  });

  it('maps a string "to" onto a next/link href and forwards props', () => {
    renderProvider();
    const link = screen.getByText('string-link');
    expect(link).toHaveAttribute('data-next-link', 'true');
    expect(link).toHaveAttribute('href', '/string-link');
    expect(link).toHaveAttribute('data-prefetch', 'false');
    expect(link).toHaveClass('mine');
  });

  it('maps an object "to" and drops react-router-only props', () => {
    renderProvider();
    const link = screen.getByText('object-link');
    expect(link).toHaveAttribute('href', '/object?x=1#top');
    expect(link).toHaveAttribute('data-replace', 'true');
    for (const dropped of [
      'preventscrollreset',
      'relative',
      'viewtransition',
      'discover',
      'state',
    ]) {
      expect(link).not.toHaveAttribute(dropped);
    }
  });

  it('renders external URLs and reloadDocument links as plain anchors', () => {
    renderProvider();
    const external = screen.getByText('external-link');
    expect(external).not.toHaveAttribute('data-next-link');
    expect(external).toHaveAttribute('href', 'https://example.com/docs');
    expect(external).toHaveAttribute('target', '_blank');
    const reload = screen.getByText('reload-link');
    expect(reload).not.toHaveAttribute('data-next-link');
    expect(reload).toHaveAttribute('href', '/reload');
    expect(reload).not.toHaveAttribute('reloaddocument');
  });
});

describe('normalizeNextPathname', () => {
  it('strips trailing slashes except for the root', () => {
    expect(normalizeNextPathname('/')).toBe('/');
    expect(normalizeNextPathname('')).toBe('/');
    expect(normalizeNextPathname('/a/')).toBe('/a');
    expect(normalizeNextPathname('/a/b//')).toBe('/a/b');
    expect(normalizeNextPathname('/a')).toBe('/a');
  });
});
