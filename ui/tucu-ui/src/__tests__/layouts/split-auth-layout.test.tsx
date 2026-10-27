import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { SplitAuthLayout } from '../../components/layouts/split-auth-layout';
import { SignInForm } from '../../components/auth/sign-in-form';

const brand = {
  logo: <span data-testid="logo">L</span>,
  name: 'Acme',
  headline: 'Welcome back',
  lead: 'Lead text',
  highlights: [{ icon: <i />, text: 'Fast' }, { text: 'Secure' }],
  footer: 'footer line',
  background: <div data-testid="bg" />,
};

const renderLayout = (props = {}) =>
  render(
    <SplitAuthLayout
      brand={brand}
      title="Sign in"
      subtitle="Sub"
      footer="Foot"
      {...props}
    >
      <form aria-label="f" />
    </SplitAuthLayout>
  );

describe('SplitAuthLayout', () => {
  it('renders brand aside and form column with h1', () => {
    const { container } = renderLayout();
    expect(
      screen.getByRole('heading', { level: 1, name: 'Sign in' })
    ).toBeInTheDocument();
    const aside = container.querySelector(
      '[data-tucu="split-auth-layout-brand"]'
    );
    expect(aside).toHaveClass('hidden', 'lg:flex');
    expect(screen.getByText('Welcome back')).toBeInTheDocument();
    expect(screen.getByText('Foot')).toBeInTheDocument();
    expect(screen.getByTestId('bg').parentElement).toHaveAttribute(
      'aria-hidden',
      'true'
    );
  });

  it('renders a compact brand hidden from lg up', () => {
    const { container } = renderLayout();
    const compact = container.querySelector(
      '[data-tucu="split-auth-layout-form"] [data-tucu="split-auth-layout-identity"]'
    );
    expect(compact).toHaveClass('lg:hidden');
  });

  it('supports md breakpoint', () => {
    const { container } = renderLayout({ breakpoint: 'md' });
    expect(container.querySelector('aside')).toHaveClass('md:flex');
  });

  it('puts the brand last with brandPosition end', () => {
    const { container } = renderLayout({ brandPosition: 'end' });
    expect(container.querySelector('aside')).toHaveClass('lg:order-last');
  });

  it('centered variant has no aside and shows the brand compactly', () => {
    const { container } = renderLayout({ variant: 'centered' });
    expect(container.querySelector('aside')).toBeNull();
    const identity = container.querySelector(
      '[data-tucu="split-auth-layout-identity"]'
    );
    expect(identity).not.toHaveClass('lg:hidden');
    expect(
      container.querySelector('[data-tucu="split-auth-layout"]')
    ).toHaveAttribute('data-variant', 'centered');
  });

  it('applies surface variants', () => {
    const glass = renderLayout();
    expect(
      glass.container.querySelector('[data-tucu="glass-panel"]')
    ).toBeInTheDocument();
    glass.unmount();
    const solid = renderLayout({ surface: 'solid' });
    expect(
      solid.container.querySelector('[data-tucu="glass-panel"]')
    ).toBeNull();
    expect(solid.container.querySelector('.bg-white')).toBeInTheDocument();
    solid.unmount();
    const plain = renderLayout({ surface: 'plain' });
    expect(plain.container.querySelector('.bg-white')).toBeNull();
  });

  it('renders highlights as a list', () => {
    renderLayout();
    const items = screen.getAllByRole('listitem');
    expect(items).toHaveLength(2);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('merges className and applies maxWidth', () => {
    const { container } = renderLayout({
      className: 'custom',
      maxWidth: '40rem',
    });
    const root = container.querySelector('[data-tucu="split-auth-layout"]');
    expect(root).toHaveClass('custom', 'min-h-dvh', 'bg-page');
    expect(root?.firstElementChild).toHaveStyle({ maxWidth: '40rem' });
  });

  it('wraps SignInForm', () => {
    const { container } = render(
      <MemoryRouter>
        <SplitAuthLayout brand={brand} title="Sign in">
          <SignInForm
            onSubmit={vi.fn()}
            forgetPasswordPath="/forgot-password"
          />
        </SplitAuthLayout>
      </MemoryRouter>
    );
    expect(container.querySelector('form')).toBeInTheDocument();
  });
});
