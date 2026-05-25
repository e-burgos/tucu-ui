import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AdminLayout } from '../../components/layouts/admin-layout';

vi.mock('framer-motion', () => ({
  motion: {
    div: 'div',
    ul: 'ul',
    li: 'li',
    span: 'span',
    aside: 'aside',
    nav: 'nav',
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
}));

const mockMenuItems = [
  { name: 'Home', icon: <span>🏠</span>, path: '/' },
  { name: 'Settings', icon: <span>⚙️</span>, path: '/settings' },
];

describe('AdminLayout', () => {
  const defaultProps = {
    menuItems: mockMenuItems,
    isOpen: false,
    setIsOpen: vi.fn(),
  };

  it('renders children', () => {
    render(
      <MemoryRouter>
        <AdminLayout {...defaultProps}>Admin content</AdminLayout>
      </MemoryRouter>
    );
    expect(screen.getByText('Admin content')).toBeInTheDocument();
  });

  it('renders with data-tucu attribute', () => {
    const { container } = render(
      <MemoryRouter>
        <AdminLayout {...defaultProps}>Content</AdminLayout>
      </MemoryRouter>
    );
    expect(container.querySelector('[data-tucu="admin-layout"]')).toBeTruthy();
  });

  it('renders main content area', () => {
    const { container } = render(
      <MemoryRouter>
        <AdminLayout {...defaultProps}>Content</AdminLayout>
      </MemoryRouter>
    );
    expect(container.querySelector('[data-tucu="admin-content"]')).toBeTruthy();
  });

  it('applies custom className', () => {
    const { container } = render(
      <MemoryRouter>
        <AdminLayout {...defaultProps} className="my-class">
          Content
        </AdminLayout>
      </MemoryRouter>
    );
    expect(container.querySelector('[data-tucu="admin-layout"]')).toHaveClass(
      'my-class'
    );
  });

  it('applies contentClassName to main', () => {
    const { container } = render(
      <MemoryRouter>
        <AdminLayout {...defaultProps} contentClassName="content-cls">
          Content
        </AdminLayout>
      </MemoryRouter>
    );
    expect(container.querySelector('[data-tucu="admin-content"]')).toHaveClass(
      'content-cls'
    );
  });

  it('renders rightButton', () => {
    render(
      <MemoryRouter>
        <AdminLayout {...defaultProps} rightButton={<button>Action</button>}>
          Content
        </AdminLayout>
      </MemoryRouter>
    );
    expect(screen.getByText('Action')).toBeInTheDocument();
  });
});
