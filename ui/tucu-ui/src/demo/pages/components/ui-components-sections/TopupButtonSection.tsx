import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  TopupButton,
  LucideIcons,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { PropPlayground } from '../../../components/prop-playground';

const TopupButtonSection: React.FC = () => {
  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          TopupButton
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A specialized button component for top-up or recharge actions, with
          support for icons and links.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Basic Topup Button
                </Typography>
                <TopupButton label="Add Funds" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Icon
                </Typography>
                <TopupButton
                  label="Top Up Account"
                  icon={<LucideIcons.Plus className="w-4 h-4" />}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Link
                </Typography>
                <TopupButton
                  label="Recharge Now"
                  href="/topup"
                  icon={<LucideIcons.CreditCard className="w-4 h-4" />}
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With onClick Handler
                </Typography>
                <TopupButton
                  label="Add Balance"
                  icon={<LucideIcons.Wallet className="w-4 h-4" />}
                  onClick={() => console.log('Topup clicked')}
                />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
      <PropPlayground
        componentName="TopupButton"
        defaultValues={{ label: 'Top Up' }}
        excludeProps={['onClick', 'icon']}
      >
        {(props) => <TopupButton {...props} />}
      </PropPlayground>
      <AutoPropsTable componentName="TopupButton" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { TopupButton, LucideIcons } from '@e-burgos/tucu-ui';

// Basic usage
<TopupButton label="Add Funds" />

// With icon
<TopupButton
  label="Top Up Account"
  icon={<LucideIcons.Plus className="w-4 h-4" />}
/>

// With link
<TopupButton
  label="Recharge Now"
  href="/topup"
  icon={<LucideIcons.CreditCard className="w-4 h-4" />}
/>

// With onClick handler
<TopupButton
  label="Add Balance"
  icon={<LucideIcons.Wallet className="w-4 h-4" />}
  onClick={() => handleTopup()}
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default TopupButtonSection;
