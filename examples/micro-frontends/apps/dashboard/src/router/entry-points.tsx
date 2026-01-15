import React, { lazy } from 'react';

const InitialPage = lazy(() => import('../pages/initial-page'));
const RecentActivity = lazy(() => import('../pages/resent-activity'));

export const InitialPageComponent: React.FC = (props) => (
  <InitialPage {...props} />
);

export const RecentActivityComponent: React.FC = (props) => (
  <RecentActivity {...props} />
);
