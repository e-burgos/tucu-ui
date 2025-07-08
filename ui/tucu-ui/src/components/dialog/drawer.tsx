/* eslint-disable @typescript-eslint/ban-ts-comment */
import React from 'react';
import { DrawerContainer } from './drawer-container';
import { Sidebar } from './sidebar';
import { SidebarMenu } from './sidebar-menu';
import { LogoPropTypes } from '../logos/logo';
import { IMenuItem } from '../common/menu-item';

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
          />
        );
    }
  };

  return (
    <DrawerContainer
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      position={position}
      backdrop={backdrop}
    >
      {renderDrawer()}
    </DrawerContainer>
  );
}

export default Drawer;
