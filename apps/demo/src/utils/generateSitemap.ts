/**
 * Generate sitemap.xml from route configuration
 */

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority?: number;
}

const BASE_URL = import.meta.env.VITE_APP_URL || 'https://tucu-ui.netlify.app';

/**
 * Route paths configuration (mirrors APP_PATHS from menuItems)
 */
const APP_PATHS = {
  INTRODUCTION: { path: '/', name: 'Home' },
  DESIGN_SYSTEM: { path: '/design-system', name: 'Design System' },
  DESIGN_SYSTEM_LAYOUT_SYSTEM: {
    path: '/design-system/layout-system',
    name: 'Layout System',
  },
  DESIGN_SYSTEM_THEMING_GUIDE: {
    path: '/design-system/theming-guide',
    name: 'Theming Guide',
  },
  FORMS: { path: '/form-system', name: 'Forms' },
  FORMS_EXAMPLE: { path: '/form-system/example', name: 'Form Example' },
  FORMS_CODE_EXAMPLE: {
    path: '/form-system/code-example',
    name: 'Code Example',
  },
  COMPONENTS: { path: '/components', name: 'Components' },
  COMPONENTS_BLOCKCHAIN: { path: '/components/blockchain', name: 'Blockchain' },
  COMPONENTS_UI_COMPONENTS: {
    path: '/components/ui-components',
    name: 'UI Components',
  },
  COMPONENTS_INPUTS_COMPONENTS: {
    path: '/components/inputs-components',
    name: 'Inputs Components',
  },
  FEATURES: { path: '/features', name: 'Features' },
  FEATURES_ICONS_SYSTEM: {
    path: '/features/icons-system',
    name: 'Icons System',
  },
  FEATURES_ACCESSIBILITY: {
    path: '/features/accessibility',
    name: 'Accessibility',
  },
  FEATURES_HOOKS_UTILITIES: {
    path: '/features/hooks-utilities',
    name: 'Hooks Utilities',
  },
  FEATURES_ROUTING_SYSTEM: {
    path: '/features/routing-system',
    name: 'Routing System',
  },
  TAILWIND_UTILITIES: { path: '/tailwind-utilities', name: 'Tailwind V4' },
  TAILWIND_UTILITIES_LAYOUT_UTILITIES: {
    path: '/tailwind-utilities/layout-utilities',
    name: 'Layout Utilities',
  },
  TAILWIND_UTILITIES_FLEXBOX_GRID: {
    path: '/tailwind-utilities/flexbox-grid',
    name: 'Flexbox Grid',
  },
  TAILWIND_UTILITIES_BACKGROUND: {
    path: '/tailwind-utilities/background',
    name: 'Background',
  },
  TAILWIND_UTILITIES_BORDERS: {
    path: '/tailwind-utilities/borders',
    name: 'Borders',
  },
  TAILWIND_UTILITIES_TYPOGRAPHY: {
    path: '/tailwind-utilities/typography',
    name: 'Typography',
  },
  TAILWIND_UTILITIES_EFFECTS: {
    path: '/tailwind-utilities/effects',
    name: 'Effects',
  },
  TAILWIND_UTILITIES_FILTERS: {
    path: '/tailwind-utilities/filters',
    name: 'Filters',
  },
  TAILWIND_UTILITIES_TABLES: {
    path: '/tailwind-utilities/tables',
    name: 'Tables',
  },
  TAILWIND_UTILITIES_TRANSITIONS: {
    path: '/tailwind-utilities/transitions',
    name: 'Transitions',
  },
  TAILWIND_UTILITIES_TRANSFORMS: {
    path: '/tailwind-utilities/transforms',
    name: 'Transforms',
  },
  TAILWIND_UTILITIES_INTERACTIVITY: {
    path: '/tailwind-utilities/interactivity',
    name: 'Interactivity',
  },
  TAILWIND_UTILITIES_SVG: { path: '/tailwind-utilities/svg', name: 'SVG' },
  TAILWIND_UTILITIES_ACCESSIBILITY: {
    path: '/tailwind-utilities/accessibility',
    name: 'Accessibility',
  },
  TAILWIND_UTILITIES_COLORS: {
    path: '/tailwind-utilities/colors',
    name: 'Colors',
  },
};

