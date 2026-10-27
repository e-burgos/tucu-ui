'use client';

import { useTucuNavigation } from '../../themes/navigation/core';
import type { TucuLinkProps } from '../../themes/navigation/core';
import cn from 'classnames';
import AnchorLink from './anchor-link';

export interface ActiveLinkProps extends TucuLinkProps {
  activeClassName?: string;
  path: string;
  href?: string;
}
export const ActiveLink: React.FC<ActiveLinkProps> = ({
  href: _href,
  path,
  className,
  activeClassName = 'active',
  ...props
}) => {
  const { pathname } = useTucuNavigation();

  return (
    <AnchorLink
      className={cn(className, {
        [activeClassName]: pathname === path,
      })}
      {...props}
    />
  );
};

export default ActiveLink;
