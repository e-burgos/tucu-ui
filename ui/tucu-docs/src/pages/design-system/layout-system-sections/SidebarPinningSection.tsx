import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  LucideIcons,
  Badge,
  Alert,
  BasicTable,
  HeroCard,
  Button,
  ExpandableSidebar,
} from '@e-burgos/tucu-ui';

const propsColumns = [
  { key: 'property', label: 'Property' },
  { key: 'type', label: 'Type' },
  { key: 'defaultValue', label: 'Default' },
  { key: 'description', label: 'Description' },
];

const sidebarPropsData = [
  {
    property: 'pinned',
    type: 'boolean?',
    defaultValue: '—',
    description: (
      <>
        <strong>Controlled</strong> pinned state. When provided, the internal
        pin state and the pin button are subordinated to this value — the
        component reports toggles through <code>onPinnedChange</code> and waits
        for the prop to change.
      </>
    ),
  },
  {
    property: 'defaultPinned',
    type: 'boolean?',
    defaultValue: 'false',
    description: (
      <>
        Initial pinned state for <strong>uncontrolled</strong> usage. Ignored
        when <code>pinned</code> is provided.
      </>
    ),
  },
  {
    property: 'onPinnedChange',
    type: '(pinned: boolean) => void?',
    defaultValue: '—',
    description: (
      <>
        Called with the <em>next</em> pinned state on every toggle, in both
        controlled and uncontrolled mode. Pair it with <code>pinned</code> to
        persist the user's choice (see the persistence pattern below).
      </>
    ),
  },
  {
    property: 'collapsedLogo',
    type: 'LogoPropTypes?',
    defaultValue: '—',
    description: (
      <>
        Logo rendered in the collapsed 96px rail (112px on 2xl screens). When
        omitted, the sidebar falls back to rendering <code>logo</code> with{' '}
        <code>isoType</code> enabled — the same behavior as before this prop
        existed.
      </>
    ),
  },
];

const adminForwardingData = [
  {
    adminProp: 'collapsedLogo',
    sidebarProp: 'collapsedLogo',
    description: 'Logo for the collapsed sidebar rail',
  },
  {
    adminProp: 'sidebarPinned',
    sidebarProp: 'pinned',
    description: 'Controlled pinned state',
  },
  {
    adminProp: 'defaultSidebarPinned',
    sidebarProp: 'defaultPinned',
    description: 'Initial pinned state (uncontrolled)',
  },
  {
    adminProp: 'onSidebarPinnedChange',
    sidebarProp: 'onPinnedChange',
    description: 'Reports every pin toggle',
  },
];

const renderPropsCell =
  (colKey: string) => (value: unknown, _row: Record<string, unknown>) => {
    if (colKey === 'property' || colKey === 'adminProp') {
      return <code className="text-xs text-brand">{String(value ?? '')}</code>;
    }
    if (
      colKey === 'type' ||
      colKey === 'defaultValue' ||
      colKey === 'sidebarProp'
    ) {
      return (
        <code className="text-xs text-gray-600 dark:text-gray-400">
          {String(value ?? '')}
        </code>
      );
    }
    return (
      <span className="text-xs text-gray-600 dark:text-gray-400">
        {value as React.ReactNode}
      </span>
    );
  };

