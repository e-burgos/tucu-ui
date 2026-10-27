import React from 'react';
import { describe, it, expect } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AnchorLink } from '../../components/links/anchor-link';
import { ActiveLink } from '../../components/links/active-link';
import {
  ReactRouterNavigationProvider,
  toHref,
  useTucuNavigation,
} from '../../themes/navigation';

const Location = () => {
  const { pathname, searchParams, navigate } = useTucuNavigation();
  return (
    <div>
      <span data-testid="where">{`${pathname}?${searchParams.toString()}`}</span>
      <button onClick={() => navigate({ pathname: '/y', search: '?b=2' })}>
        nav
      </button>
    </div>
  );
};

describe('3.x link props stay type-compatible', () => {
  it('compiles react-router style props and navigates with an object `to`', () => {
    render(
      <MemoryRouter>
        <ReactRouterNavigationProvider>
          <AnchorLink
            to={{ pathname: '/x', search: '?a=1' }}
            reloadDocument={false}
            preventScrollReset
          >
            object link
          </AnchorLink>
          <ActiveLink path="/x" to="/x" relative="path">
            active link
          </ActiveLink>
          <Location />
        </ReactRouterNavigationProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('object link')).toHaveAttribute('href', '/x?a=1');
    fireEvent.click(screen.getByText('object link'));
    expect(screen.getByTestId('where')).toHaveTextContent('/x?a=1');
    fireEvent.click(screen.getByText('nav'));
    expect(screen.getByTestId('where')).toHaveTextContent('/y?b=2');
  });

  it('toHref flattens partial paths', () => {
    expect(toHref('/a')).toBe('/a');
    expect(toHref({ pathname: '/a', hash: '#h' })).toBe('/a#h');
    expect(toHref({ search: '?q=1' })).toBe('?q=1');
  });
});
