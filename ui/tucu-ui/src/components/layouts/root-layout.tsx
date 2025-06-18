import { useEffect, useState } from 'react';
import { LAYOUT_OPTIONS } from '../../themes/config';
import { useTheme } from '../../themes/use-theme';
import MinimalLayout from './minimal/layout';
import ClassicLayout from './classic/layout';
import AuthLayout from './authentication/layout';
import { IMenuItem } from '../drawer';
import Toast from '../notifications/toast';
import { LogoPropTypes } from '../logos/logo';

interface LayoutTypeProps {
  logo?: LogoPropTypes;
  layout: LAYOUT_OPTIONS;
  children: React.ReactNode;
  menuItems: IMenuItem[];
  rightButton?: React.ReactNode;
  onClickNotification?: () => void;
  onClickSearch?: () => void;
}

const LayoutType = ({
  logo,
  layout,
  children,
  menuItems,
  rightButton,
  onClickNotification,
  onClickSearch,
}: LayoutTypeProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (layout === LAYOUT_OPTIONS.AUTH) {
    return (
      <AuthLayout>
        {children}
        <Toast />
      </AuthLayout>
    );
  }
  if (layout === LAYOUT_OPTIONS.MINIMAL) {
    return (
      <MinimalLayout
        logo={logo}
        onClickNotification={onClickNotification}
        onClickSearch={onClickSearch}
        rightButton={rightButton}
        menuItems={menuItems}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        {children}
        <Toast />
      </MinimalLayout>
    );
  }
  if (layout === LAYOUT_OPTIONS.CLASSIC) {
    return (
      <ClassicLayout
        menuItems={menuItems}
        rightButton={rightButton}
        onClickNotification={onClickNotification}
        onClickSearch={onClickSearch}
        setIsOpen={setIsOpen}
      >
        {children}
        <Toast />
      </ClassicLayout>
    );
  }

  return (
    <AuthLayout>
      {children}
      <Toast />
    </AuthLayout>
  );
};

interface RootLayoutProps extends LayoutTypeProps {
  children: React.ReactNode;
}

export function RootLayout(props: RootLayoutProps) {
  const { mode } = useTheme();
  const htmlTag = document.documentElement;

  useEffect(() => {
    if (htmlTag) {
      if (mode === 'dark') {
        htmlTag.classList.remove('light');
        htmlTag.classList.add('dark');
      } else {
        htmlTag.classList.remove('dark');
        htmlTag.classList.add('light');
      }
    }
  }, [htmlTag, mode]);

  return <LayoutType {...props} />;
}

export default RootLayout;
