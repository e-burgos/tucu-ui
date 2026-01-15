import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FallbackPage } from '../../pages';
import { IAppRouteConfig } from '../../types';
import ThemeWrapper, { ThemeWrapperProps } from './theme-wrapper';
import { MfeAppRoutesProvider } from '../../router/components';

interface MfeAppThemeProviderProps extends Omit<ThemeWrapperProps, 'children'> {
  basePath: string;
  appRoutesConfig: IAppRouteConfig[];
  isAuthenticated: boolean;
  loginUrl: string;
}

export const MfeAppThemeProvider: React.FC<MfeAppThemeProviderProps> = ({
  appRoutesConfig,
  basePath,
  isAuthenticated,
  loginUrl,
  ...themeWrapperProps
}) => {
  return (
    <Suspense fallback={<FallbackPage loadingText="Loading..." />}>
      <BrowserRouter>
        <ThemeWrapper {...themeWrapperProps}>
          <MfeAppRoutesProvider
            routesConfig={appRoutesConfig}
            basePath={basePath}
            isAuthenticated={isAuthenticated}
            loginUrl={loginUrl}
          />
        </ThemeWrapper>
      </BrowserRouter>
    </Suspense>
  );
};

export type { MfeAppThemeProviderProps };
