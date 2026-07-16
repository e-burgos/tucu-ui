import React from 'react';
import {
  HeroCard,
  CardContainer,
  Typography,
  LucideIcons,
} from '@e-burgos/tucu-ui';

const BestPracticesSection: React.FC = () => {
  const doItems = [
    'Always define a TypeScript interface for your form values',
    'Use generic types: Form<FormValues>, FormField<FormValues>',
    'Prefer centralized validationSchema for consistency',
    'Provide clear, user-friendly error messages',
    'Use mode: "onBlur" for large forms (fewer re-renders)',
    'Use mode: "onChange" when real-time feedback is needed',
    'Always add labels for accessibility (FormField label prop)',
    'Use reset() to clear forms after successful submission',
  ];

  const dontItems = [
    "Don't use uncontrolled inputs outside FormField — they won't register",
    "Don't call setValue without shouldValidate: true if you need instant feedback",
    "Don't put useFormContext in a component outside Form — it will crash",
    "Don't mix controlled and uncontrolled patterns in the same field",
    "Don't use watch() for values you only read on submit — use getValues() instead",
    "Don't forget defaultValues — required for reset() and initial state",
    "Don't validate on every keystroke for complex async checks — use debounce",
    "Don't skip FormField for inputs that need error display",
  ];

  const performanceTips = [
    {
      title: 'Isolated Re-renders',
      description:
        'react-hook-form only re-renders the field that changed, not the whole form. This is automatic.',
      icon: <LucideIcons.Zap className="w-5 h-5 text-amber-500" />,
    },
    {
      title: 'Use onBlur Mode',
      description:
        'For forms with 10+ fields, mode: "onBlur" validates only when the user leaves a field, reducing re-renders.',
      icon: <LucideIcons.Timer className="w-5 h-5 text-blue-500" />,
    },
    {
      title: 'Avoid watch() Overuse',
      description:
        'Each watch() call subscribes to re-renders. Use getValues() for one-time reads in handlers.',
      icon: <LucideIcons.Eye className="w-5 h-5 text-purple-500" />,
    },
    {
      title: 'Split Large Forms',
      description:
        'For wizard/multi-step flows, split into multiple Form instances or conditional sections.',
      icon: <LucideIcons.Layers className="w-5 h-5 text-green-500" />,
    },
  ];

  return (
    <>
      <HeroCard
        title="Best Practices"
        description="Guidelines for building performant, accessible, and maintainable forms with the tucu-ui form system."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-green-500 via-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Do&apos;s and Don&apos;ts
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Quick reference for form development
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <CardContainer>
            <div className="w-full p-4 sm:p-6 space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
                <Typography
                  tag="h3"
                  className="font-semibold text-green-700 dark:text-green-400"
                >
                  Do
                </Typography>
              </div>
              {doItems.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <LucideIcons.Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                  <Typography
                    tag="span"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    {item}
                  </Typography>
                </div>
              ))}
            </div>
          </CardContainer>

          <CardContainer>
            <div className="w-full p-4 sm:p-6 space-y-3">
              <div className="flex items-center gap-2 mb-4">
                <LucideIcons.XCircle className="w-5 h-5 text-red-500" />
                <Typography
                  tag="h3"
                  className="font-semibold text-red-700 dark:text-red-400"
                >
                  Don&apos;t
                </Typography>
              </div>
              {dontItems.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <LucideIcons.X className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <Typography
                    tag="span"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    {item}
                  </Typography>
                </div>
              ))}
            </div>
          </CardContainer>
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Performance Tips
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            How to keep forms fast as they grow in complexity
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {performanceTips.map((tip, index) => (
            <CardContainer key={index}>
              <div className="w-full p-4 sm:p-6 space-y-2">
                <div className="flex items-center gap-3">
                  {tip.icon}
                  <Typography tag="h3" className="font-semibold">
                    {tip.title}
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed"
                >
                  {tip.description}
                </Typography>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>
    </>
  );
};

export default BestPracticesSection;
