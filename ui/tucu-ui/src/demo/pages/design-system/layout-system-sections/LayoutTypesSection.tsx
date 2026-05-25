import React from 'react';
import {
  CardContainer,
  Typography,
  LucideIcons,
  Badge,
  LAYOUT_OPTIONS,
  HeroCard,
} from '../../../../index';

const LayoutTypesSection: React.FC = () => {
  const layoutTypes = [
    {
      name: 'Admin Layout',
      description:
        'Traditional admin layout with expandable sidebar and fixed header. Designed for complex applications with hierarchical navigation and multiple sections.',
      icon: (
        <LucideIcons.Layout className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-blue-500 via-cyan-500 to-teal-500',
      value: LAYOUT_OPTIONS.ADMIN,
      useCases: [
        'Dashboard applications',
        'Admin panels and management systems',
        'Complex applications with many navigation items',
        'Applications requiring hierarchical menu structure',
        'Enterprise software and internal tools',
        'Applications with multiple sections and subsections',
      ],
      features: [
        'Expandable sidebar navigation (visible on xl screens)',
        'Fixed header with logo and action buttons',
        'Responsive drawer menu for mobile devices',
        'RTL/LTR direction support',
        'Full-width content option available',
        'Sidebar padding: 96px (xl) / 112px (2xl)',
        'Content padding: 16px (mobile) / 24px (sm) / 32px (lg) / 40px (min-[1780px])',
      ],
      technical: {
        sidebar: 'ExpandableSidebar component (hidden on mobile, visible xl+)',
        header: 'AdminHeader component with menu toggle',
        drawer: 'Drawer component for mobile navigation',
        breakpoint: 'Sidebar visible from xl breakpoint (1280px)',
      },
    },
    {
      name: 'Horizontal Layout',
      description:
        'Modern horizontal navigation layout with top menu bar. Ideal for content-focused sites, marketing pages, and applications with simple navigation.',
      icon: (
        <LucideIcons.Menu className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-purple-500 via-violet-500 to-indigo-500',
      value: LAYOUT_OPTIONS.HORIZONTAL,
      useCases: [
        'Content-focused websites',
        'Marketing and landing pages',
        'Simple applications with few navigation items',
        'Portfolio and showcase sites',
        'Blog and content management systems',
        'Public-facing applications',
      ],
      features: [
        'Horizontal top navigation menu',
        'Sticky header with logo and action buttons',
        'Mobile hamburger menu with drawer',
        'Backdrop blur effects on header',
        'Full-width content option available',
        'Content padding: 8px (mobile) / 24px (sm) / 32px (lg) / 40px (min-[1780px])',
        'Minimal vertical space usage',
      ],
      technical: {
        header: 'HorizontalHeader component with horizontal menu',
        menu: 'HorizontalNavMenu component',
        drawer: 'Drawer component for mobile navigation',
        breakpoint: 'Horizontal menu visible on all screen sizes',
      },
    },
    {
      name: 'Clean Layout',
      description:
        'Minimal layout without navigation elements. Perfect for authentication pages, standalone content, and full-screen experiences.',
      icon: (
        <LucideIcons.Minimize2 className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-emerald-500 via-green-500 to-teal-500',
      value: LAYOUT_OPTIONS.CLEAN,
      useCases: [
        'Authentication pages (login, signup, password reset)',
        'Landing pages and marketing sites',
        'Standalone content pages',
        'Full-screen applications',
        'Modal and overlay content',
        'Embedded widgets and components',
      ],
      features: [
        'No navigation elements or headers',
        'Full viewport height (100vh)',
        'Flex column layout',
        'Perfect for centered content',
        'Minimal overhead and dependencies',
        'No menu items required',
        'Customizable via className prop',
      ],
      technical: {
        structure: 'Simple flex container with full height',
        dependencies: 'No header, sidebar, or menu components',
        customization: 'Full control via className prop',
        useWhen: 'No navigation needed, standalone content',
      },
    },
    {
      name: 'macOS Sonoma Layout',
      description:
        'macOS Sonoma desktop-style layout with frosted sidebar, toolbar, and window chrome. Ideal for desktop-like applications with macOS-inspired aesthetics.',
      icon: (
        <LucideIcons.Monitor className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-gray-500 via-slate-500 to-zinc-500',
      value: LAYOUT_OPTIONS.MACOS,
      useCases: [
        'Desktop-like applications',
        'macOS-inspired user interfaces',
        'Content apps with sidebar navigation',
        'Media and file management apps',
        'Developer tools and IDEs',
        'Applications requiring native-feel chrome',
      ],
      features: [
        'Frosted glass sidebar with blur effects',
        'Native toolbar with window controls',
        'Window chrome styling and rounded corners',
        'Responsive layout adapts to screen size',
        'Smooth animations and transitions',
        'AccentBundles support (9 color presets)',
        'Integrates with ThemeBackground (sonoma variant)',
      ],
      technical: {
        component: 'MacOSSonomaLayout or MacOSLayout variant="sonoma"',
        sidebar: 'Frosted sidebar with backdrop-blur',
        toolbar: 'Native-style toolbar with actions',
        accents: '9 Sonoma AccentBundles (built via buildSonomaPresets)',
      },
    },
    {
      name: 'macOS Tahoe Layout',
      description:
        'macOS Tahoe (macOS 26) layout with Liquid Glass aesthetics, translucent sidebar and refined toolbar. The most modern desktop-inspired layout.',
      icon: (
        <LucideIcons.Sparkles className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-indigo-500 via-purple-500 to-pink-500',
      value: LAYOUT_OPTIONS.MACOS_TAHOE,
      useCases: [
        'Modern desktop applications',
        'Liquid Glass UI experiences',
        'Immersive content experiences',
        'Creative and design tools',
        'Applications requiring premium aesthetics',
        'Next-generation web experiences',
      ],
      features: [
        'Liquid Glass sidebar with translucent effects',
        'Refined toolbar with modern controls',
        'Dynamic mesh backgrounds',
        'Frosted glass surfaces throughout',
        'Accent color bundles (9 Tahoe presets)',
        'Smooth spring-based animations',
        'Integrates with ThemeBackground (radial variant)',
      ],
      technical: {
        component: 'MacOSTahoeLayout or MacOSLayout variant="tahoe"',
        sidebar: 'Liquid Glass translucent sidebar',
        toolbar: 'Refined toolbar with glass effects',
        accents:
          '9 Tahoe AccentBundles (Glass, Blue, Purple, Pink, Red, Orange, Yellow, Green, Graphite)',
      },
    },
    {
      name: 'macOS Tahoe Dock Layout',
      description:
        'macOS Tahoe dock-based layout with floating app dock at the bottom and maximized content area. Best for full-screen and immersive experiences.',
      icon: (
        <LucideIcons.AppWindow className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-violet-500 via-fuchsia-500 to-pink-500',
      value: LAYOUT_OPTIONS.MACOS_TAHOE_DOCK,
      useCases: [
        'Full-screen applications',
        'Media and entertainment apps',
        'Dock-based navigation patterns',
        'Immersive gaming or creative experiences',
        'Applications with few top-level sections',
        'Presentation and showcase apps',
      ],
      features: [
        'Floating dock with Liquid Glass effect',
        'Full-width maximized content area',
        'Dynamic mesh backgrounds',
        'No sidebar — dock-only navigation',
        'Hover-to-expand dock items',
        'Accent color bundles support',
        'Pairs with ThemeBackground (radial variant)',
      ],
      technical: {
        component: 'MacOSTahoeDockLayout or MacOSLayout variant="tahoe-dock"',
        dock: 'Floating bottom dock with glass effect and magnification',
        content: 'Full viewport content area without sidebar',
        navigation: 'Dock items act as primary navigation',
      },
    },
    {
      name: 'macOS Sonoma Clean Layout',
      description:
        'Minimal Sonoma layout with only background and content, no sidebar or toolbar. Inherits Sonoma visual styling without navigation chrome.',
      icon: (
        <LucideIcons.Layers className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-slate-400 via-gray-400 to-zinc-400',
      value: LAYOUT_OPTIONS.MACOS_CLEAN,
      useCases: [
        'Authentication pages within Sonoma theme',
        'Landing pages with macOS aesthetics',
        'Standalone content pages',
        'Full-screen experiences within macOS theme',
        'Onboarding flows',
        'Embedded views that inherit theme',
      ],
      features: [
        'Background only + content slot',
        'Inherits Sonoma theme styling',
        'No navigation chrome (no sidebar, toolbar)',
        'Full viewport content area',
        'Seamless transition to/from Sonoma layout',
        'Minimal overhead',
        'Customizable via className prop',
      ],
      technical: {
        component:
          'MacOSSonomaCleanLayout or MacOSLayout variant="sonoma-clean"',
        structure: 'Background wrapper + content container',
        dependencies: 'No navigation components required',
        useWhen: 'Auth pages, standalone content within Sonoma theme',
      },
    },
    {
      name: 'macOS Tahoe Clean Layout',
      description:
        'Minimal Tahoe layout with only Liquid Glass background and content area. Perfect for standalone views that need Tahoe visual identity without navigation.',
      icon: (
        <LucideIcons.Gem className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-purple-400 via-violet-400 to-indigo-400',
      value: LAYOUT_OPTIONS.MACOS_TAHOE_CLEAN,
      useCases: [
        'Authentication pages within Tahoe theme',
        'Full-screen content experiences',
        'Standalone views with Liquid Glass aesthetic',
        'Onboarding and setup wizards',
        'Modal-like full-page overlays',
        'Embedded views that inherit Tahoe theme',
      ],
      features: [
        'Dynamic Liquid Glass background only',
        'Content slot without chrome',
        'Tahoe visual identity (mesh gradients)',
        'No sidebar, toolbar, or dock',
        'Seamless transition to/from Tahoe layouts',
        'Minimal dependencies',
        'Full viewport height',
      ],
      technical: {
        component:
          'MacOSTahoeCleanLayout or MacOSLayout variant="macos-tahoe-clean"',
        structure: 'Liquid Glass background + content container',
        dependencies: 'No navigation components required',
        useWhen: 'Auth pages, standalone content within Tahoe theme',
      },
    },
    {
      name: 'macOS Sonoma Navbar Layout',
      description:
        'macOS Sonoma layout with horizontal top navigation bar instead of sidebar, providing a streamlined navigation experience.',
      icon: (
        <LucideIcons.PanelTop className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-gray-500 via-slate-400 to-zinc-500',
      value: LAYOUT_OPTIONS.MACOS_NAVBAR,
      useCases: [
        'Content-focused macOS-style apps',
        'Documentation sites with macOS aesthetics',
        'Applications preferring horizontal navigation',
        'Portfolio and showcase sites with Sonoma theme',
        'Simple apps without sidebar complexity',
        'Landing pages with macOS visual identity',
      ],
      features: [
        'Top horizontal navigation bar',
        'Sonoma visual styling and effects',
        'No sidebar — navbar-only navigation',
        'Responsive layout adapts to screen size',
        'Background effects from Sonoma theme',
        'Seamless transition to/from Sonoma layouts',
        'AccentBundles support (9 color presets)',
      ],
      technical: {
        component: 'MacOSNavbarLayout or MacOSLayout variant="sonoma-navbar"',
        navbar: 'Horizontal top navigation with Sonoma styling',
        content: 'Full-width content area without sidebar',
        navigation: 'Navbar items act as primary navigation',
      },
    },
    {
      name: 'macOS Tahoe Navbar Layout',
      description:
        'macOS Tahoe layout with horizontal top navigation bar combining Liquid Glass aesthetics with streamlined navigation.',
      icon: (
        <LucideIcons.GalleryHorizontalEnd className="w-8 h-8 text-white filter drop-shadow-sm" />
      ),
      color: 'from-indigo-400 via-violet-500 to-purple-500',
      value: LAYOUT_OPTIONS.MACOS_TAHOE_NAVBAR,
      useCases: [
        'Content-focused Tahoe-style apps',
        'Modern desktop applications preferring horizontal nav',
        'Portfolio and showcase sites',
        'Applications with few top-level sections',
        'Documentation and knowledge bases',
        'Creative tools with immersive content areas',
      ],
      features: [
        'Liquid Glass top navigation bar',
        'Tahoe visual styling and effects',
        'No sidebar or dock — navbar-only navigation',
        'Dynamic mesh backgrounds',
        'Full-width content area',
        'Seamless transition to/from Tahoe layouts',
        'Accent color bundles support',
      ],
      technical: {
        component:
          'MacOSTahoeNavbarLayout or MacOSLayout variant="tahoe-navbar"',
        navbar: 'Liquid Glass horizontal navigation bar',
        content: 'Full viewport content area without sidebar or dock',
        navigation: 'Navbar items act as primary navigation',
      },
    },
  ];

  return (
    <>
      <HeroCard
        title="Layout Types"
        description="Ten layout patterns spanning classic admin panels, modern horizontal menus, and macOS-inspired desktop experiences with Sonoma and Tahoe aesthetics."
        icon={
          <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-cyan-500 via-teal-500 to-emerald-500 rounded-full flex items-center justify-center shadow-lg">
            <LucideIcons.LayoutGrid className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
          </div>
        }
      />

      <div className="text-center">
        <Typography tag="h2" className="mb-2">
          Layout Types
        </Typography>
        <Typography
          tag="p"
          className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto"
        >
          Ten layout patterns for every use case — from classic admin panels to
          macOS-inspired desktop experiences with Liquid Glass aesthetics.
        </Typography>
      </div>

      <div className="space-y-8">
        {layoutTypes.map((layout, index) => (
          <CardContainer
            key={index}
            className="group hover:shadow-large transition-all duration-300 overflow-hidden"
          >
            <div className="w-full space-y-6 p-4 sm:p-6">
              {/* Header */}
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-xl bg-linear-to-br ${layout.color} group-hover:scale-110 transition-all duration-300 shadow-lg shrink-0`}
                >
                  {layout.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Typography
                      tag="h3"
                      className="font-semibold text-lg group-hover:text-primary transition-colors duration-300"
                    >
                      {layout.name}
                    </Typography>
                    <Badge variant="outline" className="text-xs">
                      {layout.value}
                    </Badge>
                  </div>
                  <Typography
                    tag="p"
                    className="text-gray-600 dark:text-gray-400 leading-relaxed"
                  >
                    {layout.description}
                  </Typography>
                </div>
              </div>

              {/* Use Cases */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <LucideIcons.Zap className="w-5 h-5 text-primary" />
                  <Typography tag="h4" className="font-semibold text-base">
                    When to Use
                  </Typography>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {layout.useCases.map((useCase, useCaseIndex) => (
                    <div
                      key={useCaseIndex}
                      className="flex items-start gap-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
                    >
                      <LucideIcons.CheckCircle className="w-3 h-3 text-primary mt-1 shrink-0" />
                      <Typography
                        tag="span"
                        className="text-sm text-gray-700 dark:text-gray-300"
                      >
                        {useCase}
                      </Typography>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <LucideIcons.Star className="w-5 h-5 text-primary" />
                  <Typography tag="h4" className="font-semibold text-base">
                    Features
                  </Typography>
                </div>
                <div className="space-y-2">
                  {layout.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-2">
                      <LucideIcons.Check className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
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

              {/* Technical Details */}
              <div className="space-y-3 pt-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <LucideIcons.Code className="w-5 h-5 text-primary" />
                  <Typography tag="h4" className="font-semibold text-base">
                    Technical Details
                  </Typography>
                </div>
                <div className="space-y-2">
                  {Object.entries(layout.technical).map(
                    ([key, value], techIndex) => (
                      <div
                        key={techIndex}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Typography
                          tag="span"
                          className="font-medium text-gray-700 dark:text-gray-300 capitalize min-w-25"
                        >
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </Typography>
                        <Typography
                          tag="span"
                          className="text-gray-600 dark:text-gray-400"
                        >
                          {value}
                        </Typography>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </CardContainer>
        ))}
      </div>
    </>
  );
};

export default LayoutTypesSection;
