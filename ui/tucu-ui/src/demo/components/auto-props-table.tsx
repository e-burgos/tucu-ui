import React, { useMemo } from 'react';
import { BasicTable, CardContainer, CardTitle, Badge } from '../../components';
import {
  propsRegistry,
  type ComponentMeta,
  type PropInfo,
} from '../generated/props-metadata';

// ─── Types ─────────────────────────────────────────────────────

export interface AutoPropsTableProps {
  /** Component name as it appears in propsRegistry (e.g. "Button", "Input") */
  componentName: string;
  /** Optional title override (defaults to "{ComponentName} Props") */
  title?: string;
  /** Whether to show the component source file path */
  showFilePath?: boolean;
  /** Additional className for the container */
  className?: string;
  /** Filter props by name (show only matching) */
  filterProps?: string[];
  /** Hide props by name */
  hideProps?: string[];
}

// ─── Column Definitions ────────────────────────────────────────

const columns = [
  {
    key: 'prop' as const,
    label: 'Prop',
    render: (value: unknown) => (
      <code className="text-xs font-mono text-brand font-semibold">
        {String(value)}
      </code>
    ),
  },
  {
    key: 'type' as const,
    label: 'Type',
    render: (value: unknown) => {
      const typeStr = String(value);
      // Color-code union types
      if (typeStr.includes('|')) {
        const parts = typeStr.split('|').map((p) => p.trim());
        return (
          <span className="text-xs font-mono">
            {parts.map((part, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <span className="text-gray-400 dark:text-gray-500">
                    {' | '}
                  </span>
                )}
                <span className="text-blue-600 dark:text-blue-400">{part}</span>
              </React.Fragment>
            ))}
          </span>
        );
      }
      return (
        <code className="text-xs font-mono text-gray-600 dark:text-gray-400">
          {typeStr}
        </code>
      );
    },
  },
  {
    key: 'default' as const,
    label: 'Default',
    render: (value: unknown) => {
      const val = String(value);
      if (val === 'required') {
        return (
          <Badge
            color="danger"
            size="small"
            className="text-[10px] font-semibold"
          >
            required
          </Badge>
        );
      }
      if (val === '—') {
        return (
          <span className="text-xs text-gray-400 dark:text-gray-500">—</span>
        );
      }
      return (
        <code className="text-xs font-mono text-emerald-600 dark:text-emerald-400">
          {val}
        </code>
      );
    },
  },
  {
    key: 'description' as const,
    label: 'Description',
    render: (value: unknown) => (
      <span className="text-xs text-gray-600 dark:text-gray-400">
        {String(value) || '—'}
      </span>
    ),
  },
];

// ─── Helpers ───────────────────────────────────────────────────

function propsToTableData(
  props: PropInfo[],
  filterProps?: string[],
  hideProps?: string[]
): Array<Record<string, unknown>> {
  let filtered = props;

  if (filterProps?.length) {
    const allowed = new Set(filterProps);
    filtered = filtered.filter((p) => allowed.has(p.name));
  }

  if (hideProps?.length) {
    const hidden = new Set(hideProps);
    filtered = filtered.filter((p) => !hidden.has(p.name));
  }

  return filtered.map((prop) => ({
    prop: prop.name,
    type: prop.type,
    default: prop.required ? 'required' : prop.defaultValue ?? '—',
    description: prop.description,
  }));
}

// ─── Component ─────────────────────────────────────────────────

export const AutoPropsTable: React.FC<AutoPropsTableProps> = ({
  componentName,
  title,
  showFilePath = false,
  className,
  filterProps,
  hideProps,
}) => {
  const meta: ComponentMeta | undefined = propsRegistry[componentName];

  const tableData = useMemo(() => {
    if (!meta) return [];
    return propsToTableData(meta.props, filterProps, hideProps);
  }, [meta, filterProps, hideProps]);

  if (!meta) {
    return (
      <CardContainer className={className}>
        <CardTitle title={`${componentName} Props`}>
          <div className="w-full p-4 sm:p-6">
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              ⚠️ No props metadata found for &quot;{componentName}&quot;. Run{' '}
              <code className="text-xs">
                pnpm tsx scripts/generate-props.ts
              </code>{' '}
              to regenerate.
            </p>
          </div>
        </CardTitle>
      </CardContainer>
    );
  }

  return (
    <CardContainer className={className}>
      <CardTitle title={title || `${meta.displayName} Props`}>
        <div className="w-full p-4 sm:p-6">
          {showFilePath && (
            <p className="text-xs text-gray-400 dark:text-gray-500 mb-3 font-mono">
              📁 {meta.filePath}
            </p>
          )}
          {meta.description && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              {meta.description}
            </p>
          )}
          <BasicTable
            columns={columns as any}
            data={tableData}
            containerClassName="mb-4"
            hoverable
            striped
          />
          <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-2 text-right">
            {tableData.length} props · Auto-generated from TypeScript
          </p>
        </div>
      </CardTitle>
    </CardContainer>
  );
};
