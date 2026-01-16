# SEO Configuration Guide

This document explains how SEO is configured and how to customize it for specific pages.

## Overview

The demo app includes comprehensive SEO optimization:

- ✅ **Sitemap.xml** - Automatically generated during build
- ✅ **robots.txt** - Configured for search engine crawlers
- ✅ **Meta Tags** - Open Graph, Twitter Cards, and standard meta tags
- ✅ **Structured Data (JSON-LD)** - Schema.org markup for better indexing
- ✅ **Dynamic SEO per Page** - Customizable meta tags for each route

## Files Structure

```
apps/demo/
├── public/
│   └── robots.txt              # Search engine crawler configuration
├── src/
│   ├── hooks/
│   │   └── useSEO.ts          # Hook for dynamic SEO per page
│   ├── utils/
│   │   ├── seo.ts             # SEO utilities and constants
│   │   └── generateSitemap.ts # Sitemap generation logic
└── vite.config.sitemap.ts     # Vite plugin for sitemap generation
```

## Automatic SEO

The app automatically handles SEO for all pages through the `useSEO` hook in `App.tsx`. This provides:

- Dynamic page titles
- Meta descriptions
- Open Graph tags
- Twitter Card tags
- Canonical URLs
- Structured data (JSON-LD)
- Robots meta tags

## Customizing SEO per Page

To customize SEO for a specific page, use the `useSEO` hook with custom configuration:

### Example: Custom Page SEO

```tsx
import { useSEO } from '../hooks/useSEO';

export function MyCustomPage() {
  useSEO({
    title: 'My Custom Page Title',
    description: 'A detailed description of this specific page for SEO purposes.',
    keywords: ['custom', 'page', 'specific', 'keywords'],
    ogImage: 'https://tucu-ui.netlify.app/images/my-custom-og-image.png',
    ogType: 'article', // or 'website' (default)
  });

  return <div>My page content</div>;
}
```

### SEO Configuration Options

```typescript
interface SEOConfig {
  title: string; // Page title (will be prefixed with site name)
  description: string; // Meta description
  keywords?: string[]; // Meta keywords array
  ogImage?: string; // Open Graph image URL
  ogType?: 'website' | 'article' | 'profile'; // Open Graph type
  canonicalUrl?: string; // Canonical URL (auto-generated if not provided)
  noindex?: boolean; // Set to true to prevent indexing
}
```

## Sitemap

The sitemap is automatically generated during build and includes all routes from the menu configuration. It's located at `/sitemap.xml` after deployment.

### Customizing Sitemap

To add or modify routes in the sitemap, edit `src/utils/generateSitemap.ts` or `vite.config.sitemap.ts`.

## Robots.txt

The `robots.txt` file is located in `public/robots.txt` and is automatically served at `/robots.txt`.

### Current Configuration

```
User-agent: *
Allow: /
Sitemap: https://tucu-ui.netlify.app/sitemap.xml
```

To customize, edit `public/robots.txt`.

## Environment Variables

You can configure the base URL for SEO using environment variables:

```env
VITE_APP_BASE_URL=https://tucu-ui.netlify.app
# or
VITE_APP_URL=https://tucu-ui.netlify.app
```

If not set, it defaults to `https://tucu-ui.netlify.app`.

## Best Practices

1. **Unique Descriptions**: Always provide unique, descriptive meta descriptions for each page
2. **Relevant Keywords**: Use relevant keywords that match the page content
3. **OG Images**: Use high-quality images (1200x630px recommended) for Open Graph
4. **Canonical URLs**: Ensure canonical URLs point to the correct page
5. **Structured Data**: The hook automatically generates appropriate structured data

## Testing SEO

1. **Google Search Console**: Submit your sitemap at `https://search.google.com/search-console`
2. **Rich Results Test**: Test structured data at `https://search.google.com/test/rich-results`
3. **Facebook Sharing Debugger**: Test Open Graph tags at `https://developers.facebook.com/tools/debug/`
4. **Twitter Card Validator**: Test Twitter Cards at `https://cards-dev.twitter.com/validator`

## Troubleshooting

### Sitemap not generating

- Ensure the build completes successfully
- Check that `vite.config.ts` includes `sitemapPlugin()`
- Verify the `dist/sitemap.xml` file exists after build

### Meta tags not updating

- Ensure `useSEO` is called in the component
- Check browser console for errors
- Verify the hook is imported correctly

### Canonical URLs incorrect

- Set `VITE_APP_BASE_URL` or `VITE_APP_URL` environment variable
- Or customize `canonicalUrl` in the `useSEO` config
