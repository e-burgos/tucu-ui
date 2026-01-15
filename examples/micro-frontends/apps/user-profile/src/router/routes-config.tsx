import { type IAppRouteConfig } from '@e-burgos/tucu-ui';
import { APP_PATHS } from '@e-burgos-mfe/utils';
import { InitialPageComponent } from './entry-points';

export const ROUTES = {
  Base: APP_PATHS.USER_PROFILE,
};

export const useRoutesConfig = (): IAppRouteConfig[] => {
  return [
    {
      key: 'user-profile',
      path: ROUTES.Base,
      element: <InitialPageComponent />,
      isPublic: false,
    },
  ].filter((route) => route);
};
