import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Button,
  Badge,
  HeroCard,
  LucideIcons,
  SplitModal,
  SplitModalWizard,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';

const documentSections = [
  {
    id: 'document',
    label: 'Document',
    items: [
      { id: 'overview', label: 'Overview', status: 'success' as const },
      {
        id: 'clauses',
        label: 'Clauses',
        status: 'warning' as const,
        badge: (
          <Badge tone="warning" size="xs">
            3
          </Badge>
        ),
      },
      {
        id: 'payments',
        label: 'Payments',
        status: 'danger' as const,
        description: '1 overdue',
      },
    ],
  },
  {
    id: 'other',
    label: 'Other',
    items: [
      { id: 'history', label: 'History' },
      { id: 'archive', label: 'Archive', disabled: true },
    ],
  },
];

const wizardSteps = [
  {
    id: 'account',
    title: 'Account',
    description: 'Name must be at least 3 characters',
    hint: 'Validation runs asynchronously before moving on.',
    content: null as React.ReactNode,
  },
  {
    id: 'team',
    title: 'Team',
    description: 'Invite people',
    content: <Typography tag="p">Invite your teammates here.</Typography>,
  },
  {
    id: 'review',
    title: 'Review',
    content: (
      <Typography tag="p">Everything is ready to be created.</Typography>
    ),
  },
];

const SplitModalSection: React.FC = () => {
  const [docOpen, setDocOpen] = useState(false);
  const [activeId, setActiveId] = useState('overview');
  const [wizardOpen, setWizardOpen] = useState(false);
  const [step, setStep] = useState('account');
  const [workspaceName, setWorkspaceName] = useState('');

  const validateStep = async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return id !== 'account' || workspaceName.trim().length >= 3;
  };

  const steps = wizardSteps.map((s) =>
    s.id === 'account'
      ? {
          ...s,
          content: (
            <input
              aria-label="Workspace name"
              className="w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 dark:border-gray-600"
              placeholder="Workspace name"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
            />
          ),
        }
      : s
  );

  return (
    <>
      <HeroCard
        title="SplitModal"
        description="Two-pane dialog with a sectioned sidebar navigation (status dots, badges, footer actions) and an independently scrolling body. SplitModalWizard adds steps with async validation."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-sky-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.PanelLeft className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Document viewer" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 space-y-3">
            <Typography tag="p">
              Sections with status dots, controlled active item and sidebar
              footer actions.
            </Typography>
            <Button onClick={() => setDocOpen(true)}>Open SplitModal</Button>
            <SplitModal
              isOpen={docOpen}
              onClose={() => setDocOpen(false)}
              title="Contract 2024-117"
              chips={
                <Badge tone="success" variant="soft">
                  Signed
                </Badge>
              }
              sections={documentSections}
              activeItemId={activeId}
              onActiveItemChange={setActiveId}
              sidebarFooter={
                <div className="flex gap-2">
                  <Button size="small" variant="ghost">
                    Download
                  </Button>
                  <Button size="small">Share</Button>
                </div>
              }
            >
              <Typography tag="h5">{activeId}</Typography>
              <Typography tag="p">
                Content for the selected item. The body scrolls independently
                from the sidebar.
              </Typography>
            </SplitModal>
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Wizard with validation" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 space-y-3">
            <Typography tag="p">
              The first step is validated asynchronously; moving backwards never
              validates.
            </Typography>
            <Button onClick={() => setWizardOpen(true)}>
              Open SplitModalWizard
            </Button>
            <SplitModalWizard
              isOpen={wizardOpen}
              onClose={() => setWizardOpen(false)}
              title="Create workspace"
              subtitle="Three quick steps"
              steps={steps}
              activeStepId={step}
              onStepChange={setStep}
              validateStep={validateStep}
              showProgress
              onCancel={() => setWizardOpen(false)}
              primaryAction={
                <Button onClick={() => setWizardOpen(false)}>Create</Button>
              }
            />
          </div>
        </CardTitle>
      </CardContainer>

      <AutoPropsTable componentName="SplitModal" />
      <AutoPropsTable componentName="SplitModalWizard" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { SplitModal, SplitModalWizard } from '@e-burgos/tucu-ui';

<SplitModal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Contract 2024-117"
  activeItemId={activeId}
  onActiveItemChange={setActiveId}
  sections={[
    {
      id: 'document',
      label: 'Document',
      items: [
        { id: 'overview', label: 'Overview', status: 'success' },
        { id: 'payments', label: 'Payments', status: 'danger' },
      ],
    },
  ]}
  sidebarFooter={<Button size="small">Share</Button>}
>
  {content}
</SplitModal>

<SplitModalWizard
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Create workspace"
  steps={steps}
  activeStepId={step}
  onStepChange={setStep}
  validateStep={async (id) => (await validate(id)) === true}
  primaryAction={<Button>Create</Button>}
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default SplitModalSection;
