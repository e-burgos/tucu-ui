import {
  CardContainer,
  CardTitle,
  Badge,
  Typography,
  LucideIcons,
  Alert,
  Button,
  Input,
  Modal,
  CodeBlock,
} from 'tucu-ui';
import { useState } from 'react';

export function Accessibility() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const wcagPrinciples = [
    {
      title: 'Perceivable',
      description:
        'Information and UI components must be presentable to users in ways they can perceive.',
      icon: (
        <LucideIcons.Eye className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-orange-500 via-amber-500 to-yellow-500',
      features: [
        'Color contrast ratios',
        'Alt text for images',
        'Scalable text',
        'Audio descriptions',
      ],
    },
    {
      title: 'Operable',
      description:
        'UI components and navigation must be operable by all users.',
      icon: (
        <LucideIcons.Hand className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-red-500 via-orange-500 to-amber-500',
      features: [
        'Keyboard navigation',
        'Focus management',
        'No seizure triggers',
        'Sufficient time limits',
      ],
    },
    {
      title: 'Understandable',
      description: 'Information and UI operation must be understandable.',
      icon: (
        <LucideIcons.Brain className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-amber-500 via-orange-500 to-red-500',
      features: [
        'Readable text',
        'Predictable functionality',
        'Input assistance',
        'Error identification',
      ],
    },
    {
      title: 'Robust',
      description:
        'Content must be robust enough for various assistive technologies.',
      icon: (
        <LucideIcons.Wrench className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-yellow-500 via-amber-500 to-orange-500',
      features: [
        'Valid HTML',
        'Compatible markup',
        'Future-proof code',
        'Assistive tech support',
      ],
    },
  ];

  const implementedFeatures = [
    {
      title: 'Focus Management',
      description: 'Complete control over focus behavior and visual indicators',
      icon: (
        <LucideIcons.Target className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-orange-500 via-amber-500 to-yellow-500',
      features: [
        'Visible focus indicators',
        'Focus trapping in modals',
        'Focus restoration',
        'Skip navigation links',
      ],
    },
    {
      title: 'Keyboard Navigation',
      description:
        'Full keyboard accessibility across all interactive elements',
      icon: (
        <LucideIcons.Keyboard className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-red-500 via-orange-500 to-amber-500',
      features: [
        'Tab navigation',
        'Enter/Space activation',
        'Escape key support',
        'Arrow key navigation',
      ],
    },
    {
      title: 'Screen Reader Support',
      description: 'Comprehensive support for assistive technologies',
      icon: (
        <LucideIcons.Volume2 className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-amber-500 via-orange-500 to-red-500',
      features: [
        'Semantic HTML structure',
        'ARIA labels and descriptions',
        'Live regions',
        'Role attributes',
      ],
    },
    {
      title: 'Visual Accessibility',
      description: 'Enhanced visual accessibility features',
      icon: (
        <LucideIcons.Palette className="w-6 h-6 text-white filter drop-shadow-sm" />
      ),
      color: 'from-yellow-500 via-amber-500 to-orange-500',
      features: [
        'High contrast support',
        'Error state indicators',
        'Loading state announcements',
        'Color independence',
      ],
    },
  ];

  const keyboardShortcuts = [
    { key: 'Tab', action: 'Navigate to next focusable element' },
    { key: 'Shift + Tab', action: 'Navigate to previous focusable element' },
    { key: 'Enter', action: 'Activate buttons and links' },
    { key: 'Space', action: 'Activate buttons and checkboxes' },
    { key: 'Arrow Keys', action: 'Navigate within components' },
    { key: 'Escape', action: 'Close modals and dropdowns' },
    { key: 'Home/End', action: 'Navigate to first/last item' },
    { key: 'Page Up/Down', action: 'Navigate through large lists' },
  ];

  const componentStatus = [
    {
      name: 'Input',
      status: 'complete',
      description: 'Fully accessible with proper ARIA attributes',
    },
    {
      name: 'Checkbox',
      status: 'complete',
      description: 'Complete with label associations and error handling',
    },
    {
      name: 'Modal',
      status: 'complete',
      description: 'Focus management and keyboard navigation',
    },
    {
      name: 'Alert',
      status: 'complete',
      description: 'Live regions and proper announcements',
    },
    {
      name: 'Button',
      status: 'complete',
      description: 'Loading states and ARIA support',
    },
    {
      name: 'Tabs',
      status: 'needs-work',
      description: 'Missing ARIA roles and keyboard navigation',
    },
    {
      name: 'Drawer',
      status: 'needs-work',
      description: 'Needs focus trapping improvements',
    },
    {
      name: 'Select',
      status: 'needs-work',
      description: 'Missing ARIA attributes and keyboard support',
    },
  ];

  const inputExampleCode = `<FormField
  name="email"
  label="Email Address"
  helperText="We'll never share your email"
  required={true}
  error="Please enter a valid email"
>
  <Input
    type="email"
    placeholder="Enter your email"
    // Automatically includes:
    // - aria-describedby for helper text and errors
    // - aria-required="true" when required
    // - aria-invalid when there's an error
    // - proper label association with htmlFor
  />
</FormField>`;

  const modalExampleCode = `<Modal
  isOpen={isOpen}
  onClose={onClose}
  text={{
    title: 'Confirm Action',
    content: 'Are you sure you want to delete this item?',
  }}
>
  {/* Modal content */}
</Modal>`;

  const alertExampleCode = `<Alert variant="warning" dismissible={true} aria-label="Session expiry warning">
  Your session will expire in 5 minutes.
</Alert>`;

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
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 dark:from-orange-900 dark:via-amber-900 dark:to-yellow-900 rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5 dark:from-black/20"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-white/10 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-radial from-orange-300/20 to-transparent rounded-full blur-2xl"></div>

          <div className="relative text-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg border border-white/20">
                  <LucideIcons.Eye className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full border-2 border-white shadow-md"></div>
              </div>
            </div>

            <Typography
              tag="h1"
              className="mb-6 text-3xl sm:text-4xl md:text-5xl font-bold text-white"
            >
              Accessibility
            </Typography>

            <Typography
              tag="p"
              className="text-base sm:text-lg md:text-xl text-white/90 max-w-4xl mx-auto leading-relaxed"
            >
              Building inclusive experiences for all users with comprehensive
              accessibility features. Following WCAG 2.1 AA guidelines to ensure
              everyone can use our components effectively.
            </Typography>
          </div>
        </div>
      </section>

      {/* Implementation Status */}
      <section className="space-y-8">
        <Alert variant="warning">
          <LucideIcons.AlertTriangle className="h-4 w-4" />
          <div>
            <div className="font-semibold">
              Accessibility Implementation Status
            </div>
            <div>
              This library is actively working towards full accessibility
              compliance. We're transparent about our current state and
              committed to continuous improvement.
            </div>
          </div>
        </Alert>
      </section>

      {/* WCAG Principles */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
            WCAG 2.1 AA Principles
          </Typography>
          <Typography
            tag="p"
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Four fundamental principles that guide our accessibility
            implementation
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {wcagPrinciples.map((principle, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-full space-y-4 p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${principle.color} group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    {principle.icon}
                  </div>
                  <Typography
                    tag="h3"
                    className="font-semibold text-lg group-hover:text-primary transition-colors duration-300"
                  >
                    {principle.title}
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 leading-relaxed"
                >
                  {principle.description}
                </Typography>
                <div className="space-y-2">
                  {principle.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2">
                      <LucideIcons.Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <Typography
                        tag="span"
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        {feature}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Implemented Features */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
            Implemented Features
          </Typography>
          <Typography
            tag="p"
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Accessibility features currently available in our component library
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {implementedFeatures.map((feature, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-full space-y-4 p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    {feature.icon}
                  </div>
                  <Typography
                    tag="h3"
                    className="font-semibold text-lg group-hover:text-primary transition-colors duration-300"
                  >
                    {feature.title}
                  </Typography>
                </div>
                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-400 leading-relaxed"
                >
                  {feature.description}
                </Typography>
                <div className="space-y-2">
                  {feature.features.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2">
                      <LucideIcons.Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <Typography
                        tag="span"
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        {item}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Keyboard Navigation */}
      <section className="space-y-8">
        <CardContainer className="overflow-hidden">
          <CardTitle title="Keyboard Navigation" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 shadow-md">
                  <LucideIcons.Keyboard className="w-6 h-6 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="text-xl font-semibold">
                  Keyboard Shortcuts
                </Typography>
              </div>

              <Typography tag="p" className="text-gray-600 dark:text-gray-400">
                All interactive elements are fully accessible via keyboard
                navigation.
              </Typography>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {keyboardShortcuts.map((shortcut, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded"
                  >
                    <Badge variant="outline" className="font-mono">
                      {shortcut.key}
                    </Badge>
                    <Typography tag="p" className="text-sm">
                      {shortcut.action}
                    </Typography>
                  </div>
                ))}
              </div>

              <div className="p-4 border rounded-lg">
                <Typography tag="h4" className="font-semibold mb-3">
                  Try Keyboard Navigation
                </Typography>
                <div className="flex gap-4 flex-wrap">
                  <Button color="primary">First Button</Button>
                  <Button color="info">Second Button</Button>
                  <Button variant="ghost">Third Button</Button>
                  <Button onClick={() => setIsModalOpen(true)}>
                    Open Modal
                  </Button>
                </div>
                <Typography
                  tag="p"
                  className="text-sm text-gray-600 dark:text-gray-400 mt-3"
                >
                  Use Tab to navigate between buttons, Enter or Space to
                  activate them.
                </Typography>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Component Status */}
      <section className="space-y-8">
        <CardContainer className="overflow-hidden">
          <CardTitle
            title="Component Accessibility Status"
            className="mt-2 mb-2"
          >
            <div className="w-full space-y-8 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 shadow-md">
                  <LucideIcons.CheckCircle className="w-6 h-6 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="text-xl font-semibold">
                  Current Implementation Status
                </Typography>
              </div>

              <div className="space-y-4">
                {componentStatus.map((component, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors duration-200"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {component.status === 'complete' ? (
                          <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <LucideIcons.AlertTriangle className="w-5 h-5 text-yellow-500" />
                        )}
                        <Badge
                          variant={
                            component.status === 'complete'
                              ? 'default'
                              : 'outline'
                          }
                          className={
                            component.status === 'complete'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }
                        >
                          {component.name}
                        </Badge>
                      </div>
                      <Typography
                        tag="span"
                        className="text-sm text-gray-600 dark:text-gray-400"
                      >
                        {component.description}
                      </Typography>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Code Examples */}
      <section className="space-y-8">
        <CardContainer className="overflow-hidden">
          <CardTitle title="Implementation Examples" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 shadow-md">
                  <LucideIcons.Code className="w-6 h-6 text-white filter drop-shadow-sm" />
                </div>
                <Typography tag="h3" className="text-xl font-semibold">
                  Accessible Component Examples
                </Typography>
              </div>

              <div className="space-y-8">
                {/* Input Example */}
                <div className="space-y-4">
                  <Typography
                    tag="h4"
                    className="font-semibold flex items-center gap-2"
                  >
                    <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
                    Input Fields - Fully Accessible
                  </Typography>
                  <div className="p-4 border rounded-lg">
                    <div className="mb-4">
                      <Input
                        label="Email Address"
                        type="email"
                        placeholder="Enter your email"
                        helperText="We'll never share your email with anyone else."
                        required
                      />
                    </div>
                    <Typography
                      tag="p"
                      className="text-sm text-gray-600 dark:text-gray-400 mb-3"
                    >
                      Features: Label association, ARIA attributes, error
                      handling, helper text
                    </Typography>
                    <CodeBlock code={inputExampleCode} language="tsx" />
                  </div>
                </div>

                {/* Modal Example */}
                <div className="space-y-4">
                  <Typography
                    tag="h4"
                    className="font-semibold flex items-center gap-2"
                  >
                    <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
                    Modal Dialogs - Fully Accessible
                  </Typography>
                  <div className="p-4 border rounded-lg">
                    <Typography
                      tag="p"
                      className="text-sm text-gray-600 dark:text-gray-400 mb-3"
                    >
                      Features: Focus trapping, keyboard navigation, proper ARIA
                      roles
                    </Typography>
                    <CodeBlock code={modalExampleCode} language="tsx" />
                  </div>
                </div>

                {/* Alert Example */}
                <div className="space-y-4">
                  <Typography
                    tag="h4"
                    className="font-semibold flex items-center gap-2"
                  >
                    <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
                    Alerts and Notifications - Fully Accessible
                  </Typography>
                  <div className="p-4 border rounded-lg">
                    <Alert variant="warning">
                      <LucideIcons.AlertTriangle className="h-4 w-4" />
                      <div>Your session will expire in 5 minutes.</div>
                    </Alert>
                    <Typography
                      tag="p"
                      className="text-sm text-gray-600 dark:text-gray-400 mb-3"
                    >
                      Features: Live regions, proper roles, keyboard dismissal
                    </Typography>
                    <CodeBlock code={alertExampleCode} language="tsx" />
                  </div>
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Testing */}
      <section className="space-y-8">
        <CardContainer className="overflow-hidden">
          <CardTitle title="Accessibility Testing" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 shadow-md">
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
                  <CodeBlock code={testingExampleCode} language="javascript" />
                </div>
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Best Practices */}
      <section className="space-y-8">
        <Alert>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <LucideIcons.Lightbulb className="w-5 h-5 text-yellow-500" />
              <Typography tag="h6" className="font-semibold">
                Accessibility Best Practices
              </Typography>
            </div>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Use semantic HTML elements whenever possible</span>
              </li>
              <li className="flex items-start gap-2">
                <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Provide alternative text for all images</span>
              </li>
              <li className="flex items-start gap-2">
                <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
                <span>
                  Ensure sufficient color contrast (4.5:1 for normal text)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Make all functionality keyboard accessible</span>
              </li>
              <li className="flex items-start gap-2">
                <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Use ARIA labels and descriptions appropriately</span>
              </li>
              <li className="flex items-start gap-2">
                <LucideIcons.Check className="w-4 h-4 text-green-500 mt-0.5" />
                <span>Test with real users who use assistive technologies</span>
              </li>
            </ul>
          </div>
        </Alert>
      </section>

      {/* Modal for testing */}
      <Modal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        text={{
          title: 'Accessibility Test Modal',
          content:
            'This modal demonstrates focus trapping and keyboard navigation. Try using Tab, Shift+Tab, and Escape keys.',
        }}
      />
    </div>
  );
}
