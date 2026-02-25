import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  PanelActionCard,
  Button,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const PanelActionCardSection: React.FC = () => {
  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          PanelActionCard
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A panel card component with a scrollable content area and action
          buttons at the bottom.
        </Typography>
      </div>

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
            actions={[{ label: 'Action', onClick: () => {} }]}
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
