import { useEffect } from 'react';
import { ReactRouter } from '@e-burgos/tucu-ui';
import {
  type SEOConfig,
  DEFAULT_SEO,
  getCanonicalUrl,
  getPageTitle,
  getKeywordsString,
  getBaseUrl,
} from '../utils/seo';

/**
 * Hook to manage SEO meta tags dynamically for each page
 *
 * This hook updates document meta tags, Open Graph tags, Twitter Cards,
 * and structured data based on the current route.
 *
 * @param config - SEO configuration for the current page
 *
 * @example
 * ```tsx
 * function MyPage() {
 *   useSEO({
 *     title: 'My Page Title',
 *     description: 'Page description for SEO',
 *     keywords: ['keyword1', 'keyword2'],
 *   });
 *   return <div>...</div>;
 * }
 * ```
 */
export function useSEO(config: Partial<SEOConfig> = {}): void {
  const location = ReactRouter.useLocation();
  const seoConfig: SEOConfig = { ...DEFAULT_SEO, ...config };
  const canonicalUrl =
    config.canonicalUrl || getCanonicalUrl(location.pathname);
  const pageTitle = getPageTitle(seoConfig.title);

  useEffect(() => {
    // Guard: Only update if location actually changed
    // This prevents unnecessary updates when component re-renders for other reasons
    if (typeof window === 'undefined') {
      return;
    }
    // Update document title
    document.title = pageTitle;

    // Update or create meta tags
    const updateMetaTag = (
      name: string,
      content: string,
      attribute = 'name'
    ): void => {
      let element = document.querySelector(
        `meta[${attribute}="${name}"]`
      ) as HTMLMetaElement;
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', seoConfig.description);
    if (seoConfig.keywords && seoConfig.keywords.length > 0) {
      updateMetaTag('keywords', getKeywordsString(seoConfig.keywords));
    }

    // Canonical URL
    let canonicalLink = document.querySelector(
      'link[rel="canonical"]'
    ) as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);

    // Open Graph tags
    updateMetaTag('og:title', pageTitle, 'property');
    updateMetaTag('og:description', seoConfig.description, 'property');
    updateMetaTag('og:type', seoConfig.ogType || 'website', 'property');
    updateMetaTag('og:url', canonicalUrl, 'property');
    if (seoConfig.ogImage) {
      updateMetaTag('og:image', seoConfig.ogImage, 'property');
    }
    updateMetaTag('og:site_name', 'Tucu UI', 'property');

    // Twitter Card tags
    updateMetaTag('twitter:card', 'summary_large_image');
    updateMetaTag('twitter:title', pageTitle);
    updateMetaTag('twitter:description', seoConfig.description);
    if (seoConfig.ogImage) {
      updateMetaTag('twitter:image', seoConfig.ogImage);
    }

    // Robots meta tag
    if (seoConfig.noindex) {
      updateMetaTag('robots', 'noindex, nofollow');
    } else {
      updateMetaTag('robots', 'index, follow');
    }

    // Structured Data (JSON-LD)
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': seoConfig.ogType === 'article' ? 'Article' : 'WebSite',
      name: pageTitle,
      description: seoConfig.description,
      url: canonicalUrl,
      ...(seoConfig.ogType === 'article'
        ? {
            headline: seoConfig.title,
            datePublished: new Date().toISOString(),
          }
        : {
            potentialAction: {
              '@type': 'SearchAction',
              target: {
                '@type': 'EntryPoint',
                urlTemplate: `${getBaseUrl()}/?q={search_term_string}`,
              },
              'query-input': 'required name=search_term_string',
            },
          }),
    };

    // Remove existing structured data
    const existingScript = document.querySelector(
      'script[type="application/ld+json"]'
    );
    if (existingScript) {
      existingScript.remove();
    }

    // Add new structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
  }, [location.pathname, pageTitle, seoConfig, canonicalUrl]);
}
