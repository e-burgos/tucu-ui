import cn from 'classnames';

export interface SwitcherButtonProps {
  onClick?: () => void;
  checked: boolean;
  title: string;
}

export function SwitcherButton({
  onClick,
  checked,
  title,
  children,
}: React.PropsWithChildren<SwitcherButtonProps>) {
  return (
    <button
      onClick={onClick}
      onTouchStart={onClick}
      aria-label={title}
      aria-describedby={title}
      className="group cursor-pointer outline-hidden focus:outline-hidden focus:outline-none w-full"
    >
      <span
        className={cn(
          'flex h-17.5 items-center justify-center rounded-lg text-center text-sm font-medium uppercase tracking-wide transition-all',
          checked
            ? 'shadow-large bg-brand/50'
            : 'bg-white dark:bg-gray-600 text-gray-500 group-hover:bg-brand/20 dark:text-gray-400'
        )}
      >
        {children}
      </span>
      <span
        className={cn(
          'mt-3 block text-center text-sm transition-all',
          checked
            ? 'text-brand dark:text-white'
            : 'text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white'
        )}
      >
        {title}
      </span>
    </button>
  );
}

export default SwitcherButton;
