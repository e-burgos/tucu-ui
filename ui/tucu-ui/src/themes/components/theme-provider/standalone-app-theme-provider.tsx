import React, { Suspense } from 'react';
import { BrowserRouter, Routes } from 'react-router-dom';
import ThemeWrapper, { ThemeWrapperProps } from './theme-wrapper';
import StandaloneAppRoutesProvider, {
  StandaloneAppRoutesProps,
} from '../../router/components/standalone-app-routes-provider';
import FallbackPage from '../../pages/fallback-page';
import { IMenuItem } from '../../../components/layouts/menus/menu-item';

export interface StandaloneAppProviderProps
  extends Omit<ThemeWrapperProps, 'menuItems' | 'children'> {
  menuItems: StandaloneAppRoutesProps['menuItems'];
  customRoutes?: React.ReactElement<typeof Routes>;
  isAuthenticated: boolean;
  loginUrl?: string;
}

const StandaloneAppProvider: React.FC<StandaloneAppProviderProps> = ({
  menuItems,
  customRoutes,
  isAuthenticated,
  loginUrl,
  ...themeProviderProps
}) => {
  return (
    <Suspense fallback={<FallbackPage loadingText="Loading..." />}>
      <BrowserRouter>
        <ThemeWrapper
          menuItems={menuItems as IMenuItem[]}
          {...themeProviderProps}
        >
          {customRoutes ? (
            customRoutes
          ) : (
            <StandaloneAppRoutesProvider
              menuItems={menuItems}
              isAuthenticated={isAuthenticated}
              loginUrl={loginUrl}
            />
          )}
        </ThemeWrapper>
      </BrowserRouter>
    </Suspense>
  );
};

export default StandaloneAppProvider;
