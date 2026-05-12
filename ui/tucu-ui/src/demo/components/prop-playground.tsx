/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo, useCallback } from 'react';
import {
  CardContainer,
  CardTitle,
  Input,
  Switch,
  Select,
  BasicTable,
  type SelectOption,
  Badge,
} from '../../components';
import { propsRegistry, type PropInfo } from '../generated/props-metadata';
import { LucideAlertTriangle } from 'lucide-react';

// ─── Types ─────────────────────────────────────────────────────

export interface PropPlaygroundProps {
  /** Component name from propsRegistry */
  componentName: string;
  /** The component to render with interactive props */
  children: (props: any) => React.ReactNode;
  /** Default prop values to start with */
  defaultValues?: Record<string, any>;
  /** Props to exclude from the playground controls */
  excludeProps?: string[];
  /** Only show these props in the controls */
  includeProps?: string[];
  /** Additional className */
  className?: string;
  /** Title override */
  title?: string;
  /** Manual controls to supplement or override metadata-derived controls */
  controlOverrides?: PropPlaygroundControlOverride[];
}

// ─── Prop Type Analysis ────────────────────────────────────────

type ControlType = 'boolean' | 'select' | 'text' | 'number' | 'none';
export type PlaygroundControlType = Exclude<ControlType, 'none'>;

interface ControlConfig {
  type: ControlType;
  options?: string[];
}

export interface PropPlaygroundControlOverride {
  name: string;
  type: PlaygroundControlType;
  options?: string[];
  propType?: string;
  required?: boolean;
  description?: string;
}

function getOverridePropType(override: PropPlaygroundControlOverride): string {
  if (override.propType) return override.propType;

  switch (override.type) {
    case 'boolean':
      return 'false | true';
    case 'number':
      return 'number';
    case 'select':
      return (override.options || [])
        .map((option) => `"${option}"`)
        .join(' | ');
    case 'text':
    default:
      return 'string';
  }
}

function analyzeControl(prop: PropInfo): ControlConfig {
  const type = prop.type.toLowerCase();

  // Boolean
  if (
    type === 'boolean' ||
    type === 'false | true' ||
    type === 'true | false'
  ) {
    return { type: 'boolean' };
  }

  // Union / Enum — extract quoted values
  if (prop.type.includes('|') && prop.type.includes('"')) {
    const options = prop.type
      .split('|')
      .map((v) => v.trim().replace(/^"|"$/g, ''))
      .filter((v) => v.length > 0 && !v.includes('=>'));
    if (options.length > 0) {
      return { type: 'select', options };
    }
  }

  // Number
  if (type === 'number') {
    return { type: 'number' };
  }

  // String
  if (type === 'string') {
    return { type: 'text' };
  }

  // Complex types (functions, ReactNode, etc.) — no control
  if (
    type.includes('=>') ||
    type.includes('reactnode') ||
    type.includes('reactelement') ||
    type.includes('element') ||
    type.includes('ref')
  ) {
    return { type: 'none' };
  }

  // Default to text for simple types
  if (!type.includes('<') && !type.includes('{') && !type.includes('(')) {
    return { type: 'text' };
  }

  return { type: 'none' };
}

// ─── Control Renderers ─────────────────────────────────────────

interface ControlProps {
  prop: PropInfo;
  control: ControlConfig;
  value: any;
  onChange: (name: string, value: any) => void;
}

type PropPlaygroundTableRow = Record<string, unknown> & {
  id: string;
  propName: string;
  propType: string;
  propDescription: string;
  propRequired: boolean;
  controlElement: React.ReactNode;
};

const BooleanControl: React.FC<ControlProps> = ({ prop, value, onChange }) => (
  <Switch
    checked={Boolean(value)}
    onChange={() => onChange(prop.name, !value)}
  />
);

const SelectControl: React.FC<ControlProps> = ({
  prop,
  control,
  value,
  onChange,
}) => {
  const options: SelectOption[] = useMemo(
    () =>
      (control.options || []).map((opt) => ({
        name: opt,
        value: opt,
      })),
    [control.options]
  );

  return (
    <Select
      value={value || ''}
      onSelect={(val: string) => onChange(prop.name, val)}
      options={options}
      label=""
      variant="solid"
      className="text-xs w-full"
      size="sm"
    />
  );
};

const TextControl: React.FC<ControlProps> = ({ prop, value, onChange }) => (
  <Input
    label=""
    placeholder={prop.name}
    value={value ?? ''}
    onChange={(e) => onChange(prop.name, e.target.value)}
    variant="solid"
    className="text-xs w-full"
    size="sm"
  />
);

