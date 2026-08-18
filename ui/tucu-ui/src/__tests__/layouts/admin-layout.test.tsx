import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { AdminLayout } from '../../components/layouts/admin-layout';
import { useTheme } from '../../themes/hooks/use-theme';

beforeEach(() => {
  useTheme.setState({ isSidebarPinned: undefined });
});

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
  {
    name: 'Home',
    icon: (
      <span role="img" aria-label="home">
        🏠
      </span>
    ),
    path: '/',
  },
  {
    name: 'Settings',
    icon: (
      <span role="img" aria-label="settings">
        ⚙️
      </span>
    ),
    path: '/settings',
  },
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

  it('CA-7: forwards collapsedLogo to the sidebar collapsed rail', () => {
    render(
      <MemoryRouter>
        <AdminLayout
          {...defaultProps}
          collapsedLogo={{
            logo: <span data-testid="collapsed-logo-marker">CL</span>,
          }}
        >
          Content
        </AdminLayout>
      </MemoryRouter>
    );
    expect(screen.getByTestId('collapsed-logo-marker')).toBeInTheDocument();
  });

  it('CA-7: forwards sidebarPinned and onSidebarPinnedChange to the sidebar pin control', () => {
    const onSidebarPinnedChange = vi.fn();
    const { container } = render(
      <MemoryRouter>
        <AdminLayout
          {...defaultProps}
          sidebarPinned={true}
          onSidebarPinnedChange={onSidebarPinnedChange}
        >
          Content
        </AdminLayout>
      </MemoryRouter>
    );
    const pinButton = container.querySelector('[data-tucu="sidebar-pin"]');
    expect(pinButton).toHaveAttribute('aria-pressed', 'true');

    fireEvent.click(pinButton as HTMLElement);
    expect(onSidebarPinnedChange).toHaveBeenCalledWith(false);
  });

  it('CA-7: forwards defaultSidebarPinned for uncontrolled pin state', () => {
    const { container } = render(
      <MemoryRouter>
        <AdminLayout {...defaultProps} defaultSidebarPinned>
          Content
        </AdminLayout>
      </MemoryRouter>
    );
    const pinButton = container.querySelector('[data-tucu="sidebar-pin"]');
    expect(pinButton).toHaveAttribute('aria-pressed', 'true');
  });

  it('pads the content for the expanded sidebar width while pinned', () => {
    const { container } = render(
      <MemoryRouter>
        <AdminLayout {...defaultProps} sidebarPinned={true}>
          Content
        </AdminLayout>
      </MemoryRouter>
    );
    const root = container.querySelector('[data-tucu="admin-layout"]');
    expect(root).toHaveClass('xl:ltr:pl-[288px]');
    expect(root).not.toHaveClass('xl:ltr:pl-[96px]');
  });

  it('keeps the collapsed-rail padding while unpinned', () => {
    const { container } = render(
      <MemoryRouter>
        <AdminLayout {...defaultProps}>Content</AdminLayout>
      </MemoryRouter>
    );
    const root = container.querySelector('[data-tucu="admin-layout"]');
    expect(root).toHaveClass('xl:ltr:pl-[96px]');
    expect(root).not.toHaveClass('xl:ltr:pl-[288px]');
  });
});
