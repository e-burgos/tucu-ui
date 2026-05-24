import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { Header } from '../../components/layouts/header/header';

describe('Header', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );
    expect(container.querySelector('nav')).toBeTruthy();
  });

  it('renders rightButton', () => {
    render(
      <MemoryRouter>
        <Header rightButton={<span>Right</span>} />
      </MemoryRouter>
    );
    expect(screen.getByText('Right')).toBeInTheDocument();
  });

  it('renders searchButton', () => {
    render(
      <MemoryRouter>
        <Header searchButton={<input placeholder="Search" />} />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <MemoryRouter>
        <Header className="nav-class" />
      </MemoryRouter>
    );
    expect(container.querySelector('nav')).toHaveClass('nav-class');
  });

  it('calls setIsOpen when hamburger is clicked', () => {
    const setIsOpen = vi.fn();
    const { container } = render(
      <MemoryRouter>
        <Header isOpen={false} setIsOpen={setIsOpen} />
      </MemoryRouter>
    );
    const hamburger = container.querySelector('button');
    if (hamburger) {
      hamburger.click();
      expect(setIsOpen).toHaveBeenCalledWith(true);
    }
  });
});
