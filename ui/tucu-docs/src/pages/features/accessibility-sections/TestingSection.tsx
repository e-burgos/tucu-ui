import React from 'react';
import {
  HeroCard,
  CardContainer,
  Typography,
  LucideIcons,
  CodeBlock,
  FeatureCard,
} from '@e-burgos/tucu-ui';

const TestingSection: React.FC = () => {
  const testingTools = [
    {
      icon: (
        <LucideIcons.Scan className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'jest-axe',
      description:
        'Automated WCAG violation detection in unit tests. Run axe-core checks on rendered components.',
      iconBgClassName: 'from-red-500 to-pink-500',
    },
    {
      icon: (
        <LucideIcons.Monitor className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Lighthouse',
      description:
        'Full page accessibility audit with scoring. Available in Chrome DevTools or CI pipelines.',
      iconBgClassName: 'from-blue-500 to-indigo-500',
    },
    {
      icon: (
        <LucideIcons.Accessibility className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Screen Reader Testing',
      description:
        'Manual testing with VoiceOver (macOS), NVDA (Windows), or Orca (Linux) to verify announcements.',
      iconBgClassName: 'from-purple-500 to-violet-500',
    },
    {
      icon: (
        <LucideIcons.Keyboard className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      title: 'Keyboard-Only Testing',
      description:
        'Navigate the entire interface using only Tab, Arrow keys, Enter, and Escape. No mouse allowed.',
      iconBgClassName: 'from-teal-500 to-cyan-500',
    },
  ];

  const jestAxeCode = `import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Input, Modal, Alert, Select } from '@e-burgos/tucu-ui';

expect.extend(toHaveNoViolations);

describe('Accessibility Tests', () => {
  it('Input has no violations', async () => {
    const { container } = render(
      <Input label="Email" required helperText="Enter your email" />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Alert has no violations', async () => {
    const { container } = render(
      <Alert variant="warning">Important message</Alert>
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('Select has no violations', async () => {
    const { container } = render(
      <Select
        label="Country"
        options={[{ name: 'Argentina', value: 'ar' }]}
        value=""
        onSelect={() => {}}
      />
    );
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});`;

  const manualChecklist = [
    'Tab through all interactive elements — verify logical order',
    'Press Escape on modals, drawers, selects — verify they close',
    'Arrow keys in Tabs and Select — verify correct navigation',
    'Check visible focus rings on all focusable elements',
    'Verify color contrast ≥ 4.5:1 (use browser inspector)',
    'Test with VoiceOver/NVDA — verify announcements make sense',
    'Resize to 200% zoom — verify no content is hidden or overlapping',
    'Disable CSS — verify content order is logical',
  ];

  return (
    <>
      <HeroCard
        title="Accessibility Testing"
        description="Strategies for testing accessibility — automated tools catch ~30% of issues, manual testing catches the rest."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-teal-500 via-cyan-500 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.TestTube className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Testing Tools
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Recommended tools for accessibility validation
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {testingTools.map((tool) => (
            <FeatureCard key={tool.title} layout="horizontal" {...tool} />
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Automated Tests with jest-axe
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Add axe-core checks to your existing test suite
          </Typography>
        </div>

        <CodeBlock language="tsx" code={jestAxeCode} />
      </section>

      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Manual Testing Checklist
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Steps to manually verify accessibility
          </Typography>
        </div>

        <CardContainer>
          <div className="w-full p-4 sm:p-6 space-y-3">
            {manualChecklist.map((item, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 shrink-0 mt-0.5">
                  <Typography
                    tag="span"
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400"
                  >
                    {index + 1}
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  {item}
                </Typography>
              </div>
            ))}
          </div>
        </CardContainer>
      </section>
    </>
  );
};

export default TestingSection;
