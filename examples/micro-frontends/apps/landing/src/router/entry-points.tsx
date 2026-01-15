import React, { lazy } from 'react';

const InitialPage = lazy(() => import('../pages/initial-page'));
const IntegrationGuide = lazy(() => import('../pages/integration-guide'));
const ArchitectureOverview = lazy(
  () => import('../pages/architecture-overview'),
);
const DevelopmentGuide = lazy(() => import('../pages/development-guide'));

export const InitialPageComponent: React.FC = (props) => (
  <InitialPage {...props} />
);

export const IntegrationGuideComponent: React.FC = (props) => (
  <IntegrationGuide {...props} />
);

export const ArchitectureOverviewComponent: React.FC = (props) => (
  <ArchitectureOverview {...props} />
);

export const DevelopmentGuideComponent: React.FC = (props) => (
  <DevelopmentGuide {...props} />
);
