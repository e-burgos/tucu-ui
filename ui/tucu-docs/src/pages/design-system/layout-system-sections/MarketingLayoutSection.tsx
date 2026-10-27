import React, { useState } from 'react';
import {
  Alert,
  Button,
  CardContainer,
  CardTitle,
  CodeBlock,
  HeroCard,
  LucideIcons,
  MarketingLayout,
  Typography,
  type MarketingRenderLink,
} from '@e-burgos/tucu-ui';

const previewLinks = [
  { label: 'Product', href: '#product' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#docs' },
  { label: 'Blog', href: '#blog' },
];

const brand = <span className="text-lg font-semibold">Acme</span>;

const usageCode = `import { MarketingLayout, Button } from '@e-burgos/tucu-ui';

<MarketingLayout
  nav={{
    logo: <span className="font-semibold">Acme</span>,
    links: [
      { label: 'Product', href: '/product' },
      { label: 'Docs', href: '/docs', matchPrefix: true },
    ],
    actions: <Button size="small">Get started</Button>,
    transparentUntilScroll: true,
  }}
  footer={{
    logo: <span className="font-semibold">Acme</span>,
    description: 'Tools for teams that ship.',
    groups: [
      { title: 'Company', links: [{ label: 'About', href: '/about' }] },
      { title: 'Legal', links: [{ label: 'Privacy', href: '/privacy' }] },
    ],
    legal: '© 2026 Acme Inc.',
  }}
>
  <Hero />
</MarketingLayout>`;

const MarketingLayoutSection: React.FC = () => {
  const [activeHref, setActiveHref] = useState('#product');

  const renderLink: MarketingRenderLink = (link, props) => (
    <a
      {...props}
      href={link.href}
      onClick={(event) => {
        event.preventDefault();
        setActiveHref(link.href);
        props.onClick?.();
      }}
    />
  );

  return (
    <>
      <HeroCard
        title="Marketing Layout"
        description="Public-site shell with a responsive navigation bar, accessible mobile menu, skip link and a footer with link groups and socials. Router-agnostic."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-sky-500 via-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.PanelTop className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Live preview" className="mt-2 mb-2">
          <div className="w-full space-y-4 p-4 sm:p-6">
            <Typography className="text-sm text-foreground/70">
              The preview lives in a bordered frame, so the nav uses{' '}
              <code>sticky: false</code>. Resize the window below 768px to see
              the mobile menu. Links use <code>renderLink</code> to keep this
              docs page in place; by default they use the router link from{' '}
              <code>TucuNavigationContext</code> or a plain <code>&lt;a&gt;</code>.
            </Typography>
            <div className="h-[32rem] overflow-auto rounded-xl border border-border">
              <MarketingLayout
                className="min-h-full"
                renderLink={renderLink}
                nav={{
                  logo: brand,
                  logoHref: '#product',
                  sticky: false,
                  maxWidth: '5xl',
                  links: previewLinks.map((link) => ({
                    ...link,
                    active: link.href === activeHref,
                  })),
                  actions: (
                    <Button size="small" color="primary">
                      Get started
                    </Button>
                  ),
                }}
                footer={{
                  logo: brand,
                  description: 'Tools for teams that ship.',
                  groups: [
                    {
                      title: 'Company',
                      links: [
                        { label: 'About', href: '#about' },
                        { label: 'Careers', href: '#careers' },
                      ],
                    },
                    {
                      title: 'Legal',
                      links: [
                        { label: 'Privacy', href: '#privacy' },
                        { label: 'Terms', href: '#terms' },
                      ],
                    },
                  ],
                  socials: [
                    {
                      label: 'Website',
                      href: 'https://github.com',
                      icon: <LucideIcons.Globe className="h-5 w-5" />,
                    },
                  ],
                  legal: '© 2026 Acme Inc.',
                }}
              >
                <div className="px-6 py-16 text-center">
                  <Typography tag="h2" className="mb-2">
                    {previewLinks.find((link) => link.href === activeHref)
                      ?.label ?? 'Product'}
                  </Typography>
                  <Typography className="text-foreground/70">
                    Page content renders inside the main landmark.
                  </Typography>
                </div>
              </MarketingLayout>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Usage" className="mt-2 mb-2">
          <div className="w-full space-y-4 p-4 sm:p-6">
            <CodeBlock language="tsx" code={usageCode} />
            <Alert variant="info">
              <div className="text-sm">
                Active link: derived from the pathname (<code>matchPrefix</code>{' '}
                for sections) or set explicitly with <code>active</code>.{' '}
                <code>transparentUntilScroll</code> and{' '}
                <code>scrollThreshold</code> flip the bar to its solid state on
                scroll. Tokens: <code>--tucu-marketing-*</code>.
              </div>
            </Alert>
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default MarketingLayoutSection;
