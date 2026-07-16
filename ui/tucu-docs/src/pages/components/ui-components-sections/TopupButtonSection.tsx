import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  TopupButton,
  LucideIcons,
  HeroCard,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

const TopupButtonSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="TopupButton"
        description="A specialized button component for top-up or recharge actions, with
          support for icons and links."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-indigo-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.ArrowUpCircle className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

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
