import React, { useState } from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  Stepper,
  HeroCard,
  LucideIcons,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';
import { Check, User, CreditCard, Package } from 'lucide-react';

import { PropPlayground } from '../../../components/prop-playground';
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
      <HeroCard
        title="Stepper"
        description="A step indicator for multi-step flows like checkouts, wizards, and
          onboarding sequences."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-teal-500 to-green-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.ListOrdered className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
          </div>
        }
      />

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
      <PropPlayground
        componentName="Stepper"
        title="Stepper Playground"
        defaultValues={{
          'currentStep': 1
}}
        excludeProps={['steps', 'onStepChange', 'className']}
      >
        {(props) => (
          <Stepper
            {...props}
            steps={[
              { label: 'Step 1' },
              { label: 'Step 2' },
              { label: 'Step 3' },
            ]}
          />
        )}
      </PropPlayground>



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
