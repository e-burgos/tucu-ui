import React, { useMemo } from 'react';
import { useMainNavigation } from '../hooks';
import { APP_URLS } from '@e-burgos-mfe/utils';
import { QueryProvider } from '@e-burgos-mfe/api';
import { QueryClient } from '@tanstack/react-query';
import { AppLabel } from './app-label';
import {
  ThemeProvider,
  MfeThemeProviderProps,
  LAYOUT_OPTIONS,
  IMenuItem,
} from '@e-burgos/tucu-ui';
import { NavOptions } from './nav-options';

// Import tucu ui styles
import '@e-burgos/tucu-ui/styles';

export interface ShellWrapperProps extends Omit<
  MfeThemeProviderProps,
  'architecturalPatterns' | 'menuItems'
> {
  queryClient?: QueryClient;
  menuItems?: IMenuItem[];
}

export const ShellWrapper: React.FC<ShellWrapperProps> = ({
  queryClient,
  basePath,
  appRoutesConfig,
  menuItems,
  rightButton: providedRightButton,
  logo: providedLogo,
  layout: providedLayout,
  ...restProps
}) => {
  const layout = providedLayout ? providedLayout : LAYOUT_OPTIONS.HORIZONTAL;
  const logo = providedLogo ? providedLogo : { path: APP_URLS.AUTHENTICATION };
  const { mainNavigationItems } = useMainNavigation();

  // Compose rightButton with AppLabel
  const rightButton: React.ReactNode = useMemo(
    () =>
      providedRightButton ? (
        <>
          <AppLabel /> {providedRightButton}
        </>
      ) : (
        <>
          <AppLabel />
          <NavOptions />
        </>
      ),
    [providedRightButton],
  );

  return (
    <QueryProvider client={queryClient}>
      <ThemeProvider
        architecturalPatterns="mfe"
        basePath={basePath}
        appRoutesConfig={appRoutesConfig}
        layout={layout}
        menuItems={menuItems || mainNavigationItems}
        rightButton={rightButton}
        logo={logo}
        {...restProps}
      />
    </QueryProvider>
  );
};
