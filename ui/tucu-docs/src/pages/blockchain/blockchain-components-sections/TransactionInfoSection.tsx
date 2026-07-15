import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  TransactionInfo,
  HeroCard,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import { AutoPropsTable } from '@tucu-ui-internal/docs-kit/components/auto-props-table';
import { PropPlayground } from '@tucu-ui-internal/docs-kit/components/prop-playground';

const TransactionInfoSection: React.FC = () => {
  return (
    <>
      <HeroCard
        title="TransactionInfo"
        description="Simple component for displaying transaction information with label and value. Perfect for showing blockchain transaction details."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-slate-500 via-gray-500 to-zinc-500 rounded-full flex items-center justify-center shadow-lg border border-slate-500/50">
            <LucideIcons.Receipt className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Basic Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  With Value
                </Typography>
                <TransactionInfo
                  label="Transaction Hash"
                  value="0x1234...5678"
                />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Without Value
                </Typography>
                <TransactionInfo label="Gas Fee" />
              </CardContainer>
              <CardContainer className="p-4">
                <Typography tag="h5" className="mb-3">
                  Number Value
                </Typography>
                <TransactionInfo label="Block Number" value={12345678} />
              </CardContainer>
            </div>
          </div>
        </CardTitle>
      </CardContainer>

      <PropPlayground
        componentName="TransactionInfo"
        defaultValues={{
          label: 'Transaction Hash',
          value: '0x1234...5678',
        }}
        controlOverrides={[
          {
            name: 'label',
            type: 'text',
            description: 'Label text for the transaction field',
          },
          {
            name: 'value',
            type: 'text',
            description: 'Value to display (string or number)',
          },
        ]}
        includeProps={['label', 'value']}
      >
        {(props) => (
          <div className="w-full max-w-md">
            <TransactionInfo label={props.label} value={props.value} />
          </div>
        )}
      </PropPlayground>

      <AutoPropsTable componentName="TransactionInfo" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { TransactionInfo } from '@e-burgos/tucu-ui';

<TransactionInfo
  label="Transaction Hash"
  value="0x1234...5678"
/>

<TransactionInfo
  label="Gas Fee"
  // value is optional, shows "_ _" if not provided
/>

<TransactionInfo
  label="Block Number"
  value={12345678}
/>`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default TransactionInfoSection;
