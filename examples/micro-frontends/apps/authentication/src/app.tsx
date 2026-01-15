import { APP_PATHS } from '@e-burgos-mfe/utils';
import { ShellWrapper } from '@e-burgos-mfe/shell';
import { LAYOUT_OPTIONS } from '@e-burgos/tucu-ui';
import { useRoutesConfig } from './router/routes-config';
import { queryClient } from '@e-burgos-mfe/api';
import { useAuthGlobalStore } from '@e-burgos-mfe/auth-security';
import { useEffect } from 'react';

export function App() {
  const routesConfig = useRoutesConfig();
  const { isAuthenticated, setAuthenticated } = useAuthGlobalStore();

  useEffect(() => {
    setAuthenticated(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ShellWrapper
      basePath={APP_PATHS.AUTHENTICATION}
      queryClient={queryClient}
      layout={LAYOUT_OPTIONS.CLEAN}
      appRoutesConfig={routesConfig}
      loginUrl={APP_PATHS.AUTHENTICATION}
      isAuthenticated={isAuthenticated}
      contentClassName="w-full h-full min-h-screen mx-auto my-auto bg-light-dark"
    />
  );
}

export default App;
