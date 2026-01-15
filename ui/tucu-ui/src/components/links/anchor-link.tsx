import { Link, LinkProps } from 'react-router-dom';

export const AnchorLink: React.FC<
  LinkProps & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>
> = ({ to, ...props }) => {
  const isExternalUrl = (url: string | undefined): boolean => {
    if (!url) return false;
    return /^https?:\/\//i.test(url);
  };

  if (isExternalUrl(to as string)) {
    return (
      <a
        rel="noopener noreferrer"
        title={props?.title ?? ''}
        href={to as string}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      />
    );
  }

  return <Link to={to} {...props} />;
};

export default AnchorLink;
