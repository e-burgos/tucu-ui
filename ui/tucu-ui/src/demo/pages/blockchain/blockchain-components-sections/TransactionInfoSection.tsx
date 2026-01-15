import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  BasicTable,
  TransactionInfo,
} from '../../../../index';

const TransactionInfoSection: React.FC = () => {
  // Table columns definition for props tables
  const propsTableColumns = [
    {
      key: 'prop',
      label: 'Prop',
      render: (value: unknown) => (
        <code className="text-xs text-brand">{String(value)}</code>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (value: unknown) => (
        <code className="text-xs">{String(value)}</code>
      ),
    },
    {
      key: 'default',
      label: 'Default',
      render: (value: unknown) => {
        const val = String(value);
        if (val === 'required') {
          return <span className="text-xs text-red-500">required</span>;
        }
        return <code className="text-xs">{val}</code>;
      },
    },
    {
      key: 'description',
      label: 'Description',
    },
  ];

  // TransactionInfo props data
  const transactionInfoPropsData = [
    {
      prop: 'label',
      type: 'string',
      default: 'required',
      description: 'Label text for the transaction field',
    },
    {
      prop: 'value',
      type: 'string | number',
      default: '-',
      description: 'Transaction value to display',
    },
    {
      prop: 'className',
      type: 'string',
      default: "''",
      description: 'Custom CSS classes',
    },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          TransactionInfo
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Simple component for displaying transaction information with label and
          value.
        </Typography>
      </div>

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

      <CardContainer className="overflow-hidden">
        <CardTitle title="Props" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <BasicTable
              columns={propsTableColumns}
              data={transactionInfoPropsData}
            />
          </div>
        </CardTitle>
      </CardContainer>

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
