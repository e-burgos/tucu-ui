import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  PanelActionCard,
  HeroCard,
  LucideIcons,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const PanelActionCardSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="PanelActionCard"
        description="A panel card component with a scrollable content area and action
          buttons at the bottom."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-purple-500 to-fuchsia-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.PanelLeft className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="space-y-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Panel with Actions
                </Typography>
                <PanelActionCard
                  title="Panel Title"
                  actions={[
                    {
                      label: 'Cancel',
                      variant: 'ghost',
                      onClick: () => console.log('Cancel'),
                    },
                    {
                      label: 'Save',
                      variant: 'solid',
                      color: 'primary',
                      onClick: () => console.log('Save'),
                    },
                  ]}
                >
                  <div className="space-y-2">
                    <Typography tag="p">Content line 1</Typography>
                    <Typography tag="p">Content line 2</Typography>
                    <Typography tag="p">Content line 3</Typography>
                  </div>
                </PanelActionCard>
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Without Actions
                </Typography>
                <PanelActionCard title="Panel Without Actions">
                  <div className="space-y-2">
                    <Typography tag="p">
                      This panel has no action buttons.
                    </Typography>
                  </div>
                </PanelActionCard>
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="PanelActionCard"
        defaultValues={{ title: 'Panel Title' }}
        excludeProps={['actions']}
      >
        {(props) => (
          <PanelActionCard
            {...props}
            actions={[{ label: 'Action', onClick: () => undefined }]}
          />
        )}
      </PropPlayground>
      <AutoPropsTable componentName="PanelActionCard" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { PanelActionCard, Typography } from '@e-burgos/tucu-ui';

// With actions
<PanelActionCard
  title="Panel Title"
  actions={[
    {
      label: 'Cancel',
      variant: 'ghost',
      onClick: () => handleCancel(),
    },
    {
      label: 'Save',
      variant: 'solid',
      color: 'primary',
      onClick: () => handleSave(),
    },
  ]}
>
  <div className="space-y-2">
    <Typography tag="p">Content here</Typography>
  </div>
</PanelActionCard>

// Without actions
<PanelActionCard title="Panel Title">
  <Typography tag="p">Content without actions</Typography>
</PanelActionCard>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default PanelActionCardSection;
