import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AdminHeader } from '../../components/layouts/header/admin-header';

describe('AdminHeader', () => {
  it('renders without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <AdminHeader />
      </MemoryRouter>
    );
    expect(container.querySelector('[data-tucu="admin-header"]')).toBeTruthy();
  });

  it('applies custom className', () => {
    const { container } = render(
      <MemoryRouter>
        <AdminHeader className="custom-header" />
      </MemoryRouter>
    );
    expect(container.querySelector('[data-tucu="admin-header"]')).toHaveClass(
      'custom-header'
    );
  });

  it('renders rightButton', () => {
    const { getByText } = render(
      <MemoryRouter>
        <AdminHeader rightButton={<span>Right area</span>} />
      </MemoryRouter>
    );
    expect(getByText('Right area')).toBeInTheDocument();
  });

  it('calls setIsOpen when hamburger is clicked', () => {
    const setIsOpen = vi.fn();
    const { container } = render(
      <MemoryRouter>
        <AdminHeader isOpen={false} setIsOpen={setIsOpen} />
      </MemoryRouter>
    );
    const hamburger = container.querySelector('button');
    if (hamburger) {
      hamburger.click();
      expect(setIsOpen).toHaveBeenCalledWith(true);
    }
  });
});
