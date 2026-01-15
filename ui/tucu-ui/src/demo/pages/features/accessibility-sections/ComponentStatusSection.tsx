import React from 'react';
import {
  CardContainer,
  CardTitle,
  Badge,
  Typography,
  LucideIcons,
} from '../../../../index';

const ComponentStatusSection: React.FC = () => {
  const componentStatus = [
    {
      name: 'Input',
      status: 'complete',
      description: 'Fully accessible with proper ARIA attributes',
    },
    {
      name: 'Checkbox',
      status: 'complete',
      description: 'Complete with label associations and error handling',
    },
    {
      name: 'Modal',
      status: 'complete',
      description: 'Focus management and keyboard navigation',
    },
    {
      name: 'Alert',
      status: 'complete',
      description: 'Live regions and proper announcements',
    },
    {
      name: 'Button',
      status: 'complete',
      description: 'Loading states and ARIA support',
    },
    {
      name: 'Tabs',
      status: 'needs-work',
      description: 'Missing ARIA roles and keyboard navigation',
    },
    {
      name: 'Drawer',
      status: 'needs-work',
      description: 'Needs focus trapping improvements',
    },
    {
      name: 'Select',
      status: 'needs-work',
      description: 'Missing ARIA attributes and keyboard support',
    },
  ];

  return (
    <div className="space-y-8">
      <CardContainer className="overflow-hidden">
        <CardTitle title="Component Accessibility Status" className="mt-2 mb-2">
          <div className="w-full space-y-8 p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-linear-to-br from-orange-500 via-amber-500 to-yellow-500 shadow-lg">
                <LucideIcons.CheckCircle className="w-6 h-6 text-white filter drop-shadow-sm" />
              </div>
              <Typography tag="h3" className="text-xl font-semibold">
                Current Implementation Status
              </Typography>
            </div>

            <div className="space-y-4">
              {componentStatus.map((component, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-brand/70 transition-colors duration-200"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      {component.status === 'complete' ? (
                        <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
                      ) : (
                        <LucideIcons.AlertTriangle className="w-5 h-5 text-yellow-500" />
                      )}
                      <Badge
                        status={
                          component.status === 'complete'
                            ? 'active'
                            : 'inactive'
                        }
                        className={
                          component.status === 'complete'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }
                      >
                        {component.name}
                      </Badge>
                    </div>
                    <Typography
                      tag="span"
                      className="text-sm text-gray-600 dark:text-gray-400"
                    >
                      {component.description}
                    </Typography>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default ComponentStatusSection;
