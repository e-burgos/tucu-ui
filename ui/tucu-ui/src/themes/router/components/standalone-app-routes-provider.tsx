import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from '../../pages/not-found';
import { IMenuItem } from '../../../components/layouts/menus/menu-item';
import { NoRoutesPage } from '../../pages';
import { usePublicErrorRoutesConfig } from '../hooks/use-public-error-routes-config';
import { AuthProvider } from '../..';

type StandaloneAppRouteType = {
  key: string;
  path: string;
  element: JSX.Element;
};

interface StandaloneAppRoutesMenuItem extends Omit<IMenuItem, 'dropdownItems'> {
  component: JSX.Element;
  isPublic?: boolean;
  dropdownItems?: StandaloneAppRoutesMenuItem[];
}

interface StandaloneAppRoutesProps {
  menuItems: StandaloneAppRoutesMenuItem[];
  isAuthenticated: boolean;
  loginUrl?: string;
}

export const StandaloneAppRoutesProvider: FC<StandaloneAppRoutesProps> = ({
  menuItems,
  isAuthenticated,
  loginUrl,
}) => {
  const PublicErrorPages = usePublicErrorRoutesConfig();

  const handleRoutes = () => {
    if (menuItems.length === 0) {
      return [
        {
          key: 'home-page',
          path: '/',
          element: <NoRoutesPage basePath={'/'} />,
        },
      ];
    }

    const publicRoutes: StandaloneAppRouteType[] = [];

    const privateRoutes: StandaloneAppRouteType[] = [];

    menuItems?.forEach((route, index) => {
      if (route.isPublic || route.isPublic === undefined) {
        publicRoutes.push({
          key: `route-${index}`,
          path: route.path,
          element: route.component,
        });
      } else {
        privateRoutes.push({
          key: `route-${index}`,
          path: route.path,
          element: route.component,
        });
      }
      if (route.dropdownItems) {
        route.dropdownItems.forEach((dropdownRoute, dropdownIndex) => {
          if (dropdownRoute.isPublic || dropdownRoute.isPublic === undefined) {
            publicRoutes.push({
              key: `route-${index}-${dropdownIndex}`,
              path: dropdownRoute.path,
              element: dropdownRoute.component,
            });
          } else {
            privateRoutes.push({
              key: `route-${index}-${dropdownIndex}`,
              path: dropdownRoute.path,
              element: dropdownRoute.component,
            });
          }
        });
      }
    });
    return { publicRoutes, privateRoutes };
  };

  const { publicRoutes, privateRoutes } = handleRoutes() as {
    publicRoutes: StandaloneAppRouteType[];
    privateRoutes: StandaloneAppRouteType[];
  };

  return (
    <Routes>
      {privateRoutes.map((route) => (
        <Route
          key={route.key}
          path={route.path}
          element={
            <AuthProvider
              key={route.key}
              isAuthenticated={isAuthenticated}
              loginUrl={loginUrl || '/'}
            >
              {route.element}
            </AuthProvider>
          }
        />
      ))}
      {publicRoutes.map((route) => (
        <Route key={route.key} path={route.path} element={route.element} />
      ))}
      {PublicErrorPages.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      <Route
        key={'not-found-page'}
        path={'*'}
        element={<NotFoundPage basePath={'/'} />}
      />
    </Routes>
  );
};

export default StandaloneAppRoutesProvider;

export type {
  StandaloneAppRoutesMenuItem,
  StandaloneAppRoutesProps,
  StandaloneAppRouteType,
};
