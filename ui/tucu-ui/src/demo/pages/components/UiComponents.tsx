import React, { lazy } from 'react';
import {
  LucideIcons,
  HeroCard,
  TableOfContents,
  type TableOfContentsItem,
  useAnchorScroll,
} from '../../../index';
import { LazyComponentSection } from '../../components';

// Lazy load component sections - Ordered alphabetically by tocItems
// Buttons
const ButtonDripSection = lazy(
  () => import('./ui-components-sections/ButtonDripSection')
);
const ButtonLoaderSection = lazy(
  () => import('./ui-components-sections/ButtonLoaderSection')
);
const HamburgerSection = lazy(
  () => import('./ui-components-sections/HamburgerSection')
);
const TopupButtonSection = lazy(
  () => import('./ui-components-sections/TopupButtonSection')
);
// Cards
const AuthorCardSection = lazy(
  () => import('./ui-components-sections/AuthorCardSection')
);
const CardContainerSection = lazy(
  () => import('./ui-components-sections/CardContainerSection')
);
const CardTitleSection = lazy(
  () => import('./ui-components-sections/CardTitleSection')
);
const PanelActionCardSection = lazy(
  () => import('./ui-components-sections/PanelActionCardSection')
);
const PanelCardSection = lazy(
  () => import('./ui-components-sections/PanelCardSection')
);
// Carousel
const CarouselSection = lazy(
  () => import('./ui-components-sections/CarouselSection')
);
const CarouselCardsSection = lazy(
  () => import('./ui-components-sections/CarouselCardsSection')
);
const CarouselImageSection = lazy(
  () => import('./ui-components-sections/CarouselImageSection')
);
// Common
const AvatarSection = lazy(
  () => import('./ui-components-sections/AvatarSection')
);
const BadgeSection = lazy(
  () => import('./ui-components-sections/BadgeSection')
);
const CollapseSection = lazy(
  () => import('./ui-components-sections/CollapseSection')
);
const ScrollbarSection = lazy(
  () => import('./ui-components-sections/ScrollbarSection')
);
const SkeletonSection = lazy(
  () => import('./ui-components-sections/SkeletonSection')
);
// Dialog
const ModalSection = lazy(
  () => import('./ui-components-sections/ModalSection')
);
const DrawerSection = lazy(
  () => import('./ui-components-sections/DrawerSection')
);
const SidebarSection = lazy(
  () => import('./ui-components-sections/SidebarSection')
);
const SidebarMenuSection = lazy(
  () => import('./ui-components-sections/SidebarMenuSection')
);
// Links
const ActiveLinkSection = lazy(
  () => import('./ui-components-sections/ActiveLinkSection')
);
const AnchorLinkSection = lazy(
  () => import('./ui-components-sections/AnchorLinkSection')
);
// List
const ListContainerSection = lazy(
  () => import('./ui-components-sections/ListContainerSection')
);
const ListItemSection = lazy(
  () => import('./ui-components-sections/ListItemSection')
);
// Loaders
const LoaderSection = lazy(
  () => import('./ui-components-sections/LoaderSection')
);
const ProgressbarSection = lazy(
  () => import('./ui-components-sections/ProgressbarSection')
);
const SpinnerSection = lazy(
  () => import('./ui-components-sections/SpinnerSection')
);
// Logos
const LogoSection = lazy(() => import('./ui-components-sections/LogoSection'));
const TucuUiLogoSection = lazy(
  () => import('./ui-components-sections/TucuUiLogoSection')
);
const DefiAppLogoSection = lazy(
  () => import('./ui-components-sections/DefiAppLogoSection')
);
// Notifications
const AlertSection = lazy(
  () => import('./ui-components-sections/AlertSection')
);
const NotificationCardSection = lazy(
  () => import('./ui-components-sections/NotificationCardSection')
);
const ToastSection = lazy(
  () => import('./ui-components-sections/ToastSection')
);
// Table
const BasicTableSection = lazy(
  () => import('./ui-components-sections/BasicTableSection')
);
// Tabs
const TabSection = lazy(() => import('./ui-components-sections/TabSection'));
const TabSelectSection = lazy(
  () => import('./ui-components-sections/TabSelectSection')
);
const ParamTabSection = lazy(
  () => import('./ui-components-sections/ParamTabSection')
);
// Typography
const TypographySection = lazy(
  () => import('./ui-components-sections/TypographySection')
);
// Utils
const RevealContentSection = lazy(
  () => import('./ui-components-sections/RevealContentSection')
);
const ScrollToTopSection = lazy(
  () => import('./ui-components-sections/ScrollToTopSection')
);
const ImageSection = lazy(
  () => import('./ui-components-sections/ImageSection')
);

