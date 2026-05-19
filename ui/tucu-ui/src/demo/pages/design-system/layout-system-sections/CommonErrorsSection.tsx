import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  Alert,
  HeroCard,
} from '../../../../index';

const CommonErrorsSection: React.FC = () => {
  const commonErrors = [
    {
      variant: 'error' as const,
      icon: <LucideIcons.XCircle className="h-4 w-4" />,
      title: 'useTheme must be used within ThemeProvider',
      description:
        'This error occurs when you try to use useTheme outside of ThemeProvider context. Always wrap your application with ThemeProvider first. The ThemeProvider must be at the root level of your application.',
    },
    {
      variant: 'info' as const,
      icon: <LucideIcons.Info className="h-4 w-4" />,
      title: 'Layout not rendering correctly',
      description:
        "Make sure you're using ThemeProvider instead of trying to use RootLayout directly. ThemeProvider handles all layout logic internally. Also ensure menuItems prop is provided for Admin and Horizontal layouts.",
    },
    {
      variant: 'warning' as const,
      icon: <LucideIcons.AlertTriangle className="h-4 w-4" />,
      title: 'Menu items not showing',
      description:
        'For Admin and Horizontal layouts, you must provide the menuItems prop. Clean layout does not require menuItems. Ensure each menu item has at least a name and path property.',
    },
    {
      variant: 'info' as const,
      icon: <LucideIcons.Info className="h-4 w-4" />,
      title: 'Routing not working as expected?',
      description: (
        <>
          Remember that ThemeProvider includes BrowserRouter internally. If you
          use customRoutes, make sure to use <code>path</code> instead of{' '}
          <code>href</code> in menuItems. The <code>component</code> prop in
          menuItems is only used for automatic routing. If you provide
          customRoutes, it takes precedence.
        </>
      ),
    },
  ];

  return (
    <>
      <HeroCard
        title="Common Errors and Solutions"
        description="Troubleshooting guide for the most frequent layout system issues."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-red-500 via-rose-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Bug className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <div className="text-center">
        <Typography tag="h2" className="mb-2">
          Common Errors and Solutions
        </Typography>
        <Typography
          tag="p"
          className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Troubleshooting guide for the most frequent layout system issues
        </Typography>
      </div>

      <CardContainer className="overflow-hidden">
        <CardTitle title="Troubleshooting Guide" className="mt-2 mb-2">
          <div className="w-full space-y-6 p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-linear-to-br from-red-500 via-rose-500 to-pink-500 shadow-md">
                <LucideIcons.AlertCircle className="w-6 h-6 text-white filter drop-shadow-sm" />
              </div>
              <Typography tag="h3" className="text-base font-semibold">
                Common Issues
              </Typography>
            </div>

            <div className="space-y-6">
              {commonErrors.map((error, index) => (
                <Alert key={index} variant={error.variant}>
                  <div>
                    <div className="flex items-center gap-2 font-semibold">
                      {error.icon}
                      {error.title}
                    </div>
                    <div className="text-sm mt-1">{error.description}</div>
                  </div>
                </Alert>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default CommonErrorsSection;
