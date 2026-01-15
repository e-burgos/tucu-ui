import { NotFoundPage } from '@e-burgos/tucu-ui';
import { AppErrorPage } from '@e-burgos/tucu-ui';

export const usePublicErrorRoutesConfig = () => {
  return [
    {
      key: AppErrorPage.FORBIDDEN,
      path: AppErrorPage.FORBIDDEN,
      element: <div>{AppErrorPage.FORBIDDEN}</div>,
    },
    {
      key: AppErrorPage.NOT_FOUND,
      path: AppErrorPage.NOT_FOUND,
      element: <NotFoundPage />,
    },
    {
      key: AppErrorPage.SERVER_ERROR,
      path: AppErrorPage.SERVER_ERROR,
      element: <div>{AppErrorPage.SERVER_ERROR}</div>,
    },
    {
      key: AppErrorPage.ACCESS_DENIED,
      path: AppErrorPage.ACCESS_DENIED,
      element: <div>{AppErrorPage.ACCESS_DENIED}</div>,
    },
    {
      key: AppErrorPage.USER_BLOCKED,
      path: AppErrorPage.USER_BLOCKED,
      element: <div>{AppErrorPage.USER_BLOCKED}</div>,
    },
  ];
};
