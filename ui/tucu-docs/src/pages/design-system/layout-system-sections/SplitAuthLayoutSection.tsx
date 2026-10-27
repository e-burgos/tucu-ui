import React, { useState } from 'react';
import {
  Alert,
  CardContainer,
  CardTitle,
  CodeBlock,
  HeroCard,
  LucideIcons,
  SignInForm,
  SplitAuthLayout,
  Typography,
  type SplitAuthLayoutProps,
} from '@e-burgos/tucu-ui';

const usageCode = `import { SplitAuthLayout, SignInForm } from '@e-burgos/tucu-ui';

<SplitAuthLayout
  brand={{
    name: 'Acme',
    headline: 'Ship faster with your whole team',
    lead: 'One workspace for planning, building and reviewing.',
    highlights: [{ text: 'SSO and 2FA out of the box' }],
    footer: '© 2026 Acme Inc.',
  }}
  title="Welcome back"
  subtitle="Sign in to continue"
  brandPosition="start"
  variant="split"
  surface="glass"
>
  <SignInForm forgetPasswordPath="/forgot-password" onSubmit={signIn} />
</SplitAuthLayout>`;

const SplitAuthLayoutSection: React.FC = () => {
  const [variant, setVariant] =
    useState<NonNullable<SplitAuthLayoutProps['variant']>>('split');
  const [brandPosition, setBrandPosition] =
    useState<NonNullable<SplitAuthLayoutProps['brandPosition']>>('start');

  return (
    <>
      <HeroCard
        title="Split Auth Layout"
        description="Authentication page shell with a brand column and a form column, a centered variant, and glass, solid or plain surfaces."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-violet-500 via-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.PanelLeft className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Live preview" className="mt-2 mb-2">
          <div className="w-full space-y-4 p-4 sm:p-6">
            <div className="flex flex-wrap gap-2 text-sm">
              {(['split', 'centered'] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={variant === value}
                  onClick={() => setVariant(value)}
                  className="rounded-md border border-border px-3 py-1 aria-pressed:bg-brand aria-pressed:text-white"
                >
                  variant: {value}
                </button>
              ))}
              {(['start', 'end'] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={brandPosition === value}
                  onClick={() => setBrandPosition(value)}
                  className="rounded-md border border-border px-3 py-1 aria-pressed:bg-brand aria-pressed:text-white"
                >
                  brandPosition: {value}
                </button>
              ))}
            </div>
            <div className="overflow-auto rounded-xl border border-border bg-light-dark">
              <SplitAuthLayout
                className="p-6"
                variant={variant}
                brandPosition={brandPosition}
                breakpoint="md"
                brand={{
                  name: 'Acme',
                  headline: 'Ship faster with your whole team',
                  lead: 'One workspace for planning, building and reviewing.',
                  highlights: [
                    { text: 'SSO and 2FA out of the box' },
                    { text: 'Audit log for every change' },
                  ],
                  footer: '© 2026 Acme Inc.',
                }}
                title="Welcome back"
                subtitle="Sign in to continue"
              >
                <SignInForm forgetPasswordPath="#forgot-password" />
              </SplitAuthLayout>
            </div>
            <Typography className="text-sm text-foreground/70">
              The brand column appears from the <code>breakpoint</code> (
              <code>md</code> or <code>lg</code>) and is replaced by a compact
              header below it.
            </Typography>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Usage" className="mt-2 mb-2">
          <div className="w-full space-y-4 p-4 sm:p-6">
            <CodeBlock language="tsx" code={usageCode} />
            <Alert variant="info">
              <div className="text-sm">
                <code>title</code> renders as the page h1. Tokens:{' '}
                <code>--tucu-auth-brand-bg</code>,{' '}
                <code>--tucu-auth-brand-fg</code>,{' '}
                <code>--tucu-auth-brand-muted</code>,{' '}
                <code>--tucu-auth-divider</code>.
              </div>
            </Alert>
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default SplitAuthLayoutSection;
