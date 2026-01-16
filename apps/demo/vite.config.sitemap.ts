/**
 * Vite plugin to generate sitemap.xml during build
 */
import type { Plugin } from 'vite';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

// Route paths configuration (mirrors APP_PATHS from menuItems)
const APP_PATHS = {
  INTRODUCTION: { path: '/', name: 'Home' },
  DESIGN_SYSTEM: { path: '/design-system', name: 'Design System' },
  FORMS: { path: '/form-system', name: 'Forms' },
  COMPONENTS: { path: '/components', name: 'Components' },
  FEATURES: { path: '/features', name: 'Features' },
  TAILWIND_UTILITIES: { path: '/tailwind-utilities', name: 'Tailwind V4' },
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
  routes.push(`${APP_PATHS.DESIGN_SYSTEM.path}/layout-system`);
  routes.push(`${APP_PATHS.DESIGN_SYSTEM.path}/theming-guide`);

  // Forms sub-routes
  routes.push(`${APP_PATHS.FORMS.path}/example`);
  routes.push(`${APP_PATHS.FORMS.path}/code-example`);

  // Components sub-routes
  routes.push(`${APP_PATHS.COMPONENTS.path}/blockchain`);
  routes.push(`${APP_PATHS.COMPONENTS.path}/ui-components`);
  routes.push(`${APP_PATHS.COMPONENTS.path}/inputs-components`);

  // Features sub-routes
  routes.push(`${APP_PATHS.FEATURES.path}/icons-system`);
  routes.push(`${APP_PATHS.FEATURES.path}/accessibility`);
  routes.push(`${APP_PATHS.FEATURES.path}/hooks-utilities`);
  routes.push(`${APP_PATHS.FEATURES.path}/routing-system`);

  // Tailwind Utilities sub-routes
  routes.push(`${APP_PATHS.TAILWIND_UTILITIES.path}/layout-utilities`);
  routes.push(`${APP_PATHS.TAILWIND_UTILITIES.path}/flexbox-grid`);
  routes.push(`${APP_PATHS.TAILWIND_UTILITIES.path}/background`);
  routes.push(`${APP_PATHS.TAILWIND_UTILITIES.path}/borders`);
  routes.push(`${APP_PATHS.TAILWIND_UTILITIES.path}/typography`);
  routes.push(`${APP_PATHS.TAILWIND_UTILITIES.path}/effects`);
  routes.push(`${APP_PATHS.TAILWIND_UTILITIES.path}/filters`);
  routes.push(`${APP_PATHS.TAILWIND_UTILITIES.path}/tables`);
  routes.push(`${APP_PATHS.TAILWIND_UTILITIES.path}/transitions`);
  routes.push(`${APP_PATHS.TAILWIND_UTILITIES.path}/transforms`);
  routes.push(`${APP_PATHS.TAILWIND_UTILITIES.path}/interactivity`);
  routes.push(`${APP_PATHS.TAILWIND_UTILITIES.path}/svg`);
  routes.push(`${APP_PATHS.TAILWIND_UTILITIES.path}/accessibility`);
  routes.push(`${APP_PATHS.TAILWIND_UTILITIES.path}/colors`);

  return routes;
}

/**
 * Generate sitemap XML content
 */
function generateSitemap(baseUrl: string): string {
  const routes = getAllRoutes();
  const currentDate = new Date().toISOString().split('T')[0];

  const urls = routes.map((route) => {
    let priority = 0.6;
    let changefreq: string = 'weekly';

    // Set priority based on route importance
    if (route === '/') {
      priority = 1.0;
      changefreq = 'daily';
    } else if (
      route.includes('/components') ||
      route.includes('/design-system')
    ) {
      priority = 0.9;
    } else if (route.includes('/form-system') || route.includes('/features')) {
      priority = 0.8;
    } else if (route.includes('/tailwind-utilities')) {
      priority = 0.7;
    }

    return {
      loc: `${baseUrl}${route}`,
      lastmod: currentDate,
      changefreq,
      priority,
    };
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

export function sitemapPlugin(): Plugin {
  return {
    name: 'sitemap-generator',
    apply: 'build',
    closeBundle() {
      const baseUrl =
        process.env.VITE_APP_BASE_URL ||
        process.env.VITE_APP_URL ||
        'https://tucu-ui.netlify.app';
      const sitemap = generateSitemap(baseUrl);
      const outputPath = resolve(__dirname, 'dist', 'sitemap.xml');
      writeFileSync(outputPath, sitemap, 'utf-8');
      console.log(`✅ Sitemap generated: ${outputPath}`);
    },
  };
}