export function UiComponents() {
  useAnchorScroll();

  // Table of contents items with categories
  const tocItems: TableOfContentsItem[] = [
    // Buttons
    { id: 'button-drip', label: 'ButtonDrip', category: 'Buttons' },
    { id: 'button-loader', label: 'ButtonLoader', category: 'Buttons' },
    { id: 'hamburger', label: 'Hamburger', category: 'Buttons' },
    { id: 'topup-button', label: 'TopupButton', category: 'Buttons' },
    // Cards
    { id: 'author-card', label: 'AuthorCard', category: 'Cards' },
    { id: 'card-container', label: 'CardContainer', category: 'Cards' },
    { id: 'card-title', label: 'CardTitle', category: 'Cards' },
    {
      id: 'panel-action-card',
      label: 'PanelActionCard',
      category: 'Cards',
    },
    { id: 'panel-card', label: 'PanelCard', category: 'Cards' },
    // Carousel
    { id: 'carousel', label: 'Carousel', category: 'Carousel' },
    { id: 'carousel-cards', label: 'CarouselCards', category: 'Carousel' },
    { id: 'carousel-image', label: 'CarouselImage', category: 'Carousel' },
    // Common
    { id: 'avatar', label: 'Avatar', category: 'Common' },
    { id: 'badge', label: 'Badge', category: 'Common' },
    { id: 'collapse', label: 'Collapse', category: 'Common' },
    { id: 'scrollbar', label: 'Scrollbar', category: 'Common' },
    { id: 'skeleton', label: 'Skeleton', category: 'Common' },
    // Dialog
    { id: 'modal', label: 'Modal', category: 'Dialog' },
    { id: 'drawer', label: 'Drawer', category: 'Dialog' },
    { id: 'sidebar', label: 'Sidebar', category: 'Dialog' },
    { id: 'sidebar-menu', label: 'SidebarMenu', category: 'Dialog' },
    // Links
    { id: 'active-link', label: 'ActiveLink', category: 'Links' },
    { id: 'anchor-link', label: 'AnchorLink', category: 'Links' },
    // List
    { id: 'list-container', label: 'ListContainer', category: 'List' },
    { id: 'list-item', label: 'ListItem', category: 'List' },
    // Loaders
    { id: 'loader', label: 'Loader', category: 'Loaders' },
    { id: 'progressbar', label: 'Progressbar', category: 'Loaders' },
    { id: 'spinner', label: 'Spinner', category: 'Loaders' },
    // Logos
    { id: 'logo', label: 'Logo', category: 'Logos' },
    { id: 'tucu-ui-logo', label: 'TucuUiLogo', category: 'Logos' },
    { id: 'defi-app-logo', label: 'DefiAppLogo', category: 'Logos' },
    // Notifications
    { id: 'alert', label: 'Alert', category: 'Notifications' },
    {
      id: 'notification-card',
      label: 'NotificationCard',
      category: 'Notifications',
    },
    { id: 'toast', label: 'Toast', category: 'Notifications' },
    // Table
    { id: 'basic-table', label: 'BasicTable', category: 'Table' },
    // Tabs
    { id: 'tab', label: 'Tab', category: 'Tabs' },
    { id: 'tab-select', label: 'TabSelect', category: 'Tabs' },
    { id: 'param-tab', label: 'ParamTab', category: 'Tabs' },
    // Typography
    { id: 'typography', label: 'Typography', category: 'Typography' },
    // Utils
    { id: 'reveal-content', label: 'RevealContent', category: 'Utils' },
    { id: 'scroll-to-top', label: 'ScrollToTop', category: 'Utils' },
    { id: 'image', label: 'Image', category: 'Utils' },
  ];

  return (
    <div className="relative scroll-smooth">
      <TableOfContents items={tocItems}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 pt-8 lg:pt-0">
          {/* Hero Section */}
          <HeroCard
            title="UI Components"
            description="Complete collection of UI components with comprehensive examples, variants, and props documentation. Built for modern web applications with TypeScript support and accessibility in mind."
            githubButton
            getStartedButton
            docsButton="introduction"
            icon={
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg border border-indigo-500/50">
                <LucideIcons.Component className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white filter drop-shadow-lg" />
              </div>
            }
          />

          {/* Lazy-loaded component sections - Ordered alphabetically by tocItems */}
          {/* Buttons */}
          <LazyComponentSection
            id="button-drip"
            component={ButtonDripSection}
          />
          <LazyComponentSection
            id="button-loader"
            component={ButtonLoaderSection}
          />
          <LazyComponentSection id="hamburger" component={HamburgerSection} />
          <LazyComponentSection
            id="topup-button"
            component={TopupButtonSection}
          />

          {/* Cards */}
          <LazyComponentSection
            id="author-card"
            component={AuthorCardSection}
          />
          <LazyComponentSection
            id="card-container"
            component={CardContainerSection}
          />
          <LazyComponentSection id="card-title" component={CardTitleSection} />
          <LazyComponentSection
            id="panel-action-card"
            component={PanelActionCardSection}
          />
          <LazyComponentSection id="panel-card" component={PanelCardSection} />

          {/* Carousel */}
          <LazyComponentSection id="carousel" component={CarouselSection} />
          <LazyComponentSection
            id="carousel-cards"
            component={CarouselCardsSection}
          />
          <LazyComponentSection
            id="carousel-image"
            component={CarouselImageSection}
          />

          {/* Common */}
          <LazyComponentSection id="avatar" component={AvatarSection} />
          <LazyComponentSection id="badge" component={BadgeSection} />
          <LazyComponentSection id="collapse" component={CollapseSection} />
          <LazyComponentSection id="scrollbar" component={ScrollbarSection} />
          <LazyComponentSection id="skeleton" component={SkeletonSection} />

          {/* Dialog */}
          <LazyComponentSection id="modal" component={ModalSection} />
          <LazyComponentSection id="drawer" component={DrawerSection} />
          <LazyComponentSection id="sidebar" component={SidebarSection} />
          <LazyComponentSection
            id="sidebar-menu"
            component={SidebarMenuSection}
          />

          {/* Links */}
          <LazyComponentSection
            id="active-link"
            component={ActiveLinkSection}
          />
          <LazyComponentSection
            id="anchor-link"
            component={AnchorLinkSection}
          />

          {/* List */}
          <LazyComponentSection
            id="list-container"
            component={ListContainerSection}
          />
          <LazyComponentSection id="list-item" component={ListItemSection} />

          {/* Loaders */}
          <LazyComponentSection id="loader" component={LoaderSection} />
          <LazyComponentSection
            id="progressbar"
            component={ProgressbarSection}
          />
          <LazyComponentSection id="spinner" component={SpinnerSection} />

          {/* Logos */}
          <LazyComponentSection id="logo" component={LogoSection} />
          <LazyComponentSection
            id="tucu-ui-logo"
            component={TucuUiLogoSection}
          />
          <LazyComponentSection
            id="defi-app-logo"
            component={DefiAppLogoSection}
          />

          {/* Notifications */}
          <LazyComponentSection id="alert" component={AlertSection} />
          <LazyComponentSection
            id="notification-card"
            component={NotificationCardSection}
          />
          <LazyComponentSection id="toast" component={ToastSection} />

          {/* Table */}
          <LazyComponentSection
            id="basic-table"
            component={BasicTableSection}
          />

          {/* Tabs */}
          <LazyComponentSection id="tab" component={TabSection} />
          <LazyComponentSection id="tab-select" component={TabSelectSection} />
          <LazyComponentSection id="param-tab" component={ParamTabSection} />

          {/* Typography */}
          <LazyComponentSection id="typography" component={TypographySection} />

          {/* Utils */}
          <LazyComponentSection
            id="reveal-content"
            component={RevealContentSection}
          />
          <LazyComponentSection
            id="scroll-to-top"
            component={ScrollToTopSection}
          />
          <LazyComponentSection id="image" component={ImageSection} />
        </div>
      </TableOfContents>
    </div>
  );
}
