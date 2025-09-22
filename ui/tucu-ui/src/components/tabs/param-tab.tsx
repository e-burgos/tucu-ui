import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TabGroup, TabList, TabItem, TabPanels, TabPanel } from './tab';
import { useBreakpoint } from '../../hooks';
import { useIsMounted } from '../../hooks/use-is-mounted';
import TabSelect from './tab-select';
import cn from 'classnames';

export interface TabMenuItem {
  title: React.ReactNode;
  path: string;
}

export interface ParamTabTypes {
  tabMenu: TabMenuItem[];
  children: React.ReactNode;
  tabListClassName?: string;
}

export { TabPanel };

export function ParamTab({
  tabMenu,
  children,
  tabListClassName,
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
    if (query)
      setSelectedTabIndex(tabMenu.findIndex((item) => query === item.path));
  }, [query, tabMenu]);

  return (
    <TabGroup
      selectedIndex={selectedTabIndex}
      onChange={(index: number) => handleTabChange(index)}
    >
      <TabList
        className={cn(
          'relative mb-6 bg-body text-sm uppercase before:absolute before:bottom-0 before:left-0 before:w-full before:rounded-xs before:bg-gray-200 dark:bg-dark dark:before:bg-gray-800 sm:gap-8 sm:rounded-none md:before:h-0.5',
          tabListClassName
        )}
      >
        {isMounted && ['xs', 'sm'].indexOf(breakpoint) !== -1 ? (
          <div ref={dropdownEl}>
            <TabSelect
              tabMenu={tabMenu}
              selectedTabIndex={selectedTabIndex}
              onChange={(index: number) => handleTabChange(index)}
            />
          </div>
        ) : (
          <div className="flex gap-6 md:gap-8 xl:gap-10 3xl:gap-12">
            {tabMenu.map((item) => (
              <TabItem key={item.path}>{item.title}</TabItem>
            ))}
          </div>
        )}
      </TabList>
      <TabPanels>{children}</TabPanels>
    </TabGroup>
  );
}

export default ParamTab;
