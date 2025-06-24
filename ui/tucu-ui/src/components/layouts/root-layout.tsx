import { useEffect, useState } from 'react';
import { useTheme } from '../../themes/use-theme';
import MinimalLayout from './minimal/layout';
import ClassicLayout from './classic/layout';
import AuthLayout from './authentication/layout';
import Toast from '../notifications/toast';
import { LogoPropTypes } from '../logos/logo';
import { LAYOUT_OPTIONS, LayoutOptionType } from '../../themes/config';
import { IMenuItem } from '../common/menu-item';

export interface LayoutTypeProps {
  logo?: LogoPropTypes;
  layout?: LayoutOptionType;
  menuItems: IMenuItem[];
  rightButton?: React.ReactNode;
  className?: string;
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
}: RootLayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (layout === LAYOUT_OPTIONS.NONE) {
    return (
      <AuthLayout className={className}>
        {children}
        <Toast />
      </AuthLayout>
    );
  }
  if (layout === LAYOUT_OPTIONS.MINIMAL) {
    return (
      <MinimalLayout
        logo={logo}
        rightButton={rightButton}
        menuItems={menuItems}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className={className}
      >
        {children}
        <Toast />
      </MinimalLayout>
    );
  }
  if (layout === LAYOUT_OPTIONS.CLASSIC) {
    return (
      <ClassicLayout
        logo={logo}
        rightButton={rightButton}
        menuItems={menuItems}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        className={className}
      >
        {children}
        <Toast />
      </ClassicLayout>
    );
  }

  return (
    <AuthLayout className={className}>
      {children}
      <Toast />
    </AuthLayout>
  );
};

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
