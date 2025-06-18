/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useState } from 'react';
import Button, { ButtonProps } from '../buttons';
import { DrawerContainer } from './drawer-container';
import { Sidebar } from './sidebar';
import { SidebarMenu } from './sidebar-menu';
import { LogoPropTypes } from '../logos/logo';

export interface IMenuItem {
  name: string;
  icon?: JSX.Element;
  href: string;
  component?: JSX.Element;
  hide?: boolean;
  dropdownItems?: IMenuItem[];
}

export interface DrawerProps {
  onClose?: () => void;
  children?: React.ReactNode;
  type: 'sidebar' | 'sidebar-menu';
  buttonProps?: ButtonProps;
  className?: string;
  menuItems?: IMenuItem[];
  position?: 'left' | 'right';
  title?: string;
  actionContent?: React.ReactNode;
  backdrop?: boolean;
  logo?: LogoPropTypes;
}

export function Drawer({
  onClose,
  children,
  type,
  buttonProps,
  className,
  menuItems,
  position = 'left',
  title,
  actionContent,
  backdrop = true,
  logo,
}: DrawerProps) {
  const [isOpen, setIsOpen] = useState(false);

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
            actionContent={actionContent}
            logo={logo}
          />
        );
      default:
        return (
          <Sidebar
            onClose={closeDrawer}
            children={children}
            className={className}
            logo={logo}
          />
        );
    }
  };

  return (
    <>
      <Button
        {...buttonProps}
        onClick={() => {
          setIsOpen(!isOpen);
          // @ts-ignore
          buttonProps?.onClick?.();
        }}
      >
        {buttonProps?.title || 'Open'}
      </Button>
      <DrawerContainer
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        position={position}
        backdrop={backdrop}
      >
        {renderDrawer()}
      </DrawerContainer>
    </>
  );
}

export default Drawer;