/**
 * Get all routes from menu configuration
 */
function getAllRoutes(): string[] {
  const routes: string[] = [];

  // Main routes
  routes.push(APP_PATHS.INTRODUCTION.path);
  routes.push(APP_PATHS.DESIGN_SYSTEM.path);
  routes.push(APP_PATHS.FORMS.path);
  routes.push(APP_PATHS.COMPONENTS.path);
  routes.push(APP_PATHS.FEATURES.path);
  routes.push(APP_PATHS.TAILWIND_UTILITIES.path);

  // Design System sub-routes
  routes.push(APP_PATHS.DESIGN_SYSTEM_LAYOUT_SYSTEM.path);
  routes.push(APP_PATHS.DESIGN_SYSTEM_THEMING_GUIDE.path);

  // Forms sub-routes
  routes.push(APP_PATHS.FORMS_EXAMPLE.path);
  routes.push(APP_PATHS.FORMS_CODE_EXAMPLE.path);

  // Components sub-routes
  routes.push(APP_PATHS.COMPONENTS_BLOCKCHAIN.path);
  routes.push(APP_PATHS.COMPONENTS_UI_COMPONENTS.path);
  routes.push(APP_PATHS.COMPONENTS_INPUTS_COMPONENTS.path);

  // Features sub-routes
  routes.push(APP_PATHS.FEATURES_ICONS_SYSTEM.path);
  routes.push(APP_PATHS.FEATURES_ACCESSIBILITY.path);
  routes.push(APP_PATHS.FEATURES_HOOKS_UTILITIES.path);
  routes.push(APP_PATHS.FEATURES_ROUTING_SYSTEM.path);

  // Tailwind Utilities sub-routes
  routes.push(APP_PATHS.TAILWIND_UTILITIES_LAYOUT_UTILITIES.path);
  routes.push(APP_PATHS.TAILWIND_UTILITIES_FLEXBOX_GRID.path);
  routes.push(APP_PATHS.TAILWIND_UTILITIES_BACKGROUND.path);
  routes.push(APP_PATHS.TAILWIND_UTILITIES_BORDERS.path);
  routes.push(APP_PATHS.TAILWIND_UTILITIES_TYPOGRAPHY.path);
  routes.push(APP_PATHS.TAILWIND_UTILITIES_EFFECTS.path);
  routes.push(APP_PATHS.TAILWIND_UTILITIES_FILTERS.path);
  routes.push(APP_PATHS.TAILWIND_UTILITIES_TABLES.path);
  routes.push(APP_PATHS.TAILWIND_UTILITIES_TRANSITIONS.path);
  routes.push(APP_PATHS.TAILWIND_UTILITIES_TRANSFORMS.path);
  routes.push(APP_PATHS.TAILWIND_UTILITIES_INTERACTIVITY.path);
  routes.push(APP_PATHS.TAILWIND_UTILITIES_SVG.path);
  routes.push(APP_PATHS.TAILWIND_UTILITIES_ACCESSIBILITY.path);
  routes.push(APP_PATHS.TAILWIND_UTILITIES_COLORS.path);

  return routes;
}

/**
 * Generate sitemap XML content
 */
export function generateSitemap(baseUrl: string = BASE_URL): string {
  const routes = getAllRoutes();
  const currentDate = new Date().toISOString().split('T')[0];

  const urls: SitemapUrl[] = routes.map((route) => {
    const url: SitemapUrl = {
      loc: `${baseUrl}${route}`,
      lastmod: currentDate,
      changefreq: 'weekly',
    };

    // Set priority based on route importance
    if (route === '/') {
      url.priority = 1.0;
      url.changefreq = 'daily';
    } else if (
      route.includes('/components') ||
      route.includes('/design-system')
    ) {
      url.priority = 0.9;
    } else if (route.includes('/form-system') || route.includes('/features')) {
      url.priority = 0.8;
    } else if (route.includes('/tailwind-utilities')) {
      url.priority = 0.7;
    } else {
      url.priority = 0.6;
    }

    return url;
  });

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`;

  return sitemap;
}
