import React from 'react';
import { CardContainer, CardTitle, Typography, LucideIcons, Alert } from '../../../../index';

const CommonErrorsSection: React.FC = () => {
  return (
    <>
      <CardContainer className="overflow-hidden">
        <CardTitle title="Common Errors and Solutions" className="mt-2 mb-2">
          <div className="w-full space-y-8 p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 shadow-md">
                <LucideIcons.AlertCircle className="w-6 h-6 text-white filter drop-shadow-sm" />
              </div>
              <Typography tag="h3" className="text-xl font-semibold">
                Troubleshooting Guide
              </Typography>
            </div>

            <div className="space-y-6">
              <Alert variant="error">
                <div>
                  <div className="flex items-center gap-2 font-semibold">
                    <LucideIcons.XCircle className="h-4 w-4" />
                    useTheme must be used within ThemeProvider
                  </div>
                  <div className="text-sm mt-1">
                    This error occurs when you try to use useTheme outside of
                    ThemeProvider context. Always wrap your application with
                    ThemeProvider first. The ThemeProvider must be at the root
                    level of your application.
                  </div>
                </div>
              </Alert>

              <Alert variant="info">
                <div>
                  <div className="flex items-center gap-2 font-semibold">
                    <LucideIcons.Info className="h-4 w-4" />
                    Layout not rendering correctly
                  </div>
                  <div className="text-sm mt-1">
                    Make sure you're using ThemeProvider instead of trying to
                    use RootLayout directly. ThemeProvider handles all layout
                    logic internally. Also ensure menuItems prop is provided
                    for Admin and Horizontal layouts.
                  </div>
                </div>
              </Alert>

              <Alert variant="warning">
                <div>
                  <div className="flex items-center gap-2 font-semibold">
                    <LucideIcons.AlertTriangle className="h-4 w-4" />
                    Menu items not showing
                  </div>
                  <div className="text-sm mt-1">
                    For Admin and Horizontal layouts, you must provide the
                    menuItems prop. Clean layout does not require menuItems.
                    Ensure each menu item has at least a name and path
                    property.
                  </div>
                </div>
              </Alert>

              <Alert variant="info">
                <div>
                  <div className="flex items-center gap-2 font-semibold">
                    <LucideIcons.Info className="h-4 w-4" />
                    Routing not working as expected?
                  </div>
                  <div className="text-sm mt-1">
                    Remember that ThemeProvider includes BrowserRouter
                    internally. If you use customRoutes, make sure to use{' '}
                    <code>path</code> instead of <code>href</code> in
                    menuItems. The <code>component</code> prop in menuItems is
                    only used for automatic routing. If you provide
                    customRoutes, it takes precedence.
                  </div>
                </div>
              </Alert>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </>
  );
};

export default CommonErrorsSection;

