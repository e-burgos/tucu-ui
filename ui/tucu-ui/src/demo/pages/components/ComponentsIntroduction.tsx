import {
  CardContainer,
  Typography,
  LucideIcons,
  Button,
  Badge,
  HeroCard,
  BasicTable,
  FeatureCard,
} from '../../../index';

export function ComponentsIntroduction() {
  // Main component sections following menu order
  const mainSections = [
    {
      title: 'UI Components',
      description:
        'Complete collection of UI components organized by category including buttons, cards, dialogs, notifications, and more',
      icon: <LucideIcons.Component className="w-8 h-8" />,
      href: '/components/ui-components',
      componentCount: 43,
      gradient: 'from-indigo-500 to-purple-500',
    },
    {
      title: 'Input Components',
      description:
        'Complete collection of form input components with comprehensive examples, variants, and props documentation',
      icon: <LucideIcons.Type className="w-8 h-8" />,
      href: '/components/inputs-components',
      componentCount: 11,
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    },
    {
      title: 'Blockchain Components',
      description:
        'Specialized components for DeFi applications, NFT marketplaces, crypto wallets, and Web3 interfaces',
      icon: <LucideIcons.Coins className="w-8 h-8" />,
      href: '/components/blockchain',
      componentCount: 9,
      gradient: 'from-blue-500 via-indigo-500 to-purple-500',
    },
  ];

  // Form-related sections
  const formSections = [
    {
      title: 'Form System',
      description: 'Complete form solution with validation and accessibility',
      icon: <LucideIcons.FileText className="w-6 h-6" />,
      href: '/form-system',
      gradient: 'from-purple-500 to-violet-500',
    },
    {
      title: 'Form Examples',
      description: 'Interactive examples and real-world patterns',
      icon: <LucideIcons.FormInput className="w-6 h-6" />,
      href: '/form-system/example',
      gradient: 'from-pink-500 to-rose-500',
    },
    {
      title: 'Code Examples',
      description: 'Implementation patterns and best practices',
      icon: <LucideIcons.Code className="w-6 h-6" />,
      href: '/form-system/code-example',
      gradient: 'from-orange-500 to-amber-500',
    },
  ];

  // Component lists organized by section
  const uiComponentCategories = {
    Buttons: ['ButtonDrip', 'ButtonLoader', 'Hamburger', 'TopupButton'],
    Cards: [
      'AuthorCard',
      'CardContainer',
      'CardTitle',
      'PanelActionCard',
      'PanelCard',
    ],
    Carousel: ['Carousel', 'CarouselCards', 'CarouselImage'],
    Common: ['Avatar', 'Badge', 'Collapse', 'Scrollbar', 'Skeleton'],
    Dialog: ['Modal', 'Drawer', 'Sidebar', 'SidebarMenu'],
    Links: ['ActiveLink', 'AnchorLink'],
    List: ['ListContainer', 'ListItem'],
    Loaders: ['Loader', 'Progressbar', 'Spinner'],
    Logos: ['Logo', 'LogoIcon', 'FullLogo', 'TucuUiLogo', 'DefiAppLogo'],
    Notifications: ['Alert', 'NotificationCard', 'Toast'],
    Table: ['BasicTable'],
    Tabs: ['Tab', 'TabSelect', 'ParamTab'],
    Typography: ['Typography'],
    Utils: ['RevealContent', 'ScrollToTop', 'Image'],
  };

  const inputComponents = [
    'Checkbox',
    'FileInput',
    'Input',
    'InputSearcher',
    'PinCode',
    'Radio',
    'RadioGroup',
    'Select',
    'Switch',
    'Textarea',
    'ToggleBar',
  ];

  const blockchainComponents = {
    'Coins & Prices': [
      'CoinCard',
      'LivePriceFeed',
      'CoinInfoCard',
      'CoinListBox',
      'CurrencySwapIcons',
    ],
    'NFTs & Collections': ['CollectionCard', 'NFTGrid', 'CollectionSelectList'],
    Transactions: ['TransactionInfo'],
  };

  return (
    <div className="space-y-8 max-w-6xl sm:space-y-12 w-full mx-auto px-4 sm:px-6 lg:px-8 relative pt-8 lg:pt-12">
      {/* Hero Section */}
      <HeroCard
        title="Components"
        description="Explore our comprehensive component library with production-ready components for modern web applications. From UI primitives to specialized blockchain interfaces, built with TypeScript and accessibility in mind."
        githubButton
        getStartedButton
        docsButton="introduction"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg border border-indigo-500/50">
            <LucideIcons.Component className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Main Component Sections */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Component Sections
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Explore our main component categories organized for modern web
            development
          </Typography>
        </div>

        {/* Primary Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainSections.map((section, index) => (
            <CardContainer
              key={index}
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${section.gradient} opacity-5 group-hover:opacity-10 transition-opacity`}
              />

              <div className="relative flex flex-col items-center justify-center p-8 h-full">
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`p-3 bg-linear-to-br ${section.gradient} rounded-xl shadow-lg`}
                  >
                    <div className="text-white">{section.icon}</div>
                  </div>
                </div>

                <Typography tag="h3" className="text-xl font-bold mb-3">
                  {section.title}
                </Typography>

                <Typography
                  tag="p"
                  className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                >
                  {section.description}
                </Typography>

                <Button
                  fullWidth
                  className={`bg-linear-to-r ${section.gradient} hover:shadow-lg transition-all duration-200 text-white border-0`}
                  onClick={() => window.open(section.href, '_self')}
                >
                  <div className="flex items-center justify-center gap-2">
                    Explore {section.title}
                  </div>
                </Button>
              </div>
            </CardContainer>
          ))}
        </div>

        {/* Form Sections */}
        <div className="space-y-6">
          <div className="text-center">
            <Typography tag="h2" className="mb-2">
              Form Solutions
            </Typography>
            <Typography
              tag="p"
              className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
            >
              Complete form ecosystem with validation, examples, and
              implementation patterns
            </Typography>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {formSections.map((section, index) => (
              <FeatureCard
                key={index}
                icon={<div className="text-white">{section.icon}</div>}
                title={section.title}
                description={section.description}
                iconBgClassName={section.gradient}
                onClick={() => window.open(section.href, '_self')}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Component Categories Showcase */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Component Categories
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Explore components organized by category and functionality
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* UI Components by Category */}
          <CardContainer className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 rounded-lg">
                <LucideIcons.Component className="w-5 h-5 text-white! filter drop-shadow-sm" />
              </div>
              <div>
                <Typography tag="h4" className="font-semibold">
                  UI Components
                </Typography>
                <Badge status="active" className="text-xs font-medium">
                  {Object.values(uiComponentCategories).flat().length}{' '}
                  components
                </Badge>
              </div>
            </div>
            <BasicTable
              border
              columns={[
                {
                  key: 'category',
                  label: 'Category',
                  render: (value: unknown) => (
                    <Typography
                      tag="span"
                      className="text-xs font-semibold text-brand"
                    >
                      {String(value)}
                    </Typography>
                  ),
                },
                {
                  key: 'component',
                  label: 'Component',
                  render: (value: unknown) => (
                    <code className="text-xs text-brand font-semibold">
                      {String(value)}
                    </code>
                  ),
                },
              ]}
              data={Object.entries(uiComponentCategories).flatMap(
                ([category, components]) =>
                  components.map((component) => ({
                    category,
                    component,
                  }))
              )}
            />
          </CardContainer>

          {/* Input Components */}
          <CardContainer className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-linear-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-lg">
                <LucideIcons.Type className="w-5 h-5 text-white! filter drop-shadow-sm" />
              </div>
              <div>
                <Typography tag="h4" className="font-semibold">
                  Input Components
                </Typography>
                <Badge status="active" className="text-xs font-medium">
                  {inputComponents.length} components
                </Badge>
              </div>
            </div>
            <BasicTable
              columns={[
                {
                  key: 'component',
                  label: 'Component',
                  render: (value: unknown) => (
                    <code className="text-xs text-brand font-semibold">
                      {String(value)}
                    </code>
                  ),
                },
              ]}
              data={inputComponents.map((component) => ({
                component,
              }))}
            />
          </CardContainer>

          {/* Blockchain Components by Category */}
          <CardContainer className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-linear-to-br from-green-500 via-emerald-500 to-teal-500 rounded-lg">
                <LucideIcons.Coins className="w-5 h-5 text-white! filter drop-shadow-sm" />
              </div>
              <div>
                <Typography tag="h4" className="font-semibold">
                  Blockchain Components
                </Typography>
                <Badge status="active" className="text-xs font-medium">
                  {Object.values(blockchainComponents).flat().length} components
                </Badge>
              </div>
            </div>
            <BasicTable
              columns={[
                {
                  key: 'component',
                  label: 'Component',
                  render: (value: unknown) => (
                    <code className="text-xs text-brand font-semibold">
                      {String(value)}
                    </code>
                  ),
                },
              ]}
              data={Object.values(blockchainComponents)
                .flat()
                .map((component) => ({
                  component,
                }))}
            />
          </CardContainer>
        </div>
      </section>

      {/* Key Features */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Built for Production
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Modern standards and best practices in every component
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <LucideIcons.Code className="w-5 h-5 text-white" />,
              title: 'TypeScript First',
              description:
                'Full type safety with comprehensive definitions and IntelliSense support',
              gradient: 'from-blue-500 to-indigo-600',
            },
            {
              icon: (
                <LucideIcons.Accessibility className="w-5 h-5 text-white" />
              ),
              title: 'WCAG 2.1 AA',
              description:
                'WCAG 2.1 AA compliant with ARIA attributes and keyboard navigation',
              gradient: 'from-green-500 to-emerald-600',
            },
            {
              icon: <LucideIcons.Palette className="w-5 h-5 text-white" />,
              title: 'Highly Customizable',
              description:
                'Flexible theming with CSS variables and custom styling options',
              gradient: 'from-purple-500 to-violet-600',
            },
          ].map((feature, index) => (
            <FeatureCard
              key={index}
              layout="horizontal"
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconBgClassName={feature.gradient}
            />
          ))}
        </div>
      </section>

      {/* Performance & Features */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography tag="h2" className="mb-2">
            Performance & Developer Experience
          </Typography>
          <Typography
            tag="p"
            className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Optimized for speed and developer productivity
          </Typography>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              icon: <LucideIcons.Zap className="w-5 h-5 text-white" />,
              title: 'Lazy Loading',
              description: 'Components load on demand',
              gradient: 'from-yellow-500 to-amber-600',
            },
            {
              icon: <LucideIcons.Package className="w-5 h-5 text-white" />,
              title: 'Tree Shakeable',
              description: 'Import only what you need',
              gradient: 'from-blue-500 to-cyan-600',
            },
            {
              icon: <LucideIcons.Moon className="w-5 h-5 text-white" />,
              title: 'Dark Mode',
              description: 'Built-in dark mode support',
              gradient: 'from-indigo-500 to-violet-600',
            },
            {
              icon: <LucideIcons.Tablet className="w-5 h-5 text-white" />,
              title: 'Responsive',
              description: 'Mobile-first design',
              gradient: 'from-green-500 to-teal-600',
            },
          ].map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              iconBgClassName={feature.gradient}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
