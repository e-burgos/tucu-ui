import React from 'react';
import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
  CodeBlock,
} from '../../../../index';

const TestingSection: React.FC = () => {
  const testingExampleCode = `import { render, screen } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

test('Input has no accessibility violations', async () => {
  const { container } = render(
    <Input label="Email" required error="Invalid email" />
  );
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});`;

  return (
    <div className="space-y-8">
      <CardContainer className="overflow-hidden">
        <CardTitle title="Accessibility Testing" className="mt-2 mb-2">
          <div className="w-full space-y-8 p-4 sm:p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-linear-to-br from-orange-500 via-amber-500 to-yellow-500 shadow-lg">
                <LucideIcons.TestTube className="w-6 h-6 text-white filter drop-shadow-sm" />
              </div>
              <Typography tag="h3" className="text-xl font-semibold">
                Testing Guidelines
              </Typography>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Typography tag="h4" className="font-semibold">
                  Manual Testing Checklist
                </Typography>
                <div className="space-y-2">
                  {[
                    'Navigate using only keyboard',
                    'Test with screen reader (NVDA, JAWS, VoiceOver)',
                    'Check color contrast ratios',
                    'Verify focus indicators are visible',
                    'Test at 200% zoom level',
                    'Validate HTML markup',
                    'Check for proper heading hierarchy',
                    'Test form labels and error messages',
                  ].map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <LucideIcons.Check className="w-4 h-4 text-green-500" />
                      <Typography tag="p" className="text-sm">
                        {item}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <Typography tag="h4" className="font-semibold">
                  Automated Testing Example
                </Typography>
                <CodeBlock code={testingExampleCode} language="js" />
              </div>
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    </div>
  );
};

export default TestingSection;
