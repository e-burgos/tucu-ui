import {
  DefaultErrorPage,
  ForbiddenPage,
  NotFoundPage,
  ServerErrorPage,
  UserBlockedPage,
} from '../../pages';
import { AccessDeniedPage } from '../../pages/access-denied';
import { AppErrorPage } from '../../types';

export const usePublicErrorRoutesConfig = () => {
  return [
    {
      key: AppErrorPage.FORBIDDEN,
      path: AppErrorPage.FORBIDDEN,
      element: <ForbiddenPage />,
    },
    {
      key: AppErrorPage.NOT_FOUND,
      path: AppErrorPage.NOT_FOUND,
      element: <NotFoundPage />,
    },
    {
      key: AppErrorPage.SERVER_ERROR,
      path: AppErrorPage.SERVER_ERROR,
      element: <ServerErrorPage />,
    },
    {
      key: AppErrorPage.ACCESS_DENIED,
      path: AppErrorPage.ACCESS_DENIED,
      element: <AccessDeniedPage />,
    },
    {
      key: AppErrorPage.USER_BLOCKED,
      path: AppErrorPage.USER_BLOCKED,
      element: <UserBlockedPage />,
    },
    {
      key: AppErrorPage.DEFAULT,
      path: AppErrorPage.DEFAULT,
      element: <DefaultErrorPage />,
    },
  ];
};
