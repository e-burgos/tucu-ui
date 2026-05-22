import React from 'react';
import {
  HeroCard,
  CardContainer,
  Typography,
  LucideIcons,
  Badge,
} from '../../../../index';

const FormComponentsSection: React.FC = () => {
  const inputCategories = [
    {
      icon: (
        <LucideIcons.Type className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Text Inputs',
      description: 'Standard text entry with validation and helper text',
      color: 'from-blue-500 to-cyan-500',
      components: ['Input', 'Textarea'],
    },
    {
      icon: (
        <LucideIcons.List className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Selection',
      description: 'Dropdown and autocomplete with search support',
      color: 'from-green-500 to-emerald-500',
      components: ['Select', 'InputSearcher'],
    },
    {
      icon: (
        <LucideIcons.CheckSquare className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Choice Controls',
      description: 'Boolean and group selection inputs',
      color: 'from-purple-500 to-violet-500',
      components: ['Checkbox', 'Radio', 'RadioGroup', 'Switch'],
    },
    {
      icon: (
        <LucideIcons.Upload className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'File Upload',
      description: 'File input with drag & drop support',
      color: 'from-pink-500 to-rose-500',
      components: ['FileInput'],
    },
    {
      icon: (
        <LucideIcons.Hash className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Specialized',
      description: 'PIN codes and toggle selection bars',
      color: 'from-indigo-500 to-purple-500',
      components: ['PinCode', 'ToggleBar'],
    },
  ];

  return (
    <>
      <HeroCard
        title="Form Components"
        description="11 input components ready for use with FormField. Each integrates automatically with validation, error display, and form state."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-purple-500 via-violet-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.LayoutGrid className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Available Inputs
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            All form inputs organized by category
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {inputCategories.map((category, index) => (
            <CardContainer key={index}>
              <div className="w-full p-4 sm:p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2.5 rounded-xl bg-linear-to-br ${category.color} shadow-lg`}
                  >
                    {category.icon}
                  </div>
                  <div>
                    <Typography tag="h3" className="font-semibold">
                      {category.title}
                    </Typography>
                    <Typography
                      tag="p"
                      className="text-sm text-gray-500 dark:text-gray-400"
                    >
                      {category.description}
                    </Typography>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {category.components.map((comp, idx) => (
                    <Badge
                      key={idx}
                      color="success"
                      variant="outline"
                      className="text-xs"
                    >
                      {comp}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Usage with FormField
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Any input wrapped in FormField gets automatic registration and error
            handling
          </Typography>
        </div>

        <CardContainer>
          <div className="w-full p-4 sm:p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  label: 'Input',
                  code: '<FormField name="email"><Input type="email" /></FormField>',
                },
                {
                  label: 'Select',
                  code: '<FormField name="country"><Select options={countries} /></FormField>',
                },
                {
                  label: 'Checkbox',
                  code: '<FormField name="terms"><Checkbox label="Accept" /></FormField>',
                },
                {
                  label: 'InputSearcher',
                  code: '<FormField name="city"><InputSearcher options={cities} /></FormField>',
                },
              ].map((example, idx) => (
                <div
                  key={idx}
                  className="p-3 bg-gray-100 dark:bg-gray-800/50 rounded-lg border border-border"
                >
                  <Typography
                    tag="span"
                    className="text-xs font-semibold text-brand block mb-2"
                  >
                    {example.label}
                  </Typography>
                  <code className="text-xs text-gray-600 dark:text-gray-400 break-all">
                    {example.code}
                  </code>
                </div>
              ))}
            </div>
          </div>
        </CardContainer>
      </section>
    </>
  );
};

export default FormComponentsSection;
