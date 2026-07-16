import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  HeroCard,
  LucideIcons,
  Badge,
  ColorCard,
} from '@e-burgos/tucu-ui';

const tools = [
  {
    name: 'list_components',
    description:
      'List available components, optionally filtered by category. Returns name, category, and short description for each.',
    icon: <LucideIcons.List className="w-5 h-5 text-blue-500" />,
    input: `{
  "category?": "string",  // e.g. "form", "layout", "feedback"
  "limit?": "number"      // max results (default: all)
}`,
    example: `// Agent request
{ "category": "form", "limit": 5 }

// Response includes:
// InputText, InputNumber, Select, Checkbox, RadioGroup`,
  },
  {
    name: 'get_component',
    description:
      'Get full details for a specific component: all props with types, valid variants, default values, and a complete usage example.',
    icon: <LucideIcons.Search className="w-5 h-5 text-emerald-500" />,
    input: `{
  "name": "string"  // Component name, e.g. "Button" (fuzzy matched)
}`,
    example: `// Agent request
{ "name": "Button" }

// Response includes:
// - variant: "solid" | "ghost" | "transparent"
// - size: "large" | "medium" | "small" | "mini" | "tiny"
// - Full TypeScript interface
// - Ready-to-use example code`,
  },
  {
    name: 'search_components',
    description:
      'Fuzzy-search components by keyword across names, descriptions, and categories. Use when the exact component name is unknown.',
    icon: <LucideIcons.ListFilter className="w-5 h-5 text-teal-500" />,
    input: `{
  "query": "string",      // name, keyword, or description fragment
  "category?": "string",  // narrow to one category
  "limit?": "number"      // max results (default: 10)
}`,
    example: `// Agent request
{ "query": "table" }

// Response includes:
// DataTable, BasicTable — each with score and matchType`,
  },
  {
    name: 'get_props',
    description:
      'Get just the variants, warnings, and a usage snippet for a component (fuzzy matched) — a lighter-weight alternative to get_component.',
    icon: <LucideIcons.Settings2 className="w-5 h-5 text-sky-500" />,
    input: `{
  "component": "string"  // Component name to get props for (fuzzy matched)
}`,
    example: `// Agent request
{ "component": "Badge" }

// Response includes:
// importPath, variants, themeAware, warnings, example, relatedComponents`,
  },
  {
    name: 'generate_component',
    description:
      'Generate ready-to-use JSX code for a component with specified props, optional wrapper, and theme integration.',
    icon: <LucideIcons.Code className="w-5 h-5 text-violet-500" />,
    input: `{
  "component": "string",           // e.g. "Button"
  "props?": "Record<string,string>", // e.g. { variant: "solid", size: "large" }
  "withWrapper?": "boolean",       // wrap in layout container
  "theme?": "string"               // color preset name
}`,
    example: `// Agent request
{ "component": "Alert", "props": { "variant": "success", "title": "Done!" } }

// Generated output:
<Alert variant="success" title="Done!">
  Operation completed successfully.
</Alert>`,
  },
  {
    name: 'generate_form',
    description:
      'Generate a complete form with Zod validation schema and react-hook-form integration. Supports predefined patterns or custom field definitions.',
    icon: <LucideIcons.FileInput className="w-5 h-5 text-amber-500" />,
    input: `{
  "pattern?": "string",      // "login" | "register" | "contact" | "settings"
  "fields?": "FieldDef[]",   // custom fields array
  "withValidation?": "boolean" // include Zod schema (default: true)
}

// FieldDef = { name, type, label, required?, validation? }`,
    example: `// Agent request
{ "pattern": "contact", "withValidation": true }

// Generates: ContactForm with name, email, subject, message
// Includes: Zod schema, Form wrapper, Submit handler`,
  },
  {
    name: 'generate_page',
    description:
      'Generate a full page component with layout, sections, and optional routing configuration.',
    icon: <LucideIcons.Layout className="w-5 h-5 text-pink-500" />,
    input: `{
  "name": "string",           // page name, e.g. "Dashboard"
  "layout": "string",         // "dashboard" | "sidebar" | "fullpage" | "stacked"
  "sections": [{              // page sections to include
    "type": "string",         // "hero" | "cards" | "table" | "form" | "chart" | "list"
    "title?": "string"
  }],
  "withRouting?": "boolean",  // include route configuration (default: false)
  "architecture?": "string"  // "standalone" | "mfe" (default: "standalone")
}`,
    example: `// Agent request
{ "name": "Dashboard", "layout": "dashboard", "sections": [{ "type": "cards" }, { "type": "chart" }] }

// Generates: DashboardPage with StatsCard grid and a chart placeholder section`,
  },
  {
    name: 'generate_chart',
    description:
      'Generate a Recharts chart component with tucu-ui theme CSS variables and a responsive container.',
    icon: <LucideIcons.BarChart3 className="w-5 h-5 text-cyan-500" />,
    input: `{
  "type": "string",          // "line" | "bar" | "area" | "pie" | "donut" | "composed" | "radar" | "scatter"
  "dataShape": {
    "xKey": "string",        // x-axis data key
    "yKeys": ["string"],     // y-axis data keys (series)
    "sampleData?": "object[]" // auto-generated if omitted
  },
  "responsive?": "boolean",   // wrap in ResponsiveContainer (default: true)
  "withTheme?": "boolean",    // use tucu-ui CSS variable colors (default: true)
  "withTooltip?": "boolean",  // include Tooltip (default: true)
  "withLegend?": "boolean"    // include Legend (default: true)
}`,
    example: `// Agent request
{ "type": "bar", "dataShape": { "xKey": "month", "yKeys": ["revenue"] } }

// Generates: BarChart with ResponsiveContainer, theme colors, tooltip, legend`,
  },
  {
    name: 'search_icons',
    description:
      'Search for Lucide React icons by keyword, name, or category. Returns import statements and usage examples.',
    icon: <LucideIcons.Sparkles className="w-5 h-5 text-orange-500" />,
    input: `{
  "query": "string",     // search term, e.g. "arrow"
  "category?": "string", // filter by icon category
  "limit?": "number"     // max results (default: 10)
}`,
    example: `// Agent request
{ "query": "chart", "limit": 5 }

// Response:
// BarChart3, LineChart, PieChart, AreaChart, TrendingUp`,
  },
  {
    name: 'generate_documentation',
    description:
      'Generate a full documentation hub page (General, Examples, Playground sections) for a component, matching the style of the demo pages.',
    icon: <LucideIcons.FileText className="w-5 h-5 text-fuchsia-500" />,
    input: `{
  "component": "string",     // e.g. "Button", "DataTable"
  "description?": "string",  // shown in the hub page header
  "features?": "string[]"    // key features to highlight
}`,
    example: `// Agent request
{ "component": "Alert" }

// Response includes:
// hubPageCode, docsSectionCode, examplesSectionCode, playgroundSectionCode,
// and suggestedPaths under ui/tucu-ui/src/demo/pages/`,
  },
];

