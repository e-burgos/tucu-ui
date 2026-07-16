import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  CodeBlock,
  HeroCard,
  LucideIcons,
  ColorCard,
} from '@e-burgos/tucu-ui';

const prompts: {
  name: string;
  description: string;
  icon: React.ReactNode;
  color:
    | 'blue'
    | 'emerald'
    | 'violet'
    | 'red'
    | 'amber'
    | 'pink'
    | 'cyan'
    | 'orange';
}[] = [
  {
    name: 'create-component',
    description:
      'Guided workflow to create a new component using tucu-ui primitives. Asks for name, category, props, and variants.',
    icon: <LucideIcons.PlusCircle className="w-5 h-5" />,
    color: 'blue',
  },
  {
    name: 'create-form',
    description:
      'Interactive form builder. Collects field definitions, validation rules, and layout — outputs a complete Form with Zod schema.',
    icon: <LucideIcons.FileInput className="w-5 h-5" />,
    color: 'emerald',
  },
  {
    name: 'create-page',
    description:
      'Page scaffolding wizard. Asks for layout type, sections, navigation needs — generates a routed page with layout integration.',
    icon: <LucideIcons.Layout className="w-5 h-5" />,
    color: 'violet',
  },
  {
    name: 'debug-variant',
    description:
      'Diagnose variant errors. Given a component and the variant causing issues, explains valid options and provides corrected usage.',
    icon: <LucideIcons.Bug className="w-5 h-5" />,
    color: 'red',
  },
  {
    name: 'migrate-component',
    description:
      'Migrate from external libraries (Material UI, Chakra, Ant Design) to tucu-ui equivalents. Maps props and patterns automatically.',
    icon: <LucideIcons.ArrowRightLeft className="w-5 h-5" />,
    color: 'amber',
  },
  {
    name: 'theme-setup',
    description:
      'Configure theming from scratch. Sets up color preset, dark/light mode, token overrides, and the Zustand theme store.',
    icon: <LucideIcons.Palette className="w-5 h-5" />,
    color: 'pink',
  },
  {
    name: 'accessibility-check',
    description:
      'Audit a component or page for WCAG 2.2 AA compliance. Reports contrast issues, missing ARIA, keyboard traps, and focus gaps.',
    icon: <LucideIcons.Accessibility className="w-5 h-5" />,
    color: 'cyan',
  },
  {
    name: 'performance-review',
    description:
      'Review component usage for performance issues: unnecessary re-renders, missing memoization, bundle size impact.',
    icon: <LucideIcons.Gauge className="w-5 h-5" />,
    color: 'orange',
  },
];

const PromptsSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-8">
      <HeroCard
        title="Prompts"
        description="8 pre-built prompt templates that guide the agent through complex multi-step workflows."
        icon={
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-linear-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
          </div>
        }
      />

      <CardContainer>
        <CardTitle title="What are Prompts?">
          <Typography className="text-sm text-foreground/70">
            MCP Prompts are pre-defined conversation templates that guide the
            agent through a multi-step workflow. Unlike tools (single-shot
            execution), prompts structure an interactive dialogue — asking
            clarifying questions, making decisions, and producing comprehensive
            output.
          </Typography>
        </CardTitle>
      </CardContainer>

      <section className="space-y-6">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Available Prompts
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Each prompt guides the agent through a structured multi-step
            workflow
          </Typography>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {prompts.map((prompt) => (
            <ColorCard
              key={prompt.name}
              icon={prompt.icon}
              title={prompt.name}
              description={prompt.description}
              color={prompt.color}
            />
          ))}
        </div>
      </section>

      <CardContainer>
        <CardTitle title="Usage Example">
          <Typography className="text-sm text-foreground/70 mb-3">
            Prompts are invoked by name. The agent then follows the template's
            guided flow:
          </Typography>
          <CodeBlock
            code={`// In your AI assistant, invoke a prompt:
"Use the create-form prompt to build a registration form"

// The agent will:
// 1. Ask: What fields do you need?
// 2. Ask: What validation rules?
// 3. Ask: Any conditional logic?
// 4. Generate: Complete form with Zod + react-hook-form
// 5. Output: Ready-to-paste TSX code

// Another example:
"Run debug-variant for Button with variant='primary'"

// The agent will:
// 1. Identify: "primary" is not a valid Button variant
// 2. Explain: Valid variants are "solid" | "ghost" | "transparent"
// 3. Suggest: Use "solid" for primary button appearance
// 4. Provide: Corrected code snippet`}
          />
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default PromptsSection;
