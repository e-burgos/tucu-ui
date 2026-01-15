import { FC, JSX } from 'react';
import { Route, Routes } from 'react-router-dom';
import NotFoundPage from '../../pages/not-found';
import { IAppRouteConfig } from '../../types';
import { usePublicErrorRoutesConfig } from '../hooks';
import { AuthProvider } from '../../auth/components';
import { DisabledPage } from '../../pages';

type MfeAppRouteType = { key: string; path: string; element: JSX.Element };

const CreateRoutes: React.FC<{
  routesConfig: IAppRouteConfig[];
  basePath: string;
  isAuthenticated: boolean;
  loginUrl: string;
}> = ({ routesConfig: routes, basePath, isAuthenticated, loginUrl }) => {
  const pathBase =
    basePath || document.querySelector('base')?.getAttribute('href') || '/';
  const PublicErrorPages = usePublicErrorRoutesConfig();

  const publicRoutes = [
    ...PublicErrorPages.map((route) => (
      <Route
        key={route.path}
        path={`${pathBase}/${route.path}`}
        element={route.element}
      />
    )),
  ];
  const disabledRoutes: JSX.Element[] = [];

  const privateRoutes: JSX.Element[] = [];

  routes?.forEach((route: IAppRouteConfig) => {
    if (route.isPublic || route.isPublic === undefined) {
      publicRoutes.push(
        <Route key={route.path} path={route.path} element={route.element} />
      );
    }
    if (route.disabled && route.disabled === true) {
      disabledRoutes.push(
        <Route
          key={route.path}
          path={route.path}
          element={<DisabledPage basePath={pathBase} />}
        />
      );
    }
    privateRoutes.push(
      <Route key={route.path} path={route.path} element={route.element} />
    );
  });

  // Last Route
  privateRoutes.push(
    <Route
      key="last-route"
      path="*"
      element={<NotFoundPage basePath={pathBase} />}
    />
  );

  return (
    <Routes>
      {publicRoutes}
      {disabledRoutes}
      <Route
        path="*"
        element={
          <AuthRoutes
            privateRoutes={privateRoutes}
            isAuthenticated={isAuthenticated}
            loginUrl={loginUrl}
          />
        }
      />
    </Routes>
  );
};

const AuthRoutes: React.FC<{
  privateRoutes: Array<JSX.Element>;
  isAuthenticated: boolean;
  loginUrl: string;
}> = ({ privateRoutes, isAuthenticated, loginUrl }) => {
  return (
    <AuthProvider isAuthenticated={isAuthenticated} loginUrl={loginUrl}>
      <Routes>{privateRoutes}</Routes>
    </AuthProvider>
  );
};

export interface MfeAppRoutesProviderProps {
  routesConfig: IAppRouteConfig[];
  basePath: string;
  isAuthenticated: boolean;
  loginUrl: string;
}
export const MfeAppRoutesProvider: FC<MfeAppRoutesProviderProps> = ({
  routesConfig,
  basePath,
  isAuthenticated,
  loginUrl,
}) => {
  return (
    <CreateRoutes
      routesConfig={routesConfig}
      basePath={basePath}
      isAuthenticated={isAuthenticated}
      loginUrl={loginUrl}
    />
  );
};

export default MfeAppRoutesProvider;

export type { MfeAppRouteType };
