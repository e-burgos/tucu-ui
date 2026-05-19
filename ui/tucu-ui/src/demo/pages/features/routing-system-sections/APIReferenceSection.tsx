import React from 'react';
import {
  HeroCard,
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  Badge,
  BasicTable,
  type TableColumn,
} from '../../../../index';

const APIReferenceSection: React.FC = () => {
  const tableColumns: TableColumn[] = [
    {
      key: 'prop',
      label: 'Property',
      render: (value: unknown) => (
        <code className="text-xs text-brand">{String(value)}</code>
      ),
    },
    {
      key: 'type',
      label: 'Type',
      render: (value: unknown) => (
        <code className="text-xs">{String(value)}</code>
      ),
    },
    {
      key: 'required',
      label: 'Required',
      render: (value: unknown) => {
        const val = String(value);
        return (
          <Badge variant="outline" className="text-xs">
            {val === 'Yes' ? 'Yes' : 'Optional'}
          </Badge>
        );
      },
    },
    { key: 'description', label: 'Description' },
  ];

  const standaloneTableData = [
    {
      prop: 'name',
      type: 'string',
      required: 'Yes',
      description: 'Display name for navigation menu',
    },
    {
      prop: 'path',
      type: 'string',
      required: 'Yes',
      description: 'URL path for the route',
    },
    {
      prop: 'component',
      type: 'React.JSX.Element',
      required: 'Yes',
      description: 'Component to render for this route',
    },
    {
      prop: 'icon',
      type: 'React.ReactNode',
      required: 'Optional',
      description: 'Icon to display in navigation',
    },
    {
      prop: 'dropdownItems',
      type: 'StandaloneAppRoutesMenuItem[]',
      required: 'Optional',
      description: 'Array of nested sub-routes (recursive)',
    },
    {
      prop: 'enableNestedRoutes',
      type: 'boolean',
      required: 'Optional',
      description: 'Adds /* to path for nested routing within the component',
    },
    {
      prop: 'isPublic',
      type: 'boolean',
      required: 'Optional',
      description: 'Whether the route is publicly accessible',
    },
    {
      prop: 'hide',
      type: 'boolean',
      required: 'Optional',
      description: 'Hide route from navigation menu',
    },
    {
      prop: 'href',
      type: 'string',
      required: 'Optional',
      description: 'External URL (opens in new tab)',
    },
    {
      prop: 'isActive',
      type: 'boolean',
      required: 'Optional',
      description: 'Force active state in navigation',
    },
    {
      prop: 'onClick',
      type: '() => void',
      required: 'Optional',
      description: 'Custom click handler for the menu item',
    },
  ];

  const mfeTableData = [
    {
      prop: 'key',
      type: 'string',
      required: 'Yes',
      description: 'Unique identifier for the route',
    },
    {
      prop: 'path',
      type: 'string',
      required: 'Yes',
      description: 'URL path (inherited from RouteProps)',
    },
    {
      prop: 'element',
      type: 'React.ReactNode',
      required: 'Yes',
      description: 'Component to render (inherited from RouteProps)',
    },
    {
      prop: 'isPublic',
      type: 'boolean',
      required: 'Optional',
      description: 'If true, accessible without authentication (default: false)',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      required: 'Optional',
      description: 'Temporarily disable this route',
    },
  ];

  const mfeProviderTableData = [
    {
      prop: 'architecturalPatterns',
      type: "'mfe'",
      required: 'Yes',
      description: 'Activates MFE mode',
    },
    {
      prop: 'basePath',
      type: 'string',
      required: 'Yes',
      description: 'Base path for the micro frontend (e.g., /my-app)',
    },
    {
      prop: 'appRoutesConfig',
      type: 'IAppRouteConfig[]',
      required: 'Yes',
      description: 'Array of route configurations',
    },
    {
      prop: 'isAuthenticated',
      type: 'boolean',
      required: 'Yes',
      description: 'Whether the user is authenticated',
    },
    {
      prop: 'loginUrl',
      type: 'string',
      required: 'Yes',
      description: 'Redirect URL for unauthenticated users',
    },
  ];

  return (
    <>
      <HeroCard
        title="API Reference"
        description="Complete API reference for all routing system interfaces and their properties."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-gray-500 via-slate-500 to-zinc-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.BookOpen className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            StandaloneAppRoutesMenuItem
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Properties for standalone route definitions
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="Properties">
            <BasicTable columns={tableColumns} data={standaloneTableData} />
          </CardTitle>
        </CardContainer>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            IAppRouteConfig (MFE)
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Properties for MFE route configurations (extends RouteProps)
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="Properties">
            <BasicTable columns={tableColumns} data={mfeTableData} />
          </CardTitle>
        </CardContainer>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            MFE ThemeProvider Props
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Required props when using architecturalPatterns=&quot;mfe&quot;
          </Typography>
        </div>
        <CardContainer>
          <CardTitle title="MFE-Specific Props">
            <BasicTable columns={tableColumns} data={mfeProviderTableData} />
          </CardTitle>
        </CardContainer>
      </section>
    </>
  );
};

export default APIReferenceSection;
