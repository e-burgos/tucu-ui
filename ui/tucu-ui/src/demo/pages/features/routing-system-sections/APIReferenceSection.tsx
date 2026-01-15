import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  Badge,
  BasicTable,
  type TableColumn,
} from '../../../../index';

const APIReferenceSection: React.FC = () => {
  const standaloneTableColumns: TableColumn[] = [
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
        if (val === 'Yes') {
          return (
            <Badge variant="outline" className="text-xs">
              Yes
            </Badge>
          );
        }
        return (
          <Badge variant="outline" className="text-xs">
            Optional
          </Badge>
        );
      },
    },
    {
      key: 'description',
      label: 'Description',
    },
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
      type: 'JSX.Element',
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
      description: 'Array of nested sub-routes',
    },
    {
      prop: 'hide',
      type: 'boolean',
      required: 'Optional',
      description: 'Hide route from navigation menu',
    },
    {
      prop: 'isPublic',
      type: 'boolean',
      required: 'Optional',
      description: 'Whether the route is publicly accessible (default: true)',
    },
  ];

  const mfeTableColumns: TableColumn[] = [
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
        if (val === 'Yes') {
          return (
            <Badge variant="outline" className="text-xs">
              Yes
            </Badge>
          );
        }
        return (
          <Badge variant="outline" className="text-xs">
            Optional
          </Badge>
        );
      },
    },
    {
      key: 'description',
      label: 'Description',
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
      description: 'URL path for the route',
    },
    {
      prop: 'element',
      type: 'JSX.Element',
      required: 'Yes',
      description: 'Component to render for this route',
    },
    {
      prop: 'isPublic',
      type: 'boolean',
      required: 'Optional',
      description: 'Whether the route is publicly accessible (default: false)',
    },
    {
      prop: 'disabled',
      type: 'boolean',
      required: 'Optional',
      description: 'Whether the route is disabled',
    },
  ];

  return (
    <div className="space-y-8">
      <CardContainer>
        <CardTitle title="API Reference" className="mt-2 mb-6">
          <div className="space-y-6">
            <Typography tag="p" className="text-gray-600 dark:text-gray-400">
              Complete API reference for the routing system components and
              interfaces.
            </Typography>

            <div className="space-y-6">
              <div className="space-y-3">
                <Typography tag="h4" className="font-semibold">
                  StandaloneAppRoutesMenuItem Properties
                </Typography>
                <BasicTable
                  columns={standaloneTableColumns}
                  data={standaloneTableData}
                />
              </div>

              <div className="space-y-3">
                <Typography tag="h4" className="font-semibold">
                  IAppRouteConfig Properties (MFE)
                </Typography>
                <BasicTable columns={mfeTableColumns} data={mfeTableData} />
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default APIReferenceSection;
