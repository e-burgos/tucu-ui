import React, { lazy } from 'react';
import { LucideIcons, HeroCard } from '../../../index';
import { DynamicSectionsPage, type SectionConfig } from '../../components';

// ─── Section definitions (lazy-loaded) ─────────────────────────

const sections: SectionConfig[] = [
  // Buttons
  {
    id: 'button-drip',
    label: 'ButtonDrip',
    category: 'Buttons',
    component: lazy(() => import('./ui-components-sections/ButtonDripSection')),
  },
  {
    id: 'button-loader',
    label: 'ButtonLoader',
    category: 'Buttons',
    component: lazy(
      () => import('./ui-components-sections/ButtonLoaderSection')
    ),
  },
  {
    id: 'hamburger',
    label: 'Hamburger',
    category: 'Buttons',
    component: lazy(() => import('./ui-components-sections/HamburgerSection')),
  },
  {
    id: 'topup-button',
    label: 'TopupButton',
    category: 'Buttons',
    component: lazy(
      () => import('./ui-components-sections/TopupButtonSection')
    ),
  },
  // Cards
  {
    id: 'author-card',
    label: 'AuthorCard',
    category: 'Cards',
    component: lazy(() => import('./ui-components-sections/AuthorCardSection')),
  },
  {
    id: 'card',
    label: 'Card',
    category: 'Cards',
    component: lazy(() => import('./ui-components-sections/CardSection')),
  },
  {
    id: 'card-container',
    label: 'CardContainer',
    category: 'Cards',
    component: lazy(
      () => import('./ui-components-sections/CardContainerSection')
    ),
  },
  {
    id: 'card-title',
    label: 'CardTitle',
    category: 'Cards',
    component: lazy(() => import('./ui-components-sections/CardTitleSection')),
  },
  {
    id: 'info-card',
    label: 'InfoCard',
    category: 'Cards',
    component: lazy(() => import('./ui-components-sections/InfoCardSection')),
  },
  {
    id: 'panel-action-card',
    label: 'PanelActionCard',
    category: 'Cards',
    component: lazy(
      () => import('./ui-components-sections/PanelActionCardSection')
    ),
  },
  {
    id: 'panel-card',
    label: 'PanelCard',
    category: 'Cards',
    component: lazy(() => import('./ui-components-sections/PanelCardSection')),
  },
  // Carousel
  {
    id: 'carousel',
    label: 'Carousel',
    category: 'Carousel',
    component: lazy(() => import('./ui-components-sections/CarouselSection')),
  },
  {
    id: 'carousel-cards',
    label: 'CarouselCards',
    category: 'Carousel',
    component: lazy(
      () => import('./ui-components-sections/CarouselCardsSection')
    ),
  },
  {
    id: 'carousel-image',
    label: 'CarouselImage',
    category: 'Carousel',
    component: lazy(
      () => import('./ui-components-sections/CarouselImageSection')
    ),
  },
  // Common
  {
    id: 'avatar',
    label: 'Avatar',
    category: 'Common',
    component: lazy(() => import('./ui-components-sections/AvatarSection')),
  },
  {
    id: 'badge',
    label: 'Badge',
    category: 'Common',
    component: lazy(() => import('./ui-components-sections/BadgeSection')),
  },
  {
    id: 'collapse',
    label: 'Collapse',
    category: 'Common',
    component: lazy(() => import('./ui-components-sections/CollapseSection')),
  },
  {
    id: 'scrollbar',
    label: 'Scrollbar',
    category: 'Common',
    component: lazy(() => import('./ui-components-sections/ScrollbarSection')),
  },
  {
    id: 'skeleton',
    label: 'Skeleton',
    category: 'Common',
    component: lazy(() => import('./ui-components-sections/SkeletonSection')),
  },
  {
    id: 'tooltip',
    label: 'Tooltip',
    category: 'Common',
    component: lazy(() => import('./ui-components-sections/TooltipSection')),
  },
  {
    id: 'key-value-row',
    label: 'KeyValueRow',
    category: 'Common',
    component: lazy(
      () => import('./ui-components-sections/KeyValueRowSection')
    ),
  },
  {
    id: 'pagination',
    label: 'Pagination',
    category: 'Common',
    component: lazy(() => import('./ui-components-sections/PaginationSection')),
  },
  {
    id: 'stepper',
    label: 'Stepper',
    category: 'Common',
    component: lazy(() => import('./ui-components-sections/StepperSection')),
  },
  // Dialog
  {
    id: 'modal',
    label: 'Modal',
    category: 'Dialog',
    component: lazy(() => import('./ui-components-sections/ModalSection')),
  },
  {
    id: 'tab-modal',
    label: 'TabModal',
    category: 'Dialog',
    component: lazy(() => import('./ui-components-sections/TabModalSection')),
  },
  {
    id: 'drawer',
    label: 'Drawer',
    category: 'Dialog',
    component: lazy(() => import('./ui-components-sections/DrawerSection')),
  },
  {
    id: 'sidebar',
    label: 'Sidebar',
    category: 'Dialog',
    component: lazy(() => import('./ui-components-sections/SidebarSection')),
  },
  {
    id: 'sidebar-menu',
    label: 'SidebarMenu',
    category: 'Dialog',
    component: lazy(
      () => import('./ui-components-sections/SidebarMenuSection')
    ),
  },
  // Links
  {
    id: 'active-link',
    label: 'ActiveLink',
    category: 'Links',
    component: lazy(() => import('./ui-components-sections/ActiveLinkSection')),
  },
  {
    id: 'anchor-link',
    label: 'AnchorLink',
    category: 'Links',
    component: lazy(() => import('./ui-components-sections/AnchorLinkSection')),
  },
  // List
  {
    id: 'list-container',
    label: 'ListContainer',
    category: 'List',
    component: lazy(
      () => import('./ui-components-sections/ListContainerSection')
    ),
  },
  {
    id: 'list-item',
    label: 'ListItem',
    category: 'List',
    component: lazy(() => import('./ui-components-sections/ListItemSection')),
  },
  // Loaders
  {
    id: 'loader',
    label: 'Loader',
    category: 'Loaders',
    component: lazy(() => import('./ui-components-sections/LoaderSection')),
  },
  {
    id: 'progressbar',
    label: 'Progressbar',
    category: 'Loaders',
    component: lazy(
      () => import('./ui-components-sections/ProgressbarSection')
    ),
  },
  {
    id: 'spinner',
    label: 'Spinner',
    category: 'Loaders',
    component: lazy(() => import('./ui-components-sections/SpinnerSection')),
  },
  // Logos
  {
    id: 'logo',
    label: 'Logo',
    category: 'Logos',
    component: lazy(() => import('./ui-components-sections/LogoSection')),
  },
  {
    id: 'tucu-ui-logo',
    label: 'TucuUiLogo',
    category: 'Logos',
    component: lazy(() => import('./ui-components-sections/TucuUiLogoSection')),
  },
  {
    id: 'defi-app-logo',
    label: 'DefiAppLogo',
    category: 'Logos',
    component: lazy(
      () => import('./ui-components-sections/DefiAppLogoSection')
    ),
  },
  // Notifications
  {
    id: 'alert',
    label: 'Alert',
    category: 'Notifications',
    component: lazy(() => import('./ui-components-sections/AlertSection')),
  },
  {
    id: 'notification-card',
    label: 'NotificationCard',
    category: 'Notifications',
    component: lazy(
      () => import('./ui-components-sections/NotificationCardSection')
    ),
  },
  {
    id: 'toast',
    label: 'Toast',
    category: 'Notifications',
    component: lazy(() => import('./ui-components-sections/ToastSection')),
  },
  // Table
  {
    id: 'basic-table',
    label: 'BasicTable',
    category: 'Table',
    component: lazy(() => import('./ui-components-sections/BasicTableSection')),
  },
  // Tabs
  {
    id: 'tab',
    label: 'Tab',
    category: 'Tabs',
    component: lazy(() => import('./ui-components-sections/TabSection')),
  },
  {
    id: 'tab-select',
    label: 'TabSelect',
    category: 'Tabs',
    component: lazy(() => import('./ui-components-sections/TabSelectSection')),
  },
  {
    id: 'param-tab',
    label: 'ParamTab',
    category: 'Tabs',
    component: lazy(() => import('./ui-components-sections/ParamTabSection')),
  },
  // Typography
  {
    id: 'typography',
    label: 'Typography',
    category: 'Typography',
    component: lazy(() => import('./ui-components-sections/TypographySection')),
  },
  // Utils
  {
    id: 'reveal-content',
    label: 'RevealContent',
    category: 'Utils',
    component: lazy(
      () => import('./ui-components-sections/RevealContentSection')
    ),
  },
  {
    id: 'scroll-to-top',
    label: 'ScrollToTop',
    category: 'Utils',
    component: lazy(
      () => import('./ui-components-sections/ScrollToTopSection')
    ),
  },
  {
    id: 'image',
    label: 'Image',
    category: 'Utils',
    component: lazy(() => import('./ui-components-sections/ImageSection')),
  },
];

// ─── Page Component ────────────────────────────────────────────

export function UiComponents() {
  return (
    <DynamicSectionsPage
      hideHeroInSubSections
      sections={sections}
      hero={
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
      }
    />
  );
}

export default UiComponents;
