import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { FallbackPage } from '../../pages';
import { IAppRouteConfig } from '../../types';
import { ReactRouterNavigationProvider } from '../../navigation';
import ThemeWrapper, {
  ThemeWrapperProps,
  DistributiveOmit,
} from './theme-wrapper';
import { MfeAppRoutesProvider } from '../../router/components';

type MfeAppThemeProviderProps = DistributiveOmit<
  ThemeWrapperProps,
  'children'
> & {
  basePath: string;
  appRoutesConfig: IAppRouteConfig[];
  isAuthenticated: boolean;
  loginUrl: string;
};

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
        <ReactRouterNavigationProvider>
          <ThemeWrapper {...themeWrapperProps}>
            <MfeAppRoutesProvider
              routesConfig={appRoutesConfig}
              basePath={basePath}
              isAuthenticated={isAuthenticated}
              loginUrl={loginUrl}
            />
          </ThemeWrapper>
        </ReactRouterNavigationProvider>
      </BrowserRouter>
    </Suspense>
  );
};

export type { MfeAppThemeProviderProps };
