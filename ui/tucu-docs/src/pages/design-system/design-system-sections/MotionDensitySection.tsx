import React from 'react';
import {
  BasicTable,
  Button,
  Card,
  CardContainer,
  CardTitle,
  CodeBlock,
  HeroCard,
  Input,
  LucideIcons,
  Typography,
} from '@e-burgos/tucu-ui';

const motionLevels = [
  {
    level: 'none',
    behavior: 'MotionConfig reducedMotion="always": no transform animations',
    use: 'Dense tools, kiosks, users who disable motion',
  },
  {
    level: 'subtle',
    behavior: 'Library default: reducedMotion="user" follows prefers-reduced-motion',
    use: 'Most products',
  },
  {
    level: 'expressive',
    behavior: 'MotionConfig with a spring default transition',
    use: 'Marketing pages, onboarding, showcases',
  },
];

const densityMapping = [
  {
    density: 'compact',
    card: 'compact',
    table: 'compact',
    button: 'small',
    input: 'sm',
  },
  {
    density: 'comfortable',
    card: 'default',
    table: 'default',
    button: 'medium',
    input: 'md',
  },
  {
    density: 'spacious',
    card: 'comfortable',
    table: 'default',
    button: 'large',
    input: 'lg',
  },
] as const;

const rows = [
  { id: 'a', item: 'Invoice 1001', status: 'Paid' },
  { id: 'b', item: 'Invoice 1002', status: 'Pending' },
];

const reducedMotionCode = `import { ThemeProvider } from '@e-burgos/tucu-ui';

<ThemeProvider motion={{ reducedMotion: 'user' }}>
  <App />
</ThemeProvider>

<ThemeProvider motion={{ reducedMotion: 'always' }}>
  <App />
</ThemeProvider>`;

const densityCode = `<Card density="compact">...</Card>
<BasicTable density="compact" columns={columns} data={rows} />
<Button size="small">Save</Button>
<Input size="sm" />`;

const MotionDensitySection: React.FC = () => {
  return (
    <div className="space-y-8 max-w-6xl sm:space-y-12 w-full mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      <HeroCard
        title="Motion & Density"
        description="Three motion levels and three density levels, mapped to real component props and honoring reduced motion."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.Activity className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <CardContainer>
        <CardTitle title="Motion levels">
          <Typography className="text-sm text-foreground/70 mb-4">
            The same names are accepted by the MCP <code>motion</code>{' '}
            parameter of <code>generate_page</code> and{' '}
            <code>generate_component</code>.
          </Typography>
          <div className="overflow-x-auto">
            <BasicTable
              columns={[
                { key: 'level', label: 'Level' },
                { key: 'behavior', label: 'Behavior' },
                { key: 'use', label: 'Use when' },
              ]}
              data={motionLevels}
            />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Reduced motion">
          <Typography className="text-sm text-foreground/70 mb-3">
            <code>ThemeProvider</code> and <code>NextThemeProvider</code> wrap
            the app in framer-motion{' '}
            <code>MotionConfig reducedMotion="user"</code>, so every animated
            component respects <code>prefers-reduced-motion</code> without extra
            code. Override it with the <code>motion</code> prop.
          </Typography>
          <CodeBlock language="tsx" code={reducedMotionCode} />
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Density mapping">
          <Typography className="text-sm text-foreground/70 mb-4">
            Density is not a global switch: each level maps to the real prop of
            every component.
          </Typography>
          <div className="overflow-x-auto">
            <BasicTable
              columns={[
                { key: 'density', label: 'Density' },
                { key: 'card', label: 'Card density' },
                { key: 'table', label: 'BasicTable density' },
                { key: 'button', label: 'Button size' },
                { key: 'input', label: 'Input size' },
              ]}
              data={[...densityMapping]}
            />
          </div>
          <div className="mt-4">
            <CodeBlock language="tsx" code={densityCode} />
          </div>
        </CardTitle>
      </CardContainer>

      <CardContainer>
        <CardTitle title="Live examples">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {densityMapping.map((density) => (
              <Card key={density.density} density={density.card} title={density.density}>
                <div className="flex flex-col gap-3">
                  <BasicTable
                    density={density.table}
                    columns={[
                      { key: 'item', label: 'Item' },
                      { key: 'status', label: 'Status' },
                    ]}
                    data={rows}
                  />
                  <Input size={density.input} placeholder="Search" />
                  <div>
                    <Button size={density.button}>Save</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default MotionDensitySection;
