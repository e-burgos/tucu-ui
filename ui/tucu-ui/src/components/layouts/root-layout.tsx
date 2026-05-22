import { useState } from 'react';
import HorizontalLayout from './horizontal';
import AdminLayout from './admin-layout';
import CleanLayout from './clean-layout';
import MacOSLayout from './macos-layout';
import Toast from '../notifications/toast';
import { LogoPropTypes } from '../logos/logo';
import { LAYOUT_OPTIONS, LayoutOptionType } from '../../themes/config/index';
import { IMenuItem } from './menus/menu-item';
import { ThemeBackground } from '../../themes/components/theme-background';

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
      <ThemeBackground>
        <CleanLayout className={className || contentClassName}>
          {children}
          <Toast />
        </CleanLayout>
      </ThemeBackground>
    );
  }
  if (layout === LAYOUT_OPTIONS.HORIZONTAL) {
    return (
      <ThemeBackground>
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
      </ThemeBackground>
    );
  }
  if (layout === LAYOUT_OPTIONS.ADMIN) {
    return (
      <ThemeBackground>
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
      </ThemeBackground>
    );
  }

  if (
    layout === LAYOUT_OPTIONS.MACOS ||
    layout === LAYOUT_OPTIONS.MACOS_CLEAN ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE_DOCK ||
    layout === LAYOUT_OPTIONS.MACOS_TAHOE_CLEAN
  ) {
    const variant =
      layout === LAYOUT_OPTIONS.MACOS_TAHOE_CLEAN
        ? 'macos-tahoe-clean'
        : layout === LAYOUT_OPTIONS.MACOS_TAHOE_DOCK
        ? 'tahoe-dock'
        : layout === LAYOUT_OPTIONS.MACOS_TAHOE
        ? 'tahoe'
        : layout === LAYOUT_OPTIONS.MACOS_CLEAN
        ? 'sonoma-clean'
        : 'sonoma';
    return (
      <MacOSLayout
        variant={variant}
        logo={logo}
        rightButton={rightButton}
        menuItems={menuItems}
        className={className}
        headerClassName={headerClassName}
        contentClassName={contentClassName}
        fullWidth={fullWidth}
      >
        {children}
      </MacOSLayout>
    );
  }

  return (
    <ThemeBackground>
      <CleanLayout className={className || contentClassName}>
        {children}
        <Toast />
      </CleanLayout>
    </ThemeBackground>
  );
};

export function RootLayout(props: RootLayoutProps) {
  return <LayoutType {...props} />;
}

export default RootLayout;