const NumberControl: React.FC<ControlProps> = ({ prop, value, onChange }) => (
  <Input
    label=""
    placeholder={prop.name}
    type="number"
    value={value ?? ''}
    onChange={(e) => onChange(prop.name, Number(e.target.value))}
    variant="solid"
    className="text-xs w-full"
    size="sm"
  />
);

// ─── Main Component ────────────────────────────────────────────

export const PropPlayground: React.FC<PropPlaygroundProps> = ({
  componentName,
  children,
  defaultValues = {},
  excludeProps = [],
  includeProps,
  className,
  title,
  controlOverrides = [],
}) => {
  const meta = propsRegistry[componentName];
  const controlOverrideMap = useMemo(
    () =>
      new Map(controlOverrides.map((override) => [override.name, override])),
    [controlOverrides]
  );
  const availableProps = useMemo(() => {
    if (!meta) return [];

    const propsByName = new Map(meta.props.map((prop) => [prop.name, prop]));

    for (const override of controlOverrides) {
      if (!propsByName.has(override.name)) {
        propsByName.set(override.name, {
          name: override.name,
          type: getOverridePropType(override),
          defaultValue: null,
          required: override.required ?? false,
          description: override.description ?? '',
        });
      }
    }

    return Array.from(propsByName.values());
  }, [meta, controlOverrides]);

  // Build controllable props list
  const controllableProps = useMemo(() => {
    if (!meta) return [];

    const excluded = new Set([
      ...excludeProps,
      'children',
      'className',
      'style',
      'ref',
      'key',
    ]);

    const mappedProps = availableProps
      .filter((p) => {
        if (excluded.has(p.name)) return false;
        if (includeProps && !includeProps.includes(p.name)) return false;
        const override = controlOverrideMap.get(p.name);
        const control = override
          ? { type: override.type, options: override.options }
          : analyzeControl(p);
        // Allow props with explicit defaultValues even if analyzeControl returns 'none'
        if (control.type === 'none' && p.name in defaultValues) {
          return true;
        }
        return control.type !== 'none';
      })
      .map((p) => {
        const override = controlOverrideMap.get(p.name);
        const control = override
          ? { type: override.type, options: override.options }
          : analyzeControl(p);
        // Override 'none' controls when a defaultValue is provided — treat as text
        if (control.type === 'none' && p.name in defaultValues) {
          const dv = defaultValues[p.name];
          if (typeof dv === 'boolean')
            return { prop: p, control: { type: 'boolean' as ControlType } };
          if (typeof dv === 'number')
            return { prop: p, control: { type: 'number' as ControlType } };
          return { prop: p, control: { type: 'text' as ControlType } };
        }
        return { prop: p, control };
      });

    if (!includeProps?.length) {
      return mappedProps;
    }

    const includeOrder = new Map(
      includeProps.map((propName, index) => [propName, index])
    );

    return mappedProps.sort(
      (a, b) =>
        (includeOrder.get(a.prop.name) ?? Number.MAX_SAFE_INTEGER) -
        (includeOrder.get(b.prop.name) ?? Number.MAX_SAFE_INTEGER)
    );
  }, [
    meta,
    availableProps,
    excludeProps,
    includeProps,
    defaultValues,
    controlOverrideMap,
  ]);

  const buildInitialValues = useCallback(() => {
    const initial: Record<string, any> = { ...defaultValues };

    for (const { prop, control } of controllableProps) {
      if (prop.name in initial) continue;

      if (prop.defaultValue !== null) {
        initial[prop.name] =
          control.type === 'boolean'
            ? prop.defaultValue === 'true'
            : prop.defaultValue;
      } else {
        switch (control.type) {
          case 'boolean':
            initial[prop.name] = false;
            break;
          case 'select':
            initial[prop.name] = control.options?.[0] ?? '';
            break;
          case 'number':
            initial[prop.name] = '';
            break;
          case 'text':
          default:
            initial[prop.name] = '';
            break;
        }
      }
    }

    return initial;
  }, [controllableProps, defaultValues]);

  // State for prop values — initialize ALL controllable props to avoid
  // "uncontrolled to controlled" React warnings (value undefined → defined).
  const [values, setValues] = useState<Record<string, any>>(() =>
    buildInitialValues()
  );

  const handleChange = useCallback((name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleReset = useCallback(() => {
    setValues(buildInitialValues());
  }, [buildInitialValues]);

  const controlTableRows = useMemo<PropPlaygroundTableRow[]>(() => {
    return controllableProps.map(({ prop, control }) => {
      const controlProps: ControlProps = {
        prop,
        control,
        value: values[prop.name],
        onChange: handleChange,
      };

      let controlElement: React.ReactNode = null;
      switch (control.type) {
        case 'boolean':
          controlElement = <BooleanControl {...controlProps} />;
          break;
        case 'select':
          controlElement = <SelectControl {...controlProps} />;
          break;
        case 'number':
          controlElement = <NumberControl {...controlProps} />;
          break;
        case 'text':
          controlElement = <TextControl {...controlProps} />;
          break;
      }

      return {
        id: prop.name,
        propName: prop.name,
        propType: prop.type,
        propDescription: prop.description,
        propRequired: prop.required,
        controlElement,
      };
    });
  }, [controllableProps, values, handleChange]);

  const controlTableColumns = useMemo(
    () => [
      {
        key: 'propName',
        label: 'Prop',
        headerClassName:
          'w-1/2 max-w-[50%] px-4 py-2.5 text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider',
        className: 'w-1/2 max-w-[50%] px-4 py-3 align-middle',
        render: (_value: unknown, row: PropPlaygroundTableRow) => (
          <div className="flex min-w-0 max-w-full flex-col gap-0.5">
            <span className="text-xs font-mono font-medium text-gray-900 dark:text-gray-100">
              {row.propName}
              {row.propRequired && (
                <span className="text-red-500 ml-0.5">*</span>
              )}
            </span>
            <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">
              {row.propType}
            </span>
            {row.propDescription && (
              <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                {row.propDescription}
              </span>
            )}
          </div>
        ),
      },
      {
        key: 'controlElement',
        label: 'Control',
        headerClassName:
          'w-1/2 max-w-[50%] px-4 py-2.5 text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider',
        className: 'w-1/2 max-w-[50%] px-4 py-3 align-middle',
        render: (value: unknown) => (
          <div className="min-w-0 max-w-full w-full">
            {value as React.ReactNode}
          </div>
        ),
      },
    ],
    []
  );

  if (!meta) {
    return (
      <CardContainer className={className}>
        <CardTitle title="Playground">
          <div className="w-full p-4">
            <p className="text-sm text-yellow-600 dark:text-yellow-400 flex items-center gap-2">
              <LucideAlertTriangle className="w-4 h-4" />
              No metadata for &quot;{componentName}&quot;
            </p>
          </div>
        </CardTitle>
      </CardContainer>
    );
  }

  // Clean values: remove undefined/empty for rendering
  const renderProps = Object.fromEntries(
    Object.entries(values).filter(([, v]) => v !== undefined && v !== '')
  );

  return (
    <CardContainer className={className}>
      <CardTitle title={title || `${meta.displayName} Playground`}>
        <div className="w-full">
          {/* Preview Area */}
          <div className="p-6 sm:p-8 border-b border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/50 flex items-center justify-center min-h-[120px]">
            {children(renderProps)}
          </div>

          {/* Controls Table */}
          <div className="p-4 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Controls
                </span>
                <Badge color="info" size="small" className="text-[10px]">
                  {controllableProps.length} props
                </Badge>
              </div>
              <button
                onClick={handleReset}
                className="text-xs text-brand hover:underline cursor-pointer"
              >
                Reset defaults
              </button>
            </div>

            <BasicTable
              columns={controlTableColumns as any}
              data={controlTableRows}
              tableClassName="table-fixed"
              hoverable={false}
              striped={false}
              maxRows={Math.max(controlTableRows.length, 10)}
              rowClassName="hover:bg-gray-100 dark:hover:bg-gray-800/30"
            />

            {/* Current Values Display */}
            <div className="mt-4 p-3 bg-gray-900 dark:bg-gray-950 rounded-lg">
              <p className="text-[10px] text-gray-500 mb-1 uppercase tracking-wider">
                Current Props
              </p>
              <pre className="text-xs text-emerald-400 font-mono overflow-x-auto">
                {`<${meta.displayName}\n${Object.entries(renderProps)
                  .map(([k, v]) => {
                    if (typeof v === 'boolean')
                      return v ? `  ${k}` : `  ${k}={false}`;
                    if (typeof v === 'number') return `  ${k}={${v}}`;
                    return `  ${k}="${v}"`;
                  })
                  .join('\n')}\n/>`}
              </pre>
            </div>
          </div>
        </div>
      </CardTitle>
    </CardContainer>
  );
};
