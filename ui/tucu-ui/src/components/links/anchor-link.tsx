import { Link, LinkProps } from 'react-router-dom';

export const AnchorLink: React.FC<
  LinkProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>
> = ({ ...props }) => {
  return <Link {...props} />;
};

export default AnchorLink;
