import { useState } from 'react';
import { ROUTES, RoutesConfig } from './router/routes-config';
import { queryClient, QueryProvider } from './queries';
import { ThemeProvider } from '@e-burgos/tucu-ui';
import { useAuthGlobalStore } from './store';
import { NavOptions } from './components/common/nav-options';

export function App() {
  const { menuItems } = RoutesConfig();
  const { isAuthenticated } = useAuthGlobalStore();
  const [currentPathname, setCurrentPathname] = useState('/');

  const isLandingApp = currentPathname.includes(ROUTES.Landing.Base);
  const isAuthenticationApp = currentPathname.includes(
    ROUTES.Authentication.Base
  );
  const isDashboardApp = currentPathname.includes(ROUTES.Dashboard.Base);
  const isUserProfileApp = currentPathname.includes(ROUTES.UserProfile.Base);

  const handleContentClassName = () => {
    if (isAuthenticationApp)
      return 'w-full h-full min-h-screen mx-auto my-auto bg-light-dark';
    if (isLandingApp) return 'px-0!';
    return '';
  };

  const handleLayout = () => {
    if (isDashboardApp && isAuthenticated) return 'admin';
    if (isUserProfileApp && isAuthenticated) return 'horizontal';
    if (isAuthenticationApp) return 'clean';
    if (isLandingApp) return 'horizontal';
    return 'clean';
  };

  const handleLogoName = () => {
    if (isLandingApp) return 'DOCS';
    if (isDashboardApp) return 'DASH';
    if (isUserProfileApp) return 'PROFILE';
    return 'UI';
  };

  const handleLogoSecondName = () => {
    if (isLandingApp) return '';
    if (isDashboardApp) return 'BOARD';
    if (isUserProfileApp) return 'PROFILE';
    return 'UI';
  };

  const contentClassName = handleContentClassName();
  const layout = handleLayout();
  const logoName = handleLogoName();
  const logoSecondName = handleLogoSecondName();

  return (
    <QueryProvider client={queryClient}>
      <ThemeProvider
        rightButton={<NavOptions />}
        menuItems={menuItems}
        setCurrentPathname={setCurrentPathname}
        logo={{
          path: '/',
          name: logoName,
          secondName: logoSecondName,
        }}
        layout={layout}
        contentClassName={contentClassName}
        isAuthenticated={isAuthenticated}
        loginUrl={ROUTES.Authentication.Login}
      />
    </QueryProvider>
  );
}

export default App;
