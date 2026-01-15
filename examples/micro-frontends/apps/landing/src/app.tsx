import { APP_PATHS } from '@e-burgos-mfe/utils';
import { ShellWrapper } from '@e-burgos-mfe/shell';
import { LAYOUT_OPTIONS } from '@e-burgos/tucu-ui';
import { useRoutesConfig } from './router/routes-config';
import { queryClient } from '@e-burgos-mfe/api';

export function App() {
  const routesConfig = useRoutesConfig();
  return (
    <ShellWrapper
      queryClient={queryClient}
      basePath={APP_PATHS.LANDING}
      appRoutesConfig={routesConfig}
      layout={LAYOUT_OPTIONS.HORIZONTAL}
      isAuthenticated={true}
      loginUrl={APP_PATHS.AUTHENTICATION}
      logo={{
        path: APP_PATHS.LANDING,
      }}
      contentClassName="px-0!"
    />
  );
}

export default App;
