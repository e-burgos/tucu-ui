import { useCallback, useMemo } from 'react';
import { APP_PATHS, APP_URLS } from '@e-burgos-mfe/utils';
import { type IMenuItem, LucideIcons } from '@e-burgos/tucu-ui';

export const useMainNavigation = () => {
  const pathname = window.location.pathname;
  const isAuthenticationApp = pathname.includes(APP_PATHS.AUTHENTICATION);
  const isDashboardApp = pathname.includes(APP_PATHS.DASHBOARD);
  const isLandingApp = pathname.includes(APP_PATHS.LANDING);
  const isUserProfileApp = pathname.includes(APP_PATHS.USER_PROFILE);

  const isActive = useCallback(
    (path: string) => {
      return pathname === path;
    },
    [pathname],
  );

  const mainNavigationItems: IMenuItem[] = useMemo(
    () => [
      {
        name: 'Authentication',
        path: APP_PATHS.AUTHENTICATION,
        href: isAuthenticationApp ? undefined : APP_URLS.AUTHENTICATION,
        isActive: isActive(APP_PATHS.AUTHENTICATION),
        icon: <LucideIcons.Lock size={24} />,
        hide: true,
      },
      {
        name: 'Landing',
        path: APP_PATHS.LANDING,
        href: isLandingApp ? undefined : APP_URLS.LANDING,
        isActive: isActive(APP_PATHS.LANDING),
        icon: <LucideIcons.Home size={24} />,
        dropdownItems: [
          {
            name: 'Architecture Overview',
            path: `${APP_PATHS.LANDING}/architecture-overview`,
            href: isLandingApp
              ? undefined
              : `${APP_URLS.LANDING}/architecture-overview`,
            isActive: isActive(`${APP_PATHS.LANDING}/architecture-overview`),
          },
          {
            name: 'Development Guide',
            path: `${APP_PATHS.LANDING}/development-guide`,
            href: isLandingApp
              ? undefined
              : `${APP_URLS.LANDING}/development-guide`,
            isActive: isActive(`${APP_PATHS.LANDING}/development-guide`),
          },
          {
            name: 'Integration Guide',
            path: `${APP_PATHS.LANDING}/integration-guide`,
            href: isLandingApp
              ? undefined
              : `${APP_URLS.LANDING}/integration-guide`,
            isActive: isActive(`${APP_PATHS.LANDING}/integration-guide`),
          },
        ],
      },
      {
        name: 'User Profile',
        path: APP_PATHS.USER_PROFILE,
        href: isUserProfileApp ? undefined : APP_URLS.USER_PROFILE,
        isActive: isActive(APP_PATHS.USER_PROFILE),
        icon: <LucideIcons.User size={24} />,
        hide: true,
      },
      {
        name: 'Dashboard',
        path: APP_PATHS.DASHBOARD,
        href: isDashboardApp ? undefined : APP_URLS.DASHBOARD,
        isActive: isActive(APP_PATHS.DASHBOARD),
        icon: <LucideIcons.Grid size={24} />,
        dropdownItems: [
          {
            name: 'Recent Activity',
            path: `${APP_PATHS.DASHBOARD}/recent-activity`,
            href: isDashboardApp
              ? undefined
              : `${APP_URLS.DASHBOARD}/recent-activity`,
            isActive: isActive(`${APP_PATHS.DASHBOARD}/recent-activity`),
          },
        ],
      },
    ],
    [
      isLandingApp,
      isUserProfileApp,
      isDashboardApp,
      isAuthenticationApp,
      isActive,
    ],
  );

  return { mainNavigationItems };
};
