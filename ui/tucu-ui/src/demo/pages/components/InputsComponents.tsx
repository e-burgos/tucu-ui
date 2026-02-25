import React, { lazy } from 'react';
import { LucideIcons, HeroCard } from '../../../index';
import { DynamicSectionsPage, type SectionConfig } from '../../components';

const sections: SectionConfig[] = [
  {
    id: 'checkbox',
    label: 'Checkbox',
    component: lazy(
      () => import('./input-components-sections/CheckboxSection')
    ),
  },
  {
    id: 'file-input',
    label: 'FileInput',
    component: lazy(
      () => import('./input-components-sections/FileInputSection')
    ),
  },
  {
    id: 'input',
    label: 'Input',
    component: lazy(() => import('./input-components-sections/InputSection')),
  },
  {
    id: 'input-searcher',
    label: 'InputSearcher',
    component: lazy(
      () => import('./input-components-sections/InputSearcherSection')
    ),
  },
  {
    id: 'pin-code',
    label: 'PinCode',
    component: lazy(() => import('./input-components-sections/PinCodeSection')),
  },
  {
    id: 'radio',
    label: 'Radio',
    component: lazy(() => import('./input-components-sections/RadioSection')),
  },
  {
    id: 'radio-group',
    label: 'RadioGroup',
    component: lazy(
      () => import('./input-components-sections/RadioGroupSection')
    ),
  },
  {
    id: 'select',
    label: 'Select',
    component: lazy(() => import('./input-components-sections/SelectSection')),
  },
  {
    id: 'switch',
    label: 'Switch',
    component: lazy(() => import('./input-components-sections/SwitchSection')),
  },
  {
    id: 'textarea',
    label: 'Textarea',
    component: lazy(
      () => import('./input-components-sections/TextareaSection')
    ),
  },
  {
    id: 'toggle-bar',
    label: 'ToggleBar',
    component: lazy(
      () => import('./input-components-sections/ToggleBarSection')
    ),
  },
];

export const InputsComponents = () => {
  return (
    <DynamicSectionsPage
      sections={sections}
      hero={
        <HeroCard
          title="Input Components"
          description="Complete collection of form input components with comprehensive examples, variants, and props documentation. Built for modern web applications with TypeScript support and accessibility in mind."
          githubButton
          getStartedButton
          docsButton="introduction"
          icon={
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg border border-blue-500/50">
              <LucideIcons.Type className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
            </div>
          }
        />
      }
    />
  );
};

export default InputsComponents;
