import { type IAppRouteConfig } from '@e-burgos/tucu-ui';
import { APP_PATHS } from '@e-burgos-mfe/utils';
import { InitialPageComponent, RecentActivityComponent } from './entry-points';

export const ROUTES = {
  Base: APP_PATHS.DASHBOARD,
  RecentActivity: `${APP_PATHS.DASHBOARD}/recent-activity`,
};

export const useRoutesConfig = (): IAppRouteConfig[] => {
  return [
    {
      key: 'dashboard',
      path: ROUTES.Base,
      element: <InitialPageComponent />,
      isPublic: false,
    },
    {
      key: 'dashboard-recent-activity',
      path: ROUTES.RecentActivity,
      element: <RecentActivityComponent />,
      isPublic: false,
    },
  ].filter((route) => route);
};
