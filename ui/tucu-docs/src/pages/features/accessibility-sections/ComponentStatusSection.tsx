import React from 'react';
import {
  HeroCard,
  CardContainer,
  Typography,
  LucideIcons,
  Badge,
} from '@e-burgos/tucu-ui';

const ComponentStatusSection: React.FC = () => {
  const components = [
    {
      name: 'Input',
      status: 'complete' as const,
      features: [
        'label + htmlFor association',
        'aria-required on required fields',
        'aria-invalid on error',
        'aria-describedby for helperText/error',
        'Auto-generated IDs via useId()',
      ],
    },
    {
      name: 'Button',
      status: 'complete' as const,
      features: [
        'aria-busy during loading',
        'aria-label support',
        'aria-describedby support',
        'Loading visually hides text without removing DOM',
        'Focus ring visible on all variants',
      ],
    },
    {
      name: 'Modal',
      status: 'partial' as const,
      features: [
        'role="dialog" + aria-modal="true"',
        'aria-labelledby + aria-describedby',
        'Escape key closes',
        'Focus restore on close',
        '⚠️ Missing: Focus trapping (Tab can escape)',
      ],
    },
    {
      name: 'Drawer',
      status: 'complete' as const,
      features: [
        'role="dialog" + aria-modal="true"',
        'Full focus trap (Tab/Shift+Tab cycles)',
        'Escape key closes',
        'Focus first element on open',
        'Focus restore on close',
      ],
    },
    {
      name: 'Alert',
      status: 'complete' as const,
      features: [
        'role="alert"',
        'aria-live="assertive" + aria-atomic',
        'Dismiss button with aria-label',
        'Supports custom aria-label prop',
        'Dismissible toggle via prop',
      ],
    },
    {
      name: 'Tabs',
      status: 'complete' as const,
      features: [
        'role="tablist" / role="tab" / role="tabpanel"',
        'aria-selected on active tab',
        'aria-controls linking tab↔panel',
        'ArrowRight/Left + Home/End navigation',
        'tabIndex roving (0 on active, -1 on others)',
      ],
    },
    {
      name: 'Select',
      status: 'complete' as const,
      features: [
        'role="combobox" + aria-haspopup="listbox"',
        'role="listbox" + role="option"',
        'aria-expanded + aria-activedescendant',
        'Arrow/Enter/Space/Escape keyboard',
        'Focus restore on close',
      ],
    },
    {
      name: 'Checkbox',
      status: 'complete' as const,
      features: [
        'label + htmlFor association',
        'aria-invalid on error',
        'aria-describedby for helperText/error',
        'Auto-generated IDs via useId()',
        'Standard checkbox keyboard (Space)',
      ],
    },
  ];

  const getStatusBadge = (status: 'complete' | 'partial') => {
    if (status === 'complete') {
      return (
        <Badge variant="soft" color="success" size="small">
          Complete
        </Badge>
      );
    }
    return (
      <Badge variant="soft" color="warning" size="small">
        Partial
      </Badge>
    );
  };

  return (
    <>
      <HeroCard
        title="Component Status"
        description="Detailed accessibility compliance status for each component — verified against the actual source code implementation."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-indigo-500 via-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.ListChecks className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Per-Component Breakdown
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            7 of 8 core components have full accessibility — Modal needs focus
            trapping
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {components.map((component) => (
            <CardContainer
              key={component.name}
              className="group hover:shadow-large transition-all duration-300"
            >
              <div className="w-full p-4 sm:p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <Typography tag="h3" className="font-semibold text-lg">
                    {component.name}
                  </Typography>
                  {getStatusBadge(component.status)}
                </div>
                <div className="space-y-1.5">
                  {component.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-2">
                      {feature.startsWith('⚠️') ? (
                        <LucideIcons.AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      ) : (
                        <LucideIcons.Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                      )}
                      <Typography
                        tag="span"
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        {feature.replace('⚠️ ', '')}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>
    </>
  );
};

export default ComponentStatusSection;
