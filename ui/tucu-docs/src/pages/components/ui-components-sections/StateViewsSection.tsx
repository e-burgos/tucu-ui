import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  CodeBlock,
  Button,
  HeroCard,
  LucideIcons,
  EmptyState,
  ErrorState,
  SystemStatePage,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';

const StateViewsSection: React.FC = () => {
  const [retries, setRetries] = useState(0);

  return (
    <>
      <HeroCard
        title="State views"
        description="EmptyState, ErrorState (with retry and error details) and SystemStatePage for full-page 404 or 500 screens."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-slate-500 to-zinc-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Inbox className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="EmptyState and ErrorState" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <EmptyState
              variant="card"
              title="No invoices yet"
              description="Create your first invoice to see it here."
              action={<Button size="small">New invoice</Button>}
            />
            <ErrorState
              variant="card"
              description={`We could not load your invoices. Retries: ${retries}`}
              error={new Error('GET /invoices failed with 503')}
              onRetry={() => setRetries((n) => n + 1)}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="SystemStatePage" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <SystemStatePage
              code="404"
              title="Page not found"
              description="The page you are looking for does not exist."
              action={<Button size="small">Back to home</Button>}
              className="min-h-0 py-8"
            />
            <SystemStatePage
              tone="error"
              code="500"
              title="Something went wrong"
              description="Please try again in a few minutes."
              action={<Button size="small">Reload</Button>}
              secondaryAction={
                <Button size="small" variant="ghost">
                  Contact support
                </Button>
              }
              className="min-h-0 py-8"
            />
          </div>
        </CardTitle>
      </CardContainer>

      <AutoPropsTable componentName="EmptyState" />
      <AutoPropsTable componentName="ErrorState" />
      <AutoPropsTable componentName="SystemStatePage" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { EmptyState, ErrorState, SystemStatePage } from '@e-burgos/tucu-ui';

<EmptyState title="No invoices yet" action={<Button>New invoice</Button>} />

<ErrorState error={error} onRetry={() => refetch()} />

<SystemStatePage code="404" title="Page not found" action={<Button>Home</Button>} />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default StateViewsSection;
