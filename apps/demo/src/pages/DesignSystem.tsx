import {
  Button,
  Typography,
  Badge,
  LucideIcons,
  CardContainer,
  Alert,
  CardTitle,
} from '@e-burgos/tucu-ui';
import HeroPage from '../components/HeroPage';

export function DesignSystem() {
  const spacingValues = [
    2, 4, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96,
  ];
  const radiusValues = [0, 2, 4, 6, 8, 12, 16, 20, 24, 32];

  const brandColors = [
    { name: 'Primary', class: 'bg-primary', hex: '#3B82F6' },
    { name: 'Secondary', class: 'bg-secondary', hex: '#6B7280' },
    { name: 'Accent', class: 'bg-accent', hex: '#10B981' },
    { name: 'Muted', class: 'bg-muted', hex: '#F3F4F6' },
  ];

  const semanticColors = [
    { name: 'Success', class: 'bg-green-500', hex: '#10B981' },
    { name: 'Warning', class: 'bg-yellow-500', hex: '#F59E0B' },
    { name: 'Error', class: 'bg-red-500', hex: '#EF4444' },
    { name: 'Info', class: 'bg-blue-500', hex: '#3B82F6' },
  ];

  const componentStates = [
    { name: 'Default', component: <Button>Default</Button> },
    {
      name: 'Hover',
      component: <Button className="hover:bg-primary/90">Hover</Button>,
    },
    {
      name: 'Active',
      component: <Button className="active:bg-primary/95">Active</Button>,
    },
    { name: 'Disabled', component: <Button disabled>Disabled</Button> },
  ];

  const componentVariants = [
    { name: 'Solid', component: <Button variant="solid">Solid</Button> },
    { name: 'Ghost', component: <Button variant="ghost">Ghost</Button> },
    {
      name: 'Transparent',
      component: <Button variant="transparent">Transparent</Button>,
    },
  ];

  const componentSizes = [
    { name: 'Tiny', component: <Button size="tiny">Tiny</Button> },
    { name: 'Mini', component: <Button size="mini">Mini</Button> },
    { name: 'Small', component: <Button size="small">Small</Button> },
    { name: 'Medium', component: <Button size="medium">Medium</Button> },
    { name: 'Large', component: <Button size="large">Large</Button> },
  ];

  const breakpoints = [
    { name: 'xs', value: '0px', description: 'Extra small devices' },
    {
      name: 'sm',
      value: '640px',
      description: 'Small devices (landscape phones)',
    },
    { name: 'md', value: '768px', description: 'Medium devices (tablets)' },
    { name: 'lg', value: '1024px', description: 'Large devices (desktops)' },
    { name: 'xl', value: '1280px', description: 'Extra large devices' },
    { name: '2xl', value: '1536px', description: 'Ultra wide screens' },
  ];

  const zIndexLayers = [
    {
      name: 'Base',
      value: '0',
      description: 'Default layer for most elements',
    },
    {
      name: 'Dropdown',
      value: '10',
      description: 'Dropdown menus and popovers',
    },
    { name: 'Sticky', value: '20', description: 'Sticky positioned elements' },
    { name: 'Fixed', value: '30', description: 'Fixed positioned elements' },
    {
      name: 'Modal Backdrop',
      value: '40',
      description: 'Modal overlay backgrounds',
    },
    { name: 'Modal', value: '50', description: 'Modal dialogs and drawers' },
    { name: 'Popover', value: '60', description: 'Tooltips and popovers' },
    { name: 'Toast', value: '70', description: 'Toast notifications' },
    {
      name: 'Tooltip',
      value: '80',
      description: 'Tooltips (highest priority)',
    },
  ];

  const typographyExamples: Array<{
    tag: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'small';
    text: string;
    size: string;
  }> = [
    { tag: 'h1', text: 'Heading 1 - 48px', size: 'text-5xl' },
    { tag: 'h2', text: 'Heading 2 - 36px', size: 'text-4xl' },
    { tag: 'h3', text: 'Heading 3 - 24px', size: 'text-2xl' },
    { tag: 'h4', text: 'Heading 4 - 20px', size: 'text-xl' },
    { tag: 'p', text: 'Body Text - 16px', size: 'text-base' },
    { tag: 'small', text: 'Small Text - 14px', size: 'text-sm' },
  ];

  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Header */}
      <HeroPage
        title="Design System"
        description="A comprehensive design system that ensures consistency, accessibility, and scalability across all components and applications."
        githubButton
        getStartedButton
        docsButton="design-system"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-brand/70 rounded-full flex items-center justify-center shadow-lg border border-brand/50">
            <LucideIcons.Palette className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Design Principles */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
            Design Principles
          </Typography>
          <Typography
            tag="p"
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Core principles that guide our design decisions and ensure
            consistency
          </Typography>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {[
            {
              title: 'Consistency',
              description:
                'Unified visual language and interaction patterns across all components.',
              icon: (
                <LucideIcons.CheckCircle className="h-6 w-6 text-white filter drop-shadow-sm" />
              ),
              color: 'from-emerald-500 via-green-500 to-teal-500',
            },
            {
              title: 'Simplicity',
              description:
                'Clean, intuitive interfaces that reduce cognitive load.',
              icon: (
                <LucideIcons.Minimize2 className="h-6 w-6 text-white filter drop-shadow-sm" />
              ),
              color: 'from-blue-500 via-cyan-500 to-sky-500',
            },
            {
              title: 'Flexibility',
              description:
                'Adaptable components that work across different contexts.',
              icon: (
                <LucideIcons.Layers className="h-6 w-6 text-white filter drop-shadow-sm" />
              ),
              color: 'from-purple-500 via-violet-500 to-indigo-500',
            },
            {
              title: 'Accessibility',
              description: 'Inclusive design that works for everyone.',
              icon: (
                <LucideIcons.Eye className="h-6 w-6 text-white filter drop-shadow-sm" />
              ),
              color: 'from-orange-500 via-amber-500 to-yellow-500',
            },
          ].map((principle) => (
            <CardContainer
              key={principle.title}
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
              </div>
            </CardContainer>
          ))}
        </div>
      </section>

      {/* Typography Scale */}
      <section className="space-y-8">
        <CardContainer className="overflow-hidden">
          <CardTitle title="Typography Scale" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <div className="space-y-4">
                {typographyExamples.map((typo, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <Badge variant="outline" className="w-20 justify-center">
                      {typo.tag}
                    </Badge>
                    <Typography tag={typo.tag} className={typo.size}>
                      {typo.text}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Spacing System */}
      <section className="space-y-8">
        <CardContainer className="overflow-hidden">
          <CardTitle title="Spacing System" className="mt-2 mb-2">
            <div className="w-full space-y-8 p-4 sm:p-6">
              <div className="flex flex-wrap gap-4 sm:gap-6 overflow-x-auto">
                {spacingValues.map((value) => (
                  <div key={value} className="text-center space-y-2">
                    <div
                      className="bg-primary/20 border-2 border-primary/40 mx-auto"
                      style={{
                        width: `${value * 2}px`,
                        height: `${value * 2}px`,
                      }}
                    />
                    <div className="text-sm">
                      <div className="font-semibold">{value}</div>
                      <div className="text-muted-foreground">{value * 4}px</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Border Radius */}
      <section className="space-y-8">
        <CardContainer className="overflow-hidden">
          <CardTitle title="Border Radius" className="mt-2 mb-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-6">
              {radiusValues.map((value) => (
                <div key={value} className="text-center space-y-2">
                  <div
                    className="w-16 h-16 bg-primary/20 border-2 border-primary/40 mx-auto"
                    style={{ borderRadius: `${value}px` }}
                  />
                  <div className="text-sm">
                    <div className="font-semibold">r-{value}</div>
                    <div className="text-muted-foreground">{value}px</div>
                  </div>
                </div>
              ))}
            </div>
          </CardTitle>
        </CardContainer>
      </section>

      {/* Color System */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
            Color System
          </Typography>
          <Typography
            tag="p"
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Carefully crafted color palettes that work across all themes and
            contexts
          </Typography>
        </div>

        <div className="space-y-8">
          {/* Brand Colors */}
          <CardContainer className="overflow-hidden">
            <CardTitle title="Brand Colors" className="mt-2 mb-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {brandColors.map((color) => (
                  <div key={color.name} className="text-center space-y-2">
                    <div
                      className={`w-16 h-16 rounded-lg ${color.class} mx-auto`}
                    />
                    <div className="text-sm">
                      <div className="font-semibold">{color.name}</div>
                      <div className="text-muted-foreground">{color.hex}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardTitle>
          </CardContainer>

          {/* Semantic Colors */}
          <CardContainer className="overflow-hidden">
            <CardTitle title="Semantic Colors" className="mt-2 mb-2">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                {semanticColors.map((color) => (
                  <div key={color.name} className="text-center space-y-2">
                    <div
                      className={`w-16 h-16 rounded-lg ${color.class} mx-auto`}
                    />
                    <div className="text-sm">
                      <div className="font-semibold">{color.name}</div>
                      <div className="text-muted-foreground">{color.hex}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardTitle>
          </CardContainer>

          {/* Theme Color Presets */}
          <Alert variant="info">
            <LucideIcons.Info className="h-4 w-4" />
            <div>
              <div className="font-semibold">Dynamic Theming</div>
              <div>
                Colors automatically adapt based on the selected theme preset
                and mode (light/dark).
              </div>
            </div>
          </Alert>
        </div>
      </section>

      {/* Component Anatomy */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
            Component Anatomy
          </Typography>
          <Typography
            tag="p"
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Understanding component states, variants, and sizes for consistent
            implementation
          </Typography>
        </div>

        <div className="space-y-8">
          {/* States */}
          <CardContainer className="overflow-hidden">
            <CardTitle title="Component States" className="mt-2 mb-2">
              <div className="w-full space-y-8 p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 shadow-md">
                    <LucideIcons.Layers className="w-6 h-6 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h3" className="text-xl font-semibold">
                    Component States
                  </Typography>
                </div>
                <div className="flex flex-wrap gap-4 sm:gap-6">
                  {componentStates.map((state) => (
                    <div key={state.name} className="text-center space-y-2">
                      {state.component}
                      <div className="text-sm text-muted-foreground">
                        {state.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          {/* Variants */}
          <CardContainer className="overflow-hidden">
            <CardTitle title="Component Variants" className="mt-2 mb-2">
              <div className="w-full space-y-8 p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 via-violet-500 to-indigo-500 shadow-md">
                    <LucideIcons.Zap className="w-6 h-6 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h3" className="text-xl font-semibold">
                    Component Variants
                  </Typography>
                </div>
                <div className="flex flex-wrap gap-4 sm:gap-6">
                  {componentVariants.map((variant) => (
                    <div key={variant.name} className="text-center space-y-2">
                      {variant.component}
                      <div className="text-sm text-muted-foreground">
                        {variant.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          {/* Sizes */}
          <CardContainer className="overflow-hidden">
            <CardTitle title="Component Sizes" className="mt-2 mb-2">
              <div className="w-full space-y-8 p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 via-cyan-500 to-sky-500 shadow-md">
                    <LucideIcons.Maximize className="w-6 h-6 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h3" className="text-xl font-semibold">
                    Component Sizes
                  </Typography>
                </div>
                <div className="flex flex-wrap items-end gap-4 sm:gap-6">
                  {componentSizes.map((size) => (
                    <div key={size.name} className="text-center space-y-2">
                      {size.component}
                      <div className="text-sm text-muted-foreground">
                        {size.name}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </div>
      </section>

      {/* Layout Principles */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
            Layout Principles
          </Typography>
          <Typography
            tag="p"
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Responsive design patterns and layout guidelines for consistent
            experiences
          </Typography>
        </div>

        <div className="space-y-8">
          {/* Breakpoints */}
          <CardContainer className="overflow-hidden">
            <CardTitle title="Responsive Breakpoints" className="mt-2 mb-2">
              <div className="w-full space-y-8 p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-500 shadow-md">
                    <LucideIcons.Layout className="w-6 h-6 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h3" className="text-xl font-semibold">
                    Responsive Breakpoints
                  </Typography>
                </div>
                <div className="space-y-4">
                  {breakpoints.map((breakpoint) => (
                    <div
                      key={breakpoint.name}
                      className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="font-mono">
                          {breakpoint.name}
                        </Badge>
                        <div>
                          <div className="font-semibold">
                            {breakpoint.description}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Min-width: {breakpoint.value}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardTitle>
          </CardContainer>

          {/* Z-Index Scale */}
          <CardContainer className="overflow-hidden">
            <CardTitle title="Z-Index Scale" className="mt-2 mb-2">
              <div className="w-full space-y-8 p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-cyan-500 via-teal-500 to-blue-500 shadow-md">
                    <LucideIcons.Layers3 className="w-6 h-6 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h3" className="text-xl font-semibold">
                    Z-Index Scale
                  </Typography>
                </div>
                <div className="space-y-2">
                  {zIndexLayers.map((layer) => (
                    <div
                      key={layer.name}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded"
                    >
                      <div className="flex items-center gap-4">
                        <Badge
                          variant="outline"
                          className="font-mono w-12 justify-center"
                        >
                          {layer.value}
                        </Badge>
                        <div>
                          <div className="font-semibold">{layer.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {layer.description}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardTitle>
          </CardContainer>
        </div>
      </section>

      {/* Implementation Guidelines */}
      <section className="space-y-8">
        <div className="text-center space-y-4">
          <Typography tag="h2" className="text-3xl md:text-4xl font-bold">
            Implementation Guidelines
          </Typography>
          <Typography
            tag="p"
            className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Best practices and common pitfalls when implementing the design
            system
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <CardContainer className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1">
            <CardTitle title="Best Practices" className="mt-2 mb-2">
              <div className="w-full space-y-4 p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 shadow-sm">
                    <LucideIcons.CheckCircle className="h-5 w-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h4" className="font-semibold text-green-700">
                    Best Practices
                  </Typography>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>• Use semantic HTML elements</li>
                  <li>• Follow consistent naming conventions</li>
                  <li>• Implement proper ARIA attributes</li>
                  <li>• Test across different devices</li>
                  <li>• Optimize for performance</li>
                  <li>• Document component usage</li>
                </ul>
              </div>
            </CardTitle>
          </CardContainer>

          <CardContainer className="group hover:shadow-large transition-all duration-300 hover:-translate-y-1">
            <CardTitle title="Common Pitfalls" className="mt-2 mb-2">
              <div className="w-full space-y-4 p-4 sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="p-1.5 rounded-lg bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 shadow-sm">
                    <LucideIcons.XCircle className="h-5 w-5 text-white filter drop-shadow-sm" />
                  </div>
                  <Typography tag="h4" className="font-semibold text-red-700">
                    Common Pitfalls
                  </Typography>
                </div>
                <ul className="space-y-2 text-sm">
                  <li>• Inconsistent spacing usage</li>
                  <li>• Mixing different color systems</li>
                  <li>• Ignoring responsive design</li>
                  <li>• Overriding component styles</li>
                  <li>• Missing accessibility features</li>
                  <li>• Not following design tokens</li>
                </ul>
              </div>
            </CardTitle>
          </CardContainer>
        </div>
      </section>
    </div>
  );
}
