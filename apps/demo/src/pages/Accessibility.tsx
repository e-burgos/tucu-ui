import {
  CardContainer,
  CardTitle,
  Button,
  Badge,
  Typography,
  LucideIcons,
  Alert,
} from 'tucu-ui';

export function Accessibility() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl">
        <LucideIcons.Eye className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <Typography tag="h1" className="mb-4 text-4xl font-bold">
          Accessibility
        </Typography>
        <Typography
          tag="p"
          className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
        >
          Building inclusive experiences for all users with comprehensive
          accessibility features.
        </Typography>
      </div>

      {/* WCAG Compliance */}
      <CardContainer className="p-6">
        <CardTitle className="mb-6 flex items-center gap-2">
          <LucideIcons.Shield className="w-5 h-5 text-green-500" />
          WCAG 2.1 AA Compliance
        </CardTitle>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              icon: <LucideIcons.Eye className="w-8 h-8 text-blue-500" />,
              title: 'Perceivable',
              description:
                'Information and UI components must be presentable to users in ways they can perceive.',
              features: [
                'Color contrast ratios',
                'Alt text for images',
                'Scalable text',
                'Audio descriptions',
              ],
            },
            {
              icon: <LucideIcons.Hand className="w-8 h-8 text-purple-500" />,
              title: 'Operable',
              description:
                'UI components and navigation must be operable by all users.',
              features: [
                'Keyboard navigation',
                'Focus management',
                'No seizure triggers',
                'Sufficient time limits',
              ],
            },
            {
              icon: <LucideIcons.Brain className="w-8 h-8 text-orange-500" />,
              title: 'Understandable',
              description:
                'Information and UI operation must be understandable.',
              features: [
                'Readable text',
                'Predictable functionality',
                'Input assistance',
                'Error identification',
              ],
            },
            {
              icon: <LucideIcons.Wrench className="w-8 h-8 text-red-500" />,
              title: 'Robust',
              description:
                'Content must be robust enough for various assistive technologies.',
              features: [
                'Valid HTML',
                'Compatible markup',
                'Future-proof code',
                'Assistive tech support',
              ],
            },
          ].map((principle, index) => (
            <div key={index} className="p-4 border rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                {principle.icon}
                <Typography tag="h3" className="font-semibold">
                  {principle.title}
                </Typography>
              </div>
              <Typography
                tag="p"
                className="text-gray-600 dark:text-gray-400 mb-3"
              >
                {principle.description}
              </Typography>
              <ul className="space-y-1">
                {principle.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm">
                    <LucideIcons.Check className="w-4 h-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </CardContainer>

      {/* Keyboard Navigation */}
      <CardContainer className="p-6">
        <CardTitle className="mb-6 flex items-center gap-2">
          <LucideIcons.Keyboard className="w-5 h-5 text-purple-500" />
          Keyboard Navigation
        </CardTitle>

        <Typography tag="p" className="text-gray-600 dark:text-gray-400 mb-6">
          All interactive elements are fully accessible via keyboard navigation.
        </Typography>

        <div className="space-y-4">
          <div className="p-4 border rounded-lg">
            <Typography tag="h4" className="font-semibold mb-3">
              Common Keyboard Shortcuts
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { key: 'Tab', action: 'Navigate to next focusable element' },
                {
                  key: 'Shift + Tab',
                  action: 'Navigate to previous focusable element',
                },
                { key: 'Enter', action: 'Activate buttons and links' },
                { key: 'Space', action: 'Activate buttons and checkboxes' },
                { key: 'Arrow Keys', action: 'Navigate within components' },
                { key: 'Escape', action: 'Close modals and dropdowns' },
                { key: 'Home/End', action: 'Navigate to first/last item' },
                { key: 'Page Up/Down', action: 'Navigate through large lists' },
              ].map((shortcut, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded"
                >
                  <Badge>{shortcut.key}</Badge>
                  <Typography tag="p" className="text-sm">
                    {shortcut.action}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 border rounded-lg">
            <Typography tag="h4" className="font-semibold mb-3">
              Try Keyboard Navigation
            </Typography>
            <div className="flex gap-4">
              <Button color="primary">First Button</Button>
              <Button color="info">Second Button</Button>
              <Button variant="ghost">Third Button</Button>
              <Button disabled>Disabled Button</Button>
            </div>
            <Typography
              tag="p"
              className="text-sm text-gray-600 dark:text-gray-400 mt-3"
            >
              Use Tab to navigate between buttons, Enter or Space to activate
              them.
            </Typography>
          </div>
        </div>
      </CardContainer>

      {/* Screen Reader Support */}
      <CardContainer className="p-6">
        <CardTitle className="mb-6 flex items-center gap-2">
          <LucideIcons.Volume2 className="w-5 h-5 text-blue-500" />
          Screen Reader Support
        </CardTitle>

        <div className="space-y-6">
          <div>
            <Typography tag="h4" className="font-semibold mb-4">
              ARIA Labels and Descriptions
            </Typography>
            <div className="space-y-4">
              <div className="p-4 border rounded-lg">
                <Typography tag="h5" className="font-medium mb-2">
                  Example: Accessible Button
                </Typography>
                <Button
                  color="primary"
                  aria-label="Save your changes to the document"
                  className="mb-3"
                >
                  Save
                </Button>
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                  <Typography tag="pre">
                    {`<Button 
  aria-label="Save your changes to the document"
  color="primary"
>
  Save
</Button>`}
                  </Typography>
                </div>
              </div>

              <div className="p-4 border rounded-lg">
                <Typography tag="h5" className="font-medium mb-2">
                  Example: Form with Descriptions
                </Typography>
                <div className="space-y-3">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-600"
                      aria-describedby="email-help"
                    />
                    <Typography
                      tag="p"
                      className="text-xs text-gray-600 dark:text-gray-400 mt-1"
                    >
                      We'll never share your email with anyone else.
                    </Typography>
                  </div>
                </div>
                <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm mt-3">
                  <Typography tag="pre">
                    {`<label htmlFor="email">Email Address</label>
<input
  id="email"
  type="email"
  aria-describedby="email-help"
/>
<p id="email-help">
  We'll never share your email with anyone else.
</p>`}
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          <div>
            <Typography tag="h4" className="font-semibold mb-4">
              Live Regions
            </Typography>
            <Typography
              tag="p"
              className="text-gray-600 dark:text-gray-400 mb-4"
            >
              Screen readers are notified of dynamic content changes through
              ARIA live regions.
            </Typography>
            <div className="p-4 border rounded-lg">
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                <Typography tag="pre">
                  {`<div aria-live="polite" aria-atomic="true">
  Status updates appear here
</div>

<div aria-live="assertive">
  Critical alerts appear here
</div>`}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </CardContainer>

      {/* Color and Contrast */}
      <CardContainer className="p-6">
        <CardTitle className="mb-6 flex items-center gap-2">
          <LucideIcons.Palette className="w-5 h-5 text-pink-500" />
          Color and Contrast
        </CardTitle>

        <div className="space-y-6">
          <div>
            <Typography tag="h4" className="font-semibold mb-4">
              WCAG AA Contrast Ratios
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  text: 'Normal Text',
                  ratio: '4.5:1',
                  bg: 'bg-gray-900',
                  color: 'text-white',
                },
                {
                  text: 'Large Text',
                  ratio: '3:1',
                  bg: 'bg-gray-700',
                  color: 'text-white',
                },
                {
                  text: 'UI Components',
                  ratio: '3:1',
                  bg: 'bg-blue-600',
                  color: 'text-white',
                },
                {
                  text: 'Graphical Objects',
                  ratio: '3:1',
                  bg: 'bg-green-600',
                  color: 'text-white',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${item.bg} ${item.color}`}
                >
                  <Typography tag="h5" className="font-medium mb-1">
                    {item.text}
                  </Typography>
                  <Typography tag="p" className="text-sm opacity-90">
                    Minimum ratio: {item.ratio}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Typography tag="h4" className="font-semibold mb-4">
              Color Independence
            </Typography>
            <Typography
              tag="p"
              className="text-gray-600 dark:text-gray-400 mb-4"
            >
              Information is never conveyed through color alone. Additional
              indicators are always provided.
            </Typography>
            <div className="p-4 border rounded-lg">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <LucideIcons.CheckCircle className="w-5 h-5 text-green-500" />
                  <Badge className="bg-green-100 text-green-800">Success</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <LucideIcons.AlertTriangle className="w-5 h-5 text-yellow-500" />
                  <Badge className="bg-yellow-100 text-yellow-800">
                    Warning
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <LucideIcons.XCircle className="w-5 h-5 text-red-500" />
                  <Badge className="bg-red-100 text-red-800">Error</Badge>
                </div>
              </div>
              <Typography
                tag="p"
                className="text-sm text-gray-600 dark:text-gray-400"
              >
                Icons and text labels accompany color coding for universal
                understanding.
              </Typography>
            </div>
          </div>
        </div>
      </CardContainer>

      {/* Focus Management */}
      <CardContainer className="p-6">
        <CardTitle className="mb-6 flex items-center gap-2">
          <LucideIcons.Target className="w-5 h-5 text-indigo-500" />
          Focus Management
        </CardTitle>

        <div className="space-y-6">
          <div>
            <Typography tag="h4" className="font-semibold mb-4">
              Visible Focus Indicators
            </Typography>
            <Typography
              tag="p"
              className="text-gray-600 dark:text-gray-400 mb-4"
            >
              All interactive elements have clear focus indicators that meet
              WCAG requirements.
            </Typography>
            <div className="flex gap-4">
              <Button
                color="primary"
                className="focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Primary Button
              </Button>
              <Button
                variant="ghost"
                className="focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Ghost Button
              </Button>
              <input
                type="text"
                placeholder="Focus me"
                className="px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600"
              />
            </div>
          </div>

          <div>
            <Typography tag="h4" className="font-semibold mb-4">
              Focus Trapping
            </Typography>
            <Typography
              tag="p"
              className="text-gray-600 dark:text-gray-400 mb-4"
            >
              Modals and dropdowns trap focus within their boundaries until
              closed.
            </Typography>
            <div className="p-4 border rounded-lg">
              <Typography tag="h5" className="font-medium mb-2">
                Modal Focus Trap Example
              </Typography>
              <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded text-sm">
                <Typography tag="pre">
                  {`// Focus is trapped within modal
<Modal>
  <input /> {/* First focusable element */}
  <button>Save</button>
  <button>Cancel</button> {/* Last focusable element */}
</Modal>`}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </CardContainer>

      {/* Testing Tools */}
      <CardContainer className="p-6">
        <CardTitle className="mb-6 flex items-center gap-2">
          <LucideIcons.TestTube className="w-5 h-5 text-green-500" />
          Accessibility Testing
        </CardTitle>

        <div className="space-y-6">
          <div>
            <Typography tag="h4" className="font-semibold mb-4">
              Automated Testing Tools
            </Typography>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  name: 'axe-core',
                  description: 'Automated accessibility testing engine',
                },
                {
                  name: 'WAVE',
                  description: 'Web accessibility evaluation tool',
                },
                {
                  name: 'Lighthouse',
                  description: 'Built-in Chrome accessibility audit',
                },
                {
                  name: 'Pa11y',
                  description: 'Command line accessibility testing',
                },
              ].map((tool, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <Typography tag="h5" className="font-medium mb-2">
                    {tool.name}
                  </Typography>
                  <Typography
                    tag="p"
                    className="text-sm text-gray-600 dark:text-gray-400"
                  >
                    {tool.description}
                  </Typography>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Typography tag="h4" className="font-semibold mb-4">
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
        </div>
      </CardContainer>

      {/* Best Practices */}
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
    </div>
  );
}
