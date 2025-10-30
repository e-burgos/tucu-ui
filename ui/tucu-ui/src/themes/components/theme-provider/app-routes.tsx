import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import NotFoundPage from '../pages/not-found';
import { IMenuItem } from '../../../components/common/menu-item';

type AppRouteType = { key: string; path: string; element: JSX.Element };

interface AppRoutesMenuItem extends Omit<IMenuItem, 'dropdownItems'> {
  component: JSX.Element;
  dropdownItems?: AppRoutesMenuItem[];
}

interface AppRoutesProps {
  menuItems: AppRoutesMenuItem[];
}

export const AppRoutes: FC<AppRoutesProps> = ({ menuItems }) => {
  const handleRoutes = () => {
    if (menuItems.length === 0) {
      return [
        {
          key: 'home-page',
          path: '/',
          element: (
            <>
              <h1>No routes</h1>
              <p>
                Please add routes to the menuItems prop to start using the theme
                provider.
              </p>
            </>
          ),
        },
      ];
    }
    const filterRoutes: AppRouteType[] = [];
    menuItems?.forEach((route, index) => {
      if (route.component)
        filterRoutes.push({
          key: `route-${index}`,
          path: route.href,
          element: route.component,
        });
      if (route.dropdownItems) {
        route.dropdownItems.forEach((dropdownRoute, dropdownIndex) => {
          if (dropdownRoute.component)
            filterRoutes.push({
              key: `route-${index}-${dropdownIndex}`,
              path: dropdownRoute.href,
              element: dropdownRoute.component,
            });
        });
      }
    });
    return filterRoutes;
  };

  const routes = handleRoutes();

  const notFoundRoute = routes.find((route) => route.path === '*');

  return (
    <Routes>
      {routes.map((route) => (
        <Route key={route.key} path={route.path} element={route.element} />
      ))}
      {/* <Route
        key={'home-page'}
        path={window.location.pathname || '/'}
        element={routes[0] ? <Navigate replace to={routes[0].path} /> : null}
      /> */}
      <Route
        key={'not-found-page'}
        path={'*'}
        element={notFoundRoute ? notFoundRoute.element : <NotFoundPage />}
      />
    </Routes>
  );
};

export default AppRoutes;

export type { AppRoutesMenuItem, AppRoutesProps, AppRouteType };
