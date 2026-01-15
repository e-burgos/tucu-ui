import React, { lazy } from 'react';
import {
  LucideIcons,
  HeroCard,
  TableOfContents,
  type TableOfContentsItem,
  useAnchorScroll,
} from '../../../index';
import { LazyComponentSection } from '../../components';

// Lazy load component sections - Ordered alphabetically by tocItems
const CheckboxSection = lazy(
  () => import('./input-components-sections/CheckboxSection')
);
const FileInputSection = lazy(
  () => import('./input-components-sections/FileInputSection')
);
const InputSection = lazy(
  () => import('./input-components-sections/InputSection')
);
const InputSearcherSection = lazy(
  () => import('./input-components-sections/InputSearcherSection')
);
const PinCodeSection = lazy(
  () => import('./input-components-sections/PinCodeSection')
);
const RadioSection = lazy(
  () => import('./input-components-sections/RadioSection')
);
const RadioGroupSection = lazy(
  () => import('./input-components-sections/RadioGroupSection')
);
const SelectSection = lazy(
  () => import('./input-components-sections/SelectSection')
);
const SwitchSection = lazy(
  () => import('./input-components-sections/SwitchSection')
);
const TextareaSection = lazy(
  () => import('./input-components-sections/TextareaSection')
);
const ToggleBarSection = lazy(
  () => import('./input-components-sections/ToggleBarSection')
);

export const InputsComponents = () => {
  useAnchorScroll();

  // Table of contents items
  const tocItems: TableOfContentsItem[] = [
    { id: 'checkbox', label: 'Checkbox' },
    { id: 'file-input', label: 'FileInput' },
    { id: 'input', label: 'Input' },
    { id: 'input-searcher', label: 'InputSearcher' },
    { id: 'pin-code', label: 'PinCode' },
    { id: 'radio', label: 'Radio' },
    { id: 'radio-group', label: 'RadioGroup' },
    { id: 'select', label: 'Select' },
    { id: 'switch', label: 'Switch' },
    { id: 'textarea', label: 'Textarea' },
    { id: 'toggle-bar', label: 'ToggleBar' },
  ];

  return (
    <div className="relative scroll-smooth">
      <TableOfContents items={tocItems}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 pt-8 lg:pt-0">
      {/* Hero Section */}
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

          {/* Lazy-loaded component sections */}
          <LazyComponentSection id="checkbox" component={CheckboxSection} />
          <LazyComponentSection id="file-input" component={FileInputSection} />
          <LazyComponentSection id="input" component={InputSection} />
          <LazyComponentSection
            id="input-searcher"
            component={InputSearcherSection}
          />
          <LazyComponentSection id="pin-code" component={PinCodeSection} />
          <LazyComponentSection id="radio" component={RadioSection} />
          <LazyComponentSection
            id="radio-group"
            component={RadioGroupSection}
          />
          <LazyComponentSection id="select" component={SelectSection} />
          <LazyComponentSection id="switch" component={SwitchSection} />
          <LazyComponentSection id="textarea" component={TextareaSection} />
          <LazyComponentSection id="toggle-bar" component={ToggleBarSection} />
              </div>
      </TableOfContents>
    </div>
  );
};

export default InputsComponents;
