import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

import { ActiveLink } from '../../components/links/active-link';

describe('ActiveLink', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/dashboard']}>
        <ActiveLink to="/dashboard" path="/dashboard">
          Dashboard
        </ActiveLink>
      </MemoryRouter>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children text', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ActiveLink to="/settings" path="/settings">
          Settings
        </ActiveLink>
      </MemoryRouter>
    );
    expect(screen.getByText('Settings')).toBeInTheDocument();
  });

  it('applies active class when path matches', () => {
    render(
      <MemoryRouter initialEntries={['/home']}>
        <ActiveLink to="/home" path="/home" activeClassName="is-active">
          Home
        </ActiveLink>
      </MemoryRouter>
    );
    const link = screen.getByText('Home');
    expect(link).toHaveClass('is-active');
  });
});
