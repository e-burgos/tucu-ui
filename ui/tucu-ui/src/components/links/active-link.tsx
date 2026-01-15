import { LinkProps, useLocation } from 'react-router-dom';
import cn from 'classnames';
import AnchorLink from './anchor-link';

export interface ActiveLinkProps extends LinkProps {
  activeClassName?: string;
  path: string;
  href?: string;
}
export const ActiveLink: React.FC<
  ActiveLinkProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>
> = ({ href, path, className, activeClassName = 'active', ...props }) => {
  const location = useLocation();
  const pathname = location.pathname;

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
