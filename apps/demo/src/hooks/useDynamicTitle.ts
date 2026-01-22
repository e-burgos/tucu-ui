import { useEffect } from 'react';
import { ReactRouter } from '@e-burgos/tucu-ui';
import type { StandaloneAppRoutesMenuItem } from '@e-burgos/tucu-ui';
import { getPageTitle } from '../utils/seo';

/**
 * Recursively find a menu item by path in menuItems and their dropdownItems
 */
function findMenuItemByPath(
  menuItems: StandaloneAppRoutesMenuItem[],
  pathname: string
): StandaloneAppRoutesMenuItem | null {
  for (const item of menuItems) {
    // Check if current item matches
    if (item.path === pathname) {
      return item;
    }

    // Check dropdown items
    if (item.dropdownItems) {
      for (const dropdownItem of item.dropdownItems) {
        if (dropdownItem.path === pathname) {
          return dropdownItem;
        }
      }
    }
  }

  return null;
}

/**
 * Hook to automatically update page title based on current route
 *
 * This hook detects the current route and updates the document title
 * and meta tag `name="title"` based on the menuItems configuration.
 *
 * @param menuItems - Array of menu items with route configuration
 *
 * @example
 * ```tsx
 * function App() {
 *   const { menuItems } = useMenuItems();
 *   useDynamicTitle(menuItems);
 *   return <div>...</div>;
 * }
 * ```
 */
export function useDynamicTitle(
  menuItems: StandaloneAppRoutesMenuItem[]
): void {
  const location = ReactRouter.useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const currentMenuItem = findMenuItemByPath(menuItems, location.pathname);

    if (currentMenuItem && currentMenuItem.name) {
      const pageTitle = getPageTitle(currentMenuItem.name);

      // Update document title
      document.title = pageTitle;

      // Update meta tag name="title"
      let titleMeta = document.querySelector(
        'meta[name="title"]'
      ) as HTMLMetaElement;
      if (!titleMeta) {
        titleMeta = document.createElement('meta');
        titleMeta.setAttribute('name', 'title');
        document.head.appendChild(titleMeta);
      }
      titleMeta.setAttribute('content', pageTitle);
    }
  }, [location.pathname, menuItems]);
}
