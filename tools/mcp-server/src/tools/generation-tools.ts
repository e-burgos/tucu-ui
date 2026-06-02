// ─── Generation Tools ───────────────────────────────────────────────────────
// 5 MCP tools for code generation: component, form, page, chart, icons.

import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {
  componentRegistry,
  getComponentByName,
} from '../data/component-registry.js';
import {
  themePresets,
  layoutVariants,
  getPresetByName,
  getLayoutByName,
} from '../data/theme-registry.js';
import {
  formPatterns,
  getFormPatternByName,
  getAvailableFormPatterns,
} from '../data/form-patterns.js';
import { searchIcons, getIconCategories } from '../data/icon-registry.js';
import {
  formatProps,
  generateImportStatement,
  toPascalCase,
} from '../utils/code-generator.js';

export function registerGenerationTools(server: McpServer): void {
  // ─── Tool 1: generate_component ──────────────────────────
  server.tool(
    'generate_component',
    'Generate ready-to-use JSX code for a tucu-ui component with correct variants and imports.',
    {
      component: z
        .string()
        .describe('Component name (e.g. Button, Card, Alert)'),
      props: z
        .record(z.string())
        .optional()
        .describe(
          'Custom props as key-value pairs (e.g. { variant: "solid", size: "medium" })'
        ),
      withWrapper: z
        .boolean()
        .optional()
        .describe('Wrap component in a container div. Default: false.'),
      theme: z
        .string()
        .optional()
        .describe(
          `Theme preset to apply. Available: ${themePresets
            .map((p) => p.name)
            .join(', ')}`
        ),
    },
    async ({ component, props, withWrapper, theme }) => {
      const entry = getComponentByName(component);

      if (!entry) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(
                {
                  error: `Component "${component}" not found in registry.`,
                  availableComponents: componentRegistry
                    .map((c) => c.name)
                    .slice(0, 20),
                },
                null,
                2
              ),
            },
          ],
        };
      }

      const warnings: string[] = [];
      const safeProps = { ...props };

      // Validate variants
      if (entry.variants) {
        for (const [key, allowed] of Object.entries(entry.variants)) {
          if (safeProps?.[key] && !allowed.includes(safeProps[key])) {
            warnings.push(
              `Invalid ${key}="${safeProps[key]}". Corrected to "${
                allowed[0]
              }". Allowed: ${allowed.join(', ')}`
            );
            safeProps[key] = allowed[0];
          }
        }
      }

      // Build JSX
      const propsStr =
        safeProps && Object.keys(safeProps).length > 0
          ? ' ' + formatProps(safeProps)
          : '';
      const hasChildren = ![
        'Input',
        'Select',
        'InputSearcher',
        'Switch',
        'Checkbox',
        'Spinner',
        'Skeleton',
        'DatePicker',
        'RangeSlider',
        'ColorPicker',
        'FileInput',
        'IconButton',
      ].includes(entry.name);

      let jsx: string;
      if (hasChildren) {
        jsx = `<${entry.name}${propsStr}>\n  {/* Content */}\n</${entry.name}>`;
      } else {
        jsx = `<${entry.name}${propsStr} />`;
      }

      if (withWrapper) {
        jsx = `<div className="p-4">\n  ${jsx}\n</div>`;
      }

      const imports = [
        generateImportStatement([entry.name], '@e-burgos/tucu-ui'),
      ];

      // Add theme wrapper if requested
      if (theme) {
        const preset = getPresetByName(theme);
        if (preset) {
          jsx = `<ThemeProvider colorPreset="${theme}">\n  ${jsx}\n</ThemeProvider>`;
          imports[0] = generateImportStatement(
            [entry.name, 'ThemeProvider'],
            '@e-burgos/tucu-ui'
          );
        } else {
          warnings.push(
            `Theme "${theme}" not found. Available: ${themePresets
              .map((p) => p.name)
              .join(', ')}`
          );
        }
      }

      // Add entry-level warnings
      if (entry.warnings) {
        warnings.push(...entry.warnings);
      }

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify({ code: jsx, imports, warnings }, null, 2),
          },
        ],
      };
    }
  );

  // ─── Tool 2: generate_form ────────────────────────────────
  server.tool(
    'generate_form',
    'Generate a complete form component with validation (Zod), react-hook-form integration, and correct tucu-ui inputs.',
    {
      pattern: z
        .string()
        .optional()
        .describe(
          `Predefined pattern name. Available: ${getAvailableFormPatterns().join(
            ', '
          )}`
        ),
      fields: z
        .array(
          z.object({
            name: z.string(),
            type: z.enum([
              'text',
              'email',
              'password',
              'number',
              'select',
              'textarea',
              'checkbox',
              'date',
            ]),
            label: z.string(),
            required: z.boolean().optional(),
            options: z.array(z.string()).optional(),
          })
        )
        .optional()
        .describe('Custom field definitions. Ignored if pattern is provided.'),
      withValidation: z
        .boolean()
        .optional()
        .describe('Include Zod validation schema. Default: true.'),
      variant: z
        .string()
        .optional()
        .describe(
          'Input variant for all fields. Default: ghost. Allowed: solid, ghost, transparent.'
        ),
    },
    async ({ pattern, fields, withValidation = true, variant = 'ghost' }) => {
      // Validate variant
      const allowedVariants = ['solid', 'ghost', 'transparent'];
      const safeVariant = allowedVariants.includes(variant) ? variant : 'ghost';

      // Use pattern if provided
      if (pattern) {
        const formPattern = getFormPatternByName(pattern);
        if (!formPattern) {
          return {
            content: [
              {
                type: 'text' as const,
                text: JSON.stringify(
                  {
                    error: `Form pattern "${pattern}" not found.`,
                    availablePatterns: getAvailableFormPatterns(),
                  },
                  null,
                  2
                ),
              },
            ],
          };
        }

        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(
                {
                  componentCode: formPattern.fullExample,
                  validationCode: formPattern.validationSchema,
                  imports: [
                    "import { Form, Input, Textarea, Select, Switch, Button } from '@e-burgos/tucu-ui';",
                    "import { z } from 'zod';",
                  ],
                  types: formPattern.validationSchema,
                  pattern: formPattern.name,
                  description: formPattern.description,
                },
                null,
                2
              ),
            },
          ],
        };
      }

      // Custom form generation from fields
      if (!fields || fields.length === 0) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(
                {
                  error: 'Either "pattern" or "fields" must be provided.',
                  availablePatterns: getAvailableFormPatterns(),
                },
                null,
                2
              ),
            },
          ],
        };
      }

      // Determine which tucu-ui components are needed
      const componentSet = new Set<string>(['Form', 'Button']);
      const fieldLines: string[] = [];
      const schemaFields: string[] = [];
      const defaultValues: string[] = [];
      const typeFields: string[] = [];

      for (const field of fields) {
        let comp: string;
        let fieldJsx: string;

        switch (field.type) {
          case 'textarea':
            comp = 'Textarea';
            fieldJsx = `          <Textarea\n            label="${
              field.label
            }"\n            variant="${safeVariant}"\n            placeholder="Enter ${field.label.toLowerCase()}"\n            rows={3}\n            {...register('${
              field.name
            }')}\n            error={errors.${
              field.name
            }?.message}\n          />`;
            break;
          case 'select':
            comp = 'Select';
            {
              const opts = (field.options || ['Option 1', 'Option 2'])
                .map(
                  (o) =>
                    `{ name: '${o}', value: '${o
                      .toLowerCase()
                      .replace(/\s+/g, '-')}' }`
                )
                .join(', ');
              fieldJsx = `          <Select\n            label="${field.label}"\n            variant="${safeVariant}"\n            options={[${opts}]}\n            value={watch('${field.name}')}\n            onSelect={(val) => setValue('${field.name}', val)}\n          />`;
            }
            break;
          case 'checkbox':
            comp = 'Checkbox';
            fieldJsx = `          <Checkbox\n            label="${field.label}"\n            checked={watch('${field.name}')}\n            onChange={(val) => setValue('${field.name}', val)}\n          />`;
            break;
          case 'date':
            comp = 'DatePicker';
            fieldJsx = `          <DatePicker\n            label="${field.label}"\n            value={watch('${field.name}')}\n            onChange={(date) => setValue('${field.name}', date)}\n          />`;
            break;
          default:
            comp = 'Input';
            fieldJsx = `          <Input\n            label="${
              field.label
            }"\n            type="${
              field.type
            }"\n            variant="${safeVariant}"\n            placeholder="Enter ${field.label.toLowerCase()}"\n            {...register('${
              field.name
            }')}\n            error={errors.${
              field.name
            }?.message}\n          />`;
            break;
        }

        componentSet.add(comp);
        fieldLines.push(fieldJsx);

        // Schema generation
        if (field.type === 'checkbox') {
          schemaFields.push(
            `  ${field.name}: z.boolean()${
              field.required ? '' : '.optional()'
            },`
          );
          defaultValues.push(`${field.name}: false`);
          typeFields.push(`  ${field.name}: boolean;`);
        } else if (field.type === 'date') {
          schemaFields.push(
            `  ${field.name}: z.date()${field.required ? '' : '.optional()'},`
          );
          defaultValues.push(`${field.name}: undefined`);
          typeFields.push(`  ${field.name}?: Date;`);
        } else if (field.type === 'number') {
          schemaFields.push(
            `  ${field.name}: z.number()${
              field.required ? '.min(0)' : '.optional()'
            },`
          );
          defaultValues.push(`${field.name}: 0`);
          typeFields.push(`  ${field.name}: number;`);
        } else {
          const minRule = field.required
            ? '.min(1, "Required")'
            : '.optional()';
          const emailRule =
            field.type === 'email' ? '.email("Invalid email")' : minRule;
          schemaFields.push(`  ${field.name}: z.string()${emailRule},`);
          defaultValues.push(`${field.name}: ''`);
          typeFields.push(`  ${field.name}: string;`);
        }
      }

      const formName = 'CustomForm';
      const schemaName = 'customFormSchema';
      const typeName = 'CustomFormData';

      const validationCode = withValidation
        ? `import { z } from 'zod';\n\nconst ${schemaName} = z.object({\n${schemaFields.join(
            '\n'
          )}\n});\n\ntype ${typeName} = z.infer<typeof ${schemaName}>;`
        : '';

      const componentCode = `${generateImportStatement(
        [...componentSet],
        '@e-burgos/tucu-ui'
      )}${
        withValidation
          ? `\nimport { z } from 'zod';\n\nconst ${schemaName} = z.object({\n${schemaFields.join(
              '\n'
            )}\n});\n\ntype ${typeName} = z.infer<typeof ${schemaName}>;`
          : ''
      }

export function ${formName}() {
  const handleSubmit = (data: ${
    withValidation ? typeName : 'Record<string, unknown>'
  }) => {
    console.log(data);
  };

  return (
    <Form onSubmit={handleSubmit} defaultValues={{ ${defaultValues.join(
      ', '
    )} }}>
      {({ register, setValue, watch, formState: { errors } }) => (
        <>
${fieldLines.join('\n')}
          <Button variant="solid" size="medium" type="submit">
            Submit
          </Button>
        </>
      )}
    </Form>
  );
}`;

      const imports = [
        generateImportStatement([...componentSet], '@e-burgos/tucu-ui'),
      ];
      if (withValidation) {
        imports.push("import { z } from 'zod';");
      }

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(
              {
                componentCode,
                validationCode,
                imports,
                types: `interface ${typeName} {\n${typeFields.join('\n')}\n}`,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Tool 3: generate_page ────────────────────────────────
  server.tool(
    'generate_page',
    'Generate a full page component with layout, sections, and optional routing configuration.',
    {
      name: z.string().describe('Page name (e.g. Dashboard, Settings, Users)'),
      layout: z
        .enum(['dashboard', 'sidebar', 'fullpage', 'stacked'])
        .describe(
          'Layout type. dashboard=AdminLayout, fullpage=MacOSLayout, stacked=ThemeProvider.'
        ),
      sections: z
        .array(
          z.object({
            type: z.enum(['hero', 'cards', 'table', 'form', 'chart', 'list']),
            title: z.string().optional(),
          })
        )
        .describe('Page sections to include.'),
      withRouting: z
        .boolean()
        .optional()
        .describe('Include route configuration. Default: false.'),
      architecture: z
        .enum(['standalone', 'mfe'])
        .optional()
        .describe('Architecture mode. Default: standalone.'),
    },
    async ({
      name,
      layout,
      sections,
      withRouting,
      architecture = 'standalone',
    }) => {
      const pageName = toPascalCase(name) + 'Page';
      const layoutDef = getLayoutByName(layout);
      const imports = new Set<string>();
      const sectionCode: string[] = [];

      // Determine imports based on sections
      imports.add('Title');

      for (const section of sections) {
        switch (section.type) {
          case 'hero':
            imports.add('Card');
            imports.add('Title');
            imports.add('Subtitle');
            sectionCode.push(`      {/* Hero Section */}
      <Card>
        <Title>${section.title || pageName}</Title>
        <Subtitle>Welcome to the ${name} page</Subtitle>
      </Card>`);
            break;
          case 'cards':
            imports.add('Card');
            imports.add('StatsCard');
            sectionCode.push(`      {/* Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatsCard title="Total" value="1,234" trend="+12%" />
        <StatsCard title="Active" value="567" trend="+5%" />
        <StatsCard title="Pending" value="89" trend="-2%" />
      </div>`);
            break;
          case 'table':
            imports.add('BasicTable');
            imports.add('Card');
            sectionCode.push(`      {/* Table Section */}
      <Card title="${section.title || 'Data Table'}">
        <BasicTable
          columns={[
            { header: 'Name', accessorKey: 'name' },
            { header: 'Status', accessorKey: 'status' },
            { header: 'Date', accessorKey: 'date' },
          ]}
          data={[]}
        />
      </Card>`);
            break;
          case 'form':
            imports.add('Card');
            imports.add('Form');
            imports.add('Input');
            imports.add('Button');
            sectionCode.push(`      {/* Form Section */}
      <Card title="${section.title || 'Form'}">
        <Form onSubmit={(data) => console.log(data)} defaultValues={{}}>
          {({ register }) => (
            <>
              <Input label="Field" variant="ghost" {...register('field')} />
              <Button variant="solid" size="medium" type="submit">Submit</Button>
            </>
          )}
        </Form>
      </Card>`);
            break;
          case 'chart':
            sectionCode.push(`      {/* Chart Section */}
      <Card title="${section.title || 'Chart'}">
        {/* Add Recharts component here */}
        <div className="h-64">
          {/* <ResponsiveContainer><LineChart data={data}>...</LineChart></ResponsiveContainer> */}
        </div>
      </Card>`);
            imports.add('Card');
            break;
          case 'list':
            imports.add('List');
            imports.add('ListItem');
            imports.add('Card');
            sectionCode.push(`      {/* List Section */}
      <Card title="${section.title || 'Items'}">
        <List>
          <ListItem>Item 1</ListItem>
          <ListItem>Item 2</ListItem>
          <ListItem>Item 3</ListItem>
        </List>
      </Card>`);
            break;
        }
      }

      const importLine = generateImportStatement(
        [...imports],
        '@e-burgos/tucu-ui'
      );

      const pageCode = `${importLine}

export function ${pageName}() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <Title>${
        sections.length > 0 && sections[0].type !== 'hero' ? name : ''
      }</Title>
${sectionCode.join('\n\n')}
    </div>
  );
}`;

      // Fix: remove redundant Title if hero exists
      const finalPageCode =
        sections[0]?.type === 'hero'
          ? pageCode.replace(`      <Title></Title>\n`, '')
          : pageCode.replace(`<Title></Title>`, `<Title>${name}</Title>`);

      let routeConfig = '';
      if (withRouting) {
        const path = `/${name.toLowerCase().replace(/\s+/g, '-')}`;
        if (architecture === 'standalone') {
          routeConfig = `// Add to your route configuration:
{
  path: '${path}',
  element: <${pageName} />,
}`;
        } else {
          routeConfig = `// MFE route configuration:
{
  path: '${path}',
  element: <${pageName} />,
  // Expose via Module Federation
}`;
        }
      }

      const allImports = [importLine];
      if (layoutDef) {
        allImports.push(
          `// Layout: Use ${layoutDef.component} as the parent layout`
        );
      }

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(
              {
                pageCode: finalPageCode,
                routeConfig,
                imports: allImports,
                layout: layoutDef
                  ? {
                      component: layoutDef.component,
                      example: layoutDef.example,
                    }
                  : null,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Tool 4: generate_chart ───────────────────────────────
  server.tool(
    'generate_chart',
    'Generate a Recharts chart component with tucu-ui theme integration and responsive container.',
    {
      type: z
        .enum([
          'line',
          'bar',
          'area',
          'pie',
          'donut',
          'composed',
          'radar',
          'scatter',
        ])
        .describe('Chart type.'),
      dataShape: z
        .object({
          xKey: z.string().describe('X-axis data key.'),
          yKeys: z.array(z.string()).describe('Y-axis data keys (series).'),
          sampleData: z
            .array(z.record(z.unknown()))
            .optional()
            .describe('Sample data array. Auto-generated if not provided.'),
        })
        .describe('Data shape configuration.'),
      responsive: z
        .boolean()
        .optional()
        .describe('Wrap in ResponsiveContainer. Default: true.'),
      withTheme: z
        .boolean()
        .optional()
        .describe('Use tucu-ui theme CSS variables for colors. Default: true.'),
      withTooltip: z
        .boolean()
        .optional()
        .describe('Include Tooltip component. Default: true.'),
      withLegend: z
        .boolean()
        .optional()
        .describe('Include Legend component. Default: true.'),
    },
    async ({
      type,
      dataShape,
      responsive = true,
      withTheme = true,
      withTooltip = true,
      withLegend = true,
    }) => {
      const { xKey, yKeys, sampleData } = dataShape;

      // Generate sample data if not provided
      const data = sampleData || generateSampleData(xKey, yKeys);
      const dataStr = JSON.stringify(data, null, 2);

      // Theme colors using CSS variables
      const themeColors = withTheme
        ? yKeys.map(
            (_, i) =>
              `hsl(var(--${
                i === 0 ? 'primary' : i === 1 ? 'secondary' : 'accent'
              }))`
          )
        : yKeys.map(
            (_, i) =>
              ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'][i % 5]
          );

      const rechartsImports = new Set<string>(['ResponsiveContainer']);
      let chartJsx = '';

      switch (type) {
        case 'line':
          rechartsImports
            .add('LineChart')
            .add('Line')
            .add('XAxis')
            .add('YAxis')
            .add('CartesianGrid');
          if (withTooltip) rechartsImports.add('Tooltip');
          if (withLegend) rechartsImports.add('Legend');
          chartJsx = buildLineChart(
            xKey,
            yKeys,
            themeColors,
            withTooltip,
            withLegend
          );
          break;
        case 'bar':
          rechartsImports
            .add('BarChart')
            .add('Bar')
            .add('XAxis')
            .add('YAxis')
            .add('CartesianGrid');
          if (withTooltip) rechartsImports.add('Tooltip');
          if (withLegend) rechartsImports.add('Legend');
          chartJsx = buildBarChart(
            xKey,
            yKeys,
            themeColors,
            withTooltip,
            withLegend
          );
          break;
        case 'area':
          rechartsImports
            .add('AreaChart')
            .add('Area')
            .add('XAxis')
            .add('YAxis')
            .add('CartesianGrid');
          if (withTooltip) rechartsImports.add('Tooltip');
          if (withLegend) rechartsImports.add('Legend');
          chartJsx = buildAreaChart(
            xKey,
            yKeys,
            themeColors,
            withTooltip,
            withLegend
          );
          break;
        case 'pie':
        case 'donut':
          rechartsImports.add('PieChart').add('Pie').add('Cell');
          if (withTooltip) rechartsImports.add('Tooltip');
          if (withLegend) rechartsImports.add('Legend');
          chartJsx = buildPieChart(
            yKeys[0],
            themeColors,
            type === 'donut',
            withTooltip,
            withLegend
          );
          break;
        case 'composed':
          rechartsImports
            .add('ComposedChart')
            .add('Line')
            .add('Bar')
            .add('Area')
            .add('XAxis')
            .add('YAxis')
            .add('CartesianGrid');
          if (withTooltip) rechartsImports.add('Tooltip');
          if (withLegend) rechartsImports.add('Legend');
          chartJsx = buildComposedChart(
            xKey,
            yKeys,
            themeColors,
            withTooltip,
            withLegend
          );
          break;
        case 'radar':
          rechartsImports
            .add('RadarChart')
            .add('Radar')
            .add('PolarGrid')
            .add('PolarAngleAxis')
            .add('PolarRadiusAxis');
          if (withTooltip) rechartsImports.add('Tooltip');
          if (withLegend) rechartsImports.add('Legend');
          chartJsx = buildRadarChart(
            xKey,
            yKeys,
            themeColors,
            withTooltip,
            withLegend
          );
          break;
        case 'scatter':
          rechartsImports
            .add('ScatterChart')
            .add('Scatter')
            .add('XAxis')
            .add('YAxis')
            .add('CartesianGrid');
          if (withTooltip) rechartsImports.add('Tooltip');
          if (withLegend) rechartsImports.add('Legend');
          chartJsx = buildScatterChart(
            xKey,
            yKeys,
            themeColors,
            withTooltip,
            withLegend
          );
          break;
      }

      const wrapperStart = responsive
        ? '<ResponsiveContainer width="100%" height={300}>\n  '
        : '';
      const wrapperEnd = responsive ? '\n</ResponsiveContainer>' : '';

      const componentCode = `import { ${[...rechartsImports]
        .sort()
        .join(', ')} } from 'recharts';

const data = ${dataStr};
${
  withTheme
    ? `\nconst COLORS = [${themeColors.map((c) => `'${c}'`).join(', ')}];`
    : ''
}

export function Chart() {
  return (
    ${wrapperStart}${chartJsx}${wrapperEnd}
  );
}`;

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(
              {
                componentCode,
                imports: [
                  `import { ${[...rechartsImports]
                    .sort()
                    .join(', ')} } from 'recharts';`,
                ],
                sampleData: dataStr,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Tool 5: search_icons ────────────────────────────────
  server.tool(
    'search_icons',
    'Search for Lucide React icons by keyword, name, or category. Returns import statements and usage examples.',
    {
      query: z
        .string()
        .describe('Search query (e.g. "arrow", "delete", "notification")'),
      category: z
        .string()
        .optional()
        .describe(
          `Filter by category. Available: ${getIconCategories().join(', ')}`
        ),
      limit: z.number().optional().describe('Max results. Default: 10.'),
    },
    async ({ query, category, limit }) => {
      const results = searchIcons(query, category, limit);

      if (results.length === 0) {
        return {
          content: [
            {
              type: 'text' as const,
              text: JSON.stringify(
                {
                  query,
                  resultsCount: 0,
                  results: [],
                  suggestion:
                    'Try a more general keyword or browse by category.',
                  availableCategories: getIconCategories(),
                },
                null,
                2
              ),
            },
          ],
        };
      }

      const mapped = results.map((icon) => ({
        name: icon.name,
        category: icon.category,
        importStatement: `import { ${icon.name} } from 'lucide-react';`,
        usage: `<${icon.name} size={20} />`,
      }));

      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(
              { query, resultsCount: mapped.length, results: mapped },
              null,
              2
            ),
          },
        ],
      };
    }
  );

  // ─── Tool 6: generate_documentation ──────────────────────────
  server.tool(
    'generate_documentation',
    'Generate a complete documentation hub page and sections (General, Examples, Playground) for a tucu-ui component, matching the style of the src/demo pages.',
    {
      component: z
        .string()
        .describe('Component name (e.g. Button, Card, Alert, DataTable)'),
      description: z
        .string()
        .optional()
        .describe('Brief description of the component to display in the hub page header.'),
      features: z
        .array(z.string())
        .optional()
        .describe('List of key features to highlight in the documentation section.'),
    },
    async ({ component, description, features }) => {
      const result = generateDocumentation(component, description, features);
      return {
        content: [
          {
            type: 'text' as const,
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }
  );
}

// ─── Chart Builder Helpers ──────────────────────────────────────────────────

function generateSampleData(
  xKey: string,
  yKeys: string[]
): Record<string, unknown>[] {
  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return labels.map((label, i) => {
    const row: Record<string, unknown> = { [xKey]: label };
    for (const key of yKeys) {
      row[key] = (i + 1) * 100 + i * 50;
    }
    return row;
  });
}

function buildLineChart(
  xKey: string,
  yKeys: string[],
  colors: string[],
  tooltip: boolean,
  legend: boolean
): string {
  const lines = yKeys
    .map(
      (key, i) =>
        `    <Line type="monotone" dataKey="${key}" stroke="${colors[i]}" strokeWidth={2} />`
    )
    .join('\n');
  return `<LineChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="${xKey}" />
    <YAxis />
${tooltip ? '    <Tooltip />\n' : ''}${legend ? '    <Legend />\n' : ''}${lines}
  </LineChart>`;
}

function buildBarChart(
  xKey: string,
  yKeys: string[],
  colors: string[],
  tooltip: boolean,
  legend: boolean
): string {
  const bars = yKeys
    .map((key, i) => `    <Bar dataKey="${key}" fill="${colors[i]}" />`)
    .join('\n');
  return `<BarChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="${xKey}" />
    <YAxis />
${tooltip ? '    <Tooltip />\n' : ''}${legend ? '    <Legend />\n' : ''}${bars}
  </BarChart>`;
}

function buildAreaChart(
  xKey: string,
  yKeys: string[],
  colors: string[],
  tooltip: boolean,
  legend: boolean
): string {
  const areas = yKeys
    .map(
      (key, i) =>
        `    <Area type="monotone" dataKey="${key}" stroke="${colors[i]}" fill="${colors[i]}" fillOpacity={0.3} />`
    )
    .join('\n');
  return `<AreaChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="${xKey}" />
    <YAxis />
${tooltip ? '    <Tooltip />\n' : ''}${legend ? '    <Legend />\n' : ''}${areas}
  </AreaChart>`;
}

function buildPieChart(
  dataKey: string,
  colors: string[],
  isDonut: boolean,
  tooltip: boolean,
  legend: boolean
): string {
  const innerRadius = isDonut ? ' innerRadius={60}' : '';
  return `<PieChart>
    <Pie data={data} dataKey="${dataKey}" nameKey="name" cx="50%" cy="50%" outerRadius={100}${innerRadius}>
      {data.map((_, index) => (
        <Cell key={index} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
${tooltip ? '    <Tooltip />\n' : ''}${
    legend ? '    <Legend />\n' : ''
  }  </PieChart>`;
}

function buildComposedChart(
  xKey: string,
  yKeys: string[],
  colors: string[],
  tooltip: boolean,
  legend: boolean
): string {
  const elements = yKeys
    .map((key, i) => {
      if (i === 0) return `    <Bar dataKey="${key}" fill="${colors[i]}" />`;
      if (i === 1)
        return `    <Line type="monotone" dataKey="${key}" stroke="${colors[i]}" />`;
      return `    <Area type="monotone" dataKey="${key}" stroke="${colors[i]}" fill="${colors[i]}" fillOpacity={0.3} />`;
    })
    .join('\n');
  return `<ComposedChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="${xKey}" />
    <YAxis />
${tooltip ? '    <Tooltip />\n' : ''}${
    legend ? '    <Legend />\n' : ''
  }${elements}
  </ComposedChart>`;
}

function buildRadarChart(
  xKey: string,
  yKeys: string[],
  colors: string[],
  tooltip: boolean,
  legend: boolean
): string {
  const radars = yKeys
    .map(
      (key, i) =>
        `    <Radar name="${key}" dataKey="${key}" stroke="${colors[i]}" fill="${colors[i]}" fillOpacity={0.3} />`
    )
    .join('\n');
  return `<RadarChart data={data} cx="50%" cy="50%" outerRadius={100}>
    <PolarGrid />
    <PolarAngleAxis dataKey="${xKey}" />
    <PolarRadiusAxis />
${tooltip ? '    <Tooltip />\n' : ''}${
    legend ? '    <Legend />\n' : ''
  }${radars}
  </RadarChart>`;
}

function buildScatterChart(
  xKey: string,
  yKeys: string[],
  colors: string[],
  tooltip: boolean,
  legend: boolean
): string {
  const scatters = yKeys
    .map(
      (key, i) =>
        `    <Scatter name="${key}" data={data} fill="${colors[i]}" />`
    )
    .join('\n');
  return `<ScatterChart>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="${xKey}" name="${xKey}" />
    <YAxis dataKey="${yKeys[0]}" name="${yKeys[0]}" />
${tooltip ? '    <Tooltip cursor={{ strokeDasharray: "3 3" }} />\n' : ''}${
    legend ? '    <Legend />\n' : ''
  }${scatters}
  </ScatterChart>`;
}

export interface DocumentationOutput {
  component: string;
  hubPageCode: string;
  docsSectionCode: string;
  examplesSectionCode: string;
  playgroundSectionCode: string;
  suggestedPaths: {
    hubPage: string;
    docsSection: string;
    examplesSection: string;
    playgroundSection: string;
  };
}

export function generateDocumentation(
  component: string,
  description?: string,
  features?: string[]
): DocumentationOutput {
  const compPascal = toPascalCase(component);
  const compLower = compPascal.toLowerCase();
  const entry = getComponentByName(compPascal);

  const compDesc = description || entry?.description || `${compPascal} component description.`;
  const compFeatures = features || [
    'Highly customizable styling and theme-aware presets.',
    'Accessible layout structure complying with WCAG guidelines.',
    'Micro-animations for fluid state transitions.'
  ];

  // 1. Generate Hub Page Code
  const hubPageCode = `import { lazy } from 'react';
import { LucideIcons, HeroCard } from '../../../index';
import { DynamicSectionsPage, type SectionConfig } from '../../components';

const sections: SectionConfig[] = [
  { id: 'documentation', label: 'General Documentation', component: lazy(() => import('./${compLower}-sections/DocumentationSection')) },
  { id: 'examples', label: 'Usage Examples', component: lazy(() => import('./${compLower}-sections/ExamplesSection')) },
  { id: 'playground', label: 'Playground', component: lazy(() => import('./${compLower}-sections/PlaygroundSection')) },
];

export function ${compPascal}Page() {
  return (
    <DynamicSectionsPage
      hideHeroInSubSections
      sections={sections}
      hero={
        <HeroCard
          title="${compPascal} Hub"
          description="${compDesc}"
          githubButton
          getStartedButton
          docsButton="introduction"
          icon={
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border border-indigo-500/50">
              <LucideIcons.BookOpen className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white filter drop-shadow-lg" />
            </div>
          }
        />
      }
    />
  );
}

export default ${compPascal}Page;`;

  // 2. Generate Docs Section Code
  const featureCards = compFeatures.map((feat, index) => {
    const icons = ['FolderHeart', 'MoveHorizontal', 'Pin', 'FileSpreadsheet', 'Settings', 'Layers'];
    const icon = icons[index % icons.length];
    const colors = ['indigo', 'purple', 'pink', 'blue', 'emerald', 'orange'];
    const color = colors[index % colors.length];
    return `          <CardContainer className="p-5" key={${index}}>
            <div className="flex gap-4 items-start">
              <div className="p-2.5 bg-${color}-500/10 rounded-lg text-${color}-500">
                <LucideIcons.${icon} className="w-6 h-6" />
              </div>
              <div>
                <Typography tag="h5" className="font-semibold mb-1">Feature ${index + 1}</Typography>
                <Typography className="text-xs text-foreground/60">
                  ${feat}
                </Typography>
              </div>
            </div>
          </CardContainer>`;
  }).join('\n\n');

  const docsSectionCode = `import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  HeroCard,
  LucideIcons,
} from '../../../../index';
import { AutoPropsTable } from '../../../components/auto-props-table';

const DocumentationSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <HeroCard
        title="${compPascal} Documentation"
        description="A comprehensive reference guide for the ${compPascal} component. Learn how to configure variants and customize properties."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        }
      />

      <CardContainer>
        <CardTitle title="Introduction">
          <Typography className="text-sm text-foreground/70 mb-4">
            The <code>${compPascal}</code> component is a premium, flexible element designed for modern UI layouts in the tucu-ui ecosystem.
          </Typography>
          <Typography className="text-sm text-foreground/70">
            It supports fluid responsiveness, accessibility standards, and semantic color presets that align with dark and light theme context providers automatically.
          </Typography>
        </CardTitle>
      </CardContainer>

      <section className="space-y-6">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Key Features
          </Typography>
          <Typography tag="p" className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Explore the main capabilities of the ${compPascal} component.
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
${featureCards}
        </div>
      </section>

      {/* ─── Auto Generated Props ─────────────────────────────────── */}
      <AutoPropsTable componentName="${compPascal}" showFilePath={true} />
    </div>
  );
};

export default DocumentationSection;`;

  // 3. Generate Examples Section Code
  const exampleCodeSnippet = entry?.example || `import { ${compPascal} } from '@e-burgos/tucu-ui';\\n\\n<${compPascal} />`;

  const examplesSectionCode = `import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  HeroCard,
  LucideIcons,
  ${compPascal}
} from '../../../../index';

const ExamplesSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <HeroCard
        title="${compPascal} Examples"
        description="Explore basic and advanced examples to integrate the ${compPascal} component into your application."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.TableProperties className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        }
      />

      <CardContainer className="p-6">
        <CardTitle title="Standard Example" className="mb-4">
          <Typography tag="p" className="text-sm text-gray-500 dark:text-gray-400 mb-6">
            A standard showcase showing the default state and options of the ${compPascal} component.
          </Typography>

          <div className="p-4 bg-gray-50 dark:bg-gray-800/40 rounded-lg flex justify-center">
            {/* Component preview */}
            <${compPascal} />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer className="p-6">
        <CardTitle title="Implementation Code" className="mb-4">
          <CodeBlock
            language="tsx"
            code={\`${exampleCodeSnippet.replace(/`/g, '\\`').replace(/\${/g, '\\${')}\`}
          />
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default ExamplesSection;`;

  // 4. Generate Playground Section Code
  const playgroundProps = entry?.variants ? Object.keys(entry.variants) : [];
  const playgroundPropsObj = entry?.variants
    ? Object.entries(entry.variants).map(([k, v]) => `          ${k}: '${v[0]}',`).join('\n')
    : '';

  const playgroundControls = entry?.variants
    ? Object.entries(entry.variants).map(([k, v]) => `          {
        name: '${k}',
        type: 'select',
        options: [${v.map(val => `'${val}'`).join(', ')}],
        description: '${k} variant option',
      },`).join('\n')
    : '';

  const playgroundPropsBinding = entry?.variants
    ? Object.keys(entry.variants).map(k => `                ${k}={props.${k}}`).join('\n')
    : '';

  const playgroundSectionCode = `/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
  HeroCard,
  LucideIcons,
  ${compPascal}
} from '../../../../index';
import { PropPlayground } from '../../../components/prop-playground';

const PlaygroundSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <HeroCard
        title="${compPascal} Playground"
        description="Interact with the props controls below to modify the ${compPascal} component in real-time."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Wand2 className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        }
      />

      <PropPlayground
        componentName="${compPascal}"
        defaultValues={{
${playgroundPropsObj}
        }}
        controlOverrides={[
${playgroundControls}
        ]}
        includeProps={[
          ${playgroundProps.map(p => `'${p}'`).join(', ')}
        ]}
      >
        {(props: any) => {
          return (
            <div className="w-full flex justify-center p-6 bg-gray-50 dark:bg-gray-800/40 rounded-lg">
              <${compPascal}
${playgroundPropsBinding}
              />
            </div>
          );
        }}
      </PropPlayground>
    </div>
  );
};

export default PlaygroundSection;`;

  return {
    component: compPascal,
    hubPageCode,
    docsSectionCode,
    examplesSectionCode,
    playgroundSectionCode,
    suggestedPaths: {
      hubPage: `ui/tucu-ui/src/demo/pages/${compLower}/${compPascal}Page.tsx`,
      docsSection: `ui/tucu-ui/src/demo/pages/${compLower}/${compLower}-sections/DocumentationSection.tsx`,
      examplesSection: `ui/tucu-ui/src/demo/pages/${compLower}/${compLower}-sections/ExamplesSection.tsx`,
      playgroundSection: `ui/tucu-ui/src/demo/pages/${compLower}/${compLower}-sections/PlaygroundSection.tsx`
    }
  };
}
