import React from 'react';
import { DrawerContainer } from './drawer-container';
import { Sidebar } from './sidebar';
import { SidebarMenu } from './sidebar-menu';
import { LogoPropTypes } from '../logos/logo';
import { IMenuItem } from '../layouts/menus/menu-item';
import { useTheme } from '../../themes/hooks/use-theme';
import { LAYOUT_OPTIONS } from '../../themes/config';

export interface DrawerProps {
  children?: React.ReactNode;
  type: 'sidebar' | 'sidebar-menu';
  className?: string;
  menuItems?: IMenuItem[];
  position?: 'left' | 'right';
  title?: string;
  actionContent?: React.ReactNode;
  backdrop?: boolean;
  logo?: LogoPropTypes;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onClose?: () => void;
}

export function Drawer({
  onClose,
  children,
  type,
  className,
  menuItems,
  position = 'left',
  title,
  actionContent,
  backdrop = true,
  logo,
  isOpen,
  setIsOpen,
}: DrawerProps) {
  const { layout } = useTheme();
  const isTahoe = layout === LAYOUT_OPTIONS.MACOS_TAHOE;

  const closeDrawer = () => {
    setIsOpen(false);
    onClose?.();
  };

  const renderDrawer = () => {
    switch (type) {
      case 'sidebar':
        return (
          <Sidebar
            onClose={closeDrawer}
            children={children}
            className={className}
            title={title}
            logo={logo}
            actionContent={actionContent}
            position={position}
          />
        );
      case 'sidebar-menu':
        return (
          <SidebarMenu
            onClose={closeDrawer}
            children={children}
            className={className}
            menuItems={menuItems || []}
            title={title}
            logo={logo}
            actionContent={actionContent}
            position={position}
          />
        );
      default:
        return (
          <Sidebar
            onClose={closeDrawer}
            children={children}
            className={className}
            title={title}
            logo={logo}
            actionContent={actionContent}
            position={position}
          />
        );
    }
  };

  return (
    <DrawerContainer
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      position={position}
      backdrop={isTahoe ? false : backdrop}
      backdropClassName={
        isTahoe ? 'backdrop-blur-[2px] bg-transparent' : undefined
      }
    >
      {renderDrawer()}
    </DrawerContainer>
  );
}

export default Drawer;
