import { createPortal } from 'react-dom';

export function AppLabel() {
  const appVersion = import.meta.env.MODULE_APP_VERSION;
  const appName = import.meta.env.MODULE_APP_NAME;
  const isDevelopment =
    import.meta.env.VITE_APP_ENVIRONMENT === 'development' ||
    import.meta.env.VITE_APP_ENVIRONMENT === 'local';

  if (!isDevelopment) {
    return null;
  }

  return createPortal(
    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 border border-gray-100 dark:border-gray-800 flex flex-col items-center justify-center w-[300px] h-[50px] bg-white/50 dark:bg-gray-500/10 rounded-t-md p-4 z-50">
      <h1 className="text-lg font-medium text-gray-900 dark:text-white">
        {appName} - v{appVersion}
      </h1>
    </div>,
    document.body,
  );
}

export default AppLabel;