const toolSummary: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color:
    | 'blue'
    | 'emerald'
    | 'violet'
    | 'amber'
    | 'pink'
    | 'cyan'
    | 'orange'
    | 'teal'
    | 'sky'
    | 'rose';
}[] = [
  {
    icon: <LucideIcons.List className="w-5 h-5" />,
    title: 'list_components',
    description: 'List available components filtered by category',
    color: 'blue',
  },
  {
    icon: <LucideIcons.Search className="w-5 h-5" />,
    title: 'get_component',
    description: 'Get full details, props, and usage example',
    color: 'emerald',
  },
  {
    icon: <LucideIcons.ListFilter className="w-5 h-5" />,
    title: 'search_components',
    description: 'Fuzzy-search components by keyword',
    color: 'teal',
  },
  {
    icon: <LucideIcons.Settings2 className="w-5 h-5" />,
    title: 'get_props',
    description: 'Get variants, warnings, and example for a component',
    color: 'sky',
  },
  {
    icon: <LucideIcons.Code className="w-5 h-5" />,
    title: 'generate_component',
    description: 'Generate ready-to-use JSX with specified props',
    color: 'violet',
  },
  {
    icon: <LucideIcons.FileInput className="w-5 h-5" />,
    title: 'generate_form',
    description: 'Complete form with Zod validation and RHF',
    color: 'amber',
  },
  {
    icon: <LucideIcons.Layout className="w-5 h-5" />,
    title: 'generate_page',
    description: 'Full page with layout and sections',
    color: 'pink',
  },
  {
    icon: <LucideIcons.BarChart3 className="w-5 h-5" />,
    title: 'generate_chart',
    description: 'Recharts chart with theming integration',
    color: 'cyan',
  },
  {
    icon: <LucideIcons.Sparkles className="w-5 h-5" />,
    title: 'search_icons',
    description: 'Search Lucide icon catalog by keyword',
    color: 'orange',
  },
  {
    icon: <LucideIcons.FileText className="w-5 h-5" />,
    title: 'generate_documentation',
    description: 'Generate a full docs hub page for a component',
    color: 'rose',
  },
];

const ToolsSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <HeroCard
        title="Tools"
        description="10 executable tools that agents can call to generate code, inspect components, and search the library."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Wrench className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        }
      />

      <section className="space-y-6">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Available Tools
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Each tool can be called by any MCP-compatible AI agent
          </Typography>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {toolSummary.map((tool) => (
            <ColorCard
              key={tool.title}
              icon={tool.icon}
              title={tool.title}
              description={tool.description}
              color={tool.color}
            />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Tool Details
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Input schemas and usage examples for each tool
          </Typography>
        </div>

        {tools.map((tool) => (
          <CardContainer key={tool.name}>
            <CardTitle title={tool.name}>
              <div className="flex items-center gap-2 mb-3">
                {tool.icon}
                <Typography className="text-sm text-foreground/70">
                  {tool.description}
                </Typography>
              </div>
              <div className="flex flex-col gap-3">
                <div>
                  <Badge variant="outline" className="mb-2">
                    Input Schema
                  </Badge>
                  <CodeBlock code={tool.input} />
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">
                    Example
                  </Badge>
                  <CodeBlock code={tool.example} />
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        ))}
      </section>
    </div>
  );
};

export default ToolsSection;
