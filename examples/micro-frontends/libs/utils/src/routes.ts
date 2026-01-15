export const APP_URLS = {
  AUTHENTICATION: import.meta.env.VITE_APP_AUTHENTICATION_URL,
  LANDING: import.meta.env.VITE_APP_LANDING_URL,
  USER_PROFILE: import.meta.env.VITE_APP_USER_PROFILE_URL,
  DASHBOARD: import.meta.env.VITE_APP_DASHBOARD_URL,
};

export const APP_PATHS = {
  AUTHENTICATION: '/authentication',
  LANDING: '/landing',
  USER_PROFILE: '/user-profile',
  DASHBOARD: '/dashboard',
};

export const getAppUrl = (app: keyof typeof APP_URLS) => {
  return APP_URLS[app];
};
