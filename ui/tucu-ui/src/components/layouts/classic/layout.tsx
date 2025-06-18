import cn from 'classnames';
import { ClassicHeader } from '../header/header';
import { Drawer, IMenuItem } from '../../../components/drawer';
import { LogoPropTypes } from '../../logos';

export default function ClassicLayout({
  logo,
  children,
  contentClassName,
  menuItems,
  rightButton,
  onClickNotification,
  onClickSearch,
  setIsOpen,
}: React.PropsWithChildren<{
  logo?: LogoPropTypes;
  contentClassName?: string;
  menuItems: IMenuItem[];
  rightButton?: React.ReactNode;
  onClickNotification?: () => void;
  onClickSearch?: () => void;
  setIsOpen: (isOpen: boolean) => void;
}>) {
  return (
    <div className="ltr:xl:pl-24 rtl:xl:pr-24 ltr:2xl:pl-28 rtl:2xl:pr-28 ">
      <ClassicHeader
        logo={logo}
        rightButton={rightButton}
        onClickNotification={onClickNotification}
        onClickSearch={onClickSearch}
        setIsOpen={setIsOpen}
      />
      <Drawer
        type="sidebar-menu"
        position="left"
        backdrop={true}
        menuItems={menuItems}
        onClose={() => setIsOpen && setIsOpen(false)}
        logo={logo}
      />
      <main
        className={cn(
          'min-h-full px-4 pb-16 pt-4 sm:px-6 sm:pb-20 lg:px-8 xl:pb-24 xl:pt-5 3xl:px-10',
          contentClassName
        )}
      >
        {children}
      </main>
    </div>
  );
}
