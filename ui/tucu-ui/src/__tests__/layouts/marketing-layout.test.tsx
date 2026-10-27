import { describe, it, expect, vi } from 'vitest';
import { act, fireEvent, render, screen, within } from '@testing-library/react';
import React from 'react';
import {
  MarketingFooter,
  MarketingLayout,
  MarketingNav,
} from '../../components/layouts/marketing-layout';
import { TucuNavigationContext } from '../../themes/navigation';
import type { TucuNavigation } from '../../themes/navigation';
import { useTheme } from '../../themes/hooks/use-theme';

const links = [
  { label: 'Home', href: '/' },
  { label: 'Docs', href: '/docs', matchPrefix: true },
  { label: 'GitHub', href: 'https://github.com/x/y' },
];

function navigationAt(pathname: string): TucuNavigation {
  const Link = ({ to, children, ...props }: any) => (
    <a data-router-link="true" href={typeof to === 'string' ? to : '#'} {...props}>
      {children}
    </a>
  );
  return { pathname, Link } as unknown as TucuNavigation;
}

function withNavigation(pathname: string, ui: React.ReactNode) {
  return (
    <TucuNavigationContext.Provider value={navigationAt(pathname)}>
      {ui}
    </TucuNavigationContext.Provider>
  );
}

describe('MarketingNav links', () => {
  it('renders plain anchors without navigation context', () => {
    render(<MarketingNav links={links} />);
    const home = screen.getByRole('link', { name: 'Home' });
    expect(home.tagName).toBe('A');
    expect(home).not.toHaveAttribute('data-router-link');
  });

  it('uses the navigation context Link for internal links', () => {
    render(withNavigation('/', <MarketingNav links={links} />));
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('data-router-link', 'true');
  });

  it('marks external links with target and rel', () => {
    render(withNavigation('/', <MarketingNav links={links} />));
    const external = screen.getByRole('link', { name: /GitHub/ });
    expect(external).toHaveAttribute('target', '_blank');
    expect(external).toHaveAttribute('rel', 'noopener noreferrer');
    expect(external).not.toHaveAttribute('data-router-link');
  });

  it('computes the active link from pathname, exact and prefix', () => {
    const { rerender } = render(withNavigation('/docs/intro', <MarketingNav links={links} />));
    expect(screen.getByRole('link', { name: 'Docs' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current');
    rerender(withNavigation('/', <MarketingNav links={links} />));
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Docs' })).not.toHaveAttribute('aria-current');
  });

  it('honors the explicit active prop', () => {
    render(
      <MarketingNav links={[{ label: 'Pricing', href: '/pricing', active: true }]} />
    );
    expect(screen.getByRole('link', { name: 'Pricing' })).toHaveAttribute('aria-current', 'page');
  });

  it('delegates to renderLink', () => {
    render(
      <MarketingNav
        links={links}
        renderLink={(link, props) => (
          <span data-custom={link.href} className={props.className}>
            {props.children}
          </span>
        )}
      />
    );
    expect(document.querySelector('[data-custom="/docs"]')).toBeInTheDocument();
  });

  it('uses i18n defaults in es and merges className', () => {
    useTheme.setState({ lang: 'es' } as never);
    render(<MarketingNav links={links} className="custom-nav" />);
    expect(screen.getByRole('navigation', { name: 'Principal' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Abrir menú' })).toBeInTheDocument();
    expect(document.querySelector('[data-tucu="marketing-nav"]')).toHaveClass('custom-nav');
    useTheme.setState({ lang: 'en' } as never);
  });
});

describe('MarketingNav mobile menu', () => {
  function setup() {
    render(
      <MarketingNav
        logo={<span>Logo</span>}
        links={links}
        actions={<button type="button">Sign up</button>}
      />
    );
    return screen.getByRole('button', { name: 'Open menu' });
  }

  it('toggles aria-expanded and shows the panel', () => {
    const toggle = setup();
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    fireEvent.click(toggle);
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
    const panel = screen.getByRole('dialog');
    expect(toggle).toHaveAttribute('aria-controls', panel.id);
    expect(within(panel).getByRole('button', { name: 'Sign up' })).toBeInTheDocument();
  });

  it('moves focus into the panel and closes on Escape returning focus', () => {
    const toggle = setup();
    fireEvent.click(toggle);
    const panel = screen.getByRole('dialog');
    expect(panel.contains(document.activeElement)).toBe(true);
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(toggle).toHaveFocus();
  });

  it('traps Tab inside the toggle and panel', () => {
    const toggle = setup();
    fireEvent.click(toggle);
    const panel = screen.getByRole('dialog');
    const focusables = panel.querySelectorAll<HTMLElement>('a[href],button');
    const last = focusables[focusables.length - 1];
    last.focus();
    fireEvent.keyDown(last, { key: 'Tab' });
    expect(screen.getByRole('button', { name: 'Close menu' })).toHaveFocus();
    fireEvent.keyDown(document.activeElement as HTMLElement, { key: 'Tab', shiftKey: true });
    expect(last).toHaveFocus();
  });

  it('closes when a link is clicked', () => {
    const toggle = setup();
    fireEvent.click(toggle);
    const panel = screen.getByRole('dialog');
    fireEvent.click(within(panel).getByRole('link', { name: 'Docs' }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes when the viewport crosses to md+', () => {
    let listener: ((e: { matches: boolean }) => void) | undefined;
    const original = window.matchMedia;
    window.matchMedia = vi.fn().mockImplementation(() => ({
      matches: false,
      addEventListener: (_: string, cb: typeof listener) => {
        listener = cb;
      },
      removeEventListener: vi.fn(),
    })) as never;
    const toggle = setup();
    fireEvent.click(toggle);
    act(() => listener?.({ matches: true }));
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    window.matchMedia = original;
  });
});

describe('MarketingNav scroll', () => {
  it('toggles data-scrolled when transparentUntilScroll', () => {
    render(<MarketingNav links={links} transparentUntilScroll scrollThreshold={32} />);
    const header = document.querySelector('[data-tucu="marketing-nav"]') as HTMLElement;
    expect(header).toHaveAttribute('data-scrolled', 'false');
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    expect(header).toHaveAttribute('data-scrolled', 'true');
    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 0, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });
    expect(header).toHaveAttribute('data-scrolled', 'false');
  });
});

describe('MarketingFooter', () => {
  it('renders named group navs, external socials and legal', () => {
    render(
      <MarketingFooter
        logo={<span>Brand</span>}
        description="About us"
        groups={[
          { title: 'Product', links: [{ label: 'Features', href: '/features' }] },
          { title: 'Company', links: [{ label: 'Blog', href: 'https://blog.example.com' }] },
        ]}
        socials={[{ label: 'GitHub', href: 'https://github.com/x', icon: <svg /> }]}
        legal="© 2026 Acme"
        bottom={<span>Made with love</span>}
        className="custom-footer"
      />
    );
    expect(screen.getByRole('navigation', { name: 'Product' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Company' })).toBeInTheDocument();
    const social = screen.getByRole('link', { name: 'GitHub' });
    expect(social).toHaveAttribute('target', '_blank');
    expect(social).toHaveAttribute('rel', 'noopener noreferrer');
    expect(screen.getByText('© 2026 Acme')).toBeInTheDocument();
    expect(screen.getByText('Made with love')).toBeInTheDocument();
    expect(document.querySelector('[data-tucu="marketing-footer"]')).toHaveClass('custom-footer');
  });
});

describe('MarketingLayout', () => {
  it('renders nav, main with skip link and footer', () => {
    render(
      <MarketingLayout
        nav={{ links }}
        footer={{ legal: 'Legal' }}
        mainClassName="custom-main"
      >
        <p>Page</p>
      </MarketingLayout>
    );
    const skip = screen.getByRole('link', { name: 'Skip to content' });
    const main = screen.getByRole('main');
    expect(skip).toHaveAttribute('href', `#${main.id}`);
    expect(main).toHaveClass('custom-main');
    expect(within(main).getByText('Page')).toBeInTheDocument();
    expect(document.querySelector('[data-tucu="marketing-nav"]')).toBeInTheDocument();
    expect(screen.getByText('Legal')).toBeInTheDocument();
  });

  it('skip link is the first focusable and label is overridable', () => {
    render(
      <MarketingLayout nav={{ links }} skipLinkLabel="Ir al contenido">
        x
      </MarketingLayout>
    );
    const first = document.querySelector('a, button') as HTMLElement;
    expect(first).toHaveTextContent('Ir al contenido');
  });

  it('passes renderLink to nav and footer', () => {
    render(
      <MarketingLayout
        nav={{ links: [{ label: 'A', href: '/a' }] }}
        footer={{ groups: [{ title: 'G', links: [{ label: 'B', href: '/b' }] }] }}
        renderLink={(link, props) => <a data-x="1" {...props} />}
      >
        x
      </MarketingLayout>
    );
    expect(document.querySelectorAll('[data-x="1"]').length).toBe(2);
  });
});
