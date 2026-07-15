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
  "name": "string"  // Component name, e.g. "Button"
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
      'Generate a full page component with layout, navigation integration, and optional sections.',
    icon: <LucideIcons.Layout className="w-5 h-5 text-pink-500" />,
    input: `{
  "name": "string",         // page name, e.g. "Dashboard"
  "layout": "string",       // "sidebar" | "top-nav" | "full-width"
  "sections?": "string[]"   // e.g. ["stats", "chart", "table"]
}`,
    example: `// Agent request
{ "name": "Dashboard", "layout": "sidebar", "sections": ["stats", "chart"] }

// Generates: DashboardPage with MainLayout, StatsGrid, Chart sections`,
  },
  {
    name: 'generate_chart',
    description:
      'Generate a Recharts chart component with tucu-ui theming integration and responsive container.',
    icon: <LucideIcons.BarChart3 className="w-5 h-5 text-cyan-500" />,
    input: `{
  "type": "string",     // "line" | "bar" | "area" | "pie" | "radar"
  "data?": "object[]"   // sample data array
}`,
    example: `// Agent request
{ "type": "bar", "data": [{ name: "Jan", value: 400 }, { name: "Feb", value: 300 }] }

// Generates: BarChart with ResponsiveContainer, theme colors, tooltips`,
  },
  {
    name: 'search_icons',
    description:
      'Search the Lucide icon catalog by keyword. Returns matching icon names that can be used with LucideIcons component.',
    icon: <LucideIcons.Sparkles className="w-5 h-5 text-orange-500" />,
    input: `{
  "query": "string",    // search term, e.g. "arrow"
  "limit?": "number"    // max results (default: 20)
}`,
    example: `// Agent request
{ "query": "chart", "limit": 5 }

// Response:
// BarChart3, LineChart, PieChart, AreaChart, TrendingUp`,
  },
];

const toolSummary: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'blue' | 'emerald' | 'violet' | 'amber' | 'pink' | 'cyan' | 'orange';
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
    description: 'Full page with layout and navigation',
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
];

const ToolsSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <HeroCard
        title="Tools"
        description="7 executable tools that agents can call to generate code, inspect components, and search the library."
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
