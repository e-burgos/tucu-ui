import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

import { AnchorLink } from '../../components/links/anchor-link';

describe('AnchorLink', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <AnchorLink to="/home">Home</AnchorLink>
      </MemoryRouter>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children text', () => {
    render(
      <MemoryRouter>
        <AnchorLink to="/about">About Us</AnchorLink>
      </MemoryRouter>
    );
    expect(screen.getByText('About Us')).toBeInTheDocument();
  });

  it('renders as an external link for http URLs', () => {
    render(
      <MemoryRouter>
        <AnchorLink to="https://example.com">External</AnchorLink>
      </MemoryRouter>
    );
    const link = screen.getByText('External');
    expect(link.tagName).toBe('A');
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});
