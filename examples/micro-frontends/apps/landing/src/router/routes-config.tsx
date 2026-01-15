import { type IAppRouteConfig } from '@e-burgos/tucu-ui';
import { APP_PATHS } from '@e-burgos-mfe/utils';
import {
  InitialPageComponent,
  IntegrationGuideComponent,
  ArchitectureOverviewComponent,
  DevelopmentGuideComponent,
} from './entry-points';

export const ROUTES = {
  Base: APP_PATHS.LANDING,
  IntegrationGuide: `${APP_PATHS.LANDING}/integration-guide`,
  ArchitectureOverview: `${APP_PATHS.LANDING}/architecture-overview`,
  DevelopmentGuide: `${APP_PATHS.LANDING}/development-guide`,
};

export const useRoutesConfig = (): IAppRouteConfig[] => {
  return [
    {
      key: 'landing',
      path: ROUTES.Base,
      element: <InitialPageComponent />,
    },
    {
      key: 'integration-guide',
      path: ROUTES.IntegrationGuide,
      element: <IntegrationGuideComponent />,
    },
    {
      key: 'architecture-overview',
      path: ROUTES.ArchitectureOverview,
      element: <ArchitectureOverviewComponent />,
    },
    {
      key: 'development-guide',
      path: ROUTES.DevelopmentGuide,
      element: <DevelopmentGuideComponent />,
    },
  ].filter((route) => route);
};
