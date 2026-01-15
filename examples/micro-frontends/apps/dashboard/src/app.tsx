import { APP_PATHS } from '@e-burgos-mfe/utils';
import { ShellWrapper } from '@e-burgos-mfe/shell';
import { LAYOUT_OPTIONS } from '@e-burgos/tucu-ui';
import { useRoutesConfig } from './router/routes-config';
import { queryClient } from '@e-burgos-mfe/api';
import { useAuthGlobalStore } from '@e-burgos-mfe/auth-security';

export function App() {
  const routesConfig = useRoutesConfig();
  const { isAuthenticated } = useAuthGlobalStore();
  return (
    <ShellWrapper
      queryClient={queryClient}
      basePath={APP_PATHS.DASHBOARD}
      appRoutesConfig={routesConfig}
      isAuthenticated={isAuthenticated}
      loginUrl={APP_PATHS.AUTHENTICATION}
      layout={isAuthenticated ? LAYOUT_OPTIONS.ADMIN : LAYOUT_OPTIONS.CLEAN}
      logo={{
        name: 'DASHBOARD',
        secondName: '',
        path: APP_PATHS.DASHBOARD,
      }}
    />
  );
}

export default App;
