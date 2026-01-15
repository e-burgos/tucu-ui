import React, { lazy } from 'react';

const InitialPage = lazy(() => import('../pages/initial-page'));

export const InitialPageComponent: React.FC = (props) => (
  <InitialPage {...props} />
);
