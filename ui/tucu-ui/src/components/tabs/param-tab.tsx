import { useCallback, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { TabGroup, TabList, TabItem, TabPanels, TabPanel } from './tab';

type VariantNames = 'underline' | 'pills' | 'bordered' | 'solid';
type SizeNames = 'small' | 'medium' | 'large';

export interface TabMenuItem {
  title: React.ReactNode;
  path: string;
  icon?: React.ReactNode;
}

export interface ParamTabTypes {
  tabMenu: TabMenuItem[];
  children: React.ReactNode;
  tabListClassName?: string;
  variant?: VariantNames;
  size?: SizeNames;
  /** Dropdown instead of the tab row on xs/sm breakpoints. Default `true`. */
  showMobileSelect?: boolean;
  /** Search param that stores the selected tab path. Default `view`. */
  paramName?: string;
  /** Tab shown when the param is missing or unknown. Default `0`. */
  defaultIndex?: number;
  /**
   * Replace the history entry on tab change. Default `true` (previous
   * behavior); set `false` so back/forward walks through tabs.
   */
  replace?: boolean;
  /** Called after the tab changes. */
  onChange?: (index: number, item: TabMenuItem) => void;
}

export { TabPanel };

/**
 * Tabs whose selection lives in the URL (`?view=<path>`). The selected tab
 * is derived from the URL on every render, so it follows reloads, links,
 * back/forward and any external navigation.
 */
export function ParamTab({
  tabMenu,
  children,
  tabListClassName,
  variant = 'underline',
  size = 'medium',
  showMobileSelect = true,
  paramName = 'view',
  defaultIndex = 0,
  replace = true,
  onChange,
}: ParamTabTypes) {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get(paramName);

  const selectedTabIndex = useMemo(() => {
    const index = tabMenu.findIndex((item) => item.path === query);
    if (index !== -1) return index;
    return Math.min(Math.max(defaultIndex, 0), Math.max(tabMenu.length - 1, 0));
  }, [query, tabMenu, defaultIndex]);

  const handleTabChange = useCallback(
    (index: number) => {
      const item = tabMenu[index];
      if (!item) return;
      setSearchParams(
        (previous) => {
          const params = new URLSearchParams(previous);
          params.set(paramName, item.path);
          return params;
        },
        { replace }
      );
      onChange?.(index, item);
    },
    [tabMenu, paramName, replace, setSearchParams, onChange]
  );

  return (
    <TabGroup
      variant={variant}
      selectedIndex={selectedTabIndex}
      onChange={handleTabChange}
    >
      <TabList
        variant={variant}
        className={tabListClassName}
        responsive={showMobileSelect}
      >
        {tabMenu.map((item) => (
          <TabItem key={item.path} variant={variant} size={size} icon={item.icon}>
            {item.title}
          </TabItem>
        ))}
      </TabList>
      <TabPanels>{children}</TabPanels>
    </TabGroup>
  );
}

export default ParamTab;
