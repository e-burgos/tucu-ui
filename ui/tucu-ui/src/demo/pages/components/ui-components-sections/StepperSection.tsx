import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Stepper,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { Check, User, CreditCard, Package } from 'lucide-react';

const StepperSection: React.FC = () => {
  const [step1, setStep1] = useState(1);
  const [step2, setStep2] = useState(0);

  const basicSteps = [
    { id: 'details', label: 'Details' },
    { id: 'payment', label: 'Payment' },
    { id: 'shipping', label: 'Shipping' },
    { id: 'confirm', label: 'Confirm' },
  ];

  const iconSteps = [
    { id: 'account', label: 'Account', icon: <User className="h-3 w-3" /> },
    {
      id: 'billing',
      label: 'Billing',
      icon: <CreditCard className="h-3 w-3" />,
    },
    {
      id: 'delivery',
      label: 'Delivery',
      icon: <Package className="h-3 w-3" />,
    },
    { id: 'done', label: 'Done', icon: <Check className="h-3 w-3" /> },
  ];

  return (
    <>
      <div className="text-center space-y-4">
        <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
          Stepper
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
        >
          A step indicator for multi-step flows like checkouts, wizards, and
          onboarding sequences.
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Examples" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6 space-y-8">
            <CardContainer className="p-4">
              <Typography tag="h5" className="mb-4">
                Interactive Stepper
              </Typography>
              <Stepper
                steps={basicSteps}
                currentStep={step1}
                onStepChange={setStep1}
              />
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setStep1((s) => Math.max(0, s - 1))}
                  disabled={step1 === 0}
                  className="px-3 py-1.5 text-xs rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-30"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setStep1((s) => Math.min(basicSteps.length - 1, s + 1))
                  }
                  disabled={step1 === basicSteps.length - 1}
                  className="px-3 py-1.5 text-xs rounded-md bg-brand text-white disabled:opacity-30"
                >
                  Next
                </button>
              </div>
            </CardContainer>

            <CardContainer className="p-4">
              <Typography tag="h5" className="mb-4">
                With Icons
              </Typography>
              <Stepper
                steps={iconSteps}
                currentStep={step2}
                onStepChange={setStep2}
              />
              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => setStep2((s) => Math.max(0, s - 1))}
                  disabled={step2 === 0}
                  className="px-3 py-1.5 text-xs rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 disabled:opacity-30"
                >
                  Previous
                </button>
                <button
                  onClick={() =>
                    setStep2((s) => Math.min(iconSteps.length - 1, s + 1))
                  }
                  disabled={step2 === iconSteps.length - 1}
                  className="px-3 py-1.5 text-xs rounded-md bg-brand text-white disabled:opacity-30"
                >
                  Next
                </button>
              </div>
            </CardContainer>

            <CardContainer className="p-4">
              <Typography tag="h5" className="mb-4">
                Read-only (no onStepChange)
              </Typography>
              <Stepper steps={basicSteps} currentStep={2} />
            </CardContainer>
          </div>
        </CardTitle>
      </CardContainer>

      <AutoPropsTable componentName="Stepper" />

      <CardContainer className="overflow-hidden">
        <CardTitle title="Code Example" className="mt-2 mb-2">
          <div className="w-full p-4 sm:p-6">
            <CodeBlock
              language="tsx"
              code={`import { Stepper } from '@e-burgos/tucu-ui';
import { useState } from 'react';

const steps = [
  { id: 'details', label: 'Details' },
  { id: 'payment', label: 'Payment' },
  { id: 'shipping', label: 'Shipping' },
  { id: 'confirm', label: 'Confirm' },
];

const [currentStep, setCurrentStep] = useState(0);

// Interactive
<Stepper
  steps={steps}
  currentStep={currentStep}
  onStepChange={setCurrentStep}
/>

// Read-only (no click)
<Stepper steps={steps} currentStep={2} />

// With custom icons
const iconSteps = [
  { id: 'account', label: 'Account', icon: <User className="h-3 w-3" /> },
  { id: 'billing', label: 'Billing', icon: <CreditCard className="h-3 w-3" /> },
];
<Stepper steps={iconSteps} currentStep={0} onStepChange={setStep} />`}
            />
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default StepperSection;
