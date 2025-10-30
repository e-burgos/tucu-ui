import cn from 'classnames';
import { ChevronForward } from '../icons/chevron-forward';
import AnchorLink from '../links/anchor-link';

export function TopupButton({
  label,
  icon,
  href,
  className,
  onClick,
}: React.PropsWithChildren<{
  label: string;
  icon?: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: () => void;
}>) {
  return (
    <button
      className={cn(
        'flex h-10 w-full items-center whitespace-nowrap rounded-lg border-2 border-dashed border-gray-500 bg-gray-100 px-6 text-sm uppercase tracking-wider text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white lg:h-12 3xl:h-13',
        'hover:border-brand dark:hover:border-brand hover:cursor-pointer hover:transform-3d hover:shadow-lg',
        className
      )}
      onClick={onClick}
    >
      {icon && (
        <span className="bg-brand p-1 mr-3.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full  text-white lg:h-6 lg:w-6">
          {icon}
        </span>
      )}
      <span className="mr-3.5 grow text-justify text-sm lg:text-sm">
        {label}
      </span>
      {href && (
        <AnchorLink to={href}>
          <ChevronForward className="rtl:rotate-180" />
        </AnchorLink>
      )}
    </button>
  );
}

export default TopupButton;
