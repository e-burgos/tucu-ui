import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import React from 'react';

import { Sidebar } from '../../components/dialog/sidebar';

describe('Sidebar', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <Sidebar onClose={vi.fn()}>
          <p>Sidebar content</p>
        </Sidebar>
      </MemoryRouter>
    );
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders children', () => {
    render(
      <MemoryRouter>
        <Sidebar onClose={vi.fn()} title="My Sidebar">
          <p>Inner content</p>
        </Sidebar>
      </MemoryRouter>
    );
    expect(screen.getByText('Inner content')).toBeInTheDocument();
  });
});
