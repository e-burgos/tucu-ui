// @vitest-environment node
import React from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { TucuNavigationContext } from '../../themes/navigation';
import type { TucuNavigation } from '../../themes/navigation';
import {
  AdminLayout,
  CleanLayout,
  HorizontalLayout,
  MacOSSonomaCleanLayout,
  MacOSTahoeCleanLayout,
  MenuItem,
} from '../../components/layouts';
import { NotFoundPage } from '../../themes/pages/not-found';
import { Button } from '../../components/buttons';
import { Input } from '../../components/inputs/input';
import { Select } from '../../components/inputs/select';
import { Tooltip } from '../../components/common/tooltip';
import { Modal } from '../../components/dialog/modal';
import { useBreakpoint } from '../../hooks/use-breakpoint';
import { useTheme } from '../../themes/hooks/use-theme';
import { ThemeWrapper } from '../../themes/components/theme-provider/theme-wrapper';

const navigation: TucuNavigation = {
  pathname: '/reports',
  searchParams: new URLSearchParams(),
  useParams: () => ({}),
  navigate: () => undefined,
  setSearchParams: () => undefined,
  Link: ({ to, children, className }) => (
    <a href={typeof to === 'string' ? to : to.pathname} className={className}>
      {children}
    </a>
  ),
};

const menuItems = [
  { name: 'Reports', path: '/reports', icon: <span>R</span> },
  { name: 'Settings', path: '/settings', icon: <span>S</span> },
];

const withNavigation = (node: React.ReactNode) => (
  <TucuNavigationContext.Provider value={navigation}>
    {node}
  </TucuNavigationContext.Provider>
);

const BreakpointProbe = () => <span>{useBreakpoint()}</span>;
const ThemeProbe = () => <span>{useTheme((state) => state.mode)}</span>;

describe('server rendering', () => {
  it('runs without a DOM', () => {
    expect(typeof window).toBe('undefined');
    expect(typeof document).toBe('undefined');
  });

  it('renders primitives', () => {
    const html = renderToString(
      <>
        <Button>Save</Button>
        <Input label="Name" />
        <Select
          label="Role"
          options={[{ label: 'Admin', value: 'admin' }]}
          value=""
          onChange={() => undefined}
        />
        <Tooltip content="Hint">
          <span>target</span>
        </Tooltip>
        <Modal isOpen={false} onClose={() => undefined} title="Closed">
          body
        </Modal>
      </>
    );
    expect(html).toContain('Save');
  });

  it('renders hooks that read the browser with a stable initial value', () => {
    const html = renderToString(
      <>
        <BreakpointProbe />
        <ThemeProbe />
      </>
    );
    expect(html).toContain('<span>');
  });

  it('renders the menu with the active route from the navigation provider', () => {
    const html = renderToString(
      withNavigation(<MenuItem name="Reports" path="/reports" />)
    );
    expect(html).toContain('Reports');
  });

  it('renders the main layouts', () => {
    const html = renderToString(
      withNavigation(
        <>
          <AdminLayout
            menuItems={menuItems}
            isOpen={false}
            setIsOpen={() => undefined}
          >
            admin content
          </AdminLayout>
          <HorizontalLayout
            menuItems={menuItems}
            isOpen={false}
            setIsOpen={() => undefined}
          >
            horizontal content
          </HorizontalLayout>
          <CleanLayout>clean content</CleanLayout>
          <MacOSSonomaCleanLayout>sonoma content</MacOSSonomaCleanLayout>
          <MacOSTahoeCleanLayout>tahoe content</MacOSTahoeCleanLayout>
        </>
      )
    );
    for (const text of [
      'admin content',
      'horizontal content',
      'clean content',
      'sonoma content',
      'tahoe content',
    ]) {
      expect(html).toContain(text);
    }
  });

  it('renders the theme wrapper with the main layout', () => {
    const html = renderToString(
      withNavigation(
        <ThemeWrapper menuItems={menuItems}>wrapped content</ThemeWrapper>
      )
    );
    expect(html).toContain('wrapped content');
  });

  it('evaluates the public entry without a DOM', async () => {
    const entry = await import('../../index');
    expect(entry.Button).toBeDefined();
  });

  it('renders error pages without reading the document', () => {
    const html = renderToString(withNavigation(<NotFoundPage />));
    expect(html.length).toBeGreaterThan(0);
  });
});