const SidebarPinningSection: React.FC = () => {
  const [pinned, setPinned] = useState(true);
  const [lastClicked, setLastClicked] = useState<string | null>(null);

  const demoMenuItems = [
    {
      name: 'Dashboard',
      path: '#pin-demo-dashboard',
      icon: <LucideIcons.LayoutDashboard className="w-4 h-4" />,
      onClick: () => setLastClicked('Dashboard'),
    },
    {
      name: 'Reports',
      path: '#pin-demo-reports',
      icon: <LucideIcons.BarChart3 className="w-4 h-4" />,
      onClick: () => setLastClicked('Reports'),
    },
    {
      name: 'Settings',
      path: '#pin-demo-settings',
      icon: <LucideIcons.Settings className="w-4 h-4" />,
      onClick: () => setLastClicked('Settings'),
    },
    {
      name: 'Hidden Item',
      path: '#pin-demo-hidden',
      icon: <LucideIcons.EyeOff className="w-4 h-4" />,
      hide: true,
    },
  ];

  return (
    <>
      <HeroCard
        title="Sidebar Pinning & Dual Logo"
        description="Keep the expandable sidebar open with a pin button, persist the user's choice, and show a dedicated brand mark in the collapsed rail."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-cyan-500 via-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Pin className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <div className="text-center">
        <Typography tag="h2" className="mb-2">
          Sidebar Pinning &amp; Dual Logo
        </Typography>
        <Typography
          tag="p"
          className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
        >
          By default the ExpandableSidebar expands on hover and collapses back
          to a 96px rail when the pointer leaves. Pinning keeps it expanded
          until the user unpins it.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Pinning API (ExpandableSidebar)" className="mt-2 mb-2">
          <div className="w-full space-y-6 p-4 sm:p-6">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              <code>ExpandableSidebar</code> follows the standard React
              controlled/uncontrolled pattern for its pinned state:
            </Typography>

            <BasicTable
              columns={propsColumns.map((col) => ({
                ...col,
                render: renderPropsCell(col.key),
              }))}
              data={sidebarPropsData as Array<Record<string, unknown>>}
              containerClassName="mb-4"
            />

            <Alert variant="info">
              <div>
                <div className="flex items-center gap-2 font-semibold">
                  <LucideIcons.Info className="h-4 w-4" />
                  Pinned behavior
                </div>
                <div className="text-sm mt-1">
                  While pinned, the sidebar stays expanded:{' '}
                  <code>mouseLeave</code>, clicking outside the sidebar, and the
                  automatic desktop collapse all become no-ops. Unpinning
                  restores the default hover-to-expand behavior. The mobile
                  drawer behavior is unchanged.
                </div>
              </div>
            </Alert>

            <Alert variant="success">
              <div>
                <div className="flex items-center gap-2 font-semibold">
                  <LucideIcons.Accessibility className="h-4 w-4" />
                  The pin button
                </div>
                <div className="text-sm mt-1">
                  The expanded header shows a pin toggle button rendered as an
                  open padlock (unpinned) or a closed padlock (pinned). It
                  exposes <code>aria-pressed</code> with the current pinned
                  state, a <code>title</code> of "Pin menu" / "Unpin menu", and
                  the styling anchor{' '}
                  <code>data-tucu=&quot;sidebar-pin&quot;</code> for CSS
                  overrides.
                </div>
              </div>
            </Alert>

            <div className="space-y-3">
              <Typography tag="h4" className="font-semibold">
                Uncontrolled usage
              </Typography>
              <CodeBlock
                language="tsx"
                code={`import { ExpandableSidebar } from '@e-burgos/tucu-ui';

<ExpandableSidebar
  logo={{ name: 'Acme', secondName: 'Admin' }}
  menuItems={menuItems}
  defaultPinned
  onPinnedChange={(pinned) => console.log('pinned is now', pinned)}
/>`}
              />
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="AdminLayout Forwarding" className="mt-2 mb-2">
          <div className="w-full space-y-6 p-4 sm:p-6">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              When you use <code>AdminLayout</code> (directly or through the
              admin layout preset), the same capabilities are exposed with{' '}
              <code>sidebar</code>-prefixed prop names and forwarded verbatim to
              the internal <code>ExpandableSidebar</code>:
            </Typography>

            <BasicTable
              columns={[
                {
                  key: 'adminProp',
                  label: 'AdminLayout prop',
                  render: renderPropsCell('adminProp'),
                },
                {
                  key: 'sidebarProp',
                  label: 'Forwards to (ExpandableSidebar)',
                  render: renderPropsCell('sidebarProp'),
                },
                {
                  key: 'description',
                  label: 'Description',
                  render: renderPropsCell('description'),
                },
              ]}
              data={adminForwardingData as Array<Record<string, unknown>>}
              containerClassName="mb-4"
            />

            <CodeBlock
              language="tsx"
              code={`import { AdminLayout } from '@e-burgos/tucu-ui';

<AdminLayout
  logo={{ name: 'Acme', secondName: 'Admin' }}
  collapsedLogo={{ name: 'A' }}
  menuItems={menuItems}
  isOpen={isOpen}
  setIsOpen={setIsOpen}
  defaultSidebarPinned
  onSidebarPinnedChange={(pinned) => console.log('pinned:', pinned)}
>
  <YourContent />
</AdminLayout>`}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Persisting the Pinned State" className="mt-2 mb-2">
          <div className="w-full space-y-6 p-4 sm:p-6">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              The library deliberately does <strong>not</strong> persist the
              pinned state — it doesn't know your storage or your key.
              Persistence is the consumer's responsibility: control the state
              with <code>pinned</code> (or <code>sidebarPinned</code>) and write
              every change reported by <code>onPinnedChange</code> to your
              storage of choice:
            </Typography>
            <CodeBlock
              language="tsx"
              code={`import { useState } from 'react';
import { AdminLayout } from '@e-burgos/tucu-ui';

const STORAGE_KEY = 'my-app:sidebar-pinned';

function AppShell({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false); // mobile drawer
  const [pinned, setPinned] = useState(
    () => localStorage.getItem(STORAGE_KEY) === 'true'
  );

  return (
    <AdminLayout
      logo={{ name: 'Acme', secondName: 'Admin' }}
      menuItems={menuItems}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      sidebarPinned={pinned}
      onSidebarPinnedChange={(next) => {
        setPinned(next);
        localStorage.setItem(STORAGE_KEY, String(next));
      }}
    >
      {children}
    </AdminLayout>
  );
}`}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Collapsed Rail Logo (collapsedLogo)" className="mt-2 mb-2">
          <div className="w-full space-y-6 p-4 sm:p-6">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              The collapsed rail is only 96px wide (112px on 2xl screens), so a
              full wordmark rarely fits. <code>collapsedLogo</code> lets you
              render a distinct, compact brand mark there — an isotype, a
              monogram, or any custom node — while the expanded panel and the
              header keep using <code>logo</code>. If you omit it, the sidebar
              falls back to rendering <code>logo</code> with{' '}
              <code>isoType</code> enabled, exactly as before.
            </Typography>
            <CodeBlock
              language="tsx"
              code={`// Expanded panel shows the full wordmark, the 96px rail shows the mark only
<AdminLayout
  logo={{ name: 'Acme', secondName: 'Admin' }}
  collapsedLogo={{ logo: <AcmeIsoMark />, path: '/' }}
  menuItems={menuItems}
  isOpen={isOpen}
  setIsOpen={setIsOpen}
>
  <YourContent />
</AdminLayout>

// Without collapsedLogo the rail renders: <Logo {...logo} isoType />`}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Interactive Demo" className="mt-2 mb-2">
          <div className="w-full space-y-6 p-4 sm:p-6">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              This demo controls the sidebar with React state (<code>pinned</code>{' '}
              + <code>onPinnedChange</code>). Toggle the pin from the padlock
              button in the expanded sidebar header, or externally with the
              button below — both drive the same state. Note the "Hidden Item"
              entry in the menu config: it has <code>hide: true</code> and is
              filtered out on its own, while its siblings render normally.
            </Typography>

            <div className="flex flex-wrap items-center gap-4">
              <Button
                size="small"
                shape="rounded"
                variant="ghost"
                onClick={() => setPinned(!pinned)}
              >
                {pinned ? 'Unpin sidebar' : 'Pin sidebar'}
              </Button>
              <Typography tag="p" className="text-sm">
                Pinned:{' '}
                <Badge variant="outline" className="text-xs">
                  {String(pinned)}
                </Badge>
              </Typography>
              <Typography tag="p" className="text-sm">
                Last clicked:{' '}
                <span className="font-semibold">{lastClicked ?? '—'}</span>
              </Typography>
            </div>

            <div
              className="relative h-[460px] overflow-hidden rounded-xl border border-border bg-body"
              style={{ transform: 'translateZ(0)' }}
            >
              <ExpandableSidebar
                logo={{ name: 'Tucu', secondName: 'UI' }}
                collapsedLogo={{ name: 'TU' }}
                menuItems={demoMenuItems}
                pinned={pinned}
                onPinnedChange={setPinned}
              />
            </div>

            <Alert variant="warning">
              <div className="text-sm">
                While unpinned, hover the rail to expand the sidebar and move
                the pointer away to collapse it. While pinned, leaving with the
                pointer or clicking outside keeps it expanded.
              </div>
            </Alert>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Menu Behavior Notes" className="mt-2 mb-2">
          <div className="w-full space-y-4 p-4 sm:p-6">
            <Alert variant="info">
              <div>
                <div className="flex items-center gap-2 font-semibold">
                  <LucideIcons.EyeOff className="h-4 w-4" />
                  hide: true removes only that item
                </div>
                <div className="text-sm mt-1">
                  A menu item with <code>hide: true</code> disappears from both
                  the collapsed rail and the expanded panel while its siblings
                  keep rendering. (Previously, a single hidden item could empty
                  the entire collapsed rail.) Manually filtering{' '}
                  <code>menuItems</code> before passing them is no longer
                  necessary.
                </div>
              </div>
            </Alert>
            <Alert variant="info">
              <div>
                <div className="flex items-center gap-2 font-semibold">
                  <LucideIcons.MousePointerClick className="h-4 w-4" />
                  Active highlight in both states
                </div>
                <div className="text-sm mt-1">
                  The item whose <code>href</code> — or one of whose submenu
                  items — matches the current pathname is highlighted as active
                  in the expanded panel as well as in the collapsed rail.
                  (Previously the highlight was only applied while collapsed.)
                </div>
              </div>
            </Alert>
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default SidebarPinningSection;
