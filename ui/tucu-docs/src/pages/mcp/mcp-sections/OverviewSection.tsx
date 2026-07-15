import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  HeroCard,
  LucideIcons,
  Badge,
  FeatureCard,
} from '@e-burgos/tucu-ui';

const OverviewSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <HeroCard
        title="Overview"
        description="The tucu-ui MCP Server implements the Model Context Protocol to give AI agents full access to the component library — catalog, code generation, design tokens, and best practices."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-violet-500 to-fuchsia-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.BrainCircuit className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        }
      />

      <CardContainer>
        <CardTitle title="What is MCP?">
          <Typography className="text-sm text-foreground/70 mb-4">
            The <strong>Model Context Protocol (MCP)</strong> is an open
            standard that lets AI assistants connect to external tools and data
            sources. Instead of relying on training data alone, agents can query
            live APIs for accurate, up-to-date information about your component
            library.
          </Typography>
          <Typography className="text-sm text-foreground/70">
            With{' '}
            <code className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono">
              @e-burgos/tucu-ui-mcp
            </code>
            , your AI assistant knows every component, prop, variant, token, and
            pattern — producing correct, type-safe code on the first try without
            hallucinated prop names or invalid variants.
          </Typography>
        </CardTitle>
      </CardContainer>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <CardContainer className="text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <LucideIcons.Wrench className="w-6 h-6 text-blue-500" />
            </div>
            <Badge variant="soft" className="bg-blue-500/10 text-blue-500">
              7 Tools
            </Badge>
            <Typography className="text-sm font-semibold">Tools</Typography>
            <Typography className="text-xs text-foreground/60">
              Generate components, forms, pages, charts. Search icons. List &
              inspect the full catalog.
            </Typography>
          </div>
        </CardContainer>

        <CardContainer className="text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center">
              <LucideIcons.BookOpen className="w-6 h-6 text-emerald-500" />
            </div>
            <Badge
              variant="soft"
              className="bg-emerald-500/10 text-emerald-500"
            >
              12 Resources
            </Badge>
            <Typography className="text-sm font-semibold">Resources</Typography>
            <Typography className="text-xs text-foreground/60">
              Static knowledge: catalog, tokens, forms, routing, layouts,
              charts, icons, and more.
            </Typography>
          </div>
        </CardContainer>

        <CardContainer className="text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
              <LucideIcons.MessageSquare className="w-6 h-6 text-amber-500" />
            </div>
            <Badge variant="soft" className="bg-amber-500/10 text-amber-500">
              8 Prompts
            </Badge>
            <Typography className="text-sm font-semibold">Prompts</Typography>
            <Typography className="text-xs text-foreground/60">
              Pre-built workflows: create components, debug variants, migrate,
              audit accessibility.
            </Typography>
          </div>
        </CardContainer>

        <CardContainer className="text-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center">
              <LucideIcons.Radio className="w-6 h-6 text-purple-500" />
            </div>
            <Badge variant="soft" className="bg-purple-500/10 text-purple-500">
              2 Transports
            </Badge>
            <Typography className="text-sm font-semibold">
              Transports
            </Typography>
            <Typography className="text-xs text-foreground/60">
              stdio for local IDEs, HTTP+SSE for remote/cloud agents. Both fully
              supported.
            </Typography>
          </div>
        </CardContainer>
      </div>

      <section className="space-y-6">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Why use it?
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Eliminate guesswork — your AI assistant generates correct code on
            the first try
          </Typography>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <FeatureCard
            layout="horizontal"
            icon={
              <LucideIcons.ShieldCheck className="w-6 h-6 text-white filter drop-shadow-sm" />
            }
            title="No hallucinated props"
            description="Agents query live metadata, not stale training data"
            iconBgClassName="from-emerald-500 to-green-500"
          />
          <FeatureCard
            layout="horizontal"
            icon={
              <LucideIcons.CheckCheck className="w-6 h-6 text-white filter drop-shadow-sm" />
            }
            title="Correct variants"
            description='Only valid values like "solid", "ghost", "transparent"'
            iconBgClassName="from-blue-500 to-cyan-500"
          />
          <FeatureCard
            layout="horizontal"
            icon={
              <LucideIcons.Code className="w-6 h-6 text-white filter drop-shadow-sm" />
            }
            title="Type-safe output"
            description="Generated code passes TypeScript strict mode"
            iconBgClassName="from-violet-500 to-purple-500"
          />
          <FeatureCard
            layout="horizontal"
            icon={
              <LucideIcons.Wand2 className="w-6 h-6 text-white filter drop-shadow-sm" />
            }
            title="Full code generation"
            description="Forms with Zod, pages with layouts, themed charts"
            iconBgClassName="from-amber-500 to-orange-500"
          />
        </div>
      </section>

      <CardContainer>
        <CardTitle title="Quick Example">
          <Typography className="text-sm text-foreground/70 mb-3">
            Ask your AI assistant to generate a form — the MCP server handles
            the rest:
          </Typography>
          <CodeBlock
            code={`// Agent calls: generate_form tool
// Input: { pattern: "login", withValidation: true }
// Output: complete TSX with Zod schema + react-hook-form

import { z } from 'zod';
import { Form, InputText, Button } from '@e-burgos/tucu-ui';

const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Min 8 characters'),
});

export function LoginForm() {
  return (
    <Form schema={loginSchema} onSubmit={(data) => console.log(data)}>
      <InputText name="email" label="Email" placeholder="you@example.com" />
      <InputText name="password" label="Password" type="password" />
      <Button type="submit" variant="solid">Sign In</Button>
    </Form>
  );
}`}
          />
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default OverviewSection;
