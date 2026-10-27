import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import {
  ReactRouterNavigationProvider,
  TucuNavigationContext,
  useTucuNavigation,
  useTucuParams,
} from '../../themes/navigation';
import type { TucuNavigation } from '../../themes/navigation';
import { AnchorLink } from '../../components/links/anchor-link';
import { ActiveLink } from '../../components/links/active-link';

const Probe = () => {
  const { pathname, searchParams, navigate } = useTucuNavigation();
  const params = useTucuParams();
  return (
    <div>
      <span data-testid="pathname">{pathname}</span>
      <span data-testid="tab">{searchParams.get('tab')}</span>
      <span data-testid="id">{params.id}</span>
      <button onClick={() => navigate('/next')}>go</button>
    </div>
  );
};

describe('useTucuNavigation with the react-router provider', () => {
  it('exposes pathname, search params, params and navigate', () => {
    render(
      <MemoryRouter initialEntries={['/items/7?tab=info']}>
        <ReactRouterNavigationProvider>
          <Routes>
            <Route path="/items/:id" element={<Probe />} />
            <Route path="/next" element={<Probe />} />
          </Routes>
        </ReactRouterNavigationProvider>
      </MemoryRouter>
    );
    expect(screen.getByTestId('pathname')).toHaveTextContent('/items/7');
    expect(screen.getByTestId('tab')).toHaveTextContent('info');
    expect(screen.getByTestId('id')).toHaveTextContent('7');
    fireEvent.click(screen.getByText('go'));
    expect(screen.getByTestId('pathname')).toHaveTextContent('/next');
  });
});

describe('useTucuNavigation without a provider', () => {
  it('falls back to the nearest react-router Router', () => {
    render(
      <MemoryRouter initialEntries={['/plain?tab=a']}>
        <Probe />
      </MemoryRouter>
    );
    expect(screen.getByTestId('pathname')).toHaveTextContent('/plain');
    expect(screen.getByTestId('tab')).toHaveTextContent('a');
    fireEvent.click(screen.getByText('go'));
    expect(screen.getByTestId('pathname')).toHaveTextContent('/next');
  });

  it('throws a clear error outside any Router', () => {
    const spy = vi.spyOn(console, 'error').mockImplementation(() => undefined);
    expect(() => render(<Probe />)).toThrow(/useTucuNavigation/);
    spy.mockRestore();
  });
});

describe('useTucuNavigation with a custom provider', () => {
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
        prefetch: _prefetch,
        replace: _replace,
        state: _state,
        children,
        ...rest
      }) => (
        <a data-testid="custom-link" href={`/custom${to}`} {...rest}>
          {children}
        </a>
      ),
    };
    return { adapter, navigate };
  };

  it('drives the active state of ActiveLink and renders the custom Link', () => {
    const { adapter } = buildAdapter('/dashboard');
    render(
      <TucuNavigationContext.Provider value={adapter}>
        <ActiveLink to="/dashboard" path="/dashboard" className="item">
          Dashboard
        </ActiveLink>
        <ActiveLink to="/other" path="/other" className="item">
          Other
        </ActiveLink>
      </TucuNavigationContext.Provider>
    );
    expect(screen.getByText('Dashboard')).toHaveClass('active');
    expect(screen.getByText('Other')).not.toHaveClass('active');
    expect(screen.getAllByTestId('custom-link')[0]).toHaveAttribute(
      'href',
      '/custom/dashboard'
    );
  });

  it('keeps external links as plain anchors', () => {
    const { adapter } = buildAdapter('/');
    render(
      <TucuNavigationContext.Provider value={adapter}>
        <AnchorLink to="https://example.com">External</AnchorLink>
      </TucuNavigationContext.Provider>
    );
    expect(screen.getByText('External')).toHaveAttribute(
      'href',
      'https://example.com'
    );
  });

  it('delivers navigate calls to the adapter', () => {
    const { adapter, navigate } = buildAdapter('/');
    render(
      <TucuNavigationContext.Provider value={adapter}>
        <Probe />
      </TucuNavigationContext.Provider>
    );
    fireEvent.click(screen.getByText('go'));
    expect(navigate).toHaveBeenCalledWith('/next');
  });
});
