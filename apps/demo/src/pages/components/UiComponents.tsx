import {
  CardContainer,
  CardTitle,
  Typography,
  LucideIcons,
} from '@e-burgos/tucu-ui';
import HeroPage from '../../components/HeroPage';

export function UiComponents() {
  // Component data arrays organized exactly as in Storybook 3. UI COMPONENTS section
  const authComponents = [
    {
      name: 'ForgetPasswordForm',
      description: 'Password recovery form component',
    },
    { name: 'ResetPinForm', description: 'PIN reset form component' },
    { name: 'SignInForm', description: 'User authentication sign-in form' },
    { name: 'SignUpForm', description: 'User registration form component' },
  ];

  const buttonComponents = [
    { name: 'Button', description: 'Primary action button with variants' },
    { name: 'ButtonDrip', description: 'Button with ripple click effect' },
    { name: 'ButtonLoader', description: 'Button with loading state' },
    { name: 'Hamburger', description: 'Mobile navigation hamburger menu' },
    { name: 'TopupButton', description: 'Top-up/recharge action button' },
  ];

  const cardComponents = [
    { name: 'AuthorCard', description: 'Author information display card' },
    {
      name: 'CardContainer',
      description: 'Card wrapper with consistent styling',
    },
    { name: 'CardTitle', description: 'Card header with title and actions' },
    {
      name: 'Panel Action Card',
      description: 'Interactive panel card with actions',
    },
    { name: 'Panel Card', description: 'Basic panel display card' },
  ];

  const dataDisplayComponents = [
    { name: 'Avatar', description: 'User profile image and initials display' },
    { name: 'Badge', description: 'Status indicators and labels' },
    { name: 'Collapse', description: 'Collapsible content panels' },
    { name: 'Logo', description: 'Brand logo display component' },
    {
      name: 'Typography',
      description: 'Text styling and typography component',
    },
  ];

  const feedbackComponents = [
    { name: 'Alert', description: 'Status messages and notifications' },
    { name: 'Modal', description: 'Dialog overlay for important content' },
    { name: 'NotificationCard', description: 'Notification display card' },
    { name: 'Toast', description: 'Temporary notification messages' },
  ];

  const formComponents = [
    { name: 'Form', description: 'Form wrapper with validation support' },
    { name: 'FormExample', description: 'Example form implementation' },
    { name: 'FormField', description: 'Individual form field component' },
  ];

  const iconComponents = [
    { name: 'Icons', description: 'Custom icon collection' },
    {
      name: 'Lucide Icons',
      description: 'Lucide React icon library integration',
    },
  ];

  const inputComponents = [
    { name: 'Checkbox', description: 'Boolean selection control' },
    { name: 'FileInput', description: 'File upload input component' },
    { name: 'Input', description: 'Basic text input field' },
    { name: 'InputSelect', description: 'Dropdown selection input' },
    { name: 'InputSwitch', description: 'Toggle switch input' },
    { name: 'PinCode', description: 'PIN code input component' },
    { name: 'Radio', description: 'Single radio button input' },
    { name: 'RadioGroup', description: 'Radio button group component' },
    { name: 'Textarea', description: 'Multi-line text input' },
    { name: 'ToggleBar', description: 'Toggle bar control' },
  ];

  const layoutComponents = [
    { name: 'AuthLayout', description: 'Authentication page layout' },
    { name: 'ClassicLayout', description: 'Classic page layout structure' },
    { name: 'MinimalLayout', description: 'Minimalist layout design' },
    { name: 'RootLayout', description: 'Root application layout' },
  ];

  const loaderComponents = [
    { name: 'Loader', description: 'General loading component' },
    { name: 'Progressbar', description: 'Progress indicator bar' },
    { name: 'Spinner', description: 'Loading spinner animation' },
  ];

  const navigationComponents = [
    { name: 'Drawer', description: 'Slide-out navigation panel' },
    { name: 'Links', description: 'Navigation link components' },
    { name: 'Sidebar', description: 'Application sidebar navigation' },
    { name: 'SidebarMenu', description: 'Sidebar menu structure' },
    { name: 'Tabs', description: 'Tabbed interface navigation' },
  ];

  const sliderComponents = [
    { name: 'Carousel', description: 'Image/content carousel component' },
    { name: 'Carousel Cards', description: 'Card-based carousel display' },
    { name: 'Carousel Image', description: 'Image carousel component' },
  ];

  const utilComponents = [
    { name: 'CodeBlock', description: 'Syntax-highlighted code display' },
    { name: 'RevealContent', description: 'Progressive content reveal' },
    { name: 'Scrollbar', description: 'Custom scrollbar styling' },
    { name: 'ScrollToTop', description: 'Scroll to top utility button' },
  ];

  // Helper function to get appropriate icon for each component
  const getComponentIcon = (componentName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      // Auth Components
      ForgetPasswordForm: <LucideIcons.KeyRound className="w-5 h-5" />,
      ResetPinForm: <LucideIcons.RotateCcw className="w-5 h-5" />,
      SignInForm: <LucideIcons.LogIn className="w-5 h-5" />,
      SignUpForm: <LucideIcons.UserPlus className="w-5 h-5" />,

      // Button Components
      Button: <LucideIcons.MousePointer className="w-5 h-5" />,
      ButtonDrip: <LucideIcons.Waves className="w-5 h-5" />,
      ButtonLoader: <LucideIcons.Loader className="w-5 h-5" />,
      Hamburger: <LucideIcons.Menu className="w-5 h-5" />,
      TopupButton: <LucideIcons.Plus className="w-5 h-5" />,

      // Card Components
      AuthorCard: <LucideIcons.User className="w-5 h-5" />,
      CardContainer: <LucideIcons.RectangleHorizontal className="w-5 h-5" />,
      CardTitle: <LucideIcons.Heading className="w-5 h-5" />,
      'Panel Action Card': <LucideIcons.Play className="w-5 h-5" />,
      'Panel Card': <LucideIcons.Square className="w-5 h-5" />,

      // Data Display Components
      Avatar: <LucideIcons.UserCircle className="w-5 h-5" />,
      Badge: <LucideIcons.Tag className="w-5 h-5" />,
      Collapse: <LucideIcons.ChevronsUpDown className="w-5 h-5" />,
      Logo: <LucideIcons.Image className="w-5 h-5" />,
      Typography: <LucideIcons.Type className="w-5 h-5" />,

      // Feedback Components
      Alert: <LucideIcons.AlertTriangle className="w-5 h-5" />,
      Modal: <LucideIcons.Square className="w-5 h-5" />,
      NotificationCard: <LucideIcons.Bell className="w-5 h-5" />,
      Toast: <LucideIcons.MessageSquare className="w-5 h-5" />,

      // Form Components
      Form: <LucideIcons.FileText className="w-5 h-5" />,
      FormExample: <LucideIcons.FileCode className="w-5 h-5" />,
      FormField: <LucideIcons.Nut className="w-5 h-5" />,

      // Icon Components
      Icons: <LucideIcons.ImageIcon className="w-5 h-5" />,
      'Lucide Icons': <LucideIcons.Zap className="w-5 h-5" />,

      // Input Components
      Checkbox: <LucideIcons.CheckSquare className="w-5 h-5" />,
      FileInput: <LucideIcons.Upload className="w-5 h-5" />,
      Input: <LucideIcons.Type className="w-5 h-5" />,
      InputSelect: <LucideIcons.ChevronDown className="w-5 h-5" />,
      InputSwitch: <LucideIcons.ToggleLeft className="w-5 h-5" />,
      PinCode: <LucideIcons.Hash className="w-5 h-5" />,
      Radio: <LucideIcons.Circle className="w-5 h-5" />,
      RadioGroup: <LucideIcons.CircleDot className="w-5 h-5" />,
      Textarea: <LucideIcons.AlignLeft className="w-5 h-5" />,
      ToggleBar: <LucideIcons.ToggleLeft className="w-5 h-5" />,

      // Layout Components
      AuthLayout: <LucideIcons.Shield className="w-5 h-5" />,
      ClassicLayout: <LucideIcons.Layout className="w-5 h-5" />,
      MinimalLayout: <LucideIcons.Minimize className="w-5 h-5" />,
      RootLayout: <LucideIcons.Home className="w-5 h-5" />,

      // Loader Components
      Loader: <LucideIcons.Loader className="w-5 h-5" />,
      Progressbar: <LucideIcons.BarChart3 className="w-5 h-5" />,
      Spinner: <LucideIcons.Loader2 className="w-5 h-5" />,

      // Navigation Components
      Drawer: <LucideIcons.PanelLeft className="w-5 h-5" />,
      Links: <LucideIcons.Link className="w-5 h-5" />,
      Sidebar: <LucideIcons.Sidebar className="w-5 h-5" />,
      SidebarMenu: <LucideIcons.Menu className="w-5 h-5" />,
      Tabs: <LucideIcons.LayoutGrid className="w-5 h-5" />,

      // Slider Components
      Carousel: <LucideIcons.LayoutGrid className="w-5 h-5" />,
      'Carousel Cards': <LucideIcons.RectangleHorizontal className="w-5 h-5" />,
      'Carousel Image': <LucideIcons.Image className="w-5 h-5" />,

      // Util Components
      CodeBlock: <LucideIcons.Code className="w-5 h-5" />,
      RevealContent: <LucideIcons.Eye className="w-5 h-5" />,
      Scrollbar: <LucideIcons.Scroll className="w-5 h-5" />,
      ScrollToTop: <LucideIcons.ArrowUp className="w-5 h-5" />,
    };

    return (
      iconMap[componentName] || <LucideIcons.Component className="w-5 h-5" />
    );
  };

  // Helper function to render component category sections
  const renderCategorySection = (
    components: { name: string; description: string }[],
    category: string,
    categoryIcon: React.ReactNode
  ) => {
    return (
      <CardContainer key={category} className="mb-6">
        <CardTitle title={`${category} Components`} className="mb-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-lg">
                {categoryIcon}
              </div>
              <Typography tag="p" className="text-gray-600 dark:text-gray-400">
                {components.length} component
                {components.length !== 1 ? 's' : ''} in this category
              </Typography>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {components.map((component, index) => (
                <div
                  key={`${category}-${component.name}-${index}`}
                  className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-200 bg-white dark:bg-gray-800"
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg flex-shrink-0">
                      {getComponentIcon(component.name)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <Typography
                        tag="h4"
                        className="font-semibold text-sm mb-1 truncate"
                      >
                        {component.name}
                      </Typography>
                      <Typography
                        tag="p"
                        className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed"
                      >
                        {component.description}
                      </Typography>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardTitle>
      </CardContainer>
    );
  };

  return (
    <div className="space-y-8 sm:space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      {/* Hero Section */}
      <HeroPage
        title="UI Components"
        description="Complete overview of core UI components organized by category as shown in our Storybook documentation."
        githubButton
        getStartedButton
        docsButton="introduction"
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg border border-indigo-500/50">
            <LucideIcons.Component className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      {/* Component Categories */}
      <section className="space-y-8">
        <div className="text-center">
          <Typography
            tag="h2"
            className="mb-4 text-2xl sm:text-3xl md:text-4xl font-bold"
          >
            Component Categories
          </Typography>
          <Typography
            tag="p"
            className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
          >
            Components organized by functionality as displayed in our Storybook
            documentation
          </Typography>
        </div>

        {/* Render each category as a separate section */}
        {renderCategorySection(
          authComponents,
          'Auth',
          <LucideIcons.Shield className="w-6 h-6 text-white" />
        )}
        {renderCategorySection(
          buttonComponents,
          'Buttons',
          <LucideIcons.MousePointer className="w-6 h-6 text-white" />
        )}
        {renderCategorySection(
          cardComponents,
          'Cards',
          <LucideIcons.RectangleHorizontal className="w-6 h-6 text-white" />
        )}
        {renderCategorySection(
          dataDisplayComponents,
          'Data Display',
          <LucideIcons.BarChart3 className="w-6 h-6 text-white" />
        )}
        {renderCategorySection(
          feedbackComponents,
          'Feedback',
          <LucideIcons.MessageSquare className="w-6 h-6 text-white" />
        )}
        {renderCategorySection(
          formComponents,
          'Forms',
          <LucideIcons.FileText className="w-6 h-6 text-white" />
        )}
        {renderCategorySection(
          iconComponents,
          'Icons',
          <LucideIcons.ImageIcon className="w-6 h-6 text-white" />
        )}
        {renderCategorySection(
          inputComponents,
          'Inputs',
          <LucideIcons.Nut className="w-6 h-6 text-white" />
        )}
        {renderCategorySection(
          layoutComponents,
          'Layout',
          <LucideIcons.Layout className="w-6 h-6 text-white" />
        )}
        {renderCategorySection(
          loaderComponents,
          'Loaders',
          <LucideIcons.Loader2 className="w-6 h-6 text-white" />
        )}
        {renderCategorySection(
          navigationComponents,
          'Navigation',
          <LucideIcons.Compass className="w-6 h-6 text-white" />
        )}
        {renderCategorySection(
          sliderComponents,
          'Sliders',
          <LucideIcons.LayoutGrid className="w-6 h-6 text-white" />
        )}
        {renderCategorySection(
          utilComponents,
          'Utils',
          <LucideIcons.Wrench className="w-6 h-6 text-white" />
        )}
      </section>
    </div>
  );
}
