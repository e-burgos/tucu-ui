import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TabGroup, TabList, TabItem, TabPanels, TabPanel } from './tab';
import { useBreakpoint } from '../../hooks';
import { useIsMounted } from '../../hooks/use-is-mounted';
import TabSelect from './tab-select';

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
  showMobileSelect?: boolean;
}

export { TabPanel };

export function ParamTab({
  tabMenu,
  children,
  tabListClassName,
  variant = 'underline',
  size = 'medium',
  showMobileSelect = true,
}: ParamTabTypes) {
  const router = useNavigate();
  const pathname = useLocation().pathname;
  const search = useLocation().search;
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const query = searchParams.get('view');
  const isMounted = useIsMounted();
  const breakpoint = useBreakpoint();
  const dropdownEl = useRef<HTMLDivElement>(null);
  const [selectedTabIndex, setSelectedTabIndex] = useState(0);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  function handleTabChange(index: number) {
    router(pathname + '?' + createQueryString('view', tabMenu[index].path), {
      replace: true,
    });
  }

  useEffect(() => {
    if (query) {
      const index = tabMenu.findIndex((item) => query === item.path);
      if (index !== -1) {
        setSelectedTabIndex(index);
      }
    }
  }, [query, tabMenu]);

  const shouldShowMobileSelect =
    showMobileSelect && isMounted && ['xs', 'sm'].indexOf(breakpoint) !== -1;

  return (
    <TabGroup
      variant={variant}
      selectedIndex={selectedTabIndex}
      onChange={(index: number) => handleTabChange(index)}
    >
      <TabList variant={variant} className={tabListClassName}>
        {shouldShowMobileSelect ? (
          <div ref={dropdownEl} className="w-full">
            <TabSelect
              tabMenu={tabMenu}
              selectedTabIndex={selectedTabIndex}
              onChange={(index: number) => handleTabChange(index)}
            />
          </div>
        ) : (
          <>
            {tabMenu.map((item) => (
              <TabItem
                key={item.path}
                variant={variant}
                size={size}
                icon={item.icon}
              >
                {item.title}
              </TabItem>
            ))}
          </>
        )}
      </TabList>
      <TabPanels>{children}</TabPanels>
    </TabGroup>
  );
}

export default ParamTab;
