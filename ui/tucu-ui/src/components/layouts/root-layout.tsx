import { useState } from 'react';
import HorizontalLayout from './horizontal';
import AdminLayout from './admin-layout';
import CleanLayout from './clean-layout';
import Toast from '../notifications/toast';
import { LogoPropTypes } from '../logos/logo';
import { LAYOUT_OPTIONS, LayoutOptionType } from '../../themes/config/index';
import { IMenuItem } from './menus/menu-item';

export interface LayoutTypeProps {
  logo?: LogoPropTypes;
  layout?: LayoutOptionType;
  menuItems: IMenuItem[];
  rightButton?: React.ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  fullWidth?: boolean;
}

interface RootLayoutProps extends LayoutTypeProps {
  children: React.ReactNode;
}

const LayoutType = ({
  logo,
  layout,
  children,
  menuItems,
  rightButton,
  className,
  headerClassName,
  contentClassName,
  fullWidth = false,
}: RootLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (layout === LAYOUT_OPTIONS.CLEAN) {
    return (
      <CleanLayout className={className || contentClassName}>
        {children}
        <Toast />
      </CleanLayout>
    );
  }
  if (layout === LAYOUT_OPTIONS.HORIZONTAL) {
    return (
      <HorizontalLayout
        logo={logo}
        rightButton={rightButton}
        menuItems={menuItems}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className={className}
        headerClassName={headerClassName}
        contentClassName={contentClassName}
        fullWidth={fullWidth}
      >
        {children}
        <Toast />
      </HorizontalLayout>
    );
  }
  if (layout === LAYOUT_OPTIONS.ADMIN) {
    return (
      <AdminLayout
        logo={logo}
        rightButton={rightButton}
        menuItems={menuItems}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className={className}
        headerClassName={headerClassName}
        contentClassName={contentClassName}
        fullWidth={fullWidth}
      >
        {children}
        <Toast />
      </AdminLayout>
    );
  }

  return (
    <CleanLayout className={className || contentClassName}>
      {children}
      <Toast />
    </CleanLayout>
  );
};

export function RootLayout(props: RootLayoutProps) {
  return <LayoutType {...props} />;
}

export default RootLayout;
