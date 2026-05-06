/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo, useCallback } from 'react';
import {
  CardContainer,
  CardTitle,
  Input,
  Switch,
  Select,
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
}

// ─── Prop Type Analysis ────────────────────────────────────────

type ControlType = 'boolean' | 'select' | 'text' | 'number' | 'none';

interface ControlConfig {
  type: ControlType;
  options?: string[];
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
      variant="ghost"
      className="text-xs w-full"
    />
  );
};

const TextControl: React.FC<ControlProps> = ({ prop, value, onChange }) => (
  <Input
    label=""
    placeholder={prop.name}
    value={value ?? ''}
    onChange={(e) => onChange(prop.name, e.target.value)}
    variant="ghost"
    className="text-xs w-full"
  />
);

const NumberControl: React.FC<ControlProps> = ({ prop, value, onChange }) => (
  <Input
    label=""
    placeholder={prop.name}
    type="number"
    value={value ?? ''}
    onChange={(e) => onChange(prop.name, Number(e.target.value))}
    variant="ghost"
    className="text-xs w-full"
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
}) => {
  const meta = propsRegistry[componentName];

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

    return meta.props
      .filter((p) => {
        if (excluded.has(p.name)) return false;
        if (includeProps && !includeProps.includes(p.name)) return false;
        const control = analyzeControl(p);
        // Allow props with explicit defaultValues even if analyzeControl returns 'none'
        if (control.type === 'none' && p.name in defaultValues) {
          return true;
        }
        return control.type !== 'none';
      })
      .map((p) => {
        const control = analyzeControl(p);
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
  }, [meta, excludeProps, includeProps, defaultValues]);

  // State for prop values — initialize ALL controllable props to avoid
  // "uncontrolled to controlled" React warnings (value undefined → defined).
  const [values, setValues] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = { ...defaultValues };
    if (meta) {
      for (const p of meta.props) {
        if (p.name in initial) continue;
        const control = analyzeControl(p);
        if (control.type === 'none') continue;

        if (p.defaultValue !== null) {
          // Use metadata default
          initial[p.name] =
            control.type === 'boolean'
              ? p.defaultValue === 'true'
              : p.defaultValue;
        } else {
          // Assign a type-appropriate zero-value so the control is always "controlled"
          switch (control.type) {
            case 'boolean':
              initial[p.name] = false;
              break;
            case 'select':
              initial[p.name] = control.options?.[0] ?? '';
              break;
            case 'number':
              initial[p.name] = '';
              break;
            case 'text':
            default:
              initial[p.name] = '';
              break;
          }
        }
      }
    }
    return initial;
  });

  const handleChange = useCallback((name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleReset = useCallback(() => {
    const initial: Record<string, any> = { ...defaultValues };
    if (meta) {
      for (const p of meta.props) {
        if (p.name in initial) continue;
        const control = analyzeControl(p);
        if (control.type === 'none') continue;

        if (p.defaultValue !== null) {
          initial[p.name] =
            control.type === 'boolean'
              ? p.defaultValue === 'true'
              : p.defaultValue;
        } else {
          switch (control.type) {
            case 'boolean':
              initial[p.name] = false;
              break;
            case 'select':
              initial[p.name] = control.options?.[0] ?? '';
              break;
            case 'number':
              initial[p.name] = '';
              break;
            case 'text':
            default:
              initial[p.name] = '';
              break;
          }
        }
      }
    }
    setValues(initial);
  }, [defaultValues, meta]);

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

            {/* Storybook-style table */}
            <div className="border border-gray-15 dark:border-gray-700 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-10 dark:bg-gray-800/80 border-b border-gray-15 dark:border-gray-700">
                    <th className="px-4 py-2.5 text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/2">
                      Prop
                    </th>
                    <th className="px-4 py-2.5 text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider w-1/2">
                      Control
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-15 dark:divide-gray-700/50">
                  {controllableProps.map(({ prop, control }) => {
                    const controlProps: ControlProps = {
                      prop,
                      control,
                      value: values[prop.name],
                      onChange: handleChange,
                    };

                    let controlEl: React.ReactNode = null;
                    switch (control.type) {
                      case 'boolean':
                        controlEl = <BooleanControl {...controlProps} />;
                        break;
                      case 'select':
                        controlEl = <SelectControl {...controlProps} />;
                        break;
                      case 'number':
                        controlEl = <NumberControl {...controlProps} />;
                        break;
                      case 'text':
                        controlEl = <TextControl {...controlProps} />;
                        break;
                    }

                    return (
                      <tr
                        key={prop.name}
                        className="hover:bg-gray-100 dark:hover:bg-gray-800/30 transition-colors"
                      >
                        {/* Prop column */}
                        <td className="px-4 py-3 align-middle">
                          <div className="flex flex-col gap-0.5">
                            <span className="text-xs font-mono font-medium text-gray-900 dark:text-gray-100">
                              {prop.name}
                              {prop.required && (
                                <span className="text-red-500 ml-0.5">*</span>
                              )}
                            </span>
                            <span className="text-[10px] font-mono text-gray-400 dark:text-gray-500">
                              {prop.type}
                            </span>
                            {prop.description && (
                              <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-2">
                                {prop.description}
                              </span>
                            )}
                          </div>
                        </td>
                        {/* Control column */}
                        <td className="px-4 py-3 align-middle">{controlEl}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

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
