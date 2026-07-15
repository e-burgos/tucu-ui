import React from 'react';
import {
  HeroCard,
  CardContainer,
  Typography,
  LucideIcons,
  FeatureCard,
  Badge,
} from '@e-burgos/tucu-ui';

const ArchitectureOverviewSection: React.FC = () => {
  const architectureLayers = [
    {
      title: 'Form Container',
      description:
        'Main wrapper that initializes react-hook-form, handles submission, and provides context to all children.',
      icon: <LucideIcons.Box className="w-6 h-6" />,
    },
    {
      title: 'FormField Wrapper',
      description:
        'Connects any input to the form state. Handles registration, error display, and label rendering automatically.',
      icon: <LucideIcons.Layers className="w-6 h-6" />,
    },
    {
      title: 'Validation System',
      description:
        'Centralized or per-field validation via FormValidations type. Supports required, pattern, min/max, and custom validators.',
      icon: <LucideIcons.Shield className="w-6 h-6" />,
    },
    {
      title: 'Performance',
      description:
        'Built on react-hook-form — minimal re-renders by isolating field state. Only the changed field re-renders.',
      icon: <LucideIcons.Zap className="w-6 h-6" />,
    },
  ];

  return (
    <>
      <HeroCard
        title="Architecture Overview"
        description="The tucu-ui form system is a thin, typed wrapper around react-hook-form. It provides Form, FormField, and useFormContext with centralized validation and automatic error handling."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Layers className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Core Layers
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Four architectural layers that compose the form system
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {architectureLayers.map((layer, index) => (
            <FeatureCard
              key={index}
              title={layer.title}
              description={layer.description}
              icon={layer.icon}
            />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Component Tree
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            How Form, FormField, and useFormContext relate to each other
          </Typography>
        </div>

        {/* Root: <Form> */}
        <div className="flex flex-col items-center gap-3">
          <CardContainer>
            <div className="w-full p-4 sm:p-5 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-200 dark:bg-blue-800 flex items-center justify-center shrink-0">
                <LucideIcons.Box className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <Typography
                  tag="h3"
                  className="font-semibold text-blue-700 dark:text-blue-300"
                >
                  {'<Form>'}
                </Typography>
                <div className="flex flex-wrap gap-2 mt-1">
                  <Badge variant="soft" color="info">
                    useFormProps
                  </Badge>
                  <Badge variant="soft" color="info">
                    validationSchema
                  </Badge>
                  <Badge variant="soft" color="info">
                    onSubmit
                  </Badge>
                </div>
              </div>
            </div>
          </CardContainer>

          {/* Connector line */}
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />

          {/* Children row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-3xl">
            {/* FormField */}
            <div className="flex flex-col items-center gap-3">
              <CardContainer>
                <div className="w-full p-4 sm:p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-purple-200 dark:bg-purple-900/40 flex items-center justify-center shrink-0">
                      <LucideIcons.Layers className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <Typography
                      tag="h3"
                      className="font-semibold text-purple-700 dark:text-purple-300"
                    >
                      {'<FormField>'}
                    </Typography>
                  </div>
                  <div className="space-y-2 pl-12">
                    <div className="flex items-center gap-2">
                      <LucideIcons.GitBranch className="w-3.5 h-3.5 text-gray-400" />
                      <Typography
                        tag="span"
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        Controller (react-hook-form)
                      </Typography>
                    </div>
                    <div className="flex items-center gap-2">
                      <LucideIcons.AlertCircle className="w-3.5 h-3.5 text-gray-400" />
                      <Typography
                        tag="span"
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        Error display (automatic)
                      </Typography>
                    </div>
                    <div className="flex items-center gap-2">
                      <LucideIcons.TextCursorInput className="w-3.5 h-3.5 text-gray-400" />
                      <Typography
                        tag="span"
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        {'<Input />'} (any input)
                      </Typography>
                    </div>
                  </div>
                </div>
              </CardContainer>

              {/* Connector to input examples */}
              <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />

              <div className="flex flex-wrap justify-center gap-2">
                {['Input', 'Select', 'Checkbox', 'Switch', 'Radio'].map(
                  (comp) => (
                    <Badge key={comp} variant="outline" color="primary">
                      {comp}
                    </Badge>
                  )
                )}
              </div>
            </div>

            {/* useFormContext */}
            <div className="flex flex-col items-center gap-3">
              <CardContainer>
                <div className="w-full p-4 sm:p-5 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shrink-0">
                      <LucideIcons.Link className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <Typography
                      tag="h3"
                      className="font-semibold text-emerald-700 dark:text-emerald-300"
                    >
                      useFormContext()
                    </Typography>
                  </div>
                  <div className="space-y-2 pl-12">
                    <div className="flex items-center gap-2">
                      <LucideIcons.Eye className="w-3.5 h-3.5 text-gray-400" />
                      <Typography
                        tag="span"
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        watch, setValue, getValues
                      </Typography>
                    </div>
                    <div className="flex items-center gap-2">
                      <LucideIcons.Activity className="w-3.5 h-3.5 text-gray-400" />
                      <Typography
                        tag="span"
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        formState: errors, isDirty
                      </Typography>
                    </div>
                    <div className="flex items-center gap-2">
                      <LucideIcons.RotateCcw className="w-3.5 h-3.5 text-gray-400" />
                      <Typography
                        tag="span"
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        reset, trigger, clearErrors
                      </Typography>
                    </div>
                  </div>
                </div>
              </CardContainer>

              {/* Connector to usage note */}
              <div className="w-px h-4 bg-gray-300 dark:bg-gray-600" />

              <Badge variant="soft" color="success">
                <LucideIcons.Info className="w-3.5 h-3.5" />
                Available in any child component
              </Badge>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ArchitectureOverviewSection;
