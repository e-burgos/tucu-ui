import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import cn from 'classnames';
import { ChevronDown } from '../icons/chevron-down';
import { TabGroup, TabItem } from './tab';

export interface TabSelectMenuItem {
  title: React.ReactNode;
  path: string;
}

export const TabSelect = forwardRef(
  (
    {
      tabMenu,
      selectedTabIndex,
      onChange,
    }: {
      tabMenu: TabSelectMenuItem[];
      selectedTabIndex: number;
      onChange: (index: number) => void;
    },
    ref: React.Ref<HTMLElement | null>
  ) => {
    const [visibleMobileMenu, setVisibleMobileMenu] = useState(false);
    const selectRef = useRef(null);
    useImperativeHandle(ref, () => selectRef.current);

    return (
      <div
        ref={selectRef}
        className="rounded-lg border-2 border-gray-200 dark:border-gray-700"
      >
        <button
          onClick={() => setVisibleMobileMenu(!visibleMobileMenu)}
          className="flex w-full items-center justify-between px-4 py-2.5 uppercase text-gray-400 dark:text-gray-300 sm:px-5 sm:py-3.5"
        >
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {tabMenu[selectedTabIndex]?.title ?? tabMenu[0]?.title}
          </span>
          <ChevronDown className="h-auto w-3.5" />
        </button>
        <div
          className={cn(
            'absolute left-0 top-full z-20 mt-1 grid w-full gap-0.5 rounded-lg border border-gray-200 bg-white p-2 text-left shadow-large dark:border-gray-700 dark:bg-gray-800 xs:gap-1',
            visibleMobileMenu ? 'visible opacity-100' : 'invisible opacity-0'
          )}
        >
          {tabMenu.map((item, index) => (
            <div
              key={item.path}
              onClick={() => {
                setVisibleMobileMenu(false);
                onChange(index);
              }}
              className=" w-full cursor-pointer rounded-md px-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <TabItem
                showMobileIndicator={false}
                className="w-full flex items-center !justify-start text-right"
              >
                {item.title}
              </TabItem>
            </div>
          ))}
        </div>
      </div>
    );
  }
);

export default TabSelect;
