import { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import cn from 'classnames';
import { ChevronDown } from '../icons/chevron-down';

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
        className="relative rounded-lg border-2 border-gray-200 dark:border-gray-700"
      >
        <button
          onClick={() => setVisibleMobileMenu(!visibleMobileMenu)}
          className="flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-gray-400 transition-colors hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 sm:px-5 sm:py-3.5"
        >
          <span className="font-medium text-gray-900 dark:text-gray-100">
            {tabMenu[selectedTabIndex]?.title ?? tabMenu[0]?.title}
          </span>
          <ChevronDown
            className={cn(
              'h-auto w-3.5 transition-transform duration-200',
              visibleMobileMenu && 'rotate-180'
            )}
          />
        </button>
        <div
          className={cn(
            'absolute left-0 top-full z-20 mt-1 grid w-full gap-0.5 rounded-lg border border-gray-200 bg-white p-2 text-left shadow-large transition-all duration-200 dark:border-gray-700 dark:bg-gray-800 xs:gap-1',
            visibleMobileMenu
              ? 'visible translate-y-0 opacity-100'
              : 'invisible -translate-y-2 opacity-0'
          )}
        >
          {tabMenu.map((item, index) => (
            <button
              key={`${item.path}-${index}`}
              onClick={() => {
                setVisibleMobileMenu(false);
                onChange(index);
              }}
              className={cn(
                'w-full cursor-pointer rounded-md px-4 py-2 text-left text-sm transition-colors',
                'hover:bg-gray-100 dark:hover:bg-gray-700',
                'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand',
                {
                  'bg-gray-100 dark:bg-gray-700 font-medium text-gray-900 dark:text-white':
                    index === selectedTabIndex,
                  'text-gray-600 dark:text-gray-400':
                    index !== selectedTabIndex,
                }
              )}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    );
  }
);

TabSelect.displayName = 'TabSelect';

export default TabSelect;
