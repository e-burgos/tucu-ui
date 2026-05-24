import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

import { Logo } from '../../components/logos/logo';

describe('Logo', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <Logo name="TestApp" />
      </MemoryRouter>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders the app name', () => {
    render(
      <MemoryRouter>
        <Logo name="MyApp" />
      </MemoryRouter>
    );
    expect(screen.getByText('MyApp')).toBeInTheDocument();
  });

  it('renders with second name', () => {
    render(
      <MemoryRouter>
        <Logo name="First" secondName="Second" />
      </MemoryRouter>
    );
    expect(screen.getByText('First')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('renders in isoType mode with first letter', () => {
    render(
      <MemoryRouter>
        <Logo name="Hello" isoType />
      </MemoryRouter>
    );
    expect(screen.getByText('H')).toBeInTheDocument();
  });
});
